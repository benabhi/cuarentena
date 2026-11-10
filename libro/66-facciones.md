# Las facciones

*Una iglesia que no cierra la puerta, unos bomberos que cobran el agua, una banda de seguridad privada que se quedó con un barrio y lo que queda del ejército mirando el muro. Ninguno es bueno del todo, ni malo del todo. Todos van a estar la Noche 40.*

**Cómo se usan.** La Reputación va de −3 a +3 (r197). Cada facción tiene su **casa** (cuando vas vos), su **visita** (cuando vienen ellos), sus **pedidos** y su **ataque** (en −3). En la Noche 40, [e905](#e905).

| Facción | Casa | Visita | Pedidos | Ataque o castigo |
|---|---|---|---|---|
| **La Parroquia** | [e660](#e660) | [e661](#e661) | [e662](#e662), [e663](#e663) | [e665](#e665) |
| **Los Bomberos** | [e670](#e670) | [e671](#e671) | [e672](#e672), [e673](#e673) | [e677](#e677) |
| **Los Lobos** | [e680](#e680) | [e681](#e681), [e682](#e682) | [e683](#e683), [e684](#e684) | [e687](#e687) |
| **El Destacamento** | [e690](#e690) | [e691](#e691) | [e693](#e693), [e694](#e694) | [e697](#e697) |

---

## La Parroquia

<a id="e660"></a>
### e660 · La Catedral
*El Casco · La Parroquia · ◷ 0*

Cuatrocientas personas: colchones en los pasillos, ropa colgada entre columnas, chicos en el altar mayor, una olla en la sacristía. Huele a sopa y a incienso. Las armas quedan en un cajón de la entrada. El **padre Anselmo**, setenta años, en zapatillas, no duerme desde el día 0. «Acá hay lugar para todos los que entren sin armas. ¿Venís a quedarte o a pedir?».

**Qué podés hacer** (◷ 1 cada cosa):

- **Un plato:** 2 Reservas, una vez por visita.
- **Dormir** acá (r158) sin tirar en la tabla de noche.
- **Dejar a alguien** que no puede seguir: no cuenta como perdido. +1 Reputación, una vez.
- **Donar** 3 Víveres o 2 Fármacos: +1 Reputación, una vez por semana.
- **Cambiar** (r166) Víveres, Tela y velas (Combustible). No aceptan armas ni Munición.
- **Un pedido** → [e662](#e662) o [e663](#e663).

**Con +2:** una vez por semana, la enfermería cura 2 Heridas (◷ 2) o te da 1 Antiviral.

**No perdonan:** un arma de fuego a la vista (−1), traer Fiebre sin decirlo (−2), los Lobos.

---

<a id="e661"></a>
### e661 · La Parroquia en tu puerta
*Tu refugio · La Parroquia · ◷ 0*

Dos mujeres con brazaletes blancos y un chico con un carrito. «Nos manda el padre Anselmo». 1d6:

- **1–2 · Traen** 2 Víveres y una vela. «Recen, si saben». +1 Moral.
- **3–4 · Piden** que recibas a gente de Los Bloques: 1d3 sobrevivientes (r180) y +1 Reputación, o −1 si no.
- **5 · Avisan** desde el campanario: la próxima Procesión que vaya hacia tu refugio la ves con un día de anticipación.
- **6 · Invitan** a la asamblea de mañana: anotá `LA_ASAMBLEA_HOY` (→ [e664](#e664)).

---

<a id="e662"></a>
### e662 · Pedido: los remedios
*La Parroquia · ◷ 0*

«Doce enfermos en la capilla. Diabéticos, chicos con fiebre (la otra fiebre), una señora del corazón. Se nos terminó todo».

**4 Fármacos,** o 1 Botiquín y 2 Fármacos, antes de la próxima carta de Espadas. Si cumplís, +2 Reputación y el mapa de los chicos de la Parroquia: dos lugares a elección quedan con stock 0 sin ir. Si no, −1, y nadie te dice nada, que es peor.

---

<a id="e663"></a>
### e663 · Pedido: los del techo
*La Parroquia · ◷ 0*

«Una familia hace señas con una sábana desde una azotea de la Estación, hace tres días. Hay una Procesión en la calle».

Ir y volver por el Subsuelo (r151, [e110](#e110)) y trepar el último tramo (◷ 2, `[Físico]`; con 6−, 1 Herida). A la Catedral: +2 Reputación. A tu refugio: 2 sobrevivientes y 3 que no hacen puestos, +1 Reputación, +1 Rastro. Si no vas, la sábana deja de moverse el domingo: −1.

---

<a id="e664"></a>
### e664 · La asamblea
*El Casco · La Catedral · ◷ 3*

Doscientas personas en el piso de la nave. En el altar, las cuatro facciones: Anselmo, Gauna con dos bomberos, un hombre de Rolo que no se saca los anteojos y un cabo que mira el reloj. «Si la Marea viene, viene para todos». Te dan la palabra.

1. **Proponer un pacto:** nadie le cierra la puerta a nadie la Noche 40. `[Labia]`, +1 por cada facción con Reputación +1 y +1 con 4 pistas. Con 10+, firman las cuatro: anotá `EL_PACTO` y +1 con todas. Con 7–9, firman la Parroquia y tu mejor facción. Con 6−, nadie.
2. **Contar lo que sabés** (2 pistas), `[Labia]`. Con 7+, te creen: +1 con Parroquia y Bomberos, −2 con el Destacamento, y la Parroquia se defiende sola la Noche 40. Con 6−, «esto es desinformación»: −2 con el Destacamento.
3. **Escuchar:** marcá dónde están dos Tesoros que no encontraste, o una pista ([e560](#e560)).

Después, borrá `LA_ASAMBLEA_HOY`. Si hubo pacto, esa noche en la Catedral se canta.

---

<a id="e665"></a>
### e665 · Las puertas cerradas
*La Parroquia · Reputación −3 · ◷ 0*

La Parroquia no ataca: cierra la puerta. Anselmo dice tu nombre en misa, y nada más.

- La Catedral no te abre, y en el Casco y Los Bloques los vivos tienen −1 a Hablar (r300).
- Cada **Creyente** del grupo, con 1–3 en 1d6, se va a la Catedral (`PERDIDO_` y su nombre).
- En la Noche 40 no vienen, aunque haya pacto.

Para volver a −1: llevale en persona, sin armas, 6 Víveres, un Tesoro o a alguien que salvaste, y `[Labia]` 7+ con Desventaja.

---

## Los Bomberos

<a id="e670"></a>
### e670 · El Cuartel Central
*La Fabril · Los Bomberos · ◷ 0*

Dos autobombas lavadas, bidones en fila y un tanque de treinta mil litros con candado: «EL AGUA NO SE REGALA». La **comandante Gauna**, el casco en la mesa, las manos quemadas: «Acá nadie trabaja gratis. Pero nadie te va a mentir».

**Qué podés hacer** (◷ 1 cada cosa):

- **Comprar agua** (r166): 1 Combustible por 3 Víveres; 1 Munición por 1.
- **Protección:** 2 Víveres o 1 Combustible por semana. Si un sondeo entra o hay incendio, al alba reparan 2 en el frente roto. Anotá `PROTECCION_BOMBERA` (se borra si no pagás).
- **Una autobomba,** 2 Combustible: ida y vuelta sin encuentros dentro de la Fabril, el Puerto, la Estación o el Mercado.
- **Un pedido** → [e672](#e672) o [e673](#e673).

**Con +2:** el agua a mitad de precio, y el Pasillo de fuego ([e741](#e741)) sin manual.

**No perdonan:** que no pagues (−1), que robes agua (−3), al Destacamento («nos dejaron solos el día 2»).

---

<a id="e671"></a>
### e671 · Los Bomberos en tu puerta
*Tu refugio · Los Bomberos · ◷ 0*

Tres bomberos con hachas y una planilla. «Venimos a cobrar el agua del barrio». 1d6:

- **1–3 · Cobran** 2 Víveres o 1 material: +1 Reputación y un bidón (+1 Víver). Si no pagás, `[Labia]`: con 6−, −1 Reputación y anotá `LOS_BOMBEROS_SABEN`.
- **4–5 · Ofrecen:** con `PROTECCION_BOMBERA`, +1 a tu frente más débil; si no, te la ofrecen.
- **6 · Hay un incendio** → [e673](#e673), ya.

---

<a id="e672"></a>
### e672 · Pedido: la nafta
*Los Bomberos · ◷ 0*

«Las autobombas toman nafta como agua, y la última estación de servicio se la quedaron los Lobos».

**5 Combustible** antes de la próxima carta de Bastos: +2 Reputación, un chaquetón (protección −1; el fuego te hace 1 Herida menos) y dos semanas de `PROTECCION_BOMBERA` gratis. Si son los tambores de los Lobos ([e684](#e684)): +3, y −2 con los Lobos. Si no cumplís, −1.

---

<a id="e673"></a>
### e673 · Pedido: el incendio
*Un barrio vecino · Los Bomberos · ◷ 3*

Una manzana entera ardiendo. Cuatro bomberos, dos mangueras. Necesitan manos.

1. **Ayudar,** `[Físico]` (+1 con Valeria). Con 10+, +2 Reputación y revisás las casas que quedan (Vivienda ▢▢▢) sin Ruido. Con 7–9, +2, 1 Herida y **Callados ×1d6 · Cerca** que salen ardiendo (un 6 en la tabla de Mordidas es 1 Herida más, sin Fiebre). Con 6−, se quema todo: +1 Reputación y 2 Heridas.
2. **Mirar de lejos.** Si te vieron (1–3 en 1d6), −1.

---

<a id="e677"></a>
### e677 · Los Bomberos vienen por el agua
*Tu refugio · Los Bomberos · Reputación −3 · ◷ 0*

No matan gente, pero saben abrir cualquier puerta. Esta noche, en lugar del sondeo: seis bomberos con barretas y una moladora.

- **Hablar,** `[Labia]`. Con 7+, se van, pero inutilizan tu Cisterna (arreglarla: ◷ 2, 2 Metal). Si no, la Puerta pierde **1d6** y se llevan todo el Combustible, la mitad de los Víveres y una herramienta. No hieren a nadie.
- **Dispararles:** **Bomberos ×6 · Cerca** (Pelea 2, hacha Daño 2, Aguante 2). Si muere uno, −3 para siempre, y en una brecha ([e920](#e920)) la Marea entra por la calle que ellos no cortaron.

Para volver a −1: 6 Combustible y pedirle perdón a Gauna delante de todos.

---

## Los Lobos

<a id="e680"></a>
### e680 · El barrio cerrado
*Las Lomas · Los Lobos · ◷ 0*

Te sacan las armas en la barrera («a la salida, si salís»). Adentro, pasto cortado, faroles solares, tambores de combustible, un galpón con candado, y mujeres cocinando bajo la mirada de un tipo con escopeta. **Rolo Benítez,** en reposera junto a la pileta, con anteojos de sol aunque esté nublado: «La única parte de Tolme que funciona. Todo tiene precio».

**Qué podés hacer** (◷ 1 cada cosa):

- **Cambiar** (r166) Munición, Combustible, Víveres, Fármacos o armas. Cobran el doble; con +2, justo.
- **Un trabajo** → [e683](#e683).
- **Mirar,** `[Calle]`. Con 7+, ves el depósito ([e686](#e686)), contás dieciocho armados y entendés que las cocineras no están ahí porque quieren ([e685](#e685)): anotá `CONOCES_EL_BARRIO_CERRADO`. Con 6−, −1 Reputación.
- **Irte.** Con −1 o menos, con 1–2 en 1d6 no te devuelven las armas.

**No perdonan:** que no pagues (−2), que les robes (−3), la Parroquia.

---

<a id="e681"></a>
### e681 · Rolo manda saludos
*Tu refugio · Los Lobos · ◷ 0*

Una camioneta negra y un tatuaje de lobo en el cuello. «Este barrio está bajo el cuidado de Rolo. Cuatro Víveres por semana».

1. **Pagar** 4 de lo que sea. Anotá `LE_PAGAS_A_LOS_LOBOS`: +1 Reputación (−1 con la Parroquia si se entera, 1–3 en 1d6). Vuelven cada carta de Oros; si no pagás → [e682](#e682).
2. **Negociar,** `[Labia]`. Con 10+, 2 Víveres y sin Marca. Con 7–9, pagás 4 y te regalan 6 Munición. Con 6−, como la 3.
3. **No pagar.** «Linda casa». −1 Reputación y anotá `AVISO_DE_LOS_LOBOS`.
4. **A tiros:** **Lobos ×3 · Aguante 2 · Lejos**, armas de fuego. +3 Rastro, −3 Reputación. Si ganás, la camioneta (12 casilleros, como el taxi, [e637](#e637); arrancarla, `[Mecánica]` 7+).

---

<a id="e682"></a>
### e682 · ¿Te acordás que te avisamos?
*Tu refugio · Los Lobos · ◷ 0*

Dos camionetas, seis chalecos. «Ahora son ocho. Y uno de los tuyos se viene con nosotros».

1. **Pagar** 8 y entregar a alguien (`PERDIDO_` y su nombre). −2 Moral. Borrá `AVISO_DE_LOS_LOBOS` y anotá `LE_PAGAS_A_LOS_LOBOS`.
2. **Sin la persona,** `[Labia]` con Desventaja. Con 7+, solo los 8. Con 6−, la 1 o la 3.
3. **No pagar** → [e687](#e687).

---

<a id="e683"></a>
### e683 · Trabajo para los Lobos
*Los Lobos · ◷ 0*

Rolo se saca los anteojos por primera vez. «Bien pagado». 1d6:

- **1–2 · Los remedios de la Catedral:** `[Sigilo]` con Desventaja, ◷ 2. +2 con los Lobos, −3 con la Parroquia, 6 Munición y 4 Combustible.
- **3–4 · Un tambor de nafta,** de noche por la Calle (r158). +1 y 3 Combustible.
- **5 · Uno que debe,** de Los Bloques: `[Labia]` o `[Pelea]`. +2, −1 Ánimo: no querés saber qué le hacen.
- **6 · Una autobomba de los Bomberos:** `[Sigilo]` con Desventaja y `[Mecánica]`, ◷ 4. +3 con los Lobos, −3 con los Bomberos, y una tirada en su depósito ([e686](#e686)).

Si no aceptás, se vuelve a poner los anteojos.

---

<a id="e684"></a>
### e684 · Golpear a los Lobos
*Los Lobos · ◷ 0*

Con `CONOCES_EL_BARRIO_CERRADO`, sabés dónde duele. No hace falta ganarles: hace falta que los suyos dejen de tenerles miedo. Cada cosa, una vez; si te ven (1–2 en 1d6), −2 Reputación.

1. **Los tambores:** de noche (r158), por el muro del fondo (`[Físico]`), una Molotov. +4 Ruido. Sus camionetas no salen una semana.
2. **Las cocineras** → [e685](#e685).
3. **La garita,** con fusil desde el club de golf ([e303](#e303)): `[Puntería]` con Desventaja. Con 7+, cae el guardia, y esa noche salen a buscar al tirador: en Las Lomas, encuentros con +2.

Con dos de las tres, anotá `LOBOS_DEBILITADOS`: Rolo pierde a la mitad. Si además muere Rolo ([e623](#e623)) o rechazás su ataque ([e687](#e687)), anotá `LOBOS_DERROTADOS`.

---

<a id="e685"></a>
### e685 · Las cocineras
*Las Lomas · El barrio cerrado · ◷ 0*

Siete mujeres que cocinan para los Lobos desde el día 5 y duermen en un sótano trabado por fuera. La mayor te ve por la ventana y se lleva un dedo a los labios.

**Sacarlas,** de noche (r158), con `CONOCES_EL_BARRIO_CERRADO`, ◷ 3: tres `[Sigilo]`, para entrar, abrir (sin prueba con Pocho, [e612](#e612)) y salir. Con las tres en 7+, salen todas: 3 se unen y 4 van a la Catedral (+2 con la Parroquia); una es Marcela, la de la olla de Los Bloques, y con Lucía se reconocen. +3 Moral. Con un 6−, se despiertan ahí: las que salieron, salieron, y vos peleás contra **Lobos ×1d6 · Cerca**, con armas de fuego. −3 Reputación.

Si sacaste a una o más, anotá `LIBERASTE_A_LAS_COCINERAS`.

---

<a id="e686"></a>
### e686 · El depósito de los Lobos
*Las Lomas · El barrio cerrado · ◷ 0*

Estanterías hasta el techo: comida, bidones, armas, remedios, televisores (¿para qué?), joyas en un balde. Una vez, si ya no hay Lobos o si Rolo te deja: **tres tiradas** (una por [e683](#e683)).

| 1d6 | Qué hay |
|---|---|
| 1 | 8 Víveres |
| 2 | 6 Combustible |
| 3 | 4 Fármacos y 2 Antivirales |
| 4 | Una escopeta (Daño 3, Cerca, 2 manos, +2 Ruido), un revólver y 12 Munición |
| 5 | Una moto: a cualquier barrio por la Calle en ◷ 1, con +1 a su tabla y +2 Ruido. 2 personas, 4 casilleros |
| 6 | La libreta de Rolo: «Pagos del Comando: día −10, día −5, día 0». Trabajaba para ellos. Una pista ([e560](#e560)) |

---

<a id="e687"></a>
### e687 · Los Lobos atacan
*Los Lobos · Reputación −3 · ◷ 0*

**En la calle:** dos camionetas te cortan el paso. **Lobos ×1d6+2 · Lejos**, armas de fuego, Aguante 2. Usá r310 (Te apuntan).

**En tu refugio,** en lugar del sondeo: Fuerza **2d6+2** contra el frente más débil que no sea el Techo, como una oleada (r221; cada defensor suma 1, 2 con arma de fuego).

- **Si aguanta,** se van con heridos. Anotá `RECHAZASTE_A_LOS_LOBOS`; con `LOBOS_DEBILITADOS`, anotá también `LOBOS_DERROTADOS`. +2 Moral, +2 Rastro.
- **Si no,** se llevan la mitad de Víveres y materiales, las armas que nadie tenga en la mano y a una persona (`PERDIDO_`). El frente queda en 0. −3 Moral. Vuelven en una semana.

---

## El Destacamento

<a id="e690"></a>
### e690 · El campamento del Perímetro
*El Perímetro · El Destacamento · ◷ 0*

Te toman la temperatura con una pistola en la frente; con Fiebre 1 o más, no entrás. En una carpa, un mapa de Tolme lleno de alfileres y el **sargento Ocampo**, la cara quemada por el sol, un mes sin una orden que tenga sentido. «Los civiles no pueden estar acá. Pero ya que estás».

**Qué podés hacer** (◷ 1 cada cosa):

- **Cambiar** (r166) Munición, Combustible y raciones (2 Víveres en 1 casillero). Quieren Fármacos, Antivirales, alcohol (Químicos) e información.
- **Contar pistas:** +1 Reputación por cada una, una vez; −1 con la Parroquia si se entera.
- **Preguntar.** Con +2, te dice el día exacto y el tramo por donde esperan la Marea: anotá `SABES_POR_DONDE`. En la Noche 40, la primera oleada no viene por el frente que elijas.
- **Un pedido** → [e693](#e693). **Con +2 y 4 pistas** → [e694](#e694).

**No perdonan:** acercarte al muro sin permiso (−1), esconder desertores (−2), hablar de más por radio (−2).

---

<a id="e691"></a>
### e691 · El Destacamento en tu puerta
*Tu refugio · El Destacamento · ◷ 0*

Un camión verde y un cabo con un termómetro de pistola. «Censo sanitario. Formen en la vereda».

1. **Dejarlos.** Por cada persona con Fiebre: «¿La podemos llevar al hospital de campaña?». Si decís que sí, se va (`PERDIDO_`, sin Moral si estaba de acuerdo); si no, −1 Reputación por cada una. Al final, 4 Víveres en raciones y +1.
2. **No abrir.** Un cartel amarillo: «INMUEBLE NO CENSADO». −1 Reputación y anotá `NO_CENSADO`: la próxima visita viene con más gente.
3. **Con `BUSCADO`, `DESERTOR_DEL_CORDON` o Iván:** esconderte, `[Sigilo]`. Con 6−, [e692](#e692) (o [e631](#e631) si es Iván).

---

<a id="e692"></a>
### e692 · Te buscaban
*El Destacamento · ◷ 0*

Ocampo dice tu nombre y apellido despacio, como si los leyera, y por qué te buscan desde el día 3: lo que salió en tu `BUSCADO` (r105). Si tu Motivo es La orden, tiene en el bolsillo un sobre igual al tuyo, con el sello roto. (Si llegaste por `DESERTOR_DEL_CORDON`, lo reconocen a él.)

1. **Explicarte,** `[Labia]`, +1 con 2 pistas. Con 10+, rompe la orden: «No te vi». Borrá `BUSCADO` (r105). Con 7–9, «la próxima no te cubro»: −1 Reputación. Con 6−, te esposan: la 3.
2. **Correr,** `[Físico]`. Con 7+, te perdés entre contenedores: −2 Reputación. Con 6−, 2 Heridas y la 3.
3. **Entregarte.** Una noche en un contenedor (◷ 6, sin tu Mochila). Al alba: «Hay una forma de arreglar esto» → [e693](#e693). Si lo cumplís, borrá `BUSCADO` y +2 Reputación. Si no, alguien deja la puerta abierta: te vas con `BUSCADO` y −3 Reputación.

---

<a id="e693"></a>
### e693 · Pedido: el tramo nueve
*El Destacamento · ◷ 0*

«El tramo nueve está flojo. Mis soldados no dan más».

Un día entero en el muro (◷ 6), vos y hasta dos más, cada uno `[Oficio]` o `[Físico]`: +1 Reputación por cada 7+ (hasta +2); con algún 6−, alguien queda atrapado: 2 Heridas. Al final, Ocampo te sube a mirar → [e434](#e434) (con `VISTE_LA_MAREA`, sin perder Ánimo). Anotá `TRABAJASTE_EN_EL_MURO`: la primera oleada de la Noche 40 tiene −2 de Fuerza.

---

<a id="e694"></a>
### e694 · El plan de Ocampo
*El Destacamento · ◷ 0*

Café de verdad, el primero en un mes, y la voz baja. «No voy a dejar que mis pibes se mueran en un muro que no sirve. Hay un blindado y una ruta por el río, donde termina el muro. Nadie me va a dar la orden de irme, así que me la doy yo. Necesito a alguien que lo haga andar».

1. **Aceptar.** Con `EL_BLINDADO` (antes de la carta 35), se van la noche que elijas. En **Éxodo**, es una salida para vos y 4 más ([e960](#e960)). En los otros modos, anotá `DESTACAMENTO_DISUELTO`: el campamento es tuyo, pero en la Noche 40 no hay nadie en el muro: **+1 oleada**.
2. **Que se quede,** `[Labia]` con Desventaja (sin ella con `EL_PACTO`). Con 7+, «por los pibes de la ciudad, entonces»: pelea con vos la Noche 40 ([e905](#e905)) sin tirar. +1 Reputación.
3. **Denunciarlo** por la frecuencia del Comando ([e542](#e542)). A la mañana hay otro sargento, más joven, con una lista. −3 Reputación, −1 Ánimo.

---

<a id="e697"></a>
### e697 · El Destacamento viene a buscarte
*Tu refugio · El Destacamento · Reputación −3 · ◷ 0*

Diez soldados rodean la manzana. «Este inmueble está requisado. Salgan con las manos en alto».

1. **Salir.** Una noche en un contenedor y te sueltan «por falta de pruebas». Se llevaron armas, Munición, Combustible y Antivirales. Reputación −2.
2. **Resistir:** **Soldados ×6 · Lejos** (Puntería 2, fusil Daño 3, Aguante 3), con −1 para pegarte por tus paredes. +4 Rastro. Si perdés, como la 1, y alguien muere en el tiroteo: −2 Moral.
3. **Escapar** por el Subsuelo o las Azoteas, con lo que entre en las mochilas (r176).
