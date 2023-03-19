/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--opensans-font)'],
        serif: ['var(--opensans-font)'],
        sans: ['var(--opensans-font)'],
      },
    },
  },
  plugins: [],
};
