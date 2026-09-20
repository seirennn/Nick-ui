'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Slider({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Slider',
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalValue;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const percentage = Math.min(100, Math.max(0, ((currentVal - min) / (max - min)) * 100));

  const updateValue = (clientX: number) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawVal = min + pos * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;
    const finalVal = Math.min(max, Math.max(min, steppedVal));

    if (!isControlled) setInternalValue(finalVal);
    onChange?.(finalVal);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    updateValue(e.clientX);
    const onMouseMove = (moveEvent: MouseEvent) => updateValue(moveEvent.clientX);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentVal}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'relative flex items-center w-full h-6 cursor-pointer select-none touch-none',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {/* Recessed Well Track */}
      <div className="relative w-full h-2 rounded-full bg-secondary tactile-well border border-border/60 overflow-hidden">
        {/* Filled Progress Bar */}
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Tactile Thumb Knob */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-card border border-border/80 tactile-surface shadow-md transition-transform duration-100 hover:scale-110 active:scale-95"
        style={{ left: `${percentage}%` }}
      >
        <div className="absolute inset-1 rounded-full border border-black/5 dark:border-white/10" />
      </div>
    </div>
  );
}
