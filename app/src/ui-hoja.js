/* =====================================================================
   CUARENTENA · las hojas
   La cabecera, la navegación y las vistas: la Hoja de protagonista, la
   del refugio, la del grupo, el plano de Tolme y la bitácora. Todo se
   puede corregir a mano: la app ayuda, el jugador manda.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto, Me = Q.mesa;
  const UI = Q.ui;
  const esc = u.esc, boton = Me.boton;
  const VISTAS = [['mesa', 'dado', 'Mesa'], ['hoja', 'persona', 'Hoja'], ['refugio', 'casa', 'Refugio'], ['grupo', 'grupo', 'Grupo'], ['mapa', 'mapa', 'Mapa'], ['bitacora', 'lista', 'Bitácora']];
  const cambia = (fn) => () => { fn(); A.guardar(); UI.cabecera(); UI.pintarVista(); };
  const mas = (fn, t = '+') => el('button.chip.mini', { type: 'button', 'aria-label': t === '+' ? 'Sumar' : 'Restar', onclick: cambia(fn) }, t);

  /* ------------------------------------------------------------ cabecera y navegación */
  UI.cabecera = function () {
    const S = A.S, c = document.getElementById('cabecera');
    if (!S) { c.hidden = true; return; }
    c.hidden = false;
    c.innerHTML = '';
    const P = S.prota, R = S.refugio;
    const fase = { prologo: 'Prólogo', amanecer: 'Amanecer', alba: 'Alba', dia: S.deNoche ? 'Noche afuera' : 'Día', noche: 'Noche', noche40: 'Noche 40', fin: 'Fin' }[S.fase];
    const stat = (k, v, cls = '', titulo = '') => el('span.stat' + cls, { title: titulo }, el('small', k), el('b', String(v)));
    c.append(
      el('div.cab-izq', el('button.marca-app', { type: 'button', onclick: () => Q.crear.menu(), 'aria-label': 'Menú' }, 'CUARENTENA'),
        el('span.cab-dia', { html: `${S.dia ? `Día <b>${S.dia}</b>/${M.totalCartas(S)}` : 'Día 0'} · ${fase}${S.fase === 'dia' ? ` · ◷ ${S.horas}` : ''} · Etapa ${['', 'I', 'II', 'III', 'IV'][S.etapa]}` })),
      el('div.cab-stats',
        stat('Heridas', M.nivelHerida(S), M.grave(S) ? '.malo' : '', 'r190'),
        stat('Ánimo', `${P.animo}/6`, P.animo <= 1 ? '.malo' : '', 'r194'),
        stat('Reservas', `${P.reservas}/6`, P.reservas <= 1 ? '.malo' : '', 'r193'),
        P.fiebre ? stat('Fiebre', P.fiebre, '.malo', 'r191') : null,
        R && S.modo !== 'lobo' ? stat('Moral', R.moral, R.moral <= 2 ? '.malo' : '', 'r182') : null,
        R ? stat('Rastro', R.rastro, '', 'r174') : null,
        R ? stat('Víveres', R.viveres, R.viveres < M.personas(S) ? '.malo' : '', 'r177') : null,
        !S.enRefugio && S.fase === 'dia' ? stat('Ruido', S.ruido, S.ruido >= 3 ? '.malo' : '', 'r154') : null,
        stat(P.contNombre, P.contador, '', 'r198')),
      el('div.cab-der',
        el('button.icono-btn', { type: 'button', title: 'Herramientas', 'aria-label': 'Herramientas', html: T.ico('herramientas'), onclick: () => Q.herramientas.abrir() }),
        el('button.icono-btn', { type: 'button', title: 'El libro', 'aria-label': 'El libro', html: T.ico('libro'), onclick: () => A.abrirLibro(null) }),
        el('button.icono-btn', { type: 'button', title: 'Menú', 'aria-label': 'Menú', html: T.ico('menu'), onclick: () => Q.crear.menu() })));
    const nav = document.getElementById('nav');
    nav.innerHTML = '';
    for (const [v, ico, t] of VISTAS) nav.append(el('button' + (A.vista === v ? '.activa' : ''), { type: 'button', 'aria-current': A.vista === v ? 'page' : null, onclick: () => { A.vista = v; UI.cabecera(); UI.pintarVista(); window.scrollTo(0, 0); }, html: `${T.ico(ico)}<span>${t}</span>` }));
    document.getElementById('app').hidden = false;
  };
  UI.pintarVista = function () {
    const S = A.S;
    const m = document.getElementById('mesa');
    if (!S) return;
    document.querySelectorAll('#marco > [data-vista]').forEach((x) => x.classList.toggle('activa', x.dataset.vista === (A.vista === 'mesa' ? 'mesa' : 'otra')));
    if (A.vista === 'mesa') { Me.pintar(m); return; }
    const o = document.getElementById('otra');
    o.innerHTML = '';
    ({ hoja: hojaProta, refugio: hojaRefugio, grupo: hojaGrupo, mapa: UI.mapa, bitacora: bitacora }[A.vista] || hojaProta)(o, S);
    T.activar(o);
    if (A.vista !== 'mesa') Q.guia.ver('vista-' + A.vista);
  };

  /* ------------------------------------------------------------ Hoja de protagonista */
  function hojaProta(o, S) {
    const P = S.prota;
    o.append(el('header.hoja-cab', el('h2', P.nombre + (P.apodo ? ` «${P.apodo}»` : '')),
      el('p.chico', `${P.edad} · ${P.oficio} · de ${D.BARRIOS[P.barrio].n} · Motivo: ${P.motivo}`)));
    // registro del cuerpo
    const casillas = P.maxH === 4 ? D.HERIDAS_MAYOR : D.HERIDAS;
    const her = el('div.casillas');
    casillas.forEach((n, i) => her.append(el('button.casilla' + (i < P.heridas ? '.llena' : ''), { type: 'button', title: n, onclick: cambia(() => { P.heridas = P.heridas === i + 1 ? i : i + 1; }) }, n)));
    o.append(el('section.bloque', el('h3', { html: `El cuerpo ${Me.ref('r190')}` }), her,
      el('div.contadores',
        contador('Ánimo', P.animo, 6, (n) => M.cambiarAnimo(S, n), 'r194'),
        contador('Reservas', P.reservas, 6, (n) => { P.reservas = u.clamp(P.reservas + n, 0, 6); }, 'r193'),
        contador('Fiebre', P.fiebre, 6, (n) => { P.fiebre = u.clamp(P.fiebre + n, 0, 6); }, 'r191'),
        contador(P.contNombre, P.contador, 6, (n) => M.cambiarContador(S, n), 'r198')),
      el('div.fila-botones',
        P.fiebre > 0 && !P.antiviral ? boton('Tomar un Antiviral (◷ 0)', () => { if (Me.hay('Antivirales') < 1) return A.aviso('No tenés Antivirales.', 'malo'); Me.gastar('Antivirales', 1); P.antiviral = true; A.aviso('La Fiebre no sube al alba siguiente (r191).'); A.guardar(); UI.pintarVista(); }, '.sutil') : null,
        P.antiviral ? el('span.chico', 'Antiviral tomado: mañana la Fiebre no sube.') : null,
        P.arañazo ? el('span.chico.malo', 'Arañazo sin limpiar.') : null,
        S.marcas.includes('LA_FOTO') ? boton('Mirar LA_FOTO: todo el Ánimo', () => { P.animo = P.maxAnimo; M.borrarMarca(S, 'LA_FOTO'); A.guardar(); UI.cabecera(); UI.pintarVista(); }, '.sutil') : null)));
    // habilidades
    const tabla = el('table.habs', el('thead', el('tr', el('th', 'Habilidad'), el('th', 'Nivel'), el('th', { title: 'r124' }, 'Práctica'), el('th', { title: 'r127' }, 'Semana'), el('th', ''))));
    const tb = el('tbody');
    for (const h of D.HABS) {
      const pr = el('span.practica');
      for (let i = 0; i < 3; i++) pr.append(el('button.casilla.mini' + (i < (P.practica[h] || 0) ? '.llena' : ''), { type: 'button', 'aria-label': `Práctica ${i + 1}`, onclick: cambia(() => { P.practica[h] = P.practica[h] === i + 1 ? i : i + 1; }) }));
      tb.append(el('tr', el('td', { title: D.HAB_USO[h] }, el('b', h), el('small', ' ' + D.HAB_USO[h])),
        el('td.nivel', mas(() => { P.hab[h] = Math.max(0, P.hab[h] - 1); }, '−'), el('b', String(M.hab(S, h))), mas(() => { P.hab[h] = Math.min(5, P.hab[h] + 1); })),
        el('td', pr), el('td.semana', '|'.repeat(P.semana[h] || 0)),
        el('td', boton('Probar', () => A.prueba(h), '.sutil.mini'))));
    }
    tabla.append(tb);
    o.append(el('section.bloque', el('h3', { html: `Habilidades ${Me.ref('r120')} ${Me.ref('r124')}` }), el('div.tabla-envoltura', tabla)));
    // mañas
    o.append(el('section.bloque', el('h3', { html: `Mañas ${Me.ref('r126')}` }), el('ul.manas', ...P.manas.map((m) => el('li', el('b', m), ' · ', D.MANAS[m] || ''))),
      P.manaPendiente ? el('p.nota', 'Una Habilidad llegó a 4 y ya tenés su maña: elegí otra en r126 y anotala en las notas.') : null));
    // armas y protección
    const armas = el('div.lista-items');
    P.armas.forEach((a, i) => armas.append(el('div.item', el('b', a.n), el('span.chico', ` Daño ${a.dano} · Ruido ${a.ruido} · ${a.alc}${a.fuego ? ' · fuego' : ''}`),
      a.usos != null ? el('span.usos', mas(() => { a.usos = Math.max(0, a.usos - 1); }, '−'), ` Usos ${a.usos}/${a.max} `, mas(() => { a.usos = Math.min(a.max, a.usos + 1); })) : null,
      a.usos === 0 && S.enRefugio ? boton('Reparar (r206)', () => Q.taller.reparar('arma', i), '.sutil.mini') : null,
      boton('✕', () => { P.armas.splice(i, 1); A.guardar(); UI.pintarVista(); }, '.sutil.mini'))));
    const sel = el('select.campo', { 'aria-label': 'Agregar un arma' }, el('option', { value: '' }, 'Agregar un arma…'), ...Object.keys(D.ARMAS).filter((n) => n !== 'Puños').map((n) => el('option', { value: n }, n)));
    sel.addEventListener('change', () => { if (sel.value) { P.armas.push(M.arma(sel.value)); A.guardar(); UI.pintarVista(); } });
    const prot = el('div.lista-items');
    P.prot.forEach((p, i) => prot.append(el('div.item', el('b', p.n), el('span.chico', ` −${p.resta}${p.casco ? ' · casco' : ''}`), p.usos != null ? el('span.usos', mas(() => { p.usos = Math.max(0, p.usos - 1); }, '−'), ` Usos ${p.usos} `, mas(() => { p.usos++; })) : null, boton('✕', () => { P.prot.splice(i, 1); A.guardar(); UI.pintarVista(); }, '.sutil.mini'))));
    o.append(el('section.bloque', el('h3', { html: `Armas y protección ${Me.ref('r143')} ${Me.ref('r144')}` }), armas, sel,
      el('div.contadores', contador('Munición', P.municion, 99, (n) => { P.municion = Math.max(0, P.municion + n); }, 'r205'),
        P.linterna ? contador(P.linterna.n, P.linterna.usos == null ? '∞' : P.linterna.usos, P.linterna.max || 99, (n) => { if (P.linterna.usos != null) P.linterna.usos = u.clamp(P.linterna.usos + n, 0, P.linterna.max || 99); }, 'e711') : null),
      prot, boton('Agregar protección', () => pedirTexto('Protección', 'Nombre (resta 1)', (t) => P.prot.push({ n: t, resta: 1, usos: null })), '.sutil')));
    // mochila
    const usados = M.casillerosUsados(S);
    const moch = el('div.lista-items');
    P.mochila.forEach((o2, i) => moch.append(el('div.item', el('span', o2.n), el('span.chico', ` · ${o2.cas} cas.`), mas(() => { o2.cas = Math.max(0, o2.cas - 1); }, '−'), mas(() => { o2.cas++; }), boton('✕', () => { P.mochila.splice(i, 1); A.guardar(); UI.cabecera(); UI.pintarVista(); }, '.sutil.mini'))));
    const carga = el('div.lista-items');
    for (const [k, n] of Object.entries(P.carga || {})) carga.append(el('div.item', el('b', `${n} ${k}`), mas(() => Me.moverMat('carga', k, -1), '−'), mas(() => Me.moverMat('carga', k, 1))));
    o.append(el('section.bloque', el('h3', { html: `La Mochila: ${usados} de ${P.cap} casilleros ${Me.ref('r164')}` }), M.sobrecarga(S) ? el('p.nota.malo', 'Cargás de más: Desventaja en Físico y Sigilo.') : null,
      moch, el('p.etq', 'Materiales que llevás'), carga.childNodes.length ? carga : el('p.chico', 'Nada.'),
      el('div.fila-botones', boton('Agregar a la Mochila', () => pedirTexto('Agregar a la Mochila', 'Qué es (1 casillero)', (t) => P.mochila.push({ n: t, cas: 1 })), '.sutil'),
        el('select.campo', { 'aria-label': 'Sumar material', onchange: (e) => { if (e.target.value) { Me.moverMat('carga', e.target.value, 1); A.guardar(); UI.pintarVista(); } } }, el('option', { value: '' }, 'Sumar material…'), ...D.MATERIALES.concat('Víveres', 'Antivirales').map((m) => el('option', { value: m }, m))),
        S.enRefugio && Object.keys(P.carga || {}).length ? boton('Descargar en el refugio', () => Q.acciones.descargar()) : null),
      el('p.chico', `Capacidad: ${P.cap}`), el('div.fila-botones', mas(() => { P.cap = Math.max(0, P.cap - 1); }, '−'), mas(() => { P.cap++; }))));
    o.append(marcasBloque(S));
  }
  function contador(nombre, v, max, fn, regla) {
    return el('div.contador', el('span.etq', { html: `${esc(nombre)}${regla ? ' ' + Me.ref(regla) : ''}` }), mas(() => fn(-1), '−'), el('b', String(v)), mas(() => fn(1)));
  }
  function pedirTexto(titulo, ph, fn) {
    const input = el('input.campo', { type: 'text', placeholder: ph, 'aria-label': ph });
    A.modal(titulo, input, [{ t: 'Cancelar' }, { t: 'Agregar', clase: 'primario', accion: () => { const t = input.value.trim(); if (!t) return false; fn(t); A.guardar(); UI.cabecera(); UI.pintarVista(); } }]);
  }
  UI.pedirTexto = pedirTexto;
  function marcasBloque(S) {
    const lista = el('div.marcas');
    for (const m of S.marcas.slice().sort()) {
      const info = Q.libro.marcas[m] || Q.libro.marcas[m.replace(/_[A-Z0-9_]*$/, '_')] || null;
      lista.append(el('span.marca-chip', { title: info ? (info.d || info) : '' }, m, el('button', { type: 'button', 'aria-label': `Borrar ${m}`, onclick: () => A.modal('Borrar Marca', `<p>¿Borrás <b>${esc(m)}</b>?</p>`, [{ t: 'No' }, { t: 'Borrar', clase: 'primario', accion: () => { M.borrarMarca(S, m); A.guardar(); UI.pintarVista(); } }]) }, '✕')));
    }
    return el('section.bloque', el('h3', { html: `Marcas (${S.marcas.length}) ${Me.ref('r004')}` }), lista,
      boton('Anotar una Marca', () => pedirTexto('Anotar una Marca', 'NOMBRE_DE_LA_MARCA', (t) => M.anotar(S, u.norm(t).toUpperCase().replace(/[^A-Z0-9_]+/g, '_'))), '.sutil'));
  }

  /* ------------------------------------------------------------ Hoja del refugio */
  function hojaRefugio(o, S) {
    const R = S.refugio;
    if (!R) { o.append(el('p.nota', 'Todavía no tenés refugio: lo elegís en el prólogo (e010).')); return; }
    o.append(el('header.hoja-cab', el('h2', R.titulo), el('p.chico', { html: `${esc(Q.libro.barrios[R.barrio].n)} · ${esc(R.tipo)} · stock ${R.stock} · ${Me.ref(R.id)}` })));
    o.append(el('section.bloque', el('div.contadores',
      S.modo !== 'lobo' ? contador('Moral', R.moral, 10, (n) => M.cambiarMoral(S, n), 'r182') : null,
      contador('Rastro', R.rastro, 10, (n) => M.cambiarRastro(S, n), 'r174'),
      contador('Víveres', R.viveres, 99, (n) => { R.viveres = Math.max(0, R.viveres + n); }, 'r177')),
      el('p.chico', { html: `Sondeo esta noche: <b>${M.sondeoValor(S).valor}</b> (2d6 igual o menos, r175). Oleadas en la Noche 40: <b>${M.oleadas(S)}</b> (r221).` })));
    const fr = el('div.frentes');
    for (const f of D.FRENTES) {
      if (R.frentes[f] == null) continue;
      const tr = R.trampas[f] || [];
      fr.append(el('div.frente' + (R.frentes[f] <= 0 ? '.caido' : R.frentes[f] <= 2 ? '.bajo' : ''), el('b', f),
        el('div.res', mas(() => { R.frentes[f] = Math.max(0, R.frentes[f] - 1); }, '−'), el('span.num', String(R.frentes[f])), mas(() => { R.frentes[f] = Math.min(10, R.frentes[f] + 1); })),
        el('div.barra', el('span', { style: { width: R.frentes[f] * 10 + '%' } })),
        el('p.chico', tr.length ? `Trampas: ${tr.map((t) => `${t.n} (${t.valor})`).join(', ')}` : 'Sin trampas'),
        tr.length ? boton('Quitar trampa', () => { tr.pop(); A.guardar(); UI.pintarVista(); }, '.sutil.mini') : null));
    }
    o.append(el('section.bloque', el('h3', { html: `Los frentes ${Me.ref('r171')} ${Me.ref('r172')}` }), fr,
      el('div.fila-botones', boton('Fabricar', () => Q.taller.recetario()), boton('Muro de muebles', () => Q.taller.muroDeMuebles(), '.sutil'), boton('Tablones clavados', () => Q.taller.tablones(), '.sutil'))));
    const inst = el('div.instalaciones');
    for (const [n, ev] of Object.entries(D.INSTALACIONES)) {
      const tiene = R.inst.includes(n);
      inst.append(el('div.inst' + (tiene ? '.tiene' : ''), el('a.ref', { href: '#' + ev, 'data-ref': ev }, n),
        el('button.chip.mini', { type: 'button', onclick: () => { if (tiene) { R.inst = R.inst.filter((x) => x !== n); A.guardar(); UI.pintarVista(); } else Q.taller.instalar(n); } }, tiene ? '✓' : '+')));
    }
    o.append(el('section.bloque', el('h3', { html: `Instalaciones ${Me.ref('r173')}` }), inst));
    const mats = el('div.mats');
    for (const m of D.MATERIALES.concat('Antivirales')) mats.append(el('div.mat', el('span', m), mas(() => Me.moverMat('refugio', m, -1), '−'), el('b', String(R.mats[m] || 0)), mas(() => Me.moverMat('refugio', m, 1))));
    o.append(el('section.bloque', el('h3', { html: `Materiales ${Me.ref('r165')}` }), mats, el('p.chico', R.desarmado ? 'El refugio ya está desarmado.' : 'El refugio todavía se puede desarmar una vez (6 Madera).')));
  }

  /* ------------------------------------------------------------ Hoja del grupo */
  function hojaGrupo(o, S) {
    o.append(el('header.hoja-cab', el('h2', 'El grupo'), el('p.chico', { html: `${M.personas(S)} ${u.plural(M.personas(S), 'persona')} comen cada alba. ${Me.ref('r180')} ${Me.ref('r181')} ${Me.ref('r186')}` })));
    if (S.modo === 'lobo') o.append(el('p.nota', 'Lobo solo: sin sobrevivientes ni Moral (r210).'));
    for (const s of S.grupo) {
      const F = Q.libro.sobrevivientes[s.e] || { ficha: [] };
      const arma = el('select.campo.mini', { 'aria-label': `Arma de ${s.n}`, onchange: (e) => { s.arma = e.target.value; A.guardar(); } }, ...Object.keys(D.ARMAS).map((n) => el('option', { value: n, selected: s.arma === n ? true : null }, n)));
      o.append(el('section.bloque.sobreviviente' + (s.heridas >= 3 ? '.caido' : ''),
        el('div.sv-cab', el('h3', s.n), el('span.chico', `${s.hab} ${s.nivel}${s.rasgo ? ' · ' + s.rasgo : ''} · desde el día ${s.desde}`), el('a.ref', { href: '#' + s.e, 'data-ref': s.e }, s.e)),
        el('div.ficha-sv', { html: F.ficha.slice(1).map((l) => `<p>${T.enLinea(l)}</p>`).join('') }),
        s.perro ? null : el('div.contadores',
          contador('Heridas', `${s.heridas}/3`, 3, (n) => { s.heridas = u.clamp(s.heridas + n, 0, 3); }),
          contador('Reservas', `${s.reservas}/3`, 3, (n) => { s.reservas = u.clamp(s.reservas + n, 0, 3); }),
          contador('Fiebre', s.fiebre, 6, (n) => { s.fiebre = u.clamp(s.fiebre + n, 0, 6); })),
        s.perro ? null : el('div.fila-botones', el('span.etq', 'Arma'), arma, s.fiebre && !s.antiviral ? boton('Antiviral', () => { if (Me.hay('Antivirales') < 1) return A.aviso('No hay Antivirales.'); Me.gastar('Antivirales', 1); s.antiviral = true; A.guardar(); UI.pintarVista(); }, '.sutil.mini') : null,
          boton('Se va o muere', () => A.modal(`Despedir a ${s.n}`, '<p>Sale de la hoja y se anota <code>PERDIDO_</code> (r186). Si murió: −2 Moral.</p>', [{ t: 'Cancelar' }, { t: 'Se fue', accion: () => { M.quitarSobreviviente(S, s.e, 'se va'); A.guardar(); UI.cabecera(); UI.pintarVista(); } }, { t: 'Murió (−2 Moral)', clase: 'primario', accion: () => { M.quitarSobreviviente(S, s.e, 'muere'); M.cambiarMoral(S, -2); A.guardar(); UI.cabecera(); UI.pintarVista(); } }]), '.sutil.mini'))));
    }
    if (!S.grupo.length) o.append(el('p.chico', 'Nadie todavía.'));
    o.append(el('div.fila-botones', boton('Un sobreviviente al azar (r180)', () => Me.sobrevivienteAzar(true), '.sutil'), boton('Ver los 18', () => listaSobrevivientes(S), '.sutil')));
    const fac = el('div.facciones');
    for (const [k, [n, ev]] of Object.entries(D.FACCIONES)) fac.append(el('div.faccion', el('a.ref', { href: '#' + ev, 'data-ref': ev }, n), mas(() => M.cambiarRep(S, k, -1), '−'), el('b', u.firma(S.rep[k])), mas(() => M.cambiarRep(S, k, 1))));
    o.append(el('section.bloque', el('h3', { html: `Las facciones ${Me.ref('r300')}` }), fac));
  }
  function listaSobrevivientes(S) {
    const cuerpo = el('div.lista-elegir');
    for (const col of ['A', 'B', 'C']) for (const id of D.SOBREVIVIENTES[col]) {
      const F = Q.libro.sobrevivientes[id];
      const est = S.grupo.some((s) => s.e === id) ? 'en el grupo' : S.ciudad.conocidos.includes(id) ? 'conocido' : '';
      cuerpo.append(boton(`${F.n} · ${F.hab} ${F.nivel}${est ? ' · ' + est : ''}`, () => { A.cerrarModal(); A.abrirLibro(id); }, '.ancho.sutil'));
    }
    A.modal('Los 18 sobrevivientes', cuerpo, [{ t: 'Cerrar' }]);
  }

  /* ------------------------------------------------------------ el plano de Tolme */
  UI.mapa = function (o, S) {
    const MP = Q.MAPA;
    o.append(el('header.hoja-cab', el('h2', 'El plano de Tolme'), el('p.chico', { html: `Tocá un barrio. ${Me.ref('r150')} ${Me.ref('r151')} ${Me.ref('r155')}` })));
    const NS = 'http://www.w3.org/2000/svg';
    const caja = el('div.mapa-caja');
    caja.innerHTML = UI.svgMapa(S);
    const info = el('div.mapa-info');
    caja.addEventListener('click', (e) => { const g = e.target.closest('[data-b]'); if (g) infoBarrio(info, S, g.dataset.b); });
    o.append(caja, info);
    void NS; void MP;
    infoBarrio(info, S, S.barrio);
    const tes = Object.entries(S.ciudad.tesoros).map(([t, id]) => `<li><b>${esc(t)}</b>: ${Me.ref(id)} · ${esc((Q.libro.lugares[id] || {}).titulo || T.titulo(id))}${S.marcas.some((m) => m.startsWith('TESORO_') && u.norm(m).includes(u.norm(t).split(' ').pop())) ? ' ✓' : ''}</li>`).join('');
    o.append(el('section.bloque', el('h3', { html: `Los Seis Tesoros ${Me.ref('r110')}` }), el('ul', { html: tes }),
      S.ciudad.debilLugar ? el('p.chico', { html: `Lo de tu debilidad está en ${Me.ref(S.ciudad.debilLugar)}.` }) : null));
  };
  UI.svgMapa = function (S, chico) {
    const MP = Q.MAPA;
    const P = MP.barrios;
    const ln = (a, b, des) => { const [xa, ya] = P[a].xy, [xb, yb] = P[b].xy; if (!des) return [xa, ya, xb, yb]; const dx = xb - xa, dy = yb - ya, n = Math.hypot(dx, dy) || 1, ox = (-dy / n) * des, oy = (dx / n) * des; return [xa + ox, ya + oy, xb + ox, yb + oy]; };
    let s = `<svg class="mapa${chico ? ' chico' : ''}" viewBox="0 0 640 600" role="img" aria-label="Plano de Tolme">`;
    s += '<path d="M0,585 C150,560 300,600 430,575 C520,558 590,520 640,505 L640,600 L0,600Z" class="rio"/>';
    s += '<rect x="22" y="40" width="596" height="510" class="muro"/>';
    for (const [a, b] of MP.calle) { const [x1, y1, x2, y2] = ln(a, b); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="calle-borde"/>`; }
    for (const [a, b] of MP.calle) { const [x1, y1, x2, y2] = ln(a, b); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="calle"/>`; }
    for (const [a, b] of MP.subsuelo) { const [x1, y1, x2, y2] = ln(...[a, b].sort((p, q) => P[p].n - P[q].n), 9); s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="subsuelo"/>`; }
    for (const [a, b] of MP.azoteas) { const [x1, y1, x2, y2] = ln(...[a, b].sort((p, q) => P[p].n - P[q].n), -9); s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="azoteas"/>`; }
    for (const [b, B] of Object.entries(P)) {
      const [x, y] = B.xy;
      const cls = ['estacion'];
      if (S && S.barrio === b) cls.push('aca');
      if (S && S.ciudad.humo.includes(b)) cls.push('humo');
      if (S && S.ciudad.tomados.includes(b)) cls.push('tomado');
      if (S && S.ciudad.llamas[b] >= S.dia) cls.push('llamas');
      s += `<g class="${cls.join(' ')}" data-b="${b}" tabindex="0" role="button" aria-label="${esc(B.nombre)}"><circle cx="${x}" cy="${y}" r="21"/><text x="${x}" y="${y + 8}" class="num">${B.n}</text>`;
      if (S && S.refugio && S.refugio.barrio === b) s += `<rect x="${x + 13}" y="${y - 27}" width="16" height="16" class="ref-ico"/><path d="M${x + 15},${y - 17} l6,-6 6,6 v4 h-12z" class="ref-techo"/>`;
      const pro = S ? S.ciudad.procesiones[b] || 0 : 0;
      for (let k = 0; k < pro; k++) s += `<circle cx="${x - 22 + k * 12}" cy="${y + 22}" r="8" class="procesion"/>`;
      if (S && Object.values(S.ciudad.tesoros).some((id) => (Q.libro.lugares[id] || {}).barrio === b)) s += `<text x="${x + 22}" y="${y + 26}" class="tesoro">★</text>`;
      if (S && S.barrio === b) s += `<circle cx="${x}" cy="${y}" r="29" class="aca-anillo"/>`;
      const [dx, dy, ta] = { n: [0, -45, 'middle'], s: [0, 42, 'middle'], e: [30, 6, 'start'], w: [-30, 6, 'end'], ne: [24, -24, 'start'], nw: [-22, -40, 'end'] }[B.anc];
      const lineas = B.nombre.toUpperCase().split('|');
      const yy = y + dy - (B.anc === 'n' ? 17 * (lineas.length - 1) : 0);
      lineas.forEach((l, k) => { s += `<text x="${x + dx}" y="${yy + 17 * k}" text-anchor="${ta}" class="etiqueta">${esc(l)}</text>`; });
      s += '</g>';
    }
    s += '</svg>';
    return s;
  };
  function infoBarrio(info, S, b) {
    const B = Q.libro.barrios[b];
    info.innerHTML = '';
    const pro = S.ciudad.procesiones[b] || 0;
    const conex = (capa) => (B.conex[capa] || []).map((x) => Q.libro.barrios[x].n).join(', ') || '—';
    info.append(el('h3', B.n), el('p.chico', { html: `${Me.ref(B.ev)} · ${b === S.barrio ? '<b>estás acá</b> · ' : ''}${S.refugio && S.refugio.barrio === b ? 'tu refugio · ' : ''}${S.ciudad.humo.includes(b) ? 'humo · ' : ''}Procesiones: ${pro}` }),
      el('ul.chico', el('li', `Calle: ${conex('calle')}`), el('li', `Azoteas: ${conex('azoteas')}`), el('li', `Subsuelo: ${conex('subsuelo')}`)),
      el('div.lugares-mini', ...B.lugares.map((id) => { const L = Q.libro.lugares[id]; const st = M.stock(S, id); const bq = S.ciudad.busqueda[id]; return el('a.ref', { href: '#' + id, 'data-ref': id }, `${L ? L.titulo : id}${L && L.botin ? ` ${'▢'.repeat(st)}` : ''}${bq ? ' ✕' + bq.dia : ''}`); })),
      el('div.fila-botones', el('span.etq', 'Procesión'),
        boton('−', () => { M.quitarProcesion(S, b); A.guardar(); UI.pintarVista(); }, '.chip.mini'), boton('+', () => { M.ponerProcesion(S, b); A.guardar(); UI.pintarVista(); }, '.chip.mini'),
        boton(S.ciudad.tomados.includes(b) ? 'Ya no está tomado' : 'Tomado', () => { if (S.ciudad.tomados.includes(b)) S.ciudad.tomados = S.ciudad.tomados.filter((x) => x !== b); else S.ciudad.tomados.push(b); A.guardar(); UI.pintarVista(); }, '.sutil.mini'),
        boton(S.ciudad.llamas[b] >= S.dia ? 'Apagar' : 'En llamas (1d6 días)', () => { if (S.ciudad.llamas[b] >= S.dia) delete S.ciudad.llamas[b]; else A.tirarDados(1, '6', 0, 'En llamas: días', (v) => { S.ciudad.llamas[b] = S.dia + v; A.guardar(); UI.pintarVista(); }); A.guardar(); UI.pintarVista(); }, '.sutil.mini')));
    T.activar(info);
  }

  /* ------------------------------------------------------------ bitácora y notas */
  function bitacora(o, S) {
    o.append(el('header.hoja-cab', el('h2', 'La bitácora'), el('p.chico', 'Lo que pasó, día por día, y tus recordatorios.')));
    const notas = el('div.lista-items');
    for (const n of S.notas) notas.append(el('div.item', el('span', { html: `${n.dia != null ? `<b>Día ${n.dia}</b> · ` : ''}${n.cuando === 'noche' ? 'noche · ' : ''}${T.enLinea(n.texto)}${n.ev ? ' → ' + Me.ref(n.ev) : ''}` }), boton('✕', () => { S.notas = S.notas.filter((x) => x.id !== n.id); A.guardar(); UI.pintarVista(); }, '.sutil.mini')));
    o.append(el('section.bloque', el('h3', 'Recordatorios'), notas.childNodes.length ? notas : el('p.chico', 'Ninguno.'), boton('Agregar un recordatorio', () => nuevaNota(S), '.sutil')));
    const lista = el('ol.bitacora', { reversed: true });
    let dia = null;
    for (const b of S.bitacora.slice().reverse()) {
      if (b.dia !== dia) { dia = b.dia; lista.append(el('li.dia-sep', dia ? `Día ${dia}` : 'Día 0')); }
      lista.append(el('li', b.txt));
    }
    o.append(el('section.bloque', el('h3', 'Lo que pasó'), lista));
  }
  function nuevaNota(S) {
    const t = el('input.campo', { type: 'text', placeholder: 'Qué recordar', 'aria-label': 'Qué recordar' });
    const d = el('input.campo', { type: 'number', min: S.dia, max: 40, value: S.dia + 1, 'aria-label': 'Para el día' });
    const ev = el('input.campo', { type: 'text', placeholder: 'Evento (opcional): e123', 'aria-label': 'Evento' });
    const cu = el('select.campo', { 'aria-label': 'Cuándo' }, el('option', { value: 'alba' }, 'Al alba'), el('option', { value: 'noche' }, 'A la noche'));
    A.modal('Un recordatorio', el('div.form', t, el('label', 'Para el día ', d), cu, ev), [{ t: 'Cancelar' }, { t: 'Guardar', clase: 'primario', accion: () => {
      if (!t.value.trim()) return false;
      const e = (ev.value.match(/[re]\d{3}/) || [])[0] || null;
      M.nota(S, t.value.trim(), +d.value || S.dia + 1, e, cu.value); A.guardar(); UI.pintarVista();
    } }]);
  }
  UI.nuevaNota = () => nuevaNota(A.S);
})();
