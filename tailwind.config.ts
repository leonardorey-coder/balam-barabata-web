import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chukum: {
          50: '#f9f1e9',
          100: '#f0e0cc',
          200: '#e1bf99',
          300: '#cf9b66',
          400: '#c07d3a',
          500: '#b86420',
          600: '#a4501a',
          700: '#893d18',
          800: '#6f3119',
          900: '#5a2916',
          950: '#2d1a0f',
        },
        selva: '#2a4d3f',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
