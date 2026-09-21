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
  const [width, setWidth] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        const clientW = containerRef.current.clientWidth;
        if (clientW > 0) setWidth(clientW);
      }
    };
    updateWidth();
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect.width > 0) {
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

  const effectiveWidth = width > 0 ? width : 600;

  const paddingLeft = showAxes ? 56 : 16;
  const paddingRight = 24;
  const paddingTop = 32;
  const paddingBottom = showAxes ? 38 : 16;

  const chartWidth = Math.max(10, effectiveWidth - paddingLeft - paddingRight);
  const chartHeight = Math.max(10, height - paddingTop - paddingBottom);

  const maxVal = Math.max(...data.map((d) => d.value), 1) * 1.08;
  const barSlotWidth = chartWidth / data.length;
  const barWidth = Math.min(32, Math.max(10, barSlotWidth * 0.44));

  const gridTiers = [0, 0.5, 1];
  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full max-w-full rounded-[24px] border border-border/70 bg-card select-none shadow-tactile transition-colors overflow-hidden',
        className
      )}
      style={{ height, minHeight: height }}
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
            className="absolute top-3 right-4 z-20 px-3 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border/90 text-xs font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-2 max-w-[calc(100%-32px)] truncate"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-text-muted shrink-0">{hoveredItem.label}:</span>
            <span className="font-semibold text-text-primary shrink-0">
              {hoveredItem.formattedValue || `${hoveredItem.value.toLocaleString()}${unit}`}
            </span>
            {hoveredItem.secondaryValue !== undefined && (
              <span className="text-[10px] text-text-muted shrink-0">
                (prev {hoveredItem.secondaryValue.toLocaleString()}{unit})
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${effectiveWidth} ${height}`}
        className="block overflow-hidden max-w-full"
        style={{ width: '100%', height: `${height}px` }}
      >
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
          const barHeight = Math.max(2, (item.value / maxVal) * chartHeight);
          const x = paddingLeft + idx * barSlotWidth + (barSlotWidth - barWidth) / 2;
          const y = paddingTop + chartHeight - barHeight;
          const isHovered = hoveredIndex === idx;

          const maxChars = Math.max(3, Math.floor(barSlotWidth / 7.5));
          const labelText =
            item.label.length > maxChars
              ? `${item.label.slice(0, Math.max(1, maxChars - 1))}…`
              : item.label;

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
                  'transition-colors duration-200 pointer-events-none drop-shadow-xs',
                  isHovered ? 'opacity-100 brightness-110' : 'opacity-85'
                )}
                initial={{ height: 0, y: paddingTop + chartHeight }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Top Hairline Specular Edge */}
              <motion.line
                x1={x + 2}
                y1={y}
                x2={x + barWidth - 2}
                y2={y}
                stroke="#ffffff"
                strokeWidth="1.25"
                className="opacity-40 pointer-events-none"
                initial={{ opacity: 0, y1: paddingTop + chartHeight, y2: paddingTop + chartHeight }}
                animate={{ opacity: 0.4, y1: y, y2: y }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                    'text-[10px] font-mono transition-colors select-none',
                    isHovered ? 'fill-text-primary font-medium' : 'fill-text-muted/60'
                  )}
                >
                  {labelText}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
