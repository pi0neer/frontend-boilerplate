// tailwind.config.ts
import { Config } from 'tailwindcss';

export default <Config>{
  jit: true,
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
