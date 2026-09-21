'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  showGradient?: boolean;
  showEndDot?: boolean;
}

export function Sparkline({
  data,
  width = 120,
  height = 38,
  strokeWidth = 1.75,
  color = 'var(--text-primary)',
  showGradient = true,
  showEndDot = true,
  className,
  ...props
}: SparklineProps) {
  const rawId = React.useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const gradientId = `sparkline-gradient-${id}`;

  if (!data || data.length < 2) {
    return (
      <div
        className="h-9 rounded-md bg-secondary/30 animate-pulse border border-border/40"
        style={{ width }}
      />
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const paddingY = 5;
  const usableHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Generate smooth cubic Bézier SVG path with natural tension
  let pathD = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX1 = curr.x + (next.x - curr.x) / 2;
    const cpY1 = curr.y;
    const cpX2 = curr.x + (next.x - curr.x) / 2;
    const cpY2 = next.y;
    pathD += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${next.x},${next.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;
  const lastPoint = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('overflow-visible select-none block', className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Atmospheric Area Gradient Fill */}
      {showGradient && (
        <path d={areaD} fill={`url(#${gradientId})`} className="pointer-events-none" />
      )}

      {/* Smooth Trajectory Path */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Precision Terminal Dot */}
      {showEndDot && (
        <g>
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="5"
            fill={color}
            className="opacity-15"
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="2.5"
            fill="var(--card)"
            stroke={color}
            strokeWidth="1.5"
            className="drop-shadow-xs"
          />
        </g>
      )}
    </svg>
  );
}
