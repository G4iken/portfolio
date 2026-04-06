/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          50:  '#f0fdf9',
          100: '#ccfbee',
          200: '#99f5de',
          300: '#5eeac8',
          400: '#2dd6ad',
          500: '#12b894',
          600: '#0a9378',
          700: '#0c7562',
          800: '#0e5e4f',
          900: '#0f4d42',
        },
        void: {
          900: '#050810',
          800: '#090d18',
          700: '#0e1422',
          600: '#141b2d',
          500: '#1a2338',
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(18, 184, 148, 0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(18, 184, 148, 0.05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
