'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AreaChartDataPoint {
  label: string;
  value: number;
  formattedValue?: string;
}

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  showGrid?: boolean;
  showAxes?: boolean;
  unit?: string;
  curveTension?: number;
}

export function AreaChart({
  data,
  height = 240,
  color = 'var(--text-primary)',
  showGrid = true,
  showAxes = true,
  unit = '',
  curveTension = 0.35,
  className,
  ...props
}: AreaChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `areachart-gradient-${id}`;

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

  if (!data || data.length < 2) {
    return (
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full flex items-center justify-center rounded-[20px] bg-card border border-border/60 text-xs font-mono text-text-muted"
      >
        Insufficient telemetry data
      </div>
    );
  }

  const paddingLeft = showAxes ? 40 : 12;
  const paddingRight = 16;
  const paddingTop = 24;
  const paddingBottom = showAxes ? 32 : 12;

  const chartWidth = Math.max(10, width - paddingLeft - paddingRight - 40);
  const chartHeight = Math.max(10, height - paddingTop - paddingBottom - 40);

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;
  const range = maxVal - minVal || 1;

  const points = data.map((item, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((item.value - minVal) / range) * chartHeight;
    return { x, y, item, idx };
  });

  // Smooth Catmull-Rom spline path
  const buildSmoothPath = (pts: typeof points) => {
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * curveTension * 2;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * curveTension * 2;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * curveTension * 2;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * curveTension * 2;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };

  const linePath = buildSmoothPath(points);
  const baselineY = paddingTop + chartHeight;
  const areaPath = `${linePath} L ${points[points.length - 1].x},${baselineY} L ${points[0].x},${baselineY} Z`;

  const gridTiers = [0, 0.5, 1];
  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full rounded-[24px] border border-border/70 bg-card p-5 select-none shadow-tactile transition-colors',
        className
      )}
      style={{ height }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      {/* Floating Readout Pill */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-4 z-20 px-2.5 py-1 rounded-lg bg-card border border-border/80 text-[11px] font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-1.5"
          >
            <span className="text-text-muted">{hoveredPoint.item.label}:</span>
            <span className="font-semibold text-text-primary">
              {hoveredPoint.item.formattedValue || `${hoveredPoint.item.value}${unit}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg width={width - 40} height={height - 40} className="overflow-visible block">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Dashed Gridlines */}
        {showGrid &&
          gridTiers.map((tier, idx) => {
            const y = paddingTop + chartHeight * (1 - tier);
            const val = minVal + tier * range;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth + paddingLeft}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="2 4"
                  strokeWidth="0.75"
                  className="opacity-60"
                />
                {showAxes && (
                  <text
                    x={paddingLeft - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-text-muted/60 select-none"
                  >
                    {Math.round(val)}{unit}
                  </text>
                )}
              </g>
            );
          })}

        {/* Ambient Area Gradient Fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} className="pointer-events-none" />

        {/* Spline Wave Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90 pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover Crosshair & Indicator Point */}
        {hoveredPoint && (
          <g className="pointer-events-none">
            <line
              x1={hoveredPoint.x}
              y1={paddingTop}
              x2={hoveredPoint.x}
              y2={baselineY}
              stroke="var(--border)"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="6"
              fill={color}
              className="opacity-15"
            />
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="3.5"
              fill="var(--card)"
              stroke={color}
              strokeWidth="1.75"
              className="drop-shadow-xs"
            />
          </g>
        )}

        {/* Interactive Scrub Slices */}
        {points.map((pt, idx) => {
          const sliceWidth = chartWidth / points.length;
          const sliceX = pt.x - sliceWidth / 2;

          return (
            <g key={idx}>
              <rect
                x={sliceX}
                y={0}
                width={sliceWidth}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              />

              {showAxes && (
                <text
                  x={pt.x}
                  y={baselineY + 18}
                  textAnchor="middle"
                  className={cn(
                    'text-[10.5px] font-mono transition-colors select-none',
                    hoveredIndex === idx ? 'fill-text-primary font-medium' : 'fill-text-muted/70'
                  )}
                >
                  {pt.item.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
