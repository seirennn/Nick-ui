import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'mono' | 'status' | 'engraved' | 'tactile';
export type BadgeStatus = 'neutral' | 'success' | 'warning' | 'error';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: BadgeStatus;
  children: React.ReactNode;
}

const statusDotColors: Record<BadgeStatus, string> = {
  neutral: 'bg-text-muted',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
};

export function Badge({
  className,
  variant = 'default',
  status = 'neutral',
  children,
  ...props
}: BadgeProps) {
  if (variant === 'engraved') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/80 text-text-muted tactile-well border border-border/40 select-none',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === 'tactile') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-card text-text-primary tactile-surface border border-border/60 select-none',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === 'mono') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-text-muted border border-border/50 select-none',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border border-border text-text-muted select-none bg-transparent',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === 'status') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary/80 text-text-primary border border-border/60 select-none',
          className
        )}
        {...props}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', statusDotColors[status])} />
        <span>{children}</span>
      </span>
    );
  }

  if (variant === 'secondary') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-secondary text-text-muted border border-border/50 select-none font-medium',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sidebar-category px-2.5 py-0.5 rounded-md bg-secondary text-text-secondary border border-border/60 select-none',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
