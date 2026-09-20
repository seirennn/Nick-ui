'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BarChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  formattedValue?: string;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartDataPoint[];
  height?: number;
  barColor?: string;
  showGrid?: boolean;
  showAxes?: boolean;
  unit?: string;
}

export function BarChart({
  data,
  height = 200,
  barColor = 'currentColor',
  showGrid = true,
  showAxes = true,
  unit = '',
  className,
  ...props
}: BarChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full flex items-center justify-center rounded-xl bg-card border border-border/60 text-xs text-text-muted"
      >
        No chart data
      </div>
    );
  }

  const paddingLeft = showAxes ? 36 : 12;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = showAxes ? 28 : 12;

  const chartWidth = Math.max(10, width - paddingLeft - paddingRight);
  const chartHeight = Math.max(10, height - paddingTop - paddingBottom);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const barSlotWidth = chartWidth / data.length;
  const barWidth = Math.min(28, Math.max(8, barSlotWidth * 0.55));

  const gridTiers = [0, 0.5, 1];

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full select-none font-sans', className)}
      style={{ height }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      <svg width={width} height={height} className="overflow-visible block">
        {/* Horizontal Gridlines */}
        {showGrid &&
          gridTiers.map((tier, idx) => {
            const y = paddingTop + chartHeight * (1 - tier);
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="2 3"
                  className="text-border/40"
                  strokeWidth={1}
                />
                {showAxes && (
                  <text
                    x={paddingLeft - 6}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-text-muted/60 select-none"
                  >
                    {Math.round(tier * maxVal)}
                  </text>
                )}
              </g>
            );
          })}

        {/* Bars */}
        {data.map((item, idx) => {
          const barHeight = (item.value / maxVal) * chartHeight;
          const x = paddingLeft + idx * barSlotWidth + (barSlotWidth - barWidth) / 2;
          const y = paddingTop + chartHeight - barHeight;
          const isHovered = hoveredIndex === idx;

          return (
            <g key={idx}>
              {/* Interactive Hit Area */}
              <rect
                x={paddingLeft + idx * barSlotWidth}
                y={0}
                width={barSlotWidth}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              />

              {/* Bar Rect */}
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={2}
                fill="currentColor"
                initial={{ height: 0, y: paddingTop + chartHeight }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'transition-opacity',
                  isHovered ? 'text-text-primary opacity-90' : 'text-text-primary/40 hover:text-text-primary/70'
                )}
              />

              {/* X-axis Label */}
              {showAxes && (
                <text
                  x={x + barWidth / 2}
                  y={height - 6}
                  textAnchor="middle"
                  className={cn(
                    'text-[10px] font-mono transition-colors select-none',
                    isHovered ? 'fill-text-primary' : 'fill-text-muted/60'
                  )}
                >
                  {item.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {hoveredIndex !== null && data[hoveredIndex] && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-md bg-card/95 border border-border/80 shadow-tactile backdrop-blur-md text-xs font-mono"
            style={{
              left:
                paddingLeft +
                hoveredIndex * barSlotWidth +
                barSlotWidth / 2,
              top:
                paddingTop +
                chartHeight -
                (data[hoveredIndex].value / maxVal) * chartHeight -
                8,
            }}
          >
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-text-muted">{data[hoveredIndex].label}:</span>
              <span className="font-medium text-text-primary">
                {data[hoveredIndex].formattedValue || `${data[hoveredIndex].value}${unit}`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
