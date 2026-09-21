'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
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
  Shield,
  Clock,
  Download,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface OrderbookRow {
  price: string;
  size: string;
  total: string;
  type: 'ask' | 'bid';
}

const ORDERBOOK_DATA: OrderbookRow[] = [
  { price: '142.85', size: '1,420', total: '12.4k', type: 'ask' },
  { price: '142.80', size: '3,810', total: '10.9k', type: 'ask' },
  { price: '142.75', size: '8,200', total: '7.1k', type: 'ask' },
  { price: '142.70', size: '4,150', total: '4.1k', type: 'bid' },
  { price: '142.65', size: '9,920', total: '14.0k', type: 'bid' },
  { price: '142.60', size: '12,400', total: '26.4k', type: 'bid' },
];

interface ExecutionLog {
  id: string;
  time: string;
  node: string;
  category: 'SYS' | 'ROUTE' | 'CONSENSUS' | 'FAULT';
  message: string;
}

const EXECUTION_LOGS: ExecutionLog[] = [
  { id: '1', time: '14:24:01.104', node: 'NODE_04', category: 'SYS', message: 'consensus verified payload #84920 in 0.8ms' },
  { id: '2', time: '14:24:01.892', node: 'ROUTER_01', category: 'ROUTE', message: 'zero-loss settlement committed to us-east-2 mesh' },
  { id: '3', time: '14:24:02.418', node: 'TX_BATCH', category: 'CONSENSUS', message: '3,420 operations committed in 1.1ms' },
  { id: '4', time: '14:24:03.112', node: 'INGRESS_02', category: 'SYS', message: 'dynamic ingress reroute payload balanced across cluster' },
  { id: '5', time: '14:24:03.950', node: 'HEARTBEAT', category: 'CONSENSUS', message: 'quorate term 148 acknowledged (5/5 nodes synchronized)' },
];

export function MissionControlDashboard() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [timeframe, setTimeframe] = React.useState<'1M' | '5M' | '1H' | '1D'>('5M');
  const [gainKnob, setGainKnob] = React.useState(74);
  const [dampingKnob, setDampingKnob] = React.useState(38);
  const [logFilter, setLogFilter] = React.useState<'ALL' | 'SYS' | 'ROUTE' | 'CONSENSUS'>('ALL');
  const [copied, setCopied] = React.useState(false);
  const [emergencyArmed, setEmergencyArmed] = React.useState(false);

  // Chart data calculation based on timeframe
  const chartPoints = React.useMemo(() => {
    if (timeframe === '1M') {
      return [
        { label: '00s', value: 8100, baseline: 7400 },
        { label: '10s', value: 8900, baseline: 7600 },
        { label: '20s', value: 8400, baseline: 7500 },
        { label: '30s', value: 9200, baseline: 7800 },
        { label: '40s', value: 9800, baseline: 8100 },
        { label: '50s', value: 9600, baseline: 8000 },
        { label: '60s', value: 10450, baseline: 8400 },
      ];
    }
    if (timeframe === '1H') {
      return [
        { label: '10m', value: 5200, baseline: 4600 },
        { label: '20m', value: 6800, baseline: 5400 },
        { label: '30m', value: 7100, baseline: 5900 },
        { label: '40m', value: 8400, baseline: 6800 },
        { label: '50m', value: 9100, baseline: 7200 },
        { label: '60m', value: 9800, baseline: 7800 },
      ];
    }
    if (timeframe === '1D') {
      return [
        { label: '04:00', value: 4200, baseline: 3600 },
        { label: '08:00', value: 5800, baseline: 4400 },
        { label: '12:00', value: 7400, baseline: 5900 },
        { label: '16:00', value: 8900, baseline: 6800 },
        { label: '20:00', value: 10200, baseline: 7900 },
        { label: '24:00', value: 11400, baseline: 8600 },
      ];
    }
    // Default 5M
    return [
      { label: '00:00', value: 3400, baseline: 3100 },
      { label: '01:00', value: 4200, baseline: 3600 },
      { label: '02:00', value: 5800, baseline: 4100 },
      { label: '03:00', value: 7200, baseline: 5200 },
      { label: '04:00', value: 6800, baseline: 4900 },
      { label: '05:00', value: 8900, baseline: 6100 },
      { label: '06:00', value: 9450, baseline: 7000 },
    ];
  }, [timeframe]);

  const filteredLogs = React.useMemo(() => {
    if (logFilter === 'ALL') return EXECUTION_LOGS;
    return EXECUTION_LOGS.filter((l) => l.category === logFilter);
  }, [logFilter]);

  const handleCopyTelemetry = () => {
    navigator.clipboard.writeText(JSON.stringify({ chartPoints, ORDERBOOK_DATA, EXECUTION_LOGS }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full bg-[#08080a] text-neutral-200 font-sans select-none overflow-hidden transition-all duration-300 flex flex-col space-y-4',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-4 sm:p-6 overflow-y-auto'
          : 'p-4 sm:p-6 rounded-[28px] border border-white/[0.08] shadow-2xl'
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. GLOBAL MISSION COMMAND DOCK & TICKER BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-white/[0.08] bg-[#0d0d11] shadow-xl flex-wrap">
        {/* Left: Ticker, Mission Status & Clock */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            <span className="text-xs font-mono font-medium text-white">MISSION-OPS // CLUSTER-ALPHA</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span>LATENCY:</span>
              <span className="text-white font-medium">0.92ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>INGRESS:</span>
              <span className="text-emerald-400 font-medium">124.8 GB/s</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>CONSENSUS:</span>
              <span className="text-white font-medium">99.98%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>UTC:</span>
              <span className="text-neutral-300">14:24:08.412</span>
            </div>
          </div>
        </div>

        {/* Right: Timeframe Switcher & Operator Pill */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Timeframe Switcher */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
            {(['1M', '5M', '1H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-all cursor-pointer select-none',
                  timeframe === tf
                    ? 'bg-white/10 text-white font-medium shadow-2xs'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyTelemetry}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            className="text-xs font-mono h-8 border-white/10 hover:border-white/20 text-neutral-200"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-mono cursor-pointer select-none">
            <div className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center font-medium text-[11px] text-white">
              A
            </div>
            <span className="hidden sm:inline text-neutral-200 font-medium">alpha-ops</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          2. 3-PANE MODULAR SPATIAL GRID (16PX GAPS)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* ── PANE 1: LEFT LIQUIDITY DEPTH & CONSENSUS STATE (cols 1-3) ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Micro Orderbook Card */}
          <Card variant="tactile" depth="medium" className="p-4 space-y-4 bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-neutral-300" />
                <span className="text-xs font-medium text-white">Orderbook Liquidity</span>
              </div>
              <Badge variant="mono" className="text-[10px]">L2 Depth</Badge>
            </div>

            {/* Spread Indicator Strip */}
            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[10px] font-mono text-neutral-400">
              <span>SPREAD: 0.05 (0.035%)</span>
              <span className="text-emerald-400 font-medium">DEPTH: $48.2M</span>
            </div>

            {/* Orderbook Rows with Bi-directional Depth Background Bars */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-neutral-400 px-1 pb-1">
                <span>PRICE</span>
                <span>SIZE</span>
                <span>TOTAL</span>
              </div>
              {ORDERBOOK_DATA.map((row, idx) => (
                <div
                  key={idx}
                  className="relative flex justify-between items-center px-2 py-1 rounded text-[11px] overflow-hidden group hover:bg-white/[0.04] transition-colors"
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
                  <span className="text-neutral-200 relative z-10">{row.size}</span>
                  <span className="text-neutral-400 relative z-10">{row.total}</span>
                </div>
              ))}
            </div>

            {/* Tactile Keycap Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
              <Button variant="outline" size="sm" className="h-8 text-xs font-mono border-white/10 hover:border-white/20 text-neutral-200">
                Bid Instant
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-mono border-white/10 hover:border-white/20 text-neutral-200">
                Ask Liquidate
              </Button>
            </div>
          </Card>

          {/* Bayesian BKT Consensus Card */}
          <Card variant="recessed" depth="subtle" className="p-4 space-y-3 bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white">Bayesian BKT State</span>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">OPTIMAL</span>
            </div>
            <div className="py-2 flex justify-center">
              <Gauge value={88} min={0} max={100} label="Consensus Rate" unit="%" size={140} variant="tactile" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-neutral-400 text-center">
              <div className="p-1.5 rounded-lg bg-white/[0.02]">Round #48,920</div>
              <div className="p-1.5 rounded-lg bg-white/[0.02] text-emerald-400">0 Byzantine Faults</div>
            </div>
          </Card>
        </div>

        {/* ── PANE 2: CENTER HIGH-FREQUENCY CHARTS & ROUTING (cols 4-8) ── */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">High-Frequency Ingress Flow</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Distributed throughput across edge mesh</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.2%</span>
              </div>
            </div>

            {/* Area Progression Chart */}
            <div className="pt-2">
              <AreaChart data={chartPoints} height={210} showGrid={true} className="w-full" />
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06] text-center font-mono">
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] text-neutral-400">PEAK INGRESS</div>
                <div className="text-xs font-medium text-white mt-0.5">18.4k req/s</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] text-neutral-400">REJECT RATIO</div>
                <div className="text-xs font-medium text-emerald-400 mt-0.5">0.001%</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] text-neutral-400">P99 LATENCY</div>
                <div className="text-xs font-medium text-white mt-0.5">1.8ms</div>
              </div>
            </div>
          </Card>

          {/* Execution Terminal Stream Card */}
          <Card variant="recessed" depth="medium" className="p-4 space-y-3 font-mono text-xs bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 border-b border-white/[0.06] pb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-200" />
                <span className="text-white font-medium">Mission Execution Log</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 text-[10px] font-mono">
                {(['ALL', 'SYS', 'ROUTE', 'CONSENSUS'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setLogFilter(filter)}
                    className={cn(
                      'px-2 py-0.5 rounded-md transition-colors cursor-pointer select-none',
                      logFilter === filter
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-neutral-400 hover:text-white'
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Log Stream Output */}
            <div className="space-y-1.5 text-[11px] text-neutral-300 leading-relaxed max-h-36 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2">
                  <span className="text-neutral-400 shrink-0">[{log.time}]</span>
                  <span
                    className={cn(
                      'px-1 py-0.2 rounded text-[9px] font-semibold shrink-0',
                      log.category === 'SYS' && 'bg-emerald-500/15 text-emerald-400',
                      log.category === 'ROUTE' && 'bg-blue-500/15 text-blue-400',
                      log.category === 'CONSENSUS' && 'bg-purple-500/15 text-purple-400'
                    )}
                  >
                    {log.category}
                  </span>
                  <span className="text-neutral-200 truncate">{log.message}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── PANE 3: RIGHT HARDWARE DIALS & RISK MATRIX (cols 9-12) ── */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neutral-300" />
                <span className="text-xs font-medium text-white">Hardware Parameter Dials</span>
              </div>
              <Badge variant="mono" className="text-[10px]">Physical Knobs</Badge>
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
                  label="Master Gain"
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
                  label="Damping"
                  variant="recessed"
                />
                <span className="text-[11px] font-mono text-neutral-400">{dampingKnob}% Attenuation</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-tight pt-2 border-t border-white/[0.06] text-center">
              Multi-input physics: Drag vertically or scroll over dials to adjust runtime sensitivity.
            </p>
          </Card>

          {/* Regional Mesh Matrix */}
          <Card variant="tactile" depth="subtle" className="p-4 space-y-3 bg-[#0d0d11] border-white/[0.08]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white">Regional Mesh Matrix</span>
              <span className="text-[10px] font-mono text-neutral-400">4 Regions Synchronized</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              {[
                { region: 'us-east-1 (N. Virginia)', sla: '99.99%', latency: '0.8ms', role: 'Primary' },
                { region: 'eu-central-1 (Frankfurt)', sla: '99.98%', latency: '1.2ms', role: 'Optimal' },
                { region: 'ap-southeast-1 (Singapore)', sla: '99.95%', latency: '2.4ms', role: 'Mesh' },
                { region: 'sa-east-1 (São Paulo)', sla: '99.91%', latency: '4.1ms', role: 'Standby' },
              ].map((mesh) => (
                <div key={mesh.region} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="leading-tight">
                    <div className="text-neutral-200">{mesh.region}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{mesh.latency} · {mesh.role}</div>
                  </div>
                  <span className="text-emerald-400 font-medium">{mesh.sla}</span>
                </div>
              ))}
            </div>

            {/* Emergency Failover Trigger */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono text-[11px]">Manual Bypass Mode</span>
              <button
                type="button"
                onClick={() => setEmergencyArmed((prev) => !prev)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-colors cursor-pointer',
                  emergencyArmed
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white'
                )}
              >
                {emergencyArmed ? 'Bypass Armed' : 'Bypass Disarmed'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
