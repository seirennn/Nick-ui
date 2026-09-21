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
  height = 240,
  barColor = 'var(--text-primary)',
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
        className="w-full flex items-center justify-center rounded-[20px] bg-card border border-border/60 text-xs font-mono text-text-muted"
      >
        No telemetry data available
      </div>
    );
  }

  const paddingLeft = showAxes ? 48 : 16;
  const paddingRight = 20;
  const paddingTop = 28;
  const paddingBottom = showAxes ? 36 : 16;

  const chartWidth = Math.max(10, width - paddingLeft - paddingRight);
  const chartHeight = Math.max(10, height - paddingTop - paddingBottom);

  const maxVal = Math.max(...data.map((d) => d.value), 1) * 1.08;
  const barSlotWidth = chartWidth / data.length;
  const barWidth = Math.min(28, Math.max(12, barSlotWidth * 0.46));

  const gridTiers = [0, 0.5, 1];
  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full rounded-[24px] border border-border/70 bg-card select-none shadow-tactile transition-colors overflow-hidden',
        className
      )}
      style={{ height }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      {/* Floating Hover Readout Pill */}
      <AnimatePresence>
        {hoveredItem && hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 2, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-3 right-4 z-20 px-3 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border/90 text-xs font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-text-muted">{hoveredItem.label}:</span>
            <span className="font-semibold text-text-primary">
              {hoveredItem.formattedValue || `${hoveredItem.value.toLocaleString()}${unit}`}
            </span>
            {hoveredItem.secondaryValue !== undefined && (
              <span className="text-[10px] text-text-muted">
                (prev {hoveredItem.secondaryValue.toLocaleString()}{unit})
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <svg width={width} height={height} className="overflow-visible block">
        {/* Horizontal Dashed Gridlines */}
        {showGrid &&
          gridTiers.map((tier, idx) => {
            const y = paddingTop + chartHeight * (1 - tier);
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth + paddingLeft}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  strokeWidth="0.75"
                  className="opacity-50"
                />
                {showAxes && (
                  <text
                    x={paddingLeft - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-text-muted/60 select-none"
                  >
                    {Math.round(tier * maxVal).toLocaleString()}{unit}
                  </text>
                )}
              </g>
            );
          })}

        {/* Tactile Bar Columns */}
        {data.map((item, idx) => {
          const barHeight = (item.value / maxVal) * chartHeight;
          const x = paddingLeft + idx * barSlotWidth + (barSlotWidth - barWidth) / 2;
          const y = paddingTop + chartHeight - barHeight;
          const isHovered = hoveredIndex === idx;

          return (
            <g key={idx}>
              {/* Vertical Spotlight Beam on Hover */}
              {isHovered && (
                <rect
                  x={paddingLeft + idx * barSlotWidth + 2}
                  y={paddingTop}
                  width={barSlotWidth - 4}
                  height={chartHeight}
                  rx={8}
                  fill="var(--text-primary)"
                  className="opacity-[0.03] pointer-events-none transition-opacity duration-200"
                />
              )}

              {/* Recessed Track Well */}
              <rect
                x={x}
                y={paddingTop}
                width={barWidth}
                height={chartHeight}
                rx={5}
                fill="var(--secondary)"
                className="opacity-30 pointer-events-none"
              />

              {/* Filled Tactile Bar */}
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={5}
                fill={barColor}
                className={cn(
                  'transition-all duration-200 pointer-events-none drop-shadow-xs',
                  isHovered ? 'opacity-100 brightness-110' : 'opacity-85'
                )}
                initial={{ height: 0, y: paddingTop + chartHeight }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Top Hairline Specular Edge */}
              <line
                x1={x + 2}
                y1={y}
                x2={x + barWidth - 2}
                y2={y}
                stroke="#ffffff"
                strokeWidth="1.25"
                className="opacity-40 pointer-events-none"
              />

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

              {/* X-Axis Category Label */}
              {showAxes && (
                <text
                  x={x + barWidth / 2}
                  y={paddingTop + chartHeight + 20}
                  textAnchor="middle"
                  className={cn(
                    'text-[10.5px] font-mono transition-colors select-none',
                    isHovered ? 'fill-text-primary font-medium' : 'fill-text-muted/60'
                  )}
                >
                  {item.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
