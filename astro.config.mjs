import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://rayonis.fr',
  base: '/',
  integrations: [react(), tailwind()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
