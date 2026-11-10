# Recorte del texto para la maqueta

**Decisión del autor (2026-11-10):** la maqueta usa la misma letra y densidad que Caribdis. Una página de puro texto de Caribdis lleva unas 500 palabras; el manual entero, 66.300. Cuarentena tenía 117.600 palabras, que a esa densidad no entran en 200 páginas. Se recorta el texto.

**Objetivo:** unas 75.000 palabras (−36 %), con unas 15 láminas a página entera.

## Criterios

1. **Ninguna regla se pierde.** Se acorta cómo se dice, no lo que se dice.
2. **Ninguna tabla ni opción de variedad se pierde** (rejugabilidad). Se acortan sus celdas.
3. **El color se queda, pero corto.** Una entrada abre con dos o tres frases fuertes, no con un párrafo largo. Se conserva el detalle que da identidad (el cartel, el objeto raro, la voz de alguien).
4. **Un evento no repite una regla:** la nombra (r161, r221) y sigue.
5. **Sin paja de transición** («Una vez adentro, si…», «Por primera vez en años…» se conservan solo cuando cierran una escena).
6. **Los apéndices no repiten capítulos:** quedan como hojas de consulta rápida.
7. Después de cada capítulo: `verificar.py` limpio. Al final, el simulador y el índice de Marcas.

## Objetivo por capítulo

| Archivo | Antes | Objetivo |
|---|---:|---:|
| 00 portada | 364 | 300 |
| 01 mundo | 822 | 800 |
| 02 reglas básicas | 7.767 | 5.500 |
| 03 reglas avanzadas | 7.248 | 5.000 |
| 04 taller y noche | 2.385 | 1.800 |
| 05 plantillas | 1.273 | 1.100 |
| 10 prólogo | 4.705 | 3.000 |
| 11 baraja | 6.336 | 4.000 |
| 12 noche | 2.229 | 1.500 |
| 13 calle | 4.283 | 2.800 |
| 20–31 barrios (12) | 18.685 | 12.000 |
| 40 refugios | 6.225 | 3.800 |
| 50 tesoros | 3.938 | 2.500 |
| 56 secreto | 4.693 | 3.000 |
| 60 sobrevivientes | 8.787 | 5.200 |
| 66 facciones | 4.992 | 3.000 |
| 70 catálogo | 7.147 | 4.500 |
| 80 historias | 10.800 | 6.500 |
| 90 Noche 40 | 8.913 | 5.000 |
| 95 apéndices | 4.405 | 2.000 |
| 96 índice de Marcas | 1.623 | 1.400 |
| **Total** | **117.620** | **~74.700** |

## Primera pasada y medición (2026-11-10)

Primera pasada hecha en todos los capítulos: de 117.600 a **85.600 palabras** (−27 %), sin perder reglas, tablas, opciones ni Marcas (commit b5bca55).

**Medición con la letra de Caribdis.** Se compuso el texto de los dos libros con `estilo.css` de Caribdis, en dos columnas, sin arte ni rellenos:

| Libro | Palabras | Páginas de texto corrido | Libro real |
|---|---:|---:|---:|
| Caribdis | 66.300 | 149 | 200 (con arte, hojas, rellenos) |
| Cuarentena hoy | 85.600 | 202 | ~270 estimadas |

Las dos llevan unas 430 palabras por página de texto corrido, así que la cuenta es lineal: **para entrar en 200 páginas con la letra de Caribdis, Cuarentena tiene que quedar en unas 64.000 palabras**, casi lo mismo que Caribdis. Con 75.000 saldrían unas 235 páginas.
