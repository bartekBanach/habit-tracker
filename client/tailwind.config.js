/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
};
