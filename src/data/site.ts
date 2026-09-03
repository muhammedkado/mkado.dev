// Single source of truth for everything on the page.

export const demosLive = false; // flip to true once the VPS is up

export const profile = {
  name: 'Muhammed Kado',
  title: 'Computer Engineer',
  role: 'Full-Stack Developer',
  stackLine: 'PHP · Laravel · React',
  location: 'İstanbul, Turkey (UTC+3)',
  email: 'eng.muhammedkado@gmail.com',
  phone: '+90 538 739 9262',
  whatsapp: 'https://wa.me/905387399262',
  github: 'https://github.com/muhammedkado',
  linkedin: 'https://linkedin.com/in/muhammed-kado-21355b1a9',
  cv: '/cv.pdf',
  siteUrl: 'https://mkado.dev',
  headline: 'I build the web side of RFID systems that run in 30+ countries.',
  intro:
    'Computer engineer in İstanbul, working full-stack. Since 2023 I build REST APIs and web ' +
    'interfaces in PHP, Laravel and Zend Framework at USTEK RFID, shipping a laundry-management ' +
    'platform used by commercial laundries, hotels and hospitals. On my own time I build with React ' +
    'and Next.js. The five applications below are deployed and yours to try.',
};

export type Demo = {
  slug: string;
  name: string;
  summary: string;
  url: string;
  repo: string | null;
  stack: string[];
  credentials: { label: string; user: string; pass: string }[];
  note?: string;
  extra?: { label: string; url: string };
  period: string;
};

export const demos: Demo[] = [
  {
    slug: 'pos',
    name: 'POS Admin Dashboard',
    summary:
      'Back office for a point-of-sale system: products, categories, clients and users with role-based permissions, in English and Arabic (RTL).',
    url: 'https://pos.mkado.dev',
    repo: 'https://github.com/muhammedkado/POS-Project-Admin-LTE-Dashboard-',
    stack: ['Laravel 10', 'MySQL', 'Laratrust', 'AdminLTE'],
    credentials: [
      { label: 'Admin', user: 'admin@app.com', pass: 'password' },
      { label: 'Super admin', user: 'superadmin@app.com', pass: 'password' },
    ],
    note: 'Registration is closed; use an account above. Data resets nightly.',
    period: '2024',
  },
  {
    slug: 'besttrend',
    name: 'BestTrend SY',
    summary:
      'Real-estate platform for Syria: listings with photos and maps, search and saved searches, favourites, owner analytics, and an admin panel for moderation. Arabic, English and Kurdish.',
    url: 'https://besttrend.mkado.dev',
    repo: null,
    stack: ['Laravel 10 API', 'Sanctum', 'PostgreSQL', 'React 19', 'TypeScript', 'Tailwind'],
    credentials: [
      { label: 'Property owner', user: 'demo@besttrend.mkado.dev', pass: 'demo1234' },
      { label: 'Admin panel', user: 'admin@besttrend.mkado.dev', pass: 'demo1234' },
    ],
    extra: { label: 'Admin panel', url: 'https://besttrend-api.mkado.dev/admin/login' },
    note: 'Private repository — code available on request.',
    period: '2025',
  },
  {
    slug: 'invoice',
    name: 'Invoice System',
    summary:
      'Create invoices with line items and live totals, track outstanding, paid and late payments, print to PDF and email the customer.',
    url: 'https://invoice.mkado.dev',
    repo: 'https://github.com/muhammedkado/invoice-system-php',
    stack: ['PHP 8', 'MySQL', 'PDO', 'TCPDF', 'PHPMailer'],
    credentials: [{ label: 'Demo', user: 'demo@invoice.mkado.dev', pass: 'demo1234' }],
    note: 'Plain PHP, no framework: prepared statements, CSRF tokens, per-user data.',
    period: '2025',
  },
  {
    slug: 'findjob',
    name: 'Find Job with AI',
    summary:
      'Upload a CV, get it parsed into an editable profile by Gemini, then see it scored against real job postings.',
    url: 'https://findjob.mkado.dev',
    repo: 'https://github.com/muhammedkado/find_job_with_ai',
    stack: ['Laravel 10', 'Gemini API', 'Alpine.js', 'Tailwind'],
    credentials: [],
    note: 'No sign-in. Try the sample CV, or upload your own PDF.',
    period: '2025',
  },
  {
    slug: 'tireshop',
    name: 'Tire Shop PWA',
    summary:
      'Mobile-first PWA for running a car-tire shop: inventory, sales and invoices, expenses, and profit reports. Arabic, RTL.',
    url: 'https://tireshop.mkado.dev',
    repo: 'https://github.com/muhammedkado/tire-shop',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4'],
    credentials: [],
    note: 'No sign-in — runs in local demo mode, data stays in your browser.',
    period: '2025',
  },
];

export const projects = [
  {
    name: 'TimeZone.tools',
    summary: 'Time-zone converter, meeting planner and working-days calculator in seven languages with RTL support.',
    stack: ['React 19', 'Vite', 'Tailwind 4', 'i18next'],
    url: 'https://besttrend-sy.com',
    repo: 'https://github.com/muhammedkado/timetool',
    live: true,
  },
  {
    name: 'Kado Job App',
    summary: 'Job-board and project-staffing Android app with an admin panel — my graduation project.',
    stack: ['Flutter', 'Bloc', 'Firebase'],
    url: null,
    repo: 'https://github.com/muhammedkado/kado_jop_app',
    live: false,
  },
  {
    name: 'Olive & Co',
    summary: 'Landing page for an olive-oil brand.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://oil-store-project.vercel.app',
    repo: 'https://github.com/muhammedkado/Oil-Store-Project',
    live: true,
  },
];

export const experience = {
  company: 'USTEK RFID',
  url: 'https://ustek-rfid.com',
  role: 'Full Stack Developer',
  period: 'May 2023 – present',
  startDate: '2023-05-01', // used to compute a live tenure figure — see src/lib/tenure.ts
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

export const skills: { group: string; items: string[] }[] = [
  { group: 'Back end', items: ['PHP', 'Laravel', 'Zend Framework 1', 'REST API design', 'OOP', 'Sanctum'] },
  { group: 'Front end', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML / CSS / SASS', 'Tailwind', 'Bootstrap', 'jQuery'] },
  { group: 'Data', items: ['MySQL', 'PostgreSQL', 'SQLite', 'Firebase'] },
  { group: 'Cloud & tools', items: ['Linux / nginx', 'Git', 'Azure', 'AWS', 'Vercel', 'n8n'] },
  { group: 'Domain', items: ['RFID systems', 'Hardware integration', 'Multilingual & RTL interfaces'] },
  { group: 'Mobile', items: ['Flutter', 'Bloc'] },
];

export const education = {
  degree: 'B.Sc. Computer Engineering',
  school: 'Burdur Mehmet Akif Ersoy University',
  period: '2019 – 2024',
};

export const languages = [
  { name: 'Kurdish', level: 'native' },
  { name: 'Arabic', level: 'native' },
  { name: 'Turkish', level: 'native' },
  { name: 'English', level: 'professional working' },
];
