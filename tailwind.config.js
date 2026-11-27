/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        booking: {
          blue: '#003580',
          darkBlue: '#00224f',
          lightBlue: '#006ce4',
          yellow: '#febb02',
          lightYellow: '#fef2d6',
          gray: '#f5f5f5',
          darkGray: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}
