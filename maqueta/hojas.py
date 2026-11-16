"""Hojas de juego (protagonista, refugio, grupo), compuestas a mano.

Cada hoja es una o dos páginas exactas: el último bloque de cada página se estira
(flex) hasta el pie, así no queda espacio muerto ni líneas sueltas.
El texto de referencia está también en libro/95-apendices.md; si cambia una regla,
cambiar los dos."""

from html import escape as esc


def cas(n, grupo=5, clase=''):
    """n casillas en grupos (5 y 5, nunca una suelta)."""
    trozos = []
    for i in range(0, n, grupo):
        k = min(grupo, n - i)
        trozos.append('<span class="hj-g">' + '<span class="hj-c"></span>' * k + '</span>')
    return f'<span class="hj-cas {clase}">' + ''.join(trozos) + '</span>'


def pista(n, desde=1, grupo=None):
    """Casillas numeradas (un registro que va de 0 a n: se marca el valor actual).
    Grupos parejos: 10 = 5 y 5, 6 = 3 y 3."""
    if grupo is None:
        grupo = 5 if n % 5 == 0 else (3 if n % 3 == 0 else n)
    trozos = []
    for i in range(desde, n + 1, grupo):
        trozos.append('<span class="hj-g">' + ''.join(f'<span class="hj-n">{k}</span>'
                                                     for k in range(i, min(i + grupo, n + 1))) + '</span>')
    return '<span class="hj-pista">' + ''.join(trozos) + '</span>'


def op(t):
    return f'<span class="hj-op"><span class="hj-c"></span>{t}</span>'


def linea(w=None):
    estilo = f' style="width:{w}mm;flex:none"' if w else ''
    return f'<span class="hj-l"{estilo}></span>'


def ref(r):
    return f'<span class="hj-ref">{r}</span>'


def cab(titulo, sub=''):
    return (f'<div class="h-cab"><div class="h-tit">{esc(titulo)}</div>'
            f'{f"<div class=hj-dorso>{esc(sub)}</div>" if sub else ""}</div>')


def form(t, s):
    return f'<div class="hj-form"><b>{t}</b><i>{s}</i></div>'


def sec(t, nota=''):
    return f'<div class="hj-sec">{t}{f" <span>{nota}</span>" if nota else ""}</div>'


def filas(pares, clase=''):
    return (f'<table class="hj-t {clase}">' +
            ''.join(f'<tr><th>{a}</th><td>{b}</td></tr>' for a, b in pares) + '</table>')


def pagina(ancla, titulo, cuerpo, primera=True):
    ide = f' id="{ancla}" data-titulo="{esc(titulo)}"' if primera else ''
    return f'<section class="hoja hj-pag"{ide}>{cuerpo}</section>'


# --------------------------------------------------------------------------- protagonista
def protagonista(ancla, titulo):
    hab = ['Pelea', 'Puntería', 'Sigilo', 'Físico', 'Oficio', 'Mecánica', 'Medicina', 'Supervivencia', 'Labia', 'Calle']
    filas_hab = ''
    for a, b in zip(hab[:5], hab[5:]):
        filas_hab += (f'<tr><th>{a}</th><td class="hj-niv"></td><td>{cas(3)}</td><td class="hj-sem"></td>'
                      f'<th class="hj-sep">{b}</th><td class="hj-niv"></td><td>{cas(3)}</td><td class="hj-sem"></td></tr>')
    p1 = (cab(titulo) +
          form('FORMULARIO C-40 · REGISTRO DE PERSONA NO EVACUADA', 'Completar con letra de imprenta. Conservar en todo momento.') +
          filas([
              ('Nombre', linea() + '<span class="hj-et">Pronombre</span>' + op('el') + op('la')),
              (f'Edad {ref("r101")}', op('Joven') + op('Adulto') + op('Mayor') +
               f'<span class="hj-et">Apodo {ref("r127")}</span>' + linea()),
              (f'Oficio {ref("r102")}', '<span class="hj-pre">OFICIO_</span>' + linea() +
               f'<span class="hj-et">Mañas {ref("r126")}</span>' + linea()),
              (f'Barrio {ref("r103")}', '<span class="hj-pre">BARRIO_</span>' + linea() +
               '<span class="hj-et">Conocido</span>' + linea()),
              ('Lo que sabés', linea()),
              (f'Motivo {ref("r104")}', op('La lista') + op('La obra') + op('La orden') + op('El pedido') +
               op('El que falta') + op('Lo que hiciste') + '<span class="hj-et">Fila</span>' + linea(8)),
              (f'Debilidad {ref("r105")}', linea() + '<span class="hj-et">Superada</span>' + cas(1)),
          ], 'hj-datos') +
          sec('Habilidades', f'de 0 a 5 · tres casillas de práctica {ref("r124")} · Semana: un palito por cada 10+ los días 1 a 7 {ref("r127")}') +
          '<table class="hj-t hj-hab"><tr class="hj-tc"><th>Habilidad</th><td>Nivel</td><td>Práctica</td><td>Semana</td>'
          '<th class="hj-sep">Habilidad</th><td>Nivel</td><td>Práctica</td><td>Semana</td></tr>' + filas_hab + '</table>' +
          sec('El cuerpo') +
          filas([
              (f'Heridas {ref("r190")}', op('Magullado') + op('Lastimado') + op('Herido') + op('Grave') + op('Muriendo') + '<span class="hj-nota">el Mayor tacha Lastimado</span>'),
              (f'Fiebre {ref("r191")}', pista(6) + '<span class="hj-nota">sube cada alba · en 6, te convertís</span>'),
              (f'Reservas {ref("r193")}', pista(6) + '<span class="hj-nota">en 0, Desventaja y 1 Herida cada alba</span>'),
              (f'Ánimo {ref("r194")}', pista(6) + '<span class="hj-nota">empieza en 4 (Joven, 5) · en 0, Quiebre</span>'),
              (f'Contador {ref("r198")}', pista(6) + '<span class="hj-nota">empieza en 2 · la Culpa, en 4 y baja</span>'),
              (f'Señales {ref("e845")}', pista(6) + '<span class="hj-nota">solo El que falta · último lugar</span>' + linea()),
              (f'Amputado {ref("r192")}', linea()),
          ], 'hj-cuerpo') +
          sec('Recetas que conocés', f'las básicas las sabe todo el mundo {ref("r203")}') +
          '<div class="hj-renglones hj-estira hj-dos"></div>')
    mochila = ''.join(f'<td><span class="hj-k">{k}</span></td>' for k in range(1, 5))
    mochila2 = ''.join(f'<td><span class="hj-k">{k}</span></td>' for k in range(5, 9))
    armas = ''.join(f'<tr><td></td><td></td><td></td><td></td><td>{cas(8, 4)}</td><td></td></tr>' for _ in range(3))
    p2 = (cab(titulo, 'dorso') +
          sec('La salida de hoy', f'el Ruido vuelve a 0 en el refugio · con 3, Callados; con 6, la Procesión {ref("r154")}') +
          filas([
              (f'Horas {ref("r133")}', pista(6) + '<span class="hj-et">Barrio</span>' + linea() +
               op('Calle') + op('Azoteas') + op('Subsuelo')),
              (f'Ruido {ref("r154")}', pista(6)),
          ], 'hj-salida') +
          sec('Mochila', f'8 casilleros · lo puesto no ocupa {ref("r164")}') +
          f'<table class="hj-t hj-moch"><tr>{mochila}</tr><tr>{mochila2}</tr></table>' +
          sec('Armas', f'Daño · Ruido · Alcance · Usos {ref("e700")}') +
          '<table class="hj-t hj-armas"><tr class="hj-tc"><td>Arma</td><td>Daño</td><td>Ruido</td><td>Alcance</td>'
          f'<td>Usos</td><td>Munición</td></tr>{armas}</table>' +
          filas([
              (f'Protección {ref("e710")}', linea() + '<span class="hj-et">Usos</span>' + cas(6, 6) +
               '<span class="hj-nota">−1 cada una, como mucho −2</span>'),
              (f'Puesta', linea()),
          ], 'hj-prot') +
          sec('Marcas', 'las que anotás con los eventos: en mayúsculas, como en el libro') +
          '<div class="hj-renglones hj-estira hj-dos"></div>')
    return pagina(ancla, titulo, p1) + pagina(ancla, titulo, p2, False)


# --------------------------------------------------------------------------- refugio
def refugio(ancla, titulo):
    frentes = ''.join(f'<tr><th>{f}</th><td>{pista(10)}</td><td></td><td></td><td></td></tr>'
                      for f in ('Puerta', 'Ventanas', 'Techo', 'Subsuelo'))
    p1 = (cab(titulo) +
          form('ACTA DE OCUPACIÓN · INMUEBLE N.º ____',
               'Disposición N.º 1, art. 4: «Se prohíbe la circulación de personas fuera de los domicilios declarados».') +
          filas([
              ('Refugio', linea() + '<span class="hj-et">Barrio</span>' + linea()),
              ('Reglas propias', linea()),
          ], 'hj-datos') +
          sec('Los cuatro frentes', f'Resistencia 0 a 10 · en 0, abierto · dos trampas cada uno {ref("r171")} {ref("r172")}') +
          '<table class="hj-t hj-frentes"><tr class="hj-tc"><th>Frente</th><td>Resistencia</td><td>Trampa 1</td>'
          f'<td>Trampa 2</td><td>Noche 40</td></tr>{frentes}</table>' +
          sec('El refugio y la ciudad') +
          filas([
              (f'Rastro {ref("r174")}', pista(10) + '<span class="hj-nota">sondeo si 2d6 ≤ Rastro − Guardia</span>'),
              (f'Moral {ref("r182")}', pista(10) + '<span class="hj-nota">empieza en 5 · 8+ rinde doble · 2− crisis</span>'),
              (f'Oleadas {ref("r221")}', '<span class="hj-nota hj-izq">3 + Rastro ÷ 3, hacia abajo =</span>' + linea(10) +
               '<span class="hj-et">Etapa</span>' + op('I') + op('II') + op('III') + op('IV') +
               f'<span class="hj-et">Desarmado {ref("r165")}</span>' + cas(1)),
          ], 'hj-cuerpo') +
          sec('Víveres', 'sin Despensa, si pasan de 10, al alba perdés 1') +
          f'<div class="hj-fila">{cas(30)}</div>' +
          sec('Materiales', f'anotá la cantidad {ref("r165")}') +
          '<table class="hj-t hj-mat"><tr>' +
          ''.join(f'<td><span class="hj-k">{m}</span></td>' for m in ('Madera', 'Metal', 'Tela', 'Químicos')) + '</tr><tr>' +
          ''.join(f'<td><span class="hj-k">{m}</span></td>' for m in ('Sujeción', 'Electrónica', 'Combustible', 'Fármacos')) +
          '</tr><tr>' + ''.join(f'<td><span class="hj-k">{m}</span></td>' for m in ('Munición', 'Antivirales', 'Molotov', 'Señuelos')) +
          '</tr></table>' +
          sec('Herramientas', f'{ref("r202")}') +
          '<table class="hj-t hj-grilla"><tr>' +
          '</tr><tr>'.join(''.join(f'<td>{op(h)}</td>' for h in fila) for fila in (
              ('Martillo', 'Serrucho', 'Llave inglesa', 'Palanca'), ('Pala', 'Taladro', 'Soldadora', 'Máquina de coser'),
              ('Olla a presión', 'Kit de recarga', 'Botiquín', '<span class="hj-l"></span>'))) + '</tr></table>')
    fac = ''.join(f'<td><span class="hj-k">{f}</span><span class="hj-rep">' +
                  ''.join(f'<span class="hj-n{" hj-cero" if v == "0" else ""}">{v}</span>' for v in ('−3', '−2', '−1', '0', '+1', '+2', '+3')) +
                  '</span></td>' for f in ('Parroquia', 'Bomberos', 'Lobos', 'Destacamento'))
    tes = [('El camión del Comando', 'El botiquín de la cuarentena'), ('El generador industrial', 'La radio del aficionado'),
           ('La armería del cordón', 'El blindado')]
    tesoros = ''.join(f'<tr><th>{a}</th><td class="hj-e">e</td><td>{cas(1)}</td>'
                      f'<th class="hj-sep">{b}</th><td class="hj-e">e</td><td>{cas(1)}</td></tr>' for a, b in tes)
    palos = ''.join(f'<tr><th>{p}</th>' + '<td><span class="hj-c"></span></td>' * 10 + '</tr>'
                    for p in ('Oros', 'Copas', 'Espadas', 'Bastos'))
    dias = ''.join(f'<span class="hj-etapa"><span class="hj-k">Etapa {e}</span>{cas(10)}</span>' for e in ('I', 'II', 'III', 'IV'))
    p2 = (cab(titulo, 'dorso') +
          sec('Las facciones', f'Reputación de −3 a +3 · empieza en 0 {ref("r197")}') +
          f'<table class="hj-t hj-fac"><tr>{fac}</tr></table>' +
          sec('Los Seis Tesoros', f'anotá el lugar que te tocó {ref("r110")}') +
          f'<table class="hj-t hj-tes">{tesoros}</table>' +
          sec('Pistas y Secreto', f'en cada casilla, la letra del color: C, L o A {ref("e560")}') +
          filas([
              ('Pistas', cas(8, 4) + '<span class="hj-et">El Secreto</span>' + linea(16) +
               '<span class="hj-nota">2 pistas, e561 · 4, e562 · 6, e563</span>'),
          ], 'hj-cuerpo') +
          sec('Los cuarenta días', f'si no tenés baraja, tachá acá {ref("r137")}') +
          '<table class="hj-t hj-baraja"><tr class="hj-tc"><th></th>' +
          ''.join(f'<td>{v}</td>' for v in ('1', '2', '3', '4', '5', '6', '7', 'Sota', 'Caballo', 'Rey')) + f'</tr>{palos}</table>' +
          sec('El día', f'tachá uno cada alba {ref("r131")}') +
          f'<div class="hj-dias">{dias}</div>' +
          sec('Instalaciones', f'la primera de cada tipo da +1 Moral {ref("r173")}') +
          '<table class="hj-t hj-grilla"><tr>' +
          '</tr><tr>'.join(''.join(f'<td>{op(h)}</td>' for h in fila) for fila in (
              ('Despensa', 'Cisterna', 'Huerta', 'Enfermería'), ('Taller', 'Cocina a leña', 'Dormitorio', 'Cortinas negras'),
              ('Vigía', 'Radio', 'Generador · ' + op('silenciador'), '<b>Último Cuarto</b>'))) + '</tr></table>' +
          sec('Notas del refugio', 'quién duerme dónde, qué falta, qué se rompió') +
          '<div class="hj-renglones hj-estira hj-dos"></div>')
    return pagina(ancla, titulo, p1) + pagina(ancla, titulo, p2, False)


# --------------------------------------------------------------------------- grupo
def grupo(ancla, titulo):
    fila = (f'<tr><td></td><td></td><td></td><td>{cas(3)}</td><td>{cas(3)}</td><td>{pista(6, 1, 6)}</td>'
            '<td></td><td></td><td></td></tr>')
    p = (cab(titulo) +
         form('PLANILLA DE CONVIVIENTES', f'Cada persona del refugio come 1 Víver por día. Cada tres nuevos, el Rastro sube 1 {ref("r180")}.') +
         '<table class="hj-t hj-grupo"><tr class="hj-tc"><td>Nombre</td><td>Habilidad fuerte</td><td>Rasgo</td>'
         '<td>Heridas</td><td>Reservas</td><td>Fiebre</td><td>Arma</td><td>Puesto esta noche</td><td>Necesidad · Marca</td></tr>' +
         fila * 12 + '</table>' +
         filas([
             (f'Los puestos {ref("r181")}', 'Guardia · Obra · Taller · Cocina · Enfermería · Huerta · Descanso'),
         ], 'hj-cuerpo') +
         sec('Los que perdimos', '<span class="hj-pre">PERDIDO_</span> · nombre, día y cómo') +
         '<div class="hj-renglones hj-estira hj-dos"></div>')
    return pagina(ancla, titulo, p)


HOJAS = {'Hoja de protagonista': protagonista, 'Hoja del refugio': refugio, 'Hoja del grupo': grupo}
