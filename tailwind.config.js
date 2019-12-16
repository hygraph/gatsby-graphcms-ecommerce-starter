const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      primary: '#5828e8',
      gainsboro: 'rgba(0, 0, 0, 0.1)',
      lightgray: 'rgba(0, 0, 0, 0.25)',
      slategray: '#101b42',
      red: '#DC143C',
    },
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
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
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
};
