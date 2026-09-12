// The one content object every candidate renders. English only (the mockups
// are for choosing a design; the winner gets the TR overlay in Astro).
// Facts mirror src/data/site.ts, src/content/work/*.md and src/content/notes/*.md.

export const profile = {
  name: 'Muhammed Kado',
  first: 'Muhammed',
  title: 'Computer Engineer',
  role: 'Full-Stack Developer',
  location: 'İstanbul, Turkey',
  tz: 'UTC+3',
  email: 'eng.muhammedkado@gmail.com',
  phone: '+90 538 739 9262',
  whatsapp: 'https://wa.me/905387399262',
  github: 'https://github.com/muhammedkado',
  linkedin: 'https://linkedin.com/in/muhammed-kado-21355b1a9',
  cv: '/cv.pdf',
  siteUrl: 'https://mkado.dev',
  // The claim, in a few registers so designs can pick the one their type wants.
  headline: 'I build the web side of RFID systems that run in 30+ countries.',
  headlineShort: 'The web side of RFID systems, in 30+ countries.',
  headlineSplit: ['I build the web side of', 'RFID systems that run in', '30+ countries.'],
  plain: 'Full-stack developer. PHP and Laravel by day at USTEK RFID, React and Next.js on my own time.',
  intro:
    'Computer engineer in İstanbul, working full-stack. Since 2023 I build REST APIs and web interfaces in PHP, Laravel and Zend Framework at USTEK RFID, shipping a laundry-management platform used by commercial laundries, hotels and hospitals. On my own time I build with React and Next.js. The seven applications below are deployed and yours to try.',
  availability: 'Open to full-time roles, remote or in İstanbul, and to freelance work.',
};

export const experience = {
  company: 'USTEK RFID',
  url: 'https://ustek-rfid.com',
  role: 'Full Stack Developer',
  period: 'May 2023 – present',
  startDate: '2023-05-15',
  location: 'İstanbul',
  summary:
    'USTEK builds RFID-based laundry management for commercial laundries, hotels and healthcare, deployed in more than 30 countries. I work on the web platform that sits on top of the readers and terminals.',
  bullets: [
    'Built and extended REST APIs and web interfaces in PHP, Laravel and Zend Framework 1 for real-time RFID inventory tracking, automated billing and logistics.',
    'Implemented linen and garment lifecycle features: warehouse monitoring, uniform rental management and scrub dispensing.',
    'Worked with the hardware team to keep data flowing reliably between UHF RFID terminals, readers and the platform.',
    'Refactored error-prone modules, cutting production incidents for clients around the world.',
  ],
};

export const education = {
  degree: 'B.Sc. Computer Engineering',
  school: 'Burdur Mehmet Akif Ersoy University',
  period: '2019 – 2024',
  project: 'Graduation project: Kado Job App, a job-board and staffing Android app with an admin panel (Flutter, Bloc, Firebase).',
};

export const languages = [
  { name: 'Kurdish', level: 'native' },
  { name: 'Arabic', level: 'native' },
  { name: 'Turkish', level: 'native' },
  { name: 'English', level: 'professional working' },
];

// The seven live applications. `problem` is the one-line version of the case
// study's problem statement; `tagline` is the case-study tagline.
export const demos = [
  {
    slug: 'pos',
    name: 'POS Admin Dashboard',
    short: 'POS back office',
    kind: 'Back office',
    period: '2024',
    summary: 'Back office for a point-of-sale system: products, categories, clients and users with role-based permissions, in English and Arabic (RTL).',
    problem: 'One place where staff manage the shelves and the customers, where a cashier cannot delete the catalogue, and the owner sees stock value at a glance.',
    url: 'https://pos.mkado.dev',
    demoUrl: 'https://pos.mkado.dev/demo/admin',
    repo: 'https://github.com/muhammedkado/POS-Project-Admin-LTE-Dashboard-',
    stack: ['Laravel 12', 'MySQL', 'Laratrust', 'AdminLTE'],
    credentials: [
      { label: 'Admin', user: 'admin@app.com', pass: 'password' },
      { label: 'Super admin', user: 'superadmin@app.com', pass: 'password' },
    ],
    note: 'Registration is closed; use an account above. Data resets nightly.',
    langs: 'EN · AR (RTL)',
  },
  {
    slug: 'besttrend',
    name: 'BestTrend SY',
    short: 'Real-estate platform',
    kind: 'Platform',
    period: '2025',
    summary: 'Real-estate platform for Syria: listings with photos and maps, search and saved searches, favourites, owner analytics, and an admin panel for moderation. Arabic, English and Kurdish.',
    problem: 'Owners list on Facebook groups and buyers scroll for hours. Structured listings, photos on a CDN, three languages, one admin panel.',
    url: 'https://besttrend.mkado.dev',
    demoUrl: null,
    repo: null,
    stack: ['Laravel 12 API', 'Sanctum', 'PostgreSQL', 'React 19', 'TypeScript', 'Tailwind'],
    credentials: [
      { label: 'Property owner', user: 'demo@besttrend.mkado.dev', pass: 'demo1234' },
      { label: 'Admin panel', user: 'admin@besttrend.mkado.dev', pass: 'demo1234' },
    ],
    note: 'Private repository, code available on request. Sign in as the property owner to add a listing.',
    langs: 'AR · EN · KU',
  },
  {
    slug: 'besttrend-api',
    name: 'BestTrend Admin & API',
    short: 'Admin panel + REST API',
    kind: 'API + back office',
    period: '2025',
    summary: 'The other half of BestTrend: an AdminLTE back office for moderating listings, users and reports, on top of the Laravel REST API the app itself runs on.',
    problem: 'One Laravel core serving two clients with opposite needs: a token-based JSON API for the app and a session-based staff back office with granular permissions.',
    url: 'https://besttrend-api.mkado.dev/admin/login',
    demoUrl: 'https://besttrend-api.mkado.dev/admin/demo',
    repo: null,
    stack: ['Laravel 12', 'Sanctum', 'PostgreSQL', 'AdminLTE', 'REST API'],
    credentials: [{ label: 'Admin panel', user: 'admin@besttrend.mkado.dev', pass: 'demo1234' }],
    note: 'The public API is open too: try /api/v1/properties.',
    langs: 'AR · EN',
  },
  {
    slug: 'invoice',
    name: 'Invoice System',
    short: 'Invoicing',
    kind: 'Business app',
    period: '2025',
    summary: 'Create invoices with line items and live totals, track outstanding, paid and late payments, print to PDF and email the customer.',
    problem: 'Invoices that look right and a list that shows who still owes money, written without a framework to show sessions, CSRF and prepared statements done by hand.',
    url: 'https://invoice.mkado.dev',
    demoUrl: 'https://invoice.mkado.dev/demo.php',
    repo: 'https://github.com/muhammedkado/invoice-system-php',
    stack: ['PHP 8', 'MySQL', 'PDO', 'TCPDF', 'PHPMailer'],
    credentials: [{ label: 'Demo', user: 'demo@invoice.mkado.dev', pass: 'demo1234' }],
    note: 'Plain PHP, no framework: prepared statements, CSRF tokens, per-user data.',
    langs: 'EN',
  },
  {
    slug: 'findjob',
    name: 'Find Job with AI',
    short: 'AI job matcher',
    kind: 'AI tool',
    period: '2025',
    summary: 'Upload a CV, get it parsed into an editable profile by Gemini, then see it scored against real job postings.',
    problem: 'Matching a CV to postings by hand is slow and vague. Turn the PDF into structured data, let the user correct it, score each posting with a reason, and keep the demo cost on a leash.',
    url: 'https://findjob.mkado.dev',
    demoUrl: null,
    repo: 'https://github.com/muhammedkado/find_job_with_ai',
    stack: ['Laravel 12', 'Gemini API', 'Alpine.js', 'Tailwind'],
    credentials: [],
    note: 'No sign-in. Try the sample CV, or upload your own PDF.',
    langs: 'EN',
  },
  {
    slug: 'tireshop',
    name: 'Tire Shop PWA',
    short: 'Tire-shop PWA',
    kind: 'PWA',
    period: '2025',
    summary: 'Mobile-first PWA for running a car-tire shop: inventory, sales and invoices, expenses, and profit reports. Arabic, RTL.',
    problem: 'A small tire shop runs on a phone. Today’s sales and profit at a glance, low-stock warnings, expenses, and no login screen on day one.',
    url: 'https://tireshop.mkado.dev',
    demoUrl: null,
    repo: 'https://github.com/muhammedkado/tire-shop',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4'],
    credentials: [],
    note: 'No sign-in. Runs in local demo mode; data stays in your browser.',
    langs: 'AR (RTL)',
  },
  {
    slug: 'timezone',
    name: 'TimeZone.tools',
    short: 'Time-zone toolkit',
    kind: 'Utility',
    period: '2025',
    summary: 'Time-zone converter, meeting planner and working-days calculator in seven languages, with right-to-left Arabic. The kind of small tool people keep in a tab all day.',
    problem: 'Remote teams keep asking the same three questions: what time is it there, when can we all meet, and how many working days until a date.',
    url: 'https://timezone.mkado.dev',
    demoUrl: null,
    repo: 'https://github.com/muhammedkado/timetool',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4', 'i18next'],
    credentials: [],
    note: 'No sign-in. Everything runs in your browser.',
    langs: '7 languages · RTL',
  },
];

export const projects = [
  {
    name: 'Kado Job App',
    summary: 'Job-board and project-staffing Android app with an admin panel. Graduation project.',
    stack: ['Flutter', 'Bloc', 'Firebase'],
    url: null,
    repo: 'https://github.com/muhammedkado/kado_jop_app',
  },
  {
    name: 'Olive & Co',
    summary: 'Landing page for an olive-oil brand.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://oil-store-project.vercel.app',
    repo: 'https://github.com/muhammedkado/Oil-Store-Project',
  },
];

// How the seven apps are run. Facts from /about-this-site and the deployment note.
export const proof = {
  title: 'Seven applications on one free virtual machine',
  lead:
    'Everything on this site runs on one Always-Free Oracle Cloud VM behind Cloudflare, deploys with a single command over SSH, and resets itself every night.',
  facts: [
    { k: 'Hosting', v: 'One Always-Free Oracle Cloud VM, nginx and php-fpm, behind Cloudflare' },
    { k: 'Deploy', v: 'One command over SSH. The server never talks to GitHub: no token, no deploy key' },
    { k: 'Reset', v: 'Demo data is re-seeded nightly, so every visitor gets a clean account' },
    { k: 'Health', v: 'Every five minutes a probe checks each app and writes a small JSON file; the status dots read it' },
    { k: 'Mail', v: 'Contact form stores first, then notifies; Turnstile keeps the bots out' },
  ],
  link: '/about-this-site',
  linkLabel: 'How this site is run',
};

export const skills = [
  { group: 'Back end', items: ['PHP', 'Laravel', 'Zend Framework 1', 'REST API design', 'OOP', 'Sanctum'] },
  { group: 'Front end', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML / CSS / SASS', 'Tailwind', 'Bootstrap', 'jQuery'] },
  { group: 'Data', items: ['MySQL', 'PostgreSQL', 'SQLite', 'Firebase'] },
  { group: 'Cloud & tools', items: ['Linux / nginx', 'Git', 'Azure', 'AWS', 'Vercel', 'n8n'] },
  { group: 'Domain', items: ['RFID systems', 'Hardware integration', 'Multilingual & RTL interfaces'] },
  { group: 'Mobile', items: ['Flutter', 'Bloc'] },
];

// Which projects ship a skill: the number next to a skill on the page is
// evidence, not a claim. USTEK counts as a project for the work stack.
const work = [
  ...demos.map((d) => ({ name: d.name, stack: d.stack })),
  ...projects.map((p) => ({ name: p.name, stack: p.stack })),
  { name: 'USTEK RFID platform', stack: ['PHP', 'Laravel', 'Zend Framework 1', 'REST API', 'MySQL', 'jQuery', 'Bootstrap', 'RFID systems', 'Hardware integration', 'Multilingual & RTL interfaces', 'Linux / nginx'] },
  { name: 'mkado.dev', stack: ['TypeScript', 'Linux / nginx', 'Git'] },
];
const aliases = {
  'REST API design': ['REST API'],
  'HTML / CSS / SASS': ['Tailwind', 'AdminLTE', 'Bootstrap'],
  JavaScript: ['Alpine.js', 'React', 'jQuery', 'TypeScript'],
  Git: ['Git'],
  'Multilingual & RTL interfaces': ['i18next', 'Multilingual & RTL interfaces'],
};
export function evidence(skill) {
  const keys = [skill, ...(aliases[skill] ?? [])].map((s) => s.toLowerCase());
  const hit = (item) => keys.some((k) => item.toLowerCase().startsWith(k));
  const rtl = new Set(['pos', 'besttrend', 'besttrend-api', 'tireshop', 'timezone']);
  return work
    .filter((w) => w.stack.some(hit) || (skill === 'Multilingual & RTL interfaces' && demos.some((d) => d.name === w.name && rtl.has(d.slug))))
    .map((w) => w.name);
}
export const skillsWithEvidence = skills.map((g) => ({
  group: g.group,
  items: g.items.map((name) => ({ name, projects: evidence(name) })),
}));

export const notes = [
  {
    slug: 'billing-automation-correctness',
    title: 'Billing automation that must be correct with no one watching',
    description: 'Lessons from building unattended, recurring invoicing on a production platform: idempotent runs, double-fire guards, date boundaries, and tests that pin the money.',
    date: '2026-09-05',
    tags: ['laravel', 'billing', 'testing', 'reliability'],
  },
  {
    slug: 'rtl-adminlte',
    title: 'RTL with AdminLTE 3: what actually breaks',
    description: 'Translating the strings is the easy half. Three layout bugs I hit making an AdminLTE admin panel work in Arabic, and the fix for each.',
    date: '2026-09-05',
    tags: ['laravel', 'adminlte', 'rtl', 'css'],
  },
  {
    slug: 'six-demos-free-vm',
    title: 'Live demos on Oracle’s free tier, deployed over SSH',
    description: 'How this portfolio’s applications run on one Always-Free VM behind Cloudflare, deploy with one command without giving the server any GitHub access, and reset themselves every night.',
    date: '2026-09-05',
    tags: ['devops', 'nginx', 'cloudflare', 'deployment'],
  },
];

export const timeline = [
  { from: '2023', to: 'present', kind: 'work', title: experience.role, org: experience.company, where: experience.location, summary: experience.summary, bullets: experience.bullets, live: true },
  { from: '2024', to: 'present', kind: 'projects', title: 'Seven live applications', org: 'Independent work', where: 'live on mkado.dev', summary: 'A POS back office, an invoicing system, a real-estate platform with its admin panel, an AI job matcher, a tire-shop PWA and a time-zone toolkit, each built end to end and published as a live demo anyone can open.', bullets: [] },
  { from: '2019', to: '2024', kind: 'education', title: education.degree, org: education.school, where: 'Burdur', summary: education.project, bullets: [] },
];

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#how', label: 'How it runs' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#notes', label: 'Notes' },
  { href: '#contact', label: 'Contact' },
];

export const content = { profile, experience, education, languages, demos, projects, proof, skills: skillsWithEvidence, notes, timeline, nav };
export default content;
