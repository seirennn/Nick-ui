'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  Activity,
  Terminal,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles,
  Command,
  ArrowUpRight,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BentoShowcaseLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function BentoShowcaseLayout({
  category = 'SYSTEM ARCHITECTURE',
  title = 'Engineered for tactile precision & zero-latency execution.',
  description = 'Every primitive is physically grounded with atmospheric lighting, measured spring physics, and native AI MCP bindings.',
  className,
}: BentoShowcaseLayoutProps) {
  const [telemetryToggle, setTelemetryToggle] = React.useState(true);
  const [samplingRate, setSamplingRate] = React.useState(85);

  return (
    <div className={cn('w-full py-10 md:py-16 space-y-8', className)}>
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="text-[11px] font-mono text-text-muted uppercase tracking-widest">
          {category}
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Cell 1: Large Telemetry Hero (Col 7) */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-[24px] border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary border border-border/70 flex items-center justify-center text-text-primary">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Throughput Telemetry</h4>
                <p className="text-xs text-text-muted">Global streaming ingress across edge relays</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Optimal
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-text-primary">
              2.48 <span className="text-base text-text-muted font-normal">Mops/sec</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">+22.4%</span>
              <span>vs previous 24h</span>
            </div>
            <div className="pt-3">
              <Sparkline data={[34, 48, 52, 60, 72, 84, 91, 100]} height={48} />
            </div>
          </div>
        </div>

        {/* Cell 2: Tactile Physical Sliders & Controls (Col 5) */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-[24px] border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary border border-border/70 flex items-center justify-center text-text-primary">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Analog Physics</h4>
                <p className="text-xs text-text-muted">Spring resistance & debounce</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/60">
              <span className="text-xs text-text-primary font-medium">Haptic Feedback</span>
              <Switch checked={telemetryToggle} onCheckedChange={setTelemetryToggle} />
            </div>

            <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-primary font-medium">Sampling Precision</span>
                <span className="font-mono text-text-muted">{samplingRate}%</span>
              </div>
              <Slider value={samplingRate} onChange={setSamplingRate} min={10} max={100} />
            </div>
          </div>
        </div>

        {/* Cell 3: Free AI MCP Integration (Col 5) */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-[24px] border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-text-primary" />
              <h4 className="text-sm font-medium text-text-primary">Free Open-Source MCP</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-text-muted border border-border/60">
              Zero Cost
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            NickUI includes a built-in Model Context Protocol server for Cursor, Claude Desktop, and Zed. Inspect, scaffold, and generate components natively.
          </p>

          <div className="p-2.5 rounded-xl bg-secondary/60 border border-border/70 font-mono text-[11px] text-text-primary flex items-center justify-between">
            <span>pnpm dlx @sehrennn/nickui init</span>
            <span className="text-[10px] text-text-muted">MIT</span>
          </div>
        </div>

        {/* Cell 4: Security & Consensus (Col 7) */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-[24px] border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-medium text-text-primary">Zero-Telemetry Guarantee</h4>
            </div>
            <span className="text-xs font-mono text-text-muted">SOC2 Compliant</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
              <div className="text-lg font-mono font-medium text-text-primary">100%</div>
              <div className="text-[10px] text-text-muted uppercase">Client Render</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
              <div className="text-lg font-mono font-medium text-text-primary">0 kB</div>
              <div className="text-[10px] text-text-muted uppercase">External Tracking</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-center">
              <div className="text-lg font-mono font-medium text-text-primary">MIT</div>
              <div className="text-[10px] text-text-muted uppercase">Free Forever</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
