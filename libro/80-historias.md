# Las historias

*Todos trajeron algo a la cuarentena: una lista de pacientes, un contrato, un sobre cerrado, una caja con un precinto rojo, un nombre que nadie contesta, algo que no se puede deshacer. Lo que hagas con eso es tu historia. La ciudad te la va a ir contando de a pedazos, en los lugares donde dejaste algo.*

**Cómo se leen.** Cada arco empieza en el prólogo y sigue en los lugares de la ciudad: cuando un lugar dice «Si tu Motivo es La lista…», es tu historia. Tu **contador** (r198) sube y baja con lo que hacés, y al amanecer decide tu epílogo. Las entradas de un arco que no es el tuyo no se leen. Tu oficio no cambia la historia, pero cambia cómo la vivís: muchas entradas tienen una opción que solo se abre con cierta Habilidad, un oficio o una maña.

---

## La lista · El pabellón 4

<a id="e800"></a>
### e800 · La lista
*La lista · ◷ 0*

La sacás del bolsillo y la desdoblás. Una hoja de cuaderno, escrita en el cambio de turno de la noche del día 0 (con tu letra, si trabajabas ahí; con la de Raquel, si no): los doce pacientes del pabellón 4, con la cama, el nombre, el diagnóstico y la medicación. Al lado de cada uno, una tilde: la última ronda.

Cuatro murieron esa noche. Uno se levantó: el señor Aguirre, cama 12. Los otros siete no sabés.

Si tenés `OFICIO_SALUD`, hiciste un juramento cuando te recibiste. No decía nada de esto. Decía «cuidar». Si no, el juramento lo hiciste esa noche, en el pasillo, cuando Raquel te puso la hoja en la mano y dijiste que sí sin pensarlo.

Anotá en tu hoja **siete nombres** de la lista (los vas a ir tachando): **Benítez** (cama 2, EPOC), **Coria** (cama 3, posoperatorio), **la nena Olmos** (cama 5, apendicitis), **Ferro** (cama 7, diabética), **Luna** (cama 8, embarazada), **Quiroga** (cama 10, fractura de cadera), **Suárez** (cama 11, neumonía).

- **Tu contador es el Juramento.** Sube cuando salvás a alguien; baja cuando dejás morir a alguien que podías salvar (r198).
- **La lista no se pierde.** Mientras tengas `LISTA_DEL_PABELLON`, ningún evento que te quite la Mochila te la quita: va en el bolsillo de adentro.
- **No hace falta saber curar.** Varias entradas piden `[Medicina]`. Si no es lo tuyo, llevá a alguien del grupo que sepa: su ayuda suma (r122), o puede hacer la prueba por vos si va con vos.
- Cada vez que encuentres a alguien de la lista, tachalo. Si llegás a tachar cuatro o más → [e808](#e808).
- Los lugares de tu arco: el **pabellón 4** ([e801](#e801)), la **farmacia del Casco** ([e803](#e803)), la **morgue** ([e804](#e804)), el **Edificio Sarmiento** ([e805](#e805)) y el **hospital de campaña** del Perímetro ([e807](#e807)).

---

<a id="e801"></a>
### e801 · El pabellón 4
*La lista · Hospital Central · ◷ 1*

Tercer piso. El pasillo donde trabajaste doce años. La silla de la enfermería con tu almohadón. El tablero de corcho con los turnos. El pabellón está en silencio. Las camas, deshechas. En la cama 12 hay un suero colgado que gotea sobre nada.

En la cama 3 hay alguien.

**Coria**, sesenta años, operado de la vesícula el día −1. Flaco, deshidratado, vivo. Se escondió en el placard de la ropa blanca durante un mes, saliendo de noche a tomar agua de la canilla del office. Cuando te ve, llora.

—Usted volvió —dice—. Yo sabía que usted volvía.

1. **Llevártelo.** Está débil: no hace puestos durante 3 noches, después es un sobreviviente común. Tachá a Coria. +1 Juramento. +1 Moral cuando llega.
2. **Si no podés llevarlo hoy**, le dejás agua y comida (1 Víver) y le decís que vuelvas. Anotá `CORIA_ESPERA` y, al lado, el número del día. Si volvés antes de que pasen 5 días, borrá la Marca y llevátelo (opción 1). Si no, se muere: −1 Juramento, y borrá la Marca.

En el cajón de la enfermería, además, está la libreta de turnos. En la última hoja, alguien escribió con otra letra: «Al que tenga la lista: los del 4 que estén vivos llevalos al Sarmiento. R.» Es la letra de Raquel. → [e805](#e805), cuando vayas.

---

<a id="e802"></a>
### e802 · La carta de la cama 8
*La lista · ◷ 0*

La carta está escrita en un papel de recetario del hospital. La letra es temblorosa, de alguien que escribe acostada.

«Soy Luna, la de la cama 8. Raquel me dijo que la lista la tiene usted, y que usted iba a venir. Estoy en Los Bloques, en el monoblock F, en el séptimo. Ya es la semana. Tengo miedo. No hay nadie que sepa. ¿Usted puede venir?»

La carta tiene una fecha: dos días atrás.

1. **Ir.** A Los Bloques, al monoblock F, antes de la próxima carta de Espadas. Si llegás → [e806](#e806).
2. **No ir.** No podés. No hoy. Cuando salga la próxima carta de Espadas, tachá a Luna con una cruz. −1 Juramento. −1 Ánimo.

---

<a id="e803"></a>
### e803 · La insulina
*La lista · Farmacia del Casco · ◷ 0*

—¿Insulina? —dice el chico de la farmacia—. Hay. En la heladera de atrás. Bueno, había heladera. Ahora es un placard frío.

Abre el placard. Hay cuatro cajas de insulina, tibias. Funcionan igual, por unos días.

Ferro, cama 7, diabética. Ella vive en el Casco, encima de la panadería de la calle Rivadavia. Lo dice tu lista: alguien anotó la dirección para el alta.

1. **Ir con la insulina.** ◷ 1, en el Casco, por las Azoteas o la Calle. Tirá 1d6: con 1–2, llegás tarde: Ferro está en la cama, convertida, atada por su marido, que te abre la puerta con los ojos rojos (−1 Ánimo, tachá a Ferro con una cruz). Con 3–6, Ferro está viva, débil, en coma diabético; con `[Medicina]` 7+, la despertás. El marido y ella vienen al refugio (2 sobrevivientes comunes). Tachá a Ferro. +1 Juramento.
2. **Llevarte la insulina para después.** Ocupa 1 casillero. Si alguna vez en un evento hay un diabético, la tenés.

---

<a id="e804"></a>
### e804 · El forense
*La lista · Morgue · ◷ 0*

Las planillas del forense son de los primeros cinco días. Si tenés Medicina 2 o más, las leés de corrido; si no, te lleva una hora (◷ 1) entender las columnas: lo que entró, la hora, la causa, la hora en que se levantó. Columnas y columnas. Todos se levantaron entre las tres y las seis horas después de morir.

Todos menos cuatro. Cuatro nombres con un círculo rojo y una anotación: «Mordido documentado. Fiebre 38,5 a 40. Remite al 5.º día. Sin conversión. Derivado al Comando por orden de Salas». Uno de los cuatro nombres está en tu lista: **Quiroga**, cama 10.

Una pista ([e560](#e560)).

Anotá `QUIROGA_DERIVADO`. Quiroga no se convirtió. Se lo llevó el Comando. Si alguna vez vas al **hospital de campaña** del Perímetro ([e423](#e423)), en el fichero de triaje está su ficha → [e807](#e807).

---

<a id="e805"></a>
### e805 · El departamento de Raquel
*La lista · Edificio Sarmiento · 9.º C · ◷ 1*

El departamento de Raquel huele a lavanda y a cigarrillo. Sobre la mesa, una caja de zapatos con una palabra escrita con fibrón: «LISTA».

Adentro: 4 Fármacos, 2 Antivirales, un tensiómetro, la llave del depósito del Central y una carta.

«Para el que tenga la lista: me llamaron del Comando. Quieren la lista del personal con el grupo sanguíneo. Quieren saber quién se enfermó el año pasado con la gripe y quién no. No me gusta. Si me pasa algo, quedate con esto. Y cuidá a los del 4: alguien tiene que cuidarlos. Si estás leyendo esto, ese alguien sos vos. R.»

Una pista ([e560](#e560)). +1 Juramento: alguien confió en vos.

Si el Sarmiento es tu refugio, la caja está en tu casa desde el principio: leé esto la primera noche.

---

<a id="e806"></a>
### e806 · La cama 8
*La lista · Los Bloques · Monoblock F · ◷ 2*

Séptimo piso, sin ascensor. En el departamento hay una chica de veinte años en el colchón, sudando, agarrada a la sábana. Luna. Está pariendo. No hay fiebre: es el parto, que se adelantó. Está sola: el novio salió a buscar comida hace tres días.

Si tenés `OFICIO_SALUD`, es la primera vez en un mes que hacés algo que sabés hacer. Si no, Luna te agarra la mano y te dice lo que tenés que hacer entre contracción y contracción: aprendés rápido.

`[Medicina]` (+1 con `OFICIO_SALUD`; +1 con Botiquín; si no tenés Medicina 1 o más, la prueba la puede hacer alguien del grupo que venga con vos).

- **Con 10+:** una nena. Llora fuerte, demasiado fuerte para Tolme. Luna se ríe y llora. Vienen al refugio las dos. +2 Juramento, +2 Moral. Anotá `LA_NENA_DE_LUNA`. El llanto: +1 Rastro.
- **Con 7–9:** una nena, y Luna sangra mucho. 2 Fármacos para pararlo. Si los tenés, como con 10+, pero +1 Juramento. Si no, Luna muere esa noche y la nena vive: +1 Juramento, −2 Ánimo.
- **Con 6−:** las dos se complican. Hacés todo. Al amanecer, una de las dos vive (elegí cuál). Tachá a Luna. −1 Ánimo.

---

<a id="e807"></a>
### e807 · El fichero del triaje
*La lista · Hospital de campaña · ◷ 1*

Buscás en el fichero. Las fichas están por orden de llegada. Las manos te tiemblan.

Encontrás cuatro de tu lista: **Benítez**, **Suárez**, **la nena Olmos** y **Quiroga**. Benítez y Suárez: «Reacción a L-40: negativa». Muertos. La nena Olmos: «Sin fiebre al ingreso. Derivada a sector B». No sabés qué es el sector B. Y Quiroga: «Sujeto Q-10. Sin seroconversión. Trasladar al Comando. URGENTE».

Tachá a los cuatro. A dos con cruz. A dos con signo de pregunta.

Una pista ([e560](#e560)), dos si tenés `QUIROGA_DERIVADO`.

1. **Buscar el sector B.** Detrás de la carpa grande, `[Sigilo]`, ◷ 1. Con 7+, encontrás una carpa con catres y una docena de chicos sin fiebre que miran una tele sin señal. La nena Olmos está ahí. Te reconoce de la noche del brote: «¡Vos! ¡Vos tenías la lista!». Si te la llevás (`[Sigilo]` otra vez para salir), +2 Juramento y −2 Reputación con el Destacamento. Si no, por lo menos sabés que está viva: +1 Juramento.
2. **Irte.** Ya sabés lo que querías saber. −1 Ánimo.

---

<a id="e808"></a>
### e808 · El juramento
*La lista · ◷ 0*

De noche, en el refugio, sacás la lista. Ya no es una lista: es un mapa de tachaduras, cruces, signos de pregunta, nombres que encontraste vivos.

Te das cuenta de que no la vas a terminar. No se termina. No se terminaba antes tampoco: siempre había otro turno, otra cama.

**Elegí qué vas a hacer con la lista:**

1. **Guardarla.** Seguís buscando hasta el último día. +1 Juramento.
2. **Pasársela a alguien.** A alguien del grupo con Medicina 1 o más, o que quiera aprender. Le enseñás todo lo que sabés: esa persona gana Medicina +1. Anotá `LA_LISTA_SIGUE`. En tu epílogo, si no llegás al amanecer, alguien sigue la lista por vos.
3. **Quemarla.** Hiciste lo que pudiste. Recuperás todo tu Ánimo. Tu contador queda como está.

Si tu Juramento es 5 o más, esa noche dormís. Por primera vez desde el día 0, sin soñar con la cama 12.

---

## La obra · El muro

<a id="e810"></a>
### e810 · El contrato
*La obra · ◷ 0*

Lo leés de nuevo a la luz de una vela. Tres hojas abrochadas con el membrete de la constructora y el sello del Comando de Emergencia.

«Obra de contención, accesos norte. Provisión y montaje de contenedores marítimos apilados (tres niveles), soldadura de unión, coronamiento con concertina. Longitud: once kilómetros. Plazo de ejecución: diecinueve días. Inicio: día −21.»

Día −21. El contrato se firmó el día −21. El brote fue el día 0. A todos los que trabajaron ahí les pagaron por adelantado, y nadie preguntó, porque había cuotas que pagar y chicos que mandar a la escuela. Tu fila de r104 dice qué hiciste vos.

Ayudaste a construir la jaula.

- **Tu contador es Cimientos.** Sube cuando terminás una instalación; baja cuando un frente llega a 0 (r198).
- **No hace falta saber soldar.** Las pruebas de `[Oficio]` de este arco las puede hacer alguien del grupo que vaya con vos. Lo que no puede hacer nadie más es acordarse.
- Los lugares de tu arco: el **archivo de obras públicas** de la Municipalidad ([e811](#e811)), **el muro** ([e815](#e815)), la **sección que cedió** ([e814](#e814)) y la **obra que nunca terminaste** ([e816](#e816)).
- Una pista ([e560](#e560)): ya la tenés, en la mano.

---

<a id="e811"></a>
### e811 · El expediente
*La obra · Municipalidad · ◷ 1*

En el archivo de obras públicas buscás por número de licitación. Lo encontrás en el tercer estante: una carpeta gruesa, con la tapa sellada «RESERVADO». Adentro, el pliego, los planos, las actas. Y una nota del Comando a la constructora, firmada por un tal Dr. M. Salas:

«Se requiere que el tramo 9 se ejecute con soldadura provisoria, apta para desmontaje rápido desde el exterior. Motivo: acceso de personal de observación al término del plazo.»

El tramo nueve. Desmontable desde afuera. Lo soldó la cuadrilla de Ramírez, sabiendo que estaba mal, porque el ingeniero dijo «hacelo así, que lo pide el cliente». Vos estabas ahí, o firmaste el remito, o cobraste. Alcanza.

Una pista ([e560](#e560)). Anotá `EL_TRAMO_NUEVE`.

Y en los planos hay algo más: la ubicación de los depósitos de materiales de la obra. Chapas, perfiles, electrodos, que nunca se usaron. En La Fabril → [e816](#e816).

---

<a id="e812"></a>
### e812 · La carta de Gisela
*La obra · ◷ 0*

La letra es de Gisela, la administrativa de la constructora, la que te pagaba cada viernes. No puede ser: Gisela se fue a Santa Rosa, del otro lado del muro, el día −5. Te acordás bien: la empresa le pagó el pasaje, «un regalo por el contrato».

«Si te llega esto es porque el chico del correo cumplió. Estoy bien. Nos sacaron de la ciudad el −5, a mí y a las familias de los jefes. No sabíamos nada, te lo juro. Ahora sí sabemos. Tengo tu nombre en una lista de los que la empresa tiene que sacar cuando abran. Aguantá. G.»

La empresa sacó a las familias cinco días antes. Sabían.

Una pista ([e560](#e560)). +1 Cimientos: hay alguien esperándote del otro lado. Si tenés `LA_FOTO`, la mirás un rato largo: recuperás todo tu Ánimo, y podés volver a usar la foto una vez más.

---

<a id="e813"></a>
### e813 · El ingeniero
*La obra · ◷ 0*

Se abre cuando visitás el campamento del Destacamento ([e690](#e690)) o el Puesto de control Norte ([e421](#e421)).

Entre los soldados, con un casco blanco y un chaleco reflectivo, hay un hombre que conocés: el ingeniero Duarte, de la constructora. Te ve y se pone pálido.

—Vos. Me trajeron para mantener el muro. No me dejan salir. Nadie sale.

1. **Preguntarle por el tramo nueve.** «Lo sabés vos, lo sé yo. Se abre desde afuera el día que ellos quieran.» Una pista ([e560](#e560)).
2. **Pedirle ayuda.** Duarte tiene los planos de todo el muro. `[Labia]`. Con 7+, te da una copia: sabés dónde están las soldaduras flojas de todos los tramos. Anotá `LOS_PLANOS_DEL_MURO`. En la Noche 40, si la Marea entra por una brecha del muro (`EL_MURO_CEDIO`), sabés por dónde va a venir: la primera oleada no puede elegir el frente más débil (un 6 se vuelve a tirar).
3. **Pegarle.** `[Pelea]`. Con 7+, le rompés la nariz. Los soldados te sacan del Perímetro. −1 Reputación con el Destacamento, +1 Ánimo.

---

<a id="e814"></a>
### e814 · La sección que cedió
*La obra · ◷ 0*

Sabés qué sección fue antes de que nadie te lo diga. No fue el tramo nueve. Fue el siete, el de al lado. Lo soldaron a las apuradas, de noche, con electrodos húmedos, porque el plazo era diecinueve días y no veinte. Lo soldó Ramírez, el mismo Ramírez que se levantó el día 1.

−1 Ánimo. −1 Cimientos.

Pero sabés cómo se tapa.

1. **Ir al Perímetro a ayudar.** Hoy, al Perímetro, sin tirar encuentro al llegar (los soldados te dejan pasar si les decís lo que sabés). ◷ 4, `[Oficio]` con +2. Con 7+, el tramo siete queda mejor que antes: borrá `EL_MURO_CEDIO`. +2 Reputación con el Destacamento, +2 Cimientos. Con 6−, tapan lo que pueden: la primera oleada de la Noche 40 suma +1 en lugar de +2.
2. **No ir.** No es tu muro. No es tu ciudad. No es tu culpa. (Es un poco tu culpa.)

---

<a id="e815"></a>
### e815 · La soldadura
*La obra · El muro · ◷ 1*

Ponés la mano en el contenedor de abajo, un azul de la naviera danesa. El número de lote pintado con plantilla: 7-B-114. Es del tramo que conocés. Si tenés `OFICIO_OBRA`, la soldadura de unión es tuya: la reconocés por el cordón, un poco más grueso de un lado, porque siempre soldaste así. Si no, la reconocés por el número: lo leíste cien veces en los remitos.

Del otro lado se escucha la Marea. El metal vibra contra tu palma.

1. **Revisar tu tramo.** ◷ 2. Recorrés doscientos metros mirando cada unión. `[Oficio]`. Con 7+, encontrás dos uniones que van a ceder antes de la Noche 40 y le avisás al Destacamento: +1 Reputación, y anotá `GRIETA_EN_EL_MURO` (sabés dónde). Con 10+, además, te dan electrodos: 2 Metal.
2. **Escribir tu nombre.** Con un clavo, en la pintura, al lado de la soldadura: tu nombre y una palabra, «Perdón». +1 Ánimo.
3. **Si tenés `EL_TRAMO_NUEVE`:** vas hasta el nueve. Las soldaduras provisorias están ahí, con sus pernos de desmontaje del lado de afuera. Podés soldarlos para siempre (Soldadora y Generador, o los del Destacamento si tenés Reputación +1: ◷ 3, `[Oficio]`). Con 7+, anotá `TRAMO_NUEVE_SOLDADO`: nadie va a entrar por ahí desde afuera. Nadie va a salir tampoco. +2 Cimientos.

---

<a id="e816"></a>
### e816 · El obrador
*La obra · La Fabril · ◷ 1*

El depósito de la obra, en un galpón alquilado de La Fabril: un portón con candado y el logo de la constructora. Adentro, lo que sobró de diecinueve días de obra: perfiles de hierro, chapas, bolsas de cemento, electrodos, una soldadora eléctrica, un andamio desarmado, cascos.

Es lo que necesitás para hacer la mejor pared de tu vida.

Revisás una vez, sin tirar: **6 Metal, 4 Sujeción, una Soldadora** (necesita Generador) y **cemento** para dos Tapiados de ladrillos ([e740](#e740)). Todo pesa: 2 viajes, o uno con un vehículo.

Anotá `EL_OBRADOR`. +1 Cimientos.

Si tenés `LOS_PLANOS_DEL_MURO` o `EL_TRAMO_NUEVE`, en el escritorio del capataz hay un sobre con tu nombre y plata adentro. La paga del último tramo. No la querés. La dejás. −1 Ánimo y +1 Ánimo: las dos cosas.

---

<a id="e817"></a>
### e817 · La última pared
*La obra · Tu refugio · ◷ 0*

Se abre cuando construís el **Último Cuarto** ([e761](#e761)).

No es una pared más. Es la pared. La medís tres veces. Mezclás el cemento como te enseñaron en el obrador, con la pala en ángulo. Ponés cada ladrillo, cada chapa, cada perfil, como si fuera lo único que vas a hacer en tu vida. Quizás lo es.

El Último Cuarto tiene **+2 Resistencia** (además del +1 de *Ojo de obra*, si lo tenés). +1 Cimientos. Si tenés `EL_OBRADOR`, usás los perfiles de hierro de la obra: +1 Resistencia más.

Cuando terminás, apoyás la frente en la pared. Está fría. Aguanta. La hiciste vos.

---

## La orden · El sobre

<a id="e820"></a>
### e820 · El sobre
*La orden · ◷ 0*

El sobre marrón sigue en el bolsillo interior de tu campera, con el sello rojo intacto: un escudo, el número 40 y la palabra RESERVADO. «Para ejecutar al recibir la señal.»

No sabés qué señal. No sabés qué orden. Dejaste el puesto antes de saberlo.

- **Tu contador es el Deber.** Sube cuando protegés a civiles arriesgándote; baja cuando usás la fuerza contra civiles desarmados (r198).
- **No hace falta ser policía.** El sobre no pregunta quién lo lleva. Pero los soldados sí: si tenés `OFICIO_POLICIA`, en este arco podés usar Puntería en lugar de Labia con ellos (*Reglamentaria*).
- **Podés abrir el sobre** cuando quieras → [e821](#e821). Mientras esté cerrado (`ORDEN_SELLADA`), el Destacamento cree que lo tenés sin leer, y eso vale algo.
- Los lugares de tu arco: la **Comisaría 1.ª** del Casco ([e823](#e823)), el **Puesto de control Norte** ([e824](#e824)) y el **campamento** del Destacamento ([e825](#e825)).

---

<a id="e821"></a>
### e821 · Abrir el sobre
*La orden · ◷ 0*

Rompés el sello. Una sola hoja, con membrete del Comando de Emergencia.

> ORDEN DE OPERACIONES N.º 40 · RESERVADO
> Al personal del cordón, Puesto Norte.
> A la recepción de la señal **VERDE**: habilitar el corredor sanitario. Control de temperatura. Evacuar a los aptos.
> A la recepción de la señal **ROJA**: replegar el cordón a la línea B. Impedir la salida de toda persona, por todos los medios.
> En ausencia de señal al día 41: mantener posición. Esperar instrucciones.

Dos señales. Una abre la puerta. La otra la cierra para siempre. Nadie en el cordón sabe cuál va a llegar.

Una pista ([e560](#e560)). Borrá `ORDEN_SELLADA` y anotá `LEISTE_LA_ORDEN`. −1 Ánimo.

- Desde ahora, en la Noche 40 y el día 41, si estás en el Puesto Norte ([e826](#e826)), podés decidir qué hacer con esa orden.
- Si el Destacamento se entera de que la abriste (si se lo decís, o si te reconocen: [e692](#e692)), −1 Reputación.

---

<a id="e822"></a>
### e822 · La carta del cabo
*La orden · ◷ 0*

Un papel doblado, con la letra de imprenta de alguien que escribe con apuro. Firma «Pato». El cabo Pato Giménez, el que estaba al lado tuyo en el Puesto Norte el día 2, el que vio a quién le dieron el sobre y no dijo nada.

«Vos, la del sobre, o el del sobre, no sé cómo te llamás: me cambiaron al tramo 14. Acá todos hablan de la señal. El teniente dice que la va a dar el Comando el día 40 a la noche, cuando llegue la Marea. Dice que es verde. Los pibes dicen que es roja. Yo no sé. Si te enterás de algo, avisame por el canal 6 del handy. Cuidate. P.»

Una pista ([e560](#e560)). Anotá `EL_CABO_GIMENEZ`. +1 Deber: alguien todavía confía en vos.

Si tenés un Handy, una radio militar o `RADIO_POLICIAL`, podés hablar con Pato una vez por semana: te dice dónde está la patrulla del Destacamento (si vas al Perímetro, no tirás [e432](#e432) ese día).

---

<a id="e823"></a>
### e823 · El libro de guardia
*La orden · Comisaría 1.ª · ◷ 0*

El libro de guardia de la Primera, abierto sobre el mostrador. La letra del oficial de servicio, cada vez más desprolija.

«Día 1, 06:10. Llamados múltiples por agresiones. Día 1, 14:00. Orden del Comando: retener en calabozo a detenidos con fiebre. No trasladar. Día 2, 09:00. Orden: entregar listado de detenidos con fiebre al Comando. Día 2, 23:00. Retiran a cuatro detenidos en camión sin identificación. Día 3, 04:00. Orden de abandono de dependencia. Dejar a los detenidos. Repito: dejar a los detenidos.»

Los de las celdas. Los que hacen ruido cuando revisás. Son los que dejaron.

Una pista ([e560](#e560)).

1. **Liberarlos.** Abrís las celdas. Son Callados: **Callados ×1d6 · Cerca**. Los matás o los dejás salir (−1 Deber si los dejás salir a la calle de un barrio con vivos). +1 Ánimo: nadie más va a estar encerrado acá.
2. **Firmar el libro.** Escribís debajo: «Día [el de hoy]. [Tu nombre]. Presente.» +1 Deber.

---

<a id="e824"></a>
### e824 · El puesto que dejaste
*La orden · Puesto de control Norte · ◷ 0*

La garita. Los conos. La fila de autos. El auto clavado en los contenedores, todavía ahí, con el asiento de atrás vacío.

Y en tu lugar, al lado de la barrera, con el chaleco puesto y el fusil colgado, hay alguien. El soldado que disparó, si no fuiste vos ([e004](#e004)). O el teniente, si disparaste vos. Callado. Parado en el puesto. Mirando la ruta.

**Callado ×1 · Lejos**, que no avanza: está de guardia.

1. **Relevarlo.** Le pegás un tiro (+2 Ruido). Cae. Le sacás el fusil (Daño 3, 4 Munición) y la placa. −1 Ánimo. +1 Deber: alguien tenía que relevarlo.
2. **Dejarlo.** Que siga de guardia. Es lo que querían. −1 Deber.
3. **Sentarte.** Te sentás en el cordón, al lado de él, un rato. No hace nada. Mirás la ruta. Recuperás 2 Ánimo.

---

<a id="e825"></a>
### e825 · El sargento
*La orden · Campamento militar · ◷ 0*

Se abre la primera vez que hablás con Ocampo sin que te detengan: en [e690](#e690), en [e692](#e692) con 10+, o en [e463](#e463) con Reputación +2.

Ocampo te sirve mate en un jarro de lata y te mira.

—Yo también tengo el sobre —dice—. Todos los suboficiales lo tienen. ¿Lo abriste?

- **Si tenés `LEISTE_LA_ORDEN`:** «Entonces sabés lo mismo que yo. Que no sabemos nada.» Ocampo se ríe sin ganas. +1 Reputación. Anotá `OCAMPO_DE_TU_LADO`: en la Noche 40 y el día 41, Ocampo hace lo que vos hagas ([e826](#e826)).
- **Si no:** «No lo abras. Mientras esté cerrado, sos alguien con una orden. Cuando lo abras, sos uno más.» Anotá `SOBRE_CERRADO`: mientras lo tengas, en [e826](#e826) tenés +2 en la prueba de abrir la barrera. Si un día lo abrís, borrá `SOBRE_CERRADO` y anotá `LEISTE_LA_ORDEN`.

---

<a id="e826"></a>
### e826 · La señal
*La orden · Puesto de control Norte · ◷ 0*

Solo si tenés `LEISTE_LA_ORDEN`, `OCAMPO_DE_TU_LADO` o `SOBRE_CERRADO`, y si estás en el Puesto Norte el día 41 al amanecer (o si tu final te trae acá).

La radio de la garita cruje. Una voz lee un código. Una palabra. Un color.

No importa cuál. Lo que importa es que los soldados te miran, porque tenés el sobre en la mano, y ellos no saben qué hacer.

1. **Abrir la barrera.** Sea cual sea la señal. «Pasan todos. Los que no tengan fiebre y los que sí. Yo me hago cargo.» `[Labia]` (o `[Puntería]` con *Reglamentaria*, r102). Con 7+, los soldados bajan las armas. +2 Deber. Todos los que estén en la fila pasan: el final cuenta como si tus vivos fueran **salvados**, cualquiera sea el Secreto (salvo la purga: el fuego viene igual, pero ya están afuera). Con 6−, alguien dispara. Tirá 1d6: con 1–2, caés vos.
2. **Cumplir la orden.** La que sea. +1 Reputación con el Destacamento, −2 Deber.
3. **Romper el sobre delante de todos.** Lo rompés en ocho pedazos. «No hay orden.» Los soldados se miran. Algunos se van. +1 Deber. El final sigue como diga el Secreto, pero vos ya no sos parte del cordón: anotá `SIN_ORDEN`.

---

## El pedido · La caja

<a id="e830"></a>
### e830 · El último pedido
*El pedido · ◷ 0*

La caja no vino sola. Vino en una bolsa térmica de reparto, con el logo de la aplicación, y adentro hay otros cuatro paquetes y un remito impreso: la tanda del sábado, cinco entregas que nadie hizo. Si tu fila de r104 es la 1, la tanda es tuya, y en tu celular sin señal quedó congelada la lista, con un botón verde al lado de cada pedido: «Entregado». Si no, el remito tiene el nombre de una repartidora que nunca vas a conocer, y ahora la tanda es tuya igual.

Anotá las cinco en tu hoja:

| # | Pedido | Destino | Entrada |
|---|---|---|---|
| 1 | Remedios de la farmacia | Sra. Peralta, Los Bloques, monoblock C, 8.º B | [e831](#e831) |
| 2 | Un sobre de una escribanía | Hotel Imperio, habitación 304, El Casco | [e831](#e831) |
| 3 | Un muñeco de peluche | Un cumpleaños, Las Lomas | [e831](#e831) |
| 4 | Un repuesto de motor fuera de borda | Club náutico, La Costanera | [e831](#e831) |
| 5 | La caja precintada | Dr. M. Salas, Residencia de investigadores, 4B | [e836](#e836) |

- **Tu contador es la Ruta.** Sube cada vez que cumplís un encargo; baja cada vez que abandonás uno (r198).
- **Los pedidos 1 a 4** van en la bolsa (1 casillero entre todos). El 5 es la caja (`CAJA_PRECINTADA`): 1 casillero, y no se puede desarmar ni cambiar.
- **La caja** tiene su propia historia: el registro de envíos del Correo ([e834](#e834)), el Laboratorio ([e835](#e835)) y su destinatario ([e836](#e836), y quizás [e833](#e833)).

---

<a id="e831"></a>
### e831 · Las entregas
*El pedido · ◷ 0*

Cuando llegás al barrio de un pedido, podés hacer la entrega (◷ 1). Tirá 1d6 y mirá qué pasó con el destinatario:

**1 · La Sra. Peralta (Los Bloques).** 1–2: la puerta está abierta y la señora Peralta está sentada en su sillón, muerta hace semanas, con la tele apagada. Dejás los remedios en la mesa. 3–6: la señora Peralta te abre con un cuchillo en la mano. Cuando ve la bolsa de la farmacia, se pone a llorar. Te da 2 Víveres y te dice que su sobrino es Pocho, el cerrajero (si lo buscás, viene sin prueba: [e612](#e612)).

**2 · Habitación 304 (El Casco).** El Hotel Imperio ([e206](#e206)). 1–3: la habitación está vacía y revuelta. En el baño, un hombre de traje, Callado, sentado en el inodoro. **Callado ×1 · Cerca**. El sobre de la escribanía dice «Testamento». 4–6: el hombre está vivo, flaco, encerrado. Firma el remito con letra temblorosa. Te da su reloj de oro (vale 3 en un cambio, r166). «Llegó tarde. Pero llegó.»

**3 · El cumpleaños (Las Lomas).** Una casa con globos desinflados en la puerta y un cartel: «FELICES 6, BENJA». 1–3: la casa está vacía. Dejás el peluche en la puerta. 4–6: hay una familia adentro, con un nene de seis años que no festejó su cumpleaños. Cuando le das el peluche, el nene te abraza. Los padres te dan 3 Víveres y te dejan dormir una noche (r158).

**4 · El repuesto (La Costanera).** En el club náutico ([e382](#e382)). 1–3: no hay nadie. Pero con el repuesto, hacer andar la lancha tiene +2. 4–6: hay un viejo marinero cuidando su lancha. Se llama Cacho Barrios y no se fue nunca del club. Con el repuesto, la lancha anda: te la presta para una salida del Éxodo ([e960](#e960)), o te lleva al Puerto ida y vuelta cuando quieras.

**Cada entrega hecha:** tachás el pedido en el remito (o apretás el botón verde, aunque no haya señal). +1 Ruta. Si el destinatario estaba vivo, +1 Ánimo.

**Abandonar un pedido:** si perdés la mochila, o si decidís tirarlo, −1 Ruta.

---

<a id="e832"></a>
### e832 · La carta de Mabel
*El pedido · ◷ 0*

Un papel con el logo de la aplicación de reparto, impreso, y debajo, con birome, la letra de Mabel, la de la central de despacho, la que les decía «mi vida» a todos por el handy. Si no trabajabas en la aplicación, Mabel sacó tu dirección del remito: alguien le contó que la caja la tenías vos.

«¿Te acordás del pedido del sábado del Laboratorio? Me llamaron del Comando preguntando por vos. Por tu nombre. Querían saber si la caja se entregó. Les dije que sí, que se entregó, que no sabía más. No sé si hice bien. No la abras. O sí. No sé. Cuidate, mi vida. M.»

Te buscan. Por la caja.

Una pista ([e560](#e560)). Anotá `TE_BUSCAN_POR_LA_CAJA`. Desde ahora, el Destacamento, si te reconoce (si vas al campamento, o si sale [e691](#e691)), pregunta por la caja: si la entregás, +3 Reputación y −2 Ruta.

---

<a id="e833"></a>
### e833 · El destinatario
*El pedido · Morgue · Heladera 14 · ◷ 0*

La credencial lo dice: «Dr. M. Salas · Comando de Emergencia · Asesor sanitario». El destinatario de tu caja estuvo encerrado en una heladera de la morgue durante un mes, convertido, golpeando la puerta despacio.

Alguien lo encerró. Alguien sabía quién era.

1. **Entregársela.** Le apoyás la caja en el pecho. Apretás el botón verde. Es lo más absurdo que hiciste en tu vida, y lo más honesto. Se cumple el pedido: +1 Ruta. La caja ya no es tuya: si la querés de nuevo, la agarrás (sigue siendo la caja, pero el pedido está entregado).
2. **No entregársela.** Ya no es el destinatario. El pedido sigue pendiente, pero ¿para quién? → la caja tiene otros destinos posibles ([e838](#e838)).

---

<a id="e834"></a>
### e834 · El registro de envíos
*El pedido · Correo Central · ◷ 1*

El registro del sábado −2, en la computadora del despacho de mensajería, que arranca con la UPS. El nombre del que la retiró (el tuyo, si tu fila es la 1). La bici. El pedido.

«Remitente: Laboratorio de Virología · Dra. E. Ríos. Destinatario: Dr. M. Salas · Comando. Contenido declarado: muestras biológicas · Sujeto 0 · cadena de frío. Observaciones: entregar en mano. No dejar en portería. No abrir. Urgente.»

Sujeto 0.

Una pista ([e560](#e560)). Anotá `SUJETO_CERO`.

Si tenés a la doctora Ríos en el grupo, sabe. Te mira. «Lo mandé yo», dice.

---

<a id="e835"></a>
### e835 · De vuelta al origen
*El pedido · Laboratorio de Virología · ◷ 0*

La entrada donde alguien retiró la caja hace un mes. El mostrador de la recepción, con el libro de visitas abierto en el sábado. La firma del repartidor (la tuya, si tu fila es la 1). La hora: 16:40. Y la firma de la persona que te la dio: «E. Ríos».

En la pared, detrás del mostrador, hay un póster del Laboratorio: «Programa L-40 · Hacia una inmunidad de amplio espectro». La foto de un equipo de investigadores sonriendo, de guardapolvo, con la doctora Ríos en el medio.

1. **Buscar a la doctora.** Está en su oficina ([e648](#e648)), si no la conocés. Cuando ve la caja, se le cae la pistola. «La tenés vos. Todo este tiempo, la tenías vos.» Con la doctora, `[Labia]` sin Desventaja.
2. **Devolver la caja.** La dejás en el mostrador. «Devolución.» Es un pedido cancelado, no abandonado: la Ruta no baja. Pero ya no la tenés. Si tenés `TE_BUSCAN_POR_LA_CAJA`, borrala.

---

<a id="e836"></a>
### e836 · El 4B
*El pedido · Residencia de investigadores · ◷ 0*

El departamento de Salas. La dirección exacta del pedido. Llegaste con un mes de atraso.

Alguien revolvió todo buscando algo. Buscaba la caja. Buscaba lo que vos tenés.

Sobre el escritorio, debajo de una pila de papeles tirados, hay una agenda con una anotación en el sábado −2: «Recibir muestra S-0. Llevar personalmente al Comando, Puerto Norte, lunes 07:00. Si no llega, abortar. Si se pierde, NADIE puede saberlo».

Se perdió. La tenías vos. Y todos supieron.

Una pista ([e560](#e560)). +1 Ruta: llegaste. Tarde, pero llegaste.

→ Ahora sabés todo lo que hay que saber de la caja menos lo que tiene adentro: [e837](#e837).

---

<a id="e837"></a>
### e837 · Abrir la caja
*El pedido · ◷ 0*

El precinto rojo. Si tenés `OFICIO_REPARTO`, nunca abriste un pedido, ni uno, en dos años. Si no, igual: no es tuya.

1. **Abrirla.** Cortás el precinto. Adentro, en hielo seco que ya no es hielo, seis tubos de sangre, con tapa violeta y una etiqueta: «S-0 · Sangre entera · NO CONGELAR». Y un sobre: un informe de dos páginas con gráficos que no entendés, y una línea subrayada: «El sujeto 0 no presenta conversión a los 40 días de exposición. Ver anexo». No hay anexo. −1 Ruta (abriste un pedido). Dos pistas ([e560](#e560)). Borrá `CAJA_PRECINTADA` y anotá `LA_CAJA_ABIERTA`.
2. **No abrirla.** No es tuya. Nunca fue tuya. La Ruta sigue igual. → [e838](#e838) cuando quieras.

Si tenés a Mateo o a la doctora Ríos, saben qué hacer con seis tubos de sangre: si tu Secreto resulta ser el 6, la sangre del S-0 cuenta como la del inmune para hacer suero ([e586](#e586)), sin que haga falta el inmune.

---

<a id="e838"></a>
### e838 · A quién entregarla
*El pedido · ◷ 0*

La caja sigue siendo un pedido. Un pedido sin destinatario. Vos decidís a quién se le entrega.

1. **Al Destacamento.** En el campamento ([e690](#e690)), a Ocampo. «Comando de Emergencia. Era para ustedes.» +3 Reputación. Ocampo la mira sin entender y la manda en un jeep al Puerto Norte. −1 Ruta: no era el destinatario.
2. **A la doctora Ríos.** Si está con vos. Es suya. La remitente. Ella decide: «Que no la tenga nadie». La destruye en el fuego. +1 Ruta (devolución al remitente). Si tu Secreto resulta ser el 3, el ensayo pierde su prueba principal: en [e583](#e583), `EL_MUNDO_SABE` necesita además los papeles del informe (`LA_CAJA_ABIERTA`).
3. **A la ciudad.** La llevás a la Radio Universitaria ([e375](#e375)) y leés al aire lo que dice el informe (necesitás `LA_CAJA_ABIERTA`). +2 Ruta: se lo entregaste a todos. Una pista ([e560](#e560)). Anotá `LA_VERDAD_AL_AIRE`.
4. **A nadie.** Te la quedás. Es tu último pedido, y el último pedido no se entrega nunca. La Ruta sigue igual. En tu epílogo, la caja sigue en tu mochila.

---

## El que falta · La búsqueda

<a id="e840"></a>
### e840 · El que falta
*El que falta · ◷ 0*

El último mensaje sigue en la pantalla: «Ya salgo. Está todo muy raro. Te quiero». Lo leíste tantas veces que ya no lo ves. Ves la hora: 23:31. Ves que dice «ya salgo», y que no llegó.

Armá ahora a la persona que buscás. Todo lo que anotes acá es verdad en esta partida.

**1 · Quién es.** Elegí, o tirá 1d6. Ponele un nombre (el que quieras, o uno de la tabla de r100) y anotá `EL_QUE_FALTA` y el nombre al lado.

| 1d6 | Quién | Si lo encontrás vivo… |
|---|---|---|
| 1 | **Tu hijo o tu hija.** Tenía que volver del club, del trabajo, de lo de un amigo | +2 Moral cuando llega. Pero mientras lo buscás, cada vez que la Esperanza baja, también perdés 1 Ánimo |
| 2 | **Tu pareja.** Turno noche, o una cena con gente del trabajo | Llega con Leal y una Habilidad en 2: la que menos tenga el grupo |
| 3 | **Tu hermano o tu hermana.** Siempre se metía donde no debía | Sabe algo que vos no: una pista ([e560](#e560)) |
| 4 | **Tu madre o tu padre.** Fue a la guardia porque se sentía raro, o a cuidar a una vecina | Con él o ella en el puesto Cocina, el grupo come 1 Víver menos más. Necesita 1 Fármaco por semana |
| 5 | **Tu mejor amigo o amiga.** Te conoce mejor que nadie | Una vez por partida, si caés Muriendo (r190) y está con vos, te saca |
| 6 | **Alguien a quien le debés la vida.** No es tu familia. Hace años te sacó de algo, y nunca le pagaste | Llega con Pelea 3 o Calle 3 (elegí). +1 a tu contador cuando llega |

**2 · Dónde estaba esa noche.** Tirá 1d6 dos veces en la tabla de barrios de r103. Si sale tu barrio, tirá otra vez. Anotá ese barrio en tu hoja: es el **último lugar**. Marcalo en el mapa con un círculo.

**3 · Qué hacía ahí.** Tirá 1d6: **1** trabajaba; **2** estaba en una fiesta; **3** estaba en la guardia de un hospital, porque se sentía mal (−1 en [e845](#e845)); **4** visitaba a alguien; **5** volvía en colectivo; **6** no sabés: no te lo dijo, y eso también es una pista.

**Las señales.** En la hoja tenés seis casillas de **Señales**. Cada señal es algo que dejó, algo que alguien vio, algo que te dice que pasó por acá. Con **3 señales**, sabés dónde está ([e845](#e845)). Se consiguen así:

- **El rastro** ([e841](#e841)): yendo al último lugar, y después a donde te mande cada señal.
- **Su nombre en las paredes** ([e842](#e842)): pintándolo en tus marcas de búsqueda.
- **La carta** ([e843](#e843)): cuando la ciudad te la manda.
- **Alguien que lo vio** ([e844](#e844)): preguntándole a cada sobreviviente nuevo.

**Tu contador es la Esperanza.** Empieza en 2. Sube 1 con cada señal. **Baja 1** cada vez que sube la Etapa (r135) si en la Etapa que termina no encontraste ninguna señal. Cuanto más esperás, más cuesta creer.

**Lo que vas a tener que decidir.** Cuando tengas 3 señales, vas a saber dónde está. Pero lo que le pasó se decide recién cuando llegás, y cuanto más tarde llegues, peor. Cada día que gastás en el refugio es un día que no gastás buscando, y al revés.

Volvé a [e006](#e006).

---

<a id="e841"></a>
### e841 · El rastro
*El que falta · ◷ 1*

Se abre cada vez que estás en el **último lugar** (o en el barrio al que te mandó la señal anterior) y gastás ◷ 1 en buscar: preguntás en las puertas, mirás las paredes, revisás las paradas, entrás a los zaguanes. Se puede buscar una vez por día en cada barrio.

Tirá 1d6:

| 1d6 | Lo que encontrás |
|---|---|
| 1 | **Su campera**, colgada de una reja, con algo de sangre en la manga. No mucha. |
| 2 | **Una flecha de tiza** en la vereda, con sus iniciales, como las que hacían de chicos para no perderse. |
| 3 | **Un vecino detrás de una persiana**, que no abre, pero que lo vio pasar: «Iba con otros dos. Hacia allá». |
| 4 | **Su celular**, sin batería, en el piso de un colectivo vacío. Lo cargás en tu cabeza: sabés qué te iba a escribir. |
| 5 | **Una marca de búsqueda** pintada con su letra, con un día y una palabra: «Sigo». |
| 6 | **Nada, y algo.** Un Callado con su misma remera de la misma marca. No es. Por un segundo, era. **Callados ×1d3 · Cerca**: si ganás o escapás, entre los cuerpos hay un papel con una dirección escrita. |

**Anotá 1 señal.** +1 Esperanza.

**Hacia dónde sigue.** Si todavía no tenés 3 señales, la señal te apunta a otro barrio: tirá 1d6 dos veces en la tabla de r103. Anotalo en la hoja y en el mapa: es el **próximo lugar**. Si sale el mismo barrio, el rastro sigue acá: podés volver a buscar mañana.

**Con 3 señales**, ya sabés dónde está: es este barrio. Andá a [e845](#e845) cuando decidas ir a buscarlo (se puede hoy mismo, si te quedan ◷ 2).

---

<a id="e842"></a>
### e842 · Su nombre en las paredes
*El que falta · ◷ 0*

En Tolme todos pintan marcas de búsqueda en las puertas (r163). Vos, además, escribís un nombre abajo. Con letras grandes, para que se lea de lejos: el nombre, y debajo, el de tu refugio.

- **Cada vez que pintás una marca de búsqueda**, podés agregarle el nombre. Anotá en la hoja un palito por cada nombre pintado en la Etapa.
- **Al alba en que sube la Etapa**, tirá 1d6 por cada palito de la Etapa que terminó (como mucho cuatro dados). Por cada **6**, alguien escribió algo debajo: «Lo vi en el Puerto», «Está vivo», «Dejá de buscar». Anotá 1 señal por cada 6. Después borrá los palitos.
- **Cada nombre en las paredes se lee de lejos**, también por quien no tenía que leerlo: si pintaste tres o más nombres en la Etapa, +1 Rastro al alba en que sube la Etapa. Te encuentran a vos también.

Desde una radio (la Radio Universitaria, [e375](#e375), o la instalación Radio), también podés decir su nombre al aire, una vez por Etapa: +2 Rastro, y tirá 1d6: con 5–6, alguien te contesta → [e844](#e844).

---

<a id="e843"></a>
### e843 · La carta
*El que falta · ◷ 0*

Pegada en la puerta del refugio, una hoja doblada en cuatro. Tiene tu nombre afuera, escrito por alguien que lo sabía de memoria.

Tirá 1d6:

- **1–2 · Su letra.** «Estoy vivo. No vengas, está lleno. Te quiero.» No dice dónde, pero el papel huele a río, o a hospital, o a gasoil: el próximo lugar es el barrio de r103 que tenga eso (elegí cuál). +1 señal, +1 Esperanza más.
- **3–4 · Alguien que lo cuida.** «Tu [hermano, hija, amigo] está con nosotros. Necesitamos Fármacos.» Dejá 1 Fármaco atado a la reja esta noche: si lo hacés, +1 señal. Si no tenés, la carta sigue en la mesa, sin señal, mirándote.
- **5 · Una lista.** La fotocopia de una planilla del hospital de campaña, con una columna de nombres y una de números. Uno de los nombres es el suyo. Al lado, un número de cama y la palabra «derivado». +1 señal, y el próximo lugar es **El Perímetro**.
- **6 · Su foto.** Sin nada escrito. Del otro lado, alguien dibujó un mapa de tres calles y una cruz. +1 señal: el próximo lugar es el barrio que elijas, y ahí, en lugar de tirar en [e841](#e841), la señal es la 5.

---

<a id="e844"></a>
### e844 · Alguien que lo vio
*El que falta · ◷ 0*

Cada vez que un sobreviviente nuevo llega al grupo, le mostrás la foto, o le decís el nombre, o lo describís con las manos: así de alto, así el pelo, esa campera. Tirá 1d6. Con **5–6**, lo vio.

—Sí. Me acuerdo por la campera. Estaba con otros, buscando agua. Uno tenía una moto.

**Anotá 1 señal.** +1 Esperanza. El sobreviviente te dice dónde lo vio: el **próximo lugar** es el barrio donde encontraste a ese sobreviviente.

Si el sobreviviente es tu conocido del barrio (r103), no tirés: lo vio. Te conoce a vos, y lo conoce a él.

---

<a id="e845"></a>
### e845 · Donde está
*El que falta · ◷ 2*

Tenés 3 señales. Sabés dónde está: en este barrio, en un lugar que ahora reconocés por todo lo que juntaste. Ir hasta ahí cuesta ◷ 2. Lo que encontrás depende de cuánto tardaste.

**Tirá 1d6** y buscá la fila en la columna de la **Etapa** en la que estás:

- **−1** si esa noche estaba en la guardia de un hospital (e840).
- **+1** si tu Esperanza es 4 o más: buscar con ganas también es mirar mejor.
- Después, **por cada señal que tengas por encima de 3**, podés mover el resultado una fila hacia arriba o hacia abajo. Un resultado menor que 1 es 1; uno mayor que 6 es 6.

| 1d6 | Etapa I o II | Etapa III | Etapa IV |
|---|---|---|---|
| 1 | Atrapado | Mordido | Convertido |
| 2 | Con una facción | Atrapado | Convertido |
| 3 | Vivo y solo | Con una facción | Mordido |
| 4 | Del otro lado | Vivo y solo | Atrapado |
| 5 | Vivo y con gente | Del otro lado | Con una facción |
| 6 | Te estaba buscando | Vivo y con gente | Del otro lado |

- **Convertido** → [e846](#e846).
- **Mordido** → [e847](#e847).
- **Todo lo demás** → [e848](#e848), en el apartado que te tocó.

Pase lo que pase, ya no hay más señales que buscar. Borrá las casillas que te sobren.

---

<a id="e846"></a>
### e846 · Convertido
*El que falta · ◷ 0*

Lo reconocés de espaldas, antes de que se dé vuelta. Por cómo apoya un pie. Por la campera. Está parado frente a una ventana, de cara al vidrio, como los Callados se quedan cuando no hay nada que seguir.

Se da vuelta. Tiene los ojos blancos. Te mira, y no te mira.

1. **Terminarlo vos.** Nadie más tiene derecho. **Callado ×1 · Cerca**, que no se defiende: con cualquier prueba de Pelea o Puntería, cae. −2 Ánimo. Te sentás al lado un rato largo. Anotá `LO_DESPEDISTE`. La Esperanza no baja: lo encontraste.
2. **Encerrarlo.** Cerrás la puerta, trabás la manija con un cable, escribís su nombre en la madera. ◷ 1. −1 Ánimo, −1 Esperanza. Anotá `LO_DEJASTE_ADENTRO`: en la Noche 40, si tu refugio queda en este barrio, en la tercera oleada alguien golpea la puerta del Último Cuarto con la palma abierta, despacio, tres veces, como golpeaba siempre. No hace daño. Solo golpea.
3. **Irte.** No podés. Hoy no. Volvés al refugio sin decir nada. −2 Esperanza. Podés volver otro día por la opción 1 o la 2.

Esa noche, el grupo sabe sin que se lo digas. Alguien te deja un plato de comida al lado del colchón. Recuperás 1 Ánimo.

---

<a id="e847"></a>
### e847 · Mordido
*El que falta · ◷ 0*

Está vivo. Está en un cuarto con la puerta trabada, sentado en un colchón, con una venda en el antebrazo, o en la pierna, o en el cuello. Te ve y llora, y después se ríe, y después te dice que no te acerques.

Tiene **Fiebre 2** (tirá dónde fue la mordida, r192). Es un sobreviviente: su Habilidad fuerte es la de su fila de [e840](#e840) (si no tiene, Físico 2) y su rasgo, Leal.

1. **Llevártelo.** Al refugio, con la Fiebre corriendo. Desde ahora es una carrera: Antivirales, una amputación si se puede (r192), lo que diga el Secreto. Si llega al día 41 sin convertirse, +2 Esperanza. Si se convierte, −2 Ánimo y −2 Moral, y anotá `LO_DESPEDISTE`.
2. **Quedarte con él esta noche.** Pasás la noche afuera (r158), en ese cuarto, sin dormir. A la mañana, decide él: con 1–3 en 1d6, te pide que lo termines vos (como [e846](#e846), opción 1, pero con +1 Esperanza: se fue sabiendo que lo buscaste); con 4–6, se viene con vos (opción 1).
3. **Amputar acá**, si la mordida fue en un brazo o una pierna. Necesitás todo lo de r192, ahora. Si sale bien, viene con vos sin Fiebre y +1 Esperanza.

---

<a id="e848"></a>
### e848 · Vivo
*El que falta · ◷ 0*

Buscá tu apartado.

**Te estaba buscando.** Lo encontrás en la escalera de un edificio, con una mochila cargada y una lista de barrios tachados. El tuyo era el próximo. Se abrazan en el medio de la calle, sin cuidarse de nada. Viene con vos con lo que dice su fila de [e840](#e840), y con 4 Víveres. +2 Esperanza, +1 Moral cuando llega.

**Vivo y con gente.** Está en un local con otros cuatro, atrincherados detrás de una persiana. Te ve por la rendija y grita tu nombre. Viene con vos, como dice su fila de [e840](#e840). Los demás también quieren venir: tirá 1d3; son sobrevivientes de la tabla de r180, o, si no tenés lugar, se quedan y te dan 1d6 materiales al azar (r165). +1 Esperanza.

**Vivo y solo.** Flaco, con la barba crecida o el pelo cortado con un cuchillo, escondido en un placard, en un tanque de agua, en un baño. Tarda en creer que sos vos. Viene con vos, pero no hace puestos durante 3 noches, y después es como dice su fila de [e840](#e840). +1 Esperanza.

**Del otro lado.** No está. En la pared del lugar, con su letra: «Me sacaron. Lancha. Muelle tres. Día 6. Estoy bien. Seguí». Está afuera, vivo, del lado de los que esperan. No viene, pero ahora sabés que hay alguien esperándote del otro lado del muro. +2 Esperanza. Anotá `TE_ESPERA_AFUERA`: el día 41, si estás entre los salvados, +1 a tu contador antes del epílogo.

**Con una facción.** Está con los Lobos, o con la Parroquia, o con los Bomberos, o en el campamento del Destacamento: la facción cuyo barrio esté más cerca de acá. Está bien, comiendo, con un trabajo. Para que venga con vos, `[Labia]` con esa facción: con Reputación +1 o más, sin prueba; con 10+, viene; con 7–9, viene, y la facción te cobra 3 Víveres o 3 materiales; con 6−, no lo dejan, y −1 Reputación. Podés volver a intentar otro día. Si al final no viene, igual sabés que está bien: +1 Esperanza.

**Atrapado.** Está vivo, en el último piso de un edificio rodeado. Lo ves en la ventana, saludando con una remera. Para sacarlo, combate en la escalera: **Callados ×2d6 · Lejos**, escena Pasillo (r331), o una ruta por las Azoteas con Soga y `[Físico]` (con 6−, 1 Herida y lo intentás de nuevo con ◷ 1 más). Si llegás, viene con vos, con lo que dice su fila de [e840](#e840). +1 Esperanza. Si no llegás hoy, sigue ahí mañana; pasado mañana, tirá en [e845](#e845) otra vez, con la columna de la Etapa en la que estés.

---

## Lo que hiciste · La cuenta

<a id="e850"></a>
### e850 · Lo que hiciste
*Lo que hiciste · ◷ 0*

Nadie te vio. Eso te dijiste. Pero en esta ciudad siempre hay alguien detrás de una persiana.

Elegí qué hiciste, o tirá 1d6. Cada cosa tiene un **lugar** donde quedó, una **persona** que lo sabe y una **Marca**. Anotá `LO_QUE_HICISTE` y la Marca de la fila.

| 1d6 | Qué hiciste | El lugar | Quién lo sabe |
|---|---|---|---|
| 1 | **Cerraste la puerta.** Alguien golpeaba la puerta de tu edificio pidiendo entrar, con una nena en brazos. Le pusiste la traba. `HICISTE_LA_PUERTA` | La entrada de tu edificio, en tu barrio | Tu conocido del barrio (r103) |
| 2 | **Abriste el aislamiento.** En la guardia del Central había un cuarto con candado y gente golpeando adentro. Creíste que eran enfermos. Les abriste. `HICISTE_LA_GUARDIA` | La guardia del Hospital Central ([e221](#e221)) | Rita, la veterinaria ([e615](#e615)) |
| 3 | **Vendiste una ampolla.** Una ampolla de L-40 que encontraste en un bolso, como si fuera la vacuna. A un padre desesperado, por todo lo que tenía. `HICISTE_LA_AMPOLLA` | El estacionamiento del Hipermercado, en El Mercado | El Chino Morales ([e606](#e606)) |
| 4 | **Lo señalaste.** En el control del Destacamento, dijiste que tu vecino tenía fiebre, para que no te miraran a vos. Se lo llevaron. `HICISTE_LA_DENUNCIA` | El hospital de campaña ([e423](#e423)) | Iván, el conscripto ([e630](#e630)) |
| 5 | **Te llevaste el último lugar.** En la lancha del día 1, empujaste a alguien para subir. La lancha nunca salió del muelle, y él se quedó en el agua. `HICISTE_EL_LUGAR` | El muelle tres, en El Puerto | La Tana, la carnicera ([e621](#e621)) |
| 6 | **Saliste corriendo.** En tu trabajo, alguien quedó atrapado y gritó tu nombre. Corriste. `HICISTE_EL_ABANDONO` | Un lugar de tu oficio, el que elijas, en cualquier barrio | Esa misma persona: está viva (abajo) |

**Si es la 6:** el próximo sobreviviente que llegue de la tabla de r180 es esa persona. Leé su entrada como siempre, pero antes, [e852](#e852). Anotá su nombre en tu hoja cuando llegue.

**Tu contador es la Culpa.** Empieza en **4** y va al revés que los demás: tu meta es llegar a **0** ([e858](#e858)).

- **Baja 1** cuando arriesgás algo tuyo (tu vida, tu comida, tu lugar) por alguien que no te lo puede devolver: abrirle a un desconocido, quedarte en la brecha para que otro llegue al Último Cuarto, curar con tu último Fármaco a alguien que no es del grupo. Y cuando cumplís lo que dicen e851 a e857.
- **Sube 1** cuando repetís lo que hiciste: dejar a alguien atrás, cerrar una puerta con alguien del otro lado, mentir para salvarte.
- **Con Culpa 6**, la noche siguiente → [e856](#e856).

**Lo que hace la Culpa mientras la tenés.** Con Culpa 4 o más, cada vez que tenés un Quiebre (r194), leé también [e856](#e856). Con Culpa 2 o menos, dormís: el puesto Descanso te recupera 1 Ánimo más.

Volvé a [e007](#e007).

---

<a id="e851"></a>
### e851 · El lugar
*Lo que hiciste · ◷ 1*

Se abre la primera vez que vas al lugar de tu fila (e850). Gastás ◷ 1 en quedarte. Leé tu apartado.

**La puerta** (`HICISTE_LA_PUERTA`). La traba sigue puesta, del lado de adentro. Del lado de afuera, en el escalón, un chupete y un zapatito rosa. En la vereda, nada: alguien se los llevó, o se fueron. Podés **quitar la traba** y dejar la puerta abierta, con un cartel: «ENTREN. ARRIBA HAY LUGAR». Los que entren, entren. −1 Culpa. +1 Rastro: alguien va a leer el cartel, y no siempre alguien bueno.

**El aislamiento** (`HICISTE_LA_GUARDIA`). La puerta del cuarto, abierta, como la dejaste. Adentro, las camas con correas. En la pared, una planilla: «AISLAMIENTO · CONVERSIÓN CONFIRMADA · NO ABRIR». Te tiembla la mano. En el pasillo, **Callados ×1d6 · Cerca**, los mismos, con la pulsera del hospital: si los terminás a todos, −1 Culpa. Una pista ([e560](#e560)): la planilla tiene la firma de Salas.

**La ampolla** (`HICISTE_LA_AMPOLLA`). El Fiat gris sigue estacionado en el mismo lugar, con las puertas cerradas. Adentro, en el asiento de atrás, algo se mueve. En el de adelante, un hombre muerto con una jeringa en la mano. Podés **abrir la puerta de atrás** (**Callado ×1 · Encima**: es chico, Aguante 1) y terminar con lo que hiciste. −1 Culpa, −2 Ánimo. O **dejar el auto cerrado** y escribir en el vidrio, con el dedo, una palabra. −1 Ánimo.

**La denuncia** (`HICISTE_LA_DENUNCIA`). En el fichero del triaje, la ficha de tu vecino: «Sin fiebre al ingreso. Derivado a sector B». No tenía fiebre. Si buscás el sector B (como en [e807](#e807), opción 1, con las mismas pruebas), lo encontrás vivo, en un catre. Te mira. Si te lo llevás, −2 Culpa y −2 Reputación con el Destacamento. Si no, por lo menos sabés: −1 Culpa.

**El último lugar** (`HICISTE_EL_LUGAR`). El muelle tres. La lancha sigue amarrada, medio hundida. En el agua, cerca de los pilotes, flotan cosas. Podés **bajar a buscar** `[Físico]` (con 6−, un Ahogado: [e728](#e728), **Ahogado ×1 · Encima**). Con 7+, encontrás su billetera, con una foto y un documento. Ahora tiene nombre. −1 Culpa. Anotá su nombre en tu hoja.

**El abandono** (`HICISTE_EL_ABANDONO`). El lugar donde trabajabas. La puerta por donde saliste. Adentro, en el piso, la marca de algo pesado que alguien corrió solo, desde adentro, durante horas. Lo hizo. Salió solo. −1 Culpa, y una herramienta de tu oficio tirada en el piso: es tuya (la de r106 que no elegiste).

---

<a id="e852"></a>
### e852 · Quien lo sabe
*Lo que hiciste · ◷ 0*

Se abre cuando encontrás a la persona de tu fila (e850), antes de leer lo que hace falta para que venga.

Te mira un segundo de más. Después mira para otro lado. Lo sabe.

—Yo estaba ahí —dice, sin levantar la voz—. Te vi.

1. **Decir la verdad.** `[Labia]`. Con 10+, te escucha hasta el final. «No te perdono. Pero vamos.» Viene sin prueba. −1 Culpa. Con 7–9, viene, pero no te habla por una semana: no ayuda en tus pruebas (r122) hasta que pasen 7 cartas. −1 Culpa. Con 6−, no viene, y se lo cuenta a quien quiera escuchar: −1 Moral la próxima vez que alguien del grupo lo cruce. La Culpa no se mueve.
2. **Negarlo.** «Te confundís.» Hacé la prueba normal para que venga. Si viene, anotá `LO_NEGASTE`: tarde o temprano → [e855](#e855). +1 Culpa.
3. **Ofrecerle algo.** Lo que tenga valor: 3 Víveres, 3 materiales, un arma. Lo agarra. Viene. No dice nada. La Culpa no se mueve, y te pesa más: −1 Ánimo.

Si es la persona que dejaste atrás (fila 6), no hay opción 3. Te mira las manos, como si buscara algo en ellas.

---

<a id="e853"></a>
### e853 · La carta
*Lo que hiciste · ◷ 0*

Pegada en la puerta del refugio, una hoja doblada en cuatro. Una sola línea, con letra de imprenta:

> «SÉ LO QUE HICISTE.»

Tirá 1d6:

- **1–2 · No dice más.** Nadie del grupo la vio. Podés quemarla (+1 Culpa: ya sabés cómo se esconden las cosas) o guardarla.
- **3–4 · Dice más.** Al dorso: «Él también sabía. Preguntale a la persona que lo sabe por qué no dijo nada.» La próxima vez que estés con la persona de tu fila (e850), podés preguntarle: si ya está en el grupo, ◷ 0, `[Labia]`: con 7+, te cuenta que esa noche hizo algo parecido. −1 Culpa: no sos el único.
- **5–6 · La leyó alguien del grupo.** Antes que vos. La deja sobre la mesa, abierta, a la hora de comer. Andá a [e854](#e854) ahora, sin elegir el momento.

---

<a id="e854"></a>
### e854 · Contarlo
*Lo que hiciste · Tu refugio · ◷ 1*

Una vez por partida, una noche, en el refugio, podés contarle al grupo lo que hiciste. Antes de comer, o después, cuando nadie tiene ganas de hablar.

`[Labia]` (+1 si alguien del grupo ya lo sabía y está de tu lado):

- **10+:** te escuchan. Nadie dice nada por un rato largo. Después, alguien cuenta lo suyo. Y otro. Esa noche, todos dicen algo que no habían dicho. +1 Moral. −2 Culpa.
- **7–9:** te escuchan, y algunos se levantan y se van a dormir sin mirarte. −1 Moral. −1 Culpa. Al alba, uno de ellos te deja el mate preparado al lado del colchón.
- **6−:** alguien te grita. Alguien se va del refugio esa noche: el sobreviviente con menos cartas en el grupo se va (`PERDIDO_` y su nombre). −1 Culpa igual: ya está dicho.

Si lo contás, borrá `LO_NEGASTE`, si la tenías.

---

<a id="e855"></a>
### e855 · Te lo echan en cara
*Lo que hiciste · Tu refugio · ◷ 0*

Si tenés `LO_NEGASTE`, la próxima vez que la Moral baje a 3 o menos, esa noche, en la discusión, la persona que lo sabe se para y lo dice. Delante de todos. Con detalles que no sabías que había visto.

1. **Admitirlo ahora.** Como [e854](#e854), con Desventaja. Borrá `LO_NEGASTE`.
2. **Volver a negarlo.** `[Labia]` contra todos. Con 10+, te creen a vos: la persona que lo sabe se va del refugio, sola, esa noche. +2 Culpa. Con 7–9 o menos, no te cree nadie: −2 Moral, +1 Culpa, y desde ahora tus pruebas para hablar con el grupo (r183) tienen −1 hasta que lo admitas.

---

<a id="e856"></a>
### e856 · De noche
*Lo que hiciste · ◷ 0*

Se abre cuando la Culpa llega a 6, o cuando tenés un Quiebre (r194) con Culpa 4 o más.

Te despertás en el piso, al lado de la puerta, con la mano en la traba. No sabés cuánto hace que estás ahí. En la oscuridad, del otro lado, alguien respira. Siempre es la misma respiración.

Tirá 1d6:

- **1–2 · Abrís.** No hay nadie. Hay viento, y la calle, y la puerta abierta del refugio: −1 a la Resistencia de la Puerta, y +1 Rastro. Volvés a cerrar, temblando.
- **3–4 · No dormís.** Toda la noche sentado en la escalera. Mañana no hacés puestos y tenés Desventaja en Labia todo el día.
- **5–6 · Alguien se despierta.** Te ve. Se sienta al lado tuyo sin preguntar nada, hasta que amanece. −1 Culpa.

Si llegaste acá por la Culpa en 6, al alba tu Culpa baja a 5: hasta la culpa se cansa.

---

<a id="e857"></a>
### e857 · Otra vez
*Lo que hiciste · ◷ 0*

Se abre al alba del primer día de la **Etapa III** (r135). La ciudad te pone en el mismo lugar, para ver qué hacés. Leé tu apartado. Pasa ese mismo día, cuando salgas del refugio (o en el refugio, si no salís).

**La puerta.** Golpean la puerta del refugio. Una mujer con un chico en brazos. El chico tiene un arañazo en la mano, chiquito, de hace una hora. Si abrís, entran los dos (2 sobrevivientes comunes, el chico con Fiebre por arañazo: r191). −2 Culpa. Si no abrís, +2 Culpa.

**El aislamiento.** Alguien del grupo encuentra un cuarto cerrado en un lugar que revisás, con gente golpeando adentro. No sabés si están vivos. Si abrís con cuidado (`[Sigilo]`; con 6−, son Callados ×1d6 Encima), adentro hay tres vivos: −2 Culpa. Si no abrís, ni mirás, +1 Culpa.

**La ampolla.** Un hombre te ofrece todo lo que tiene (6 Víveres y un arma) por una cura. Te mira como mirabas vos. Si le decís la verdad, que no hay cura, −2 Culpa. Si le vendés cualquier cosa, te quedás con todo y +2 Culpa.

**La denuncia.** El Destacamento hace un censo en tu cuadra ([e691](#e691)) y pregunta si alguien del grupo tiene fiebre. Alguien la tiene, y vos lo sabés. Si lo escondés (opción 3 de [e691](#e691), con `[Sigilo]`), −2 Culpa. Si lo señalás, +2 Culpa.

**El último lugar.** En el refugio, hay que elegir quién sale a la próxima salida peligrosa, la que nadie quiere hacer. Si vas vos, sin compañeros, hoy, −2 Culpa. Si mandás a otro, +1 Culpa.

**El abandono.** En la salida de hoy, un compañero cae Muriendo, o queda atrapado, o se le traba la pierna (el primero que tenga un 6− en una prueba). Si te quedás hasta sacarlo (◷ 2 más en ese barrio, y +2 Ruido), −2 Culpa. Si corrés, +2 Culpa.

---

<a id="e858"></a>
### e858 · Cero
*Lo que hiciste · ◷ 0*

Se abre la noche en que tu Culpa llega a 0.

No pasa nada. Eso es lo raro: no pasa nada. Te acostás, y te dormís, y a la mañana te despertás y te das cuenta de que dormiste. De que no soñaste con la puerta, ni con la respiración, ni con la cara que no podés olvidar.

Sigue ahí. Lo que hiciste no se borra. Pero ya no te lo hacés de nuevo cada noche.

Recuperás todo tu Ánimo. Anotá `TE_PERDONASTE`. Desde ahora, la Culpa ya no sube: lo que hagas, lo hacés con los ojos abiertos.
