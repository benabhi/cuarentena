# Simulación de Cuarentena (fase 5)

*`herramientas/simulador.py` · 8000 partidas (2000 por protagonista) · semilla 41 · 10 de noviembre de 2026*

## Resultado

| Protagonista | Llegan al amanecer | Salvados según el Secreto | Sobrevivientes al amanecer | Día medio de muerte |
|---|---|---|---|---|
| La Enfermera | 60,4 % | 59,3 % | 4,0 | 20,3 |
| El Albañil | 59,3 % | 58,0 % | 4,4 | 17,6 |
| La Agente | 63,9 % | 62,0 % | 4,3 | 20,8 |
| La Repartidora | 59,2 % | 57,9 % | 4,7 | 21,5 |
| **Media** | **60,7 %** | **59,3 %** | 4,4 | 20,1 |

La meta era **55–65 %** de partidas que llegan vivas al día 41, un poco más difícil que Caribdis (70–75 %). La meta se cumple, y las cuatro protagonistas quedan dentro de 5 puntos entre sí.

**Por refugio** (media de las cuatro): Comisaría 64 % · Escuela 65 % · Cuartel 62 % · Parroquia 61 % · Sarmiento 61 % · Supermercado 52 %. El Supermercado queda como el refugio difícil, como dice su ficha: «todo el barrio sabe que es un supermercado».

**Cómo se muere** (porcentaje de todas las partidas):

| Causa | Partidas |
|---|---|
| Combate | 20–25 % |
| Eventos | 1–10 %, según la protagonista (la Repartidora tiene 4 casillas de Heridas) |
| Noche 40 | 2–7 % |
| Fiebre | 2–4 % |
| Procesión | 0,5–2 % |
| Hambre | alrededor de 1 % |

**Finales de los que llegan:** los seis Secretos salen parejos, entre 9 % y 11 % cada uno, con éxodo en 7–8 %. La ceniza (el Secreto de la purga, cuando no se preparó la salida) queda en 2–3 %.

## Qué cambió en el libro

El primer simulador fiel al texto daba **24 %**. Más de la mitad de las muertes eran peleas contra 4 a 6 Callados comunes, con la salud llena. Cambios de reglas, en orden de peso:

1. **r144 · Mordidas.** Ahora, como mucho **dos** Callados te atacan por ronda (antes tres). La tabla queda así: 1–3 nada, 4–5 golpe, 6 «los dientes». Con 6 se tira otro 1d6: 1–3 es arañazo y 4–6 es mordida. Se actualizaron r148 (de a dos por persona), el prólogo, el resumen de los Apéndices, el Casco y el Bruto, donde el golpe ahora es «un 4 o un 5».
2. **r165 · Desarmar afuera.** En una Vivienda, una Oficina o un Comercio podés romper los muebles al revisar: 2 Madera por persona y +1 Ruido. Sin esto, la Madera alcanzaba apenas para las barricadas y el refugio llegaba a la Noche 40 con los frentes en 1–4. Solo esta regla suma unos 17 puntos.
3. **r145 · Ruido 3.** Ahora llegan Callados ×**1d3** (antes 1d6).
4. **r142 · Esconderte.** Con 6−, los Callados avanzan **un** paso (antes dos).
5. **r192 · ¿Dónde te mordió?** Nueva tirada de 1d6: brazo, pierna, hombro (con Desventaja) o cuello. Con 6 no se puede amputar.
6. **r181 · Huerta.** Como mucho dos personas por noche.
7. **e450 · Supermercado.** Ventanas 3 (antes 1), Rastro inicial 2 (antes 3) y «Todos saben» una vez por Etapa (antes dos veces).

`herramientas/verificar.py` sigue limpio después de los cambios: 0 enlaces rotos, 0 Marcas sueltas.

## Qué juega el simulador

- **Lee el libro.** Saca de ahí las tablas de barrio, los 65 lugares con su tipo y su stock, las fichas de refugio y la Baraja.
- **Resuelve los eventos.** Un intérprete aproximado lee las pruebas, las ramas, los recursos, los combates y los saltos.
- **Programado a mano**, siguiendo r100–r225:
  - el día, el saqueo (r162) y los combates;
  - caer Muriendo y que te rescaten (r190);
  - las Reservas del grupo (r131) y la Fiebre con la amputación;
  - el Rastro, con la semana sin salir de noche y mover la entrada;
  - los puestos, los sondeos y las crisis;
  - las recetas básicas: armadura de revistas, vendas hervidas, bate, barricadas y trampas;
  - las instalaciones, la Noche 40 y el día 41.
- **Cómo decide el jugador automático:**
  - Elige las opciones por valor esperado.
  - Se esconde cuando los Callados son más de los que puede matar.
  - Rodea las Procesiones y vuelve por donde vino cuando se cruza una.
  - Sale acompañado si puede y busca gente cuando está solo.
  - Guarda Sujeción para el Último Cuarto.
- **Lo que no juega:** casi no sigue Marcas ni arcos, no usa el Subsuelo ni los Señuelos y no comercia. Un jugador humano juega mejor, así que el número real debería quedar unos puntos arriba.

## Para la auditoría

- **El Rastro se satura.** Llega al amanecer en ~9,3, así que la Noche 40 casi siempre tiene 6 oleadas. Conviene revisar si hace falta otra forma de bajarlo para que sea una decisión.
- **La Fiebre mata poco** (2–4 %). Se muerde ~0,2 veces por partida. Si se quiere más presión de la plaga, conviene subirla en la Etapa III–IV con los especiales, no en la tabla base.
- **Falta comida seguido.** Hay ~30–40 faltantes por partida, porque los grupos grandes comen más de lo que da el saqueo. Funciona como presión, pero hay que vigilar que no sea tedioso.
- **Lo peligroso son las salidas de la primera semana.** Muchas muertes en combate pasan en los días 1–9, saliendo solo. Al principio del libro sirve una caja de ayuda: «la primera semana, no salgas solo».
