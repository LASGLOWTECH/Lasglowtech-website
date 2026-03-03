/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        muted: ['0.875rem', { lineHeight: '1.5' }],
      },
      colors: {
        textcolor: 'var(--color-text)',
        textcolor2: 'var(--color-text2)',
        Primarycolor: 'var(--color-primary)',
        bgcolor2: 'var(--color-bg2)',
        bgcolor: 'var(--color-bg)',
        Primarycolor1: 'var(--color-primary1)',
        Primarycolor2: 'var(--color-primary2)',
        Secondarycolor1: 'var(--color-secondary1)',
        Secondarycolor2: 'var(--color-secondary2)',
        Secondarycolor: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        grey: '#b2b2b2',
      }


    },

  },
  plugins: [],
}