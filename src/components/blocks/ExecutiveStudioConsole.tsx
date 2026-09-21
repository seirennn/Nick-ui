'use client';

import * as React from 'react';
import { StudioSidebar } from '@/components/ui/studio-sidebar';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { Gauge } from '@/components/ui/gauge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Check,
  Download,
  RefreshCw,
  Terminal,
  Server,
  Layers,
  Activity,
  ShieldCheck,
  Cpu,
  Radio,
  Clock,
  ArrowUpRight,
  Database,
  HardDrive,
  Wifi,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlockViewer } from './BlockViewer';

interface ClusterNode {
  id: string;
  name: string;
  region: string;
  status: 'Healthy' | 'Rebalancing' | 'Standby';
  cpu: string;
  memory: string;
  uptime: string;
}

const NODES_DATA: ClusterNode[] = [
  { id: 'node-01', name: 'alpha-ord-01', region: 'us-east (Virginia)', status: 'Healthy', cpu: '24%', memory: '8.4 GB', uptime: '99.99%' },
  { id: 'node-02', name: 'alpha-ord-02', region: 'us-east (Virginia)', status: 'Healthy', cpu: '38%', memory: '12.1 GB', uptime: '99.98%' },
  { id: 'node-03', name: 'beta-fra-01', region: 'eu-central (Frankfurt)', status: 'Healthy', cpu: '19%', memory: '6.2 GB', uptime: '99.99%' },
  { id: 'node-04', name: 'gamma-tyo-01', region: 'ap-northeast (Tokyo)', status: 'Rebalancing', cpu: '62%', memory: '14.8 GB', uptime: '99.92%' },
  { id: 'node-05', name: 'standby-syd-01', region: 'ap-southeast (Sydney)', status: 'Standby', cpu: '4%', memory: '2.1 GB', uptime: '100.0%' },
];

export function ExecutiveStudioConsole() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [activeNav, setActiveNav] = React.useState('overview');
  const [copied, setCopied] = React.useState(false);
  const [activeRegion, setActiveRegion] = React.useState('all');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`import { ExecutiveStudioConsole } from '@/components/blocks/ExecutiveStudioConsole';

export default function DashboardPage() {
  return <ExecutiveStudioConsole />;
}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full bg-secondary/20 dark:bg-card/40 flex flex-col md:flex-row select-none transition-all duration-300',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-4 gap-4 overflow-y-auto'
          : 'p-3 sm:p-5 md:p-6 rounded-[32px] border border-border/80 gap-5 md:gap-6 min-h-[900px] shadow-tactile'
      )}
    >
      {/* 1. Detached Floating StudioSidebar Column */}
      <div className="shrink-0 hidden md:block">
        <StudioSidebar
          activeId={activeNav}
          onSelect={setActiveNav}
          workspaceName="NickUI Core Studio"
          environmentName="Production · us-east"
          className="rounded-[24px] border border-border/80 bg-card/95 backdrop-blur-sm shadow-tactile overflow-hidden h-full max-h-[880px]"
        />
      </div>

      {/* 2. Main Executive Workspace: Array of Modular Floating Cards with Gaps */}
      <div className="flex-1 flex flex-col gap-5 md:gap-6 min-w-0">
        {/* Floating Top Command & Status Bar */}
        <header className="px-5 sm:px-7 py-3.5 rounded-[22px] border border-border/80 bg-card/90 backdrop-blur-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Console /</span>
              <h2 className="text-sm font-medium tracking-tight text-text-primary">
                Multi-Cluster Orchestration & Telemetry
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
              Consensus Active
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8"
            >
              {copied ? 'Copied Import' : 'Copy Block'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8"
            >
              Audit Log
            </Button>
          </div>
        </header>

        {/* Floating KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Metric 1 */}
          <div className="p-5 rounded-[22px] bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Global Ingestion</span>
              <Activity className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-text-primary">
                184,920 <span className="text-xs font-normal text-text-muted">req/s</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">+18.4%</span>
                <span className="text-[11px] text-text-muted">p99 sustained</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[24, 38, 42, 58, 64, 78, 88, 96]} height={26} />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-5 rounded-[22px] bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Mean Latency</span>
              <Clock className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-text-primary">
                3.84 <span className="text-xs font-normal text-text-muted">ms</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">-0.42ms</span>
                <span className="text-[11px] text-text-muted">faster routing</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[60, 54, 50, 48, 42, 40, 38, 36]} height={26} color="#10b981" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-5 rounded-[22px] bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Storage Datapool</span>
              <Database className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-text-primary">
                48.6 <span className="text-xs font-normal text-text-muted">TB</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-text-secondary font-medium">82.4%</span>
                <span className="text-[11px] text-text-muted">allocated pools</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[30, 36, 42, 54, 60, 68, 76, 82]} height={26} color="#f59e0b" />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-5 rounded-[22px] bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Consensus Quorum</span>
              <ShieldCheck className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-text-primary">
                100.0%
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Zero faults</span>
                <span className="text-[11px] text-text-muted">5/5 nodes online</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[100, 100, 100, 100, 100, 100, 100, 100]} height={26} color="#10b981" />
            </div>
          </div>
        </div>

        {/* Middle Section: Floating Cluster Health Table & Mechanical Dial Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Left (8 cols): Distributed Cluster Nodes Card */}
          <div className="lg:col-span-8 rounded-[24px] border border-border/80 bg-card p-6 sm:p-7 shadow-tactile space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div>
                <h3 className="text-sm font-medium tracking-tight text-text-primary">
                  Distributed Cluster Nodes
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Real-time compute telemetry, memory utilization, and regional distribution.
                </p>
              </div>

              {/* Region Switcher Pills */}
              <div className="inline-flex items-center p-0.5 rounded-lg bg-secondary/50 border border-border/60 text-xs font-mono">
                {['all', 'us-east', 'eu-central', 'ap'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setActiveRegion(r)}
                    className={cn(
                      'px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer',
                      activeRegion === r
                        ? 'bg-card text-text-primary font-medium shadow-2xs'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/40 text-text-muted font-mono uppercase text-[10px] tracking-wider">
                    <th className="pb-2.5 font-normal">Node ID</th>
                    <th className="pb-2.5 font-normal">Region</th>
                    <th className="pb-2.5 font-normal">CPU Load</th>
                    <th className="pb-2.5 font-normal">RAM Footprint</th>
                    <th className="pb-2.5 font-normal text-right">Uptime SLA</th>
                    <th className="pb-2.5 font-normal text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 font-mono">
                  {NODES_DATA.map((node) => (
                    <tr key={node.id} className="hover:bg-secondary/40 transition-colors">
                      <td className="py-3 text-text-primary font-medium flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <span>{node.name}</span>
                      </td>
                      <td className="py-3 text-text-secondary font-sans">{node.region}</td>
                      <td className="py-3 text-text-primary">{node.cpu}</td>
                      <td className="py-3 text-text-muted">{node.memory}</td>
                      <td className="py-3 text-right text-text-primary font-medium">{node.uptime}</td>
                      <td className="py-3 text-right">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                            node.status === 'Healthy' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                            node.status === 'Rebalancing' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
                            node.status === 'Standby' && 'bg-secondary text-text-muted border border-border/60'
                          )}
                        >
                          {node.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right (4 cols): Floating Telemetry Instrument Card */}
          <div className="lg:col-span-4 rounded-[24px] border border-border/80 bg-card p-6 shadow-tactile flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Instrument Gauge
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Calibrated
                </span>
              </div>
              <p className="text-xs text-text-muted mt-2">
                Primary cluster capacity saturation and IOPS pressure readout.
              </p>
            </div>

            {/* Live Mechanical Dial */}
            <div className="flex justify-center py-2">
              <Gauge
                value={64}
                label="CAPACITY"
                unit="%"
                size={145}
                variant="tactile"
              />
            </div>

            <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-text-muted">
                <span>Peak Burst Ceiling</span>
                <span className="text-text-primary font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Active Replicas</span>
                <span className="text-text-primary font-medium">12 / 16</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Failover Standby</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
