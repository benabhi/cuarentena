#!/usr/bin/env python3
"""Convierte el libro (cuarentena/libro/*.md) en datos para la app.

Salida: app/datos/libro.json con
  entradas:  {id: {id, tipo, n, titulo, cap, lugar, md}}   todas las reglas y eventos
  orden:     ids en el orden del libro
  barrios:   {clave: {n, ev, tabla {resultado: e}, lugares [e], refugio, conex {calle, azoteas, subsuelo}}}
  lugares:   {e: {barrio, titulo, tipo, botin, stock}}
  refugios:  {e: {barrio, titulo, tipo, botin, stock, frentes, viveres, mats, municion, rastro}}
  botin:     {tabla: {1..6: texto}}                     (r162)
  sobrevivientes: {e: {n, ficha [líneas], hab, nivel, rasgo, avisos [{cartas, ev}]}}
  marcas:    {MARCA: [ids]}
  textos:    [{titulo, md}]                             (el mundo y los apéndices)
La app no reescribe el libro: lo lee. Si el libro cambia, se vuelve a correr esto.
"""
import datetime, glob, json, os, re, sys

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAIZ = os.path.dirname(APP)
LIBRO = os.path.join(RAIZ, 'libro')

BARRIOS = {  # clave: (nombre, entrada de la tabla)
    'casco': ('El Casco', 'e200'), 'sanidad': ('Sanidad', 'e220'), 'puerto': ('El Puerto', 'e240'),
    'fabril': ('La Fabril', 'e260'), 'bloques': ('Los Bloques', 'e280'), 'lomas': ('Las Lomas', 'e300'),
    'estacion': ('La Estación', 'e320'), 'mercado': ('El Mercado', 'e340'), 'universidad': ('Ciudad Universitaria', 'e360'),
    'costanera': ('La Costanera', 'e380'), 'cementerio': ('Cementerio y Parque', 'e400'), 'perimetro': ('El Perímetro', 'e420'),
}
# nombres cortos con que el libro escribe las conexiones
CORTO = {'Casco': 'casco', 'Sanidad': 'sanidad', 'Puerto': 'puerto', 'Fabril': 'fabril', 'Bloques': 'bloques',
         'Lomas': 'lomas', 'Estación': 'estacion', 'Mercado': 'mercado', 'Universidad': 'universidad',
         'Costanera': 'costanera', 'Cementerio': 'cementerio', 'Perímetro': 'perimetro'}
TIPO_BOTIN = {'Farmacia': 'farmacia', 'Almacén': 'almacen', 'Ferretería': 'ferreteria', 'Hospital': 'hospital',
              'Policía': 'policia', 'Armería': 'policia', 'Vivienda': 'vivienda', 'Oficina': 'oficina',
              'Taller': 'taller', 'Comercio': 'comercio', 'El Destacamento': 'policia'}
COLUMNAS_BOTIN = {'Farmacia': 'farmacia', 'Almacén / Súper': 'almacen', 'Ferretería': 'ferreteria',
                  'Hospital / Clínica': 'hospital', 'Armería / Policía': 'policia', 'Vivienda': 'vivienda',
                  'Oficina / Escuela': 'oficina', 'Taller / Fábrica': 'taller', 'Comercio': 'comercio'}
REFUGIOS = ['e440', 'e450', 'e460', 'e470', 'e480', 'e490']


def leer():
    entradas, orden, textos = {}, [], []
    for f in sorted(glob.glob(os.path.join(LIBRO, '*.md'))):
        base = os.path.basename(f)
        if base.startswith('96-'):
            continue
        cap, actual, texto_actual, bloque = '', None, None, []

        def cerrar():
            nonlocal actual, texto_actual, bloque
            md = '\n'.join(bloque).strip()
            md = re.sub(r'\n-{3,}\s*$', '', md).strip()
            if actual:
                e = entradas[actual]
                lineas = md.split('\n')
                if lineas and re.match(r'^\*[^*].*\*$', lineas[0].strip()):
                    e['lugar'] = lineas[0].strip().strip('*')
                    md = '\n'.join(lineas[1:]).strip()
                e['md'] = md
            elif texto_actual is not None:
                texto_actual['md'] = md
            actual, texto_actual, bloque = None, None, []

        for linea in open(f, encoding='utf-8').read().split('\n'):
            if re.match(r'^<a id="[re]\d{3}"></a>\s*$', linea):
                continue
            if re.match(r'^# ', linea) or linea.strip() == '---':
                if texto_actual is None and actual is None:
                    continue
            m2 = re.match(r'^## (.+)$', linea)
            m3 = re.match(r'^### (.+)$', linea)
            if m2:
                cerrar()
                cap = m2.group(1).strip()
                if base.startswith(('01-', '95-')):
                    texto_actual = {'titulo': cap, 'md': '', 'fuente': 'El mundo' if base.startswith('01-') else 'Apéndices'}
                    textos.append(texto_actual)
                continue
            if m3:
                mm = re.match(r'^([re])(\d{3}) · (.+)$', m3.group(1).strip())
                if mm:
                    cerrar()
                    eid = mm.group(1) + mm.group(2)
                    entradas[eid] = {'id': eid, 'tipo': mm.group(1), 'n': int(mm.group(2)), 'titulo': mm.group(3).strip(),
                                     'cap': cap, 'lugar': '', 'md': ''}
                    orden.append(eid)
                    actual = eid
                    continue
                if texto_actual is not None:
                    bloque.append('#### ' + m3.group(1).strip())
                    continue
                if base.startswith('00-'):
                    continue
            bloque.append(linea)
        cerrar()
    return entradas, orden, [t for t in textos if t['md'].strip()]


def barrios_y_lugares(E):
    barrios, lugares = {}, {}
    for clave, (nombre, eid) in BARRIOS.items():
        md = E[eid]['md']
        tabla = {}
        for m in re.finditer(r'^\| (\d+) \| \[(e\d{3})\]\(#e\d{3}\)(?: \| (\d+) \| \[(e\d{3})\]\(#e\d{3}\))?', md, re.M):
            tabla[m.group(1)] = m.group(2)
            if m.group(3):
                tabla[m.group(3)] = m.group(4)
        conex = {'calle': [], 'azoteas': [], 'subsuelo': []}
        mc = re.search(r'\*\*Conexiones:\*\* (.+)', md)
        for parte in re.split(r' · |\. ', mc.group(1)):
            mm = re.match(r'(Calle|Azoteas|Subsuelo) a (.+)', parte.strip().rstrip('.'))
            if mm:
                capa = {'Calle': 'calle', 'Azoteas': 'azoteas', 'Subsuelo': 'subsuelo'}[mm.group(1)]
                conex[capa] = [CORTO[x.strip()] for x in re.split(r',| y ', mm.group(2)) if x.strip()]
        ids = re.findall(r'\((?:\[)?(e\d{3})', re.search(r'\*\*Lugares:\*\* (.+)', md).group(1))
        mr = re.search(r'\*\*Refugio:\*\* .*?\[(e\d{3})\]', md)
        barrios[clave] = {'n': nombre, 'ev': eid, 'tabla': tabla, 'lugares': ids, 'refugio': mr.group(1) if mr else None,
                          'conex': conex}
        for pid in ids:
            lug = E[pid]['lugar']
            campos = [c.strip() for c in lug.split('·')]
            stock = lug.count('▢')
            tipo = campos[1] if len(campos) > 1 else ''
            lugares[pid] = {'barrio': clave, 'titulo': E[pid]['titulo'], 'tipo': tipo,
                            'botin': TIPO_BOTIN.get(tipo), 'stock': stock}
    # simetría: si A va a B por una capa, B va a A
    for a, b in barrios.items():
        for capa, vs in b['conex'].items():
            for v in vs:
                if a not in barrios[v]['conex'][capa]:
                    raise SystemExit(f'conexión asimétrica: {a} → {v} por {capa}')
    return barrios, lugares


def refugios(E):
    out = {}
    clave_de = {v[0]: k for k, v in BARRIOS.items()}
    for eid in REFUGIOS:
        md = E[eid]['md']
        barrio = clave_de[E[eid]['lugar'].split('·')[0].strip()]
        tipo = re.search(r'\*\*Tipo:\*\* (\w+)', md).group(1)
        stock = re.search(r'\*\*Stock:\*\* (▢+)', md).group(1).count('▢')
        frentes = {}
        for f in ('Puerta', 'Ventanas', 'Techo', 'Subsuelo'):
            m = re.search(r'\*\*' + f + r'\*\* (\d+|—)', md)
            frentes[f] = None if m.group(1) == '—' else int(m.group(1))
        viv = int(re.search(r'\*\*Víveres:\*\* (\d+)', md).group(1))
        mats, muni = {}, 0
        lm = re.search(r'\*\*Materiales:\*\* (.+)', md).group(1)
        for n, mat in re.findall(r'(\d+) (Madera|Metal|Tela|Químicos|Sujeción|Electrónica|Combustible|Fármacos|Munición)', lm):
            if mat == 'Munición':
                muni = int(n)
            else:
                mats[mat] = int(n)
        mr = re.search(r'\*\*Rastro inicial:\*\* (\d+)', md)
        out[eid] = {'barrio': barrio, 'titulo': E[eid]['titulo'], 'tipo': tipo,
                    'botin': TIPO_BOTIN.get({'Almacén': 'Almacén', 'Policía': 'Policía'}.get(tipo, tipo), 'vivienda'),
                    'stock': stock, 'frentes': frentes, 'viveres': viv, 'mats': mats, 'municion': muni,
                    'rastro': int(mr.group(1)) if mr else 1}
    return out


def botin(E):
    tablas = {}
    md = E['r162']['md']
    for bloque in re.split(r'\n\s*\n', md):
        filas = [l for l in bloque.split('\n') if l.startswith('|')]
        if len(filas) < 3:
            continue
        cab = [c.strip() for c in filas[0].strip('|').split('|')]
        for fila in filas[2:]:
            c = [x.strip() for x in fila.strip('|').split('|')]
            for i, col in enumerate(cab[1:], 1):
                tablas.setdefault(COLUMNAS_BOTIN[col], {})[c[0]] = c[i]
    return tablas


def sobrevivientes(E):
    out = {}
    for n in range(600, 654):
        eid = f'e{n}'
        if eid not in E:
            continue
        md = E[eid]['md']
        ficha = [l[2:].strip() for l in md.split('\n') if l.startswith('> ')]
        if not ficha or not E[eid]['lugar'].startswith('Sobreviviente'):
            continue
        primera = ficha[0]
        nombre = re.match(r'\*\*(.+?)\*\*', primera).group(1)
        hab = re.search(r'\*\*(Pelea|Puntería|Sigilo|Físico|Oficio|Mecánica|Medicina|Supervivencia|Labia|Calle) (\d)\*\*', ' '.join(ficha))
        rasgo = re.search(r'(Valiente|Cobarde|Glotón|Insomne|Creyente|Ladrón|Optimista|Fanfarrón|Testarudo|Curioso|Frío|Leal)', primera)
        avisos = []
        for linea in ficha:
            for m in re.finditer(r'[Aa] las (\d+) cartas(?: en el grupo)? → \[(e\d{3})\]', linea):
                avisos.append({'cartas': int(m.group(1)), 'ev': m.group(2)})
        out[eid] = {'n': nombre, 'ficha': ficha, 'hab': hab.group(1) if hab else None,
                    'nivel': int(hab.group(2)) if hab else 0, 'rasgo': rasgo.group(1) if rasgo else None,
                    'avisos': avisos, 'perro': 'perro' in primera, 'pareja': 'dos personas' in primera}
    return out


def baraja(E):
    """r132: palo → evento con sus columnas Leve y Fuerte (1d6), y las figuras."""
    out = {}
    for palo, eid in (('Oros', 'e020'), ('Copas', 'e030'), ('Espadas', 'e040'), ('Bastos', 'e050')):
        md = E[eid]['md']
        col = {}
        for nombre in ('Leve', 'Fuerte'):
            m = re.search(r'\*' + nombre + r' \([^)]*\):\* (.+)', md)
            col[nombre.lower()] = dict(re.findall(r'\*\*(\d)\*\* \[(e\d{3})\]', m.group(1)))
        out[palo] = {'ev': eid, 'leve': col['leve'], 'fuerte': col['fuerte']}
    figuras = {}
    for n in range(60, 72):
        t = E[f'e0{n}']['titulo']
        m = re.match(r'(Sota|Caballo|Rey) de (Oros|Copas|Espadas|Bastos)', t)
        figuras.setdefault(m.group(2), {})[m.group(1)] = f'e0{n}'
    for palo in out:
        out[palo]['figuras'] = figuras[palo]
    return out


def marcas():
    out = {}
    idx = open(os.path.join(LIBRO, '96-indice-marcas.md'), encoding='utf-8').read()
    for m in re.finditer(r'^\| `([^`]+)` \| (.+) \|$', idx, re.M):
        out[m.group(1)] = re.findall(r'\[([re]\d{3})\]', m.group(2))
    return out


def main():
    E, orden, textos = leer()
    barrios, lugares = barrios_y_lugares(E)
    portada = open(os.path.join(LIBRO, '00-portada.md'), encoding='utf-8').read()
    datos = {
        'version': datetime.datetime.now().strftime('%Y-%m-%d %H:%M'),
        'lema': 'Cuarenta días encerrados. Después, la Marea.',
        'subtitulo': re.search(r'^### (.+)$', portada, re.M).group(1),
        'entradas': E, 'orden': orden, 'barrios': barrios, 'lugares': lugares, 'refugios': refugios(E),
        'botin': botin(E), 'baraja': baraja(E), 'sobrevivientes': sobrevivientes(E), 'marcas': marcas(), 'textos': textos,
    }
    os.makedirs(os.path.join(APP, 'datos'), exist_ok=True)
    salida = os.path.join(APP, 'datos', 'libro.json')
    with open(salida, 'w', encoding='utf-8') as fh:
        json.dump(datos, fh, ensure_ascii=False, separators=(',', ':'))
    nr = sum(1 for e in E.values() if e['tipo'] == 'r')
    print(f'{len(E)} entradas ({nr} reglas, {len(E) - nr} eventos), {len(lugares)} lugares, '
          f'{len(datos["sobrevivientes"])} sobrevivientes, {len(datos["marcas"])} marcas · {os.path.getsize(salida) // 1024} KB')


if __name__ == '__main__':
    main()
