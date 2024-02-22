import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-black': '#333333',
        'primary-white': '#FBFBFF',
        'secondary-white': '#EAEEF7',
        'violet': '#6A3AA2',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2' +
          ' 74.96%)'
      },
      fontSize: {
        '2xl': ['1.5rem', '28px']
      },
    },
  },
  plugins: [],
}  satisfies Config;

export default config;
