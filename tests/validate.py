"""WinTools static validation: references, icons, DOM-id wiring, JS balance, data integrity."""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
problems = []
notes = []

def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as f:
        return f.read()

# ---------- 1. HTML reference audit ----------
html_files = [os.path.basename(p) for p in glob.glob(os.path.join(ROOT, '*.html'))]
ref_re = re.compile(r'(?:src|href)\s*=\s*"([^"]+)"')
icon_use = set()
for h in html_files:
    txt = read(h)
    for ref in ref_re.findall(txt):
        if ref.startswith(('http://','https://','mailto:','#','data:','//')):
            continue
        clean = ref.split('#')[0].split('?')[0]
        if not clean:
            continue
        full = os.path.join(ROOT, clean.replace('/', os.sep))
        if not os.path.exists(full):
            problems.append(f'{h}: missing local ref -> {ref}')
    for m in re.findall(r'data-icon="([^"]+)"', txt):
        icon_use.add(m)

# ---------- 2. icon names must exist in chrome.js ICONS ----------
chrome = read('assets/js/chrome.js')
icon_defs = set(re.findall(r'^\s{4}([a-z0-9]+)\s*:\s*\'<', chrome, re.M))
for u in sorted(icon_use):
    if u not in icon_defs:
        problems.append(f'chrome.js: icon "{u}" used in HTML but not defined')

# ---------- 3. DOM-id wiring between HTML and page scripts ----------
# os.js uses prefix list + suffixes
prefixes = {'linux':'linux','win':'win','mac':'mac','cisco':'cisco','srv':'srv'}
suffixes = ['List','Count','Search','Chips','Expand','Collapse']
page_for_prefix = {'linux':'linux.html','win':'windows.html','mac':'macos.html','cisco':'cisco.html','srv':'servers.html'}
all_html = {h: read(h) for h in html_files}
for pfx, page in page_for_prefix.items():
    body = all_html[page]
    for sfx in suffixes:
        el = pfx + sfx
        if f'id="{el}"' not in body:
            problems.append(f'{page}: missing element id="{el}" used by os.js')
# home.js uses .stat .num[data-count]; index + about load home.js
for page in ('index.html','about.html'):
    if 'data-count' not in all_html[page] and page=='index.html':
        problems.append('index.html: home.js expects data-count stats but none found')

# ---------- 4. JS bracket-balance (string/comment/regex aware) ----------
def js_balance(path):
    s = read(path)
    stack = []
    i = 0; n = len(s); line = 1
    mode = None  # None, "'", '"', '`', '//', '/*', 'regex'
    prev_sig = ''  # last significant char outside strings/comments (for regex detection)
    while i < n:
        c = s[i]
        if c == '\n': line += 1
        if mode in ("'", '"', '`'):
            if c == '\\': i += 2; continue
            if c == mode: mode = None; prev_sig = ')'
            elif c == '\n' and mode != '`':
                return f'{path}:{line} unterminated string'
        elif mode == 'regex':
            if c == '\\': i += 2; continue
            if c == '[':  # consume character class so a '/' inside it is ignored
                i += 1
                while i < n and s[i] != ']':
                    if s[i] == '\\': i += 1
                    i += 1
            elif c == '/':
                mode = None; prev_sig = ')'  # end of regex literal
                # skip regex flags
                while i+1 < n and s[i+1].isalpha(): i += 1
            elif c == '\n':
                return f'{path}:{line} unterminated regex literal'
        elif mode == '//':
            if c == '\n': mode = None
        elif mode == '/*':
            if c == '*' and i+1 < n and s[i+1] == '/': mode = None; i += 1
        else:
            if c == '/' and i+1 < n:
                nx = s[i+1]
                if nx == '/': mode = '//'; i += 1
                elif nx == '*': mode = '/*'; i += 1
                elif nx == '=':  # /= compound assignment, not a regex
                    prev_sig = '='; i += 1
                elif prev_sig == '' or prev_sig in '(,=:[!&|?{};+-*%~^<>\n':
                    mode = 'regex'  # a regex literal may start here
                else:
                    prev_sig = '/'  # division operator
            elif c in ('"',"'"):
                mode = c
            elif c == '`':
                mode = '`'
            elif c in '([{':
                stack.append((c, line)); prev_sig = c
            elif c in ')]}':
                if not stack: return f'{path}:{line} unmatched closing {c}'
                op, oline = stack.pop()
                if '([{'.index(op) != ')]}'.index(c):
                    return f'{path}:{line} mismatched {c} (opened {op} at line {oline})'
                prev_sig = c
            elif not c.isspace():
                prev_sig = c
        i += 1
    if mode in ("'", '"', '`', 'regex'): return f'{path}: unterminated {mode} at EOF'
    if mode == '/*': return f'{path}: unterminated block comment'
    if stack:
        op, oline = stack[-1]; return f'{path}: unclosed {op} opened at line {oline}'
    return None

for jsp in ['assets/js/utils.js','assets/js/chrome.js','assets/js/browser.js',
            'assets/js/data/linux.js','assets/js/data/windows.js','assets/js/data/macos.js',
            'assets/js/data/cisco.js','assets/js/data/servers.js',
            'assets/js/pages/home.js','assets/js/pages/os.js']:
    err = js_balance(jsp)
    if err: problems.append('JS balance: ' + err)

# ---------- 5. data integrity ----------
def data_stats(path, cats_allowed, label):
    s = read(path)
    entries = re.findall(r'cmd:\s*\'((?:[^\'\\]|\\.)*)\'', s)
    cats = re.findall(r"cat:\s*'([a-z]+)'", s)
    from collections import Counter
    cc = Counter(cats)
    bad = [c for c in cc if c not in cats_allowed]
    if bad: problems.append(f'{label}: unknown categories {bad}')
    # every entry should have a desc and a syntax (single- or double-quoted)
    n_desc = len(re.findall(r"desc:\s*['\"]", s))
    n_syntax = len(re.findall(r"syntax:\s*['\"]", s))
    n_ex = len(re.findall(r"examples:\s*\[", s))
    n_opts = len(re.findall(r"opts:\s*\[", s))
    if len(entries) != n_desc:
        problems.append(f'{label}: {len(entries)} entries but {n_desc} desc fields')
    if len(entries) != n_syntax:
        problems.append(f'{label}: {len(entries)} entries but {n_syntax} syntax fields')
    notes.append(f'{label}: {len(entries)} commands, {n_desc} desc, {n_syntax} syntax, {n_opts} opts blocks, {n_ex} examples blocks')
    notes.append(f'   categories: ' + ', '.join(f'{k}={v}' for k,v in sorted(cc.items())))
    return len(entries)

linux_cats = set(re.findall(r"key:\s*'([a-z]+)'", read('assets/js/data/linux.js')))
# derive allowed cats from the Cats arrays actually
def cats_of(path, var):
    s = read(path)
    m = re.search(re.escape(var) + r'\s*=\s*\[(.*?)\];', s, re.S)
    return set(re.findall(r"key:\s*'([a-z]+)'", m.group(1))) if m else set()

lcats = cats_of('assets/js/data/linux.js','linuxCats')
wcats = cats_of('assets/js/data/windows.js','winCats')
mcats = cats_of('assets/js/data/macos.js','macCats')
ccats = cats_of('assets/js/data/cisco.js','ciscoCats')
scats = cats_of('assets/js/data/servers.js','serverCats')
total = 0
total += data_stats('assets/js/data/linux.js', lcats, 'linux')
total += data_stats('assets/js/data/windows.js', wcats, 'windows')
total += data_stats('assets/js/data/macos.js', mcats, 'macos')
total += data_stats('assets/js/data/cisco.js', ccats, 'cisco')
total += data_stats('assets/js/data/servers.js', scats, 'servers')
notes.append(f'TOTAL commands across all platforms: {total}')

# count option rows + example lines to validate the "options & examples" stat
opt_rows = 0
ex_lines = 0
for jsp in ['assets/js/data/linux.js','assets/js/data/windows.js','assets/js/data/macos.js',
            'assets/js/data/cisco.js','assets/js/data/servers.js']:
    s = read(jsp)
    opt_rows += len(re.findall(r"^\s*\['[^']*',\s*'", s, re.M))  # ['flag','desc'] pairs
    ex_lines += len(re.findall(r"^\s*'", s, re.M))               # rough: quoted list lines
notes.append(f'approx option/description pairs: {opt_rows}, approx example/quoted lines: {ex_lines}')

# ---------- 6. stray non-English (CJK / Arabic) in content ----------
cjk = re.compile(r'[\u4e00-\u9fff\u0600-\u06ff\u3040-\u30ff]')
for jsp in ['assets/js/data/linux.js','assets/js/data/windows.js','assets/js/data/macos.js',
            'assets/js/data/cisco.js','assets/js/data/servers.js']:
    for ln, line in enumerate(read(jsp).splitlines(), 1):
        mm = cjk.search(line)
        if mm:
            problems.append(f'{jsp}:{ln} non-English char {mm.group()!r}: {line.strip()[:70]}')

print('===== NOTES =====')
for n in notes: print(n)
print('\n===== PROBLEMS =====')
if problems:
    for p in problems: print('  !', p)
    print(f'\n{len(problems)} problem(s) found')
    sys.exit(1)
else:
    print('  none — all checks passed')
