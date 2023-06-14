const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      'xl': '5000px',
      '2xl': '5000px'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
