/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        'primary-background': {
          DEFAULT: 'hsl(30, 25%, 95%)',
          dark: 'hsl(240, 10%, 12%)',
        },
        'container-background': {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(240, 6%, 16%)',
        },
        // Text colors
        'primary-text': {
          DEFAULT: 'hsl(240, 10%, 15%)',
          dark: 'hsl(30, 25%, 95%)',
        },
        'secondary-text': {
          DEFAULT: 'hsl(240, 5%, 45%)',
          dark: 'hsl(240, 5%, 65%)',
        },
        // Accent and semantic colors
        'accent': {
          DEFAULT: 'hsl(350, 85%, 55%)',
          dark: 'hsl(350, 90%, 65%)',
        },
        'success': {
          DEFAULT: 'hsl(140, 70%, 40%)',
          dark: 'hsl(140, 60%, 55%)',
        },
        'info': {
          DEFAULT: 'hsl(210, 80%, 50%)',
          dark: 'hsl(210, 85%, 65%)',
        },
        'border': {
          DEFAULT: 'hsl(240, 10%, 85%)',
          dark: 'hsl(240, 5%, 25%)',
        },
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
