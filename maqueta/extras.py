"""Contenido de maquetación de Cuarentena que no está en el texto del libro.

Aquí viven las citas del mundo, las cajas de ayuda y la configuración de cada capítulo:
qué ilustración lo abre, con qué composición se maqueta y en qué orden van los archivos.
Se edita para cambiar el aspecto del manual sin tocar el texto del juego.
"""

# Orden de los archivos de libro/ en el manual.
ORDEN = [
    '00-portada.md', '01-mundo.md',
    '02-reglas-basicas.md', '03-reglas-avanzadas.md', '04-reglas-taller-y-noche.md', '05-plantillas.md',
    '10-prologo.md', '11-baraja.md', '12-noche.md', '13-calle.md',
    '20-casco.md', '21-sanidad.md', '22-puerto.md', '23-fabril.md', '24-bloques.md', '25-lomas.md',
    '26-estacion.md', '27-mercado.md', '28-universidad.md', '29-costanera.md', '30-cementerio.md', '31-perimetro.md',
    '40-refugios.md', '50-tesoros.md', '56-secreto.md', '60-sobrevivientes.md', '66-facciones.md',
    '70-catalogo.md', '80-historias.md', '90-noche40.md',
    '95-apendices.md', '96-indice-marcas.md',
]

# Archivos que abren con un título de primer nivel que no es una parte (# Los refugios…):
# ese título es un capítulo y sus «##» son apartados.
SECCIONES = {'40-refugios.md', '50-tesoros.md', '56-secreto.md', '60-sobrevivientes.md', '66-facciones.md',
             '70-catalogo.md', '80-historias.md', '90-noche40.md'}

# El capítulo del mundo es una carpeta de documentos: sus «##» son documentos de un único capítulo.
MUNDO = {'01-mundo.md': 'Tolme, día 2'}

# Partes (h1). lamina: ilustración a sangre; pos: encuadre (object-position).
PARTES = {
    'PRIMERA PARTE · EL MUNDO': dict(
        lamina='l-mundo.jpg', pos='50% 50%', numero='I', nombre='El mundo',
        cita=('Del lado de afuera dicen que esto es una cuarentena. Del lado de adentro sabemos contar.',
              'Pintada en el muro, calle Brown')),
    'SEGUNDA PARTE · REGLAS': dict(
        lamina='l-reglas.jpg', pos='50% 55%', numero='II', nombre='Reglas',
        cita=('Primero tapás las ventanas. Después aprendés a contar balas. Lo último que aprendés es a dormir.',
              'Rita, veterinaria')),
    'TERCERA PARTE · EVENTOS': dict(
        lamina='l-eventos.jpg', pos='50% 60%', numero='III', nombre='Eventos',
        cita=('No gritan. Eso es lo primero que hay que entender.', 'Cuaderno de guardia, pabellón 4')),
    'CUARTA PARTE · APÉNDICES': dict(
        lamina='l-apendices.jpg', pos='50% 50%', numero='IV', nombre='Apéndices',
        cita=('Con lápiz. Acá todo se borra.', 'Escrito a mano en una planilla del Comando')),
}

# Capítulos (h2, o h1 de sección), por su título exacto (o «archivo:título» si se repite).
#  maqueta: dos | una | tres | oscuro | mundo | hoja | mapa
#  lamina: ilustración a página completa antes del capítulo · banda: tira de ilustración en la cabecera
#  doble: ilustración a doble página antes del capítulo
CAPITULOS = {
    'Tolme, día 2': dict(maqueta='mundo'),
    'Cómo leer este libro': dict(maqueta='dos', banda=('b-leer.jpg', '50% 50%'),
        cita=('Si estás leyendo esto, todavía tenés tiempo. Usalo.', 'Volante del Comando, al dorso')),
    'Tu protagonista': dict(maqueta='dos', banda=('b-protagonista.jpg', '50% 40%'),
        cita=('Nadie se preparó para esto. Algunos, sin querer, sí.', 'Don Ernesto, ferroviario')),
    'Preparar la partida': dict(maqueta='dos',
        cita=('Cuarenta cartas. Cuarenta días. Ninguno igual al anterior.', 'Pocho, cerrajero')),
    'La prueba': dict(maqueta='dos', banda=('b-prueba.jpg', '50% 50%'),
        cita=('Las cosas salen, salen mal o salen caras. Casi siempre salen caras.', 'Rita, veterinaria')),
    'El día': dict(maqueta='dos',
        cita=('El día tiene seis horas. La noche tiene todas las demás.', 'Lucía, maestra')),
    'Combate': dict(maqueta='dos', banda=('b-combate.jpg', '50% 50%'),
        cita=('Cada tiro que das es una invitación. Y vienen todos.', 'Bombero de la calle Brown')),
    'La ciudad': dict(maqueta='dos', banda=('b-ciudad.jpg', '50% 50%'),
        cita=('Arriba se ve todo. En la calle te ven a vos. Abajo no te ve nadie, y eso es lo malo.', 'Gustavo, contador')),
    'Saquear': dict(maqueta='dos',
        cita=('Llegué tarde a todos lados. Así aprendí a buscar donde nadie mira.', 'La Tana, pescadera')),
    'El refugio': dict(maqueta='dos', banda=('b-refugio.jpg', '50% 50%'),
        cita=('Una casa es una puerta que alguien defiende.', 'Dicho de los Bloques')),
    '03-reglas-avanzadas.md:El grupo': dict(maqueta='dos',
        cita=('Comemos juntos, dormimos por turnos y no hablamos de los que faltan. Hasta que hablamos.', 'Lucía, maestra')),
    'Salud, ánimo y progreso': dict(maqueta='dos',
        cita=('La fiebre no se discute. Se cuenta.', 'Cuaderno de guardia, pabellón 4')),
    'Ejemplo de juego': dict(maqueta='dos', banda=('b-ejemplo.jpg', '50% 50%'),
        cita=('El primer día no se gana nada. El primer día no se pierde nada. Con eso alcanza.', 'Nadia, repartidora')),
    'El taller': dict(maqueta='dos', banda=('b-taller.jpg', '50% 50%'),
        cita=('Dame un caño, cinta y una tarde, y te devuelvo una lanza. O una puerta. O una idea.', 'Taller de los Bomberos, calle Brown')),
    'Modos y variantes': dict(maqueta='dos',
        cita=('Nadie vive dos veces la misma cuarentena.', 'Pintada en la Estación')),
    '04-reglas-taller-y-noche.md:La Noche 40': dict(maqueta='dos',
        cita=('Faltan cero días.', 'La Señora, AM 870')),
    'Plantillas de encuentro': dict(maqueta='tres',
        cita=('Antes de abrir la boca, mirá las manos.', 'Bombero de la calle Brown')),
    'Escenas de combate': dict(maqueta='dos',
        cita=('Cada lugar pelea a su manera. Aprendé cuál es la del tuyo.', 'Soldado del Destacamento')),
    'Prólogo · El día 0': dict(maqueta='dos', banda=('b-prologo.jpg', '50% 50%'),
        cita=('Era lunes. Nadie se acuerda de lo que hizo el domingo.', 'Nadia, repartidora')),
    'La Baraja': dict(maqueta='dos', banda=('b-baraja.jpg', '50% 50%'),
        cita=('Oros, comida. Copas, gente. Espadas, problemas. Bastos, la casa. Así se lee el día.', 'Pocho, cerrajero')),
    'Las figuras': dict(maqueta='dos'),
    'La noche': dict(maqueta='oscuro',
        cita=('De noche no se sale. De noche se escucha.', 'Rita, veterinaria')),
    '12-noche.md:El grupo': dict(maqueta='oscuro'),
    'Las Procesiones': dict(maqueta='dos', banda=('b-procesion.jpg', '50% 50%'),
        cita=('Van al ruido como el agua va para abajo.', 'Cuaderno de guardia, pabellón 4')),
    'El Subsuelo': dict(maqueta='dos', banda=('b-subsuelo.jpg', '50% 50%'),
        cita=('Abajo no llega la radio. Abajo viven cosas que no subieron nunca.', 'Gustavo, contador')),
    'Las Azoteas': dict(maqueta='dos', banda=('b-azoteas.jpg', '50% 50%'),
        cita=('Desde arriba se ve venir todo. Por eso subimos.', 'Dicho de los Bloques')),
    'Afuera de noche': dict(maqueta='oscuro',
        cita=('Si te agarra la noche lejos, buscá un techo con escalera y subila.', 'Nadia, repartidora')),
    'La calle': dict(maqueta='dos',
        cita=('La calle es rápida, y es de ellos.', 'Volante del Comando')),
    'Los refugios': dict(maqueta='dos', lamina=('l-refugios.jpg', '50% 50%'),
        cita=('Elegí bien. Es la única casa que vas a tener.', 'Pocho, cerrajero')),
    'Los Seis Tesoros': dict(maqueta='dos', banda=('b-tesoros.jpg', '50% 50%'),
        cita=('Hay seis cosas en Tolme que cambian una noche. Nadie las va a regalar.', 'Soldado del Destacamento')),
    'El Secreto': dict(maqueta='oscuro', lamina=('l-secreto.jpg', '50% 45%'),
        cita=('Preguntate quién sabía. Después preguntate desde cuándo.', 'Anotación al margen de un expediente')),
    'Los sobrevivientes': dict(maqueta='dos', banda=('b-sobrevivientes.jpg', '50% 35%'),
        cita=('Dieciocho personas. Cada una con una razón para no estar muerta.', 'Lucía, maestra')),
    'Las facciones': dict(maqueta='dos', banda=('b-facciones.jpg', '50% 50%'),
        cita=('Todos dicen que te protegen. Fijate de qué.', 'Pintada en Las Lomas')),
    'El catálogo': dict(maqueta='tres', lamina=('l-catalogo.jpg', '50% 50%'),
        cita=('Lo que no se rompe se presta. Lo que se presta no vuelve.', 'El Chino Morales')),
    'Las historias': dict(maqueta='dos', banda=('b-historias.jpg', '50% 50%'),
        cita=('Todos tenemos algo que nos ata a esta ciudad. Algunos lo dicen en voz alta.', 'Rita, veterinaria')),
    '90-noche40.md:La Noche 40': dict(maqueta='dos', doble=('d-marea.jpg', '50% 50%'),
        cita=('Faltan cero días.', 'La Señora, AM 870')),
    'Hoja de protagonista': dict(maqueta='hoja'),
    'Hoja del refugio': dict(maqueta='hoja'),
    'Hoja del grupo': dict(maqueta='hoja'),
    'El plano de Tolme': dict(maqueta='mapa'),
    'Resumen de reglas': dict(maqueta='dos',
        cita=('Lo que hay que saber cabe en una hoja. Lo demás se aprende de noche.', 'Rita, veterinaria')),
    'Índice de Marcas': dict(maqueta='tres'),
}

# Barrios: cabecera con banda, número y lema (del texto). arte: tira de la cabecera.
BARRIOS = {
    'El Casco': dict(arte='b-casco.jpg', pos='50% 50%'),
    'Sanidad': dict(arte='b-sanidad.jpg', pos='50% 50%'),
    'El Puerto': dict(arte='b-puerto.jpg', pos='50% 50%'),
    'La Fabril': dict(arte='b-fabril.jpg', pos='50% 50%'),
    'Los Bloques': dict(arte='b-bloques.jpg', pos='50% 50%'),
    'Las Lomas': dict(arte='b-lomas.jpg', pos='50% 50%'),
    'La Estación': dict(arte='b-estacion.jpg', pos='50% 50%'),
    'El Mercado': dict(arte='b-mercado.jpg', pos='50% 50%'),
    'La Ciudad Universitaria': dict(arte='b-universidad.jpg', pos='50% 50%'),
    'La Costanera': dict(arte='b-costanera.jpg', pos='50% 50%'),
    'Cementerio y Parque': dict(arte='b-cementerio.jpg', pos='50% 50%'),
    'El Perímetro': dict(arte='b-perimetro.jpg', pos='50% 50%'),
}
LLEGAR = {'e200', 'e220', 'e240', 'e260', 'e280', 'e300', 'e320', 'e340', 'e360', 'e380', 'e400', 'e420'}

# Las facciones: emblema (apartados «##» de 66-facciones.md)
FACCIONES = {'La Parroquia': 'parroquia', 'Los Bomberos': 'bomberos', 'Los Lobos': 'lobos', 'El Destacamento': 'destacamento'}

# Ilustraciones intercaladas dentro de un capítulo (después de la entrada indicada).
FIGURAS = {}

# Citas a toda anchura entre entradas (después de la entrada indicada).
CITAS_SUELTAS = {}

# Cajas de ayuda (después de la entrada indicada). tipo: ayuda | ejemplo | recuerda | consejo
CAJAS = {
    'r004': ('ayuda', 'Tu primera partida', """
1. Leé r001–r004.
2. Armá tu protagonista con r100–r107: seis preguntas y cinco minutos.
3. Prepará la partida con r108: el Secreto, los Tesoros, la baraja y el refugio.
4. Empezá en **e001** y dejá que el libro te lleve.

No hace falta memorizar nada: cada evento te manda a la regla que necesitás cuando la necesitás.
"""),
    'r120': ('ejemplo', 'Una prueba, paso a paso', """
Nadia, con **Físico 2**, quiere saltar a la azotea de al lado: `[Físico]`.
Tira 2d6: 5 y 3. **8 + 2 = 10**: limpio, llega sin problemas.
Con 7–9 habría llegado igual, pero pagando el precio que dice el evento.
"""),
    'r121': ('ejemplo', 'Ventaja en la mesa', """
Tirás tres dados: **5, 2 y 6**. Con Ventaja te quedás con 6 + 5 = **11**.
Con Desventaja, con 5 + 2 = **7**. Si tenés las dos, se anulan: 2d6 sin más.
"""),
    'r143': ('ejemplo', 'Una ronda de combate', """
Tres **Callados** a distancia **Cerca**. Atacás con un hacha (Daño 3, Ruido 1): `[Pelea]` y sacás 8.
Con 7–9 matás la mitad de 3, redondeando hacia arriba: **2**, y el hacha pierde un uso. El que queda avanza a **Encima**
y al final de la ronda tira su mordida: 1d6.
"""),
    'r154': ('recuerda', 'El Ruido manda', """
Con Ruido **3** aparecen Callados; con **6**, la Procesión. El Ruido vuelve a 0 cuando entrás al refugio,
pero si volvés con 3 o más desde un barrio vecino, el **Rastro** sube 1.
"""),
    'r175': ('consejo', 'Antes de dormir', """
Contá el Rastro y las Guardias. Con Rastro 6 o más, un sondeo es casi seguro: dejá a alguien despierto
o bajá el Rastro antes de que la Marea lo use para contar tus oleadas.
"""),
    'r204': ('consejo', 'Qué fabricar primero', """
Una barricada en la Puerta y un arma de mano que no haga ruido valen más que cualquier plano. Dejá las
grandes obras para cuando el grupo coma todos los días.
"""),
    'r300': ('ayuda', 'Cuándo usar las plantillas', """
Solo cuando un evento diga **Encuentro (r300)**. Elegí cómo te acercás *antes* de tirar el d6.
Las plantillas hacen que el mismo cruce no se repita nunca igual.
"""),
}


# --------------------------------------------------------------------------- remates
# Citas para rellenar huecos al final de una sección antes de un salto de página (pocas: ver Rellenos).
REMATES = [
    ('No abras. Aunque te llamen por tu nombre. Sobre todo si te llaman por tu nombre.', 'Papel pegado en una puerta, Los Bloques'),
    ('Contamos las cartas que quedan. Es más fácil que contar a los que quedan.', 'Lucía, maestra'),
    ('La ayuda llegará. Faltan diecinueve días.', 'La Señora, AM 870'),
    ('El agua, hervida tres minutos. El arroz, contado. La bronca, para mañana.', 'Rita, veterinaria'),
    ('Un Callado solo no es nada. El problema es el que lo escuchó llegar.', 'Bombero de la calle Brown'),
    ('Tenía las llaves de medio Tolme. Ahora las uso.', 'Pocho, cerrajero'),
    ('Los trenes no van a volver. Pero las vías siguen yendo a algún lado.', 'Don Ernesto, ferroviario'),
    ('A los chicos les digo que es un juego de esconderse. Lo juegan muy bien.', 'Lucía, maestra'),
    ('En los Bloques, si gritás, te escuchan doce pisos. Para bien y para mal.', 'Dicho de los Bloques'),
    ('El que se queda sin miedo se queda sin nada. El miedo te avisa.', 'Gustavo, contador'),
    ('La radio dice que llueve mañana. Ojalá. Cuando llueve no se escucha nada.', 'Nadia, repartidora'),
    ('Enterramos a los nuestros en el patio. A los otros los quemamos lejos.', 'Soldado del Destacamento'),
    ('No le tengas miedo a los muertos. Tenele miedo al que tiene hambre y tiene llave.', 'La Tana, pescadera'),
    ('Cuarenta días es poco para morirse y mucho para esperar.', 'Don Ernesto, ferroviario'),
    ('Cada vela que prendemos de noche la paga alguien de día.', 'Cuaderno de la Parroquia'),
    ('Del otro lado del muro se escucha como el mar. No es el mar.', 'Guardia del Perímetro'),
]

# Ilustraciones que se pueden usar como viñeta de remate (cada una es una imagen propia, no un recorte).
ARTE_REMATE = [
    ('v-mochila.jpg', '50% 50%'),
    ('v-radio.jpg', '50% 50%'),
    ('v-ventana.jpg', '50% 50%'),
    ('v-cocina.jpg', '50% 50%'),
    ('v-callado.jpg', '50% 40%'),
    ('v-tanques.jpg', '50% 50%'),
    ('v-colectivo.jpg', '50% 50%'),
    ('v-guardia.jpg', '50% 50%'),
    ('v-taller.jpg', '50% 50%'),
    ('v-perro.jpg', '50% 50%'),
]

# Entradas que se maquetan a toda anchura (sus tablas quedan estrechas en media columna)
ANCHAS = {'r300'}

# --------------------------------------------------------------------------- recordatorios
# Rellenan la columna corta al final de un flujo a dos columnas. Son reglas de verdad.
RECORDATORIOS = [
    ('Recordá · La prueba', '2d6 + Habilidad. 10+ limpio, 7–9 con precio, 6− fallo y una casilla de práctica (r120).'),
    ('Recordá · Ventaja', 'Tirá 3d6 y quedate con los dos más altos. Varias Ventajas no se suman (r121).'),
    ('Recordá · Ayudas', 'Herramienta +1, ayuda +1. Nunca más de +2 en total (r122).'),
    ('Recordá · El día', 'Seis horas de luz. Al gastar la sexta, cae la noche: acordate de la vuelta (r133).'),
    ('Recordá · Distancias', 'Al final de cada ronda, los Callados avanzan un paso: Lejos, Cerca, Encima (r141).'),
    ('Recordá · Mordidas', 'Cada Callado Encima tira 1d6, como mucho dos. Con 6, otro dado: 4–6 es mordida (r144).'),
    ('Recordá · El Ruido', 'Con 3, Callados. Con 6, la Procesión. Vuelve a 0 en el refugio (r154).'),
    ('Recordá · Revisar', 'Rápido ◷ 1 y una tirada; a fondo ◷ 2, +1 Ruido y tres tiradas (r161).'),
    ('Recordá · La Mochila', 'Ocho casilleros. Lo puesto no ocupa. De más, Desventaja en Físico y Sigilo (r164).'),
    ('Recordá · El sondeo', '2d6 cada noche. Igual o menos que el Rastro: los Callados tantean el refugio (r175).'),
    ('Recordá · La Moral', 'Con 8+, un puesto produce el doble. Con 2−, crisis. En 0, el grupo se rompe (r182).'),
    ('Recordá · La Fiebre', 'Sube 1 cada alba. El Antiviral la frena un día. En 6, te convertís (r191).'),
    ('Recordá · Reservas', 'En 0, Desventaja en todo y 1 Herida cada alba hasta que comas (r193).'),
    ('Recordá · Las reglas', 'Si una regla y un evento se contradicen, manda el evento (r004).'),
    ('Recordá · Lo grande', 'Instalaciones, Tesoros, Moral y recetas que da un evento se ganan una vez (r004).'),
]

# --------------------------------------------------------------------------- paneles de consulta
PANELES = [
    ('dado', 'La prueba', [('10 o más', 'limpio'), ('7 a 9', 'con precio'), ('6 o menos', 'fallo y práctica')],
     '2d6 + la Habilidad. Los umbrales nunca cambian (r120).'),
    ('combate', 'Atacar', [('10 o más', 'tantos como el Daño'), ('7 a 9', 'la mitad y el precio'),
                           ('6 o menos', 'nada')], 'Cada ataque suma el Ruido del arma (r143).'),
    ('herida', 'Mordidas', [('1 a 3', 'te soltás'), ('4 a 5', '1 Herida'), ('6', '1 Herida y otro d6')],
     'En el segundo d6, 4–6 es mordida. Cada protección resta 1, como mucho 2 (r144).'),
    ('hora', 'El día', [('Alba', 'carta, Etapa, comer, Fiebre'), ('Luz', 'seis horas'),
                        ('Noche', 'puestos, sondeo, el grupo')], 'Con la última carta llega la Marea (r130).'),
    ('ruido', 'El Ruido', [('Calle', '+1 al llegar'), ('A fondo', '+1'), ('Motor', '+2'), ('Disparo', 'el del arma')],
     'Con 3, Callados; con 6, la Procesión (r154).'),
    ('refugio', 'El sondeo', [('Guardia', '−1 cada una, máx. −2'), ('Vigía', '−1'), ('Procesión', '+2')],
     '2d6 igual o menor que el Rastro: e072 (r175).'),
    ('grupo', 'La Moral', [('8 o más', 'un puesto rinde doble'), ('2 o menos', 'crisis, e080'),
                          ('0', 'el grupo se rompe')], 'Empieza en 5 (r182).'),
    ('fiebre', 'La Fiebre', [('3', 'Desventaja en Labia'), ('4', 'Desventaja en todo'), ('5', 'delirios'), ('6', 'te convertís')],
     'Sube 1 cada alba. No hay cura (r191).'),
]

# Tiras de consulta (una línea) para huecos chicos de columna
TIRAS = [
    ('dado', 'La prueba', '2d6 + Habilidad · 10+ limpio · 7–9 con precio · 6− fallo y práctica.'),
    ('combate', 'Atacar', '10+ tantos como el Daño · 7–9 la mitad y el precio · 6− nada.'),
    ('hora', 'Horas', 'Calle ◷ 1 · Azoteas ◷ 2 · Subsuelo ◷ 1 · revisar ◷ 1 o ◷ 2 · descansar ◷ 2.'),
    ('ruido', 'Ruido', 'Con 3, Callados ×1d3 · Lejos. Con 6, la Procesión.'),
    ('refugio', 'Sondeo', '2d6 cada noche: igual o menos que el Rastro → e072.'),
    ('fiebre', 'Fiebre', 'Sube cada alba · 3 Labia · 4 todo · 5 delirios · 6 te convertís.'),
    ('grupo', 'Comer', 'Cada persona come 1 Víver al alba. Si falta, −1 Reserva y −1 Moral.'),
    ('herida', 'Curar', '`[Medicina]`, 1 Fármacos, ◷ 1 · 10+ borra 2 Heridas · 7–9 borra 1.'),
]
