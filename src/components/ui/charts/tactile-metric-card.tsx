'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ChevronDown, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── 1. TACTILE METRIC CARD (LINE / NODE TRAJECTORY) ──────────────────────────

export interface MetricNodePoint {
  label: string;
  value: number; // 0 to 100
  tooltipValue?: string;
  tooltipSubtext?: string;
}

export interface TactileMetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  periodLabel?: string;
  value?: string;
  deltaText?: string;
  deltaSubtext?: string;
  nodes?: MetricNodePoint[];
  initialActiveIndex?: number;
  onMoreClick?: () => void;
  onPeriodClick?: () => void;
}

const DEFAULT_METRIC_NODES: MetricNodePoint[] = [
  { label: 'Jan', value: 72, tooltipValue: '$2,352.96 income', tooltipSubtext: '+12% vs prior' },
  { label: 'Feb', value: 45, tooltipValue: '$1,420.10 income', tooltipSubtext: '-8% vs prior' },
  { label: 'Mar', value: 38, tooltipValue: '$1,190.50 income', tooltipSubtext: '-5% vs prior' },
  { label: 'Apr', value: 52, tooltipValue: '$1,620.00 income', tooltipSubtext: '+4% vs prior' },
  { label: 'May', value: 68, tooltipValue: '$2,140.00 income', tooltipSubtext: '+10% vs prior' },
  { label: 'Jun', value: 64, tooltipValue: '$1,980.20 income', tooltipSubtext: '+2% vs prior' },
  { label: 'Jul', value: 88, tooltipValue: '$3,150.80 income', tooltipSubtext: '+18% vs prior' },
];

export const TactileMetricCard = React.forwardRef<HTMLDivElement, TactileMetricCardProps>(
  (
    {
      className,
      title = 'Balance',
      periodLabel = '2024',
      value = '$94,127',
      deltaText = '+13%',
      deltaSubtext = 'vs last year',
      nodes = DEFAULT_METRIC_NODES,
      initialActiveIndex = 0,
      onMoreClick,
      onPeriodClick,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const cleanId = id.replace(/[^a-zA-Z0-9]/g, '');
    const glowGradientId = `columnGlow-${cleanId}`;
    const lineAreaGradientId = `lineArea-${cleanId}`;
    const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);

    const width = 340;
    const height = 120;
    const paddingX = 20;
    const paddingY = 16;

    const points = nodes.map((node, i) => {
      const x = paddingX + (i / (nodes.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - (node.value / 100) * (height - paddingY * 2);
      return { x, y, node };
    });

    // Smooth spline calculation
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
    const activePoint = points[activeIndex] || points[0];

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-[26px] border border-border/70 bg-card text-text-primary p-6',
          'shadow-tactile select-none transition-colors overflow-hidden flex flex-col justify-between',
          className
        )}
        {...props}
      >
        {/* Header: Title, Period & Actions */}
        <div className="flex items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary/80 border border-border/60 flex items-center justify-center text-text-muted">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium tracking-tight text-text-primary">{title}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPeriodClick}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-secondary/60 border border-border/60 text-text-secondary hover:text-text-primary hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              <span>{periodLabel}</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>
            <button
              type="button"
              onClick={onMoreClick}
              aria-label="More options"
              className="w-6 h-6 rounded-md inline-flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric Value Row */}
        <div className="flex items-baseline justify-between gap-3 pb-4">
          <div className="text-2xl sm:text-3xl font-mono font-medium tracking-tight text-text-primary">
            {value}
          </div>
          <div className="flex items-center gap-1.5 text-right">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3" />
              {deltaText}
            </span>
            <span className="text-[10px] text-text-muted hidden sm:inline">{deltaSubtext}</span>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="relative w-full pt-2 pb-1">
          {/* Active Tooltip Pill */}
          {activePoint.node.tooltipValue && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 px-2.5 py-1 rounded-lg bg-card border border-border/80 text-text-primary shadow-tactile pointer-events-none"
              style={{
                left: `${Math.min(Math.max(activePoint.x - 55, 6), width - 140)}px`,
                top: `${Math.max(activePoint.y - 44, 0)}px`,
              }}
            >
              <div className="text-[10.5px] font-mono font-medium text-text-primary leading-tight">
                {activePoint.node.tooltipValue}
              </div>
              {activePoint.node.tooltipSubtext && (
                <div className="text-[9.5px] font-mono text-text-muted leading-tight">
                  {activePoint.node.tooltipSubtext}
                </div>
              )}
            </motion.div>
          )}

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible">
            <defs>
              <linearGradient id={glowGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id={lineAreaGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.09" />
                <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Soft Ambient Area Fill */}
            <path d={areaD} fill={`url(#${lineAreaGradientId})`} />

            {/* Active Vertical Column Glow */}
            <rect
              x={activePoint.x - 14}
              y={0}
              width={28}
              height={height}
              rx={6}
              fill={`url(#${glowGradientId})`}
              className="transition-all duration-300 pointer-events-none"
            />

            {/* Smooth Spline Trajectory */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            />

            {/* Interactive Node Dots */}
            {points.map((pt, i) => {
              const isActive = activeIndex === i;
              return (
                <g key={i} className="cursor-pointer" onClick={() => setActiveIndex(i)}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 4 : 2.5}
                    className={cn(
                      'transition-all duration-200',
                      isActive
                        ? 'fill-card stroke-text-primary'
                        : 'fill-card stroke-border/90 hover:stroke-text-secondary'
                    )}
                    strokeWidth={isActive ? 2 : 1.25}
                  />
                  {isActive && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="7"
                      fill="none"
                      stroke="var(--text-primary)"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Month Labels */}
          <div className="flex items-center justify-between text-[10.5px] font-mono text-text-muted pt-2 px-1 border-t border-border/30">
            {nodes.map((n, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'transition-colors cursor-pointer hover:text-text-primary',
                  activeIndex === i ? 'text-text-primary font-medium' : 'text-text-muted/70'
                )}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TactileMetricCard.displayName = 'TactileMetricCard';

// ─── 2. TACTILE BAR CARD (INCOME & RECESSED WELL CHANNELS) ────────────────────

export interface BarMetricPoint {
  label: string;
  value: number; // 0 to 100
  amountFormatted?: string;
  isHighlighted?: boolean;
}

export interface TactileBarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  periodLabel?: string;
  value?: string;
  deltaText?: string;
  deltaSubtext?: string;
  bars?: BarMetricPoint[];
  averageThreshold?: {
    value: number; // 0 to 100
    label: string; // e.g. "Avg $7,500"
  };
  onMoreClick?: () => void;
  onPeriodClick?: () => void;
}

const DEFAULT_BARS: BarMetricPoint[] = [
  { label: 'Sun', value: 35, amountFormatted: '$110' },
  { label: 'Mon', value: 65, amountFormatted: '$190' },
  { label: 'Tue', value: 88, amountFormatted: '$237', isHighlighted: true },
  { label: 'Wed', value: 50, amountFormatted: '$150' },
  { label: 'Thu', value: 72, amountFormatted: '$210' },
  { label: 'Fri', value: 40, amountFormatted: '$130' },
  { label: 'Sat', value: 30, amountFormatted: '$95' },
];

export const TactileBarCard = React.forwardRef<HTMLDivElement, TactileBarCardProps>(
  (
    {
      className,
      title = 'Income',
      periodLabel = 'This Month',
      value = '$12,532',
      deltaText = '+12%',
      deltaSubtext = 'vs last month',
      bars = DEFAULT_BARS,
      averageThreshold = { value: 55, label: 'Avg $7,500' },
      onMoreClick,
      onPeriodClick,
      ...props
    },
    ref
  ) => {
    const [selectedBar, setSelectedBar] = React.useState<BarMetricPoint | null>(
      bars.find((b) => b.isHighlighted) || bars[2]
    );

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-[26px] border border-border/70 bg-card text-text-primary p-6',
          'shadow-tactile select-none transition-colors overflow-hidden flex flex-col justify-between',
          className
        )}
        {...props}
      >
        {/* Header: Title, Period & Actions */}
        <div className="flex items-center justify-between gap-3 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary/80 border border-border/60 flex items-center justify-center text-text-muted">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium tracking-tight text-text-primary">{title}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPeriodClick}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-secondary/60 border border-border/60 text-text-secondary hover:text-text-primary hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              <span>{periodLabel}</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>
            <button
              type="button"
              onClick={onMoreClick}
              aria-label="More options"
              className="w-6 h-6 rounded-md inline-flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric Value Row */}
        <div className="flex items-baseline justify-between gap-3 pb-4">
          <div className="text-2xl sm:text-3xl font-mono font-medium tracking-tight text-text-primary">
            {value}
          </div>
          <div className="flex items-center gap-1.5 text-right">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3" />
              {deltaText}
            </span>
            <span className="text-[10px] text-text-muted hidden sm:inline">{deltaSubtext}</span>
          </div>
        </div>

        {/* Bars Container with Recessed Well Channels & Threshold Line */}
        <div className="relative w-full h-36 pt-3 pb-1">
          {/* Horizontal Dashed Threshold Line */}
          {averageThreshold && (
            <div
              className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
              style={{ bottom: `${averageThreshold.value * 0.95}px` }}
            >
              <div className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-card/90 text-text-muted border border-border/60 shadow-2xs mr-2">
                {averageThreshold.label}
              </div>
              <div className="flex-1 border-b border-dashed border-border/60" />
            </div>
          )}

          {/* Bar Columns inside Recessed Channels */}
          <div className="flex items-end justify-between gap-2.5 h-full px-1">
            {bars.map((bar, i) => {
              const isHighlighted = bar.isHighlighted || selectedBar?.label === bar.label;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedBar(bar)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
                >
                  {/* Floating Tag above highlighted bar */}
                  {isHighlighted && bar.amountFormatted && (
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 z-30 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-card border border-border text-text-primary shadow-tactile whitespace-nowrap"
                    >
                      {bar.amountFormatted}
                    </motion.div>
                  )}

                  {/* Recessed Track Well */}
                  <div className="w-full max-w-[22px] h-full bg-secondary/35 rounded-t-lg flex flex-col justify-end overflow-hidden p-0.5 border-t border-x border-border/25">
                    {/* Filled Bar */}
                    <div
                      className={cn(
                        'w-full rounded-t-md transition-all duration-200',
                        isHighlighted
                          ? 'bg-text-primary/90 dark:bg-[#eae5dc] shadow-2xs'
                          : 'bg-secondary/80 group-hover:bg-text-muted/60'
                      )}
                      style={{ height: `${bar.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day of week labels */}
          <div className="flex items-center justify-between text-[10.5px] font-mono text-text-muted pt-2.5 px-1 border-t border-border/30 mt-1.5">
            {bars.map((b, i) => (
              <span
                key={i}
                className={cn(
                  'transition-colors',
                  selectedBar?.label === b.label ? 'text-text-primary font-medium' : 'text-text-muted/70'
                )}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TactileBarCard.displayName = 'TactileBarCard';
