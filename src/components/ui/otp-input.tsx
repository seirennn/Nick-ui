'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type OtpInputVariant = 'default' | 'tactile' | 'recessed';
export type OtpInputSize = 'sm' | 'md' | 'lg';

export interface OtpInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  mask?: boolean;
  variant?: OtpInputVariant;
  size?: OtpInputSize;
  hasSeparator?: boolean;
  separatorIndex?: number;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      disabled = false,
      autoFocus = false,
      mask = false,
      variant = 'tactile',
      size = 'md',
      hasSeparator = true,
      separatorIndex,
      error = false,
      className,
      'aria-label': ariaLabel = 'Verification Code',
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const sepIndex = separatorIndex ?? Math.floor(length / 2);

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const digits = React.useMemo(() => {
      const arr = new Array(length).fill('');
      for (let i = 0; i < length; i++) {
        arr[i] = currentValue[i] || '';
      }
      return arr;
    }, [currentValue, length]);

    const updateValue = (newVal: string) => {
      const sanitized = newVal.slice(0, length);
      if (!isControlled) {
        setInternalValue(sanitized);
      }
      onChange?.(sanitized);
      if (sanitized.length === length) {
        onComplete?.(sanitized);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const currentDigit = digits[index];
        if (currentDigit) {
          const nextVal = digits.map((d, i) => (i === index ? '' : d)).join('');
          updateValue(nextVal);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          const nextVal = digits.map((d, i) => (i === index - 1 ? '' : d)).join('');
          updateValue(nextVal);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const char = val.slice(-1);

      if (!/^\d*$/.test(char)) {
        return;
      }

      const nextDigits = [...digits];
      nextDigits[index] = char;
      const nextVal = nextDigits.join('');
      updateValue(nextVal);

      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
      if (pastedData) {
        updateValue(pastedData);
        const focusIdx = Math.min(pastedData.length, length - 1);
        inputRefs.current[focusIdx]?.focus();
      }
    };

    const sizeClasses = {
      sm: 'w-8 h-10 text-sm font-medium rounded-lg',
      md: 'w-11 h-13 text-lg font-mono rounded-xl',
      lg: 'w-14 h-16 text-xl font-mono rounded-xl',
    };

    const variantClasses = {
      default:
        'bg-background border border-border text-foreground focus:border-foreground/50 focus:ring-1 focus:ring-ring/40',
      tactile:
        'bg-card border border-border/80 text-foreground shadow-tactile focus:border-foreground/40 focus:ring-1 focus:ring-ring/30 focus:-translate-y-0.5 transition-all duration-150',
      recessed:
        'bg-secondary/70 border border-border/60 text-foreground shadow-recessed focus:border-foreground/40 focus:ring-1 focus:ring-ring/30 transition-all duration-150',
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn('inline-flex items-center gap-2', className)}
      >
        {digits.map((digit, idx) => {
          const isCurrentActive =
            !disabled && (digits.findIndex((d) => d === '') === idx || (idx === length - 1 && digits[idx] !== ''));

          return (
            <React.Fragment key={idx}>
              {hasSeparator && idx === sepIndex && (
                <div
                  aria-hidden="true"
                  className="w-2.5 h-[1.5px] bg-border mx-1 self-center rounded-full opacity-60"
                />
              )}
              <input
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={mask && digit ? '•' : digit}
                disabled={disabled}
                aria-label={`Digit ${idx + 1} of ${length}`}
                onChange={(e) => handleChange(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                className={cn(
                  'text-center select-none outline-none transition-all',
                  sizeClasses[size],
                  variantClasses[variant],
                  disabled && 'opacity-40 cursor-not-allowed shadow-none',
                  error && 'border-destructive/60 text-destructive focus:border-destructive focus:ring-destructive/30',
                  !digit && isCurrentActive && !disabled && 'border-foreground/30'
                )}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

OtpInput.displayName = 'OtpInput';
