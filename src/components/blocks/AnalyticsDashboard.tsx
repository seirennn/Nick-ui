'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AreaChart, AreaChartDataPoint } from '@/components/ui/charts/area-chart';
import { BarChart, BarChartDataPoint } from '@/components/ui/charts/bar-chart';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { RadarChart } from '@/components/ui/charts/radar-chart';
import { RadialMeter } from '@/components/ui/charts/radial-meter';
import { AnalyticsHeatmap, HeatmapCell } from '@/components/ui/charts/analytics-heatmap';
import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';
import { SegmentedControl } from '@/components/ui/segmented-control';
import {
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  Download,
  Copy,
  Check,
  Calendar,
  Activity,
  Search,
  Filter,
  ArrowUpRight,
  Database,
  Radio,
  Layers,
  Globe,
  Brain,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlockViewer } from './BlockViewer';

const REVENUE_TIMELINE_12M: AreaChartDataPoint[] = [
  { label: 'Jan', value: 74, formattedValue: '$74,000' },
  { label: 'Feb', value: 81, formattedValue: '$81,000' },
  { label: 'Mar', value: 79, formattedValue: '$79,000' },
  { label: 'Apr', value: 92, formattedValue: '$92,000' },
  { label: 'May', value: 98, formattedValue: '$98,000' },
  { label: 'Jun', value: 106, formattedValue: '$106,000' },
  { label: 'Jul', value: 112, formattedValue: '$112,000' },
  { label: 'Aug', value: 118, formattedValue: '$118,000' },
  { label: 'Sep', value: 115, formattedValue: '$115,000' },
  { label: 'Oct', value: 124, formattedValue: '$124,000' },
  { label: 'Nov', value: 129, formattedValue: '$129,000' },
  { label: 'Dec', value: 138, formattedValue: '$138,000' },
];

const REVENUE_TIMELINE_90D: AreaChartDataPoint[] = [
  { label: 'W01', value: 108, formattedValue: '$108,000' },
  { label: 'W03', value: 112, formattedValue: '$112,000' },
  { label: 'W05', value: 116, formattedValue: '$116,000' },
  { label: 'W07', value: 121, formattedValue: '$121,000' },
  { label: 'W09', value: 127, formattedValue: '$127,000' },
  { label: 'W11', value: 134, formattedValue: '$134,000' },
  { label: 'W12', value: 138, formattedValue: '$138,000' },
];

const REGIONAL_INGRESS_DATA: BarChartDataPoint[] = [
  { label: 'US-East', value: 88, formattedValue: '88.4 GB/s' },
  { label: 'EU-Cent', value: 72, formattedValue: '72.1 GB/s' },
  { label: 'AP-Tokyo', value: 61, formattedValue: '61.5 GB/s' },
  { label: 'AP-Sing', value: 45, formattedValue: '45.0 GB/s' },
  { label: 'SA-East', value: 34, formattedValue: '34.2 GB/s' },
  { label: 'AF-South', value: 21, formattedValue: '21.8 GB/s' },
];

const REGIONAL_RADAR_DATA = [
  { axis: 'Throughput', value: 94 },
  { axis: 'Latency', value: 88 },
  { axis: 'Reliability', value: 99 },
  { axis: 'Coherence', value: 82 },
  { axis: 'Precision', value: 95 },
  { axis: 'Redundancy', value: 90 },
];

const ANNUAL_HEATMAP_DATA: HeatmapCell[] = Array.from({ length: 364 }, (_, i) => {
  const d = new Date(2025, 0, 1);
  d.setDate(d.getDate() + i);
  const dateStr = d.toISOString().split('T')[0];
  const rand = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  const val = Math.abs(rand - Math.floor(rand));
  let level: 0 | 1 | 2 | 3 | 4 = 0;
  let count = 0;
  if (val > 0.85) {
    level = 4;
    count = Math.floor(val * 45) + 30;
  } else if (val > 0.65) {
    level = 3;
    count = Math.floor(val * 30) + 15;
  } else if (val > 0.4) {
    level = 2;
    count = Math.floor(val * 20) + 8;
  } else if (val > 0.2) {
    level = 1;
    count = Math.floor(val * 10) + 2;
  }
  return { date: dateStr, count, level };
});

interface Transaction {
  id: string;
  customer: string;
  plan: 'Enterprise' | 'Scale' | 'Pro';
  amount: string;
  date: string;
  hash: string;
  status: 'Completed' | 'Settling' | 'Verified';
}

const TRANSACTIONS: Transaction[] = [
  { id: '1', customer: 'Axiom Aerospace', plan: 'Enterprise', amount: '$42,500.00', date: 'Just now', hash: '0x8f2a...c391', status: 'Completed' },
  { id: '2', customer: 'Linear Dynamics', plan: 'Scale', amount: '$12,800.00', date: '3m ago', hash: '0x1b4c...9d2e', status: 'Verified' },
  { id: '3', customer: 'Vortex Protocol', plan: 'Enterprise', amount: '$68,200.00', date: '12m ago', hash: '0x7e8f...2a4b', status: 'Completed' },
  { id: '4', customer: 'Helios Analytics', plan: 'Pro', amount: '$4,200.00', date: '28m ago', hash: '0x3d1a...8e5c', status: 'Settling' },
  { id: '5', customer: 'Prism Health Systems', plan: 'Scale', amount: '$18,450.00', date: '1h ago', hash: '0x9c2b...1f4e', status: 'Completed' },
  { id: '6', customer: 'QuantCore Research', plan: 'Enterprise', amount: '$94,000.00', date: '2h ago', hash: '0x4a7e...6d3c', status: 'Verified' },
];

export function AnalyticsDashboard() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [timeframe, setTimeframe] = React.useState<'90d' | '12m'>('12m');
  const [telemetryTab, setTelemetryTab] = React.useState<'ingress' | 'radar' | 'heatmap'>('ingress');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(TRANSACTIONS, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTransactions = TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className={cn(
        'w-full bg-card select-none transition-all duration-300',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-6 md:p-8 space-y-8 overflow-y-auto'
          : 'rounded-[28px] border border-border/80 p-6 md:p-8 space-y-8 shadow-tactile'
      )}
    >
      {/* 1. Executive Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg text-text-primary font-medium tracking-tight">
              Revenue & Telemetry Analytics
            </h3>
            <Badge variant="status" status="success">Production Ledger</Badge>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Reconciled recurring ARR, multi-region ingress distribution, and verified cryptoledger streams.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Timeframe selector */}
          <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-secondary/60 border border-border/60 text-xs">
            {(['90d', '12m'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer uppercase',
                  timeframe === tf
                    ? 'bg-card text-text-primary font-medium shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            className="text-xs font-mono h-8"
          >
            {copied ? 'Copied' : 'Copy Block'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs font-mono h-8"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">Annual Run Rate</span>
            <DollarSign className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              $1,842,000
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">+14.2%</span>
              <span className="text-[11px] text-text-muted">vs previous period</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[42, 48, 55, 62, 70, 78, 86, 94]} height={26} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">Active Compute Seats</span>
            <Users className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              2,840
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">+8.6%</span>
              <span className="text-[11px] text-text-muted">seats added</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[30, 32, 38, 41, 45, 52, 59, 64]} height={26} color="#10b981" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">Gross Volume (YTD)</span>
            <CreditCard className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              $8,429,000
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">+11.8%</span>
              <span className="text-[11px] text-text-muted">growth rate</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[60, 68, 72, 75, 82, 88, 92, 98]} height={26} color="#f59e0b" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">Verification Rate</span>
            <Activity className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-medium text-text-primary">
              99.98%
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Zero faults</span>
              <span className="text-[11px] text-text-muted">all nodes synced</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[98, 99, 99, 99, 100, 100, 100, 100]} height={26} color="#10b981" />
          </div>
        </div>
      </div>

      {/* 3. Dual-Panel Visual Telemetry: Historical Area Spline + Multi-View Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Historical Net Revenue Progression */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/40">
            <div>
              <h4 className="text-sm font-medium text-text-primary tracking-tight">
                Net Revenue Velocity
              </h4>
              <span className="text-xs text-text-muted">
                Catmull-Rom cubic spline progression ($USD in thousands)
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
              <span>Peak: $138k</span>
              <span>•</span>
              <span>Baseline: $74k</span>
            </div>
          </div>

          <div className="pt-2">
            <AreaChart
              data={timeframe === '12m' ? REVENUE_TIMELINE_12M : REVENUE_TIMELINE_90D}
              height={260}
              unit="k"
              className="border-0 bg-transparent shadow-none p-0"
            />
          </div>
        </div>

        {/* Right (5 cols): Multi-Modal Telemetry Panel */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border/60 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <div>
              <h4 className="text-sm font-medium text-text-primary tracking-tight">
                {telemetryTab === 'ingress' && 'Regional Ingress Traffic'}
                {telemetryTab === 'radar' && 'Consensus Quality Web'}
                {telemetryTab === 'heatmap' && 'Consensus Density'}
              </h4>
              <span className="text-xs text-text-muted">
                {telemetryTab === 'ingress' && 'Recessed tactile guide channels (GB/s)'}
                {telemetryTab === 'radar' && '6-axis multi-dimensional verification'}
                {telemetryTab === 'heatmap' && '52-week distributed ledger activity'}
              </span>
            </div>

            <SegmentedControl
              size="sm"
              variant="recessed"
              value={telemetryTab}
              onChange={(v) => setTelemetryTab(v as any)}
              options={[
                { value: 'ingress', label: 'Ingress' },
                { value: 'radar', label: 'Radar' },
                { value: 'heatmap', label: 'Matrix' },
              ]}
            />
          </div>

          <div className="pt-2 flex items-center justify-center min-h-[260px]">
            {telemetryTab === 'ingress' && (
              <BarChart
                data={REGIONAL_INGRESS_DATA}
                height={260}
                unit=" GB/s"
                className="border-0 bg-transparent shadow-none p-0 w-full"
              />
            )}
            {telemetryTab === 'radar' && (
              <RadarChart
                data={REGIONAL_RADAR_DATA}
                size={240}
                className="border-0 bg-transparent shadow-none p-0"
              />
            )}
            {telemetryTab === 'heatmap' && (
              <AnalyticsHeatmap
                data={ANNUAL_HEATMAP_DATA}
                title="Consensus Validations"
                totalLabel="Annual Ops"
                className="border-0 bg-transparent shadow-none p-0 w-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Secondary Performance Row: Radial Capacity Meter + Dot Matrix Histogram + Jitter Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Multi-Tier Cluster Capacity Radial Meter */}
        <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-tactile flex flex-col items-center justify-between space-y-3">
          <div className="w-full flex items-center justify-between pb-2 border-b border-border/50 text-xs">
            <span className="font-mono uppercase tracking-wider text-text-muted">Cluster Infrastructure</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">99.4% Uptime</span>
          </div>
          <RadialMeter
            centerLabel="Total Load"
            size={190}
            strokeWidth={8}
            showLegend={true}
            className="border-0 bg-transparent shadow-none p-0"
            series={[
              { id: 'cache', label: 'Edge Cache', value: 99, color: 'var(--text-primary)' },
              { id: 'storage', label: 'Datastore', value: 73, color: 'var(--text-muted)' },
              { id: 'ingress', label: 'Optical Ingress', value: 88, color: 'var(--border)' },
            ]}
          />
          <div className="w-full text-center text-[11px] font-mono text-text-muted">
            0.8ms average origin round-trip across 12 edge nodes
          </div>
        </div>

        {/* Card 2: Dot Matrix Histogram */}
        <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-tactile flex flex-col justify-between space-y-3">
          <div className="w-full flex items-center justify-between pb-2 border-b border-border/50 text-xs">
            <span className="font-mono uppercase tracking-wider text-text-muted">Transaction Inflow</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">+326% YoY</span>
          </div>
          <DotMatrixChart
            title="SETTLEMENTS"
            metric="+326%"
            previousLabel="MAY $3,250"
            currentLabel="JUN $12,392"
            timeframe="MONTHLY"
            className="border-0 bg-transparent shadow-none p-0"
          />
        </div>

        {/* Card 3: Jitter & Packet Loss Telemetry */}
        <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-tactile flex flex-col justify-between space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="w-full flex items-center justify-between pb-2 border-b border-border/50 text-xs">
            <span className="font-mono uppercase tracking-wider text-text-muted">Backbone Jitter</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">Nominal</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-mono font-medium text-text-primary">
              0.02 <span className="text-xs font-normal text-text-muted">ms</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Zero jitter spikes observed across the 800 Gbps core optical backbone in 48 hours.
            </p>
          </div>
          <div className="pt-2 border-t border-border/40">
            <Sparkline data={[2, 2, 3, 2, 2, 1, 2, 2]} height={26} color="#10b981" />
          </div>
        </div>
      </div>

      {/* 5. Recent Settlement Ledger with Interactive Search & Status Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-medium text-text-primary tracking-tight">
              Settlement Ledger & Cryptographic Verification
            </h4>
            <span className="text-xs text-text-muted">
              Real-time transaction inflow with verified block consensus.
            </span>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by customer or hash..."
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary/50 border border-border/70 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border w-56 font-mono"
              />
            </div>

            <div className="inline-flex items-center p-0.5 rounded-lg bg-secondary/50 border border-border/60 text-xs font-mono">
              {(['All', 'Completed', 'Verified', 'Settling'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={cn(
                    'px-2 py-0.5 rounded-md transition-colors cursor-pointer',
                    statusFilter === st
                      ? 'bg-card text-text-primary font-medium shadow-2xs'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/70 overflow-hidden bg-secondary/10">
          <table className="w-full text-xs text-left">
            <thead className="bg-secondary/40 text-text-muted border-b border-border/60 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Customer Entity</th>
                <th className="p-3">Plan Tier</th>
                <th className="p-3">Consensus Hash</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Settled Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-text-primary font-medium font-sans">
                    <div>{tx.customer}</div>
                    <div className="text-[10px] text-text-muted font-mono">{tx.date}</div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">{tx.plan}</Badge>
                  </td>
                  <td className="p-3 text-text-muted font-mono text-[11px]">
                    {tx.hash}
                  </td>
                  <td className="p-3">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                        tx.status === 'Completed' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                        tx.status === 'Verified' && 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
                        tx.status === 'Settling' && 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-text-primary font-medium">
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
