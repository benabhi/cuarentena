/* =====================================================================
   CUARENTENA · base
   Espacio de nombres, utilidades, datos fijos de las reglas (las tablas
   de creación y preparación) y el guardado local. Sin lógica de juego.
   ===================================================================== */
'use strict';
const Q = (window.Q = window.Q || {});

/* ---------- utilidades ---------- */
Q.u = {
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
  esc: (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  norm: (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(),
  d: (n = 6) => 1 + Math.floor(Math.random() * n),
  uid: () => Math.random().toString(36).slice(2, 9),
  copia: (o) => JSON.parse(JSON.stringify(o)),
  firma: (n) => (n > 0 ? '+' + n : n < 0 ? '−' + Math.abs(n) : '±0'),
  plural: (n, s, p) => (n === 1 ? s : p || s + 's'),
  mezclar(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  mitadArriba: (n) => Math.ceil(n / 2),
};

/** Crea un elemento: el('div.clase#id', {attr}, hijos...) */
Q.el = function (sel, attrs, ...hijos) {
  const m = sel.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
  const node = document.createElement((m && m[1]) || 'div');
  if (m && m[2]) for (const p of m[2].match(/[.#][\w-]+/g)) { if (p[0] === '.') node.classList.add(p.slice(1)); else node.id = p.slice(1); }
  if (attrs && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) { hijos.unshift(attrs); attrs = null; }
  for (const k in attrs || {}) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  const add = (h) => { if (h == null || h === false) return; if (Array.isArray(h)) h.forEach(add); else node.append(h instanceof Node ? h : document.createTextNode(String(h))); };
  hijos.forEach(add);
  return node;
};
for (const P of [Element.prototype, DocumentFragment.prototype]) {
  const original = P.append;
  P.append = function (...h) { return original.apply(this, h.filter((x) => x != null && x !== false)); };
}

/* ---------- datos fijos (las tablas de reglas que el motor necesita) ---------- */
Q.D = {
  HABS: ['Pelea', 'Puntería', 'Sigilo', 'Físico', 'Oficio', 'Mecánica', 'Medicina', 'Supervivencia', 'Labia', 'Calle'],
  HAB_USO: {
    Pelea: 'cuerpo a cuerpo, empujar, forcejear', Puntería: 'armas de fuego, ballestas, arrojar', Sigilo: 'sin ruido, esconderte, robar',
    Físico: 'correr, trepar, cargar, aguantar', Oficio: 'carpintería, barricadas, cerraduras', Mecánica: 'motores, electricidad, armas, química',
    Medicina: 'curar, operar, la Fiebre', Supervivencia: 'cocinar, agua, huerta, rastrear', Labia: 'convencer, mentir, negociar, unir', Calle: 'dónde buscar, atajos, rapiña',
  },
  MANA_HAB: { Pelea: ['La puerta'], Puntería: ['Pulso'], Sigilo: ['Sombra'], Físico: ['Pulmones'], Oficio: ['Ojo de obra'], Mecánica: ['Puente', 'Cables'], Medicina: ['Manos de guardia', 'Recetario'], Supervivencia: ['La olla grande'], Labia: ['Lista de presentes', 'El fiado'], Calle: ['Atajos'] },
  MANAS: {
    'Manos de guardia': 'Cada noche en el refugio curás 1 Herida a quien quieras. Reconocés la Fiebre escondida al alba.',
    'Ojo de obra': 'Cada barricada o trampa que construís vale +1 Resistencia. Ventaja en los derrumbes.',
    Reglamentaria: 'Pistola reglamentaria y 6 de Munición. Con el Destacamento, Puntería en lugar de Labia.',
    Atajos: 'Azoteas al precio de la Calle, sin Soga ni Tablones. (Con el oficio, una bicicleta.)',
    Recetario: 'Sabés hacer Molotov y Bomba de clavos. Al curar con Fármacos, un 7–9 cuenta como 10+.',
    'El fiado': 'Al cambiar, con 7 o más conseguís uno más de lo que das.',
    Puente: 'Arrancás cualquier vehículo sin llave ni prueba. Con 5–6 en 1d6, el vehículo no gasta Combustible.',
    'La olla grande': 'Con el puesto Cocina, el grupo come 2 Víveres menos. Con Olla a presión, cocinás sin Cocina a leña.',
    'Lista de presentes': 'Hablar con el grupo +1. Chicos y Cobardes no huyen con vos. Enseñás tu mejor Habilidad.',
    'La puerta': 'Noche 40: defender la Puerta +2. Con Guardia, un sondeo a la Puerta hace 1 menos.',
    Cables: 'Radio y Generador a mitad de Electrónica.',
    Pulmones: 'Retroceder con Ventaja. Los Frescos que van por vos avanzan un solo paso.',
    Pulso: 'Con 7–9 al disparar, el Ruido no se duplica.',
    Sombra: 'Esconderte con Ventaja; con 7–9 no sumás Ruido.',
  },
  EDADES: {
    Joven: { r: '18 a 29', hab: { Físico: 1 }, animo: 5, maxH: 5, txt: '+1 Físico. Ánimo 5. Pero −1 a Labia la primera vez con cada adulto o mayor.' },
    Adulto: { r: '30 a 50', hab: {}, animo: 4, maxH: 5, txt: '+1 a una de las dos Habilidades de tu oficio.' },
    Mayor: { r: '51 o más', hab: { Labia: 1 }, animo: 4, maxH: 4, txt: '+1 Labia. Tu conocido viene sin prueba. Sin la casilla Lastimado (4 Heridas).' },
  },
  // r102: [nombre, hab2, hab1, maña, objetos del oficio]
  OFICIOS: {
    Salud: ['Medicina', 'Labia', 'Manos de guardia', ['Botiquín', 'Llaves de la ambulancia 12']],
    Obra: ['Oficio', 'Físico', 'Ojo de obra', ['Martillo', 'Soplete con garrafa chica']],
    Policía: ['Puntería', 'Pelea', 'Reglamentaria', ['Llaves de la Comisaría 7.ª', 'Radio policial']],
    Reparto: ['Calle', 'Sigilo', 'Atajos', ['Casco de moto', 'Ganzúas']],
    Farmacia: ['Medicina', 'Mecánica', 'Recetario', ['3 Fármacos', '1 Antiviral y 1 Fármaco']],
    Comercio: ['Labia', 'Calle', 'El fiado', ['Sobre con dinero', 'Campera de cuero']],
    Mecánica: ['Mecánica', 'Oficio', 'Puente', ['Llave inglesa', 'Batería de auto']],
    Cocina: ['Supervivencia', 'Labia', 'La olla grande', ['Olla a presión', 'Cuchillo']],
    Docencia: ['Labia', 'Supervivencia', 'Lista de presentes', ['Un manual a elección', 'Silbato']],
    Seguridad: ['Pelea', 'Físico', 'La puerta', ['El Negro, el perro del depósito', 'Chaleco antibala']],
    Electricidad: ['Mecánica', 'Calle', 'Cables', ['Linterna de dínamo', 'Radio a pilas']],
    Deporte: ['Físico', 'Sigilo', 'Pulmones', ['Bate de aluminio', 'Mochila de camping']],
  },
  OFICIO_TABLA: { A: ['Salud', 'Obra', 'Policía', 'Reparto', 'Farmacia', 'Comercio'], B: ['Mecánica', 'Cocina', 'Docencia', 'Seguridad', 'Electricidad', 'Deporte'] },
  OFICIO_MARCA: { Salud: 'OFICIO_SALUD', Obra: 'OFICIO_OBRA', Policía: 'OFICIO_POLICIA', Reparto: 'OFICIO_REPARTO', Farmacia: 'OFICIO_FARMACIA', Comercio: 'OFICIO_COMERCIO', Mecánica: 'OFICIO_MECANICA', Cocina: 'OFICIO_COCINA', Docencia: 'OFICIO_DOCENCIA', Seguridad: 'OFICIO_SEGURIDAD', Electricidad: 'OFICIO_ELECTRICIDAD', Deporte: 'OFICIO_DEPORTE' },
  // r103
  BARRIOS: {
    casco: { n: 'El Casco', marca: 'BARRIO_CASCO', conocido: ['Pocho, el cerrajero', 'e612'], sabe: 'En el Casco, Esconderte tiene Ventaja.' },
    sanidad: { n: 'Sanidad', marca: 'BARRIO_SANIDAD', conocido: ['Rita, la veterinaria', 'e615'], sabe: 'La primera vez que revisás cada Farmacia u Hospital de Sanidad, +1 Fármaco.' },
    puerto: { n: 'El Puerto', marca: 'BARRIO_PUERTO', conocido: ['La Tana, la carnicera', 'e621'], sabe: 'Sabés nadar: contra los Ahogados, Retroceder con Ventaja y nunca te arrastran.' },
    fabril: { n: 'La Fabril', marca: 'BARRIO_FABRIL', conocido: ['El Ruso, el taxista', 'e636'], sabe: 'La primera vez en cada lugar de la Fabril, revisar rápido tira dos veces.' },
    bloques: { n: 'Los Bloques', marca: 'BARRIO_BLOQUES', conocido: ['Lucía, la maestra', 'e603'], sabe: 'Entre Los Bloques y sus vecinos, las Azoteas no piden Soga ni Tablones.' },
    lomas: { n: 'Las Lomas', marca: 'BARRIO_LOMAS', conocido: ['Ana y Bruno, los chicos de al lado', 'e609'], sabe: 'Una vez por Etapa, ◷ 1 en Las Lomas da 3 Víveres de agua.' },
    estacion: { n: 'La Estación', marca: 'BARRIO_ESTACION', conocido: ['Don Ernesto, el ferroviario', 'e600'], sabe: 'Tu primer viaje por el Subsuelo en cada Etapa no tira encuentro.' },
    mercado: { n: 'El Mercado', marca: 'BARRIO_MERCADO', conocido: ['El Chino Morales, el parrillero', 'e606'], sabe: 'En el Mercado, cambiar te da uno más.' },
    universidad: { n: 'Ciudad Universitaria', marca: 'BARRIO_UNIVERSIDAD', conocido: ['Mateo, el estudiante', 'e624'], sabe: 'Una vez por partida, 2 Químicos sin revisar.' },
    costanera: { n: 'La Costanera', marca: 'BARRIO_COSTANERA', conocido: ['Valeria, la bombera', 'e642'], sabe: 'Pescar en la rambla tiene +1 y el murallón da una pesca más.' },
    cementerio: { n: 'Cementerio y Parque', marca: 'BARRIO_CEMENTERIO', conocido: ['Doña Rosa, la del vivero', 'e627'], sabe: 'Pasar la noche afuera en tu barrio tiene Ventaja.' },
    perimetro: { n: 'El Perímetro', marca: 'BARRIO_PERIMETRO', conocido: ['Iván, el conscripto', 'e630'], sabe: 'Entrar y salir del Perímetro no suma Ruido.' },
  },
  BARRIO_TABLA: { A: ['casco', 'sanidad', 'puerto', 'fabril', 'bloques', 'lomas'], B: ['estacion', 'mercado', 'universidad', 'costanera', 'cementerio', 'perimetro'] },
  // r104
  MOTIVOS: {
    'La lista': { que: 'Doce nombres del pabellón 4 del Hospital Central', cont: 'Juramento', marca: 'LISTA_DEL_PABELLON', arco: 'e800', ev: 'e002', epi: 'e950' },
    'La obra': { que: 'Trabajaste en el muro de la cuarentena, y sabés dónde va a ceder', cont: 'Cimientos', marca: 'CONTRATO_DEL_MURO', arco: 'e810', ev: 'e003', epi: 'e951' },
    'La orden': { que: 'Un sobre sellado del Comando: «para ejecutar al recibir la señal»', cont: 'Deber', marca: 'ORDEN_SELLADA', arco: 'e820', ev: 'e004', epi: 'e952' },
    'El pedido': { que: 'Una caja térmica con precinto rojo, del Laboratorio de Virología', cont: 'Ruta', marca: 'CAJA_PRECINTADA', arco: 'e830', ev: 'e005', epi: 'e953' },
    'El que falta': { que: 'Alguien tuyo estaba en otro barrio esa noche y no volvió', cont: 'Esperanza', marca: 'EL_QUE_FALTA', arco: 'e840', ev: 'e006', epi: 'e956' },
    'Lo que hiciste': { que: 'El día 0 hiciste algo que no te podés perdonar', cont: 'Culpa', marca: 'LO_QUE_HICISTE', arco: 'e850', ev: 'e007', epi: 'e957' },
  },
  MOTIVO_ORDEN: ['La lista', 'La obra', 'La orden', 'El pedido', 'El que falta', 'Lo que hiciste'],
  // r105
  DEBILIDADES: {
    LA_ESPALDA: ['La espalda', 'Para retroceder, correr y cargar, tu Físico cuenta como 1.'],
    BUSCADO: ['Buscado', 'El Destacamento te busca.'],
    MIEDO: ['Miedo', 'Con Ánimo 3 o menos, Pelea y Puntería tienen Desventaja.'],
    ASMA: ['Asma', 'Cada alba gastás 1 inhalador; sin él, retroceder y correr con Desventaja.'],
    ANTEOJOS: ['Anteojos', 'Sin anteojos, Desventaja en todo lo que sea Lejos. Un 6 en Mordidas los rompe.'],
    VICIO: ['Un vicio', 'Pagás 1 Víver o 1 Fármaco al alba de los días 7, 14, 21, 28 y 35; si no, abstinencia.'],
  },
  BUSCADO_POR: ['desertaste', 'te escapaste del control sanitario', 'golpeaste a un soldado', 'robaste raciones', 'estás en una lista del Comando sin saber por qué', 'viste algo en el Puesto Norte'],
  DEBIL_LUGAR: ['e202', 'e226', 'e222', 'e221', 'e423', 'e342'],
  // r106
  BOLSILLO: ['Una mochila buena: +2 casilleros', 'Un cuchillo de cocina', 'Una linterna de verdad', 'El botiquín de tu auto: 1 Fármaco', 'Una barra de hierro (cuenta como Palanca)', 'Una foto (LA_FOTO): una vez, recuperás todo tu Ánimo'],
  // r110
  TESOROS: {
    'El camión del Comando': ['e343', 'e323', 'e242', 'e265', 'e283', 'e421'],
    'El generador industrial': ['e263', 'e221', 'e322', 'e206', 'e383', 'e303'],
    'La armería del cordón': ['e421', 'e204', 'e302', 'e422', 'e305', 'e244'],
    'El botiquín de la cuarentena': ['e225', 'e423', 'e361', 'e222', 'e202', 'e224'],
    'La radio del aficionado': ['e205', 'e281', 'e363', 'e384', 'e424', 'e304'],
    'El blindado': ['e422', 'e322', 'e244', 'e265', 'e382', 'e323'],
  },
  // r155: 2d6 → barrio (12: 1d6, 1–3 Puerto, 4–6 Universidad)
  PROCESION: { 2: 'perimetro', 3: 'cementerio', 4: 'lomas', 5: 'costanera', 6: 'bloques', 7: 'casco', 8: 'sanidad', 9: 'mercado', 10: 'estacion', 11: 'fabril' },
  // r180
  SOBREVIVIENTES: { A: ['e600', 'e603', 'e606', 'e609', 'e627', 'e630'], B: ['e612', 'e615', 'e618', 'e621', 'e624', 'e633'], C: ['e636', 'e639', 'e642', 'e645', 'e648', 'e651'] },
  MATERIALES: ['Madera', 'Metal', 'Tela', 'Químicos', 'Sujeción', 'Electrónica', 'Combustible', 'Fármacos'],
  MAT_AZAR: ['Madera', 'Metal', 'Tela', 'Químicos', 'Sujeción', 'Electrónica'],
  HERRAMIENTAS: ['Martillo', 'Serrucho', 'Llave inglesa', 'Palanca', 'Pala', 'Taladro', 'Soldadora', 'Máquina de coser', 'Olla a presión', 'Kit de recarga', 'Botiquín'],
  HERR_AZAR: ['Martillo', 'Serrucho', 'Llave inglesa', 'Palanca', 'Taladro', 'Máquina de coser'],
  OBJETO_UTIL: ['Linterna', 'Soga', 'Cuchillo', 'Radio a pilas', 'Mochila de camping', 'Un manual (e770)'],
  FRENTES: ['Puerta', 'Ventanas', 'Techo', 'Subsuelo'],
  INSTALACIONES: { Despensa: 'e750', Cisterna: 'e751', Huerta: 'e752', Enfermería: 'e753', Taller: 'e754', 'Cocina a leña': 'e755', Dormitorio: 'e756', 'Cortinas negras': 'e757', Vigía: 'e758', Radio: 'e759', Generador: 'e760', 'Último Cuarto': 'e761' },
  FACCIONES: { parroquia: ['La Parroquia', 'e660'], bomberos: ['Los Bomberos', 'e670'], lobos: ['Los Lobos', 'e680'], destacamento: ['El Destacamento', 'e690'] },
  PUESTOS: {
    Guardia: 'Baja el sondeo 1 (como mucho 2 entre todos). No duerme.',
    Obra: '1 Madera o 1 Metal: +1 Resistencia a un frente.',
    Taller: 'Con Taller: una receta de ◷ 2 o menos.',
    Cocina: 'Con Cocina a leña y 2 Víveres: +1 Moral; al alba el grupo come 1 menos.',
    Enfermería: 'Con Enfermería: cura 1 Herida (2 con Medicina 2+).',
    Huerta: 'Con Huerta (dos como mucho): +1 Víver (+2 con Supervivencia 2+).',
    Descanso: 'Recupera 1 Ánimo o Magullado.',
  },
  ETAPAS: ['', 'I · Fiebre', 'II · Silencio', 'III · Muda', 'IV · Marea'],
  ESPECIALES_ETAPA: { 1: 'Callados, Frescos e Hinchados', 2: 'aparecen Chillonas, Acechadores y Sabuesos', 3: 'aparecen Brutos, Escupidores, Ahogados y Blindados', 4: 'aparecen la Viuda y el Pastor; las Procesiones crecen' },
  PALOS: ['Oros', 'Copas', 'Espadas', 'Bastos'],
  VALORES: [1, 2, 3, 4, 5, 6, 7, 'Sota', 'Caballo', 'Rey'],
  HERIDAS: ['Magullado', 'Lastimado', 'Herido', 'Grave', 'Muriendo'],
  HERIDAS_MAYOR: ['Magullado', 'Herido', 'Grave', 'Muriendo'],
  // armas que la app conoce para el combate (e700–e704); el resto se agrega a mano
  ARMAS: {
    'Puños': { dano: 1, ruido: 0, alc: 'Cerca', usos: null },
    'Cuchillo': { dano: 1, ruido: 0, alc: 'Cerca', usos: null },
    'Palanca': { dano: 1, ruido: 0, alc: 'Cerca', usos: null },
    'Palo o caño': { dano: 1, ruido: 0, alc: 'Cerca', usos: 4 },
    'Martillo': { dano: 1, ruido: 0, alc: 'Cerca', usos: 8 },
    'Pala': { dano: 1, ruido: 0, alc: 'Cerca', usos: 6 },
    'Bate de aluminio': { dano: 2, ruido: 0, alc: 'Cerca', usos: 6 },
    'Bate con clavos': { dano: 2, ruido: 0, alc: 'Cerca', usos: 4 },
    'Machete': { dano: 2, ruido: 0, alc: 'Cerca', usos: 6 },
    'Lanza de caño': { dano: 2, ruido: 0, alc: 'Cerca', usos: 6 },
    'Hacha de leñador': { dano: 2, ruido: 0, alc: 'Cerca', usos: 6 },
    'Hacha de bombero': { dano: 3, ruido: 1, alc: 'Cerca', usos: 8 },
    'Maza de bulón': { dano: 3, ruido: 1, alc: 'Cerca', usos: 5 },
    'Motosierra': { dano: 4, ruido: 3, alc: 'Cerca', usos: null },
    'Revólver': { dano: 2, ruido: 2, alc: 'Lejos', fuego: true },
    'Pistola reglamentaria': { dano: 2, ruido: 2, alc: 'Lejos', fuego: true },
    'Escopeta': { dano: 3, ruido: 3, alc: 'Cerca', fuego: true },
    'Rifle de caza': { dano: 2, ruido: 2, alc: 'Lejos', fuego: true },
    'Fusil': { dano: 3, ruido: 2, alc: 'Lejos', fuego: true },
    'Gomera': { dano: 1, ruido: 0, alc: 'Lejos', usos: 6 },
    'Arco deportivo': { dano: 2, ruido: 0, alc: 'Lejos', usos: 8 },
    'Ballesta de caza': { dano: 3, ruido: 0, alc: 'Lejos', usos: 10 },
  },
  MODOS: {
    cuarentena: { n: 'Cuarentena', d: 'Las reglas como están. Meta: el amanecer del día 41 con el refugio en pie.' },
    toque: { n: 'Toque de queda', d: 'Partida corta: 28 cartas (sin los 1, 2 y 3). La Etapa sube con las cartas 8, 15 y 22. +4 Víveres.' },
    lobo: { n: 'Lobo solo', d: 'Sin sobrevivientes ni Moral. La Marea con 2 oleadas menos. Llegar vivo al amanecer.' },
    exodo: { n: 'Éxodo', d: 'El refugio es temporal: cruzar el perímetro antes de la Noche 40 con al menos un sobreviviente (e960).' },
  },
  DIFICULTADES: {
    vecino: { n: 'Vecino', d: '+6 Víveres al empezar, Rastro 0 y la Marea con 1 oleada menos.' },
    sobreviviente: { n: 'Sobreviviente', d: 'Las reglas como están.' },
    ultimo: { n: 'Último en pie', d: 'Empezás en la Etapa II, la Marea con 1 oleada más y los Antivirales del botín valen 1 Fármacos.' },
  },
};

/* ---------- guardado local (tolerante a fallos) ---------- */
Q.guardado = {
  INDICE: 'cuarentena.partidas.v1',
  ACTUAL: 'cuarentena.actual.v1',
  AJUSTES: 'cuarentena.ajustes.v1',
  VISTO: 'cuarentena.visto.v1',
  clave: (id) => 'cuarentena.partida.v1.' + id,
  leer(k) { try { const t = localStorage.getItem(k); return t ? JSON.parse(t) : null; } catch (e) { return null; } },
  escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  borrar(k) { try { localStorage.removeItem(k); } catch (e) { /* nada */ } },
  nuevoId: () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
  indice() { const ix = this.leer(this.INDICE); return Array.isArray(ix) ? ix : []; },
  resumen: (S) => ({ id: S.id, nombre: S.prota.nombre, oficio: S.prota.oficio, refugio: S.refugio && S.refugio.titulo, dia: S.dia, fin: S.fin ? S.fin.titulo : null, fecha: Date.now() }),
  guardar(S) {
    if (!S) return false;
    S.id = S.id || this.nuevoId();
    const ok = this.escribir(this.clave(S.id), S);
    const ix = this.indice().filter((x) => x.id !== S.id);
    ix.unshift(this.resumen(S));
    this.escribir(this.INDICE, ix);
    this.escribir(this.ACTUAL, S.id);
    return ok;
  },
  cargar(id) { return this.leer(this.clave(id)); },
  cargarActual() { const id = this.leer(this.ACTUAL); return id ? this.cargar(id) : null; },
  borrarPartida(id) {
    this.borrar(this.clave(id));
    this.escribir(this.INDICE, this.indice().filter((x) => x.id !== id));
    if (this.leer(this.ACTUAL) === id) this.borrar(this.ACTUAL);
  },
};
