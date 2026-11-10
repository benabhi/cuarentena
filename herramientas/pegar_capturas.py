#!/usr/bin/env python3
"""Une capturas de pantalla de una imagen de Gemini mostrada a tamaño natural en el navegador.

Uso: pegar_capturas.py salida.jpg ANCHO ALTO captura.png:IZQ:ARRIBA [captura2.png:IZQ:ARRIBA ...] [--recortar]

IZQ y ARRIBA son la posición (px, 0 o negativa) de la imagen en la pantalla al hacer esa captura.
--recortar quita el borde de papel liso que Gemini deja a veces alrededor del dibujo.
"""
import sys
from PIL import Image, ImageStat

args = [a for a in sys.argv[1:] if not a.startswith('--')]
out, W, H = args[0], int(args[1]), int(args[2])
lienzo = Image.new('RGB', (W, H), 'black')
for arg in args[3:]:
    f, izq, top = arg.rsplit(':', 2)
    izq, top = int(izq), int(top)
    cap = Image.open(f).convert('RGB')
    dx, dy = -izq, -top                       # la captura empieza en este píxel de la imagen
    cap = cap.crop((0, 0, min(cap.width, W - dx), min(cap.height, H - dy)))
    lienzo.paste(cap, (dx, dy))                # la última captura manda en el solape
if '--recortar' in sys.argv:
    def lisa(caja):
        s = ImageStat.Stat(lienzo.crop(caja).convert('L'))
        return s.stddev[0] < 9 and s.mean[0] > 200
    l, t, r, b = 0, 0, W, H
    while l < W // 8 and lisa((l, 0, l + 1, H)): l += 1
    while r > W - W // 8 and lisa((r - 1, 0, r, H)): r -= 1
    while t < H // 8 and lisa((0, t, W, t + 1)): t += 1
    while b > H - H // 8 and lisa((0, b - 1, W, b)): b -= 1
    m = 3 if (l, t, r, b) != (0, 0, W, H) else 0      # un margen de seguridad para no dejar filo
    lienzo = lienzo.crop((l + m if l else 0, t + m if t else 0, r - m if r < W else W, b - m if b < H else H))
lienzo.save(out, quality=94)
print(out, lienzo.size)
