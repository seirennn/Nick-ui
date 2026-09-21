'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Knob } from '@/components/ui/knob';
import { Gauge } from '@/components/ui/gauge';
import { AreaChart, Sparkline } from '@/components/ui/charts';
import { useBlockViewer } from './BlockViewer';
import {
  Activity,
  Cpu,
  Radio,
  ShieldAlert,
  Terminal,
  Zap,
  Layers,
  RefreshCw,
  Sliders,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  User,
} from 'lucide-react';

export function MissionControlDashboard() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [timeframe, setTimeframe] = React.useState<'1M' | '5M' | '1H' | '1D'>('5M');
  const [gainKnob, setGainKnob] = React.useState(74);
  const [dampingKnob, setDampingKnob] = React.useState(38);
  const [activeTab, setActiveTab] = React.useState<'telemetry' | 'orderbook' | 'execution'>('telemetry');

  // Chart data for high-frequency ingress
  const chartPoints = [
    { label: '00:00', value: 3400, baseline: 3100 },
    { label: '04:00', value: 4200, baseline: 3600 },
    { label: '08:00', value: 5800, baseline: 4100 },
    { label: '12:00', value: 7200, baseline: 5200 },
    { label: '16:00', value: 6800, baseline: 4900 },
    { label: '20:00', value: 8900, baseline: 6100 },
    { label: '24:00', value: 9450, baseline: 7000 },
  ];

  const orderbook = [
    { price: '142.85', size: '1,420', total: '12.4k', type: 'ask' },
    { price: '142.80', size: '3,810', total: '10.9k', type: 'ask' },
    { price: '142.75', size: '8,200', total: '7.1k', type: 'ask' },
    { price: '142.70', size: '4,150', total: '4.1k', type: 'bid' },
    { price: '142.65', size: '9,920', total: '14.0k', type: 'bid' },
    { price: '142.60', size: '12,400', total: '26.4k', type: 'bid' },
  ];

  return (
    <div
      className={cn(
        'w-full bg-[#08080a] text-neutral-200 font-sans select-none overflow-hidden transition-all duration-300 flex flex-col',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-4 sm:p-6 space-y-4 overflow-y-auto'
          : 'rounded-[28px] border border-border/80 shadow-2xl p-4 sm:p-6 space-y-4'
      )}
    >
      {/* ─── Global Command & Ticker Bar ─── */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex-wrap">
        {/* Left: Ticker & Active Mission */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            <span className="text-xs font-mono font-medium text-neutral-200">CLUSTER-ALPHA // LIVE</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span>LATENCY:</span>
              <span className="text-neutral-200">1.2ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>INGRESS:</span>
              <span className="text-emerald-400 font-medium">98.4 GB/s</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>CONSENSUS:</span>
              <span className="text-neutral-200">99.98%</span>
            </div>
          </div>
        </div>

        {/* Right: Timeframe Switches & Sculpted Profile Pill */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Timeframe Switcher */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
            {(['1M', '5M', '1H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={cn(
                  'px-2.5 py-0.5 rounded-lg transition-all cursor-pointer select-none',
                  timeframe === tf
                    ? 'bg-white/10 text-white font-medium shadow-2xs'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-mono cursor-pointer select-none">
            <div className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center font-medium text-[11px] text-neutral-200">
              A
            </div>
            <span className="hidden sm:inline text-neutral-200 font-medium">alpha-ops</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
          </div>
        </div>
      </div>

      {/* ─── 3-Pane Modular Spatial Grid with 16px Gaps ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ── PANE 1: LEFT TELEMETRY & ORDERBOOK (cols 1-3) ── */}
        <div className="lg:col-span-3 space-y-4">
          <Card variant="tactile" depth="medium" className="p-4 space-y-4 bg-white/[0.02] border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-neutral-300" />
                <span className="text-xs font-medium text-neutral-200">Orderbook Liquidity</span>
              </div>
              <Badge variant="mono">L2 Depth</Badge>
            </div>

            {/* Micro Orderbook Table with Depth Visualization Bars */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-neutral-400 px-1 pb-1">
                <span>PRICE</span>
                <span>SIZE</span>
                <span>TOTAL</span>
              </div>
              {orderbook.map((row, idx) => (
                <div
                  key={idx}
                  className="relative flex justify-between items-center px-1.5 py-0.5 rounded text-[11px] overflow-hidden group hover:bg-white/[0.04] transition-colors"
                >
                  <div
                    className={cn(
                      'absolute inset-y-0 right-0 pointer-events-none transition-all',
                      row.type === 'ask' ? 'bg-rose-500/[0.08]' : 'bg-emerald-500/[0.08]'
                    )}
                    style={{ width: `${Math.min(100, (parseInt(row.size.replace(/,/g, '')) / 12400) * 100)}%` }}
                  />
                  <span className={cn('font-medium relative z-10', row.type === 'ask' ? 'text-rose-400' : 'text-emerald-400')}>
                    {row.price}
                  </span>
                  <span className="text-neutral-300 relative z-10">{row.size}</span>
                  <span className="text-neutral-500 relative z-10">{row.total}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Keycaps */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
              <Button variant="outline" size="sm" className="h-8 text-xs font-mono border-white/10 hover:border-white/20 text-neutral-200">
                Bid Instant
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-mono border-white/10 hover:border-white/20 text-neutral-200">
                Ask Liquidate
              </Button>
            </div>
          </Card>

          {/* Node Health Gauge Card */}
          <Card variant="recessed" depth="subtle" className="p-4 space-y-3 bg-white/[0.02] border-white/[0.08]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-200">Bayesian BKT State</span>
              <span className="text-[10px] font-mono text-emerald-400">OPTIMAL</span>
            </div>
            <div className="py-2 flex justify-center">
              <Gauge value={88} min={0} max={100} label="Consensus Rate" unit="%" size={140} variant="tactile" />
            </div>
          </Card>
        </div>

        {/* ── PANE 2: CENTER HIGH-FREQUENCY CHARTS & ROUTING (cols 4-8) ── */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-white/[0.02] border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-200">High-Frequency Ingress Flow</h3>
                <p className="text-xs text-neutral-400">Distributed throughput across edge mesh</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.2%</span>
              </div>
            </div>

            {/* Area Progression Chart */}
            <div className="pt-2">
              <AreaChart data={chartPoints} height={200} showGrid={true} className="w-full" />
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06] text-center font-mono">
              <div className="p-2 rounded-lg bg-white/[0.04]">
                <div className="text-[10px] text-neutral-400">PEAK RATE</div>
                <div className="text-xs font-medium text-neutral-200 mt-0.5">14.2k req/s</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.04]">
                <div className="text-[10px] text-neutral-400">REJECT RATIO</div>
                <div className="text-xs font-medium text-emerald-400 mt-0.5">0.002%</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.04]">
                <div className="text-[10px] text-neutral-400">P99 LATENCY</div>
                <div className="text-xs font-medium text-neutral-200 mt-0.5">2.4ms</div>
              </div>
            </div>
          </Card>

          {/* Execution Terminal Stream Card */}
          <Card variant="recessed" depth="medium" className="p-4 space-y-2 font-mono text-xs bg-white/[0.02] border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 border-b border-white/[0.06] pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-200" />
                <span>Execution Log Stream</span>
              </div>
              <span className="text-[10px] text-emerald-400">LIVE DRAIN</span>
            </div>
            <div className="space-y-1 text-[11px] text-neutral-300 leading-relaxed pt-1">
              <div>[14:20:01] <span className="text-neutral-100">NODE_04</span> consensus verified payload #84920</div>
              <div>[14:20:02] <span className="text-emerald-400">ROUTE_OK</span> zero-loss settlement to us-east-2</div>
              <div>[14:20:03] <span className="text-neutral-100">TX_BATCH</span> 3,420 operations committed in 1.1ms</div>
            </div>
          </Card>
        </div>

        {/* ── PANE 3: RIGHT HARDWARE DIALS & RISK MATRIX (cols 9-12) ── */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-white/[0.02] border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neutral-300" />
                <span className="text-xs font-medium text-neutral-200">Hardware Parameter Dials</span>
              </div>
              <Badge variant="mono">Physical Knobs</Badge>
            </div>

            {/* Knobs Cluster */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex flex-col items-center text-center space-y-2">
                <Knob
                  value={gainKnob}
                  onChange={setGainKnob}
                  min={0}
                  max={100}
                  size={80}
                  label="Master Ingress Gain"
                  variant="tactile"
                />
                <span className="text-[11px] font-mono text-neutral-400">{gainKnob}% Amplification</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <Knob
                  value={dampingKnob}
                  onChange={setDampingKnob}
                  min={0}
                  max={100}
                  size={80}
                  label="Harmonic Damping"
                  variant="recessed"
                />
                <span className="text-[11px] font-mono text-neutral-400">{dampingKnob}% Attenuation</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-tight pt-2 border-t border-white/[0.06] text-center">
              Multi-input physics: Drag vertically or scroll over dials to adjust runtime sensitivity.
            </p>
          </Card>

          {/* Cluster Status Breakdown */}
          <Card variant="tactile" depth="subtle" className="p-4 space-y-3 bg-white/[0.02] border-white/[0.08]">
            <span className="text-xs font-medium text-neutral-200">Regional Availability</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-neutral-300">us-east-1 (N. Virginia)</span>
                <span className="text-emerald-400 font-medium">99.99%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-neutral-300">eu-central-1 (Frankfurt)</span>
                <span className="text-emerald-400 font-medium">99.98%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-neutral-300">ap-southeast-1 (Singapore)</span>
                <span className="text-emerald-400 font-medium">99.95%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
