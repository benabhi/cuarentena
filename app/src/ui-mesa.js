/* =====================================================================
   CUARENTENA · la mesa
   El evento en juego, con su texto activo: cada prueba, dado, Marca,
   material o efecto es un botón. Nada se aplica solo: el jugador toca
   y la app hace la cuenta. También los «asistentes» de los eventos
   que piden algo más que leer (el prólogo, el sondeo, los lugares…).
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto;
  const Me = (Q.mesa = Q.mesa || {});
  const UI = (Q.ui = Q.ui || {});
  const LIB = () => Q.libro.entradas;
  const esc = u.esc;
  const NOMCAT = { limpio: 'Limpio', precio: 'Con precio', fallo: 'Fallo' };
  const CONTADORES = ['Juramento', 'Cimientos', 'Deber', 'Ruta', 'Esperanza', 'Culpa', 'contador'];
  const MAT_NORM = { 'Víver': 'Víveres', 'Víveres': 'Víveres', 'Fármaco': 'Fármacos', 'Fármacos': 'Fármacos', 'Antiviral': 'Antivirales', 'Antivirales': 'Antivirales' };
  Me.MAT_NORM = MAT_NORM;
  const boton = (t, fn, clase = '') => el('button.btn' + clase, { type: 'button', onclick: fn }, t);
  Me.boton = boton;
  const ref = (id) => `<a href="#${id}" class="ref" data-ref="${id}" title="${esc(T.titulo(id))}">${id}</a>`;
  Me.ref = ref;

  /* ------------------------------------------------------------ refresco liviano */
  /** Guarda y repinta la cabecera (y la vista si no es la mesa), sin perder el lugar del texto. */
  UI.refrescar = function () {
    A.guardar();
    UI.cabecera && UI.cabecera();
    if (A.vista !== 'mesa') UI.pintarVista();
    else document.querySelectorAll('#mesa .tk.marca').forEach((b) => b.classList.toggle('tiene', M.tieneMarca(A.S, b.dataset.marca)));
    Me.chequeos();
  };
  /** Avisos de umbral: Muriendo, Fiebre 6, Moral 0. Una vez por estado. */
  Me.chequeos = function () {
    const S = A.S;
    if (!S || S.fase === 'fin') return;
    const clave = `${M.muriendo(S)}|${S.prota.fiebre >= 6}|${S.refugio ? S.refugio.moral : 5}|${S.prota.animo <= 0}`;
    if (S._chequeo === clave) return;
    S._chequeo = clave;
    if (M.muriendo(S)) A.aviso('<b>Muriendo</b> (r190): solo podés arrastrarte o esperar ayuda. Sin cura antes del alba, morís.', 'malo');
    if (S.prota.fiebre >= 6) A.aviso('<b>Fiebre 6</b>: te convertís (r195) → e991.', 'malo');
    if (S.refugio && S.refugio.moral <= 0) A.aviso('<b>Moral 0</b>: el grupo se rompe → e089 (r182).', 'malo');
    if (S.prota.animo <= 0 && S.fase !== 'prologo') {
      A.modal('Ánimo 0: Quiebre', `<p>No das más (r194). Leé el Quiebre en ${Me.ref('e085')}; después tu Ánimo vuelve a 2.</p>`, [
        { t: 'Después' },
        { t: 'Ir a e085', clase: 'primario', accion: () => { S.prota.animo = 2; Me.irA('e085'); A.aviso('Ánimo vuelve a 2.'); } }]);
    }
  };

  /* ------------------------------------------------------------ ir a un evento */
  Me.irA = function (id, opts = {}) {
    const S = A.S;
    if (!S || !LIB()[id]) return;
    const E = S.escena;
    E.hechos = E.hechos || {};
    if (E.ev && E.ev !== id && !opts.reemplazar) E.pila.push(E.ev);
    if (!E.ev) { E.pila = []; E.hechos = {}; E.origen = S.fase; }
    E.ev = id;
    S.vistos[id] = (S.vistos[id] || 0) + 1;
    A.vista = 'mesa';
    A.guardar();
    A.pintar();
    const m = document.getElementById('mesa');
    if (m) m.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  Me.atras = function () {
    const E = A.S.escena;
    E.ev = E.pila.pop() || null;
    if (!E.ev) E.hechos = {};
    A.guardar(); A.pintar();
  };
  Me.terminarEvento = function () {
    const S = A.S, E = S.escena;
    E.ev = null; E.pila = []; E.hechos = {};
    A.guardar(); A.pintar();
    window.scrollTo(0, 0);
  };

  /* ------------------------------------------------------------ pintar la mesa */
  Me.pintar = function (cont) {
    const S = A.S;
    cont.innerHTML = '';
    if (S.combate) cont.append(Me.panelCombate());
    if (S.fase === 'fin' && !S.escena.ev) return Q.fases.fin(cont, S);
    if (S.escena.ev) return pintarEvento(cont, S);
    Q.fases.pintar(cont, S);
  };

  const ARTE_CAP = {
    'Prólogo · El día 0': 'prologo', 'La Baraja': 'baraja', 'Las figuras': 'baraja', 'Las Procesiones': 'procesion', 'El Subsuelo': 'subsuelo',
    'Las Azoteas': 'azoteas', 'La calle': 'ciudad', 'Afuera de noche': 'ciudad', 'La noche': 'refugio',
    'La Parroquia': 'facciones', 'Los Bomberos': 'facciones', 'Los Lobos': 'facciones', 'El Destacamento': 'facciones',
    'Las recetas': 'taller', 'Las instalaciones': 'taller', 'Los manuales': 'taller', 'Las armas': 'combate', 'Objetos y protección': 'mochila',
    'Los epílogos': 'historias', 'El Éxodo': 'marea',
  };
  function arteDe(e) {
    if (!Q.ARTE) return null;
    let k = ARTE_CAP[e.cap];
    const mb = (e.cap || '').match(/^Barrio \d+ · (.+)$/);
    if (mb) {
      const b = Object.keys(D.BARRIOS).find((x) => u.norm(D.BARRIOS[x].n).includes(u.norm(mb[1]).replace(/^la ciudad universitaria$/, 'ciudad universitaria')));
      k = b || null;
    }
    if (/^e4[4-9]\d$/.test(e.id) && +e.id.slice(1) < 500) k = 'refugio';
    if (e.cap === 'Los infectados') { const n = u.norm(e.titulo.replace(/^Ficha \d+ · (La |El )?/, '')).replace(/\s+/g, ''); if (Q.ARTE['v-' + n]) return Q.ARTE['v-' + n]; }
    if (/^e9[0-2]\d$/.test(e.id)) k = 'marea';
    if (!k && / · /.test(e.cap || '') && /^e8\d\d$/.test(e.id)) k = 'historias';
    if (!k && /^e6[0-5]\d$/.test(e.id)) k = 'sobrevivientes';
    return k && Q.ARTE[k] ? Q.ARTE[k] : null;
  }

  // la muerte y la conversión no tienen vuelta: solo se cierran con «Terminar la partida»
  const SIN_VUELTA = ['e930', 'e990', 'e991'];
  function pintarEvento(cont, S) {
    const e = LIB()[S.escena.ev];
    if (!e) { S.escena.ev = null; return Q.fases.pintar(cont, S); }
    const E = S.escena;
    // barra
    const barra = el('div.barra-evento',
      E.pila.length ? boton(`← ${E.pila[E.pila.length - 1]}`, () => Me.atras(), '.sutil') : null,
      el('span.espacio'),
      boton('Abrir en el libro', () => A.abrirLibro(e.id), '.sutil'),
      (S.fase !== 'prologo' || S.fase === 'fin') && !SIN_VUELTA.includes(e.id) ? boton(volverTexto(S), () => Me.terminarEvento(), '.primario') : null);
    const img = arteDe(e);
    const art = el('article.entrada.escena', { 'data-ev': e.id });
    art.innerHTML = (img ? `<div class="escena-arte" style="background-image:url('${img}')"></div>` : '') +
      `<p class="entrada-id">${e.id}${e.cap ? ' · ' + esc(e.cap) : ''}</p><h2 class="escena-titulo">${esc(e.titulo)}</h2>` +
      (e.lugar ? `<p class="lugar">${esc(e.lugar)}</p>` : '') + T.md(e.md);
    cont.append(barra);
    const asis = Me.asistente(S, e);
    if (asis && asis.arriba) cont.append(asis.arriba);
    cont.append(art);
    if (asis && asis.abajo) cont.append(asis.abajo);
    // pie
    const pie = el('div.pie-evento');
    if (E.pila.length) pie.append(boton(`← Volver a ${E.pila[E.pila.length - 1]}`, () => Me.atras(), '.sutil'));
    if (S.fase !== 'prologo' && !SIN_VUELTA.includes(e.id)) pie.append(boton(volverTexto(S), () => Me.terminarEvento(), '.primario'));
    cont.append(pie);
    T.activar(art);
    if (asis) { if (asis.arriba) T.activar(asis.arriba); if (asis.abajo) T.activar(asis.abajo); }
    restaurar(art);
    Q.guia.ver('evento');
    if (art.querySelector('.tk.prueba')) setTimeout(() => Q.guia.ver('prueba-token'), 400);
    if (art.querySelector('.tk.combate')) setTimeout(() => Q.guia.ver('combate'), 400);
  }
  function volverTexto(S) {
    return { alba: 'Terminar y volver al alba', dia: 'Terminar y seguir el día', noche: 'Terminar y volver a la noche', amanecer: 'Terminar el evento', noche40: 'Volver a la Noche 40', fin: 'Volver al final' }[S.fase] || 'Terminar el evento';
  }

  /* ------------------------------------------------------------ los tokens y su memoria */
  const tokens = (raiz) => Array.from(raiz.querySelectorAll('button.tk'));
  const artEscena = () => document.querySelector('#mesa article.escena');
  function hechos() { const E = A.S.escena; E.hechos = E.hechos || {}; return (E.hechos[E.ev] = E.hechos[E.ev] || {}); }
  /** Clave del token si está en el evento en juego (para recordarlo al volver). */
  function claveTk(t) { const art = t.closest('article.escena'); return art ? String(tokens(art).indexOf(t)) : null; }
  function tokenPorClave(k) { const art = artEscena(); return art ? tokens(art)[+k] : null; }
  function marcar(t, k, d) {
    if (k != null && A.S.escena.ev) hechos()[k] = d;
    const tt = (k != null && tokenPorClave(k)) || t;
    if (tt) pintarHecho(tt, d);
  }
  function pintarHecho(t, d) {
    t.classList.add('hecho');
    let b = t.nextElementSibling;
    if (!(b && b.classList.contains('tk-res'))) { b = el('span.tk-res'); t.after(b); }
    b.className = 'tk-res' + (d.cat ? ' res-' + d.cat : '');
    b.textContent = d.lbl;
    if (d.v != null) resaltarFila(t, d.v);
  }
  function desmarcar(t, k) {
    if (k != null) delete hechos()[k];
    t.classList.remove('hecho');
    const b = t.nextElementSibling;
    if (b && b.classList.contains('tk-res')) b.remove();
  }
  function restaurar(art) {
    const h = hechos();
    tokens(art).forEach((t, i) => { if (h[i]) pintarHecho(t, h[i]); });
    art.querySelectorAll('.tk.marca').forEach((b) => b.classList.toggle('tiene', M.tieneMarca(A.S, b.dataset.marca)));
  }
  /** Resalta la fila de la tabla que corresponde a un dado. */
  function resaltarFila(t, v) {
    let tabla = null;
    const caja = t.closest('.tabla-con-dado');
    if (caja) tabla = caja.querySelector('table');
    else {
      let n = t.closest('p, li, blockquote');
      for (let k = 0; n && k < 3 && !tabla; k++) { n = n.nextElementSibling; if (n && n.querySelector) tabla = n.matches('.tabla-con-dado, .tabla-envoltura') ? n.querySelector('table') : null; }
    }
    if (!tabla) return;
    tabla.querySelectorAll('tr.salio').forEach((r) => r.classList.remove('salio'));
    for (const r of tabla.querySelectorAll('tbody tr')) {
      const c = r.dataset.v != null ? r.dataset.v : (r.cells[0] && r.cells[0].textContent);
      if (T.filaIncluye(c, v)) { r.classList.add('salio'); r.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); break; }
    }
  }

  /* ------------------------------------------------------------ tocar el texto */
  UI.tocar = function (t, raiz) {
    const S = A.S;
    const enMesa = !!raiz.closest('#mesa');
    if (t.matches('a.ref')) {
      const id = t.dataset.ref;
      if (enMesa && id[0] === 'e' && S && S.fase !== 'fin' && !raiz.closest('.panel-combate')) return Me.irA(id);
      if (enMesa && id[0] === 'e' && S && S.fase === 'fin') return Me.irA(id);
      return A.abrirLibro(id);
    }
    if (!S) return;
    const c = t.classList;
    if (c.contains('prueba')) return tokPrueba(t);
    if (c.contains('ef')) return tokEf(t);
    if (c.contains('mat')) return tokMat(t);
    if (c.contains('dado')) return tokDado(t);
    if (c.contains('marca')) return tokMarca(t);
    if (c.contains('prac')) return tokPrac(t);
    if (c.contains('combate')) return Me.combate(t.dataset.combate);
  };

  function reTirar(t, k, fn) {
    const d = k != null && hechos()[k];
    A.modal('Ya tiraste', `<p>Ya salió: <b>${esc(d ? d.lbl : '')}</b>. ¿Tirás de nuevo? (Solo si una regla o un evento te deja.)</p>`, [{ t: 'Dejar como está' }, { t: 'Tirar de nuevo', clase: 'primario', accion: () => { desmarcar(t, k); setTimeout(fn, 30); } }]);
  }

  function tokPrueba(t) {
    const k = claveTk(t);
    const go = () => A.prueba(t.dataset.hab, { mod: t.dataset.mod || null, bono: +t.dataset.b || 0 }).then((r) => {
      if (!r) return;
      marcar(t, k, { lbl: `${r.total} · ${NOMCAT[r.cat]}`, cat: r.cat });
    });
    if (t.classList.contains('hecho')) return reTirar(t, k, go);
    go();
  }

  function tokDado(t) {
    const k = claveTk(t);
    const n = +t.dataset.n || 1, c = t.dataset.c, kk = +t.dataset.k || 0;
    const go = () => A.tirarDados(n, c, kk, t.textContent, (v) => marcar(t, k, { lbl: `salió ${v}`, v }));
    if (t.classList.contains('hecho')) return reTirar(t, k, go);
    go();
  }

  function tokPrac(t) {
    const S = A.S, h = t.dataset.hab, k = claveTk(t);
    if (t.classList.contains('hecho')) return A.aviso('Esa práctica ya está marcada.');
    const subio = M.marcarPractica(S, h);
    marcar(t, k, { lbl: subio ? `${h} sube a ${S.prota.hab[h]}` : `práctica ${S.prota.practica[h]}/3` });
    A.aviso(subio ? `<b>${h} sube a ${S.prota.hab[h]}</b> (r124).` : `Práctica en ${h}: ${S.prota.practica[h]} de 3.`);
    UI.refrescar();
  }

  /* ---------- efectos con signo ---------- */
  /** Aplica un efecto y devuelve una etiqueta corta. d = {ef, n, f, quien} */
  Me.aplicarEf = function (d) {
    const S = A.S;
    let lbl = '';
    switch (d.ef) {
      case 'Moral': M.cambiarMoral(S, d.n); lbl = `Moral ${S.refugio ? S.refugio.moral : '—'}`; break;
      case 'Ánimo': M.cambiarAnimo(S, d.n); lbl = `Ánimo ${S.prota.animo}`; break;
      case 'Rastro': M.cambiarRastro(S, d.n); lbl = `Rastro ${S.refugio ? S.refugio.rastro : '—'}`; break;
      case 'Ruido': {
        const r = M.cambiarRuido(S, d.n);
        lbl = `Ruido ${S.ruido}`;
        if (d.n > 0 && !d.sinRespuesta) setTimeout(() => Me.ruidoResponde(r), 60);
        break;
      }
      case 'Reputación': M.cambiarRep(S, d.f, d.n); lbl = `${D.FACCIONES[d.f][0]} ${u.firma(S.rep[d.f])}`; break;
      case 'Herida': {
        if (d.quien && d.quien !== 'vos') {
          const s = S.grupo.find((x) => x.e === d.quien);
          if (s) { s.heridas = u.clamp(s.heridas + d.n, 0, 3); lbl = `${s.n}: ${s.heridas}/3`; if (s.heridas >= 3) A.aviso(`<b>${esc(s.n)} cae</b> (r186): si alguien lo saca, vive Grave; si no, muere.`, 'malo'); }
        } else { M.herir(S, d.n); lbl = M.nivelHerida(S); }
        break;
      }
      case 'Resistencia': S.refugio.frentes[d.f] = u.clamp((S.refugio.frentes[d.f] || 0) + d.n, 0, 10); lbl = `${d.f} ${S.refugio.frentes[d.f]}`; break;
      default: M.cambiarContador(S, d.n); lbl = `${S.prota.contNombre} ${S.prota.contador}`;
    }
    M.anotarBitacora(S, `${u.firma(d.n)} ${d.ef === 'contador' ? S.prota.contNombre : d.ef}${d.ef === 'Reputación' ? ' (' + D.FACCIONES[d.f][0] + ')' : d.f ? ' (' + d.f + ')' : ''}${d.quien && d.quien !== 'vos' ? ' a ' + (S.grupo.find((x) => x.e === d.quien) || {}).n : ''}.`);
    return lbl;
  };
  /** r145: al llegar a 3 y a 6, el barrio responde. */
  Me.ruidoResponde = function (r) {
    if (!r) return;
    if (r.seis) {
      A.modal('Ruido 6: una Procesión', `<p>Llegaste a <b>Ruido 6</b> (r145): llega una <b>Procesión</b>. El combate termina como esté.</p>`, [
        { t: 'Después', accion: () => {} },
        { t: 'Ir a e100', clase: 'primario', accion: () => { A.S.combate = null; M.ponerProcesion(A.S, A.S.barrio); Me.irA('e100'); } },
      ]);
    } else if (r.tres) {
      A.modal('Ruido 3: aparecen Callados', `<p>Llegaste a <b>Ruido 3</b> (r145): aparecen <b>Callados ×1d3 · Lejos</b>.</p>`, [
        { t: 'Lo resuelvo yo', accion: () => {} },
        { t: A.S.combate ? 'Sumarlos al combate' : 'Abrir el combate', clase: 'primario', accion: () => Me.combate('Callados ×1d3 · Lejos', { sumar: true }) },
      ]);
    }
  };

  /** Elegir a una persona (vos o alguien del grupo). */
  Me.elegirPersona = function (titulo, fn, conCurar) {
    const S = A.S;
    const vivos = S.grupo.filter((s) => !s.perro);
    if (!vivos.length && !conCurar) return fn('vos', 1);
    const cuerpo = el('div.lista-elegir');
    let signo = 1;
    if (conCurar) cuerpo.append(el('div.fila-opciones', el('span.etq', 'Qué'), ...[[1, 'Herir'], [-1, 'Curar']].map(([sg, t]) => {
      const b = el('button.chip' + (sg === 1 ? '.activo' : ''), { type: 'button', onclick: () => { signo = sg; cuerpo.querySelectorAll('.chip').forEach((x) => x.classList.toggle('activo', x === b)); } }, t);
      return b;
    })));
    cuerpo.append(boton(`Vos (${M.nivelHerida(S)})`, () => { A.cerrarModal(); fn('vos', signo); }, '.ancho'));
    for (const s of vivos) cuerpo.append(boton(`${s.n} (${s.heridas}/3)`, () => { A.cerrarModal(); fn(s.e, signo); }, '.ancho'));
    A.modal(titulo, cuerpo, [{ t: 'Cancelar' }]);
  };
  Me.elegirFrente = function (titulo, fn, filtro) {
    const S = A.S;
    if (!S.refugio) return A.aviso('Todavía no tenés refugio.');
    const cuerpo = el('div.lista-elegir');
    for (const f of D.FRENTES) {
      if (S.refugio.frentes[f] == null) continue;
      const nota = filtro ? filtro(f) : null;
      cuerpo.append(el('button.btn.ancho', { type: 'button', disabled: nota ? true : null, onclick: () => { A.cerrarModal(); fn(f); } }, `${f} · Resistencia ${S.refugio.frentes[f]}${nota ? ' · ' + nota : ''}`));
    }
    A.modal(titulo, cuerpo, [{ t: 'Cancelar' }]);
  };
  Me.elegirFaccion = function (fn) {
    const S = A.S, cuerpo = el('div.lista-elegir');
    for (const f in D.FACCIONES) cuerpo.append(boton(`${D.FACCIONES[f][0]} (${u.firma(S.rep[f])})`, () => { A.cerrarModal(); fn(f); }, '.ancho'));
    A.modal('¿Con qué facción?', cuerpo, [{ t: 'Cancelar' }]);
  };

  function tokEf(t) {
    const S = A.S, k = claveTk(t);
    const d = { ef: t.dataset.ef, n: +t.dataset.n, f: t.dataset.f || null };
    if (t.classList.contains('hecho')) return deshacer(t, k);
    const seguir = (dd) => {
      const lbl = Me.aplicarEf(dd);
      marcar(t, k, { lbl, undo: Object.assign({ op: 'ef' }, dd, { sinRespuesta: true }) });
      A.aviso(`${esc(t.textContent)} → <b>${esc(lbl)}</b>`);
      UI.refrescar();
    };
    if (d.ef === 'Herida') return Me.elegirPersona(`¿Quién recibe ${t.textContent}?`, (q, sg) => seguir(Object.assign(d, { quien: q, n: d.n * sg })), true);
    if (d.ef === 'Reputación' && !d.f) return Me.elegirFaccion((f) => seguir(Object.assign(d, { f })));
    if (d.ef === 'Resistencia') return Me.elegirFrente(`¿A qué frente: ${t.textContent}?`, (f) => seguir(Object.assign(d, { f })));
    if (['Moral', 'Rastro'].includes(d.ef) && !S.refugio) return A.aviso('Todavía no tenés refugio: eso se anota cuando lo tengas.');
    if (CONTADORES.includes(d.ef) && d.ef !== 'contador' && d.ef !== S.prota.contNombre) {
      return A.modal('No es tu contador', `<p>Tu contador es <b>${esc(S.prota.contNombre)}</b>; esto habla de <b>${esc(d.ef)}</b>, el de otro Motivo. Normalmente no se aplica.</p>`, [{ t: 'No aplicar' }, { t: 'Aplicarlo igual', accion: () => seguir(Object.assign(d, { ef: 'contador' })) }]);
    }
    seguir(d);
  }
  function deshacer(t, k) {
    const d = (k != null && hechos()[k]) || {};
    A.modal('Ya aplicado', `<p>Esto ya está en la hoja (<b>${esc(d.lbl || '')}</b>). ¿Lo deshacés?</p>`, [
      { t: 'Dejar' },
      { t: 'Deshacer', clase: 'primario', accion: () => { revertir(d.undo); desmarcar(t, k); A.aviso('Deshecho.'); UI.refrescar(); } },
    ]);
  }
  function revertir(x) {
    if (!x) return;
    if (x.op === 'ef') Me.aplicarEf(Object.assign({}, x, { n: -x.n }));
    if (x.op === 'mat') Me.moverMat(x.dest, x.key, -x.n);
    if (x.op === 'marca') { if (x.anotada) M.borrarMarca(A.S, x.m); else M.anotar(A.S, x.m); }
  }

  /* ---------- materiales ---------- */
  Me.normMat = (k) => MAT_NORM[k] || k;
  /** Suma (o resta) un material: dest 'refugio' | 'carga' (Mochila). */
  Me.moverMat = function (dest, key, n) {
    const S = A.S, P = S.prota;
    key = Me.normMat(key);
    if (key === 'Munición') { P.municion = Math.max(0, P.municion + n); return P.municion; }
    if (dest === 'refugio' && S.refugio) {
      if (key === 'Víveres') { S.refugio.viveres = Math.max(0, S.refugio.viveres + n); return S.refugio.viveres; }
      S.refugio.mats[key] = Math.max(0, (S.refugio.mats[key] || 0) + n);
      return S.refugio.mats[key];
    }
    P.carga = P.carga || {};
    P.carga[key] = Math.max(0, (P.carga[key] || 0) + n);
    if (!P.carga[key]) delete P.carga[key];
    return P.carga[key] || 0;
  };
  /** Cuánto hay de un material entre el refugio (si estás) y la Mochila. */
  Me.hay = function (key, donde) {
    const S = A.S, P = S.prota;
    key = Me.normMat(key);
    if (key === 'Munición') return P.municion;
    const ref = S.refugio ? (key === 'Víveres' ? S.refugio.viveres : S.refugio.mats[key] || 0) : 0;
    const car = (P.carga || {})[key] || 0;
    if (donde === 'refugio') return ref;
    if (donde === 'carga') return car;
    return (S.enRefugio || S.diaCero ? ref : 0) + car;
  };
  /** Gasta de donde haya: primero el refugio (si estás adentro), después la Mochila. */
  Me.gastar = function (key, n) {
    const S = A.S;
    key = Me.normMat(key);
    if (key === 'Munición') { Me.moverMat('carga', key, -n); return; }
    let resto = n;
    if (S.refugio && (S.enRefugio || S.diaCero)) { const r = Me.hay(key, 'refugio'); const q = Math.min(r, resto); if (q) Me.moverMat('refugio', key, -q); resto -= q; }
    if (resto > 0) Me.moverMat('carga', key, -resto);
  };
  function tokMat(t) {
    const S = A.S, k = claveTk(t);
    const key = Me.normMat(t.dataset.mat), n = +t.dataset.n || 1;
    if (t.classList.contains('hecho')) return deshacer(t, k);
    const hecho = (dest, nn) => {
      const quedan = Me.moverMat(dest, key, nn);
      const lugar = key === 'Munición' ? 'Munición' : dest === 'refugio' ? 'refugio' : 'Mochila';
      marcar(t, k, { lbl: `${nn > 0 ? '+' : '−'}${Math.abs(nn)} ${lugar} (${quedan})`, undo: { op: 'mat', dest, key, n: nn } });
      UI.refrescar();
      if (dest === 'carga' && M.sobrecarga(S)) A.aviso(`La Mochila pasa de ${S.prota.cap} casilleros: Desventaja en Físico y Sigilo (r164).`, 'malo');
    };
    const btns = [];
    if (key === 'Munición') {
      btns.push({ t: `Gastar ${n}`, accion: () => hecho('carga', -n) }, { t: `Sumar ${n}`, clase: 'primario', accion: () => hecho('carga', n) });
    } else {
      const adentro = S.enRefugio || S.diaCero || S.fase === 'prologo';
      btns.push({ t: `Gastar ${n}`, accion: () => { const antes = Me.hay(key); if (antes < n) A.aviso(`Tenés ${antes} ${key}: no alcanza.`, 'malo'); const dest = S.refugio && (S.enRefugio || S.diaCero) && Me.hay(key, 'refugio') >= n ? 'refugio' : 'carga'; hecho(dest, -n); } });
      if (S.refugio) btns.push({ t: 'Al refugio', clase: adentro ? 'primario' : '', accion: () => hecho('refugio', n) });
      btns.push({ t: 'A la Mochila', clase: adentro && S.refugio ? '' : 'primario', accion: () => hecho('carga', n) });
    }
    const cas = key === 'Munición' ? 'cada 6 ocupan 1 casillero' : '2 ocupan 1 casillero';
    A.modal(`${n} ${key}`, `<p>¿Lo sumás o lo gastás? Lo que encontrás afuera va a la <b>Mochila</b> (${cas}, r164) hasta que lo descargás en el refugio.</p><p class="chico">Ahora: refugio ${S.refugio ? Me.hay(key, 'refugio') : '—'} · Mochila ${Me.hay(key, 'carga')}</p>`, [{ t: 'Cancelar' }].concat(btns));
  }

  /* ---------- Marcas ---------- */
  function tokMarca(t) {
    const S = A.S, k = claveTk(t);
    const m = t.dataset.marca;
    const pintarTodas = () => document.querySelectorAll('.tk.marca').forEach((b) => b.classList.toggle('tiene', M.tieneMarca(S, b.dataset.marca)));
    if (m.endsWith('_')) {
      const tiene = S.marcas.filter((x) => x.startsWith(m));
      const input = el('input.campo', { type: 'text', placeholder: 'NOMBRE', 'aria-label': 'Completar la Marca' });
      const cuerpo = el('div',
        el('p', { html: `Esta Marca se completa con un nombre: <b>${esc(m)}</b>…` }),
        tiene.length ? el('p.chico', { html: 'Ya tenés: ' + tiene.map((x) => `<button type="button" class="chip" data-borrar="${esc(x)}">${esc(x)} ✕</button>`).join(' ') }) : null,
        input);
      cuerpo.addEventListener('click', (ev) => { const b = ev.target.closest('[data-borrar]'); if (b) { M.borrarMarca(S, b.dataset.borrar); b.remove(); pintarTodas(); UI.refrescar(); } });
      return A.modal('Anotar una Marca', cuerpo, [{ t: 'Cerrar' }, { t: 'Anotar', clase: 'primario', accion: () => {
        const suf = u.norm(input.value).toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
        if (!suf) { A.aviso('Escribí el nombre.'); return false; }
        M.anotar(S, m + suf); marcar(t, k, { lbl: 'anotada', undo: { op: 'marca', m: m + suf, anotada: true } }); pintarTodas(); UI.refrescar(); A.aviso(`Anotaste <b>${esc(m + suf)}</b>.`);
      } }]);
    }
    if (S.marcas.includes(m)) {
      return A.modal(m, `<p>Tenés <b>${esc(m)}</b>. ¿La borrás? (Solo si el texto dice «borrá» o «tachá».)</p>`, [{ t: 'Dejarla' }, { t: 'Borrarla', accion: () => { M.borrarMarca(S, m); marcar(t, k, { lbl: 'borrada', undo: { op: 'marca', m, anotada: false } }); pintarTodas(); UI.refrescar(); } }]);
    }
    M.anotar(S, m);
    marcar(t, k, { lbl: 'anotada', undo: { op: 'marca', m, anotada: true } });
    pintarTodas();
    A.aviso(`Anotaste <b>${esc(m)}</b>.`);
    Q.guia.ver('marcas');
    UI.refrescar();
  }

  /* ------------------------------------------------------------ asistentes de eventos */
  /** Devuelve {arriba, abajo}: lo que la app agrega a un evento. */
  Me.asistente = function (S, e) {
    const id = e.id, n = +id.slice(1);
    const caja = (titulo, ...hijos) => el('div.asistente', el('p.asistente-etq', titulo), ...hijos);
    const out = {};
    const A_ = Me.ASIST[id];
    if (A_) Object.assign(out, A_(S, e, caja) || {});
    // lugares con stock: revisar
    const lug = Q.libro.lugares[id];
    if (lug && S.fase !== 'prologo') out.abajo = out.abajo || Me.cajaLugar(S, id, caja);
    // tablas de encuentro de cada barrio
    const b = Object.keys(Q.libro.barrios).find((x) => Q.libro.barrios[x].ev === id);
    if (b) out.arriba = caja('Encuentro al llegar (r153)', Me.botonEncuentro(b));
    // los palos de la baraja
    const palo = D.PALOS.find((p) => Q.libro.baraja[p].ev === id);
    if (palo) out.arriba = cajaPalo(S, palo, caja);
    // refugios
    if (Q.libro.refugios[id]) out.abajo = cajaRefugio(S, id, caja);
    // sobrevivientes con ficha
    if (Q.libro.sobrevivientes[id]) out.abajo = Me.cajaSobreviviente(S, id, caja);
    // recetas
    if (n >= 740 && n <= 761) out.abajo = Q.taller.cajaRecetas(S, e, caja);
    // armas
    if (n >= 700 && n <= 704) out.abajo = cajaArmas(S, e, caja);
    // facciones
    const fac = Object.keys(D.FACCIONES).find((f) => D.FACCIONES[f][1] === id);
    if (fac) out.abajo = cajaFaccion(S, fac, caja);
    // finales
    if ((n >= 940 && n <= 949) || [961, 990, 991].includes(n)) out.abajo = cajaFinal(S, e, caja);
    // en la Noche 40, volver al asistente
    if (n === 930) out.arriba = caja('El día 41', el('p.chico', 'Seguí los pasos del texto (el Secreto, el pesquero, La orden) y después contá a los salvados.'), boton('Contar a los salvados: e940', () => Me.irA('e940'), '.primario'));
    if (S.fase === 'noche40' && n >= 900 && n < 930) out.arriba = out.arriba || caja('La Noche 40', el('p.chico', 'La app lleva las oleadas: cuando termines de leer, volvé al asistente.'), boton('Volver a la Noche 40', () => Me.terminarEvento(), '.primario'));
    return out;
  };
  Me.ASIST = {};
  const AS = Me.ASIST;

  // e001: el Motivo
  AS.e001 = (S, e, caja) => ({ arriba: caja('Tu Motivo', el('p', { html: `Tu Motivo es <b>${esc(S.prota.motivo)}</b>.` }), boton(`Ir a ${D.MOTIVOS[S.prota.motivo].ev}`, () => Me.irA(D.MOTIVOS[S.prota.motivo].ev), '.primario')) });

  // e010: los tres candidatos
  AS.e010 = function (S, e, caja) {
    const P = (S.prologo = S.prologo || {});
    const c = caja('Tus tres candidatos (r170)');
    if (S.refugio) {
      c.append(el('p', { html: `Elegiste <b>${esc(S.refugio.titulo)}</b>.` }), boton(`Ir a ${S.refugio.id}`, () => Me.irA(S.refugio.id)), boton('Seguir: e011', () => Me.irA('e011'), '.primario'));
      return { arriba: c };
    }
    const mostrar = () => {
      for (const x of P.cand) {
        const bb = Q.libro.barrios[x.barrio];
        const fr = D.FRENTES.filter((f) => x.frentes[f] != null).map((f) => `${f} ${x.frentes[f]}`).join(' · ');
        c.append(el('div.candidato',
          el('div', el('b', x.titulo), el('span.chico', ` · ${bb.n} · ${x.tipo}`)),
          el('p.chico', `Frentes: ${fr} · Víveres ${x.viveres} · Rastro ${x.rastro}${x.barrio === S.prota.barrio ? ' · en tu barrio: Moral 6 y +1 Rastro' : ''}`),
          el('div.fila-botones', boton(`Leer ${x.e}`, () => Me.irA(x.e), '.sutil'), boton('Elegir este', () => { M.elegirRefugio(S, x.e); A.aviso(`Tu refugio: <b>${esc(x.titulo)}</b>.`); Q.guia.ver('refugio'); Me.irA(x.e); }, '.primario'))));
      }
    };
    if (P.cand) mostrar();
    else if (S.marcas.includes('LLAVES_DE_LA_SEPTIMA')) { P.cand = M.candidatos(S, 3); mostrar(); }
    else {
      c.append(el('p.chico', 'El de cerca y el de tu Motivo ya están. El tercero, alguien te lo nombra: 1d6 en la tabla de refugios.'),
        boton('Tirar el tercero (1d6)', () => A.tirarDados(1, '6', 0, 'El tercero', (v) => { P.cand = M.candidatos(S, v); A.guardar(); A.pintar(); }), '.primario'));
    }
    return { arriba: c };
  };
  function cajaRefugio(S, id, caja) {
    const P = S.prologo || {};
    if (S.fase === 'prologo') {
      if (!S.refugio && P.cand && P.cand.some((x) => x.e === id)) return caja('Candidato', boton('Elegir este refugio', () => { M.elegirRefugio(S, id); A.aviso('Refugio elegido.'); Q.guia.ver('refugio'); A.guardar(); A.pintar(); }, '.primario'));
      if (S.refugio && S.refugio.id === id) return caja('Tu refugio', el('p.chico', 'Ya está en la Hoja del refugio: frentes, Víveres, materiales y Rastro.'), boton('Seguir: e011', () => Me.irA('e011', { reemplazar: true }), '.primario'));
    }
    return null;
  }
  // e011: revisar a fondo, gratis
  AS.e011 = function (S, e, caja) {
    const P = (S.prologo = S.prologo || {});
    if (!S.refugio) return { arriba: caja('Primero el refugio', boton('Volver a e010', () => Me.irA('e010'), '.primario')) };
    return { abajo: caja('Revisar el refugio a fondo (día 0: sin tiempo ni Ruido)',
      P.revisado ? el('p.chico', 'Ya lo revisaste.') : boton('Revisar a fondo', () => { S.diaCero = true; Q.acciones.revisar(S.refugio.id, true, { alTerminar: () => { P.revisado = true; S.diaCero = false; A.guardar(); A.pintar(); } }); }, '.primario'),
      boton('Seguir: e012', () => Me.irA('e012'), P.revisado ? '.primario' : '.sutil')) };
  };
  // e012: las dos barricadas básicas
  AS.e012 = function (S, e, caja) {
    if (!S.refugio) return null;
    return { abajo: caja('Las dos básicas, hoy sin tiempo',
      el('div.fila-botones', boton('Muro de muebles', () => Q.taller.muroDeMuebles({ gratis: true })), boton('Tablones clavados', () => Q.taller.tablones({ gratis: true }))),
      el('p.chico', { html: `Madera ${S.refugio.mats.Madera || 0} · Sujeción ${S.refugio.mats.Sujeción || 0} · ${Me.tieneHerramienta('Martillo') ? 'tenés Martillo' : 'sin Martillo: una piedra (◷ 3)'}` }),
      boton('Seguir: e013', () => Me.irA('e013'), '.primario')) };
  };
  // e013: alguien golpea
  AS.e013 = function (S, e, caja) {
    const con = D.BARRIOS[S.prota.barrio].conocido;
    const c = caja('Quién golpea');
    if (!S.ciudad.conocidos.includes(con[1])) c.append(boton(`Es tu conocido: ${con[0]} (${con[1]})`, () => { M.sumarSobreviviente(S, con[1]); Me.irA(con[1]); }));
    c.append(boton('Un sobreviviente al azar (r180)', () => Me.sobrevivienteAzar(), '.primario'), boton('Seguir: e014', () => Me.irA('e014'), '.sutil'));
    return { abajo: c };
  };
  /** r180: dos dados, columna y fila; si ya lo conocés, el siguiente. */
  Me.sobrevivienteAzar = function (sinUnir) {
    const S = A.S;
    A.tirar([{ tipo: 'x' }, { tipo: 'j' }], {
      titulo: 'Un sobreviviente (r180)',
      texto: (v) => { const id = M.sobrevivienteAzar(S, v[0], v[1]); return id ? `<p class="grande">${esc(Q.libro.sobrevivientes[id].n)}</p><p class="chico">Columna ${v[0] <= 2 ? 'A' : v[0] <= 4 ? 'B' : 'C'}, fila ${v[1]}${id !== D.SOBREVIVIENTES[v[0] <= 2 ? 'A' : v[0] <= 4 ? 'B' : 'C'][v[1] - 1] ? ' (ya lo conocías: el siguiente)' : ''} · ${id}</p>` : '<p>Ya los conocés a todos.</p>'; },
      botones: (v) => { const id = M.sobrevivienteAzar(S, v[0], v[1]); return id ? [{ t: 'Cerrar' }, { t: sinUnir ? `Leer ${id}` : `Se suma: ir a ${id}`, clase: 'primario', accion: () => { if (!sinUnir) { M.sumarSobreviviente(S, id); Q.guia.ver('grupo'); } Me.irA(id); } }] : [{ t: 'Cerrar' }]; },
    });
  };
  Me.cajaSobreviviente = function (S, id, caja) {
    const F = Q.libro.sobrevivientes[id];
    const esta = S.grupo.find((s) => s.e === id);
    const perdido = S.marcas.some((m) => m.startsWith('PERDIDO_') && m.includes(u.norm(F.n).toUpperCase().replace(/[^A-Z]+/g, '_').replace(/^_|_$/g, '')));
    const c = caja(F.n);
    if (esta) {
      c.append(el('p.chico', `Está en tu grupo desde el día ${esta.desde}.`), el('div.fila-botones',
        boton('Se va o muere', () => A.modal(`Despedir a ${F.n}`, '<p>Sale de la Hoja del grupo y se anota <code>PERDIDO_</code> (r186). La Moral la aplicás vos: −2 si murió.</p>', [{ t: 'Cancelar' }, { t: 'Despedir', clase: 'primario', accion: () => { M.quitarSobreviviente(S, id, 'deja el grupo'); UI.refrescar(); A.pintar(); } }]), '.sutil')));
    } else if (!perdido && !(S.modo === 'lobo')) {
      c.append(boton(`${F.n} se suma al grupo`, () => { M.sumarSobreviviente(S, id); A.aviso(`<b>${esc(F.n)}</b> se suma al grupo.`); Q.guia.ver('grupo'); UI.refrescar(); A.pintar(); }, '.primario'));
    }
    if (S.fase === 'prologo' && S.escena.pila.includes('e013')) c.append(boton('Seguir: e014', () => Me.irA('e014'), '.primario'));
    return c;
  };
  // e014: la primera noche
  AS.e014 = function (S, e, caja) {
    const P = (S.prologo = S.prologo || {});
    if (!S.refugio) return null;
    const c = caja('La primera noche');
    if (P.noche) { c.append(el('p.chico', 'Ya la hiciste.'), boton('Seguir: e015', () => Me.irA('e015'), '.primario')); return { abajo: c }; }
    c.append(Q.fases.puestos(S, { solo: ['Guardia', 'Obra', 'Descanso'] }), boton('Resolver la noche', () => {
      const prod = M.produccion(S);
      Q.fases.aplicarProduccion(S, prod, () => {
        const r = M.danarFrente(S, 'Puerta', 1);
        P.noche = true;
        M.cerrarNoche(S); S.fase = 'prologo';
        A.aviso(`Algo empuja la Puerta y se va: <b>Puerta ${r.quedan}</b>.`);
        A.guardar(); A.pintar();
      });
    }, '.primario'));
    return { abajo: c };
  };
  // e015: el humo y la primera carta
  AS.e015 = function (S, e, caja) {
    const c = caja('Desde arriba');
    if (!S.ciudad.humo.length) {
      c.append(boton('Tirar los tres barrios del humo (2d6, r155)', () => Me.tirarHumo(), '.primario'));
    } else {
      c.append(el('p', { html: `Humo en <b>${S.ciudad.humo.map((b) => esc(Q.libro.barrios[b].n)).join(', ')}</b>: 1 casilla de stock menos en cada lugar y, la primera vez que llegás, sin encuentro.` }));
      const pro = Object.keys(S.ciudad.procesiones).map((b) => `${Q.libro.barrios[b].n}${S.ciudad.procesiones[b] > 1 ? ' (doble)' : ''}`);
      c.append(el('p.chico', { html: `Procesiones: <b>${esc(pro.join(', '))}</b>. Los Seis Tesoros ya están escondidos (r110): los ves en el Mapa.` }));
      const arco = { 'La lista': 'e800', 'La obra': 'e810', 'La orden': 'e820', 'El pedido': 'e830' }[S.prota.motivo];
      if (arco) c.append(el('p.chico', { html: `Tu historia empieza hoy: ${ref(arco)} (podés leerlo ahora o cuando quieras).` }));
      c.append(boton('Empezar la cuarentena: robar la primera carta', () => { S.escena = { ev: null, pila: [], hechos: {} }; S.fase = 'amanecer'; S.ruido = 0; A.guardar(); Q.fases.robar(); }, '.primario'));
    }
    return { abajo: c };
  };
  Me.tirarHumo = function () {
    const S = A.S;
    const elegidos = [];
    const uno = () => {
      if (elegidos.length >= 3) { S.ciudad.humo = elegidos; A.guardar(); A.pintar(); return; }
      A.tirar([{ tipo: 'x' }, { tipo: 'x' }], {
        titulo: `Humo ${elegidos.length + 1} de 3`,
        texto: (v) => { const b = M.barrioProcesion(v[0] + v[1]); const malo = elegidos.includes(b) || (S.refugio && b === S.refugio.barrio); return `<p class="grande">${v[0] + v[1]} · ${esc(Q.libro.barrios[b].n)}</p>${malo ? '<p class="chico">Repetido o el de tu refugio: otra vez.</p>' : ''}`; },
        botones: (v) => { const b = M.barrioProcesion(v[0] + v[1]); const malo = elegidos.includes(b) || (S.refugio && b === S.refugio.barrio); return [{ t: malo ? 'Tirar otra vez' : 'Siguiente', clase: 'primario', accion: () => { if (!malo) elegidos.push(b); setTimeout(uno, 80); } }]; },
      });
    };
    uno();
  };

  // e072: el sondeo
  // e920: la brecha. El asistente aplica la opción elegida al frente roto.
  AS.e920 = function (S, e, caja) {
    const N = S.noche40;
    if (S.fase !== 'noche40' || !N || !N.brechaEn) return null;
    const f = N.brechaEn;
    const listo = (txt) => { N.brechas = N.brechas || {}; N.brechas[`${N.oleada}-${f}`] = txt; N.brechaEn = null; A.aviso(txt); Me.terminarEvento(); };
    const c = caja(`La brecha en ${f}`, el('p.chico', 'Elegí en el texto, resolvé la prueba o el combate y marcá cómo terminó:'));
    c.append(el('div.fila-botones',
      boton('Ganaron en la brecha: Resistencia 1', () => { S.refugio.frentes[f] = 1; listo(`${f} vuelve a Resistencia 1.`); }),
      boton('Tapado con 10+: Resistencia 3', () => { S.refugio.frentes[f] = 3; listo(`${f} tapado: Resistencia 3.`); }),
      boton('Tapado con 7–9: Resistencia 1', () => { S.refugio.frentes[f] = 1; listo(`${f} tapado: Resistencia 1.`); }),
      boton('Al Último Cuarto', () => { N.uc = true; for (const q of Object.keys(N.def || {})) N.def[q] = 'Último Cuarto'; listo('Todos al Último Cuarto: las oleadas que faltan lo golpean a él (r223).'); }, '.primario')));
    return { arriba: c };
  };

  // e925: la última puerta. Si peleaste y ganaste, el Último Cuarto sigue en pie con Resistencia 0.
  AS.e925 = function (S, e, caja) {
    const N = S.noche40;
    if (S.fase !== 'noche40' || !N) return null;
    const c = caja('La última puerta', el('p.chico', 'Elegí en el texto. Si te vas por el techo o abrazás a los tuyos, seguí el enlace (e930 o e990).'));
    c.append(el('div.fila-botones', boton('Peleé y gané: el cuarto sigue en pie', () => {
      N.ucRes = 0; N.ucGanada = N.oleada; N.brechas = N.brechas || {}; N.brechas[`${N.oleada}-Último Cuarto`] = 'Ganaste: el Último Cuarto sigue en pie con Resistencia 0.';
      if (N.o && N.o.res && N.o.res['Último Cuarto']) N.o.res['Último Cuarto'].brecha = false;
      A.aviso('El Último Cuarto sigue en pie, con Resistencia 0.'); Me.terminarEvento();
    }, '.primario')));
    return { arriba: c };
  };

  AS.e072 = function (S, e, caja) {
    if (!S.refugio) return null;
    const N = (S.sondeo = S.sondeo || {});
    const c = caja('El sondeo (r175)');
    const seguro = M.sondeoValor(S).frente;
    if (!N.frente) {
      if (seguro) { N.frente = seguro; N.seguro = true; }
      else c.append(boton('Qué frente (1d6)', () => A.tirarDados(1, '6', 0, 'Qué frente', (v) => { N.frente = M.frenteSondeo(S, v); N.dFrente = v; A.guardar(); A.pintar(); }), '.primario'));
    }
    if (N.frente) {
      c.append(el('p', { html: `Frente: <b>${N.frente}</b> (Resistencia ${S.refugio.frentes[N.frente]})${N.seguro ? ' · está abierto: sondeo seguro' : ''}.` }));
      const campana = (S.refugio.trampas[N.frente] || []).some((t) => /campana/i.test(t.n));
      if (!N.que) c.append(boton(`Qué es (1d6${campana ? ' − 1, la campana' : ''})`, () => A.tirarDados(1, '6', campana ? -1 : 0, 'Qué es', (v) => { N.que = M.queEs(S, u.clamp(v, 1, 6)); N.dQue = v; A.guardar(); A.pintar(); }), '.primario'));
      else {
        c.append(el('p', { html: `<b>${esc(N.que.txt)}</b>` }));
        if (N.que.dano && !N.aplicado) {
          c.append(boton(`Aplicar: el frente pierde ${N.que.dano}${(S.refugio.trampas[N.frente] || []).length ? ' (−1 por la trampa)' : ''}`, () => {
            const r = M.danarFrente(S, N.frente, N.que.dano);
            N.aplicado = r; S.sondeoDano = true;
            M.anotarBitacora(S, `Sondeo a ${N.frente}: pierde ${r.dano}, queda ${r.quedan}.`);
            A.guardar(); A.pintar();
          }, '.primario'));
        }
        if (N.aplicado) c.append(el('p.chico', { html: `${N.frente} queda en <b>${N.aplicado.quedan}</b>. Un sondeo con daño despierta a todos: el Descanso no recupera nada esta noche.` }));
        if (N.aplicado && N.aplicado.entraron) c.append(boton('Entraron → e074', () => Me.irA('e074'), '.primario'));
        if (N.que.subsuelo && N.frente === 'Subsuelo') c.append(boton('Por el Subsuelo → e077', () => Me.irA('e077'), '.primario'));
        if (N.que.ev) c.append(boton(`Ir a ${N.que.ev}`, () => Me.irA(N.que.ev), '.primario'));
      }
    }
    return { arriba: c };
  };

  function cajaPalo(S, palo, caja) {
    const carta = S.descarte[S.descarte.length - 1];
    if (!carta || carta.palo !== palo || typeof carta.v !== 'number') return null;
    const col = carta.v <= 3 ? 'leve' : 'fuerte';
    return caja(`Tu carta: ${M.nombreCarta(carta)}`, el('p.chico', `Columna ${col === 'leve' ? 'Leve (1–3)' : 'Fuerte (4–7)'}: tirá 1d6.`),
      boton(`Tirar 1d6 en ${col === 'leve' ? 'Leve' : 'Fuerte'}`, () => A.tirarDados(1, '6', 0, `${palo} · ${col}`, (v) => { const ev = Q.libro.baraja[palo][col][String(v)]; A.modal(`Salió ${v}`, `<p>Te toca <b>${ev}</b>: ${esc(T.titulo(ev))}.</p>`, [{ t: `Ir a ${ev}`, clase: 'primario', accion: () => Me.irA(ev, { reemplazar: true }) }]); }), '.primario'));
  }

  Me.botonEncuentro = function (b) {
    return boton(`Tirar el encuentro de ${Q.libro.barrios[b].n}`, () => Q.acciones.encuentro(b).then((ev) => ev && Me.irA(ev, { reemplazar: true })), '.primario');
  };

  /** Lugares de saqueo: stock, Tesoro y revisar. */
  Me.cajaLugar = function (S, id, caja) {
    const lug = Q.libro.lugares[id];
    const c = caja(`${lug.titulo} · ${lug.tipo}`);
    const st = M.stock(S, id);
    const tes = Object.keys(S.ciudad.tesoros).find((t) => S.ciudad.tesoros[t] === id);
    if (lug.botin) c.append(el('p.stock', { html: `Stock ${'■'.repeat(Math.max(0, lug.stock - st))}${'▢'.repeat(st)} (${st} de ${lug.stock}) · tabla ${esc(lug.tipo)}${S.ciudad.busqueda[id] ? ` · tu X: día ${S.ciudad.busqueda[id].dia}` : ''}` }));
    if (tes) c.append(el('p.chico', { html: `Acá está <b>${esc(tes)}</b> (r110).` }));
    if (S.ciudad.debilLugar === id) c.append(el('p.chico', { html: 'Acá está lo de tu <b>debilidad</b> (r105).' }));
    if (lug.barrio !== S.barrio) c.append(el('p.chico', `Estás en ${Q.libro.barrios[S.barrio].n}: para revisarlo, primero llegá a ${Q.libro.barrios[lug.barrio].n}.`));
    else if (lug.botin) c.append(el('div.fila-botones',
      boton('Revisar rápido (◷ 1)', () => Q.acciones.revisar(id, false)),
      boton('A fondo (◷ 2, +1 Ruido)', () => Q.acciones.revisar(id, true))));
    return c;
  };

  Me.tieneHerramienta = function (n) {
    const P = A.S.prota;
    const k = u.norm(n);
    return P.mochila.some((o) => u.norm(o.n).includes(k)) || P.armas.some((a) => u.norm(a.n).includes(k)) || (A.S.refugio && (A.S.refugio.herramientas || []).some((h) => u.norm(h).includes(k)));
  };

  function cajaArmas(S, e, caja) {
    const nombres = Object.keys(D.ARMAS).filter((n) => n !== 'Puños' && e.md.includes(`**${n}`));
    if (!nombres.length) return null;
    const c = caja('Tomar un arma');
    c.append(el('p.chico', 'Si conseguiste una, sumala a tu Hoja (con sus Usos y su Daño).'));
    c.append(el('div.fila-botones', ...nombres.map((n) => boton(n, () => { S.prota.armas.push(M.arma(n)); A.aviso(`<b>${esc(n)}</b> a tu Hoja.`); UI.refrescar(); }))));
    return c;
  }
  function cajaFaccion(S, f, caja) {
    const c = caja(`${D.FACCIONES[f][0]} · Reputación ${u.firma(S.rep[f])}`);
    c.append(el('div.fila-botones', boton('−1', () => { M.cambiarRep(S, f, -1); UI.refrescar(); A.pintar(); }), boton('+1', () => { M.cambiarRep(S, f, 1); UI.refrescar(); A.pintar(); })));
    return c;
  }
  function cajaFinal(S, e, caja) {
    if (S.fin) return caja('La partida terminó', el('p.chico', `Final: ${S.fin.titulo}.`), boton('Ver el resumen', () => { S.escena.ev = null; A.guardar(); A.pintar(); }, '.primario'));
    return caja('¿Es tu final?', el('p.chico', 'Si el libro te trajo hasta acá, terminá la partida con este final. Después podés leer los epílogos.'),
      boton(`Terminar la partida: ${e.titulo}`, () => A.modal('Terminar la partida', `<p>La partida termina con <b>${esc(e.titulo)}</b>. Queda guardada para releerla.</p>`, [{ t: 'Todavía no' }, { t: 'Terminar', clase: 'primario', accion: () => { M.terminar(S, e.id, e.titulo); S.escena.ev = null; A.guardar(); A.pintar(); } }]), '.primario'));
  }
})();
