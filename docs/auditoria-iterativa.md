# Auditoría iterativa (2026-11-11)

Pedido del autor: rondas de auditoría con pruebas hasta que las reglas no tengan ambigüedades, texto muerto ni redondeos sin definir. En cada ronda: arreglar, verificar (verificar.py, indice_marcas.py), simular y revisar la maqueta.

## Hallazgos sueltos (antes de la ronda 1)

- e523 dice «Daño 4 a todo un grupo» y e704 «Mata 4 (un grupo)»: no es lo mismo. Unificar.
- `TREN_ABIERTO` y `EL_TREN_SELLADO` no se consultaban en e333: el andén podía repetirse. Ahora e333 los consulta.
- `CORIA_ESPERA`, `LA_LUZ_DE_SAN_ROQUE` y `UN_NIDO` se consultan en su propio texto (temporizador o efecto que dura): no son texto muerto.

## Ronda 1 (reglas básicas, avanzadas, taller, plantillas, baraja, noche, Noche 40)

Arreglado:

- **Vehículos.** r152, r157 y e712 decían cosas distintas (tiempo, Ruido por barrio o por salida, Combustible por salida o por viaje, carga de la camioneta). Ahora r157 tiene las reglas (arrancar, andar, parar o pasar de largo, Combustible por barrio) y e712 la tabla de todos los vehículos del libro, incluidos los que estaban sueltos (ambulancia, 4×4, camioneta de los Sosa, carrito de golf, moto del Puerto). La «bici de carga» no salía en ningún lado: fuera. Los eventos remiten a e712 en lugar de repetir números.
- **Ruido en bici y en vehículo** agregado a r154 y al resumen del apéndice.
- **Linternas y pilas.** Las pilas se cambiaban pero no hacían nada, y la Linterna de dínamo «no se quedaba sin pilas» sin que la Linterna se gastara. Ahora la Linterna tiene Usos 6, las pilas la recargan, la de dínamo no tiene Usos y el celular es una Linterna con Usos 3.
- **Asma:** cuándo se gasta el inhalador, cuántos entran por casillero y qué es «6 juntos».
- **Vicio:** «un atado» y «por semana» no estaban definidos; ahora paga los días 7, 14, 21, 28 y 35, la abstinencia dura tres albas y se supera sin pagar dos fechas seguidas. El simulador usa la regla nueva.
- **Ametralladora:** e523 y e704 dicen lo mismo (Mata 4 por ronda; Desventaja con Puntería 1 o menos). e703 aclara que contra especiales lo que matan es Daño.
- **Soplete** (objeto de Obra) no decía qué hacía. **Pala** faltaba en las herramientas de r202.
- **r202:** «Encima, ocupan 1 casillero» se confundía con la distancia Encima.
- **r142 Retroceder** con todos Lejos: ahora salís del combate. **r148:** los compañeros tiran como en r143.
- **r224 Curar** entre oleadas no decía qué pasa con 7–9 o 6−.
- **r310 Obedecer:** «la mitad de lo que llevás» ahora son casilleros de la Mochila y elegís vos.
- **e035, e043 (`PEAJE`), e044, e047, e053 («ropa gruesa» no existía), e078, e901 (Bruto contra Foso/Rejas), e920 («lo que faltó»), e925 (faltaba el 7–9).**
- **Hoja de protagonista:** nota «el Mayor tacha Lastimado».

Pruebas: verificar.py sin enlaces rotos; simulador 2000 partidas: 60,8 % (meta 55–65 %).

## Ronda 2 (barrios, refugios, tesoros, sobrevivientes, facciones, historias, catálogo, apéndices)

Unos 50 hallazgos, todos arreglados. Los patrones:

- **«Un N da siempre X»** era ambiguo (¿cada vez que sale?): ahora «El primer N que sacás» (e224, e243, e302, e306, e342).
- **Semana** no estaba definida: r003 dice que son los días 1–7, 8–14… y que lo que se paga «por semana» se paga al alba de los días 7, 14, 21, 28 y 35 (Vicio, cisterna del Cuartel, cobros de los Lobos en e681).
- **Herramientas y objetos sin definir:** pinza, caja de herramientas, herramienta de corte (e491, e493, e512, e551 ahora nombran Llave inglesa, Soldadora o la moladora del Cuartel), ropa gruesa, mochila fumigadora (sale del vestuario de e263 y es la base del Lanzallamas).
- **Vivos con datos que las reglas no usan:** Rolo, Bomberos, Soldados y la gente armada de e687 ahora remiten a r147, que agrega cómo golpean los vivos Encima (un 6 es 1 Herida, no muerden).
- **Resultados faltantes:** 6− o 7–9 sin efecto en e155, e381, e411, e803, e925; Pereyra (e233) reescrito con una sola prueba.
- **Choques entre eventos y catálogo:** vehículos (e212, e242, e244, e262, e303, e481, e552, e637, e681, e686), Blindado (e729), Bruto (e726/e901), Cisterna (e751), Dormitorio (e756), Generador (e760, se paga cada día de uso), «mitad de los materiales» (r204) en e121, e231 y e404.
- **Marcas:** `TRAMO_REFORZADO`, `EL_HERRERO` y `VICIO` se consultan donde corresponde.
- **Apéndices:** resumen de combate con los vivos Encima.

Pruebas: verificar.py sin enlaces rotos, duplicados ni huérfanas (quedan solo las tres marcas temporizadoras ya justificadas); simulador 2000 partidas: 62,5 % (meta 55–65 %), refugios entre 51 % y 78 %.

## Ronda 3 (pruebas sistemáticas)

- **El sondeo estaba al revés.** r175 restaba la Guardia y la Vigía a los 2d6 y había sondeo con «igual o menos que el Rastro»: la Guardia lo hacía *más* probable y la Procesión menos. Ahora los ajustes van al Rastro (el «sondeo»): Guardia y Vigía lo bajan, la Procesión lo sube; los textos «−1 al sondeo» de todo el libro quedan bien. Corregidos el ejemplo de Nadia, el prólogo, r004, e758, los apéndices, las hojas y el recordatorio. La Campana de latas ahora da −1 a «Qué es» (e072). El simulador también tenía el error.
- **El Negro** se simulaba como un peleador; ahora solo hace Guardia (e651).
- **Comisaría:** con la escopeta de los patrulleros ganaba el 84 % de las partidas. Los patrulleros ahora dan batería y Botiquín en uno y un revólver en el otro («una vez cada uno: tres cosas» era ambiguo). Queda en 64 %.
- **Cuartel** sigue siendo el más fácil (76 %): el prólogo lo dice («El más amable para empezar»), como ya decía que el Supermercado es el más difícil.
- **r120:** si una prueba pide un número («`[Calle]` 10+»), solo ese resultado alcanza.
- **Don Ramón** (e450): sin arma de Cerca es un combate, no una prueba suelta.
- **Linterna** remitía a r336 (Túnel) en vez de r121 (a oscuras).
- Revisadas con script todas las pruebas sin 10+/7–9/6−: las demás quedan cubiertas por r120 (7–9 con precio a elección, 6− no se logra) y r204 (recetas). Todas las referencias rNNN/eNNN existen.

Pruebas: verificar.py sin errores; simulador 3000 partidas: 65,9 %; por refugio, Parroquia 60, Supermercado 62, Comisaría 64, Escuela 65, Sarmiento 66, Cuartel 76.

## Ronda 4 (libro y maqueta)

- **r220 · la Noche 40 te agarra afuera.** El libro decía qué pasa con los sobrevivientes de afuera, pero no con vos. Ahora: volvés a oscuras (r158) y llegás justo; si no volvés, la Marea te encuentra en la calle → e990.
- **Marcas sin consulta** (`CORIA_ESPERA`, `LA_LUZ_DE_SAN_ROQUE`, `UN_NIDO`): no son texto muerto, cada una explica su efecto donde se gana.
- **Índice de Marcas regenerado** (251): faltaban `TRAMO_REFORZADO` y una aparición de `VICIO`.
- **Viñetas:** había dos repetidas en el libro (bicicleta y guardia). El constructor ahora lleva la cuenta y no repite ninguna; los huecos medianos de los eventos (p. 99, 148, 149 y 186) llevan viñeta. Para eso se sumaron cinco recuadros nuevos (barricada, bidones, velas, changuito, candado): hoy son 14 imágenes pendientes, en docs/arte.md.

Pruebas: verificar.py sin enlaces rotos, duplicados ni huérfanas; simulador 2000 partidas: 66,2 % (por refugio 62–79 %, por oficio 58–78 %); PDF de 200 páginas, 0 títulos huérfanos, 24 columnas con hueco de más del 20 % (antes 32; las que quedan son de preliminares, columnas desparejas por un recuadro o finales de capítulo que piden aire).
