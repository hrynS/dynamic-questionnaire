import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(165.54deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2' +
            ' 74.96%)'
      },
      fontSize: {
        '2xl': ['1.5rem', '28px']
      },
      colors: {
        'custom-black': '#333333',
      },
    },
  },
  plugins: [],
}
export default config
