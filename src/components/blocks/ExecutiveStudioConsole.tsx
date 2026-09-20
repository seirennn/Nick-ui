'use client';

import * as React from 'react';
import { StudioSidebar } from '@/components/ui/studio-sidebar';
import { Sparkline } from '@/components/ui/charts/sparkline';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [activeNav, setActiveNav] = React.useState('overview');
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`import { ExecutiveStudioConsole } from '@/components/blocks/ExecutiveStudioConsole';

export default function DashboardPage() {
  return <ExecutiveStudioConsole />;
}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[28px] border border-border/80 bg-card overflow-hidden shadow-tactile flex flex-col md:flex-row min-h-[860px]">
      {/* 1. Collapsible Architectural Studio Sidebar */}
      <StudioSidebar
        activeId={activeNav}
        onSelect={setActiveNav}
        workspaceName="NickUI Core Platform"
        environmentName="Production · us-east"
        className="hidden md:flex shrink-0"
      />

      {/* 2. Main Executive Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        {/* Top Control Bar */}
        <header className="h-16 px-6 sm:px-8 border-b border-border/70 flex items-center justify-between gap-4 bg-card/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Console /</span>
              <h2 className="text-sm font-medium tracking-tight text-text-primary">
                Multi-Cluster Orchestration & Telemetry
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Consensus Active
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
              {copied ? 'Copied' : 'Copy Block Code'}
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

        {/* Scrollable Main Area */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wider">Global Ingestion</span>
                <Activity className="w-3.5 h-3.5" />
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
                <Sparkline data={[24, 38, 42, 58, 64, 78, 88, 96]} height={28} />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wider">Mean Latency</span>
                <Clock className="w-3.5 h-3.5" />
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
                <Sparkline data={[60, 54, 50, 48, 42, 40, 38, 36]} height={28} />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wider">Storage Datapool</span>
                <Database className="w-3.5 h-3.5" />
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
                <Sparkline data={[30, 36, 42, 54, 60, 68, 76, 82]} height={28} />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wider">Consensus Quorum</span>
                <ShieldCheck className="w-3.5 h-3.5" />
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
                <Sparkline data={[100, 100, 100, 100, 100, 100, 100, 100]} height={28} />
              </div>
            </div>
          </div>

          {/* Middle Row: Cluster Health Table & Resource Breakdown */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-tactile space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/50">
              <div>
                <h3 className="text-sm font-medium tracking-tight text-text-primary">
                  Distributed Cluster Nodes
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Real-time compute telemetry, memory utilization, and node regional distribution.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-text-muted">5 Active Nodes</span>
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
                      <td className="py-3 text-text-primary font-medium">{node.name}</td>
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
        </div>
      </div>
    </div>
  );
}
