# Arte y maqueta

## El arte

**Chat de Gemini del libro (usar siempre este):** https://gemini.google.com/app/f5efedcbdffae166

**Estilo:** linograbado / aguafuerte impreso en risografía a dos tintas: negro carbón y amarillo de señalización sobre papel crema, con grises de trama. Sin letras en ninguna imagen. Nada de marrones ni fuego naranja.

**Regla de los Callados (pedido del autor, 2026-11-10):** nunca deben parecer gente viva. Siempre de pie, rígidos y erguidos, brazos colgando a los costados, cabeza ladeada, piel gris, ojos vacíos sin pupila, ropa rota y manchada, a veces descalzos. Nunca sentados, apoyados en una pared ni en poses naturales: inquietan por su quietud de maniquí. Repetirlo en cada pedido. El Casco, la Fabril y Sanidad se rehicieron por esto.

**Revisar siempre** que la escena tenga sentido físico (la escalera de las Azoteas tiene que apoyar en los dos techos; Gemini tiende a retocar la imagen anterior en vez de hacer una nueva, así que hay que pedirle «una imagen nueva desde cero»).

**Formatos:** bandas de capítulo y de barrio 5:2 (1632×656), láminas verticales 2:3 (848×1264), la doble de la Marea apaisada. Cómo se bajan del navegador y se pegan: `herramientas/pegar_capturas.py`.

### Hecho (37)

- Portada, láminas de parte (El mundo, Reglas, Eventos), la doble de la Marea (`d-marea.jpg`).
- Los 12 barrios (`b-casco` … `b-perimetro`).
- Las 17 bandas de capítulo (`b-leer`, `b-protagonista`, `b-prueba`, `b-combate`, `b-ciudad`, `b-refugio`, `b-ejemplo`, `b-taller`, `b-prologo`, `b-baraja`, `b-procesion`, `b-subsuelo`, `b-azoteas`, `b-tesoros`, `b-sobrevivientes`, `b-facciones`, `b-historias`).
- Láminas de capítulo: Los refugios, El Secreto, El catálogo.

### Pendiente (12, hoy son carteles «IMAGEN PENDIENTE»)

Se cortó la cuota de imágenes de Gemini el 2026-11-10. Faltan:

| Archivo | Qué es | Pedido sugerido |
|---|---|---|
| `l-apendices.jpg` | lámina de la parte Apéndices, 2:3 | mesa de trabajo vista desde arriba: plano con chinches, cuaderno de inventario, baraja española, dados, walkie-talkie, linterna |
| `contratapa.jpg` | contratapa, 2:3 | la Marea llegando al muro del Perímetro de noche, vista desde una azotea |
| `v-mochila.jpg` | viñeta 4:3 | una mochila abierta con lo justo: latas, linterna, cinta, una barreta |
| `v-radio.jpg` | viñeta 4:3 | una radio portátil en la AM 870 junto a una vela |
| `v-ventana.jpg` | viñeta 4:3 | ventana tapiada vista de adentro; entre las tablas, un Callado afuera |
| `v-cocina.jpg` | viñeta 4:3 | cocina del refugio: olla en un calentador, bidones, latas contadas |
| `v-callado.jpg` | viñeta 4:3 | retrato de un Callado de pie, quieto, mirando arriba |
| `v-tanques.jpg` | viñeta 4:3 | tanques de agua en una azotea con una canilla improvisada |
| `v-colectivo.jpg` | viñeta 4:3 | colectivo cruzado en una avenida, puertas abiertas |
| `v-guardia.jpg` | viñeta 4:3 | sobreviviente de guardia en un balcón de noche, con un termo |
| `v-taller.jpg` | viñeta 4:3 | herramientas colgadas y una trampa a medio armar (distinta de la banda El taller) |
| `v-perro.jpg` | viñeta 4:3 | un perro flaco que acompaña al grupo, echado junto a una puerta |

Cada viñeta es una imagen nueva del tema, nunca un recorte de una lámina.

## La maqueta

- Misma letra y densidad que Caribdis (Spectral 8,9 pt), compuesta a 170×240,4 mm y ampliada a A4. Títulos en Anton, rótulos en PT Sans Narrow, documentos del mundo en Special Elite, Marcas en IBM Plex Mono.
- **Exactamente 200 páginas.** El constructor cuenta las del libro y completa con hojas del «Diario de la cuarentena» (hoy, 198 + 2).
- Los barrios y los capítulos con banda siguen en la misma página que lo anterior en vez de saltar a una nueva (así bajó de 213 a 200). Los capítulos con lámina, los oscuros y los de tres columnas siguen abriendo página.
- En el catálogo (tres columnas), las tablas de cuatro columnas o más van a todo el ancho.
- Un título de grupo (como «Objetos y protección») no deja una marca de remate antes del bloque que lo sigue: así no queda huérfano al pie.
- Huecos al final de sección: viñeta (casi siempre), alguna cita espaciada o, en las reglas, una franja de consulta rápida. Nunca ornamentos con frases.
- Para rearmar: `python3 construir_pdf.py` (borrar `maqueta/cortes.json` si cambió el texto, para que vuelva a fijar los cortes de columna).
