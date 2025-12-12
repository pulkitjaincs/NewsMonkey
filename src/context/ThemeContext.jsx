import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 'light', 'dark', or 'system'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (t) => {
            if (t === 'dark') {
                root.classList.add('dark');
            } else if (t === 'light') {
                root.classList.remove('dark');
            } else {
                // System
                if (systemQuery.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        applyTheme(theme);
        localStorage.setItem('theme', theme);

        // Listener for system changes if mode is 'system'
        const handleSystemChange = (e) => {
            if (theme === 'system') {
                if (e.matches) root.classList.add('dark');
                else root.classList.remove('dark');
            }
        };

        systemQuery.addEventListener('change', handleSystemChange);
        return () => systemQuery.removeEventListener('change', handleSystemChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
