/* =====================================================================
   CUARENTENA · la guía
   Los consejos del modo aprendiz (uno por cosa nueva, una sola vez) y
   el tutorial «Cómo se juega». Enseñan el juego, no la app.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, el = Q.el, T = Q.texto;

  Q.GUIA = {
    bienvenida: ['Bienvenido a Tolme', 'Tenés el libro abierto en la **mesa**: el texto que está en juego. Lo que se puede tocar está subrayado o en recuadro: las **pruebas** (`[Pelea]`), los **dados**, las **Marcas**, los **materiales** y los **efectos** (+1 Moral). Tocalos y la app hace la cuenta; nada se aplica solo. Los números como r120 abren la regla.'],
    evento: ['Leer un evento', 'Cada evento es una escena. Leé, elegí una opción y tocá lo que pide. Las flechas (→ e009) te llevan al siguiente; con **Volver** regresás al anterior. Cuando el evento termina, el botón amarillo te devuelve al día.'],
    'prueba-token': ['La prueba', 'Una Habilidad entre corchetes es una **prueba** (r120): 2d6 + tu nivel. Con **10+** sale limpio; con **7–9** sale, con un precio; con **6−** falla. Tocá el botón: la app tira y dice qué salió.'],
    prueba: ['Fallar enseña', 'Cada vez que una prueba te sale **6−**, marcás una casilla de **práctica** en esa Habilidad. Con tres, sube 1 (r124). En Tolme se aprende a los golpes.'],
    combate: ['Un combate', 'Las frases en negrita como **Callados ×2 · Cerca** son combates (r140). Tocá una y se arma el combate arriba de la mesa: los grupos, su distancia y tus acciones.'],
    'combate-panel': ['Cómo se pelea', 'Cada ronda elegís **una** acción: atacar, retroceder, esconderte o usar algo (r142). Después actúan tus compañeros y, al **terminar la ronda**, los Callados avanzan un paso (Lejos → Cerca → Encima) y los que están **Encima muerden** (r144). Cuidá el **Ruido**: con 3 vienen más; con 6, una Procesión.'],
    marcas: ['Las Marcas', 'Una **Marca** es algo que pasó y el libro recuerda (`NO_ABRISTE`, `LA_FOTO`). Otros eventos preguntan si la tenés. Las que tenés se ven resaltadas en el texto; están todas en tu Hoja.'],
    refugio: ['Tu refugio', 'El refugio tiene cuatro **frentes** (Puerta, Ventanas, Techo, Subsuelo) con su **Resistencia**, y un **Rastro**: cuánto sabe la ciudad de vos. Cada noche, el Rastro decide si los Callados tantean tus puertas (r175). Lo ves en la pestaña **Refugio**.'],
    grupo: ['El grupo', 'Cada sobreviviente come 1 Víver por día, toma un **puesto** cada noche (Guardia, Obra, Cocina…) y tiene su historia: la app te avisa cuando le toca un evento. Cada tres nuevos, +1 Rastro.'],
    amanecer: ['La baraja es el calendario', 'Cuarenta naipes, cuarenta días. Cada alba robás una carta: el **palo** dice qué clase de día es (Oros hallazgo, Copas gente, Espadas amenaza, Bastos refugio) y el **valor** cuánto pesa. Las figuras son días de historia. Cuando sale la última, llega la Marea.'],
    alba: ['El alba', 'Cuatro pasos (r131): jugás la **carta**, el grupo **come** (1 Víver por persona), la **Fiebre** avanza y resolvés lo **pendiente**. Después tenés 6 horas de luz.'],
    comer: ['Víveres y Moral', 'Si faltan Víveres, alguien pierde Reservas y la **Moral** baja 1. Con Moral 2 o menos, cada noche hay crisis; en 0, el grupo se rompe. Con 8 o más, un puesto rinde el doble.'],
    etapa: ['La plaga cambia', 'Cada diez cartas sube la **Etapa** (r135): aparecen infectados nuevos y los encuentros de cada barrio empeoran (la Etapa se suma a la tabla).'],
    dia: ['Las horas de luz', 'Seis horas (r133). Moverte a un barrio vecino cuesta ◷ 1 por la Calle o el Subsuelo, ◷ 2 por las Azoteas. **Revisar** un lugar, ◷ 1 o 2. En el refugio podés fabricar, curar, hablar con el grupo o descansar. Al gastar la sexta, cae la noche: **acordate de la vuelta**.'],
    viajar: ['El Ruido', 'Llegar por la Calle suma **+1 Ruido** y tirás encuentro (1d6 + Etapa en la tabla del barrio). El Ruido vuelve a 0 al entrar al refugio. Si volvés con Ruido 3+ desde un barrio vecino, el **Rastro** sube.'],
    revisar: ['El stock se agota', 'Cada lugar tiene **stock** (▢): cada revisión tacha casillas. Sin stock, solo sorpresas. Tu **X** queda en el plano con el día y lo que encontraste, como los rescatistas en las puertas (r163).'],
    descargar: ['La Mochila', 'Lo que encontrás afuera ocupa la **Mochila** (8 casilleros) hasta que lo descargás en el refugio. Cargar de más da Desventaja en Físico y Sigilo (r164).'],
    noche: ['La noche', 'Cinco pasos (r134): cada uno toma un **puesto**, los puestos **producen**, el **sondeo** (2d6 contra tu Rastro), el **grupo** (crisis si la Moral está baja) y **dormir**. La Guardia baja el sondeo pero no duerme.'],
    sondeo: ['El sondeo', 'El sondeo vale tu **Rastro**, −1 por Guardia (máx. −2), −1 con Vigía, +2 con una Procesión en el barrio. Si 2d6 sale **igual o menos**, los Callados tantean un frente (e072). Bajá el Rastro y subí las Resistencias.'],
    noche40: ['La Noche 40', 'La Marea llega en **oleadas** (3 + Rastro ÷ 3). Cada oleada: Fuerza (2d6 + su número), un frente, quizás un especial. La **defensa** es la Resistencia + trampas + defensores. Si no alcanza, el frente cae y muerden. Llegá vivo al amanecer.'],
    herramientas: ['Herramientas', 'Atajos para lo que el texto no trae como botón: una prueba suelta, dados, un combate a mano, el botín de una tabla, el sondeo de esta noche. Son opcionales: el libro manda.'],
    'vista-hoja': ['Tu Hoja', 'Todo se puede corregir a mano con + y −: Heridas, Ánimo, Habilidades, práctica, armas, Mochila y Marcas. Si la app se equivoca o el libro dice otra cosa, el libro manda.'],
    'vista-refugio': ['La Hoja del refugio', 'Frentes, trampas, instalaciones y materiales. Cada instalación nueva da **+1 Moral** la primera vez (r182). El número del sondeo y las oleadas de la Noche 40 se calculan solos.'],
    'vista-grupo': ['La Hoja del grupo', 'Cada sobreviviente tiene 3 casillas de Heridas y 3 de Reservas. Su ficha dice su necesidad y su desenlace. Las facciones (Parroquia, Bomberos, Lobos, Destacamento) recuerdan cómo las trataste.'],
    'vista-mapa': ['El plano de Tolme', 'Doce barrios como un plano de subte: la **Calle** (amarillo), las **Azoteas** (gris) y el **Subsuelo** (rojo). Los círculos negros son **Procesiones**: entrar por la Calle a su barrio es e100. La ★ marca un Tesoro.'],
    'vista-bitacora': ['La bitácora', 'Lo que pasó, día por día, y tus recordatorios: los eventos que dejan algo «para el alba» o «a las 10 cartas» aparecen solos en el alba que corresponde.'],
    fin: ['Terminó', 'Leé los epílogos: tu historia, los tuyos y lo que Tolme recuerda. Cada partida es distinta: otro oficio, otro barrio, otro Motivo, otro refugio y otra baraja.'],
  };

  const PAGINAS = [
    ['La premisa', 'Una noche de lluvia, en la ciudad de **Tolme**, se mueren cuatro mil personas. A la mañana, se levantan. El Comando cierra la ciudad: **cuarenta días de cuarentena**. Del otro lado del muro, millones de **Callados** esperan, quietos, de cara a la ciudad.\n\nTu meta: un **refugio**, un **grupo** y llegar vivo al amanecer después de la **Noche 40**, cuando llega la Marea.'],
    ['Cómo se lee el libro', 'El libro tiene **reglas** (r100, r120…) y **eventos** (e001, e072…). Jugás saltando de evento en evento, como en un librojuego: cada uno termina con opciones y flechas (→ e009).\n\nEn la app, la **mesa** muestra el evento en juego. Todo lo que se puede tocar está marcado: pruebas, dados, Marcas, materiales, efectos y combates.'],
    ['La prueba', 'Casi todo se resuelve con una **prueba** (r120): tirás **2d6 + una Habilidad** (Pelea, Sigilo, Medicina…).\n\n- **10+**: sale limpio.\n- **7–9**: sale, con un precio.\n- **6−**: falla, y marcás práctica: con tres fallos, la Habilidad sube.\n\n**Ventaja**: tirás 3d6 y te quedás con los dos altos. **Desventaja**: con los dos bajos.'],
    ['El día', 'Cada día es una carta de la baraja (r130):\n\n1. **El alba**: robás la carta y jugás su evento; el grupo come; la Fiebre avanza.\n2. **Las horas de luz**: 6 horas para salir a saquear, construir, fabricar o cuidar.\n3. **La noche**: puestos, producción, el **sondeo** (¿te encuentran?) y dormir.'],
    ['La ciudad', 'Doce barrios unidos por tres capas: la **Calle** (rápida y ruidosa), las **Azoteas** (lentas y seguras) y el **Subsuelo** (oscuro). Cada salida suma **Ruido**: con 3 aparecen Callados; con 6, una **Procesión**, una columna de cientos.\n\nCada lugar tiene **stock**: lo que saqueás no vuelve.'],
    ['El refugio', 'Cuatro **frentes** con su Resistencia, **trampas**, **instalaciones** (Huerta, Enfermería, Taller…) y el **Rastro**: cuánto sabe la ciudad de vos. El Rastro decide los sondeos de cada noche y cuántas oleadas trae la Marea. Fabricar (barricadas, armas, Molotovs) es la mitad del juego.'],
    ['El combate', 'Los Callados vienen **Lejos**, **Cerca** o **Encima**. Cada ronda elegís una acción: atacar, retroceder, esconderte. Al final avanzan un paso y los que están Encima **muerden**. Una mordida empieza la **Fiebre**, y la Fiebre sube cada alba.\n\nMuchas veces la mejor pelea es la que no das.'],
    ['La Noche 40', 'Cuando sale la carta cuarenta, esa noche llega la **Marea**: oleadas contra tus frentes. Cada persona defiende uno. Si un frente cae, peleás en la brecha o se encierran en el **Último Cuarto**.\n\nSi llegás al amanecer, contá a los que quedaron: de eso depende tu final.'],
    ['La app te ayuda', '- La **cabecera** muestra tus números; la **barra de abajo**, tus hojas y el plano.\n- El **libro** busca cualquier regla o evento.\n- Las **herramientas** tiran por vos: pruebas, combates, botín, encuentros, sondeo.\n- Todo se corrige a mano. **Nada se aplica solo**: tocás y la app hace la cuenta.\n\nEn el modo aprendiz, cada cosa nueva viene con un consejo, una sola vez.'],
  ];
  Q.guia.tutorial = function () {
    let i = 0;
    const cuerpo = el('div.tutorial');
    const pintar = () => {
      cuerpo.innerHTML = `<p class="tut-n">${i + 1} de ${PAGINAS.length}</p><h3>${PAGINAS[i][0]}</h3>${T.md(PAGINAS[i][1])}`;
      const pie = document.querySelector('#modal .modal-pie');
      if (pie) { pie.querySelector('.ant').disabled = i === 0; pie.querySelector('.sig').textContent = i === PAGINAS.length - 1 ? 'Listo' : 'Siguiente'; }
    };
    A.modal('Cómo se juega', cuerpo, [
      { t: 'Anterior', clase: 'sutil.ant', dejar: true, accion: () => { i = Math.max(0, i - 1); pintar(); } },
      { t: 'Siguiente', clase: 'primario.sig', dejar: true, accion: () => { if (i === PAGINAS.length - 1) return A.cerrarModal(); i++; pintar(); } },
    ], { ancho: true });
    pintar();
  };
})();
