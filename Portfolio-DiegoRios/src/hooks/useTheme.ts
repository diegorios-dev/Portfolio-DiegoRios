import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
}

const THEME_KEY = 'portfolio-theme';
const THEME_CHANGE_EVENT = 'theme-change';

const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
};

export const useTheme = (): UseThemeReturn => {
    const [theme, setThemeState] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    // Inicializar tema después del montaje (client-side only)
    useEffect(() => {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
        
        setThemeState(initialTheme);
        applyTheme(initialTheme);
        setMounted(true);
    }, []);

    // Escuchar cambios de tema de otros componentes
    useEffect(() => {
        const handleThemeChange = (e: Event) => {
            const customEvent = e as CustomEvent<Theme>;
            setThemeState(customEvent.detail);
        };

        window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
        return () => {
            window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
        };
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        console.log('Setting theme to:', newTheme); // Debug
        setThemeState(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
        // Notificar a otros componentes
        window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
    }, []);

    const toggleTheme = useCallback(() => {
        const currentIsDark = document.documentElement.classList.contains('dark');
        const newTheme: Theme = currentIsDark ? 'light' : 'dark';
        console.log('Toggle theme - current isDark:', currentIsDark, '-> new:', newTheme); // Debug
        setTheme(newTheme);
    }, [setTheme]);

    return {
        theme,
        toggleTheme,
        setTheme,
        isDark: mounted ? theme === 'dark' : false,
    };
};

export default useTheme;
