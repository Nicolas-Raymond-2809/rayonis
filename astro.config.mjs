// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nicolas-raymond-2809.github.io',
  base: '/rayonis',
  integrations: [tailwind()]
});