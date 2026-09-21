'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RadialMeterSeries {
  id: string;
  label: string;
  value: number; // 0 to 100
  color: string;
}

export interface RadialMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  series: RadialMeterSeries[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
}

export function RadialMeter({
  series,
  size = 260,
  strokeWidth = 10,
  centerLabel = 'Capacity',
  centerValue,
  showLegend = true,
  className,
  ...props
}: RadialMeterProps) {
  const center = size / 2;
  const gap = 6;

  // Calculate primary display value (either passed explicitly or average of series)
  const displayValue =
    centerValue !== undefined
      ? centerValue
      : `${Math.round(series.reduce((acc, s) => acc + s.value, 0) / (series.length || 1))}%`;

  return (
    <div
      className={cn(
        'relative rounded-[24px] border border-border/70 bg-card p-5 select-none shadow-tactile flex flex-col items-center justify-center gap-4 overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible block">
          {series.map((s, idx) => {
            const currentRadius = center - strokeWidth / 2 - idx * (strokeWidth + gap) - 10;
            if (currentRadius <= 0) return null;

            const circumference = 2 * Math.PI * currentRadius;
            const progress = Math.max(0, Math.min(100, s.value)) / 100;
            const strokeDashoffset = circumference * (1 - progress);

            return (
              <g key={s.id}>
                {/* Recessed Track Well */}
                <circle
                  cx={center}
                  cy={center}
                  r={currentRadius}
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth={strokeWidth}
                  className="opacity-40"
                />

                {/* Animated Progress Arc */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={currentRadius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    transform: 'rotate(-90deg)',
                  }}
                  className="drop-shadow-xs"
                />
              </g>
            );
          })}
        </svg>

        {/* Center Circular Readout Well */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center leading-none">
          <span className="text-2xl sm:text-3xl font-mono font-semibold tracking-tight text-text-primary">
            {displayValue}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted mt-1">
            {centerLabel}
          </span>
        </div>
      </div>

      {/* Legend Breakdown */}
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 border-t border-border/60 w-full text-xs font-mono">
          {series.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shadow-2xs" style={{ backgroundColor: s.color }} />
              <span className="text-text-secondary">{s.label}:</span>
              <span className="font-medium text-text-primary">{s.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
