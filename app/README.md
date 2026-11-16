# Cuarentena · la app

La mesa de juego de Cuarentena en el navegador. Es estática: no tiene servidor, guarda las partidas en el
`localStorage` del navegador y se publica en GitHub Pages.

La app no reemplaza al libro: lo trae adentro. Muestra la entrada en juego, convierte en botones lo que se
puede tocar (pruebas, dados, Marcas, materiales, efectos, combates) y lleva las cuentas. **Nada se aplica
solo**: el botón propone y el jugador decide, como en la mesa de verdad.

## Qué hace

- **Aprender jugando.** El prólogo (e001–e015) funciona como tutorial. Con el *modo aprendiz* encendido,
  cada cosa nueva (la prueba, el combate, el alba, el sondeo, la Noche 40…) se explica una sola vez. Desde la
  portada, «Cómo se juega» resume el juego en nueve páginas.
- **Las fases del día.** Amanecer (la carta), alba (comer, Fiebre, pendientes), día (horas, viajes por
  Calle, Azoteas y Subsuelo, revisar lugares, curar, hablar, fabricar), noche (puestos, producción, sondeo,
  el grupo) y la Noche 40 oleada por oleada.
- **Herramientas opcionales** (botón de la llave): prueba suelta, dados, armar un combate, encuentro de
  barrio, botín, comerciar, curar, sondeo con su probabilidad, mover Procesiones, tablas al azar, mirar la
  próxima carta, ir a cualquier entrada y un resumen de reglas.
- **Hojas** de protagonista, refugio y grupo, el plano de Tolme y la bitácora. Todo se puede corregir a mano.
- **Dados 3D** (three.js) con dados planos de respaldo; también se puede jugar con dados físicos.

## Construir

```sh
pip install pillow
python3 app/herramientas/construir_app.py
```

El script lee el libro (`libro/*.md` → `app/datos/libro.json`), arma `app/dist/index.html` con los estilos,
el código y los datos adentro, copia three.js y las fuentes y achica el arte. Para probarla:
`python3 -m http.server -d app/dist` y abrir `http://localhost:8000`.

## Código (`app/src/`)

| Archivo | Qué tiene |
|---|---|
| `base.js` | Espacio de nombres `Q`, utilidades, tablas de creación y el guardado local |
| `dados.js` | Dados 3D y planos |
| `texto.js` | El Markdown del libro con la lectura activa (tokens) |
| `motor.js` | Las reglas, sin interfaz |
| `ui-nucleo.js` | Avisos, ventanas, bandeja de dados, pruebas, el libro y la guía |
| `ui-mesa.js` | La mesa: el evento en juego, los tokens y los asistentes por entrada |
| `ui-acciones.js` | Revisar, viajar, curar, hablar, comerciar y el combate |
| `ui-taller.js` | Recetas, fabricar, instalar y reparar |
| `ui-fases.js` | Amanecer, alba, día, noche, Noche 40 y final |
| `ui-hoja.js` | Cabecera, hojas, plano y bitácora |
| `ui-crear.js` | Portada, creación de protagonista, partidas y menú |
| `ui-herramientas.js` | Las herramientas opcionales |
| `guia.js` | Los textos del modo aprendiz y «Cómo se juega» |
| `plantilla.html`, `estilo.css` | La página y su estilo |

El botón «Descargar el manual» apunta a `Cuarentena.pdf` en la raíz del repositorio.
