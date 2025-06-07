/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        electric: '#ff1a1a',
        dark: '#0a0a0a',
      },
      boxShadow: {
        neon: '0 0 20px #ff1a1a, 0 0 40px #ff1a1a',
      },
    },
  },
  plugins: [],
};
