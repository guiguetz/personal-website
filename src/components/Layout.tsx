import { ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : 'light'}`}>
      <div className="flex">
        {/* Sidebar - fixed on large screens */}
        <Sidebar />
        
        {/* Main content - scrollable */}
        <main className="flex-1 lg:ml-64 overflow-y-auto min-h-screen">
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Content sections */}
          <div className="p-6 lg:p-12 max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}