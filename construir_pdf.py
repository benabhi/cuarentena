#!/usr/bin/env python3
"""Construye el manual de Cuarentena en PDF a partir de los capítulos de libro/.

Uso:
    python3 construir_pdf.py                # Cuarentena.pdf (pantalla)
    python3 construir_pdf.py --imprenta     # Cuarentena-imprenta.pdf (3 mm de sangrado y marcas de corte)
    python3 construir_pdf.py --html         # además guarda maqueta/manual.html para depurar

Requisitos: weasyprint, markdown-it-py, beautifulsoup4, pyphen, Pillow.
Archivos: libro/*.md (texto), estilo.css (diseño), maqueta/extras.py (citas, cajas,
ilustraciones por capítulo), maqueta/iconos.py, maqueta/mapa.py, arte/, fuentes/.
"""
import os, re, sys, glob, html, json, shutil, subprocess
from markdown_it import MarkdownIt
from bs4 import BeautifulSoup, NavigableString

RAIZ = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(RAIZ, 'maqueta'))
import extras as X
import columnas_justas  # noqa: F401  (reparto fino de columnas)
from iconos import icono, emblema, SIMBOLOS
from mapa import svg_mapa

LIBRO = os.path.join(RAIZ, 'libro')
md = MarkdownIt('commonmark', {'html': True, 'typographer': False}).enable('table')

# --------------------------------------------------------------------------- utilidades

def slug(t):
    t = t.lower()
    for a, b in zip('áéíóúñü', 'aeiounu'):
        t = t.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')


def esc(t):
    return html.escape(t, quote=True)


ANCLAS = set()   # se llena al leer el libro


RE_AMENAZA = re.compile(r'\*\*(?P<nombre>[A-ZÁÉÍÓÚÑ][^*×\n]{1,40}?) ×(?P<n>[0-9d]+)(?: · (?P<dist>Lejos|Cerca|Encima))?\*\*')


def amenaza(m):
    dist = m.group('dist')
    d = f'<span class="am-d am-{dist.lower()}">{dist}</span>' if dist else ''
    return (f'<span class="amenaza">{icono("callado")}<b class="am-n">{esc(m.group("nombre"))}</b>'
            f'<span class="am-x">×{esc(m.group("n"))}</span>{d}</span>')


def inline_previo(t):
    """Transformaciones sobre el Markdown antes de renderizar."""
    # código en línea: pruebas, pistas y marcas
    def cod(m):
        c = m.group(1)
        if c.startswith('[') and c.endswith(']'):
            partes = [p.strip() for p in c[1:-1].split('·')]
            extra = ''.join(f'<span class="mod">{esc(p)}</span>' for p in partes[1:])
            return f'<span class="prueba">{icono("dado")}<span class="attr">{esc(partes[0])}</span>{extra}</span>'
        if re.fullmatch(r'[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9_]{2,}', c):
            v = esc(c).replace('_', '_<wbr>')
            return f'<span class="marca">{v}</span>'
        if re.search(r'\b[er]\d{3}\b', c) and '·' in c:
            v = re.sub(r'\b([er]\d{3})\b', r'<a href="#\1">\1</a>', esc(c))
            return f'<span class="pista">{icono("pista")}{v}</span>'
        return f'<code>{esc(c)}</code>'
    t = re.sub(r'`([^`\n]+)`', cod, t)
    # en las citas de varias líneas seguidas, cada línea es una línea (fichas, actas)
    lin = t.split('\n')
    for i in range(len(lin) - 1):
        if lin[i].startswith('>') and lin[i + 1].startswith('>') and lin[i].strip() != '>' and lin[i + 1].strip() != '>' \
                and not re.match(r'>\s*(\d+\.|[-*] )', lin[i + 1]):
            lin[i] = lin[i].rstrip() + '<br/>'
    t = '\n'.join(lin)
    # amenazas en línea: «**Callados ×3 · Lejos**»
    t = RE_AMENAZA.sub(amenaza, t)
    # casillas ▢ (stock, registros)
    t = t.replace('▢', '<span class="cas"></span>')
    # símbolos → iconos
    for s, n in SIMBOLOS.items():
        t = t.replace(s, icono(n, 'sim'))
    return t


def render(t):
    return md.render(inline_previo(t))


RE_REF = re.compile(r'(?<![\w#/-])([er]\d{3})(?![\w])')
ROT = {'éxito pleno': 'pleno', 'éxito': 'ok', 'fallo': 'ko', 'si ganas': 'gana', 'si pierdes': 'ko',
       'si huyes': 'huye', 'si hablas': 'habla', 'si pasas': 'ok'}


def pulir(htmls, contexto=''):
    """Transformaciones sobre el HTML renderizado."""
    s = BeautifulSoup(htmls, 'html.parser')
    # referencias sueltas eXXX / rXXX → enlaces
    for nodo in list(s.find_all(string=True)):
        if nodo.parent.name in ('a', 'code', 'pre', 'svg', 'text', 'style'):
            continue
        if not RE_REF.search(nodo):
            continue
        trozos = RE_REF.split(str(nodo))
        nuevos = []
        for i, tr in enumerate(trozos):
            if i % 2 == 1 and tr in ANCLAS:
                a = s.new_tag('a', href='#' + tr)
                a.string = tr
                nuevos.append(a)
            elif tr:
                nuevos.append(NavigableString(tr))
        for n in nuevos:
            nodo.insert_before(n)
        nodo.extract()
    # enlaces internos: clase según destino
    for a in s.find_all('a', href=True):
        h = a['href']
        if h.startswith('#e'):
            a['class'] = a.get('class', []) + ['ref', 'ref-e']
        elif h.startswith('#r'):
            a['class'] = a.get('class', []) + ['ref', 'ref-r']
    # flechas → e123: la flecha va dentro del enlace
    for a in s.find_all('a', class_='ref'):
        prev = a.previous_sibling
        if isinstance(prev, NavigableString) and prev.rstrip().endswith('→'):
            prev.replace_with(NavigableString(prev.rstrip()[:-1] + ' '))
            a['class'] = a['class'] + ['ir']
    # rótulos de resultado
    for em in s.find_all('em'):
        t = em.get_text().strip()
        if t.endswith(':') and len(t) < 40:
            clave = t[:-1].strip().lower()
            em.name = 'span'
            em['class'] = ['rot', 'rot-' + ROT.get(clave, 'otro')]
            em.string = t[:-1]
    # negritas de resultado: **Si ganas** / **Si pasas.**
    for b in s.find_all('strong'):
        t = b.get_text().strip().rstrip('.:').lower()
        if t in ('si ganas', 'si pasas', 'si huyes', 'si hablas', 'si pierdes'):
            b['class'] = ['rot', 'rot-' + ROT.get(t, 'otro')]
    # citas «>»: fichas, actas, recetas, amenazas o citas de verdad
    for bq in s.find_all('blockquote'):
        txt = bq.get_text(' ', strip=True)
        primero = bq.find(['strong', 'span'])
        if re.match(r'(COMANDO|LABORATORIO|FORMULARIO|ACTA|PLANILLA|REPÚBLICA|DISPOSICI)', txt):
            bq['class'] = ['doc-oficial']
        elif txt.startswith('Ficha del refugio'):
            bq['class'] = ['ficha', 'ficha-refugio']
        elif re.match(r'[^·]{2,40} · (Pelea|Puntería|Sigilo|Físico|Oficio|Mecánica|Medicina|Supervivencia|Labia|Calle) \d', txt):
            bq['class'] = ['ficha', 'ficha-sobre']
        elif primero is not None and 'amenaza' in (primero.get('class') or []) and txt.index(primero.get_text(' ', strip=True)) == 0:
            bq['class'] = ['bq-amenaza']
        elif re.match(r'[^·]{2,50} · Daño \S+ · ', txt):
            bq['class'] = ['ficha', 'ficha-arma']
        elif '◷' in txt or bq.find(class_='ico-hora'):
            bq['class'] = ['ficha', 'ficha-receta'] if (primero is not None and primero.name == 'strong') else ['cita-texto']
        elif primero is not None and primero.name == 'strong' and txt.startswith(primero.get_text(' ', strip=True)) \
                and len(bq.find_all('strong')) >= 2:
            bq['class'] = ['clave']
        else:
            bq['class'] = ['cita-texto']
    # listas numeradas → opciones
    for ol in s.find_all('ol'):
        ol['class'] = ['opciones']
    # tablas
    for tb in s.find_all('table'):
        cab = [th.get_text().strip() for th in tb.find_all('th')]
        clases = ['tabla']
        if cab and cab[0] == '2d6' and any('Alerta' in c for c in cab):
            clases.append('encuentros')
        elif cab and cab[0] == 'd6' and 'Hablar' in cab:
            clases.append('posturas')
        elif cab and cab[0] in ('d6', '1d6', 'd12', '1d12', '2d6', 'd66', '1d8'):
            clases.append('aleatoria')
        tb['class'] = clases
        larga = len(tb.find_all('tr')) > 8
        filas = len(tb.find_all('tr'))
        envoltura = s.new_tag('div', **{'class': ('tabla-env larga' if larga else 'tabla-env') + (' partible' if filas > 13 or (cab and cab[0].startswith('2d6 +')) else '')})
        tb.wrap(envoltura)
        # el texto que presenta la tabla no se queda solo al pie de la página
        previo = envoltura.find_previous_sibling()
        if previo is not None and previo.name in ('p', 'h4', 'h5', 'ul', 'ol'):
            previo['class'] = (previo.get('class') or []) + ['pre-tabla']
    # un primer párrafo corto no se queda solo bajo el título
    primero = next((c for c in s.contents if getattr(c, 'name', None)), None)
    if primero is not None and primero.name == 'p' and len(primero.get_text()) < 140 \
            and primero.find_next_sibling() is not None:
        primero['class'] = (primero.get('class') or []) + ['pre-tabla']
    # bloques de código
    for pre in s.find_all('pre'):
        txt = pre.get_text()
        pre['class'] = ['terminal']
    return str(s)


# --------------------------------------------------------------------------- lectura

def leer():
    """Devuelve una lista de nodos: parte, capitulo, grupo, entrada, texto."""
    nodos = []
    for nombre in X.ORDEN:
        lineas = open(os.path.join(LIBRO, nombre), encoding='utf-8').read().splitlines()
        buf, anc = [], None

        def volcar():
            if buf and nodos:
                nodos[-1].setdefault('cuerpo', []).extend(buf)
            elif buf:
                nodos.append({'tipo': 'texto', 'cuerpo': list(buf)})
            buf.clear()

        for ln in lineas:
            m_a = re.match(r'<a id="([re]\d{3})"></a>\s*$', ln)
            if m_a:
                volcar(); anc = m_a.group(1); continue
            if ln.strip() == '---':
                continue
            if ln.startswith('# '):
                volcar()
                if nombre in X.SECCIONES:
                    nodos.append({'tipo': 'capitulo', 'titulo': ln[2:].strip(), 'archivo': nombre})
                else:
                    nodos.append({'tipo': 'parte', 'titulo': ln[2:].strip(), 'archivo': nombre})
                    if nombre in X.MUNDO:
                        nodos.append({'tipo': 'capitulo', 'titulo': X.MUNDO[nombre], 'archivo': nombre})
                continue
            if ln.startswith('## '):
                volcar()
                tipo = 'grupo' if (nombre in X.SECCIONES or nombre in X.MUNDO) else 'capitulo'
                nodos.append({'tipo': tipo, 'titulo': ln[3:].strip(), 'archivo': nombre, 'nivel': 2}); continue
            if ln.startswith('### '):
                volcar()
                t = ln[4:].strip()
                if anc:
                    tit = re.sub(r'^[re]\d{3}\s*·\s*', '', t)
                    nodos.append({'tipo': 'entrada', 'id': anc, 'titulo': tit, 'archivo': nombre})
                    ANCLAS.add(anc); anc = None
                else:
                    nodos.append({'tipo': 'grupo', 'titulo': t, 'archivo': nombre})
                continue
            buf.append(ln)
        volcar()
    return nodos


# --------------------------------------------------------------------------- piezas

def cita_html(c, clase='epigrafe'):
    if not c:
        return ''
    texto, autor = c
    a = f'<cite>{esc(autor)}</cite>' if autor else ''
    return f'<blockquote class="{clase}"><p>{esc(texto)}</p>{a}</blockquote>'


def img(nombre, pos='50% 50%', clase=''):
    return f'<img class="{clase}" src="arte/{nombre}" style="object-position:{pos}" alt=""/>'


def caja_html(id_):
    tipo, titulo, texto = X.CAJAS[id_]
    cuerpo = pulir(render(texto.strip()))
    return (f'<aside class="caja caja-{tipo}"><div class="caja-cab">{icono(tipo)}<span>{esc(titulo)}</span></div>'
            f'{cuerpo}</aside>')


def entrada_html(n, clases_extra=()):
    id_ = n['id']
    cuerpo = '\n'.join(n.get('cuerpo', [])).strip('\n')
    meta = ''
    lineas = cuerpo.split('\n')
    # línea de lugar, tipo, tiempo y stock: «*El Puerto · Almacén · stock ▢▢*», «*Sobreviviente · ◷ 0*»
    if lineas and re.fullmatch(r'\*[^*].*\*', lineas[0].strip()) and id_[0] == 'e':
        m = lineas[0].strip()[1:-1]
        partes = [p.strip() for p in m.split('·')]
        extra = ''
        for p_ in list(partes):
            if p_.startswith('◷'):
                partes.remove(p_)
                extra += f'<span class="tiempo">{icono("hora")}{esc(p_[1:].strip())}</span>'
            elif p_.startswith('stock'):
                partes.remove(p_)
                nst = p_.count('▢')
                extra += f'<span class="stock">stock {"<span class=cas></span>" * nst}</span>'
        lugar = ' · '.join(partes)
        meta = f'<div class="meta"><span class="lugar">{inline_previo(esc(lugar))}</span>{extra}</div>'
        lineas = lineas[1:]
    cuerpo_html = pulir(render('\n'.join(lineas)))
    tipo = 'evento' if id_[0] == 'e' else 'regla'
    clases = ['entrada', tipo] + list(clases_extra)
    if '★' in cuerpo:
        clases.append('hito')
    num = id_[1:]
    emb = ''
    titulo = re.sub(r'\*([^*]+)\*', r'<em class="t-nota">\1</em>', inline_previo(esc(n['titulo'])))
    return (f'<section class="{" ".join(clases)}" id="{id_}" data-num="{id_}">'
            f'<header class="cab"><span class="num"><span class="pfx">{id_[0]}</span>{num}</span>'
            f'<h3 class="tit" data-marca="{id_} · {esc(n["titulo"].replace('*', ''))}">{emb}{titulo}</h3></header>{meta}'
            f'<div class="texto">{cuerpo_html}</div></section>')


# --------------------------------------------------------------------------- composición

class Libro:
    def __init__(self, nodos):
        self.nodos = nodos
        self.out = []
        self.indice = []       # (nivel, titulo, ancla)
        self.parte = ''
        self.col = None        # clase de columnas abierta
        self.capitulo = None
        self.remates = []
        self.remates_parte = []
        self.fincols = []      # finales de flujo a dos columnas: el hueco de la columna corta se rellena

    # -- columnas
    def abrir_col(self, clase):
        # la apertura es perezosa: el <div> solo se escribe con el primer contenido
        if self.col != clase:
            self.cerrar_col()
            self.col = clase
            self.col_vacia = True

    def cerrar_col(self):
        if self.col:
            if not getattr(self, 'col_vacia', False):
                if self.col == 'col2' and not self.oscuro_abierto_now():
                    self.out.append(f'@@FINCOL{len(self.fincols)}@@')
                    self.fincols.append((self.parte, getattr(self, 'cap_titulo', ''), getattr(self, 'ultimo_id', '')))
                self.out.append('</div>')
            self.col = None
            self.col_vacia = False

    def oscuro_abierto_now(self):
        return getattr(self, 'oscuro_abierto', False)

    def poner(self, h):
        if self.col and self.col_vacia:
            self.out.append(f'<div class="flujo {self.col}">')
            self.col_vacia = False
        self.out.append(h)

    def ancho(self, h, remate=True):
        """Bloque a toda anchura: cierra las columnas y las reabre después.

        Antes deja una marca de remate: si el bloque no cabe y salta de página,
        el hueco que deja se rellena en la segunda pasada."""
        ultimo = self.out[-1].lstrip() if self.out else ''
        if remate and ultimo and not ultimo.startswith('@@REMATE') and not ultimo.startswith('<header') \
                and not ultimo.startswith('<div class="grupo'):
            self.remate()
        clase = self.col
        self.cerrar_col()
        self.out.append(h)
        if clase:
            self.abrir_col(clase)

    # -- portada y preliminares
    def preliminares(self, cuerpo_portada):
        epi = ''
        m = re.findall(r'^> ?(.*)$', '\n'.join(cuerpo_portada), re.M)
        if m:
            versos = '<br/>'.join(inline_previo(esc(x)).replace('*', '') if '*' not in x else
                                  re.sub(r'\*([^*]+)\*', r'<em>\1</em>', esc(x)) for x in m if x.strip())
            epi = f'<p>{versos}</p>'
        self.out.append(f'''
<section class="portada">
  {img('portada.jpg', '50% 100%', 'portada-img')}
  <div class="portada-titulo">
    <div class="portada-kicker">Un juego de rol en solitario</div>
    <h1 class="portada-nombre">Cuarentena</h1>
    <div class="portada-sub">Cuarenta días encerrados. Después, la Marea.</div>
  </div>
  <div class="portada-cinta">Tolme · Día 0 · Zona sellada</div>
</section>
<section class="pagina-epigrafe"><div class="epi-centro">{icono('radio', 'epi-ico')}{epi}</div></section>
<section class="pagina-creditos">
  <div class="cred-titulo">Cuarentena</div>
  <div class="cred-sub">Un juego de rol en solitario de supervivencia en una ciudad sellada</div>
  <div class="cred-franja"></div>
  <p>Para jugar necesitás este libro, una baraja española de 40 cartas, tres dados de seis caras, un lápiz y las hojas
  de los Apéndices. Cada número del libro es un enlace: tocá <b>e001</b> en el índice y empezá.</p>
  <p class="cred-peq">Edición 1.0 · 2026<br/>Ilustraciones creadas con ayuda de Gemini a partir de la dirección de arte del manual.<br/>
  Tipografías: Spectral, Anton, PT Sans Narrow, IBM Plex Mono (SIL Open Font License) y Special Elite (Apache 2.0).</p>
  <p class="cred-peq">Podés imprimir las hojas de los Apéndices para uso personal.</p>
  <div class="cred-sello"><img src="arte/marca/utopia-logo.png" alt="UtopIA"/><div class="cred-sello-txt">Una publicación de UtopIA</div></div>
</section>
<nav class="indice" id="indice"><h2 class="indice-tit" data-titulo="Índice">Índice</h2>
<div class="indice-cuerpo">@@INDICE@@</div></nav>
''')

    def indice_html(self):
        filas = []
        for nivel, titulo, ancla in self.indice:
            if nivel == 1:
                filas.append(f'<div class="ix-parte"><a href="#{ancla}">{esc(titulo)}</a></div>')
            else:
                filas.append(f'<div class="ix-cap"><a href="#{ancla}"><span class="ix-t">{esc(titulo)}</span></a></div>')
        return '\n'.join(filas)

    # -- partes
    def parte_html(self, n):
        self.cerrar_col()
        cfg = X.PARTES.get(n['titulo'], {})
        nombre = cfg.get('nombre', n['titulo'].title())
        ancla = 'parte-' + slug(nombre)
        self.parte = nombre
        self.indice.append((1, f'{cfg.get("numero", "")} · {nombre}', ancla))
        cita = cita_html(cfg.get('cita'), 'cita-parte')
        if cfg.get('lamina'):
            self.arte_actual = cfg['lamina']
            self.out.append(
                f'<section class="lamina lamina-parte" id="{ancla}" data-parte="{esc(nombre)}">'
                f'{img(cfg["lamina"], cfg.get("pos", "50% 50%"), "lamina-img")}<div class="velo-abajo"></div>'
                f'<div class="parte-rot"><div class="parte-num">{cfg.get("numero", "")}</div>'
                f'<h1 class="parte-tit" data-marca="{esc(nombre)}">{esc(nombre)}</h1>{cita}</div></section>')
        else:
            self.out.append(
                f'<section class="parte-sola" id="{ancla}" data-parte="{esc(nombre)}">'
                f'<div class="parte-num">{cfg.get("numero", "")}</div>'
                f'<h1 class="parte-tit" data-marca="{esc(nombre)}">{esc(nombre)}</h1>{cita}</section>')

    # -- capítulos
    def capitulo_html(self, n):
        self.cerrar_col()
        titulo = n['titulo']
        self.cap_titulo = titulo
        intro = '\n'.join(n.get('cuerpo', [])).strip()
        m_reg = re.match(r'Barrio (\d+) · (.+)', titulo)
        if m_reg:
            return self.barrio_html(n, int(m_reg.group(1)), m_reg.group(2), intro)
        cfg = X.CAPITULOS.get(f"{n['archivo']}:{titulo}") or X.CAPITULOS.get(titulo, {'maqueta': 'dos'})
        self.capitulo = cfg
        ancla = 'cap-' + slug(titulo)
        self.indice.append((2, titulo, ancla))
        maq = cfg.get('maqueta', 'dos')
        self.arte_actual = (cfg.get('lamina') or cfg.get('banda') or (None,))[0]
        if maq in ('hoja', 'mapa'):
            return self.hoja_html(titulo, ancla, intro, maq)
        if cfg.get('doble'):
            arte, pos = cfg['doble']
            self.out.append(f'<section class="lamina doble doble-izq">{img(arte, "0% 50%", "lamina-img doble-img")}</section>'
                            f'<section class="lamina doble doble-der">{img(arte, "100% 50%", "lamina-img doble-img")}'
                            f'<div class="velo-abajo suave"></div>'
                            f'<div class="lamina-rot"><div class="lamina-kicker">{esc(self.parte)}</div>'
                            f'<div class="lamina-tit">{esc(titulo)}</div></div></section>')
            self.arte_actual = arte
        if cfg.get('lamina') or cfg.get('banda'):
            self.arte_actual = (cfg.get('lamina') or cfg.get('banda'))[0]
        if cfg.get('lamina'):
            arte, pos = cfg['lamina']
            self.out.append(f'<section class="lamina lamina-cap">{img(arte, pos, "lamina-img")}'
                            f'<div class="velo-abajo suave"></div>'
                            f'<div class="lamina-rot"><div class="lamina-kicker">{esc(self.parte)}</div>'
                            f'<div class="lamina-tit">{esc(titulo)}</div></div></section>')
        clases = ['cap-cab', 'maq-' + maq]
        banda = ''
        if cfg.get('banda'):
            arte, pos = cfg['banda']
            clases.append('con-banda')
            if cfg.get('banda_alta'):
                clases.append('banda-alta')
            banda = f'<div class="banda">{img(arte, pos)}</div>'
        if cfg.get('lamina') or (cfg.get('banda') and cfg.get('salto')) or cfg.get('doble') or maq in ('oscuro', 'finales', 'tres', 'mundo'):
            clases.append('salto')
        if titulo in ('Índice de Marcas',):
            intro = ''      # su cuerpo lo compone una función propia
        intro_html = pulir(render(intro)) if intro else ''
        envol = 'oscuro' if maq == 'oscuro' else ''
        if envol:
            self.out.append('<div class="zona-oscura">')
            self.oscuro_abierto = True
        self.out.append(
            f'<header class="{" ".join(clases)}" id="{ancla}" data-titulo="{esc(titulo)}">{banda}'
            f'<div class="cap-kicker">{esc(self.parte)}</div><h2 class="cap-tit" data-marca="{esc(titulo)}">{esc(titulo)}</h2>'
            f'{cita_html(cfg.get("cita"))}<div class="cap-intro">{intro_html}</div></header>')
        self.abrir_col({'dos': 'col2', 'tres': 'col3', 'una': 'col1', 'oscuro': 'col2',
                        'finales': 'col1 finales', 'mundo': 'col1 mundo'}[maq])

    def barrio_html(self, n, num, nombre, intro):
        b = X.BARRIOS[nombre]
        ancla = 'barrio-' + slug(nombre)
        self.indice.append((2, f'Barrio {num} · {nombre}', ancla))
        self.capitulo = {'maqueta': 'barrio'}
        self.arte_actual = b['arte']
        lema = re.sub(r'^\*(.*)\*$', r'\1', intro.strip())
        self.out.append(
            f'<header class="cap-cab barrio-cab con-banda" id="{ancla}" data-titulo="Barrio {num} · {esc(nombre)}">'
            f'<div class="banda">{img(b["arte"], b["pos"])}</div>'
            f'<div class="barrio-ficha"><div class="bf-num"><span>Barrio</span>{num}</div>'
            f'<div class="bf-datos"><h2 class="cap-tit barrio-tit" data-marca="Barrio {num} · {esc(nombre)}">{esc(nombre)}</h2>'
            f'<div class="bf-lema">{esc(lema)}</div></div></div></header>')
        self.barrio_pendiente = True

    def hoja_html(self, titulo, ancla, intro, maq):
        if maq == 'mapa':
            self.out.append(pagina_mapa(ancla, titulo, intro))
        else:
            cuerpo = pulir(render(intro))
            self.out.append(f'<section class="hoja" id="{ancla}" data-titulo="{esc(titulo)}">'
                            f'<div class="h-cab"><div class="h-tit">{esc(titulo)}</div>{icono("lapiz", "h-ico")}</div>'
                            f'{cuerpo}</section>')
        self.saltar_cuerpo = True

    # -- recorrido
    def componer(self):
        nodos = self.nodos
        self.saltar_cuerpo = False
        self.barrio_pendiente = False
        self.oscuro_abierto = False
        grupo_actual = ''
        i = 0
        # portada
        if nodos and nodos[0]['tipo'] == 'parte' and nodos[0]['titulo'] == 'CUARENTENA':
            cuerpo = nodos[0].get('cuerpo', [])
            # el «Índice» del md se sustituye por uno generado
            j = 1
            while j < len(nodos) and nodos[j]['archivo'] == '00-portada.md':
                cuerpo += nodos[j].get('cuerpo', []) if nodos[j]['tipo'] == 'grupo' else []
                j += 1
            self.preliminares(cuerpo)
            i = j
        while i < len(nodos):
            n = nodos[i]
            t = n['tipo']
            if t == 'parte':
                self.remate()
                self.cerrar_oscuro()
                self.saltar_cuerpo = False
                self.parte_html(n)
            elif t == 'capitulo':
                self.remate()
                self.cerrar_oscuro()
                self.saltar_cuerpo = False
                grupo_actual = ''
                self.capitulo_html(n)
                if n['titulo'] == 'Índice de Marcas':
                    self.indice_marcas(n)
                    self.saltar_cuerpo = True
            elif self.saltar_cuerpo:
                pass
            elif t == 'grupo':
                grupo_actual = n['titulo']
                self.grupo_html(n)
            elif t == 'entrada':
                self.entrada(n, grupo_actual)
            i += 1
        self.remate()
        self.cerrar_col()
        self.cerrar_oscuro()
        self.out.append('@@DIARIO@@')
        self.out.append(contratapa())
        cuerpo = '\n'.join(self.out).replace('@@INDICE@@', self.indice_html())
        return cuerpo

    def tras_salto(self):
        """¿Lo último escrito obliga a saltar de página? Entonces no hay hueco que rellenar."""
        for trozo in reversed(self.out):
            t = trozo.strip()
            if not t or t == '</div>' or t.startswith('@@REMATE'):
                continue
            return bool(re.search(r'class="(?:lamina|pagina-prota|hoja|parte-sola|pagina-mapa|pagina-epigrafe|portada|'
                                  r'pagina-creditos|indice|contratapa|diario|doble)', t[:400] if not t.startswith('</') else t[-1:])) \
                or 'pagina-prota' in t[:200]
        return True

    def remate(self):
        """Marca el final de una sección: en la segunda pasada, el hueco se rellena con una viñeta."""
        if self.tras_salto():
            return
        clase = self.col
        self.cerrar_col()
        k = len(self.remates)
        self.remates.append(getattr(self, 'arte_actual', None)); self.remates_parte.append(getattr(self, 'parte', ''))
        self.out.append(f'@@REMATE{k}@@')
        if clase:
            self.abrir_col(clase)

    def cerrar_oscuro(self):
        if self.oscuro_abierto:
            self.cerrar_col()
            self.out.append('</div>')
            self.oscuro_abierto = False

    def grupo_html(self, n):
        t = n['titulo']
        cuerpo = pulir(render('\n'.join(n.get('cuerpo', [])).strip())) if n.get('cuerpo') else ''
        cap = self.capitulo or {}
        if cap.get('maqueta') == 'mundo':
            return self.ancho(f'<article class="doc"><h3 class="doc-tit">{esc(t)}</h3><div class="doc-cuerpo">{cuerpo}</div></article>')
        if t in X.FACCIONES:
            return self.ancho(f'<div class="grupo grupo-faccion">{emblema(X.FACCIONES[t])}<div><div class="g-kicker">Facción</div>'
                              f'<h3 class="g-tit">{esc(t)}</h3>{cuerpo}</div></div>')
        if cap.get('maqueta') == 'dos' and self.parte == 'Apéndices':
            self.poner(f'<h3 class="g-caja">{esc(t)}</h3>{cuerpo}')
            return
        if n.get('nivel') == 2:
            # apartado de un capítulo grande (las historias, el catálogo, los epílogos…)
            return self.ancho(f'<div class="grupo grupo-apartado"><h3 class="g-tit">{esc(t)}</h3>{cuerpo}</div>')
        self.ancho(f'<div class="grupo grupo-simple"><h3 class="g-tit">{esc(t)}</h3>{cuerpo}</div>')

    def entrada(self, n, grupo):
        id_ = n['id']
        self.ultimo_id = id_
        if self.barrio_pendiente and id_ in X.LLEGAR:
            self.barrio_pendiente = False
            self.ancho(f'<div class="tabla-region">{entrada_html(n, ["entrada-tabla"])}</div>')
            self.abrir_col('col2')
            return
        if self.barrio_pendiente:
            self.barrio_pendiente = False
            self.abrir_col('col2')
        extra = []
        if (self.capitulo or {}).get('maqueta') == 'finales':
            extra.append('final')
        h = entrada_html(n, extra)
        if 'mapa-col' in h and '<div class="tabla-env' in h:
            # si la tabla no cabe bajo el mapa y salta, el hueco que deja también se rellena
            k = len(self.remates)
            self.remates.append(getattr(self, 'arte_actual', None)); self.remates_parte.append(getattr(self, 'parte', ''))
            h = h.replace('<div class="tabla-env', f'@@REMATE{k}@@<div class="tabla-env', 1)
        primera = re.search(r'<tr>(.*?)</tr>', h, re.S)
        anchas = primera and primera.group(1).count('<th') >= 4
        if (('tabla-env larga' in h or anchas) and self.col in ('col2', 'col3')) or (id_ in X.ANCHAS and self.col in ('col2', 'col3')):
            if '@@REMATE' not in h and '<div class="tabla-env' in h:
                # a toda anchura, si la tabla no cabe y salta de página, el hueco que deja se rellena
                k = len(self.remates)
                self.remates.append(getattr(self, 'arte_actual', None)); self.remates_parte.append(getattr(self, 'parte', ''))
                tabla = h.find('<div class="tabla-env')
                previo = h.rfind('<p class="pre-tabla"', 0, tabla)
                pegado = previo >= 0 and not h[h.find('</p>', previo) + 4:tabla].strip()
                donde = previo if pegado else tabla
                antes = re.sub(r'<[^>]+>', '', h[h.find('<div class="texto">'):donde]).strip()
                if len(antes) > 250:     # solo si la tabla va tras texto de verdad; si no, salta la entrada entera
                    h = h[:donde] + f'@@REMATE{k}@@' + h[donde:]
                else:
                    self.remates.pop(); self.remates_parte.pop()
            self.ancho(h)      # las tablas largas no caben bien en media columna
        else:
            self.poner(h)
        if id_ in X.CAJAS:
            self.poner(caja_html(id_))
        if self.col == 'col2' and not self.oscuro_abierto_now() and not self.col_vacia:
            # si la entrada siguiente salta de columna o de página, el pie de esta columna se rellena
            self.poner(f'@@FINCOL{len(self.fincols)}@@')
            self.fincols.append((self.parte, getattr(self, 'cap_titulo', ''), id_))
        if id_ in X.CITAS_SUELTAS:
            self.ancho(cita_html(X.CITAS_SUELTAS[id_], 'cita-suelta'))
        if id_ in X.FIGURAS:
            arte, pos, pie = X.FIGURAS[id_]
            self.ancho(f'<figure class="figura-ancha">{img(arte, pos)}<figcaption>{esc(pie)}</figcaption></figure>')

    def indice_marcas(self, n):
        filas = []
        for ln in n.get('cuerpo', []):
            m = re.match(r'\|\s*`([^`]+)`\s*\|(.*)\|\s*$', ln)
            if m:
                refs = re.findall(r'\[([er]\d{3})\]', m.group(2))
                r = ' '.join(f'<a class="ref ref-{x[0]}" href="#{x}">{x}</a>' for x in refs)
                v = re.match(r'\s*\*\*(\d)\*\*', m.group(2))
                if v:
                    r = f'<span class="im-v">{v.group(1)}</span> ' + r
                filas.append(f'<p class="im"><span class="marca">{esc(m.group(1)).replace("_", "_<wbr>")}</span> {r}</p>')
        intro = [ln for ln in n.get('cuerpo', []) if ln.startswith('*')]
        self.cerrar_col()
        if intro:
            self.out.append(f'<p class="im-intro">{esc(intro[0].strip("*"))}</p>')
        self.abrir_col('col3 im-flujo')
        for f in filas:
            self.poner(f)


# --------------------------------------------------------------------------- hojas

def casillas(n, clase='c'):
    return ''.join(f'<span class="{clase}"></span>' for _ in range(n))


def escala(desde, hasta):
    return ''.join(f'<span class="n">{i}</span>' for i in range(desde, hasta + 1))


def pagina_diario(k):
    filas = ''.join(f'<tr><td class="dd-n"></td><td></td><td></td><td></td><td class="dd-txt"></td></tr>' for _ in range(13))
    return (f'<section class="hoja diario" data-titulo="Diario de la cuarentena"><div class="h-cab"><div class="h-tit">Diario de la cuarentena</div>'
            f'{icono("lapiz", "h-ico")}</div><table class="diario-t"><tr><th>Día</th><th>Carta</th><th>Barrio</th>'
            f'<th>Rastro</th><th>Qué pasó</th></tr>{filas}</table></section>')


def contratapa():
    datos = [('hora', '40 días'), ('mapa', '12 barrios'), ('grupo', '18 sobrevivientes'), ('ejemplo', '520 eventos'),
             ('refugio', '6 refugios')]
    fila = ''.join(f'<div class="ct-dato">{icono(i)}<span>{esc(t)}</span></div>' for i, t in datos)
    return f'''
<section class="contratapa">
  {img('contratapa.jpg', '50% 30%', 'portada-img')}
  <div class="ct-texto">
    <div class="ct-titulo">Cuarentena</div>
    <p class="ct-gancho">Cuarenta días encerrados. Después, la Marea.</p>
    <p>Tolme está sellada. El Comando cerró los puentes, cortó los teléfonos y levantó un muro de contenedores alrededor
    de la ciudad. La radio repite que la ayuda llegará. Afuera, toda la región se convirtió, y camina hacia el único lugar
    que todavía hace ruido.</p>
    <p>Elegí un refugio, juntá a la gente que encuentres, saqueá lo que quede, fabricá lo que falte y prepará cada puerta
    y cada ventana. Una baraja española marca los días. Cuando salga la última carta, llega la <b>Marea</b>.</p>
    <div class="ct-datos">{fila}</div>
    <p class="ct-pie">Un juego de rol en solitario · Necesitás una baraja española, tres dados de seis caras, un lápiz y este libro</p>
  </div>
  <img class="ct-sello" src="arte/marca/utopia-logo-claro.png" alt="UtopIA"/>
</section>'''


def pagina_mapa(ancla, titulo, intro):
    texto = pulir(render(intro))
    return (f'<section class="pagina-mapa" id="{ancla}" data-titulo="{esc(titulo)}"><div class="pm-tit">{esc(titulo)}</div>'
            f'{svg_mapa("mapa mapa-grande")}<div class="pm-texto">{texto}</div></section>')


# --------------------------------------------------------------------------- salida

PX_MM = 25.4 / 96
DEPURA = False
ZOOM_A4 = 210 / 170
PAGINAS = 200


def medir_huecos(documento):
    """Para cada marca de remate, el espacio libre (mm) que queda debajo en su página, si no hay nada más."""
    from weasyprint.formatting_structure import boxes as B
    huecos = {}
    for pagina in documento.pages:
        caja = pagina._page_box
        fondo = caja.content_box_y() + caja.height
        raiz = caja.children[0] if caja.children else None
        if raiz is None:
            continue
        marcas, contenido = [], []
        for b in raiz.descendants():
            el = getattr(b, 'element', None)
            ident = el.get('id', '') if el is not None else ''
            if ident.startswith('remate-') and isinstance(b, B.BlockBox):
                if (b.position_y - caja.content_box_y()) * PX_MM > 6:   # arriba del todo: no hay hueco que tapar
                    marcas.append((int(ident[7:]), b.position_y))
            elif isinstance(b, (B.LineBox, B.ReplacedBox)) or (isinstance(b, B.BlockBox) and b.height and
                                                                 b.style['background_color'][3] > 0):
                contenido.append(b.position_y)
        libres = [(y, k) for k, y in marcas if not any(c > y + 1 for c in contenido)]
        if libres:                      # varias marcas seguidas: solo la última
            y, k = max(libres)
            huecos[k] = (fondo - y) * PX_MM
    return huecos


def medir_fincols(documento):
    """Para cada marca de pie de columna (tras una entrada o al final de un flujo a dos columnas):
    el hueco (mm) que queda debajo en su columna si no hay nada más en ella."""
    from weasyprint.formatting_structure import boxes as B
    huecos = {}
    for pagina in documento.pages:
        for flujo in pagina._page_box.descendants():
            el = getattr(flujo, 'element', None)
            if not isinstance(flujo, B.BlockBox) or el is None or 'flujo' not in (el.get('class') or '') \
                    or getattr(flujo, 'is_column', False):
                continue
            cols = [c for c in flujo.children if getattr(c, 'is_column', False)]
            if not cols or (len(cols) < 2 and 'col2' not in (el.get('class') or '')):
                continue
            fondo = max(c.position_y + c.height for c in cols)
            for i, c in enumerate(cols):
                marcas, contenido = [], []
                for b in c.descendants():
                    e = getattr(b, 'element', None)
                    ident = (e.get('id') or '') if e is not None else ''
                    if ident.startswith('fincol-') and isinstance(b, B.BlockBox):
                        marcas.append((b.position_y, int(ident[7:])))
                    elif isinstance(b, (B.LineBox, B.ReplacedBox)) or (isinstance(b, B.BlockBox) and b.height and
                                                                         b.style['background_color'][3] > 0):
                        contenido.append(b.position_y + b.height)
                libres = [(y, k) for y, k in marcas if not any(t > y + 1 for t in contenido)]
                if not libres:
                    continue
                y, k = max(libres)
                resto = cols[i + 1:]
                vacias = len(cols) == 1 or resto and not any(
                    isinstance(d, (B.LineBox, B.ReplacedBox)) for r in resto for d in r.descendants())
                if vacias:          # la columna siguiente se quedó vacía: el hueco es la columna entera
                    huecos[k] = ((fondo - cols[0].position_y) * PX_MM, 'vacia')
                else:
                    huecos[k] = ((fondo - y) * PX_MM, 'corta')
    return huecos


def desbordados(documento):
    """Rellenos que han acabado al principio de una página o de una columna: ya no tapan ningún hueco."""
    from weasyprint.formatting_structure import boxes as B
    malos = set()
    for pagina in documento.pages:
        caja = pagina._page_box
        tope = caja.content_box_y()
        visto_texto = False
        raices = [h for h in caja.children if not isinstance(h, B.MarginBox)]
        for b in (d for r in raices for d in r.descendants()):
            el = getattr(b, 'element', None)
            ident = (el.get('id') or '') if el is not None else ''
            if ident.startswith('rm-') and isinstance(b, (B.BlockBox, B.FlexBox)) and \
                    ((b.position_y - tope) * PX_MM < 4 or not visto_texto):
                malos.add(ident)
            if isinstance(b, (B.LineBox, B.ReplacedBox)) and not (ident.startswith('rm-')):
                anc = b
                visto_texto = True
            if getattr(b, 'is_column', False):
                hijos = [h for h in b.descendants() if isinstance(h, (B.LineBox, B.ReplacedBox)) or
                         (getattr(h, 'element', None) is not None and (h.element.get('id') or '').startswith('rc-'))]
                if hijos and not isinstance(hijos[0], (B.LineBox, B.ReplacedBox)) \
                        and 'vacia' not in (hijos[0].element.get('class') or ''):
                    malos.add(hijos[0].element.get('id'))
    return malos


RE_BLOQUE = re.compile(r'<(p|li|section|blockquote)(?=[\s>])|<(?:div|aside) (?=class="(?:caja|tabla-env|enemigo|cita-suelta|figura-ancha|mapa-col)[\s"])')


def marcar_bloques(html_):
    """Etiqueta (data-b) los bloques que pueden empezar una columna con una clave estable:
    la entrada en la que están y su posición contando desde el final de la entrada."""
    RE_SEC = re.compile(r'<section class="entrada[^"]*" id="([^"]+)"')
    secs = [(m.start(), m.group(1)) for m in RE_SEC.finditer(html_)]
    marcas = list(RE_BLOQUE.finditer(html_))
    import bisect
    starts = [x for x, _ in secs]
    grupo = [-2 if m.group(1) == 'section' else bisect.bisect_right(starts, m.start()) - 1 for m in marcas]
    total = {}
    for g in grupo:
        total[g] = total.get(g, 0) + 1
    visto, trozos, ult = {}, [], 0
    for m, g in zip(marcas, grupo):
        visto[g] = visto.get(g, 0) + 1
        if g == -2:
            clave = RE_SEC.match(html_, m.start()).group(1) + '~S' if RE_SEC.match(html_, m.start()) else f'sec~{visto[g]}'
        else:
            clave = f'{secs[g][1] if g >= 0 else "inicio"}~{total[g] - visto[g]}'
        trozos.append(html_[ult:m.end()])
        trozos.append((' ' if m.group(1) else '') + f'data-b="{clave}"' + ('' if m.group(1) else ' '))
        ult = m.end()
    trozos.append(html_[ult:])
    return ''.join(trozos)


def fijar_cortes(documento):
    """Para cada último tramo de un flujo a dos columnas: el bloque que abre la 2.ª columna,
    para fijar ahí el corte (así lo que se añada a una columna no desplaza la otra)."""
    from weasyprint.formatting_structure import boxes as B
    contenedores = []
    for pi, pagina in enumerate(documento.pages):
        for b in pagina._page_box.descendants():
            if any(getattr(h, 'is_column', False) for h in getattr(b, 'children', [])):
                contenedores.append((pi, b))
    cortes, sin = [], 0
    for n, (pi, cont) in enumerate(contenedores):
        if any(c.element is cont.element for _, c in contenedores[n + 1:]):
            continue
        cols = sorted([h for h in cont.children if getattr(h, 'is_column', False)], key=lambda c: c.position_x)
        if len(cols) != 2:
            continue
        en1 = {getattr(h, 'element', None) for h in cols[0].descendants()}
        for h in cols[1].descendants():
            el = getattr(h, 'element', None)
            if el is None or not isinstance(h, B.BlockLevelBox) or not el.get('data-b'):
                continue
            if el in en1:
                sin += 1          # la 2.ª columna empieza con un bloque partido: no se puede fijar
                break
            if el.tag in ('p', 'li', 'section', 'blockquote'):
                cortes.append(el.get('data-b'))
            else:
                sin += 1          # recuadros y tablas: WeasyPrint los estira si se fuerza el corte delante
            break
    return cortes, sin


def equilibrar(documento, minimo=3.0):
    """Busca, en cada final de flujo a dos columnas, el bloque ante el que conviene cortar la columna
    para que las dos terminen a la misma altura. Devuelve {data-b: mejora en mm}."""
    from weasyprint.formatting_structure import boxes as B
    PEGA = ('cab', 'meta', 'pre-tabla', 'cap-cab', 'grupo', 'region-cab', 'bt-cab')

    def clases(b):
        el = getattr(b, 'element', None)
        return ((el.get('class') or '').split() if el is not None else []), (el.tag if el is not None else '')

    def fondo(c):
        m = None
        for h in c.descendants():
            if isinstance(h, (B.LineBox, B.ReplacedBox)) or (isinstance(h, B.BlockBox) and h.height and
                                                            h.style['background_color'][3] > 0):
                y = h.position_y + h.margin_height()
                m = y if m is None else max(m, y)
        return m

    def candidatos(caja, vistos, out):
        hijos = list(caja.children) if hasattr(caja, 'children') else []
        for i, h in enumerate(hijos):
            if not isinstance(h, B.BlockLevelBox):
                continue
            el = getattr(h, 'element', None)
            b = el.get('data-b') if el is not None else None
            cl, tag = clases(h)
            previo = hijos[i - 1] if i else None
            pcl, ptag = clases(previo) if previo is not None else ([], '')
            pegado = previo is not None and (any(c in PEGA for c in pcl) or ptag in ('h2', 'h3', 'h4', 'header'))
            if b and i > 0 and not pegado and b not in vistos and not isinstance(h, B.TableBox):
                out.append((h.position_y, b))
            if b:
                vistos.add(b)
            if h.style['break_inside'] in ('avoid', 'avoid-column') or isinstance(h, (B.TableBox)):
                continue
            candidatos(h, vistos, out)

    contenedores = []
    for pi, pagina in enumerate(documento.pages):
        for b in pagina._page_box.descendants():
            if any(getattr(h, 'is_column', False) for h in getattr(b, 'children', [])):
                contenedores.append((pi, b))
    cortes = {}
    for n, (pi, cont) in enumerate(contenedores):
        if any(c.element is cont.element for _, c in contenedores[n + 1:]):
            continue                      # el flujo sigue en otra página: no es su último tramo
        cols = sorted([h for h in cont.children if getattr(h, 'is_column', False)], key=lambda c: c.position_x)
        if len(cols) != 2:
            continue
        tope = cols[0].position_y
        f1, f2 = fondo(cols[0]), fondo(cols[1])
        if f1 is None or f2 is None:
            continue
        L1, L2 = f1 - tope, f2 - tope
        if abs(L1 - L2) * PX_MM <= minimo:
            continue
        vistos, c1, c2 = set(), [], []
        candidatos(cols[0], vistos, c1)
        candidatos(cols[1], vistos, c2)
        # el primer bloque de la 2.ª columna no se puede elegir (ya empieza ahí)
        opciones = [(y - tope, b) for y, b in c1 if y - tope > 8 / PX_MM] + \
                   [(L1 + y - tope, b) for y, b in c2 if y - tope > 1]
        T = L1 + L2
        actual = max(L1, L2)
        mejor = min(opciones, key=lambda o: max(o[0], T - o[0]), default=None)
        if DEPURA:
            print('EQ', pi + 1, round(L1 * PX_MM, 1), round(L2 * PX_MM, 1), len(c1), len(c2), [(round(o[0] * PX_MM), o[1]) for o in opciones][:12])
        if mejor and (actual - max(mejor[0], T - mejor[0])) * PX_MM > 2.5:
            cortes[mejor[1]] = round((actual - max(mejor[0], T - mejor[0])) * PX_MM, 1)
    return cortes


class Rellenos:
    """Elige qué poner en cada hueco: viñeta (casi siempre sola), alguna cita suelta o nada."""
    CADA_CITA = 12
    def __init__(self, contexto, partes=None):
        self.contexto = contexto
        self.partes = partes or []
        self.i_panel = 3
        self.ultimo = None
        self.i_cita = 0
        self.i_arte = 0
        self.i_corta = 7
        self.n_arte = self.n_cita = 0
        self.k_cita = -99

    def cita(self):
        c = X.REMATES[self.i_cita % len(X.REMATES)]
        self.i_cita += 1
        return c

    def html(self, k, mm):
        """Los huecos pequeños se quedan con aire. Las citas de cierre son pocas y espaciadas
        (como mucho una cada CADA_CITA finales de sección); las viñetas van casi siempre solas."""
        if os.environ.get('DEPURA_RELLENOS'):
            print('RELL', k, self.partes[k] if k < len(self.partes) else '', self.contexto[k], round(mm, 1), self.k_cita, self.i_arte, self.i_cita)
        if mm < 42:
            return ''
        cita_ok = k - self.k_cita >= self.CADA_CITA
        alto = mm - 6
        if mm < 80:
            if 'Reglas' in str(self.partes[k] if k < len(self.partes) else '') and not cita_ok:
                return self.tarjetas(alto)      # en las reglas, una franja de consulta rápida
            if not cita_ok:
                return ''
            self.k_cita = k
            self.n_cita += 1
            texto, autor = self.cita()
            q = (f'<blockquote class="remate-cita"><div class="rc-orn">{icono("rombo")}</div>'
                 f'<p>{esc(texto)}</p><cite>{esc(autor)}</cite></blockquote>')
            return f'<div class="remate solo-cita" style="height:{alto:.1f}mm">{q}</div>'
        evitar = {self.contexto[k], self.ultimo, *self.contexto[k + 1:k + 3]}
        while True:
            arte, pos = X.ARTE_REMATE[self.i_arte % len(X.ARTE_REMATE)]
            self.i_arte += 1
            if arte not in evitar:
                break
        self.ultimo = arte
        self.n_arte += 1
        if cita_ok and mm >= 110:
            self.k_cita = k
            self.n_cita += 1
            texto, autor = self.cita()
            q = (f'<blockquote class="remate-cita"><div class="rc-orn">{icono("rombo")}</div>'
                 f'<p>{esc(texto)}</p><cite>{esc(autor)}</cite></blockquote>')
            return (f'<div class="remate con-arte" style="height:{alto:.1f}mm">'
                    f'<div class="rm-img" style="height:{alto - 34:.1f}mm">{img(arte, pos)}</div>{q}</div>')
        return (f'<div class="remate con-arte solo-arte" style="height:{alto:.1f}mm">'
                f'<div class="rm-img" style="height:{alto - 2:.1f}mm">{img(arte, pos)}</div></div>')


def _tarjetas(self, alto):
    """Dos paneles de consulta rápida, uno por columna, que caben en el hueco."""
    elegidos, usados = [], getattr(self, 'paneles_usados', set())
    self.paneles_usados = usados
    for n in range(len(X.PANELES)):
        if len(elegidos) == 2:
            break
        ico, tit, filas, pie = X.PANELES[n]
        if tit in usados:
            continue
        if 11 + 5.1 * len(filas) + 3.6 * (len(pie) // 52 + 1) + 6 <= alto:
            f = ''.join(f'<tr><th>{esc(a)}</th><td>{esc(b)}</td></tr>' for a, b in filas)
            elegidos.append((tit, f'<aside class="panel"><div class="ar-cab">{icono(ico)}<span>{esc(tit)}</span></div>'
                            f'<table>{f}</table><p class="pn-pie">{pulir(render(pie))[3:-5]}</p></aside>'))
    if len(elegidos) < 2:
        return ''
    usados.update(t for t, _ in elegidos)
    self.n_panel = getattr(self, 'n_panel', 0) + 1
    return f'<div class="remate tarjetas">{"".join(h for _, h in elegidos)}</div>'


Rellenos.tarjetas = _tarjetas


class Recordatorios:
    """Rellena el pie de una columna corta. Varía según el sitio: ornamento, cita, panel de consulta,
    recordatorio (solo en las reglas) o viñeta con cita."""
    def __init__(self, contexto):
        self.contexto = contexto
        self.i_cita = 11
        self.i_panel = 0
        self.i_tira = 0
        self.i_rec = 0
        self.i_arte = 5
        self.turno = 0
        self.n = 0
        self.tipos = {}

    def _cita(self, larga=False):
        lista = [c for c in X.REMATES if len(c[0]) < (110 if larga else 75)]
        texto, autor = lista[self.i_cita % len(lista)]
        self.i_cita += 1
        return (f'<blockquote class="remate-cita cita-col"><div class="rc-orn">{icono("rombo")}</div>'
                f'<p>{esc(texto)}</p><cite>{esc(autor)}</cite></blockquote>')

    def _panel(self, alto):
        for _ in range(len(X.PANELES)):
            ico, tit, filas, pie = X.PANELES[self.i_panel % len(X.PANELES)]
            self.i_panel += 1
            necesita = 9 + 4.6 * len(filas) + 4.6 * (len(pie) // 48 + 1) + 4
            if necesita <= alto:
                f = ''.join(f'<tr><th>{esc(a)}</th><td>{esc(b)}</td></tr>' for a, b in filas)
                return (f'<aside class="panel"><div class="ar-cab">{icono(ico)}<span>{esc(tit)}</span></div>'
                        f'<table>{f}</table><p class="pn-pie">{pulir(render(pie))[3:-5]}</p></aside>')
        return ''

    def _recuerda(self, alto):
        for _ in range(len(X.RECORDATORIOS)):
            titulo, texto = X.RECORDATORIOS[self.i_rec % len(X.RECORDATORIOS)]
            self.i_rec += 1
            if 9.5 + 4.1 * (len(texto) // 44 + 1) <= alto:
                return (f'<aside class="recuerda-mini"><div class="caja-cab">{icono("recuerda")}<span>{esc(titulo)}</span></div>'
                        f'{pulir(render(texto))}</aside>')
        return ''

    def html(self, k, mm, tipo):
        parte, cap = self.contexto[k][:2]
        alto = mm - (3.5 if tipo == 'corta' else 2)
        if alto < 11:
            return ''
        clase, cuerpo, t = 'pie', '', ''
        # sin ornamentos ni citas en las columnas: solo paneles de consulta, recordatorios (reglas) o una viñeta
        if (36 <= alto < 62) or (tipo == 'vacia' and alto < 62) or (parte == 'Reglas' and 18 <= alto < 62):
            self.turno += 1
            opciones = ['panel', 'recuerda'] if parte == 'Reglas' else ['panel']
            t = opciones[self.turno % len(opciones)]
            cuerpo = self._panel(alto) if t == 'panel' else self._recuerda(alto)
            if not cuerpo and t == 'recuerda':
                cuerpo, t = self._panel(alto), 'panel'
            if not cuerpo and t == 'panel' and parte == 'Reglas':
                cuerpo, t = self._recuerda(alto), 'recuerda'
        elif 17 <= alto < 36:
            ico, tit, linea = X.TIRAS[self.i_tira % len(X.TIRAS)]
            if 7.5 + 4.3 * (len(linea) // 46 + 1) <= alto:
                self.i_tira += 1
                cuerpo = (f'<aside class="panel tira"><div class="ar-cab">{icono(ico)}<span>{esc(tit)}</span></div>'
                          f'<p class="pn-pie">{pulir(render(linea))[3:-5]}</p></aside>')
                t = 'tira'
        elif alto >= 62:
            nombre, pos = X.ARTE_REMATE[self.i_arte % len(X.ARTE_REMATE)]
            self.i_arte += 7
            cuerpo = f'<div class="rc-img" style="height:{alto - 4:.1f}mm">{img(nombre, pos)}</div>'
            t = 'viñeta'
        if not cuerpo:
            return ''
        if tipo == 'vacia':
            clase += ' vacia'
        self.n += 1
        self.tipos[t] = self.tipos.get(t, 0) + 1
        return f'<div class="relleno-col {clase}" style="height:{alto:.1f}mm">{cuerpo}</div>'


def asegurar_fuentes():
    """Registra las fuentes en fontconfig (para el SVG del mapa) si aún no lo están."""
    destino = os.path.expanduser('~/.local/share/fonts/cuarentena')
    if not os.path.isdir(destino):
        os.makedirs(destino, exist_ok=True)
        for f in glob.glob(os.path.join(RAIZ, 'fuentes', '*.ttf')):
            shutil.copy(f, destino)
        subprocess.run(['fc-cache', '-f', destino], check=False, capture_output=True)


def main():
    imprenta = '--imprenta' in sys.argv
    asegurar_fuentes()
    nodos = leer()
    libro = Libro(nodos)
    cuerpo = libro.componer()
    # un párrafo que presenta una lista («…elige una:») no se queda solo al pie de columna o de página
    cuerpo = re.sub(r'<p>((?:(?!</p>).){1,240}?:(?:</strong>|</em>|</b>)*)</p>(\s*<(?:ol|ul)[\s>])', r'<p class="pre-lista">\1</p>\2', cuerpo, flags=re.S)
    css_extra = ''
    if imprenta:
        css_extra = '<style>@page { bleed: 2.43mm; marks: crop cross; }</style>'   # 3 mm tras el zoom
    doc = (f'<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><title>Cuarentena</title>'
           f'<meta name="author" content="Cuarentena"/><meta name="description" content="Juego de rol en solitario"/>'
           f'<link rel="stylesheet" href="estilo.css"/>{css_extra}</head><body>{cuerpo}</body></html>')
    if '--html' in sys.argv:
        open(os.path.join(RAIZ, 'maqueta', 'manual.html'), 'w', encoding='utf-8').write(doc)
    from weasyprint import HTML
    salida = os.path.join(RAIZ, 'Cuarentena-imprenta.pdf' if imprenta else 'Cuarentena.pdf')
    # 1.ª pasada: medir el hueco que deja cada final de sección
    marcas = lambda d, f: re.sub(r'@@REMATE(\d+)@@', f, d)
    prueba = marcas(doc, lambda m: f'<div class="remate-marca" id="remate-{m.group(1)}"></div>').replace('@@DIARIO@@', '')
    prueba = re.sub(r'@@FINCOL(\d+)@@', lambda m: f'<div class="fincol-marca" id="fincol-{m.group(1)}"></div>', prueba)
    # 0.ª pasada: fijar dónde empieza cada 2.ª columna de los finales de flujo (maqueta/cortes.json)
    doc = marcar_bloques(doc)
    prueba = marcar_bloques(prueba)
    f_cortes = os.path.join(RAIZ, 'maqueta', 'cortes.json')
    if '--fijar-cortes' in sys.argv or not os.path.exists(f_cortes):
        cortes, sin = fijar_cortes(HTML(string=prueba, base_url=RAIZ).render())
        json.dump(cortes, open(f_cortes, 'w'), indent=0)
        print(f'Cortes de columna fijados: {len(cortes)} (sin fijar, por bloque partido: {sin})')
    cortes = set(json.load(open(f_cortes)))
    con_corte = lambda d: re.sub(r'data-b="([^"]+)"', lambda m: m.group(0) + (' data-corte=""' if m.group(1) in cortes else ''), d)
    doc, prueba = con_corte(doc), con_corte(prueba)
    documento = HTML(string=prueba, base_url=RAIZ).render()
    huecos = medir_huecos(documento)
    fincols = medir_fincols(documento)
    if os.environ.get('DEPURA_FINCOL'):
        json.dump(huecos, open('/tmp/claude-0/huecos.json', 'w'))
        json.dump({k: [v, libro.fincols[k] if k < len(libro.fincols) else None] for k, v in fincols.items()},
                  open('/tmp/claude-0/fincols.json', 'w'), default=str)
    # 2.ª pasada: rellenar los huecos con viñetas y citas
    rellenos = Rellenos(libro.remates, libro.remates_parte)
    def con_id(html_, ident):
        return re.sub(r'^<div class="', f'<div id="{ident}" class="', html_, count=1) if html_ else ''
    piezas = {}
    for m in re.finditer(r'@@REMATE(\d+)@@', doc):
        k = int(m.group(1))
        piezas[f'rm-{k}'] = con_id(rellenos.html(k, huecos.get(k, 0)), f'rm-{k}')
    recs = Recordatorios(libro.fincols)
    for m in re.finditer(r'@@FINCOL(\d+)@@', doc):
        k = int(m.group(1))
        piezas[f'rc-{k}'] = con_id(recs.html(k, *fincols.get(k, (0, 'corta'))), f'rc-{k}')
    print(f'Remates: {rellenos.n_arte} viñetas, {rellenos.n_cita} citas, {getattr(rellenos, "n_panel", 0)} franjas de consulta · pies de columna: {recs.tipos}')

    def montar():
        f = re.sub(r'@@REMATE(\d+)@@', lambda m: '<div class="remate-marca"></div>' + piezas[f'rm-{m.group(1)}'], doc)
        return re.sub(r'@@FINCOL(\d+)@@', lambda m: piezas[f'rc-{m.group(1)}'], f)
    # 3.ª pasada (y siguientes): un relleno que se ha ido arriba de la página o de la columna siguiente sobra
    for vuelta in range(4):
        final = montar()
        render_ = HTML(string=final.replace('@@DIARIO@@', ''), base_url=RAIZ).render()
        sobran = desbordados(render_)
        n = len(render_.pages)
        if not sobran:
            break
        print(f'  vuelta {vuelta + 1}: se quitan {len(sobran)} rellenos desplazados: {" ".join(sorted(sobran))}')
        for ident in sobran:
            piezas[ident] = ''
    faltan = PAGINAS - n
    if faltan < 0:
        print(f'AVISO: el libro tiene {n} páginas, {-faltan} más de las {PAGINAS} previstas')
    final = final.replace('@@DIARIO@@', ''.join(pagina_diario(k + 1) for k in range(max(faltan, 0))))
    print(f'Páginas sin diario: {n} · hojas de diario: {max(faltan, 0)}')
    if '--html' in sys.argv:
        open(os.path.join(RAIZ, 'maqueta', 'manual.html'), 'w', encoding='utf-8').write(final)
    # El libro se compone a 170 × 240,4 mm y se amplía a A4 (210 × 297 mm) en la salida.
    from colores import colorear
    final = colorear(final, open(os.path.join(RAIZ, 'estilo.css'), encoding='utf-8').read())
    HTML(string=final, base_url=RAIZ).write_pdf(salida, zoom=ZOOM_A4)
    print('PDF:', salida)


if __name__ == '__main__':
    main()
