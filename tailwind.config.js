const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: 'var(--as-primary)',
        'primary-hover': 'var(--as-primary-hover)',
        secondary: 'var(--as-secondary)',
        success: 'var(--as-success)',
        info: 'var(--as-info)',
        warning: 'var(--as-warning)',
        danger: 'var(--as-danger)',
        body: 'var(--as-body)',
        'layout-border': 'var(--as-layout-border)',
        'active-menu': 'var(--as-active-menu)',
      },
      zIndex: {
        1000: 'var(--as-z-dropdown)',
        1020: 'var(--as-z-sticky)',
        1030: 'var(--as-z-fixed)',
        1040: 'var(--as-z-modal-backdrop)',
        1050: 'var(--as-z-offcanvas)',
        1060: 'var(--as-z-modal)',
        1070: 'var(--as-z-popover)',
        1080: 'var(--as-z-tooltip)',
        1090: 'var(--as-z-toaster)',
      },
      screens: {
        'xs': '0',
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        'xxl': '1400px',
      },
      outline: {
        blue: '2px solid rgba(0, 112, 244, 0.5)',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};
