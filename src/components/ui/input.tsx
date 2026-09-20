'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, rightAddon, hasError, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex items-center w-full rounded-lg bg-card border border-border transition-colors group',
          'hover:border-foreground/20 focus-within:border-foreground/40 focus-within:ring-1 focus-within:ring-ring/40',
          hasError && 'border-destructive/60 focus-within:border-destructive focus-within:ring-destructive/30',
          disabled && 'opacity-40 cursor-not-allowed hover:border-border',
          className
        )}
      >
        {leftIcon && (
          <div className="pl-3 pr-1 text-text-muted flex items-center justify-center shrink-0 pointer-events-none select-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            'w-full bg-transparent px-3 py-2 text-ui text-text-primary placeholder:text-text-muted/70',
            'focus:outline-none disabled:cursor-not-allowed',
            leftIcon ? 'pl-1.5' : undefined,
            rightAddon ? 'pr-1.5' : undefined
          )}
          {...props}
        />
        {rightAddon && (
          <div className="pr-2.5 pl-1 text-text-muted flex items-center justify-center shrink-0">
            {rightAddon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
