/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide'), // Merged plugin
  ],
  darkMode: 'class', // Enable dark mode based on a CSS class
};
