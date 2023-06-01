/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // <= add this
    "./src/**/*.{js,ts,jsx,tsx}", // <= no spaces
  ],
  theme: {
    extend: {
      colors: {
        'hz-blue': '#0e415c',
        'hz-gold': '#ddb777',
        'hz-red': '#ce333f',
        'hz-blue-lighter': '#145d85'
      },
      fontFamily: {
        'hz-font': 'Archivo'
      },
    },
  },
  plugins: [],
}
