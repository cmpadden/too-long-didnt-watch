/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily: {
        sans: ['Inter', 'sans-serif' ],
        cursive: ['Brush Script MT', 'cursive'],
      }
  },
  plugins: [],
}
