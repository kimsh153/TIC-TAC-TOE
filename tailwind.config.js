/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'w-[120px]',
    'w-[160px]',
    'w-[200px]',
    'w-[240px]',
    'w-[280px]',
    'w-[320px]',
    'w-[360px]',
  ],
  plugins: [],
};
