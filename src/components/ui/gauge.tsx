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
  variant?: 'default' | 'tactile' | 'recessed' | 'warning' | 'critical';
  showTicks?: boolean;
  showNeedle?: boolean;
}

export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      label,
      unit = '%',
      size = 160,
      strokeWidth = 8,
      variant = 'default',
      showTicks = true,
      showNeedle = true,
      className,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
    const filterId = `gauge-filter-${id}`;
    const arcGradientId = `gauge-gradient-${id}`;

    // Clamp value
    const clampedValue = Math.min(Math.max(value, min), max);
    const percentage = (clampedValue - min) / (max - min || 1);

    // Geometry: 240 degree industrial dial arc from 150deg (bottom-left) to 390deg (bottom-right)
    const startAngle = 150;
    const endAngle = 390;
    const angleRange = endAngle - startAngle; // 240 degrees
    const currentAngle = startAngle + percentage * angleRange;

    const center = size / 2;
    const radius = center - strokeWidth - 14;

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
    const valueArc = describeArc(center, center, radius, startAngle, Math.max(startAngle + 0.5, currentAngle));

    // Calibrated subdivision ticks (major ticks with longer lengths, minor ticks with shorter lengths)
    const ticks = React.useMemo(() => {
      if (!showTicks) return [];
      const majorCount = 9; // every 30 degrees
      const minorBetween = 3; // 3 minor ticks between each major tick
      const totalTicks = (majorCount - 1) * (minorBetween + 1) + 1;

      return Array.from({ length: totalTicks }).map((_, i) => {
        const tickPct = i / (totalTicks - 1);
        const tickAngle = startAngle + tickPct * angleRange;
        const isMajor = i % (minorBetween + 1) === 0;

        const outerR = radius + strokeWidth / 2 + (isMajor ? 6 : 4);
        const innerR = radius + strokeWidth / 2 + 1;

        const outerPt = polarToCartesian(center, center, outerR, tickAngle);
        const innerPt = polarToCartesian(center, center, innerR, tickAngle);
        const isActive = tickPct <= percentage;

        return {
          x1: innerPt.x,
          y1: innerPt.y,
          x2: outerPt.x,
          y2: outerPt.y,
          isMajor,
          isActive,
        };
      });
    }, [showTicks, center, radius, strokeWidth, startAngle, angleRange, percentage]);

    // Needle tip coordinate
    const needleLength = radius - 4;
    const needleTip = polarToCartesian(center, center, needleLength, currentAngle);

    // Variant styling
    const variantStyles = {
      default: 'bg-card border-border/75 shadow-tactile',
      tactile: 'bg-card border-border/80 shadow-tactile [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.12)]',
      recessed: 'bg-secondary/40 border-border/50 shadow-inner',
      warning: 'bg-card border-amber-500/30 shadow-tactile',
      critical: 'bg-card border-destructive/30 shadow-tactile',
    };

    const activeStrokeColor =
      variant === 'warning'
        ? 'var(--color-amber-500, #d97706)'
        : variant === 'critical'
        ? 'var(--color-destructive, #dc2626)'
        : 'var(--text-primary)';

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex flex-col items-center justify-center p-5 rounded-[26px] border select-none transition-all',
          variantStyles[variant],
          className
        )}
        style={{ width: size + 36 }}
        {...props}
      >
        {/* Recessed Mechanical Dial Bezel */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible block">
            <defs>
              <linearGradient id={arcGradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={activeStrokeColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={activeStrokeColor} stopOpacity="0.95" />
              </linearGradient>

              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Concentric Milled Outer Bezel Guide */}
            <circle
              cx={center}
              cy={center}
              r={radius + strokeWidth / 2 + 10}
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.75"
              strokeDasharray="2 4"
              className="opacity-40"
            />

            {/* Recessed Track Well Arc */}
            <path
              d={backgroundArc}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="opacity-90"
            />

            {/* Calibrated Division Ticks */}
            {ticks.map((t, idx) => (
              <line
                key={idx}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                strokeWidth={t.isMajor ? 1.5 : 0.75}
                strokeLinecap="round"
                className={cn(
                  'transition-colors duration-150',
                  t.isActive
                    ? 'text-text-primary opacity-90'
                    : t.isMajor
                    ? 'text-text-muted/60 opacity-60'
                    : 'text-border opacity-40'
                )}
              />
            ))}

            {/* Active Illuminated Value Arc */}
            <motion.path
              d={valueArc}
              fill="none"
              stroke={`url(#${arcGradientId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Mechanical Hardware Needle */}
            {showNeedle && (
              <g>
                {/* Needle Ray */}
                <motion.line
                  x1={center}
                  y1={center}
                  x2={needleTip.x}
                  y2={needleTip.y}
                  stroke={activeStrokeColor}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="opacity-90 drop-shadow-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Central Metallic Pivot Hub */}
                <circle
                  cx={center}
                  cy={center}
                  r="7"
                  className="fill-card stroke-border/90"
                  strokeWidth="1.5"
                />
                <circle
                  cx={center}
                  cy={center}
                  r="3"
                  className="fill-text-primary opacity-80"
                />
              </g>
            )}
          </svg>

          {/* Centered Readout Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-mono font-medium tracking-tight text-text-primary">
                {Math.round(clampedValue)}
              </span>
              {unit && (
                <span className="text-xs font-mono text-text-muted font-normal">
                  {unit}
                </span>
              )}
            </div>
            {label && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                {label}
              </span>
            )}
          </div>
        </div>

        {/* Min / Max Range Indicators */}
        <div className="flex items-center justify-between w-full px-3 pt-3 border-t border-border/30 mt-2 text-[10px] font-mono text-text-muted">
          <span>{min}{unit}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>{max}{unit}</span>
        </div>
      </div>
    );
  }
);

Gauge.displayName = 'Gauge';
