'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'tactile' | 'recessed' | 'default';
  fullWidth?: boolean;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'md',
      variant = 'tactile',
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
    const activeLayoutId = `segmentedActive-${id}`;

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue || options[0]?.value || ''
    );
    const activeValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const handleSelect = (val: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(val);
      }
      onChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex = currentIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % options.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + options.length) % options.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = options.length - 1;
      }

      const nextOption = options[nextIndex];
      if (nextOption && !nextOption.disabled) {
        handleSelect(nextOption.value);
      }
    };

    const sizeClasses = {
      sm: 'h-8 p-0.5 text-xs',
      md: 'h-9 p-1 text-xs sm:text-sm',
      lg: 'h-11 p-1 text-sm sm:text-base',
    };

    const itemSizeClasses = {
      sm: 'px-2.5 py-1',
      md: 'px-3.5 py-1.5',
      lg: 'px-4 py-2',
    };

    const trackVariantClasses = {
      default: 'bg-secondary/60 border-border/80',
      tactile: 'bg-secondary/50 shadow-inner-tactile border-border/80',
      recessed: 'bg-background/80 shadow-inner-tactile border-border/90',
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'relative inline-flex items-center rounded-xl border select-none transition-all',
          sizeClasses[size],
          trackVariantClasses[variant],
          fullWidth ? 'w-full' : 'w-auto',
          className
        )}
        {...props}
      >
        {options.map((option, idx) => {
          const isSelected = activeValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                'relative z-10 inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer',
                itemSizeClasses[size],
                fullWidth ? 'flex-1' : 'flex-none',
                isSelected
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-secondary/30',
                option.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId={activeLayoutId}
                  className="absolute inset-0 rounded-lg bg-card border border-border/80 shadow-tactile -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}

              {option.icon && (
                <span className={cn('shrink-0 transition-colors', isSelected ? 'text-text-primary' : 'text-text-muted')}>
                  {option.icon}
                </span>
              )}

              <span className="truncate">{option.label}</span>

              {option.badge !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded text-[10px] font-mono leading-none',
                    isSelected
                      ? 'bg-secondary text-text-primary border border-border/60'
                      : 'bg-secondary/60 text-text-muted border border-border/40'
                  )}
                >
                  {option.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
