import type { Config } from 'tailwindcss';

/**
 * Design tokens for the PowPills storefront.
 *
 * Three rules keep the page feeling like one document instead of a stack of
 * unrelated blocks:
 *   1. Type scale  — body copy never drops below 13px; each level is a clear step.
 *   2. Rhythm      — sections use one vertical padding token, not ad-hoc values.
 *   3. Surfaces    — only five backgrounds exist, alternating down the page.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Single green ramp. 600 is the action colour, 700/800 for depth,
        // 900 for the dark bands, 50/100 for tinted surfaces.
        brand: {
          50: '#eef7f2',
          100: '#d5ebe0',
          200: '#aed8c4',
          300: '#7fbfa2',
          400: '#4fa27e',
          500: '#2d8863',
          600: '#177050',
          700: '#125b42',
          800: '#0e4635',
          900: '#0a3327',
        },
        // Slate-based neutrals: cooler and higher contrast than pure grey.
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          muted: '#64748b',
          faint: '#94a3b8',
        },
        surface: {
          soft: '#f5f8f7',
          mint: '#eaf4ef',
          rose: '#fbeef0',
          cream: '#fcf4e8',
          sky: '#eef3fa',
        },
        line: '#e3e9ee',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // 11px is reserved for badges and payment marks only.
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        // Deliberate steps between Tailwind's 14px and 16px, and above 16px.
        '15': ['0.9375rem', { lineHeight: '1.5rem' }],
        '17': ['1.0625rem', { lineHeight: '1.65rem' }],
        // Section and hero headings.
        'section': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        'section-lg': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em' }],
        'hero': ['2.25rem', { lineHeight: '2.6rem', letterSpacing: '-0.025em' }],
        'hero-lg': ['3.25rem', { lineHeight: '3.6rem', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      maxWidth: {
        shell: '1240px',
        measure: '34rem',
      },
      boxShadow: {
        // Borders do the separating; shadows only signal elevation and hover.
        card: '0 1px 2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 14px 30px -12px rgba(10, 51, 39, 0.22)',
        lift: '0 18px 40px -16px rgba(10, 51, 39, 0.20)',
        arrow: '0 4px 14px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        // cards -> 2xl (16px), panels -> 3xl (24px), controls -> xl (12px)
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
