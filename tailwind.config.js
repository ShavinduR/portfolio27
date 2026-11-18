/**
 * Tailwind config — design tokens for the whole site.
 * Build:  npm run build:css   (outputs assets/css/tailwind.css, which is committed)
 * Watch:  npm run watch:css
 *
 * Colour values live as CSS variables in assets/css/main.css so light/dark
 * themes swap automatically without `dark:` variants.
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        elevated: token('elevated'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
        gold: token('gold'),
        whatsapp: '#25D366',
      },
      maxWidth: { content: '76rem' },
      letterSpacing: { tightest: '-0.04em' },
      animation: {
        'infinite-scroll': 'infinite-scroll 35s linear infinite',
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
