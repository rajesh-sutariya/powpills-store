import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f8f4',
          100: '#dcefe5',
          200: '#b9dfcb',
          300: '#8eccae',
          400: '#57b287',
          500: '#2e9a6b',
          600: '#17805a',
          700: '#0f6748',
          800: '#0c4f38',
          900: '#093b2a',
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#374151',
          muted: '#6b7280',
          faint: '#9ca3af',
        },
        surface: {
          page: '#ffffff',
          soft: '#f5f7f8',
          mint: '#eaf5ef',
          rose: '#fdeef0',
          cream: '#fdf4e7',
          sky: '#eef4fb',
        },
        line: '#e5e7eb',
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
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      maxWidth: {
        shell: '1240px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
        'card-hover': '0 8px 24px rgba(16, 24, 40, 0.10)',
        arrow: '0 2px 10px rgba(16, 24, 40, 0.14)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
