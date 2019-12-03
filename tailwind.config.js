const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      primary: '#5828e8',
      gainsboro: 'rgba(0, 0, 0, 0.05)',
      lightgray: 'rgba(0, 0, 0, 0.5)',
      slategray: '#101b42',
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
  variants: {},
  plugins: [],
};
