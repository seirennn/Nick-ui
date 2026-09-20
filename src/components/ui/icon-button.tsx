'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export type IconButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isActive?: boolean;
  shape?: 'rounded' | 'circle';
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground hover:opacity-90 active:opacity-95 shadow-2xs',
  secondary:
    'bg-card border border-border text-text-primary hover:bg-accent hover:border-foreground/20 shadow-2xs',
  outline:
    'bg-transparent border border-border text-text-secondary hover:text-text-primary hover:bg-secondary/60 hover:border-foreground/20',
  ghost:
    'bg-transparent text-text-muted hover:text-text-primary hover:bg-secondary/60',
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-7 h-7 p-1 text-xs',
  md: 'w-8 h-8 p-1.5 text-sm',
  lg: 'w-10 h-10 p-2 text-base',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      'aria-label': ariaLabel,
      variant = 'ghost',
      size = 'md',
      isActive = false,
      shape = 'rounded',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : { scale: 1.04 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center cursor-pointer select-none transition-colors shrink-0',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50',
          'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed',
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          variantStyles[variant],
          sizeStyles[size],
          isActive && 'bg-sidebar-accent text-text-primary border-border',
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center leading-none">{icon}</span>
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
