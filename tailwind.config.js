
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        ink: {
          DEFAULT: '#050505',
          soft: '#1f1f1f',
        },
        accent: {
          blue: '#2997E8',
          sky: '#45B8E8',
          violet: '#A89AF2',
          indigo: '#8F7AE5',
          pink: '#F04BC4',
          coral: '#FF6B6B',
          orange: '#FF7B42',
          yellow: '#FFE633',
          green: '#54D68A',
          teal: '#35C6C1',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      fontSize: {
        '11xl': ['10rem', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        '12xl': ['14rem', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
        '13xl': ['18rem', { lineHeight: '0.8', letterSpacing: '-0.05em' }],
        '14xl': ['22rem', { lineHeight: '0.78', letterSpacing: '-0.06em' }],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x 40s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
