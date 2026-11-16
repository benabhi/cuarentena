/* =====================================================================
   CUARENTENA · motor
   El estado de la partida y las reglas que se pueden calcular. Sin DOM:
   recibe los dados ya tirados, así se prueba sin navegador y se puede
   llevar a otra plataforma. Las decisiones siempre son del jugador; el
   motor solo hace las cuentas que el libro pide.
   ===================================================================== */
'use strict';
(function () {
  const M = (Q.motor = {});
  const D = Q.D, u = Q.u;
  const L = () => Q.libro;

  /* ------------------------------------------------------------ crear */
  /** p: {nombre, edad, oficio, adultoHab, barrio, motivo, motivoFila, debil:[MARCA], objOficio (0|1), bolsillo (1..6), puntos:{hab:n}, modo, dificultad, aprendiz} */
  M.habilidadesBase = function (p) {
    const h = {};
    D.HABS.forEach((x) => (h[x] = 0));
    if (p.oficio) { const o = D.OFICIOS[p.oficio]; h[o[0]] += 2; h[o[1]] += 1; }
    const ed = D.EDADES[p.edad];
    if (ed) for (const k in ed.hab) h[k] += ed.hab[k];
    if (p.edad === 'Adulto' && p.adultoHab) h[p.adultoHab] += 1;
    return h;
  };
  M.puntosLibres = (p) => 4 + ((p.debil || []).length >= 2 ? 1 : 0);
  M.validarPuntos = function (p) {
    const base = M.habilidadesBase(p), pts = p.puntos || {};
    let usados = 0, cuatro = 0, error = null;
    for (const h of D.HABS) {
      const v = base[h] + (pts[h] || 0);
      usados += pts[h] || 0;
      if (v > 4) error = `${h} no puede empezar por encima de 4.`;
      if (v === 4) cuatro++;
    }
    if (cuatro > 1) error = 'Como mucho una Habilidad empieza en 4 (r100).';
    const libres = M.puntosLibres(p);
    return { usados, libres, error, completo: !error && usados === libres };
  };

  M.nuevaPartida = function (p) {
    const ed = D.EDADES[p.edad], of = D.OFICIOS[p.oficio], mot = D.MOTIVOS[p.motivo];
    const base = M.habilidadesBase(p), hab = {};
    D.HABS.forEach((h) => (hab[h] = base[h] + ((p.puntos || {})[h] || 0)));
    const marcas = [D.OFICIO_MARCA[p.oficio], D.BARRIOS[p.barrio].marca, mot.marca].concat(p.debil || []);
    const S = {
      v: 1, id: null, creada: Date.now(),
      modo: p.modo || 'cuarentena', dificultad: p.dificultad || 'sobreviviente', aprendiz: p.aprendiz !== false,
      prota: {
        nombre: p.nombre || 'Sin nombre', edad: p.edad, oficio: p.oficio, barrio: p.barrio, motivo: p.motivo, motivoFila: p.motivoFila || null,
        debil: (p.debil || []).slice(), hab, practica: {}, semana: {}, manas: [of[2]], apodo: null,
        heridas: 0, maxH: ed.maxH, fiebre: 0, mordida: null, arañazo: false, reservas: 6, animo: ed.animo, maxAnimo: 6,
        contador: p.motivo === 'Lo que hiciste' ? 4 : 2, contNombre: mot.cont,
        mochila: [], carga: {}, cap: 8, armas: [], prot: [], municion: 0, linterna: null, inhaladores: 0, abst: 0,
        objOficio: of[3][p.objOficio || 0], bolsillo: D.BOLSILLO[(p.bolsillo || 1) - 1],
      },
      refugio: null,
      grupo: [], rep: { parroquia: 0, bomberos: 0, lobos: 0, destacamento: 0 },
      ciudad: { procesiones: {}, tomados: [], llamas: {}, humo: [], tesoros: {}, debilLugar: null, stock: {}, busqueda: {}, conocidos: [] },
      mazo: [], descarte: [], dia: 0, etapa: 1, fase: 'prologo', horas: 6,
      barrio: p.barrio, enRefugio: false, ruido: 0, capaUltima: null, compas: [], afuera: false,
      escena: { ev: mot.ev, pila: [] }, marcas, notas: [], bitacora: [], vistos: {}, hechos: {},
      vehiculo: null, pistas: { C: 0, L: 0, A: 0, total: 0 }, secreto: null,
      noche40: null, fin: null, sinDormir: 0, albasSinSalirNoche: 0,
    };
    D.HABS.forEach((h) => { S.prota.practica[h] = 0; S.prota.semana[h] = 0; });
    // maña por Habilidad en 4 al empezar (r126)
    for (const h of D.HABS) if (hab[h] >= 4) M.ganarMana(S, h);
    // objetos (r106)
    const P = S.prota;
    P.mochila.push({ n: 'Ropa de calle, encendedor', cas: 0 });
    P.linterna = { n: 'Celular sin señal', usos: 3, max: 3, recarga: false };
    M.agregarObjeto(S, P.objOficio);
    M.agregarObjeto(S, P.bolsillo);
    if (of[2] === 'Reglamentaria') { P.armas.push(M.arma('Pistola reglamentaria')); P.municion += 6; }
    if (of[2] === 'Atajos') S.vehiculo = { n: 'Bicicleta', tipo: 'bici' };
    if (p.motivoFila) M.anotarBitacora(S, `Por qué tenés tu Motivo: fila ${p.motivoFila} de r104.`);
    if (p.debil && p.debil.includes('BUSCADO')) S.rep.destacamento = 0;
    // modo y dificultad (r210, r211)
    M.preparar(S);
    M.anotarBitacora(S, `${P.nombre}: ${P.edad.toLowerCase()}, ${P.oficio.toLowerCase()}, de ${D.BARRIOS[P.barrio].n}. Motivo: ${P.motivo}.`);
    return S;
  };

  M.arma = function (n) {
    const a = D.ARMAS[n] || { dano: 1, ruido: 0, alc: 'Cerca', usos: null };
    return { n, dano: a.dano, ruido: a.ruido, alc: a.alc, usos: a.usos ?? null, max: a.usos ?? null, fuego: !!a.fuego };
  };

  /** Los objetos de creación (r106): lo que la app sabe poner en la hoja. Lo demás queda como texto en la Mochila. */
  M.agregarObjeto = function (S, nombre) {
    const P = S.prota, ad = (n, cas = 1) => P.mochila.push({ n, cas });
    const marca = (m) => { if (!S.marcas.includes(m)) S.marcas.push(m); };
    switch (nombre) {
      case 'Botiquín': ad('Botiquín', 2); break;
      case 'Llaves de la ambulancia 12': marca('LLAVES_DE_LA_AMBULANCIA'); ad('Llaves de la ambulancia 12', 0); break;
      case 'Martillo': ad('Martillo'); break;
      case 'Soplete con garrafa chica': ad('Soplete con garrafa chica (1 Combustible)', 1); break;
      case 'Llaves de la Comisaría 7.ª': marca('LLAVES_DE_LA_SEPTIMA'); ad('Llaves de la Comisaría 7.ª', 0); break;
      case 'Radio policial': marca('RADIO_POLICIAL'); ad('Radio policial'); break;
      case 'Casco de moto': P.prot.push({ n: 'Casco de moto', resta: 0, casco: true, usos: null }); break;
      case 'Ganzúas': ad('Ganzúas (+1 a abrir cerraduras)'); break;
      case '3 Fármacos': ad('3 Fármacos', 2); break;
      case '1 Antiviral y 1 Fármaco': ad('1 Antiviral', 1); ad('1 Fármaco', 1); break;
      case 'Sobre con dinero': ad('Sobre con dinero (vale 3 en un cambio)'); break;
      case 'Campera de cuero': P.prot.push({ n: 'Campera de cuero', resta: 1, usos: null }); break;
      case 'Llave inglesa': ad('Llave inglesa'); break;
      case 'Batería de auto': ad('Batería de auto', 3); break;
      case 'Olla a presión': ad('Olla a presión'); break;
      case 'Cuchillo': P.armas.push(M.arma('Cuchillo')); break;
      case 'Un manual a elección': ad('Un manual a elección (e770)'); break;
      case 'Silbato': ad('Silbato (Señuelo, 3 usos)'); break;
      case 'El Negro, el perro del depósito': marca('EL_NEGRO'); S._negroInicial = true; break;
      case 'Chaleco antibala': P.prot.push({ n: 'Chaleco antibala', resta: 1, usos: null }); break;
      case 'Linterna de dínamo': P.linterna = { n: 'Linterna de dínamo', usos: null, max: null, recarga: false }; break;
      case 'Radio a pilas': ad('Radio a pilas'); break;
      case 'Bate de aluminio': P.armas.push(M.arma('Bate de aluminio')); break;
      case 'Mochila de camping': P.cap += 2; break;
      case 'Una mochila buena: +2 casilleros': P.cap += 2; break;
      case 'Un cuchillo de cocina': P.armas.push(M.arma('Cuchillo')); break;
      case 'Una linterna de verdad': P.linterna = { n: 'Linterna', usos: 6, max: 6, recarga: true }; break;
      case 'El botiquín de tu auto: 1 Fármaco': ad('1 Fármaco'); break;
      case 'Una barra de hierro (cuenta como Palanca)': ad('Barra de hierro (Palanca)'); break;
      case 'Una foto (LA_FOTO): una vez, recuperás todo tu Ánimo': marca('LA_FOTO'); break;
      default: if (nombre) ad(nombre);
    }
  };

  /** r108 + r210/r211: mazo, Tesoros, lugar de la debilidad, Procesiones, Etapa. */
  M.preparar = function (S, dados) {
    const R = dados || (() => u.d(6));
    // la baraja: 40 naipes sin ochos ni nueves (Toque de queda: sin 1, 2 y 3)
    S.mazo = [];
    for (const palo of D.PALOS) for (const v of D.VALORES) {
      if (S.modo === 'toque' && [1, 2, 3].includes(v)) continue;
      S.mazo.push({ palo, v });
    }
    u.mezclar(S.mazo);
    // los Seis Tesoros (r110): si dos caen en el mismo lugar, el segundo baja al siguiente
    const usados = new Set();
    for (const [t, lista] of Object.entries(D.TESOROS)) {
      let i = R() - 1;
      while (usados.has(lista[i])) i = (i + 1) % 6;
      usados.add(lista[i]);
      S.ciudad.tesoros[t] = lista[i];
    }
    if (S.prota.debil.some((d) => ['ASMA', 'ANTEOJOS', 'LA_ESPALDA'].includes(d))) S.ciudad.debilLugar = D.DEBIL_LUGAR[R() - 1];
    // dos Procesiones (r155)
    for (let k = 0; k < 2; k++) M.ponerProcesion(S, M.barrioProcesion(R() + R(), R));
    if (S.dificultad === 'ultimo') S.etapa = 2;
  };
  M.barrioProcesion = (n, R) => (n === 12 ? ((R || (() => u.d(6)))() <= 3 ? 'puerto' : 'universidad') : D.PROCESION[n]);
  M.ponerProcesion = function (S, b) {
    const P = S.ciudad.procesiones;
    P[b] = Math.min(2, (P[b] || 0) + 1);
  };
  M.quitarProcesion = function (S, b) {
    const P = S.ciudad.procesiones;
    if (P[b]) P[b]--;
    if (!P[b]) delete P[b];
  };

  /* ------------------------------------------------------------ refugio (e010, r170) */
  M.candidatos = function (S, d6) {
    const R = L().refugios;
    const cerca = { casco: 'e440', sanidad: 'e490', universidad: 'e490', puerto: 'e480', costanera: 'e480', estacion: 'e460', fabril: 'e460', perimetro: 'e460', bloques: 'e470', lomas: 'e470', cementerio: 'e470', mercado: 'e450' }[S.prota.barrio];
    const motivo = { 'La lista': 'e490', 'La obra': 'e470', 'La orden': 'e460', 'El pedido': 'e480', 'El que falta': 'e450', 'Lo que hiciste': 'e440' }[S.prota.motivo];
    const tabla = ['e440', 'e450', 'e460', 'e470', 'e480', 'e490'];
    let tercero = S.marcas.includes('LLAVES_DE_LA_SEPTIMA') ? 'e460' : tabla[(d6 || u.d(6)) - 1];
    let n = 0;
    while ((tercero === cerca || tercero === motivo) && n++ < 30) tercero = tabla[u.d(6) - 1];
    const c = [cerca, motivo, tercero].filter((x, i, a) => a.indexOf(x) === i);
    return c.map((e) => ({ e, ...R[e] }));
  };
  M.elegirRefugio = function (S, eid) {
    const R = L().refugios[eid];
    const frentes = u.copia(R.frentes);
    S.refugio = {
      id: eid, titulo: R.titulo, barrio: R.barrio, tipo: R.tipo, botin: R.botin, stock: R.stock,
      frentes, base: u.copia(R.frentes), trampas: { Puerta: [], Ventanas: [], Techo: [], Subsuelo: [] },
      inst: [], viveres: R.viveres, mats: {}, municion: 0, moral: 5, rastro: R.rastro, desarmado: false, ultimoCuarto: 2,
    };
    D.MATERIALES.forEach((m) => (S.refugio.mats[m] = R.mats[m] || 0));
    S.prota.municion += R.municion;
    if (eid === 'e480') S.refugio.inst.push('Cisterna', 'Vigía');
    // en tu barrio (r103)
    if (R.barrio === S.prota.barrio) { S.refugio.moral = 6; S.refugio.rastro += 1; }
    // dificultad (r211) y modo (r210)
    if (S.dificultad === 'vecino') { S.refugio.viveres += 6; S.refugio.rastro = 0; }
    if (S.modo === 'toque') S.refugio.viveres += 4;
    S.barrio = R.barrio; S.enRefugio = true;
    if (S._negroInicial) { M.sumarSobreviviente(S, 'e651'); delete S._negroInicial; }
    M.anotarBitacora(S, `Refugio: ${R.titulo} (${L().barrios[R.barrio].n}).`);
  };

  /* ------------------------------------------------------------ marcas, notas, bitácora */
  M.tieneMarca = (S, m) => S.marcas.includes(m) || (m.endsWith('_') && S.marcas.some((x) => x.startsWith(m)));
  M.anotar = function (S, m) { if (!S.marcas.includes(m)) { S.marcas.push(m); M.anotarBitacora(S, `Anotaste ${m}.`); return true; } return false; };
  M.borrarMarca = function (S, m) { const i = S.marcas.indexOf(m); if (i >= 0) { S.marcas.splice(i, 1); M.anotarBitacora(S, `Borraste ${m}.`); } };
  M.anotarBitacora = function (S, txt) { S.bitacora.push({ dia: S.dia, fase: S.fase, txt }); if (S.bitacora.length > 600) S.bitacora.shift(); };
  /** Recordatorio para un día (o para el alba/la noche siguiente). */
  M.nota = function (S, texto, dia, ev, cuando) { S.notas.push({ id: u.uid(), texto, dia: dia ?? null, ev: ev || null, cuando: cuando || 'alba' }); };
  M.notasPara = (S, dia, cuando) => S.notas.filter((n) => (n.dia == null || n.dia <= dia) && (!cuando || n.cuando === cuando));

  /* ------------------------------------------------------------ Habilidades y pruebas (r120–r127) */
  M.hab = function (S, h) {
    const P = S.prota;
    let v = P.hab[h] || 0;
    if (S.marcas.some((m) => m.startsWith('AMPUTADO_')) && P.amputado === 'mano' && ['Pelea', 'Puntería', 'Oficio', 'Mecánica'].includes(h)) v -= 1;
    if (P.amputado === 'pierna' && h === 'Físico') v -= 2;
    return Math.max(0, v);
  };
  M.nivelHerida = (S) => (S.prota.maxH === 4 ? D.HERIDAS_MAYOR : D.HERIDAS)[S.prota.heridas - 1] || 'Ileso';
  M.grave = (S) => S.prota.heridas >= S.prota.maxH - 1;
  M.muriendo = (S) => S.prota.heridas >= S.prota.maxH;
  /** r164: objetos + materiales (2 por casillero; la Munición, 6) + armas guardadas. */
  M.casillerosUsados = function (S) {
    const P = S.prota;
    let n = P.mochila.reduce((a, o) => a + (o.cas || 0), 0) + P.armas.filter((a) => a.enMochila).length;
    for (const k in P.carga || {}) n += Math.ceil((P.carga[k] || 0) / 2);
    n += Math.ceil((P.municion || 0) / 6);
    return n;
  };
  M.sobrecarga = (S) => M.casillerosUsados(S) > S.prota.cap;
  /** Desventajas que la app puede saber sola (r121 y las debilidades). ctx: {oscuro, lejos} */
  M.desventajas = function (S, h, ctx = {}) {
    const P = S.prota, r = [];
    if (P.reservas <= 0) r.push('Reservas 0');
    if (P.animo <= 0) r.push('Ánimo 0');
    if (P.fiebre >= 4) r.push('Fiebre 4+');
    if (P.fiebre === 3 && h === 'Labia') r.push('Fiebre 3: se te nota');
    if (M.grave(S) && ['Físico', 'Pelea', 'Sigilo'].includes(h)) r.push('Grave');
    if (M.sobrecarga(S) && ['Físico', 'Sigilo'].includes(h)) r.push('Mochila de más');
    if (S.marcas.includes('MIEDO') && P.animo <= 3 && ['Pelea', 'Puntería'].includes(h)) r.push('Miedo');
    if (ctx.oscuro && !(P.linterna && (P.linterna.usos == null || P.linterna.usos > 0))) r.push('A oscuras');
    if (ctx.lejos && S.marcas.includes('ANTEOJOS')) r.push('Sin anteojos');
    return r;
  };
  /**
   * Resuelve una prueba con los dados ya tirados.
   * dados: 2 o 3 valores; modo: 'normal'|'ventaja'|'desventaja'; bono: −2..+2; gratis: no marca práctica.
   * Devuelve {usados, descartado, suma, total, cat:'limpio'|'precio'|'fallo', practica, subio}
   */
  M.prueba = function (S, h, dados, modo = 'normal', bono = 0, gratis = false) {
    const ord = dados.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
    let usados = dados.slice(0, 2), descartado = [];
    if (dados.length === 3 && modo !== 'normal') {
      const fuera = modo === 'ventaja' ? ord[0] : ord[2];
      descartado = [fuera.i];
      usados = dados.filter((_, i) => i !== fuera.i);
    }
    const b = u.clamp(bono, -9, 2);
    const nivel = h ? M.hab(S, h) : 0;
    const suma = usados[0] + usados[1];
    const total = suma + nivel + b;
    const cat = total >= 10 ? 'limpio' : total >= 7 ? 'precio' : 'fallo';
    const res = { usados, descartado, suma, nivel, bono: b, total, cat, practica: false, subio: false };
    if (h && !gratis) {
      if (cat === 'fallo') { res.practica = true; res.subio = M.marcarPractica(S, h); }
      if (cat === 'limpio' && S.dia >= 1 && S.dia <= 7) S.prota.semana[h] = (S.prota.semana[h] || 0) + 1;
    }
    return res;
  };
  /** r124: tres casillas; con las tres, sube 1 (máx. 5) y quizás maña (r126). */
  M.marcarPractica = function (S, h, n = 1) {
    const P = S.prota;
    let subio = false;
    for (let k = 0; k < n; k++) {
      if (P.hab[h] >= 5) break;
      P.practica[h] = (P.practica[h] || 0) + 1;
      if (P.practica[h] >= 3) {
        P.practica[h] = 0; P.hab[h] += 1; subio = true;
        M.anotarBitacora(S, `${h} sube a ${P.hab[h]}.`);
        if (P.hab[h] >= 4) M.ganarMana(S, h);
      }
    }
    return subio;
  };
  M.ganarMana = function (S, h) {
    const P = S.prota;
    P.manasHab = P.manasHab || {};
    if (P.manasHab[h]) return null;
    const opciones = D.MANA_HAB[h].filter((m) => !P.manas.includes(m) && m !== 'Reglamentaria');
    P.manasHab[h] = true;
    if (!opciones.length) { P.manaPendiente = true; return null; } // r126: si ya la tenés, elegí otra
    P.manas.push(opciones[0]);
    M.anotarBitacora(S, `Maña nueva: ${opciones[0]} (${h} en 4).`);
    return opciones[0];
  };
  /** r127: al alba del día 8. */
  M.apodo = function (S) {
    const P = S.prota;
    let mejor = null, max = 0;
    for (const h of D.HABS) if ((P.semana[h] || 0) > max) { max = P.semana[h]; mejor = h; }
    if (!mejor) mejor = D.OFICIOS[P.oficio][0];
    const empate = D.HABS.filter((h) => max > 0 && (P.semana[h] || 0) === max);
    return { hab: mejor, empate: empate.length > 1 ? empate : null };
  };

  /* ------------------------------------------------------------ el registro del cuerpo */
  M.herir = function (S, n = 1) { S.prota.heridas = u.clamp(S.prota.heridas + n, 0, S.prota.maxH); };
  M.curar = function (S, n = 1) { S.prota.heridas = u.clamp(S.prota.heridas - n, 0, S.prota.maxH); };
  M.cambiarAnimo = function (S, n) { S.prota.animo = u.clamp(S.prota.animo + n, 0, S.prota.maxAnimo); };
  M.cambiarMoral = function (S, n) { if (S.refugio) S.refugio.moral = u.clamp(S.refugio.moral + n, 0, 10); };
  M.cambiarRastro = function (S, n) { if (S.refugio) S.refugio.rastro = u.clamp(S.refugio.rastro + n, 0, 10); };
  M.cambiarRuido = function (S, n) {
    const antes = S.ruido;
    S.ruido = u.clamp(S.ruido + n, 0, 6);
    // r145: al llegar a 3 y a 6, el barrio responde
    return { antes, ahora: S.ruido, tres: antes < 3 && S.ruido >= 3, seis: antes < 6 && S.ruido >= 6 };
  };
  M.cambiarContador = function (S, n) { S.prota.contador = u.clamp(S.prota.contador + n, 0, 6); };
  M.cambiarRep = function (S, f, n) { S.rep[f] = u.clamp(S.rep[f] + n, -3, 3); };

  /* ------------------------------------------------------------ el grupo (r180–r186) */
  M.personas = (S) => 1 + S.grupo.reduce((a, s) => a + (s.pareja ? 2 : s.perro ? 0 : 1), 0);
  M.sumarSobreviviente = function (S, eid) {
    const F = L().sobrevivientes[eid];
    if (!F || S.grupo.some((s) => s.e === eid)) return null;
    const s = { e: eid, n: F.n, hab: F.hab, nivel: F.nivel, rasgo: F.rasgo, heridas: 0, reservas: 3, fiebre: 0, puesto: null, arma: 'Puños', desde: S.dia, perro: !!F.perro, pareja: !!F.pareja, noches: {} };
    S.grupo.push(s);
    S.ciudad.conocidos.push(eid);
    for (const a of F.avisos) M.nota(S, `${F.n}: a las ${a.cartas} cartas en el grupo`, S.dia + a.cartas, a.ev);
    // r180: cada tres nuevos, +1 Rastro
    S.nuevos = (S.nuevos || 0) + 1;
    if (S.nuevos % 3 === 0) M.cambiarRastro(S, 1);
    M.anotarBitacora(S, `${F.n} se une al grupo.`);
    return s;
  };
  M.quitarSobreviviente = function (S, eid, motivo) {
    const i = S.grupo.findIndex((s) => s.e === eid);
    if (i < 0) return;
    const s = S.grupo.splice(i, 1)[0];
    S.compas = S.compas.filter((x) => x !== eid);
    const m = 'PERDIDO_' + Q.u.norm(s.n).toUpperCase().replace(/[^A-Z]+/g, '_').replace(/^_|_$/g, '');
    M.anotar(S, m);
    S.notas = S.notas.filter((n) => !(n.ev && L().sobrevivientes[eid] && L().sobrevivientes[eid].avisos.some((a) => a.ev === n.ev)));
    M.anotarBitacora(S, `${s.n} ${motivo || 'ya no está'}.`);
  };
  /** r180: «un sobreviviente» al azar; si ya lo conocés, el siguiente. */
  M.sobrevivienteAzar = function (S, d1, d2) {
    const col = d1 <= 2 ? 'A' : d1 <= 4 ? 'B' : 'C';
    const todos = D.SOBREVIVIENTES.A.concat(D.SOBREVIVIENTES.B, D.SOBREVIVIENTES.C);
    let i = todos.indexOf(D.SOBREVIVIENTES[col][d2 - 1]);
    for (let k = 0; k < 18; k++) {
      const e = todos[(i + k) % 18];
      if (!S.ciudad.conocidos.includes(e)) return e;
    }
    return null;
  };

  /* ------------------------------------------------------------ la baraja y el alba (r131–r137) */
  M.nombreCarta = (c) => (typeof c.v === 'number' ? `${c.v} de ${c.palo}` : `${c.v} de ${c.palo}`);
  M.totalCartas = (S) => (S.modo === 'toque' ? 28 : 40);
  M.subeEtapa = function (S, n) {
    const cortes = S.modo === 'toque' ? [8, 15, 22] : [11, 21, 31];
    if (S.dificultad === 'ultimo') return cortes.slice(0, 2).map((x, i) => (i === 0 ? cortes[1] : cortes[2])).includes(n);
    return cortes.includes(n);
  };
  /** Roba la carta del día. Devuelve {carta, dia, etapaSube, ev (figura) o palo (con su tabla)} */
  M.robarCarta = function (S) {
    if (!S.mazo.length) return null;
    const carta = S.mazo.shift();
    S.descarte.push(carta);
    S.dia = S.descarte.length;
    let etapaSube = false;
    if (M.subeEtapa(S, S.dia) && S.etapa < 4) { S.etapa++; etapaSube = true; }
    const B = L().baraja[carta.palo];
    const res = { carta, dia: S.dia, etapaSube, figura: typeof carta.v !== 'number' };
    if (res.figura) res.ev = B.figuras[carta.v];
    else { res.columna = carta.v <= 3 ? 'leve' : 'fuerte'; res.tabla = B[res.columna]; res.evPalo = B.ev; }
    S.fase = 'alba'; S.horas = 6; S.hoyHablo = false; S.hoyCuras = 0;
    M.anotarBitacora(S, `Día ${S.dia}: ${M.nombreCarta(carta)}${etapaSube ? ` · Etapa ${D.ETAPAS[S.etapa]}` : ''}.`);
    return res;
  };
  M.esUltimoDia = (S) => S.dia >= M.totalCartas(S);
  /** Mirar la próxima carta (r136). */
  M.proxima = (S) => S.mazo[0] || null;

  /** r131.4 + r177 + r193: cuánto come el grupo hoy. */
  M.cuentaComida = function (S) {
    const carta = S.descarte[S.descarte.length - 1];
    let n = 1;
    const detalle = ['vos: 1'];
    for (const s of S.grupo) {
      if (s.perro) { if (S.dia % 2 === 0) { n += 1; detalle.push(`${s.n}: 1 (día par)`); } continue; }
      const k = s.pareja ? 2 : s.rasgo === 'Glotón' && carta && carta.palo === 'Oros' ? 2 : 1;
      n += k; detalle.push(`${s.n}: ${k}`);
    }
    if (S.cocinaAyer) {
      const menos = S.prota.manas.includes('La olla grande') && S.cocinaAyerVos ? 2 : 1;
      n = Math.max(0, n - menos); detalle.push(`Cocina: −${menos}`);
    }
    return { n, detalle };
  };
  /** Aplica la comida. reparto: a quién le falta (la app elige al protagonista por defecto). */
  M.comer = function (S) {
    const R = S.refugio, c = M.cuentaComida(S);
    const comen = Math.min(R.viveres, c.n), faltan = c.n - comen;
    R.viveres -= comen;
    if (faltan > 0) {
      M.cambiarMoral(S, -1);
      S.prota.reservas = Math.max(0, S.prota.reservas - faltan);
    }
    // r177: sin Despensa, más de 10 Víveres → se pudre 1 (Gustavo: 14)
    const tope = S.grupo.some((s) => s.e === 'e618') ? 14 : 10;
    let pudre = 0;
    if (!R.inst.includes('Despensa') && R.viveres > tope) { R.viveres--; pudre = 1; }
    S.cocinaAyer = false; S.cocinaAyerVos = false;
    M.anotarBitacora(S, `Comen ${comen}${faltan ? `; faltan ${faltan} (Reservas y −1 Moral)` : ''}${pudre ? '; se pudre 1' : ''}.`);
    return { comen, faltan, pudre, quedan: R.viveres };
  };
  /** r191: la Fiebre sube cada alba (salvo Antiviral). */
  M.fiebreAlba = function (S) {
    const out = [];
    const P = S.prota;
    if (P.fiebre > 0) {
      if (P.antiviral) { P.antiviral = false; out.push('Tu Fiebre no sube (Antiviral).'); }
      else { P.fiebre = Math.min(6, P.fiebre + 1); out.push(`Tu Fiebre sube a ${P.fiebre}.`); }
    }
    if (P.arañazo) { P.arañazo = false; }
    for (const s of S.grupo) if (s.fiebre > 0) {
      if (s.antiviral) s.antiviral = false; else s.fiebre = Math.min(6, s.fiebre + 1);
      out.push(`${s.n}: Fiebre ${s.fiebre}.`);
    }
    if (P.reservas <= 0) { M.herir(S, 1); out.push('Reservas 0: 1 Herida.'); }
    for (const s of S.grupo) if (s.reservas <= 0) { s.heridas = Math.min(3, s.heridas + 1); out.push(`${s.n}: Reservas 0, 1 Herida.`); }
    return out;
  };
  /** Lo que la app sabe que toca este alba (las debilidades y los recordatorios). */
  M.pendientesAlba = function (S) {
    const P = S.prota, r = [];
    if (S.marcas.includes('ASMA')) r.push({ t: 'Asma: gastá 1 inhalador hoy; sin él, retroceder y correr con Desventaja (r105).', tipo: 'asma' });
    if (S.marcas.includes('VICIO') && S.dia % 7 === 0 && S.dia <= 35) r.push({ t: 'Vicio: hoy pagás 1 Víver o 1 Fármaco (o un atado). Si no, abstinencia (r105).', tipo: 'vicio' });
    if (P.abst > 0) r.push({ t: `Abstinencia: −1 Ánimo (quedan ${P.abst} albas).`, tipo: 'abst' });
    if (S.dia === 8 && !P.apodo) r.push({ t: 'Día 8: el grupo te pone un apodo (r127).', tipo: 'apodo' });
    if (S.etapa === 4) r.push({ t: 'Etapa IV: aparece una Procesión nueva en el Perímetro (r155).', tipo: 'procesion' });
    if (S.ciudad.procesiones[S.refugio && S.refugio.barrio]) r.push({ t: 'Hay una Procesión en tu barrio: al alba se va a un vecino al azar (r155).', tipo: 'procRef' });
    const tieneM = (k) => S.marcas.some((m) => m === k || m.startsWith(k + ' '));
    if (tieneM('LA_LUZ_DE_SAN_ROQUE') && S.etapa >= 2 && !S.ciudad.procesiones.sanidad) r.push({ t: 'La luz de San Roque (e233): no hay Procesión en Sanidad, así que ponés una.', tipo: 'luz' });
    if (tieneM('CORIA_ESPERA')) r.push({ t: 'Coria te espera (e801): si pasan 5 días desde que anotaste la Marca sin volver, muere (−1 Juramento) y la borrás.', ev: 'e801', tipo: 'coria' });
    for (const s of S.grupo) {
      if (s.e === 'e600' && S.descarte[S.descarte.length - 1].v === 7) r.push({ t: 'Don Ernesto: cada 7, 1 Fármacos para sus pastillas; si no hay → e601.', ev: 'e601' });
    }
    for (const n of M.notasPara(S, S.dia, 'alba')) r.push({ t: n.texto, ev: n.ev, nota: n.id });
    return r;
  };

  /* ------------------------------------------------------------ la ciudad (r150–r159) */
  M.barrio = (b) => L().barrios[b];
  M.vecinos = function (S, b, capa) { return (M.barrio(b).conex[capa] || []).slice(); };
  /** Distancias por la Calle (para Procesiones y para «volver»). */
  M.distancias = function (desde) {
    const dist = { [desde]: 0 }, cola = [desde];
    while (cola.length) {
      const x = cola.shift();
      for (const v of M.barrio(x).conex.calle) if (dist[v] == null) { dist[v] = dist[x] + 1; cola.push(v); }
    }
    return dist;
  };
  /** Opciones de viaje desde el barrio actual: [{destino, capa, horas, ruido, encuentro, procesion, aviso}] */
  M.viajes = function (S) {
    const P = S.prota, b = S.barrio, out = [];
    const tiene = (n) => P.mochila.some((o) => Q.u.norm(o.n).includes(n));
    for (const capa of ['calle', 'azoteas', 'subsuelo']) {
      for (const v of M.vecinos(S, b, capa)) {
        const o = { destino: v, capa, horas: 1, ruido: 0, encuentro: null, aviso: [] };
        if (S.ciudad.llamas[v] && S.ciudad.llamas[v] >= S.dia) { o.bloqueado = 'En llamas (r159)'; }
        if (capa === 'calle') {
          o.ruido = S.vehiculo && S.vehiculo.usando ? (S.vehiculo.tipo === 'bici' ? 0 : (S.vehiculo.ruido || 2)) : 1;
          if (v === 'perimetro' || b === 'perimetro') if (P.barrio === 'perimetro') o.ruido = 0;
          o.encuentro = 'tabla';
          if (S.ciudad.procesiones[v] || S.ciudad.tomados.includes(v)) { o.procesion = true; o.aviso.push('Procesión: entrar por la Calle → e100'); }
          if (P.amputado === 'pierna') o.horas = 2;
        } else if (capa === 'azoteas') {
          const libre = P.manas.includes('Atajos') || (P.barrio === 'bloques' && (b === 'bloques' || v === 'bloques'));
          o.horas = libre ? 1 : 2;
          o.encuentro = 'e130';
          if (!libre && !tiene('soga') && !tiene('tablones')) o.aviso.push('Piden Soga o Tablones (r151)');
          if (M.casillerosUsados(S) > 6) o.aviso.push('Más de 6 casilleros: [Físico] para no caer');
          if (P.amputado === 'pierna') o.bloqueado = 'Sin una pierna, sin Azoteas (r192)';
        } else {
          o.encuentro = 'e110';
          if (!P.linterna || (P.linterna.usos != null && P.linterna.usos <= 0)) o.aviso.push('A oscuras: Desventaja en todo sin Linterna');
        }
        if (S.ciudad.tomados.includes(v) && capa !== 'calle') o.aviso.push('Barrio tomado: +2 a todas las tablas (r159)');
        out.push(o);
      }
    }
    return out;
  };
  /** Mueve al grupo. Devuelve lo que hay que resolver al llegar. */
  M.mover = function (S, o) {
    const desde = S.barrio;
    S.horas = Math.max(0, S.horas - o.horas);
    S.barrio = o.destino;
    S.enRefugio = !!(S.refugio && S.refugio.barrio === o.destino && S.volviendo);
    S.capaUltima = o.capa;
    S.salidaActiva = true;
    const ruido = o.ruido ? M.cambiarRuido(S, o.ruido) : null;
    S.ciudad.visitados = S.ciudad.visitados || [];
    const primeraVez = !S.ciudad.visitados.includes(o.destino);
    if (primeraVez) S.ciudad.visitados.push(o.destino);
    M.anotarBitacora(S, `${M.barrio(desde).n} → ${M.barrio(o.destino).n} por ${o.capa === 'calle' ? 'la Calle' : o.capa === 'azoteas' ? 'las Azoteas' : 'el Subsuelo'} (◷ ${o.horas}).`);
    return { primeraVez, ruido };
  };
  /** r153: 1d6 + Etapa (+2 de noche, +1 con Ruido 3+, −1 en tu barrio, +1 parando con vehículo). */
  M.modEncuentro = function (S, b) {
    const m = [{ t: 'Etapa', v: S.etapa }];
    if (S.deNoche) m.push({ t: 'de noche', v: 2 });
    if (S.ruido >= 3) m.push({ t: 'Ruido 3+', v: 1 });
    if (b === S.prota.barrio) m.push({ t: 'tu esquina', v: -1 });
    if (S.vehiculo && S.vehiculo.usando && S.vehiculo.tipo !== 'bici') m.push({ t: 'vehículo', v: 1 });
    if (S.ciudad.tomados.includes(b)) m.push({ t: 'tomado', v: 2 });
    return m;
  };
  M.encuentro = function (S, b, d6) {
    const mods = M.modEncuentro(S, b);
    const total = u.clamp(d6 + mods.reduce((a, x) => a + x.v, 0), 2, 12);
    return { total, ev: M.barrio(b).tabla[String(total)], mods };
  };
  /** r155: la Procesión más cercana a un barrio (por la Calle). */
  M.procesionCercana = function (S, b) {
    const d = M.distancias(b);
    let mejor = null;
    for (const x of Object.keys(S.ciudad.procesiones)) if (mejor == null || d[x] < d[mejor]) mejor = x;
    return mejor;
  };
  /** Mueve una Procesión un barrio por la Calle hacia un destino. */
  M.avanzarProcesion = function (S, desde, hacia) {
    if (desde === hacia) return desde;
    const d = M.distancias(hacia);
    const paso = M.barrio(desde).conex.calle.slice().sort((a, b) => d[a] - d[b])[0];
    M.quitarProcesion(S, desde); M.ponerProcesion(S, paso);
    return paso;
  };

  /* ------------------------------------------------------------ saquear (r160–r166) */
  M.stock = function (S, eid) {
    if (S.ciudad.stock[eid] != null) return S.ciudad.stock[eid];
    const lug = L().lugares[eid];
    let s = lug ? lug.stock : 0;
    if (lug && S.ciudad.humo.includes(lug.barrio)) s = Math.max(0, s - 1);
    return s;
  };
  /** Revisar: tacha stock y dice cuántas tiradas en qué tabla. */
  M.revisar = function (S, eid, aFondo) {
    const lug = L().lugares[eid] || (S.refugio && eid === S.refugio.id ? { botin: S.refugio.botin, stock: S.refugio.stock } : null);
    const antes = eid === (S.refugio && S.refugio.id) ? S.refugio.stock : M.stock(S, eid);
    const tachar = aFondo ? 2 : 1;
    const tiradas = antes > 0 ? (aFondo ? 3 : 1) : 0;
    const despues = Math.max(0, antes - tachar);
    if (S.refugio && eid === S.refugio.id) S.refugio.stock = despues; else S.ciudad.stock[eid] = despues;
    if (S.horas != null && !S.diaCero) S.horas = Math.max(0, S.horas - (aFondo ? 2 : 1));
    let ruido = null;
    if (aFondo && !S.diaCero) ruido = M.cambiarRuido(S, 1);
    return { tabla: lug && lug.botin, tiradas, sinStock: antes <= 0, antes, despues, ruido };
  };
  M.botin = (tabla, d6) => (L().botin[tabla] || {})[String(d6)] || 'Nada';
  M.sinStock = (d6) => ['Nada: alguien llegó antes', 'Nada: alguien llegó antes', 'Un Callado detrás del mostrador: Callados ×1 · Encima', 'Alguien escondido: un sobreviviente (r180)', 'Un material al azar (r165)', 'Un papel escrito: una pista (e560)'][d6 - 1];
  M.marcaBusqueda = function (S, eid, nota) { S.ciudad.busqueda[eid] = { dia: S.dia, stock: M.stock(S, eid), nota: nota || '' }; };
  /** r166: valor de lo que das y lo que recibís. */
  M.valor = (cosa) => (['Fármacos', 'Antiviral', 'Antivirales', 'Combustible'].includes(cosa) ? 2 : cosa === 'Munición' ? 0.5 : 1);

  /* ------------------------------------------------------------ la noche (r134, r175, r181) */
  M.guardias = (S) => S.grupo.filter((s) => s.puesto === 'Guardia' && !s.perro).length + (S.protaPuesto === 'Guardia' ? 1 : 0);
  M.sondeoValor = function (S) {
    const R = S.refugio;
    const m = [{ t: 'Rastro', v: R.rastro }];
    const g = Math.min(2, M.guardias(S));
    if (g) m.push({ t: `Guardia ×${g}`, v: -g });
    if (S.grupo.some((s) => s.perro && !s.fuera)) m.push({ t: 'el Negro', v: -1 });
    if (R.inst.includes('Vigía')) m.push({ t: 'Vigía', v: -1 });
    if (S.ciudad.procesiones[R.barrio]) m.push({ t: 'Procesión en el barrio', v: 2 });
    if (S.marcas.includes('SOLDADO_VIGILANDO')) m.push({ t: 'soldado vigilando', v: 1 });
    const valor = m.reduce((a, x) => a + x.v, 0);
    const abierto = Q.D.FRENTES.find((f) => R.frentes[f] === 0);
    return { valor, m, seguro: !!abierto, frente: abierto || null };
  };
  /** Producción de los puestos (r181). Devuelve la lista de lo que hizo cada uno, sin aplicar las decisiones (Obra: qué frente). */
  M.produccion = function (S) {
    const R = S.refugio, out = [];
    const doble = R.moral >= 8;
    const lista = S.grupo.filter((s) => !s.fuera && s.puesto).map((s) => ({ quien: s.n, s, puesto: s.puesto }));
    if (S.protaPuesto && !S.afuera) lista.push({ quien: 'Vos', s: null, puesto: S.protaPuesto });
    let huerta = 0;
    for (const x of lista) {
      const s = x.s;
      switch (x.puesto) {
        case 'Guardia': out.push({ ...x, txt: 'vigila (−1 al sondeo)' }); break;
        case 'Obra': out.push({ ...x, txt: '+1 Resistencia a un frente (gasta 1 Madera o 1 Metal)', obra: true }); break;
        case 'Cocina':
          if (R.inst.includes('Cocina a leña') || (s == null && S.prota.manas.includes('La olla grande') && S.prota.mochila.some((o) => o.n.includes('Olla')))) {
            if (R.viveres >= 2) { out.push({ ...x, txt: '+1 Moral y mañana el grupo come 1 menos', moral: 1, cocina: true }); }
            else out.push({ ...x, txt: 'no hay 2 Víveres para cocinar' });
          } else out.push({ ...x, txt: 'sin Cocina a leña no cocina' });
          break;
        case 'Enfermería': out.push({ ...x, txt: R.inst.includes('Enfermería') ? `cura ${s && s.hab === 'Medicina' && s.nivel >= 2 ? 2 : M.hab(S, 'Medicina') >= 2 && !s ? 2 : 1} Herida` : 'sin Enfermería no cura', cura: R.inst.includes('Enfermería') ? (s ? (s.hab === 'Medicina' && s.nivel >= 2 ? 2 : 1) : (M.hab(S, 'Medicina') >= 2 ? 2 : 1)) : 0 }); break;
        case 'Huerta':
          if (R.inst.includes('Huerta') && huerta < 2) { huerta++; const v = (s ? s.hab === 'Supervivencia' && s.nivel >= 2 : M.hab(S, 'Supervivencia') >= 2) ? 2 : 1; out.push({ ...x, txt: `+${v} Víver`, viveres: v }); }
          else out.push({ ...x, txt: R.inst.includes('Huerta') ? 'la Huerta ya tiene dos' : 'sin Huerta no produce' });
          break;
        case 'Taller': out.push({ ...x, txt: R.inst.includes('Taller') ? 'fabrica una receta de ◷ 2 o menos' : 'sin Taller no fabrica' }); break;
        case 'Descanso': out.push({ ...x, txt: '1 Ánimo o borra Magullado', descanso: true }); break;
        default: out.push({ ...x, txt: x.puesto });
      }
    }
    return { lista: out, doble };
  };
  M.aplicarProduccion = function (S, prod, obraFrentes) {
    const R = S.refugio;
    let k = 0;
    for (const x of prod.lista) {
      if (x.moral) { M.cambiarMoral(S, x.moral); S.cocinaAyer = true; if (!x.s) S.cocinaAyerVos = true; }
      if (x.viveres) R.viveres += x.viveres;
      if (x.cura) { if (!x.s) M.curar(S, x.cura); }
      if (x.descanso && !x.s) { if (S.prota.heridas === 1) M.curar(S, 1); else M.cambiarAnimo(S, 1); }
      if (x.obra) {
        const f = (obraFrentes || [])[k++];
        const mat = R.mats.Madera > 0 ? 'Madera' : R.mats.Metal > 0 ? 'Metal' : null;
        if (f && mat && R.frentes[f] != null) { R.mats[mat]--; R.frentes[f] = Math.min(10, R.frentes[f] + 1); }
      }
    }
  };
  /** e072: qué frente (1d6) y qué es (1d6). */
  M.frenteSondeo = function (S, d6) {
    const R = S.refugio;
    let f = { 1: 'Puerta', 2: 'Puerta', 3: 'Ventanas', 4: 'Techo', 5: 'Subsuelo' }[d6];
    if (d6 === 6 || (f && R.frentes[f] == null)) f = f === 'Subsuelo' && d6 === 5 ? 'Puerta' : M.frenteDebil(S);
    return f;
  };
  M.frenteDebil = (S) => Q.D.FRENTES.filter((f) => S.refugio.frentes[f] != null).sort((a, b) => S.refugio.frentes[a] - S.refugio.frentes[b])[0];
  M.queEs = function (S, d6) {
    if (d6 <= 3) return { dano: 1, txt: 'Unos pocos empujan y se van: el frente pierde 1.' };
    if (d6 === 4) return { dano: 2, txt: 'Son muchos: el frente pierde 2.', subsuelo: 'e077' };
    if (d6 === 5) return { dano: 0, txt: 'Un especial de la Etapa.', ev: { 1: 'e078', 2: 'e076', 3: 'e075', 4: 'e073' }[S.etapa] };
    return { dano: 0, txt: 'No son Callados.', ev: 'e079' };
  };
  M.danarFrente = function (S, f, n) {
    const R = S.refugio;
    let dano = n;
    if (R.trampas[f] && R.trampas[f].length) dano = Math.max(0, dano - 1);
    R.frentes[f] = Math.max(0, R.frentes[f] - dano);
    return { dano, quedan: R.frentes[f], entraron: R.frentes[f] === 0 };
  };
  /** Cierra la noche: dormir, Moral, siguiente alba. */
  M.cerrarNoche = function (S) {
    const vosGuardia = S.protaPuesto === 'Guardia' || S.afuera;
    S.sinDormir = vosGuardia ? (S.sinDormir || 0) + 1 : 0;
    if (S.sinDormir >= 2) { M.cambiarAnimo(S, -1); S.sinDormir = 0; M.anotarBitacora(S, 'Dos noches sin dormir: −1 Ánimo.'); }
    for (const s of S.grupo) { if (s.fuera) s.fuera = false; }
    S.ruido = 0; S.deNoche = false; S.salidaActiva = false; S.volviendo = false;
    S.protaPuesto = null;
    S.fase = 'amanecer';
  };

  /* ------------------------------------------------------------ combate (r140–r149) */
  M.nuevoCombate = function (S, grupos, opts = {}) {
    return { ronda: 1, grupos: grupos.map((g) => ({ id: u.uid(), n: g.n || 'Callados', cant: g.cant, dist: g.dist || 'Cerca', aguante: g.aguante || 1, dano: 0, vivos: !!g.vivos, ev: g.ev || null })), log: [], terminado: null, escena: opts.escena || null, ruido: 0 };
  };
  /** Distancia de una frase «Callados ×3 · Lejos». */
  M.leerCombate = function (txt) {
    const out = [];
    const re = /\*\*([A-ZÁÉÍÓÚÑ][\wáéíóúñ ]*?) ×(\d+(?:d\d+)?(?:[+−-]\d+)?|\([^)]*\)) · (?:Aguante (\d+)(?: cada uno)? · )?(Lejos|Cerca|Encima)\*\*/g;
    let m;
    while ((m = re.exec(txt))) out.push({ n: m[1], cant: m[2], aguante: m[3] ? +m[3] : null, dist: m[4] });
    return out;
  };
  /** Ataque (r143): devuelve cuántos mata (o cuánto Daño hace) según la categoría. */
  M.ataque = function (cat, arma) {
    const d = arma.dano;
    if (cat === 'limpio') return d;
    if (cat === 'precio') return Math.ceil(d / 2);
    return 0;
  };
  /** Aplica Daño a un grupo: comunes mueren de a 1 por punto; especiales suman hasta su Aguante. */
  M.danarGrupo = function (g, dano) {
    if (g.aguante <= 1) { const m = Math.min(g.cant, dano); g.cant -= m; return m; }
    let muertos = 0;
    g.dano += dano;
    while (g.dano >= g.aguante && g.cant > 0) { g.dano -= g.aguante; g.cant--; muertos++; }
    if (g.cant === 0) g.dano = 0;
    return muertos;
  };
  /** r144: una tirada de mordidas (un dado, con la protección ya restada). */
  M.mordida = function (S, d6, d6b, vivos) {
    const resta = Math.min(2, S.prota.prot.reduce((a, p) => a + (p.resta || 0), 0));
    const v = d6 - resta;
    if (v <= 3) return { v, txt: 'Te soltás.', heridas: 0 };
    if (v <= 5 || vivos) return { v, txt: v === 6 && vivos ? 'Un golpe fuerte: 1 Herida (los vivos no muerden).' : 'Un golpe: 1 Herida.', heridas: 1, casco: true };
    if (d6b <= 3) return { v, txt: 'Los dientes: 1 Herida y un arañazo (prueba de Fiebre, r191).', heridas: 1, arañazo: true };
    return { v, txt: 'Los dientes: 1 Herida y una MORDIDA. La Fiebre empieza en 1 (r191).', heridas: 1, mordida: true };
  };
  /** Avanzar un paso al final de la ronda (r141). */
  M.avanzar = function (C) {
    for (const g of C.grupos) if (!g.vivos && g.cant > 0) g.dist = g.dist === 'Lejos' ? 'Cerca' : 'Encima';
  };
  M.encima = (C) => C.grupos.filter((g) => g.dist === 'Encima' && g.cant > 0).reduce((a, g) => a + g.cant, 0);
  M.quedan = (C) => C.grupos.reduce((a, g) => a + g.cant, 0);

  /* ------------------------------------------------------------ Noche 40 (r220–r225) */
  M.oleadas = function (S) {
    let n = 3 + Math.floor(S.refugio.rastro / 3);
    if (S.dificultad === 'vecino') n -= 1;
    if (S.dificultad === 'ultimo') n += 1;
    if (S.modo === 'lobo') n -= 2;
    return Math.max(1, n);
  };
  M.frenteOleada = (S, d6) => (d6 === 6 ? M.frenteDebil(S) : { 1: 'Puerta', 2: 'Puerta', 3: 'Ventanas', 4: 'Techo', 5: 'Subsuelo' }[d6] || 'Puerta');
  M.empezarNoche40 = function (S) {
    S.fase = 'noche40';
    S.noche40 = { oleada: 0, total: M.oleadas(S), defensores: {}, ultimoCuarto: false, log: [], extra: {} };
  };
  /** Defensa de un frente (r222). defensores: [{quien:'vos'|eid, arma}], vos: categoría de tu prueba, extras: {molotov, aliados, trampas} */
  M.defensa = function (S, f, def, extras = {}) {
    const R = S.refugio;
    let total = R.frentes[f] || 0;
    const det = [`Resistencia ${R.frentes[f] || 0}`];
    const tr = (R.trampas[f] || []).reduce((a, t) => a + (t.valor || 1), 0);
    if (tr && extras.trampas !== false) { total += tr; det.push(`trampas +${tr}`); }
    for (const d of def) {
      if (d.quien === 'vos') {
        const a = d.arma || { dano: 1 };
        const v = d.cat === 'limpio' ? a.dano * 2 : d.cat === 'precio' ? a.dano : 0;
        const p = S.prota.manas.includes('La puerta') && f === 'Puerta' ? 2 : 0;
        total += v + p; det.push(`vos +${v}${p ? ' (+2 La puerta)' : ''}`);
      } else {
        const s = S.grupo.find((x) => x.e === d.quien);
        if (!s || s.perro) continue;
        const a = Q.D.ARMAS[s.arma] || { dano: 1 };
        const v = a.dano + (['Pelea', 'Puntería'].includes(s.hab) && s.nivel >= 2 ? 1 : 0) + (s.rasgo === 'Valiente' ? 1 : 0);
        total += v; det.push(`${s.n} +${v}`);
      }
    }
    if (extras.molotov) { total += 3 * extras.molotov; det.push(`Molotov +${3 * extras.molotov}`); }
    if (extras.aliados) { total += extras.aliados; det.push(`aliados +${extras.aliados}`); }
    if (extras.otros) { total += extras.otros; det.push(`otros +${extras.otros}`); }
    return { total, det };
  };
  M.resolverOleada = function (S, f, fuerza, defensa) {
    const R = S.refugio;
    if (defensa >= fuerza) { R.frentes[f] = Math.max(0, R.frentes[f] - 1); return { aguanta: true, baja: 1, brecha: R.frentes[f] <= 0 }; }
    const dif = fuerza - defensa;
    R.frentes[f] = Math.max(0, R.frentes[f] - dif);
    return { aguanta: false, baja: dif, brecha: R.frentes[f] <= 0, mordidas: true };
  };

  /* ------------------------------------------------------------ fin */
  M.terminar = function (S, ev, titulo) { S.fin = { ev, titulo, dia: S.dia }; S.fase = 'fin'; M.anotarBitacora(S, `Fin: ${titulo}.`); };
})();
