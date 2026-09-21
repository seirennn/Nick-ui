'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Gauge } from '@/components/ui/gauge';
import { Knob } from '@/components/ui/knob';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { useBlockViewer } from './BlockViewer';
import {
  Server,
  Activity,
  ShieldCheck,
  Cpu,
  Radio,
  Clock,
  ArrowUpRight,
  Database,
  Sliders,
  Terminal,
  Layers,
  Search,
  Check,
  Copy,
  Download,
  RefreshCw,
  HardDrive,
  Globe,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
  Filter,
} from 'lucide-react';

interface ClusterNode {
  id: string;
  name: string;
  role: string;
  region: string;
  regionCode: 'us-east' | 'eu-central' | 'ap';
  status: 'Optimal' | 'Rebalancing' | 'Standby';
  cpu: number;
  memoryUsed: string;
  memoryTotal: string;
  uptime: string;
  latency: string;
}

const ALL_NODES: ClusterNode[] = [
  {
    id: 'node-01',
    name: 'alpha-ord-01',
    role: 'Consensus Leader',
    region: 'us-east (Virginia)',
    regionCode: 'us-east',
    status: 'Optimal',
    cpu: 24,
    memoryUsed: '8.4 GB',
    memoryTotal: '16 GB',
    uptime: '99.99%',
    latency: '0.8ms',
  },
  {
    id: 'node-02',
    name: 'alpha-ord-02',
    role: 'Worker Replica',
    region: 'us-east (Virginia)',
    regionCode: 'us-east',
    status: 'Optimal',
    cpu: 38,
    memoryUsed: '12.1 GB',
    memoryTotal: '16 GB',
    uptime: '99.98%',
    latency: '1.1ms',
  },
  {
    id: 'node-03',
    name: 'beta-fra-01',
    role: 'Worker Replica',
    region: 'eu-central (Frankfurt)',
    regionCode: 'eu-central',
    status: 'Optimal',
    cpu: 19,
    memoryUsed: '6.2 GB',
    memoryTotal: '16 GB',
    uptime: '99.99%',
    latency: '1.4ms',
  },
  {
    id: 'node-04',
    name: 'gamma-tyo-01',
    role: 'Edge Ingress Relay',
    region: 'ap-northeast (Tokyo)',
    regionCode: 'ap',
    status: 'Rebalancing',
    cpu: 62,
    memoryUsed: '14.8 GB',
    memoryTotal: '16 GB',
    uptime: '99.92%',
    latency: '2.6ms',
  },
  {
    id: 'node-05',
    name: 'standby-syd-01',
    role: 'Hot Failover Node',
    region: 'ap-southeast (Sydney)',
    regionCode: 'ap',
    status: 'Standby',
    cpu: 4,
    memoryUsed: '2.1 GB',
    memoryTotal: '16 GB',
    uptime: '100.0%',
    latency: '0.9ms',
  },
];

interface ConsensusLog {
  id: string;
  time: string;
  subsystem: 'RAFT' | 'EDGE' | 'STORAGE' | 'SECURITY';
  message: string;
  level: 'info' | 'optimal' | 'warning';
}

const CONSENSUS_LOGS: ConsensusLog[] = [
  { id: '1', time: '14:24:01', subsystem: 'RAFT', message: 'Heartbeat acknowledged across 5/5 consensus nodes (0.8ms)', level: 'optimal' },
  { id: '2', time: '14:24:02', subsystem: 'EDGE', message: 'TLS 1.3 session ticket verified (us-east-1 -> eu-central-1)', level: 'info' },
  { id: '3', time: '14:24:03', subsystem: 'STORAGE', message: 'Zero-loss garbage collection committed, 142MB reclaimed', level: 'optimal' },
  { id: '4', time: '14:24:04', subsystem: 'SECURITY', message: 'SPIFFE/SPIRE cryptographic pod attestation renewed', level: 'info' },
  { id: '5', time: '14:24:05', subsystem: 'EDGE', message: 'Dynamic ingress reroute payload balanced across cluster alpha', level: 'info' },
];

export function ExecutiveStudioConsole() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [activeNav, setActiveNav] = React.useState('overview');
  const [activeRegion, setActiveRegion] = React.useState<'all' | 'us-east' | 'eu-central' | 'ap'>('all');
  const [activeLogFilter, setActiveLogFilter] = React.useState<'ALL' | 'RAFT' | 'EDGE' | 'STORAGE'>('ALL');
  const [sidebarSearch, setSidebarSearch] = React.useState('');
  const [pressureKnob, setPressureKnob] = React.useState(68);
  const [failoverReady, setFailoverReady] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  // Filter nodes based on region and optional search query
  const filteredNodes = React.useMemo(() => {
    return ALL_NODES.filter((node) => {
      const matchesRegion = activeRegion === 'all' || node.regionCode === activeRegion;
      const matchesSearch =
        sidebarSearch.trim() === '' ||
        node.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
        node.region.toLowerCase().includes(sidebarSearch.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [activeRegion, sidebarSearch]);

  const filteredLogs = React.useMemo(() => {
    if (activeLogFilter === 'ALL') return CONSENSUS_LOGS;
    return CONSENSUS_LOGS.filter((l) => l.subsystem === activeLogFilter);
  }, [activeLogFilter]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify({ ALL_NODES, CONSENSUS_LOGS }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full bg-[#09090b] text-neutral-200 font-sans select-none overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-5 md:gap-6',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-4 md:p-6 overflow-y-auto'
          : 'p-4 sm:p-6 md:p-8 rounded-[32px] border border-white/[0.08] min-h-[920px] shadow-2xl'
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. DETACHED FLOATING STUDIO SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <aside className="w-full md:w-64 shrink-0 rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-4 flex flex-col justify-between space-y-6 shadow-xl">
        <div className="space-y-5">
          {/* Workspace Identity Pill */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white font-mono text-xs font-medium">
                N
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-xs font-medium text-white truncate">NickUI Core Studio</div>
                <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                  <span>Production · us-east</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cluster..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white/20 transition-colors font-mono"
            />
          </div>

          {/* Nav Section: Core Platform */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-1">
              Core Platform
            </div>
            {[
              { id: 'overview', label: 'Operations Overview', icon: Activity, badge: 'Live' },
              { id: 'clusters', label: 'Nodes & Clusters', icon: Cpu },
              { id: 'telemetry', label: 'Revenue Telemetry', icon: Radio },
              { id: 'storage', label: 'Datastores & Pools', icon: Database },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer select-none',
                    isActive
                      ? 'bg-white/[0.08] text-white font-medium border border-white/[0.08]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Nav Section: Infrastructure & Ops */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-1">
              Infrastructure & Ops
            </div>
            {[
              { id: 'deployments', label: 'Pipelines & CI/CD', icon: Layers, badge: 'v0.1.1' },
              { id: 'security', label: 'Access & Compliance', icon: ShieldCheck },
              { id: 'audit', label: 'Consensus Logs', icon: Terminal },
              { id: 'config', label: 'System Preferences', icon: Sliders },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer select-none',
                    isActive
                      ? 'bg-white/[0.08] text-white font-medium border border-white/[0.08]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] text-neutral-400 border border-white/[0.08]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer: Quota & User Profile */}
        <div className="space-y-3 pt-3 border-t border-white/[0.06]">
          {/* Quota Progress Well */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400">Compute Quota</span>
              <span className="text-neutral-200 font-medium">71%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-neutral-300 w-[71%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>14.2 GB used</span>
              <span>20 GB cap</span>
            </div>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-white/[0.1] flex items-center justify-center font-mono text-xs font-medium text-white shrink-0">
                SA
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs font-medium text-white truncate">Seiren Architect</div>
                <div className="text-[10px] font-mono text-neutral-400 truncate">System Admin</div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN FLOATING ISLAND WORKSPACE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col gap-5 md:gap-6 min-w-0">
        {/* ── Top Sculpted Orchestration Bar ── */}
        <header className="px-5 sm:px-6 py-3.5 rounded-[22px] border border-white/[0.08] bg-[#0d0d11] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-500">ORCHESTRATION /</span>
              <h2 className="text-sm font-medium tracking-tight text-white">
                Multi-Cluster Topology & Telemetry
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              5/5 Quorum Active
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8 border-white/10 hover:border-white/20 text-neutral-200"
            >
              {copied ? 'Copied' : 'Copy Block'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              className="text-xs font-mono h-8 bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border-white/[0.08]"
            >
              Audit Log
            </Button>
          </div>
        </header>

        {/* ── 4 High-Density Telemetry KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Global Ingestion */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Global Ingestion</span>
              <Activity className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-white tracking-tight">
                184,920 <span className="text-xs font-normal text-neutral-400">req/s</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-emerald-400 font-medium">+18.4%</span>
                <span className="text-[10px] text-neutral-500">p99 sustained</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[24, 38, 42, 58, 64, 78, 88, 96]} height={26} color="#ffffff" />
            </div>
          </div>

          {/* Card 2: Routing Latency */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Mean Latency</span>
              <Clock className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-white tracking-tight">
                1.24 <span className="text-xs font-normal text-neutral-400">ms</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-emerald-400 font-medium">-0.42ms</span>
                <span className="text-[10px] text-neutral-500">optimal edge route</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[60, 54, 50, 48, 42, 40, 38, 36]} height={26} color="#34d399" />
            </div>
          </div>

          {/* Card 3: Storage Datapool */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Storage Datapool</span>
              <Database className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-white tracking-tight">
                48.6 <span className="text-xs font-normal text-neutral-400">TB</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-neutral-300 font-medium">82.4%</span>
                <span className="text-[10px] text-neutral-500">allocated pools</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[30, 36, 42, 54, 60, 68, 76, 82]} height={26} color="#a3a3a3" />
            </div>
          </div>

          {/* Card 4: Consensus Quorum */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Consensus Quorum</span>
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            </div>
            <div>
              <div className="text-2xl font-mono font-medium text-white tracking-tight">
                99.99%
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-emerald-400 font-medium">Zero faults</span>
                <span className="text-[10px] text-neutral-500">5/5 synchronized</span>
              </div>
            </div>
            <div className="pt-2">
              <Sparkline data={[100, 100, 100, 100, 100, 100, 100, 100]} height={26} color="#34d399" />
            </div>
          </div>
        </div>

        {/* ── Middle Section: Wide Cluster Nodes Table & Calibrated Instrument Deck ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Left Column (8 cols): Distributed Cluster Nodes Matrix & Consensus Stream */}
          <div className="lg:col-span-8 rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl space-y-5">
            {/* Table Header & Interactive Region Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-medium tracking-tight text-white">
                  Distributed Cluster Nodes
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Real-time compute telemetry, memory utilization, and regional distribution.
                </p>
              </div>

              {/* Working Region Switcher Pills */}
              <div className="inline-flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'us-east', label: 'US-East' },
                  { key: 'eu-central', label: 'EU-Central' },
                  { key: 'ap', label: 'AP-Edge' },
                ].map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setActiveRegion(r.key as any)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none',
                      activeRegion === r.key
                        ? 'bg-white/10 text-white font-medium shadow-2xs'
                        : 'text-neutral-400 hover:text-white'
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wide Table with Explicit Widths (No awkward wrapping) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-neutral-400 font-mono uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-normal">Node Identifier</th>
                    <th className="pb-3 font-normal">Region & Mesh</th>
                    <th className="pb-3 font-normal">CPU Load</th>
                    <th className="pb-3 font-normal">RAM Footprint</th>
                    <th className="pb-3 font-normal text-right">Uptime SLA</th>
                    <th className="pb-3 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] font-mono">
                  {filteredNodes.map((node) => (
                    <tr key={node.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Node Identifier */}
                      <td className="py-3 text-neutral-200 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
                          <span className="text-white font-semibold">{node.name}</span>
                          <span className="text-[10px] font-normal text-neutral-500 hidden sm:inline">
                            · {node.role}
                          </span>
                        </div>
                      </td>

                      {/* Region */}
                      <td className="py-3 text-neutral-400 font-sans whitespace-nowrap">
                        {node.region}
                      </td>

                      {/* CPU Load with Progress Bar */}
                      <td className="py-3 text-neutral-200 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                node.cpu > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                              )}
                              style={{ width: `${node.cpu}%` }}
                            />
                          </div>
                          <span>{node.cpu}%</span>
                        </div>
                      </td>

                      {/* RAM Footprint */}
                      <td className="py-3 text-neutral-400 whitespace-nowrap">
                        <span className="text-neutral-200">{node.memoryUsed}</span>
                        <span className="text-neutral-500 text-[10px]"> / {node.memoryTotal}</span>
                      </td>

                      {/* Uptime SLA */}
                      <td className="py-3 text-right text-neutral-200 font-medium whitespace-nowrap">
                        {node.uptime}
                      </td>

                      {/* Status */}
                      <td className="py-3 text-right whitespace-nowrap">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                            node.status === 'Optimal' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                            node.status === 'Rebalancing' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                            node.status === 'Standby' && 'bg-white/[0.04] text-neutral-400 border border-white/[0.08]'
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

            {/* ── Integrated Real-Time Consensus Log Stream ── */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs font-mono font-medium text-white">Live Quorum Consensus Stream</span>
                </div>

                {/* Subsystem Filter Pills */}
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  {(['ALL', 'RAFT', 'EDGE', 'STORAGE'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveLogFilter(filter)}
                      className={cn(
                        'px-2 py-0.5 rounded-md transition-colors cursor-pointer select-none',
                        activeLogFilter === filter
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-neutral-500 hover:text-neutral-300'
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Log Terminal Well */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5 font-mono text-[11px] max-h-32 overflow-y-auto">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 text-neutral-300">
                    <span className="text-neutral-500 shrink-0">[{log.time}]</span>
                    <span
                      className={cn(
                        'px-1 py-0.2 rounded text-[9px] font-semibold shrink-0',
                        log.subsystem === 'RAFT' && 'bg-emerald-500/15 text-emerald-400',
                        log.subsystem === 'EDGE' && 'bg-blue-500/15 text-blue-400',
                        log.subsystem === 'STORAGE' && 'bg-purple-500/15 text-purple-400',
                        log.subsystem === 'SECURITY' && 'bg-amber-500/15 text-amber-400'
                      )}
                    >
                      {log.subsystem}
                    </span>
                    <span className="text-neutral-300 truncate">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Calibrated Multi-Instrument Telemetry Cluster */}
          <div className="lg:col-span-4 rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Instrument Cluster
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Calibrated
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                Primary cluster capacity saturation, IOPS attenuation, and failover threshold readout.
              </p>
            </div>

            {/* Dual Instrument Visual: Gauge & Rotary Knob */}
            <div className="grid grid-cols-2 gap-4 items-center py-2">
              {/* Circular Saturation Gauge */}
              <div className="flex flex-col items-center text-center space-y-1">
                <Gauge
                  value={64}
                  label="CAPACITY"
                  unit="%"
                  size={120}
                  variant="tactile"
                />
                <span className="text-[10px] font-mono text-neutral-400">Cluster Load</span>
              </div>

              {/* Rotary Attenuation Dial */}
              <div className="flex flex-col items-center text-center space-y-1">
                <Knob
                  value={pressureKnob}
                  onChange={setPressureKnob}
                  min={0}
                  max={100}
                  size={80}
                  label="Attenuation"
                  variant="recessed"
                />
                <span className="text-[10px] font-mono text-neutral-400">{pressureKnob}% IDPS Throttling</span>
              </div>
            </div>

            {/* Metrics Breakdown Well */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Peak Burst Ceiling</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-amber-400/80 w-[85%]" />
              </div>

              <div className="flex items-center justify-between text-neutral-400 pt-1">
                <span>Active Replicas</span>
                <span className="text-white font-medium">12 / 16 online</span>
              </div>

              <div className="flex items-center justify-between text-neutral-400 pt-1">
                <span>Failover Hot Standby</span>
                <button
                  type="button"
                  onClick={() => setFailoverReady((prev) => !prev)}
                  className={cn(
                    'px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer',
                    failoverReady
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  )}
                >
                  {failoverReady ? 'Armed · 0.2s' : 'Disarmed'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
