# Arte y maqueta

## El arte

**Chat de Gemini del libro (usar siempre este):** https://gemini.google.com/app/f5efedcbdffae166

**Estilo:** linograbado / aguafuerte impreso en risografía a dos tintas: negro carbón y amarillo de señalización sobre papel crema, con grises de trama. Sin letras en ninguna imagen. Nada de marrones ni fuego naranja.

**Regla de los Callados (pedido del autor, 2026-11-10):** nunca deben parecer gente viva. Siempre de pie, rígidos y erguidos, brazos colgando a los costados, cabeza ladeada, piel gris, ojos vacíos sin pupila, ropa rota y manchada, a veces descalzos. Nunca sentados, apoyados en una pared ni en poses naturales: inquietan por su quietud de maniquí. Repetirlo en cada pedido. El Casco, la Fabril y Sanidad se rehicieron por esto.

**Revisar siempre** que la escena tenga sentido físico (la escalera de las Azoteas tiene que apoyar en los dos techos; Gemini tiende a retocar la imagen anterior en vez de hacer una nueva, así que hay que pedirle «una imagen nueva desde cero»).

**Formatos:** bandas de capítulo y de barrio 5:2 (1632×656), láminas verticales 2:3 (848×1264), la doble de la Marea apaisada. Cómo se bajan del navegador y se pegan: `herramientas/pegar_capturas.py`.

### Hecho (61)

- Portada, contratapa, láminas de parte (El mundo, Reglas, Eventos, Apéndices), la doble de la Marea (`d-marea.jpg`).
- Los 12 barrios (`b-casco` … `b-perimetro`) y las 17 bandas de capítulo.
- Láminas de capítulo: Los refugios, El Secreto, El catálogo.
- Viñetas: las 12 fichas de infectados y mochila, radio, ventana, cocina, tanques, colectivo, guardia, taller, perro.

### Pendiente (14, hoy son recuadros «IMAGEN PENDIENTE»)

Se hacen en el chat de Gemini del libro cuando el Chrome con la extensión esté conectado. Cada una se genera
como viñeta 3:2 (1264×848), se guarda con el mismo nombre en `arte/` y se rearma el PDF (no hace falta
borrar `maqueta/cortes.json`: el tamaño del recuadro no cambia).

| Archivo | Qué es | Pedido sugerido |
|---|---|---|
| `v-farmacia.jpg` | viñeta 3:2 | una farmacia saqueada: góndolas volcadas, cruz verde apagada, cajas de remedios en el piso |
| `v-bicicleta.jpg` | viñeta 3:2 | una bicicleta con alforjas de lona apoyada en una persiana baja |
| `v-huerta.jpg` | viñeta 3:2 | huerta en macetas y bidones cortados en una azotea, con un balde de agua |
| `v-latas.jpg` | viñeta 3:2 | latas de conserva contadas y apiladas en un estante, con un cuaderno de inventario |
| `v-fogata.jpg` | viñeta 3:2 | una fogata chica en un tambor de aceite dentro de un patio, sobrevivientes de espaldas |
| `v-cementerio.jpg` | viñeta 3:2 | bóvedas del cementerio entre árboles, un Callado de pie, rígido y gris, entre las tumbas |
| `v-hospital.jpg` | viñeta 3:2 | pasillo de hospital con camillas abandonadas y una puerta de guardia trabada con cadenas |
| `v-escalera.jpg` | viñeta 3:2 | una escalera de mano apoyada entre dos techos, firme en los dos bordes, sobre un pasaje |
| `v-generador.jpg` | viñeta 3:2 | un generador a nafta en un sótano, cables colgando y un bidón al lado |
| `v-barricada.jpg` | viñeta 3:2 | una puerta de pasillo trabada con muebles apilados, vista desde adentro |
| `v-bidones.jpg` | viñeta 3:2 | bidones de agua llenos y numerados con fibrón contra una pared de azulejos |
| `v-velas.jpg` | viñeta 3:2 | velas consumidas en platitos sobre una mesa, un cuaderno abierto y un reloj parado |
| `v-changuito.jpg` | viñeta 3:2 | un changuito de supermercado cargado de latas y una bolsa de garrafa, en una vereda vacía |
| `v-candado.jpg` | viñeta 3:2 | una cadena con candado en una reja, con marcas de pintura de una facción |

Cada viñeta es una imagen nueva del tema, nunca un recorte de una lámina.

## La maqueta

- Misma letra y densidad que Caribdis (Spectral 8,9 pt), compuesta a 170×240,4 mm y ampliada a A4. Títulos en Anton, rótulos en PT Sans Narrow, documentos del mundo en Special Elite, Marcas en IBM Plex Mono.
- **Exactamente 200 páginas.** El constructor cuenta las del libro y completa con hojas del «Diario de la cuarentena» (hoy, las que falten hasta 200).
- Los barrios y los capítulos con banda siguen en la misma página que lo anterior en vez de saltar a una nueva (así bajó de 213 a 200). Los capítulos con lámina, los oscuros y los de tres columnas siguen abriendo página.
- En el catálogo (tres columnas), las tablas de cuatro columnas o más van a todo el ancho.
- Un título de grupo (como «Objetos y protección») no deja una marca de remate antes del bloque que lo sigue: así no queda huérfano al pie.
- Las viñetas de remate no se repiten nunca (el constructor lleva la cuenta en `USADAS`); fuera de las reglas, un hueco de 50 mm o más lleva viñeta.
- Huecos al final de sección: viñeta (casi siempre), alguna cita espaciada o, en las reglas, una franja de consulta rápida. Nunca ornamentos con frases.
- Para rearmar: `python3 construir_pdf.py` (borrar `maqueta/cortes.json` si cambió el texto, para que vuelva a fijar los cortes de columna).
