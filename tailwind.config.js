const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Rubik', ...fontFamily.sans],
    },
    extend: {
      colors: {
        black: '#121212',
        primary: '#5828e8',
        gainsboro: '#f5f5f5',
        lightgray: '#888',
        slategray: '#101b42',
        red: '#DC143C',
      },
      spacing: {
        96: '24rem',
      },
      margin: {
        '-96': '-24rem',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
};
