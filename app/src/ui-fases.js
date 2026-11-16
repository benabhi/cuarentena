/* =====================================================================
   CUARENTENA · las fases del día
   El amanecer (robar la carta), el alba (r131), las horas de luz (r133),
   la noche (r134) y la Noche 40 (r220–r225). Cada pantalla es una lista
   de pasos: la app hace las cuentas, vos decidís y aplicás.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto, Me = Q.mesa, Ac = Q.acciones;
  const F = (Q.fases = {});
  const esc = u.esc, boton = Me.boton, ref = Me.ref;
  const LIB = () => Q.libro.entradas;
  const UI = Q.ui;

  F.pintar = function (cont, S) {
    const fn = { amanecer: F.amanecer, alba: F.alba, dia: F.dia, noche: F.noche, noche40: F.noche40, prologo: F.prologo }[S.fase] || F.amanecer;
    fn(cont, S);
    T.activar(cont);
  };
  const cab = (sobre, titulo, sub) => el('header.fase-cab', el('p.fase-sobre', sobre), el('h2', titulo), sub ? el('p.fase-sub', { html: sub }) : null);
  const paso = (n, titulo, hecho, ...hijos) => el('section.paso' + (hecho ? '.hecho' : ''), el('div.paso-n', hecho ? '✓' : String(n)), el('div.paso-cuerpo', el('h3', titulo), ...hijos));
  const html = (h) => el('div', { html: h });
  F.paso = paso; F.cab = cab;

  F.prologo = function (cont, S) {
    cont.append(cab('Prólogo', 'El día 0'), el('p', 'El prólogo es el tutorial: cada regla aparece cuando hace falta.'), boton('Leer e001', () => Me.irA('e001'), '.primario'));
  };

  /* ------------------------------------------------------------ el naipe */
  const PALO_ICO = { Oros: '◉', Copas: '♥', Espadas: '⚔', Bastos: '♣' };
  F.naipe = function (c, chico) {
    if (!c) return el('div.naipe.vacio', '?');
    const v = typeof c.v === 'number' ? c.v : c.v;
    return el('div.naipe.palo-' + u.norm(c.palo) + (chico ? '.chico' : ''), { 'aria-label': M.nombreCarta(c) },
      el('span.naipe-v', String(v)), el('span.naipe-p', PALO_ICO[c.palo]), el('span.naipe-n', c.palo));
  };

  /* ------------------------------------------------------------ amanecer: robar */
  F.amanecer = function (cont, S) {
    const total = M.totalCartas(S);
    cont.append(cab(S.dia ? `Terminó el día ${S.dia}` : 'Empieza la cuarentena', S.dia ? `Amanece el día ${S.dia + 1}` : 'Robá la primera carta', `Quedan <b>${S.mazo.length}</b> de ${total} cartas. Etapa <b>${D.ETAPAS[S.etapa]}</b>.`));
    if (S.afuera) cont.append(el('p.nota', { html: 'Pasaste la noche afuera: amanecés donde estabas. Tu refugio está en el Mapa.' }));
    if (M.muriendo(S)) cont.append(el('p.nota.malo', { html: '<b>Estás Muriendo</b> (r190): si nadie te cura antes del alba, morís. Curate ahora (Herramientas → Curar) o robá la carta y andá a e990.' }));
    if (!S.mazo.length) {
      cont.append(el('p.nota', { html: 'No quedan cartas: la cuarentena terminó y esta es la Noche 40 (r220).' }),
        boton('La Noche 40', () => { if (!S.enRefugio) return Me.irA('e990'); M.empezarNoche40(S); S.noche40.paso = 'prep'; A.guardar(); A.pintar(); }, '.primario.grande'));
      return;
    }
    cont.append(boton(S.dia ? `Robar la carta del día ${S.dia + 1}` : 'Robar la carta del día 1', () => F.robar(), '.primario.grande'));
    const desc = el('div.descarte', el('p.etq', `El descarte (r132): ${S.descarte.length} ${u.plural(S.descarte.length, 'carta')}`), el('div.naipes', ...S.descarte.slice(-12).map((c) => F.naipe(c, true))));
    if (S.descarte.length) cont.append(desc, resumenBaraja(S));
    Q.guia.ver('amanecer');
  };
  function resumenBaraja(S) {
    const quedan = {};
    for (const p of D.PALOS) quedan[p] = S.mazo.filter((c) => c.palo === p).length;
    const figs = S.mazo.filter((c) => typeof c.v !== 'number').map((c) => `${c.v} de ${c.palo}`);
    return el('p.chico', { html: `Quedan: ${D.PALOS.map((p) => `${p} ${quedan[p]}`).join(' · ')}. Figuras sin salir: ${figs.length ? esc(figs.join(', ')) : 'ninguna'}.` });
  }
  F.robar = function () {
    const S = A.S;
    if (M.muriendo(S) && S.dia > 0) {
      return A.modal('Morís', '<p>Pasaste la noche <b>Muriendo</b> y nadie te curó antes del alba (r190): la partida termina → e990.</p>', [{ t: 'Me curaron (corregir la Hoja)', accion: () => {} }, { t: 'Ir a e990', clase: 'primario', accion: () => Me.irA('e990') }]);
    }
    const r = M.robarCarta(S);
    if (!r) return A.aviso('No quedan cartas.');
    S.alba = { carta: r.carta, ev: r.ev || null, tirada: null, comio: null, fiebre: null, hechos: {} };
    S.afuera = false; S.diaCero = false;
    if (r.etapaSube) setTimeout(() => { A.modal(`Etapa ${D.ETAPAS[S.etapa]}`, `<p>Con la carta ${S.dia} sube la Etapa (r135): <b>${esc(D.ESPECIALES_ETAPA[S.etapa])}</b>.</p><p class="chico">La Etapa se suma a los encuentros de cada barrio (r153).</p>`, [{ t: 'Entendido', clase: 'primario' }]); Q.guia.ver('etapa'); }, 900);
    A.guardar(); A.pintar();
    window.scrollTo(0, 0);
    Q.guia.ver('alba');
  };

  /* ------------------------------------------------------------ el alba (r131) */
  F.alba = function (cont, S) {
    const B = S.alba || (S.alba = { carta: S.descarte[S.descarte.length - 1], hechos: {} });
    const c = B.carta;
    const ultimo = M.esUltimoDia(S);
    cont.append(el('div.alba-cab', F.naipe(c), el('div', el('p.fase-sobre', `Día ${S.dia} de ${M.totalCartas(S)}${ultimo ? ' · el último' : ''}`), el('h2', M.nombreCarta(c)), el('p.fase-sub', { html: `Etapa <b>${D.ETAPAS[S.etapa]}</b> · ${ref('r131')}` }))));
    if (ultimo) cont.append(el('p.nota', { html: '<b>Es el día 40.</b> Resolvé la carta, comé, usá tus 6 horas… y prepará todo: esta noche llega la Marea (r220).' }));
    // 1. la carta
    const B1 = el('div');
    if (typeof c.v !== 'number') {
      B1.append(el('p', { html: `Las figuras son <b>días de historia</b>, una vez por partida cada una (r132).` }), boton(`Jugar ${B.ev}: ${T.titulo(B.ev)}`, () => { B.jugada = true; Me.irA(B.ev); }, B.jugada ? '' : '.primario'));
    } else {
      const col = c.v <= 3 ? 'leve' : 'fuerte';
      const P = Q.libro.baraja[c.palo];
      B1.append(el('p', { html: `<b>${c.palo}</b> es ${{ Oros: 'hallazgo', Copas: 'gente', Espadas: 'amenaza', Bastos: 'refugio y ciudad' }[c.palo]} (${ref(P.ev)}); un ${c.v} usa la columna <b>${col === 'leve' ? 'Leve (1–3)' : 'Fuerte (4–7)'}</b>. Tirá 1d6.` }));
      if (!B.ev) B1.append(boton('Tirar 1d6', () => A.tirarDados(1, '6', 0, `${c.palo} · ${col === 'leve' ? 'Leve' : 'Fuerte'}`, (v) => { B.tirada = v; B.ev = P[col][String(v)]; A.guardar(); A.pintar(); }), '.primario'));
      else B1.append(el('p', { html: `Salió <b>${B.tirada}</b> → ${ref(B.ev)}` }), boton(`Jugar ${B.ev}: ${T.titulo(B.ev)}`, () => { B.jugada = true; Me.irA(B.ev); }, B.jugada ? '' : '.primario'));
      if (c.palo === 'Espadas') B1.append(el('p.chico', { html: 'Los días de <b>Espadas</b> se mueven las Procesiones (r155): lo dice e040.' }));
    }
    cont.append(paso(1, 'La carta del día', B.jugada, B1));
    // 2. comer
    const com = M.cuentaComida(S);
    const B2 = el('div');
    if (B.comio) B2.append(el('p', { html: `Comieron <b>${B.comio.comen}</b>${B.comio.faltan ? `; faltaron <b>${B.comio.faltan}</b>: la app te restó ${B.comio.faltan} ${u.plural(B.comio.faltan, 'Reserva')} a vos y −1 Moral (si preferís que las pierda otro, corregilo en el Grupo, r193)` : ''}${B.comio.pudre ? '; se pudrió 1 (más de 10 sin Despensa, r177)' : ''}. Quedan <b>${B.comio.quedan}</b> Víveres.` }));
    else B2.append(el('p', { html: `Cada persona come 1 Víver: <b>${com.n}</b> (${esc(com.detalle.join(', '))}). Hay <b>${S.refugio ? S.refugio.viveres : 0}</b> en el refugio.${S.afuera ? ' Pasaste la noche afuera: comés de la Mochila o perdés 1 Reserva (r193).' : ''}` }), boton('Comer', () => { B.comio = M.comer(S); Q.guia.ver('comer'); A.guardar(); A.pintar(); }, '.primario'));
    cont.append(paso(2, 'El grupo come', !!B.comio, B2));
    // 3. Fiebre y Reservas
    const conFiebre = S.prota.fiebre > 0 || S.grupo.some((s) => s.fiebre > 0) || S.prota.reservas <= 0 || S.grupo.some((s) => s.reservas <= 0);
    const B3 = el('div');
    if (B.fiebre) B3.append(el('ul', ...B.fiebre.map((t) => el('li', t))));
    else if (!conFiebre) { B3.append(el('p.chico', 'Nadie tiene Fiebre ni Reservas en 0.')); B.fiebre = []; }
    else B3.append(el('p', { html: 'Cada mordido sube 1 su Fiebre (salvo Antiviral) y, con Reservas 0, 1 Herida (r191, r193).' }), boton('Avanzar la Fiebre', () => { B.fiebre = M.fiebreAlba(S); if (!B.fiebre.length) B.fiebre = ['Nada cambia.']; A.guardar(); A.pintar(); if (S.prota.fiebre >= 6) A.modal('Fiebre 6', '<p>Te convertís (r195) → e991.</p>', [{ t: 'Ir a e991', clase: 'primario', accion: () => Me.irA('e991') }]); }, '.primario'));
    if (S.prota.fiebre >= 5) B3.append(el('p.nota.malo', { html: '<b>Fiebre 5</b>: delirios. Cada noche, con 1–2 en 1d6 atacás a alguien del grupo (r191).' }));
    cont.append(paso(3, 'La Fiebre avanza', !!B.fiebre, B3));
    // 4. lo pendiente
    const pend = M.pendientesAlba(S);
    const B4 = el('div');
    if (!pend.length) B4.append(el('p.chico', 'Nada pendiente.'));
    for (const p of pend) {
      const hecho = B.hechos[p.nota || p.tipo];
      const fila = el('div.pendiente' + (hecho ? '.hecho' : ''), el('p', { html: T.enLinea(p.t) }));
      const bt = el('div.fila-botones');
      if (p.ev) bt.append(boton(`Ir a ${p.ev}`, () => { B.hechos[p.nota || p.tipo] = 1; if (p.nota) S.notas = S.notas.filter((n) => n.id !== p.nota); Me.irA(p.ev); }));
      if (p.tipo === 'apodo') bt.append(boton('Ponerte el apodo', () => apodo(S)));
      if (p.tipo === 'procesion') bt.append(boton('Poner la Procesión en el Perímetro', () => { M.ponerProcesion(S, 'perimetro'); B.hechos.procesion = 1; A.aviso('Una Procesión nueva en El Perímetro.'); A.guardar(); A.pintar(); }));
      if (p.tipo === 'procRef') bt.append(boton('Se va a un vecino al azar (1d6)', () => { const vec = Q.libro.barrios[S.refugio.barrio].conex.calle; A.tirarDados(1, '6', 0, 'Adónde va', (v) => { const a = vec[(v - 1) % vec.length]; M.quitarProcesion(S, S.refugio.barrio); M.ponerProcesion(S, a); B.hechos.procRef = 1; A.aviso(`La Procesión se va a ${esc(Q.libro.barrios[a].n)}.`); A.guardar(); A.pintar(); }); }));
      if (p.tipo === 'luz') bt.append(boton('Poner la Procesión en Sanidad', () => { M.ponerProcesion(S, 'sanidad'); B.hechos.luz = 1; A.aviso('Una Procesión en Sanidad, atraída por la luz.'); A.guardar(); A.pintar(); }));
      if (p.tipo === 'asma') bt.append(boton('Gastar 1 inhalador', () => { S.prota.inhaladores = Math.max(0, (S.prota.inhaladores || 0) - 1); B.hechos.asma = 1; A.guardar(); A.pintar(); }));
      if (p.tipo === 'abst') bt.append(boton('−1 Ánimo', () => { M.cambiarAnimo(S, -1); S.prota.abst--; B.hechos.abst = 1; A.guardar(); A.pintar(); }));
      if (!hecho) bt.append(boton('Hecho', () => { B.hechos[p.nota || p.tipo] = 1; if (p.nota) S.notas = S.notas.filter((n) => n.id !== p.nota); A.guardar(); A.pintar(); }, '.sutil'));
      fila.append(bt);
      B4.append(fila);
    }
    cont.append(paso(4, 'Lo pendiente', pend.every((p) => B.hechos[p.nota || p.tipo]), B4));
    if (S.prota.animo <= 0) cont.append(el('p.nota.malo', { html: `<b>Ánimo 0: Quiebre</b> → ${ref('e085')} (r194). Después, vuelve a 2.` }));
    // 5. al día
    const listo = B.jugada && B.comio;
    cont.append(el('div.fila-botones.fin-fase', boton('Empezar el día: 6 horas', () => {
      if (!listo) return A.modal('¿Seguro?', `<p>Te falta ${!B.jugada ? 'jugar la carta' : ''}${!B.jugada && !B.comio ? ' y ' : ''}${!B.comio ? 'que el grupo coma' : ''}.</p>`, [{ t: 'Volver' }, { t: 'Seguir igual', accion: () => F.empezarDia() }]);
      F.empezarDia();
    }, '.primario.grande')));
  };
  function apodo(S) {
    const r = M.apodo(S);
    const cuerpo = el('div', el('p', { html: `El grupo te apoda por <b>${r.hab}</b>${r.empate ? ` (empate: ${r.empate.join(', ')}, elegís)` : ''} (r127). Desde hoy, hablar con el grupo +1.` }));
    const opciones = r.empate || [r.hab];
    A.modal('Tu apodo', cuerpo, opciones.map((h) => ({ t: `APODO_${u.norm(h).toUpperCase()}`, clase: 'primario', accion: () => { S.prota.apodo = h; M.anotar(S, 'APODO_' + u.norm(h).toUpperCase()); S.alba.hechos.apodo = 1; A.guardar(); A.pintar(); } })));
  }
  F.empezarDia = function () {
    const S = A.S;
    S.fase = 'dia'; S.horas = 6; S.deNoche = false; S.hoyHablo = false;
    if (S.refugio && S.barrio === S.refugio.barrio && !S.salidaActiva) S.enRefugio = true;
    A.guardar(); A.pintar();
    window.scrollTo(0, 0);
    Q.guia.ver('dia');
  };

  /* ------------------------------------------------------------ las horas de luz (r133) */
  F.dia = function (cont, S) {
    const b = Q.libro.barrios[S.barrio];
    const dondeTxt = S.enRefugio ? `en <b>${esc(S.refugio.titulo)}</b>` : `en <b>${esc(b.n)}</b>${S.deNoche ? ', de noche' : ''}`;
    cont.append(cab(`Día ${S.dia} · ${M.nombreCarta(S.descarte[S.descarte.length - 1])}`, S.deNoche ? 'Afuera, de noche' : 'Las horas de luz', `Estás ${dondeTxt}. ${ref('r133')}`));
    // horas
    const pips = el('div.horas', { 'aria-label': `Quedan ${S.horas} horas` });
    for (let i = 0; i < 6; i++) pips.append(el('span.hora' + (i < S.horas ? '.queda' : '')));
    cont.append(el('div.medidores', el('div.medidor', el('span.etq', 'Horas'), pips, boton('−', () => { S.horas = Math.max(0, S.horas - 1); A.guardar(); A.pintar(); }, '.chip'), boton('+', () => { S.horas = Math.min(6, S.horas + 1); A.guardar(); A.pintar(); }, '.chip')),
      S.enRefugio ? null : el('div.medidor', el('span.etq', 'Ruido'), el('span.ruido-barra', ...Array.from({ length: 6 }, (_, i) => el('span' + (i < S.ruido ? '.lleno' : '') + (i === 2 || i === 5 ? '.umbral' : '')))), el('b', ` ${S.ruido}`),
        boton('−', () => { M.cambiarRuido(S, -1); A.guardar(); A.pintar(); }, '.chip'), boton('+', () => { const r = M.cambiarRuido(S, 1); A.guardar(); A.pintar(); Me.ruidoResponde(r); }, '.chip'))));
    if (S.horas <= 0) cont.append(el('div.nota', el('p', { html: '<b>Se terminaron las horas: cae la noche</b> (r133).' + (S.enRefugio ? '' : ' Estás afuera: volvés a oscuras (el viaje cuesta igual) o buscás dónde dormir (r158).') }), boton(S.enRefugio ? 'Pasar a la noche' : 'Qué hago', () => F.anochecer(), '.primario')));
    // moverse
    const mov = el('div.viajes');
    const viajes = M.viajes(S);
    for (const capa of ['calle', 'azoteas', 'subsuelo']) {
      const vs = viajes.filter((o) => o.capa === capa);
      if (!vs.length) continue;
      const fila = el('div.capa.capa-' + capa, el('span.capa-n', { calle: 'Calle', azoteas: 'Azoteas', subsuelo: 'Subsuelo' }[capa]));
      for (const o of vs) {
        const esRef = S.refugio && o.destino === S.refugio.barrio;
        const txt = `${esRef ? '⌂ ' : ''}${Q.libro.barrios[o.destino].n} · ◷ ${o.horas}${o.ruido ? ` · +${o.ruido} Ruido` : ''}${o.procesion ? ' · Procesión' : ''}`;
        fila.append(el('button.btn.viaje' + (o.procesion ? '.peligro' : ''), { type: 'button', disabled: o.bloqueado ? true : null, title: (o.aviso || []).concat(o.bloqueado || []).join(' · '), onclick: () => confirmarViaje(o) }, txt));
      }
      mov.append(fila);
    }
    const secMov = el('section.bloque', el('h3', 'Moverse'), el('p.chico', { html: `La Calle suma Ruido y tira encuentro (r153); las Azoteas, lentas y con Soga o Tablones; el Subsuelo, oscuro y siempre ${ref('e110')}. ${ref('r151')}` }), mov);
    if (S.enRefugio && S.grupo.some((s) => !s.perro)) secMov.append(compas(S));
    cont.append(secMov);
    // el barrio
    const lugares = el('div.lugares');
    for (const id of b.lugares) {
      const L = Q.libro.lugares[id];
      if (!L) continue;
      const st = M.stock(S, id);
      const tes = Object.keys(S.ciudad.tesoros).some((t) => S.ciudad.tesoros[t] === id);
      const busq = S.ciudad.busqueda[id];
      lugares.append(el('div.lugar' + (L.botin && st <= 0 ? '.vacio' : ''),
        el('div', el('b', L.titulo), el('span.chico', ` · ${L.tipo}`), tes ? el('span.tesoro', ' ★') : null),
        L.botin ? el('p.chico', `${'▢'.repeat(st)}${'■'.repeat(Math.max(0, L.stock - st))}${busq ? ` · X día ${busq.dia}${busq.nota ? ': ' + busq.nota : ''}` : ''}`) : null,
        el('div.fila-botones', boton(`Entrar · ${id}`, () => Me.irA(id)),
          L.botin ? boton('Rápido ◷ 1', () => Ac.revisar(id, false), '.sutil') : null,
          L.botin ? boton('A fondo ◷ 2', () => Ac.revisar(id, true), '.sutil') : null)));
    }
    cont.append(el('section.bloque', el('h3', `${b.n}`), el('p.chico', { html: `El barrio: ${ref(b.ev)} · ir de un lugar a otro del mismo barrio no cuesta tiempo (r152).${S.ciudad.procesiones[S.barrio] ? ' <b>Hay una Procesión acá.</b>' : ''}` }), lugares));
    // el refugio
    if (S.enRefugio) {
      const R = S.refugio;
      cont.append(el('section.bloque', el('h3', 'En el refugio'),
        el('div.acciones-grid',
          accion('Fabricar', 'El taller: recetas, materiales, ◷ según la receta', () => Q.taller.recetario()),
          accion('Curar', 'Medicina, 1 Fármacos, ◷ 1', () => Ac.curar()),
          accion('Hablar con el grupo', 'Labia, ◷ 1, una vez por día', () => Ac.hablar(), S.hoyHablo || !S.grupo.some((s) => !s.perro)),
          accion('Descansar', '◷ 2: +1 Ánimo', () => Ac.descansar()),
          accion('Desarmar', '◷ 1: muebles, electrodomésticos…', () => Ac.desarmar()),
          accion('Descargar la Mochila', 'Pasar los materiales al refugio', () => Ac.descargar(), !Object.keys(S.prota.carga || {}).length),
          accion('Revisar el refugio', `Stock ${R.stock} · ◷ 1 o 2`, () => Ac.revisar(R.id, false), R.stock <= 0 && false),
          accion('Comerciar', 'Labia y el valor de las cosas (r166)', () => Ac.comerciar()))));
    } else if (S.refugio) {
      cont.append(el('p.chico', { html: `Tu refugio está en <b>${esc(Q.libro.barrios[S.refugio.barrio].n)}</b>. Volver es un viaje como cualquier otro (r152).` }));
    }
    cont.append(el('div.fila-botones.fin-fase', boton(S.enRefugio ? 'Terminar el día: cae la noche' : 'Se hace de noche', () => F.anochecer(), '.primario.grande')));
  };
  function accion(t, sub, fn, deshab) {
    return el('button.accion', { type: 'button', disabled: deshab ? true : null, onclick: fn }, el('b', t), el('span', sub));
  }
  function compas(S) {
    const c = el('div.compas', el('p.etq', 'Te acompañan (hasta dos, r185)'));
    for (const s of S.grupo.filter((x) => !x.perro)) {
      const va = S.compas.includes(s.e);
      c.append(el('button.chip' + (va ? '.activo' : ''), { type: 'button', onclick: () => { if (va) S.compas = S.compas.filter((x) => x !== s.e); else if (S.compas.length < 2) S.compas.push(s.e); else A.aviso('Como mucho dos (r185).'); A.guardar(); A.pintar(); } }, `${s.n}${s.rasgo ? ' · ' + s.rasgo : ''}`));
    }
    return c;
  }
  function confirmarViaje(o) {
    const S = A.S;
    const avisos = (o.aviso || []).slice();
    if (S.horas < o.horas) avisos.push(`Quedan ${S.horas} horas: moverte se puede igual, pero llega la noche (r133, r158)`);
    if (!avisos.length) return Ac.viajar(o);
    A.modal(`A ${Q.libro.barrios[o.destino].n}`, `<ul>${avisos.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`, [{ t: 'Mejor no' }, { t: 'Ir', clase: 'primario', accion: () => Ac.viajar(o) }]);
  }

  /** Cae la noche: en el refugio, a la noche; afuera, volver a oscuras o e140 (r158). Día 40: la Marea. */
  F.anochecer = function () {
    const S = A.S;
    if (S.fase !== 'dia') return;
    if (S.salidaNocturna) { // volviste de salir de noche
      S.salidaNocturna = false; S.fase = 'noche'; S.noche = Object.assign(S.noche || {}, { paso: 'produccion' }); A.guardar(); A.pintar(); return;
    }
    if (S.enRefugio) {
      if (M.esUltimoDia(S)) {
        return A.modal('La Noche 40', '<p>Es la última noche. No hay puestos, producción ni sondeo: hay <b>Marea</b> (r220).</p>', [{ t: 'Todavía no' }, { t: 'Que venga', clase: 'primario', accion: () => { M.empezarNoche40(S); S.noche40.paso = 'prep'; A.guardar(); A.pintar(); window.scrollTo(0, 0); Q.guia.ver('noche40'); } }]);
      }
      S.fase = 'noche'; S.horas = 0; S.noche = { paso: 'puestos' }; S.sondeo = null; S.sondeoDano = false;
      A.guardar(); A.pintar(); window.scrollTo(0, 0);
      Q.guia.ver('noche');
      return;
    }
    S.deNoche = true; S.horas = 0;
    const yaVolvio = S.oscurasDia === S.dia;
    if (M.esUltimoDia(S) && yaVolvio) {
      return A.modal('La Marea te encuentra en la calle', '<p>No llegaste al refugio (r220).</p>', [{ t: 'Ir a e990', clase: 'primario', accion: () => Me.irA('e990') }], { sinCerrar: true });
    }
    if (M.esUltimoDia(S)) {
      return A.modal('La Noche 40 te agarra afuera', `<p>Estás en <b>${esc(Q.libro.barrios[S.barrio].n)}</b> y esta noche llega la Marea (r220). Tenés que volver a oscuras (r158): llegás justo cuando empieza. Si no volvés, la Marea te encuentra en la calle.</p>`, [
        { t: 'Quedarme afuera: e990', accion: () => Me.irA('e990') },
        { t: 'Volver a oscuras', clase: 'primario', accion: () => { S.horas = 3; S.oscurasDia = S.dia; A.aviso('Elegí el viaje al refugio. Al llegar, «Se hace de noche» abre la Noche 40.'); A.guardar(); A.pintar(); } },
      ]);
    }
    A.modal('La noche te agarra afuera', `<p>Estás en <b>${esc(Q.libro.barrios[S.barrio].n)}</b> (r158).</p><ul><li><b>Volver a oscuras:</b> el viaje cuesta igual, con +2 en las tablas y Desventaja sin Linterna. Elegí el viaje en «Moverse».</li><li><b>Buscar dónde dormir</b> → e140. Esa noche tu puesto queda vacío.</li></ul>`, [
      yaVolvio ? null : { t: 'Volver a oscuras', accion: () => { S.horas = 3; S.oscurasDia = S.dia; A.aviso('Tenés lo justo para volver: elegí el viaje.'); A.guardar(); A.pintar(); } },
      { t: 'Dormir afuera: e140', clase: 'primario', accion: () => { S.afuera = true; S.fase = 'noche'; S.noche = { paso: 'produccion' }; S.protaPuesto = null; Me.irA('e140'); } },
    ]);
  };

  /* ------------------------------------------------------------ la noche (r134) */
  F.noche = function (cont, S) {
    const N = S.noche || (S.noche = { paso: 'puestos' });
    const pasos = ['puestos', 'produccion', 'sondeo', 'grupo', 'dormir'];
    const ix = pasos.indexOf(N.paso);
    cont.append(cab(`Día ${S.dia} · noche`, S.afuera ? 'La noche, sin vos' : 'La noche', `Puestos, producción, sondeo, el grupo y dormir. ${ref('r134')}`));
    // 1. puestos
    const P1 = el('div');
    if (ix === 0) {
      P1.append(F.puestos(S), el('div.fila-botones', boton('Salir de noche (r158)', () => salirDeNoche(), '.sutil'), boton('Listo: a la producción', () => { N.paso = 'produccion'; A.guardar(); A.pintar(); }, '.primario')));
    } else P1.append(el('p.chico', resumenPuestos(S)));
    cont.append(paso(1, 'Puestos (r181)', ix > 0, P1));
    // 2. producción
    const P2 = el('div');
    if (ix === 1) {
      const prod = M.produccion(S);
      if (!prod.lista.length) P2.append(el('p.chico', 'Nadie tiene un puesto que produzca.'));
      P2.append(el('ul', ...prod.lista.map((x) => el('li', { html: `<b>${esc(x.quien)}</b> · ${esc(x.puesto)}: ${esc(x.txt)}` }))));
      if (prod.doble) P2.append(el('p.nota', { html: '<b>Moral 8 o más</b>: un puesto produce el doble (r182). Aplicalo a mano.' }));
      if (prod.lista.some((x) => x.puesto === 'Taller' && /fabrica/.test(x.txt))) P2.append(boton('Abrir el taller (◷ 2 o menos)', () => Q.taller.recetario({ maxHoras: 2, gratis: true }), '.sutil'));
      if (S.prota.manas.includes('Manos de guardia') && !S.afuera) P2.append(el('p.chico', { html: '<i>Manos de guardia</i>: curás 1 Herida a quien quieras.' }), boton('Curar 1 Herida (Manos de guardia)', () => Me.elegirPersona('¿A quién? (Manos de guardia)', (q) => { if (q === 'vos') M.curar(S, 1); else { const s = S.grupo.find((x) => x.e === q); if (s) s.heridas = Math.max(0, s.heridas - 1); } A.guardar(); A.pintar(); }), '.sutil'));
      P2.append(boton('Aplicar la producción', () => F.aplicarProduccion(S, prod, () => { N.paso = 'sondeo'; A.guardar(); A.pintar(); }), '.primario'));
    } else if (ix > 1) P2.append(el('p.chico', N.prodTxt || 'Hecho.'));
    cont.append(paso(2, 'Producción', ix > 1, P2));
    // 3. sondeo
    const P3 = el('div');
    if (ix === 2) {
      const sv = M.sondeoValor(S);
      P3.append(el('p', { html: `El sondeo vale <b>${sv.valor}</b>: ${sv.m.map((m) => `${esc(m.t)} ${u.firma(m.v)}`).join(' · ')}. Tirá 2d6: con <b>${sv.valor} o menos</b>, los Callados tantean el refugio (r175).` }));
      if (sv.seguro) P3.append(el('p.nota.malo', { html: `El frente <b>${sv.frente}</b> está en 0: <b>sondeo seguro</b>, a ese frente (r171).` }), boton('Ir a e072', () => { S.sondeo = { frente: sv.frente, seguro: true }; N.paso = 'grupo'; N.sondeoTxt = `Sondeo seguro a ${sv.frente}.`; Me.irA('e072'); }, '.primario'));
      else P3.append(boton('Tirar 2d6', () => A.tirar([{ tipo: 'x' }, { tipo: 'x' }], {
        titulo: `Sondeo: ${sv.valor} o menos`,
        texto: (v) => { const t = v[0] + v[1]; return `<p class="grande">${t}</p><p>${t <= sv.valor ? `<b>Hay sondeo</b> → e072.` : 'Nada. La noche pasa tranquila.'}</p>`; },
        botones: (v) => { const t = v[0] + v[1]; return t <= sv.valor ? [{ t: 'Ir a e072', clase: 'primario', accion: () => { S.sondeo = {}; N.paso = 'grupo'; N.sondeoTxt = `Sondeo (${t} ≤ ${sv.valor}).`; Me.irA('e072'); } }] : [{ t: 'Seguir', clase: 'primario', accion: () => { N.paso = 'grupo'; N.sondeoTxt = `Sin sondeo (${t} > ${sv.valor}).`; A.guardar(); A.pintar(); } }]; },
      }), '.primario'));
      Q.guia.ver('sondeo');
    } else if (ix > 2) P3.append(el('p.chico', N.sondeoTxt || 'Hecho.'));
    cont.append(paso(3, 'El sondeo (r175)', ix > 2, P3));
    // 4. el grupo
    const P4 = el('div');
    if (ix === 3) {
      const moral = S.refugio.moral;
      if (S.modo !== 'lobo' && moral <= 0) P4.append(el('p.nota.malo', { html: '<b>Moral 0</b>: el grupo se rompe (r182).' }), boton('Ir a e089', () => Me.irA('e089'), '.primario'));
      else if (S.modo !== 'lobo' && moral <= 2) P4.append(el('p.nota.malo', { html: `<b>Moral ${moral}</b>: crisis (r182).` }), boton('Ir a e080', () => { N.crisis = true; Me.irA('e080'); }, '.primario'));
      else P4.append(el('p.chico', `Moral ${moral}: sin crisis.`));
      if (S.prota.fiebre >= 5) P4.append(el('p.nota.malo', { html: 'Fiebre 5: con 1–2 en 1d6 atacás a alguien del grupo (r191).' }), boton('Tirar 1d6', () => A.tirarDados(1, '6', 0, 'Delirio'), '.sutil'));
      for (const n of M.notasPara(S, S.dia, 'noche')) P4.append(el('div.pendiente', el('p', { html: T.enLinea(n.texto) }), el('div.fila-botones', n.ev ? boton(`Ir a ${n.ev}`, () => { S.notas = S.notas.filter((x) => x.id !== n.id); Me.irA(n.ev); }) : null, boton('Hecho', () => { S.notas = S.notas.filter((x) => x.id !== n.id); A.guardar(); A.pintar(); }, '.sutil'))));
      if (S.prota.arañazo) P4.append(el('p.nota.malo', { html: 'Tenés un <b>arañazo</b> sin limpiar: antes de dormir, `[Medicina]` con 1 Fármacos (con 7+, nada). Si no, la Fiebre empieza en 1 (r191).' }), el('div.fila-botones', boton('Limpiarlo', () => limpiarArañazo(), '.sutil'), boton('No lo limpio', () => { S.prota.arañazo = false; S.prota.fiebre = Math.max(1, S.prota.fiebre); A.guardar(); A.pintar(); }, '.sutil')));
      P4.append(boton('Listo: a dormir', () => { N.paso = 'dormir'; A.guardar(); A.pintar(); }, '.primario'));
    } else if (ix > 3) P4.append(el('p.chico', 'Hecho.'));
    cont.append(paso(4, 'El grupo', ix > 3, P4));
    // 5. dormir
    const P5 = el('div');
    if (ix === 4) {
      const vosGuardia = S.protaPuesto === 'Guardia' || S.afuera;
      P5.append(el('p', { html: `Cualquier puesto que no sea Guardia es dormir. ${vosGuardia ? `Vos no dormís${(S.sinDormir || 0) >= 1 ? ': <b>dos noches seguidas, −1 Ánimo</b>' : ''}.` : 'Vos dormís.'}${S.refugio.inst.includes('Dormitorio') && !vosGuardia ? ' Con Dormitorio, dormir sube el Ánimo (r194, e756).' : ''}` }),
        boton('Dormir: termina el día', () => { M.cerrarNoche(S); S.noche = null; A.guardar(); A.pintar(); window.scrollTo(0, 0); }, '.primario.grande'));
    }
    cont.append(paso(5, 'Dormir', false, P5));
  };
  function resumenPuestos(S) {
    const l = S.grupo.filter((s) => s.puesto && !s.perro).map((s) => `${s.n}: ${s.puesto}`);
    l.unshift(`Vos: ${S.afuera ? 'afuera' : S.protaPuesto || 'sin puesto'}`);
    return l.join(' · ');
  }
  function limpiarArañazo() {
    const S = A.S;
    if (Me.hay('Fármacos') < 1) return A.aviso('Limpiar un arañazo pide 1 Fármacos.', 'malo');
    Me.gastar('Fármacos', 1);
    A.prueba('Medicina').then((r) => {
      if (!r) return;
      S.prota.arañazo = false;
      if (r.total < 7) { S.prota.fiebre = Math.max(1, S.prota.fiebre); A.aviso('No alcanzó: la Fiebre empieza en 1 (r191).', 'malo'); }
      else A.aviso('Limpio: nada.');
      A.guardar(); A.pintar();
    });
  }
  function salirDeNoche() {
    const S = A.S;
    A.modal('Salir de noche (r158)', '<p>Usa tu acción de la noche y te da <b>3 horas</b>. Sin Linterna, todo tiene Desventaja; la tabla del barrio suma +2. Tu puesto queda vacío. Cuando vuelvas (o se acaben las horas), seguís con la producción.</p>', [{ t: 'Cancelar' }, { t: 'Salir', clase: 'primario', accion: () => {
      S.protaPuesto = null; S.fase = 'dia'; S.horas = 3; S.deNoche = true; S.salidaNocturna = true; S.enRefugio = true;
      A.guardar(); A.pintar();
    } }]);
  }

  /** Los puestos: un selector por persona. opts.solo: puestos permitidos (prólogo). */
  F.puestos = function (S, opts = {}) {
    const R = S.refugio;
    const req = { Taller: 'Taller', Cocina: 'Cocina a leña', Enfermería: 'Enfermería', Huerta: 'Huerta' };
    const lista = Object.keys(D.PUESTOS).filter((p) => !opts.solo || opts.solo.includes(p));
    const cont = el('div.puestos');
    const fila = (nombre, actual, set, nota) => {
      const f = el('div.puesto-fila', el('span.puesto-quien', nombre), nota ? el('span.chico', nota) : null);
      const ch = el('div.fila-opciones');
      for (const p of lista) {
        const falta = req[p] && !R.inst.includes(req[p]) && !(p === 'Cocina' && S.prota.manas.includes('La olla grande') && nombre === 'Vos');
        ch.append(el('button.chip' + (actual === p ? '.activo' : ''), { type: 'button', disabled: falta ? true : null, title: falta ? `Pide ${req[p]}` : D.PUESTOS[p], onclick: () => { set(actual === p ? null : p); A.guardar(); A.pintar(); } }, p));
      }
      f.append(ch);
      cont.append(f);
    };
    if (S.afuera) cont.append(el('p.chico', 'Pasás la noche afuera: tu puesto queda vacío (r158).'));
    else fila('Vos', S.protaPuesto, (p) => (S.protaPuesto = p));
    for (const s of S.grupo) {
      if (s.perro) { cont.append(el('p.chico', `${s.n} cuida la puerta: −1 al sondeo (está en la cuenta).`)); continue; }
      if (s.fuera && S.afuera) { cont.append(el('p.chico', `${s.n} está afuera con vos.`)); continue; }
      if (s.heridas >= 3) { cont.append(el('p.chico', `${s.n} está Grave: sin puesto hasta curarse (r186).`)); continue; }
      if (s.reservas <= 0) { cont.append(el('p.chico', `${s.n}: Reservas 0, no hace puesto (r193).`)); continue; }
      fila(s.n, s.puesto, (p) => (s.puesto = p), `${s.hab} ${s.nivel}${s.rasgo ? ' · ' + s.rasgo : ''}`);
    }
    cont.append(el('p.chico', { html: `Guardia: −1 al sondeo cada uno, como mucho −2 (r181). Obra gasta 1 Madera o 1 Metal (hay ${R.mats.Madera || 0} y ${R.mats.Metal || 0}).` }));
    return cont;
  };
  /** Aplica la producción, preguntando el frente de cada Obra y a quién cura la Enfermería. */
  F.aplicarProduccion = function (S, prod, alFinal) {
    const obras = prod.lista.filter((x) => x.obra);
    const curas = prod.lista.filter((x) => x.cura);
    const frentes = [];
    const seguirCuras = (i) => {
      if (i >= curas.length) {
        const sinCuras = { lista: prod.lista.filter((x) => !x.cura), doble: prod.doble };
        // descanso de los sobrevivientes: borra Magullado
        for (const x of prod.lista) if (x.descanso && x.s && x.s.heridas === 1 && !S.sondeoDano) x.s.heridas = 0;
        if (S.sondeoDano) for (const x of sinCuras.lista) if (x.descanso) x.descanso = false;
        M.aplicarProduccion(S, sinCuras, frentes);
        S.noche && (S.noche.prodTxt = prod.lista.map((x) => `${x.quien}: ${x.puesto}`).join(' · ') || 'Sin producción.');
        M.anotarBitacora(S, 'Producción: ' + (prod.lista.map((x) => `${x.quien} ${x.puesto}`).join(', ') || 'nada') + '.');
        return alFinal();
      }
      const x = curas[i];
      Me.elegirPersona(`Enfermería (${x.quien}): cura ${x.cura}. ¿A quién?`, (q) => {
        if (q === 'vos') M.curar(S, x.cura); else { const s = S.grupo.find((y) => y.e === q); if (s) s.heridas = Math.max(0, s.heridas - x.cura); }
        seguirCuras(i + 1);
      });
    };
    const seguirObras = (i) => {
      if (i >= obras.length) return seguirCuras(0);
      if (!(S.refugio.mats.Madera > 0 || S.refugio.mats.Metal > 0)) { A.aviso('No hay Madera ni Metal para la Obra.', 'malo'); return seguirCuras(0); }
      Me.elegirFrente(`Obra (${obras[i].quien}): +1 a qué frente`, (f) => { frentes.push(f); seguirObras(i + 1); });
    };
    seguirObras(0);
  };

  /* ------------------------------------------------------------ la Noche 40 (r220–r225) */
  F.noche40 = function (cont, S) {
    const N = S.noche40;
    const R = S.refugio;
    N.paso = N.paso || 'prep';
    N.def = N.def || {};
    cont.append(cab('Día 40 · la Marea', 'La Noche 40', `${N.uc ? 'Encerrados en el Último Cuarto. ' : ''}Oleada <b>${Math.min(N.oleada + (N.paso === 'prep' ? 0 : 0), N.total)}</b> de <b>${N.total}</b>. ${ref('r220')} ${ref('r221')} ${ref('r222')} ${ref('e900')}`));
    cont.append(frentesN40(S));
    if (N.paso === 'prep') return prep40(cont, S, N);
    if (N.paso === 'oleada') return oleada40(cont, S, N);
    if (N.paso === 'entre') return entre40(cont, S, N);
    if (N.paso === 'fin') return fin40(cont, S, N);
  };
  const UC = 'Último Cuarto';
  function frentesN40(S) {
    const R = S.refugio, N = S.noche40;
    const box = el('div.frentes-n40');
    for (const f of D.FRENTES.concat(UC)) {
      const v = f === UC ? N.ucRes ?? (R.inst.includes(UC) ? (S.prota.manas.includes('Ojo de obra') ? 7 : 6) : 2) : R.frentes[f];
      if (v == null) continue;
      const def = defensoresDe(S, f);
      box.append(el('div.frente-n40' + (v <= 0 ? '.caido' : ''), el('b', f), el('span.res', String(v)),
        f !== UC && R.trampas[f] && R.trampas[f].length ? el('span.chico', `trampas: ${R.trampas[f].map((t) => t.n).join(', ')}`) : null,
        el('span.chico', def.length ? def.map((d) => d.nombre).join(', ') : 'nadie')));
    }
    return box;
  }
  function personas40(S) {
    const out = [{ quien: 'vos', nombre: 'Vos' }];
    for (const s of S.grupo) if (!s.perro && !s.fuera) out.push({ quien: s.e, nombre: s.n, s });
    return out;
  }
  function defensoresDe(S, f) { const N = S.noche40; return personas40(S).filter((p) => (N.def[p.quien] || 'Puerta') === f); }
  function prep40(cont, S, N) {
    const R = S.refugio;
    const B = el('div');
    B.append(el('p', { html: 'Cada persona va a un frente. Los que no pueden pelear (chicos, Graves) van al Último Cuarto (r220). Repartí armas, Molotovs y trampas.' }));
    for (const p of personas40(S)) {
      const ch = el('div.fila-opciones', el('span.puesto-quien', p.nombre + (p.s ? ` (${p.s.arma || 'Puños'}${p.s.heridas >= 2 ? ', herido' : ''})` : '')));
      for (const f of D.FRENTES.filter((x) => R.frentes[x] != null).concat(UC)) ch.append(el('button.chip' + ((N.def[p.quien] || 'Puerta') === f ? '.activo' : ''), { type: 'button', onclick: () => { N.def[p.quien] = f; A.guardar(); A.pintar(); } }, f));
      B.append(ch);
    }
    const molo = S.prota.mochila.filter((o) => /molotov/i.test(o.n)).length;
    B.append(el('p.chico', { html: `Oleadas: <b>${N.total}</b> = 3 + Rastro ${R.rastro} ÷ 3${S.dificultad !== 'sobreviviente' ? ' y la dificultad' : ''}${S.modo === 'lobo' ? ', −2 por Lobo solo' : ''} (r221). Molotovs en la Mochila: <b>${molo}</b>. Aliados: ${ref('e905')}.` }),
      el('div.fila-opciones', el('span.etq', 'Oleadas (eventos y Secreto)'), boton('−', () => { N.total = Math.max(1, N.total - 1); A.guardar(); A.pintar(); }, '.chip'), el('b', String(N.total)), boton('+', () => { N.total++; A.guardar(); A.pintar(); }, '.chip')),
      el('div.fila-botones', boton('Leer e900', () => Me.irA('e900')), boton('Tu historia: e906', () => Me.irA('e906'), '.sutil'), boton('Empezar la primera oleada', () => { N.oleada = 1; N.paso = 'oleada'; N.o = {}; A.guardar(); A.pintar(); window.scrollTo(0, 0); }, '.primario.grande')));
    cont.append(paso(1, 'Prepararse (r220)', false, B));
  }
  function oleada40(cont, S, N) {
    const O = N.o || (N.o = {});
    const n = N.oleada;
    const dos = n >= 4 && !N.uc;
    // 1. fuerza
    const B1 = el('div');
    if (O.fuerza == null) B1.append(el('p', { html: `2d6 + ${n} (el número de la oleada).` }), boton('Tirar la Fuerza', () => A.tirar([{ tipo: 'x' }, { tipo: 'x' }], { titulo: `Oleada ${n}: Fuerza`, texto: (v) => `<p class="grande">${v[0] + v[1] + n}</p><p class="chico">${v[0]} + ${v[1]} + ${n}</p>` }).then((v) => { O.fuerza = v[0] + v[1] + n; A.guardar(); A.pintar(); }), '.primario'));
    else B1.append(el('p', { html: `Fuerza <b>${O.fuerza}</b>.` }));
    cont.append(paso(1, `Oleada ${n}: la Fuerza`, O.fuerza != null, B1));
    if (O.fuerza == null) return;
    // 2. frente
    const B2 = el('div');
    if (!O.frentes) {
      if (N.uc) { O.frentes = [{ f: UC, fuerza: O.fuerza }]; }
      else B2.append(el('p', { html: `1d6: 1–2 Puerta, 3 Ventanas, 4 Techo, 5 Subsuelo, 6 el más débil.${dos ? ' Desde la cuarta, <b>dos frentes</b>: la Fuerza se divide (la primera, hacia arriba).' : ''}` }),
        boton('Tirar el frente', () => A.tirar(Array.from({ length: dos ? 2 : 1 }, () => ({ tipo: 'x' })), { titulo: 'Qué frente', texto: (v) => `<p class="grande">${v.map((d) => `${d}: ${M.frenteOleada(S, d)}`).join(' · ')}</p>` }).then((v) => {
          const fs = v.map((d) => { let f = M.frenteOleada(S, d); if (S.refugio.frentes[f] == null) f = M.frenteDebil(S); return f; });
          O.frentes = dos ? [{ f: fs[0], fuerza: Math.ceil(O.fuerza / 2) }, { f: fs[1], fuerza: Math.floor(O.fuerza / 2) }] : [{ f: fs[0], fuerza: O.fuerza }];
          A.guardar(); A.pintar();
        }), '.primario'));
    }
    if (O.frentes) B2.append(el('p', { html: O.frentes.map((x) => `<b>${x.f}</b>: Fuerza ${x.fuerza}`).join(' · ') }));
    cont.append(paso(2, 'El frente', !!O.frentes, B2));
    if (!O.frentes) return;
    // 3. especial
    const B3 = el('div');
    if (O.especial == null) B3.append(boton('Tirar 1d6: ¿especial?', () => A.tirarDados(1, '6', 0, 'Especial (5–6)', (v) => { O.especial = v; A.guardar(); A.pintar(); }), '.primario'));
    else B3.append(el('p', { html: O.especial >= 5 ? `Salió ${O.especial}: viene un especial → ${ref('e901')}` : `Salió ${O.especial}: sin especial.` }), O.especial >= 5 ? boton('Ir a e901', () => Me.irA('e901')) : null);
    cont.append(paso(3, 'El especial', O.especial != null, B3));
    if (O.especial == null) return;
    // 4–5. defensa y resultado, por frente
    O.res = O.res || {};
    O.ext = O.ext || {};
    O.frentes.forEach((x, i) => {
      const f = x.f;
      const E = (O.ext[f] = O.ext[f] || { molotov: 0, aliados: 0, otros: 0 });
      const defs = defensoresDe(S, f);
      const vos = defs.find((d) => d.quien === 'vos');
      const arma = S.prota.armas.slice().sort((a, b) => b.dano - a.dano)[0] || { n: 'Puños', dano: 1 };
      const defList = defs.map((d) => (d.quien === 'vos' ? { quien: 'vos', arma, cat: E.cat || 'fallo' } : { quien: d.quien }));
      let d;
      if (f === UC) {
        const res = N.ucRes ?? (S.refugio.inst.includes(UC) ? (S.prota.manas.includes('Ojo de obra') ? 7 : 6) : 2);
        const tmp = M.defensa(Object.assign({}, S, { refugio: Object.assign({}, S.refugio, { frentes: { [UC]: res }, trampas: {} }) }), UC, defList, E);
        d = tmp;
      } else d = M.defensa(S, f, defList, E);
      const B = el('div');
      B.append(el('p', { html: `Defensa de <b>${f}</b>: <b>${d.total}</b> contra Fuerza <b>${x.fuerza}</b> · ${esc(d.det.join(' · '))}` }));
      if (!O.res[f]) {
        if (vos && !E.cat) B.append(boton(`Tu prueba con ${arma.n} (${arma.fuego || arma.alc === 'Lejos' ? 'Puntería' : 'Pelea'})`, () => A.prueba(arma.fuego || arma.alc === 'Lejos' ? 'Puntería' : 'Pelea').then((r) => { if (!r) return; E.cat = r.cat; if (r.cat === 'fallo') { M.herir(S, 1); A.aviso('6−: nada y 1 Herida (r222).', 'malo'); } A.guardar(); A.pintar(); }), '.primario'));
        else if (vos) B.append(el('p.chico', `Tu prueba: ${E.cat === 'limpio' ? '10+, el doble del Daño' : E.cat === 'precio' ? '7–9, el Daño' : '6−, nada'}.`));
        const molo = S.prota.mochila.filter((o) => /molotov/i.test(o.n)).length;
        B.append(el('div.fila-opciones', el('span.etq', 'Molotov (+3)'), boton('−', () => { if (E.molotov > 0) { E.molotov--; S.prota.mochila.push({ n: 'Molotov', cas: 1 }); } A.guardar(); A.pintar(); }, '.chip'), el('b', String(E.molotov)), boton('+', () => { const i2 = S.prota.mochila.findIndex((o) => /molotov/i.test(o.n)); if (i2 < 0) return A.aviso('No te quedan Molotovs.'); S.prota.mochila.splice(i2, 1); E.molotov++; A.guardar(); A.pintar(); }, '.chip'), el('span.chico', ` (quedan ${molo})`)),
          el('div.fila-opciones', el('span.etq', 'Aliados (e905)'), boton('−', () => { E.aliados = Math.max(0, E.aliados - 1); A.guardar(); A.pintar(); }, '.chip'), el('b', String(E.aliados)), boton('+', () => { E.aliados++; A.guardar(); A.pintar(); }, '.chip')),
          el('div.fila-opciones', el('span.etq', 'Otros (eventos, sobrevivientes)'), boton('−', () => { E.otros--; A.guardar(); A.pintar(); }, '.chip'), el('b', String(E.otros)), boton('+', () => { E.otros++; A.guardar(); A.pintar(); }, '.chip')),
          boton(`Resolver ${f}`, () => resolver(S, N, O, f, x.fuerza, d.total, defs), '.primario'));
      } else {
        const r = O.res[f];
        B.append(el('p', { html: r.aguanta ? `<b>Aguanta.</b> La Resistencia baja 1 de todas formas.` : `<b>No alcanza:</b> la Resistencia baja ${r.baja} y cada defensor tira en Mordidas (r144).` }));
        const resuelta = N.brechas && N.brechas[`${N.oleada}-${f}`];
        if (r.brecha && resuelta) B.append(el('p.nota', { html: `<b>Brecha en ${f}</b> (e920): ${esc(resuelta)}` }));
        else if (r.brecha) B.append(el('p.nota.malo', { html: f === UC ? '<b>El Último Cuarto cae.</b> → e925' : `<b>Brecha en ${f}</b> (r223) → e920: peleás en la brecha, tapás el hueco o se encierran todos en el Último Cuarto.` }),
          el('div.fila-botones', boton(f === UC ? 'Ir a e925' : 'Ir a e920', () => { if (f !== UC) N.brechaEn = f; Me.irA(f === UC ? 'e925' : 'e920'); }, '.primario'),
            f !== UC && !N.uc ? boton('Encerrarse en el Último Cuarto', () => { N.uc = true; for (const p of personas40(S)) N.def[p.quien] = UC; A.aviso('Todos al Último Cuarto: las oleadas que faltan lo golpean a él (r223).'); A.guardar(); A.pintar(); }, '.sutil') : null));
      }
      cont.append(paso(4 + i, `Defender ${f}`, !!O.res[f], B));
    });
    if (O.frentes.every((x) => O.res[x.f] && (!O.res[x.f].brecha || x.f === UC || (N.brechas && N.brechas[`${N.oleada}-${x.f}`])))) {
      cont.append(el('div.fila-botones.fin-fase', boton(n >= N.total ? 'Fue la última oleada' : 'Entre oleadas', () => { N.paso = n >= N.total ? 'fin' : 'entre'; A.guardar(); A.pintar(); window.scrollTo(0, 0); }, '.primario.grande')));
    }
  }
  function resolver(S, N, O, f, fuerza, defensa, defs) {
    let r;
    if (f === UC) {
      const res = N.ucRes ?? (S.refugio.inst.includes(UC) ? (S.prota.manas.includes('Ojo de obra') ? 7 : 6) : 2);
      if (defensa >= fuerza) { N.ucRes = res - 1; r = { aguanta: true, baja: 1 }; } else { N.ucRes = res - (fuerza - defensa); r = { aguanta: false, baja: fuerza - defensa, mordidas: true }; }
      r.brecha = N.ucRes <= 0;
    } else {
      r = M.resolverOleada(S, f, fuerza, defensa);
      if (S.refugio.trampas[f] && S.refugio.trampas[f].length) S.refugio.trampas[f] = []; // cada trampa suma una vez (r222)
    }
    O.res[f] = r;
    N.log.push(`Oleada ${N.oleada}, ${f}: Fuerza ${fuerza} contra ${defensa}: ${r.aguanta ? 'aguanta' : 'baja ' + r.baja}${r.brecha ? ', brecha' : ''}.`);
    M.anotarBitacora(S, N.log[N.log.length - 1]);
    A.guardar(); A.pintar();
    if (!r.aguanta && defs.length) mordidas40(S, defs);
  }
  function mordidas40(S, defs) {
    A.tirar(defs.flatMap(() => [{ tipo: 'x' }, { tipo: 'j' }]), {
      titulo: 'Mordidas de los defensores (r144)',
      texto: (v) => '<ul class="chico">' + defs.map((d, i) => { const d1 = v[i * 2], d2 = v[i * 2 + 1]; if (d.quien === 'vos') { const m = M.mordida(S, d1, d2, false); return `<li>Vos: ${d1} · ${esc(m.txt)}</li>`; } return `<li>${esc(d.nombre)}: ${d1} · ${d1 <= 3 ? 'se suelta' : d1 <= 5 ? '1 Herida' : d2 <= 3 ? '1 Herida y un arañazo' : '1 Herida y una mordida'}</li>`; }).join('') + '</ul>',
    }).then((v) => {
      defs.forEach((d, i) => {
        const d1 = v[i * 2], d2 = v[i * 2 + 1];
        if (d.quien === 'vos') { const m = M.mordida(S, d1, d2, false); if (m.heridas) M.herir(S, m.heridas); if (m.mordida) S.prota.fiebre = Math.max(1, S.prota.fiebre); if (m.arañazo) S.prota.arañazo = true; }
        else { const s = S.grupo.find((x) => x.e === d.quien); if (s && d1 >= 4) s.heridas = Math.min(3, s.heridas + 1); if (s && d1 === 6 && d2 >= 4) s.fiebre = Math.max(1, s.fiebre); }
      });
      A.guardar(); A.pintar();
      if (M.muriendo(S)) A.modal('Caés', '<p>Estás <b>Muriendo</b>. Si nadie te cura entre oleadas y la noche sigue, es el fin → e990.</p>', [{ t: 'Entendido', clase: 'primario' }]);
    });
  }
  function entre40(cont, S, N) {
    const n = N.oleada;
    const B = el('div');
    B.append(el('p', { html: 'Cada persona puede hacer <b>una</b> cosa: cambiar de frente, reforzar (+2 con 1 Madera o 1 Metal), curar (1 Fármacos y Medicina 7+), colocar una trampa ya fabricada o descansar (r224).' }));
    const refo = el('div.fila-botones');
    for (const f of D.FRENTES.filter((x) => S.refugio.frentes[x] != null)) refo.append(boton(`Reforzar ${f} (+2)`, () => {
      const mat = S.refugio.mats.Madera > 0 ? 'Madera' : S.refugio.mats.Metal > 0 ? 'Metal' : null;
      if (!mat) return A.aviso('No hay Madera ni Metal.', 'malo');
      S.refugio.mats[mat]--; S.refugio.frentes[f] = Math.min(10, S.refugio.frentes[f] + 2); A.aviso(`${f}: ${S.refugio.frentes[f]} (−1 ${mat}).`); A.guardar(); A.pintar();
    }, '.sutil'));
    B.append(refo, el('div.fila-botones', boton('Curar a alguien', () => curar40(S), '.sutil'), boton('Cambiar defensores', () => { N.paso = 'prep2'; N.volver = 'entre'; A.guardar(); A.pintar(); }, '.sutil')));
    const leer = (ev) => boton(N.leidos && N.leidos[ev] ? `${ev} ✓ (releer)` : `Ir a ${ev}`, () => { N.leidos = N.leidos || {}; N.leidos[ev] = true; Me.irA(ev); }, N.leidos && N.leidos[ev] ? '.sutil' : '.primario');
    if (n === 2) B.append(el('p.nota', { html: `Después de la <b>segunda</b> oleada → ${ref('e910')}` }), leer('e910'));
    if (n === 4) B.append(el('p.nota', { html: `Después de la <b>cuarta</b> oleada → ${ref('e912')}` }), leer('e912'));
    B.append(el('div.fila-botones.fin-fase', boton(`Oleada ${n + 1}`, () => { N.oleada++; N.paso = 'oleada'; N.o = {}; A.guardar(); A.pintar(); window.scrollTo(0, 0); }, '.primario.grande')));
    cont.append(paso(1, `Entre oleadas (${n} de ${N.total})`, false, B));
  }
  function curar40(S) {
    if (Me.hay('Fármacos', 'refugio') < 1) return A.aviso('Curar pide 1 Fármacos.', 'malo');
    Me.elegirPersona('¿A quién curás? (r224)', (q) => {
      Me.moverMat('refugio', 'Fármacos', -1);
      A.prueba('Medicina').then((r) => {
        if (!r) return;
        if (r.total >= 7) { if (q === 'vos') M.curar(S, 1); else { const s = S.grupo.find((x) => x.e === q); if (s) s.heridas = Math.max(0, s.heridas - 1); } A.aviso('Borrás 1 Herida.'); }
        else A.aviso('El Fármaco se pierde.');
        A.guardar(); A.pintar();
      });
    });
  }
  function fin40(cont, S, N) {
    const vivo = !M.muriendo(S);
    const enPie = N.ucGanada === N.oleada || (N.uc ? (N.ucRes ?? 1) > 0 : D.FRENTES.some((f) => S.refugio.frentes[f] > 0) || (N.ucRes ?? 1) > 0);
    const quedan = S.grupo.filter((s) => !s.perro && s.heridas < 3).length;
    const B = el('div');
    if (vivo && enPie) B.append(el('p', { html: `<b>Sale el sol.</b> Seguís vivo y el refugio sigue en pie (r225). Quedan <b>${quedan}</b> ${u.plural(quedan, 'sobreviviente')} con vos.` }), boton('Ir a e930: el amanecer', () => Me.irA('e930'), '.primario.grande'));
    else if (!vivo) B.append(el('p', { html: '<b>No llegás al amanecer.</b>' }), boton('Ir a e990', () => Me.irA('e990'), '.primario'));
    else B.append(el('p', { html: '<b>El refugio cayó.</b>' }), boton('Ir a e925', () => Me.irA('e925'), '.primario'));
    cont.append(paso(1, 'El amanecer (r225)', false, B));
    cont.append(el('details.combate-log', el('summary', 'La noche, oleada por oleada'), el('ol', ...N.log.map((t) => el('li', t)))));
  }
  // la preparación también sirve para reacomodar defensores entre oleadas
  const n40 = F.noche40;
  F.noche40 = function (cont, S) {
    const N = S.noche40;
    if (N && N.paso === 'prep2') {
      cont.append(cab('Entre oleadas', 'Cambiar defensores'));
      const R = S.refugio;
      for (const p of personas40(S)) {
        const ch = el('div.fila-opciones', el('span.puesto-quien', p.nombre));
        for (const f of D.FRENTES.filter((x) => R.frentes[x] != null).concat(UC)) ch.append(el('button.chip' + ((N.def[p.quien] || 'Puerta') === f ? '.activo' : ''), { type: 'button', onclick: () => { N.def[p.quien] = f; A.guardar(); A.pintar(); } }, f));
        cont.append(ch);
      }
      cont.append(boton('Listo', () => { N.paso = N.volver || 'entre'; A.guardar(); A.pintar(); }, '.primario'));
      return;
    }
    n40(cont, S);
  };

  /* ------------------------------------------------------------ fin de la partida */
  F.fin = function (cont, S) {
    const P = S.prota;
    const fin = S.fin || {};
    const mot = D.MOTIVOS[P.motivo];
    cont.append(cab(`Día ${fin.dia || S.dia}`, fin.titulo || 'Fin', `${esc(P.nombre)}${P.apodo ? ` («${esc(P.apodo)}»)` : ''} · ${esc(P.oficio)} · ${S.refugio ? esc(S.refugio.titulo) : 'sin refugio'}`));
    const vivos = S.grupo.filter((s) => !s.perro).map((s) => s.n);
    const perdidos = S.marcas.filter((m) => m.startsWith('PERDIDO_')).length;
    cont.append(el('section.bloque', el('h3', 'La cuenta'),
      el('ul', el('li', `Días: ${fin.dia || S.dia} de ${M.totalCartas(S)} · Etapa ${D.ETAPAS[S.etapa]}`),
        el('li', `El grupo: ${vivos.length ? vivos.join(', ') : 'nadie'}${perdidos ? ` · ${perdidos} ${u.plural(perdidos, 'perdido')}` : ''}`),
        S.refugio ? el('li', `Moral ${S.refugio.moral} · Rastro ${S.refugio.rastro} · instalaciones: ${S.refugio.inst.join(', ') || 'ninguna'}`) : null,
        el('li', `${P.contNombre} ${P.contador} · Marcas: ${S.marcas.length}`))));
    cont.append(el('section.bloque', el('h3', 'Los epílogos'), el('p.chico', 'Leelos en orden: tu historia, los tuyos y lo que Tolme recuerda.'),
      el('div.fila-botones', boton(`Tu historia: ${mot.epi}`, () => Me.irA(mot.epi)), boton('Lo que fue de los tuyos: e954', () => Me.irA('e954')), boton('Lo que Tolme recuerda: e955', () => Me.irA('e955')))));
    cont.append(el('div.fila-botones.fin-fase', boton('Nueva partida', () => Q.crear.inicio(), '.primario.grande')));
    Q.guia.ver('fin');
  };
})();
