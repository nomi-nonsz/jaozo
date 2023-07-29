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
      colors: {
        'primary': "#4200FF",
        'dark-primary': "#000014",
        'border-primary': "#4943FF",
        'pit-primary': "#AEABFF"
      }
    },
  },
  plugins: [],
}

