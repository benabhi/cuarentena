# Auditoría de Cuarentena (fase 6)

*10 de noviembre de 2026 · texto completo del libro (r100–r336, e001–e950, catálogo, apéndices e índice de Marcas)*

## Cómo leer esto

Leí el libro entero y corrí los chequeos automáticos: enlaces, Marcas, conexiones entre barrios y rangos de las tablas. Esos chequeos dan limpio. Todo lo que sigue sale de la lectura.

Hay **tres grupos**:

- **A · Lo que rompí yo** en la fase 5, al cambiar la tabla de Mordidas (r144). Son 4 textos que quedaron con la tabla vieja. Propongo arreglarlos sí o sí.
- **B · Graves:** opciones que no se pueden usar nunca, reglas que se contradicen, Marcas mal puestas, personajes repetidos y exploits. 38 puntos.
- **C · Menores:** ambigüedades, elecciones que no son elecciones, redacción y referencias. 62 puntos.

Cada punto trae una propuesta. **No apliqué nada.** Decime qué números van (por ejemplo «A entero, B todo menos B27, C1–C20») y lo aplico.

Los exploits (B26–B32) salen de razonar el texto, no del simulador: el simulador no juega fuentes de agua, la barcaza ni el piano, así que no medí cuánto suben las victorias.

---

## A · Consecuencias de mi cambio a r144

Desde la fase 5, la tabla de Mordidas es: 1–3 nada, 4–5 golpe, 6 «los dientes» (1 Herida y otro 1d6: 1–3 arañazo, 4–6 mordida). Como mucho dos Callados Encima.

| # | Dónde | Dice hoy | Propuesta |
|---|---|---|---|
| A1 | r305 (plantillas) | «un 5 o un 6 es solo 1 Herida» | «un 6 es solo 1 Herida, sin segundo dado» |
| A2 | r331 Pasillo | «solo dos Encima» (ya es la regla general) | «solo uno Encima» |
| A3 | e413 tigre | «un 5 o un 6 son 2 Heridas» | «un 4 o un 5 son 2 Heridas» (el golpe del tigre pega más) |
| A4 | e673 (7–9) | «1 Herida extra con 5–6 en la tabla de mordidas» | «con 4–6» |

---

## B · Graves

### Opciones que no se pueden usar o texto muerto

**B1 · e663, pedido «los del techo».** Pide ir a La Estación por las Azoteas, pero La Estación no tiene Azoteas (r151). El pedido no se puede cumplir. También cita «(r130)» cuando quiere decir e130.
*Propuesta:* que el pedido sea llegar a El Casco por las Azoteas, o a La Estación por el Subsuelo.

**B2 · e582 con `LA_VERDAD_ENTERA`.** La salida a pie cuesta ◷ 0 «si tu refugio está en el Perímetro o un barrio vecino; si no, no llegás». Ningún refugio está en el Perímetro ni en sus vecinos (La Fabril, Las Lomas, el Cementerio). La opción no se usa nunca.
*Propuesta:* «◷ 1 por barrio hasta el Perímetro; si llegás de día, salís».

**B3 · e575 y e577 mandan a «e100, opción Mirar».** e100 no tiene esa opción (tiene Quedarte quieto, Subir, Bajar, Desviarla y Volver). Además una pide 1d6 5–6 y la otra `[Sigilo]` 7+ para ver al Pastor.
*Propuesta:* agregar a e100 una opción **Mirar** con `[Sigilo]` (10+ ves al Pastor y anotás la pista; 7–9 lo ves pero te ve; 6− la Procesión te alcanza) y que las dos remitan a ella igual.

**B4 · e825: «Si nunca lo abrís, en e826 tenés +2».** e826 exige `LEISTE_LA_ORDEN` o `OCAMPO_Y_LEIVA`, y las dos necesitan haber abierto el sobre. El +2 no se cobra nunca.
*Propuesta:* agregar `SOBRE_CERRADO` y que e826 acepte también esa Marca.

**B5 · El Ruso (e636).** «Las salidas por la Calle con él cuestan ◷ 1 menos (como mínimo ◷ 1)». La Calle ya cuesta ◷ 1 (r152), así que no hace nada.
*Propuesta:* «con él, la Calle no suma Ruido» o «con él, la tabla del barrio tiene −1».

**B6 · e145.** La escena tiene postura fija Hablar, pero después dice «si sale Emboscada o Pelea». Con la postura fija eso no puede salir.
*Propuesta:* borrar ese párrafo, o cambiar la postura fija por «tirá la postura».

### Reglas que se contradicen

**B7 · Vehículos y encuentros.** r152 dice que en vehículo, al llegar, tirás la tabla del barrio con +1. e712 dice que el vehículo te saca de la Calle sin tirar encuentro, y lo repiten el taxi, la autobomba y el blindado.
*Propuesta:* manda r152 (el vehículo hace ruido, algo te espera) y se corrige e712. La otra opción, sin encuentro, haría a los vehículos demasiado buenos.

**B8 · El Bruto en el sondeo.** e726 dice que el frente pierde 1d6 de Resistencia; e075 dice 3.
*Propuesta:* 3 en los dos (menos azar en la defensa).

**B9 · Víveres que se pudren.** r177 dice «más de 10»; Gustavo (e618), «más de 14»; e452, «no se pudren aunque tengas más de 20».
*Propuesta:* la regla es 10. Gustavo sube el tope a 14. e452 pasa a decir «no se pudren» sin número, porque la Despensa ya lo evita.

**B10 · Los aliados en la Noche 40.** r222 da +3 fijo a la defensa por aliado; la tabla de e905 da un efecto distinto por facción.
*Propuesta:* manda e905 y r222 remite a ella.

**B11 · Tigre Dos el día 41.** e543 dice que la lancha simplemente está; e930 y e912 piden llamarla por radio.
*Propuesta:* manda la radio (es una decisión). e543 lo aclara: «si la llamaste».

**B12 · El Vigía.** r136 dice que deja mirar la próxima carta. r175, e758 y e480 dicen que da −1 al sondeo.
*Propuesta:* el puesto Vigía da −1 al sondeo; la radio deja mirar la próxima carta. Se corrige r136.

**B13 · Grave.** r121 dice que Grave da Desventaja en todo; r190, que solo en Físico, Pelea y Sigilo.
*Propuesta:* manda r190 y se corrige r121.

**B14 · Sobrecarga.** r121 da Desventaja en todo; r164, solo en Físico y Sigilo.
*Propuesta:* manda r164.

**B15 · Compañero caído.** r148: «si sobrevive al combate, vive Grave». r186: «si alguien lo saca del combate, vive Grave; si no, muere».
*Propuesta:* manda r186 (rescatar es una decisión) y r148 remite.

**B16 · Comer de menos.** r131 baja la Moral 1 por cada persona sin comer; r182 la baja 1 por alba.
*Propuesta:* −1 por alba sin comida para todos (r182). Con grupos grandes, la versión por persona hunde la Moral en una sola noche.

**B17 · Los sobrevivientes no tienen Reservas ni Ánimo en la hoja.** r131 dice «alguien pierde 1 Reserva» y e081 y e244 hablan del Ánimo de los sobrevivientes, pero la Hoja del grupo no tiene esas columnas.
*Propuesta:* agregar a la Hoja del grupo una columna Reservas (▢▢▢), y cambiar «Ánimo» por «Moral del grupo» en e081 y e244. La otra opción es que el faltante lo pague siempre tu protagonista.

**B18 · El Pastor en la Noche 40.** e585, e731 y e901 dicen cosas distintas sobre qué hace esa noche.
*Propuesta:* e901 manda; las otras dos remiten a e901.

**B19 · Dos botines para el Blindado.** e729: 1–3 casco, 4–5 chaleco, 6 arma. e165: 1d6 Munición, y chaleco con 5–6.
*Propuesta:* dejar la de e729 y que e165 remita.

**B20 · Cemento.** Cuenta como 4 Metal en e740 y como 2 Metal en e271.
*Propuesta:* 2 en los dos.

### Personajes y nombres

**B21 · Don Ramón muere dos veces.** e284 (kiosco en Los Bloques) y e450 (Supermercado del Mercado): en los dos es un Callado y tiene una libreta de fiado.
*Propuesta:* el del kiosco pasa a ser **Don Tito**, y su libreta, un cuaderno de apuestas.

**B22 · Facu.** e645 dice que no salió de su cuarto desde el día 0; e135 lo pone cruzando las azoteas con otros cuatro chicos.
*Propuesta:* en e135, otro chico (**Nico**).

**B23 · Hospital Regional y Hospital Central.** El Regional aparece en e490, e492, e586, e779, e805, e950, el catálogo y la Noche 40. Sanidad, el prólogo y los sobrevivientes dicen Central. Sanidad tiene un solo hospital.
*Propuesta:* todo «Hospital Central».

**B24 · Dos enfermeras Marta.** La protagonista y Marta Sosa, la madre de Ana y Bruno (e611).
*Propuesta:* Marta Sosa pasa a ser **Graciela Sosa**.

### Marcas

**B25 · `EL_NIDO` la dan dos eventos.** e119 (un nido cualquiera del Subsuelo) y e332 (el andén de La Estación). e334 la pide para quemar el de La Estación, así que con e119 podés quemar un nido que nunca viste.
*Propuesta:* e119 da `UN_NIDO`; `EL_NIDO` queda solo para e332.

**B26 · e434** da 1 oleada menos «si tenés `LA_RAMPA` y la destruiste». La Marca de haberla destruido es `RAMPA_DESTRUIDA` (e435).
*Propuesta:* pedir `RAMPA_DESTRUIDA`.

### Exploits

**B27 · Desarmar adentro del refugio (r165) no tiene límite.** Madera infinita.
*Propuesta:* el refugio se puede desarmar una sola vez: 6 Madera en total, con una casilla en la ficha.

**B28 · La barcaza (e254).** «Los que suban (hasta 30) cuentan como sobrevivientes al amanecer»: subís a todos menos a uno y ganás sin defender.
*Propuesta:* los de la barcaza cuentan para el final **Éxodo**, no como sobrevivientes del refugio.

**B29 · Agua y comida sin fin.** Lugares sin stock que dan Víveres en cada visita: e283 pileta (4 Víveres, ◷ 2; en el mismo barrio que la Escuela), e301 piletas (3, ◷ 1), e303 lago (4, ◷ 1), e381 pesca, e411 patos y agua. Más nafta sin fin en e265. Esto rompe «el saqueo se agota», y la falta de comida es la presión que mide el simulador.
*Propuesta:* cada uno con su stock ▢▢▢ (tres visitas), como los demás lugares.

**B30 · Moral sin fin.** El piano con Celeste (e206) da +2 Moral en cada visita; el organillero (e210), +1 Moral cada noche.
*Propuesta:* el piano, una vez por Etapa; el organillero, una vez por semana.

**B31 · e385 tren fantasma.** 3 Antivirales, y se puede repetir.
*Propuesta:* una sola vez (`EL_TREN_FANTASMA`). Lo mismo para e384 y el resto de e385, que también se repiten.

**B32 · Grupos que entran como uno.** `LOS_VEINTE` (e064) y los grupos de e256 entran como un solo sobreviviente con consumo propio. No queda dicho cuántos defensores ponen en la Noche 40 ni cuánto cuentan para los finales.
*Propuesta:* un grupo cuenta como 2 defensores y como su número real para los finales.

### Referencias equivocadas

**B33 · «(r140)» como «de noche afuera»** en e440, e511, e660, e683, e684, e685 y e831. r140 es «Cuándo hay combate»; la noche afuera es r158.

**B34 · Rasgo Leal: «si caés (r195)».** Caer es r190; r195 es la muerte.

**B35 · La bicicleta citada como r104** (e342 y otros). r104 es la Repartidora; la bicicleta está en r152.

**B36 · e761 cita r224 para el Último Cuarto.** Es r223.

**B37 · Otras referencias de reglas:** r133 («cuidar a alguien, r185» → r190 o r183), r134.2 («Producción, r182» → r181), r172 («r221» → r222), r149 («r195» → r190), e522 granadas («r148» → el catálogo).

**B38 · «e101 en Los Bloques» (e639).** e101 pasa en tu refugio, no en la iglesia. Hernán debería venir con e284 o con una visita a la iglesia.

---

## C · Menores

### Reglas que conviene aclarar

- **C1 · r108.6:** dice Rastro inicial 1, pero el Supermercado empieza en 2 y el Sarmiento en 0. Agregar «o el de tu refugio». (Lo mismo en e012.)
- **C2 · r110:** varios Tesoros pueden caer en el mismo lugar (camión, armería, blindado y generador se repiten entre tablas). Falta la regla: «si ya hay uno, el siguiente».
- **C3 · r137:** la tabla del palo es confusa y despareja (Oros con 2 y 5). Propuesta: 1 Oros, 2 Copas, 3 Espadas, 4 Bastos, 5–6 tirá de nuevo.
- **C4 · r144 contra r148:** «se reparten entre los dos» contra «entre todos». Con dos Encima como máximo, decir: «los dos que llegan eligen al que más cerca esté».
- **C5 · r144:** algunas protecciones cubren solo la cabeza o los brazos, pero en combate no se tira dónde pega. Usar la tirada nueva de r192 (brazo, pierna, hombro, cuello) para eso. Es una oportunidad, no un error.
- **C6 · r143 contra la Escopeta:** Cerca también sirve Encima, salvo la Escopeta. Decirlo en la ficha de la Escopeta.
- **C7 · r152 y r157:** el vehículo suma +2 Ruido por barrio. Tres barrios dan Ruido 6, o sea una Procesión. Si es a propósito, decirlo en el catálogo, que habla de «Ruido al llegar».
- **C8 · r155:** en Etapa IV entra una Procesión nueva por alba. No se dice qué pasa con tres o más fichas juntas (solo está la doble).
- **C9 · r165 afuera:** «cada persona del grupo» → «cada persona que va con vos»; y una vez por lugar.
- **C10 · r171:** «frente en 0: esa noche el sondeo entra». Decir si el sondeo pasa a ser seguro.
- **C11 · r172:** confirmar que colocar una trampa cuesta ◷ 1 aparte de fabricarla.
- **C12 · r174:** «una semana sin salir de noche» → «siete albas seguidas».
- **C13 · r181 Cocina:** «necesita 2 Víveres». ¿Se gastan? r177 dice que cocinar no crea ni gasta. Y «esa alba» → «la próxima alba».
- **C14 · r181 Enfermería:** «2 si su Medicina es 2+». Aclarar que es la del que hace el puesto.
- **C15 · r199, el ejemplo de Juli:** Juli es la Repartidora y para ella las Azoteas cuestan como la Calle, pero el ejemplo dice ◷ 2 ida y vuelta.
- **C16 · r210 Toque de queda:** los eventos que nombran cartas por número (5, 15, 25 y 35; 11; 39; 40) no traen la conversión para el mazo corto.
- **C17 · r211:** «súbela en las cartas 1, 11 y 21» → «11 y 21».
- **C18 · r180 contra la Escuela:** «cada tres nuevos» contra el «hasta 8» de la Escuela. Decir cuál manda.
- **C19 · Mitades que se acumulan:** la Huerta (Escuela ½ y Doña Rosa ½) y el Generador (e121, e231 y e404, ½ cada uno). Decir «no se suman: como mucho la mitad».
- **C20 · Intro de refugios:** «si no es tu refugio, 1d6 con 1–2 hay vivos», y cada ficha tiene su propia tirada. Decir que la de la ficha reemplaza a la general.

### Mecánicas sin definir

- **C21 · Sondeos «con Fuerza» de los vivos** (e451 opción 3 y e463 opción 4). e072 no usa Fuerza. e687 lo resuelve bien con «como una oleada, r221». Unificar con e687.
- **C22 · «Ganar la ronda»** (e550) y «el primer golpe de Cerca no hace nada» (e520, y los cascos de e522). No están definidos en r143. Propuesta: «el primer Callado que llegue Encima no tira mordida».
- **C23 · e075 y e076:** decir si Pelearlo o Matarla reemplaza la pérdida de Resistencia o se suma. e076 no dice cuánto pierde el frente si la matás después de la primera ronda.
- **C24 · e078:** Empujarlo con una pala no dice qué pasa con 4–6, y «mañana hay sondeo seguro» → «la noche siguiente».
- **C25 · e081:** «Moral −1 (es la regla)» sin número de regla.
- **C26 · e425:** «+1 en su primera oleada». ¿A qué?
- **C27 · e578 opción 2 (6−):** «4 soldados (r300, postura Pelear)». r300 puede dar otro resultado; debería ser un combate directo.
- **C28 · e581 y e586:** «+1 al epílogo de su arco» y «−1 al final» no están definidos. En e586, «−1 Herida para el inmune» se lee como curarlo; quiere decir que recibe 1 Herida.
- **C29 · e333 opción 3, «Usarlo»:** no tiene mecánica.
- **C30 · e047, «Esperar»:** no queda claro qué pasa.

### Efectos sin Marca

- **C31 · e233 «Seguir»:** cada noche (Etapa II+) Sanidad recibe una Procesión. Es permanente y no tiene Marca. Además la opción 1 pide `[Físico]` y no trae tramos.
- **C32 · e214 insulina:** «si sabés que alguien tomaba insulina». Falta la Marca.
- **C33 · e801:** «si no volvés antes de 5 cartas». Falta cómo se registra el plazo.
- **C34 · El faro encendido** como Señuelo grande en e900. Falta la Marca de haberlo encendido.
- **C35 · El Pastor «si te ve, te recuerda»** (e731). Decir qué Marca.
- **C36 · e442 reja abierta:** no se puede registrar si quedó abierta, y choca con la opción 1 (cerrarla con cadena).
- **C37 · e552:** pide la ametralladora con `LA_ARMERIA`, que la da cualquier resultado de e522. Hace falta `LA_AMETRALLADORA`.
- **C38 · e483 sirena:** «una vez por partida», pero en la Noche 40 es Señuelo grande si está encendida. Aclarar si son la misma.

### Elecciones que no son elecciones

- **C39 · e086:** la opción 3 (+2 Moral y borra `LOS_CREYENTES`) es mejor en todo que la 1 (+1 Moral y una Marca mala).
- **C40 · e087:** la opción 1 es mejor en todo que la 2.
- **C41 · e157 opción 2:** 10+ y 7–9 dan lo mismo.
- **C42 · Tramos que faltan:** e640 opción 3 (7–9), e901 el disparo al Pastor (7–9), e233 opción 1 (todos).
- **C43 · e614 opción 3 y e644 opción 3** son condiciones, no opciones.
- **C44 · e272:** Reputación +1 con los Bomberos no cae en ningún caso, y −3 cae también en «0 o menos». Ordenar: +2 o más / +1 / 0 o −1 / −2 o menos.

### Datos sueltos

- **C45 · e009:** dice stock ▢▢ para todos, pero las fichas de refugio tienen el suyo (Supermercado ▢▢▢).
- **C46 · e010 y e740, Tablones:** «una piedra, con Desventaja · Sin prueba». No hay prueba a la que poner la Desventaja.
- **C47 · e023:** tirá 1d6 por un barrio vecino, pero los barrios tienen de 2 a 5 vecinos.
- **C48 · e029:** «mientras dure esta carta» para tres días de lluvia; una carta dura un día.
- **C49 · e036:** «la próxima vez que salga un 2 en esta tabla»: e036 es el 2 de una sola columna.
- **C50 · e054:** «Mirá la próxima carta» para todos, aun sin radio.
- **C51 · e072:** la tabla de frentes incluye el Subsuelo, y no todos los refugios lo tienen.
- **C52 · e113, e121 y e133:** e113, «se mojaron 2 casilleros», ¿cuáles? e121, «2 horas» → ◷ 2. e133 opción 3 pide arma de fuego sin decir qué pasa si no tenés.
- **C53 · e140 y e141:** comés en e140 y e141 vuelve a preguntar si tenés algo para comer.
- **C54 · e144:** el encabezado dice escena Pasillo; el bloque, Escalera (r332).
- **C55 · e154:** si revisaste y sacaste 6−, ¿tirás el 1d6 de la mentira?
- **C56 · e264 sierra:** «las barricadas que hagas acá». Las barricadas se hacen en el refugio.
- **C57 · Ítems y lugares que no existen:** el bozal del Negro (e101 y la Baraja), que no está en el catálogo; la verdulería de e752; la escena Salón (e633); el arco del Club de golf o colegio inglés (e702); la receta «Hervir agua sin fuego» de Mateo (e624, es el cloro de e383); e370 remite a e747–e749 como Equipo o Medicina, pero e748 es Comida y agua; e672 nombra a los Lobos en e265, donde no están.
- **C58 · e435:** no hay refugio en La Fabril; y la sirena de e270 es de una fábrica, no del cuartel.
- **C59 · e639:** la tabla de crisis con −1 puede dar 0, y empieza en 1.
- **C60 · e604 Sol:** `EL_GIMNASIO` es la Marca de haber mirado, no de que siga cerrado.
- **C61 · e611:** «Bruno deja de ser chico», pero en la ficha nunca fue «un chico»; y «Ana no sabe nada hasta que Bruno se lo cuente» no lleva a nada.
- **C62 · Redacción suelta:** e490 «volver del refugio» → «al refugio»; e077 (sondeo al Subsuelo) en el Sarmiento, que no tiene Subsuelo, → la Puerta; e579 «treinta y siete días» depende de la carta; e626 mezcla ◷ de día con puestos de noche; e687 «elegí un frente… siempre el más débil»; e727 Escupidor, redacción confusa; e712 «1 por viaje» contra e481 «por viaje de ida y vuelta»; e760 silenciador (−1 Rastro) contra e511 (evita el +2 del primer día); e560 «una pista por fuente» contra e121 y e542; e584 «con 4 pistas o más» es redundante; Doña Rosa (e282) y la Sra. Peralta (e830) viven en el mismo piso del monoblock C. ¿Es a propósito?

---

## Lo que está bien

- **0 enlaces rotos y 0 Marcas sueltas.** Toda Marca que se pide alguna vez se da en algún lado, y el índice de Marcas coincide con el texto.
- **Las conexiones entre barrios son simétricas**, y las tablas de llegada cubren de 2 a 12.
- **Recetas:** todos los manuales enseñan recetas que existen, y toda receta no básica tiene su manual.
- **Arcos:** e068 → e575 y e039 → e661/e671/e681/e691 llegan bien.
- **Resumen de los Apéndices:** cubre todas las reglas.
