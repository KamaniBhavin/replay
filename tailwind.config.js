/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    '.dev/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.525rem',
      },
      height: {
        0.25: '0.0625rem',
        128: '32rem',
        144: '36rem',
        150: '37.5rem',
      },
      width: {
        128: '32rem',
        144: '36rem',
        150: '37.5rem',
        200: '50rem',
        226: '56.5rem',
        250: '62.5rem',
      },
      zIndex: {
        9998: '9998',
        9999: '9999',
      },
      minHeight: {
        150: '37.5rem',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};
