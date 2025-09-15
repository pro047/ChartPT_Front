const { DEFAULT_CIPHERS } = require('tls');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 10%)',
        border: 'hsl(240 5% 90%)',
        input: 'hsl(240 5% 96%)',
        ring: 'hsl(240 5% 70%)',

        primary: {
          DEFAULT: 'hsl(240 100% 60%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 5.9% 10%)',
        },

        muted: {
          DEFAULT: 'hsl(240 4% 95%)',
          foreground: 'hsl(240 3.8% 46.1%)',
        },

        destructive: {
          DEFAULT: 'hsl(0 100% 50%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
      darkMode: 'class',
      borderRadius: {
        lg: '0.05rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
};
