/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#050505',
        neon: '#00D9FF',
        sky: '#38BDF8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 217, 255, 0.22)',
        'glow-strong': '0 0 70px rgba(0, 217, 255, 0.35)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.16), transparent 30%)',
      },
    },
  },
  plugins: [],
};
