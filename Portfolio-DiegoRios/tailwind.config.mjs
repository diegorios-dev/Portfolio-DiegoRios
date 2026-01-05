/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Legacy (mantener compatibilidad)
                appAccent: '#EF4141',
                appBody: '#fff',
                appText: '#171717',
                appGray: {
                    100: '#EBEBEB',
                    200: '#D4D4D4',
                    300: '#828282',
                    400: '#636363',
                    500: '#525252',
                    600: '#242424',
                },
                // Design Tokens - Semantic Colors
                surface: {
                    DEFAULT: '#FFFFFF',
                    subtle: '#FAFAFA',
                    muted: '#F5F5F5',
                    emphasis: '#EBEBEB',
                    // Dark variants
                    dark: '#0A0A0A',
                    'dark-subtle': '#141414',
                    'dark-muted': '#1A1A1A',
                    'dark-emphasis': '#262626',
                },
                content: {
                    DEFAULT: '#171717',
                    muted: '#525252',
                    subtle: '#828282',
                    inverted: '#FFFFFF',
                    // Dark variants
                    dark: '#FAFAFA',
                    'dark-muted': '#A3A3A3',
                    'dark-subtle': '#737373',
                    'dark-inverted': '#0A0A0A',
                },
                border: {
                    DEFAULT: '#E5E5E5',
                    muted: '#D4D4D4',
                    emphasis: '#171717',
                    // Dark variants
                    dark: '#262626',
                    'dark-muted': '#333333',
                    'dark-emphasis': '#FAFAFA',
                },
                accent: {
                    blue: '#3A437E',
                    'blue-dark': '#4F5A9E',
                    gold: '#FFBF4B',
                    'gold-dark': '#FFD06B',
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1.5rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1440px',
                },
            },
            fontFamily: {
                helvetica: ['Helvetica', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out',
                slideUp: 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
