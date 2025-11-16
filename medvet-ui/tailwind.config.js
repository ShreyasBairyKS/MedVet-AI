/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004C98',
        'primary-dark': '#003366',
        secondary: '#147AD6',
        accent: '#7AA3C0',
        neutral: '#F4F6F8',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'border-grey': '#E5E7EB',
        'urgent-yellow': '#F59E0B',
        'urgent-orange': '#F97316',
        'urgent-red': '#DC2626',
        'urgent-green': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
