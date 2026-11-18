# Cuarentena

*Cuarenta días encerrados. Después, la Marea.*

Juego de rol en solitario de supervivencia en una ciudad sellada. Un libro de **UtopIA**.

> **Estado:** libro terminado y auditado en cuatro rondas ([`docs/auditoria-iterativa.md`](docs/auditoria-iterativa.md)): texto en [`libro/`](libro/), sin enlaces rotos ni Marcas sueltas (`python3 herramientas/verificar.py`); simulador: 66 % de las partidas llegan vivas al día 41 con protagonistas al azar (`python3 herramientas/simulador.py`). **`Cuarentena.pdf`:** A4, 200 páginas, sin títulos huérfanos, con todo el arte terminado ([`docs/arte.md`](docs/arte.md)).

Este repositorio contiene todo lo necesario para recrear el manual en PDF (A4, 200 páginas).

- **Manual:** [`Cuarentena.pdf`](Cuarentena.pdf) (A4, 200 páginas). Se rearma con `python3 construir_pdf.py`.
- **Manual Print-Friendly (blanco y negro, ahorro de tinta):** [`Cuarentena_Print_Friendly.pdf`](Cuarentena_Print_Friendly.pdf) ([descarga directa](https://github.com/benabhi/cuarentena/raw/main/Cuarentena_Print_Friendly.pdf)). Se genera desde el manual con `python3 generar_print_friendly.py`, el mismo sistema que Caribdis: las 200 páginas y los enlaces quedan iguales, sin papel ni fondos negros, con el arte en grises claros.
- **Arte:** todas las ilustraciones salen de un único chat de Gemini dedicado a este libro: https://gemini.google.com/app/f5efedcbdffae166 (estilo, reglas y lista de imágenes en [`docs/arte.md`](docs/arte.md)).

## Estructura

```
cuarentena/
├── README.md             este archivo
├── requirements.txt      dependencias de Python
├── construir_pdf.py      genera el manual (Cuarentena.pdf)
├── generar_print_friendly.py  genera el manual en blanco y negro (Cuarentena_Print_Friendly.pdf)
├── estilo.css            hoja de estilos del manual                  
├── libro/                el texto del juego en Markdown, en orden de lectura
│                         (rNNN = reglas, eNNN = eventos)
├── maqueta/              partes, cajas, iconos, mapa, papel y cortes  
├── arte/                 ilustraciones del libro
│   └── marca/            logo de la editorial (UtopIA)
├── fuentes/              tipografías locales con licencia libre
├── herramientas/         verificación y análisis (heredadas de Caribdis, a adaptar)
├── docs/                 plan de diseño, biblia del mundo, auditorías
└── dist/                 salidas que no se versionan
```

## Tipografías

Spectral (texto), Anton (títulos), PT Sans Narrow (rótulos) e IBM Plex Mono (Marcas), con SIL Open Font License; Special Elite (documentos del mundo), Apache 2.0. Las licencias están en `fuentes/`.
