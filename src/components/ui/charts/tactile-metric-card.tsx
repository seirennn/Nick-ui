'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ChevronDown, MoreHorizontal } from 'lucide-react';
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
  accentColor?: 'emerald' | 'amber' | 'neutral';
  value?: string;
  deltaText?: string;
  deltaSubtext?: string;
  nodes?: MetricNodePoint[];
  initialActiveIndex?: number;
  onMoreClick?: () => void;
  onPeriodClick?: () => void;
}

const DEFAULT_METRIC_NODES: MetricNodePoint[] = [
  { label: 'Jan', value: 78, tooltipValue: '$2,352.96 income', tooltipSubtext: '+12% from last month' },
  { label: 'Feb', value: 45, tooltipValue: '$1,420.10 income', tooltipSubtext: '-8% from last month' },
  { label: 'Mar', value: 38, tooltipValue: '$1,190.50 income', tooltipSubtext: '-5% from last month' },
  { label: 'Apr', value: 48, tooltipValue: '$1,520.00 income', tooltipSubtext: '+4% from last month' },
  { label: 'May', value: 68, tooltipValue: '$2,140.00 income', tooltipSubtext: '+10% from last month' },
  { label: 'Jun', value: 62, tooltipValue: '$1,980.20 income', tooltipSubtext: '+2% from last month' },
  { label: 'Jul', value: 92, tooltipValue: '$3,150.80 income', tooltipSubtext: '+18% from last month' },
];

export const TactileMetricCard = React.forwardRef<HTMLDivElement, TactileMetricCardProps>(
  (
    {
      className,
      title = 'Balance',
      periodLabel = '2023',
      accentColor = 'emerald',
      value = '$94,127',
      deltaText = 'increase 13%',
      deltaSubtext = 'vs last year',
      nodes = DEFAULT_METRIC_NODES,
      initialActiveIndex = 0,
      onMoreClick,
      onPeriodClick,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);

    const width = 340;
    const height = 130;
    const paddingX = 18;
    const paddingY = 16;

    const points = nodes.map((node, i) => {
      const x = paddingX + (i / (nodes.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - (node.value / 100) * (height - paddingY * 2);
      return { x, y, node };
    });

    const pathD = points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, '');

    const activePoint = points[activeIndex] || points[0];

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full max-w-sm rounded-[24px] border border-border/80 bg-card text-text-primary p-6',
          'shadow-tactile select-none transition-colors overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Header: Icon + Title & Dropdown Pill + More Button */}
        <div className="flex items-center justify-between gap-3 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-secondary">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium tracking-tight text-text-primary">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPeriodClick}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-secondary/50 border border-border/60 text-text-secondary hover:text-text-primary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <span>{periodLabel}</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>
            <button
              type="button"
              onClick={onMoreClick}
              aria-label="More options"
              className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Value Row */}
        <div className="flex items-center gap-3 pb-6">
          <div
            className={cn(
              'w-1 h-8 rounded-full',
              accentColor === 'emerald' && 'bg-emerald-600 dark:bg-emerald-400',
              accentColor === 'amber' && 'bg-amber-600 dark:bg-amber-400',
              accentColor === 'neutral' && 'bg-text-primary'
            )}
          />
          <div className="text-3xl font-medium tracking-tight text-text-primary">{value}</div>
          <div className="text-[11px] font-mono leading-tight text-text-muted pl-1">
            <div className="text-text-secondary font-medium">{deltaText}</div>
            <div>{deltaSubtext}</div>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="relative w-full pt-1 pb-1">
          {/* Active Tooltip Pill */}
          {activePoint.node.tooltipValue && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 px-3 py-1.5 rounded-xl bg-popover border border-border/80 text-text-primary shadow-tactile pointer-events-none"
              style={{
                left: `${Math.min(Math.max(activePoint.x - 60, 10), width - 150)}px`,
                top: `${Math.max(activePoint.y - 48, 0)}px`,
              }}
            >
              <div className="text-[11px] font-mono font-medium text-text-primary">
                {activePoint.node.tooltipValue}
              </div>
              {activePoint.node.tooltipSubtext && (
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  {activePoint.node.tooltipSubtext}
                </div>
              )}
            </motion.div>
          )}

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32 overflow-visible">
            {/* Active Vertical Soft Beam */}
            <rect
              x={activePoint.x - 14}
              y={0}
              width={28}
              height={height}
              rx={8}
              fill="url(#columnGlow)"
              className="transition-all duration-300 pointer-events-none"
            />

            <defs>
              <linearGradient id="columnGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Line Trajectory */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
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
                    r={isActive ? 4.5 : 3}
                    className={cn(
                      'transition-all duration-200',
                      isActive
                        ? 'fill-text-primary stroke-text-primary'
                        : 'fill-card stroke-border hover:stroke-text-secondary'
                    )}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {isActive && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="8"
                      fill="none"
                      stroke="var(--text-primary)"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Month Labels */}
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 px-1">
            {nodes.map((n, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'transition-colors cursor-pointer hover:text-text-primary',
                  activeIndex === i ? 'text-text-primary font-medium' : 'text-text-muted'
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

// ─── 2. TACTILE BAR CARD (INCOME & THRESHOLD LINE) ──────────────────────────

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
      deltaText = 'increase 12%',
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
          'relative w-full max-w-sm rounded-[24px] border border-border/80 bg-card text-text-primary p-6',
          'shadow-tactile select-none transition-colors overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Header: Icon + Title & Dropdown Pill + More Button */}
        <div className="flex items-center justify-between gap-3 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-secondary">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium tracking-tight text-text-primary">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPeriodClick}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-secondary/50 border border-border/60 text-text-secondary hover:text-text-primary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <span>{periodLabel}</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>
            <button
              type="button"
              onClick={onMoreClick}
              aria-label="More options"
              className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Value Row */}
        <div className="flex items-center gap-3 pb-6">
          <div className="w-1 h-8 rounded-full bg-amber-600 dark:bg-amber-400" />
          <div className="text-3xl font-medium tracking-tight text-text-primary">{value}</div>
          <div className="text-[11px] font-mono leading-tight text-text-muted pl-1">
            <div className="text-text-secondary font-medium">{deltaText}</div>
            <div>{deltaSubtext}</div>
          </div>
        </div>

        {/* Bars Container with Threshold Line */}
        <div className="relative w-full h-36 pt-4 pb-2">
          {/* Horizontal Dashed Threshold Line */}
          {averageThreshold && (
            <div
              className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
              style={{ bottom: `${averageThreshold.value * 0.95}px` }}
            >
              <div className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary/80 backdrop-blur-md text-text-secondary border border-border/70 shadow-2xs mr-2">
                {averageThreshold.label}
              </div>
              <div className="flex-1 border-b border-dashed border-border/60" />
            </div>
          )}

          {/* Bar Columns */}
          <div className="flex items-end justify-between gap-2.5 h-full px-1">
            {bars.map((bar, i) => {
              const isHighlighted = bar.isHighlighted || selectedBar?.label === bar.label;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedBar(bar)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                >
                  {/* Floating Tag above highlighted bar */}
                  {isHighlighted && bar.amountFormatted && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary text-primary-foreground shadow-2xs"
                    >
                      {bar.amountFormatted}
                    </motion.div>
                  )}

                  {/* Vertical Bar Capsule */}
                  <div
                    className={cn(
                      'w-full max-w-[28px] rounded-t-lg transition-all duration-200',
                      isHighlighted
                        ? 'bg-text-primary shadow-2xs'
                        : 'bg-secondary/70 hover:bg-secondary border-t border-x border-border/40'
                    )}
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Day of week labels */}
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-3 px-1 border-t border-border/40 mt-2">
            {bars.map((b, i) => (
              <span
                key={i}
                className={cn(
                  'transition-colors',
                  selectedBar?.label === b.label ? 'text-text-primary font-medium' : 'text-text-muted'
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
