import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        white: {
          900: '#fff',
          500: '#ffffffb3',
          100: '#ffffff1a',
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
        '100': '100px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        7.5: '30px',
      },
    },
  },
  plugins: [],
};

export default config;
