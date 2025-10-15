/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4FC3F7',
        secondary: '#A5D6A7',
        background: '#F9FAFB',
        text: '#1E293B',
      },
    },
  },
  plugins: [],
}
