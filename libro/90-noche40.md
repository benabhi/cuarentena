# La Noche 40

*Cuarenta días. Hoy no hay alba que robar. Hoy la Señora no dice cuántos días faltan. Hoy, a la caída del sol, desde el norte, el sonido cambia.*

---

<a id="e900"></a>
### e900 · La Noche 40
*Tu refugio · ◷ noche*

A las siete de la tarde se calla todo: los perros, el viento, hasta la Señora en la AM 870, en el medio de una frase. Después, desde el norte, metal que se dobla y cae. El muro. A las ocho, el primero aparece en la esquina. Detrás de él, la calle entera.

**Antes de la primera oleada:**

1. **Contá a tu gente** y asigná a cada uno a un frente o al Último Cuarto (r220).
2. **Calculá las oleadas** (r221): 3 + (Rastro ÷ 3).
3. **Revisá tu hoja** y aplicá todo lo que tengas de esta lista:

| Si tenés… | Efecto |
|---|---|
| `EL_MURO_CEDIO` | La primera oleada, +2 de Fuerza |
| `REFORZASTE_EL_MURO` | La primera oleada, −2 de Fuerza |
| `TRABAJASTE_EN_EL_MURO` | La primera oleada, −2 de Fuerza |
| `ESCUCHASTE_LA_MAREA` | Cada defensor, +1 en la primera oleada |
| `RAMPA_DESTRUIDA` (con `LA_RAMPA`) | 1 oleada menos |
| `CONOCES_EL_CAMINO` y un Señuelo grande encendido en otro barrio (`EL_RECITAL`, `LA_FERIA_ENCENDIDA`, `EL_FARO_ENCENDIDO`, `LA_SIRENA`) | 1 oleada menos |
| `PASTOR_MUERTO` | 2 oleadas menos ([e585](#e585)) |
| `DESTACAMENTO_DISUELTO` | 1 oleada más |
| `SABES_POR_DONDE` | La primera oleada no viene por el frente que elijas |
| `LOS_PLANOS_DEL_MURO` (con `EL_MURO_CEDIO`) | La primera oleada no elige el frente más débil: un 6 se vuelve a tirar |
| `ESCALERA_CORTADA` (Edificio Sarmiento) | La primera brecha no llega al grupo ([e491](#e491)) |
| `CERCO_ELECTRICO` | Ese frente, +3 en cada oleada (1 Combustible por oleada) ([e512](#e512)) |
| `AMETRALLADORA_EN_` un frente | Ese frente, +4 en cada oleada (6 Munición por oleada) ([e523](#e523)) |
| `EL_BLINDADO` | +3 Resistencia a la Puerta o las Ventanas, o una carga ([e552](#e552)) |
| `LA_AUTOBOMBA` | Una vez, +3 a la defensa de la Puerta ([e481](#e481)) |
| `DIENTES_EN_LAS_TRAMPAS` | Las Tablas de clavos y los Fosos de estacas valen +1 |
| `DESAGUE_TAPADO` | El Subsuelo pierde 1 Resistencia menos en cada oleada que lo golpee |
| Escuela N.º 9 sin `PUERTAS_TAPIADAS` | La Puerta, −2 en cada oleada que la golpee ([e471](#e471)) |
| `LOS_DE_LA_CUADRA` | Si siguen vivos, +2 a la defensa de la Puerta en todas las oleadas |
| `LOS_DEL_SIETE` | Con 4–6 en 1d6, +1 a la defensa de las Ventanas en todas las oleadas ([e493](#e493)) |
| `EL_PASTOR_SABE`, con el Pastor vivo | La primera oleada va al frente más débil |
| `GIMNASIO_QUEMADO` | Esta noche, los Cobardes del grupo no huyen |
| La maña *La puerta* (r102) | Si defendés la Puerta, tu prueba tiene +2 |
| `LO_DEJASTE_ADENTRO`, si tu refugio queda en ese barrio | En la tercera oleada, tres golpes despacio en la puerta del Último Cuarto: −1 Ánimo ([e846](#e846)) |
| `MIEDO` | Mientras tu Ánimo sea 3 o menos, tu prueba en un frente tiene Desventaja (r105) |

4. **Los sobrevivientes con algo para la Noche 40** (lo dice su ficha, e600–e653): leelo ahora. El Ruso con el taxi, Hernán y Celeste van antes de la primera oleada ([e638](#e638), [e641](#e641), [e635](#e635)).
5. **Los aliados** → [e905](#e905).
6. **Tu Motivo** tiene su momento esta noche → [e906](#e906). Anotá en qué oleada.

La Noche 40 no tiene horas: tiene oleadas (r221). Después de la **segunda**, [e910](#e910). Después de la **cuarta**, [e912](#e912). Si un frente cae, [e920](#e920). Si sobrevivís a la última, [e930](#e930).

---

<a id="e901"></a>
### e901 · Lo que viene con la Marea
*La Noche 40 · Especiales*

Con 5–6 en la tirada de especial (r221), la oleada trae a uno de estos. Tirá 1d6:

| 1d6 | Especial | En esta oleada |
|---|---|---|
| 1 | **Bruto** ([e726](#e726)) | Si la oleada entra, +3 de daño al frente. Foso de estacas y Rejas soldadas le hacen la mitad |
| 2 | **Chillona** ([e723](#e723)) | +1 de Fuerza en esta oleada y en la siguiente |
| 3 | **Acechadores** ([e724](#e724)) | Entran por el Techo, sea cual sea el frente, salvo Techo 5 o más |
| 4 | **Escupidor** ([e727](#e727)) | Antes de la oleada, el frente pierde 1 Resistencia y sus trampas, 1 de valor |
| 5 | **Blindados** ([e729](#e729)) | Las trampas de ese frente no restan |
| 6 | Tirá otra vez: **1–2 Ahogados** ([e728](#e728), por el Subsuelo; si no hay, nada); **3–4 Sabuesos** ([e725](#e725), al frente más débil); **5 Frescos** ([e721](#e721), +2 de Fuerza); **6 el Pastor** ([e731](#e731)) si sigue vivo y tenés `VISTE_AL_PASTOR`; si no, un Bruto |

**El Pastor en la Marea.** Se queda en la esquina, mirando, y desde esta oleada todas eligen el frente más débil. Con un arma de Lejos y alguien en el Techo, una vez: `[Puntería]` con Desventaja (sin ella con `SABES_DEL_PASTOR`, fusil o ballesta). Con 10+, cae: anotá `PASTOR_MUERTO` y la Marea pierde la última oleada. Con 7–9, lo herís y se va: las oleadas vuelven a tirar el frente. Con 6−, te ve: la próxima viene al frente del que disparó.

**La Viuda** no viene con la Marea ([e730](#e730)). Si la viste en la Etapa IV, está sentada en la vereda de enfrente.

---

<a id="e905"></a>
### e905 · Los que vienen a ayudar
*La Noche 40 · Aliados*

En el medio del ruido, otro ruido: una sirena, una campana, motores, tiros que no son tuyos. Una facción viene si cumple **una** de estas:

- **Reputación +3** con vos.
- **`EL_PACTO`** ([e664](#e664)) y Reputación +1 o más. Sin Reputación +3, tirá 1d6: con 1–3 llega después de la segunda oleada.
- Algo que lo diga: `IVAN_VUELVE_AL_MURO` (Destacamento), Valeria y Gauna en paz ([e644](#e644)) (Bomberos), `TRATO_DEL_INMUNE`, el plan de Ocampo rechazado ([e694](#e694), opción 2).

**No vienen nunca:** los Bomberos con `LES_ROBASTE_EL_CUARTEL`; el Destacamento con `LA_SEPTIMA_ES_NUESTRA`; los Lobos con `RECHAZASTE_A_LOS_LOBOS`. Con `LE_PAGAS_A_LOS_LOBOS`, los Lobos vienen como con Reputación +3, y cobran igual.

| Facción | Qué hace |
|---|---|
| **La Parroquia** | No pelea. Veinte personas con palas, mantas mojadas y agua: después de cada oleada, +2 Resistencia a un frente, 1 Herida curada y +1 Moral |
| **Los Bomberos** | Una autobomba en la esquina: +3 al frente que elijas en todas las oleadas, y una vez, el cañón de agua: una oleada pierde 1d6 de Fuerza |
| **Los Lobos** | Dos camionetas con ametralladoras: +4 al frente que elijas en todas las oleadas. Al amanecer cobran la mitad de tus Víveres y materiales, o un Tesoro. Si no pagás, −3 Reputación y el epílogo tiene una deuda |
| **El Destacamento** | Están en el muro, y el muro aguanta más: **1 oleada menos**. Con `OCAMPO_DE_TU_LADO`, además, un jeep con dos soldados: +2 a un frente |

**Sin aliados:** la Noche 40 es tuya y de los tuyos. Como siempre.

---

<a id="e906"></a>
### e906 · Tu historia en la Noche 40
*La Noche 40 · Tu Motivo*

La Marea no sabe quién sos. La noche, sí. Tu escena llega en este momento y cambia según tu contador (r198):

| Motivo | Cuándo | Qué pasa |
|---|---|---|
| **La lista** | Después de la primera oleada | Alguien de la lista pide ir al frente más débil: +2 a ese frente en la próxima oleada, y con 1–2 en 1d6 cae Herido (con **Juramento 4+**, vuelve entero). Si no hay nadie de la lista: −1 Ánimo |
| **La obra** | Antes de la segunda oleada | El tramo 7 cede. Con **Cimientos 4+**, la oleada entra desordenada: −2 de Fuerza. Con **Cimientos 2−**, entra de golpe: +2 |
| **La orden** | Antes de la tercera oleada | Suena la radio. Con **Deber 4+**, el teniente desvía un pelotón: +3 al frente que elijas (con `SOBRE_CERRADO`, también +1 Moral). Con **Deber 2−**, nadie contesta |
| **El pedido** | Antes de la cuarta (o la última) | Un hombre con barbijo baja por el Techo y pide la caja. Si se la das, se lleva parte de la oleada con una bengala: −3 de Fuerza; borrá `CAJA_PRECINTADA`. Si no, pelea: +1 defensor en el Techo. Con **Ruta 4+**, las dos cosas |
| **El que falta** | En la última oleada | Si está en el grupo, +2 a tu frente. Si no y tu **Esperanza es 4+**, alguien grita tu nombre: +2 Ánimo y +1 a tu prueba. Con `LO_DEJASTE_ADENTRO`, los tres golpes de e900 |
| **Lo que hiciste** | En la primera brecha ([e920](#e920)) o en la última oleada | Alguien golpea con alguien en brazos, como el día 0. **Abrir:** −2 Culpa, el frente pierde 1 Resistencia más y entra un sobreviviente común. **No abrir:** +2 Culpa. Con `TE_PERDONASTE`, abrís y el frente no pierde nada |

---

<a id="e910"></a>
### e910 · Después de la segunda oleada
*La Noche 40 · ◷ 0*

Una calma. Siguen ahí, del otro lado de las tablas, empujando sin ruido. Alguien pregunta qué hora es. Las diez y cuarto. Faltan ocho horas para el sol.

**Primero**, la pausa (r224), con las habilidades «entre oleadas» de los sobrevivientes. **Después**, tirá 1d6:

| 1d6 | Lo que pasa |
|---|---|
| 1 | **El mordido.** Alguien se saca la venda: lo mordieron en la primera oleada. Fiebre 1, que sube 1 por oleada. Encerrarlo (no defiende), dejarlo pelear o terminar con él (−2 Moral, −1 Ánimo). Con la doctora Ríos o *Manos de guardia*, tenés una oleada más para decidir |
| 2 | **La radio.** «La ayuda llegará.» `[Labia]`: con 7+, +1 Moral; con 6−, alguien rompe la radio contra la pared: −1 Moral |
| 3 | **Golpean.** Una familia que corrió entre los Callados. Abrir: `[Físico]` con dos personas; con 7+, entran tres (1 defiende); con 6−, entran con **Callados ×1d6 · Encima**. No abrir: −2 Moral y −1 Ánimo |
| 4 | **El fuego.** Un frente al azar pierde 1 Resistencia. Apagarlo: `[Supervivencia]` o `[Físico]` (+1 con Valeria o Cisterna); con 6−, pierde 2 más |
| 5 | **El que no aguanta.** El de Ánimo más bajo, o el más Cobarde, quiere huir por el Techo. `[Labia]`; con 6−, se va y no vuelve: −1 Moral |
| 6 | **La canción.** De cancha, de cuna, un himno, bajito. +2 Moral, y la próxima oleada tiene −1 de Fuerza |

Si la Moral llega a 0 esta noche, no hay crisis (e080): hay desbande. Tirá 1d6 por sobreviviente: con 1–2, se esconde y no defiende más.

---

<a id="e912"></a>
### e912 · La hora más oscura
*La Noche 40 · ◷ 0*

Las tres de la mañana. Se oye la ciudad entera. Contra la Puerta, uno golpea con la palma abierta, despacio, como pidiendo permiso: alguien que se fue del grupo (si tenés algún `PERDIDO_`, es esa persona). −1 Ánimo.

**Primero**, la pausa (r224). **Después**, elegí una:

1. **Aguantar.** Nadie habla.
2. **Hacer ruido en otro lado.** Un voluntario (o vos) sale por el Techo o el Subsuelo con un Señuelo y se lleva a la Marea dos cuadras: `[Sigilo]` o `[Físico]`. Pase lo que pase, la próxima oleada tiene la mitad de Fuerza. Con 10+, vuelve. Con 7–9, aparece al amanecer con 4–6 en 1d6. Con 6−, no vuelve; si eras vos → [e990](#e990).
3. **Rezar, cantar, contar chistes.** `[Labia]`: con 7+, +2 Moral y cada defensor +1 en la próxima oleada.
4. **Con `TIGRE_DOS`** y una radio: «Tigre Dos, acá Tolme. Estamos vivos.» «Al amanecer, en la escollera. Aguanten.» +3 Moral, y al amanecer el barco está ([e930](#e930)).
5. **Con la barcaza lista** (`BARCAZA_MOTOR`, `BARCAZA_TIMON`, `BARCAZA_COMBUSTIBLE`): si los que no pelean subieron antes ([e254](#e254)), ahora están en el medio del río, mirando la ciudad. +1 Moral.

---

<a id="e920"></a>
### e920 · Brecha
*La Noche 40 · ◷ 0*

El frente cede. Madera, metal, y después el ruido que no hacen: entran sin gritar, empujados por los de atrás. Elegí una:

1. **Pelear en la brecha.** Los defensores de ese frente combaten contra **Callados ×(lo que faltó × 2) · Cerca**, escena Pasillo. Pueden venir los de otros frentes (que quedan vacíos en la próxima oleada). Si ganan, el frente vuelve a Resistencia 1. Si no, opción 3 con 1 Herida cada uno.
2. **Tapar el hueco.** 2 Madera o 2 Metal (o la heladera) y `[Oficio]` o `[Físico]`. Con 10+, Resistencia 3. Con 7–9, 1. Con 6−, opción 3, y quien lo intentó tira en Mordidas (r144).
3. **Al Último Cuarto.** Los defensores del frente roto tiran una vez en Mordidas mientras corren. Desde ahora, todas las oleadas golpean el Último Cuarto (r223): Resistencia 6 si lo construiste ([e761](#e761)), 2 si no. Las trampas no sirven adentro.

- **Con `ESCALERA_CORTADA`**, en la primera brecha se amontonan en el corte y la oleada se pierde ([e491](#e491)).
- **Si el Negro está vivo** → [e653](#e653).
- **Brecha en el Subsuelo** de la Parroquia con `CRIPTA_TAPIADA`: se pierde la cripta, el frente queda en 0, pero no entran.

Si el Último Cuarto cae → [e925](#e925).

---

<a id="e925"></a>
### e925 · La última puerta
*La Noche 40 · Último Cuarto · ◷ 0*

Las bisagras saltan una por una. Por la rendija, dedos, y una cara de ojos blancos pegada a la madera. No hay más cuartos. Elegí la última:

1. **Pelear hasta el final.** **Callados ×3d6 · Encima**, sin retroceder. Si ganás, el cuarto sigue en pie con Resistencia 0: si quedan oleadas, la próxima te encuentra; si no, → [e930](#e930).
2. **Por el techo.** Con una ventana alta o un ducto: `[Físico]`. Con 10+, salís vos y uno más y esperan el amanecer arriba; los demás sobreviven con 5–6 en 1d6 → [e930](#e930). Con 6−, → [e990](#e990).
3. **Abrazar a los tuyos.** Apagás la linterna y te sentás con el que tengas más cerca → [e990](#e990).

---

<a id="e930"></a>
### e930 · El amanecer
*Día 41 · ◷ 0*

El cielo se pone gris del lado del río, después naranja. Las calles siguen llenas, pero ya no empujan. El sol entra por las rendijas de las tablas y te da en la cara. Estás vivo.

**El día 41**, en este orden:

1. **Contá a tu gente**, vos incluido, más los que salvaste antes (la barcaza, el voluntario que volvió).
2. **Abrí el Secreto**, si no lo abriste ([e570](#e570)), y leé **«El día 41»** (e581–e586): te dice quiénes son los **salvados** y, a veces, a qué final ir.
3. **Con `TIGRE_DOS`** y la llamada de [e912](#e912): a las siete, un pesquero en la escollera. Los que lleguen (◷ 2, un encuentro con −2) y quepan (seis) son salvados, sea cual sea el Secreto.
4. **Con La orden** y `LEISTE_LA_ORDEN` u `OCAMPO_DE_TU_LADO`, si llegás al Puesto Norte: [e826](#e826).
5. **Contá a los salvados** → [e940](#e940).

---

<a id="e940"></a>
### e940 · Los que quedaron
*El final · ◷ 0*

Contá a los **salvados**, vos incluido si estás entre ellos:

| Salvados | Final |
|---|---|
| Solo vos | **Solo** ([e941](#e941)) |
| 2 o 3 | **Unos pocos** ([e942](#e942)) |
| 4 o más | **El grupo** ([e943](#e943)) |

Algunos Secretos y Marcas te mandan a un final propio (e944–e949): leelo **además**, salvo que diga «en lugar de».

**Los grupos** cuentan por todas sus personas: `LOS_DEL_BALCON` 3, `LOS_DEL_VELERO` 2, `LOS_ESTUDIANTES` 2, `EL_BEBE` 2, `LA_NENA_DE_LUNA` uno más, `LOS_QUIROGA` 6, `LOS_CHICOS_DEL_HOGAR` 6, `LOS_VEINTE` 20, `LOS_PIBES` 2, `LOS_DEL_MUELLE` los que sean.

**Tu partida en números**, para compararla con otras: 10 puntos por salvado (2 por persona de los grupos), 5 por instalación, 5 por Tesoro (`EL_CAMION`, `EL_GENERADOR_INDUSTRIAL`, `LA_ARMERIA`, `EL_BOTIQUIN`, `LA_RADIO_DEL_AFICIONADO`, `EL_BLINDADO`), 3 por pista, la Moral final y tu contador × 5.

Después, tu epílogo (r198: [e950](#e950)–[e953](#e953), [e956](#e956) o [e957](#e957)), el de los tuyos ([e954](#e954)) y lo que Tolme recuerda ([e955](#e955)).

---

<a id="e941"></a>
### e941 · Solo
*El final*

Salís a la calle. Caminás entre los Callados quietos por el medio de la avenida, y ninguno te mira: sos el único ruido que queda. Te sentás en el cordón, en la esquina de tu refugio, y mirás el sol subir sobre Tolme. Cuarenta y un días. No hay nadie a quien contárselo.

Quizás mañana. Quizás alguien, en otra azotea, encienda una luz y la apague tres veces. Hoy, por lo menos, respirás.

---

<a id="e942"></a>
### e942 · Unos pocos
*El final*

Salen de a uno, entornando los ojos. Se miran las caras sucias y la ropa con sangre que no es de ellos. Alguien se ríe, una risa corta que se rompe, y se abrazan en el medio de la calle.

Faltan los otros. Van a faltar siempre. Pero son unos pocos, y unos pocos alcanzan para empezar.

---

<a id="e943"></a>
### e943 · El grupo
*El final*

La Puerta está trabada con cuerpos. Salen por el Techo, pasándose a los chicos de mano en mano. Arriba son muchos, más de los que pensabas: se cuentan y se vuelven a contar, y cada vez alguien llora.

Desde la azotea se ven otras azoteas, con otra gente. Saludan. Durante cuarenta días, Tolme fue una ciudad de gente encerrada. Hoy es una ciudad que se saluda de techo a techo. Alguien propone hacer un asado. Nadie dice que no.

---

<a id="e944"></a>
### e944 · La cura
*El final · con `LA_CURA`*

Seis ampollas de L-40, un litro de sangre de alguien que no se enferma y tres días sin dormir en una cocina. Funcionó: no devuelve a nadie, pero en los recién mordidos apaga la Fiebre. Ahora los vivos de Tolme tienen algo que nadie más en el mundo tiene.

Leé esto **además** de tu final. En tu epílogo, el mundo viene a buscarlo, y esta vez vos ponés las condiciones.

---

<a id="e945"></a>
### e945 · La Marea ciega
*El final · Secreto 5*

**Con `PASTOR_MUERTO`:** a media mañana los Callados se dispersan como hojas, sin rumbo. Sin el que los guiaba, son muertos que siguen el ruido, y en Tolme ya se aprendió a no hacerlo. La Marea no va a volver a juntarse.

**Si el Pastor sigue vivo:** lo ves en la esquina, de traje, con la corbata floja. Inclina la cabeza, como pensando, y se va hacia el norte, y detrás de él empiezan a salir de todas las calles. Sabe dónde estás. Va a volver.

Leé esto **además** de tu final.

---

<a id="e946"></a>
### e946 · Los que se quedaron
*El final · en lugar de tu final*

Pudiste irte, o casi, y te quedaste con los que no podían: los de fiebre, el que no iba a pasar el control, la que no quería firmar. Tolme sigue cerrada. Pero adentro hay gente que va a arreglar las cañerías, plantar la huerta y abrir la escuela, porque alguien tiene que quedarse.

Los que se quedaron con vos son los salvados de este final: con 4 o más, leé **El grupo** ([e943](#e943)); con menos, **Unos pocos** ([e942](#e942)).

---

<a id="e947"></a>
### e947 · Ceniza
*El final · Secreto 2*

El fuego pasó al mediodía y duró hasta la noche, rugiendo sobre tu cabeza como un tren. Cuando salís, Tolme es gris: calles, árboles, Callados. No queda nadie de pie. Salvo ustedes.

Caminan hacia el norte, por el muro abierto, entre contenedores ennegrecidos. Nadie sabe que existen. Eso, de ahora en más, es una ventaja. Leé esto **además** de tu final.

---

<a id="e948"></a>
### e948 · El mundo sabe
*El final · Secreto 3*

La mujer de la cámara llora mientras filma. Los de traje amarillo se suben a las camionetas y alguien les grita «¡asesinos!» desde una ventana, y después toda la cuadra. En una semana, el Comando no existe más. En un mes, hay un juicio, y vos llevás los papeles, las fotos y la lista.

Tolme, por primera vez, hace ruido, y el ruido llega lejos. Leé esto **en lugar de** la parte final del Secreto, y además de tu final.

---

<a id="e949"></a>
### e949 · Empezar de nuevo
*El final · Secreto 4*

No viene nadie. Afuera no hay afuera. Entonces, Tolme es el afuera. Contá lo que tenés:

- **Cada instalación** es una pieza de la ciudad nueva.
- **Cada facción en paz** (Reputación 0 o más) es un barrio que trabaja con el tuyo.
- **Con `LAS_SEMILLAS_DE_ROSA`**, en primavera hay tomates.
- **Con `TU_VOZ_EN_LA_RADIO`**, la AM 870 repite tu voz, que dice dónde juntarse.

Con 6 instalaciones o más y paz con tres facciones, Tolme se salva: no como era, como va a ser. Si no, se salvan ustedes, que no es poco. Leé esto **además** de tu final.

---

## Los epílogos

*Leé tu epílogo aunque no hayas llegado al amanecer: entonces es lo que cuentan de vos los que llegaron.*

<a id="e950"></a>
### e950 · El epílogo de La lista
*Epílogo · Juramento*

- **0–1.** No volvés a pisar un hospital. La lista está en un cajón que no abrís.
- **2–3.** Seguís cuidando, en otra ciudad, en el turno noche. En el bolsillo, siempre, una lista de nombres.
- **4–5.** Abrís una enfermería en la planta baja del Central y enseñás a curar: «Acá no se muere nadie en nuestro turno».
- **6.** Encontrás a todos los de la lista, vivos y muertos. A los vivos los visitás cada día 0. Les decís que es por el control. Saben que no.
- **Con `LA_LISTA_SIGUE`**, si no llegaste: alguien la encuentra en tu bolsillo, con una tilde en cada nombre y uno más al final, con otra letra: el tuyo.

<a id="e951"></a>
### e951 · El epílogo de La obra
*Epílogo · Cimientos*

- **0–1.** No volvés a construir nada. Cada pared que tocás vibra como el muro.
- **2–3.** Afuera te pagan un silencio. Lo donás entero, con otro nombre, a los sobrevivientes de Tolme.
- **4–5.** Reconstruís la escuela, el hospital, Los Bloques: paredes que no son para encerrar a nadie.
- **6.** Desarmás el muro, contenedor por contenedor. El del tramo siete lo pintan de colores y lo ponen en la plaza: «Para que no se olvide».
- **Con `TRAMO_NUEVE_SOLDADO`:** los de afuera no pueden abrir el tramo nueve y tienen que entrar por la puerta, a la vista de todos.

<a id="e952"></a>
### e952 · El epílogo de La orden
*Epílogo · Deber*

- **0–1.** Te vas lejos. Algunas noches sacás el sobre del cajón y lo mirás.
- **2–3.** Declarás lo del día 2, lo de la nena, lo del sobre. Te dan las gracias en un papel con el mismo sello rojo.
- **4–5.** Con un brazalete y un silbato, sos la autoridad de alguien que estuvo ahí. Cuando hay un problema, te llaman.
- **6.** El día 41 levantás la barrera del Puesto Norte: «pasen, no corran, pasen». La foto está en todos lados.
- **Con `SIN_ORDEN`:** el sobre roto en ocho pedazos termina, años después, en un museo.

<a id="e953"></a>
### e953 · El epílogo de El pedido
*Epílogo · Ruta*

- **0–1.** Tirás la caja al río desde el puente. Da igual si la abriste.
- **2–3.** Cada vez que nadie atiende un timbre, esperás un minuto de más. Sabés por qué.
- **4–5.** Armás la primera red de mensajería entre barrios: pibes en bicicleta que llevan remedios y noticias de techo a techo.
- **6.** Completás la tanda. Una mañana, el celular sin señal se prende solo: «¡Gracias por tu entrega! ★★★★★». Nadie te cree.
- **Si la caja sigue en tu mochila:** la tenés en un estante. «Ese es mi último pedido.»

<a id="e956"></a>
### e956 · El epílogo de El que falta
*Epílogo · Esperanza*

- **0–1.** Dejás de buscar porque ya no podés. Cada tanto ves una campera parecida y te das vuelta. Nunca es.
- **2–3.** Buscás de a ratos en las listas y las paredes. Un día dejás de ir. Un día volvés.
- **4–5.** Abrís en la Municipalidad una oficina de «Personas buscadas». Encontrás a muchos. A algunos, vivos.
- **6.** Lo encontraste, o supiste qué le pasó. Pintás su nombre en la pared del refugio y, abajo, los de todos los que encontraste buscándolo.
- **Si está entre los salvados:** del otro lado del muro, no te suelta la mano hasta el primer pueblo.
- **Con `TE_ESPERA_AFUERA`:** en el Puesto Norte hay alguien con un cartel de cartón con tu nombre.
- **Con `LO_DESPEDISTE`:** lo enterrás en el Parque. Cada día 0 vas y le contás cómo está todo.

<a id="e957"></a>
### e957 · El epílogo de Lo que hiciste
*Epílogo · Culpa (cuanto más baja, mejor)*

- **6.** No se lo contás a nadie. Algunas noches te despertás con la mano en la traba.
- **4–5.** Se lo contás, años después, a un desconocido en un bar. Esa noche dormís un poco mejor.
- **2–3.** Hacés todos los días una cosa chica por alguien que no conocés. No alcanza. Lo hacés igual.
- **0–1.** Volvés, contás lo que hiciste con nombre y apellido y pagás, de a poco, durante años.
- **Con `TE_PERDONASTE`:** la última noche contás lo que hiciste antes de la cuarentena. No te tiembla la voz.
- **Con `LO_NEGASTE`:** quien lo sabía lo cuenta en una entrevista, años después. No dice tu nombre. No hace falta.

---

<a id="e954"></a>
### e954 · Lo que fue de los tuyos
*Epílogo · El grupo*

Por cada sobreviviente con nombre entre los salvados, una línea:

- **Don Ernesto** maneja la primera locomotora que sale de Tolme con pasajeros.
- **Lucía** abre la Escuela N.º 9 el primer lunes; con `LOS_TRES_ALUMNOS`, tres se sientan adelante, como siempre.
- **El Chino Morales** pone una parrilla en la esquina y nunca cobra a los de la Noche 40.
- **Ana y Bruno** crecen; Bruno se hace bombero. Con `BRUNO_LO_HIZO`, tarda años y se hace enfermero. Con `BRUNO_LO_VIO`, solo habla de esa noche con Ana.
- **Pocho** tiene una sola llave, la de la casa de Daiana; con `EL_HIJO_DE_POCHO`, Thiago aprende a caminar agarrado de su dedo.
- **Rita** vuelve a curar perros.
- **Gustavo** lleva las cuentas de la ciudad nueva, con una columna más: «Días desde la Noche 40».
- **La Tana** va a Las Lomas y no cuenta qué pasó; con `ROLO_MUERTO`, se queda y se anota en cada guardia.
- **Mateo** termina la tesis ante un tribunal que no sabe qué decir.
- **Doña Rosa** planta las semillas. El tomate de Aurelio da tomates.
- **Iván** duerme ocho horas. Todas las noches.
- **Celeste** canta los viernes en un bar del Puerto y siempre termina con «Volver».
- **El Ruso**, si volvió, maneja un taxi nuevo y cuenta la última carrera, cada vez más larga.
- **Hernán** predica sobre los que abrieron la puerta.
- **Valeria** vuelve a ponerse el casco. Gauna se lo da en la mano.
- **Facu** sale a la calle todos los días, a veces solo para mirar el cielo.
- **La doctora Ríos** declara. Lo que le pase lo decide alguien que no estuvo en Tolme.
- **El Negro** duerme al pie de tu cama y levanta una oreja cuando golpean.

Y los que no tienen ficha, pero estuvieron:

- **Matías** (`MATIAS_EL_FARMACEUTICO`) reabre la Farmacia Central; le tiembla el pulso con la campanita.
- **El camillero** (`EL_CAMILLERO`) vuelve al Central sin turno, y se queda igual.
- **El doctor Pereyra** (`EL_DOCTOR_PEREYRA`) publica sus notas y nunca dice qué hizo con el del sótano.
- **El jardinero** (`EL_JARDINERO`) planta pasto en la plaza del Casco. Nadie lo pisa.
- **El organillero** (`EL_ORGANILLERO`) toca los domingos en tu esquina las canciones de la cuarentena.
- **El que estaba preso** (`EL_PRESO`) se presenta el día 42 en una comisaría vacía y se va a su casa.
- **El desertor** (`DESERTOR_DEL_CORDON`) entierra el uniforme en el Parque.
- **Los del balcón** (`LOS_DEL_BALCON`) juegan al truco; hacen trampa los tres.
- **Los del velero** (`LOS_DEL_VELERO`) te mandan una postal: su pueblo sigue ahí.
- **Los estudiantes** (`LOS_ESTUDIANTES`) escriben la historia de la cuarentena, con un capítulo para vos.
- **La mujer de la habitación 9** (`EL_BEBE`) le pone a su hijo el nombre de quien abrió la puerta.
- **Luna** (`LA_NENA_DE_LUNA`): la nena llora fuerte. Ya no importa.
- **Los Quiroga** (`LOS_QUIROGA`) encuentran su casa como la dejaron; los chicos extrañan el refugio.
- **Los chicos del hogar** (`LOS_CHICOS_DEL_HOGAR`) tienen su primera foto juntos, con vos en el medio.
- **Los veinte** (`LOS_VEINTE`) se juntan cada día 41. Cada año son menos y ponen las mismas sillas.

<a id="e955"></a>
### e955 · Lo que Tolme recuerda
*Epílogo · La ciudad*

Por cada Marca de tu hoja que esté en esta lista, leé su línea. Si no tenés ninguna, Tolme no se acuerda de vos. A lo mejor está bien así.

**El fuego y el ruido**

- `ARDIO_LA_FABRICA` · En La Fabril los chicos juegan a «la noche que ardió», y se pelean por hacer de vos.
- `VOLO_EL_GAS` · El pozo del gas se llena de lluvia y de peces, con tu nombre mal escrito en un cartel.
- `LA_BODA` · La foto de la boda es la primera que se imprime en Tolme después de la cuarentena.
- `DON_CACHO` · Un año después, el camión de Don Cacho vuelve tocando bocina, y te trae algo.
- `LA_7012` · La 7012 se queda en el Puerto con flores en la cabina. Nadie se anima a moverla.
- `SENALES_AL_HELICOPTERO` · En un archivo del Comando, una foto de una sábana en una azotea empieza a hacer preguntas.
- `LLAMASTE_POR_RADIO` · Río abajo, alguien se acuerda de una voz que daba una dirección. Algunos llegaron.
- `LAS_LUCES_DE_TOLME` · Tu mapa de luces sigue en una pared. Nadie entiende los círculos.
- `LA_SENORA_SE_EQUIVOCA` · Lo vas a decir en todas las entrevistas: la Señora contaba mal. Nadie te cree.
- `LA_SENORA_CALLADA` · El día en que la radio se calló es el día en que la ciudad empezó a hablar sola.

**La gente**

- `DUDA_DEL_PRIMERO` · Todavía te despertás pensando en lo que te hizo dudar aquella primera noche.
- `LOS_VIEJOS_DE_LA_VELA` · La vela sigue prendida en esa ventana. Alguien la cambia.
- `TRUEQUE_GENEROSO` · En otra ciudad, una familia cuenta que en Tolme alguien les dio de comer sin pedir nada.
- `PERDONASTE_UN_ROBO` · El que robó es el último en irse de cada guardia.
- `MANO_DURA` · Funcionó. Nadie se acuerda de vos con cariño.
- `ASAMBLEA` · El refugio sigue votando todo; la primera acta dice tu nombre.
- `EL_DIA_QUE_SE_FUERON` · Uno de los que se fueron te escribe «perdón» cuatro veces.
- `RACIONES_A_LA_VISTA` · La comida se sigue sirviendo a la vista de todos, aunque sobre.
- `LOS_PESCADORES` · Los pescadores te guardan el primer pescado de cada temporada.
- `LOS_DEL_BLOQUE_B` · Las doce familias siguen arriba, con la escalera cortada, por las dudas.
- `ESCONDITE_DE_SAQUEADORES` · Nunca vas a saber si callarte salvó a alguien.
- `LIBERASTE_A_LAS_COCINERAS` · Abren un comedor en Los Bloques. Tu plato no se cobra.
- `ESCONDISTE_AL_INMUNE` · El informe dice «no fue recuperado». Al margen, a mano: «escondido».

**Las facciones**

- `RUMOR_DE_LOS_LOBOS` · En Las Lomas nadie quiere hablar del tema, y eso ya es una respuesta.
- `TE_VIERON_LOS_LOBOS` · Los Lobos te dejaron entrar a Las Lomas. Todavía no sabés por qué.
- `LE_PAGAS_A_LOS_LOBOS` · Después del día 41, otros siguen pagándoles a otros.
- `RECHAZASTE_A_LOS_LOBOS` · Los chicos meten los dedos en los agujeros de tu puerta para contar los tiros.
- `LES_ROBASTE_EL_CUARTEL` · Cuando alguien te nombra, los Bomberos se levantan y se van.
- `LA_SEPTIMA_ES_NUESTRA` · El informe sobre «la toma de la Comisaría 7.ª» escribe mal tu nombre. Mejor.
- `NO_CENSADO` · Tu refugio no existe en ninguna lista, y los suyos tienen que demostrar que vivieron.
- `PEAJE` · Pagaste peaje en una ciudad sin rutas. Lo contás como un chiste. No lo fue.

**Los lugares**

- `EL_OSO` · El oso sigue en su jaula con la puerta abierta. Vos le llevás comida.
- `EL_OSO_LIBRE` · Hay un oso en el Parque, y ya no hay Callados en el Parque.
- `EL_SERENO` · El sereno te guarda un lugar al lado de los tuyos.
- `EL_TREN_SELLADO` · El tren sigue en la vía 4. Nadie quiere ser el que lo abra.
- `VAGON_DE_LA_C` · Cuando el subte vuelve, al vagón de la C lo rodean.
- `LA_ZORRA` · La zorra, pintada de amarillo, la empujan los chicos los domingos.
- `LLAVES_DEL_PORTERO` · Las llaves del portero cuelgan en la puerta del refugio. Por las dudas.
- `EL_AGUA_VUELVE` · La tarde del agua, los chicos se bañaron en la vereda con Callados a dos cuadras.
- `SIN_CAMPANA` · En San Lázaro, a las doce, alguien golpea una olla.
- `GIMNASIO_QUEMADO` · El gimnasio negro tiene una placa: «Nunca más».
- `EL_CAMION` · Al camión del Comando alguien le pinta: «ESTO NOS DIERON».

---

## El Éxodo

<a id="e960"></a>
### e960 · Las salidas
*Éxodo · ◷ 0*

El muro rodea Tolme por tres lados. Al sur está el río, con lanchas militares de noche, y el muro termina en una escollera: la grieta de la ciudad. En el **modo Éxodo** (r210), ganás si cruzás **antes de la Noche 40** con al menos un sobreviviente. Con el Secreto 2 ([e582](#e582)), estas salidas se abren en cualquier modo.

| Salida | Qué hace falta | Cuántos | Prueba al salir |
|---|---|---|---|
| **A pie por la escollera** | `LA_ESCOLLERA` ([e383](#e383)), de noche | 4 | Todos `[Sigilo]`; con 6−, esa persona vuelve con 1 Herida (o no vuelve, con 1 en 1d6) |
| **La lancha** | `LA_LANCHA` ([e382](#e382)), 2 Combustible | 4 | `[Mecánica]` o `[Sigilo]`; con 6−, disparos: 1 Herida a cada uno, pero salen |
| **Tigre Dos** | `TIGRE_DOS` ([e543](#e543)) y una radio | 6 | Ninguna |
| **La barcaza** | `BARCAZA_MOTOR`, `BARCAZA_TIMON`, `BARCAZA_COMBUSTIBLE` ([e254](#e254)) | 30 | `[Mecánica]`; con 6−, la mitad no llega a subir (+Procesión en el Puerto) |
| **El ferry** | `EL_FERRY` ([e255](#e255)) | Todos | `[Labia]`; con 6−, avalancha: 1d6 personas caen al agua |
| **La autobomba** | `LA_AUTOBOMBA` ([e481](#e481)) y `LA_ESCOLLERA` | 6 | `[Mecánica]`; con 6−, se queda en el agua: `[Físico]` cada uno |
| **El blindado** | `EL_BLINDADO` ([e552](#e552)) y `LA_ESCOLLERA` | 8 | `[Mecánica]`; con 6−, 1d3 heridos contra la barrera |
| **El plan de Ocampo** | [e694](#e694), opción 1 | Vos y 4 | Ninguna |
| **El corredor** | `EL_CORREDOR` y el ferry (Reputación +2 con el Destacamento) | Los de Fiebre 0 | El control sanitario ([e581](#e581)) |

- **Salir** cuesta ◷ 6, todos juntos en el barrio de la salida al anochecer.
- **Con un vehículo** (`LA_4X4`, `CAMIONETA_DE_LOS_SOSA`, `EL_TAXI`, `AMBULANCIA_12`, `CARRITO_DE_GOLF`), el grupo llega sin encuentros y los heridos Graves pueden ir; cada persona ocupa cuatro casilleros de carga.
- **Los que no caben** se quedan: −1 Ánimo por cada uno, salvo que lo elija.
- Al otro lado → [e961](#e961).

<a id="e961"></a>
### e961 · Del otro lado
*Éxodo · El final*

El agua está fría. Las luces de Tolme se hacen chicas detrás. Nadie habla. Del otro lado, una costa, una ruta, una casa con una luz. Lo lograron.

Contá a los que cruzaron y leé **Solo** ([e941](#e941)), **Unos pocos** ([e942](#e942)) o **El grupo** ([e943](#e943)). Abrí el Secreto ([e570](#e570)) y leé solo **La verdad**: el día 41 lo vas a escuchar por la radio en algún pueblo, y vas a apagarla. Después, tu epílogo (r198) y lo que Tolme recuerda ([e955](#e955)).

---

## El fin

<a id="e990"></a>
### e990 · La muerte
*El final*

No duele tanto como pensabas. Lo último que ves es lo que tengas más cerca: una cara, una pared que hiciste, la mancha de humedad del techo con forma de mapa. Lo último que escuchás es tu corazón.

**Tu partida terminó.**

- **Antes de la Noche 40:** tu refugio queda con los que quedaron. Nunca vas a saber si aguantaron.
- **En la Noche 40:** al amanecer, alguien que se escondió cuenta lo que hiciste. Contá a los salvados igual ([e940](#e940)): tu final es el de ellos.
- Leé tu epílogo (r198) con tu contador **un paso peor** (la Culpa, uno más).

**Variante · El relevo.** Un sobreviviente con nombre que esté en el refugio toma tu lugar: sus Habilidades más 2 puntos, Heridas 5, Ánimo 3. No tiene arco ni contador: su epílogo es su línea de [e954](#e954). La Moral baja 3.

<a id="e991"></a>
### e991 · La conversión
*El final*

La Fiebre llega a seis a la madrugada. Primero el calor, después el frío, después un silencio que se extiende como la ciudad cuando se apagan las luces. Si alguien está con vos, toma la última decisión. Si no, caminás hasta la puerta y te quedás ahí, con la frente apoyada en la madera, escuchando.

**Tu partida terminó.**

- Si alguien del grupo sigue vivo, cada vez que vuelva al refugio te va a encontrar en la puerta. Ellos deciden.
- En la Noche 40, si el refugio resiste, sos uno de la primera oleada. Siempre lo fuiste.
- Leé tu epílogo (r198) con tu contador **dos pasos peor** (la Culpa, dos más). Se puede usar **El relevo** ([e990](#e990)).
