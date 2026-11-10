"""Plano de Tolme en SVG, como un plano de subte: doce estaciones, una por barrio (r150–r151).

La Calle (amarillo) une a los vecinos; las Azoteas (gris) solo el centro denso; el Subsuelo (rojo)
va por debajo. Las conexiones son las de libro/95-apendices.md («El plano de Tolme»).
"""

BARRIOS = {   # n: (nombre, (x, y), anclaje de la etiqueta, entrada «llegar», refugio)
    1: ('El Casco', (330, 300), 'n', 'e200', 'Parroquia de San Lázaro'),
    2: ('Sanidad', (455, 330), 'e', 'e220', 'Edificio Sarmiento'),
    3: ('El Puerto', (265, 455), 's', 'e240', 'Cuartel de la calle Brown'),
    4: ('La Fabril', (95, 430), 'w', 'e260', None),
    5: ('Los Bloques', (330, 185), 'ne', 'e280', 'Escuela N.º 9'),
    6: ('Las Lomas', (560, 110), 'n', 'e300', None),
    7: ('La Estación', (190, 335), 'w', 'e320', 'Comisaría 7.ª'),
    8: ('El Mercado', (200, 215), 'w', 'e340', 'Supermercado Del Barrio'),
    9: ('Ciudad Universitaria', (545, 445), 'e', 'e360', None),
    10: ('La Costanera', (410, 530), 's', 'e380', None),
    11: ('Cementerio y Parque', (440, 150), 'n', 'e400', None),
    12: ('El Perímetro', (95, 110), 'n', 'e420', None),
}
CALLE = [(3, 1), (1, 2), (2, 9), (9, 10), (10, 3),             # línea del río
         (1, 5), (5, 8), (8, 7), (7, 1),                       # línea del centro
         (7, 4), (4, 12), (12, 6), (6, 9),                     # línea de la periferia
         (1, 8), (2, 5), (5, 11), (11, 6), (11, 12), (3, 4)]   # ramales
AZOTEAS = [(1, 2), (1, 5), (1, 8), (5, 2), (5, 8)]
SUBSUELO = [(9, 2), (2, 1), (1, 7), (7, 8),                    # línea C
            (1, 3), (3, 10),                                   # cloaca del río
            (7, 4),                                            # túnel de las cocheras
            (5, 11)]                                           # pluvial del oeste

TINTA = '#141414'
AMARILLO = '#f2c12e'
ROJO = '#d2412c'
GRIS = '#8d877b'
PAPEL = '#f4eedf'


def _desplazar(a, b, d):
    (xa, ya), (xb, yb) = a, b
    dx, dy = xb - xa, yb - ya
    n = (dx * dx + dy * dy) ** .5 or 1
    ox, oy = -dy / n * d, dx / n * d
    return (xa + ox, ya + oy), (xb + ox, yb + oy)


def svg_mapa(clase='mapa', enlaces=True):
    P = {n: v[1] for n, v in BARRIOS.items()}
    p = [f'<svg class="{clase}" viewBox="0 0 640 600" xmlns="http://www.w3.org/2000/svg">']
    # el río, abajo a la derecha
    p.append(f'<path d="M0,585 C150,560 300,600 430,575 C520,558 590,520 640,505 L640,600 L0,600Z" fill="{TINTA}" opacity=".12"/>')
    for k in range(6):
        y = 588 - k * 3
        p.append(f'<path d="M{40 + k * 70},{y} q15,-5 30,0" stroke="{TINTA}" stroke-width="1" fill="none" opacity=".35"/>')
    # el muro: un rectángulo cortado, de contenedores
    p.append(f'<rect x="22" y="40" width="596" height="510" fill="none" stroke="{TINTA}" stroke-width="7" '
             f'stroke-dasharray="26 5"/>')
    # la Calle: casing negro y relleno amarillo
    for a, b in CALLE:
        (xa, ya), (xb, yb) = P[a], P[b]
        p.append(f'<line x1="{xa}" y1="{ya}" x2="{xb}" y2="{yb}" stroke="{TINTA}" stroke-width="13" stroke-linecap="round"/>')
    for a, b in CALLE:
        (xa, ya), (xb, yb) = P[a], P[b]
        p.append(f'<line x1="{xa}" y1="{ya}" x2="{xb}" y2="{yb}" stroke="{AMARILLO}" stroke-width="8" stroke-linecap="round"/>')
    # el Subsuelo: rojo, paralelo a la calle
    for a, b in SUBSUELO:
        (xa, ya), (xb, yb) = _desplazar(P[a], P[b], 9)
        p.append(f'<line x1="{xa:.1f}" y1="{ya:.1f}" x2="{xb:.1f}" y2="{yb:.1f}" stroke="{ROJO}" stroke-width="4" '
                 f'stroke-dasharray="9 4"/>')
    # las Azoteas: gris punteado, del otro lado
    for a, b in AZOTEAS:
        (xa, ya), (xb, yb) = _desplazar(P[a], P[b], -9)
        p.append(f'<line x1="{xa:.1f}" y1="{ya:.1f}" x2="{xb:.1f}" y2="{yb:.1f}" stroke="{GRIS}" stroke-width="3.2" '
                 f'stroke-dasharray="2 4" stroke-linecap="round"/>')
    # estaciones
    et = []
    for n, (nombre, (x, y), anc, tabla, refugio) in BARRIOS.items():
        g = (f'<circle cx="{x}" cy="{y}" r="21" fill="{PAPEL}" stroke="{TINTA}" stroke-width="4.5"/>'
             f'<text x="{x}" y="{y + 8}" text-anchor="middle" font-family="Anton" font-size="22" fill="{TINTA}">{n}</text>')
        if refugio:
            g += (f'<rect x="{x + 13}" y="{y - 27}" width="16" height="16" fill="{TINTA}"/>'
                  f'<path d="M{x + 15},{y - 17} l6,-6 6,6 v4 h-12z" fill="{AMARILLO}"/>')
        p.append(f'<a href="#{tabla}">{g}</a>' if enlaces else g)
        dx, dy, ta = {'n': (0, -32, 'middle'), 's': (0, 42, 'middle'), 'e': (30, 6, 'start'), 'w': (-30, 6, 'end'),
                      'ne': (24, -24, 'start')}[anc]
        etiqueta = nombre.upper()
        w = len(etiqueta) * 8.4 + 10
        bx = x + dx - (w / 2 if ta == 'middle' else (w - 4 if ta == 'end' else 4))
        et.append(f'<rect x="{bx:.1f}" y="{y + dy - 14}" width="{w:.1f}" height="19" fill="{PAPEL}" opacity=".92"/>')
        et.append(f'<text x="{x + dx}" y="{y + dy}" text-anchor="{ta}" font-family="PT Sans Narrow" font-weight="700" '
                  f'font-size="15" letter-spacing="1" fill="{TINTA}">{etiqueta}</text>')
        et.append(f'<text x="{x + dx}" y="{y + dy + 13}" text-anchor="{ta}" font-family="IBM Plex Mono" font-size="9.5" '
                  f'fill="{TINTA}" opacity=".7">{tabla}</text>')
    p.append(''.join(et))
    # leyenda
    ly = 22
    p.append(f'<g font-family="PT Sans Narrow" font-weight="700" font-size="12" fill="{TINTA}" letter-spacing=".8">'
             f'<rect x="40" y="{ly - 8}" width="560" height="22" fill="{PAPEL}"/>'
             f'<line x1="48" y1="{ly + 3}" x2="80" y2="{ly + 3}" stroke="{TINTA}" stroke-width="11"/>'
             f'<line x1="48" y1="{ly + 3}" x2="80" y2="{ly + 3}" stroke="{AMARILLO}" stroke-width="6"/>'
             f'<text x="86" y="{ly + 7}">LA CALLE ◷ 1</text>'
             f'<line x1="186" y1="{ly + 3}" x2="218" y2="{ly + 3}" stroke="{GRIS}" stroke-width="3.2" stroke-dasharray="2 4"/>'
             f'<text x="224" y="{ly + 7}">LAS AZOTEAS ◷ 2</text>'
             f'<line x1="340" y1="{ly + 3}" x2="372" y2="{ly + 3}" stroke="{ROJO}" stroke-width="4" stroke-dasharray="9 4"/>'
             f'<text x="378" y="{ly + 7}">EL SUBSUELO ◷ 1</text>'
             f'<rect x="496" y="{ly - 5}" width="14" height="14" fill="{TINTA}"/>'
             f'<path d="M498,{ly + 4} l5,-5 5,5 v3 h-10z" fill="{AMARILLO}"/>'
             f'<text x="516" y="{ly + 7}">REFUGIO</text></g>')
    p.append('</svg>')
    return ''.join(p)
