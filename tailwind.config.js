/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'td': 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 20px',
      },
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: [],
}

