'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      disabled,
      label,
      description,
      id,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    };

    const handleClick = () => {
      toggle();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <div className={cn('inline-flex items-start gap-2.5 select-none', disabled && 'opacity-45 pointer-events-none')}>
        <div
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : isChecked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative flex items-center justify-center w-[18px] h-[18px] mt-0.5 rounded-[5px] transition-all cursor-pointer outline-hidden',
            'border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isChecked || indeterminate
              ? 'bg-primary text-primary-foreground border-primary/90 shadow-xs'
              : 'bg-card border-border/80 tactile-well hover:border-text-muted/60',
            className
          )}
        >
          {/* Hidden native input for form compatibility */}
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            checked={isChecked}
            disabled={disabled}
            onChange={(e) => {
              if (!isControlled) {
                setInternalChecked(e.target.checked);
              }
              onCheckedChange?.(e.target.checked);
            }}
            className="sr-only"
            tabIndex={-1}
            {...props}
          />

          <AnimatePresence initial={false}>
            {isChecked && !indeterminate && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.8]" />
              </motion.span>
            )}
            {indeterminate && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="flex items-center justify-center"
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {(label || description) && (
          <label htmlFor={inputId} onClick={handleClick} className="flex flex-col cursor-pointer leading-tight">
            {label && <span className="text-xs font-medium text-text-primary">{label}</span>}
            {description && <span className="text-[11px] text-text-muted mt-0.5">{description}</span>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
