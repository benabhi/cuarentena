#!/usr/bin/env python3
"""Verifica el libro de Cuarentena: enlaces rotos, entradas duplicadas, huérfanas y Marcas.

Uso: python3 verificar.py [carpeta_libro] [--montar salida.md]
"""
import re, sys, os, glob
from collections import defaultdict

base = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else os.path.join(os.path.dirname(__file__), '..', 'libro')
files = sorted(glob.glob(os.path.join(base, '*.md')))

anchors = {}           # id -> file
dups = []
links = defaultdict(set)  # target -> set(source ids)
marks_given = defaultdict(set)
marks_used = defaultdict(set)
cur = None
text_all = ''
# En Cuarentena se usa el voseo: «anotá», «ganás», «empezás con».
GIVE_RX = r'(?i)(anot[aá]|gan[aá]s?|empez[aá]s con|escrib[ií]|la Marca|son `)'
ASK_RX = r'(?i)(ten[eé]s|tengas|sin `|con `|borr[aá])'
NO_SON_MARCAS = {'MARCA', 'MAYÚSCULAS_CON_GUIONES'}
# Marcas de registro: se anotan para la memoria de la partida (barrio, apodo, Motivo) y no hace falta consultarlas.
SOLO_REGISTRO = ('BARRIO_', 'APODO_', 'EL_QUE_FALTA', 'LO_QUE_HICISTE')
# Las tablas de creación (r102–r106) y las de los arcos nuevos dan una Marca por fila.
GIVEN_BY_TABLE = {'r102', 'r103', 'r104', 'r105', 'r106', 'e840', 'e850'}

for f in files:
    s = open(f, encoding='utf-8').read()
    text_all += s + '\n\n'
    if f.endswith('96-indice-marcas.md'):
        continue          # el índice enlaza todo: no cuenta para huérfanas
    for line in s.splitlines():
        m = re.search(r'<a id="([re]\d{3})"></a>', line)
        if m:
            cur = m.group(1)
            if cur in anchors:
                dups.append(cur)
            anchors[cur] = os.path.basename(f)
            continue
        for t in re.findall(r'\]\(#([re]\d{3})\)', line):
            links[t].add(cur or os.path.basename(f))
        # bare references like "→ e214", "(r140)", "· e214`" also count as links
        for t in re.findall(r'(?<![\w#\[])([re]\d{3})(?![\w\]])', line):
            links[t].add(cur or os.path.basename(f))
        for m in re.finditer(r'`([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9_]{2,})`', line):
            mk = m.group(1)
            if mk in NO_SON_MARCAS:
                continue
            # Se mira solo la oración en la que aparece la Marca, hasta la Marca.
            pre = re.split(r'\. |\|', line[:m.start()])[-1]
            give = [g.end() for g in re.finditer(GIVE_RX, pre)]
            ask = [a.end() for a in re.finditer(ASK_RX, pre)]
            if cur in GIVEN_BY_TABLE or (give and (not ask or give[-1] > ask[-1])):
                marks_given[mk].add(cur)
            else:
                marks_used[mk].add(cur)

broken = sorted(t for t in links if t not in anchors)
orphans = sorted(a for a in anchors if a not in links and a not in ('r001',) and not a.startswith('e00') )

print(f'Archivos: {len(files)}')
print(f'Entradas: {len(anchors)}  (reglas: {sum(1 for a in anchors if a[0]=="r")}, eventos: {sum(1 for a in anchors if a[0]=="e")})')
print(f'Palabras: {len(text_all.split())}')
print(f'Enlaces rotos ({len(broken)}):')
for b in broken:
    print('  ', b, '<-', ', '.join(sorted(x for x in links[b] if x)))
print(f'Duplicados ({len(dups)}):', dups)
print(f'Huérfanas ({len(orphans)}):', orphans)
never_used = sorted(m for m in marks_given if m not in marks_used and not m.endswith('_') and not m.startswith(SOLO_REGISTRO))
prefijos = [p for p in marks_given if p.endswith('_')] + [p for p in marks_used if p.endswith('_')]
never_given = sorted(m for m in marks_used if m not in marks_given and not m.endswith('_') and not any(m.startswith(p) for p in prefijos))
print(f'Marcas que se ganan y nunca se consultan ({len(never_used)}):', ', '.join(never_used))
print(f'Marcas consultadas que nunca se ganan explícitamente ({len(never_given)}):', ', '.join(never_given))
print(f'Marcas distintas: {len(set(marks_given) | set(marks_used))}')

if '--montar' in sys.argv:
    out = sys.argv[sys.argv.index('--montar') + 1]
    with open(out, 'w', encoding='utf-8') as o:
        o.write(text_all)
    print('Libro montado en', out)

sys.exit(1 if broken or dups else 0)
