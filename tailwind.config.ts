import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
        },
        white: {
          DEFAULT: '#fff',
          b3: '#ffffffb3',
          '1a': '#ffffff1a',
        },
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1' }],
        sm: ['14px', { lineHeight: '1' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1' }],
        '3xl': ['30px', { lineHeight: '1' }],
      },
      height: {
        '60': '60px',
      },
      spacing: {
        '70': '70px',
      },
    },
  },
  plugins: [],
};

export default config;
