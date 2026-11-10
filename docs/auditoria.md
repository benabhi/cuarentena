# Auditoría de Cuarentena (fase 7: la protagonista a medida)

*Versión editable: https://claude.ai/artifact/KEwvbbUtWLDr23dMronwUz · 10 de noviembre de 2026 · la auditoría anterior (fase 6, ya aplicada) quedó en `auditoria-fase6.md`*

> **Aplicada entera** el 10 de noviembre de 2026, a pedido del autor («arreglar todos»). B3 se dejó como estaba, como proponía el punto. El simulador, después de aplicarla, da 60,5 % (ver `simulacion.md`).

## Cómo leer esto

**Qué revisé:**

- **Leí completo** todo lo que cambió con la protagonista a medida:
  - la creación (r100–r107), las mañas (r126), el apodo (r127) y los Motivos (r198);
  - el prólogo (e001–e015);
  - los arcos nuevos (e840–e858) y los cuatro viejos donde se tocaron;
  - el Secreto (r109, e560–e570), los epílogos (e950–e957) y la hoja de los Apéndices.
- **Corrí 8000 partidas** con protagonistas creadas al azar (`docs/simulacion.md`).
- **Recorrí el libro entero** buscando los lugares donde dos partidas se parecen. Es el pedido nuevo: que sea raro repetir una partida.

`herramientas/verificar.py` da limpio: 0 enlaces rotos, 0 duplicados y ninguna Marca suelta nueva.

**Cómo está armada.** Hay cuatro grupos:

- **A · Errores:** cosas que se contradicen o no se pueden cumplir. 8 puntos. Propongo arreglarlos sí o sí.
- **B · Equilibrio:** lo que dice el simulador. 5 puntos.
- **C · Rejugabilidad:** dónde las partidas se repiten, con una idea para cada lugar. 11 puntos. Es el grupo más importante.
- **D · Menores:** redacción y aclaraciones. 7 puntos.

Cada punto trae una propuesta. **No apliqué nada.** Decime qué números van (por ejemplo «A y B enteros, C1–C6») y lo aplico, y después vuelvo a correr el simulador.

**El resumen en una línea:** la creación funciona. Da 7104 fichas distintas en 8000 partidas, y los seis Motivos y las seis debilidades quedan parejos. Pero cuatro piezas hacen que las partidas converjan:

- el apodo casi siempre es «Calle» (C1);
- el Secreto deja esquivar las dos verdades malas (C2);
- el refugio se elige mirando las seis fichas (C5);
- El que falta casi siempre aparece vivo (C6).

---

## A · Errores

**A1 · El conocido del Mayor contra e852.** r101 dice que, si sos Mayor, tu conocido «viene sin prueba ni condiciones». Pero en Lo que hiciste, fila 1, el que lo sabe es tu conocido, y en e852 puede no venir (Decir la verdad, 6−).
*Propuesta:* agregar en r101: «salvo que sea quien sabe lo que hiciste (e852): ahí manda e852».

**A2 · Dos Negros.** Si sos de Seguridad y elegís a `EL_NEGRO`, el perro ya viene con vos. En la Comisaría 7.ª (e460), el perro del patio «es Negro (e651)».
*Propuesta:* en e460, «si ya tenés `EL_NEGRO`, la cucha está vacía y tiene una correa nueva: alguien lo buscó acá. +1 Ánimo».

**A3 · La orden, fila 4, y el punto de las dos debilidades.** La fila da `BUSCADO` y 1 punto. No dice si cuenta como la segunda debilidad (otro punto más, según r100), ni qué pasa si ya eras `BUSCADO`.
*Propuesta:* «Si no la tenías, anotá `BUSCADO`: es tu segunda debilidad y te da su punto, no otro más. Si ya la tenías, te buscan por dos cosas: −1 Reputación con el Destacamento, sin punto».

**A4 · El calendario de La orden.** e004 pasa el **día 2**. e009 dice «pasan dos días» y cuenta el martes y el miércoles. Con La orden, la Señora habla el día 4, y los cuarenta días no cierran con los demás Motivos.
*Propuesta:* en e009, «si venís del cordón, esos dos días ya pasaron: el miércoles te encuentra caminando de vuelta».

**A5 · e004: disparar es peor en todo.** Disparar cuesta −1 Ánimo y no da nada. Alejarte da +1 Deber gratis, salvo para Policía y Seguridad.
*Propuesta:*
- **Disparar:** el teniente se queda con tu cara. +1 Reputación con el Destacamento, y la pistola es tuya con 2 Munición.
- **Alejarte:** los soldados te vieron irte. −1 Reputación con el Destacamento, para cualquier oficio.

Así las tres opciones pagan algo distinto.

**A6 · «Mayor que vos» no se puede saber.** La desventaja del Joven pide saber la edad de cada sobreviviente, pero las 18 fichas no la dicen de la misma manera. Algunas dan años, otras no.
*Propuesta:* agregar a la tabla de r180 una columna corta, Joven, Adulto o Mayor, para cada sobreviviente.

**A7 · e843, fila 6: «la señal es la 5».** No se entiende si es la quinta señal o la fila 5 de e841.
*Propuesta:* «ahí, en lugar de tirar en e841, sale el 5 (la marca de búsqueda con su letra)».

**A8 · e848 contra e850, la lancha del muelle tres.** En Lo que hiciste, la lancha del día 1 «nunca salió del muelle». En El que falta, «Del otro lado» dice «Lancha. Muelle tres. Día 6». Nunca se juegan juntos, pero el mundo es uno solo.
*Propuesta:* en e848, «Me sacaron. Escollera. Día 6.», que además cuadra con la grieta de e960.

---

## B · Equilibrio

**B1 · El Mayor gana 14 puntos menos** (49 % contra 63 %). Probé variantes:

| Variante | Llegan |
|---|---|
| Como está | 46,9 % |
| +1 punto de Habilidad | 49,1 % |
| **4 casillas, pero la primera sigue siendo Magullado** | **55,6 %** |
| 5 casillas | 61,1 % |

Lo que pesa es perder Magullado, la casilla que se borra con el Descanso, más que tener una casilla menos.
*Propuesta:* «4 casillas en lugar de 5: no tenés **Lastimado**». La de Magullado se sigue borrando. Queda a unos 7 puntos de los demás, que se compensa con el conocido sin prueba y el +1 Labia.

**B2 · Oficios bajos: Mecánica 49 %, Docencia 53 %, Cocina 54 %.**

- **Mecánica** sale baja en parte porque el simulador no usa vehículos. En la mesa, Puente vale más.
- **Docencia** y **Cocina** dependen de cosas que llegan tarde:
  - Lista de presentes sirve sobre todo con grupo grande.
  - La olla grande no hace nada hasta construir la Cocina a leña.

*Propuesta:*
- **Cocina:** con la Olla a presión de r106, la maña funciona aunque no tengas la instalación («cocinás en la olla: el puesto Cocina no necesita la Cocina a leña, pero sí la olla»).
- **Docencia:** sumar a la maña «una vez por noche, alguien del grupo marca 1 Práctica en la Habilidad que vos tengas más alta: le enseñás». Sirve desde la primera noche y alimenta C4.

**B3 · Dos debilidades conviene** (61 % contra 57 %). El punto extra vale más que la segunda debilidad, porque casi todas se superan.
*Propuesta:* dejarlo. Es poco y premia arriesgarse. Si se quiere parejo: con dos debilidades, el contador de tu Motivo empieza 1 paso peor.

**B4 · Se puede empezar con tres mañas.** Un Adulto con 5 puntos libres llega a 4 en dos Habilidades más: sale con la maña del oficio y dos más desde el día 1.
*Propuesta:* «Al empezar, como mucho **una** Habilidad en 4».

**B5 · El Supermercado sigue siendo el refugio difícil** (49 %, contra 58–63 % de los demás). Es a propósito, como dice su ficha.
*Propuesta:* dejarlo, y decirlo en e010: «el más difícil de los seis».

---

## C · Rejugabilidad: dónde las partidas se parecen

**C1 · El apodo casi siempre es «Calle»** (70 % de los que llegan al amanecer). La tirada gratis de `[Calle]` antes de revisar (r161) se hace en cada lugar. Con 6−, marca Práctica (r124), así que Calle es la Habilidad que más se falla, la que más sube y la que nombra al protagonista. Por la misma razón, la maña que más se gana es **Atajos** (14 %).
*Propuesta, dos cambios chicos:*
- Las tiradas gratis (las que no cuestan ◷ ni tienen precio) **no marcan Práctica**.
- El palito del apodo se hace con **10+**, no con la Práctica: el grupo te nombra por lo que te vio hacer bien, no por lo que fallaste.

Así el apodo dice cómo jugaste esa semana, y cambia de partida en partida.

**C2 · El Secreto deja esquivar las verdades malas.** Con 4 pistas movés el dado 1 lugar, y el plazo (1) y la purga (2) están juntos en la rueda: del 1 vas al 6 y del 2 al 3. En el simulador esas dos **no salieron nunca**, y el ensayo salió en el 41 %. Con 4 pistas, quien juega elige la verdad, y elige siempre la misma.
*Propuesta: que las pistas tengan dirección.*
- Cada pista se anota con el **color** del barrio donde la encontraste. Hay tres colores, uno por par de verdades:
  - **Comando** (1–2): El Perímetro, La Estación, El Casco y La Fabril.
  - **Laboratorio** (3–4): Sanidad, Ciudad Universitaria, El Mercado y Los Bloques.
  - **Afuera** (5–6): El Puerto, La Costanera, Cementerio y Parque, y Las Lomas.
- Al abrir el Secreto, solo podés mover el dado **hacia un par del que tengas pistas**.
- No hace falta tocar las treinta fuentes de pistas: el color sale del barrio.

Investigar en un lado o en otro se vuelve una decisión de ruta, y la verdad se parece a lo que jugaste. Además, las verdades 1 y 2 necesitan algo que las haga deseables, como una salida o un premio, para que alguien quiera ir hacia ellas.

**C3 · El prólogo tiene un tronco igual para todos.** Después de e002–e007, todos juegan las mismas escenas:

- e008: el mismo combate en un Pasillo.
- e009–e012: el mismo viaje, la misma elección de refugio, la misma revisada y los mismos tablones.
- e015: la misma vista desde arriba.

*Propuesta:*
- **e008:** tirá 1d6 para quién es el primero y dónde (vecina en la escalera, paciente en la guardia, chofer en el colectivo…). Cada uno con su escena (Pasillo, Escalera, Calle) y un detalle que queda: una Marca o un objeto.
- **e015:** «Humo en tres barrios» pasa a ser una tirada. Esos tres barrios empiezan con 1 casilla de stock menos en todos sus lugares, porque se quemaron, o con una Procesión más, según el dado.

**C4 · «Por qué lo tenés» repite parejas.** En tres de las cuatro tablas, Salud va con Farmacia y Mecánica con Electricidad. Reparto, Comercio, Policía y Seguridad también se repiten. Un farmacéutico y una enfermera viven la misma historia en casi todos los Motivos.
*Propuesta:* rotar las parejas para que cada oficio comparta fila con otro distinto en cada tabla. Las filas no cambian; cambia solo la columna «Encaja con».

**C5 · El refugio se elige mirando las seis fichas.** Quien optimiza elige siempre el mismo (Escuela 63 %, Comisaría 61 %).
*Propuesta:* en e010, **tres candidatos**, no seis:
- el de tu barrio o el más cercano;
- el que sugiere tu Motivo (La lista: el Sarmiento; La orden: la Comisaría; La obra: la Escuela; El pedido: el Cuartel; los otros dos, el que elijas);
- uno a 1d6.

Si salen repetidos, tirá de nuevo. Elegís entre esos tres. Cada partida empieza con una pregunta distinta.

**C6 · El que falta casi siempre aparece bien.** En el simulador, las 3 señales llegan en la Etapa I o II, donde la tabla de e845 no tiene finales tristes. Mordido y convertido salen en el 1 % cada uno. «Te estaba buscando», el mejor, sale en el 22 %.
*Propuesta:* que esperar sea tentador y peligroso a la vez.
- La columna **I o II** pierde «Te estaba buscando» y gana «Mordido» en la fila 1.
- «Te estaba buscando» pasa a la columna III, en la fila 6, solo si tenés 5 señales o más: buscar más tiempo da más control, como el Secreto.

**C7 · Los cuatro beneficios del barrio son iguales en los doce barrios.** Solo cambia el conocido.
*Propuesta:* cambiar «Tu escondite» por **«Lo que sabés de tu barrio»**, una línea distinta para cada barrio:
- **El Puerto:** sabés nadar. Los Ahogados no te agarran con 6−.
- **La Estación:** conocés los túneles. Tu primer viaje por el Subsuelo no tira encuentro.
- **El Casco:** sabés qué galerías tienen salida.
- **Cementerio y Parque:** sabés dónde hay agua.
- Y así con los doce.

Hace que el barrio pese tanto como el oficio.

**C8 · Las mañas ganadas casi no se ganan.** 1,3 por protagonista al final. Fuera de Atajos y La puerta, ninguna pasa del 3 %. Llegar a 4 cuesta demasiado si se empieza en 1 o 2.
*Propuesta:* con C1, la Práctica se reparte mejor. Además, que cada Motivo tenga **una escena que te deja marcar 3 Prácticas** donde quieras, como un evento ★ (r124), a mitad del arco. Así cada partida termina con una maña distinta.

**C9 · Las debilidades se superan siempre en el mismo lugar.** El Asma, en la Farmacia Central. Los Anteojos, en la Galería Pasaje Real. La espalda, en la Clínica San Roque.
*Propuesta:* que el lugar de cada debilidad se tire en la preparación, como los Tesoros (r110), en una tabla de 6 lugares posibles por debilidad.

**C10 · e857 «Otra vez» pasa siempre el primer día de la Etapa III.**
*Propuesta:* que se abra con la carta de Espadas más alta de la Etapa III, o el día que la Culpa vuelva a 4. El espejo llega cuando no lo esperás.

**C11 · La Noche 40 se juega igual con cualquier protagonista.** Fuera de La puerta y el Último Cuarto, la ficha no cambia nada esa noche.
*Propuesta:* cada Motivo con **un momento propio en la Noche 40**:
- **La lista:** alguien de la lista en la brecha.
- **La obra:** el tramo 7 que cede.
- **La orden:** la señal por radio.
- **El pedido:** la caja que alguien quiere.
- **El que falta:** su llegada o su golpe en la puerta (ya existe con `LO_DEJASTE_ADENTRO`).
- **Lo que hiciste:** la puerta que hay que abrir.

Todo entra en una tabla de 6 filas en e905.

---

## D · Menores

- **D1 · Manos de guardia** (r102): decir «sin importar tu puesto, y también a vos».
- **D2 · La puerta** (r102): «las noches que hacés Guardia». Confirmar que la protagonista también elige puesto (r181 lo dice, pero r102 parece suponer otra cosa).
- **D3 · Pulmones contra los Frescos:** «avanzan un solo paso por ronda contra vos». Si vas con compañeros, aclarar si los Frescos que van por ellos avanzan normal.
- **D4 · e002, opción 4** («Correr a buscar al médico de guardia») no tiene prueba ni consecuencia. Sumarle algo, como una práctica gratis o un encuentro con Raquel que da una pista.
- **D5 · e006, opción 3:** Llamar, llamar, llamar cuesta Ánimo y la linterna, sin nada a cambio. Como escena está bien. Si se quiere que sea elección: «a las cuatro, contesta alguien que no es: −1 Ánimo, pero anotá 1 señal».
- **D6 · r107:** la fila Marcas dice «Oficio, barrio, Motivo y debilidad». Falta «y la de tu objeto, si tiene».
- **D7 · El documento de diseño** de la protagonista (el Claude Doc de la propuesta) todavía dice «un dado doblado» en un ejemplo. No es el libro, pero lo corrijo si querés que quede como referencia.

---

## Lo que está bien

- **La variedad de fichas.** 7104 fichas distintas en 8000 partidas. Los seis Motivos quedan entre 58 % y 60 %, y las seis debilidades entre 58 % y 60 %.
- **Ninguna tirada oculta.** El Secreto y el destino de El que falta se tiran al revelarse, y lo jugado los mueve.
- **Los arcos no dependen del oficio.** Cualquier oficio puede jugar cualquier Motivo, y la tabla «por qué lo tenés» cambia la historia según el oficio.
- **Lo que hiciste tiene escenas espejo** (e857) que vuelven a poner al protagonista en el mismo dilema. Es el arco más rejugable de los seis.
- **Chequeos automáticos limpios.**
