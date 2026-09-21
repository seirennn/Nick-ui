'use client';

import * as React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  LayerIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  ShieldCheckIcon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface FeatureItem {
  icon?: any;
  tag?: string;
  title: string;
  spec?: string;
  description: string;
  snippet?: string;
}

export interface FeatureGridLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: LayerIcon,
    tag: 'SURFACE ERGONOMICS',
    title: 'Tactile Depth & Specular Optics',
    spec: 'RIM: 1.5px · FALLOFF: 420px · TACTILE: MILLED',
    description:
      'Raised specular rims, recessed sink wells, and milled chamfers calibrated for spatial clarity without superficial neon ornamentation.',
    snippet: '<Button variant="tactile">Actuate</Button>',
  },
  {
    icon: SlidersHorizontalIcon,
    tag: 'KINEMATICS',
    title: 'Deterministic Spring Physics',
    spec: 'MASS: 0.80 · STIFFNESS: 220 · DAMPING: 24.0',
    description:
      'Motion communicates state continuity and confidence, never interaction. Slow, continuous, non-intrusive physics that remain calm.',
    snippet: 'transition: { type: "spring", damping: 24 }',
  },
  {
    icon: TerminalIcon,
    tag: 'SOVEREIGNTY',
    title: 'Zero-Telemetry Local Execution',
    spec: 'COMPILATION: CLIENT · TELEMETRY: 0 kB · MIT',
    description:
      'Developer-owned software with direct TypeScript source code injection. No opaque black-box runtimes or third-party telemetry beacons.',
    snippet: 'pnpm dlx @sehrennn/nickui add button',
  },
  {
    icon: ShieldCheckIcon,
    tag: 'INTERCONNECT',
    title: 'Sub-Millisecond Wire Protocol & RPC',
    spec: 'TRANSPORT: STDIO · LATENCY: < 1.0ms · STRICT RPC',
    description:
      'High-throughput bidirectional JSON-RPC interface for tool execution, real-time telemetry inspection, and IDE integrations.',
    snippet: 'pnpm dlx @sehrennn/nickui mcp',
  },
];

export function FeatureGridLayout({
  category = 'ARCHITECTURAL SPECIFICATIONS',
  title = 'Engineered for spatial clarity & architectural presence.',
  description = 'Every primitive is built from the ground up to respect environmental lighting, calm non-intrusive motion, and tangible depth.',
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridLayoutProps) {
  return (
    <section className={cn('w-full py-8 md:py-14 space-y-7', className)}>
      {/* Section Header */}
      <div className="max-w-2xl space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
          {category}
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Feature Cards Grid: 2x2 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-5 transition-all hover:border-foreground/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center">
                  {Array.isArray(feat.icon) ? (
                    <HugeiconsIcon icon={feat.icon} size={16} strokeWidth={1.5} className="text-text-primary" />
                  ) : React.isValidElement(feat.icon) ? (
                    feat.icon
                  ) : typeof feat.icon === 'function' ? (
                    <feat.icon className="w-4 h-4 text-text-primary" />
                  ) : null}
                </div>
                {feat.tag && (
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {feat.tag}
                  </Badge>
                )}
              </div>

              <h3 className="text-base font-medium text-text-primary tracking-tight">
                {feat.title}
              </h3>

              {feat.spec && (
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                  {feat.spec}
                </div>
              )}

              <p className="text-xs text-text-secondary leading-relaxed pt-1">
                {feat.description}
              </p>
            </div>

            {feat.snippet && (
              <div className="pt-3 border-t border-border/50">
                <div className="px-2.5 py-1.5 rounded-lg bg-secondary/50 font-mono text-[11px] text-text-muted select-all">
                  {feat.snippet}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
