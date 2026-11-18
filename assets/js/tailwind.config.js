/*
 * Shared Tailwind (Play CDN) config — the single source of design tokens.
 * Load right after <script src="https://cdn.tailwindcss.com"></script>.
 * Colour values live as CSS variables in assets/css/main.css so that
 * light/dark themes swap automatically without `dark:` variants.
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Semantic tokens (preferred)
        bg: token('bg'),
        surface: token('surface'),
        elevated: token('elevated'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
        gold: token('gold'),
        // Legacy aliases so un-migrated pages keep rendering
        primary: '#0A0A0B',
        secondary: token('accent'),
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
