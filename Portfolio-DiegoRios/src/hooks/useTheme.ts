import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
}

const THEME_KEY = 'portfolio-theme';

export const useTheme = (): UseThemeReturn => {
    const [theme, setThemeState] = useState<Theme>('light');

    // Inicializar tema
    useEffect(() => {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
        setThemeState(initialTheme);
        applyTheme(initialTheme);
    }, []);

    // Escuchar cambios en preferencia del sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            const stored = localStorage.getItem(THEME_KEY);
            if (!stored) {
                const newTheme = e.matches ? 'dark' : 'light';
                setThemeState(newTheme);
                applyTheme(newTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }, [theme, setTheme]);

    return {
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark',
    };
};

export default useTheme;
