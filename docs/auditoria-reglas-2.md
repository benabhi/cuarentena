# Cuarentena · Auditoría iterativa de reglas 2

17 de noviembre de 2026. Sigue a [auditoria-iterativa-reglas.md](auditoria-iterativa-reglas.md).

## Resumen

Releí las 664 entradas (120 reglas y 544 eventos) buscando errores de sentido, ambigüedades, nombres distintos para lo mismo, objetos que no sirven o no se consiguen, Marcas mal enlazadas y eventos inalcanzables. Hice rondas de arreglo y relectura hasta que dos pasadas seguidas no encontraron nada nuevo. Ningún arreglo cambia una regla que ya funcionaba: cuando dos textos se contradecían, elegí el que el simulador ya medía.

El libro sigue en 200 páginas, sin títulos huérfanos y sin viñetas repetidas.

**Simulador** (6.000 partidas, semilla 7): llegan al amanecer el **64,2 %** (antes, 66,2 %). La diferencia es el Ruido fuera de combate: el libro ya decía que con 6 llega una Procesión estés donde estés, pero el simulador solo lo miraba en las peleas. Ahora lo mide. La variante en que también aparecen Callados con 3 fuera de combate bajaba al 59 %, así que la regla quedó escrita como la otra.

## Reglas

- **El Ruido** (r145, r154, resúmenes y hoja): es de la **salida**, no del barrio. Con 3, aparecen Callados si estás peleando (fuera de una pelea, el 3 solo empeora la tabla, r153). Con 6, la Procesión llega estés donde estés. Volver con Ruido 3+ sube el Rastro también desde el barrio del refugio, no solo desde uno vecino (el simulador ya lo hacía así).
- **La Fiebre** (r131, r191): **toda** Fiebre sube cada alba, venga de una mordida o de un arañazo. Antes decía «cada mordido».
- **Reparar** (r143): en el refugio, como dice r206; no hace falta Taller.
- **Tablas de encuentro** (r153): menos de 2 cuenta como 2 (Tu esquina, e003, e067 y otras restan).
- **Los palos** (r132): la columna Leve o Fuerte se tira con 1d6. e020, e030 y e050 no lo decían.
- **Rendición de vivos** (r147): `[Labia]`, con 7+ se rinden. No tenía resultado.
- **Comercio** (r166): un objeto (Pilas, Binoculares…) vale 2. Los objetos no tenían precio.
- **Ánimo** (r194): solo lo lleva tu protagonista. Varios eventos daban Ánimo «a todos», pero los sobrevivientes no tienen casilla de Ánimo. Los rasgos Insomne y Frío se reescribieron para que su efecto sirva en un sobreviviente.
- **Necesitan ayuda** (r302): primero se tira si está mordido y después se elige. Antes la tirada estaba dentro de una opción.
- **Pasillo** (r331): cerrar una puerta te saca del combate; un Bruto la rompe en 1d6 rondas. La frase anterior se leía al revés. La ficha del Bruto (e726) dice lo mismo.
- **Escalera** (r332): si estás abajo, su primer avance los deja Encima. Antes decía que empezaban Encima, y eso contradecía a e144 (Lejos) y e281 (Cerca).
- **Trampas en la Noche 40** (e741): cada una suma una sola vez, como dice r222. El Alambre «no se gasta» solo en los sondeos.

## Eventos inalcanzables o mal enlazados

- **e697** (el Destacamento viene a buscarte) no tenía ningún camino: e039 decía «su entrada te manda a su ataque», pero las visitas no lo hacían. Ahora e039 enlaza los cuatro castigos.
- **e817** (La última pared, arco de La obra) no se enlazaba desde ningún lado. Ahora lo enlaza el Último Cuarto (e761).
- **e697, opción 1:** «−2 Reputación» estando en −3 no hacía nada. Ahora la Reputación vuelve a −2, como pasa con las otras facciones.

## Objetos que no se conseguían o no servían

- **Binoculares:** no aparecían en ningún lugar. Se consiguen cambiando.
- **Kit de recarga:** lo pedía la receta, pero no estaba en ningún lado, y e745 decía que la receta se aprendía en la Armería Gómez sin que e302 lo dijera. Ahora está en e302, con la receta.
- **Olla a presión:** solo la tenía el oficio Cocina. Ahora también está en el Shopping (e342).
- **La insulina** (e803): «guardarla por si un evento trae a un diabético», pero ningún evento lo hacía. Ahora la opción es ir otro día, con más riesgo de llegar tarde.

## Ambigüedades en eventos

- **e015:** los barrios del humo se marcan con una nube y no están «en llamas» (r159). El primer día es «el día 1 de la cuarentena», y la radio empieza el jueves, como dice la cronología.
- **e054:** el número de la Señora sale de 1d6 (con 5–6 no coincide). Antes no había forma de saberlo.
- **e076:** la Chillona: si muere en la primera ronda, el frente pierde 1; si no, 2.
- **e089:** el modo Lobo solo ya resta 2 oleadas; no se suman otras 2.
- **e101 y e042:** la Desventaja de Sigilo del grupo empieza con más de 4 personas en los dos (e101 decía 6).
- **e283 y e342:** la olla y la plancha suman en las noches de Cocina; la plancha, una vez.
- **e390:** el atardecer da Ánimo solo a vos.
- **e413 y e414:** con el oso libre, el 12 de la tabla es él, no e413.
- **e482:** los Bomberos hacen la Obra con tus materiales.
- **e552:** la ametralladora en la torreta tiene +1 a la prueba.
- **e577, e435 y e900:** el Señuelo grande tiene que **seguir andando** fuera del barrio del refugio. Se sacó `EL_RECITAL` de la lista, porque sus parlantes se queman; ahora tiene su línea en «Lo que Tolme recuerda» (e955).
- **e620:** con un 6, la hija de Gustavo viene con los demás (se anota `LA_HIJA_DE_GUSTAVO`).
- **e910:** «el de Ánimo más bajo» pasa a ser el más Cobarde (si no hay, uno al azar).
- **e912 y e960:** a Tigre Dos se la llama con la Radio (e759); la radio a pilas solo escucha.
- **Mordidas:** el nombre de la tabla va siempre con mayúscula.

## Revisado y sin cambios

- Las conexiones del mapa son simétricas en las tres capas.
- El índice de Marcas coincide con el libro: cada Marca está con todas sus entradas.
- Las dos Marcas que el verificador da como «sin consultar» (`CORIA_ESPERA`, `LA_LUZ_DE_SAN_ROQUE`) se consultan en la misma entrada que las anota.
- `UN_NIDO` (e119) y `EL_NIDO` (e332) son dos nidos distintos, y el segundo lo dice.
- El Asma empieza sin inhalador a propósito.
- La amputación sirve solo para mordidas: una Fiebre por arañazo se frena con Antivirales.
