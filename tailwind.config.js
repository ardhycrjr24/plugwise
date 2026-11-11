/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f59e0b', // amber-500
          dark: '#d97706',    // amber-600
          light: '#fbbf24',   // amber-400
        },
        accent: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb',    // blue-600
          light: '#60a5fa',   // blue-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
