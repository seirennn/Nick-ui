'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface HeatmapCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = none, 4 = peak
}

export interface AnalyticsHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapCell[];
  title?: string;
  totalLabel?: string;
  color?: string; // base tint e.g. emerald, rose, primary
}

export function AnalyticsHeatmap({
  data,
  title = 'System Consensus Activity',
  totalLabel = 'Total Executions',
  color = 'var(--text-primary)',
  className,
  ...props
}: AnalyticsHeatmapProps) {
  const [hoveredCell, setHoveredCell] = React.useState<HeatmapCell | null>(null);

  const totalCount = data.reduce((acc, c) => acc + c.count, 0);

  // Generate 52 weeks x 7 days if data length matches or chunk into columns of 7
  const cols = [];
  const chunkSize = 7;
  for (let i = 0; i < data.length; i += chunkSize) {
    cols.push(data.slice(i, i + chunkSize));
  }

  // Monochromatic level opacity map
  const getLevelStyle = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-primary/20 border-primary/30';
      case 2:
        return 'bg-primary/45 border-primary/50';
      case 3:
        return 'bg-primary/70 border-primary/80';
      case 4:
        return 'bg-primary border-primary text-primary-foreground font-medium shadow-2xs';
      case 0:
      default:
        return 'bg-secondary/40 border-border/40';
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-[24px] border border-border/70 bg-card p-5 select-none shadow-tactile space-y-4 overflow-hidden',
        className
      )}
      onMouseLeave={() => setHoveredCell(null)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/60 pb-3">
        <div>
          <h4 className="text-xs font-medium text-text-primary">{title}</h4>
          <p className="text-[11px] font-mono text-text-muted">
            {totalCount.toLocaleString()} {totalLabel}
          </p>
        </div>

        {/* Hover Readout Pill */}
        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            {hoveredCell ? (
              <motion.div
                key={hoveredCell.date}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-2.5 py-0.5 rounded-md bg-secondary/80 border border-border/70 text-[11px] font-mono text-text-primary flex items-center gap-1.5"
              >
                <span className="text-text-muted">{hoveredCell.date}:</span>
                <span className="font-semibold text-text-primary">{hoveredCell.count.toLocaleString()} ops</span>
              </motion.div>
            ) : (
              <span className="text-[10.5px] font-mono text-text-muted/60">Hover cell to inspect</span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1 min-w-[500px]">
          {cols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1">
              {col.map((cell, rowIdx) => (
                <div
                  key={rowIdx}
                  onMouseEnter={() => setHoveredCell(cell)}
                  className={cn(
                    'w-3 h-3 rounded-[3px] border transition-all cursor-pointer',
                    getLevelStyle(cell.level),
                    hoveredCell === cell && 'ring-2 ring-primary/40 scale-125 z-10'
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-1">
        <span>Mon · Wed · Fri</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className={cn('w-2.5 h-2.5 rounded-[2px] border', getLevelStyle(lvl))}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
