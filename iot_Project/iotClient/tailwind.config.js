/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{
      yellow:{
        100: '#fad089'
      },
      green:{
        100: '#3b8183'
      },
      orange:{
        100: '#ff9c5b',
        200: '#FAD089'
      },
      cyan:{
        500: '#2DD4BF'
      },
      white:{
        100: '#000'
      }
    },
    extend: {},
  },
  plugins: [],
}

