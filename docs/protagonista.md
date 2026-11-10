# La protagonista a medida (decisión del 10 de noviembre de 2026)

*Reemplaza a las cuatro protagonistas fijas de la fase 3 (la Enfermera, el Albañil, la Agente y la Repartidora). Propuesta aprobada: https://claude.ai/artifact/Lu6fnoLCRk97zwP2XRj2Bx*

## Qué pidió el autor

- Un solo protagonista, «el» o «la», armado a medida por quien juega, en lugar de cuatro personajes fijos.
- Ideas ingeniosas de creación de personaje.
- Sin tiradas ocultas: nada de «tirá sin mirar y anotalo en un papel doblado». Lo que no se sabe se tira cuando se revela.
- En todo el libro, insistir en la rejugabilidad, la creatividad y la cantidad de decisiones: que sea raro repetir una partida.

## Cómo quedó

**Seis preguntas sobre la noche del brote (r100–r107).** En cada una se elige o se tira:

1. **Edad** (r101): Joven, Adulto o Mayor. Cada una da algo y cuesta algo.
2. **Oficio** (r102): 12 oficios en una tabla de 2 columnas × 6 filas. Cada uno da una Habilidad en 2, otra en 1 y una **maña**.
3. **Barrio** (r103): los 12 barrios. Dan cuatro ventajas (la cuadra, la esquina, lo que sabés de tu barrio y el conocido) y una persona que te conoce de antes.
4. **Motivo** (r104): seis historias con su contador, su arco y su epílogo. Los cuatro arcos viejos (La lista, La obra, La orden y El pedido) ya no dependen del oficio: cada uno tiene una tabla de «por qué lo tenés». Hay dos arcos nuevos: **El que falta** (e840–e848) y **Lo que hiciste** (e850–e858).
5. **Debilidad** (r105): seis, cada una con dónde superarla. Con dos, 1 punto más.
6. **Objetos** (r106): uno a elegir entre dos por oficio, y uno del bolsillo.

**Puntos:** oficio 3, edad 1 y 4 libres (5 con dos debilidades). Nada empieza por encima de 4.

**La protagonista cambia jugando.**

- **Mañas que se ganan** (r126): cada Habilidad que llega a 4 da su maña.
- **Apodo** (r127): al día 8, el grupo te nombra por la Habilidad en la que más fallaste la primera semana.
- **Debilidades que se superan** (r105): borrar una mueve el contador.

**El Secreto sin dado oculto** (r109, e570). Se tira recién cuando lo abrís. Las pistas dejan mover el resultado 1 lugar (4–5 pistas) o 2 (6 o más), pero solo hacia las verdades del color de tus pistas, que sale del barrio donde las encontraste.

**El que falta.** El destino de la persona que buscás se tira cuando llegás (e845), en la columna de la Etapa en que estás. Las señales de más lo mueven.

## Dónde se tocó el libro

- **Reglas:** r002, r005, r100–r109, r126, r127, r198 y r199 (el ejemplo ahora es Nadia).
- **Prólogo:** e001–e015. e001 reparte por Motivo hacia e002–e007, y el tronco común pasó a e008–e015.
- **Arcos:** e800–e858.
- **Secreto:** e560–e586.
- **Final:** Noche 40 (e900–e930) y epílogos e950–e957.
- **Apéndices:** hoja de protagonista y resumen de la creación.
- **Menciones** de las cuatro protagonistas viejas en unos veinte capítulos.
- `herramientas/verificar.py` da 0 enlaces rotos y 0 Marcas sueltas nuevas.

## Lo que mide el simulador

`herramientas/simulador.py` crea una protagonista al azar en cada partida, como lo haría alguien que tira todo. Los números están en `docs/simulacion.md`.
