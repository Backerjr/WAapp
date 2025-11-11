export const colorTokens = {
  primary: {
    50: '#f7f5ff',
    100: '#efeaff',
    200: '#d9cbff',
    300: '#b59aff',
    400: '#9068ff',
    500: '#6b38f6',
    600: '#5228d3',
    700: '#3d1ea9',
    800: '#2a147d',
    900: '#190b52',
  },
  accent: {
    50: '#fff7f8',
    100: '#ffe9ef',
    200: '#ffcbd9',
    300: '#ffa0ba',
    400: '#ff6b96',
    500: '#ff3972',
    600: '#db215b',
    700: '#ae1648',
    800: '#7d0d33',
    900: '#4c061f',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5f5',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  background: {
    base: '#05010e',
    surface: 'rgba(12, 8, 32, 0.78)',
    overlay: 'rgba(20, 16, 48, 0.92)',
    gradient: 'linear-gradient(135deg, #05010e 0%, #160733 40%, #280a55 100%)',
    cardGlow: 'linear-gradient(145deg, rgba(107, 56, 246, 0.2), rgba(255, 57, 114, 0.12))',
  },
} as const;

export const typographyTokens = {
  fontFamily: {
    display: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Menlo", monospace',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    displaySm: '1.75rem',
    displayMd: '2.25rem',
    displayLg: '3rem',
  },
  leading: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },
  tracking: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
  },
} as const;

export const shadowTokens = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.12)',
  sm: '0 2px 6px rgba(15, 23, 42, 0.16)',
  md: '0 8px 24px rgba(15, 23, 42, 0.22)',
  lg: '0 16px 48px rgba(8, 47, 73, 0.3)',
  glow: '0 0 25px rgba(107, 56, 246, 0.45)',
} as const;

export const radiusTokens = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export type ThemeTokens = {
  colors: typeof colorTokens;
  typography: typeof typographyTokens;
  shadows: typeof shadowTokens;
  radii: typeof radiusTokens;
};

export const themeTokens: ThemeTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  shadows: shadowTokens,
  radii: radiusTokens,
};
