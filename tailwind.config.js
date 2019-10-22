const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      primary: 'rgb(105, 54, 180)',
      gainsboro: 'rgba(0, 0, 0, 0.05)',
      lightgray: 'rgba(0, 0, 0, 0.5)',
      slategray: 'rgba(0, 0, 0, 0.8)',
    },
    fontFamily: {
      sans: ['Roboto', ...fontFamily.sans],
    },
    extend: {
      spacing: {
        96: '24rem',
      },
      margin: {
        '-96': '-24rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
