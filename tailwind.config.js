/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eeeafd',
          100: '#d5cbfb',
          200: '#ac98f7',
          300: '#8565f3',
          400: '#6c3def',
          500: '#4a00e0',
          600: '#3d00ba',
          700: '#30008a',
          800: '#21005d',
          900: '#11002e',
        },
        secondary: {
          50: '#e0f7fa',
          100: '#b3ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00b8d4',
          600: '#00a5bf',
          700: '#0088a3',
          800: '#006c82',
          900: '#004d61',
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};