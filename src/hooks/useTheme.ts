import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedSettings = storage.get<{ theme: Theme }>(STORAGE_KEYS.SETTINGS);
    const savedTheme = savedSettings?.theme || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    
    const savedSettings = storage.get<any>(STORAGE_KEYS.SETTINGS) || {};
    storage.set(STORAGE_KEYS.SETTINGS, { ...savedSettings, theme: newTheme });
  };

  return { theme, toggleTheme };
};
