'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadioContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioContext = React.createContext<RadioContextType | undefined>(undefined);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  name,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioContext.Provider value={{ value, onValueChange: handleValueChange, disabled, name }}>
      <div role="radiogroup" className={cn('flex flex-col gap-2.5', className)} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export const RadioGroupItem = React.forwardRef<HTMLDivElement, RadioGroupItemProps>(
  ({ value, label, description, disabled: itemDisabled, className, id, ...props }, ref) => {
    const context = React.useContext(RadioContext);
    if (!context) {
      throw new Error('RadioGroupItem must be used within a RadioGroup');
    }

    const isChecked = context.value === value;
    const isDisabled = itemDisabled || context.disabled;
    const generatedId = React.useId();
    const itemId = id || generatedId;

    const handleClick = () => {
      if (isDisabled) return;
      context.onValueChange?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        context.onValueChange?.(value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-start gap-2.5 select-none cursor-pointer',
          isDisabled && 'opacity-45 pointer-events-none',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div
          role="radio"
          aria-checked={isChecked}
          tabIndex={isDisabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative flex items-center justify-center w-[18px] h-[18px] mt-0.5 rounded-full transition-all outline-hidden',
            'border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isChecked
              ? 'border-primary bg-card'
              : 'border-border/80 bg-card tactile-well hover:border-text-muted/60'
          )}
        >
          <AnimatePresence initial={false}>
            {isChecked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-2.5 h-2.5 rounded-full bg-primary shadow-xs"
              />
            )}
          </AnimatePresence>
        </div>

        {(label || description) && (
          <div className="flex flex-col leading-tight">
            {label && <span className="text-xs font-medium text-text-primary">{label}</span>}
            {description && <span className="text-[11px] text-text-muted mt-0.5">{description}</span>}
          </div>
        )}
      </div>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';
