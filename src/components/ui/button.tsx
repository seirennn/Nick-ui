'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'tactile' | 'recessed';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonDepth = 'subtle' | 'medium' | 'deep';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  depth?: ButtonDepth;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground hover:opacity-90 active:opacity-95 shadow-2xs font-medium',
  secondary:
    'bg-card border border-border text-text-primary hover:bg-accent hover:border-foreground/20 font-medium shadow-2xs',
  outline:
    'bg-transparent border border-border text-text-primary hover:bg-secondary/60 hover:border-foreground/20 font-medium',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-secondary/60 font-medium',
  subtle:
    'bg-secondary/80 border border-border/60 text-text-primary hover:bg-secondary font-medium',
  tactile:
    'bg-card border border-border/80 text-text-primary font-medium hover:border-foreground/30',
  recessed:
    'bg-secondary text-text-secondary hover:text-text-primary font-medium',
};

const getDepthClass = (variant: ButtonVariant, depth: ButtonDepth = 'medium') => {
  if (variant === 'tactile') {
    switch (depth) {
      case 'subtle':
        return 'tactile-btn-subtle';
      case 'deep':
        return 'tactile-btn-deep';
      case 'medium':
      default:
        return 'tactile-btn';
    }
  }
  if (variant === 'recessed') {
    switch (depth) {
      case 'subtle':
        return 'tactile-recessed-subtle';
      case 'deep':
        return 'tactile-recessed-deep';
      case 'medium':
      default:
        return 'tactile-recessed';
    }
  }
  return '';
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 h-8',
  md: 'px-4 py-2 text-ui rounded-lg gap-2 h-9',
  lg: 'px-5 py-2.5 text-ui rounded-xl gap-2.5 h-11',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      depth = 'medium',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: depth === 'deep' ? 0.96 : 0.98 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer tracking-tight transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50',
          'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed',
          variantStyles[variant],
          getDepthClass(variant, depth),
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="w-3.5 h-3.5 animate-spin text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="shrink-0 leading-none">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
