'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DotMatrixColumn {
  id: string;
  label: string;
  period: 'previous' | 'current';
  dots: number; // number of dots filled in column (1 to maxDots)
  value: string;
}

export interface DotMatrixChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  metric?: string;
  timeframe?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  onTimeframeChange?: (tf: 'DAILY' | 'WEEKLY' | 'MONTHLY') => void;
  columns?: DotMatrixColumn[];
  previousLabel?: string;
  currentLabel?: string;
  footerTagline?: string;
  maxDots?: number;
}

const DEFAULT_COLUMNS: DotMatrixColumn[] = [
  // Previous period (8 columns)
  { id: 'm1', label: 'May 04', period: 'previous', dots: 2, value: '$1,200' },
  { id: 'm2', label: 'May 08', period: 'previous', dots: 4, value: '$2,100' },
  { id: 'm3', label: 'May 12', period: 'previous', dots: 6, value: '$3,400' },
  { id: 'm4', label: 'May 16', period: 'previous', dots: 3, value: '$1,800' },
  { id: 'm5', label: 'May 20', period: 'previous', dots: 5, value: '$2,900' },
  { id: 'm6', label: 'May 24', period: 'previous', dots: 7, value: '$3,800' },
  { id: 'm7', label: 'May 28', period: 'previous', dots: 4, value: '$2,200' },
  { id: 'm8', label: 'May 31', period: 'previous', dots: 3, value: '$1,600' },

  // Current period (8 columns with prominent progression)
  { id: 'j1', label: 'Jun 04', period: 'current', dots: 5, value: '$3,900' },
  { id: 'j2', label: 'Jun 08', period: 'current', dots: 8, value: '$6,400' },
  { id: 'j3', label: 'Jun 12', period: 'current', dots: 12, value: '$9,800' },
  { id: 'j4', label: 'Jun 16', period: 'current', dots: 10, value: '$8,400' },
  { id: 'j5', label: 'Jun 20', period: 'current', dots: 7, value: '$5,800' },
  { id: 'j6', label: 'Jun 24', period: 'current', dots: 6, value: '$4,900' },
  { id: 'j7', label: 'Jun 28', period: 'current', dots: 5, value: '$4,200' },
  { id: 'j8', label: 'Jun 30', period: 'current', dots: 4, value: '$3,500' },
];

export const DotMatrixChart = React.forwardRef<HTMLDivElement, DotMatrixChartProps>(
  (
    {
      className,
      title = 'REVENUE VELOCITY',
      metric = '+326%',
      timeframe: controlledTimeframe,
      onTimeframeChange,
      columns = DEFAULT_COLUMNS,
      previousLabel = 'MAY $3,250',
      currentLabel = 'JUN $12,392',
      footerTagline = 'HIGH THROUGHPUT | 2024 | ZERO LOSS',
      maxDots = 12,
      ...props
    },
    ref
  ) => {
    const [internalTimeframe, setInternalTimeframe] = React.useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('MONTHLY');
    const [hoveredColumn, setHoveredColumn] = React.useState<DotMatrixColumn | null>(null);

    const activeTimeframe = controlledTimeframe ?? internalTimeframe;
    const handleTimeframeClick = (tf: 'DAILY' | 'WEEKLY' | 'MONTHLY') => {
      setInternalTimeframe(tf);
      onTimeframeChange?.(tf);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-[26px] border border-border/70 bg-card p-6 sm:p-7',
          'shadow-tactile select-none transition-colors overflow-hidden flex flex-col justify-between',
          className
        )}
        {...props}
      >
        {/* Header: Title / Metric & Timeframe Selector */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-border/40">
          <div className="min-w-0">
            <span className="text-[10.5px] font-mono tracking-wider text-text-muted uppercase block truncate">
              {title}
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-medium tracking-tight text-text-primary mt-1">
              {metric}
            </div>
          </div>

          {/* Precision Capsule Filter Pills */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-secondary/50 border border-border/60 shrink-0">
            {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map((tf) => {
              const isActive = activeTimeframe === tf;
              const label = tf === 'MONTHLY' ? 'MTH' : tf === 'WEEKLY' ? 'WK' : 'DAY';
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => handleTimeframeClick(tf)}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md transition-all cursor-pointer select-none',
                    isActive
                      ? 'bg-card text-text-primary font-medium shadow-2xs border border-border/50'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Hardware Matrix Area */}
        <div className="pt-6 pb-2">
          <div className="relative flex items-end justify-between gap-1 sm:gap-2 h-40 px-1">
            {/* Tooltip Overlay */}
            {hoveredColumn && (
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 right-1 z-20 px-2.5 py-1 rounded-lg bg-card border border-border/80 text-[11px] font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-1.5"
              >
                <span className="text-text-muted">{hoveredColumn.label}:</span>
                <span className="font-semibold text-text-primary">{hoveredColumn.value}</span>
              </motion.div>
            )}

            {/* Render Matrix Columns */}
            {columns.map((col) => {
              const isHovered = hoveredColumn?.id === col.id;
              const isCurrent = col.period === 'current';

              return (
                <div
                  key={col.id}
                  onMouseEnter={() => setHoveredColumn(col)}
                  onMouseLeave={() => setHoveredColumn(null)}
                  className={cn(
                    'flex-1 flex flex-col items-center justify-end h-full gap-1.5 cursor-pointer py-1.5 rounded-lg transition-colors',
                    isHovered && 'bg-secondary/30'
                  )}
                >
                  {/* Vertical stack of matrix dots */}
                  {Array.from({ length: maxDots }).map((_, index) => {
                    const dotIndexFromBottom = maxDots - 1 - index;
                    const isFilled = dotIndexFromBottom < col.dots;

                    return (
                      <div
                        key={index}
                        className={cn(
                          'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-150',
                          isFilled
                            ? isCurrent
                              ? isHovered
                                ? 'bg-text-primary scale-125 shadow-[0_0_8px_rgba(var(--foreground-rgb),0.2)]'
                                : 'bg-text-primary/85'
                              : isHovered
                              ? 'bg-text-muted scale-115'
                              : 'bg-text-muted/50'
                            : 'bg-foreground/[0.04] dark:bg-foreground/[0.08] border border-border/20'
                        )}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Period Labels */}
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-3.5 px-1 border-t border-border/30 mt-2">
            <div className="tracking-wider text-text-muted/70 truncate">
              {previousLabel}
            </div>
            <div className="tracking-wider text-text-primary font-medium truncate">
              {currentLabel}
            </div>
          </div>
        </div>

        {/* Footer Tagline */}
        {footerTagline && (
          <div className="pt-3 border-t border-border/30 flex items-center justify-end">
            <div className="text-[9.5px] font-mono tracking-widest text-text-muted/60 uppercase truncate">
              {footerTagline}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DotMatrixChart.displayName = 'DotMatrixChart';
