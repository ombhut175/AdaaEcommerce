/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],  // Custom font family
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('tailwind-scrollbar-hide'),
  ],
  darkMode:'class'
}

