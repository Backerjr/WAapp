/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text-primary)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--brand-600)',
          foreground: 'var(--brand-50)',
        },
        secondary: {
          DEFAULT: 'var(--brand-400)',
          foreground: 'var(--brand-900)',
        },
        destructive: {
          DEFAULT: 'var(--danger)',
          foreground: 'var(--brand-50)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--brand-50)',
        },
        warning: {
            DEFAULT: 'var(--warning)',
            foreground: 'var(--bg)'
        },
        muted: {
          DEFAULT: 'var(--text-muted)',
          foreground: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--brand-500)',
          foreground: 'var(--text-primary)',
        },
        popover: {
          DEFAULT: 'var(--elev-1)',
          foreground: 'var(--text-primary)',
        },
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--text-primary)',
        },
        border: 'var(--line)',
        input: 'var(--elev-2)',
        ring: 'var(--brand-500)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        lg: 'var(--radius-lg)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius-sm)',
        xs: 'var(--radius-xs)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
      },
      transitionTimingFunction: {
          DEFAULT: 'var(--easing-standard)',
          standard: 'var(--easing-standard)',
          emphasized: 'var(--easing-emphasized)',
          decelerate: 'var(--easing-decelerate)',
      },
      transitionDuration: {
          DEFAULT: 'var(--dur-medium)',
          quick: 'var(--dur-quick)',
          fast: 'var(--dur-fast)',
          medium: 'var(--dur-medium)',
          slow: 'var(--dur-slow)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}