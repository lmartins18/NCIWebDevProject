tailwind.config = {
  darkMode: 'class',
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
      animation: {
        'gradient-fade': 'gradientFade 5s ease-in-out infinite',
        'slide-in-below': '2s ease-out 0s 1 slideInBelow'
      },
      backgroundSize: {
        '200' : '200% 200%'
      }
    },
  },
  plugins: [],
};
