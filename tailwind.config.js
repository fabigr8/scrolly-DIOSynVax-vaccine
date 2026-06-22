/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFCF8',
          100: '#F7F4EE',
          200: '#EDE9DF',
          300: '#DDD7CB',
        },
        ink: {
          DEFAULT: '#0D1117',
          soft: '#1E293B',
          muted: '#475569',
          faint: '#94A3B8',
        },
        science: {
          blue: '#1D4ED8',
          teal: '#0891B2',
          green: '#059669',
          amber: '#D97706',
          red: '#DC2626',
          purple: '#7C3AED',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
