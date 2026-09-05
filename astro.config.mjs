// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mkado.dev',
  // Same-origin links (case studies, notes) load on hover; ~1 KB helper, cross-origin demos are ignored.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // / is English, /tr/ is Turkish (same components, lang prop); see src/lib/i18n.ts
  i18n: { defaultLocale: 'en', locales: ['en', 'tr'], routing: { prefixDefaultLocale: false } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/v2') && !page.includes('/v3'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
