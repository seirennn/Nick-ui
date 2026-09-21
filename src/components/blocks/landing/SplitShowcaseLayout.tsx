'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Knob } from '@/components/ui/knob';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Activity01Icon,
  SlidersHorizontalIcon,
  CpuIcon,
  DashboardSquare01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface SplitBullet {
  index: string;
  title: string;
  description: string;
}

export interface SplitShowcaseLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  bullets?: SplitBullet[];
  primaryAction?: {
    label: string;
    href: string;
  };
  showcaseNode?: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

const DEFAULT_BULLETS: SplitBullet[] = [
  {
    index: '[01]',
    title: 'Atmosphere Over Decoration',
    description:
      'Visual effects express environmental presence rather than component-bound ornamentation. Light behaves as an ambient condition.',
  },
  {
    index: '[02]',
    title: 'Optical Edge Highlighting',
    description:
      'Borders softly illuminate as an optical side effect of ambient light, never explicit neon strokes or localized drop shadows.',
  },
  {
    index: '[03]',
    title: 'Deterministic State Continuity',
    description:
      'The interface remains visually complete if all motion is paused. Motion communicates state continuity and confidence, never affordance.',
  },
];

export function SplitShowcaseLayout({
  category = 'DUAL-CHASSIS ENGINEERING CANVAS',
  title = 'Optical physics meets calm, non-intrusive software.',
  description = 'Crafted to remain visually complete even if all motion is paused. Visual hierarchy is established through typography, spacing, and alignment alone.',
  bullets = DEFAULT_BULLETS,
  primaryAction = {
    label: 'Inspect Primitives',
    href: '/components',
  },
  showcaseNode,
  reversed = false,
  className,
}: SplitShowcaseLayoutProps) {
  const [timebase, setTimebase] = React.useState<'10ms' | '25ms' | '50ms'>('25ms');
  const [attenuation, setAttenuation] = React.useState(68);

  // Generate real SVG oscilloscope waveform
  const { svgPathA, svgPathB } = React.useMemo(() => {
    const count = 32;
    const width = 360;
    const height = 90;
    const step = width / (count - 1);
    const freq = timebase === '10ms' ? 3.2 : timebase === '25ms' ? 2.0 : 1.2;
    const amp = (attenuation / 100) * 28;

    let pathA = `M 0,${height / 2}`;
    let pathB = `M 0,${height / 2}`;

    for (let i = 1; i < count; i++) {
      const x = i * step;
      const angle = (i / (count - 1)) * Math.PI * 2 * freq;
      const yA = height / 2 + Math.sin(angle) * amp;
      const yB = height / 2 + Math.cos(angle * 1.05) * (amp * 0.75);

      const prevX = (i - 1) * step;
      const cpX = (prevX + x) / 2;

      pathA += ` Q ${cpX},${yA} ${x},${yA}`;
      pathB += ` Q ${cpX},${yB} ${x},${yB}`;
    }

    return { svgPathA: pathA, svgPathB: pathB };
  }, [timebase, attenuation]);

  return (
    <section
      className={cn(
        'w-full py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch',
        className
      )}
    >
      {/* Left Column: Systems Architecture & Telemetry Specs (Col 6) */}
      <div className={cn('lg:col-span-6 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6', reversed && 'lg:order-2')}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
              {category}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-text-muted border border-border/50">
              CHASSIS-01 // TELEMETRY
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-text-primary leading-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bullets with Monospace Index */}
        <div className="space-y-3.5 pt-1">
          {bullets.map((b, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/40">
              <span className="text-xs font-mono text-emerald-400 font-medium shrink-0 mt-0.5">
                {b.index}
              </span>
              <div>
                <h4 className="text-xs font-medium text-text-primary">{b.title}</h4>
                <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        {primaryAction && (
          <div className="pt-2">
            <Link href={primaryAction.href}>
              <Button
                variant="tactile"
                size="sm"
                className="text-xs"
                leftIcon={
                  <HugeiconsIcon
                    icon={DashboardSquare01Icon}
                    size={14}
                    strokeWidth={1.5}
                    className="text-text-primary"
                  />
                }
              >
                {primaryAction.label}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Right Column: Live Oscilloscope or Custom Showcase Node (Col 6) */}
      <div className={cn('lg:col-span-6 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6', reversed && 'lg:order-1')}>
        {showcaseNode ? (
          showcaseNode
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                  <HugeiconsIcon icon={Activity01Icon} size={16} strokeWidth={1.5} className="text-text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Waveform Harmonic Analyzer</h4>
                  <p className="text-xs text-text-muted">CH-1: Sine Wave · CH-2: Cosine Phase</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-text-muted border border-border/50">
                CHASSIS-02 // SCOPE
              </span>
            </div>

            {/* Oscilloscope Screen */}
            <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span className="text-emerald-400">CH-1: 440 Hz // 1.2 Vpp</span>
                <span className="text-text-primary">CH-2: 462 Hz // 0.9 Vpp</span>
              </div>

              <div className="relative w-full h-[110px] rounded-lg bg-background/80 border border-border/50 overflow-hidden flex items-center justify-center">
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-15" />
                <svg
                  className="w-full h-full relative z-10"
                  viewBox="0 0 360 90"
                  preserveAspectRatio="none"
                >
                  <path
                    d={svgPathA}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-emerald-400"
                  />
                  <path
                    d={svgPathB}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="text-text-primary/70"
                  />
                </svg>
              </div>
            </div>

            {/* Controls: Knob + Timebase Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
              <div className="sm:col-span-6 p-3 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-around">
                <Knob
                  value={attenuation}
                  onChange={setAttenuation}
                  size={52}
                  min={10}
                  max={100}
                  step={1}
                  label=""
                />
                <div className="text-right">
                  <div className="text-sm font-mono font-medium text-text-primary">{attenuation}%</div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">Attenuation</div>
                </div>
              </div>

              <div className="sm:col-span-6 p-3 rounded-xl bg-secondary/30 border border-border/50 space-y-2">
                <div className="text-[10px] font-mono text-text-muted uppercase">Sweep Timebase</div>
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  {(['10ms', '25ms', '50ms'] as const).map((tb) => (
                    <button
                      key={tb}
                      type="button"
                      onClick={() => setTimebase(tb)}
                      className={cn(
                        'flex-1 py-1 rounded transition-colors cursor-pointer text-center',
                        timebase === tb
                          ? 'bg-card text-text-primary font-medium border border-border/70 shadow-2xs'
                          : 'text-text-muted hover:text-text-secondary'
                      )}
                    >
                      {tb}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
