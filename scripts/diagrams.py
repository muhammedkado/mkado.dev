"""Architecture diagrams for the case-study pages, generated as inline-ready SVG.

    python scripts/diagrams.py          -> src/assets/diagrams/<slug>.svg

Why a generator: seven diagrams that must share one visual language. The rules
come from the diagram-design skill (editorial, not "AI slop"): every node is a
distinct idea, at most 9 nodes, one focal node in the accent colour, orthogonal
connectors with r=8 elbows, labels on an opaque mask with a visible gap above
the line, no connector behind a box that is not its endpoint, arrows drawn
before boxes, a 4px grid, and an accessible <title>/<desc>.
Colours and fonts are NOT baked in: the SVGs use the `dg-*` classes styled in
src/styles/global.css with the site's CSS variables, so they follow light/dark.
"""
from __future__ import annotations
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "diagrams"
NODE_W, NODE_H = 144, 56
R = 8  # elbow radius

# ----------------------------------------------------------------- primitives
def node(id, x, y, name, sub="", tag="", kind="app", w=NODE_W, h=NODE_H):
    return dict(id=id, x=x, y=y, w=w, h=h, name=name, sub=sub, tag=tag, kind=kind)

def edge(src, dst, label="", kind="", src_side=None, dst_side=None, label_at=None):
    """label_at: "start" | "end" picks which horizontal run of a two-bend elbow carries the label."""
    return dict(src=src, dst=dst, label=label, kind=kind, src_side=src_side, dst_side=dst_side, label_at=label_at)

def side_of(a, b):
    """Which side of a faces b (horizontal wins when the boxes are clearly apart)."""
    ax, ay = a["x"] + a["w"] / 2, a["y"] + a["h"] / 2
    bx, by = b["x"] + b["w"] / 2, b["y"] + b["h"] / 2
    if abs(bx - ax) >= abs(by - ay):
        return "right" if bx > ax else "left"
    return "bottom" if by > ay else "top"

def attach(n, side, k, count):
    """k-th of `count` attach points on a side, fanned per the skill's rule."""
    if side in ("left", "right"):
        x = n["x"] if side == "left" else n["x"] + n["w"]
        y = n["y"] + n["h"] * (k + 1) / (count + 1)
    else:
        y = n["y"] if side == "top" else n["y"] + n["h"]
        x = n["x"] + n["w"] * (k + 1) / (count + 1)
    return round(x), round(y)

def elbow(x1, y1, s1, x2, y2, s2, label_at=None):
    """Orthogonal path with r=8 elbows; straight when (nearly) aligned. Returns (d, label_point, horizontal_label)."""
    H = ("left", "right")
    if s1 in H and s2 in H:
        if abs(y1 - y2) < 16:  # attach points may differ by a few px after fanning: keep one straight line
            return f"M{x1},{y1} H{x2}", ((x1 + x2) / 2, y1), True
        mid = round((x1 + x2) / 2)
        dx, dy = (1 if x2 > x1 else -1), (1 if y2 > y1 else -1)
        d = (f"M{x1},{y1} H{mid - R*dx} Q{mid},{y1} {mid},{y1 + R*dy} "
             f"V{y2 - R*dy} Q{mid},{y2} {mid + R*dx},{y2} H{x2}")
        run1, run2 = abs(mid - x1), abs(x2 - mid)
        first = run1 >= run2 if label_at is None else label_at == "start"
        lp = ((x1 + mid) / 2, y1) if first else ((mid + x2) / 2, y2)
        return d, lp, True
    if s1 not in H and s2 not in H:
        if abs(x1 - x2) < 16:
            return f"M{x1},{y1} V{y2}", (x1, (y1 + y2) / 2), False
        mid = round((y1 + y2) / 2)
        dx, dy = (1 if x2 > x1 else -1), (1 if y2 > y1 else -1)
        d = (f"M{x1},{y1} V{mid - R*dy} Q{x1},{mid} {x1 + R*dx},{mid} "
             f"H{x2 - R*dx} Q{x2},{mid} {x2},{mid + R*dy} V{y2}")
        return d, ((x1 + x2) / 2, mid), True
    dx, dy = (1 if x2 > x1 else -1), (1 if y2 > y1 else -1)
    if s1 in H:   # horizontal first, one bend
        d = f"M{x1},{y1} H{x2 - R*dx} Q{x2},{y1} {x2},{y1 + R*dy} V{y2}"
        return d, ((x1 + x2) / 2, y1), True
    d = f"M{x1},{y1} V{y2 - R*dy} Q{x1},{y2} {x1 + R*dx},{y2} H{x2}"   # vertical first
    return d, ((x1 + x2) / 2, y2), True

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def render(slug, title, desc, w, h, nodes, edges, zones=()):
    by = {n["id"]: n for n in nodes}
    plan = []
    for e in edges:
        a, b = by[e["src"]], by[e["dst"]]
        s1 = e["src_side"] or side_of(a, b)
        s2 = e["dst_side"] or side_of(b, a)
        plan.append((e, a, s1, b, s2))
    slots: dict[tuple, list] = {}
    for i, (e, a, s1, b, s2) in enumerate(plan):
        slots.setdefault((a["id"], s1), []).append(i)
        slots.setdefault((b["id"], s2), []).append(i)

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" class="dg" role="img" aria-labelledby="{slug}-title {slug}-desc">',
           f'<title id="{slug}-title">{esc(title)}</title>', f'<desc id="{slug}-desc">{esc(desc)}</desc>',
           '<defs>',
           f'<marker id="{slug}-m" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="userSpaceOnUse"><polygon points="0 0,8 3,0 6" class="dg-marker"/></marker>',
           f'<marker id="{slug}-ml" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="userSpaceOnUse"><polygon points="0 0,8 3,0 6" class="dg-marker link"/></marker>',
           '</defs>']
    for z in zones:  # zones first (behind everything)
        out.append(f'<rect x="{z["x"]}" y="{z["y"]}" width="{z["w"]}" height="{z["h"]}" rx="8" class="dg-zone"/>')
        tw = round(len(z["label"]) * 6.2 + 12)
        out.append(f'<rect x="{z["x"] + 12}" y="{z["y"] - 6}" width="{tw}" height="12" class="dg-mask"/>')
        out.append(f'<text x="{z["x"] + 18}" y="{z["y"] + 4}" class="dg-zone-label">{esc(z["label"])}</text>')
    labels = []
    for i, (e, a, s1, b, s2) in enumerate(plan):  # arrows before boxes
        k1 = slots[(a["id"], s1)].index(i); c1 = len(slots[(a["id"], s1)])
        k2 = slots[(b["id"], s2)].index(i); c2 = len(slots[(b["id"], s2)])
        x1, y1 = attach(a, s1, k1, c1)
        x2, y2 = attach(b, s2, k2, c2)
        d, (lx, ly), horizontal = elbow(x1, y1, s1, x2, y2, s2, e.get("label_at"))
        cls = "dg-arrow" + (" link" if "link" in e["kind"] else "") + (" dashed" if "dashed" in e["kind"] else "")
        marker = f'{slug}-ml' if "link" in e["kind"] else f'{slug}-m'
        out.append(f'<path d="{d}" class="{cls}" marker-end="url(#{marker})"/>')
        if e["label"]:
            tw = round(len(e["label"]) * 5.4 + 8)
            if horizontal:  # mask sits 6px above the stroke
                labels.append((round(lx - tw / 2), round(ly - 20), tw, round(lx), round(ly - 11), e["label"], "middle"))
            else:           # beside a vertical run, 8px to the right
                labels.append((round(lx + 8), round(ly - 6), tw, round(lx + 12), round(ly + 3), e["label"], "start"))
    for (rx, ry, rw, tx, ty, text, anchor) in labels:
        out.append(f'<rect x="{rx}" y="{ry}" width="{rw}" height="12" rx="2" class="dg-mask"/>')
        out.append(f'<text x="{tx}" y="{ty}" class="dg-label" text-anchor="{anchor}">{esc(text)}</text>')
    for n in nodes:
        cx, cy = n["x"] + n["w"] / 2, n["y"] + n["h"] / 2
        out.append(f'<rect x="{n["x"]}" y="{n["y"]}" width="{n["w"]}" height="{n["h"]}" rx="6" class="dg-mask"/>')
        out.append(f'<rect x="{n["x"]}" y="{n["y"]}" width="{n["w"]}" height="{n["h"]}" rx="6" class="dg-node {n["kind"]}"/>')
        if n["tag"]:
            tw = len(n["tag"]) * 5 + 10
            out.append(f'<rect x="{n["x"] + 8}" y="{n["y"] + 6}" width="{tw}" height="12" rx="2" class="dg-tag"/>')
            out.append(f'<text x="{n["x"] + 8 + tw / 2:.0f}" y="{n["y"] + 15}" class="dg-tag-text" text-anchor="middle">{esc(n["tag"])}</text>')
        ny = cy + 4 if not n["sub"] else cy + (4 if n["tag"] else 0)
        out.append(f'<text x="{cx:.0f}" y="{ny:.0f}" class="dg-name" text-anchor="middle">{esc(n["name"])}</text>')
        if n["sub"]:
            out.append(f'<text x="{cx:.0f}" y="{ny + 14:.0f}" class="dg-sub" text-anchor="middle">{esc(n["sub"])}</text>')
    out.append("</svg>")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"{slug}.svg").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(f"  {slug}.svg  nodes={len(nodes)} edges={len(edges)}")

# --------------------------------------------------------------- the diagrams
def pos():
    N = [
        node("browser", 24, 92, "Browser", "AdminLTE, EN / AR (RTL)", "UI", "input"),
        node("nginx", 216, 92, "nginx", "TLS, PHP-FPM pool", "EDGE", "external"),
        node("app", 408, 92, "Laravel 10", "Laratrust roles, i18n", "APP", "focal"),
        node("db", 600, 92, "MySQL", "products, clients, users", "DB", "store"),
        node("cron", 600, 212, "Nightly reseed", "03:00 UTC, migrate:fresh", "CRON", "async"),
    ]
    E = [
        edge("browser", "nginx", "HTTPS", "link"), edge("nginx", "app", "FASTCGI"),
        edge("app", "db", "PDO"), edge("cron", "db", "RESET", "dashed"),
    ]
    render("pos", "POS admin dashboard: how it is built",
           "A browser talks over HTTPS to nginx, which hands requests to a Laravel 10 application with Laratrust roles and Arabic/English localisation; the app reads and writes MySQL, and a nightly cron job re-seeds the database.",
           768, 292, N, E)

def besttrend():
    Z = [dict(label="besttrend.mkado.dev", x=16, y=52, w=208, h=136), dict(label="besttrend-api.mkado.dev", x=272, y=52, w=480, h=256)]
    N = [
        node("spa", 40, 92, "React 19 SPA", "Vite, TypeScript, i18next", "WEB", "focal", w=160),
        node("api", 296, 92, "Laravel 10 REST API", "Sanctum tokens, /api/v1", "API", "app", w=176),
        node("db", 584, 92, "PostgreSQL", "listings, users, leads", "DB", "store"),
        node("cdn", 584, 212, "Bunny Storage", "listing photos (CDN)", "EXT", "external"),
    ]
    E = [
        edge("spa", "api", "JSON + TOKEN", "link"), edge("api", "db", "ELOQUENT"), edge("api", "cdn", "UPLOAD", label_at="end"),
    ]
    render("besttrend", "BestTrend: the app, its API and storage",
           "The React single-page app calls a Laravel REST API with Sanctum tokens; the API owns a PostgreSQL database and uploads listing photos to Bunny Storage, a CDN. The admin panel that shares the API has its own page.",
           768, 324, N, E, Z)

def besttrend_api():
    Z = [dict(label="besttrend-api.mkado.dev", x=16, y=52, w=544, h=256)]
    N = [
        node("admin", 40, 92, "AdminLTE admin panel", "Blade, RTL Arabic, moderation", "ADMIN", "focal", w=176),
        node("api", 40, 212, "Public REST API", "/api/v1, rate limits, Sanctum", "API", "app", w=176),
        node("core", 296, 152, "Laravel 10 core", "Spatie permissions, jobs", "CORE", "app", w=160),
        node("db", 600, 92, "PostgreSQL", "properties, users, leads", "DB", "store"),
        node("cdn", 600, 212, "Bunny Storage", "photos (CDN)", "EXT", "external"),
        node("spa", 600, 332, "React app", "besttrend.mkado.dev", "WEB", "input"),
    ]
    E = [
        edge("admin", "core", "SESSION"), edge("api", "core", "TOKEN", "link"),
        edge("core", "db", "SQL", label_at="end"), edge("core", "cdn", "UPLOAD", label_at="end"),
        edge("spa", "api", "JSON", "link", src_side="left", dst_side="bottom"),
    ]
    render("besttrend-api", "BestTrend admin panel and API: one core, two doors",
           "An AdminLTE admin panel with session login and a public, rate-limited REST API with Sanctum tokens sit on the same Laravel core, which owns PostgreSQL and uploads photos to Bunny Storage; the React app is a client of the API.",
           768, 404, N, E, Z)

def invoice():
    N = [
        node("browser", 24, 92, "Browser", "hand-written CSS + JS", "UI", "input"),
        node("php", 232, 92, "Plain PHP 8", "no framework, sessions + CSRF", "APP", "focal", w=176),
        node("db", 616, 92, "MySQL", "PDO prepared statements", "DB", "store", w=128),
        node("pdf", 232, 212, "TCPDF", "print / download", "LIB", "external", w=176),
        node("mail", 440, 212, "PHPMailer", "e-mail (off on the demo)", "LIB", "async", w=144),
    ]
    E = [
        edge("browser", "php", "HTTPS", "link"), edge("php", "db", "SQL"),
        edge("php", "pdf", "RENDER", src_side="bottom", dst_side="top"),
        edge("php", "mail", "SEND", "dashed", src_side="bottom", dst_side="top"),
    ]
    render("invoice", "Invoice system: plain PHP with two libraries",
           "The browser talks to a framework-free PHP 8 application that uses PDO prepared statements against MySQL, renders invoices to PDF with TCPDF and can e-mail them with PHPMailer, which is disabled on the public demo.",
           768, 292, N, E)

def findjob():
    N = [
        node("wizard", 24, 132, "Wizard page", "Blade + Alpine.js, 3 steps", "UI", "input"),
        node("app", 232, 132, "Laravel 10", "throttle 20/h, daily budget", "APP", "focal", w=160),
        node("parser", 456, 32, "PDF parser", "text only, file not stored", "LIB", "external", w=152),
        node("gemini", 456, 132, "Gemini API", "parse, enhance, score", "AI", "external", w=152),
        node("jsearch", 456, 232, "JSearch API", "live job postings", "EXT", "external", w=152),
        node("sample", 24, 252, "Sample data", "fallback when budget is spent", "FALLBACK", "async", w=160),
    ]
    E = [
        edge("wizard", "app", "UPLOAD", "link"),
        edge("app", "parser", "PDF", src_side="top", dst_side="left"),
        edge("app", "gemini", "PROMPT", "link"),
        # declared before jsearch so it takes the left attach point: no crossing with QUERY
        edge("app", "sample", "OVER BUDGET", "dashed", src_side="bottom", dst_side="top"),
        edge("app", "jsearch", "QUERY", "link", src_side="bottom", dst_side="left"),
    ]
    render("findjob", "Find Job with AI: the wizard behind the page",
           "A three-step Blade and Alpine.js wizard posts to a Laravel application that extracts text from the PDF, asks Gemini to parse, enhance and score the profile, pulls live postings from JSearch, and falls back to sample data once the shared daily budget is spent.",
           768, 332, N, E)

def tireshop():
    Z = [dict(label="local demo mode (portfolio build)", x=16, y=52, w=208, h=248), dict(label="cloud mode (optional)", x=432, y=52, w=320, h=248)]
    N = [
        node("pwa", 40, 92, "React 19 PWA", "Vite, Tailwind 4, Arabic RTL", "APP", "focal", w=160),
        node("local", 40, 212, "localStorage", "inventory, sales, expenses", "STORE", "store", w=160),
        node("supa", 456, 92, "Supabase", "auth + PostgreSQL", "EXT", "external"),
        node("edge", 456, 212, "Edge Function", "low-stock check", "FN", "async"),
        node("tg", 624, 212, "Telegram bot", "alerts the owner", "EXT", "external", w=112),
    ]
    E = [
        edge("pwa", "local", "SAVE", src_side="bottom", dst_side="top"), edge("pwa", "supa", "SYNC", "link dashed"),
        edge("supa", "edge", "TRIGGER", "dashed", src_side="bottom", dst_side="top"), edge("edge", "tg", "ALERT", "dashed"),
    ]
    render("tireshop", "Tire shop PWA: local first, cloud optional",
           "The installable React app keeps inventory, sales and expenses in the browser's localStorage in local demo mode; with Supabase configured it syncs to a hosted PostgreSQL database and an edge function sends low-stock alerts to a Telegram bot.",
           768, 316, N, E, Z)

def deployment():
    Z = [dict(label="workstation", x=16, y=52, w=176, h=232), dict(label="Cloudflare", x=248, y=52, w=176, h=136),
         dict(label="Oracle Cloud VM (Ubuntu 24.04, ARM)", x=480, y=52, w=272, h=384)]
    N = [
        node("cf", 272, 92, "Edge proxy", "DNS, TLS, cache, WAF", "EDGE", "external", w=128),
        node("dev", 40, 188, "deploy.sh", "git push over ssh, local builds", "TOOL", "input", w=128),
        node("nginx", 504, 92, "nginx", "one vhost per app, Origin CA", "WEB", "focal", w=224),
        node("fpm", 504, 188, "PHP-FPM pools", "pos · invoice · findjob · besttrend", "PHP", "app", w=224),
        node("db", 504, 284, "PostgreSQL · MySQL · SQLite", "one database per app", "DB", "store", w=224),
        node("cron", 504, 380, "cron", "reseed 03:00 · backup · status */5", "JOBS", "async", w=224, h=40),
    ]
    E = [
        edge("cf", "nginx", "HTTPS", "link"),
        edge("dev", "fpm", "SSH · GIT PUSH", "link"),
        edge("nginx", "fpm", "FASTCGI", src_side="bottom", dst_side="top"),
        edge("fpm", "db", "SQL", src_side="bottom", dst_side="top"),
        edge("cron", "db", "RESET", "dashed", src_side="top", dst_side="bottom"),
    ]
    render("deployment", "How this site and its six demos are deployed",
           "A workstation script pushes code over SSH and uploads local builds; visitors reach the Oracle Cloud VM through Cloudflare's edge, where nginx routes each host to a PHP-FPM pool or a static directory, every app has its own database, and cron jobs re-seed the demos nightly, back up and probe health every five minutes.",
           768, 452, N, E, Z)

if __name__ == "__main__":
    for fn in (pos, besttrend, besttrend_api, invoice, findjob, tireshop, deployment):
        fn()
