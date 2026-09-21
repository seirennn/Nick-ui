import * as React from 'react';
import { cn } from '@/lib/utils';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'recessed' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function Kbd({
  className,
  children,
  variant = 'default',
  size = 'sm',
  ...props
}: KbdProps) {
  const variantStyles = {
    default:
      'bg-[#f6f4ee] dark:bg-[#1a1917] border border-border/90 text-text-primary shadow-[0_1.5px_0_0_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:shadow-[0_1.5px_0_0_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.05)] active:translate-y-[1px] active:shadow-none',
    elevated:
      'bg-card border border-border text-text-primary shadow-[0_2.5px_0_0_rgba(0,0,0,0.14),0_3px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_2.5px_0_0_rgba(255,255,255,0.1),0_3px_6px_rgba(0,0,0,0.4)] active:translate-y-[1.5px] active:shadow-none font-medium',
    recessed:
      'bg-secondary/50 border border-border/50 text-text-muted shadow-inner',
    outline:
      'bg-transparent border border-border/80 text-text-secondary hover:text-text-primary',
  };

  const sizeStyles = {
    xs: 'min-w-[18px] h-4.5 px-1 text-[9.5px] rounded-[4px]',
    sm: 'min-w-[22px] h-5.5 px-1.5 text-[11px] rounded-[5px]',
    md: 'min-w-[26px] h-6.5 px-2 text-xs rounded-md',
    lg: 'min-w-[32px] h-8 px-2.5 text-sm rounded-lg',
  };

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center font-mono font-medium select-none tracking-tight leading-none transition-all',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
