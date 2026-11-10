#!/usr/bin/env python3
"""Construye la app estática de Cuarentena en app/dist.

Por ahora publica la portada provisional (app/src/index.html) con sus fuentes.
Cuando exista el libro, este script convertirá libro/*.md en datos para la app.
"""
import os, shutil

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAIZ = os.path.dirname(APP)
DIST = os.path.join(APP, 'dist')
REPO = 'https://github.com/benabhi/cuarentena'

shutil.rmtree(DIST, ignore_errors=True)
os.makedirs(os.path.join(DIST, 'fuentes'))
shutil.copy(os.path.join(APP, 'src', 'index.html'), DIST)
for f in ('Oswald[wght].ttf', 'SpecialElite-Regular.ttf', 'PermanentMarker-Regular.ttf'):
    shutil.copy(os.path.join(RAIZ, 'fuentes', f), os.path.join(DIST, 'fuentes', f))
shutil.copy(os.path.join(RAIZ, 'arte', 'marca', 'utopia-logo-claro.png'), DIST)
open(os.path.join(DIST, '.nojekyll'), 'w').close()
print('App construida en', DIST)
