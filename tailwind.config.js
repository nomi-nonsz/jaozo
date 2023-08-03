/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['montserrat', 'sans-serif'],
        'poppins': ['poppins', 'sans-serif'],
        'noto-sans': ['noto sans', 'sans-serif']
      },
      screens: {
        'xs': '480px'
      },
      colors: {
        'primary': "#4200FF",
        'dark-primary': "#000014",
        'border-primary': "#4943FF",
        'pit-primary': "#AEABFF",
        'yawn-primary': "#01001E",
        'gold': "#FF9900"
      },
      width: {
        'xl': '1280px',
        'lg': '1080px',
        'md': '768px',
        'sm': '640px',
        'xm': '480px'
      },
      animation: {
        'img-loading': 'towew .3s infinite',
      }
    },
  },
  plugins: [],
}

