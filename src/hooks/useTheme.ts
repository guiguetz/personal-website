import { useState, useEffect } from 'react';
import { toggleThemeWithRipple } from '@/utils/themeRipple';

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const dark = localStorage.getItem('theme') !== 'light';
    setIsDark(dark);
    if (!dark) {
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const toggleThemeRipple = (e: MouseEvent) => {
    toggleThemeWithRipple(e);
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleTheme, toggleThemeRipple };
}