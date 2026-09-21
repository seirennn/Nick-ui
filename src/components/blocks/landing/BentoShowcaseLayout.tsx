'use client';

import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Activity01Icon,
  TerminalIcon,
  SlidersHorizontalIcon,
  CpuIcon,
  ServerStack01Icon,
  LayerIcon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface BentoShowcaseLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function BentoShowcaseLayout({
  category = 'SYSTEMS TOPOLOGY & TELEMETRY MATRIX',
  title = 'Hardware-calibrated systems architecture & interconnect.',
  description = 'Every primitive is physically grounded with atmospheric lighting, measured spring physics, and deterministic state continuity across distributed runtime nodes.',
  className,
}: BentoShowcaseLayoutProps) {
  const [telemetryToggle, setTelemetryToggle] = React.useState(true);
  const [samplingRate, setSamplingRate] = React.useState(85);
  const [dampingPreset, setDampingPreset] = React.useState<'quintic' | 'critical' | 'linear'>('quintic');

  return (
    <div className={cn('w-full py-8 md:py-14 space-y-7', className)}>
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

      {/* Systems Architecture Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Cell 1: High-Frequency Ingress Mesh (Col 7) */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                <HugeiconsIcon icon={Activity01Icon} size={16} strokeWidth={1.5} className="text-text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Throughput Telemetry Mesh</h4>
                <p className="text-xs text-text-muted">Global streaming ingress across edge relays</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              P99: 0.8ms
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-text-primary">
                3.84 <span className="text-base text-text-muted font-normal">Mops/sec</span>
              </div>
              <div className="text-xs font-mono text-emerald-400">
                +24.6% <span className="text-text-muted font-normal">vs 24h baseline</span>
              </div>
            </div>

            <div className="pt-2">
              <Sparkline
                data={[42, 55, 68, 62, 74, 88, 92, 98, 105, 114]}
                height={48}
                className="text-emerald-500"
              />
            </div>

            {/* Edge Relay Latency Matrix */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-secondary/30 border border-border/40">
                <div className="text-text-muted text-[9px] uppercase">us-east-1</div>
                <div className="text-text-primary font-medium">0.62 ms</div>
              </div>
              <div className="p-2 rounded-lg bg-secondary/30 border border-border/40">
                <div className="text-text-muted text-[9px] uppercase">eu-central-1</div>
                <div className="text-text-primary font-medium">0.84 ms</div>
              </div>
              <div className="p-2 rounded-lg bg-secondary/30 border border-border/40">
                <div className="text-text-muted text-[9px] uppercase">ap-northeast-1</div>
                <div className="text-text-primary font-medium">1.12 ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cell 2: Physical Kinematics & Quintic Damping Module (Col 5) */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                <HugeiconsIcon icon={SlidersHorizontalIcon} size={16} strokeWidth={1.5} className="text-text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Kinematic Physics</h4>
                <p className="text-xs text-text-muted">Spring resistance & restitution</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60 border border-border/50">
              42.5 mN
            </span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/60">
              <div className="space-y-0.5">
                <span className="text-xs text-text-primary font-medium block">Haptic Actuation</span>
                <span className="text-[10px] text-text-muted font-mono block">Tactile impulse on threshold</span>
              </div>
              <Switch checked={telemetryToggle} onCheckedChange={setTelemetryToggle} />
            </div>

            <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-primary font-medium">Spring Damping Factor</span>
                <span className="font-mono text-text-muted">{samplingRate}%</span>
              </div>
              <Slider value={samplingRate} onChange={setSamplingRate} min={10} max={100} />
            </div>

            <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
              {(['quintic', 'critical', 'linear'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDampingPreset(mode)}
                  className={cn(
                    'flex-1 py-1 rounded transition-colors cursor-pointer text-center capitalize',
                    dampingPreset === mode
                      ? 'bg-secondary text-text-primary font-medium border border-border/70'
                      : 'text-text-muted hover:text-text-secondary'
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cell 3: Stdio JSON-RPC Bidirectional Wire Interconnect (Col 5) */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                <HugeiconsIcon icon={TerminalIcon} size={16} strokeWidth={1.5} className="text-text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Stdio Wire Bus</h4>
                <p className="text-xs text-text-muted">Sub-millisecond local process RPC</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">CONNECT: READY</span>
          </div>

          <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 font-mono text-[11px] text-text-secondary space-y-1.5 overflow-x-auto">
            <div className="text-text-muted">{`// Bidirectional JSON-RPC 2.0 handshake`}</div>
            <div>
              <span className="text-emerald-400 font-bold">TX &gt;</span> {`{"jsonrpc":"2.0","method":"registry.resolve"}`}
            </div>
            <div>
              <span className="text-text-primary font-bold">RX &lt;</span> {`{"result":{"primitives":48,"latency":"0.4ms"}}`}
            </div>
          </div>
        </div>

        {/* Cell 4: 8-Core Affinity Allocation Meter (Col 7) */}
        <div className="md:col-span-7 p-6 rounded-2xl border border-border/80 bg-card shadow-tactile flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                <HugeiconsIcon icon={CpuIcon} size={16} strokeWidth={1.5} className="text-text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Core Affinity Allocation</h4>
                <p className="text-xs text-text-muted">Thread pinning across 8 hardware execution threads</p>
              </div>
            </div>
            <div className="text-xs font-mono text-text-primary">8 / 8 CORES ENGAGED</div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
            {[72, 84, 91, 65, 48, 88, 94, 79].map((util, i) => (
              <div key={i} className="p-2 rounded-xl bg-secondary/30 border border-border/50 text-center space-y-1">
                <div className="text-[9px] font-mono text-text-muted uppercase">C{i}</div>
                <div className="text-xs font-mono font-medium text-text-primary">{util}%</div>
                <div className="w-full h-1 rounded-full bg-background overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      util > 85 ? 'bg-emerald-500' : 'bg-text-secondary/60'
                    )}
                    style={{ width: `${util}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
