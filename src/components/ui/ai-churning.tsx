'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, Activity, Clock, Cpu } from 'lucide-react';

export type ChurningPattern = 'wavefront' | 'dots' | 'orbit' | 'pulse' | 'matrix';
export type ChurningVariant = 'tactile' | 'recessed' | 'minimal';

export interface TelemetryMetric {
  label: string;
  value: string | number;
}

export interface AiChurningProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  sublabel?: string;
  variant?: ChurningVariant;
  pattern?: ChurningPattern;
  gridSize?: 3 | 4;
  showTimer?: boolean;
  showTelemetry?: boolean;
  telemetry?: TelemetryMetric[];
  isPaused?: boolean;
}

/* ─────────────────────────────────────────────────────────
 * Matrix Pattern Precomputations
 * ───────────────────────────────────────────────────────── */
// 3x3 Chevron wavefront
const CHEVRON_3X3 = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3);
  const c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

// 3x3 Orbit perimeter
const ORBIT_3X3_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const ORBIT_3X3 = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_3X3_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

// 3x3 Radial pulse from center (index 4)
const PULSE_3X3 = [200, 100, 200, 100, 0, 100, 200, 100, 200];

// 4x4 Chevron wavefront
const CHEVRON_4X4 = Array.from({ length: 16 }, (_, i) => {
  const r = Math.floor(i / 4);
  const c = i % 4;
  return (c + Math.abs(r - 1.5)) * 75;
});

// 4x4 Orbit perimeter
const ORBIT_4X4_ORDER = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4];
const ORBIT_4X4 = Array.from({ length: 16 }, (_, i) => {
  const k = ORBIT_4X4_ORDER.indexOf(i);
  return k === -1 ? null : k * 85;
});

// 4x4 Radial pulse from center 4 cells
const PULSE_4X4 = [
  240, 150, 150, 240,
  150, 0, 0, 150,
  150, 0, 0, 150,
  240, 150, 150, 240
];

function useElapsedTimer(isPaused = false) {
  const [ds, setDs] = React.useState(0);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDs((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused]);

  const totalSec = ds / 10;
  if (totalSec < 60) {
    return `${totalSec.toFixed(1)}s`;
  }
  const mins = Math.floor(totalSec / 60);
  const secs = (totalSec % 60).toFixed(1);
  return `${mins}m ${secs}s`;
}

export function AiChurning({
  label = 'Churning',
  sublabel,
  variant = 'tactile',
  pattern = 'wavefront',
  gridSize = 3,
  showTimer = true,
  showTelemetry = false,
  telemetry = [
    { label: 'Tokens/s', value: '48.2' },
    { label: 'KV Cache', value: '82%' },
    { label: 'Latency', value: '18ms' },
  ],
  isPaused = false,
  className,
  ...props
}: AiChurningProps) {
  const elapsed = useElapsedTimer(isPaused);
  const [telemetryOpen, setTelemetryOpen] = React.useState(false);

  // Determine grid cells delay map
  const totalCells = gridSize === 4 ? 16 : 9;
  const isRound = pattern === 'dots';

  const delays = React.useMemo(() => {
    if (gridSize === 4) {
      if (pattern === 'orbit') return ORBIT_4X4;
      if (pattern === 'pulse') return PULSE_4X4;
      if (pattern === 'matrix') {
        return Array.from({ length: 16 }, (_, i) => (Math.sin(i * 37) * 400 + 400) % 700);
      }
      return CHEVRON_4X4;
    } else {
      if (pattern === 'orbit') return ORBIT_3X3;
      if (pattern === 'pulse') return PULSE_3X3;
      if (pattern === 'matrix') {
        return Array.from({ length: 9 }, (_, i) => (Math.sin(i * 43) * 350 + 350) % 650);
      }
      return CHEVRON_3X3;
    }
  }, [gridSize, pattern]);

  const cycleDuration = pattern === 'orbit' ? 950 : 680;

  // Grid styling
  const gridColsClass = gridSize === 4 ? 'grid-cols-[repeat(4,4.5px)]' : 'grid-cols-[repeat(3,4.5px)]';

  const variantContainerClasses = {
    minimal: 'bg-transparent border-none p-0',
    tactile: 'bg-card border border-border/80 shadow-tactile rounded-2xl px-4 py-3.5',
    recessed: 'bg-secondary/40 border border-border/60 shadow-inner-tactile rounded-2xl px-4 py-3.5',
  };

  return (
    <div
      role="status"
      aria-label={`${label} ${showTimer ? elapsed : ''}`}
      className={cn('inline-flex flex-col select-none transition-all', variantContainerClasses[variant], className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {/* Phosphor Pixel Grid Well */}
        <div className="relative p-1.5 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center shrink-0">
          <div
            aria-hidden="true"
            className={cn('grid gap-[2px]', gridColsClass)}
          >
            {delays.map((delay, index) => {
              const isInactive = delay === null;
              return (
                <span
                  key={index}
                  className={cn(
                    'w-[4.5px] h-[4.5px] bg-foreground transition-opacity',
                    isRound ? 'rounded-full' : 'rounded-[1px]'
                  )}
                  style={{
                    opacity: isInactive ? 0.08 : 0.2,
                    animation:
                      isInactive || isPaused
                        ? 'none'
                        : `ai-cell-glow ${cycleDuration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms infinite`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Shimmering Phase Label */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text-muted via-foreground to-text-muted bg-[length:200%_100%]"
              style={{
                animation: isPaused ? 'none' : 'ai-shimmer 1.8s linear infinite',
              }}
            >
              {label}
            </span>

            {/* Live Tabular Timer */}
            {showTimer && (
              <span className="font-mono text-[11px] tabular-nums text-text-muted bg-secondary/40 px-1.5 py-0.5 rounded border border-border/40">
                {elapsed}
              </span>
            )}
          </div>

          {sublabel && (
            <span className="text-[11px] text-text-muted/80 font-mono tracking-tight line-clamp-1">
              {sublabel}
            </span>
          )}
        </div>

        {/* Telemetry Expand Toggle */}
        {showTelemetry && (
          <button
            type="button"
            onClick={() => setTelemetryOpen(!telemetryOpen)}
            aria-label="Toggle telemetry details"
            className="ml-auto pl-2 text-text-muted hover:text-text-primary p-1 rounded transition-colors cursor-pointer"
          >
            <motion.div animate={{ rotate: telemetryOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
          </button>
        )}
      </div>

      {/* Expandable Telemetry Drawer */}
      <AnimatePresence>
        {showTelemetry && telemetryOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-2.5 border-t border-border/50 grid grid-cols-3 gap-2">
              {telemetry.map((t, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    {t.label}
                  </span>
                  <span className="text-xs font-mono font-medium text-text-primary mt-0.5">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ai-cell-glow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.15);
          }
        }
        @keyframes ai-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
