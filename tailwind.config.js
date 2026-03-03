/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vwfs: {
          brand: '#004666',
          accent: '#05CE9F',
          'accent-light': '#66E4EE',
          text: '#4C5356',
          surface: '#F2F2F2',
          'surface-dark': '#A8ADB3',
          success: '#038364',
          error: '#CD3B4F',
          warning: '#F5E850',
          disabled: '#D8D8D8',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
