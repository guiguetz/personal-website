import { useState, useEffect } from 'react';

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

  return { isDark, toggleTheme };
}