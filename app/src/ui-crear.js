/* =====================================================================
   CUARENTENA · la portada, las partidas y la creación
   Las seis preguntas sobre la noche del brote (r100–r107), elegidas o
   tiradas, los puntos, el modo y la dificultad. También el menú, los
   ajustes, guardar y cargar partidas en archivo.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto;
  const C = (Q.crear = {});
  const esc = u.esc;
  const boton = (t, fn, clase = '') => el('button.btn' + clase, { type: 'button', onclick: fn }, t);
  const MANUAL = () => (Q.REPO ? `${Q.REPO}/raw/main/Cuarentena.pdf` : 'Cuarentena.pdf');

  /* ------------------------------------------------------------ portada */
  C.inicio = function () {
    A.cerrarModal(); A.cerrarLibro && A.cerrarLibro();
    document.getElementById('app').hidden = true;
    const t = document.getElementById('titulo');
    t.hidden = false;
    t.innerHTML = '';
    const ix = Q.guardado.indice();
    const actual = Q.guardado.cargarActual();
    const portada = el('div.portada', Q.ARTE && Q.ARTE.portada ? { style: { backgroundImage: `url('${Q.ARTE.portada}')` } } : null);
    const caja = el('div.portada-caja',
      el('div.cinta', el('span', 'CUARENTENA · NO CRUZAR')),
      el('h1', 'Cuarentena'),
      el('p.lema', Q.libro.lema || 'Cuarenta días encerrados. Después, la Marea.'),
      el('p.portada-sub', 'Un juego de rol en solitario. La app lleva las cuentas; vos decidís.'),
      el('div.portada-botones',
        actual && actual.prota ? boton(`Seguir: ${actual.prota.nombre}, día ${actual.dia}${actual.fin ? ' (terminada)' : ''}`, () => C.abrir(actual), '.primario.grande') : null,
        boton('Nueva partida', () => C.asistente(), actual ? '.grande' : '.primario.grande'),
        boton('Cómo se juega', () => Q.guia.tutorial(), '.sutil'),
        ix.length ? boton(`Partidas guardadas (${ix.length})`, () => C.partidas(), '.sutil') : null,
        boton('Importar una partida', () => C.importar(), '.sutil'),
        el('a.btn.sutil', { href: MANUAL(), target: '_blank', rel: 'noopener' }, 'Descargar el manual (PDF)')),
      el('p.chico.portada-pie', { html: 'Las partidas se guardan en este navegador. <b>UtopIA</b>' }));
    t.append(portada, caja);
    window.scrollTo(0, 0);
  };
  C.titulo = C.inicio;
  C.abrir = function (S) {
    if (!S) return;
    A.S = S;
    document.getElementById('titulo').hidden = true;
    A.vista = 'mesa';
    A.guardar();
    A.pintar();
    window.scrollTo(0, 0);
    if (!S.fin) Q.guia.ver('bienvenida');
  };
  C.partidas = function () {
    const ix = Q.guardado.indice();
    const cuerpo = el('div.lista-elegir');
    for (const p of ix) {
      cuerpo.append(el('div.partida', el('div', el('b', p.nombre), el('span.chico', ` · ${p.oficio || ''} · ${p.refugio || 'sin refugio'} · día ${p.dia}${p.fin ? ' · ' + p.fin : ''}`)),
        el('div.fila-botones',
          boton('Abrir', () => { const S = Q.guardado.cargar(p.id); if (S) C.abrir(S); else A.aviso('No se pudo leer esa partida.', 'malo'); }, '.primario'),
          boton('Archivo', () => C.exportar(Q.guardado.cargar(p.id)), '.sutil'),
          boton('Borrar', () => A.modal('Borrar la partida', `<p>¿Borrás <b>${esc(p.nombre)}</b> (día ${p.dia})? No se puede deshacer.</p>`, [{ t: 'No' }, { t: 'Borrar', clase: 'primario', accion: () => { Q.guardado.borrarPartida(p.id); if (A.S && A.S.id === p.id) A.S = null; C.inicio(); } }]), '.sutil'))));
    }
    if (!ix.length) cuerpo.append(el('p', 'No hay partidas guardadas.'));
    A.modal('Partidas', cuerpo, [{ t: 'Cerrar' }], { ancho: true });
  };
  C.exportar = function (S) {
    if (!S) return;
    const blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: `cuarentena-${u.norm(S.prota.nombre).replace(/[^a-z0-9]+/g, '-')}-dia${S.dia}.json` });
    document.body.append(a); a.click(); a.remove();
    A.aviso('Partida guardada en un archivo.');
  };
  C.importar = function () {
    const input = el('input', { type: 'file', accept: '.json,application/json' });
    input.addEventListener('change', () => {
      const f = input.files[0];
      if (!f) return;
      f.text().then((txt) => {
        try {
          const S = JSON.parse(txt);
          if (!S || !S.prota || !S.escena) throw new Error('no es una partida');
          S.id = null; // entra como partida nueva
          C.abrir(S);
          A.aviso('Partida importada.');
        } catch (e) { A.aviso('Ese archivo no es una partida de Cuarentena.', 'malo'); }
      });
    });
    input.click();
  };

  /* ------------------------------------------------------------ menú y ajustes */
  C.menu = function () {
    const S = A.S;
    const cuerpo = el('div.lista-elegir',
      boton('Volver a la mesa', () => { A.cerrarModal(); A.vista = 'mesa'; A.pintar(); }, '.ancho.primario'),
      boton('Partidas y portada', () => C.inicio(), '.ancho'),
      S ? boton('Guardar la partida en un archivo', () => C.exportar(S), '.ancho') : null,
      boton('Cómo se juega', () => { A.cerrarModal(); Q.guia.tutorial(); }, '.ancho'),
      el('a.btn.ancho', { href: MANUAL(), target: '_blank', rel: 'noopener' }, 'Descargar el manual (PDF)'),
      el('label.check', el('input', { type: 'checkbox', checked: A.aj.dados3d ? true : null, onchange: (e) => { A.aj.dados3d = e.target.checked; A.guardarAjustes(); } }), ' Dados en 3D'),
      el('label.check', el('input', { type: 'checkbox', checked: A.aj.sonido ? true : null, onchange: (e) => { A.aj.sonido = e.target.checked; A.guardarAjustes(); } }), ' Sonido de los dados'),
      S ? el('label.check', el('input', { type: 'checkbox', checked: S.aprendiz ? true : null, onchange: (e) => { S.aprendiz = e.target.checked; A.guardar(); } }), ' Modo aprendiz: consejos la primera vez que aparece cada cosa') : null,
      boton('Volver a ver todos los consejos', () => { Q.guia.reiniciar(); if (S) { S.aprendiz = true; A.guardar(); } A.aviso('Los consejos vuelven a aparecer.'); }, '.ancho.sutil'));
    A.modal('Menú', cuerpo, [{ t: 'Cerrar' }]);
  };

  /* ------------------------------------------------------------ el asistente de creación */
  let B = null; // borrador
  const PASOS = ['partida', 'edad', 'oficio', 'barrio', 'motivo', 'debilidad', 'objetos', 'puntos', 'listo'];
  C.asistente = function () {
    B = { paso: 0, nombre: '', modo: 'cuarentena', dificultad: 'sobreviviente', aprendiz: true, edad: null, oficio: null, adultoHab: null, barrio: null, motivo: null, motivoFila: null, debil: [], objOficio: 0, bolsillo: null, puntos: {}, buscado: null };
    document.getElementById('app').hidden = true;
    pintarAsistente();
  };
  function pintarAsistente() {
    const t = document.getElementById('titulo');
    t.hidden = false;
    t.innerHTML = '';
    const k = PASOS[B.paso];
    const cuerpo = el('div.crear');
    const prog = el('ol.crear-pasos', ...PASOS.slice(1, 8).map((p, i) => el('li' + (i + 1 === B.paso ? '.activo' : i + 1 < B.paso ? '.hecho' : ''), String(i + 1))));
    cuerpo.append(el('div.crear-cab', el('button.btn.sutil', { type: 'button', onclick: () => (B.paso ? (B.paso--, pintarAsistente()) : C.inicio()) }, '← Atrás'), el('span.crear-titulo', 'La noche del brote'), prog));
    const sec = el('section.crear-cuerpo');
    PASO[k](sec);
    cuerpo.append(sec);
    const ok = valido(k);
    cuerpo.append(el('div.crear-pie', el('span.chico', ok === true ? '' : ok), boton(k === 'listo' ? 'Empezar: e001' : 'Siguiente', () => { if (valido(k) !== true) return; if (k === 'listo') return crear(); B.paso++; pintarAsistente(); window.scrollTo(0, 0); }, '.primario.grande' + (ok === true ? '' : '.apagado'))));
    t.append(cuerpo);
    T.activar(cuerpo);
  }
  function valido(k) {
    if (k === 'edad' && !B.edad) return 'Elegí o tirá tu edad.';
    if (k === 'oficio' && !B.oficio) return 'Elegí o tirá tu oficio.';
    if (k === 'oficio' && B.edad === 'Adulto' && !B.adultoHab) return 'Adulto: elegí cuál de tus dos Habilidades sube.';
    if (k === 'barrio' && !B.barrio) return 'Elegí o tirá tu barrio.';
    if (k === 'motivo' && !B.motivo) return 'Elegí o tirá tu Motivo.';
    if (k === 'debilidad' && !B.debil.length) return 'Elegí una debilidad (o dos).';
    if (k === 'debilidad' && B.debil.includes('BUSCADO') && !B.buscado) return 'Buscado: tirá o elegí por qué.';
    if (k === 'objetos' && !B.bolsillo) return 'Elegí o tirá lo del bolsillo.';
    if (k === 'puntos') { const v = M.validarPuntos(B); if (v.error) return v.error; if (!v.completo) return `Repartí los ${v.libres} puntos (te quedan ${v.libres - v.usados}).`; }
    return true;
  }
  const tarjeta = (activo, titulo, sub, fn, extra) => el('button.tarjeta' + (activo ? '.activa' : ''), { type: 'button', onclick: fn }, el('b', titulo), sub ? el('span', sub) : null, extra || null);
  function tirarYElegir(titulo, n, fn) {
    A.tirar(Array.from({ length: n }, (_, i) => ({ tipo: i ? 'j' : 'x' })), { titulo, texto: (v) => `<p class="grande">${v.join(' · ')}</p>` }).then((v) => { fn(v); pintarAsistente(); });
  }
  const intro = (sec, n, titulo, regla, txt) => sec.append(el('p.crear-num', `Pregunta ${n} de 6`), el('h2', { html: `${titulo} ${Q.mesa.ref(regla)}` }), txt ? el('p', { html: txt }) : null);

  const PASO = {
    partida(sec) {
      sec.append(el('h2', 'Antes de empezar'), el('p', 'Tu protagonista es una persona común que estaba en Tolme la noche que empezó todo (r100). Contestá seis preguntas sobre esa noche: elegí, o tirá y dejá que el azar te dé a alguien que no se te habría ocurrido.'));
      const nombre = el('input.campo.grande', { type: 'text', value: B.nombre, placeholder: 'Tu nombre (podés ponerlo al final)', 'aria-label': 'Nombre', oninput: (e) => { B.nombre = e.target.value; } });
      sec.append(el('label.etq', 'Nombre'), nombre);
      sec.append(el('h3', { html: `Modo ${Q.mesa.ref('r210')}` }), el('div.tarjetas', ...Object.entries(D.MODOS).map(([k, m]) => tarjeta(B.modo === k, m.n, m.d, () => { B.modo = k; pintarAsistente(); }))));
      sec.append(el('h3', { html: `Dificultad ${Q.mesa.ref('r211')}` }), el('div.tarjetas', ...Object.entries(D.DIFICULTADES).map(([k, m]) => tarjeta(B.dificultad === k, m.n, m.d, () => { B.dificultad = k; pintarAsistente(); }))));
      sec.append(el('label.check', el('input', { type: 'checkbox', checked: B.aprendiz ? true : null, onchange: (e) => { B.aprendiz = e.target.checked; } }), ' Modo aprendiz: la app te explica cada cosa la primera vez que aparece (recomendado para la primera partida).'));
    },
    edad(sec) {
      intro(sec, 1, '¿Cuántos años tenés?', 'r101');
      sec.append(el('div.tarjetas', ...Object.entries(D.EDADES).map(([k, e]) => tarjeta(B.edad === k, `${k} (${e.r})`, e.txt, () => { B.edad = k; if (k !== 'Adulto') B.adultoHab = null; pintarAsistente(); }))),
        boton('Tirar 1d6', () => tirarYElegir('Edad: 1–2 Joven, 3–4 Adulto, 5–6 Mayor', 1, (v) => { B.edad = v[0] <= 2 ? 'Joven' : v[0] <= 4 ? 'Adulto' : 'Mayor'; }), '.sutil'));
    },
    oficio(sec) {
      intro(sec, 2, '¿De qué trabajabas?', 'r102', 'Tu oficio te da dos Habilidades (una en 2 y otra en 1) y una <b>maña</b>.');
      const tar = el('div.tarjetas.chicas');
      for (const col of ['A', 'B']) for (const o of D.OFICIO_TABLA[col]) {
        const O = D.OFICIOS[o];
        tar.append(tarjeta(B.oficio === o, o, `${O[0]} 2, ${O[1]} 1 · ${O[2]}`, () => { B.oficio = o; B.adultoHab = null; pintarAsistente(); }));
      }
      sec.append(tar, boton('Tirar (columna y fila)', () => tirarYElegir('Oficio: columna (1–3 A, 4–6 B) y fila', 2, (v) => { B.oficio = D.OFICIO_TABLA[v[0] <= 3 ? 'A' : 'B'][v[1] - 1]; B.adultoHab = null; }), '.sutil'));
      if (B.oficio) sec.append(el('p.nota', { html: `<b>${esc(D.OFICIOS[B.oficio][2])}:</b> ${esc(D.MANAS[D.OFICIOS[B.oficio][2]])}` }));
      if (B.oficio && B.edad === 'Adulto') {
        const [h2, h1] = D.OFICIOS[B.oficio];
        sec.append(el('p.etq', 'Adulto: +1 a una de las dos'), el('div.fila-opciones', ...[h2, h1].map((h) => el('button.chip' + (B.adultoHab === h ? '.activo' : ''), { type: 'button', onclick: () => { B.adultoHab = h; pintarAsistente(); } }, h))));
      }
    },
    barrio(sec) {
      intro(sec, 3, '¿Dónde vivías?', 'r103', 'Tu barrio: tu cuadra (la primera vez no tirás encuentro), tu esquina (−1 en su tabla), tu conocido y lo que sabés.');
      const tar = el('div.tarjetas.chicas');
      for (const col of ['A', 'B']) for (const b of D.BARRIO_TABLA[col]) tar.append(tarjeta(B.barrio === b, D.BARRIOS[b].n, `${D.BARRIOS[b].conocido[0]} · ${D.BARRIOS[b].sabe}`, () => { B.barrio = b; pintarAsistente(); }));
      sec.append(tar, boton('Tirar (columna y fila)', () => tirarYElegir('Barrio: columna (1–3 A, 4–6 B) y fila', 2, (v) => { B.barrio = D.BARRIO_TABLA[v[0] <= 3 ? 'A' : 'B'][v[1] - 1]; }), '.sutil'));
      if (Q.MAPA) { const m = el('div.mapa-crear', { html: Q.ui.svgMapa(null, true) }); m.querySelectorAll('[data-b]').forEach((g) => { g.classList.toggle('aca', g.dataset.b === B.barrio); g.addEventListener('click', () => { B.barrio = g.dataset.b; pintarAsistente(); }); }); sec.append(m); }
    },
    motivo(sec) {
      intro(sec, 4, '¿Qué te ata a la ciudad?', 'r104', 'El <b>Motivo</b> es tu historia pendiente: un arco de unas diez entradas, un contador de 0 a 6 y un epílogo.');
      sec.append(el('div.tarjetas', ...D.MOTIVO_ORDEN.map((m, i) => tarjeta(B.motivo === m, `${i + 1} · ${m}`, `${D.MOTIVOS[m].que} · contador: ${D.MOTIVOS[m].cont}`, () => { B.motivo = m; B.motivoFila = null; pintarAsistente(); }))),
        boton('Tirar 1d6', () => tirarYElegir('Motivo', 1, (v) => { B.motivo = D.MOTIVO_ORDEN[v[0] - 1]; B.motivoFila = null; }), '.sutil'));
      const filas = filasMotivo(B.motivo);
      if (filas.length) {
        sec.append(el('h3', 'Por qué lo tenés'), el('p.chico', 'Elegí la fila que encaje con tu oficio, o tirá 1d6: es verdad en tu partida.'));
        sec.append(el('div.tarjetas.chicas', ...filas.map((f, i) => tarjeta(B.motivoFila === i + 1, String(i + 1), f.replace(/\*/g, ''), () => { B.motivoFila = i + 1; pintarAsistente(); }))), boton('Tirar 1d6', () => tirarYElegir('Por qué lo tenés', 1, (v) => { B.motivoFila = v[0]; }), '.sutil'));
      } else if (B.motivo) sec.append(el('p.chico', `${B.motivo} se arma en el prólogo (${D.MOTIVOS[B.motivo].arco}).`));
    },
    debilidad(sec) {
      intro(sec, 5, '¿Qué te pesa?', 'r105', 'Elegí <b>una</b> debilidad, o <b>dos</b> y ganás 1 punto de Habilidad más. Cada una se puede superar: es una escena de tu historia.');
      sec.append(el('div.tarjetas.chicas', ...Object.entries(D.DEBILIDADES).map(([k, [n, d]]) => tarjeta(B.debil.includes(k), n, d, () => {
        if (B.debil.includes(k)) B.debil = B.debil.filter((x) => x !== k); else if (B.debil.length < 2) B.debil.push(k); else A.aviso('Como mucho dos.');
        pintarAsistente();
      }))), boton('Tirar 1d6', () => tirarYElegir('Debilidad', 1, (v) => { const k = Object.keys(D.DEBILIDADES)[v[0] - 1]; if (!B.debil.includes(k) && B.debil.length < 2) B.debil.push(k); }), '.sutil'));
      if (B.debil.includes('BUSCADO')) sec.append(el('p.etq', 'Por qué te buscan'), el('div.fila-opciones', ...D.BUSCADO_POR.map((t, i) => el('button.chip' + (B.buscado === i + 1 ? '.activo' : ''), { type: 'button', onclick: () => { B.buscado = i + 1; pintarAsistente(); } }, `${i + 1} ${t}`))), boton('Tirar 1d6', () => tirarYElegir('Por qué te buscan', 1, (v) => { B.buscado = v[0]; }), '.sutil'));
    },
    objetos(sec) {
      intro(sec, 6, '¿Qué tenías encima?', 'r106', 'Todos: ropa de calle, un encendedor y un celular sin señal (Linterna con Usos 3). Además, uno de los dos objetos de tu oficio y uno del bolsillo.');
      const objs = D.OFICIOS[B.oficio][3];
      sec.append(el('h3', `Del oficio (${B.oficio})`), el('div.tarjetas', ...objs.map((o, i) => tarjeta(B.objOficio === i, o, null, () => { B.objOficio = i; pintarAsistente(); }))));
      sec.append(el('h3', 'Del bolsillo'), el('div.tarjetas.chicas', ...D.BOLSILLO.map((o, i) => tarjeta(B.bolsillo === i + 1, String(i + 1), o, () => { B.bolsillo = i + 1; pintarAsistente(); }))), boton('Tirar 1d6', () => tirarYElegir('Bolsillo', 1, (v) => { B.bolsillo = v[0]; }), '.sutil'));
    },
    puntos(sec) {
      const base = M.habilidadesBase(B), v = M.validarPuntos(B);
      sec.append(el('h2', { html: `Tus Habilidades ${Q.mesa.ref('r107')}` }), el('p', { html: `El oficio y la edad ya pusieron lo suyo. Repartí <b>${v.libres}</b> puntos libres: ninguna por encima de 4, y como mucho <b>una</b> en 4 (r100). Te quedan <b>${v.libres - v.usados}</b>.` }));
      const tabla = el('div.puntos');
      for (const h of D.HABS) {
        const p = B.puntos[h] || 0;
        tabla.append(el('div.punto-fila', el('div', el('b', h), el('small', ' ' + D.HAB_USO[h])),
          el('div.punto-ctl', el('button.chip', { type: 'button', disabled: p <= 0 ? true : null, onclick: () => { B.puntos[h] = p - 1; pintarAsistente(); } }, '−'),
            el('b.punto-v', String(base[h] + p)),
            el('button.chip', { type: 'button', disabled: v.usados >= v.libres || base[h] + p >= 4 ? true : null, onclick: () => { B.puntos[h] = p + 1; pintarAsistente(); } }, '+'))));
      }
      sec.append(tabla, v.error ? el('p.nota.malo', v.error) : null, el('p.chico', 'Con una Habilidad en 4 empezás con su maña (r126). Cualquier Habilidad sube con la práctica: cada fallo marca una casilla, y con tres sube (r124).'));
    },
    listo(sec) {
      if (!B.nombre.trim()) B.nombre = '';
      const nombre = el('input.campo.grande', { type: 'text', value: B.nombre, placeholder: 'Tu nombre', 'aria-label': 'Nombre', oninput: (e) => { B.nombre = e.target.value; } });
      const base = M.habilidadesBase(B);
      const habs = D.HABS.filter((h) => base[h] + (B.puntos[h] || 0) > 0).map((h) => `${h} ${base[h] + (B.puntos[h] || 0)}`).join(' · ');
      sec.append(el('h2', 'Tu protagonista'), el('label.etq', 'Nombre'), nombre,
        el('ul.resumen',
          el('li', { html: `<b>${B.edad}</b>, <b>${esc(B.oficio)}</b> (${esc(D.OFICIOS[B.oficio][2])}), de <b>${esc(D.BARRIOS[B.barrio].n)}</b>` }),
          el('li', { html: `Motivo: <b>${esc(B.motivo)}</b>${B.motivoFila ? ` (fila ${B.motivoFila})` : ''} · contador ${D.MOTIVOS[B.motivo].cont}` }),
          el('li', { html: `Debilidad: ${B.debil.map((d) => D.DEBILIDADES[d][0]).join(' y ')}${B.buscado ? ` (${D.BUSCADO_POR[B.buscado - 1]})` : ''}` }),
          el('li', { html: `Objetos: ${esc(D.OFICIOS[B.oficio][3][B.objOficio])} · ${esc(D.BOLSILLO[B.bolsillo - 1])}` }),
          el('li', { html: `Habilidades: ${esc(habs)}` }),
          el('li', { html: `${D.MODOS[B.modo].n} · ${D.DIFICULTADES[B.dificultad].n}` })),
        el('p', 'El prólogo es el tutorial: empieza en e001, la noche del brote, y te lleva hasta la primera carta.'));
    },
  };
  /** Las seis filas de «Por qué lo tenés» de un Motivo (r104). */
  function filasMotivo(m) {
    if (!m) return [];
    const md = (Q.libro.entradas.r104 || {}).md || '';
    const l = md.split('\n').find((x) => x.startsWith(`**${m}.**`));
    if (!l) return [];
    return l.replace(`**${m}.**`, '').split(/\*\*\d\*\*\s*/).map((x) => x.trim()).filter(Boolean);
  }
  C.filasMotivo = filasMotivo;

  function crear() {
    if (!B.nombre.trim()) B.nombre = ['Sosa', 'Ríos', 'Funes', 'Paz', 'Luján', 'Ibarra'][u.d(6) - 1];
    const S = M.nuevaPartida(B);
    S.prota.carga = {};
    S.escena = { ev: 'e001', pila: [], hechos: {} };
    if (B.buscado) M.anotarBitacora(S, `Buscado porque ${D.BUSCADO_POR[B.buscado - 1]}.`);
    const fila = B.motivoFila ? filasMotivo(B.motivo)[B.motivoFila - 1] : null;
    if (fila && /empieza en 3/.test(fila)) S.prota.contador = 3;
    if (fila) M.nota(S, `Tu fila de r104 (${B.motivo}, ${B.motivoFila}): ${fila.replace(/\*\([^)]*\)\*\s*/, '')}`, 0, null, 'alba');
    A.S = S;
    A.guardar();
    B = null;
    C.abrir(S);
    if (fila) setTimeout(() => A.modal('Por qué lo tenés', `<p>${T.enLinea(filasMotivo(S.prota.motivo)[S.prota.motivoFila - 1])}</p><p class="chico">Es verdad en tu partida. Lo que la app no sabe aplicar sola queda en los recordatorios (Bitácora).</p>`, [{ t: 'Entendido', clase: 'primario' }]), 300);
  }
})();
