#!/usr/bin/env python3
"""Construye la app estática de Cuarentena en app/dist.

1. Convierte el libro (libro/*.md) en datos (herramientas/construir_datos.py → datos/libro.json).
2. Arma dist/index.html desde src/plantilla.html: estilos, código y datos van adentro.
3. Copia three.js y las fuentes, y achica el arte del libro para la web.

Uso: python3 herramientas/construir_app.py   (desde app/ o desde la raíz del repo)
El resultado se publica tal cual en GitHub Pages (.github/workflows/pages.yml).
"""
import importlib.util
import json
import os
import shutil
import subprocess
import sys

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAIZ = os.path.dirname(APP)
SRC = os.path.join(APP, 'src')
DIST = os.path.join(APP, 'dist')
REPO = 'https://github.com/benabhi/cuarentena'

# orden de carga: cada archivo usa lo que definen los anteriores
CODIGO = ['base.js', 'dados.js', 'texto.js', 'motor.js', 'ui-nucleo.js', 'ui-mesa.js', 'ui-acciones.js',
          'ui-taller.js', 'ui-fases.js', 'ui-hoja.js', 'ui-crear.js', 'ui-herramientas.js', 'guia.js']

# número de barrio (r150) → clave interna de la app
SLUG = {1: 'casco', 2: 'sanidad', 3: 'puerto', 4: 'fabril', 5: 'bloques', 6: 'lomas', 7: 'estacion',
        8: 'mercado', 9: 'universidad', 10: 'costanera', 11: 'cementerio', 12: 'perimetro'}

ANCHO_ARTE = 960


def leer(*p):
    with open(os.path.join(*p), encoding='utf-8') as fh:
        return fh.read()


def mapa():
    """El plano de Tolme, tomado del mismo módulo que dibuja el del libro."""
    spec = importlib.util.spec_from_file_location('mapa', os.path.join(RAIZ, 'maqueta', 'mapa.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    barrios = {SLUG[n]: {'n': n, 'xy': list(xy), 'anc': anc, 'nombre': nombre}
               for n, (nombre, xy, anc, *_resto) in m.BARRIOS.items()}
    par = lambda lista: [[SLUG[a], SLUG[b]] for a, b in lista]
    return {'barrios': barrios, 'calle': par(m.CALLE), 'azoteas': par(m.AZOTEAS), 'subsuelo': par(m.SUBSUELO)}


def arte():
    """Achica las ilustraciones y devuelve el diccionario clave → ruta."""
    from PIL import Image
    origen = os.path.join(RAIZ, 'arte')
    destino = os.path.join(DIST, 'arte')
    os.makedirs(destino, exist_ok=True)
    claves = {}
    for f in sorted(os.listdir(origen)):
        if not f.endswith('.jpg') or f.startswith(('l-', 'contratapa')):
            continue
        base = f[:-4]
        if base.startswith('b-'):
            clave = base[2:]
        elif base == 'd-marea':
            clave = 'marea'
        else:
            clave = base          # portada, v-<nombre>
        im = Image.open(os.path.join(origen, f)).convert('RGB')
        if im.width > ANCHO_ARTE:
            im = im.resize((ANCHO_ARTE, round(im.height * ANCHO_ARTE / im.width)), Image.LANCZOS)
        im.save(os.path.join(destino, f), 'JPEG', quality=74, optimize=True, progressive=True)
        claves[clave] = 'arte/' + f
    return claves


def main():
    subprocess.run([sys.executable, os.path.join(APP, 'herramientas', 'construir_datos.py')], check=True)
    libro = leer(APP, 'datos', 'libro.json')
    json.loads(libro)   # que sea JSON válido antes de meterlo en la página

    shutil.rmtree(DIST, ignore_errors=True)
    os.makedirs(os.path.join(DIST, 'vendor'))
    shutil.copy(os.path.join(APP, 'vendor', 'three.min.js'), os.path.join(DIST, 'vendor'))
    shutil.copytree(os.path.join(APP, 'vendor', 'fuentes'), os.path.join(DIST, 'fuentes'),
                    ignore=shutil.ignore_patterns('*.css'))
    claves = arte()

    globales = ("window.Q = window.Q || {};\n"
                "Q.libro = JSON.parse(document.getElementById('datos-libro').textContent);\n"
                f"Q.MAPA = {json.dumps(mapa(), ensure_ascii=False)};\n"
                f"Q.ARTE = {json.dumps(claves, ensure_ascii=False)};\n"
                f"Q.REPO = {json.dumps(REPO)};\n")
    codigo = '\n</script>\n<script>\n'.join(f'/* ---- {f} ---- */\n' + leer(SRC, f) for f in CODIGO)
    for nombre, txt in (('código', '\n'.join(leer(SRC, f) for f in CODIGO)), ('globales', globales)):
        if '</script' in txt.lower():
            raise SystemExit(f'El {nombre} contiene «</script»: rompería la página.')

    html = leer(SRC, 'plantilla.html')
    html = (html.replace('/*FUENTES*/', leer(APP, 'vendor', 'fuentes', 'fuentes.css'))
                .replace('/*ESTILO*/', leer(SRC, 'estilo.css'))
                .replace('/*LIBRO*/', libro.replace('</', '<\\/'))
                .replace('/*GLOBALES*/', globales)
                .replace('/*CODIGO*/', codigo))
    with open(os.path.join(DIST, 'index.html'), 'w', encoding='utf-8') as fh:
        fh.write(html)
    open(os.path.join(DIST, '.nojekyll'), 'w').close()
    peso = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(DIST) for f in fs)
    print(f'App construida en {DIST}: {len(claves)} imágenes, {peso / 1e6:.1f} MB en total.')


if __name__ == '__main__':
    main()
