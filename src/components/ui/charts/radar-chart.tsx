'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RadarDataPoint {
  axis: string;
  value: number; // 0 to 100
  fullMark?: number; // default 100
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadarDataPoint[];
  size?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  ringsCount?: number;
}

export function RadarChart({
  data,
  size = 280,
  color = 'var(--text-primary)',
  fillOpacity = 0.12,
  showGrid = true,
  showLabels = true,
  ringsCount = 4,
  className,
  ...props
}: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `radar-grad-${id}`;

  if (!data || data.length < 3) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-[24px] bg-card border border-border/60 text-xs font-mono text-text-muted"
      >
        Minimum 3 axes required
      </div>
    );
  }

  const center = size / 2;
  const radius = center - (showLabels ? 42 : 16);
  const angleStep = (Math.PI * 2) / data.length;

  // Calculate polygon vertices for a given ring ratio (0 to 1)
  const getRingPoints = (ratio: number) => {
    return data
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * ratio;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Calculate data polygon vertices
  const dataPoints = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const fullMark = d.fullMark || 100;
    const ratio = Math.max(0, Math.min(1, d.value / fullMark));
    const r = radius * ratio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, d, ratio };
  });

  const dataPolygonString = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const hoveredItem = hoveredIndex !== null ? dataPoints[hoveredIndex] : null;

  return (
    <div
      className={cn(
        'relative rounded-[24px] border border-border/70 bg-card p-4 select-none shadow-tactile flex items-center justify-center overflow-hidden',
        className
      )}
      style={{ width: size, height: size }}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      {/* Floating Hover Readout Pill */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, y: 2, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-card/95 backdrop-blur-md border border-border/80 text-[11px] font-mono text-text-primary shadow-tactile pointer-events-none flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-text-muted">{hoveredItem.d.axis}:</span>
            <span className="font-semibold text-text-primary">{hoveredItem.d.value}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg width={size} height={size} className="overflow-visible block">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity * 1.8} />
            <stop offset="100%" stopColor={color} stopOpacity={fillOpacity * 0.2} />
          </radialGradient>
        </defs>

        {/* Concentric Web Rings */}
        {showGrid &&
          Array.from({ length: ringsCount }).map((_, idx) => {
            const ratio = (idx + 1) / ringsCount;
            return (
              <polygon
                key={idx}
                points={getRingPoints(ratio)}
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.75"
                strokeDasharray={idx === ringsCount - 1 ? 'none' : '2 3'}
                className="opacity-60"
              />
            );
          })}

        {/* Radial Spokes from Center to Outer Vertices */}
        {showGrid &&
          data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--border)"
                strokeWidth="0.75"
                className="opacity-40"
              />
            );
          })}

        {/* Data Filled Polygon */}
        <motion.polygon
          points={dataPolygonString}
          fill={`url(#${gradientId})`}
          stroke={color}
          strokeWidth="1.75"
          strokeLinejoin="round"
          className="drop-shadow-xs"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Axis Labels */}
        {showLabels &&
          data.map((d, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 22;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            const isHovered = hoveredIndex === i;

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(
                  'text-[10px] font-mono transition-colors select-none',
                  isHovered ? 'fill-text-primary font-medium' : 'fill-text-muted/70'
                )}
              >
                {d.axis}
              </text>
            );
          })}

        {/* Interactive Vertex Nodes */}
        {dataPoints.map((pt, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)}>
              {/* Outer invisible hit target */}
              <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

              {/* Glowing ring on hover */}
              {isHovered && (
                <circle cx={pt.x} cy={pt.y} r="8" fill={color} className="opacity-20 animate-pulse" />
              )}

              {/* Vertex core dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 4.5 : 3}
                fill="var(--card)"
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="transition-all duration-150 drop-shadow-2xs"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
