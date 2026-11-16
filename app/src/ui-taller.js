/* =====================================================================
   CUARENTENA · el taller (r200–r207)
   Lee las recetas del libro (e740–e761), dice si te alcanzan los
   materiales, gasta el tiempo, tira la prueba y deja el resultado a
   mano: el frente, la trampa, el arma, la instalación.
   ===================================================================== */
'use strict';
(function () {
  const A = Q.app, M = Q.motor, D = Q.D, u = Q.u, el = Q.el, T = Q.texto, Me = Q.mesa;
  const Ta = (Q.taller = {});
  const esc = u.esc, boton = Me.boton;
  const MATS = 'Madera|Metal|Tela|Químicos|Sujeción|Electrónica|Combustible|Fármacos|Víveres|Víver';
  const GRUPO = { e740: 'barricada', e741: 'trampa', e742: 'arma', e743: 'arma', e744: 'objeto', e745: 'municion', e746: 'proteccion', e747: 'objeto', e748: 'objeto', e749: 'objeto' };

  /** Las recetas de una entrada. */
  Ta.recetas = function (e) {
    const n = +e.id.slice(1);
    const inst = n >= 750 && n <= 761;
    const out = [];
    for (const l of e.md.split('\n')) {
      if (!l.startsWith('> ') || l.trim().length < 4) continue;
      let txt = l.slice(2).trim(), nombre, basica = false;
      const m = txt.match(/^\*\*([^*]+)\*\*\s*(\*\(básica\)\*)?\s*·\s*/);
      if (m) { nombre = m[1]; basica = !!m[2]; txt = txt.slice(m[0].length); }
      else if (inst && !/^\*\*/.test(txt)) nombre = e.titulo;
      else continue;
      const partes = txt.split(' · ');
      const horas = +((txt.match(/◷ (\d+)/) || [])[1] || 1);
      const hab = (txt.match(/`\[([A-ZÁÉÍÓÚa-záéíóúñ]+)\]`/) || [])[1] || null;
      const min = (txt.match(/\((?:[A-ZÁÉÍÓÚ][a-záéíóú]+) (\d)\)/) || [])[1];
      // materiales: la primera parte; «A o B» son alternativas
      const mats = [], otros = [];
      if (!/^Sin materiales/i.test(partes[0])) {
        for (const pieza of partes[0].split(/,\s*/)) {
          const alts = [...pieza.matchAll(new RegExp(`(\\d+) (${MATS})(?![\\wáéíóú])`, 'g'))].map((x) => ({ k: Me.normMat(x[2]), n: +x[1] }));
          if (alts.length) mats.push(alts); else otros.push(pieza);
        }
      }
      const iH = partes.findIndex((p) => /◷/.test(p));
      const herr = partes.slice(1, iH > 0 ? iH : 1).filter((p) => !/`\[/.test(p));
      const iE = partes.findIndex((p, i) => i > iH && !/`\[/.test(p));
      const efecto = iE > 0 ? partes.slice(iE).join(' · ') : '';
      out.push({ ev: e.id, nombre, basica, horas, hab, min: min ? +min : 0, mats, otros, herr, efecto, inst, grupo: inst ? 'instalacion' : GRUPO[e.id] || 'objeto', linea: l.slice(2) });
    }
    return out;
  };
  Ta.todas = function () {
    const out = [];
    for (let n = 740; n <= 761; n++) { const e = Q.libro.entradas['e' + n]; if (e) out.push(...Ta.recetas(e)); }
    return out;
  };
  const conoce = (S, r) => r.basica || (S.recetas || []).includes(r.nombre);
  /** ¿Alcanzan los materiales? Devuelve {ok, elegidos:[{k,n}], falta} */
  function alcanza(S, r) {
    const elegidos = [];
    let falta = null;
    for (const alts of r.mats) {
      const ok = alts.find((x) => Me.hay(x.k) >= x.n);
      if (ok) elegidos.push(ok); else { falta = alts.map((x) => `${x.n} ${x.k}`).join(' o '); break; }
    }
    return { ok: !falta, elegidos, falta };
  }

  /** La caja de recetas que va debajo de cada entrada del recetario. */
  Ta.cajaRecetas = function (S, e, caja) {
    const recs = Ta.recetas(e);
    if (!recs.length || !S.refugio) return null;
    Ta._opts = {};
    const c = caja('Fabricar (r204)');
    for (const r of recs) c.append(filaReceta(S, r));
    return c;
  };
  function filaReceta(S, r) {
    const a = alcanza(S, r);
    const sabe = conoce(S, r);
    const instHecha = r.inst && S.refugio.inst.includes(r.nombre);
    const fila = el('div.receta',
      el('div', el('b', r.nombre), r.basica ? el('span.chico', ' (básica)') : null, el('span.chico', ` · ◷ ${r.horas}${r.hab ? ` · ${r.hab}${r.min ? ' ' + r.min : ''}` : ''}`)),
      el('p.chico', { html: `${r.mats.length ? r.mats.map((x) => x.map((y) => `${y.n} ${esc(y.k)}`).join(' o ')).join(', ') : 'Sin materiales'}${r.otros.length ? ' · ' + esc(r.otros.join(', ')) : ''}${r.herr.length ? ' · ' + esc(r.herr.join(' · ')) : ''}` }));
    const bt = el('div.fila-botones');
    if (instHecha) bt.append(el('span.chico', 'Ya la tenés.'));
    else if (!sabe) bt.append(el('span.chico', 'No la conocés (r203).'), boton('La aprendí', () => { S.recetas = S.recetas || []; if (!S.recetas.includes(r.nombre)) { S.recetas.push(r.nombre); M.anotarBitacora(S, `Aprendiste: ${r.nombre}.`); } const enModal = fila.closest('#modal'); A.guardar(); fila.replaceWith(filaReceta(S, r)); if (!enModal) A.pintar(); }, '.sutil'));
    else bt.append(el('button.btn', { type: 'button', disabled: a.ok ? null : true, title: a.ok ? '' : `Falta ${a.falta}`, onclick: () => Ta.fabricar(r) }, a.ok ? 'Fabricar' : `Falta ${a.falta}`));
    fila.append(bt);
    return fila;
  }

  /** El recetario completo, desde el día o el puesto Taller. opts.maxHoras, opts.gratis */
  Ta.recetario = function (opts = {}) {
    const S = A.S;
    const cuerpo = el('div.recetario');
    const grupos = {};
    for (const r of Ta.todas()) (grupos[r.ev] = grupos[r.ev] || []).push(r);
    cuerpo.append(el('p.chico', { html: `${opts.maxHoras ? `Puesto Taller: una receta de ◷ ${opts.maxHoras} o menos (r181). ` : ''}Con Taller, +1 a las pruebas. Materiales del refugio${S.enRefugio ? '' : ' (estás afuera: solo lo que llevás, r204)'}.` }));
    for (const ev in grupos) {
      const e = Q.libro.entradas[ev];
      const d = el('details.libro-cap', el('summary', `${e.titulo} `, el('span.cuenta', ev)));
      for (const r of grupos[ev]) { if (opts.maxHoras && r.horas > opts.maxHoras) continue; d.append(filaReceta(S, r)); }
      cuerpo.append(d);
    }
    Ta._opts = opts;
    A.modal('El taller', cuerpo, [{ t: 'Cerrar' }], { ancho: true });
  };

  Ta.fabricar = function (r) {
    const S = A.S;
    const opts = Ta._opts || {};
    if (r.nombre === 'Muro de muebles') { A.cerrarModal(); return Ta.muroDeMuebles(); }
    if (r.nombre === 'Tablones clavados') { A.cerrarModal(); return Ta.tablones(); }
    const a = alcanza(S, r);
    if (!a.ok) return A.aviso(`Falta ${a.falta}.`, 'malo');
    const gratis = opts.gratis || S.diaCero || S.fase === 'prologo' || S.fase === 'noche';
    if (r.min && M.hab(S, r.hab) < r.min) return A.aviso(`Pide ${r.hab} ${r.min} (r200).`, 'malo');
    const cuerpo = el('div', el('p', { html: `<b>${esc(r.nombre)}</b> · ${a.elegidos.map((x) => `${x.n} ${esc(x.k)}`).join(', ') || 'sin materiales'} · ◷ ${r.horas}${gratis ? ' (sin gastar horas del día)' : ''}` }),
      r.herr.length || r.otros.length ? el('p.chico', { html: `Además pide: <b>${esc(r.otros.concat(r.herr).join(' · '))}</b>. ¿Lo tenés?` }) : null,
      r.hab ? el('p.chico', { html: `Prueba de <b>${r.hab}</b>: con 10+ sale; con 7–9 sale y gastás 1 material más; con 6−, no sale y perdés la mitad de los materiales, hacia abajo (r204).${S.refugio && S.refugio.inst.includes('Taller') ? ' Con Taller, +1.' : ''}` }) : null);
    A.modal('Fabricar', cuerpo, [{ t: 'Cancelar' }, { t: 'Fabricar', clase: 'primario', accion: () => {
      if (!gratis && !Q.acciones.gastarHoras(r.horas)) return;
      for (const x of a.elegidos) Me.gastar(x.k, x.n);
      const terminar = (cat) => {
        if (cat === 'fallo') {
          // r204: se pierde la mitad, hacia abajo: devolvemos la otra mitad
          for (const x of a.elegidos) { const vuelve = x.n - Math.floor(x.n / 2); if (vuelve) Me.moverMat(S.enRefugio || S.diaCero ? 'refugio' : 'carga', x.k, vuelve); }
          M.anotarBitacora(S, `${r.nombre}: no salió.`);
          A.aviso('No salió: perdiste la mitad de los materiales (hacia abajo); el resto volvió.');
          Q.ui.refrescar(); A.pintar();
          return;
        }
        if (cat === 'precio') A.aviso('Salió, y gastás 1 material más: restalo en la Hoja (r204).');
        M.anotarBitacora(S, `Fabricaste: ${r.nombre}.`);
        resultado(r, cat);
      };
      if (r.hab) A.prueba(r.hab, { bono: S.refugio && S.refugio.inst.includes('Taller') ? 1 : 0 }).then((res) => { if (res) terminar(res.cat); });
      else terminar('limpio');
    } }]);
  };

  /** Lo que sale: cada grupo con su botón. */
  function resultado(r, cat) {
    const S = A.S, P = S.prota;
    const cuerpo = el('div', el('p', { html: `<b>${esc(r.nombre)}</b>: ${T.enLinea(r.efecto || 'listo.')}` }));
    const btns = [{ t: 'Cerrar' }];
    const res = (r.efecto.match(/\+(\d) Resistencia/) || [])[1];
    if (r.grupo === 'barricada') {
      const n = r.nombre === 'Muro de muebles' ? (cat === 'limpio' ? 2 : 1) : +res || 2;
      btns.push({ t: `+${n} Resistencia a un frente`, clase: 'primario', accion: () => Me.elegirFrente(`${r.nombre}: ¿qué frente?`, (f) => {
        S.refugio.frentes[f] = Math.min(10, S.refugio.frentes[f] + n);
        M.anotarBitacora(S, `${r.nombre} en ${f}: ${S.refugio.frentes[f]}.`);
        Q.ui.refrescar(); A.pintar();
      }) });
    } else if (r.grupo === 'trampa') {
      const valor = +((r.efecto.match(/Valor (\d)/) || [])[1] || 1);
      btns.push({ t: 'Colocar en un frente (◷ 1)', clase: 'primario', accion: () => Me.elegirFrente(`${r.nombre}: ¿dónde?`, (f) => {
        if (!Q.acciones.gastarHoras(1)) return;
        S.refugio.trampas[f].push({ n: r.nombre, valor });
        M.anotarBitacora(S, `${r.nombre} en ${f}.`);
        Q.ui.refrescar(); A.pintar();
      }, (f) => (S.refugio.trampas[f].length >= 2 ? 'sin espacio' : null)) });
      btns.push({ t: 'Guardarla', accion: () => { P.mochila.push({ n: `${r.nombre} (trampa, valor ${valor})`, cas: 1 }); Q.ui.refrescar(); } });
    } else if (r.grupo === 'arma') {
      const dano = +((r.efecto.match(/Daño (\d)/) || [])[1] || 1), usos = +((r.efecto.match(/Usos (\d+)/) || [])[1] || 0) || null, ruido = +((r.efecto.match(/Ruido (\d)/) || [])[1] || 0);
      const lejos = /Lejos/.test(r.efecto);
      if (/saetas/i.test(r.nombre)) btns.push({ t: 'Guardar las 4 saetas', clase: 'primario', accion: () => { P.mochila.push({ n: '4 saetas', cas: 0 }); Q.ui.refrescar(); } });
      else btns.push({ t: 'Tomar el arma', clase: 'primario', accion: () => { P.armas.push({ n: r.nombre, dano, ruido, alc: lejos ? 'Lejos' : 'Cerca', usos, max: usos, fuego: false }); Q.ui.refrescar(); A.aviso(`<b>${esc(r.nombre)}</b> en tu Hoja.`); } });
    } else if (r.grupo === 'municion') {
      const n = cat === 'precio' ? 3 : 4;
      btns.push({ t: `+${n} Munición`, clase: 'primario', accion: () => { P.municion += n; Q.ui.refrescar(); } });
    } else if (r.grupo === 'proteccion') {
      const usos = /∞/.test(r.efecto) ? null : +((r.efecto.match(/Usos (\d+)/) || [])[1] || 3);
      btns.push({ t: 'Ponérsela', clase: 'primario', accion: () => { P.prot.push({ n: r.nombre, resta: 1, usos, casco: /casco/i.test(r.nombre) }); Q.ui.refrescar(); A.aviso(`<b>${esc(r.nombre)}</b>: protección −1.`); } });
    } else if (r.grupo === 'instalacion') {
      btns.push({ t: `Anotar: ${r.nombre}`, clase: 'primario', accion: () => Ta.instalar(r.nombre) });
    } else {
      const cuantos = +((r.efecto.match(/^(\d) /) || [])[1] || 1);
      const nombre = /molotov/i.test(r.nombre) ? 'Molotov' : r.nombre;
      btns.push({ t: `Guardar en la Mochila${cuantos > 1 ? ` (${cuantos})` : ''}`, clase: 'primario', accion: () => { for (let k = 0; k < cuantos; k++) P.mochila.push({ n: nombre, cas: 1 }); Q.ui.refrescar(); A.aviso(`<b>${esc(nombre)}</b> a la Mochila.`); } });
    }
    A.modal('Salió', cuerpo, btns);
  }

  /** Anotar una instalación: +1 Moral la primera de cada tipo (r182). */
  Ta.instalar = function (nombre) {
    const S = A.S;
    if (S.refugio.inst.includes(nombre)) return A.aviso('Ya la tenés.');
    S.refugio.inst.push(nombre);
    M.cambiarMoral(S, 1);
    if (nombre === 'Cortinas negras') M.cambiarRastro(S, -1);
    M.anotarBitacora(S, `Instalación: ${nombre} (+1 Moral).`);
    A.aviso(`<b>${esc(nombre)}</b>: +1 Moral (la primera de cada tipo, r182).${nombre === 'Cortinas negras' ? ' −1 Rastro.' : ''}`);
    Q.ui.refrescar(); A.pintar();
  };

  /* ---------- las dos básicas del prólogo, con su regla exacta ---------- */
  Ta.muroDeMuebles = function () {
    const S = A.S;
    S.refugio.muro = S.refugio.muro || {};
    Me.elegirFrente('Muro de muebles: ¿qué frente? (una vez por frente)', (f) => {
      if (!Q.acciones.gastarHoras(1)) return;
      A.prueba('Físico').then((r) => {
        if (!r) return;
        const n = r.cat === 'limpio' ? 2 : 1;
        S.refugio.frentes[f] = Math.min(10, S.refugio.frentes[f] + n);
        S.refugio.muro[f] = true;
        if (r.cat === 'precio') M.herir(S, 1);
        if (r.cat === 'fallo') M.cambiarAnimo(S, -1);
        A.aviso(`Muro de muebles en ${f}: <b>+${n}</b>${r.cat === 'precio' ? ' y 1 Herida' : r.cat === 'fallo' ? ', pero rompiste algo: −1 Ánimo' : ''}.`);
        M.anotarBitacora(S, `Muro de muebles en ${f}: ${S.refugio.frentes[f]}.`);
        Q.ui.refrescar(); A.pintar();
      });
    }, (f) => (S.refugio.muro[f] ? 'ya tiene' : null));
  };
  Ta.tablones = function () {
    const S = A.S;
    if (Me.hay('Madera', 'refugio') < 2 || Me.hay('Sujeción', 'refugio') < 1) return A.aviso('Tablones clavados pide 2 Madera y 1 Sujeción.', 'malo');
    const horas = Me.tieneHerramienta('Martillo') ? 2 : 3;
    Me.elegirFrente(`Tablones clavados (+2): ¿qué frente?${horas === 3 ? ' Sin Martillo, con una piedra: ◷ 3.' : ''}`, (f) => {
      if (!Q.acciones.gastarHoras(horas)) return;
      Me.moverMat('refugio', 'Madera', -2); Me.moverMat('refugio', 'Sujeción', -1);
      S.refugio.frentes[f] = Math.min(10, S.refugio.frentes[f] + 2);
      A.aviso(`Tablones clavados en ${f}: <b>${S.refugio.frentes[f]}</b>.`);
      M.anotarBitacora(S, `Tablones clavados en ${f}: ${S.refugio.frentes[f]}.`);
      Q.ui.refrescar(); A.pintar();
    });
  };
  /** r206: reparar un arma o protección rota. */
  Ta.reparar = function (tipo, i) {
    const S = A.S, x = (tipo === 'arma' ? S.prota.armas : S.prota.prot)[i];
    if (!x || x.max == null) return;
    if (x.max <= 0) return A.aviso('No tiene arreglo: desarmala (r165).');
    const mat = Me.hay('Metal') ? 'Metal' : Me.hay('Madera') ? 'Madera' : null;
    if (!mat) return A.aviso('Reparar pide 1 Metal o Madera (r206).', 'malo');
    if (!Q.acciones.gastarHoras(1)) return;
    Me.gastar(mat, 1);
    x.max = Math.max(0, x.max - 1); x.usos = x.max;
    A.aviso(`${esc(x.n)}: Usos ${x.usos} (el máximo bajó 1).`);
    Q.ui.refrescar(); A.pintar();
  };
})();
