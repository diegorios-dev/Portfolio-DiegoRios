import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const SunIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const MoonIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
    </svg>
);

interface ThemeToggleProps {
    className?: string;
    variant?: 'default' | 'mobile';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
    className = '', 
    variant = 'default' 
}) => {
    const { theme, toggleTheme, isDark } = useTheme();

    const baseStyles = 'relative flex items-center justify-center transition-all duration-300';
    
    const variantStyles = {
        default: 'w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10',
        mobile: 'w-11 h-11 rounded-full hover:bg-white/10',
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
        >
            <div
                className={`transform transition-all duration-300 ${
                    isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'
                }`}
            >
                <MoonIcon />
            </div>
            <div
                className={`transform transition-all duration-300 ${
                    isDark ? '-rotate-90 scale-0 absolute' : 'rotate-0 scale-100'
                }`}
            >
                <SunIcon />
            </div>
        </button>
    );
};

export default ThemeToggle;
