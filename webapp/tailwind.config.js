module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color: theme => ({
      ...theme('colors'),
      'app-blue-dark': '#161a2afa',
      'app-blue-light': '#1F263C',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'app-blue-dark': '#161a2afa',
      'app-blue-light': '#1F263C',
     }),
    fontFamily: {
      sans: ['Monda', 'Open Sans']
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      'app-blue-dark': '#161a2afa',
      'app-blue-light': '#1F263C',
      'app-green': '#b9e655',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
