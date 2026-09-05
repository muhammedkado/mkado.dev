// Copy for the main site in English and Turkish.
//
// Content (what the site says about the work) lives in src/data/site.ts (EN)
// and src/data/tr.ts (TR, keyed to site.ts). The chrome — headings, buttons,
// labels — lives here. Components take a `lang` prop and call t(lang); the
// Turkish home page is src/pages/tr/index.astro. /v3 keeps its own inline
// bilingual approach (T.astro) and does not use this file.
import { demos, education, languages, profile, timeline, type TimelineEntry } from '../data/site';
import { tr } from '../data/tr';

export type Lang = 'en' | 'tr';
export const langs: Lang[] = ['en', 'tr'];
export const homeFor = (lang: Lang) => (lang === 'tr' ? '/tr/' : '/');

const en = {
  htmlTitle: `${profile.name} — ${profile.title}`,
  description: 'Computer engineer in İstanbul, full-stack PHP/Laravel/React. Building RFID laundry-management software at USTEK since 2023, used in 30+ countries. Seven live demos you can open, signed in with one click.',
  location: profile.location,
  openToWork: 'Open to work',
  theme: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
  skip: 'Skip to content',
  lang: { label: 'Language', en: 'English', tr: 'Türkçe' },
  menu: { open: 'Open menu', close: 'Close menu' },
  nav: { work: 'Work', experience: 'Experience', skills: 'Skills', contact: 'Contact', sections: 'Sections' },
  hero: {
    seeWork: 'See the live work',
    downloadCv: 'Download CV',
    degree: education.degree,
    readout: ['UHF RFID', 'readers, terminals, web platform', '30+ countries'],
  },
  showcase: {
    h2: 'Seven applications you can open',
    lead: 'Real deployments, each with its own database. Use the demo accounts, change whatever you like — everything resets overnight.',
    allUp: 'All systems up',
    someUp: (up: number, total: number) => `${up} of ${total} up`,
    open: (name: string) => `Open ${name}`,
    signedIn: ' (signed in)',
    source: 'Source code',
    caseStudy: 'Case study',
    email: 'email',
    password: 'password',
    tablist: 'Applications',
  },
  timeline: {
    h2: 'Experience',
    lead: 'From a computer-engineering degree to production RFID software that runs in hotels, hospitals and commercial laundries worldwide.',
    yrs: 'yrs',
    kind: { work: 'work', projects: 'projects', education: 'education' } as Record<string, string>,
  },
  skills: {
    h2: 'Skills',
    lead: 'A number next to a skill is how many of the projects on this page ship with it. Hover to see which.',
    usedIn: 'Used in',
    note: 'Day to day at USTEK: PHP, Laravel, Zend Framework 1, MySQL and REST APIs, against real RFID hardware.',
  },
  contact: {
    h2: 'Hiring a full-stack engineer?',
    lead: "I'm open to full-time roles, remote or in İstanbul. Email is the fastest way to reach me.",
    copy: 'Copy',
    whatsapp: 'WhatsApp',
    cv: 'CV (PDF)',
    basedIn: 'Based in',
    roles: 'Roles',
    rolesValue: 'Full-stack, back-end (PHP / Laravel), React front-end',
    setup: 'Setup',
    setupValue: 'Remote, or on-site in İstanbul',
    languages: 'Languages',
    spoken: languages.map((l) => l.name).join(', '),
  },
  work: {
    home: 'Home',
    list: 'Work',
    breadcrumb: 'Breadcrumb',
    eyebrow: 'Case study',
    titleSuffix: ' — case study',
    open: (name: string) => `Open ${name}`,
    signedIn: ' (signed in)',
    source: 'Source code',
    accounts: 'Demo accounts',
    email: 'email',
    password: 'password',
    copy: 'Copy',
    shotCaption: 'What you see after the one-click sign-in.',
    shotAlt: (name: string) => `${name}: the signed-in dashboard`,
    problem: 'The problem',
    built: 'What I built',
    how: "How it's built",
    tryIt: 'What to try',
    prev: 'Previous',
    next: 'Next',
    others: 'Other case studies',
    indexTitle: 'Work — seven live applications, each with a case study',
    indexDescription: 'What each of the seven live demos is for, what I built, how it is put together, and what to try in it.',
    indexEyebrow: 'Case studies',
    indexH1: 'Seven applications, and how each one is built',
    indexLead: 'Every project below is deployed with a demo account. Each page explains the problem, what I built, the architecture, and three things to try.',
    more: 'Curious how all of this is hosted for free and kept alive?',
    about: 'About this site',
  },
  footer: {
    line: 'Static Astro site, no client frameworks. Built',
    about: 'About this site',
    notes: 'Notes',
    source: 'Source',
    experiments: 'Design experiments',
    commit: 'The commit that is live',
    dateLocale: 'en-GB',
  },
};

const trUi: typeof en = {
  htmlTitle: `${profile.name} — ${tr.profile.title}`,
  description: "İstanbul'da bilgisayar mühendisi, full-stack PHP/Laravel/React. 2023'ten beri USTEK'te 30'dan fazla ülkede kullanılan RFID çamaşır yönetimi yazılımı geliştiriyorum. Tek tıkla giriş yapılan yedi canlı demo.",
  location: 'İstanbul, Türkiye (UTC+3)',
  openToWork: 'Yeni fırsatlara açığım',
  theme: { toDark: 'Koyu temaya geç', toLight: 'Açık temaya geç' },
  skip: 'İçeriğe atla',
  lang: { label: 'Dil', en: 'English', tr: 'Türkçe' },
  menu: { open: 'Menüyü aç', close: 'Menüyü kapat' },
  nav: { work: 'Çalışmalar', experience: 'Deneyim', skills: 'Yetkinlikler', contact: 'İletişim', sections: 'Bölümler' },
  hero: {
    seeWork: 'Canlı çalışmaları gör',
    downloadCv: 'CV indir',
    degree: 'Bilgisayar Mühendisliği Lisans',
    readout: ['UHF RFID', 'okuyucular, terminaller, web platformu', '30+ ülke'],
  },
  showcase: {
    h2: 'Açabileceğiniz yedi uygulama',
    lead: 'Her biri kendi veritabanıyla gerçek kurulumlar. Demo hesaplarını kullanın, istediğinizi değiştirin — hepsi her gece sıfırlanır.',
    allUp: 'Tüm sistemler ayakta',
    someUp: (up: number, total: number) => `${total} demodan ${up} tanesi ayakta`,
    open: (name: string) => `${name} aç`,
    signedIn: ' (giriş yapılmış)',
    source: 'Kaynak kod',
    caseStudy: 'Vaka çalışması',
    email: 'e-posta',
    password: 'şifre',
    tablist: 'Uygulamalar',
  },
  timeline: {
    h2: 'Deneyim',
    lead: "Bilgisayar mühendisliği diplomasından, dünya genelinde otellerde, hastanelerde ve ticari çamaşırhanelerde çalışan üretim RFID yazılımına.",
    yrs: 'yıl',
    kind: tr.kind,
  },
  skills: {
    h2: 'Yetkinlikler',
    lead: 'Bir yetkinliğin yanındaki sayı, bu sayfadaki projelerden kaçının onunla yapıldığını gösterir. Üzerine gelince hangileri olduğunu görürsünüz.',
    usedIn: 'Kullanıldığı projeler',
    note: tr.skills.note,
  },
  contact: {
    h2: 'Full-stack mühendis mi arıyorsunuz?',
    lead: "Uzaktan ya da İstanbul'da tam zamanlı rollere açığım. Bana ulaşmanın en hızlı yolu e-posta.",
    copy: 'Kopyala',
    whatsapp: 'WhatsApp',
    cv: 'CV (PDF)',
    basedIn: 'Konum',
    roles: 'Roller',
    rolesValue: 'Full-stack, back-end (PHP / Laravel), React front-end',
    setup: 'Çalışma şekli',
    setupValue: "Uzaktan ya da İstanbul'da ofiste",
    languages: 'Diller',
    spoken: ['Kürtçe', 'Arapça', 'Türkçe', 'İngilizce'].join(', '),
  },
  work: {
    home: 'Ana sayfa',
    list: 'Çalışmalar',
    breadcrumb: 'Sayfa yolu',
    eyebrow: 'Vaka çalışması',
    titleSuffix: ' — vaka çalışması',
    open: (name: string) => `${name} aç`,
    signedIn: ' (giriş yapılmış)',
    source: 'Kaynak kod',
    accounts: 'Demo hesapları',
    email: 'e-posta',
    password: 'şifre',
    copy: 'Kopyala',
    shotCaption: 'Tek tıkla girişten sonra gördüğünüz ekran.',
    shotAlt: (name: string) => `${name}: giriş yapılmış panel`,
    problem: 'Problem',
    built: 'Ne yaptım',
    how: 'Nasıl kuruldu',
    tryIt: 'Neler deneyebilirsiniz',
    prev: 'Önceki',
    next: 'Sonraki',
    others: 'Diğer vaka çalışmaları',
    indexTitle: 'Çalışmalar — yedi canlı uygulama, her biri için bir vaka çalışması',
    indexDescription: 'Yedi canlı demonun her biri ne için, ne yaptım, nasıl kuruldu ve içinde neler denenebilir.',
    indexEyebrow: 'Vaka çalışmaları',
    indexH1: 'Yedi uygulama ve her birinin nasıl kurulduğu',
    indexLead: 'Aşağıdaki her proje bir demo hesabıyla yayında. Her sayfa problemi, ne yaptığımı, mimariyi ve denenecek üç şeyi anlatır.',
    more: 'Bunların hepsi ücretsiz nasıl barındırılıyor ve ayakta tutuluyor, merak ettiniz mi?',
    about: 'Bu site hakkında',
  },
  footer: {
    line: 'Statik Astro sitesi, istemci taraflı framework kullanılmadı. Derleme:',
    about: 'Bu site hakkında',
    notes: 'Notlar',
    source: 'Kaynak',
    experiments: 'Tasarım denemeleri',
    commit: 'Yayındaki commit',
    dateLocale: 'tr-TR',
  },
};

export const t = (lang: Lang) => (lang === 'tr' ? trUi : en);

/** Title / role / headline / intro for the hero. */
export const profileCopy = (lang: Lang) =>
  lang === 'tr'
    ? { title: tr.profile.title, role: tr.profile.role, headline: tr.profile.headline, intro: tr.profile.intro }
    : { title: profile.title, role: profile.role, headline: profile.headline, intro: profile.intro };

/** Summary + note of a demo card. */
export const demoCopy = (d: (typeof demos)[number], lang: Lang) =>
  lang === 'tr'
    ? { summary: tr.demos[d.slug]?.summary ?? d.summary, note: tr.demos[d.slug]?.note ?? d.note }
    : { summary: d.summary, note: d.note };

/** Timeline entries with Turkish text merged over the English ones (same order). */
export const timelineCopy = (lang: Lang): TimelineEntry[] =>
  lang === 'tr' ? timeline.map((e, i) => ({ ...e, ...(tr.timeline[i] ?? {}) })) : timeline;

/** Display name of a skill group. */
export const skillGroupName = (group: string, lang: Lang) => (lang === 'tr' ? tr.skills.groups[group] ?? group : group);
