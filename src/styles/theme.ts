/**
 * Theme Helper - Access CSS variables in TypeScript
 * Provides type-safe access to design tokens
 */

export const theme = {
  // Brand Colors
  brand: {
    50: "var(--brand-50)",
    100: "var(--brand-100)",
    200: "var(--brand-200)",
    300: "var(--brand-300)",
    400: "var(--brand-400)",
    500: "var(--brand-500)",
    600: "var(--brand-600)",
    700: "var(--brand-700)",
    800: "var(--brand-800)",
    900: "var(--brand-900)",
  },

  // Neutrals
  bg: "var(--bg)",
  surface: "var(--surface)",
  elevation: {
    1: "var(--elev-1)",
    2: "var(--elev-2)",
    3: "var(--elev-3)",
  },

  // Text Colors
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
  },

  // State Colors
  state: {
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    info: "var(--info)",
  },

  // Borders
  line: "var(--line)",
  lineSoft: "var(--line-soft)",

  // Shadows
  shadow: {
    sm: "var(--shadow-1)",
    md: "var(--shadow-2)",
    lg: "var(--shadow-3)",
  },

  // Border Radius
  radius: {
    xs: "var(--radius-xs)",
    sm: "var(--radius-sm)",
    md: "var(--radius)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },

  // Spacing
  space: {
    1: "var(--space-1)",
    2: "var(--space-2)",
    3: "var(--space-3)",
    4: "var(--space-4)",
    5: "var(--space-5)",
    6: "var(--space-6)",
    7: "var(--space-7)",
    8: "var(--space-8)",
  },

  // Typography
  font: {
    sans: "var(--font-sans)",
    display: "var(--font-display)",
    mono: "var(--font-mono)",
  },

  fontSize: {
    xs: "var(--text-xs)",
    sm: "var(--text-sm)",
    base: "var(--text-base)",
    lg: "var(--text-lg)",
    xl: "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
    "4xl": "var(--text-4xl)",
  },
};

/**
 * Helper to get CSS variable value
 * Usage: getCSSVar('--brand-500') or getCSSVar('brand-500')
 */
export function getCSSVar(varName: string): string {
  const name = varName.startsWith('--') ? varName : `--${varName}`;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Helper to set CSS variable value
 * Usage: setCSSVar('--brand-500', '#229dff')
 */
export function setCSSVar(varName: string, value: string): void {
  const name = varName.startsWith('--') ? varName : `--${varName}`;
  document.documentElement.style.setProperty(name, value);
}

/**
 * Theme switcher - toggle between light and dark
 */
export function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

/**
 * Initialize theme from localStorage
 */
export function initTheme(): void {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}
