/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: 'Kanit',
        raj: 'Rajdhani'
      },
      colors: {
        green: {
          500: '#62fcaf'
        },
        purple: {
          200: '#9300fe'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
    }
  },
  plugins: []
}
