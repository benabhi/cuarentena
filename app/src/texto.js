/* =====================================================================
   CUARENTENA · texto
   El Markdown del libro → HTML, con la «lectura activa»: las pruebas,
   los dados, las Marcas, los efectos y los combates del texto se vuelven
   botones. Nada se aplica solo: el botón propone, el jugador decide.
   ===================================================================== */
'use strict';
(function () {
  const T = (Q.texto = {});
  const esc = Q.u.esc;
  const HABS = Q.D.HABS.join('|');
  const CONTADORES = 'Juramento|Cimientos|Deber|Ruta|Esperanza|Culpa';
  const MATS = 'Víveres|Víver|Fármacos|Fármaco|Madera|Metal|Tela|Químicos|Sujeción|Electrónica|Combustible|Munición|Antivirales|Antiviral';
  const ENEMIGOS = 'Callad|Bruto|Ahogad|Acechador|Chillona|Vivo|Soldado|Sabueso|Rolo|Pastor|Lobos|Hinchado|Fresco|Escupidor|Bombero|Blindado|Viuda';
  const FACC = { Parroquia: 'parroquia', Bomberos: 'bomberos', Lobos: 'lobos', Destacamento: 'destacamento' };

  T.titulo = (id) => { const e = Q.libro.entradas[id]; return e ? e.titulo : id; };

  /* ---------- en línea ---------- */
  function activo(txt, ctx) {
    // txt ya escapado y sin etiquetas. Cada patrón se vuelve un botón con data-*.
    let s = txt;
    // efectos con signo: +1 Moral, −2 Ánimo, +1 Rastro, +2 Ruido, −1 Reputación con los Lobos, +1 Esperanza
    s = s.replace(new RegExp(`([+−-])(\\d+) (Moral|Ánimo|Rastro|Ruido|${CONTADORES})(?![\\wáéíóú])`, 'g'), (m, sg, n, k) =>
      `<button type="button" class="tk ef" data-ef="${k}" data-n="${sg === '+' ? n : -n}">${m}</button>`);
    s = s.replace(/([+−])(\d+) Resistencia(?![\wáéíóú])/g, (m, sg, n) =>
      `<button type="button" class="tk ef" data-ef="Resistencia" data-n="${sg === '+' ? n : -n}">${m}</button>`);
    s = s.replace(/([+−-])(\d+) (?:de )?Reputación(?: con (?:el |la |los |las )?(Parroquia|Bomberos|Lobos|Destacamento))?/g, (m, sg, n, f) =>
      `<button type="button" class="tk ef" data-ef="Reputación" data-f="${f ? FACC[f] : ''}" data-n="${sg === '+' ? n : -n}">${m}</button>`);
    // tu contador sube / baja
    s = s.replace(/tu contador (sube|avanza|baja)( \d+)?/g, (m, v, n) =>
      `<button type="button" class="tk ef" data-ef="contador" data-n="${(v === 'baja' ? -1 : 1) * (n ? +n : 1)}">${m}</button>`);
    // heridas
    s = s.replace(/(?<![\w+−-])(\d) (Heridas?)(?! (?:llenas|menos|más))/g, (m, n) => `<button type="button" class="tk ef mal" data-ef="Herida" data-n="${n}">${m}</button>`);
    // materiales y Víveres sin signo: el jugador elige sumar o restar
    s = s.replace(new RegExp(`(?<![\\w+−-])(\\d+|un|una) (${MATS})(?![\\wáéíóú])`, 'g'), (m, n, k) => {
      const v = /^\d+$/.test(n) ? n : 1;
      return `<button type="button" class="tk mat" data-mat="${k}" data-n="${v}">${m}</button>`;
    });
    // dados: 1d6, 2d6, 3d6, 1d3, 4d6, d66, 1d6+2
    s = s.replace(/(?<![\w>])(\d?)d(6|3|66)(?:\s?([+−-])\s?(\d+))?(?![\w<])/g, (m, n, c, sg, k) =>
      `<button type="button" class="tk dado" data-n="${n || 1}" data-c="${c}" data-k="${sg ? (sg === '+' ? k : -k) : 0}">${m}</button>`);
    // práctica en X
    s = s.replace(new RegExp(`práctica\\*{0,2} (?:en|de) (${HABS})`, 'g'), (m, h) => `<button type="button" class="tk prac" data-hab="${h}">${m}</button>`);
    return s;
  }

  function enLinea(md, ctx) {
    // separa en trozos: código, enlaces, resto
    const out = [];
    const re = /`([^`]+)`|\[([^\]]+)\]\(#([re]\d{3})\)/g;
    let i = 0, m;
    while ((m = re.exec(md))) {
      out.push({ t: 'txt', v: md.slice(i, m.index) });
      if (m[1] != null) out.push({ t: 'code', v: m[1] }); else out.push({ t: 'ref', v: m[2], id: m[3] });
      i = re.lastIndex;
    }
    out.push({ t: 'txt', v: md.slice(i) });
    let html = '';
    for (let k = 0; k < out.length; k++) {
      const p = out[k];
      if (p.t === 'code') {
        const v = p.v;
        const mp = v.match(new RegExp(`^\\[(${HABS})(?: · ([^\\]]+))?\\]$`));
        if (mp) {
          const mod = mp[2] ? (/Desv/.test(mp[2]) ? 'desventaja' : /Vent/.test(mp[2]) ? 'ventaja' : '') : '';
          const bono = mp[2] && /\+(\d)/.test(mp[2]) ? mp[2].match(/\+(\d)/)[1] : 0;
          html += `<button type="button" class="tk prueba" data-hab="${mp[1]}" data-mod="${mod}" data-b="${bono}" title="Tirar 2d6 + ${mp[1]}">${esc(mp[1])}${mp[2] ? ' · ' + esc(mp[2]) : ''}</button>`;
        } else if (/^\[[^\]]+\]$/.test(v)) {
          html += `<span class="tk prueba-x">${esc(v)}</span>`;
        } else if (/^[A-ZÁÉÍÓÚÑ0-9_]+$/.test(v) && v.length > 2) {
          const base = v.replace(/_$/, '');
          html += `<button type="button" class="tk marca" data-marca="${esc(v)}" title="Marca: tocá para anotarla o borrarla">${esc(v)}</button>`;
          void base;
        } else html += `<code>${esc(v)}</code>`;
      } else if (p.t === 'ref') {
        const prev = (out[k - 1] && out[k - 1].t === 'txt' ? out[k - 1].v : '').trimEnd();
        const ir = /→\s*\**$/.test(prev) || /(?:andá a|Andá a|volvé a|Volvé a|leé|Leé)\s*\**$/.test(prev);
        html += `<a href="#${p.id}" class="ref${ir ? ' ir' : ''}" data-ref="${p.id}" title="${esc(T.titulo(p.id))}">${esc(p.v)}</a>`;
      } else {
        let t = esc(p.v);
        t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<i>$2</i>');
        // los patrones activos van solo sobre texto (no dentro de etiquetas)
        t = t.split(/(<[^>]+>)/).map((seg) => (seg.startsWith('<') ? seg : activo(seg, ctx))).join('');
        // referencias sueltas (r120, e030) sin enlace
        t = t.split(/(<[^>]+>[^<]*<\/[^>]+>|<[^>]+>)/).map((seg) => (seg.startsWith('<') ? seg : seg.replace(/\b([re]\d{3})\b/g, (mm, id) => (Q.libro.entradas[id] ? `<a href="#${id}" class="ref" data-ref="${id}" title="${esc(T.titulo(id))}">${id}</a>` : mm)))).join('');
        html += t;
      }
    }
    // negritas que envuelven un enlace o un código: «**[e002](#e002)**»
    html = html.replace(/\*\*((?:(?!\*\*).)+?)\*\*/g, '<b>$1</b>');
    // combates: «**Callados ×2 · Cerca**» → botón
    html = html.replace(new RegExp(`<b>((?:y )?(?:${ENEMIGOS})[\\wáéíóúñ]* ×[^<]*)<\\/b>`, 'g'), (m, inner) => {
      const limpio = inner.replace(/<[^>]+>/g, '').replace(/^y /, '');
      return `<button type="button" class="tk combate" data-combate="${esc(limpio)}" title="Abrir el combate">${inner}</button>`;
    });
    return html;
  }
  T.enLinea = enLinea;

  /* ---------- bloques ---------- */
  T.md = function (md, ctx = {}) {
    if (!md) return '';
    const lineas = md.replace(/\r/g, '').split('\n');
    let html = '', i = 0;
    const parrafo = [];
    const cerrarP = () => { if (parrafo.length) { html += `<p>${enLinea(parrafo.join(' '), ctx)}</p>`; parrafo.length = 0; } };
    while (i < lineas.length) {
      const l = lineas[i];
      if (!l.trim()) { cerrarP(); i++; continue; }
      if (/^-{3,}\s*$/.test(l)) { cerrarP(); html += '<hr>'; i++; continue; }
      let m;
      if ((m = l.match(/^(#{2,4}) (.+)/))) { cerrarP(); const n = Math.min(4, m[1].length + 1); html += `<h${n}>${enLinea(m[2], ctx)}</h${n}>`; i++; continue; }
      if (l.startsWith('|')) {
        cerrarP();
        const filas = [];
        while (i < lineas.length && lineas[i].startsWith('|')) filas.push(lineas[i++]);
        html += tabla(filas, ctx);
        continue;
      }
      if (l.startsWith('>')) {
        cerrarP();
        const bl = [];
        while (i < lineas.length && lineas[i].startsWith('>')) bl.push(lineas[i++].replace(/^>\s?/, ''));
        const ficha = /^\*\*[^*]+\*\* · /.test(bl[0]);
        html += `<blockquote class="${ficha ? 'ficha' : ''}">${bl.map((x) => (x.trim() ? `<p>${enLinea(x, ctx)}</p>` : '')).join('')}</blockquote>`;
        continue;
      }
      if ((m = l.match(/^(\d+)\. (.+)/))) {
        cerrarP();
        let items = '';
        while (i < lineas.length && (m = lineas[i].match(/^(\d+)\. (.+)/))) {
          items += `<li class="opcion" data-n="${m[1]}"><span class="num">${m[1]}</span><div>${enLinea(m[2], ctx)}</div></li>`;
          i++;
        }
        html += `<ol class="opciones">${items}</ol>`;
        continue;
      }
      if (/^[-*] /.test(l)) {
        cerrarP();
        let items = '';
        while (i < lineas.length && /^[-*] /.test(lineas[i])) { items += `<li>${enLinea(lineas[i].slice(2), ctx)}</li>`; i++; }
        html += `<ul>${items}</ul>`;
        continue;
      }
      parrafo.push(l.trim());
      i++;
    }
    cerrarP();
    return html;
  };

  function celdas(f) { return f.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()); }
  function tabla(filas, ctx) {
    const cab = celdas(filas[0]);
    const cuerpo = filas.slice(2).map(celdas);
    const dado = (cab[0] || '').match(/^(\d?d(?:6|66)|Resultado|2d6|1d6)$/i);
    let h = `<div class="tabla-envoltura"><table${dado ? ` class="tabla-dado" data-dado="${esc(cab[0])}"` : ''}><thead><tr>`;
    h += cab.map((c) => `<th>${enLinea(c, ctx)}</th>`).join('') + '</tr></thead><tbody>';
    for (const f of cuerpo) {
      h += `<tr${dado ? ` data-v="${esc(f[0].replace(/\*/g, ''))}"` : ''}>` + f.map((c) => `<td>${enLinea(c, ctx)}</td>`).join('') + '</tr>';
    }
    h += '</tbody></table></div>';
    if (dado && !/Resultado/i.test(cab[0])) {
      const c = /66/.test(cab[0]) ? '66' : '6';
      const n = /^2d/.test(cab[0]) ? 2 : 1;
      h = `<div class="tabla-con-dado"><button type="button" class="tk dado tirar-tabla" data-n="${n}" data-c="${c}" data-k="0" data-tabla="1">Tirar ${esc(cab[0])} en la tabla</button>${h}</div>`;
    }
    return h;
  }

  /** ¿La fila de una tabla de dados incluye este valor? «1–2», «3», «12+», «6 o más» */
  T.filaIncluye = function (txt, v) {
    const t = String(txt).replace(/\*/g, '').trim();
    let m;
    if ((m = t.match(/^(\d+)\s*[–-]\s*(\d+)/))) return v >= +m[1] && v <= +m[2];
    if ((m = t.match(/^(\d+)\s*(?:\+|o más)/))) return v >= +m[1];
    if ((m = t.match(/^(\d+)/))) return v === +m[1];
    return false;
  };

  /* ---------- íconos (trazo simple, en línea) ---------- */
  const ICONOS = {
    dado: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.3" fill="currentColor"/><circle cx="15" cy="15" r="1.3" fill="currentColor"/><circle cx="15" cy="9" r="1.3" fill="currentColor"/><circle cx="9" cy="15" r="1.3" fill="currentColor"/>',
    mapa: '<path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z"/><path d="M9 4v14M15 6v14"/>',
    persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 5-7 8-7s7 2 8 7"/>',
    casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    grupo: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2 20c1-4 3-6 6-6s5 2 6 6M10 20c1-4 3-6 6-6s5 2 6 6"/>',
    libro: '<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v14"/>',
    lista: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    llave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    luna: '<path d="M20 14A8 8 0 1110 4a6 6 0 0010 10z"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    buscar: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    reloj: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    ruido: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9c1 1 1 5 0 6M19 7c2 2 2 8 0 10"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    atras: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    ayuda: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4M12 17v.5"/>',
    bajar: '<path d="M12 4v12M6 10l6 6 6-6M4 20h16"/>',
    herramientas: '<path d="M14 6a4 4 0 00-5 5L3 17l4 4 6-6a4 4 0 005-5l-3 3-3-1-1-3z"/>',
    cruz: '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>',
    calavera: '<path d="M12 3c-5 0-8 3-8 7 0 3 2 4 3 5v3h10v-3c1-1 3-2 3-5 0-4-3-7-8-7z"/><circle cx="9" cy="11" r="1.6"/><circle cx="15" cy="11" r="1.6"/><path d="M10 18v3M14 18v3"/>',
  };
  T.ico = (n, clase = '') => `<svg class="ico ${clase}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONOS[n] || ''}</svg>`;
})();
