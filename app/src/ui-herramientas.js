/* =====================================================================
   CUARENTENA · herramientas
   Las ayudas automáticas, para usar cuando quieras: una prueba, dados,
   un combate armado a mano, encuentros, botín, sondeo, Procesiones,
   sobrevivientes y materiales al azar, mirar la carta, el resumen.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto, Me = Q.mesa, Ac = Q.acciones;
  const H = (Q.herramientas = {});
  const esc = u.esc, boton = Me.boton;

  H.abrir = function () {
    const S = A.S;
    if (!S) return;
    const t = (titulo, sub, fn) => el('button.herramienta', { type: 'button', onclick: () => { A.cerrarModal(); setTimeout(fn, 20); } }, el('b', titulo), el('span', sub));
    const grid = el('div.herramientas',
      t('Prueba', 'Cualquier Habilidad, con Ventaja, Desventaja y ayudas (r120)', () => H.prueba()),
      t('Dados', '1d6, 2d6, 3d6, 1d3, d66', () => H.dados()),
      t('Combate', 'Armar un combate a mano (r140)', () => H.combate()),
      t('Encuentro', 'Tirar en la tabla de un barrio (r153)', () => H.encuentro()),
      t('Botín', 'Una tirada en una tabla de r162', () => H.botin()),
      t('Revisar un lugar', 'Con su stock, rápido o a fondo (r161)', () => H.revisar()),
      t('Comerciar', 'Valor y Labia (r166)', () => Ac.comerciar()),
      t('Curar', 'Medicina, 1 Fármacos (r190)', () => Ac.curar()),
      t('Sondeo', 'Cuánto vale esta noche (r175)', () => H.sondeo()),
      t('Procesiones', 'Ubicar una nueva o mover la más cercana (r155)', () => H.procesiones()),
      t('Sobreviviente al azar', 'Columna y fila de r180', () => Me.sobrevivienteAzar(true)),
      t('Material al azar', '1d6 de r165', () => H.azar('Material al azar (r165)', D.MAT_AZAR)),
      t('Herramienta al azar', '1d6 de r202', () => H.azar('Herramienta al azar (r202)', D.HERR_AZAR)),
      t('Objeto útil', '1d6 de r163', () => H.azar('Objeto útil (r163)', D.OBJETO_UTIL)),
      t('Mirar la próxima carta', 'Solo si algo te deja (r136)', () => H.mirar()),
      t('Ir a una entrada', 'Jugar cualquier evento en la mesa', () => H.ir()),
      t('Recordatorio', 'Para un día o una noche', () => Q.ui.nuevaNota()),
      t('Resumen de reglas', 'Todo el juego en una página', () => { const r = Q.libro.textos.find((x) => /Resumen/.test(x.titulo)); A.abrirLibro(null); if (r) A.abrirTexto(r); }));
    A.modal('Herramientas', grid, [{ t: 'Cerrar' }], { ancho: true });
    Q.guia.ver('herramientas');
  };

  H.prueba = function () {
    const cuerpo = el('div.lista-elegir');
    for (const h of D.HABS) cuerpo.append(boton(`${h} ${M.hab(A.S, h)} · ${D.HAB_USO[h]}`, () => { A.cerrarModal(); A.prueba(h); }, '.ancho'));
    A.modal('¿Qué Habilidad?', cuerpo, [{ t: 'Cancelar' }]);
  };
  H.dados = function () {
    const cuerpo = el('div.fila-botones',
      ...[['1d6', 1, '6'], ['2d6', 2, '6'], ['3d6', 3, '6'], ['1d3', 1, '3'], ['d66', 1, '66']].map(([t, n, c]) => boton(t, () => { A.cerrarModal(); A.tirarDados(n, c, 0, t); })));
    A.modal('Dados', cuerpo, [{ t: 'Cerrar' }]);
  };
  H.combate = function () {
    const nombre = el('input.campo', { type: 'text', value: 'Callados', 'aria-label': 'Quiénes' });
    const cant = el('input.campo', { type: 'text', value: '2', 'aria-label': 'Cuántos (2, 1d6, 2d6…)' });
    const dist = el('select.campo', { 'aria-label': 'Distancia' }, ...['Lejos', 'Cerca', 'Encima'].map((d) => el('option', { value: d, selected: d === 'Cerca' ? true : null }, d)));
    const ag = el('input.campo', { type: 'number', min: 0, value: '', placeholder: 'Aguante (vacío: el de su ficha)', 'aria-label': 'Aguante' });
    A.modal('Armar un combate', el('div.form', el('label', 'Quiénes ', nombre), el('label', 'Cuántos ', cant), el('label', 'Distancia ', dist), el('label', 'Aguante ', ag), el('p.chico', 'Vivos (Lobos, soldados, saqueadores): no avanzan solos y se rinden con la mitad (r147). Los especiales tienen su ficha en e720–e731.')),
      [{ t: 'Cancelar' }, { t: 'Empezar', clase: 'primario', accion: () => Me.combate(`${nombre.value.trim() || 'Callados'} ×${cant.value.trim() || '1'}${ag.value ? ` · Aguante ${ag.value}` : ''} · ${dist.value}`, { sumar: !!A.S.combate }) }]);
  };
  H.encuentro = function () {
    const S = A.S;
    const cuerpo = el('div.lista-elegir');
    for (const b of Object.keys(Q.libro.barrios)) cuerpo.append(boton(`${Q.libro.barrios[b].n}${b === S.barrio ? ' (acá)' : ''}`, () => { A.cerrarModal(); Ac.encuentro(b).then((ev) => ev && Me.irA(ev)); }, '.ancho' + (b === S.barrio ? '.primario' : '')));
    A.modal('Encuentro en…', cuerpo, [{ t: 'Cancelar' }]);
  };
  H.botin = function () {
    const cuerpo = el('div.lista-elegir');
    for (const tabla of Object.keys(Q.libro.botin)) cuerpo.append(boton(tabla[0].toUpperCase() + tabla.slice(1), () => {
      A.cerrarModal();
      A.tirar([{ tipo: 'x' }], { titulo: `Botín · ${tabla}`, texto: (v) => `<p class="grande">${v[0]}</p><p>${T.enLinea(M.botin(tabla, v[0]))}</p>` });
    }, '.ancho'));
    A.modal('¿Qué tabla? (r162)', cuerpo, [{ t: 'Cancelar' }]);
  };
  H.revisar = function () {
    const S = A.S;
    const cuerpo = el('div.lista-elegir');
    const ids = Q.libro.barrios[S.barrio].lugares.filter((id) => Q.libro.lugares[id] && Q.libro.lugares[id].botin);
    if (S.enRefugio) cuerpo.append(boton(`Tu refugio (stock ${S.refugio.stock})`, () => { A.cerrarModal(); Ac.revisar(S.refugio.id, false); }, '.ancho'));
    for (const id of ids) { const L = Q.libro.lugares[id]; cuerpo.append(el('div.fila-botones', el('span', `${L.titulo} · stock ${M.stock(S, id)}`), boton('Rápido', () => { A.cerrarModal(); Ac.revisar(id, false); }, '.sutil.mini'), boton('A fondo', () => { A.cerrarModal(); Ac.revisar(id, true); }, '.sutil.mini'))); }
    if (!ids.length && !S.enRefugio) cuerpo.append(el('p', 'En este barrio no hay lugares con botín.'));
    A.modal(`Revisar en ${Q.libro.barrios[S.barrio].n}`, cuerpo, [{ t: 'Cerrar' }]);
  };
  H.sondeo = function () {
    const S = A.S;
    if (!S.refugio) return A.aviso('Todavía no tenés refugio.');
    const sv = M.sondeoValor(S);
    A.modal('El sondeo (r175)', `<p>Esta noche vale <b>${sv.valor}</b>: ${sv.m.map((m) => `${esc(m.t)} ${u.firma(m.v)}`).join(' · ')}.</p><p>Con 2d6 igual o menos, hay sondeo (e072). Probabilidad: <b>${prob(sv.valor)} %</b>.</p>${sv.seguro ? `<p><b>${sv.frente} está en 0: sondeo seguro.</b></p>` : ''}`, [{ t: 'Cerrar' }, { t: 'Tirar 2d6', clase: 'primario', accion: () => A.tirar([{ tipo: 'x' }, { tipo: 'x' }], { titulo: `Sondeo: ${sv.valor} o menos`, texto: (v) => `<p class="grande">${v[0] + v[1]}</p><p>${v[0] + v[1] <= sv.valor ? 'Hay sondeo → e072' : 'Nada.'}</p>` }) }]);
  };
  function prob(v) { let n = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b <= v) n++; return Math.round((n / 36) * 100); }
  H.procesiones = function () {
    const S = A.S;
    const pro = Object.keys(S.ciudad.procesiones);
    const cuerpo = el('div',
      el('p', { html: `Ahora: <b>${pro.length ? pro.map((b) => `${esc(Q.libro.barrios[b].n)}${S.ciudad.procesiones[b] > 1 ? ' (doble)' : ''}`).join(', ') : 'ninguna'}</b>.` }),
      el('p.chico', 'Se mueven con las Espadas (e040) y siguen el ruido: si terminás una salida con Ruido 3+, la más cercana avanza un barrio hacia el último donde estuviste. En el Mapa podés sumar o quitar a mano.'),
      el('div.fila-botones',
        boton('Una nueva (2d6)', () => { A.cerrarModal(); A.tirar([{ tipo: 'x' }, { tipo: 'x' }], { titulo: 'Procesión nueva (r155)', texto: (v) => `<p class="grande">${v[0] + v[1]}</p>` }).then((v) => { const s = v[0] + v[1]; const fin = (b) => { M.ponerProcesion(S, b); A.aviso(`Procesión en ${esc(Q.libro.barrios[b].n)}.`); A.guardar(); A.pintar(); }; if (s === 12) A.tirarDados(1, '6', 0, '12: 1–3 Puerto, 4–6 Universidad', (w) => fin(w <= 3 ? 'puerto' : 'universidad')); else fin(D.PROCESION[s]); }); }),
        boton('La más cercana avanza hacia acá', () => { A.cerrarModal(); const p = M.procesionCercana(S, S.barrio); if (!p) return A.aviso('No hay Procesiones.'); const a = M.avanzarProcesion(S, p, S.barrio); A.aviso(`La de ${esc(Q.libro.barrios[p].n)} avanza a ${esc(Q.libro.barrios[a].n)}.`); A.guardar(); A.pintar(); }),
        boton('Ver el Mapa', () => { A.cerrarModal(); A.vista = 'mapa'; Q.ui.cabecera(); Q.ui.pintarVista(); })));
    A.modal('Las Procesiones', cuerpo, [{ t: 'Cerrar' }]);
  };
  H.azar = function (titulo, lista) {
    A.tirar([{ tipo: 'x' }], { titulo, texto: (v) => `<p class="grande">${v[0]}: ${esc(lista[v[0] - 1])}</p><p>${T.enLinea('1 ' + lista[v[0] - 1])}</p>` });
  };
  H.mirar = function () {
    const S = A.S, c = M.proxima(S);
    if (!c) return A.aviso('No quedan cartas.');
    A.modal('La próxima carta (r136)', el('div.centro', Q.fases.naipe(c), el('p', M.nombreCarta(c)), el('p.chico', 'Saber lo que viene no lo cambia. Solo con la Radio o un evento que te deje.')), [
      { t: 'Devolverla arriba', clase: 'primario' },
      { t: 'Mandarla al fondo (una vez por partida)', accion: () => { S.mazo.push(S.mazo.shift()); M.anotarBitacora(S, 'Mandaste la carta de arriba al fondo.'); A.guardar(); A.aviso('La carta va al fondo del mazo.'); } },
    ]);
  };
  H.ir = function () {
    const input = el('input.campo', { type: 'text', placeholder: 'e123', 'aria-label': 'Entrada' });
    A.modal('Ir a una entrada', input, [{ t: 'Cancelar' }, { t: 'Ir', clase: 'primario', accion: () => { const id = (input.value.trim().toLowerCase().match(/^[re]?\d{3}$/) || [])[0]; if (!id) return false; const k = /^\d/.test(id) ? 'e' + id : id; if (!Q.libro.entradas[k]) { A.aviso('No existe.'); return false; } if (k[0] === 'r') A.abrirLibro(k); else Me.irA(k); } }]);
  };
})();
