'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface KnobProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  size?: number;
  label?: string;
  unit?: string;
  variant?: 'tactile' | 'recessed' | 'default';
  showTicks?: boolean;
  showValue?: boolean;
  disabled?: boolean;
}

export const Knob = React.forwardRef<HTMLDivElement, KnobProps>(
  (
    {
      value: controlledValue,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      size = 80,
      label,
      unit = '',
      variant = 'tactile',
      showTicks = true,
      showValue = true,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const currentValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const [isDragging, setIsDragging] = React.useState(false);
    const startYRef = React.useRef(0);
    const startValRef = React.useRef(currentValue);

    // 270 degree rotation range: -135deg to +135deg
    const clampedValue = Math.min(Math.max(currentValue, min), max);
    const percentage = (clampedValue - min) / (max - min || 1);
    const rotationDeg = -135 + percentage * 270;

    const updateValue = (newVal: number) => {
      const stepped = Math.round((newVal - min) / step) * step + min;
      const clamped = Math.min(Math.max(stepped, min), max);
      if (controlledValue === undefined) {
        setUncontrolledValue(clamped);
      }
      onChange?.(clamped);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      startYRef.current = e.clientY;
      startValRef.current = currentValue;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = startYRef.current - moveEvent.clientY;
        const range = max - min;
        const change = (deltaY / 150) * range;
        updateValue(startValRef.current + change);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleWheel = (e: React.WheelEvent) => {
      if (disabled) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? step : -step;
      updateValue(currentValue + delta);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        updateValue(currentValue + step);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        updateValue(currentValue - step);
      } else if (e.key === 'Home') {
        e.preventDefault();
        updateValue(min);
      } else if (e.key === 'End') {
        e.preventDefault();
        updateValue(max);
      }
    };

    // Calculate calibration ticks around 270deg
    const numTicks = 13;
    const ticks = Array.from({ length: numTicks }, (_, i) => {
      const angle = -135 + (i / (numTicks - 1)) * 270;
      const rad = (angle - 90) * (Math.PI / 180);
      const rOuter = size / 2 - 2;
      const rInner = size / 2 - 6;
      const cx = size / 2;
      const cy = size / 2;
      const x1 = cx + rOuter * Math.cos(rad);
      const y1 = cy + rOuter * Math.sin(rad);
      const x2 = cx + rInner * Math.cos(rad);
      const y2 = cy + rInner * Math.sin(rad);
      const isPassed = angle <= rotationDeg;

      return { angle, x1, y1, x2, y2, isPassed };
    });

    const knobRadius = size / 2 - 12;

    return (
      <div
        ref={ref}
        className={cn('inline-flex flex-col items-center select-none gap-2', className)}
        {...props}
      >
        {label && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted text-center">
            {label}
          </span>
        )}

        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={clampedValue}
          aria-label={label || 'Rotary knob'}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          style={{ width: size, height: size }}
          className={cn(
            'relative flex items-center justify-center cursor-ns-resize focus:outline-none rounded-full',
            disabled && 'opacity-40 cursor-not-allowed'
          )}
        >
          {/* Outer SVG Tick Scale */}
          {showTicks && (
            <svg
              width={size}
              height={size}
              className="absolute inset-0 pointer-events-none"
            >
              {ticks.map((t, i) => (
                <line
                  key={i}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.isPassed ? 'var(--text-primary)' : 'var(--border)'}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  className="transition-colors duration-100"
                />
              ))}
            </svg>
          )}

          {/* Physical Knob Disc */}
          <div
            style={{
              width: knobRadius * 2,
              height: knobRadius * 2,
              transform: `rotate(${rotationDeg}deg)`,
            }}
            className={cn(
              'relative rounded-full flex items-center justify-center transition-transform duration-75 ease-out',
              variant === 'tactile' &&
                'bg-gradient-to-b from-card to-secondary/80 border border-border/80 shadow-tactile',
              variant === 'recessed' &&
                'bg-background border border-border/90 shadow-inner-tactile',
              variant === 'default' &&
                'bg-card border border-border shadow-xs'
            )}
          >
            {/* Radial Specular Highlight */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-transparent via-foreground/[0.03] to-foreground/[0.08] pointer-events-none" />

            {/* Rotary Indicator Notch */}
            <div className="absolute top-1.5 w-1 h-3 rounded-full bg-text-primary shadow-2xs" />

            {/* Center Metallic Pivot Cap */}
            <div className="w-4 h-4 rounded-full bg-secondary border border-border/70 shadow-inner-tactile" />
          </div>
        </div>

        {/* Value Telemetry Readout Pill */}
        {showValue && (
          <div className="px-2 py-0.5 rounded-md bg-secondary/60 border border-border/50 text-[11px] font-mono text-text-primary">
            {clampedValue}
            {unit}
          </div>
        )}
      </div>
    );
  }
);

Knob.displayName = 'Knob';
