import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'rayonis-bg': '#F8FAFC',
				'rayonis-text': '#0F172A',
				'rayonis-pro': '#06B6D4',
				'rayonis-academy': '#FFD100',
			},
			fontFamily: {
				sans: ['"Space Grotesk"', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
			boxShadow: {
				'neo': '4px 4px 0px 0px #000',
			},
			borderWidth: {
				'2': '2px',
			},
		},
	},
	plugins: [typography],
}
