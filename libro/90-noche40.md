# La Noche 40

*Cuarenta días. Cuarenta cartas. Hoy no hay alba que robar. Hoy la Señora no dice cuántos días faltan. Hoy, a la caída del sol, desde el norte, el sonido cambia.*

---

<a id="e900"></a>
### e900 · La Noche 40
*Tu refugio · ◷ noche*

A las siete de la tarde se calla todo. Los perros. Los pájaros. El viento. Hasta la Señora, en la AM 870, se calla en el medio de una frase. Después, desde el norte, un ruido que empieza como un trueno lejos y no termina: metal que se dobla, que se arranca, que cae. El muro.

A las ocho, el primero aparece en la esquina.

Detrás de él, la calle entera se llena.

**Antes de la primera oleada** (r220):

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
| `CONOCES_EL_CAMINO` y un Señuelo grande encendido en otro barrio (`EL_RECITAL`, `LA_FERIA_ENCENDIDA`, el faro, `LA_SIRENA`) | 1 oleada menos |
| `PASTOR_MUERTO` | 2 oleadas menos ([e585](#e585)) |
| `DESTACAMENTO_DISUELTO` | 1 oleada más |
| `SABES_POR_DONDE` | La primera oleada no viene por el frente que elijas |
| `LOS_PLANOS_DEL_MURO` (con `EL_MURO_CEDIO`) | La primera oleada no elige el frente más débil: un 6 se vuelve a tirar |
| `ESCALERA_CORTADA` (Edificio Sarmiento) | La primera brecha no llega al grupo ([e491](#e491)) |
| `CERCO_ELECTRICO` | Ese frente, +3 a la defensa en cada oleada (1 Combustible por oleada) ([e512](#e512)) |
| `AMETRALLADORA_EN_` un frente | Ese frente, +4 en cada oleada (6 Munición por oleada) ([e523](#e523)) |
| `EL_BLINDADO` | +3 Resistencia a la Puerta o las Ventanas, o una carga ([e552](#e552)) |
| `LA_AUTOBOMBA` | Una vez, +3 a la defensa de la Puerta ([e481](#e481)) |
| `DIENTES_EN_LAS_TRAMPAS` | Las Tablas de clavos y los Fosos de estacas valen +1 |
| `DESAGUE_TAPADO` | El Subsuelo pierde 1 Resistencia menos en cada oleada que lo golpee |
| Escuela N.º 9 sin `PUERTAS_TAPIADAS` | La Puerta, −2 a la defensa en cada oleada que la golpee ([e471](#e471)) |
| `LOS_DE_LA_CUADRA` | Si siguen vivos, +2 a la defensa de la Puerta en todas las oleadas |
| `LOS_DEL_SIETE` | Con 4–6 en 1d6, +1 a la defensa de las Ventanas en todas las oleadas ([e493](#e493)) |
| `EL_PASTOR_SABE`, con el Pastor vivo | La primera oleada va al frente más débil |
| `GIMNASIO_QUEMADO` | Esta noche, los Cobardes del grupo no huyen |

4. **Los sobrevivientes con algo para la Noche 40** (lo dice su ficha, e600–e653): leelo ahora. Si tenés al Ruso con el taxi, a Hernán o a Celeste, sus entradas se leen antes de la primera oleada ([e638](#e638), [e641](#e641), [e635](#e635)).
5. **Los aliados:** mirá quién viene → [e905](#e905).

La Noche 40 no tiene horas: tiene oleadas. Empezá la primera (r221). Después de la **segunda**, leé [e910](#e910). Después de la **cuarta**, [e912](#e912). Si un frente cae, [e920](#e920). Si sobrevivís a la última, [e930](#e930).

---

<a id="e901"></a>
### e901 · Lo que viene con la Marea
*La Noche 40 · Especiales*

Con un 5–6 en la tirada de especial (r221), la oleada trae a uno de estos. Tirá 1d6:

| 1d6 | Especial | En esta oleada |
|---|---|---|
| 1 | **Bruto** ([e726](#e726)) | Si la oleada entra, +3 de daño al frente. Foso de estacas y Rejas soldadas le hacen la mitad |
| 2 | **Chillona** ([e723](#e723)) | +1 de Fuerza en esta oleada y en la siguiente |
| 3 | **Acechadores** ([e724](#e724)) | Entran por el Techo, sea cual sea el frente, salvo Techo 5 o más |
| 4 | **Escupidor** ([e727](#e727)) | Antes de la oleada, el frente pierde 1 Resistencia y sus trampas, 1 de valor |
| 5 | **Blindados** ([e729](#e729)) | Las trampas de ese frente no restan |
| 6 | Tirá otra vez: **1–2 Ahogados** ([e728](#e728), por el Subsuelo; si no hay Subsuelo, nada); **3–4 Sabuesos** ([e725](#e725), al frente más débil); **5 Frescos** ([e721](#e721), +2 de Fuerza); **6 el Pastor** ([e731](#e731)) si sigue vivo y lo viste (`VISTE_AL_PASTOR`); si no, un Bruto |

**El Pastor en la Marea.** Si aparece, se queda en la esquina, mirando. Esta oleada y todas las que siguen eligen el frente más débil. Si tenés un arma de Lejos y alguien en el Techo, una vez: `[Puntería]` con Desventaja (sin Desventaja con `SABES_DEL_PASTOR`, fusil o ballesta). Con 10+, cae: anotá `PASTOR_MUERTO` y la Marea pierde 1 oleada (la última). Con 6−, te ve: la próxima oleada viene a tu frente.

**La Viuda** no viene con la Marea ([e730](#e730)). Si la viste en la Etapa IV, está sentada en la vereda de enfrente.

---

<a id="e905"></a>
### e905 · Los que vienen a ayudar
*La Noche 40 · Aliados*

En el medio del ruido, de golpe, otro ruido: una sirena, una campana, motores, tiros que no vienen de tu refugio.

Una facción viene a ayudarte si cumple **una** de estas:

- **Reputación +3** con vos.
- **`EL_PACTO`** ([e664](#e664)) y Reputación +1 o más.
- Algo que lo diga: `IVAN_VUELVE_AL_MURO` (el Destacamento), Valeria y Gauna en paz ([e644](#e644)) (los Bomberos), `TRATO_DEL_INMUNE`, el plan de Ocampo rechazado ([e694](#e694), opción 2).

**Los que no vienen nunca:** los Bomberos, si tenés `LES_ROBASTE_EL_CUARTEL`; el Destacamento, si tenés `LA_SEPTIMA_ES_NUESTRA`; los Lobos, si tenés `RECHAZASTE_A_LOS_LOBOS`. Y al revés: con `LE_PAGAS_A_LOS_LOBOS`, los Lobos vienen como si tuvieras Reputación +3 (cuidan al que les paga), y cobran igual.

Si viene con `EL_PACTO` pero sin Reputación +3, tirá 1d6: con 1–3, llega tarde (después de la segunda oleada); con 4–6, llega a tiempo.

| Facción | Qué hace |
|---|---|
| **La Parroquia** | No pelea: no tienen armas. Llegan veinte personas con palas, mantas mojadas y agua. Después de cada oleada, reparan +2 Resistencia a un frente y curan 1 Herida a alguien. Y rezan: +1 Moral |
| **Los Bomberos** | Una autobomba en la esquina. +3 a la defensa del frente que elijas, en todas las oleadas, y una vez, el cañón de agua: la oleada que elijas pierde 1d6 de Fuerza |
| **Los Lobos** | Dos camionetas con ametralladoras improvisadas. +4 a la defensa del frente que elijas, en todas las oleadas. Pero al amanecer cobran: la mitad de tus Víveres y materiales, o un Tesoro. Si no pagás, −3 Reputación y el epílogo tiene una deuda |
| **El Destacamento** | No vienen: están en el muro. Pero el muro aguanta más con ellos. La Marea tiene **1 oleada menos**. Si además tenés `OCAMPO_Y_LEIVA`, Ocampo manda un jeep con dos soldados: +2 a la defensa de un frente |

**Sin aliados:** la Noche 40 es tuya y de los tuyos. Como siempre.

---

<a id="e910"></a>
### e910 · Después de la segunda oleada
*La Noche 40 · ◷ 0*

Una calma. No es que se fueron: están ahí, del otro lado de la Puerta, del otro lado de las tablas, apretándose, empujando, sin hacer ruido. Pero por un minuto, nadie golpea.

Alguien llora bajito. Alguien se ríe sin motivo. Alguien pregunta qué hora es. Las diez y cuarto. Faltan ocho horas para que salga el sol.

**Primero**, la pausa de siempre (r224): cada uno hace una cosa. Además, las habilidades de los sobrevivientes que dicen «entre oleadas» o «en cada pausa» (Don Ernesto repara, el Chino da de comer, Rita cura, Celeste canta, Mateo hace Molotovs).

**Después**, tirá 1d6:

| 1d6 | Lo que pasa |
|---|---|
| 1 | **El mordido.** Alguien del grupo se saca la venda. Lo mordieron en la primera oleada y no dijo nada. Tiene Fiebre 1, y en la Noche 40 la Fiebre sube 1 por oleada. Decidí: encerrarlo en un cuarto (no defiende), dejarlo pelear hasta que no pueda, o terminar con él ahora (−2 Moral, −1 Ánimo). Si tenés a la doctora Ríos o a la Enfermera, ya lo sabías: tenés una oleada más para decidir |
| 2 | **La radio.** La AM 870 vuelve. «La ayuda llegará.» Todos se quedan quietos escuchando. Tirá `[Labia]`: con 7+, +1 Moral; con 6−, alguien rompe la radio contra la pared: −1 Moral |
| 3 | **Golpean.** No son Callados: golpean tres veces y gritan. Una familia que corrió por la calle entre los Callados y llegó a tu puerta. Abrir la Puerta (◷ 0): `[Físico]` con dos personas; con 7+, entran tres personas (1 defiende), con 6−, entran ellos y una oleada chica: **Callados ×1d6 · Encima** adentro. No abrir: −2 Moral. −1 Ánimo para vos |
| 4 | **El fuego.** Una Molotov, una vela, una garrafa: algo se prendió. Un frente al azar pierde 1 Resistencia. Apagarlo: `[Supervivencia]` o `[Físico]`, +1 con Valeria o Cisterna. Con 6−, pierde 2 más |
| 5 | **El que no aguanta.** Alguien con Ánimo 1 o menos, o el más Cobarde del grupo, quiere salir corriendo por el Techo. Pararlo: `[Labia]`. Con 6−, sale. No vuelve. −1 Moral |
| 6 | **La canción.** Nadie sabe quién empieza. Una canción de cancha, una de cuna, un himno. La cantan todos, bajito. +2 Moral. Los Callados de la Puerta se quedan quietos un minuto: la próxima oleada tiene −1 de Fuerza |

Si la Moral llega a 0 en la Noche 40, no hay crisis (e080): hay desbande. Tirá 1d6 por cada sobreviviente: con 1–2, se esconde y no defiende más.

---

<a id="e912"></a>
### e912 · La hora más oscura
*La Noche 40 · ◷ 0*

Las tres de la mañana. Ya no se oye el muro: se oye la ciudad entera. Todo Corinto está lleno de Callados. Los de la Marea, los de las Procesiones, los del barrio, los de tu cuadra. Algunos tienen caras que conocés.

Afuera, contra la Puerta, uno golpea con la palma abierta, despacio, como pidiendo permiso. Es alguien que se fue del grupo (si tenés algún `PERDIDO_`, es esa persona). −1 Ánimo.

**Primero**, la pausa (r224).

**Después**, elegí una:

1. **Aguantar.** No hacés nada distinto. Los que quedan se miran. Nadie habla.
2. **Hacer ruido en otro lado.** Alguien sale por el Techo o el Subsuelo con un Señuelo, una bocina, una olla y una cuchara, y se lleva a la Marea dos cuadras más allá. Tiene que ser un voluntario (o vos). `[Sigilo]` o `[Físico]`. Con 10+, vuelve: la próxima oleada tiene la mitad de Fuerza. Con 7–9, la próxima oleada tiene la mitad de Fuerza, y el voluntario no vuelve hasta el amanecer (tirá 1d6 al amanecer: con 4–6, aparece). Con 6−, la próxima oleada tiene la mitad de Fuerza. El voluntario no vuelve. Si eras vos → [e990](#e990).
3. **Rezar, cantar, contar chistes.** `[Labia]`. Con 7+, +2 Moral y cada defensor +1 en la próxima oleada. Con 6−, nada.
4. **Si tenés `TIGRE_DOS`** y una radio: la llamás. «Tigre Dos, acá Corinto. Estamos vivos.» Una voz te contesta entre la estática: «Al amanecer, en la escollera. Aguanten». +3 Moral. Al amanecer, el barco está ([e930](#e930)).
5. **Si tenés la barcaza lista** (`BARCAZA_MOTOR`, `BARCAZA_TIMON`, `BARCAZA_COMBUSTIBLE`) y no la usaste antes: ya es tarde para llegar al Puerto. Pero si los que no pelean subieron antes de la Noche 40 ([e254](#e254)), ahora mismo están en el medio del río, mirando la ciudad. +1 Moral.

---

<a id="e920"></a>
### e920 · Brecha
*La Noche 40 · ◷ 0*

El frente cede. Primero un ruido de madera, después un ruido de metal, y después el ruido que no hacen: entran sin gritar, uno detrás del otro, empujados por los de atrás.

Tenés una ronda para decidir. Elegí una:

1. **Pelear en la brecha.** Los defensores de ese frente combaten contra **Callados ×(la diferencia que faltó, por 2) · Cerca**, escena Pasillo. Los de otros frentes pueden venir (dejan su frente sin defensores en la próxima oleada). Si ganan, tapan el hueco con los cuerpos y lo que haya: el frente vuelve a Resistencia 1. Si no, opción 3, con 1 Herida cada uno.
2. **Tapar el hueco.** 2 Madera o 2 Metal (o un mueble grande, o la heladera), y `[Oficio]` o `[Físico]`. Con 10+, el frente vuelve a Resistencia 3. Con 7–9, a 1. Con 6−, no alcanza: opción 3, y quien lo intentó tira en la tabla de Mordidas (r144).
3. **Al Último Cuarto.** Todos adentro (los que lleguen: los defensores del frente roto tiran una vez en la tabla de Mordidas mientras corren). Cerrás la puerta. Desde ahora, todas las oleadas que faltan golpean el Último Cuarto (r223). Su Resistencia es 6 si lo construiste ([e761](#e761)); si no, 2. Las trampas no sirven adentro. Los defensores son los que entraron.

- **Si tenés `ESCALERA_CORTADA`** y es la primera brecha: no pasa nada de esto. Suben hasta el corte y se amontonan. La oleada se pierde ([e491](#e491)).
- **Si el Negro está vivo** → [e653](#e653).
- **Si la brecha es en el Subsuelo** y el refugio es la Parroquia con `CRIPTA_TAPIADA`, la brecha no llega: solo se pierde la cripta. El frente queda en 0, pero no entran.

Si el Último Cuarto cae → [e925](#e925).

---

<a id="e925"></a>
### e925 · La última puerta
*La Noche 40 · Último Cuarto · ◷ 0*

La puerta del Último Cuarto se dobla. Las bisagras saltan una por una. Por la rendija aparecen dedos, muchos dedos, y una cara pegada a la madera, mirando adentro con los ojos blancos.

No hay más cuartos.

Elegí una, la última:

1. **Pelear hasta el final.** Combate contra **Callados ×3d6 · Encima**, sin retroceder, sin esconderse. Si ganás (si de verdad ganás), la oleada se termina, y el Último Cuarto, sin puerta, sigue en pie con Resistencia 0: si quedan oleadas, la próxima te encuentra. Si no hay más, → [e930](#e930).
2. **Por el techo.** Si el cuarto tiene una ventana alta, una claraboya, un ducto: `[Físico]`. Con 10+, salís vos y uno más, al techo, y ahí esperan el amanecer, mirando la calle. Los demás tiran 1d6 cada uno: con 5–6, se esconden y sobreviven. → [e930](#e930) con los que queden. Con 6−, no llegás: → [e990](#e990).
3. **Abrazar a los tuyos.** Apagás la linterna. Te sentás en el piso con el que tengas más cerca. Esperás. → [e990](#e990).

---

<a id="e930"></a>
### e930 · El amanecer
*Día 41 · ◷ 0*

El cielo se pone gris del lado del río. Después, naranja. Las calles siguen llenas, pero ya no empujan. Se quedan quietos, como se quedan quietos de día, de cara a las paredes, de cara a la Puerta, de cara a nada.

Sale el sol. Entra por las rendijas de las tablas, por los agujeros de la Puerta, por la ventana alta del Último Cuarto. Te da en la cara.

Estás vivo.

**El día 41**, en este orden:

1. **Contá a tu gente.** Todos los que estén vivos en el refugio (y los que salvaste antes: los de la barcaza, el voluntario que volvió). Vos incluido.
2. **Abrí el Secreto**, si no lo abriste ([e570](#e570)), y leé su parte **«El día 41»** (e581–e586). Te dice quiénes son los **salvados** y, a veces, a qué final ir.
3. **Si tenés `TIGRE_DOS`** y la llamaste en la Noche 40 ([e912](#e912)): a las siete, en la escollera, un barco pesquero con un nombre pintado a mano en la proa. Los que lleguen a la escollera (◷ 2 desde cualquier barrio; tirá encuentro una vez, con −2) y quepan (seis), se van río abajo. Esos son salvados, sea cual sea el Secreto.
4. **Si sos la Agente** con `LEISTE_LA_ORDEN` u `OCAMPO_Y_LEIVA`, y llegás al Puesto Norte: [e826](#e826).
5. **Contá a los salvados** y andá a **[e940](#e940)**.

---

<a id="e940"></a>
### e940 · Los que quedaron
*El final · ◷ 0*

Contá a los **salvados**: las personas que el Secreto deja ir, quedarse o salir (vos incluido, si estás entre ellos).

| Salvados | Final |
|---|---|
| Solo vos | **Solo** ([e941](#e941)) |
| 2 o 3 | **Unos pocos** ([e942](#e942)) |
| 4 o más | **El grupo** ([e943](#e943)) |

Algunos Secretos y Marcas te mandan a un final propio (e944–e949). Si te toca uno, leelo **además** del de esta tabla, salvo que diga «en lugar de».

**Los que llegaron en grupo** cuentan por todas sus personas, si están entre los salvados: `LOS_DEL_BALCON` 3, `LOS_DEL_VELERO` 2, `LOS_ESTUDIANTES` 2, `EL_BEBE` 2, `LA_NENA_DE_LUNA` uno más (la nena), `LOS_QUIROGA` 6, `LOS_CHICOS_DEL_HOGAR` 6, `LOS_VEINTE` 20.

**Tu partida en números.** Si querés compararla con otras: 10 puntos por cada salvado (2 por cada persona de los grupos de arriba), 5 por cada instalación, 5 por cada Tesoro (`EL_CAMION`, `EL_GENERADOR_INDUSTRIAL`, `LA_ARMERIA`, `EL_BOTIQUIN`, `LA_RADIO_DEL_AFICIONADO`, `EL_BLINDADO`), 3 por cada pista, la Moral final y tu contador personal × 5. Anotala en la última página de tu hoja.

Después, leé tu epílogo ([e950](#e950)), el de los tuyos ([e954](#e954)) y lo que Corinto recuerda ([e955](#e955)).

---

<a id="e941"></a>
### e941 · Solo
*El final*

Salís a la calle. Nadie te sigue. Caminás entre los Callados quietos, despacio, por el medio de la avenida, y ninguno te mira. Ya no hay ruido que te delate: sos el único ruido que queda.

Te sentás en el cordón de la vereda, en la esquina de tu refugio, y mirás el sol subir sobre Corinto. Cuarenta y un días. Lo lograste.

No hay nadie a quien contárselo.

Quizás mañana. Quizás haya otro, en otro barrio, en otra azotea, mirando el mismo sol. Quizás alguien encienda una luz en la otra orilla y la apague tres veces.

Hoy, por lo menos, respirás.

---

<a id="e942"></a>
### e942 · Unos pocos
*El final*

Salen de a uno, entornando los ojos, como si el sol doliera. Se miran las caras sucias, las manos rotas, la ropa con sangre que no es de ellos. Nadie dice nada durante un rato largo.

Después, alguien se ríe. Una risa corta, que se rompe. Y después se abrazan, los que quedan, en el medio de la calle, entre los Callados quietos que ya no les importan.

Faltan los otros. Van a faltar siempre. Cada uno lleva una lista: los nombres de los que no llegaron. La van a llevar el resto de su vida.

Pero son unos pocos. Y unos pocos alcanzan para empezar.

---

<a id="e943"></a>
### e943 · El grupo
*El final*

La Puerta no se puede abrir: está trabada con cuerpos. Salen por el Techo, de a uno, ayudándose, pasándose a los chicos de mano en mano. Arriba, en la azotea, son muchos. Más de los que pensabas. Se cuentan, y vuelven a contarse, y cada vez el número es el mismo, y cada vez alguien llora.

Desde la azotea se ven otras azoteas. En algunas, otra gente. Saludan. Alguien grita algo que no se entiende. Alguien contesta.

Durante cuarenta días, Corinto fue una ciudad de gente encerrada. Hoy, a la mañana, es una ciudad de gente que se saluda de techo a techo.

Alguien propone hacer un asado. Nadie dice que no.

---

<a id="e944"></a>
### e944 · La cura
*El final · con `LA_CURA`*

Seis ampollas de L-40 y un litro de sangre de alguien que no se enferma. Una cocina convertida en laboratorio. Una enfermera, o una viróloga, o un estudiante de química, despiertos durante tres días.

Funcionó.

No en todos: en los recién mordidos, en los que tienen la Fiebre todavía baja. No devuelve a nadie. Pero detiene la Fiebre, y la baja, y la apaga.

En Corinto hay doscientos mil Callados y quizás cinco mil vivos. Ahora los vivos tienen algo que nadie más en el mundo tiene.

Leé esto **además** de tu final. En tu epílogo, el mundo viene a buscar lo que hiciste. Esta vez, sos vos quien pone las condiciones.

---

<a id="e945"></a>
### e945 · La Marea ciega
*El final · Secreto 5*

**Con `PASTOR_MUERTO`:** a media mañana, los Callados empiezan a moverse. No hacia vos: hacia ningún lado. Se dispersan por la ciudad como hojas, sin rumbo, chocando entre ellos, perdidos. Sin el que los guiaba, son lo que eran al principio: muertos que siguen el ruido. Y el ruido, en Corinto, ya se aprendió a no hacerlo.

La Marea no va a volver a juntarse. No hay quién la junte.

**Él te recuerda** (si el Pastor sigue vivo): lo ves desde la ventana, en la esquina, de traje, con la corbata floja. Te mira. Inclina la cabeza para un costado, como pensando. Después se da vuelta y se va, despacio, hacia el norte, y detrás de él, desde todas las calles, empiezan a salir.

Sabe dónde estás. Va a volver. No esta noche. No la próxima. Pero va a volver.

Leé esto **además** de tu final.

---

<a id="e946"></a>
### e946 · Los que se quedaron
*El final · en lugar de tu final*

No te fuiste. Pudiste, o casi, y no te fuiste: te quedaste con los que no podían irse, con los que tenían fiebre, con el que no iba a pasar el control, con la que no quería firmar.

Corinto sigue cerrada. El muro sigue ahí. Del otro lado, alguien sigue mirando.

Pero adentro hay gente. Gente que no se va a ir. Que va a arreglar las cañerías, plantar la huerta, abrir la escuela, enterrar a los muertos en el cementerio con un sereno que se acuerda de los nombres. Gente que eligió quedarse, porque alguien tiene que quedarse.

Contá a los que se quedaron con vos: son los salvados de este final. Si son 4 o más, leé también **El grupo** ([e943](#e943)); si son menos, **Unos pocos** ([e942](#e942)).

---

<a id="e947"></a>
### e947 · Ceniza
*El final · Secreto 2*

El fuego pasó a las doce del mediodía y duró hasta la noche. Desde abajo, desde la cripta, desde el tanque, desde el sótano inundado, lo escuchaste rugir sobre tu cabeza como un tren que no terminaba de pasar.

Cuando salís, Corinto es gris. Las calles, los techos, los árboles, los Callados. Todo es ceniza. El viento la levanta en remolinos. No queda nadie de pie: ni vivos ni muertos.

Salvo ustedes.

Caminan hacia el norte, por la ruta, por el medio del muro abierto, entre los contenedores ennegrecidos. Nadie los frena. Nadie los está esperando. Nadie sabe que existen.

Eso, de ahora en más, es una ventaja.

Leé esto **además** de tu final.

---

<a id="e948"></a>
### e948 · El mundo sabe
*El final · Secreto 3*

La mujer de la cámara llora mientras filma. El periodista no sabe qué preguntar. Los de traje amarillo se suben a las camionetas sin decir nada, y alguien les grita «¡asesinos!» desde una ventana, y después otro, y después toda la cuadra.

En tres días, la cara de la doctora Ríos está en todos los noticieros del mundo. En una semana, el Comando de Emergencia no existe más. En un mes, hay un juicio.

A vos te llaman a declarar. Llevás los papeles, el expediente, las fotos, la lista. Hablás cuatro horas. Cuando terminás, en la sala no se oye nada.

Corinto, por primera vez, hace ruido. Y el ruido llega lejos.

Leé esto **en lugar de** la parte final del Secreto, y además de tu final.

---

<a id="e949"></a>
### e949 · Empezar de nuevo
*El final · Secreto 4*

No viene nadie. No va a venir nunca. Afuera no hay afuera.

Entonces, Corinto es el afuera.

Contá lo que tenés:

- **Cada instalación** es una pieza de la ciudad nueva: la Huerta da de comer, la Cisterna da de beber, la Enfermería cura, el Taller arregla, la Radio llama a otros.
- **Cada facción** con la que estás en paz (Reputación 0 o más) es un barrio que trabaja con el tuyo. Con las cuatro, Corinto tiene un gobierno, una iglesia, unos bomberos y una policía, para bien y para mal.
- **Con `LAS_SEMILLAS_DE_ROSA`**, en primavera hay tomates.
- **Con `TU_VOZ_EN_LA_RADIO`**, la AM 870 ya no repite a la Señora: repite tu voz, que dice dónde juntarse.

Si tenés 6 instalaciones o más y paz con tres facciones: Corinto se salva. No como era: como va a ser.

Si no: se salvan ustedes. Que no es poco.

Leé esto **además** de tu final.

---

## Los epílogos

<a id="e950"></a>
### e950 · El epílogo de la Enfermera
*Epílogo · Juramento*

- **Juramento 0–1.** Marta no vuelve a trabajar de enfermera. Se muda a un pueblo chico, cerca del río, y cuida un jardín. No habla de Corinto. Cuando alguien en el pueblo se enferma, no abre la puerta.
- **Juramento 2–3.** Marta vuelve al hospital, al de otra ciudad, al turno noche. Las otras enfermeras la miran con respeto y un poco de miedo. En el bolsillo del guardapolvo, siempre, una lista de nombres. La cambia cada semana. Nunca la tira.
- **Juramento 4–5.** Marta se queda en Corinto y abre la Enfermería en la planta baja del Regional. Va gente de todos los barrios. Enseña a curar a los que quieren aprender. Al año, tiene doce enfermeras. Les dice a todas lo mismo: «Acá no se muere nadie en nuestro turno».
- **Juramento 6.** Marta encuentra a todos los de su lista. A los vivos y a los muertos. Les lleva flores al cementerio, a los que tienen tumba. A los vivos, los visita una vez por año, el día 0. Ella les dice que es por el control. Ellos saben que no.
- **Con `LA_LISTA_SIGUE`**, si Marta no llegó al amanecer: alguien del grupo sigue la lista por ella. La encuentra completa en el bolsillo de un guardapolvo, con una tilde al lado de cada nombre.

---

<a id="e951"></a>
### e951 · El epílogo del Albañil
*Epílogo · Cimientos*

- **Cimientos 0–1.** Tito no vuelve a construir. Nada. Ni una pared, ni una repisa. Su mujer le pregunta por qué, y él no sabe explicárselo: cada vez que agarra una cuchara de albañil, siente el metal tibio del muro vibrando contra la palma.
- **Cimientos 2–3.** Tito vuelve con su familia, del otro lado. Le pagan una indemnización. La acepta. La dona entera, sin decirle a nadie, a un fondo para los sobrevivientes de Corinto. Firma con otro nombre.
- **Cimientos 4–5.** Tito se queda en Corinto y reconstruye. Primero la escuela, después el hospital, después las casas de Los Bloques. Su cuadrilla son los que sobrevivieron. Hacen paredes que no son para encerrar a nadie.
- **Cimientos 6.** Tito desarma el muro. Contenedor por contenedor, soldadura por soldadura, con los mismos electrodos con los que lo armó. Tarda dos años. Cuando sale el último, el del tramo siete, se sienta en el piso y llora como no lloró nunca. Después lo pintan de colores y lo ponen en la plaza. Abajo, una placa: «Para que no se olvide».
- **Con `TRAMO_NUEVE_SOLDADO`:** el día 41, los de afuera intentan abrir el tramo nueve y no pueden. Tienen que entrar por la puerta, a la vista de todos.

---

<a id="e952"></a>
### e952 · El epílogo de la Agente
*Epílogo · Deber*

- **Deber 0–1.** Sofía devuelve la placa. Nadie le pregunta por qué. Se va a vivir lejos, a un lugar donde no la conozcan. Todavía tiene el sobre, cerrado o abierto. Algunas noches lo saca del cajón y lo mira.
- **Deber 2–3.** Sofía declara en el juicio, o en la investigación, o en la oficina de alguien que tenía que saber. Cuenta lo del día 2, lo de la nena, lo del sobre. No la condenan. No la felicitan. Sigue siendo policía, en otra ciudad, en una comisaría chica, de día.
- **Deber 4–5.** Sofía se queda en Corinto. No hay policía, así que es la policía. Con un brazalete, sin uniforme. No lleva armas: lleva un silbato y la autoridad de alguien que estuvo ahí. Cuando hay un problema en un barrio, la llaman a ella.
- **Deber 6.** El día 41, en el Puesto Norte, Sofía levanta la barrera. Lo cuentan todos los que pasaron: una piba con el chaleco de otro talle, parada al lado de la garita, mirando a los soldados a los ojos, diciendo «pasen, pasen, no corran, pasen». La foto de ese momento la sacó alguien con un celular. Está en todos lados.
- **Con `SIN_ORDEN`:** el sobre, roto en ocho pedazos, lo guarda alguien del grupo en un frasco. Años después, lo donan a un museo.

---

<a id="e953"></a>
### e953 · El epílogo de la Repartidora
*Epílogo · Ruta*

- **Ruta 0–1.** Juli no vuelve a subirse a una bici. La vende, o la deja apoyada en una pared de Corinto, y se va. La caja, si la tiene, la tira al río desde el puente, sin abrirla. O abierta. Da igual.
- **Ruta 2–3.** Juli sigue repartiendo, del otro lado. Otra aplicación, otra bici, otras calles. Cada vez que alguien no atiende el timbre, espera un minuto más de lo que tiene que esperar.
- **Ruta 4–5.** Juli arma en Corinto la primera red de mensajería entre barrios: pibes en bicicleta que llevan cartas, remedios, semillas, noticias, de techo a techo y de puerta a puerta. Les enseña los atajos. Les dice que siempre aprieten el botón verde.
- **Ruta 6.** Juli completa la lista. Cada pedido, entregado. El botón verde, apretado cinco veces. El celular sigue sin señal, pero una mañana, sola en su cuarto, la pantalla se prende y dice: «¡Gracias por tu entrega! Calificación: ★★★★★». Nadie le cree. Ella tampoco. Pero lo vio.
- **Si la caja sigue en tu mochila:** la tiene en un estante de su casa. Nunca la abre (o nunca la vuelve a abrir). A veces, cuando viene alguien, la señala y dice: «Ese es mi último pedido».

---

<a id="e954"></a>
### e954 · Lo que fue de los tuyos
*Epílogo · El grupo*

Por cada sobreviviente con nombre que esté entre los salvados, una línea:

- **Don Ernesto** maneja, una vez más, una locomotora. La primera que sale de Corinto con pasajeros. Hace sonar la bocina en cada paso a nivel.
- **Lucía** abre la Escuela N.º 9 el primer lunes. Vienen once chicos. Con `LOS_TRES_ALUMNOS`, tres de ellos se sientan adelante, como siempre. Pasa lista. Cuando alguien no contesta, deja un silencio.
- **El Chino Morales** pone una parrilla en la esquina del refugio. Nunca cobra a los que estuvieron en la Noche 40.
- **Ana y Bruno** crecen. Bruno se hace bombero. Ana dibuja la Noche 40 en el colegio, y la maestra la manda a la psicóloga, y la psicóloga guarda el dibujo. Con `BRUNO_LO_HIZO`, Bruno no se hace bombero: no se hace nada durante mucho tiempo, y después, de golpe, enfermero. Con `BRUNO_LO_VIO`, no habla de esa noche con nadie, salvo con Ana.
- **Pocho** cambia todas las cerraduras de su vida por una sola llave, la de la casa donde viven Daiana y Thiago. Con `EL_HIJO_DE_POCHO`, Thiago aprende a caminar agarrado de su dedo.
- **Rita** vuelve a curar perros. Le sube la fiebre, de vez en cuando, hasta tres. Nunca más.
- **Gustavo** lleva las cuentas de la ciudad nueva, o de su casa, con su hija, si la encontró. La planilla tiene una columna nueva: «Días desde la Noche 40».
- **La Tana** va a Las Lomas, si no fue antes. Lo que pasa allá, no lo cuenta. Con `ROLO_MUERTO`, ya no tiene nada que hacer allá: se queda, y es la primera en anotarse para cada guardia, aunque ya no haya guardias.
- **Mateo** termina la tesis. La firma un tribunal de tres profesores que no saben qué decir.
- **Doña Rosa** planta las semillas en primavera. El tomate de Aurelio da tomates.
- **Iván** duerme. Ocho horas. Todas las noches.
- **Celeste** canta en un bar, en la esquina del Puerto, los viernes. Siempre termina con «Volver».
- **El Ruso**, si volvió, maneja un taxi nuevo, y cuenta la historia de la última carrera a cada pasajero, cada vez más larga.
- **Hernán** sigue predicando. Ya no habla del Juicio. Habla de los que abrieron la puerta para que entraran otros.
- **Valeria** vuelve a ponerse el casco. Gauna se lo da en la mano.
- **Facu** sale a la calle todos los días. Algunos días, solo para mirar el cielo.
- **La doctora Ríos** declara. Lo que le pase después lo decide alguien que no estuvo en Corinto.
- **El Negro** duerme al pie de tu cama. Cuando alguien golpea la puerta, levanta una oreja. Nada más.

Y los que no tienen ficha, pero estuvieron:

- **Matías** (`MATIAS_EL_FARMACEUTICO`) reabre la Farmacia Central. Le tiembla el pulso cada vez que suena la campanita de la puerta.
- **El camillero** (`EL_CAMILLERO`) vuelve al Hospital Central el primer día. Le dicen que no hay turno para él. Se queda igual.
- **El doctor Pereyra** (`EL_DOCTOR_PEREYRA`) publica sus notas sobre el Callado del sótano. Lo invitan a congresos. Nunca dice qué hizo con él.
- **El jardinero** (`EL_JARDINERO`) planta pasto en la plaza del Casco. No deja que nadie lo pise. Nadie lo pisa.
- **El organillero** (`EL_ORGANILLERO`) toca en la esquina del refugio todos los domingos. Las canciones son las mismas de la cuarentena. Nadie le pide otras.
- **El que estaba preso** (`EL_PRESO`) se presenta en la comisaría el día 42. No hay nadie que lo reciba. Se va a su casa.
- **El desertor** (`DESERTOR_DEL_CORDON`) se saca el uniforme y lo entierra en el Parque. Cuando le preguntan qué hacía antes, dice: «Nada».
- **Los del balcón** (`LOS_DEL_BALCON`): el abuelo les enseña a los nietos a jugar al truco. Hacen trampa los tres.
- **Los del velero** (`LOS_DEL_VELERO`) se van río arriba, a ver si su pueblo sigue ahí. Te mandan una postal. Sigue.
- **Los estudiantes** (`LOS_ESTUDIANTES`) vuelven a la Ciudad Universitaria y escriben, entre todos, la historia de la cuarentena. Hay un capítulo con tu nombre.
- **La mujer de la habitación 9** (`EL_BEBE`) le pone a su hijo el nombre de la persona que abrió la puerta.
- **Luna y su nena** (`LA_NENA_DE_LUNA`): la nena llora fuerte, demasiado fuerte. Ya no importa.
- **Los Quiroga** (`LOS_QUIROGA`) vuelven a su casa y la encuentran como la dejaron. Los chicos lloran por el refugio.
- **Los chicos del hogar** (`LOS_CHICOS_DEL_HOGAR`) tienen, por primera vez, una foto de todos juntos. Vos estás en el medio.
- **Los veinte** (`LOS_VEINTE`): cada año, el día 41, se juntan en el refugio. Cada año son menos. Cada año ponen la misma cantidad de sillas.

<a id="e955"></a>
### e955 · Lo que Corinto recuerda
*Epílogo · La ciudad*

Las ciudades no se acuerdan de todo. Se acuerdan de lo que se cuenta en las colas, en los velorios, en los bares que vuelven a abrir. Por cada Marca de tu hoja que esté en esta lista, leé su línea. Si no tenés ninguna, Corinto no se acuerda de vos. A lo mejor está bien así.

**El fuego y el ruido**

- `ARDIO_LA_FABRICA` · Durante años, en La Fabril, los chicos juegan a «la noche que ardió». Siempre hay uno que hace de vos, y siempre se pelean por quién.
- `VOLO_EL_GAS` · El pozo del depósito de gas se llena de agua de lluvia. Alguien le tira peces. Alguien le pone tu nombre, mal escrito, en un cartel de madera.
- `LA_BODA` · La foto de la boda, sacada con un celular que tenía 4 % de batería, es la primera que se imprime en Corinto después de la cuarentena. Está colgada en la Municipalidad.
- `DON_CACHO` · Un año después, el camión de Don Cacho vuelve a pasar por Corinto, tocando la bocina. Nadie sabe cómo salió. Él no lo cuenta. Te trae algo.
- `LA_7012` · La locomotora 7012 se queda en el Puerto, oxidada, con flores en la cabina. Nadie la mueve. Nadie se anima.
- `SENALES_AL_HELICOPTERO` · En un archivo del Comando hay una foto borrosa de una sábana blanca en una azotea. Alguien, años después, la encuentra, y empieza a hacer preguntas.
- `LLAMASTE_POR_RADIO` · En los pueblos río abajo hay gente que se acuerda de una voz que decía una dirección de Corinto. Algunos fueron. Algunos llegaron.
- `LAS_LUCES_DE_CORINTO` · Encuentran tu mapa de las luces de la ciudad pegado en una pared. Cada luz tiene una cruz o un círculo. Nadie sabe qué querían decir los círculos.
- `LA_SENORA_SE_EQUIVOCA` · Fuiste de los primeros en darte cuenta de que la Señora contaba mal. Lo vas a decir en todas las entrevistas, y en ninguna te van a creer.
- `LA_SENORA_CALLADA` · Corinto se acuerda del día en que la radio se calló. Lo cuentan como el día en que la ciudad empezó a hablar sola.

**La gente**

- `DUDA_DEL_PRIMERO` · Nunca supiste qué te hizo dudar aquella primera noche. Algunas noches, todavía, te despertás pensando en eso.
- `LOS_VIEJOS_DE_LA_VELA` · La vela sigue prendida en la ventana de esa casa. Alguien la cambia. Nadie sabe quién.
- `TRUEQUE_GENEROSO` · Una familia que nunca supo tu nombre cuenta, en otra ciudad, que en Corinto alguien les dio de comer sin pedir nada. Los nietos creen que es un cuento.
- `PERDONASTE_UN_ROBO` · El que robó aquella vez se queda en el refugio después del día 41. Es el último en irse de cada guardia. No hace falta que diga por qué.
- `MANO_DURA` · Funcionó. Todos se acuerdan de que funcionó. Nadie se acuerda de vos con cariño.
- `ASAMBLEA` · El refugio sigue votando todo, hasta el menú. Las actas están escritas a mano, en un cuaderno Rivadavia, y la primera dice tu nombre.
- `EL_DIA_QUE_SE_FUERON` · Los que se fueron del refugio aquella vez no vuelven. Uno te escribe, meses después. La carta dice «perdón» cuatro veces y no dice de qué.
- `RACIONES_A_LA_VISTA` · En el refugio la comida se sigue sirviendo a la vista de todos, aunque ya sobre. Es una costumbre. Nadie se acuerda de por qué empezó.
- `LOS_PESCADORES` · Los pescadores del Puerto vuelven al agua el primer mes. Te guardan el primer pescado de cada temporada.
- `LOS_DEL_BLOQUE_B` · Las doce familias del bloque B siguen viviendo arriba, con la escalera cortada, por las dudas. Bajan los domingos. Te saludan por tu nombre.
- `ESCONDITE_DE_SAQUEADORES` · Sabías dónde vivían y no se lo dijiste a nadie. Nunca vas a saber si eso salvó a alguien o no.
- `LIBERASTE_A_LAS_COCINERAS` · Las mujeres que sacaste del barrio cerrado abren un comedor en Los Bloques. Tu plato no se cobra. Nunca.
- `ESCONDISTE_AL_INMUNE` · Los papeles del Comando dicen que el sujeto «no fue recuperado». En la casilla de observaciones alguien escribió, a mano, una sola palabra: «escondido».

**Las facciones**

- `RUMOR_DE_LOS_LOBOS` · Nunca se supo si era verdad. En Las Lomas nadie quiere hablar del tema, y eso, para Corinto, ya es una respuesta.
- `TE_VIERON_LOS_LOBOS` · Los Lobos sabían que entrabas a Las Lomas. Te dejaron. Todavía no sabés por qué.
- `LE_PAGAS_A_LOS_LOBOS` · Pagaste para que te dejaran en paz. Te dejaron. Después del día 41, otros siguen pagándoles, a otros, por lo mismo.
- `RECHAZASTE_A_LOS_LOBOS` · La puerta que no pudieron romper los Lobos tiene todavía los agujeros de los tiros. Los chicos del barrio meten los dedos adentro, para contarlos.
- `LES_ROBASTE_EL_CUARTEL` · Los Bomberos no te nombran. Cuando alguien te nombra delante de ellos, se levantan y se van.
- `LA_SEPTIMA_ES_NUESTRA` · El Destacamento escribió un informe sobre «la toma de la Comisaría 7.ª por civiles armados». Tu nombre está mal escrito. Mejor.
- `NO_CENSADO` · En la lista oficial del Comando, tu refugio no existe. En el censo de después, tampoco. Los que vivieron ahí tienen que demostrar que estuvieron vivos.
- `PEAJE` · Pagaste peaje en una ciudad sin rutas. Lo vas a contar como un chiste. No lo fue.

**Los lugares**

- `EL_OSO` · El oso del zoológico sigue en su jaula, gordo, viejo, con la puerta abierta. Nadie se acerca. Vos sí, a veces, con algo de comer.
- `EL_OSO_LIBRE` · En el Parque hay un oso. Los chicos lo ven de lejos, entre los árboles. Los Callados del Parque, en cambio, no se ven más.
- `EL_SERENO` · El sereno del cementerio sigue ahí. Te tiene guardado un lugar al lado de los tuyos. No te lo dice. Lo sabés.
- `EL_TREN_SELLADO` · El tren que sellaste sigue en la vía 4. Las cadenas aguantan. Los que están adentro, también. Nadie quiere ser el que lo abra.
- `VAGON_DE_LA_C` · El vagón de la línea C sigue en el túnel, con los sentados adentro. Cuando el subte vuelve a andar, lo dejan ahí y lo rodean.
- `LA_ZORRA` · La zorra de las vías queda en la Estación, pintada de amarillo. Los chicos la empujan los domingos, de un andén al otro.
- `LLAVES_DEL_PORTERO` · El manojo de llaves del portero cuelga de un clavo en la puerta del refugio. Nadie lo saca. Por las dudas.
- `EL_AGUA_VUELVE` · Corinto se acuerda de la tarde en que salió agua de las canillas. Todos los chicos de la ciudad salieron a bañarse a la vereda, con Callados a dos cuadras.
- `SIN_CAMPANA` · La parroquia de San Lázaro nunca vuelve a tener campana. A las doce, en lugar de la campana, alguien golpea una olla.
- `GIMNASIO_QUEMADO` · El gimnasio de la Escuela N.º 9 queda negro. Cuando la escuela vuelve a abrir, ponen una placa en la puerta. No dice qué pasó: dice «Nunca más».
- `EL_CAMION` · El camión del Comando se queda donde lo dejaste, vacío, con las puertas abiertas. Alguien le pinta encima, en letras grandes: «ESTO NOS DIERON».

---


## El Éxodo

<a id="e960"></a>
### e960 · Las salidas
*Éxodo · ◷ 0*

El muro rodea la ciudad por el norte, el este y el oeste. Al sur está el río, ancho, marrón, con lanchas militares que patrullan de noche. El muro no llega al agua: termina en una escollera. Esa es la grieta de Corinto.

En el **modo Éxodo** (r210), ganás si cruzás el perímetro **antes de la Noche 40** con al menos un sobreviviente. Con el Secreto 2 ([e582](#e582)), estas salidas están abiertas en cualquier modo.

| Salida | Qué hace falta | Cuántos | Prueba al salir |
|---|---|---|---|
| **A pie por la escollera** | `LA_ESCOLLERA` ([e383](#e383)), de noche | 4 | Todos `[Sigilo]`; con 6−, la lancha te ve: esa persona no sale (vuelve con 1 Herida, o no vuelve con 1 en 1d6) |
| **La lancha** | `LA_LANCHA` ([e382](#e382)), 2 Combustible | 4 | `[Mecánica]` o `[Sigilo]` de quien maneje; con 6−, una lancha militar dispara: 1 Herida a cada uno, pero salen |
| **Tigre Dos** | `TIGRE_DOS` ([e543](#e543)) y una radio para avisarle | 6 | Ninguna: ella sabe por dónde |
| **La barcaza** | `BARCAZA_MOTOR`, `BARCAZA_TIMON`, `BARCAZA_COMBUSTIBLE` ([e254](#e254)) | 30 | `[Mecánica]`; con 6−, salen igual, pero la mitad de los que van con vos no llegan a subir (+Procesión en el Puerto) |
| **El ferry** | `EL_FERRY` ([e255](#e255)) | Todos | `[Labia]` (calmar a la gente en el muelle); con 6−, salen, pero hay una avalancha: 1d6 personas caen al agua |
| **La autobomba por la escollera** | `LA_AUTOBOMBA` ([e481](#e481)) y `LA_ESCOLLERA` | 6 | `[Mecánica]`; con 6−, la autobomba se queda en el agua y hay que nadar: `[Físico]` cada uno |
| **El blindado** | `EL_BLINDADO` ([e552](#e552)) y `LA_ESCOLLERA` | 8 | `[Mecánica]`; con 6−, llegás, pero 1d3 heridos en el choque contra la barrera de la costa |
| **El plan de Ocampo** | [e694](#e694), opción 1 | Vos y 4 | Ninguna: van con el Destacamento |
| **El corredor** | `EL_CORREDOR` y el ferry (con Reputación +2 con el Destacamento) | Todos los que tengan Fiebre 0 | El control sanitario (como en [e581](#e581)) |

- **Salir** cuesta el día entero (◷ 6) y hay que estar todos juntos en el barrio de la salida al anochecer.
- **Con un vehículo** (`LA_4X4`, `CAMIONETA_DE_LOS_SOSA`, `EL_TAXI`, `AMBULANCIA_12`, `CARRITO_DE_GOLF`): el grupo llega al barrio de la salida sin tirar encuentros, y los heridos Graves pueden ir. Cada persona ocupa cuatro casilleros de la carga del vehículo.
- **Los que no caben** se quedan. Cada uno que dejes, −1 Ánimo para vos, salvo que lo elija.
- Al otro lado → [e961](#e961).

---

<a id="e961"></a>
### e961 · Del otro lado
*Éxodo · El final*

El agua está fría. El motor tose. Las luces de Corinto, las pocas que quedan, se van haciendo chicas detrás de ustedes. Nadie habla. Nadie quiere ser el que lo diga primero.

Y después, del otro lado, una costa. Árboles. Una ruta. Un cartel de una estación de servicio, apagado. Una casa con una luz.

Lo lograron.

Contá a los que cruzaron y leé **Solo** ([e941](#e941)), **Unos pocos** ([e942](#e942)) o **El grupo** ([e943](#e943)). Después, abrí el Secreto ([e570](#e570)) y leé solo **La verdad**: la parte del día 41 ya no es para ustedes. Pero la vas a escuchar por la radio, en algún pueblo, dentro de unos días. Y vas a apagar la radio.

Después, tu epílogo ([e950](#e950)) y lo que Corinto recuerda ([e955](#e955)).

---

## El fin

<a id="e990"></a>
### e990 · La muerte
*El final*

No duele tanto como pensabas. O sí, pero dura poco.

Lo último que ves es lo que tengas más cerca: una cara, una pared que hiciste, el techo del refugio con su mancha de humedad en forma de mapa, el cielo de Corinto, gris, sin pájaros.

Lo último que escuchás es tu propio corazón. Después, nada.

**Tu partida terminó.**

- **Si fue antes de la Noche 40:** en Corinto sigue la cuarentena. Tu refugio queda con los que quedaron. Quizás aguanten. Quizás no. Nunca lo vas a saber.
- **Si fue en la Noche 40:** al amanecer, alguien que se escondió sale a la calle y cuenta lo que hiciste. Contá a los que se salvaron igual (e940), aunque vos no estés: tu final es el de ellos.
- Leé tu epílogo ([e950](#e950)) con tu contador **menos 1**.

**Variante · El relevo.** Si no querés que termine, un sobreviviente con nombre que esté en el refugio toma tu lugar: usá sus Habilidades (las de su ficha, más 2 puntos donde quieras), Heridas 5, Ánimo 3. No tiene arco ni contador: su epílogo es su línea de [e954](#e954). La Moral baja 3.

---

<a id="e991"></a>
### e991 · La conversión
*El final*

La Fiebre llega a seis a la madrugada. Primero, el calor. Después, el frío. Después, un silencio que empieza adentro de la cabeza y se va extendiendo, como la ciudad cuando se apagan las luces de a una.

Ya no tenés miedo. Ya no tenés nada.

Si alguien está con vos, tiene una última decisión que tomar, y la toma.

Si no hay nadie, te levantás. Despacio. Caminás hasta la puerta. Te quedás ahí, de cara a la madera, con la frente apoyada. Esperando algo que no sabés qué es. Escuchando.

**Tu partida terminó.**

- Si alguien del grupo sigue vivo, cada vez que alguien vuelva al refugio, te va a encontrar en la puerta. Ellos deciden qué hacer con vos.
- En la Noche 40, si el refugio todavía resiste, sos uno de los de la primera oleada. Siempre lo fuiste.
- Leé tu epílogo ([e950](#e950)) con tu contador **menos 2**.

**Variante · El relevo** ([e990](#e990)): también se puede usar acá.
