/* =====================================================================
   CUARENTENA · las acciones
   Revisar y el botín, los encuentros, los viajes, el combate, curar,
   hablar con el grupo, descargar la Mochila y comerciar. Cada una sigue
   su regla y deja todo anotado; el jugador decide.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto, Me = Q.mesa;
  const Ac = (Q.acciones = {});
  const esc = u.esc, boton = Me.boton;
  const UI = Q.ui;

  /** Gasta horas del día (r133). Devuelve false si no alcanzan (salvo forzar). */
  Ac.gastarHoras = function (h, forzar) {
    const S = A.S;
    if (S.diaCero || S.fase === 'prologo' || S.fase === 'noche' || S.fase === 'noche40') return true;
    if (S.fase !== 'dia') return true;
    if (S.horas < h && !forzar) { A.aviso(`Quedan ${S.horas} ${u.plural(S.horas, 'hora')}: no alcanza (r133).`, 'malo'); return false; }
    S.horas = Math.max(0, S.horas - h);
    if (S.horas === 0) setTimeout(() => A.aviso('Gastaste la sexta hora: <b>cae la noche</b> (r133).'), 400);
    return true;
  };

  /* ------------------------------------------------------------ revisar (r160–r163) */
  /** Revisa un lugar (o el refugio). opts.alTerminar */
  Ac.revisar = function (eid, aFondo, opts = {}) {
    const S = A.S;
    const esRef = S.refugio && eid === S.refugio.id;
    const lug = esRef ? { titulo: S.refugio.titulo, tipo: S.refugio.tipo, botin: S.refugio.botin } : Q.libro.lugares[eid];
    if (!lug) return;
    const horas = aFondo ? 2 : 1;
    if (!S.diaCero && S.fase === 'dia' && S.horas < horas) return A.aviso(`Revisar ${aFondo ? 'a fondo' : 'rápido'} lleva ◷ ${horas} y quedan ${S.horas}.`, 'malo');
    let extra = 0, probo = false;
    const cuerpo = el('div.revisar');
    const pintar = () => {
      cuerpo.innerHTML = '';
      const st = esRef ? S.refugio.stock : M.stock(S, eid);
      cuerpo.append(el('p', { html: `<b>${esc(lug.titulo)}</b> · ${esc(lug.tipo)} · stock ${st}. ${aFondo ? 'A fondo: tachás 2 y tirás tres veces' : 'Rápido: tachás 1 y tirás una vez'}${S.diaCero ? ' (día 0: sin tiempo ni Ruido)' : aFondo ? ', ◷ 2 y +1 Ruido' : ', ◷ 1'}${st <= 0 ? '. <b>Sin stock</b>: cada revisión es una sorpresa (r161)' : ''}.` }));
      if (!probo && st > 0) cuerpo.append(el('p.chico', 'Antes, si querés, `[Calle]`: con 10+ tirás una vez más (sin práctica, r124).'), boton('Probar Calle', () => {
        A.cerrarModal();
        A.prueba('Calle', { gratis: true }).then((r) => { probo = true; if (r && r.cat === 'limpio') extra = 1; Ac.revisar._abrir(); });
      }, '.sutil'));
      if (extra) cuerpo.append(el('p.chico', { html: '<b>Calle 10+</b>: una tirada más.' }));
    };
    Ac.revisar._abrir = () => { pintar(); A.modal(`Revisar ${aFondo ? 'a fondo' : 'rápido'}`, cuerpo, [{ t: 'Cancelar' }, { t: 'Revisar', clase: 'primario', accion: () => tirarBotin() }]); };
    const tirarBotin = () => {
      const r = M.revisar(S, eid, aFondo);
      if (r.ruido) setTimeout(() => Me.ruidoResponde(r.ruido), 200);
      if (r.sinStock) {
        A.tirar([{ tipo: 'x' }], { titulo: 'Sin stock (r161)', texto: (v) => `<p class="grande">${v[0]}</p><p>${T.enLinea(M.sinStock(v[0]))}</p>`, botones: (v) => [{ t: 'Listo', clase: 'primario', accion: () => cerrar([M.sinStock(v[0])]) }] });
        return;
      }
      const n = r.tiradas + extra;
      A.tirar(Array.from({ length: n }, () => ({ tipo: 'x' })), {
        titulo: `Botín · ${lug.tipo}`,
        texto: (v) => '<ol class="botin">' + v.map((x) => `<li><b>${x}</b> · ${T.enLinea(M.botin(r.tabla, x))}${ayudaBotin(M.botin(r.tabla, x))}</li>`).join('') + '</ol><p class="chico">Tocá cada material para sumarlo a la Mochila (o al refugio). Lo demás, con «Agregar a la Mochila» en la Hoja.</p>',
        botones: (v) => [{ t: 'Listo', clase: 'primario', accion: () => cerrar(v.map((x) => M.botin(r.tabla, x))) }],
      });
    };
    const cerrar = (res) => {
      if (!esRef) M.marcaBusqueda(S, eid, res.filter((x) => x !== 'Nada').join(', ').replace(/\*\*/g, '').slice(0, 80));
      M.anotarBitacora(S, `Revisaste ${lug.titulo}: ${res.join(', ').replace(/\*\*/g, '')}.`);
      Q.guia.ver('revisar');
      A.guardar(); A.pintar();
      if (opts.alTerminar) opts.alTerminar(res);
    };
    Ac.revisar._abrir();
  };
  function ayudaBotin(txt) {
    if (/herramienta \(r202\)/i.test(txt)) return ' <button type="button" class="tk dado" data-n="1" data-c="6" data-k="0">herramienta al azar</button> <span class="chico">(1 Martillo · 2 Serrucho · 3 Llave inglesa · 4 Palanca · 5 Taladro · 6 Máquina de coser)</span>';
    if (/objeto útil \(r163\)/i.test(txt)) return ' <span class="chico">(1d6: 1 Linterna · 2 Soga · 3 Cuchillo · 4 Radio a pilas · 5 Mochila de camping · 6 Un manual)</span>';
    if (/1–3 revólver/.test(txt)) return ' <button type="button" class="tk dado" data-n="1" data-c="6" data-k="0">1d6</button>';
    return '';
  }

  /* ------------------------------------------------------------ encuentros (r153) */
  Ac.encuentro = function (b) {
    const S = A.S;
    const mods = M.modEncuentro(S, b);
    return A.tirar([{ tipo: 'x' }], {
      titulo: `Encuentro · ${Q.libro.barrios[b].n}`,
      texto: (v) => { const r = M.encuentro(S, b, v[0]); return `<p class="grande">${r.total} → ${r.ev}</p><p class="chico">1d6 ${v[0]}${mods.map((m) => ` ${u.firma(m.v)} ${esc(m.t)}`).join('')} (más de 12 cuenta como 12)</p><p>${esc(T.titulo(r.ev))}</p>`; },
      botones: (v) => [{ t: `Ir a ${M.encuentro(S, b, v[0]).ev}`, clase: 'primario', accion: () => {} }],
    }).then((v) => { const r = M.encuentro(S, b, v[0]); M.anotarBitacora(S, `Encuentro en ${Q.libro.barrios[b].n}: ${r.total} → ${r.ev}.`); return r.ev; });
  };

  /* ------------------------------------------------------------ viajar (r151–r159) */
  Ac.viajar = function (o) {
    const S = A.S, desde = S.barrio;
    if (o.bloqueado) return A.aviso(o.bloqueado, 'malo');
    const salirDelRefugio = S.enRefugio;
    if (salirDelRefugio) {
      // al salir: lo de la Mochila se queda; el Ruido empieza en 0 (r154)
      S.ruido = 0; S.salidaActiva = true;
      for (const s of S.grupo) s.fuera = S.compas.includes(s.e);
    }
    const llegaRefugio = S.refugio && o.destino === S.refugio.barrio;
    S.volviendo = llegaRefugio;
    const r = M.mover(S, o);
    if (r.ruido) setTimeout(() => Me.ruidoResponde(r.ruido), 200);
    Q.guia.ver('viajar');
    const humo = S.ciudad.humo.includes(o.destino) && r.primeraVez;
    const sabeEstacion = S.prota.barrio === 'estacion' && o.capa === 'subsuelo' && !(S.subsueloEtapa || {})[S.etapa];
    const sigue = () => {
      if (llegaRefugio) return entrarRefugio(desde);
      A.guardar(); A.pintar();
      if (S.horas <= 0) Q.fases.anochecer();
    };
    if (o.procesion) {
      return A.modal('Una Procesión', `<p>Entraste por la Calle a un barrio con una <b>Procesión</b> (r152) → e100.</p>`, [{ t: 'Ir a e100', clase: 'primario', accion: () => { S.enRefugio = false; Me.irA('e100'); } }], { sinCerrar: true });
    }
    if (humo) { A.aviso('El fuego espantó a los Callados: la primera vez, sin encuentro (e015).'); return sigue(); }
    if (o.capa === 'calle') {
      if (llegaRefugio) return sigue(); // llegar a tu barrio para entrar: la tabla igual se tira si te quedás afuera
      return Ac.encuentro(o.destino).then((ev) => { if (ev) Me.irA(ev); if (S.horas <= 0) setTimeout(() => Q.fases.anochecer(), 300); });
    }
    if (o.capa === 'azoteas') {
      return A.tirar([{ tipo: 'x' }], { titulo: 'Las Azoteas (r151)', texto: (v) => (v[0] === 1 ? '<p class="grande">1 · Encuentro</p><p>→ e130</p>' : `<p class="grande">${v[0]}</p><p>Sin encuentro.</p>`), botones: (v) => [{ t: v[0] === 1 ? 'Ir a e130' : 'Seguir', clase: 'primario', accion: () => { if (v[0] === 1) Me.irA('e130'); else sigue(); } }] });
    }
    if (sabeEstacion) { S.subsueloEtapa = S.subsueloEtapa || {}; S.subsueloEtapa[S.etapa] = true; A.aviso('Conocés la línea C: tu primer viaje por el Subsuelo de la Etapa no tira encuentro.'); return sigue(); }
    A.modal('El Subsuelo', `<p>Por el Subsuelo tirás siempre en <b>e110</b> (r151).</p>`, [{ t: 'Ir a e110', clase: 'primario', accion: () => Me.irA('e110') }], { sinCerrar: true });
  };
  /** Llegar al barrio del refugio: entrar, descargar, el Rastro y las Procesiones (r154, r155). */
  function entrarRefugio(desde) {
    const S = A.S;
    const ruido = S.ruido;
    const vecino = Q.libro.barrios[S.refugio.barrio].conex.calle.includes(desde) || Q.libro.barrios[S.refugio.barrio].conex.subsuelo.includes(desde) || Q.libro.barrios[S.refugio.barrio].conex.azoteas.includes(desde);
    const cuerpo = el('div');
    cuerpo.append(el('p', { html: `Volvés a <b>${esc(S.refugio.titulo)}</b>.` }));
    if (ruido >= 3 && vecino) cuerpo.append(el('p', { html: `Volviste con <b>Ruido ${ruido}</b> desde un barrio vecino: <b>+1 Rastro</b> (r154).` }));
    if (ruido >= 3 && Object.keys(S.ciudad.procesiones).length) cuerpo.append(el('p', { html: `Terminás la salida con Ruido ${ruido}: la Procesión más cercana avanza un barrio hacia ${esc(Q.libro.barrios[S.ultimoBarrio || desde].n)} (r155).` }));
    A.modal('De vuelta', cuerpo, [{ t: 'Entrar', clase: 'primario', accion: () => {
      if (ruido >= 3 && vecino) M.cambiarRastro(S, 1);
      if (ruido >= 3) { const p = M.procesionCercana(S, desde); if (p) { const a = M.avanzarProcesion(S, p, desde); A.aviso(`La Procesión de ${esc(Q.libro.barrios[p].n)} avanza a ${esc(Q.libro.barrios[a].n)}.`); } }
      S.enRefugio = true; S.ruido = 0; S.salidaActiva = false; S.volviendo = false; S.capaUltima = null;
      for (const s of S.grupo) s.fuera = false;
      const ladron = S.grupo.find((s) => S.compas.includes(s.e) && s.rasgo === 'Ladrón');
      S.compas = [];
      A.guardar(); A.pintar();
      if (ladron) A.aviso(`${esc(ladron.n)} es Ladrón: con 1 en 1d6 falta 1 material (r185).`);
      if (Object.keys(S.prota.carga || {}).length) setTimeout(() => Ac.descargar(), 250);
      else if (S.horas <= 0) Q.fases.anochecer();
    } }], { sinCerrar: true });
  }
  Ac.entrarRefugio = entrarRefugio;

  /** Descargar la Mochila en el refugio. */
  Ac.descargar = function () {
    const S = A.S, P = S.prota;
    const c = P.carga || {};
    const lista = Object.entries(c).filter(([, n]) => n > 0);
    if (!lista.length) return A.aviso('La Mochila no tiene materiales para descargar.');
    A.modal('Descargar la Mochila', `<p>Lo que traés pasa a la Hoja del refugio:</p><p><b>${lista.map(([k, n]) => `${n} ${esc(k)}`).join(' · ')}</b></p>`, [{ t: 'Después' }, { t: 'Descargar', clase: 'primario', accion: () => {
      for (const [k, n] of lista) { Me.moverMat('refugio', k, n); delete c[k]; }
      M.anotarBitacora(S, `Descargaste ${lista.map(([k, n]) => `${n} ${k}`).join(', ')}.`);
      Q.guia.ver('descargar');
      UI.refrescar(); A.pintar();
      if (S.horas <= 0 && S.fase === 'dia') Q.fases.anochecer();
    } }]);
  };

  /* ------------------------------------------------------------ cuidar y el grupo */
  /** r190: curar con Medicina, 1 Fármacos, ◷ 1. */
  Ac.curar = function () {
    const S = A.S;
    if (Me.hay('Fármacos') < 1) return A.aviso('Curar pide 1 Fármacos (r190) y no tenés.', 'malo');
    Me.elegirPersona('¿A quién curás? (r190)', (q) => {
      if (!Ac.gastarHoras(1)) return;
      Me.gastar('Fármacos', 1);
      const bono = Me.tieneHerramienta('Botiquín') || S.marcas.includes('EQUIPO_DE_SUTURA') ? 1 : 0;
      A.prueba('Medicina', { bono }).then((r) => {
        if (!r) return;
        let n = r.cat === 'limpio' ? 2 : r.cat === 'precio' ? 1 : 0;
        if (r.cat === 'precio' && S.prota.manas.includes('Recetario')) n = 2;
        if (q === 'vos') M.curar(S, n); else { const s = S.grupo.find((x) => x.e === q); if (s) s.heridas = Math.max(0, s.heridas - n); }
        A.aviso(n ? `Borrás <b>${n}</b> ${u.plural(n, 'Herida')}.` : 'Perdiste el Fármaco.');
        M.anotarBitacora(S, `Curar: ${n} ${u.plural(n, 'Herida')}.`);
        UI.refrescar(); A.pintar();
      });
    });
  };
  /** r183: hablar con el grupo, una vez por día. */
  Ac.hablar = function () {
    const S = A.S;
    if (!S.grupo.some((s) => !s.perro)) return A.aviso('No hay nadie con quien hablar todavía.');
    if (S.hoyHablo) return A.aviso('Hoy ya hablaste con el grupo (r183).');
    if (!Ac.gastarHoras(1)) return;
    S.hoyHablo = true;
    A.prueba('Labia', { bono: S.prota.manas.includes('Lista de presentes') ? 1 : 0 }).then((r) => {
      if (!r) return;
      if (r.cat === 'fallo') { M.cambiarMoral(S, -1); A.aviso('Una discusión: <b>−1 Moral</b>.'); }
      else { M.cambiarMoral(S, 1); A.aviso('<b>+1 Moral</b>.'); }
      if (r.cat === 'precio') A.modal('Alguien te pide algo', '<p>+1 Moral, pero alguien te pide algo: un objeto, una salida, una promesa. Anotá <button type="button" class="tk marca" data-marca="PROMESA_">PROMESA_</button> y su nombre; cumplila o perdé 2 Moral el día que no puedas (r183).</p>', [{ t: 'Listo', clase: 'primario' }]);
      UI.refrescar(); A.pintar();
    });
  };
  Ac.descansar = function () {
    const S = A.S;
    if (!Ac.gastarHoras(2)) return;
    M.cambiarAnimo(S, 1);
    M.anotarBitacora(S, 'Descansaste: +1 Ánimo.');
    A.aviso('Descansás dos horas: <b>+1 Ánimo</b> (r133).');
    UI.refrescar(); A.pintar();
  };
  /** r165: desarmar en el refugio. */
  Ac.desarmar = function () {
    const S = A.S;
    const ops = [
      ['Un mueble o una puerta', { Madera: 2 }],
      ['Un electrodoméstico', { Electrónica: 1, Metal: 1 }],
      ['Ropa o colchones', { Tela: 2 }],
      ['Un arma rota', { Metal: 1 }],
    ];
    const cuerpo = el('div.lista-elegir', el('p.chico', 'Desarmar en el refugio: ◷ 1, sin prueba (r165).'));
    for (const [t, mats] of ops) cuerpo.append(boton(`${t}: ${Object.entries(mats).map(([k, n]) => `${n} ${k}`).join(', ')}`, () => {
      A.cerrarModal(); if (!Ac.gastarHoras(1)) return;
      for (const [k, n] of Object.entries(mats)) Me.moverMat('refugio', k, n);
      M.anotarBitacora(S, `Desarmaste: ${t.toLowerCase()}.`); UI.refrescar(); A.pintar();
    }, '.ancho'));
    if (!S.refugio.desarmado) cuerpo.append(boton('El refugio mismo (una vez): 6 Madera', () => {
      A.cerrarModal(); if (!Ac.gastarHoras(1)) return;
      S.refugio.desarmado = true; Me.moverMat('refugio', 'Madera', 6); M.anotarBitacora(S, 'Desarmaste el refugio: 6 Madera.'); UI.refrescar(); A.pintar();
    }, '.ancho'));
    A.modal('Desarmar', cuerpo, [{ t: 'Cancelar' }]);
  };

  /** r166: comerciar. */
  Ac.comerciar = function () {
    const S = A.S;
    let da = 1, recibe = 1, fac = null;
    const cuerpo = el('div');
    const pintar = () => {
      cuerpo.innerHTML = '';
      cuerpo.append(el('p.chico', 'Valor: 1 Víver = 1 material = 2 Munición. Fármacos, Antivirales y Combustible valen el doble (r166).'),
        el('div.fila-opciones', el('span.etq', 'Das (valor)'), boton('−', () => { da = Math.max(1, da - 1); pintar(); }, '.chip'), el('b', String(da)), boton('+', () => { da++; pintar(); }, '.chip')),
        el('div.fila-opciones', el('span.etq', 'Con'), ...Object.keys(D.FACCIONES).map((f) => el('button.chip' + (fac === f ? '.activo' : ''), { type: 'button', onclick: () => { fac = fac === f ? null : f; pintar(); } }, `${D.FACCIONES[f][0]} ${u.firma(S.rep[f])}`))));
      if (fac && S.rep[fac] <= -2) cuerpo.append(el('p', { html: '<b>Con −2 o menos, no te cambian.</b>' }));
      else if (fac && S.rep[fac] >= 2) cuerpo.append(el('p', { html: `Con Reputación +2 o más, siempre uno más: recibís <b>${da + 1}</b>.` }));
      cuerpo.append(el('p.chico', 'Tirá Labia: con 10+, uno más de lo que das; con 7–9, justo; con 6−, te cobran uno de más o no quieren.'));
    };
    pintar();
    A.modal('Comerciar', cuerpo, [{ t: 'Cerrar' }, { t: 'Tirar Labia', clase: 'primario', accion: () => {
      A.prueba('Labia').then((r) => {
        if (!r) return;
        const fiado = S.prota.manas.includes('El fiado') && r.total >= 7;
        const mercado = S.barrio === 'mercado' && S.prota.barrio === 'mercado';
        recibe = r.cat === 'limpio' ? da + 1 : r.cat === 'precio' ? da : da - 1;
        if (fiado && r.cat === 'precio') recibe = da + 1;
        if (fac && S.rep[fac] >= 2) recibe = Math.max(recibe, da + 1);
        if (mercado) recibe += 1;
        A.modal('El cambio', `<p>Das valor <b>${da}</b> y recibís valor <b>${Math.max(0, recibe)}</b>${r.cat === 'fallo' ? ' (o no quieren)' : ''}${fiado ? ' · El fiado' : ''}${mercado ? ' · El Mercado: uno más' : ''}.</p><p class="chico">Sumá y restá los materiales en la Hoja.</p>`, [{ t: 'Listo', clase: 'primario' }]);
      });
    } }]);
  };

  /* ------------------------------------------------------------ el combate (r140–r149) */
  const ESPECIALES = [
    ['callad', 1, 'e720', 1], ['fresco', 1, 'e721', 2], ['hinchad', 2, 'e722', 'h'], ['chillona', 2, 'e723', 0], ['acechador', 2, 'e724', 's'],
    ['sabueso', 1, 'e725', 2], ['bruto', 4, 'e726', 1], ['escupidor', 2, 'e727', 0], ['ahogad', 2, 'e728', 1], ['blindad', 2, 'e729', 1],
    ['viuda', 6, 'e730', 0], ['pastor', 5, 'e731', 0],
  ];
  const VIVOS = /^(viv|lobo|soldad|bomber|rolo|saquead|hombre|tipo|guardia)/;
  function tipoDe(nombre) {
    const k = u.norm(nombre).replace(/^(el|la|los|las) /, '');
    const esp = ESPECIALES.find((x) => k.startsWith(x[0]));
    if (esp) return { aguante: esp[1], ficha: esp[2], avance: esp[3], vivos: false };
    return { aguante: 2, ficha: null, avance: 1, vivos: VIVOS.test(k) };
  }
  /** «Callados ×2 · Cerca», «Pastor ×1 y Callados ×3d6 · Cerca», «Lobos ×3 · Aguante 2 · Lejos». */
  Ac.leerCombate = function (txt) {
    const limpio = txt.replace(/[;.]\s*$/, '').trim();
    const partes = limpio.split(' · ');
    const dist = (partes.find((p) => /^(Lejos|Cerca|Encima)$/.test(p.trim())) || 'Cerca').trim();
    const ag = limpio.match(/Aguante (\d+)/);
    const fuego = /armas de fuego/.test(limpio);
    const cab = partes[0];
    const grupos = [];
    for (const g of cab.split(/ y (?=[A-ZÁÉÍÓÚÑ][\wáéíóúñ ]* ×)/)) {
      const m = g.match(/^(.+?) ×(.+)$/);
      if (!m) continue;
      const tipo = tipoDe(m[1]);
      grupos.push({ n: m[1].trim(), cant: m[2].trim(), dist, aguante: ag ? +ag[1] : tipo.aguante, ficha: tipo.ficha, avance: tipo.avance, vivos: tipo.vivos, fuego });
    }
    return grupos;
  };
  /** Cuántos: número, dados («1d6+2»), o null (lo decidís vos). */
  function leerCant(c) {
    const S = A.S;
    if (/^\d+$/.test(c)) return { n: +c };
    let m = c.match(/^\(?(\d)d(6|3)\s*(?:([+−-])\s*(\d+|Etapa))?\)?$/);
    if (m) return { dados: +m[1], c: m[2], k: m[3] ? (m[4] === 'Etapa' ? S.etapa : +m[4]) * (m[3] === '+' ? 1 : -1) : 0 };
    return { n: 1, manual: true };
  }
  Me.combate = function (txt, opts = {}) {
    const S = A.S;
    const grupos = Ac.leerCombate(txt);
    if (!grupos.length) return A.aviso('No pude leer ese combate: armalo a mano en Herramientas.');
    const listos = [];
    const sig = (i) => {
      if (i >= grupos.length) return empezar();
      const g = grupos[i], c = leerCant(g.cant);
      if (c.dados) return A.tirarDados(c.dados, c.c, c.k, `${g.n} ×${g.cant}`, (v) => { g.cant = Math.max(1, v); listos.push(g); setTimeout(() => sig(i + 1), 80); });
      g.cant = c.n; if (c.manual) A.aviso(`«${esc(String(grupos[i].cant))}»: ajustá cuántos son con + y −.`);
      listos.push(g); sig(i + 1);
    };
    const empezar = () => {
      if (opts.sumar && S.combate) {
        for (const g of listos) S.combate.grupos.push(Object.assign({ id: u.uid(), dano: 0 }, g));
        S.combate.log.push(`Llegan ${listos.map((g) => `${g.n} ×${g.cant} · ${g.dist}`).join(', ')}.`);
      } else {
        S.combate = { ronda: 1, grupos: listos.map((g) => Object.assign({ id: u.uid(), dano: 0 }, g)), log: [`Empieza: ${listos.map((g) => `${g.n} ×${g.cant} · ${g.dist}`).join(', ')}.`], accion: false, compas: {}, ev: S.escena.ev };
      }
      A.vista = 'mesa';
      A.guardar(); A.pintar();
      document.querySelector('.panel-combate') && document.querySelector('.panel-combate').scrollIntoView({ block: 'start' });
      Q.guia.ver('combate-panel');
    };
    sig(0);
  };
  const DIST = ['Lejos', 'Cerca', 'Encima'];
  function log(t) { A.S.combate.log.push(t); }
  function compasEnCombate(S) { return S.grupo.filter((s) => S.compas.includes(s.e) && !s.perro && s.heridas < 3); }

  Me.panelCombate = function () {
    const S = A.S, C = S.combate;
    const P = S.prota;
    const p = el('section.panel-combate', { 'aria-label': 'Combate' });
    const quedan = M.quedan(C);
    p.append(el('div.combate-cab', el('h3', `Combate · ronda ${C.ronda}`), el('span.chico', { html: `Ruido ${S.ruido} · ${M.nivelHerida(S)} · ${Me.ref('r140')}–${Me.ref('r149')}` })));
    // grupos
    const lista = el('div.grupos');
    for (const g of C.grupos) {
      const fila = el('div.grupo-enemigo' + (g.cant <= 0 ? '.muerto' : ''),
        el('div.ge-nombre', el('b', `${g.n} ×${g.cant}`), g.aguante > 1 ? el('span.chico', ` Aguante ${g.aguante}${g.dano ? ` · lleva ${g.dano}` : ''}`) : null, g.vivos ? el('span.etq-vivos', 'vivos') : null,
          g.ficha ? el('a.ref', { href: '#' + g.ficha, 'data-ref': g.ficha }, g.ficha) : null),
        el('div.ge-dist', ...DIST.map((d) => el('button.chip' + (g.dist === d ? '.activo' : ''), { type: 'button', onclick: () => { g.dist = d; A.guardar(); A.pintar(); } }, d))),
        el('div.ge-cant', boton('−', () => { g.cant = Math.max(0, g.cant - 1); A.guardar(); A.pintar(); }, '.chip'), boton('+', () => { g.cant++; A.guardar(); A.pintar(); }, '.chip')));
      lista.append(fila);
    }
    p.append(lista);
    if (quedan <= 0) {
      p.append(el('div.combate-fin', el('p', { html: '<b>No queda ninguno.</b> El evento dice qué encontrás; si no lo dice, revisá al más grande: con 5–6 en 1d6, 1 material al azar (r149).' }),
        el('div.fila-botones', boton('Revisar al más grande (1d6)', () => A.tirar([{ tipo: 'x' }, { tipo: 'j' }], { titulo: 'Revisar al más grande', texto: (v) => (v[0] >= 5 ? `<p class="grande">${v[0]}: ${D.MAT_AZAR[v[1] - 1]}</p><p>${T.enLinea('1 ' + D.MAT_AZAR[v[1] - 1])}</p><p class="chico">(el segundo dado elige el material, r165)</p>` : `<p class="grande">${v[0]}: nada</p>`) })),
          boton('Terminar el combate', () => terminarCombate('Ganaste.'), '.primario'))));
      p.append(logCombate(C));
      return p;
    }
    // tu acción
    if (!C.accion) {
      const enc = M.encima(C) > 0;
      const acc = el('div.combate-acciones', el('p.etq', 'Tu acción (r142)'));
      const armas = [{ n: 'Puños', dano: 1, ruido: 0, alc: 'Cerca', usos: null }].concat(P.armas);
      const fila = el('div.fila-botones');
      for (const a of armas) {
        const sinMuni = a.fuego && P.municion <= 0;
        const alc = sinMuni ? 'Cerca' : a.alc;
        const blancos = C.grupos.filter((g) => g.cant > 0 && (alc === 'Lejos' ? g.dist !== 'Encima' : g.dist !== 'Lejos'));
        const rota = a.usos != null && a.usos <= 0;
        fila.append(el('button.btn', { type: 'button', disabled: !blancos.length || rota ? true : null, title: rota ? 'Rota: se repara en el taller (r206)' : '', onclick: () => atacar(a, blancos) },
          `Atacar · ${a.n} (Daño ${sinMuni ? 1 : a.dano}${a.usos != null ? ` · Usos ${a.usos}` : ''}${a.fuego ? ` · Mun. ${P.municion}` : ''})`));
      }
      acc.append(fila, el('div.fila-botones',
        boton('Retroceder [Físico]', () => retroceder()),
        el('button.btn', { type: 'button', disabled: enc ? true : null, title: enc ? 'Con alguien Encima no podés esconderte' : '', onclick: () => esconderte() }, 'Esconderte [Sigilo]'),
        boton('Usar algo / cambiar de capa', () => { C.accion = true; log('Usaste algo o cambiaste de capa: el evento o el objeto dicen qué pasa.'); A.guardar(); A.pintar(); }, '.sutil')));
      p.append(acc);
    } else {
      // compañeros (r148) y fin de ronda
      const comp = compasEnCombate(S);
      const box = el('div.combate-acciones');
      if (comp.length) {
        box.append(el('p.etq', 'Tus compañeros (r148)'));
        for (const s of comp) {
          const hecho = C.compas[s.e];
          box.append(el('div.fila-botones', el('span', `${s.n} (${s.heridas}/3 · ${s.arma || 'Puños'})`), hecho ? el('span.chico', hecho) : boton('Ataca', () => atacaCompa(s))));
        }
      }
      box.append(el('p.etq', 'Final de la ronda'), el('p.chico', 'Los Callados avanzan un paso (los especiales, según su ficha) y muerden los que están Encima (r144). Los vivos tiran 1d6 (r147).'),
        boton('Terminar la ronda', () => finRonda(), '.primario'));
      p.append(box);
    }
    p.append(el('div.fila-botones.combate-pie', boton('Escapé o terminó', () => terminarCombate('Terminó el combate.'), '.sutil'), boton('Caí (r149)', () => caer(), '.sutil')));
    p.append(logCombate(C));
    setTimeout(() => T.activar(p), 0);
    return p;
  };
  function logCombate(C) {
    return el('details.combate-log', { open: true }, el('summary', 'Lo que pasó'), el('ol', ...C.log.slice(-12).map((t) => el('li', t))));
  }
  function elegirBlanco(blancos, fn) {
    if (blancos.length === 1) return fn(blancos[0]);
    const cuerpo = el('div.lista-elegir');
    for (const g of blancos) cuerpo.append(boton(`${g.n} ×${g.cant} · ${g.dist}`, () => { A.cerrarModal(); fn(g); }, '.ancho'));
    A.modal('¿A quién atacás?', cuerpo, [{ t: 'Cancelar' }]);
  }
  function atacar(a, blancos) {
    const S = A.S, C = S.combate, P = S.prota;
    elegirBlanco(blancos, (g) => {
      const sinMuni = a.fuego && P.municion <= 0;
      const hab = !sinMuni && (a.fuego || a.alc === 'Lejos') ? 'Puntería' : 'Pelea';
      A.prueba(hab, { lejos: g.dist === 'Lejos' }).then((r) => {
        if (!r) return;
        const arma = sinMuni ? { dano: 1 } : a;
        const dano = M.ataque(r.cat, arma);
        let muertos = 0;
        if (dano) muertos = M.danarGrupo(g, dano);
        let txt = `${a.n} contra ${g.n} (${g.dist}): ${r.total}, ${r.cat === 'limpio' ? 'limpio' : r.cat === 'precio' ? 'con precio' : 'fallo'}`;
        if (dano) txt += g.aguante > 1 ? ` · Daño ${dano}${muertos ? `, caen ${muertos}` : `, lleva ${g.dano}`}` : ` · caen ${muertos}`;
        // el precio del arma
        if (r.cat === 'precio' && !a.fuego && a.usos != null) { a.usos = Math.max(0, a.usos - 1); txt += ` · ${a.n} pierde 1 uso (${a.usos})`; if (a.usos === 0) txt += ', se rompe'; }
        let ruido = sinMuni ? 0 : a.ruido || 0;
        if (a.fuego && !sinMuni) { P.municion = Math.max(0, P.municion - 1); if (r.cat === 'precio' && !S.prota.manas.includes('Pulso')) { ruido *= 2; txt += ' · el disparo hace el doble de Ruido'; } }
        if (ruido) { const rr = M.cambiarRuido(S, ruido); txt += ` · +${ruido} Ruido (${S.ruido})`; setTimeout(() => Me.ruidoResponde(rr), 300); if (S.refugio && S.barrio === S.refugio.barrio && a.fuego) { M.cambiarRastro(S, 1); txt += ' · disparo en el barrio del refugio: +1 Rastro'; } }
        log(txt + '.');
        C.accion = true;
        A.guardar(); A.pintar();
      });
    });
  }
  function retroceder() {
    const S = A.S, C = S.combate;
    const espalda = S.marcas.includes('LA_ESPALDA');
    A.prueba('Físico', { mod: S.prota.manas.includes('Pulmones') ? 'ventaja' : null, bono: espalda ? 1 - M.hab(S, 'Físico') : 0 }).then((r) => {
      if (!r) return;
      if (r.cat === 'fallo') { log(`Retrocedés: ${r.total}, no podés.`); C.accion = true; A.guardar(); A.pintar(); return; }
      const todosLejos = C.grupos.every((g) => g.cant <= 0 || g.dist === 'Lejos');
      if (todosLejos) { log(`Retrocedés: ${r.total}. Ya estaban todos Lejos: salís del combate.`); return terminarCombate('Saliste del combate.'); }
      for (const g of C.grupos) g.dist = g.dist === 'Encima' ? 'Cerca' : 'Lejos';
      log(`Retrocedés: ${r.total}. Todos retroceden un paso.`);
      C.accion = true;
      A.guardar(); A.pintar();
      if (r.cat === 'precio') A.modal('Retroceder con precio', '<p>Soltás 1 casillero de la Mochila o te llevás 1 Herida (r142).</p>', [{ t: 'Suelto algo (lo saco en la Hoja)', accion: () => log('Soltaste 1 casillero de la Mochila.') }, { t: '1 Herida', clase: 'primario', accion: () => { M.herir(S, 1); log('1 Herida al retroceder.'); UI.refrescar(); A.pintar(); } }]);
    });
  }
  function esconderte() {
    const S = A.S, C = S.combate;
    A.prueba('Sigilo', { mod: S.prota.manas.includes('Sombra') ? 'ventaja' : null, bono: S.barrio === 'casco' && S.prota.barrio === 'casco' ? 0 : 0 }).then((r) => {
      if (!r) return;
      if (r.cat === 'limpio') { log(`Te escondés: ${r.total}. Salís del combate.`); return terminarCombate('Te escondiste.'); }
      if (r.cat === 'precio') {
        if (!S.prota.manas.includes('Sombra')) { const rr = M.cambiarRuido(S, 1); setTimeout(() => Me.ruidoResponde(rr), 300); }
        log(`Te escondés: ${r.total}. Salís${S.prota.manas.includes('Sombra') ? ' (Sombra: sin Ruido)' : ' con +1 Ruido'}.`);
        return terminarCombate('Te escondiste.');
      }
      for (const g of C.grupos) if (!g.vivos && g.cant > 0) g.dist = g.dist === 'Lejos' ? 'Cerca' : 'Encima';
      log(`Te escondés: ${r.total}. Te encuentran y avanzan un paso.`);
      C.accion = true;
      A.guardar(); A.pintar();
    });
  }
  function atacaCompa(s) {
    const S = A.S, C = S.combate;
    const a = D.ARMAS[s.arma] || D.ARMAS['Puños'];
    const blancos = C.grupos.filter((g) => g.cant > 0 && (a.alc === 'Lejos' ? g.dist !== 'Encima' : g.dist !== 'Lejos'));
    if (!blancos.length) { C.compas[s.e] = 'nadie a su alcance'; A.guardar(); A.pintar(); return; }
    const bueno = ['Pelea', 'Puntería'].includes(s.hab) ? s.nivel : 0;
    elegirBlanco(blancos, (g) => {
      A.tirar([{ tipo: 'j' }, { tipo: 'j' }], {
        titulo: `${s.n} ataca`,
        texto: (v) => { const t = v[0] + v[1] + bueno; return `<p class="grande">${t}</p><p class="chico">${v[0]} + ${v[1]}${bueno ? ' + ' + bueno : ''}</p>`; },
      }).then((v) => {
        const t = v[0] + v[1] + bueno;
        const cat = t >= 10 ? 'limpio' : t >= 7 ? 'precio' : 'fallo';
        const d = M.ataque(cat, a);
        const m = d ? M.danarGrupo(g, d) : 0;
        C.compas[s.e] = `${t}: ${d ? (g.aguante > 1 ? `Daño ${d}` : `caen ${m}`) : 'nada'}`;
        log(`${s.n} ataca a ${g.n}: ${C.compas[s.e]}.`);
        if (a.ruido) { const rr = M.cambiarRuido(S, a.ruido); setTimeout(() => Me.ruidoResponde(rr), 300); }
        A.guardar(); A.pintar();
      });
    });
  }
  /** Fin de la ronda: avanzan, muerden, disparan. */
  function finRonda() {
    const S = A.S, C = S.combate;
    const vivos = C.grupos.filter((g) => g.vivos && g.cant > 0);
    const pasos = () => {
      for (const g of C.grupos) {
        if (g.vivos || g.cant <= 0) continue;
        let n = g.avance === 'h' ? (C.ronda % 2 === 0 ? 1 : 0) : g.avance === 's' ? 2 : +g.avance;
        if (S.prota.manas.includes('Pulmones') && /fresco/i.test(g.n)) n = Math.min(n, 1);
        for (let k = 0; k < n; k++) g.dist = g.dist === 'Lejos' ? 'Cerca' : 'Encima';
      }
    };
    const mordidas = (hecho) => {
      const enc = C.grupos.filter((g) => g.dist === 'Encima' && g.cant > 0);
      const total = enc.reduce((a, g) => a + g.cant, 0);
      if (!total) return hecho();
      const vivosEnc = enc.every((g) => g.vivos);
      const comp = compasEnCombate(S);
      const aVos = Math.min(2, total);
      const aCompas = Math.min(total - aVos, comp.length * 2);
      const n = aVos + aCompas;
      A.tirar(Array.from({ length: n * 2 }, (_, i) => ({ tipo: i % 2 ? 'j' : 'x' })), {
        titulo: `Mordidas (r144): ${aVos} a vos${aCompas ? `, ${aCompas} a tus compañeros` : ''}`,
        texto: (v) => {
          const out = [];
          for (let i = 0; i < n; i++) {
            const d1 = v[i * 2], d2 = v[i * 2 + 1];
            if (i < aVos) { const m = M.mordida(S, d1, d2, vivosEnc); out.push(`Vos: ${d1}${m.v !== d1 ? ` (−${d1 - m.v} protección)` : ''}${m.v === 6 && !vivosEnc ? `, segundo dado ${d2}` : ''} · ${m.txt}`); }
            else { const s = comp[Math.floor((i - aVos) / 2)]; out.push(`${s.n}: ${d1}${d1 === 6 && !vivosEnc ? `, ${d2}` : ''} · ${d1 <= 3 ? 'se suelta' : d1 <= 5 || vivosEnc ? '1 Herida' : d2 <= 3 ? '1 Herida y un arañazo' : '1 Herida y una mordida'}`); }
          }
          return '<ul class="chico">' + out.map((x) => `<li>${esc(x)}</li>`).join('') + '</ul><p class="chico">Los dados amarillos son el primero de cada mordida; los blancos, el segundo (solo cuenta con un 6).</p>';
        },
      }).then((v) => {
        for (let i = 0; i < n; i++) {
          const d1 = v[i * 2], d2 = v[i * 2 + 1];
          if (i < aVos) {
            const m = M.mordida(S, d1, d2, vivosEnc);
            if (m.heridas) M.herir(S, m.heridas);
            if (m.arañazo) { S.prota.arañazo = true; log('Arañazo: limpialo antes de la noche ([Medicina], 1 Fármacos) o la Fiebre empieza en 1 (r191).'); }
            if (m.mordida) { S.prota.fiebre = Math.max(1, S.prota.fiebre); S.prota.mordida = S.dia; log('MORDIDA: la Fiebre empieza en 1 (r191).'); }
            if (d1 === 6 && S.marcas.includes('ANTEOJOS')) log('Un 6 en Mordidas: se rompen tus anteojos (r105).');
            log(`Vos: ${m.txt}`);
          } else {
            const s = comp[Math.floor((i - aVos) / 2)];
            if (d1 >= 4) s.heridas = Math.min(3, s.heridas + 1);
            if (d1 === 6 && !vivosEnc && d2 >= 4) { s.fiebre = Math.max(1, s.fiebre); log(`${s.n}: lo muerden (r186).`); }
            if (s.heridas >= 3) log(`${s.n} cae: si alguien lo saca, vive Grave; si no, muere (r148).`);
          }
        }
        hecho();
      });
    };
    const disparos = (hecho) => {
      if (!vivos.length) return hecho();
      A.tirar(vivos.map(() => ({ tipo: 'x' })), {
        titulo: 'Los vivos (r147)',
        texto: (v) => '<ul class="chico">' + v.map((d, i) => `<li>${esc(vivos[i].n)}: ${d} · ${d <= 2 ? 'avanzan' : d <= 4 ? 'se quedan y disparan' : 'se cubren'}</li>`).join('') + '</ul>',
      }).then((v) => {
        let tiradores = 0;
        v.forEach((d, i) => {
          const g = vivos[i];
          if (d <= 2) g.dist = g.dist === 'Lejos' ? 'Cerca' : 'Encima';
          else if (d <= 4 && g.fuego) tiradores += g.cant;
          log(`${g.n}: ${d <= 2 ? 'avanzan' : d <= 4 ? 'disparan' : 'se cubren'}.`);
        });
        if (!tiradores) return hecho();
        A.tirar(Array.from({ length: Math.min(8, tiradores) }, () => ({ tipo: 'x' })), {
          titulo: `Disparan ${tiradores}: 1 Herida con cada 5–6`,
          texto: (vv) => `<p class="grande">${vv.filter((x) => x >= 5).length} ${u.plural(vv.filter((x) => x >= 5).length, 'Herida')}</p><p class="chico">A vos o a un compañero: la app te las pone a vos; si le tocan a otro, corregilo en el Grupo.</p>`,
        }).then((vv) => { const h = vv.filter((x) => x >= 5).length; if (h) { M.herir(S, h); log(`Los disparos: ${h} ${u.plural(h, 'Herida')}.`); } hecho(); });
      });
    };
    pasos();
    disparos(() => mordidas(() => {
      C.ronda++; C.accion = false; C.compas = {};
      log(`— Ronda ${C.ronda} —`);
      A.guardar(); A.pintar();
      if (M.muriendo(S)) A.modal('Caíste', '<p>Estás <b>Muriendo</b> (r190): el combate termina (r149).</p>', [{ t: 'Terminar el combate', clase: 'primario', accion: () => caer() }]);
    }));
  }
  function caer() {
    const S = A.S;
    A.modal('Perder (r149)', '<p>El combate termina: te saca un compañero o te arrastrás a un rincón, y los Callados se quedan con <b>1 casillero de tu Mochila al azar</b>. Sacalo en la Hoja.</p><p class="chico">Muriendo: solo podés arrastrarte (◷ 2 por barrio) o esperar ayuda. Sin cura antes del alba, morís (r190).</p>', [{ t: 'Entendido', clase: 'primario', accion: () => terminarCombate('Caíste.') }]);
    void S;
  }
  function terminarCombate(txt) {
    const S = A.S;
    if (!S.combate) return;
    M.anotarBitacora(S, `Combate (${S.combate.ronda} ${u.plural(S.combate.ronda, 'ronda')}): ${txt}`);
    S.combate = null;
    A.cerrarModal();
    A.guardar(); A.pintar();
    if (S.prota.arañazo) A.aviso('Tenés un <b>arañazo</b>: limpialo antes de la noche (r191).');
  }
  Ac.terminarCombate = terminarCombate;
})();
