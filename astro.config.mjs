// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mkado.dev',
  integrations: [sitemap({ filter: (page) => !page.includes('/v2') && !page.includes('/v3') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
