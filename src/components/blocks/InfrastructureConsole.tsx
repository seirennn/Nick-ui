'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Knob } from '@/components/ui/knob';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { Checkbox } from '@/components/ui/checkbox';
import { useBlockViewer } from './BlockViewer';
import {
  Server,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  GitBranch,
  RefreshCw,
  Copy,
  Check,
  Shield,
  Clock,
  Terminal,
  Download,
  Sliders,
  Radio,
  Lock,
  ArrowUpRight,
  Filter,
  Eye,
  RotateCw,
} from 'lucide-react';

interface MicroService {
  name: string;
  role: string;
  env: 'Production' | 'Staging' | 'Canary';
  version: string;
  commit: string;
  region: string;
  trafficShare: number;
  latency: string;
  status: 'Operational' | 'Rolling Out' | 'Standby';
}

const SERVICES_DATA: MicroService[] = [
  {
    name: 'api-gateway',
    role: 'Edge Ingress Ingress Router',
    env: 'Production',
    version: 'v2.4.2',
    commit: '8f3a1b',
    region: 'us-east-1 (Virginia)',
    trafficShare: 38,
    latency: '8ms',
    status: 'Operational',
  },
  {
    name: 'auth-service',
    role: 'SPIFFE / SPIRE Attestation',
    env: 'Production',
    version: 'v1.9.0',
    commit: '4c2d9e',
    region: 'us-east-1 (Virginia)',
    trafficShare: 24,
    latency: '11ms',
    status: 'Operational',
  },
  {
    name: 'edge-router',
    role: 'Global Anycast Proxy',
    env: 'Production',
    version: 'v3.1.0',
    commit: 'a1e782',
    region: 'global-anycast',
    trafficShare: 20,
    latency: '14ms',
    status: 'Rolling Out',
  },
  {
    name: 'worker-queue',
    role: 'Batch Settlement Engine',
    env: 'Production',
    version: 'v2.0.4',
    commit: '99f01b',
    region: 'eu-west-1 (Dublin)',
    trafficShare: 12,
    latency: '42ms',
    status: 'Operational',
  },
  {
    name: 'analytics-sink',
    role: 'Telemetry Timeseries Cold Storage',
    env: 'Staging',
    version: 'v1.4.0-rc',
    commit: '5b881c',
    region: 'us-east-1 (Virginia)',
    trafficShare: 6,
    latency: '19ms',
    status: 'Standby',
  },
];

interface TerminalLog {
  id: string;
  time: string;
  subsystem: 'TLS' | 'RAFT' | 'INGRESS' | 'OPTICAL';
  node: string;
  text: string;
  level: 'info' | 'optimal' | 'sys';
}

const TERMINAL_LOGS: TerminalLog[] = [
  { id: '1', time: '05:54:12.104', subsystem: 'TLS', node: 'edge-fra-01', text: 'TLS 1.3 session resumption verified (1.4ms)', level: 'optimal' },
  { id: '2', time: '05:54:13.482', subsystem: 'RAFT', node: 'raft-leader', text: 'Consensus term 148 quorum acknowledged (5/5 nodes)', level: 'sys' },
  { id: '3', time: '05:54:15.012', subsystem: 'INGRESS', node: 'api-gateway', text: 'HTTP/2 200 OK /v1/telemetry 8.2ms 1.4KB payload', level: 'info' },
  { id: '4', time: '05:54:17.290', subsystem: 'RAFT', node: 'worker-queue', text: 'Batch auction settlement 42 committed to persistent storage', level: 'sys' },
  { id: '5', time: '05:54:18.841', subsystem: 'OPTICAL', node: 'backbone-ord', text: 'Interconnect link attenuation nominal (-2.1 dB)', level: 'optimal' },
  { id: '6', time: '05:54:20.119', subsystem: 'INGRESS', node: 'edge-router', text: 'Dynamic anycast route balanced to us-east mesh (0.9ms)', level: 'info' },
];

export function InfrastructureConsole() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [autoScale, setAutoScale] = React.useState(true);
  const [tlsStrict, setTlsStrict] = React.useState(true);
  const [rateLimitKnob, setRateLimitKnob] = React.useState(65);
  const [activeEnvFilter, setActiveEnvFilter] = React.useState<'ALL' | 'Production' | 'Staging'>('ALL');
  const [logSubsystem, setLogSubsystem] = React.useState<'ALL' | 'TLS' | 'RAFT' | 'INGRESS' | 'OPTICAL'>('ALL');
  const [serviceSearch, setServiceSearch] = React.useState('');
  const [copiedKey, setCopiedKey] = React.useState(false);
  const [copiedBlock, setCopiedBlock] = React.useState(false);
  const [isRotatingKey, setIsRotatingKey] = React.useState(false);

  const filteredServices = React.useMemo(() => {
    return SERVICES_DATA.filter((srv) => {
      const matchesEnv = activeEnvFilter === 'ALL' || srv.env === activeEnvFilter;
      const matchesSearch =
        serviceSearch.trim() === '' ||
        srv.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        srv.region.toLowerCase().includes(serviceSearch.toLowerCase());
      return matchesEnv && matchesSearch;
    });
  }, [activeEnvFilter, serviceSearch]);

  const filteredLogs = React.useMemo(() => {
    if (logSubsystem === 'ALL') return TERMINAL_LOGS;
    return TERMINAL_LOGS.filter((l) => l.subsystem === logSubsystem);
  }, [logSubsystem]);

  const handleCopyBlock = () => {
    navigator.clipboard.writeText(`import { InfrastructureConsole } from '@/components/blocks/InfrastructureConsole';

export default function InfrastructurePage() {
  return <InfrastructureConsole />;
}`);
    setCopiedBlock(true);
    setTimeout(() => setCopiedBlock(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('dia_live_sec_98f4bc819e0134');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRotateKey = () => {
    setIsRotatingKey(true);
    setTimeout(() => setIsRotatingKey(false), 1200);
  };

  return (
    <div
      className={cn(
        'w-full bg-[#08080a] text-neutral-200 font-sans select-none overflow-hidden transition-all duration-300 flex flex-col space-y-6',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-4 sm:p-6 overflow-y-auto'
          : 'p-4 sm:p-6 md:p-8 rounded-[28px] border border-white/[0.08] shadow-2xl min-h-[920px]'
      )}
    >
      {/* ═══════════════════════════════════════════════════════════════
          1. SCULPTED INFRASTRUCTURE COMMAND DECK (TOP)
      ═══════════════════════════════════════════════════════════════ */}
      <header className="px-5 sm:px-6 py-4 rounded-[22px] border border-white/[0.08] bg-[#0d0d11] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-500">CLUSTER-INFRASTRUCTURE /</span>
            <h2 className="text-sm font-medium tracking-tight text-white">
              Topology & Edge Mesh
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            48/48 Nodes Nominal · WireGuard mTLS Active
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyBlock}
            leftIcon={copiedBlock ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            className="text-xs font-mono h-8 border-white/10 hover:border-white/20 text-neutral-200"
          >
            {copiedBlock ? 'Copied' : 'Copy Block'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs font-mono h-8 bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border-white/[0.08]"
          >
            Export Spec
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-xs font-mono h-8 bg-white text-black hover:bg-neutral-200 shadow-sm"
          >
            Deploy Revision
          </Button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          2. UNIFIED HIGH-DENSITY TELEMETRY DECK (4 MODULES)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Module 1: Compute Core Allocation */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-neutral-500" /> Compute Allocation
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">Nominal</span>
          </div>
          <div>
            <div className="text-2xl font-mono font-medium text-white tracking-tight">
              38.4% <span className="text-xs font-normal text-neutral-400">vCPU</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-neutral-400">
              <span className="text-neutral-200 font-medium">24.6 / 64 Cores</span>
              <span>· Zero throttling</span>
            </div>
          </div>
          {/* Progress Well */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-neutral-300 w-[38.4%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>Primary us-east</span>
              <span>Headroom 61.6%</span>
            </div>
          </div>
        </div>

        {/* Module 2: Memory Heap Saturation */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <HardDrive className="w-3 h-3 text-neutral-500" /> Memory Heap
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">Optimal</span>
          </div>
          <div>
            <div className="text-2xl font-mono font-medium text-white tracking-tight">
              54.2% <span className="text-xs font-normal text-neutral-400">Heap</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-neutral-400">
              <span className="text-neutral-200 font-medium">138.8 / 256 GB</span>
              <span>· GC healthy</span>
            </div>
          </div>
          {/* Progress Well */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-emerald-400/90 w-[54.2%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>Buffered 18.2 GB</span>
              <span>Free 99.0 GB</span>
            </div>
          </div>
        </div>

        {/* Module 3: P99 RTT Latency */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-neutral-500" /> P99 RTT Latency
            </span>
            <span className="text-[10px] font-mono text-neutral-400">Edge-to-Origin</span>
          </div>
          <div>
            <div className="text-2xl font-mono font-medium text-white tracking-tight">
              12.4 <span className="text-xs font-normal text-neutral-400">ms</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-emerald-400 font-medium">-1.8ms</span>
              <span className="text-[10px] text-neutral-500">vs 25ms SLA ceiling</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[18, 16, 15, 14, 13, 12.4]} height={26} color="#34d399" />
          </div>
        </div>

        {/* Module 4: Ingress Bandwidth */}
        <div className="p-4 sm:p-5 rounded-[22px] bg-[#0d0d11] border border-white/[0.08] shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-white/15 transition-all">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-neutral-500" /> Ingress Bandwidth
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-medium">Stable</span>
          </div>
          <div>
            <div className="text-2xl font-mono font-medium text-white tracking-tight">
              4.82 <span className="text-xs font-normal text-neutral-400">GB/s</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-neutral-300 font-medium">2.84M pkts/s</span>
              <span className="text-[10px] text-neutral-500">0.000% frame loss</span>
            </div>
          </div>
          <div className="pt-2">
            <Sparkline data={[3.8, 4.1, 4.3, 4.6, 4.7, 4.82]} height={26} color="#ffffff" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          3. DUAL-PANE PRODUCTION OPERATIONS MATRIX (7 COLS / 5 COLS)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Left Column (7 cols): Distributed Service Endpoint & Mesh Topology */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-medium tracking-tight text-white">
                Active Regional Microservices
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Live deployment revisions currently receiving production traffic.
              </p>
            </div>

            {/* Working Environment Switcher Pills */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              {(['ALL', 'Production', 'Staging'] as const).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => setActiveEnvFilter(env)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none',
                    activeEnvFilter === env
                      ? 'bg-white/10 text-white font-medium shadow-2xs'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          {/* Wide Table with Explicit Widths (No squished wrapping) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[580px]">
              <thead>
                <tr className="border-b border-white/[0.06] text-neutral-400 font-mono uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-normal">Service Endpoint</th>
                  <th className="pb-3 font-normal">Revision & Region</th>
                  <th className="pb-3 font-normal">Traffic Allocation</th>
                  <th className="pb-3 font-normal text-right">Latency</th>
                  <th className="pb-3 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-mono">
                {filteredServices.map((srv) => (
                  <tr key={srv.name} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Service Name */}
                    <td className="py-3 text-neutral-200 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
                        <span className="text-white font-semibold">{srv.name}</span>
                        <span className="text-[10px] font-normal text-neutral-500">
                          · {srv.commit}
                        </span>
                      </div>
                    </td>

                    {/* Revision & Region */}
                    <td className="py-3 text-neutral-400 font-sans whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-neutral-300 font-mono">{srv.version}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-xs text-neutral-400">{srv.region}</span>
                      </div>
                    </td>

                    {/* Traffic Share Bar */}
                    <td className="py-3 text-neutral-200 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-neutral-300"
                            style={{ width: `${srv.trafficShare * 2}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-neutral-400">{srv.trafficShare}%</span>
                      </div>
                    </td>

                    {/* Latency */}
                    <td className="py-3 text-right text-neutral-200 font-medium whitespace-nowrap">
                      {srv.latency}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 text-right whitespace-nowrap">
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono',
                          srv.status === 'Operational' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                          srv.status === 'Rolling Out' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                          srv.status === 'Standby' && 'bg-white/[0.04] text-neutral-400 border border-white/[0.08]'
                        )}
                      >
                        {srv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 cols): Live Consensus & Optical Interconnect Terminal */}
        <div className="lg:col-span-5 rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <h3 className="text-xs font-mono font-medium text-white">Consensus & Optical Telemetry</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
                Stream Active
              </span>
            </div>

            {/* Subsystem Filter Pills */}
            <div className="flex items-center gap-1 pt-3 text-[10px] font-mono">
              {(['ALL', 'TLS', 'RAFT', 'INGRESS', 'OPTICAL'] as const).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setLogSubsystem(sub)}
                  className={cn(
                    'px-2 py-0.5 rounded-md transition-colors cursor-pointer select-none',
                    logSubsystem === sub
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-neutral-500 hover:text-neutral-300'
                  )}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Monospace Log Viewer */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 font-mono text-[11px] max-h-56 overflow-y-auto flex-1 my-1">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 text-neutral-300">
                <span className="text-neutral-500 shrink-0">{log.time}</span>
                <span
                  className={cn(
                    'px-1 py-0.2 rounded text-[9px] font-semibold shrink-0',
                    log.subsystem === 'TLS' && 'bg-blue-500/15 text-blue-400',
                    log.subsystem === 'RAFT' && 'bg-emerald-500/15 text-emerald-400',
                    log.subsystem === 'INGRESS' && 'bg-purple-500/15 text-purple-400',
                    log.subsystem === 'OPTICAL' && 'bg-amber-500/15 text-amber-400'
                  )}
                >
                  {log.subsystem}
                </span>
                <span className="truncate text-neutral-300">
                  <span className="text-neutral-500 font-normal">[{log.node}]</span> {log.text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>Buffer: 128 / 500 lines</span>
            <span>mTLS SPIFFE / SPIRE Validated</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          4. RUNTIME POLICY CALIBRATION & ANALOG THRESHOLDS (BOTTOM)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Left: Traffic Governance & Attenuation */}
        <div className="rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h4 className="text-sm font-medium text-white tracking-tight">
                Traffic Governance & Edge Filtering
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Runtime attenuation thresholds and deterministic failover rules.
              </p>
            </div>
            <Badge variant="mono" className="text-[10px]">Active Policies</Badge>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {/* Toggle 1: Autonomous Scaling */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-neutral-200">Autonomous Replica Burst Scaling</div>
                <div className="text-[11px] text-neutral-500">Automatically launch hot containers upon traffic spikes (&gt;85% ceiling)</div>
              </div>
              <Switch checked={autoScale} onCheckedChange={setAutoScale} />
            </div>

            {/* Toggle 2: Strict TLS 1.3 */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-neutral-200">Enforce Strict TLS 1.3 Routing</div>
                <div className="text-[11px] text-neutral-500">Cryptographically drops unencrypted and legacy TLS packets at edge boundary</div>
              </div>
              <Switch checked={tlsStrict} onCheckedChange={setTlsStrict} />
            </div>

            {/* Rotary Rate Limit Attenuation Dial */}
            <div className="pt-4 flex items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-xs font-medium text-neutral-200">Global Rate Limit Ceiling</div>
                <div className="text-[11px] text-neutral-500">Adjust ingress token bucket attenuation for public endpoints</div>
                <div className="text-sm font-mono font-medium text-white pt-1">
                  {rateLimitKnob * 40} <span className="text-xs font-normal text-neutral-400">req/sec</span>
                </div>
              </div>

              <div className="flex flex-col items-center shrink-0">
                <Knob
                  value={rateLimitKnob}
                  onChange={setRateLimitKnob}
                  min={10}
                  max={100}
                  size={70}
                  label="Rate Limit"
                  variant="recessed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cryptographic Cluster Credential & Mesh Access */}
        <div className="rounded-[24px] border border-white/[0.08] bg-[#0d0d11] p-5 sm:p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h4 className="text-sm font-medium text-white tracking-tight">
                  Cluster Access Token & mTLS Identity
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Authenticated orchestrator key for programmatic node mesh control.
                </p>
              </div>
              <Badge variant="mono" className="text-[10px]">Read / Write</Badge>
            </div>

            {/* Milled Key Well with One-Click Copy */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs flex items-center justify-between">
              <span className="text-neutral-400 select-none">
                dia_live_sec_••••••••••••••••34
              </span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
          </div>

          {/* Access Policy & Key Rotation */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
            <Checkbox
              label="Enforce IP Allowlist"
              description="Restricts node mutation to authorized CIDR blocks"
              defaultChecked
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotateKey}
              leftIcon={<RotateCw className={cn('w-3.5 h-3.5', isRotatingKey && 'animate-spin')} />}
              className="text-xs font-mono h-8 border-white/10 hover:border-white/20 text-neutral-200"
            >
              {isRotatingKey ? 'Rotating...' : 'Rotate Key'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
