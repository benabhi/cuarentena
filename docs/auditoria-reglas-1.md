# Cuarentena · Auditoría de reglas 1

17 de noviembre de 2026. Versión editable: https://claude.ai/artifact/1eMm68xJiDyjG8yQPUDnnD

## Resumen

Encontré **39 puntos flojos**: 9 reglas rotas o explotables, 16 ambigüedades, 7 desequilibrios medidos y 7 contradicciones o textos muertos. No toqué el libro: cada punto trae una propuesta y vos elegís cuáles se aplican.

Lo más grave son dos cosas. **Retroceder no sirve** tal como está escrito (r142), y **la Noche 40 casi no mata**: de quienes llegan al día 40, gana el 97 %.

**Qué revisé:** r001–r225, las plantillas r300–r336, las recetas e740–e761, el resumen y las hojas de los Apéndices, y los eventos que las reglas nombran (e072, e080–e089, e100, e560, e570, e900–e905).

**Simulador:** 1.500 partidas con protagonistas al azar. Llegan al amanecer el **65,7 %**; el día medio de muerte es el 15 y el combate causa el 27 % de las muertes. Ojo: el simulador juega prudente. No usa Retroceder, pone un solo cocinero y desarma como mucho 10 muebles, así que los exploits de abajo no están en ese 65,7 %.

## Reglas rotas o explotables (prioridad alta)

| # | Regla | Problema | Propuesta |
| --- | --- | --- | --- |
| 1 | r141, r142 · Retroceder | Los Callados retroceden un paso y al final de la ronda avanzan otro: quedan donde estaban. Desde Cerca o Encima nunca salís, y el que estaba Encima te muerde igual. Solo sirve si ya estaban todos Lejos. El cañón de agua del catálogo sí dice «no avanzan esa ronda», lo que confirma la lectura. | Con 10+ y con 7–9, «retroceden un paso y no avanzan esa ronda». Corregir también el resumen de los Apéndices. |
| 2 | r181 · Puesto Cocina | No tiene tope de personas. Con 4 cocineros: +4 Moral por noche y el grupo come 4 Víveres menos (8 con La olla grande, el doble con Moral 8+). | Una persona por noche en la Cocina, como la Huerta tiene dos. |
| 3 | e748 · Trampa para palomas | Sin límite de cantidad: cada una da medio Víver por noche para siempre. Diez trampas son 5 Víveres por noche. | Una por refugio (dos si tiene azotea y patio). |
| 4 | r165 · Desarmar muebles en el refugio | No dice cuántos muebles hay: 2 Madera por cada ◷ 1, sin fin. El simulador lo corta en 10 porque el texto no lo hace. | Casillas de muebles en la Hoja del refugio (por ejemplo 6), o juntarlo con «el refugio mismo». |
| 5 | r222, r224 · Molotov y Reforzar en la Noche 40 | Cada Molotov suma 3 sin tope: 10 Molotovs son +30 a un frente. Reforzar da +2 por material, el doble que la Obra. | Cada defensor tira como mucho 1 Molotov por oleada. Reforzar da +1, o +2 solo con Ojo de obra. |
| 6 | r221, r222 · Dificultad de la Noche 40 | Muere en la Noche 40 el 1,8 % de las partidas; con 3 oleadas más, el 4,8 %. Los frentes llegan al 10 y la oleada media es 2d6 + 3. | Subir la Fuerza o que aguantar cueste 2 de Resistencia (ver el orden recomendado). |
| 7 | r166 · Comerciar | Los «uno más» se apilan sin tope (10+, Reputación +2, El fiado, barrio Mercado): hasta +4 por cambio, y con comerciantes que se repiten crece sin fin. | Como mucho «uno más» por cambio. |
| 8 | r161 · Revisar sin stock | Un lugar vacío se revisa sin límite a ◷ 1: 1 en 6 de pista, de sobreviviente y de material cada vez. | La sorpresa sin stock, una vez por lugar y por día. |
| 9 | r156, r174 · Señuelo y Rastro | Cada Procesión desviada «lejos» baja 1 el Rastro; con un señuelo por día queda en 0. «Lejos» no está definido. | Como mucho −1 Rastro por semana así; «lejos» es a dos barrios o más del refugio. |

## Ambigüedades (prioridad media)

| # | Regla | Qué no dice | Propuesta |
| --- | --- | --- | --- |
| 10 | r145, r154 · Ruido | «Al llegar a 3»: ¿y si salta de 2 a 4? Tras la Procesión de Ruido 6 no dice a cuánto vuelve. | «Al llegar o pasar». Después de e100, el Ruido queda en 3. |
| 11 | r143 · 7–9 contra especiales | «Matás la mitad», pero un especial tiene Aguante. | «Hacés la mitad del Daño, hacia arriba». |
| 12 | r147 · Vivos que «se cubren» | No dice qué efecto tiene. | «Esa ronda no disparan y tus ataques de Lejos tienen −1». |
| 13 | r164 · Cargar de más | No dice cuánto ni desde cuándo. | Hasta 4 casilleros de más, con Desventaja. |
| 14 | r182, r193, r194 · Comida caliente | No dice qué es; si el puesto Cocina lo es, da +2 Moral. | «La noche que alguien hace Cocina, el grupo come caliente»; el +1 Moral es el mismo. |
| 15 | r158 · Salir de noche | Qué pasa al terminar las 3 horas y si dormiste. | «Al terminar volvés (con +2 en la tabla). Esa noche no dormís». |
| 16 | r133, r158 · Volver a oscuras | «El viaje cuesta igual» sin horas; ¿hay puesto? | Usa tu acción de la noche: llegás sin puesto. |
| 17 | r126 · Maña repetida | «Elegí otra»: ¿de qué lista? | Otra de la misma Habilidad si la hay; si no, 3 casillas de práctica. |
| 18 | r149, r190 · Muriendo y solo | ¿Podés curarte vos? | Sí, con Desventaja. |
| 19 | r186 · Sobrevivientes heridos | No curan solos nunca. | El Descanso borra 1 Herida a un sobreviviente. |
| 20 | r155, r156 · «La más cercana» | Sin desempate. | Número más bajo de la tabla r155, o 1d6. |
| 21 | r221, e072 · Frentes de la Noche 40 | Dos tiradas al mismo frente; frente que no existe. | Toda la Fuerza ahí; el que no existe va a la Puerta. |
| 22 | r183 · PROMESA_ | No hay plazo. | «Antes del fin de la semana siguiente». |
| 23 | r172, e741 · Valor de las trampas | r172 resta 1; e741 resta su valor. | Que mande e741. |
| 24 | r144 · Protección | «Ninguna resta más de 2»: ¿cada una o todas? | «Entre todas, como mucho −2». |
| 25 | r105 · Asma | «La primera vez lo encontrás» choca con «cada vez que lo revisás». | Elegir una. |

## Equilibrio medido con el simulador (prioridad media)

| # | Dónde | Qué se mide | Propuesta |
| --- | --- | --- | --- |
| 26 | r102 · Oficios | Seguridad 81 %, Reparto 75 %, Comercio y Deporte 72 %, contra Mecánica 56 %, Docencia 57 %, Electricidad 59 %. | Mejorar Puente, Cables y Lista de presentes y medir otra vez. |
| 27 | e440–e490 · Refugios | Cuartel 78 %, Parroquia 61 %. El Cuartel empieza con Cisterna y Vigía y un frente menos. | Quitarle una instalación o una Resistencia. |
| 28 | r102, r151 · Atajos | Azoteas a ◷ 1, sin Ruido y con encuentro 1 en 6. | Mantener Soga o Tablones, o encuentro con 1–2. |
| 29 | r103 · Barrios | Puerto 74 %, Lomas 72 %, contra Sanidad y Casco 62 %. | Subir un poco Sanidad y El Casco. |
| 30 | r105 · Vicio | Se supera el día 14 sin pagar casi nada. | «Pagar tres fechas seguidas», o abstinencia más dura. |
| 31 | r137 · Sin baraja | Figuras en promedio el día 29 (con baraja 20,5); 17 % en la primera mitad. | Primer dado 1–3: cartas 1–5; 4–6: 6, 7, Sota, Caballo, Rey; 6 en el segundo, de nuevo. |
| 32 | e570 · La purga | Sale en el 1 % de las partidas. | Darle una salida buena o un costo a mover el dado. |

## Contradicciones y texto muerto (prioridad baja)

| # | Regla | Problema | Propuesta |
| --- | --- | --- | --- |
| 33 | r303 · Rumores | El Tesoro ya está en el mapa desde r108. | «Qué protege un Tesoro» o un lugar con stock lleno. |
| 34 | r300 · Postura Pelear | Promete atacar primero; con 1 y 3 manda a r305, donde empiezan ellos. | Con 1 y 3, r312. |
| 35 | Apéndices · Resumen Noche 40 | «Aliados (3)» no coincide con e905. | «Aliados (e905)». |
| 36 | e089 · Se rompe todo | «La mitad del grupo» vs 1–3 por persona. | Sacar «la mitad del grupo». |
| 37 | r186 · MORDIDO_EN_SECRETO_ | Lo anotás vos: lo sabés. | Hacer regla la variante r213 o revelarlo por evento. |
| 38 | r205, r003 · Saetas | Una sola saeta nunca se gasta. | «La mitad, hacia abajo». |
| 39 | r210 · Toque de queda | No ajusta lo que se paga por semana ni el Vicio. | «Una semana son cinco días». |

Además, faltan r184 y r201 en la numeración.

## Orden recomendado para aplicar

1. Puntos 1 a 9. Después, que el simulador use Retroceder y varios cocineros, y medir de nuevo.
2. Puntos 10 a 25 y 33 a 39, compensando en la misma página para no mover la maqueta.
3. Punto 6 con el simulador: A) Fuerza = 2d6 + el doble del número de la oleada; B) aguantar cuesta 2; C) 2d6 + número + 1 y aguantar cuesta 2. Meta sugerida: que muera entre el 8 y el 12 % de quienes llegan al día 40.
4. Puntos 26 a 32, midiendo cada cambio.
