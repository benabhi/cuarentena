# Cuarentena

*Cuarenta días encerrados. Después, la Marea.*

Juego de rol en solitario de supervivencia en una ciudad sellada. Un libro de **UtopIA**.

> **Estado:** texto completo (fase 3 del manifiesto de UtopIA): 118 reglas y 522 eventos en [`libro/`](libro/), unas 107.000 palabras, sin enlaces rotos ni Marcas sueltas (`python3 herramientas/verificar.py`). El plan está en [`docs/plan-de-diseno.md`](docs/plan-de-diseno.md) y el mundo en [`docs/biblia-del-mundo.md`](docs/biblia-del-mundo.md). Lo que sigue: simulador, auditoría, maqueta y arte.

Este repositorio va a contener todo lo necesario para recrear el manual en PDF (A4, 200 páginas) y la app para jugarlo.

- **Manual:** `Cuarentena.pdf` (todavía no existe).
- **App:** [benabhi.github.io/cuarentena](https://benabhi.github.io/cuarentena/) (por ahora, una portada).
- **Arte:** todas las ilustraciones salen de un único chat de Gemini dedicado a este libro (enlace pendiente: se crea al empezar la fase de arte).

## Estructura

```
cuarentena/
├── README.md             este archivo
├── requirements.txt      dependencias de Python
├── construir_pdf.py      genera el manual (Cuarentena.pdf)          [fase 7]
├── estilo.css            hoja de estilos del manual                  [fase 7]
├── libro/                el texto del juego en Markdown, en orden de lectura
│                         (rNNN = reglas, eNNN = eventos)
├── maqueta/              partes, cajas, iconos, mapa, papel y cortes  [fase 7]
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

Source Serif 4, Oswald y Space Mono (SIL Open Font License); Special Elite y Permanent Marker (Apache 2.0). Las licencias están en `fuentes/`.
