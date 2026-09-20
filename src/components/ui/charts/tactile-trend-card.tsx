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
          'relative w-full max-w-md rounded-[26px] border border-border/80 bg-[#121314] text-white p-6 sm:p-7',
          'shadow-2xl select-none transition-all overflow-hidden group',
          className
        )}
        {...props}
      >
        {/* Ambient lower emerald glow */}
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 pb-3">
          <h3 className="text-sm font-medium tracking-tight text-white/90">{title}</h3>
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Chart Settings"
            className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Top Keywords Row */}
        <div className="space-y-1 pb-5">
          <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Top Keywords</div>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.06] text-white/80 border border-white/[0.08]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Capsule Timeframe Selector */}
        <div className="p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between mb-6">
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
                    ? 'bg-[#27282b] text-white font-medium shadow-xs border border-white/10'
                    : 'text-white/40 hover:text-white/80'
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
              <div key={i} className="h-full border-r border-dashed border-white/[0.07]" />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-36 overflow-visible relative z-10"
          >
            <defs>
              <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area gradient */}
            <path d={areaD} fill="url(#emeraldArea)" />

            {/* Spline wave path */}
            <path
              d={pathD}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing active end node */}
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="4.5"
              fill="#121314"
              stroke="#34d399"
              strokeWidth="2.5"
            />
          </svg>

          {/* X-Axis Years */}
          <div className="flex items-center justify-between text-[11px] font-mono text-white/35 pt-3 px-2 border-t border-white/[0.08]">
            {data.map((d, i) => (
              <span key={i}>{d.year}</span>
            ))}
          </div>
        </div>

        {/* Footer Metrics Row */}
        <div className="flex items-end justify-between pt-6 mt-4 border-t border-white/[0.06] relative z-10">
          <div>
            <div className="text-xs text-white/40 font-mono tracking-wide">{metricLabel}</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                {metricValue}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold align-super">
                {metricDeltaSuperscript}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-sm font-mono font-medium text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{percentageDelta}</span>
          </div>
        </div>
      </div>
    );
  }
);

TactileTrendCard.displayName = 'TactileTrendCard';
