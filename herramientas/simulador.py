#!/usr/bin/env python3
"""Simulador de Cuarentena: juega miles de partidas con un jugador automático.

Lee el libro (libro/*.md): las tablas de cada barrio, los lugares con su tipo y su
stock, las fichas de los refugios, las tablas de la Baraja y los eventos. Resuelve
las opciones de los eventos con un intérprete aproximado (pruebas `[Habilidad]`,
ramas 10+ / 7–9 / 6−, Víveres, materiales, Heridas, Ruido, Rastro, Moral, combates
«Callados ×N · Distancia», saltos → eXXX). El motor del día, el saqueo, el combate,
la Fiebre, el refugio, los puestos, el sondeo, el taller y la Noche 40 están
programados a mano siguiendo las reglas r100–r225.

No juega el libro entero (casi no sigue Marcas), pero mide el ritmo, la economía,
la mortalidad y, sobre todo, cuántas veces se llega vivo al amanecer del día 41.

Uso:
    python3 herramientas/simulador.py                  # 8000 partidas con protagonistas al azar (r100–r107)
    python3 herramientas/simulador.py -n 500 --oficio Salud --motivo 'La lista' --semilla 7
    python3 herramientas/simulador.py --traza          # narra una partida día a día
"""
import argparse, glob, os, random, re, statistics as st
from collections import Counter, defaultdict

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HABS = ('Pelea', 'Puntería', 'Sigilo', 'Físico', 'Oficio', 'Mecánica', 'Medicina', 'Supervivencia', 'Labia', 'Calle')
MATS = ('Madera', 'Metal', 'Tela', 'Químicos', 'Sujeción', 'Electrónica', 'Combustible', 'Fármacos')
FRENTES = ('Puerta', 'Ventanas', 'Techo', 'Subsuelo')
HERRAMIENTAS = ('Martillo', 'Serrucho', 'Llave inglesa', 'Palanca', 'Taladro', 'Máquina de coser')

BARRIOS = {'Casco': 'e200', 'Sanidad': 'e220', 'Puerto': 'e240', 'Fabril': 'e260', 'Bloques': 'e280',
           'Lomas': 'e300', 'Estación': 'e320', 'Mercado': 'e340', 'Universidad': 'e360',
           'Costanera': 'e380', 'Cementerio': 'e400', 'Perímetro': 'e420'}
CALLE = {'Casco': ('Sanidad', 'Puerto', 'Bloques', 'Estación', 'Mercado'),
         'Sanidad': ('Casco', 'Bloques', 'Universidad'), 'Puerto': ('Casco', 'Fabril', 'Costanera'),
         'Fabril': ('Puerto', 'Estación', 'Perímetro'), 'Bloques': ('Casco', 'Sanidad', 'Mercado', 'Cementerio'),
         'Lomas': ('Universidad', 'Cementerio', 'Perímetro'), 'Estación': ('Casco', 'Fabril', 'Mercado'),
         'Mercado': ('Casco', 'Bloques', 'Estación'), 'Universidad': ('Sanidad', 'Lomas', 'Costanera'),
         'Costanera': ('Puerto', 'Universidad'), 'Cementerio': ('Bloques', 'Lomas', 'Perímetro'),
         'Perímetro': ('Fabril', 'Lomas', 'Cementerio')}
AZOTEAS = {'Casco': ('Sanidad', 'Bloques', 'Mercado'), 'Sanidad': ('Casco', 'Bloques'),
           'Bloques': ('Casco', 'Sanidad', 'Mercado'), 'Mercado': ('Casco', 'Bloques')}
PROCESION_2D6 = {2: 'Perímetro', 3: 'Cementerio', 4: 'Lomas', 5: 'Costanera', 6: 'Bloques', 7: 'Casco',
                 8: 'Sanidad', 9: 'Mercado', 10: 'Estación', 11: 'Fabril'}
REFUGIOS = {'e440': 'Casco', 'e450': 'Mercado', 'e460': 'Estación', 'e470': 'Bloques', 'e480': 'Puerto',
            'e490': 'Sanidad'}
NOMBRE_REF = {'e440': 'Parroquia', 'e450': 'Supermercado', 'e460': 'Comisaría', 'e470': 'Escuela',
              'e480': 'Cuartel', 'e490': 'Sarmiento'}
TESOROS = {  # r110
    'camion': ('e343', 'e323', 'e242', 'e265', 'e283', 'e421'),
    'generador': ('e263', 'e221', 'e322', 'e206', 'e383', 'e303'),
    'armeria': ('e421', 'e204', 'e302', 'e422', 'e305', 'e244'),
    'botiquin': ('e225', 'e423', 'e361', 'e222', 'e202', 'e224'),
    'radio': ('e205', 'e281', 'e363', 'e384', 'e424', 'e304'),
    'blindado': ('e422', 'e322', 'e244', 'e265', 'e382', 'e323')}

# creación a medida (r100–r107): edad, oficio, barrio, Motivo, debilidad y objetos
EDADES = ('Joven', 'Joven', 'Adulto', 'Adulto', 'Mayor', 'Mayor')
OFICIOS = {  # r102: (Habilidad en 2, Habilidad en 1, maña, objetos para elegir)
    'Salud': ('Medicina', 'Labia', 'Manos de guardia', ('botiquin', 'ambulancia')),
    'Obra': ('Oficio', 'Físico', 'Ojo de obra', ('martillo', 'soplete')),
    'Policía': ('Puntería', 'Pelea', 'Reglamentaria', ('llaves7', 'radio')),
    'Reparto': ('Calle', 'Sigilo', 'Atajos', ('casco', 'ganzuas')),
    'Farmacia': ('Medicina', 'Mecánica', 'Recetario', ('farmacos3', 'antiviral')),
    'Comercio': ('Labia', 'Calle', 'El fiado', ('sobre', 'campera')),
    'Mecánica': ('Mecánica', 'Oficio', 'Puente', ('llave', 'bateria')),
    'Cocina': ('Supervivencia', 'Labia', 'La olla grande', ('olla', 'cuchillo')),
    'Docencia': ('Labia', 'Supervivencia', 'Lista de presentes', ('manual', 'silbato')),
    'Seguridad': ('Pelea', 'Físico', 'La puerta', ('perro', 'chaleco')),
    'Electricidad': ('Mecánica', 'Calle', 'Cables', ('dinamo', 'radio')),
    'Deporte': ('Físico', 'Sigilo', 'Pulmones', ('bate', 'mochila')),
}
ORDEN_OFICIOS = ('Salud', 'Obra', 'Policía', 'Reparto', 'Farmacia', 'Comercio',
                 'Mecánica', 'Cocina', 'Docencia', 'Seguridad', 'Electricidad', 'Deporte')
MOTIVOS = ('La lista', 'La obra', 'La orden', 'El pedido', 'El que falta', 'Lo que hiciste')
DEBILIDADES = ('La espalda', 'Buscado', 'Miedo', 'Asma', 'Anteojos', 'Vicio')
MANAS_HAB = {  # r126
    'Pelea': ('La puerta',), 'Puntería': ('Pulso',), 'Sigilo': ('Sombra',), 'Físico': ('Pulmones',),
    'Oficio': ('Ojo de obra',), 'Mecánica': ('Puente', 'Cables'), 'Medicina': ('Manos de guardia', 'Recetario'),
    'Supervivencia': ('La olla grande',), 'Labia': ('Lista de presentes', 'El fiado'), 'Calle': ('Atajos',)}
BOLSILLO = ('mochila', 'cuchillo', 'linterna', 'farmaco', 'palanca', 'foto')   # r106, 1d6
# el jugador automático reparte los puntos libres en este orden (y nunca pasa de 4)
PREFERIDAS = ('Pelea', 'Sigilo', 'Medicina', 'Oficio', 'Físico', 'Labia', 'Puntería', 'Calle', 'Supervivencia', 'Mecánica')


def crear(r, fijo=None):
    """Crea una protagonista al azar (r100–r106). `fijo` permite fijar edad, oficio o Motivo."""
    fijo = fijo or {}
    p = dict(edad=fijo.get('edad') or EDADES[d6(r) - 1],
             oficio=fijo.get('oficio') or ORDEN_OFICIOS[(0 if d6(r) <= 3 else 6) + d6(r) - 1],
             barrio=r.choice(sorted(BARRIOS)),
             motivo=fijo.get('motivo') or MOTIVOS[d6(r) - 1])
    deb = [r.choice(DEBILIDADES)]
    if r.random() < 0.35:
        deb.append(r.choice([d for d in DEBILIDADES if d != deb[0]]))
    p['debilidades'] = set(deb)
    h2, h1, mana, objs = OFICIOS[p['oficio']]
    hab = Counter({h: 0 for h in HABS})
    hab[h2] += 2
    hab[h1] += 1
    if p['edad'] == 'Joven':
        hab['Físico'] += 1
    elif p['edad'] == 'Adulto':
        hab[r.choice((h2, h1))] += 1
    else:
        hab['Labia'] += 1
    libres = 4 + (1 if len(deb) == 2 else 0)
    for h in PREFERIDAS * 3:
        if libres == 0:
            break
        if hab[h] < (2 if libres > 2 else 4) and hab[h] < 4:
            hab[h] += 1
            libres -= 1
    p['hab'] = hab
    p['manas'] = {mana}
    for h, v in hab.items():
        if v >= 4:
            p['manas'].add(next((m for m in MANAS_HAB[h] if m not in p['manas']), MANAS_HAB[h][0]))
    p['objetos'] = [r.choice(objs), BOLSILLO[d6(r) - 1]]
    return p

TIPO_BOTIN = {'Farmacia': 'farmacia', 'Almacén': 'almacen', 'Ferretería': 'ferreteria', 'Hospital': 'hospital',
              'Policía': 'policia', 'Armería': 'policia', 'Vivienda': 'vivienda', 'Oficina': 'oficina',
              'Taller': 'taller', 'Comercio': 'comercio', 'El Destacamento': 'policia'}


def d6(r):
    return r.randint(1, 6)


def leer_eventos():
    texto = ''
    for f in sorted(glob.glob(os.path.join(RAIZ, 'libro', '*.md'))):
        if f.endswith('96-indice-marcas.md'):
            continue
        texto += open(f, encoding='utf-8').read() + '\n'
    partes = re.split(r'<a id="([re]\d{3})"></a>', texto)
    ev = {}
    for i in range(1, len(partes), 2):
        if partes[i] not in ev or len(partes[i + 1].strip()) > len(ev[partes[i]].strip()):
            ev[partes[i]] = partes[i + 1]
    return ev


def leer_tablas(ev):
    tablas, lugares = {}, {}
    for b, e in BARRIOS.items():
        filas = {}
        for m in re.finditer(r'^\| (\d+) \| \[(e\d{3})\]', ev[e], re.M):
            filas[int(m.group(1))] = m.group(2)
        tablas[b] = filas
        base = int(e[1:])
        for k in range(1, 10):
            pid = f'e{base + k}'
            if pid not in ev:
                continue
            m = re.search(r'^\*([^*\n]+)\*', ev[pid], re.M)
            if not m or 'stock' not in m.group(1):
                continue
            campos = [c.strip() for c in m.group(1).split('·')]
            stock = m.group(1).count('▢')
            tipo = campos[1] if len(campos) > 1 else ''
            lugares[pid] = dict(barrio=b, tipo=TIPO_BOTIN.get(tipo, 'vivienda'), stock=stock)
    return tablas, lugares


def leer_refugios(ev):
    refs = {}
    for e, b in REFUGIOS.items():
        t = ev[e]
        fr = {}
        for f in FRENTES:
            m = re.search(r'\*\*' + f + r'\*\* (\d+)', t)
            fr[f] = int(m.group(1)) if m else 0
        viv = int(re.search(r'\*\*Víveres:\*\* (\d+)', t).group(1))
        mats = Counter()
        lm = re.search(r'\*\*Materiales:\*\* ([^\n]+)', t)
        muni = 0
        if lm:
            for n, mat in re.findall(r'(\d+) (' + '|'.join(MATS) + ')', lm.group(1)):
                mats[mat] += int(n)
            mm = re.search(r'(\d+) (?:de )?Munición', lm.group(1))
            muni = int(mm.group(1)) if mm else 0
        ras = re.search(r'\*\*Rastro inicial:\*\* (\d+)', t)
        refs[e] = dict(barrio=b, frentes=fr, viv=viv, mats=mats, muni=muni, rastro=int(ras.group(1)) if ras else 1)
    return refs


def leer_baraja(ev):
    tab = {}
    for palo, e in (('Oros', 'e020'), ('Copas', 'e030'), ('Espadas', 'e040'), ('Bastos', 'e050')):
        filas = {}
        for m in re.finditer(r'^\| (\d) \| \[(e\d{3})\]\(#e\d{3}\) \| \[(e\d{3})\]', ev[e], re.M):
            filas[int(m.group(1))] = (m.group(2), m.group(3))
        tab[palo] = filas
    return tab


# ---------------------------------------------------------------- intérprete de eventos
RE_TEST = re.compile(r'`\[(' + '|'.join(HABS) + r')([^\]`]*)\]`')
RE_COMB = re.compile(r'\*\*\s*(Callados|Frescos?|Hinchados?|Chillonas?|Acechador(?:es)?|Sabuesos?|Brutos?|'
                     r'Escupidor(?:es)?|Ahogados?|Blindados?|Vivos|Lobos|[Ss]oldados)\s*×\s*\(?([0-9d +Etapa]+?)\)?\s*'
                     r'(?:·\s*Aguante (\d+)[^·*]*)?·\s*(?:[^*·]*·\s*)?(Lejos|Cerca|Encima)')
ESPECIAL = {'Callados': (1, 1), 'Fresco': (1, 2), 'Frescos': (1, 2), 'Hinchado': (2, 1), 'Hinchados': (2, 1),
            'Chillona': (2, 0), 'Chillonas': (2, 0), 'Acechador': (2, 3), 'Acechadores': (2, 3), 'Sabueso': (1, 2),
            'Sabuesos': (1, 2), 'Bruto': (4, 1), 'Brutos': (4, 1), 'Escupidor': (2, 0), 'Escupidores': (2, 0),
            'Ahogado': (2, 1), 'Ahogados': (2, 1), 'Blindado': (2, 1), 'Blindados': (2, 1),
            'Vivos': (2, 1), 'Lobos': (2, 1), 'soldados': (2, 1), 'Soldados': (2, 1)}
DIST = {'Lejos': 0, 'Cerca': 1, 'Encima': 2}
NEG_CTX = re.compile(r'(−|perd[eé]s|pag[aá]|\bdas\b|[Dd]ales|[Dd]arles|dale\b|cuesta|gast[aá]|come|entreg|dej[aá]s|'
                     r'[Pp]agar|mand[aá]s|cambi|[Ll]e das|por día|necesit|[Ll]e mandás|cobra|ofrec|piden|'
                     r'quier|[Dd]ar\b|vale|valen|cuenta como|[Cc]on \d+ |y \d+ (?=\w+ más)|Si tenés)')


def tirada_cantidad(txt, r, etapa):
    txt = txt.replace(' ', '')
    if 'Etapa' in txt:
        return d6(r) + etapa
    m = re.fullmatch(r'(\d*)d6', txt)
    if m:
        return sum(d6(r) for _ in range(int(m.group(1) or 1)))
    m = re.fullmatch(r'(\d+)', txt)
    return int(m.group(1)) if m else 1


def ramas(t):
    marcas = []
    for pat, et in ((r'\*10\+:\*', '10'), (r'\*7–9:\*', '79'), (r'\*6−:\*', '6'), (r'\*7\+:\*', '7p'),
                    (r'[Cc]on 10\+[,:]', '10'), (r'[Cc]on 7–9[,:]', '79'), (r'[Cc]on 7\+[,:]', '7p'),
                    (r'[Cc]on 6−[,:]', '6')):
        for m in re.finditer(pat, t):
            marcas.append((m.start(), m.end(), et))
    marcas.sort()
    if not marcas:
        return t, {}
    cab = t[:marcas[0][0]]
    trozos = {}
    for j, (i, fin_et, et) in enumerate(marcas):
        fin = marcas[j + 1][0] if j + 1 < len(marcas) else len(t)
        if et not in trozos:
            trozos[et] = t[fin_et:fin]
    return cab, trozos


def suma_ctx(pat, t):
    tot = 0
    for m in re.finditer(pat, t):
        n = int(m.group(1))
        ctx = t[max(0, m.start() - 28):m.start()]
        tot += -n if NEG_CTX.search(ctx) else n
    return tot


def efectos(t):
    e = Counter()
    e['ruido'] = sum(int(x) for x in re.findall(r'\+(\d+) Ruido', t))
    e['rastro'] = sum(int(x) for x in re.findall(r'\+(\d+) Rastro', t)) - sum(int(x) for x in re.findall(r'−(\d+) Rastro', t))
    e['moral'] = sum(int(x) for x in re.findall(r'\+(\d+) Moral', t)) - sum(int(x) for x in re.findall(r'−(\d+) Moral', t))
    e['animo'] = sum(int(x) for x in re.findall(r'\+(\d+) Ánimo', t)) - sum(int(x) for x in re.findall(r'−(\d+) Ánimo', t))
    e['rep'] = sum(int(x) for x in re.findall(r'\+(\d+) (?:de )?Reputación', t)) - \
        sum(int(x) for x in re.findall(r'−(\d+) (?:de )?Reputación', t))
    limpio = re.sub(r'(borr[aá]s|cur[aá]s?|recuper[aá]s?|cura|casillas? de) \d+ Heridas?', '', t)
    e['heridas'] = sum(int(x) for x in re.findall(r'(?<![+\d])(\d+) Heridas?\b', limpio))
    e['curas'] = sum(int(x) for x in re.findall(r'(?:borr[aá]s|cur[aá]s?|recuper[aá]s?|cura) (\d+) Heridas?', t))
    e['viv'] = max(-4, min(6, suma_ctx(r'(\d+) Víver(?:es)?', t)))
    for mat in MATS:
        e[mat] = max(-3, min(4, suma_ctx(r'(\d+) ' + mat, t)))
    e['Antiviral'] = max(-1, min(2, suma_ctx(r'(\d+) Antivirales?', t))) + (1 if re.search(r'\bun Antiviral\b', t) else 0)
    e['muni'] = max(-6, min(12, suma_ctx(r'(\d+) (?:de )?Munición', t)))
    e['azar'] = len(re.findall(r'material(?:es)? al azar', t))
    e['pista'] = len(re.findall(r'[Uu]na pista', t)) + 2 * len(re.findall(r'[Dd]os pistas', t))
    e['muerde'] = len(re.findall(r'empieza la Fiebre|te muerde|te mordió', t))
    e['arana'] = len(re.findall(r'prueba de Fiebre', t))
    e['surv'] = 1 if re.search(r'se une|se suma|se queda con (?:ustedes|vos)|vienen? al refugio|\(r180\)|r304|'
                                r'es un sobreviviente|un sobreviviente con', t) else 0
    e['res_menos'] = sum(int(x) for x in re.findall(r'pierde (\d+) (?:de )?Resistencia', t))
    e['res_mas'] = sum(int(x) for x in re.findall(r'\+(\d+) (?:de )?Resistencia', t))
    e['manual'] = 1 if re.search(r'un manual|\[e770\]', t) else 0
    e['herr'] = 1 if re.search(r'[Uu]na herramienta|herramienta al azar', t) else 0
    arma = re.search(r'\b(una escopeta|un revólver|un rifle|un fusil|un hacha|un machete|un bate|una pistola)\b', t)
    e['arma'] = 1 if arma else 0
    combates = []
    for m in RE_COMB.finditer(t):
        combates.append((m.group(1), m.group(2), int(m.group(3)) if m.group(3) else None, DIST[m.group(4)]))
    m = re.search(r'→ \*{0,2}\[(e\d{3})\]', t)
    return e, combates, (m.group(1) if m else None), (arma.group(1) if arma else '')


def valor(e, combates):
    v = (1.0 * e['viv'] + 0.8 * sum(e[m] for m in MATS if m != 'Fármacos') + 1.6 * e['Fármacos'] +
         3 * e['Antiviral'] + 0.25 * e['muni'] + 0.8 * e['azar'] - 2.2 * e['heridas'] + 1.5 * e['curas'] -
         0.7 * e['ruido'] - 1.3 * e['rastro'] + 1.1 * e['moral'] + 0.5 * e['animo'] + 1.2 * e['pista'] +
         3 * e['surv'] - 8 * e['muerde'] - 2.5 * e['arana'] + 0.6 * e['res_mas'] - 1.0 * e['res_menos'] +
         1.5 * e['manual'] + 1.2 * e['herr'] + 2 * e['arma'] + 0.4 * e['rep'])
    for nombre, cant, ag, dist in combates:
        n = 3.5 if 'd6' in cant or 'Etapa' in cant else (int(re.sub(r'\D', '', cant) or 1))
        a = ag or ESPECIAL.get(nombre, (1, 1))[0]
        v -= 0.9 * n * a + 1.0 * dist
    return v


def opciones(cuerpo):
    ops = []
    for m in re.finditer(r'^(?:\d+\.|-) \*\*(.+?)\*\*(.*?)(?=^\d+\. \*\*|^- \*\*|^---|\Z)', cuerpo, re.M | re.S):
        tit, txt = m.group(1), m.group(2)
        if re.match(r'(Si |si |Con |Solo |Tesoro|Lugares|Refugio|Conexiones|Los lugares|Tu contador|Cómo|Qué |Antes)', tit):
            continue
        if re.search(r'Si sos|Si tenés|si tenés|Necesitás|necesitás|Solo si|solo si|Si ya|Si llevás|si llevás|'
                     r'Con Palanca|Si el barrio|Si es |Requiere', tit + txt[:60]):
            continue
        if re.search(r'Revisar|Revisás', tit) and '(r161)' in tit + txt[:40]:
            continue
        ops.append((tit, txt))
    return ops


# ---------------------------------------------------------------- estado
class Fin(Exception):
    def __init__(self, causa):
        super().__init__(causa)
        self.causa = causa


class Volver(Exception):
    """e100, opción 5: das la vuelta y la salida termina."""


class Caida(Exception):
    """Llenaste la última casilla: Muriendo (r190). El combate termina (r149)."""
    def __init__(self, causa):
        super().__init__(causa)
        self.causa = causa


class Surv:
    __slots__ = ('n', 'hab', 'lvl', 'h', 'fiebre', 'arma', 'grave', 'hambre')

    def __init__(self, n, r):
        self.n = n
        self.hab = r.choice(HABS)
        self.lvl = r.choice((2, 2, 3))
        self.h = 0
        self.fiebre = 0
        self.arma = r.choice((1, 1, 2))
        self.grave = False
        self.hambre = 0

    def pel(self):
        return self.lvl if self.hab in ('Pelea', 'Puntería', 'Físico') else 0


class Partida:
    def __init__(self, datos, prota, r, refugio=None, traza=False, ajustes=None):
        self.ev, self.tablas, lugares, self.refs, self.baraja = datos
        self.r, self.traza = r, traza
        self.aj = dict(AJUSTES, **(ajustes or {}))
        self.prota = P = prota if isinstance(prota, dict) else crear(r, prota)
        self.manas = set(P['manas'])
        self.deb = set(P['debilidades'])
        self.hab = Counter(P['hab'])
        self.practica = Counter()
        self.semana = Counter()                         # r127: palotes de la primera semana
        self.apodo = None
        self.maxh = self.aj['mayor_h'] if P['edad'] == 'Mayor' else 5
        if P['edad'] == 'Mayor' and self.aj['mayor_puntos']:
            for h in PREFERIDAS[:self.aj['mayor_puntos']]:
                self.hab[h] = min(4, self.hab[h] + 1)
        self.h = 0
        self.fiebre = 0
        self.reservas = 6
        self.animo = 5 if P['edad'] == 'Joven' else 4
        self.prot = 0
        self.revistas = 0
        self.vendas = 0
        self.armas = [dict(n='improvisada', d=1, r=0, alc='C', usos=None, fuego=False)]
        if self.aj['arma_ini']:
            self.armas.append(dict(n='caño', d=self.aj['arma_ini'], r=0, alc='C', usos=6, fuego=False))
        self.muni = 0
        self.herr = set()
        self.manuales = set()
        self.antiv = 0
        self.linterna = False
        self.soga = False
        self.molotov = 0
        self.pistas = 0
        self.rep = 0
        self.grupo = []
        self.nombres = iter(f's{i}' for i in range(1000))
        self.mats = Counter()
        if 'Reglamentaria' in self.manas:
            self.armas.insert(0, dict(n='pistola', d=2, r=2, alc='L', usos=None, fuego=True))
            self.muni = 6
        if 'Recetario' in self.manas:
            self.manuales.add(774)
        for obj in P['objetos']:
            if obj == 'botiquin':
                self.herr.add('Botiquín')
            elif obj in ('martillo', 'llave', 'palanca'):
                self.herr.add({'martillo': 'Martillo', 'llave': 'Llave inglesa', 'palanca': 'Palanca'}[obj])
            elif obj in ('linterna', 'dinamo'):
                self.linterna = True
            elif obj in ('casco', 'chaleco', 'campera'):
                self.prot = 1
            elif obj == 'perro':
                sv = Surv('Negro', r); sv.hab, sv.lvl, sv.arma = 'Pelea', 2, 2; self.grupo.append(sv)
            elif obj == 'farmacos3':
                self.mats['Fármacos'] += 3
            elif obj == 'antiviral':
                self.antiv += 1; self.mats['Fármacos'] += 1
            elif obj == 'farmaco':
                self.mats['Fármacos'] += 1
            elif obj == 'cuchillo':
                self.armas.insert(0, dict(n='cuchillo', d=1, r=0, alc='C', usos=None, fuego=False))
            elif obj == 'bate':
                self.armas.insert(0, dict(n='bate', d=2, r=0, alc='C', usos=8, fuego=False))
            elif obj == 'soplete':
                self.mats['Combustible'] += 1
            elif obj == 'bateria':
                self.mats['Electrónica'] += 1
            elif obj == 'manual':
                self.manuales.add(774)
        self.lugares = {k: dict(v) for k, v in lugares.items()}
        self.ref_id = refugio or r.choice(sorted(REFUGIOS))
        R = self.refs[self.ref_id]
        self.home = R['barrio']
        self.frentes = dict(R['frentes'])
        self.sin_subsuelo = self.frentes['Subsuelo'] == 0
        self.trampas = {f: [] for f in FRENTES}
        self.mats.update(R['mats'])
        self.muni += R['muni']
        self.viv = R['viv'] + (3 if 'sobre' in P['objetos'] else 0)
        self.rastro = R['rastro']
        self.moral = 5
        self.mi_barrio = P['barrio']
        self.visto = set()
        if self.home == self.mi_barrio:                 # en casa (r103)
            self.moral, self.rastro = 6, self.rastro + 1
        self.inst = set()
        if self.ref_id == 'e480':
            self.inst |= {'Cisterna', 'Vigía'}
        if self.ref_id == 'e460':                       # patrulleros, escopeta y el Negro
            self.herr.add('Botiquín')
            self.arma('una escopeta')
            if not any(x.n == 'Negro' for x in self.grupo):
                s = Surv('Negro', r); s.hab, s.lvl, s.arma = 'Pelea', 2, 2; self.grupo.append(s)
        if self.ref_id == 'e450':                       # el revólver de Don Ramón
            self.arma('un revólver')
            self.muni += 3
        self.desarmar = self.aj['desarmar']
        self.muebles = set()
        self.semillas = False
        self.mudo = False
        self.tesoro = {t: r.choice(lugs) for t, lugs in TESOROS.items()}
        self.tesoros = set()
        self.procs = Counter()
        for _ in range(2):
            self.procs[self.proc_barrio()] += 1
        self.mazo = [(p, v) for p in ('Oros', 'Copas', 'Espadas', 'Bastos') for v in range(1, 13) if v not in (8, 9)]
        r.shuffle(self.mazo)
        self.dia = 0
        if 'Buscado' in self.deb:
            self.rep -= 2
        self.secreto = None                             # se tira al abrirlo (r109, e570)
        self.secreto_abierto = False
        self.falta = 0                                  # Señales de El que falta (e840–e845)
        self.encontrado = None
        self.abst = 0                                   # semanas sin el vicio
        self.stats = Counter()
        self.ruido = 0
        self.barrio = self.home
        self.compas = []
        self.en_noche40 = False

    # ------------------------------------------------------------ utilidades
    def log(self, *a):
        if self.traza:
            print('   ', *a)

    @property
    def etapa(self):
        return min(4, 1 + (self.dia - 1) // 10) if self.dia else 1

    def gente(self):
        return 1 + len(self.grupo)

    def frs(self):
        return [f for f in FRENTES if not (f == 'Subsuelo' and self.sin_subsuelo)]

    def proc_barrio(self):
        t = d6(self.r) + d6(self.r)
        if t == 12:
            return 'Puerto' if d6(self.r) <= 3 else 'Universidad'
        return PROCESION_2D6[t]

    def prueba(self, hab, desv=False, vent=False, bonus=0, lejos=False):
        if self.h >= self.maxh - 2 or self.reservas == 0 or self.animo == 0 or self.fiebre >= 4:
            desv = True
        if 'Miedo' in self.deb and hab in ('Pelea', 'Puntería') and self.animo <= 3:
            desv = True
        if 'Anteojos' in self.deb and lejos:
            desv = True
        if desv and vent:
            desv = vent = False
        dados = sorted(d6(self.r) for _ in range(3 if desv or vent else 2))
        if desv:
            dados = dados[:2]
        elif vent:
            dados = dados[-2:]
        t = sum(dados) + self.hab[hab] + min(2, bonus)
        if t <= 6:
            self.practica[hab] += 1
            if self.dia <= 7:
                self.semana[hab] += 1               # r127: el palito de la primera semana
            if self.practica[hab] >= 3 and self.hab[hab] < 5:
                self.practica[hab] = 0
                self.hab[hab] += 1
                if self.hab[hab] == 4:                  # r126: la maña de la Habilidad
                    m = next((m for m in MANAS_HAB[hab] if m not in self.manas), None)
                    if m:
                        self.manas.add(m)
                        self.stats['manas_ganadas'] += 1
        return t

    def mejor_arma(self, lejos):
        if lejos:
            cand = [a for a in self.armas if a['alc'] == 'L' and (not a['fuego'] or self.muni > 0)]
        else:
            cand = [a for a in self.armas if not a['fuego'] or (a['alc'] == 'C' and self.muni > 0)]
        if not cand:
            return None
        return max(cand, key=lambda a: (a['d'], -a['r']))

    def herida(self, n=1, causa='heridas'):
        self.h += n
        if self.h >= self.maxh:
            self.h = self.maxh
            if self.en_noche40:
                raise Fin(causa)
            raise Caida(causa)

    def caer(self, c, fuera):
        """Muriendo (r190): solo te salva otro. Si nadie te cura antes del alba, morís (r195)."""
        self.stats['caidas'] += 1
        cerca = [s for s in self.compas if not s.grave] if fuera else [s for s in self.grupo if not s.grave]
        if fuera:
            d = self.distancias().get(self.barrio, 3)
            if not cerca:
                # te arrastrás: ◷ 2 por barrio, y cualquier cosa en el camino te termina
                if d and (d6(self.r) <= d or any(self.procs[b] for b in CALLE[self.home] if b == self.barrio)):
                    raise Fin(c.causa)
            # en el refugio te esperan los de adentro
            cerca = [s for s in self.grupo if not s.grave]
        intentos = 0
        while self.h >= self.maxh and intentos < 2 and cerca and self.curita():
            intentos += 1
            med = max([s.lvl for s in cerca if s.hab == 'Medicina'] + [0])
            t = d6(self.r) + d6(self.r) + med + (1 if 'Botiquín' in self.herr else 0)
            self.h -= 2 if t >= 10 else 1 if t >= 7 else 0
        if self.h >= self.maxh and 'Enfermería' in self.inst and cerca:
            self.h -= 1
        if self.h >= self.maxh:
            raise Fin(c.causa)
        self.stats['rescatado'] += 1
        self.ruido = 0
        self.barrio = self.home
        self.compas = []

    def mordida_tabla(self, prot=None, bruto=False):
        p = self.prot if prot is None else prot
        bruto_d = d6(self.r)
        if self.revistas and p < 2:
            p += 1
            if bruto_d >= 5:
                self.revistas -= 1            # la armadura de revistas se gasta (e710)
        x = bruto_d - min(2, p)
        if x <= self.aj['nada']:
            return
        if self.aj['tabla'] == 'J':
            # r144: 4–5 golpe; 6 arañazo; el segundo 6 de la misma ronda es mordida
            if x <= 5:
                self.herida(2 if bruto else 1, 'combate')
            else:
                self._seis = getattr(self, '_seis', 0) + 1
                self.herida(1, 'combate')
                if self._seis >= 2:
                    self.mordida()
                else:
                    self.aranazo()
            return
        if self.aj['tabla'] == 'H':
            # r144: 4–5 golpe; 6, otro 1d6: 1–3 arañazo, 4–6 mordida
            if x <= 5:
                self.herida(2 if bruto else 1, 'combate')
            elif d6(self.r) <= 3:
                self.herida(1, 'combate')
                self.aranazo()
            else:
                self.herida(1, 'combate')
                self.mordida()
            return
        if x == 4 or (x == 5 and self.aj['tabla'] == 'B'):
            self.herida(2 if bruto else 1, 'combate')
        elif x == 5 or (x == 6 and self.aj['tabla'] == 'C'):
            self.herida(1, 'combate')
            self.aranazo()
        else:
            self.herida(1, 'combate')
            self.mordida()

    def aranazo(self):
        if self.mats['Fármacos'] > 0:
            self.mats['Fármacos'] -= 1
            med = max([self.hab['Medicina']] + [s.lvl for s in self.grupo if s.hab == 'Medicina'])
            if d6(self.r) + d6(self.r) + med >= 7:
                return
        self.mordida()

    def mordida(self):
        if self.fiebre == 0:
            self.fiebre = 1
            self.stats['mordido'] += 1

    # ------------------------------------------------------------ combate (r140–r149)
    def combate(self, enemigos, compas=(), refugio=False):
        """enemigos: lista de [n, aguante, dist, pasos, nombre]. True si ganás o escapás."""
        grupo = [s for s in compas if not s.grave]
        llegaron3 = self.ruido >= 3
        self.stats['combates'] += 1
        for ronda in range(14):
            enemigos = [e for e in enemigos if e[0] > 0]
            if not enemigos:
                return True
            encima = sum(e[0] for e in enemigos if e[2] == 2)
            amenaza = sum(e[0] * e[1] for e in enemigos)
            # lo que mato en dos rondas, yo y los míos (estimación del jugador)
            mano = max([a['d'] for a in self.armas if not a['fuego']] + [1])
            fuego = max([a['d'] for a in self.armas if a['fuego']] + [0]) if self.muni else 0
            capacidad = 2 * (0.75 * max(mano, fuego) + sum(0.6 * s.arma for s in grupo))
            apurado = self.h >= self.maxh - 2 and amenaza >= 3
            if not refugio and encima == 0 and (apurado or amenaza > capacidad + 1) and \
                    self.aj['esconderse']:
                t = self.prueba('Sigilo', vent='Sombra' in self.manas)
                if t >= 10:
                    return True
                if t >= 7:
                    self.ruido += 0 if 'Sombra' in self.manas else 1
                    return True
                for e in enemigos:
                    e[2] = min(2, e[2] + self.aj['esc_fallo'])
            else:
                dmin = max(e[2] for e in enemigos)
                arma = self.mejor_arma(dmin == 0) or (self.mejor_arma(False) if dmin > 0 else None)
                if arma and not (dmin == 2 and arma['alc'] == 'L' and arma['fuego'] and arma['n'] != 'revólver'
                                 and arma['n'] != 'pistola'):
                    hab = 'Puntería' if arma['alc'] == 'L' or arma['fuego'] else 'Pelea'
                    t = self.prueba(hab, lejos=dmin == 0)
                    dmg = arma['d']
                    if t >= 10:
                        hecho = dmg
                    elif t >= 7:
                        hecho = (dmg + 1) // 2
                        if arma['usos'] is not None:
                            arma['usos'] -= 1
                        elif arma['fuego'] and 'Pulso' not in self.manas:
                            self.ruido += arma['r']
                    else:
                        hecho = 0
                    if arma['fuego']:
                        self.muni = max(0, self.muni - 1)
                    self.ruido += arma['r']
                    self.repartir(enemigos, hecho)
                    if arma['usos'] is not None and arma['usos'] <= 0 and arma in self.armas:
                        self.armas.remove(arma)
                if dmin > 0:
                    for s in grupo:
                        t = self.r.randint(1, 6) + self.r.randint(1, 6) + s.pel()
                        self.repartir(enemigos, s.arma if t >= 10 else (s.arma + 1) // 2 if t >= 7 else 0)
            if not refugio:
                for e in enemigos:
                    if e[4].startswith('Chillona') and e[0] > 0:
                        self.ruido += 2
                if self.ruido >= 3 and not llegaron3:
                    llegaron3 = True
                    enemigos.append([(d6(self.r) + 1) // 2 if self.aj['spawn3'] else d6(self.r), 1, 0, 1, 'Callados'])
                if self.ruido >= 6:
                    self.ruido = 3
                    return self.procesion(compas=compas)
            for e in enemigos:
                if e[0] <= 0:
                    continue
                if e[3] == 3 and 'Pulmones' not in self.manas:
                    e[2] = 2
                elif e[3] == 3:
                    e[2] = min(2, e[2] + 1)
                elif e[3] > 0:
                    e[2] = min(2, e[2] + e[3])
                if e[4].startswith('Escupidor') and d6(self.r) >= 4:
                    self.herida(1, 'combate')
            plazas = self.aj['encima']
            self._seis = 0
            for e in [e for e in enemigos if e[2] == 2 and e[0] > 0]:
                for _ in range(min(e[0], self.aj['encima'] * (1 + len(grupo)))):
                    if plazas > 0 and (not grupo or self.r.random() < 1 / (1 + len(grupo))):
                        plazas -= 1
                        self.mordida_tabla(bruto=e[4].startswith('Bruto'))
                    elif grupo:
                        s = self.r.choice(grupo)
                        x = d6(self.r)
                        if x >= 4:
                            s.h += 1
                            if x == 6 and s.fiebre == 0:
                                s.fiebre = 1
                            if s.h >= 3:
                                grupo.remove(s)
                                if d6(self.r) <= 3:
                                    s.grave = True
                                else:
                                    self.perder(s, 'murió peleando')
        return False

    def repartir(self, enemigos, dmg):
        for e in sorted(enemigos, key=lambda e: (-e[2], e[1])):
            while dmg > 0 and e[0] > 0:
                if dmg >= e[1]:
                    dmg -= e[1]
                    e[0] -= 1
                    self.stats['muertos'] += 1
                    if e[0] > 0:
                        e[1] = ESPECIAL.get(e[4], (1, 1))[0] if e[4] not in ('Vivos', 'Lobos') else 2
                else:
                    e[1] -= dmg
                    dmg = 0

    def enemigos_de(self, combates):
        res = []
        for nombre, cant, ag, dist in combates:
            n = tirada_cantidad(cant, self.r, self.etapa)
            a, pasos = ESPECIAL.get(nombre, (1, 1))
            if nombre in ('Vivos', 'Lobos', 'soldados', 'Soldados'):
                a = ag or 2
            res.append([min(n, 18), a, dist, pasos, nombre])
        return res

    def procesion(self, compas=(), volver=True):
        self.stats['procesiones'] += 1
        doble = self.procs[self.barrio] >= 2
        if self.barrio in AZOTEAS and self.prueba('Físico', desv=doble) >= 7:
            return True
        if volver and self.aj['volver']:
            # e100, opción 5: volvés por donde viniste; con 1–2 te sigue
            self.stats['volvio'] += 1
            if d6(self.r) >= 3:
                raise Volver()
            return self.procesion(compas, volver=False)
        t = self.prueba('Sigilo', desv=doble)
        if t >= 10:
            self.ruido = 0
            return True
        if t >= 7:
            return self.combate([[1, 1, 1, 1, 'Callados']], compas)
        for _ in range(3):  # te huelen: solo queda escapar (r142, r149)
            t = self.prueba('Físico')
            if t >= 10:
                return True
            if t >= 7:
                self.herida(1, 'procesión')
                return True
            self.mordida_tabla()
        raise Fin('procesión')

    # ------------------------------------------------------------ eventos
    def evento(self, eid, prof=0, contexto='calle'):
        if prof > 4 or eid not in self.ev:
            return
        n = int(eid[1:])
        self.stats['eventos'] += 1
        if eid == 'e100':
            if contexto != 'refugio':
                self.procesion(compas=self.compas)
            return
        if 560 <= n <= 563:
            self.pistas += 1
            return
        if 570 <= n <= 599 or n >= 900 or (800 <= n <= 849 and prof > 1) or 440 <= n <= 499:
            return
        if 600 <= n <= 653:
            if (n - 600) % 3 == 0 and len(self.grupo) < 12 and (self.prueba('Labia') >= 7 or d6(self.r) >= 3):
                self.unir()
            return
        if 700 <= n <= 779:
            if n == 770:
                self.manual()
            return
        cuerpo = re.sub(r'^\*[^*\n]+\*$', '', self.ev[eid], count=1, flags=re.M)
        ops = opciones(cuerpo)
        if not ops:
            texto = '\n'.join(l for l in cuerpo.splitlines() if not re.match(r'\s*-? ?\*\*Si ', l))
            self.aplicar_rama(texto, prof, contexto)
            return
        mejor = max(ops, key=lambda o: self.valor_opcion(o[1]) + self.r.random() * 0.3)
        self.aplicar_opcion(mejor[1], prof, contexto)

    def valor_opcion(self, txt):
        m = RE_TEST.search(txt)
        cab, tr = ramas(txt)
        if not m or not tr:
            e, c, g, _ = efectos(txt)
            return valor(e, c) + (0.3 if g else 0)
        mod = self.hab[m.group(1)] + (-1 if 'Desv' in m.group(2) else 0)
        p10 = sum(1 for a in range(1, 7) for b in range(1, 7) if a + b + mod >= 10) / 36
        p7 = sum(1 for a in range(1, 7) for b in range(1, 7) if 7 <= a + b + mod <= 9) / 36
        ec, cc, _, _ = efectos(cab)

        def vr(k):
            if k not in tr:
                return 0
            e, c, g, _ = efectos(tr[k])
            return valor(e, c) + (0.3 if g else 0)
        v10 = vr('10') if '10' in tr else vr('7p')
        v79 = vr('79') if '79' in tr else (vr('7p') if '7p' in tr else v10 - 0.7)
        return valor(ec, cc) + p10 * v10 + p7 * v79 + (1 - p10 - p7) * vr('6')

    def aplicar_opcion(self, txt, prof, contexto):
        m = RE_TEST.search(txt)
        cab, tr = ramas(txt)
        if not m or not tr:
            self.aplicar_rama(txt, prof, contexto)
            return
        self.aplicar_rama(cab, prof, contexto, seguir=False)
        hab = m.group(1)
        bonus = sum(1 for s in self.compas if s.hab == hab and s.lvl >= 2)
        t = self.prueba(hab, desv='Desv' in m.group(2), bonus=bonus)
        if t >= 10:
            k = '10' if '10' in tr else '7p'
        elif t >= 7:
            k = '79' if '79' in tr else ('7p' if '7p' in tr else '10')
            if k == '10':
                self.ruido += 1
        else:
            k = '6'
        if k in tr:
            self.aplicar_rama(tr[k], prof, contexto)

    def aplicar_rama(self, txt, prof, contexto, seguir=True):
        e, combates, goto, arma = efectos(txt)
        self.ruido += e['ruido']
        self.rastro = max(0, min(10, self.rastro + e['rastro']))
        self.stats['rastro_eventos'] += e['rastro']
        self.moral = max(0, min(10, self.moral + e['moral']))
        self.animo = max(0, min(6, self.animo + e['animo']))
        self.rep += e['rep']
        self.pistas += e['pista']
        self.viv = max(0, self.viv + e['viv'])
        for mat in MATS:
            self.mats[mat] = max(0, self.mats[mat] + e[mat])
        for _ in range(e['azar']):
            self.mats[MATS[d6(self.r) - 1]] += 1
        self.antiv = max(0, self.antiv + e['Antiviral'])
        self.muni = max(0, self.muni + e['muni'])
        if e['manual']:
            self.manual()
        if e['herr']:
            self.herr.add(HERRAMIENTAS[d6(self.r) - 1])
        if arma:
            self.arma(arma)
        if e['res_mas']:
            f = min(self.frs(), key=lambda f: self.frentes[f])
            self.frentes[f] = min(10, self.frentes[f] + min(3, e['res_mas']))
        if e['res_menos'] and contexto == 'refugio':
            f = self.r.choice(self.frs())
            self.frentes[f] = max(0, self.frentes[f] - min(3, e['res_menos']))
        if e['curas']:
            self.h = max(0, self.h - e['curas'])
        if e['heridas']:
            self.herida(min(2, e['heridas']), 'eventos')
        if e['muerde']:
            self.mordida()
        elif e['arana']:
            self.aranazo()
        if e['surv'] and len(self.grupo) < 12:
            self.unir()
        if combates:
            gente = self.grupo if contexto == 'refugio' else self.compas
            if not self.combate(self.enemigos_de(combates), gente, refugio=(contexto == 'refugio')):
                self.herida(1, 'combate')
        if seguir and goto:
            self.evento(goto, prof + 1, contexto)

    def unir(self):
        self.grupo.append(Surv(next(self.nombres), self.r))
        if d6(self.r) == 6 and d6(self.r) >= 4:
            self.semillas = True          # Doña Rosa (e627, e629) y otros
        self.stats['unidos'] += 1
        if self.stats['unidos'] % 3 == 0:
            self.rastro = min(10, self.rastro + 1)
            self.stats['rastro_gente'] += 1
        if self.ref_id == 'e440' and d6(self.r) == 6:
            self.grupo.append(Surv(next(self.nombres), self.r))
            self.stats['unidos'] += 1

    def perder(self, s, por):
        if s in self.grupo:
            self.grupo.remove(s)
            self.moral = max(0, self.moral - 2)
            self.animo = max(0, self.animo - 1)
            self.stats['perdidos'] += 1
            self.log(f'· se pierde {s.n} ({por})')

    def manual(self):
        x = d6(self.r)
        self.manuales.add({1: 776, 2: 776, 3: 777, 4: 777, 5: 778, 6: 779}[d6(self.r)] if x == 6 else 770 + x)

    def arma(self, n):
        tabla = {'una escopeta': ('escopeta', 3, 3, 'C', True), 'un revólver': ('revólver', 2, 2, 'L', True),
                 'un rifle': ('rifle', 2, 2, 'L', True), 'un fusil': ('fusil', 3, 2, 'L', True),
                 'un hacha': ('hacha', 2, 0, 'C', False), 'un machete': ('machete', 2, 0, 'C', False),
                 'un bate': ('bate', 2, 0, 'C', False), 'una pistola': ('pistola', 2, 2, 'L', True)}
        if n in tabla:
            nn, d, ru, alc, fu = tabla[n]
            self.armas.insert(0, dict(n=nn, d=d, r=ru, alc=alc, usos=None if fu else 6, fuego=fu))

    # ------------------------------------------------------------ saqueo (r160–r166)
    def botin(self, tipo):
        x = d6(self.r)
        M, R = self.mats, self.r
        if tipo == 'farmacia':
            M['Fármacos'] += (0, 1, 2, 2, 0, 3)[x - 1]
            if x == 4: M['Químicos'] += 1
            if x == 5: self.antiv += 1
        elif tipo == 'almacen':
            self.viv += (0, 1, 2, 3, 2, 4)[x - 1]
            if x == 5: M['Químicos'] += 1
        elif tipo == 'ferreteria':
            M['Sujeción'] += (1, 2, 0, 0, 1, 0)[x - 1]
            if x == 3: M['Metal'] += 2
            if x == 4: self.herr.add(HERRAMIENTAS[d6(R) - 1])
            if x == 5: self.soga = True
            if x == 6: M['Químicos'] += 2; self.linterna = True
        elif tipo == 'hospital':
            if x == 1 and not self.combate([[d6(R), 1, 1, 1, 'Callados']], self.compas):
                self.herida(1, 'combate')
            M['Fármacos'] += (0, 2, 0, 0, 3, 0)[x - 1]
            if x == 3: self.antiv += 1
            if x == 4: self.herr.add('Botiquín')
            if x == 6: self.antiv += 2
        elif tipo == 'policia':
            self.muni += (0, 3, 0, 2, 4, 2)[x - 1]
            if x == 3: self.prot = min(2, self.prot + 1)
            if x == 4: self.arma('un revólver' if d6(R) <= 3 else 'una escopeta')
            if x == 6: self.arma('un rifle')
        elif tipo == 'vivienda':
            self.viv += (0, 1, 0, 0, 0, 2)[x - 1]
            if x == 3: M['Tela'] += 1; M['Madera'] += 1
            if x == 4: M['Fármacos'] += 1
            if x == 5:
                y = d6(R)
                if y == 1: self.linterna = True
                elif y == 2: self.soga = True
                elif y == 3: self.armas.insert(0, dict(n='cuchillo', d=1, r=0, alc='C', usos=None, fuego=False))
                elif y == 6: self.manual()
            if x == 6: M['Tela'] += 1
        elif tipo == 'oficina':
            if x == 2: M['Electrónica'] += 1
            if x == 3: M['Tela'] += 2
            if x == 4: M['Electrónica'] += 1; M['Metal'] += 1
            if x == 5: self.manual()
            if x == 6: M['Fármacos'] += 2
        elif tipo == 'taller':
            if x == 1: M['Metal'] += 1
            if x == 2: M['Metal'] += 2
            if x == 3: M['Combustible'] += 1
            if x == 4: M['Químicos'] += 2
            if x == 5: self.herr.add(HERRAMIENTAS[d6(R) - 1])
            if x == 6: M['Electrónica'] += 2; M['Metal'] += 1
        elif tipo == 'comercio':
            if x == 2: M['Tela'] += 2
            if x == 3: M['Electrónica'] += 1
            if x == 4: self.prot = min(2, self.prot + 1)
            if x == 5: self.viv += 1; M['Tela'] += 1
            if x == 6: M['Tela'] += 1

    def revisar(self, pid, fondo):
        L = self.lugares[pid]
        tiradas = 3 if fondo else 1
        if fondo:
            self.ruido += 1
        if self.prueba('Calle') >= 10:
            tiradas += 1
        if L['stock'] <= 0:
            for _ in range(2 if fondo else 1):
                x = d6(self.r)
                if x == 3:
                    if not self.combate([[1, 1, 2, 1, 'Callados']], self.compas):
                        self.herida(1, 'combate')
                elif x == 4 and len(self.grupo) < 12:
                    self.unir()
                elif x == 5:
                    self.mats[MATS[d6(self.r) - 1]] += 1
                elif x == 6:
                    self.pistas += 1
            return
        L['stock'] = max(0, L['stock'] - (2 if fondo else 1))
        if self.aj['desarmar_afuera'] and L['tipo'] in ('vivienda', 'oficina', 'comercio') and \
                self.mats['Madera'] < 8:
            self.mats['Madera'] += 2 * (1 + len(self.compas)) if self.aj['desarmar_afuera'] == 'grupo' else 2  # muebles desarmados ahí (r165)
            self.ruido += 1
        if L['barrio'] in ('Mercado', 'Bloques', 'Cementerio') and L['tipo'] in ('comercio', 'almacen', 'vivienda') \
                and d6(self.r) <= 2:
            self.semillas = True          # verdulería, balcones, vivero (e752)
        for _ in range(tiradas):
            self.botin(L['tipo'])

    # ------------------------------------------------------------ tesoros (e500–e552, simplificados)
    def tesoro_en(self, pid):
        for t, lugar in self.tesoro.items():
            if lugar == pid and t not in self.tesoros:
                return t
        return None

    def tomar_tesoro(self, t):
        R = self.r
        if t == 'camion':
            if self.prueba('Mecánica') >= 7 or self.prueba('Oficio') >= 7:
                self.tesoros.add(t); self.viv += 12
        elif t == 'generador':
            if self.prueba('Mecánica') >= 7:
                self.tesoros.add(t); self.inst.add('Generador'); self.rastro = min(10, self.rastro + 2)
        elif t == 'armeria':
            if self.combate([[d6(R) + 2, 1, 1, 1, 'Callados']], self.compas):
                self.tesoros.add(t); self.arma('un fusil'); self.muni += 18
                for s in self.grupo[:3]:
                    s.arma = max(s.arma, 2)
        elif t == 'botiquin':
            self.tesoros.add(t); self.herr.add('Botiquín'); self.mats['Fármacos'] += 4; self.antiv += 2
        elif t == 'radio':
            self.tesoros.add(t); self.pistas += 1
        elif t == 'blindado':
            if self.prueba('Mecánica') >= 7:
                self.tesoros.add(t)
        if t in self.tesoros:
            self.moral = min(10, self.moral + 2)
            self.stats['tesoros'] += 1
            self.log(f'· TESORO: {t}')

    # ------------------------------------------------------------ el alba (r131)
    def alba(self):
        palo, val = self.mazo.pop()
        self.dia += 1
        self.log(f'— Día {self.dia} · {val} de {palo} · Etapa {self.etapa} · Víveres {self.viv} · gente {self.gente()} · '
                 f'H {self.h}/{self.maxh} · Fiebre {self.fiebre} · Rastro {self.rastro} · Moral {self.moral} · '
                 f'{self.frentes} · mats {dict(+self.mats)}')
        if palo == 'Espadas':
            nuevo = Counter()
            for b, k in self.procs.items():
                for _ in range(k):
                    nuevo[self.paso_hacia(b, self.home) if d6(self.r) <= 2 else self.r.choice(CALLE[b])] += 1
            self.procs = nuevo
            if 4 <= val <= 7:
                self.procs[self.proc_barrio()] += 1
        if self.etapa == 4:
            self.procs['Perímetro'] += 1
        if self.ref_id == 'e450':
            if self.dia in (1, 11, 21, 31):
                self.viv += 2 * (2 if self.dia == 1 else 1)   # el depósito del entrepiso
            if self.dia in (5, 15, 25, 35):                   # e451: los que vienen por la comida
                x = d6(self.r)
                if x <= 4 and len(self.grupo) < 10:
                    for _ in range(2):
                        self.unir()                          # los hacés pasar
                    self.rastro = min(10, self.rastro + 1)
                else:
                    self.viv = max(0, self.viv - (3 if x == 5 else 2))
        if self.dia % 7 == 0:
            self.rastro = max(0, self.rastro - 1)        # una semana sin salir de noche (r174)
        self.tu_historia()
        if val <= 7:
            eid = self.baraja[palo][d6(self.r)][0 if val <= 3 else 1]
        else:
            base = {'Oros': 60, 'Copas': 63, 'Espadas': 66, 'Bastos': 69}[palo]
            eid = f'e0{base + {10: 0, 11: 1, 12: 2}[val]}'
        self.ruido = 0
        self.barrio = self.home
        self.compas = []
        try:
            self.evento(eid, contexto='refugio')
        except Volver:
            pass
        except Caida as c:
            self.caer(c, fuera=False)
        # comer (r131, r193)
        need = self.gente()
        come = min(self.viv, need)
        self.viv -= come
        falta = need - come
        if falta:
            self.moral = max(0, self.moral - 1)
            self.stats['hambre'] += falta
            for _ in range(falta):
                # vos elegís quién pierde la Reserva (r131): el que más tiene
                cand = [(6 - x.hambre, 1, x) for x in self.grupo] + [(self.reservas, 0, None)]
                _, _, x = max(cand, key=lambda c: (c[0], c[1]))
                if x is None:
                    self.reservas = max(0, self.reservas - 1)
                else:
                    x.hambre = min(6, x.hambre + 1)
        else:
            sobra = self.viv
            if self.reservas < 6 and sobra > 0:
                self.viv -= 1; sobra -= 1
                self.reservas += 1
            for x in sorted(self.grupo, key=lambda x: -x.hambre):
                if x.hambre and self.viv > 0 and sobra > 0:
                    self.viv -= 1; sobra -= 1
                    x.hambre -= 1
        # Reservas 0: 1 Herida cada alba (r193)
        if self.reservas == 0:
            try:
                self.herida(1, 'hambre')
            except Caida as c:
                self.caer(c, fuera=False)
        for x in list(self.grupo):
            if x.hambre >= 6:
                x.h += 1
                if x.h >= 3:
                    self.perder(x, 'hambre')
        if self.viv > 10 and 'Despensa' not in self.inst:
            self.viv -= 1
        # la Fiebre (r191)
        if self.fiebre:
            if self.antiv > 0:
                self.antiv -= 1
            else:
                self.fiebre += 1
                if self.fiebre >= 6:
                    raise Fin('Fiebre')
            if self.fiebre <= 2 and self.antiv == 0 and self.mats['Fármacos'] >= 2 and self.grupo \
                    and self.r.random() < self.aj['amputable']:
                self.amputar()
        for s in list(self.grupo):
            if s.fiebre:
                if self.antiv > 1:
                    self.antiv -= 1
                else:
                    s.fiebre += 1
                    if s.fiebre >= 4:
                        self.perder(s, 'Fiebre')

    def tu_historia(self):
        """Lo que es solo tuyo: el apodo (r127), las debilidades (r105) y El que falta (e840–e848)."""
        R, P = self.r, self.prota
        if self.dia == 8 and self.semana:
            self.apodo = self.semana.most_common(1)[0][0]
        if self.dia > 1 and (self.dia - 1) % 10 == 0:       # sube la Etapa: alguna debilidad se supera
            for d in sorted(self.deb):
                if R.random() < self.aj['superar']:
                    self.deb.discard(d)
                    self.animo = min(6, self.animo + 1)
                    self.stats['debilidad_superada'] += 1
        if 'Vicio' in self.deb:
            if self.dia % 7 == 1:
                if self.viv > self.gente():
                    self.viv -= 1
                else:
                    self.animo = max(0, self.animo - 2)
        if P['motivo'] == 'El que falta' and self.encontrado is None and self.dia >= 2:
            if self.stats['salidas'] > self.stats.get('_salidas', 0) and R.random() < self.aj['senal']:
                self.falta += 1
            self.stats['_salidas'] = self.stats['salidas']
            if self.falta >= 3:
                x = d6(R) - (1 if R.random() < 1 / 6 else 0) + (1 if 2 + self.falta >= 4 else 0)
                x = max(1, min(6, x))
                col = 0 if self.etapa <= 2 else 1 if self.etapa == 3 else 2
                tabla = (('atrapado', 'faccion', 'solo', 'otro', 'gente', 'buscando'),
                         ('mordido', 'atrapado', 'faccion', 'solo', 'otro', 'gente'),
                         ('convertido', 'convertido', 'mordido', 'atrapado', 'faccion', 'otro'))[col]
                self.encontrado = tabla[x - 1]
                self.stats['falta_' + self.encontrado] += 1
                if self.encontrado in ('solo', 'gente', 'buscando', 'atrapado', 'faccion'):
                    sv = Surv('El que falta', R); sv.lvl = max(sv.lvl, 2); self.grupo.append(sv)
                    self.moral = min(10, self.moral + 2)
                    if self.encontrado == 'gente':
                        self.unir()
                    if self.encontrado == 'faccion':
                        self.rep += 1
                elif self.encontrado == 'mordido':
                    sv = Surv('El que falta', R); sv.fiebre = 1; self.grupo.append(sv)
                elif self.encontrado == 'convertido':
                    self.animo = max(0, self.animo - 2)

    def amputar(self):
        med = max([s.lvl for s in self.grupo if s.hab == 'Medicina'] + [0])
        self.mats['Fármacos'] -= 2
        t = d6(self.r) + d6(self.r) + med
        self.fiebre = 0
        self.stats['amputado'] += 1
        for h in ('Pelea', 'Puntería', 'Oficio', 'Mecánica'):
            self.hab[h] = max(0, self.hab[h] - 1)
        if t >= 10:
            self.h = max(self.h, 2)
        elif t >= 7:
            self.h = max(self.h, 3)
            self.animo = max(0, self.animo - 1)
        else:
            self.h = self.maxh - 1
            if self.mats['Fármacos'] == 0 and d6(self.r) <= 3:
                raise Fin('amputación')

    def paso_hacia(self, a, b, evitar=()):
        if a == b:
            return a
        prev = {a: None}
        cola = [a]
        while cola:
            x = cola.pop(0)
            for v in CALLE[x]:
                if v not in prev and (v not in evitar or v == b):
                    prev[v] = x
                    cola.append(v)
        if b not in prev:
            return self.paso_hacia(a, b)
        x = b
        while prev.get(x) not in (a, None):
            x = prev[x]
        return x

    def distancias(self, desde=None, evitar=()):
        desde = desde or self.home
        dist = {desde: 0}
        cola = [desde]
        while cola:
            x = cola.pop(0)
            for v in CALLE[x]:
                if v not in dist and v not in evitar:
                    dist[v] = dist[x] + 1
                    cola.append(v)
        return dist

    # ------------------------------------------------------------ las horas de luz (r133)
    def luz(self):
        horas = self.cuidar(6)
        n = self.gente()
        hambre = self.viv < self.aj['reserva_dias'] * n + 2
        necesito = self.faltan_mats() and (min(self.frentes[f] for f in self.frs()) < 9 or
                                           'Último Cuarto' not in self.inst)
        farmacia = self.mats['Fármacos'] < 2 and self.dia % 3 == 0
        solos = len(self.grupo) < self.aj['buscar_gente'] and self.dia % 2 == 0
        salir = self.dia >= 2 and (hambre or necesito or farmacia or solos or
                                   (self.aj['salir_siempre'] and self.dia % 2 == 1))
        if self.h >= self.maxh - 2 or self.fiebre >= 4:
            salir = hambre and self.viv < n
        if self.dia >= 38:
            salir = self.viv < n * (41 - self.dia)
        if salir:
            try:
                horas = self.expedicion(horas, 'comida' if hambre else 'mats')
            except Volver:
                horas = max(0, horas - 3)
                self.ruido = 0
                self.barrio = self.home
                self.compas = []
            except Caida as c:
                self.caer(c, fuera=True)
                return
        horas = self.construir(horas)
        if horas >= 2 and self.animo <= 2:
            self.animo += 1

    def faltan_mats(self):
        return self.mats['Madera'] + self.mats['Metal'] < 6 or self.mats['Sujeción'] < 2

    def curita(self):
        """Gasta una cura: Vendas hervidas primero (e713), después Fármacos."""
        if self.vendas:
            self.vendas -= 1
            return True
        if self.mats['Fármacos']:
            self.mats['Fármacos'] -= 1
            return True
        return False

    def cuidar(self, horas):
        while horas > 0 and self.h >= 2 and self.vendas + self.mats['Fármacos'] > self.aj['reserva_cura'] and self.curita():
            horas -= 1
            med = max([self.hab['Medicina']] + [s.lvl for s in self.grupo if s.hab == 'Medicina'])
            t = d6(self.r) + d6(self.r) + med + (1 if 'Botiquín' in self.herr else 0)
            if 'Recetario' in self.manas and t >= 7:
                t = 10
            self.h = max(0, self.h - (2 if t >= 10 else 1 if t >= 7 else 0))
        if horas >= 1 and self.moral <= 4 and self.grupo:
            horas -= 1
            t = self.prueba('Labia', bonus=(1 if 'Lista de presentes' in self.manas else 0) +
                            (1 if self.apodo else 0))
            self.moral = max(0, min(10, self.moral + (1 if t >= 7 else -1 if t <= 6 else 0)))
        return horas

    def expedicion(self, horas, quiero):
        self.ruido = 0
        dist = self.distancias()
        pesos = {'comida': {'almacen': 3, 'vivienda': 1.2, 'comercio': 0.6},
                 'mats': {'taller': 2.5, 'ferreteria': 2.5, 'vivienda': 1.0, 'comercio': 1.0, 'oficina': 0.8,
                          'farmacia': 1.4, 'hospital': 1.2, 'policia': 1.3, 'almacen': 1.2}}[quiero]
        if self.aj['rodear']:
            dist = self.distancias(evitar={b for b, k in self.procs.items() if k})
        mejor, mv = None, 0.0
        for pid, L in self.lugares.items():
            d = dist.get(L['barrio'], 9)
            if d > self.aj['radio'] or 2 * d + 2 > horas:
                continue
            v = pesos.get(L['tipo'], 0.5) * min(2, L['stock']) + (3 if self.tesoro_en(pid) else 0)
            if self.procs[L['barrio']]:
                v -= 2.5
            v /= (1 + 0.6 * d)
            if v > mv:
                mejor, mv = pid, v
        if not mejor:
            return horas
        dest = self.lugares[mejor]['barrio']
        libres = [s for s in self.grupo if not s.grave and not s.fiebre]
        self.compas = sorted(libres, key=lambda s: -s.pel())[:2] if len(libres) >= self.aj['min_compas'] else []
        self.stats['salidas'] += 1
        ruta, x = [], self.home
        evitar = {b for b, k in self.procs.items() if k} if self.aj['rodear'] else set()
        while x != dest:
            x = self.paso_hacia(x, dest, evitar)
            ruta.append(x)
        for b in ruta:
            horas -= 1
            self.llegar(b)
        L = self.lugares[mejor]
        if not L.get('visto'):
            L['visto'] = True
            self.evento(mejor, contexto='calle')
        t = self.tesoro_en(mejor)
        if t:
            self.tomar_tesoro(t)
        fondo = horas - len(ruta) >= 2
        self.revisar(mejor, fondo)
        horas -= 2 if fondo else 1
        otros = [p for p, l in self.lugares.items() if l['barrio'] == dest and p != mejor and l['stock'] > 0]
        if otros and horas - len(ruta) >= 1:
            p2 = max(otros, key=lambda p: pesos.get(self.lugares[p]['tipo'], 0.5))
            if not self.lugares[p2].get('visto'):
                self.lugares[p2]['visto'] = True
                self.evento(p2, contexto='calle')
            fondo = horas - len(ruta) >= 2
            self.revisar(p2, fondo)
            horas -= 2 if fondo else 1
        for b in list(reversed(ruta[:-1])) + [self.home]:
            horas -= 1
            if b != self.home:
                self.llegar(b)
        if self.ruido >= 3:
            if dest in CALLE[self.home] or dest == self.home:
                self.rastro = min(10, self.rastro + 1)
                self.stats['rastro_ruido'] += 1
            if self.procs:
                dd = self.distancias(dest)
                cerca = min(self.procs, key=lambda b: dd.get(b, 9))
                self.procs[cerca] -= 1
                self.procs[self.paso_hacia(cerca, dest)] += 1
                self.procs = +self.procs
        self.ruido = 0
        self.barrio = self.home
        self.compas = []
        return max(0, horas)

    def llegar(self, b):
        venia = self.barrio
        self.barrio = b
        azotea = b in AZOTEAS.get(venia, ()) and (self.soga or 'Atajos' in self.manas)
        if azotea:
            if d6(self.r) == 1:
                self.evento('e130', contexto='calle')
            return
        if self.procs[b]:
            self.procesion(compas=self.compas)
            return
        self.ruido += 1
        if b == self.mi_barrio and b not in self.visto:      # tu cuadra (r103)
            self.visto.add(b)
            return
        self.visto.add(b)
        t = min(12, d6(self.r) + self.etapa + (1 if self.ruido >= 3 else 0) - (1 if b == self.mi_barrio else 0))
        eid = self.tablas[b].get(max(2, t))
        if eid:
            self.evento(eid, contexto='calle')

    # ------------------------------------------------------------ el taller (r200–r207, e740–e761)
    def construir(self, horas):
        M = self.mats
        frs = self.frs()
        alb = 1 if 'Ojo de obra' in self.manas else 0

        def hacer(h):
            nonlocal horas
            if horas >= h:
                horas -= h
                return True
            return False

        def instalar(nombre, hab='Oficio'):
            if hab is None or self.prueba(hab, bonus=1 if 'Taller' in self.inst else 0) >= 7:
                self.inst.add(nombre)
                self.moral = min(10, self.moral + 1)
                return True
            return False
        plan = []
        if 'Último Cuarto' not in self.inst and self.dia >= self.aj['dia_uc']:
            plan.append('Último Cuarto')
        if self.aj['huerta'] and 'Huerta' not in self.inst and (self.semillas or 776 in self.manuales):
            plan.insert(0, 'Huerta')
        for i in ('Cocina a leña', 'Vigía', 'Cortinas negras', 'Despensa', 'Enfermería', 'Taller', 'Dormitorio'):
            if i not in self.inst:
                plan.append(i)
        for inst in plan:
            if inst == 'Último Cuarto' and M['Sujeción'] >= 2 and (M['Metal'] >= 4 or M['Madera'] >= 6) and hacer(4):
                if M['Metal'] >= 4: M['Metal'] -= 4
                else: M['Madera'] -= 6
                M['Sujeción'] -= 2
                instalar(inst)
            elif inst == 'Huerta' and M['Madera'] >= 2 and hacer(3):
                M['Madera'] -= 2
                instalar(inst, 'Supervivencia')
            elif inst == 'Cocina a leña' and M['Metal'] >= 3 and M['Madera'] >= 2 and hacer(3):
                M['Metal'] -= 3; M['Madera'] -= 2          # con chimenea: cocinar no sube el Rastro
                instalar(inst)
            elif inst == 'Vigía' and M['Madera'] >= 3 and M['Sujeción'] >= 1 and self.soga and hacer(2):
                M['Madera'] -= 3; M['Sujeción'] -= 1
                instalar(inst)
            elif inst == 'Cortinas negras' and M['Tela'] >= 4 and hacer(2):
                M['Tela'] -= 4
                instalar(inst, None)
                self.rastro = max(0, self.rastro - 1)
            elif inst == 'Despensa' and self.viv >= 9 and M['Madera'] >= 3 and M['Metal'] >= 1 and hacer(2):
                M['Madera'] -= 3; M['Metal'] -= 1
                instalar(inst)
            elif inst == 'Enfermería' and 'Botiquín' in self.herr and M['Madera'] >= 2 and M['Tela'] >= 2 \
                    and M['Fármacos'] >= 4 and hacer(2):
                M['Madera'] -= 2; M['Tela'] -= 2; M['Fármacos'] -= 2
                instalar(inst, 'Medicina')
            elif inst == 'Taller' and M['Madera'] >= 3 and M['Metal'] >= 2 and len(self.herr) >= 2 and hacer(3):
                M['Madera'] -= 3; M['Metal'] -= 2
                instalar(inst)
            elif inst == 'Dormitorio' and M['Tela'] >= 4 and M['Madera'] >= 2 and self.dia >= 10 and hacer(2):
                M['Tela'] -= 4; M['Madera'] -= 2
                instalar(inst, None)
        if not self.mudo and self.rastro >= 6 and M['Madera'] >= 2 and M['Sujeción'] >= 2 and hacer(4):
            M['Madera'] -= 2; M['Sujeción'] -= 2
            if self.prueba('Oficio') >= 7:
                self.mudo = True
                self.rastro = max(0, self.rastro - 2)
        if self.aj['basicas']:
            if self.prot == 0 and not self.revistas and M['Tela'] >= 2 and hacer(1):
                M['Tela'] -= 2
                self.revistas = 3                       # Armadura de revistas (e710)
            while self.vendas < 3 and M['Tela'] >= 1 and M['Combustible'] >= 1 and horas >= 1:
                hacer(1)
                M['Tela'] -= 1; M['Combustible'] -= 1
                self.vendas += 1                        # Vendas hervidas (e713)
        if not any(a['d'] >= 2 for a in self.armas) and M['Sujeción'] >= 1 and hacer(1):
            M['Sujeción'] -= 1
            self.armas.insert(0, dict(n='bate con clavos', d=2, r=0, alc='C', usos=4, fuego=False))
        if 774 in self.manuales and M['Combustible'] and M['Químicos'] and M['Tela'] and self.dia >= 25 and hacer(1):
            M['Combustible'] -= 1; M['Químicos'] -= 1; M['Tela'] -= 1
            self.molotov += 2
        if self.manuales - getattr(self, '_leidos', set()) and hacer(1):
            self._leidos = set(self.manuales)
        guardo = 2 if 'Último Cuarto' not in self.inst and self.dia >= self.aj['dia_uc'] - 6 else 0
        M_suj = lambda: M['Sujeción'] - guardo >= 1
        while horas > 0:
            frs.sort(key=lambda f: self.frentes[f] + 2 * len(self.trampas[f]))
            f = frs[0]
            if self.frentes[f] >= 10 and all(len(self.trampas[x]) >= 2 for x in frs):
                break
            if f not in self.muebles and self.frentes[f] < 10 and hacer(1):
                self.muebles.add(f)
                t = self.prueba('Físico')
                self.frentes[f] = min(10, self.frentes[f] + (2 if t >= 10 else 1) + alb)
                if 7 <= t <= 9 and self.h < self.maxh - 2:
                    self.h += 1
                continue
            if 772 in self.manuales and M['Metal'] >= 3 and M['Sujeción'] - guardo >= 2 and self.frentes[f] <= 7 and hacer(2):
                M['Metal'] -= 3; M['Sujeción'] -= 2
                if self.prueba('Oficio', desv='Taladro' not in self.herr) >= 7:
                    self.frentes[f] = min(10, self.frentes[f] + 3 + alb)
                continue
            if M['Madera'] >= 2 and M_suj() and self.frentes[f] <= 8 and hacer(2):
                M['Madera'] -= 2; M['Sujeción'] -= 1
                self.frentes[f] = min(10, self.frentes[f] + 2 + alb)
                continue
            ft = min(frs, key=lambda x: len(self.trampas[x]))
            if len(self.trampas[ft]) < 2 and 778 in self.manuales and M['Metal'] >= 2 and M_suj() and hacer(1):
                M['Metal'] -= 2; M['Sujeción'] -= 1
                self.trampas[ft].append(2)
                continue
            if len(self.trampas[ft]) < 2 and M['Madera'] >= 1 and M_suj() and hacer(1):
                M['Madera'] -= 1; M['Sujeción'] -= 1
                self.trampas[ft].append(1 + alb)
                continue
            if self.desarmar > 0 and hacer(1):
                self.desarmar -= 1
                M['Madera'] += 2
                continue
            break
        return horas

    # ------------------------------------------------------------ la noche (r134, r175, r181)
    def noche(self):
        M = self.mats
        for s in self.grupo:
            if s.grave:
                s.h = max(0, s.h - 1)
                s.grave = s.h > 1
        libres = [s for s in self.grupo if not s.grave]
        self.r.shuffle(libres)
        guardia, cocina, huerta = 0, False, 0
        for s in libres:
            if guardia < (2 if self.rastro >= 4 else 1):
                guardia += 1
            elif 'Cocina a leña' in self.inst and self.viv >= 2 and not cocina:
                cocina = True
                self.moral = min(10, self.moral + 1)
                self.viv += 1
            elif 'Huerta' in self.inst and huerta < self.aj['jardineros']:
                huerta += 1
                self.viv += 2 if s.hab == 'Supervivencia' and s.lvl >= 2 else 1
            elif 'Enfermería' in self.inst and self.h > 0 and s.hab == 'Medicina':
                self.h = max(0, self.h - 2)
            elif M['Madera'] or M['Metal']:
                f = min(self.frs(), key=lambda f: self.frentes[f])
                if self.frentes[f] < 10:
                    if M['Madera']: M['Madera'] -= 1
                    else: M['Metal'] -= 1
                    self.frentes[f] += 1
            else:
                s.h = max(0, s.h - 1)
        if 'Manos de guardia' in self.manas and self.h > 0:
            self.h -= 1
        if 'La olla grande' in self.manas and cocina:
            self.viv += 1
        if 'Enfermería' in self.inst and self.h > 0:
            self.h -= 1
        if self.h == 1 and (self.maxh == 5 or self.aj['mayor_magullado']):
            self.h = 0       # el Descanso borra Magullado (la Mayor no tiene esa casilla)
        tir = d6(self.r) + d6(self.r) - min(2, guardia) - (1 if 'Vigía' in self.inst else 0) + \
            (2 if self.procs[self.home] else 0)
        if tir <= self.rastro:
            try:
                self.sondeo()
            except Caida as c:
                self.caer(c, fuera=False)
        if self.procs[self.home]:
            self.procs[self.home] -= 1
            self.procs[self.r.choice(CALLE[self.home])] += 1
            self.procs = +self.procs
        if self.moral <= 2 and self.grupo:
            self.crisis()
        if self.moral == 0 and self.grupo:
            for s in list(self.grupo):
                if d6(self.r) <= 3:
                    self.perder(s, 'se rompió el grupo')
            self.moral = 3
        if self.animo == 0:
            self.stats['quiebre'] += 1
            self.animo = 2

    def sondeo(self):
        self.stats['sondeos'] += 1
        frs = self.frs()
        f = {1: 'Puerta', 2: 'Puerta', 3: 'Ventanas', 4: 'Techo', 5: 'Subsuelo'}.get(d6(self.r))
        if f not in frs:
            f = min(frs, key=lambda f: self.frentes[f])
        q = d6(self.r)
        dmg = 1 if q <= 3 else 2 if q in (4, 5) else 1
        if q == 5 and self.etapa == 3:
            dmg = d6(self.r)
        if q == 6 and d6(self.r) <= 2:
            self.viv = max(0, self.viv - 2)
        if self.ref_id == 'e450' and f == 'Ventanas' and self.frentes[f] < 5 and self.aj['vidriera']:
            dmg += 1                                    # las vidrieras
        if self.trampas[f]:
            dmg = max(0, dmg - 1)
            if d6(self.r) <= 3:
                self.trampas[f].pop()
        self.frentes[f] = max(0, self.frentes[f] - dmg)
        if self.frentes[f] == 0:
            self.stats['entraron'] += 1
            if self.combate([[d6(self.r) + self.etapa, 1, 1, 1, 'Callados']], self.grupo, refugio=True):
                self.frentes[f] = 1
                self.moral = max(0, self.moral - 1)
            else:
                self.moral = max(0, self.moral - 3)
                self.viv //= 2

    def crisis(self):
        self.stats['crisis'] += 1
        x = d6(self.r)
        if x <= 2 and self.grupo and not ('Lista de presentes' in self.manas and x == 2):
            self.perder(self.r.choice(self.grupo), 'se fue')
            self.moral += 2
        elif x == 3:
            self.viv = max(0, self.viv - 2)
        elif x == 4:
            self.moral = max(0, self.moral - 1)
        elif self.prueba('Labia', bonus=(1 if 'Lista de presentes' in self.manas else 0) + (1 if self.apodo else 0)) >= 7:
            self.moral += 1

    # ------------------------------------------------------------ la Noche 40 (r220–r225, e900–e930)
    def sacar(self, s, defensores, asign):
        if s in defensores:
            defensores.remove(s)
        for lst in asign.values():
            if s in lst:
                lst.remove(s)

    def noche40(self):
        self.en_noche40 = True
        R = self.r
        frs = self.frs()
        defensores = [s for s in self.grupo if not s.grave and not (s.fiebre >= 3)]
        olas = 3 + self.rastro // 3 + self.aj['olas_extra']
        aliado = 3 if self.rep >= self.aj['rep_aliado'] else 0
        if aliado:
            self.stats['aliados'] += 1
        if 'blindado' in self.tesoros:
            self.frentes['Puerta'] = min(10, self.frentes['Puerta'] + 3)
        asign = {f: [] for f in frs}
        for s in sorted(defensores, key=lambda s: -(s.arma + (1 if s.pel() >= 2 else 0))):
            f = min(frs, key=lambda f: (len(asign[f]) - (1 if f == 'Puerta' else 0), self.frentes[f]))
            asign[f].append(s)
        yo = 'Puerta'
        uc = None
        bonus_def = 0
        menos = 0
        mitad = False
        self.log(f'== NOCHE 40: {olas} oleadas · frentes {self.frentes} · trampas {self.trampas} · '
                 f'defensores {len(defensores)} · Molotov {self.molotov} · Último Cuarto '
                 f'{"sí" if "Último Cuarto" in self.inst else "no"} · aliados {aliado}')
        for ola in range(1, olas + 1):
            fuerza = d6(R) + d6(R) + ola - menos
            menos = 0
            if mitad:
                fuerza = (fuerza + 1) // 2
                mitad = False
            esp = d6(R) >= 5
            y = d6(R) if esp else 0
            if uc is not None:
                golpes = [('UC', fuerza)]
            else:
                ntir = 2 if ola >= 4 else 1
                golpes = []
                for k in range(ntir):
                    f = {1: 'Puerta', 2: 'Puerta', 3: 'Ventanas', 4: 'Techo', 5: 'Subsuelo'}.get(d6(R))
                    if f not in frs:
                        f = min(frs, key=lambda f: self.frentes[f])
                    F = fuerza if ntir == 1 else ((fuerza + 1) // 2 if k == 0 else fuerza // 2)
                    golpes.append((f, F))
            for f, F in golpes:
                extra = 3 if y == 1 else 0
                if y == 2:
                    F += 1; menos = -1
                if y == 6:
                    F += 2
                if y == 4 and f != 'UC':
                    self.frentes[f] = max(0, self.frentes[f] - 1)
                if f == 'UC':
                    aqui = defensores
                    dfn = uc + sum(s.arma + (1 if s.pel() >= 2 else 0) + bonus_def for s in aqui)
                else:
                    tramp = sum(self.trampas[f]) if y != 5 else 0
                    self.trampas[f] = []
                    aqui = asign[f]
                    dfn = self.frentes[f] + tramp + aliado + \
                        sum(s.arma + (1 if s.pel() >= 2 else 0) + bonus_def for s in aqui)
                if f in ('UC', yo):
                    arma = self.mejor_arma(self.muni > 0) or self.mejor_arma(False) or self.armas[-1]
                    t = self.prueba('Puntería' if arma['fuego'] else 'Pelea',
                                    bonus=2 if 'La puerta' in self.manas and f == 'Puerta' else 0)
                    if arma['fuego']:
                        self.muni = max(0, self.muni - 1)
                    dfn += 2 * arma['d'] if t >= 10 else arma['d'] if t >= 7 else 0
                    if t <= 6:
                        self.herida(1, 'Noche 40')
                if self.molotov and F > dfn - 2:
                    usar = min(self.molotov, 2)
                    self.molotov -= usar
                    dfn += 3 * usar
                if dfn >= F:
                    if f == 'UC': uc -= 1
                    else: self.frentes[f] -= 1
                else:
                    falta = F - dfn + extra
                    if f == 'UC': uc -= falta
                    else: self.frentes[f] -= falta
                    for s in list(aqui):
                        if d6(R) >= 4:
                            s.h += 1
                            if s.h >= 3:
                                self.sacar(s, defensores, asign)
                                self.perder(s, 'cayó en la Noche 40')
                    if f in ('UC', yo):
                        self.mordida_tabla()
                if f != 'UC' and self.frentes[f] <= 0:       # brecha (e920)
                    self.stats['brechas'] += 1
                    M = self.mats
                    if M['Madera'] + M['Metal'] >= 2:
                        for _ in range(2):
                            if M['Madera']: M['Madera'] -= 1
                            else: M['Metal'] -= 1
                        t = self.prueba('Oficio')
                        if t >= 7:
                            self.frentes[f] = 3 if t >= 10 else 1
                            continue
                        self.mordida_tabla()
                    uc = (6 + (1 if 'Ojo de obra' in self.manas else 0)) if 'Último Cuarto' in self.inst else 2
                    self.stats['al_ultimo_cuarto'] += 1
                    for s in list(asign[f]):
                        if d6(R) >= 4:
                            s.h += 1
                    if f == yo:
                        self.mordida_tabla()
                    break
                if f == 'UC' and uc <= 0:                     # e925: por el techo
                    self.stats['ultima_puerta'] += 1
                    if self.prueba('Físico') >= 10:
                        self.grupo = [s for s in self.grupo if d6(R) >= 5]
                        self.stats['amanecer'] += 1
                        return
                    raise Fin('Noche 40')
            # entre oleadas (r224)
            bonus_def = 0
            M = self.mats
            if uc is None:
                for f in sorted(frs, key=lambda f: self.frentes[f])[:1 + len(defensores) // 2]:
                    if (M['Madera'] or M['Metal']) and self.frentes[f] < 7:
                        if M['Madera']: M['Madera'] -= 1
                        else: M['Metal'] -= 1
                        self.frentes[f] += 2
            elif M['Madera'] or M['Metal']:
                if M['Madera']: M['Madera'] -= 1
                else: M['Metal'] -= 1
                uc += 2
            if self.h >= 2 and M['Fármacos']:
                M['Fármacos'] -= 1
                if d6(R) + d6(R) + self.hab['Medicina'] >= 7:
                    self.h -= 1
            if ola == 2:                                      # e910
                x = d6(R)
                if x == 4 and uc is None:
                    ff = R.choice(frs); self.frentes[ff] = max(0, self.frentes[ff] - 1)
                elif x == 5 and defensores and self.prueba('Labia') <= 6:
                    s = min(defensores, key=lambda s: s.pel())
                    self.sacar(s, defensores, asign)
                    self.perder(s, 'huyó')
                elif x == 6:
                    menos = 1
                elif x == 1 and defensores:
                    self.sacar(R.choice(defensores), defensores, asign)
            if ola == 4:                                      # e912
                if len(defensores) >= 4:
                    vol = min(defensores, key=lambda s: s.pel())
                    t = d6(R) + d6(R) + (vol.lvl if vol.hab in ('Sigilo', 'Físico') else 0)
                    mitad = True
                    if t <= 9:
                        self.sacar(vol, defensores, asign)
                        if t <= 6:
                            self.perder(vol, 'voluntario')
                elif self.prueba('Labia') >= 7:
                    bonus_def = 1
        self.stats['amanecer'] += 1

    # ------------------------------------------------------------ el día 41 (e930, e581–e586)
    def abrir_secreto(self):
        """e570: el dado se tira al abrir; las pistas lo mueven (la rueda 1–6)."""
        x = d6(self.r)
        mover = 2 if self.pistas >= 6 else 1 if self.pistas >= 4 else 0
        malos = {1: 2, 2: 3}                             # qué tan mala es cada verdad para el jugador
        mejor = min((((x - 1 + k) % 6) + 1 for k in range(-mover, mover + 1)), key=lambda v: malos.get(v, 0))
        self.secreto = mejor
        self.stats[f'secreto_{mejor}'] += 1

    def dia41(self):
        R = self.r
        if self.secreto is None:
            self.abrir_secreto()                         # se abre recién al amanecer (e930)
        s = self.secreto
        if s == 1:
            ok = self.fiebre == 0
            return ok, (1 if ok else 0) + sum(1 for x in self.grupo if x.fiebre == 0), 'plazo' if ok else 'se quedaron'
        if s == 2:
            if self.secreto_abierto and R.random() < 0.75:
                return True, 1 + sum(1 for x in self.grupo if R.random() < 0.8), 'éxodo'
            ok = d6(R) >= 5 or (self.ref_id == 'e480' and d6(R) >= 4)
            return ok, (1 if ok else 0) + sum(1 for x in self.grupo if d6(R) >= 5), 'ceniza'
        return True, 1 + len(self.grupo), {3: 'ensayo', 4: 'empezar', 5: 'marea', 6: 'inmunes'}[s]

    def jugar(self):
        try:
            while self.dia < 40:
                self.alba()
                if self.pistas >= self.aj['abrir'] and not self.secreto_abierto:
                    self.secreto_abierto = True
                    self.abrir_secreto()
                    self.stats['abrio_dia'] = self.dia
                self.luz()
                if self.dia == 40:
                    break
                self.noche()
            self.noche40()
        except Fin as f:
            self.log(f'** FIN: {f.causa} el día {self.dia}')
            return dict(gano=False, salvado=False, causa=f.causa, dia=self.dia, gente=len(self.grupo),
                        stats=self.stats, final='muerte', salvados=0, ref=self.ref_id, inst=len(self.inst),
                        rastro=self.rastro, prota=self.prota)
        ps, sal, final = self.dia41()
        self.log(f'** AMANECER · final {final} · salvados {sal}')
        return dict(gano=True, salvado=ps, causa=None, dia=41, gente=len(self.grupo), stats=self.stats, final=final,
                    salvados=sal, ref=self.ref_id, inst=len(self.inst), rastro=self.rastro, prota=self.prota,
                    apodo=self.apodo, manas=len(self.manas), ganadas=sorted(self.manas - set(self.prota['manas'])))


AJUSTES = dict(desarmar=10, amputable=0.83, reserva_dias=3, radio=2, dia_uc=18, olas_extra=0, rep_aliado=6, esconderse=True, encima=2, esc_fallo=1, spawn3=True, arma_ini=0, salir_siempre=False, huerta=True, jardineros=2, min_compas=1, nada=3, volver=True, rodear=True, tabla='H', basicas=True, desarmar_afuera='grupo', reserva_cura=1, buscar_gente=3, vidriera=True,
               superar=0.25, senal=0.3, abrir=4, mayor_h=4, mayor_magullado=False, mayor_puntos=0)


def informe(res, prota):
    n = len(res)
    g = sum(r['gano'] for r in res)
    s = sum(r['salvado'] for r in res)
    causas = Counter(r['causa'] for r in res if not r['gano'])
    dias = [r['dia'] for r in res if not r['gano']]
    print(f'\n## {prota}  ({n} partidas)')
    print(f'  Llegan al amanecer: {100 * g / n:.1f} %   ·   salvados según el Secreto: {100 * s / n:.1f} %')
    if dias:
        print(f'  Muertes: día medio {st.mean(dias):.1f}  ·  ' +
              ', '.join(f'{k} {100 * v / n:.1f} %' for k, v in causas.most_common()))
    vivos = [r for r in res if r['gano']]
    if vivos:
        print(f'  Al amanecer: {st.mean(r["gente"] for r in vivos):.1f} sobrevivientes · '
              f'{st.mean(r["salvados"] for r in vivos):.1f} salvados · '
              f'{st.mean(r["inst"] for r in vivos):.1f} instalaciones · Rastro {st.mean(r["rastro"] for r in vivos):.1f}')
        print('  Finales: ' + ', '.join(f'{k} {100 * v / n:.0f} %' for k, v in Counter(r['final'] for r in res).most_common()))
    S = Counter()
    for r in res:
        S.update(r['stats'])
    print('  Por partida: ' + ' · '.join(f'{k} {S[k] / n:.1f}' for k in (
        'salidas', 'eventos', 'combates', 'procesiones', 'sondeos', 'entraron', 'crisis', 'unidos', 'perdidos',
        'mordido', 'amputado', 'hambre', 'tesoros', 'brechas', 'al_ultimo_cuarto', 'ultima_puerta', 'aliados',
        'caidas', 'rescatado', 'volvio', 'rastro_eventos', 'rastro_gente', 'rastro_ruido')))
    print('  Por refugio: ' + porc(res, lambda r: NOMBRE_REF[r['ref']]))
    return g / n, s / n


def porc(res, clave):
    d = defaultdict(list)
    for r in res:
        for k in (clave(r) if isinstance(clave(r), (set, list, tuple)) else (clave(r),)):
            d[k].append(r['gano'])
    return ' · '.join(f'{k} {100 * sum(v) / len(v):.0f} %' for k, v in sorted(d.items()))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-n', type=int, default=8000)
    ap.add_argument('--edad', choices=sorted(set(EDADES)))
    ap.add_argument('--oficio', choices=ORDEN_OFICIOS)
    ap.add_argument('--motivo', choices=MOTIVOS)
    ap.add_argument('--refugio', choices=list(REFUGIOS))
    ap.add_argument('--semilla', type=int, default=1)
    ap.add_argument('--traza', action='store_true')
    ap.add_argument('--ajuste', action='append', default=[], help='clave=valor de AJUSTES, para probar variantes')
    a = ap.parse_args()
    aj = {k: eval(v) for k, v in (x.split('=', 1) for x in a.ajuste)}
    ev = leer_eventos()
    tablas, lugares = leer_tablas(ev)
    datos = (ev, tablas, lugares, leer_refugios(ev), leer_baraja(ev))
    r = random.Random(a.semilla)
    fijo = dict(edad=a.edad, oficio=a.oficio, motivo=a.motivo)
    if a.traza:
        p = Partida(datos, crear(r, fijo), r, a.refugio, traza=True)
        print('Protagonista:', {k: v for k, v in p.prota.items() if k != 'hab'}, dict(+p.prota['hab']))
        res = p.jugar()
        print({k: v for k, v in res.items() if k not in ('stats', 'prota')}, dict(res['stats']))
        return
    res = [Partida(datos, crear(r, fijo), r, a.refugio, ajustes=aj).jugar() for _ in range(a.n)]
    informe(res, 'Protagonistas creadas al azar')
    print('  Por edad: ' + porc(res, lambda r: r['prota']['edad']))
    print('  Por oficio: ' + porc(res, lambda r: r['prota']['oficio']))
    print('  Por Motivo: ' + porc(res, lambda r: r['prota']['motivo']))
    print('  Por debilidad: ' + porc(res, lambda r: tuple(sorted(r['prota']['debilidades']))))
    print('  Por barrio propio: ' + porc(res, lambda r: r['prota']['barrio']))
    print('  Con dos debilidades: ' + porc(res, lambda r: 'dos' if len(r['prota']['debilidades']) == 2 else 'una'))
    vivos = [r for r in res if r['gano']]
    if vivos:
        print('  Apodos al amanecer: ' + ', '.join(f'{k} {v}' for k, v in Counter(r['apodo'] for r in vivos).most_common(5)) +
              f' · mañas por cabeza {st.mean(r["manas"] for r in vivos):.1f}')
    G = Counter(m for r in vivos for m in r['ganadas'])
    print('  Mañas ganadas en la partida (de los que llegan): ' + ', '.join(f'{k} {100 * v / len(vivos):.0f} %' for k, v in G.most_common()))
    S = Counter()
    for r in res:
        S.update(r['stats'])
    print('  Secreto: ' + ', '.join(f'{k[-1]} {100 * v / len(res):.0f} %' for k, v in sorted(S.items()) if k.startswith('secreto_')) +
          f' · abierto antes de la Noche 40 en {100 * sum(1 for r in res if r["stats"]["abrio_dia"]) / len(res):.0f} %')
    F = {k[6:]: v for k, v in S.items() if k.startswith('falta_')}
    nf = sum(1 for r in res if r['prota']['motivo'] == 'El que falta')
    if nf:
        print('  El que falta (de %d partidas): ' % nf + ', '.join(f'{k} {100 * v / nf:.0f} %' for k, v in sorted(F.items(), key=lambda x: -x[1])) +
              f' · sin encontrar {100 * (nf - sum(F.values())) / nf:.0f} %')
    # cuántas fichas distintas: edad × oficio × barrio × Motivo × debilidad (sin contar objetos ni puntos)
    distintas = len({(r['prota']['edad'], r['prota']['oficio'], r['prota']['barrio'], r['prota']['motivo'],
                      tuple(sorted(r['prota']['debilidades']))) for r in res})
    print(f'  Fichas distintas en {len(res)} partidas: {distintas}')


if __name__ == '__main__':
    main()
