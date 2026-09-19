import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function DebugPaletteSwitcher() {
  const [show, setShow] = useState(() => {
    return window.location.search.includes('debug=true');
  });

  const [palette, setPalette] = useState<'dark' | 'light' | 'vibrant'>('dark');

  useEffect(() => {
    if (!show) return;
    const root = document.documentElement;
    if (palette === 'dark') {
      // dark sophisticated (current)
      root.style.setProperty('--background', '222.2 84% 4.9%');
      root.style.setProperty('--foreground', '210 40% 98%');
      root.style.setProperty('--primary', '240 63% 66%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--border', '217.2 32.6% 17.5%');
      root.style.setProperty('--input', '217.2 32.6% 17.5%');
      root.style.setProperty('--ring', '212.7 26.8% 83.9%');
    } else if (palette === 'light') {
      // light minimal
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2 84% 4.9%');
      root.style.setProperty('--primary', '222.2 47.4% 11.2%');
      root.style.setProperty('--primary-foreground', '210 40% 98%');
      root.style.setProperty('--border', '214.3 31.8% 91.4%');
      root.style.setProperty('--input', '214.3 31.8% 91.4%');
      root.style.setProperty('--ring', '222.2 84% 4.9%');
    } else if (palette === 'vibrant') {
      // vibrant creative
      root.style.setProperty('--background', '15 10% 10%');
      root.style.setProperty('--foreground', '0 0% 100%');
      root.style.setProperty('--primary', '300 80% 50%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--border', '30 50% 50%');
      root.style.setProperty('--input', '30 50% 50%');
      root.style.setProperty('--ring', '300 80% 50%');
    }
  }, [palette]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-400">Debug Palette:</span>
        <div className="flex space-x-1">
          <Button
            variant={palette === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPalette('dark')}
          >
            Dark
          </Button>
          <Button
            variant={palette === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPalette('light')}
          >
            Light
          </Button>
          <Button
            variant={palette === 'vibrant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPalette('vibrant')}
          >
            Vibrant
          </Button>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => setShow(false)}>
        Close
      </Button>
    </div>
  );
}