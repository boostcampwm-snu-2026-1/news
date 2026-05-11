/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        card: '#FFFFFF',
        page: '#FEFEFE',
        soft: '#F5F7F9',
        ink: '#14212B',
        sub: '#5F6E76',
        mute: '#879298',
        line: '#D2DAE0',
        accent: '#7890E7',
        'accent-deep': '#4362D0',
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"Noto Serif KR"', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
      }
    },
  },
  plugins: [],
}
