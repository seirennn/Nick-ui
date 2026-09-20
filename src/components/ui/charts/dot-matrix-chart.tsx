'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DotMatrixColumn {
  id: string;
  label: string;
  period: 'previous' | 'current';
  dots: number; // number of dots in column (e.g. 1 to 14)
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
  // Previous period (e.g. May)
  { id: 'm1', label: 'May 02', period: 'previous', dots: 2, value: '$1,200' },
  { id: 'm2', label: 'May 06', period: 'previous', dots: 4, value: '$2,100' },
  { id: 'm3', label: 'May 10', period: 'previous', dots: 7, value: '$3,800' },
  { id: 'm4', label: 'May 14', period: 'previous', dots: 3, value: '$1,800' },
  { id: 'm5', label: 'May 18', period: 'previous', dots: 2, value: '$1,100' },
  { id: 'm6', label: 'May 22', period: 'previous', dots: 5, value: '$2,900' },
  { id: 'm7', label: 'May 26', period: 'previous', dots: 6, value: '$3,250' },
  { id: 'm8', label: 'May 30', period: 'previous', dots: 2, value: '$1,400' },
  { id: 'm9', label: 'May 31', period: 'previous', dots: 4, value: '$2,200' },
  { id: 'm10', label: 'May 31', period: 'previous', dots: 3, value: '$1,900' },
  { id: 'm11', label: 'May 31', period: 'previous', dots: 4, value: '$2,400' },
  { id: 'm12', label: 'May 31', period: 'previous', dots: 2, value: '$1,200' },
  { id: 'm13', label: 'May 31', period: 'previous', dots: 4, value: '$2,100' },

  // Current period (e.g. Jun) with prominent peak
  { id: 'j1', label: 'Jun 02', period: 'current', dots: 6, value: '$4,500' },
  { id: 'j2', label: 'Jun 05', period: 'current', dots: 12, value: '$9,800' },
  { id: 'j3', label: 'Jun 08', period: 'current', dots: 10, value: '$8,400' },
  { id: 'j4', label: 'Jun 12', period: 'current', dots: 8, value: '$6,700' },
  { id: 'j5', label: 'Jun 15', period: 'current', dots: 6, value: '$5,100' },
  { id: 'j6', label: 'Jun 18', period: 'current', dots: 5, value: '$4,200' },
  { id: 'j7', label: 'Jun 20', period: 'current', dots: 4, value: '$3,400' },
  { id: 'j8', label: 'Jun 22', period: 'current', dots: 2, value: '$1,800' },
  { id: 'j9', label: 'Jun 24', period: 'current', dots: 2, value: '$1,900' },
  { id: 'j10', label: 'Jun 25', period: 'current', dots: 6, value: '$5,200' },
  { id: 'j11', label: 'Jun 26', period: 'current', dots: 3, value: '$2,700' },
  { id: 'j12', label: 'Jun 28', period: 'current', dots: 5, value: '$4,300' },
  { id: 'j13', label: 'Jun 29', period: 'current', dots: 5, value: '$4,400' },
  { id: 'j14', label: 'Jun 30', period: 'current', dots: 4, value: '$3,800' },
];

export const DotMatrixChart = React.forwardRef<HTMLDivElement, DotMatrixChartProps>(
  (
    {
      className,
      title = 'REVENUE',
      metric = '+326%',
      timeframe: controlledTimeframe,
      onTimeframeChange,
      columns = DEFAULT_COLUMNS,
      previousLabel = 'MAY $3,250',
      currentLabel = 'JUN $12,392',
      footerTagline = "DON'T OVERTHINK | AUG 2024 | SIMPLIFYING DIGITAL EXP.",
      maxDots = 14,
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

    const previousCols = columns.filter((c) => c.period === 'previous');
    const currentCols = columns.filter((c) => c.period === 'current');

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-[28px] border border-border/70 bg-card p-6 sm:p-8',
          'shadow-tactile select-none transition-colors overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Header: Title / Metric & Timeframe Selector */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-border/40">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-text-muted uppercase">
              {title}
            </span>
            <div className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary mt-1">
              {metric}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-3 sm:gap-4 pt-1">
            {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map((tf) => {
              const isActive = activeTimeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => handleTimeframeClick(tf)}
                  className={cn(
                    'text-[11px] font-mono tracking-wider transition-colors cursor-pointer',
                    isActive
                      ? 'text-text-primary font-semibold'
                      : 'text-text-muted/60 hover:text-text-primary'
                  )}
                >
                  {tf}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Matrix Area */}
        <div className="pt-8 pb-4">
          <div className="relative flex items-end justify-between gap-1.5 sm:gap-2 h-44 sm:h-52 px-1">
            {/* Tooltip Overlay */}
            {hoveredColumn && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 right-2 z-20 px-3 py-1.5 rounded-lg bg-popover/90 backdrop-blur-md border border-border/80 text-[11px] font-mono text-text-primary shadow-sm"
              >
                <span className="text-text-muted mr-2">{hoveredColumn.label}:</span>
                <span className="font-semibold text-text-primary">{hoveredColumn.value}</span>
              </motion.div>
            )}

            {/* Render Columns */}
            {columns.map((col) => {
              const isHovered = hoveredColumn?.id === col.id;
              const isCurrent = col.period === 'current';

              return (
                <div
                  key={col.id}
                  onMouseEnter={() => setHoveredColumn(col)}
                  onMouseLeave={() => setHoveredColumn(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 cursor-pointer group py-1"
                >
                  {/* Vertical stack of dots from top to bottom */}
                  {Array.from({ length: maxDots }).map((_, index) => {
                    const dotIndexFromBottom = maxDots - 1 - index;
                    const isFilled = dotIndexFromBottom < col.dots;

                    if (!isFilled) {
                      return (
                        <div
                          key={index}
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-0"
                        />
                      );
                    }

                    return (
                      <div
                        key={index}
                        className={cn(
                          'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200',
                          isCurrent
                            ? isHovered
                              ? 'bg-text-primary scale-125'
                              : 'bg-text-primary/90'
                            : isHovered
                            ? 'bg-text-muted scale-110'
                            : 'bg-text-muted/35'
                        )}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Period Labels */}
          <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-4 px-1">
            <div className="tracking-wider text-text-muted/70">
              {previousLabel}
            </div>
            <div className="tracking-wider text-text-primary font-medium">
              {currentLabel}
            </div>
          </div>
        </div>

        {/* Footer Architectural Tagline */}
        {footerTagline && (
          <div className="pt-6 border-t border-border/30 flex items-center justify-end">
            <div className="text-[10px] font-mono tracking-widest text-text-muted/60 uppercase">
              {footerTagline}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DotMatrixChart.displayName = 'DotMatrixChart';
