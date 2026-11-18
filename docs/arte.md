# Arte y maqueta

## El arte

**Chat de Gemini del libro (usar siempre este):** https://gemini.google.com/app/f5efedcbdffae166

**Estilo:** linograbado / aguafuerte impreso en risografía a dos tintas: negro carbón y amarillo de señalización sobre papel crema, con grises de trama. Sin letras en ninguna imagen. Nada de marrones ni fuego naranja.

**Regla de los Callados (pedido del autor, 2026-11-10):** nunca deben parecer gente viva. Siempre de pie, rígidos y erguidos, brazos colgando a los costados, cabeza ladeada, piel gris, ojos vacíos sin pupila, ropa rota y manchada, a veces descalzos. Nunca sentados, apoyados en una pared ni en poses naturales: inquietan por su quietud de maniquí. Repetirlo en cada pedido. El Casco, la Fabril y Sanidad se rehicieron por esto.

**Revisar siempre** que la escena tenga sentido físico (la escalera de las Azoteas tiene que apoyar en los dos techos; Gemini tiende a retocar la imagen anterior en vez de hacer una nueva, así que hay que pedirle «una imagen nueva desde cero»).

**Formatos:** bandas de capítulo y de barrio 5:2 (1632×656), láminas verticales 2:3 (848×1264), la doble de la Marea apaisada. Cómo se bajan del navegador y se pegan: `herramientas/pegar_capturas.py`.

### Hecho (75, todas)

- Portada, contratapa, láminas de parte (El mundo, Reglas, Eventos, Apéndices), la doble de la Marea (`d-marea.jpg`).
- Los 12 barrios (`b-casco` … `b-perimetro`) y las 17 bandas de capítulo.
- Láminas de capítulo: Los refugios, El Secreto, El catálogo.
- Viñetas: las 12 fichas de infectados y mochila, radio, ventana, cocina, tanques, colectivo, guardia, taller, perro.
- Viñetas de escena (2026-11-17): farmacia, bicicleta, huerta, latas, fogata, cementerio, hospital, escalera, generador, barricada, bidones, velas, changuito y candado.

**Modelo:** en el selector de Gemini usar **Pro**. Con «Respuestas rápidas» (Flash-Lite) las imágenes salen con verdes, rojos y azules o con el título escrito adentro; con Pro respetan las dos tintas. Conviene arrancar cada pedido con «Imagen NUEVA desde cero, mismo estilo exacto (linograbado y aguafuerte en risografía a dos tintas, negro carbón y amarillo de señalización sobre papel crema), apaisada 3:2, a sangre, sin marco, sin ninguna letra» y no poner el nombre de la escena en mayúsculas (Gemini lo escribe dentro de la imagen).

Cada viñeta es una imagen nueva del tema, nunca un recorte de una lámina.

### Variedad de infectados (2026-11-17, pedido del autor)

El autor notó que las bandas y viñetas repetían demasiado «Callados con la cabeza torcida». Se rehicieron 11 imágenes chicas (las de página completa no se tocaron) con infectados especiales o sin infectados. Las versiones anteriores están en `arte/originales/`.

| Imagen | Ahora |
|---|---|
| `b-mercado` | Acechadores en la cúpula del mercado |
| `b-costanera` | Ahogados en la costanera |
| `b-universidad` | un Blindado con traje |
| `b-sanidad` | dos Hinchados entre ambulancias |
| `b-lomas` | una jauría de Sabuesos |
| `b-casco` | una Chillona en la plaza |
| `b-azoteas` | un Fresco corriendo mientras cruzan un tablón |
| `b-combate` | pelea contra un Bruto |
| `b-estacion` | un Escupidor en el andén |
| `b-cementerio` | un entierro, sin infectados |
| `v-cementerio` | tumbas frescas, sin nadie |

Al pedir, «como el de la ficha que hicimos antes» ayuda a que el especial se parezca a su viñeta. Si Gemini no muestra la imagen, recargar la página (F5): a veces ya estaba hecha.

## La maqueta

- Misma letra y densidad que Caribdis (Spectral 8,9 pt), compuesta a 170×240,4 mm y ampliada a A4. Títulos en Anton, rótulos en PT Sans Narrow, documentos del mundo en Special Elite, Marcas en IBM Plex Mono.
- **Exactamente 200 páginas.** El constructor cuenta las del libro y completa con hojas del «Diario de la cuarentena» (hoy, las que falten hasta 200).
- Los barrios y los capítulos con banda siguen en la misma página que lo anterior en vez de saltar a una nueva (así bajó de 213 a 200). Los capítulos con lámina, los oscuros y los de tres columnas siguen abriendo página.
- En el catálogo (tres columnas), las tablas de cuatro columnas o más van a todo el ancho.
- Un título de grupo (como «Objetos y protección») no deja una marca de remate antes del bloque que lo sigue: así no queda huérfano al pie.
- Las viñetas de remate no se repiten nunca (el constructor lleva la cuenta en `USADAS`); fuera de las reglas, un hueco de 50 mm o más lleva viñeta.
- Huecos al final de sección: viñeta (casi siempre), alguna cita espaciada o, en las reglas, una franja de consulta rápida. Nunca ornamentos con frases.
- Para rearmar: `python3 construir_pdf.py` (borrar `maqueta/cortes.json` si cambió el texto, para que vuelva a fijar los cortes de columna).
