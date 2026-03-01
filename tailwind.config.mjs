/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#05b7d6",
        secondary: "#8b5cf6",
        "border-dark": "#111718",
      },
      boxShadow: {
        neo: '4px 4px 0px 0px #111718',
        'neo-hover': '2px 2px 0px 0px #111718',
        'neo-sm': '2px 2px 0px 0px #111718',
        'neo-lg': '6px 6px 0px 0px #111718',
      },
    },
  },
  plugins: [],
}
