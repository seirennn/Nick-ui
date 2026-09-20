'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TrendDataPoint {
  year: string;
  value: number; // 0 to 100
  metricFormatted?: string;
}

export interface TactileTrendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  keywords?: string[];
  timeframe?: 'Week' | 'Month' | 'Max';
  onTimeframeChange?: (tf: 'Week' | 'Month' | 'Max') => void;
  data?: TrendDataPoint[];
  metricLabel?: string;
  metricValue?: string;
  metricDeltaSuperscript?: string;
  percentageDelta?: string;
  onSettingsClick?: () => void;
}

const DEFAULT_TREND_DATA: TrendDataPoint[] = [
  { year: '2017', value: 18, metricFormatted: '180 personas' },
  { year: '2018', value: 34, metricFormatted: '340 personas' },
  { year: '2019', value: 42, metricFormatted: '420 personas' },
  { year: '2020', value: 65, metricFormatted: '650 personas' },
  { year: '2021', value: 58, metricFormatted: '580 personas' },
  { year: '2022', value: 72, metricFormatted: '720 personas' },
  { year: '2023', value: 88, metricFormatted: '824 personas' },
];

export const TactileTrendCard = React.forwardRef<HTMLDivElement, TactileTrendCardProps>(
  (
    {
      className,
      title = 'Chart',
      keywords = ['Batch auction', 'Liquid staking derivatives (LSD)'],
      timeframe: controlledTimeframe,
      onTimeframeChange,
      data = DEFAULT_TREND_DATA,
      metricLabel = 'Total Personas',
      metricValue = '824',
      metricDeltaSuperscript = '+334',
      percentageDelta = '34.4%',
      onSettingsClick,
      ...props
    },
    ref
  ) => {
    const [internalTimeframe, setInternalTimeframe] = React.useState<'Week' | 'Month' | 'Max'>('Max');
    const [hoveredPoint, setHoveredPoint] = React.useState<TrendDataPoint | null>(null);

    const activeTimeframe = controlledTimeframe ?? internalTimeframe;
    const handleTimeframeClick = (tf: 'Week' | 'Month' | 'Max') => {
      setInternalTimeframe(tf);
      onTimeframeChange?.(tf);
    };

    // Calculate SVG curve path using bezier interpolation
    const width = 380;
    const height = 150;
    const paddingX = 20;
    const paddingY = 20;

    const points = data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - (d.value / 100) * (height - paddingY * 2);
      return { x, y, data: d };
    });

    // Create cubic bezier spline path
    const pathD = points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (point.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (point.x - prev.x) / 2;
      const cp2y = point.y;
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
    }, '');

    const areaD = `${pathD} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;
    const lastPoint = points[points.length - 1];

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full max-w-md rounded-[26px] border border-border/80 bg-card text-text-primary p-6 sm:p-7',
          'shadow-tactile select-none transition-colors overflow-hidden group',
          className
        )}
        {...props}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 pb-3">
          <h3 className="text-sm font-medium tracking-tight text-text-primary">{title}</h3>
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Chart Settings"
            className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Top Keywords Row */}
        <div className="space-y-1 pb-5">
          <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Top Keywords</div>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/60 text-text-secondary border border-border/60"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Capsule Timeframe Selector */}
        <div className="p-1 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between mb-6">
          {(['Week', 'Month', 'Max'] as const).map((tf) => {
            const isActive = activeTimeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => handleTimeframeClick(tf)}
                className={cn(
                  'flex-1 py-1 text-xs font-mono rounded-lg transition-all text-center cursor-pointer',
                  isActive
                    ? 'bg-card text-text-primary font-medium shadow-2xs border border-border/80'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {tf}
              </button>
            );
          })}
        </div>

        {/* Chart Canvas with Dashed Grid */}
        <div className="relative w-full pt-2">
          {/* Vertical dashed background grid */}
          <div className="absolute inset-0 flex justify-between px-5 pointer-events-none pb-6">
            {data.map((_, i) => (
              <div key={i} className="h-full border-r border-dashed border-border/40" />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-36 overflow-visible relative z-10"
          >
            <defs>
              <linearGradient id="tactileTrendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area gradient */}
            <path d={areaD} fill="url(#tactileTrendArea)" />

            {/* Spline wave path */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            />

            {/* Subtle active end node */}
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="4.5"
              className="fill-card stroke-text-primary"
              strokeWidth="2"
            />
          </svg>

          {/* X-Axis Years */}
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-3 px-2 border-t border-border/40">
            {data.map((d, i) => (
              <span key={i}>{d.year}</span>
            ))}
          </div>
        </div>

        {/* Footer Metrics Row */}
        <div className="flex items-end justify-between pt-6 mt-4 border-t border-border/40 relative z-10">
          <div>
            <div className="text-xs text-text-muted font-mono tracking-wide">{metricLabel}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary">
                {metricValue}
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold align-super">
                {metricDeltaSuperscript}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-sm font-mono font-medium text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{percentageDelta}</span>
          </div>
        </div>
      </div>
    );
  }
);

TactileTrendCard.displayName = 'TactileTrendCard';
