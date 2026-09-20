'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, disabled, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          'w-full rounded-lg bg-card border border-border px-3 py-2.5 text-ui text-text-primary placeholder:text-text-muted/70 transition-colors',
          'hover:border-foreground/20 focus:outline-none focus:border-foreground/40 focus:ring-1 focus:ring-ring/40',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border',
          hasError && 'border-destructive/60 focus:border-destructive focus:ring-destructive/30',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
