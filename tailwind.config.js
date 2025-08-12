/** @type {import('tailwindcss').Config} */
export default {
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
      colors: {
        textcolor: '#f7f6f2',
        textcolor2:'#e5e7eb',
        Primarycolor: '#31185e',
        bgcolor2:"#120b1f",
        bgcolor:"#130719",
        Primarycolor1: '#1a0e3f',
        Primarycolor2:'#1E0D3D',
       Secondarycolor1 :'#ced4da',
      Secondarycolor2:'#F1AB1E',
      Secondarycolor: '#ed6e00',
        grey: '#b2b2b2',
       
        grey: '#fafafa',
       


      }


    },

  },
  plugins: [],
}