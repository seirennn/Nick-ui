'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Knob } from '@/components/ui/knob';
import { Gauge } from '@/components/ui/gauge';
import { AreaChart } from '@/components/ui/charts';
import { useBlockViewer } from './BlockViewer';
import {
  SidebarProvider,
  useSidebar,
  WorkstationSidebar,
  WorkstationCommandPalette,
  WorkstationAppearanceModal,
  SplitLayoutMode,
  TimeframeMode,
} from './workstation';
import {
  Search,
  Command,
  Sliders,
  Columns,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Radio,
  Terminal,
  ArrowUpRight,
  Shield,
  Activity,
  Layers,
  Palette,
  Download,
  Copy,
  Check,
} from 'lucide-react';

// Inner Workstation Console that consumes SidebarContext and BlockViewerContext
function WorkstationContent() {
  const { isFullscreen, viewport } = useBlockViewer();
  const {
    splitLayout,
    setSplitLayout,
    timeframe,
    setTimeframe,
    setIsSearchOpen,
    setIsAppearanceOpen,
    gainKnob,
    setGainKnob,
    dampingKnob,
    setDampingKnob,
    activeNav,
  } = useSidebar();

  const [activeLogFilter, setActiveLogFilter] = React.useState<'all' | 'consensus' | 'settlement'>('all');
  const [copiedData, setCopiedData] = React.useState(false);

  // High-precision telemetry spline data
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
        { label: '10m', value: 6200, baseline: 5100 },
        { label: '20m', value: 7100, baseline: 5800 },
        { label: '30m', value: 6800, baseline: 5600 },
        { label: '40m', value: 8400, baseline: 6400 },
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
      { label: '00:00', value: 4100, baseline: 3800 },
      { label: '01:00', value: 5300, baseline: 4200 },
      { label: '02:00', value: 6900, baseline: 5100 },
      { label: '03:00', value: 8400, baseline: 6300 },
      { label: '04:00', value: 7800, baseline: 6100 },
      { label: '05:00', value: 9600, baseline: 7200 },
      { label: '06:00', value: 10450, baseline: 8100 },
    ];
  }, [timeframe]);

  // Orderbook depth data with calculated percentages for depth visualization bars
  const orderbook = [
    { price: '148.90', size: '2,140', total: '18.2k', type: 'ask', depthPercent: 28 },
    { price: '148.85', size: '4,500', total: '16.1k', type: 'ask', depthPercent: 55 },
    { price: '148.80', size: '7,890', total: '11.6k', type: 'ask', depthPercent: 88 },
    { price: '148.75', size: '5,200', total: '5.2k', type: 'bid', depthPercent: 64 },
    { price: '148.70', size: '11,400', total: '16.6k', type: 'bid', depthPercent: 95 },
    { price: '148.65', size: '14,200', total: '30.8k', type: 'bid', depthPercent: 100 },
  ];

  const executionLogs = [
    { id: '1', time: '14:24:01', node: 'NODE_04', type: 'consensus', message: 'consensus validated epoch #99281', status: 'optimal' },
    { id: '2', time: '14:24:02', node: 'ROUTER_01', type: 'settlement', message: 'settled 14,200 operations across 4 regional meshes', status: 'settled' },
    { id: '3', time: '14:24:03', node: 'POOL_A', type: 'settlement', message: 'rebalance liquid staking pool depth optimal', status: 'verified' },
    { id: '4', time: '14:24:04', node: 'NODE_02', type: 'consensus', message: 'optical cross-connect handshake verified (0.9ms)', status: 'optimal' },
  ];

  const filteredLogs = activeLogFilter === 'all'
    ? executionLogs
    : executionLogs.filter((log) => log.type === activeLogFilter);

  const handleCopyTelemetry = () => {
    navigator.clipboard.writeText(JSON.stringify({ chartPoints, orderbook, executionLogs }, null, 2));
    setCopiedData(true);
    setTimeout(() => setCopiedData(false), 2000);
  };

  const isEdgeToEdge = isFullscreen && viewport === '100%';

  return (
    <div
      className={cn(
        'relative w-full bg-[#08080a] text-neutral-200 flex flex-col md:flex-row font-sans select-none overflow-hidden transition-all duration-300',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none'
          : 'rounded-[26px] border border-border/80 shadow-2xl min-h-[860px]'
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. RESIZABLE ARCHITECTURAL SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <WorkstationSidebar />

      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN CONSOLE VIEWPORT & SCULPTED TOP ARCHITECTURAL BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#08080a] relative">
        {/* Subtle Environmental Light (Strictly global, optical falloff) */}
        <div
          className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[350px] opacity-[0.02]"
          style={{
            background: 'radial-gradient(ellipse at top center, #ffffff 0%, transparent 70%)',
          }}
        />

        {/* Sculpted Top Command Bar */}
        <header className="h-14 px-5 sm:px-6 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-gradient-to-b from-white/[0.03] to-transparent shrink-0 z-10">
          {/* Left: Breadcrumbs & Cluster Health */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400">CONSOLE /</span>
              <span className="text-white font-medium truncate">CLUSTER-ALPHA-4</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
              99.98% Nominal
            </span>
          </div>

          {/* Right: Layout Switcher, Timeframe & Action Pills */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Split-Pane Layout Mode Selector */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              <button
                type="button"
                onClick={() => setSplitLayout('1-pane')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '1-pane'
                    ? 'bg-white/[0.1] text-white shadow-2xs font-medium'
                    : 'text-neutral-400 hover:text-white'
                )}
                title="Single Focus Canvas"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Focus</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitLayout('2-split')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '2-split'
                    ? 'bg-white/[0.1] text-white shadow-2xs font-medium'
                    : 'text-neutral-400 hover:text-white'
                )}
                title="2-Pane Split LR"
              >
                <Columns className="w-3 h-3" />
                <span className="hidden sm:inline">Split LR</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitLayout('3-pane')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '3-pane'
                    ? 'bg-white/[0.1] text-white shadow-2xs font-medium'
                    : 'text-neutral-400 hover:text-white'
                )}
                title="3-Pane Command Matrix"
              >
                <LayoutGrid className="w-3 h-3" />
                <span className="hidden sm:inline">3-Pane</span>
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="hidden md:flex items-center gap-0.5 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              {(['1M', '5M', '1H', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    'px-2 py-0.5 rounded-lg transition-colors cursor-pointer',
                    timeframe === tf
                      ? 'bg-white/[0.1] text-white font-medium shadow-2xs'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyTelemetry}
                title="Copy Telemetry JSON"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                {copiedData ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                title="Command Palette (⌘K)"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Command className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsAppearanceOpen(true)}
                title="Theme & Appearance (⌘T)"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </header>

        {/* ─── Multi-Pane Split Canvas ─── */}
        <div className="flex-1 p-5 sm:p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Dynamic Split Grid */}
          <div
            className={cn(
              'grid gap-5 items-start transition-all',
              splitLayout === '1-pane' && 'grid-cols-1',
              splitLayout === '2-split' && 'grid-cols-1 lg:grid-cols-12',
              splitLayout === '3-pane' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-12'
            )}
          >
            {/* ══════════════════════════════════════════════════════════
                PANE 1: TELEMETRY ORDERBOOK & BAYESIAN BKT STATE
            ══════════════════════════════════════════════════════════ */}
            {(splitLayout === '2-split' || splitLayout === '3-pane') && (
              <div className={cn(splitLayout === '2-split' ? 'lg:col-span-4' : 'lg:col-span-3', 'space-y-4')}>
                {/* Micro-Orderbook with Tactile Depth Bars */}
                <Card variant="tactile" depth="medium" className="p-4 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-neutral-300" />
                      <span className="text-xs font-medium text-white">Orderbook Liquidity</span>
                    </div>
                    <Badge variant="mono" className="text-[10px]">L2 Stream</Badge>
                  </div>

                  {/* Orderbook Rows with Subtle Depth Background Bars */}
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-neutral-400 px-1 pb-1 text-[10px] tracking-wider uppercase">
                      <span>Price</span>
                      <span>Size</span>
                      <span>Total</span>
                    </div>

                    {orderbook.map((row, idx) => (
                      <div
                        key={idx}
                        className="relative flex justify-between px-1.5 py-1 rounded overflow-hidden group"
                      >
                        {/* Soft Depth Fill Bar behind text */}
                        <div
                          className={cn(
                            'absolute inset-y-0 right-0 pointer-events-none transition-all duration-300',
                            row.type === 'ask'
                              ? 'bg-rose-500/[0.08] group-hover:bg-rose-500/[0.14]'
                              : 'bg-emerald-500/[0.08] group-hover:bg-emerald-500/[0.14]'
                          )}
                          style={{ width: `${row.depthPercent}%` }}
                        />

                        <span
                          className={cn(
                            'relative z-10 font-medium',
                            row.type === 'ask' ? 'text-rose-400/90' : 'text-emerald-400/90'
                          )}
                        >
                          {row.price}
                        </span>
                        <span className="relative z-10 text-neutral-300">{row.size}</span>
                        <span className="relative z-10 text-neutral-400">{row.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tactile Keycap Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
                    <Button
                      variant="tactile"
                      depth="deep"
                      size="sm"
                      className="bg-emerald-600/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/25 text-xs font-mono"
                    >
                      Bid Instant
                    </Button>
                    <Button
                      variant="tactile"
                      depth="deep"
                      size="sm"
                      className="bg-rose-600/15 border-rose-500/40 text-rose-400 hover:bg-rose-600/25 text-xs font-mono"
                    >
                      Ask Liquidate
                    </Button>
                  </div>
                </Card>

                {/* Bayesian BKT Consensus Card */}
                <Card variant="recessed" depth="subtle" className="p-4 space-y-2 bg-white/[0.02] border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">BKT Consensus</span>
                    <span className="font-mono text-emerald-400">99.98%</span>
                  </div>
                  <div className="py-2 flex justify-center">
                    <Gauge
                      value={94}
                      min={0}
                      max={100}
                      label="Sync Rate"
                      unit="%"
                      size={130}
                      variant="tactile"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 text-center border-t border-white/[0.06] pt-2">
                    Zero Byzantine faults across 4 meshes
                  </div>
                </Card>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════
                PANE 2: HARMONIC TELEMETRY CANVAS & EXECUTION LOG STREAM
            ══════════════════════════════════════════════════════════ */}
            <div
              className={cn(
                splitLayout === '1-pane' && 'col-span-1',
                splitLayout === '2-split' && 'lg:col-span-8',
                splitLayout === '3-pane' && 'lg:col-span-6',
                'space-y-4'
              )}
            >
              <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
                  <div>
                    <h3 className="text-sm font-medium text-white">Ingress Throughput Progression</h3>
                    <p className="text-xs text-neutral-400">Real-time Catmull-Rom cubic spline telemetry</p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+24.8% vs last epoch</span>
                  </div>
                </div>

                <div className="pt-2">
                  <AreaChart
                    data={chartPoints}
                    height={230}
                    showGrid={true}
                    className="w-full border-0 bg-transparent shadow-none p-0"
                  />
                </div>

                {/* Ingress Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08] font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 uppercase">Peak Ingress</div>
                    <div className="text-xs font-medium text-white mt-0.5">18.4 GB/s</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 uppercase">Median Latency</div>
                    <div className="text-xs font-medium text-emerald-400 mt-0.5">1.1ms</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 uppercase">Dropped Frames</div>
                    <div className="text-xs font-medium text-white mt-0.5">0.000%</div>
                  </div>
                </div>
              </Card>

              {/* Execution Log Stream Shelf */}
              <Card variant="recessed" depth="medium" className="p-4 space-y-2.5 font-mono text-xs bg-white/[0.02] border-white/[0.08]">
                <div className="flex items-center justify-between text-neutral-400 border-b border-white/[0.06] pb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="text-xs text-white font-medium">Execution Stream</span>
                  </div>

                  {/* Filter Pills */}
                  <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px]">
                    {(['all', 'consensus', 'settlement'] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveLogFilter(filter)}
                        className={cn(
                          'px-2 py-0.5 rounded-md capitalize transition-colors cursor-pointer',
                          activeLogFilter === filter
                            ? 'bg-white/[0.1] text-white font-medium'
                            : 'text-neutral-400 hover:text-white'
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Log Rows */}
                <div className="space-y-1.5 text-[11px] text-neutral-400 leading-relaxed pt-1">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2 hover:text-neutral-200 transition-colors">
                      <span className="text-neutral-500 shrink-0">[{log.time}]</span>
                      <span className="text-white font-medium shrink-0">{log.node}</span>
                      <span className="truncate">{log.message}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* ══════════════════════════════════════════════════════════
                PANE 3: ANALOG ROTARY HARDWARE DIALS & MESH MATRIX
            ══════════════════════════════════════════════════════════ */}
            {splitLayout === '3-pane' && (
              <div className="lg:col-span-3 space-y-4">
                <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-medium text-white">Hardware Rotary Dials</span>
                    <Badge variant="mono" className="text-[10px]">Analog Knobs</Badge>
                  </div>

                  <div className="flex flex-col items-center gap-4 py-2">
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

                  <p className="text-[11px] text-neutral-400 leading-tight pt-2 border-t border-white/[0.08] text-center">
                    Scroll or drag vertically to adjust analog DSP parameters.
                  </p>
                </Card>

                {/* Mesh Availability Matrix */}
                <Card variant="recessed" depth="subtle" className="p-4 space-y-2.5 bg-white/[0.02] border-white/[0.08] text-xs font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-neutral-400 text-[10px] uppercase">
                    <span>Regional Mesh</span>
                    <span>Latency</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">us-east (Virginia)</span>
                      <span className="text-emerald-400">0.8ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">eu-central (Frankfurt)</span>
                      <span className="text-emerald-400">1.2ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">ap-northeast (Tokyo)</span>
                      <span className="text-emerald-400">1.9ms</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global In-Workstation Modals */}
      <WorkstationCommandPalette />
      <WorkstationAppearanceModal />
    </div>
  );
}

// Default export wraps with SidebarProvider
export function WorkstationDashboard() {
  return (
    <SidebarProvider>
      <WorkstationContent />
    </SidebarProvider>
  );
}
