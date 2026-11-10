"""Iconografía de Cuarentena: SVG en línea, trazo grueso de cartel sanitario.

Cada icono es un viewBox 0 0 24 24. `icono(nombre)` devuelve el <svg> listo para
insertarse en el HTML. Los símbolos del texto (◷ ★) se sustituyen por estos iconos
al maquetar; las casillas ▢ se dibujan con CSS.
"""

_T = 'fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="square" stroke-linejoin="miter"'

ICONOS = {
    # Dado: prueba
    'dado': '<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/>'
            '<circle cx="8" cy="8" r="1.8" fill="#f4eedf"/><circle cx="12" cy="12" r="1.8" fill="#f4eedf"/>'
            '<circle cx="16" cy="16" r="1.8" fill="#f4eedf"/>',
    # Hora de luz: reloj con un cuarto lleno
    'hora': f'<circle cx="12" cy="12" r="8.6" {_T}/><path d="M12 12V3.4A8.6 8.6 0 0 1 20.6 12z" fill="currentColor"/>',
    # Herida: cruz de primeros auxilios rota
    'herida': f'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" {_T}/><path d="M7 17l10-10" {_T}/>',
    # Fiebre: termómetro
    'fiebre': f'<path d="M10 14.5V4.5a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0z" {_T}/>'
              '<circle cx="12" cy="17.6" r="2" fill="currentColor"/><path d="M12 9v7" stroke="currentColor" stroke-width="2.1"/>',
    # Ruido: altavoz con ondas
    'ruido': '<path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/>'
             f'<path d="M15.5 9a4 4 0 0 1 0 6M18.2 6.2a8 8 0 0 1 0 11.6" {_T}/>',
    # Refugio: casa tapiada
    'refugio': f'<path d="M3 11l9-7 9 7v10H3z" {_T}/><path d="M7 13l10 5M7 18l10-5" {_T}/>',
    # Grupo: tres cabezas
    'grupo': '<circle cx="12" cy="7" r="3" fill="currentColor"/><circle cx="5" cy="10" r="2.3" fill="currentColor"/>'
             '<circle cx="19" cy="10" r="2.3" fill="currentColor"/>'
             '<path d="M6.5 21v-4a5.5 5.5 0 0 1 11 0v4zM1 21v-3a4 4 0 0 1 5-3.9M23 21v-3a4 4 0 0 0-5-3.9" fill="currentColor"/>',
    # Callado: silueta quieta
    'callado': '<circle cx="12" cy="5" r="3" fill="currentColor"/>'
               '<path d="M8 9.5h8l1 7h-2.2l-.6 6h-4.4l-.6-6H7z" fill="currentColor"/>',
    # Combate: hacha
    'combate': f'<path d="M5 21L17 5" {_T}/><path d="M13 3.5c3 0 6 1.8 7.5 4.5L16 12.5c-1.6-1.6-3.2-3.8-3-9z" fill="currentColor"/>',
    # Radio portátil
    'radio': f'<rect x="3" y="8" width="18" height="12" rx="1.5" {_T}/><path d="M7 8l9-5" {_T}/>'
             '<circle cx="15.5" cy="14" r="3" fill="currentColor"/><path d="M6 12h4M6 15h4M6 18h4" stroke="currentColor" stroke-width="1.6"/>',
    # Lápiz
    'lapiz': f'<path d="M4 20l1.5-5L16 4.5l3.5 3.5L9 18.5z" {_T}/><path d="M14 6.5l3.5 3.5" {_T}/>',
    # Mapa / barrio
    'mapa': f'<path d="M3 6l6-2.5 6 2.5 6-2.5v14.5L15 20.5 9 18l-6 2.5z" {_T}/><path d="M9 3.5V18M15 6v14.5" {_T}/>',
    # Eventos: hojas apiladas
    'ejemplo': f'<rect x="4" y="6" width="12" height="15" {_T}/><path d="M8 3h12v15" {_T}/>',
    # Ayuda / consejo / recuerda
    'ayuda': f'<circle cx="12" cy="12" r="9" {_T}/><path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1.9-1.1 1.8" {_T}/>'
             '<rect x="11" y="16" width="2" height="2" fill="currentColor"/>',
    'consejo': f'<path d="M9 18h6M10 21h4" {_T}/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" {_T}/>',
    'recuerda': '<path d="M12 2.5l10 18H2z" fill="currentColor"/><path d="M12 9v5.5" stroke="#f4eedf" stroke-width="2.2"/>'
                '<rect x="10.9" y="16.3" width="2.2" height="2.2" fill="#f4eedf"/>',
    # Hito (★ en el texto)
    'hito': '<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill="currentColor"/>',
    # Pista: lupa
    'pista': f'<circle cx="10" cy="10" r="6.5" {_T}/><path d="M15 15l6 6" {_T}/>',
    # Objeto: llave inglesa
    'objeto': f'<path d="M14.5 3.5a5 5 0 0 0-5.7 6.8L3 16.1 7.9 21l5.8-5.8a5 5 0 0 0 6.8-5.7l-3 3-3.4-.9-.9-3.4z" {_T}/>',
    # Ornamento: franja de peligro
    'rombo': '<path d="M12 4l8 8-8 8-8-8z" fill="currentColor"/>',
}

# Emblemas de facción (viewBox 0 0 48 48), estilo plantilla de esténcil
_E = 'fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="miter" stroke-linecap="square"'
EMBLEMAS = {
    # La Parroquia: campana
    'parroquia': f'<rect x="3" y="3" width="42" height="42" {_E}/><path d="M16 32c0-10 2-17 8-17s8 7 8 17z" fill="currentColor"/>'
                 f'<path d="M12 32h24M24 10v5" {_E}/><circle cx="24" cy="36" r="2.4" fill="currentColor"/>',
    # Los Bomberos: escalera y hacha
    'bomberos': f'<rect x="3" y="3" width="42" height="42" {_E}/><path d="M15 40V8M25 40V8M15 14h10M15 22h10M15 30h10" {_E}/>'
                '<path d="M30 12c5 0 8 3 9 7l-7 3c-1-3-2-6-2-10z" fill="currentColor"/><path d="M33 20l-4 20" stroke="currentColor" stroke-width="2.6"/>',
    # Los Lobos: dientes
    'lobos': f'<rect x="3" y="3" width="42" height="42" {_E}/><path d="M9 16l5 9 5-9 5 9 5-9 5 9 5-9" {_E}/>'
             f'<path d="M9 32l5-9 5 9 5-9 5 9 5-9 5 9" {_E}/>',
    # El Destacamento: galones
    'destacamento': f'<rect x="3" y="3" width="42" height="42" {_E}/><path d="M11 20l13-8 13 8M11 29l13-8 13 8M11 38l13-8 13 8" {_E}/>',
}


def icono(nombre, clase=''):
    cuerpo = ICONOS[nombre]
    return (f'<svg class="ico ico-{nombre} {clase}" viewBox="0 0 24 24" '
            f'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{cuerpo}</svg>')


def emblema(nombre, clase=''):
    return (f'<svg class="emblema {clase}" viewBox="0 0 48 48" '
            f'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{EMBLEMAS[nombre]}</svg>')


# Símbolo del texto → icono
SIMBOLOS = {'◷': 'hora', '★': 'hito'}
