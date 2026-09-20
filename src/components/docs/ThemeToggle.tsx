'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-7 h-7 rounded-md bg-secondary/40" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer select-none',
        className
      )}
      aria-label={isDark ? 'Switch to warm light mode' : 'Switch to studio dark mode'}
      title={isDark ? 'Warm Light mode' : 'Studio Dark mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-text-muted hover:text-text-primary transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-text-muted hover:text-text-primary transition-colors" />
      )}
    </button>
  );
}
