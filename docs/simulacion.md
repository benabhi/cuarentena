# Simulación de Cuarentena (fase 7: la protagonista a medida)

*`herramientas/simulador.py` · 8000 partidas · semilla 41 · 10 de noviembre de 2026 · la fase 5 quedó en `simulacion-fase5.md`*

En cada partida, el simulador **crea una protagonista al azar** con r100–r106, como alguien que tira todo:

- edad, oficio, barrio, Motivo y una debilidad (dos en el 35 % de las partidas);
- el objeto de oficio y el del bolsillo;
- los puntos libres repartidos por un orden fijo.

Después juega los 40 días.

## Después de aplicar la auditoría de la fase 7

*8000 partidas · semilla 41.* Aplicada la auditoría entera (`auditoria.md`):

- el Mayor sin Lastimado;
- la práctica y el apodo nuevos;
- las pistas con color;
- tres refugios candidatos;
- la tabla nueva de El que falta;
- La olla grande con la olla;
- como mucho una Habilidad en 4.

| | Antes | Después |
|---|---|---|
| **Llegan al amanecer** | 58,6 % | **60,5 %** |
| Mayor / Joven / Adulto | 49 / 63 / 63 % | 54 / 65 / 63 % |
| Oficio más bajo y más alto | Mecánica 49 % · Salud 66 % | Electricidad 55 % · Reparto y Seguridad 67 % |
| Refugios | 49–63 % | 50–66 % (el Supermercado sigue último, a propósito) |
| Apodo más común | Calle, 70 % | Físico, 38 % (Labia 21 %, Pelea 14 %, Mecánica 7 %, Oficio 6 %) |
| Secreto (1 al 6) | 0 · 0 · 41 · 15 · 14 · 14 % | 15 · 1 · 22 · 14 · 15 · 19 % |
| El que falta: mordido o convertido | 2 % | 5 % |

**Lo que queda:**

- **La purga** casi no sale (1 %). El jugador automático la esquiva siempre que puede, porque es la única verdad que exige una salida. Un jugador humano puede buscarla a propósito, ahora que deja la armería abierta.
- **Las mañas ganadas** siguen siendo pocas (1,1 por protagonista). Las escenas ★ de los arcos no las mide el simulador, porque no juega los arcos.
- **El simulador no juega** lo que sabés de tu barrio (r103), la escena del Motivo en la Noche 40 (e906), las enseñanzas de Lista de presentes ni el lugar al azar de las debilidades.

## Resultado de la fase 7 (antes de aplicar la auditoría)

| | Llegan al amanecer | Sobrevivientes al amanecer | Día medio de muerte |
|---|---|---|---|
| **Fase 7** (protagonista a medida) | **58,6 %** | 4,1 | 20,7 |
| Fase 5 (cuatro protagonistas fijas) | 60,7 % | 4,4 | 20,1 |

La meta sigue siendo **55–65 %**, y se cumple.

**En 8000 partidas salieron 7104 fichas distintas.** Una ficha es una combinación de edad, oficio, barrio, Motivo y debilidades, sin contar objetos ni puntos.

### Por cada pregunta de la creación

| Pregunta | Peor | Mejor | Distancia |
|---|---|---|---|
| **Edad** | Mayor 49 % | Joven 63 % · Adulto 63 % | **14 puntos** |
| **Oficio** | Mecánica 49 % · Docencia 53 % · Cocina 54 % | Salud 66 % · Reparto 65 % · Deporte 64 % | 17 puntos |
| **Motivo** | 58 % (cuatro de ellos) | La lista 60 % | 2 puntos |
| **Debilidad** | Asma 58 % | Anteojos 60 % · Miedo 60 % | 2 puntos |
| **Barrio propio** | Cementerio 55 % · Perímetro 55 % | Estación 62 % | 7 puntos |
| **Debilidades** | una: 57 % | dos: 61 % | 4 puntos |

Por refugio: Escuela 63 % · Comisaría 61 % · Cuartel 60 % · Parroquia 60 % · Sarmiento 58 % · Supermercado 49 %.

**Cómo se muere** (porcentaje de todas las partidas): combate 25,4 % · eventos 6,6 % · Noche 40 4,9 % · Fiebre 2,2 % · procesión 1,3 % · hambre 1,0 %.

### Lo nuevo, medido

- **El apodo** (r127). Entre los que llegan al amanecer, el **70 %** se llama por **Calle**. Le siguen Físico 10 %, Labia 6 %, Mecánica 4 % y Pelea 4 %. Ver la auditoría, C1.
- **Las mañas ganadas** (r126). 1,3 mañas por protagonista al final. Solo **Atajos** (14 %) y **La puerta** (7 %) se ganan seguido; las demás, casi nunca.
- **El Secreto** (r109, e570).
  - El jugador automático lo abre antes de la Noche 40 en el **84 %** de las partidas.
  - Como mueve el dado para alejarse del plazo (1) y de la purga (2), esas dos verdades **no salieron nunca**. El ensayo (3) salió en el 41 % y las otras tres, en el 14–15 % cada una.
  - En la fase 5, las seis salían parejas. Ver la auditoría, C2.
- **El que falta** (1282 partidas con ese Motivo).
  - **En el 22 % no se lo encuentra** antes del final de la partida.
  - Cuando se lo encuentra: «Te estaba buscando» 22 %, «Del otro lado» 14 %, con una facción 12 %, «Vivo y solo» 12 %, «Vivo y con gente» 12 %, atrapado 4 %, mordido 1 %, convertido 1 %.
  - Casi siempre se lo encuentra en la Etapa I o II, así que los finales tristes casi no salen. Ver la auditoría, C6.

## Variantes de la edad Mayor

1500 partidas con edad Mayor por variante, semilla 5:

| Variante | Llegan |
|---|---|
| Como está: 4 casillas, sin Magullado | 46,9 % |
| 4 casillas, +1 punto de Habilidad | 49,1 % |
| **4 casillas, pero la primera sigue siendo Magullado** (el Descanso la borra) | **55,6 %** |
| 5 casillas | 61,1 % |

Lo que pesa no es la casilla de menos: es perder **Magullado**, la casilla que se borra sola. Ver la auditoría, B1.

## Qué juega el simulador

Lo mismo que en la fase 5 (el día, el saqueo, el combate, la Fiebre, el refugio, los puestos, el taller, la Noche 40 y el día 41), más lo siguiente:

- **Edad:** Mayor con 4 casillas sin Magullado; Joven con Ánimo 5.
- **Mañas:**
  - Manos de guardia, Ojo de obra, Reglamentaria, Atajos (Azoteas sin Soga), Recetario, La olla grande, Lista de presentes, La puerta, Pulso, Sombra y Pulmones;
  - las mañas que se ganan al llegar a 4.
- **Debilidades:**
  - Miedo (Desventaja con Ánimo 3 o menos);
  - Anteojos (Desventaja a distancia);
  - Vicio (1 Víver por semana o −2 Ánimo);
  - Buscado (−2 de Reputación con el Destacamento);
  - superarlas, con 25 % por debilidad cada vez que sube la Etapa.
- **Barrio:** la cuadra (sin encuentro la primera vez), la esquina (−1) y «en casa» (Moral 6, +1 Rastro).
- **El apodo:** un palito por cada Práctica de la primera semana.
- **El Secreto:** se tira al abrirlo y las pistas mueven el dado.
- **El que falta:** señales al volver de las salidas, y la tabla de e845 por Etapa.
- **Uso:** `python3 herramientas/simulador.py --oficio Salud --motivo 'La lista'` fija partes de la ficha. `--ajuste mayor_magullado=True` prueba variantes.

**Lo que no juega:**

- **Puente y Cables:** el simulador no usa vehículos ni construye la Radio o el Generador. Por eso Mecánica y Electricidad salen más abajo de lo que darían en la mesa.
- **El fiado:** no comercia.
- **Los arcos:** no lee las entradas de los Motivos, salvo El que falta.
- **El conocido:** no lo recluta aparte.

Un jugador humano juega mejor, así que el número real debería quedar unos puntos arriba.
