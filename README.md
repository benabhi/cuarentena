# Cuarentena

*Cuarenta días encerrados. Después, la Marea.*

Juego de rol en solitario de supervivencia en una ciudad sellada. Un libro de **UtopIA**.

> **Estado:** texto completo en [`libro/`](libro/), recortado a unas 70.200 palabras para entrar en 200 páginas con la letra de Caribdis ([`docs/recorte.md`](docs/recorte.md)), sin enlaces rotos ni Marcas sueltas (`python3 herramientas/verificar.py`). El plan está en [`docs/plan-de-diseno.md`](docs/plan-de-diseno.md) y el mundo en [`docs/biblia-del-mundo.md`](docs/biblia-del-mundo.md). La protagonista se arma a medida en seis preguntas (r100–r107; la decisión, en [`docs/protagonista.md`](docs/protagonista.md)). Simulador (fase 7): 60,5 % de las partidas llegan vivas al día 41 con protagonistas creadas al azar, en la meta de 55–65 % ([`docs/simulacion.md`](docs/simulacion.md), `python3 herramientas/simulador.py`). Auditoría de la fase 7 aplicada entera ([`docs/auditoria.md`](docs/auditoria.md)). **Maqueta armada:** `Cuarentena.pdf`, A4, 200 páginas, con 37 ilustraciones; faltan 12 (dos láminas y diez viñetas), que hoy son carteles «IMAGEN PENDIENTE» ([`docs/arte.md`](docs/arte.md)). Lo que sigue: terminar el arte y la app.

Este repositorio va a contener todo lo necesario para recrear el manual en PDF (A4, 200 páginas) y la app para jugarlo.

- **Manual:** [`Cuarentena.pdf`](Cuarentena.pdf) (A4, 200 páginas). Se rearma con `python3 construir_pdf.py`.
- **App:** [benabhi.github.io/cuarentena](https://benabhi.github.io/cuarentena/) (por ahora, una portada).
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
