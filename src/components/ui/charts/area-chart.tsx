'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AreaChartDataPoint {
  label: string;
  value: number;
  baseline?: number;
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
  const glowId = `areachart-glow-${id}`;

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

  const paddingLeft = showAxes ? 48 : 16;
  const paddingRight = 20;
  const paddingTop = 28;
  const paddingBottom = showAxes ? 36 : 16;

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

  // Smooth Catmull-Rom cubic spline path
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
        'relative w-full rounded-[24px] border border-border/70 bg-card select-none shadow-tactile transition-colors overflow-hidden',
        className
      )}
      style={{ height }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      {/* Precision Floating Tooltip Pill */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 2, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-3 right-4 z-20 px-3 py-1.5 rounded-xl bg-card/95 backdrop-blur-md border border-border/90 text-xs font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-text-muted">{hoveredPoint.item.label}:</span>
            <span className="font-semibold text-text-primary">
              {hoveredPoint.item.formattedValue || `${hoveredPoint.item.value.toLocaleString()}${unit}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg width={width} height={height} className="overflow-visible block">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="60%" stopColor={color} stopOpacity="0.05" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
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
                    {Math.round(val).toLocaleString()}{unit}
                  </text>
                )}
              </g>
            );
          })}

        {/* Ambient Area Gradient Fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} className="pointer-events-none" />

        {/* Ambient Glow Halo behind line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-15 pointer-events-none"
          filter={`url(#${glowId})`}
        />

        {/* Spline Wave Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-95 pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover Crosshair & Indicator Point */}
        {hoveredPoint && (
          <g className="pointer-events-none">
            {/* Scrubber vertical line */}
            <line
              x1={hoveredPoint.x}
              y1={paddingTop}
              x2={hoveredPoint.x}
              y2={baselineY}
              stroke={color}
              strokeDasharray="2 3"
              strokeWidth="1"
              className="opacity-60"
            />
            {/* Outer ambient pulse ring */}
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="8"
              fill={color}
              className="opacity-20 animate-pulse"
            />
            {/* Inner specular dot */}
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="4"
              fill="var(--card)"
              stroke={color}
              strokeWidth="2"
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
                  y={baselineY + 20}
                  textAnchor="middle"
                  className={cn(
                    'text-[10.5px] font-mono transition-colors select-none',
                    hoveredIndex === idx ? 'fill-text-primary font-medium' : 'fill-text-muted/60'
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
