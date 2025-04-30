/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))',
          },
          '100%': {
            transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))',
          },
        },
        meteor: {
          "0%": { 
            transform: "rotate(var(--angle)) translateX(0)", 
            opacity: 1 
          },
          "70%": { 
            opacity: 1 
          },
          "100%": {
            transform: "rotate(var(--angle)) translateX(-500px)",
            opacity: 0
          },
        },
      },
      animation: {
        meteor: "meteor 5s linear infinite",
        orbit: "orbit calc(var(--duration) * 1s) linear infinite",
      },
    },
  },
  plugins: [],
}