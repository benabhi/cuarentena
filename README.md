# Cuarentena

*Cuarenta días encerrados. Después, la Marea.*

Juego de rol en solitario de supervivencia en una ciudad sellada. Un libro de **UtopIA**.

> **Estado:** libro terminado y auditado en cuatro rondas ([`docs/auditoria-iterativa.md`](docs/auditoria-iterativa.md)): texto en [`libro/`](libro/), sin enlaces rotos ni Marcas sueltas (`python3 herramientas/verificar.py`); simulador: 66 % de las partidas llegan vivas al día 41 con protagonistas al azar (`python3 herramientas/simulador.py`). **`Cuarentena.pdf`:** A4, 200 páginas, sin títulos huérfanos; quedan 14 viñetas como recuadros «IMAGEN PENDIENTE» hasta hacerlas en Gemini ([`docs/arte.md`](docs/arte.md)). **App jugable** en [`app/`](app/), probada de principio a fin ([`app/README.md`](app/README.md)).

Este repositorio va a contener todo lo necesario para recrear el manual en PDF (A4, 200 páginas) y la app para jugarlo.

- **Manual:** [`Cuarentena.pdf`](Cuarentena.pdf) (A4, 200 páginas). Se rearma con `python3 construir_pdf.py`.
- **App:** [benabhi.github.io/cuarentena](https://benabhi.github.io/cuarentena/): la mesa de juego, con el libro adentro, modo aprendiz y herramientas opcionales.
- **Arte:** todas las ilustraciones salen de un único chat de Gemini dedicado a este libro: https://gemini.google.com/app/f5efedcbdffae166 (estilo, reglas y lista de pendientes en [`docs/arte.md`](docs/arte.md)).

## Estructura

```
cuarentena/
├── README.md             este archivo
├── requirements.txt      dependencias de Python
├── construir_pdf.py      genera el manual (Cuarentena.pdf)          
├── estilo.css            hoja de estilos del manual                  
├── libro/                el texto del juego en Markdown, en orden de lectura
│                         (rNNN = reglas, eNNN = eventos)
├── maqueta/              partes, cajas, iconos, mapa, papel y cortes  
├── arte/                 ilustraciones del libro
│   └── marca/            logo de la editorial (UtopIA)
├── fuentes/              tipografías locales con licencia libre
├── herramientas/         verificación y análisis (heredadas de Caribdis, a adaptar)
├── app/                  la app para jugar con el libro (página estática)
├── docs/                 plan de diseño, biblia del mundo, auditorías
├── .github/workflows/    publica la app en GitHub Pages
└── dist/                 salidas que no se versionan
```

## Tipografías

Spectral (texto), Anton (títulos), PT Sans Narrow (rótulos) e IBM Plex Mono (Marcas), con SIL Open Font License; Special Elite (documentos del mundo), Apache 2.0. Las licencias están en `fuentes/`.
