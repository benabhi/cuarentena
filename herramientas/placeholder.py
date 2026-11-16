"""Genera recuadros «IMAGEN PENDIENTE» para las viñetas que todavía no se hicieron en Gemini.
Uso: python3 herramientas/placeholder.py v-farmacia.jpg "La farmacia" [...]"""
import sys
from PIL import Image, ImageDraw, ImageFont
F = 'fuentes/anton-400-normal.ttf'
G = 'fuentes/pt-sans-narrow-700-normal.ttf'
args = sys.argv[1:]
for nombre, rotulo in zip(args[::2], args[1::2]):
    W, H = 1264, 848
    im = Image.new('RGB', (W, H), (244, 238, 223))
    d = ImageDraw.Draw(im)
    for x in range(-H, W, 70):
        d.polygon([(x, 0), (x + 35, 0), (x + 35 + H, H), (x + H, H)], fill=(242, 193, 46))
    d.rectangle([150, 250, W - 150, H - 250], fill=(22, 22, 22))
    f1, f2 = ImageFont.truetype(F, 92), ImageFont.truetype(G, 46)
    for txt, f, y in (('IMAGEN PENDIENTE', f1, 300), (rotulo.upper(), f2, 440)):
        w = d.textlength(txt, font=f)
        d.text(((W - w) / 2, y), txt, font=f, fill=(242, 193, 46) if f is f1 else (244, 238, 223))
    im.save(f'arte/{nombre}', quality=88)
    print('arte/' + nombre)
