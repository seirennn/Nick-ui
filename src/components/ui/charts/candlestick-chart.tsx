'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CandleDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CandlestickChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CandleDataPoint[];
  height?: number;
  showVolume?: boolean;
  showAxes?: boolean;
  unit?: string;
}

export function CandlestickChart({
  data,
  height = 280,
  showVolume = true,
  showAxes = true,
  unit = '$',
  className,
  ...props
}: CandlestickChartProps) {
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
        className="w-full flex items-center justify-center rounded-[24px] bg-card border border-border/60 text-xs font-mono text-text-muted"
      >
        No market data available
      </div>
    );
  }

  const paddingLeft = showAxes ? 52 : 16;
  const paddingRight = 20;
  const paddingTop = 28;
  const paddingBottom = showAxes ? 32 : 16;

  const chartWidth = Math.max(10, width - paddingLeft - paddingRight);
  const totalHeight = Math.max(10, height - paddingTop - paddingBottom);
  const volumeHeight = showVolume ? totalHeight * 0.22 : 0;
  const candleAreaHeight = totalHeight - volumeHeight - (showVolume ? 12 : 0);

  // Calculate Price Range
  const allHighs = data.map((d) => d.high);
  const allLows = data.map((d) => d.low);
  const minPrice = Math.min(...allLows) * 0.998;
  const maxPrice = Math.max(...allHighs) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  // Calculate Volume Range
  const maxVolume = Math.max(...data.map((d) => d.volume), 1);

  const slotWidth = chartWidth / data.length;
  const candleWidth = Math.min(18, Math.max(6, slotWidth * 0.55));

  const hoveredCandle = hoveredIndex !== null ? data[hoveredIndex] : null;

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
      {/* Precision Floating Telemetry Pill */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-3 text-xs font-mono pointer-events-none">
        {hoveredCandle ? (
          <div className="px-3 py-1 rounded-xl bg-card/95 backdrop-blur-md border border-border/90 text-[11px] font-mono shadow-tactile flex items-center gap-3">
            <span className="text-text-muted">{hoveredCandle.time}</span>
            <span>O: <strong className="text-text-primary">{unit}{hoveredCandle.open.toFixed(2)}</strong></span>
            <span>H: <strong className="text-emerald-500">{unit}{hoveredCandle.high.toFixed(2)}</strong></span>
            <span>L: <strong className="text-rose-500">{unit}{hoveredCandle.low.toFixed(2)}</strong></span>
            <span>C: <strong className={hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-500' : 'text-rose-500'}>{unit}{hoveredCandle.close.toFixed(2)}</strong></span>
            {showVolume && <span className="text-text-muted">Vol: {hoveredCandle.volume.toLocaleString()}</span>}
          </div>
        ) : (
          <span className="text-[10px] font-mono text-text-muted/60">Hover candle to inspect OHLC</span>
        )}
      </div>

      <svg width={width} height={height} className="overflow-visible block">
        {/* Horizontal Price Gridlines */}
        {[0, 0.5, 1].map((tier, idx) => {
          const y = paddingTop + candleAreaHeight * (1 - tier);
          const price = minPrice + tier * priceRange;
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
                  {unit}{price.toFixed(2)}
                </text>
              )}
            </g>
          );
        })}

        {/* Candlestick Glyphs & Volume Bars */}
        {data.map((d, idx) => {
          const isBullish = d.close >= d.open;
          const candleColor = isBullish ? '#10b981' : '#f43f5e';
          const centerX = paddingLeft + idx * slotWidth + slotWidth / 2;
          const leftX = centerX - candleWidth / 2;

          const highY = paddingTop + candleAreaHeight - ((d.high - minPrice) / priceRange) * candleAreaHeight;
          const lowY = paddingTop + candleAreaHeight - ((d.low - minPrice) / priceRange) * candleAreaHeight;
          const openY = paddingTop + candleAreaHeight - ((d.open - minPrice) / priceRange) * candleAreaHeight;
          const closeY = paddingTop + candleAreaHeight - ((d.close - minPrice) / priceRange) * candleAreaHeight;

          const bodyY = Math.min(openY, closeY);
          const bodyHeight = Math.max(2, Math.abs(closeY - openY));

          // Volume Bar Coordinates
          const volBarHeight = showVolume ? (d.volume / maxVolume) * volumeHeight : 0;
          const volY = paddingTop + totalHeight - volBarHeight;

          const isHovered = hoveredIndex === idx;

          return (
            <g key={idx}>
              {/* Vertical Scrubber Highlight */}
              {isHovered && (
                <line
                  x1={centerX}
                  y1={paddingTop}
                  x2={centerX}
                  y2={paddingTop + totalHeight}
                  stroke="var(--border)"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  className="opacity-80"
                />
              )}

              {/* High-Low Wick Line */}
              <line
                x1={centerX}
                y1={highY}
                x2={centerX}
                y2={lowY}
                stroke={candleColor}
                strokeWidth="1.25"
                className="opacity-80 pointer-events-none"
              />

              {/* Open-Close Candle Body */}
              <rect
                x={leftX}
                y={bodyY}
                width={candleWidth}
                height={bodyHeight}
                rx={2.5}
                fill={candleColor}
                className={cn(
                  'transition-all duration-150 pointer-events-none drop-shadow-2xs',
                  isHovered ? 'brightness-125' : 'opacity-90'
                )}
              />

              {/* Volume Bar */}
              {showVolume && (
                <rect
                  x={leftX}
                  y={volY}
                  width={candleWidth}
                  height={volBarHeight}
                  rx={2}
                  fill={candleColor}
                  className={cn(
                    'transition-all duration-150 pointer-events-none',
                    isHovered ? 'opacity-80' : 'opacity-35'
                  )}
                />
              )}

              {/* Interactive Hit Area */}
              <rect
                x={paddingLeft + idx * slotWidth}
                y={0}
                width={slotWidth}
                height={height}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              />

              {/* Time Label on X-Axis */}
              {showAxes && idx % Math.ceil(data.length / 6) === 0 && (
                <text
                  x={centerX}
                  y={paddingTop + totalHeight + 20}
                  textAnchor="middle"
                  className="text-[10px] font-mono fill-text-muted/60 select-none"
                >
                  {d.time}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
