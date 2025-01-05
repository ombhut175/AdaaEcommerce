/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
    "./node_modules/flowbite/**/*.js"
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
<<<<<<< HEAD
    require('flowbite/plugin')
=======
    require('tailwind-scrollbar-hide'),
>>>>>>> 59de7bd441d5cb2673911293a5f621f5d0b2b0d1
  ],
  darkMode:'class'
}

