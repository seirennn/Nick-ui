'use client';

import * as React from 'react';
import { RailSidebar } from '@/components/ui/rail-sidebar';
import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';
import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';
import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Knob } from '@/components/ui/knob';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  Download,
  RefreshCw,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Database,
  Cpu,
  Sliders,
  Activity,
  Terminal,
  Search,
  Filter,
  Layers,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlockViewer } from './BlockViewer';

interface StreamTransaction {
  id: string;
  target: string;
  type: string;
  volume: string;
  latency: string;
  status: 'Settled' | 'Executing' | 'Verified';
}

const STREAM_DATA: StreamTransaction[] = [
  { id: '0x8f2a...c10b', target: 'Batch Auction Core', type: 'Settlement', volume: '$42,850', latency: '4.2ms', status: 'Settled' },
  { id: '0x3e1d...94fa', target: 'Liquid Staking Pool', type: 'Rebalance', volume: '$128,400', latency: '6.1ms', status: 'Verified' },
  { id: '0x7c90...a821', target: 'Order Routing Engine', type: 'Execution', volume: '$18,920', latency: '2.8ms', status: 'Settled' },
  { id: '0x1b44...d590', target: 'Arbitrage Liquidity', type: 'Inflow', volume: '$84,100', latency: '3.4ms', status: 'Executing' },
  { id: '0x99a2...fe33', target: 'Proof Generation Node', type: 'Validation', volume: '$210,000', latency: '12.0ms', status: 'Verified' },
  { id: '0x5d11...a42e', target: 'Cross-Rollup Sequencer', type: 'Consensus', volume: '$67,300', latency: '1.9ms', status: 'Settled' },
];

export function TactileStudioDashboard() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [activeNav, setActiveNav] = React.useState('overview');
  const [studioMode, setStudioMode] = React.useState<'overview' | 'settlements' | 'treasury' | 'analytics'>('overview');
  const [settlementFilter, setSettlementFilter] = React.useState<'ALL' | 'Settled' | 'Executing' | 'Verified'>('ALL');
  const [searchTx, setSearchTx] = React.useState('');
  const [gainKnob, setGainKnob] = React.useState(78);
  const [dampingKnob, setDampingKnob] = React.useState(42);
  const [copied, setCopied] = React.useState(false);

  const filteredTransactions = React.useMemo(() => {
    return STREAM_DATA.filter((tx) => {
      const matchesFilter = settlementFilter === 'ALL' || tx.status === settlementFilter;
      const matchesSearch =
        searchTx.trim() === '' ||
        tx.id.toLowerCase().includes(searchTx.toLowerCase()) ||
        tx.target.toLowerCase().includes(searchTx.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [settlementFilter, searchTx]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';

export default function Dashboard() {
  return <TactileStudioDashboard />;
}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full bg-[#08080a] text-neutral-200 font-sans select-none overflow-hidden transition-all duration-300 flex flex-col md:flex-row',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none'
          : 'rounded-[28px] border border-white/[0.08] shadow-2xl min-h-[920px]'
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. ARCHITECTURAL RAIL SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <RailSidebar
        activeId={activeNav}
        onSelect={setActiveNav}
        workspaceLogo={<BrandLogo size="xs" variant="minimal" />}
        workspaceName="NickUI Core Studio"
        className="hidden md:flex shrink-0 bg-[#0d0d11] border-r border-white/[0.08]"
      />

      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN STUDIO VIEWPORT
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#08080a]">
        {/* Top Architectural Command Bar */}
        <header className="h-16 px-6 sm:px-8 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#0d0d11] shrink-0 z-10">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">STUDIO /</span>
              <h2 className="text-sm font-medium tracking-tight text-white">
                Executive Operations & Telemetry
              </h2>
            </div>

            {/* Studio Mode Tabs */}
            <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'settlements', label: 'Settlements' },
                { id: 'treasury', label: 'Treasury' },
                { id: 'analytics', label: 'Analytics' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStudioMode(tab.id as any)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none',
                    studioMode === tab.id
                      ? 'bg-white/10 text-white font-medium shadow-2xs'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
              Live Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8 border-white/10 hover:border-white/20 text-neutral-200"
            >
              {copied ? 'Copied' : 'Copy Code'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8 bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border-white/[0.08]"
            >
              Export CSV
            </Button>
          </div>
        </header>

        {/* Scrollable Studio Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          {/* ── Row 1: The 3 Reference Metric Widgets ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {/* 1. Tactile Balance Node Trajectory Card */}
            <TactileMetricCard
              title="Balance"
              periodLabel="2024"
              value="$94,127"
              deltaText="increase 13%"
              deltaSubtext="vs last year"
              className="w-full max-w-none h-full bg-[#0d0d11] border-white/[0.08]"
            />

            {/* 2. Tactile Income Bar Highlight Card with Threshold Line */}
            <TactileBarCard
              title="Income"
              periodLabel="This Month"
              value="$12,532"
              deltaText="increase 12%"
              deltaSubtext="vs last month"
              className="w-full max-w-none h-full bg-[#0d0d11] border-white/[0.08]"
            />

            {/* 3. Dot Matrix Equalizer Revenue Card */}
            <div className="md:col-span-2 xl:col-span-1">
              <DotMatrixChart
                title="REVENUE VELOCITY"
                metric="+326%"
                previousLabel="MAY $3,250"
                currentLabel="JUN $12,392"
                footerTagline="HIGH THROUGHPUT | 2024 | ZERO LOSS"
                className="h-full bg-[#0d0d11] border-white/[0.08]"
              />
            </div>
          </div>

          {/* ── Row 2: Deep Trend Curve & Real-Time Settlement Matrix ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left (5 cols): Tactile Trend Curve Card with Top Keywords */}
            <div className="lg:col-span-5 w-full">
              <TactileTrendCard
                title="Protocol Volume Trend"
                keywords={['Batch auction', 'Liquid staking derivatives (LSD)', 'Proof rollups']}
                metricLabel="Active Validated Nodes"
                metricValue="824"
                metricDeltaSuperscript="+334"
                percentageDelta="34.4%"
                className="w-full max-w-none bg-[#0d0d11] border-white/[0.08]"
              />
            </div>

            {/* Right (7 cols): Architectural Execution Stream Table */}
            <div className="lg:col-span-7 rounded-[26px] border border-white/[0.08] bg-[#0d0d11] p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-sm font-medium tracking-tight text-white">
                    Real-Time Settlement Stream
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Sub-second consensus telemetry across distributed nodes.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="inline-flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
                  {(['ALL', 'Settled', 'Executing', 'Verified'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSettlementFilter(filter)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none',
                        settlementFilter === filter
                          ? 'bg-white/10 text-white font-medium shadow-2xs'
                          : 'text-neutral-400 hover:text-white'
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions Table with Explicit Monospace Layout */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-neutral-400 font-mono uppercase text-[10px] tracking-wider">
                      <th className="pb-2.5 font-normal">Transaction ID</th>
                      <th className="pb-2.5 font-normal">Target Node</th>
                      <th className="pb-2.5 font-normal text-right">Volume</th>
                      <th className="pb-2.5 font-normal text-right">Latency</th>
                      <th className="pb-2.5 font-normal text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] font-mono">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 text-white font-medium whitespace-nowrap">{tx.id}</td>
                        <td className="py-3 text-neutral-300 font-sans whitespace-nowrap">{tx.target}</td>
                        <td className="py-3 text-right text-white font-medium whitespace-nowrap">{tx.volume}</td>
                        <td className="py-3 text-right text-neutral-400 whitespace-nowrap">{tx.latency}</td>
                        <td className="py-3 text-right whitespace-nowrap">
                          <span
                            className={cn(
                              'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                              tx.status === 'Settled' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                              tx.status === 'Verified' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
                              tx.status === 'Executing' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            )}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Row 3: Hardware Monitor & DSP Soundstage Calibration ── */}
          <div className="rounded-[26px] border border-white/[0.08] bg-[#0d0d11] p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-neutral-300" />
                <h3 className="text-sm font-medium tracking-tight text-white">
                  Hardware Soundstage & Ingress Calibration
                </h3>
              </div>
              <Badge variant="mono" className="text-[10px]">Rotary Analog Physics</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Dial 1 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <Knob
                  value={gainKnob}
                  onChange={setGainKnob}
                  min={0}
                  max={100}
                  size={75}
                  label="Master Output"
                  variant="tactile"
                />
                <span className="text-[11px] font-mono text-neutral-400">{gainKnob}% Amplification</span>
              </div>

              {/* Dial 2 */}
              <div className="flex flex-col items-center text-center space-y-2">
                <Knob
                  value={dampingKnob}
                  onChange={setDampingKnob}
                  min={0}
                  max={100}
                  size={75}
                  label="Harmonic Damping"
                  variant="recessed"
                />
                <span className="text-[11px] font-mono text-neutral-400">{dampingKnob}% Attenuation</span>
              </div>

              {/* Vitals Summary 1 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 font-mono text-xs">
                <div className="text-[10px] text-neutral-500 uppercase">Core Affinity</div>
                <div className="text-white font-medium">8 Cores Active</div>
                <div className="text-[11px] text-emerald-400">0.00% thread lock contention</div>
              </div>

              {/* Vitals Summary 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 font-mono text-xs">
                <div className="text-[10px] text-neutral-500 uppercase">Backbone Throughput</div>
                <div className="text-white font-medium">98.4 GB/s Sustained</div>
                <div className="text-[11px] text-neutral-400">optical cross-connect nominal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
