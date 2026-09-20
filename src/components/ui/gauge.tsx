'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  showTicks?: boolean;
}

export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      unit = '%',
      size = 140,
      strokeWidth = 10,
      variant = 'default',
      showTicks = true,
      className,
      ...props
    },
    ref
  ) => {
    // Clamp value
    const clampedValue = Math.min(Math.max(value, min), max);
    const percentage = (clampedValue - min) / (max - min);

    // Geometry: 240 degree arc starting at 150deg (bottom-left) to 390deg (bottom-right)
    const startAngle = 135;
    const endAngle = 405;
    const angleRange = endAngle - startAngle; // 270 degrees
    const currentAngle = startAngle + percentage * angleRange;

    const center = size / 2;
    const radius = center - strokeWidth - 4;

    const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians),
      };
    };

    const describeArc = (x: number, y: number, r: number, startA: number, endA: number) => {
      const start = polarToCartesian(x, y, r, endA);
      const end = polarToCartesian(x, y, r, startA);
      const largeArcFlag = endA - startA <= 180 ? '0' : '1';
      return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
    };

    const backgroundArc = describeArc(center, center, radius, startAngle, endAngle);
    const valueArc = describeArc(center, center, radius, startAngle, Math.max(startAngle + 0.1, currentAngle));

    const colorVariants = {
      default: 'stroke-primary text-text-primary',
      accent: 'stroke-[#38bdf8] text-[#38bdf8]',
      success: 'stroke-[#10b981] text-[#10b981]',
      warning: 'stroke-[#f59e0b] text-[#f59e0b]',
      danger: 'stroke-[#ef4444] text-[#ef4444]',
    };

    // Calculate tick marks
    const ticks = React.useMemo(() => {
      if (!showTicks) return [];
      const tickCount = 9;
      return Array.from({ length: tickCount }).map((_, i) => {
        const tickPct = i / (tickCount - 1);
        const tickAngle = startAngle + tickPct * angleRange;
        const outerPt = polarToCartesian(center, center, radius - strokeWidth / 2 - 2, tickAngle);
        const innerPt = polarToCartesian(center, center, radius - strokeWidth / 2 - 6, tickAngle);
        return { x1: innerPt.x, y1: innerPt.y, x2: outerPt.x, y2: outerPt.y, active: tickPct <= percentage };
      });
    }, [showTicks, center, radius, strokeWidth, startAngle, angleRange, percentage]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border/70 tactile-surface select-none',
          className
        )}
        style={{ width: size + 24 }}
        {...props}
      >
        {/* Recessed Bezel Dish */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Defs for subtle glow/bevel */}
            <defs>
              <filter id="gauge-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Background Track Arc (recessed groove) */}
            <path
              d={backgroundArc}
              fill="none"
              stroke="currentColor"
              className="text-secondary opacity-80"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Subtle Tick Marks */}
            {ticks.map((t, idx) => (
              <line
                key={idx}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                className={t.active ? 'text-text-secondary' : 'text-border'}
              />
            ))}

            {/* Active Value Progress Arc */}
            <motion.path
              d={valueArc}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className={colorVariants[variant].split(' ')[0]}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {/* Centered Readout Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-2 pointer-events-none">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-mono font-bold tracking-tight text-text-primary">
                {Math.round(clampedValue)}
              </span>
              {unit && <span className="text-xs font-mono text-text-muted">{unit}</span>}
            </div>
            {label && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                {label}
              </span>
            )}
          </div>
        </div>

        {/* Min / Max bounds footer */}
        <div className="flex items-center justify-between w-full px-2 mt-1 text-[10px] font-mono text-text-muted">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    );
  }
);

Gauge.displayName = 'Gauge';
