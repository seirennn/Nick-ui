export const TACTILE_STUDIO_DASHBOARD_SOURCE = `'use client';

import * as React from 'react';
import { RailSidebar } from '@/components/ui/rail-sidebar';
import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';
import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';
import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Download, RefreshCw, Copy, Check, ArrowUpRight, ShieldCheck, Database, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

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
];

export function TactileStudioDashboard() {
  const [activeNav, setActiveNav] = React.useState('overview');
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(\`import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';

export default function Dashboard() {
  return <TactileStudioDashboard />;
}\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[28px] border border-border/80 bg-card overflow-hidden shadow-tactile flex flex-col md:flex-row min-h-[850px]">
      {/* 1. Architectural Rail Sidebar */}
      <RailSidebar
        activeId={activeNav}
        onSelect={setActiveNav}
        workspaceLogo={<BrandLogo size="xs" variant="minimal" />}
        workspaceName="NickUI Autonomous Systems"
        className="hidden md:flex shrink-0"
      />

      {/* 2. Main Dashboard Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        {/* Top Architectural Command Bar */}
        <header className="h-16 px-6 sm:px-8 border-b border-border/70 flex items-center justify-between gap-4 bg-card/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Studio /</span>
              <h2 className="text-sm font-medium tracking-tight text-text-primary">
                Executive Operations & Telemetry
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8"
            >
              {copied ? 'Copied Import' : 'Copy Block Code'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8"
            >
              Export
            </Button>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Row 1: The 3 Reference Metric Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {/* 1. Tactile Balance Node Trajectory Card */}
            <TactileMetricCard
              title="Balance"
              periodLabel="2024"
              value="$94,127"
              deltaText="+13%"
              deltaSubtext="vs last year"
              className="w-full max-w-none h-full"
            />

            {/* 2. Tactile Income Bar Highlight Card with Threshold Line */}
            <TactileBarCard
              title="Income"
              periodLabel="This Month"
              value="$12,532"
              deltaText="+12%"
              deltaSubtext="vs last month"
              className="w-full max-w-none h-full"
            />

            {/* 3. Dot Matrix Equalizer Revenue Card */}
            <div className="md:col-span-2 xl:col-span-1">
              <DotMatrixChart
                title="REVENUE VELOCITY"
                metric="+326%"
                previousLabel="MAY $3,250"
                currentLabel="JUN $12,392"
                footerTagline="HIGH THROUGHPUT | 2024 | ZERO LOSS"
                className="h-full"
              />
            </div>
          </div>

          {/* Row 2: Deep Trend Curve & Real-Time Settlement Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Tactile Trend Curve Card with Top Keywords */}
            <div className="lg:col-span-5 w-full">
              <TactileTrendCard
                title="Protocol Volume Trend"
                keywords={['Batch auction', 'Liquid staking derivatives (LSD)', 'Proof rollups']}
                metricLabel="Active Validated Nodes"
                metricValue="824"
                metricDeltaSuperscript="+334"
                percentageDelta="34.4%"
                className="w-full max-w-none"
              />
            </div>

            {/* Right: Architectural Execution Stream Table */}
            <div className="lg:col-span-7 rounded-[26px] border border-border/70 bg-card p-6 sm:p-7 shadow-tactile space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div>
                  <h3 className="text-sm font-medium tracking-tight text-text-primary">
                    Real-Time Settlement Stream
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Sub-second consensus telemetry across distributed nodes.
                  </p>
                </div>
                <Badge variant="mono" className="text-[10px]">
                  5 Nodes Active
                </Badge>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/40 text-text-muted font-mono uppercase text-[10px] tracking-wider">
                      <th className="pb-2.5 font-normal">Transaction ID</th>
                      <th className="pb-2.5 font-normal">Target Node</th>
                      <th className="pb-2.5 font-normal text-right">Volume</th>
                      <th className="pb-2.5 font-normal text-right">Latency</th>
                      <th className="pb-2.5 font-normal text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 font-mono">
                    {STREAM_DATA.map((tx) => (
                      <tr key={tx.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="py-3 text-text-primary font-medium">{tx.id}</td>
                        <td className="py-3 text-text-secondary font-sans">{tx.target}</td>
                        <td className="py-3 text-right text-text-primary font-medium">{tx.volume}</td>
                        <td className="py-3 text-right text-text-muted">{tx.latency}</td>
                        <td className="py-3 text-right">
                          <span
                            className={cn(
                              'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                              tx.status === 'Settled' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                              tx.status === 'Verified' && 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
                              tx.status === 'Executing' && 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
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
        </div>
      </div>
    </div>
  );
}`;

export const EXECUTIVE_STUDIO_CONSOLE_SOURCE = `'use client';

import * as React from 'react';
import { StudioSidebar } from '@/components/ui/studio-sidebar';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Download, Activity, ShieldCheck, Clock, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExecutiveStudioConsole() {
  const [activeNav, setActiveNav] = React.useState('overview');
  const [copied, setCopied] = React.useState(false);

  return (
    <div className="w-full rounded-[28px] border border-border/80 bg-card overflow-hidden shadow-tactile flex flex-col md:flex-row min-h-[860px]">
      <StudioSidebar
        activeId={activeNav}
        onSelect={setActiveNav}
        workspaceName="NickUI Core Platform"
        environmentName="Production · us-east"
        className="hidden md:flex shrink-0"
      />
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        <header className="h-16 px-6 sm:px-8 border-b border-border/70 flex items-center justify-between gap-4 bg-card/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Console /</span>
            <h2 className="text-sm font-medium tracking-tight text-text-primary">Multi-Cluster Orchestration</h2>
          </div>
        </header>
        {/* KPI metrics, node telemetry and consensus streams */}
      </div>
    </div>
  );
}`;

export const BENTO_SHOWCASE_SOURCE = `'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { Activity, Terminal, ShieldCheck, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BentoShowcaseLayout() {
  const [telemetryToggle, setTelemetryToggle] = React.useState(true);
  const [samplingRate, setSamplingRate] = React.useState(85);

  return (
    <div className="w-full py-10 md:py-16 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Telemetry card, haptic physics slider, MCP protocol and security guarantees */}
      </div>
    </div>
  );
}`;
