'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      className,
      size = 'md',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    const dimensions = {
      sm: { track: 'w-8 h-4.5 p-0.5', thumb: 'w-3.5 h-3.5', travel: 14 },
      md: { track: 'w-11 h-6 p-0.5', thumb: 'w-5 h-5', travel: 20 },
      lg: { track: 'w-14 h-7.5 p-1', thumb: 'w-5.5 h-5.5', travel: 26 },
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={ariaLabel || 'Toggle switch'}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 select-none',
          'tactile-well border border-border/80',
          isChecked ? 'bg-primary/90' : 'bg-secondary',
          disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          dimensions.track,
          className
        )}
        {...props}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          animate={{ x: isChecked ? dimensions.travel : 0 }}
          className={cn(
            'pointer-events-none block rounded-full bg-card shadow-sm border border-border/50 tactile-surface',
            dimensions.thumb
          )}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
