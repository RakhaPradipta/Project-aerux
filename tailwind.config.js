/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#effaf5',
          100: '#d7f0e3',
          200: '#b2e1cb',
          300: '#7fccae',
          400: '#4ab28c',
          500: '#279671',
          600: '#18795c',
          700: '#14614b',
          800: '#124e3d',
          900: '#104032',
          950: '#07231b',
        },
        cream: {
          50: '#FAF8F4',
          100: '#F4EFE6',
          200: '#E9E0D0',
        },
        gold: {
          100: '#F7EDD8',
          200: '#EFDCB5',
          300: '#E5C684',
          400: '#D9AD5B',
          500: '#C9A96A',
          600: '#A98548',
        },
        ink: {
          500: '#6B6560',
          700: '#3F3A35',
          900: '#1C1917',
        },
        dark: {
          700: '#3F3A35',
          800: '#2A2724',
          900: '#1C1917',
          950: '#141210',
        },
        secondary: {
          400: '#9DB8AD',
          600: '#5B7A6E',
        },
        accent: {
          teal: '#18795c',
          pink: '#C97B7B',
          blue: '#5B7A9D',
          green: '#279671',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(28,25,23,0.08)',
        'soft-lg': '0 12px 32px rgba(28,25,23,0.10)',
        'soft-xl': '0 24px 64px rgba(28,25,23,0.12)',
        'card': '0 2px 12px rgba(28,25,23,0.06)',
      },
    },
  },
  plugins: [],
}
