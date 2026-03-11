/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: {
                    0: '#0f111a',
                    1: '#181b26',
                    2: '#1f2330',
                    3: '#2a2f40',
                    accent: '#00f2ff',
                    accentHover: '#00cbd6',
                    secondary: '#ff4d6d',
                    textPrimary: '#ffffff',
                    textSecondary: '#94a3b8',
                }
            },
            fontFamily: {
                heading: ['Oxanium', 'monospace'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
            },
            animation: {
                'fade-in-up':   'fadeInUp 0.6s ease-out forwards',
                'fade-in':      'fadeIn 0.4s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
                'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
                'blink':        'blink 1s step-end infinite',
                'float':        'float 6s ease-in-out infinite',
                'slide-in':     'slideIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%':   { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInDown: {
                    '0%':   { opacity: '0', transform: 'translateY(-12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 6px rgba(0,242,255,0.2), 0 0 12px rgba(0,242,255,0.05)' },
                    '50%':      { boxShadow: '0 0 20px rgba(0,242,255,0.45), 0 0 40px rgba(0,242,255,0.15)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%':      { opacity: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%':      { transform: 'translateY(-8px)' },
                },
                slideIn: {
                    '0%':   { opacity: '0', transform: 'translateX(-10px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}
