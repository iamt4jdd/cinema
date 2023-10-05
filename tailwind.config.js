/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        blur: "rgba(0, 0, 0, 0.5)",
        dimBlack: "rgba(26,26,26)",
      },
      animation: {
        'bounce-one': 'bounce-one 1s',
        'appear': 'appear 0.5s ease-in-out',
        'notification': 'notification ease-in-out .3s, fadeOut 3s .3s ease-in-out forwards',
      },
      keyframes: {
        'bounce-one': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        appear: {
          '0%': { opacity: '0', transform: 'translateY(20%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        notification: {
          '0%': { opacity: '0', transform: 'translateX(20%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' }}
      },
    },
  },
  plugins: [],
})

