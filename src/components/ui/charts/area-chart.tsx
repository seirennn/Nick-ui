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
  height = 220,
  color = 'currentColor',
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
  const gradientId = React.useId();

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
        className="w-full flex items-center justify-center rounded-xl bg-card border border-border/60 text-xs text-text-muted"
      >
        Insufficient data points
      </div>
    );
  }

  const paddingLeft = showAxes ? 40 : 12;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = showAxes ? 28 : 12;

  const chartWidth = Math.max(10, width - paddingLeft - paddingRight);
  const chartHeight = Math.max(10, height - paddingTop - paddingBottom);

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;
  const range = maxVal - minVal || 1;

  const points = data.map((item, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((item.value - minVal) / range) * chartHeight;
    return { x, y, item, idx };
  });

  // Smooth Catmull-Rom or cubic Bezier path
  const buildSmoothPath = (pts: typeof points) => {
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * curveTension * 2;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * curveTension * 2;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * curveTension * 2;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * curveTension * 2;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = buildSmoothPath(points);
  const baselineY = paddingTop + chartHeight;
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;

  const gridTiers = [0, 0.5, 1];
  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full select-none font-sans', className)}
      style={{ height }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      <svg width={width} height={height} className="overflow-visible block">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0.12} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines */}
        {showGrid &&
          gridTiers.map((tier, idx) => {
            const y = paddingTop + chartHeight * (1 - tier);
            const val = minVal + tier * range;
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
                    x={paddingLeft - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-text-muted/60 select-none"
                  >
                    {Math.round(val)}
                  </text>
                )}
              </g>
            );
          })}

        {/* X-axis labels */}
        {showAxes && (
          <g>
            {points.map((pt, idx) => {
              const step = Math.max(1, Math.floor(points.length / 6));
              if (idx % step !== 0 && idx !== points.length - 1) return null;
              return (
                <text
                  key={idx}
                  x={pt.x}
                  y={height - 6}
                  textAnchor="middle"
                  className="text-[10px] font-mono fill-text-muted/60 select-none"
                >
                  {pt.item.label}
                </text>
              );
            })}
          </g>
        )}

        {/* Filled Ambient Area */}
        <path d={areaPath} fill={`url(#${gradientId})`} className="text-foreground/20" />

        {/* Crisp Hairline Stroke */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/80"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Quiet Hover Crosshair and Dot */}
        {hoveredPoint && (
          <g>
            <line
              x1={hoveredPoint.x}
              y1={paddingTop}
              x2={hoveredPoint.x}
              y2={baselineY}
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray="2 2"
              className="text-border"
            />
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r={3.5}
              className="fill-background stroke-foreground stroke-[1.5]"
            />
          </g>
        )}

        {/* Interactive Hover Capture Columns */}
        {points.map((pt, idx) => {
          const colWidth = chartWidth / (points.length - 1 || 1);
          const x0 = pt.x - colWidth / 2;
          return (
            <rect
              key={idx}
              x={x0}
              y={0}
              width={colWidth}
              height={height}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(idx)}
            />
          );
        })}
      </svg>

      {/* Floating Tooltip Pill */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-md bg-card/95 border border-border/80 shadow-tactile backdrop-blur-md text-xs"
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y - 8,
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-text-muted">{hoveredPoint.item.label}:</span>
              <span className="font-medium text-text-primary">
                {hoveredPoint.item.formattedValue || `${hoveredPoint.item.value}${unit}`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
