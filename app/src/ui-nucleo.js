/* =====================================================================
   CUARENTENA · núcleo de la interfaz
   La app (estado, guardado, vistas), la bandeja de dados, la prueba,
   el Libro (buscador de reglas y eventos), los avisos y la guía.
   ===================================================================== */
'use strict';
(function () {
  const A = (Q.app = { S: null, vista: 'mesa', aj: Object.assign({ sonido: true, dados3d: true }, Q.guardado.leer(Q.guardado.AJUSTES) || {}) });
  const el = Q.el, T = Q.texto, M = Q.motor, u = Q.u, D = Q.D;

  A.guardar = function () { if (A.S) Q.guardado.guardar(A.S); };
  A.guardarAjustes = () => Q.guardado.escribir(Q.guardado.AJUSTES, A.aj);
  /** Cambio de estado + guardado + repintado. */
  A.cambio = function (fn) { if (fn) fn(A.S); A.guardar(); A.pintar(); };
  A.pintar = function () {
    if (!A.S) return;
    Q.ui.cabecera();
    Q.ui.pintarVista();
  };

  /* ------------------------------------------------------------ avisos */
  A.aviso = function (txt, tipo = '') {
    const c = document.getElementById('avisos');
    const n = el('div.aviso' + (tipo ? '.' + tipo : ''), { html: txt });
    c.append(n);
    setTimeout(() => n.classList.add('fuera'), 3800);
    setTimeout(() => n.remove(), 4400);
  };

  /* ------------------------------------------------------------ modal */
  A.modal = function (titulo, cuerpo, botones = [], opts = {}) {
    botones = (botones || []).filter(Boolean);
    A.cerrarModal();
    const fondo = el('div.modal-fondo#modal');
    const caja = el('div.modal' + (opts.ancho ? '.ancho' : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-label': titulo });
    const cab = el('div.modal-cab', el('h2', titulo), opts.sinCerrar ? null : el('button.icono-btn', { type: 'button', 'aria-label': 'Cerrar', html: T.ico('cerrar'), onclick: () => A.cerrarModal() }));
    const cont = el('div.modal-cuerpo');
    if (typeof cuerpo === 'string') cont.innerHTML = cuerpo; else if (cuerpo) cont.append(cuerpo);
    const pie = el('div.modal-pie');
    for (const b of botones) pie.append(el('button.btn' + (b.clase ? '.' + b.clase : ''), { type: 'button', onclick: () => { const r = b.accion && b.accion(); if (r !== false && !b.dejar) A.cerrarModal(); } }, b.t));
    caja.append(cab, cont, botones.length ? pie : null);
    fondo.append(caja);
    fondo.addEventListener('click', (e) => { if (e.target === fondo && !opts.sinCerrar) A.cerrarModal(); });
    document.body.append(fondo);
    Q.texto.activar && Q.texto.activar(cont);
    const f = caja.querySelector('button.btn.primario, input, select');
    if (f) setTimeout(() => f.focus(), 30);
    return cont;
  };
  A.cerrarModal = function () { const m = document.getElementById('modal'); if (m) m.remove(); };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (document.getElementById('modal')) A.cerrarModal(); else A.cerrarLibro(); } });

  /* ------------------------------------------------------------ bandeja de dados */
  /**
   * Tira dados en la bandeja. specs: [{tipo:'j'|'e'|'x'}]; devuelve Promise<valores>.
   * opts.titulo, opts.texto (fn(valores) → html), opts.descartar (fn(valores) → índices)
   */
  A.tirar = function (specs, opts = {}) {
    let b = document.getElementById('bandeja');
    if (!b) {
      b = el('div.bandeja#bandeja', { role: 'dialog', 'aria-label': 'Dados' });
      b.append(el('div.bandeja-cab', el('span.bandeja-titulo'), el('button.icono-btn', { type: 'button', 'aria-label': 'Cerrar los dados', html: T.ico('cerrar'), onclick: () => A.cerrarBandeja() })),
        el('div.bandeja-dados'), el('div.bandeja-res', { 'aria-live': 'polite' }), el('div.bandeja-pie'));
      document.body.append(b);
    }
    b.classList.add('abierta');
    b.querySelector('.bandeja-titulo').textContent = opts.titulo || 'Dados';
    const res = b.querySelector('.bandeja-res'), pie = b.querySelector('.bandeja-pie'), cont = b.querySelector('.bandeja-dados');
    res.innerHTML = ''; pie.innerHTML = '';
    const usar3d = A.aj.dados3d && Q.dados.disponible3D();
    const p = usar3d ? Q.dados.lanzar(cont, specs) : (function () { const v = specs.map((s) => s.v || u.d(6)); Q.dados.sonarPlano(v.length); Q.dados.pintarPlano(cont, specs, v); return Promise.resolve(v); })();
    return p.then((v) => {
      if (opts.descartar) { const ix = opts.descartar(v); if (ix && ix.length) Q.dados.descartar(cont, ix); }
      if (opts.texto) res.innerHTML = opts.texto(v);
      if (opts.botones) for (const bt of opts.botones(v)) pie.append(el('button.btn' + (bt.clase ? '.' + bt.clase : ''), { type: 'button', onclick: () => { if (bt.accion) bt.accion(); if (!bt.dejar) A.cerrarBandeja(); } }, bt.t));
      else pie.append(el('button.btn.primario', { type: 'button', onclick: () => A.cerrarBandeja() }, 'Listo'));
      Q.texto.activar && Q.texto.activar(res);
      return v;
    });
  };
  A.cerrarBandeja = function () { const b = document.getElementById('bandeja'); if (b) b.classList.remove('abierta'); };
  /** Tirada rápida de NdC (+k) con texto. */
  A.tirarDados = function (n, c, k = 0, titulo, alResultado) {
    if (c === '66') {
      return A.tirar([{ tipo: 'x' }, { tipo: 'j' }], { titulo: titulo || 'd66', texto: (v) => `<p class="grande">${v[0]}${v[1]}</p>` }).then((v) => { const r = v[0] * 10 + v[1]; if (alResultado) alResultado(r); return r; });
    }
    const specs = Array.from({ length: Math.min(+n, 8) }, () => ({ tipo: 'x' }));
    return A.tirar(specs, {
      titulo: titulo || `${n}d${c}${k ? (k > 0 ? '+' + k : '−' + -k) : ''}`,
      texto: (v) => {
        const vals = c === '3' ? v.map((x) => Math.ceil(x / 2)) : v;
        const s = vals.reduce((a, b) => a + b, 0) + k;
        return `<p class="grande">${s}</p><p class="chico">${vals.join(' + ')}${k ? ` ${k > 0 ? '+' : '−'} ${Math.abs(k)}` : ''}${c === '3' ? ' (1d3: la mitad del d6, hacia arriba)' : ''}</p>`;
      },
    }).then((v) => { const vals = c === '3' ? v.map((x) => Math.ceil(x / 2)) : v; const s = vals.reduce((a, b) => a + b, 0) + k; if (alResultado) alResultado(s); return s; });
  };

  /* ------------------------------------------------------------ la prueba (r120–r122) */
  /** Abre la prueba de una Habilidad con todo lo que la app sabe; devuelve Promise<resultado|null>. */
  A.prueba = function (hab, opts = {}) {
    const S = A.S;
    return new Promise((ok) => {
      const desv = M.desventajas(S, hab, { oscuro: opts.oscuro ?? ((S.deNoche || S.capaUltima === 'subsuelo') && !S.enRefugio), lejos: opts.lejos });
      let modo = opts.mod || (desv.length ? 'desventaja' : 'normal');
      if (opts.mod === 'ventaja' && desv.length) modo = 'normal'; // se anulan (r121)
      let bono = +opts.bono || 0, gratis = !!opts.gratis;
      const nivel = M.hab(S, hab);
      const cuerpo = el('div.prueba');
      const pintar = () => {
        cuerpo.innerHTML = '';
        cuerpo.append(
          el('p.prueba-formula', { html: `<b>2d6 + ${esc(hab)} ${nivel}</b>${bono ? ` ${u.firma(bono)}` : ''} · 10+ limpio · 7–9 con precio · 6− fallo` }),
          desv.length ? el('p.nota', { html: `La app ve Desventaja por: <b>${desv.map(esc).join(', ')}</b> (r121).` }) : null,
          el('div.fila-opciones',
            el('span.etq', 'Dados'),
            ...['normal', 'ventaja', 'desventaja'].map((m) => el('button.chip' + (modo === m ? '.activo' : ''), { type: 'button', onclick: () => { modo = m; pintar(); } }, { normal: 'Normal', ventaja: 'Ventaja (3d6, los 2 altos)', desventaja: 'Desventaja (3d6, los 2 bajos)' }[m]))),
          el('div.fila-opciones',
            el('span.etq', 'Ayudas (máx. +2, r122)'),
            ...[-2, -1, 0, 1, 2].map((b) => el('button.chip' + (bono === b ? '.activo' : ''), { type: 'button', onclick: () => { bono = b; pintar(); } }, u.firma(b)))),
          el('label.check', el('input', { type: 'checkbox', checked: gratis || null, onchange: (e) => { gratis = e.target.checked; } }), ' Tirada gratis: no marca práctica (r124)'),
        );
      };
      const esc = u.esc;
      pintar();
      A.modal(`Prueba de ${hab}`, cuerpo, [
        { t: 'Cancelar', accion: () => ok(null) },
        { t: 'Tirar', clase: 'primario', accion: () => {
          const n = modo === 'normal' ? 2 : 3;
          let r = null;
          A.tirar(Array.from({ length: n }, () => ({ tipo: 'j' })), {
            titulo: `${hab} ${nivel}${bono ? ' ' + u.firma(bono) : ''}${modo !== 'normal' ? ' · ' + modo : ''}`,
            descartar: (v) => { r = M.prueba(S, hab, v, modo, bono, gratis); return r.descartado; },
            texto: () => {
              const nom = { limpio: 'Limpio', precio: 'Con precio', fallo: 'Fallo' }[r.cat];
              return `<p class="grande res-${r.cat}">${r.total} · ${nom}</p><p class="chico">${r.usados.join(' + ')} + ${r.nivel}${r.bono ? ' ' + u.firma(r.bono) : ''}</p>` +
                (r.cat === 'precio' ? '<p class="chico">Lo lográs y pagás el precio del evento (si no dice, uno a elección: 1 Ruido, 1 Herida, 1 uso, 1 hora, 1 Víver o 1 Ánimo · r120).</p>' : '') +
                (r.practica ? `<p class="chico">Marcaste <b>práctica</b> en ${hab} (r124).${r.subio ? ` <b>${hab} sube a ${S.prota.hab[hab]}.</b>` : ''}</p>` : '');
            },
          }).then(() => { Q.ui.refrescar(); Q.guia.ver('prueba'); if (r.subio) A.aviso(`${hab} sube a ${S.prota.hab[hab]}`); ok(r); });
        } },
      ]);
    });
  };

  /* ------------------------------------------------------------ el Libro: reglas y eventos */
  A.pilaLibro = [];
  A.abrirLibro = function (id, buscar) {
    const c = document.getElementById('libro');
    c.classList.add('abierto');
    document.body.classList.add('libro-abierto');
    if (id) { if (A.pilaLibro[A.pilaLibro.length - 1] !== id) A.pilaLibro.push(id); A.pintarLibro(id); } else A.pintarIndice(buscar || '');
  };
  A.cerrarLibro = function () { const c = document.getElementById('libro'); if (c) c.classList.remove('abierto'); document.body.classList.remove('libro-abierto'); A.pilaLibro = []; };
  function cabLibro(titulo, atras) {
    return el('div.libro-cab',
      atras ? el('button.icono-btn', { type: 'button', 'aria-label': 'Atrás', html: T.ico('atras'), onclick: atras }) : null,
      el('h2', titulo),
      el('button.icono-btn', { type: 'button', 'aria-label': 'Cerrar el libro', html: T.ico('cerrar'), onclick: () => A.cerrarLibro() }));
  }
  A.pintarLibro = function (id) {
    const c = document.getElementById('libro');
    const e = Q.libro.entradas[id];
    if (!e) return;
    c.innerHTML = '';
    const atras = () => { A.pilaLibro.pop(); const prev = A.pilaLibro[A.pilaLibro.length - 1]; if (prev) A.pintarLibro(prev); else A.pintarIndice(''); };
    const art = el('article.entrada.en-libro');
    art.innerHTML = `<p class="entrada-id">${e.id}${e.cap ? ' · ' + u.esc(e.cap) : ''}</p><h3>${u.esc(e.titulo)}</h3>${e.lugar ? `<p class="lugar">${u.esc(e.lugar)}</p>` : ''}${T.md(e.md)}`;
    const pie = el('div.libro-pie');
    if (e.tipo === 'e' && A.S && A.S.fase !== 'fin') pie.append(el('button.btn', { type: 'button', onclick: () => { A.cerrarLibro(); Q.mesa.irA(id); } }, `Jugar ${id} en la mesa`));
    const ix = Q.libro.orden.indexOf(id);
    const ant = Q.libro.orden[ix - 1], sig = Q.libro.orden[ix + 1];
    pie.append(ant ? el('button.btn.sutil', { type: 'button', onclick: () => A.abrirLibro(ant) }, `← ${ant}`) : null, sig ? el('button.btn.sutil', { type: 'button', onclick: () => A.abrirLibro(sig) }, `${sig} →`) : null);
    c.append(cabLibro('El libro', atras), el('div.libro-cuerpo', art, pie));
    Q.texto.activar(art);
    c.querySelector('.libro-cuerpo').scrollTop = 0;
  };
  A.pintarIndice = function (q) {
    const c = document.getElementById('libro');
    c.innerHTML = '';
    const input = el('input.buscador', { type: 'search', placeholder: 'Buscar: «sondeo», «e072», «Molotov», «Fiebre»…', value: q, 'aria-label': 'Buscar en el libro' });
    const lista = el('div.libro-lista');
    const pintarLista = () => {
      const qq = u.norm(input.value.trim());
      lista.innerHTML = '';
      if (!qq) {
        // índice por capítulos
        const caps = [];
        for (const id of Q.libro.orden) { const e = Q.libro.entradas[id]; const k = e.cap || '—'; let cc = caps.find((x) => x.n === k); if (!cc) caps.push((cc = { n: k, ids: [] })); cc.ids.push(id); }
        for (const t of Q.libro.textos) lista.append(el('button.libro-item.texto', { type: 'button', onclick: () => A.abrirTexto(t) }, el('b', t.titulo), el('span', t.fuente)));
        for (const cc of caps) {
          const d = el('details.libro-cap', el('summary', `${cc.n} `, el('span.cuenta', `${cc.ids[0]}–${cc.ids[cc.ids.length - 1]}`)));
          for (const id of cc.ids) d.append(el('button.libro-item', { type: 'button', onclick: () => A.abrirLibro(id) }, el('b', id), el('span', Q.libro.entradas[id].titulo)));
          lista.append(d);
        }
        return;
      }
      const res = [];
      const exacto = qq.match(/^[re]\d{3}$/);
      for (const id of Q.libro.orden) {
        const e = Q.libro.entradas[id];
        let p = 0;
        if (exacto && id === qq) p = 100;
        const tit = u.norm(e.titulo), md = u.norm(e.md);
        if (tit.includes(qq)) p += 20;
        const k = md.split(qq).length - 1;
        p += Math.min(10, k);
        if (p) res.push({ id, p, e, i: md.indexOf(qq) });
      }
      res.sort((a, b) => b.p - a.p);
      if (!res.length) lista.append(el('p.nota', 'Nada con esa palabra. Probá con otra o con un número (e072, r175).'));
      for (const r of res.slice(0, 60)) {
        const crudo = r.e.md.replace(/[*`#>|\[\]]/g, '').replace(/\(#[re]\d{3}\)/g, '');
        const i = u.norm(crudo).indexOf(qq);
        const frag = i >= 0 ? '…' + crudo.slice(Math.max(0, i - 40), i + 80) + '…' : '';
        lista.append(el('button.libro-item', { type: 'button', onclick: () => A.abrirLibro(r.id) }, el('b', r.id), el('span', r.e.titulo), frag ? el('small', frag) : null));
      }
    };
    input.addEventListener('input', pintarLista);
    c.append(cabLibro('El libro'), el('div.libro-buscar', input), el('div.libro-cuerpo', lista));
    pintarLista();
    setTimeout(() => input.focus(), 50);
  };
  A.abrirTexto = function (t) {
    const c = document.getElementById('libro');
    c.innerHTML = '';
    const art = el('article.entrada.en-libro', { html: `<p class="entrada-id">${u.esc(t.fuente)}</p><h3>${u.esc(t.titulo)}</h3>${T.md(t.md)}` });
    c.append(cabLibro('El libro', () => A.pintarIndice('')), el('div.libro-cuerpo', art));
    Q.texto.activar(art);
  };

  /* ------------------------------------------------------------ la guía (modo aprendiz) */
  const G = (Q.guia = {});
  G.visto = () => Q.guardado.leer(Q.guardado.VISTO) || {};
  /** Muestra un consejo una sola vez por jugador (si el modo aprendiz está activo). */
  G.ver = function (clave, forzar) {
    const S = A.S;
    if (!forzar && S && !S.aprendiz) return false;
    const v = G.visto();
    if (v[clave] && !forzar) return false;
    const c = Q.GUIA[clave];
    if (!c) return false;
    v[clave] = 1; Q.guardado.escribir(Q.guardado.VISTO, v);
    const zona = document.getElementById('guia');
    zona.innerHTML = '';
    const caja = el('div.guia-caja', { role: 'note' },
      el('div.guia-cab', el('span.guia-etq', 'Cómo se juega'), el('b', c[0])),
      el('div.guia-txt', { html: T.md(c[1]) }),
      el('div.guia-pie', el('button.btn.sutil', { type: 'button', onclick: () => { if (A.S) { A.S.aprendiz = false; A.guardar(); } zona.innerHTML = ''; A.aviso('Modo aprendiz apagado. Se vuelve a prender en el menú.'); } }, 'No mostrar más'),
        el('button.btn.primario', { type: 'button', onclick: () => (zona.innerHTML = '') }, 'Entendido')));
    zona.append(caja);
    Q.texto.activar(caja);
    return true;
  };
  G.reiniciar = () => Q.guardado.escribir(Q.guardado.VISTO, {});

  /* ------------------------------------------------------------ clicks del texto activo */
  Q.texto.activar = function (raiz) {
    if (!raiz || raiz.dataset.activo) return;
    raiz.dataset.activo = '1';
    raiz.addEventListener('click', (ev) => {
      const t = ev.target.closest('a.ref, button.tk');
      if (!t || !raiz.contains(t)) return;
      ev.preventDefault();
      Q.ui.tocar(t, raiz);
    });
  };
})();
