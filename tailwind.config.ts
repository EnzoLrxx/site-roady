import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#e2001a', dark: '#b80016', wash: '#fdecee' },
        navy: { DEFAULT: '#0e1b2c', 2: '#16273d', 3: '#1d3350' },
        ink: '#0e1b2c',
        body: '#3a4656',
        mut: '#7c8798',
        line: '#e6e9ee',
        wash: '#f5f7fa',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeUp: 'fadeUp .6s ease both',
      },
    },
  },
  plugins: [],
};
export default config;
