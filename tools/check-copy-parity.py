import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
ts = (root / 'frontend/lib/content.ts').read_text(encoding='utf-8')
ts = re.sub(r'/\*.*?\*/', '', ts, flags=re.S)
ts = re.sub(r'^\s*//.*$', '', ts, flags=re.M)
lits = re.findall(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"", ts)
tss = set()
for a, b in lits:
    s = (a if a else b).replace("\\'", "'")
    if s.strip():
        tss.add(s)
dump = root / 'tools/php-strings.txt'
if not dump.exists():
    raise SystemExit('Run `php tools/dump-wp-copy.php` first.')
php = set(l for l in dump.read_text(encoding='utf-8').splitlines() if l.strip())

def is_display(s):
    if s.startswith('/') or s.startswith('#') or s.endswith('.svg'):
        return False
    if s in {'mint','rose','cream','sky','soft','sale','hot','new','save','popular','mens_health','wellness'}:
        return False
    if re.fullmatch(r'[a-z0-9-]+', s):
        return False
    return True

t = {s for s in tss if is_display(s)}
p = {s for s in php if is_display(s)}
print("display strings — frontend:", len(t), " wordpress:", len(p))
only_ts = sorted(t - p)
only_php = sorted(p - t)
# Module import specifiers are not copy.
only_ts = [x for x in only_ts if not x.startswith('./')]
only_php = [x for x in only_php if not x.startswith('./')]

print("\nONLY IN FRONTEND (%d):" % len(only_ts))
for s in only_ts: print("  -", s)
print("\nONLY IN WORDPRESS (%d):" % len(only_php))
for s in only_php: print("  -", s)

if only_ts or only_php:
    raise SystemExit("copy parity FAILED: frontend and WordPress differ")
print("\ncopy parity OK")
