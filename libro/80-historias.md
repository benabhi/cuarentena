# Las historias

*Cada protagonista trajo algo a la cuarentena: una lista de pacientes, un contrato, un sobre cerrado, una caja con un precinto rojo. Lo que hagas con eso es tu historia. La ciudad te la va a ir contando de a pedazos, en los lugares donde dejaste algo.*

**Cómo se leen.** Cada arco empieza en el prólogo y sigue en los lugares de la ciudad: cuando un lugar dice «Si sos la Enfermera…», es tu historia. Tu **contador** (r198) sube y baja con lo que hacés, y al amanecer decide tu epílogo ([e950](#e950)). Las entradas de un arco que no es el tuyo no se leen.

---

## La Enfermera · La lista del pabellón 4

<a id="e800"></a>
### e800 · La lista
*La Enfermera · ◷ 0*

La sacás del bolsillo del guardapolvo y la desdoblás. Una hoja de cuaderno, escrita con tu letra en el cambio de turno de la noche del día 0: los doce pacientes del pabellón 4, con la cama, el nombre, el diagnóstico y la medicación. Al lado de cada uno, una tilde: la última ronda.

Cuatro murieron esa noche. Uno se levantó: el señor Aguirre, cama 12. Los otros siete no sabés.

Hiciste un juramento cuando te recibiste, hace treinta años. No decía nada de esto. Decía «cuidar».

Anotá en tu hoja **siete nombres** de la lista (los vas a ir tachando): **Benítez** (cama 2, EPOC), **Coria** (cama 3, posoperatorio), **la nena Olmos** (cama 5, apendicitis), **Ferro** (cama 7, diabética), **Luna** (cama 8, embarazada), **Quiroga** (cama 10, fractura de cadera), **Suárez** (cama 11, neumonía).

- **Tu contador es el Juramento.** Sube cuando salvás a alguien; baja cuando dejás morir a alguien que podías salvar (r101).
- **La lista no se pierde.** Mientras tengas `LISTA_DEL_PABELLON`, ningún evento que te quite la Mochila te la quita: va en el bolsillo del guardapolvo.
- Cada vez que encuentres a alguien de la lista, tachalo. Si llegás a tachar cuatro o más → [e808](#e808).
- Los lugares de tu arco: el **pabellón 4** ([e801](#e801)), la **farmacia del Casco** ([e803](#e803)), la **morgue** ([e804](#e804)), el **Edificio Sarmiento** ([e805](#e805)) y el **hospital de campaña** del Perímetro ([e807](#e807)).

---

<a id="e801"></a>
### e801 · El pabellón 4
*La Enfermera · Hospital Central · ◷ 1*

Tercer piso. El pasillo donde trabajaste doce años. La silla de la enfermería con tu almohadón. El tablero de corcho con los turnos. El pabellón está en silencio. Las camas, deshechas. En la cama 12 hay un suero colgado que gotea sobre nada.

En la cama 3 hay alguien.

**Coria**, sesenta años, operado de la vesícula el día −1. Flaco, deshidratado, vivo. Se escondió en el placard de la ropa blanca durante un mes, saliendo de noche a tomar agua de la canilla del office. Cuando te ve, llora.

—Usted volvió —dice—. Yo sabía que usted volvía.

1. **Llevártelo.** Está débil: no hace puestos durante 3 noches, después es un sobreviviente común. Tachá a Coria. +1 Juramento. +1 Moral cuando llega.
2. **Si no podés llevarlo hoy**, le dejás agua y comida (1 Víver) y le decís que vuelvas. Anotá `CORIA_ESPERA` y, al lado, el número del día. Si volvés antes de que pasen 5 días, borrá la Marca y llevátelo (opción 1). Si no, se muere: −1 Juramento, y borrá la Marca.

En el cajón de la enfermería, además, está tu libreta de turnos. En la última hoja, alguien escribió con otra letra: «Marta: los del 4 que estén vivos llevalos al Sarmiento. R.» Es la letra de Raquel, tu jefa. → [e805](#e805), cuando vayas.

---

<a id="e802"></a>
### e802 · Una carta para la Enfermera
*La Enfermera · ◷ 0*

La carta está escrita en un papel de recetario del hospital. La letra es temblorosa, de alguien que escribe acostada.

«Señora Marta: soy Luna, la de la cama 8. Estoy en Los Bloques, en el monoblock F, en el séptimo. Ya es la semana. Tengo miedo. No hay nadie que sepa. ¿Usted puede venir?»

La carta tiene una fecha: dos días atrás.

1. **Ir.** A Los Bloques, al monoblock F, antes de la próxima carta de Espadas. Si llegás → [e806](#e806).
2. **No ir.** No podés. No hoy. Cuando salga la próxima carta de Espadas, tachá a Luna con una cruz. −1 Juramento. −1 Ánimo.

---

<a id="e803"></a>
### e803 · La insulina
*La Enfermera · Farmacia del Casco · ◷ 0*

—¿Insulina? —dice el chico de la farmacia—. Hay. En la heladera de atrás. Bueno, había heladera. Ahora es un placard frío.

Abre el placard. Hay cuatro cajas de insulina, tibias. Funcionan igual, por unos días.

Ferro, cama 7, diabética. Ella vive en el Casco, encima de la panadería de la calle Rivadavia. Lo dice tu lista: alguien anotó la dirección para el alta.

1. **Ir con la insulina.** ◷ 1, en el Casco, por las Azoteas o la Calle. Tirá 1d6: con 1–2, llegás tarde: Ferro está en la cama, convertida, atada por su marido, que te abre la puerta con los ojos rojos (−1 Ánimo, tachá a Ferro con una cruz). Con 3–6, Ferro está viva, débil, en coma diabético; con `[Medicina]` 7+, la despertás. El marido y ella vienen al refugio (2 sobrevivientes comunes). Tachá a Ferro. +1 Juramento.
2. **Llevarte la insulina para después.** Ocupa 1 casillero. Si alguna vez en un evento hay un diabético, la tenés.

---

<a id="e804"></a>
### e804 · El forense
*La Enfermera · Morgue · ◷ 0*

Las planillas del forense son de los primeros cinco días. Las sabés leer: lo que entró, la hora, la causa, la hora en que se levantó. Columnas y columnas. Todos se levantaron entre las tres y las seis horas después de morir.

Todos menos cuatro. Cuatro nombres con un círculo rojo y una anotación: «Mordido documentado. Fiebre 38,5 a 40. Remite al 5.º día. Sin conversión. Derivado al Comando por orden de Salas». Uno de los cuatro nombres está en tu lista: **Quiroga**, cama 10.

Una pista ([e560](#e560)).

Anotá `QUIROGA_DERIVADO`. Quiroga no se convirtió. Se lo llevó el Comando. Si alguna vez vas al **hospital de campaña** del Perímetro ([e423](#e423)), en el fichero de triaje está su ficha → [e807](#e807).

---

<a id="e805"></a>
### e805 · El departamento de Raquel
*La Enfermera · Edificio Sarmiento · 9.º C · ◷ 1*

El departamento de Raquel huele a ella: a lavanda y a cigarrillo. Sobre la mesa, una caja de zapatos con tu nombre escrito con fibrón.

Adentro: 4 Fármacos, 2 Antivirales, un tensiómetro, la llave del depósito del Central y una carta.

«Marta: me llamaron del Comando. Quieren la lista del personal con el grupo sanguíneo. Quieren saber quién se enfermó el año pasado con la gripe y quién no. No me gusta. Si me pasa algo, quedate con esto. Y cuidá a los del 4: alguien tiene que cuidarlos. Te quiero, vieja. R.»

Una pista ([e560](#e560)). +1 Juramento: alguien confió en vos.

Si el Sarmiento es tu refugio, la caja está en tu casa desde el principio: leé esto la primera noche.

---

<a id="e806"></a>
### e806 · La cama 8
*La Enfermera · Los Bloques · Monoblock F · ◷ 2*

Séptimo piso, sin ascensor. En el departamento hay una chica de veinte años en el colchón, sudando, agarrada a la sábana. Luna. Está pariendo. No hay fiebre: es el parto, que se adelantó. Está sola: el novio salió a buscar comida hace tres días.

Es la primera vez en un mes que hacés algo que sabés hacer.

`[Medicina]` (+1 si sos Partera, `ENFERMERA_PARTERA`; +1 con Botiquín).

- **Con 10+:** una nena. Llora fuerte, demasiado fuerte para Tolme. Luna se ríe y llora. Vienen al refugio las dos. +2 Juramento, +2 Moral. Anotá `LA_NENA_DE_LUNA`. El llanto: +1 Rastro.
- **Con 7–9:** una nena, y Luna sangra mucho. 2 Fármacos para pararlo. Si los tenés, como con 10+, pero +1 Juramento. Si no, Luna muere esa noche y la nena vive: +1 Juramento, −2 Ánimo.
- **Con 6−:** las dos se complican. Hacés todo. Al amanecer, una de las dos vive (elegí cuál). Tachá a Luna. −1 Ánimo.

---

<a id="e807"></a>
### e807 · El fichero del triaje
*La Enfermera · Hospital de campaña · ◷ 1*

Buscás en el fichero. Las fichas están por orden de llegada. Las manos te tiemblan.

Encontrás cuatro de tu lista: **Benítez**, **Suárez**, **la nena Olmos** y **Quiroga**. Benítez y Suárez: «Reacción a L-40: negativa». Muertos. La nena Olmos: «Sin fiebre al ingreso. Derivada a sector B». No sabés qué es el sector B. Y Quiroga: «Sujeto Q-10. Sin seroconversión. Trasladar al Comando. URGENTE».

Tachá a los cuatro. A dos con cruz. A dos con signo de pregunta.

Una pista ([e560](#e560)), dos si tenés `QUIROGA_DERIVADO`.

1. **Buscar el sector B.** Detrás de la carpa grande, `[Sigilo]`, ◷ 1. Con 7+, encontrás una carpa con catres y una docena de chicos sin fiebre que miran una tele sin señal. La nena Olmos está ahí. Te reconoce: «¡Marta!». Si te la llevás (`[Sigilo]` otra vez para salir), +2 Juramento y −2 Reputación con el Destacamento. Si no, por lo menos sabés que está viva: +1 Juramento.
2. **Irte.** Ya sabés lo que querías saber. −1 Ánimo.

---

<a id="e808"></a>
### e808 · El juramento
*La Enfermera · ◷ 0*

De noche, en el refugio, sacás la lista. Ya no es una lista: es un mapa de tachaduras, cruces, signos de pregunta, nombres que encontraste vivos.

Te das cuenta de que no la vas a terminar. No se termina. No se terminaba antes tampoco: siempre había otro turno, otra cama.

**Elegí qué vas a hacer con la lista:**

1. **Guardarla.** Seguís buscando hasta el último día. +1 Juramento.
2. **Pasársela a alguien.** A alguien del grupo con Medicina 1 o más, o que quiera aprender. Le enseñás todo lo que sabés: esa persona gana Medicina +1. Anotá `LA_LISTA_SIGUE`. En tu epílogo, si no llegás al amanecer, alguien sigue la lista por vos.
3. **Quemarla.** Hiciste lo que pudiste. Recuperás todo tu Ánimo. Tu contador queda como está.

Si tu Juramento es 5 o más, esa noche dormís. Por primera vez desde el día 0, sin soñar con la cama 12.

---

## El Albañil · El muro

<a id="e810"></a>
### e810 · El contrato
*El Albañil · ◷ 0*

Lo leés de nuevo a la luz de una vela. Tres hojas abrochadas con el membrete de la constructora y el sello del Comando de Emergencia.

«Obra de contención, accesos norte. Provisión y montaje de contenedores marítimos apilados (tres niveles), soldadura de unión, coronamiento con concertina. Longitud: once kilómetros. Plazo de ejecución: diecinueve días. Inicio: día −21.»

Día −21. Firmaste el día −21. El brote fue el día 0. Te pagaron por adelantado y no preguntaste, porque había que pagar la cuota del auto y la escuela de los chicos.

Construiste la jaula.

- **Tu contador es Cimientos.** Sube cuando terminás una instalación; baja cuando un frente llega a 0 (r102).
- Los lugares de tu arco: el **archivo de obras públicas** de la Municipalidad ([e811](#e811)), **el muro** ([e815](#e815)), la **sección que cedió** ([e814](#e814)) y la **obra que nunca terminaste** ([e816](#e816)).
- Una pista ([e560](#e560)): ya la tenés, en la mano.

---

<a id="e811"></a>
### e811 · El expediente
*El Albañil · Municipalidad · ◷ 1*

En el archivo de obras públicas buscás por número de licitación. Lo encontrás en el tercer estante: una carpeta gruesa, con la tapa sellada «RESERVADO». Adentro, el pliego, los planos, las actas. Y una nota del Comando a la constructora, firmada por un tal Dr. M. Salas:

«Se requiere que el tramo 9 se ejecute con soldadura provisoria, apta para desmontaje rápido desde el exterior. Motivo: acceso de personal de observación al término del plazo.»

El tramo nueve. Desmontable desde afuera. Lo soldaste vos, con tus manos, sabiendo que estaba mal, porque el ingeniero te dijo «hacelo así, que lo pide el cliente».

Una pista ([e560](#e560)). Anotá `EL_TRAMO_NUEVE`.

Y en los planos hay algo más: la ubicación de los depósitos de materiales de la obra. Chapas, perfiles, electrodos, que nunca se usaron. En La Fabril → [e816](#e816).

---

<a id="e812"></a>
### e812 · Una carta para el Albañil
*El Albañil · ◷ 0*

La letra es de Gisela, tu mujer. No puede ser: Gisela y los chicos estaban en lo de su madre, en Santa Rosa, del otro lado del muro, desde el día −5. Te acordás bien: la empresa le pagó el pasaje, «un regalo por el contrato».

«Tito: si te llega esto es porque el chico del correo cumplió. Estamos bien. Nos sacaron de la ciudad el −5 con las familias de los de la empresa. No sabíamos nada, te lo juro. Ahora sí sabemos. Aguantá. Te esperamos. G.»

La empresa sacó a las familias cinco días antes. Sabían.

Una pista ([e560](#e560)). +1 Cimientos: hay alguien esperándote. Si tenés `ALBANIL_PADRE`, recuperás todo tu Ánimo, y podés volver a usar la foto de tus hijos una vez más.

---

<a id="e813"></a>
### e813 · El ingeniero
*El Albañil · ◷ 0*

Se abre cuando visitás el campamento del Destacamento ([e690](#e690)) o el Puesto de control Norte ([e421](#e421)).

Entre los soldados, con un casco blanco y un chaleco reflectivo, hay un hombre que conocés: el ingeniero Duarte, de la constructora. Te ve y se pone pálido.

—Tito. Me trajeron para mantener el muro. No me dejan salir. Nadie sale.

1. **Preguntarle por el tramo nueve.** «Lo sabés vos, lo sé yo. Se abre desde afuera el día que ellos quieran.» Una pista ([e560](#e560)).
2. **Pedirle ayuda.** Duarte tiene los planos de todo el muro. `[Labia]`. Con 7+, te da una copia: sabés dónde están las soldaduras flojas de todos los tramos. Anotá `LOS_PLANOS_DEL_MURO`. En la Noche 40, si la Marea entra por una brecha del muro (`EL_MURO_CEDIO`), sabés por dónde va a venir: la primera oleada no puede elegir el frente más débil (un 6 se vuelve a tirar).
3. **Pegarle.** `[Pelea]`. Con 7+, le rompés la nariz. Los soldados te sacan del Perímetro. −1 Reputación con el Destacamento, +1 Ánimo.

---

<a id="e814"></a>
### e814 · La sección que cedió
*El Albañil · ◷ 0*

Sabés qué sección fue antes de que nadie te lo diga. No fue el tramo nueve. Fue el siete, el de al lado. Lo soldaron a las apuradas, de noche, con electrodos húmedos, porque el plazo era diecinueve días y no veinte. Lo soldó tu cuadrilla. Lo soldó Ramírez, el mismo Ramírez que se levantó el día 1.

−1 Ánimo. −1 Cimientos.

Pero sabés cómo se tapa.

1. **Ir al Perímetro a ayudar.** Hoy, al Perímetro, sin tirar encuentro al llegar (los soldados te dejan pasar si les decís lo que sabés). ◷ 4, `[Oficio]` con +2. Con 7+, el tramo siete queda mejor que antes: borrá `EL_MURO_CEDIO`. +2 Reputación con el Destacamento, +2 Cimientos. Con 6−, tapan lo que pueden: la primera oleada de la Noche 40 suma +1 en lugar de +2.
2. **No ir.** No es tu muro. No es tu ciudad. No es tu culpa. (Es un poco tu culpa.)

---

<a id="e815"></a>
### e815 · La soldadura
*El Albañil · El muro · ◷ 1*

Ponés la mano en el contenedor de abajo, un azul de la naviera danesa. El número de lote pintado con plantilla: 7-B-114. Es de tu tramo. La soldadura de unión es tuya: la reconocés por el cordón, un poco más grueso de un lado, porque siempre soldaste así.

Del otro lado se escucha la Marea. El metal vibra contra tu palma.

1. **Revisar tu tramo.** ◷ 2. Recorrés doscientos metros mirando cada unión. `[Oficio]`. Con 7+, encontrás dos uniones que van a ceder antes de la Noche 40 y le avisás al Destacamento: +1 Reputación, y anotá `GRIETA_EN_EL_MURO` (sabés dónde). Con 10+, además, te dan electrodos: 2 Metal.
2. **Escribir tu nombre.** Con un clavo, en la pintura, al lado de la soldadura: «T. Ferreyra. Perdón». +1 Ánimo.
3. **Si tenés `EL_TRAMO_NUEVE`:** vas hasta el nueve. Las soldaduras provisorias están ahí, con sus pernos de desmontaje del lado de afuera. Podés soldarlos para siempre (Soldadora y Generador, o los del Destacamento si tenés Reputación +1: ◷ 3, `[Oficio]`). Con 7+, anotá `TRAMO_NUEVE_SOLDADO`: nadie va a entrar por ahí desde afuera. Nadie va a salir tampoco. +2 Cimientos.

---

<a id="e816"></a>
### e816 · El obrador
*El Albañil · La Fabril · ◷ 1*

El depósito de la obra, en un galpón alquilado de La Fabril: un portón con candado y el logo de la constructora. Adentro, lo que sobró de diecinueve días de obra: perfiles de hierro, chapas, bolsas de cemento, electrodos, una soldadora eléctrica, un andamio desarmado, cascos.

Es lo que necesitás para hacer la mejor pared de tu vida.

Revisás una vez, sin tirar: **6 Metal, 4 Sujeción, una Soldadora** (necesita Generador) y **cemento** para dos Tapiados de ladrillos ([e740](#e740)). Todo pesa: 2 viajes, o uno con un vehículo.

Anotá `EL_OBRADOR`. +1 Cimientos.

Si tenés `LOS_PLANOS_DEL_MURO` o `EL_TRAMO_NUEVE`, en el escritorio del capataz hay un sobre con tu nombre y plata adentro. La paga del último tramo. No la querés. La dejás. −1 Ánimo y +1 Ánimo: las dos cosas.

---

<a id="e817"></a>
### e817 · La última pared
*El Albañil · Tu refugio · ◷ 0*

Se abre cuando construís el **Último Cuarto** ([e761](#e761)).

No es una pared más. Es la pared. La medís tres veces. Mezclás el cemento como te enseñó tu viejo, con la pala en ángulo. Ponés cada ladrillo, cada chapa, cada perfil, como si fuera lo único que vas a hacer en tu vida. Quizás lo es.

El Último Cuarto tiene **+2 Resistencia** (además del +1 del Albañil). +1 Cimientos. Si tenés `EL_OBRADOR`, usás los perfiles de hierro de la obra: +1 Resistencia más.

Cuando terminás, apoyás la frente en la pared. Está fría. Aguanta. La hiciste vos.

---

## La Agente · La orden

<a id="e820"></a>
### e820 · El sobre
*La Agente · ◷ 0*

El sobre marrón sigue en el bolsillo interior de tu campera, con el sello rojo intacto: un escudo, el número 40 y la palabra RESERVADO. «Para ejecutar al recibir la señal.»

No sabés qué señal. No sabés qué orden. Dejaste el puesto antes de saberlo.

- **Tu contador es el Deber.** Sube cuando protegés a civiles arriesgándote; baja cuando usás la fuerza contra civiles desarmados (r103).
- **Podés abrir el sobre** cuando quieras → [e821](#e821). Mientras esté cerrado (`ORDEN_SELLADA`), el Destacamento cree que todavía lo tenés sin leer, y eso vale algo.
- Los lugares de tu arco: la **Comisaría 1.ª** del Casco ([e823](#e823)), el **Puesto de control Norte** ([e824](#e824)) y el **campamento** del Destacamento ([e825](#e825)).

---

<a id="e821"></a>
### e821 · Abrir el sobre
*La Agente · ◷ 0*

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
### e822 · Una carta para la Agente
*La Agente · ◷ 0*

Un papel doblado, con la letra de imprenta de alguien que escribe con apuro. Firma «Pato». El cabo Pato Giménez, tu compañero en el cordón, el que te tapó cuando te fuiste.

«Leiva: me cambiaron al tramo 14. Acá todos hablan de la señal. El teniente dice que la va a dar el Comando el día 40 a la noche, cuando llegue la Marea. Dice que es verde. Los pibes dicen que es roja. Yo no sé. Si te enterás de algo, avisame por el canal 6 del handy. Cuidate. P.»

Una pista ([e560](#e560)). Anotá `EL_CABO_GIMENEZ`. +1 Deber: alguien todavía confía en vos.

Si tenés un handy, una radio militar o `AGENTE_RADIO`, podés hablar con Pato una vez por semana: te dice dónde está la patrulla del Destacamento (si vas al Perímetro, no tirás [e432](#e432) ese día).

---

<a id="e823"></a>
### e823 · El libro de guardia
*La Agente · Comisaría 1.ª · ◷ 0*

El libro de guardia de la Primera, abierto sobre el mostrador. La letra del oficial de servicio, cada vez más desprolija.

«Día 1, 06:10. Llamados múltiples por agresiones. Día 1, 14:00. Orden del Comando: retener en calabozo a detenidos con fiebre. No trasladar. Día 2, 09:00. Orden: entregar listado de detenidos con fiebre al Comando. Día 2, 23:00. Retiran a cuatro detenidos en camión sin identificación. Día 3, 04:00. Orden de abandono de dependencia. Dejar a los detenidos. Repito: dejar a los detenidos.»

Los de las celdas. Los que hacen ruido cuando revisás. Son los que dejaron.

Una pista ([e560](#e560)).

1. **Liberarlos.** Abrís las celdas. Son Callados: **Callados ×1d6 · Cerca**. Los matás o los dejás salir (−1 Deber si los dejás salir a la calle de un barrio con vivos). +1 Ánimo: nadie más va a estar encerrado acá.
2. **Firmar el libro.** Escribís debajo: «Día [el de hoy]. Agente Leiva. Presente.» +1 Deber.

---

<a id="e824"></a>
### e824 · El puesto que dejaste
*La Agente · Puesto de control Norte · ◷ 0*

La garita. Los conos. La fila de autos. El auto clavado en los contenedores, todavía ahí, con el asiento de atrás vacío.

Y en tu lugar, al lado de la barrera, con el chaleco puesto y el fusil colgado, hay alguien. El soldado que lo hizo por vos, si no pudiste el día 2 (si tiraste 6− en [e004](#e004)). O el teniente, si disparaste. Callado. Parado en el puesto. Mirando la ruta.

**Callado ×1 · Lejos**, que no avanza: está de guardia.

1. **Relevarlo.** Le pegás un tiro (+2 Ruido). Cae. Le sacás el fusil (Daño 3, 4 Munición) y la placa. −1 Ánimo. +1 Deber: alguien tenía que relevarlo.
2. **Dejarlo.** Que siga de guardia. Es lo que querían. −1 Deber.
3. **Sentarte.** Te sentás en el cordón, al lado de él, un rato. No hace nada. Mirás la ruta. Recuperás 2 Ánimo.

---

<a id="e825"></a>
### e825 · El sargento
*La Agente · Campamento militar · ◷ 0*

Se abre la primera vez que hablás con Ocampo sin que te detengan: en [e690](#e690), en [e692](#e692) con 10+, o en [e463](#e463) con Reputación +2.

Ocampo te sirve mate en un jarro de lata y te mira.

—Yo también tengo el sobre —dice—. Todos los suboficiales lo tienen. ¿Lo abriste?

- **Si tenés `LEISTE_LA_ORDEN`:** «Entonces sabés lo mismo que yo. Que no sabemos nada.» Ocampo se ríe sin ganas. +1 Reputación. Anotá `OCAMPO_Y_LEIVA`: en la Noche 40 y el día 41, Ocampo hace lo que vos hagas ([e826](#e826)).
- **Si no:** «No lo abras. Mientras esté cerrado, sos una agente con una orden. Cuando lo abrás, sos una más.» Anotá `SOBRE_CERRADO`: mientras lo tengas, en [e826](#e826) tenés +2 en la prueba de abrir la barrera. Si un día lo abrís, borrá `SOBRE_CERRADO` y anotá `LEISTE_LA_ORDEN`.

---

<a id="e826"></a>
### e826 · La señal
*La Agente · Puesto de control Norte · ◷ 0*

Solo si tenés `LEISTE_LA_ORDEN`, `OCAMPO_Y_LEIVA` o `SOBRE_CERRADO`, y si estás en el Puesto Norte el día 41 al amanecer (o si tu final te trae acá).

La radio de la garita cruje. Una voz lee un código. Una palabra. Un color.

No importa cuál. Lo que importa es que los soldados te miran, porque tenés el sobre en la mano y una placa en el pecho, y ellos no saben qué hacer.

1. **Abrir la barrera.** Sea cual sea la señal. «Pasan todos. Los que no tengan fiebre y los que sí. Yo me hago cargo.» `[Labia]` o `[Puntería]` (r103). Con 7+, los soldados bajan las armas. +2 Deber. Todos los que estén en la fila pasan: el final cuenta como si tus vivos fueran **salvados**, cualquiera sea el Secreto (salvo la purga: el fuego viene igual, pero ya están afuera). Con 6−, alguien dispara. Tirá 1d6: con 1–2, sos vos la que cae.
2. **Cumplir la orden.** La que sea. +1 Reputación con el Destacamento, −2 Deber.
3. **Romper el sobre delante de todos.** Lo rompés en ocho pedazos. «No hay orden.» Los soldados se miran. Algunos se van. +1 Deber. El final sigue como diga el Secreto, pero vos ya no sos parte del cordón: anotá `SIN_ORDEN`.

---

## La Repartidora · El último pedido

<a id="e830"></a>
### e830 · El último pedido
*La Repartidora · ◷ 0*

En la aplicación del celular, sin señal, quedó congelada la lista de pedidos del sábado. Cinco entregas que nunca hiciste. Al lado de cada una, un botón verde: «Entregado». Nunca lo apretaste.

Anotá las cinco en tu hoja:

| # | Pedido | Destino | Entrada |
|---|---|---|---|
| 1 | Remedios de la farmacia | Sra. Peralta, Los Bloques, monoblock C, 8.º B | [e831](#e831) |
| 2 | Un sobre de una escribanía | Hotel Imperio, habitación 304, El Casco | [e831](#e831) |
| 3 | Un muñeco de peluche | Un cumpleaños, Las Lomas | [e831](#e831) |
| 4 | Un repuesto de motor fuera de borda | Club náutico, La Costanera | [e831](#e831) |
| 5 | La caja precintada | Dr. M. Salas, Residencia de investigadores, 4B | [e836](#e836) |

- **Tu contador es la Ruta.** Sube cada vez que cumplís un encargo; baja cada vez que abandonás uno (r104).
- **Los pedidos 1 a 4** los tenés en la mochila (1 casillero entre todos). El 5 es la caja (`CAJA_PRECINTADA`): 1 casillero, y no se puede desarmar ni cambiar.
- **La caja** tiene su propia historia: el registro de envíos del Correo ([e834](#e834)), el Laboratorio ([e835](#e835)) y su destinatario ([e836](#e836), y quizás [e833](#e833)).

---

<a id="e831"></a>
### e831 · Las entregas
*La Repartidora · ◷ 0*

Cuando llegás al barrio de un pedido, podés hacer la entrega (◷ 1). Tirá 1d6 y mirá qué pasó con el destinatario:

**1 · La Sra. Peralta (Los Bloques).** 1–2: la puerta está abierta y la señora Peralta está sentada en su sillón, muerta hace semanas, con la tele apagada. Dejás los remedios en la mesa. 3–6: la señora Peralta te abre con un cuchillo en la mano. Cuando ve la bolsa de la farmacia, se pone a llorar. Te da 2 Víveres y te dice que su sobrino es Pocho, el cerrajero (si lo buscás, viene sin prueba: [e612](#e612)).

**2 · Habitación 304 (El Casco).** El Hotel Imperio ([e206](#e206)). 1–3: la habitación está vacía y revuelta. En el baño, un hombre de traje, Callado, sentado en el inodoro. **Callado ×1 · Cerca**. El sobre de la escribanía dice «Testamento». 4–6: el hombre está vivo, flaco, encerrado. Firma el remito con letra temblorosa. «Llegó tarde, piba. Pero llegó.» Te da su reloj de oro (vale 3 en un cambio, r166).

**3 · El cumpleaños (Las Lomas).** Una casa con globos desinflados en la puerta y un cartel: «FELICES 6, BENJA». 1–3: la casa está vacía. Dejás el peluche en la puerta. 4–6: hay una familia adentro, con un nene de seis años que no festejó su cumpleaños. Cuando le das el peluche, el nene te abraza. Los padres te dan 3 Víveres y te dejan dormir una noche (r158).

**4 · El repuesto (La Costanera).** En el club náutico ([e382](#e382)). 1–3: no hay nadie. Pero con el repuesto, hacer andar la lancha tiene +2. 4–6: hay un viejo marinero cuidando su lancha. Se llama Cacho Barrios y no se fue nunca del club. Con el repuesto, la lancha anda: te la presta para una salida del Éxodo ([e960](#e960)), o te lleva al Puerto ida y vuelta cuando quieras.

**Cada entrega hecha:** apretás el botón verde, aunque no haya señal. +1 Ruta. Si el destinatario estaba vivo, +1 Ánimo.

**Abandonar un pedido:** si perdés la mochila, o si decidís tirarlo, −1 Ruta.

---

<a id="e832"></a>
### e832 · Una carta para la Repartidora
*La Repartidora · ◷ 0*

Un papel con el logo de la aplicación de reparto, impreso, y debajo, con birome, la letra de Mabel, la de la central de despacho, la que te decía «mi vida» por el handy.

«Juli: ¿te acordás del pedido del sábado del Laboratorio? Me llamaron del Comando preguntando por vos. Por tu nombre. Querían saber si la caja se entregó. Les dije que sí, que se entregó, que no sabía más. No sé si hice bien. No la abras. O sí. No sé. Cuidate, mi vida. M.»

Te buscan. Por la caja.

Una pista ([e560](#e560)). Anotá `TE_BUSCAN_POR_LA_CAJA`. Desde ahora, el Destacamento, si te reconoce (si vas al campamento, o si sale [e691](#e691)), pregunta por la caja: si la entregás, +3 Reputación y −2 Ruta.

---

<a id="e833"></a>
### e833 · El destinatario
*La Repartidora · Morgue · Heladera 14 · ◷ 0*

La credencial lo dice: «Dr. M. Salas · Comando de Emergencia · Asesor sanitario». El destinatario de tu caja estuvo encerrado en una heladera de la morgue durante un mes, convertido, golpeando la puerta despacio.

Alguien lo encerró. Alguien sabía quién era.

1. **Entregársela.** Le apoyás la caja en el pecho. Apretás el botón verde. Es lo más absurdo que hiciste en tu vida, y lo más honesto. Se cumple el pedido: +1 Ruta. La caja ya no es tuya: si la querés de nuevo, la agarrás (sigue siendo la caja, pero el pedido está entregado).
2. **No entregársela.** Ya no es el destinatario. El pedido sigue pendiente, pero ¿para quién? → la caja tiene otros destinos posibles ([e838](#e838)).

---

<a id="e834"></a>
### e834 · El registro de envíos
*La Repartidora · Correo Central · ◷ 1*

El registro del sábado −2, en la computadora del despacho de mensajería, que arranca con la UPS. Tu nombre. Tu bici. El pedido.

«Remitente: Laboratorio de Virología · Dra. E. Ríos. Destinatario: Dr. M. Salas · Comando. Contenido declarado: muestras biológicas · Sujeto 0 · cadena de frío. Observaciones: entregar en mano. No dejar en portería. No abrir. Urgente.»

Sujeto 0.

Una pista ([e560](#e560)). Anotá `SUJETO_CERO`.

Si tenés a la doctora Ríos en el grupo, sabe. Te mira. «Lo mandé yo», dice.

---

<a id="e835"></a>
### e835 · De vuelta al origen
*La Repartidora · Laboratorio de Virología · ◷ 0*

La entrada donde retiraste la caja hace un mes. El mostrador de la recepción, con el libro de visitas abierto en el sábado. Tu firma. La hora: 16:40. Y la firma de la persona que te la dio: «E. Ríos».

En la pared, detrás del mostrador, hay un póster del Laboratorio: «Programa L-40 · Hacia una inmunidad de amplio espectro». La foto de un equipo de investigadores sonriendo, de guardapolvo, con la doctora Ríos en el medio.

1. **Buscar a la doctora.** Está en su oficina ([e648](#e648)), si no la conocés. Cuando ve la caja, se le cae la pistola. «La tenés vos. Todo este tiempo, la tenías vos.» Con la doctora, `[Labia]` sin Desventaja.
2. **Devolver la caja.** La dejás en el mostrador. «Devolución.» Es un pedido cancelado, no abandonado: la Ruta no baja. Pero ya no la tenés. Si tenés `TE_BUSCAN_POR_LA_CAJA`, borrala.

---

<a id="e836"></a>
### e836 · El 4B
*La Repartidora · Residencia de investigadores · ◷ 0*

El departamento de Salas. La dirección exacta del pedido. Llegaste con un mes de atraso.

Alguien revolvió todo buscando algo. Buscaba la caja. Buscaba lo que vos tenés.

Sobre el escritorio, debajo de una pila de papeles tirados, hay una agenda con una anotación en el sábado −2: «Recibir muestra S-0. Llevar personalmente al Comando, Puerto Norte, lunes 07:00. Si no llega, abortar. Si se pierde, NADIE puede saberlo».

Se perdió. La tenías vos. Y todos supieron.

Una pista ([e560](#e560)). +1 Ruta: llegaste. Tarde, pero llegaste.

→ Ahora sabés todo lo que hay que saber de la caja menos lo que tiene adentro: [e837](#e837).

---

<a id="e837"></a>
### e837 · Abrir la caja
*La Repartidora · ◷ 0*

El precinto rojo. Nunca abriste un pedido. Ni uno, en dos años.

1. **Abrirla.** Cortás el precinto. Adentro, en hielo seco que ya no es hielo, seis tubos de sangre, con tapa violeta y una etiqueta: «S-0 · Sangre entera · NO CONGELAR». Y un sobre: un informe de dos páginas con gráficos que no entendés, y una línea subrayada: «El sujeto 0 no presenta conversión a los 40 días de exposición. Ver anexo». No hay anexo. −1 Ruta (abriste un pedido). Dos pistas ([e560](#e560)). Borrá `CAJA_PRECINTADA` y anotá `LA_CAJA_ABIERTA`.
2. **No abrirla.** No es tuya. Nunca fue tuya. La Ruta sigue igual. → [e838](#e838) cuando quieras.

Si tenés a Mateo o a la doctora Ríos, saben qué hacer con seis tubos de sangre: si tu Secreto resulta ser el 6, la sangre del S-0 cuenta como la del inmune para hacer suero ([e586](#e586)), sin que haga falta el inmune.

---

<a id="e838"></a>
### e838 · A quién entregarla
*La Repartidora · ◷ 0*

La caja sigue siendo un pedido. Un pedido sin destinatario. Vos decidís a quién se le entrega.

1. **Al Destacamento.** En el campamento ([e690](#e690)), a Ocampo. «Comando de Emergencia. Era para ustedes.» +3 Reputación. Ocampo la mira sin entender y la manda en un jeep al Puerto Norte. −1 Ruta: no era el destinatario.
2. **A la doctora Ríos.** Si está con vos. Es suya. La remitente. Ella decide: «Que no la tenga nadie». La destruye en el fuego. +1 Ruta (devolución al remitente). Si tu Secreto resulta ser el 3, el ensayo pierde su prueba principal: en [e583](#e583), `EL_MUNDO_SABE` necesita además los papeles del informe (`LA_CAJA_ABIERTA`).
3. **A la ciudad.** La llevás a la Radio Universitaria ([e375](#e375)) y leés al aire lo que dice el informe (necesitás `LA_CAJA_ABIERTA`). +2 Ruta: se lo entregaste a todos. Una pista ([e560](#e560)). Anotá `LA_VERDAD_AL_AIRE`.
4. **A nadie.** Te la quedás. Es tu último pedido, y el último pedido no se entrega nunca. La Ruta sigue igual. En tu epílogo, la caja sigue en tu mochila.
