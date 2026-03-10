import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rayonis.fr',
  base: '/',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
