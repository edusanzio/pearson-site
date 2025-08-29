// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta Pearson
        'pearson-green': '#129457',
        'pearson-green-dark': '#0F7A46', // hover/active
        'pearson-blue': '#284189',
      },
    },
  },
  plugins: [],
};
export default config;
