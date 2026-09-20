import * as React from 'react';
import { cn } from '@/lib/utils';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'recessed';
}

export function Kbd({ className, children, variant = 'default', ...props }: KbdProps) {
  const variantStyles = {
    default:
      'bg-card border border-border/80 text-text-primary tactile-keycap active:translate-y-[1px]',
    elevated:
      'bg-card border border-border text-text-primary shadow-sm font-semibold',
    recessed:
      'bg-secondary/90 border border-border/50 text-text-muted tactile-well',
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 rounded font-mono text-[11px] select-none tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
