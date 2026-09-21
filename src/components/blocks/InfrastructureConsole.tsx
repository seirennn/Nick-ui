'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Gauge } from '@/components/ui/gauge';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { Checkbox } from '@/components/ui/checkbox';
import { Kbd } from '@/components/ui/kbd';
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
  Pause,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicroService {
  name: string;
  env: string;
  version: string;
  commit: string;
  region: string;
  latency: string;
  status: 'Operational' | 'Rolling Out' | 'Standby';
}

const SERVICES: MicroService[] = [
  { name: 'api-gateway', env: 'Production', version: 'v2.4.2', commit: '8f3a1b', region: 'us-east-1', latency: '11ms', status: 'Operational' },
  { name: 'auth-service', env: 'Production', version: 'v1.9.0', commit: '4c2d9e', region: 'us-east-1', latency: '14ms', status: 'Operational' },
  { name: 'edge-router', env: 'Production', version: 'v3.1.0', commit: 'a1e782', region: 'global-anycast', latency: '8ms', status: 'Rolling Out' },
  { name: 'worker-queue', env: 'Production', version: 'v2.0.4', commit: '99f01b', region: 'eu-west-1', latency: '42ms', status: 'Operational' },
  { name: 'analytics-sink', env: 'Staging', version: 'v1.4.0-rc', commit: '5b881c', region: 'us-east-1', latency: '19ms', status: 'Standby' },
];

const TERMINAL_LOGS = [
  { id: 1, time: '05:54:12', level: 'INFO', node: 'edge-fra-01', text: 'TLS 1.3 session resumption verified (1.4ms)' },
  { id: 2, time: '05:54:13', level: 'SYS', node: 'raft-leader', text: 'Consensus term 148 quorum acknowledged (5/5 nodes)' },
  { id: 3, time: '05:54:15', level: 'INGRESS', node: 'api-gateway', text: 'HTTP/2 200 OK /v1/telemetry 8.2ms 1.4KB' },
  { id: 4, time: '05:54:17', level: 'INFO', node: 'worker-queue', text: 'Batch auction settlement 42 committed to storage' },
  { id: 5, time: '05:54:18', level: 'OPTICAL', node: 'backbone-ord', text: 'Interconnect link attenuation nominal (-2.1 dB)' },
];

export function InfrastructureConsole() {
  const [autoScale, setAutoScale] = React.useState(true);
  const [tlsStrict, setTlsStrict] = React.useState(true);
  const [rateLimit, setRateLimit] = React.useState(2500);
  const [cpuVal, setCpuVal] = React.useState(38);
  const [memVal, setMemVal] = React.useState(54);
  const [copiedKey, setCopiedKey] = React.useState(false);
  const [copiedBlock, setCopiedBlock] = React.useState(false);
  const [liveStream, setLiveStream] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCpuVal((prev) => Math.min(85, Math.max(22, prev + (Math.random() * 6 - 3))));
      setMemVal((prev) => Math.min(78, Math.max(45, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyBlock = () => {
    navigator.clipboard.writeText(`import { InfrastructureConsole } from '@/components/blocks/InfrastructureConsole';`);
    setCopiedBlock(true);
    setTimeout(() => setCopiedBlock(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('dia_live_sec_98f4bc819e0134');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="w-full rounded-[28px] border border-border/80 bg-card p-6 md:p-8 space-y-8 shadow-tactile select-none">
      {/* 1. Infrastructure Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg text-text-primary font-medium tracking-tight">
              Cluster Routing & Service Topology
            </h3>
            <Badge variant="status" status="success">US-East Primary</Badge>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Deterministic edge routing with automatic failover across 4 regional clusters.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="secondary" size="sm" onClick={handleCopyBlock} className="text-xs font-mono h-8">
            {copiedBlock ? <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {copiedBlock ? 'Copied' : 'Copy Block'}
          </Button>
          <Button variant="default" size="sm" className="text-xs font-mono h-8">
            Deploy Revision
          </Button>
        </div>
      </div>

      {/* 2. Primary Telemetry Gauges & Latency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU Utilization Dial */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col items-center justify-between shadow-2xs">
          <div className="flex items-center justify-between w-full mb-1 text-xs">
            <span className="text-text-secondary flex items-center gap-1.5 font-medium">
              <Cpu className="w-3.5 h-3.5 text-text-muted" /> Compute Load
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Nominal</span>
          </div>
          <Gauge
            value={cpuVal}
            label="CPU ALLOC"
            unit="%"
            size={135}
            variant="tactile"
          />
        </div>

        {/* Memory Buffer Dial */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col items-center justify-between shadow-2xs">
          <div className="flex items-center justify-between w-full mb-1 text-xs">
            <span className="text-text-secondary flex items-center gap-1.5 font-medium">
              <HardDrive className="w-3.5 h-3.5 text-text-muted" /> Memory Heap
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Optimal</span>
          </div>
          <Gauge
            value={memVal}
            label="RAM UTIL"
            unit="%"
            size={135}
            variant="recessed"
          />
        </div>

        {/* P99 Round-Trip Latency */}
        <div className="p-5 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary flex items-center gap-1.5 font-medium">
                <Activity className="w-3.5 h-3.5 text-text-muted" /> P99 RTT Latency
              </span>
              <span className="text-[11px] font-mono text-text-muted">Edge-to-Origin</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-text-primary font-mono">12.4</span>
              <span className="text-xs text-text-muted font-mono">ms</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              ↓ 1.2ms from benchmark
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-[11px] text-text-muted font-mono">Trend</span>
            <Sparkline data={[18, 16, 15, 14, 13, 12.4]} width={100} height={24} color="#10b981" />
          </div>
        </div>

        {/* Aggregate Network Throughput */}
        <div className="p-5 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary flex items-center gap-1.5 font-medium">
                <Wifi className="w-3.5 h-3.5 text-text-muted" /> Ingress Bandwidth
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Stable</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-text-primary font-mono">4.82</span>
              <span className="text-xs text-text-muted font-mono">GB/s</span>
            </div>
            <div className="text-[11px] text-text-muted mt-1 font-mono">
              Zero dropped frame headers
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-[11px] text-text-muted font-mono">Throughput</span>
            <Sparkline data={[3.8, 4.1, 4.3, 4.6, 4.7, 4.82]} width={100} height={24} color="#10b981" />
          </div>
        </div>
      </div>

      {/* 3. Live Terminal Stream + Active Regional Microservices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Deployed Microservices Table */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">
                Active Regional Microservices
              </h4>
              <span className="text-xs text-text-muted">
                Live deployment revisions currently receiving production traffic
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-mono h-7">
              <RefreshCw className="w-3 h-3 mr-1.5" /> Refresh State
            </Button>
          </div>

          <div className="rounded-xl border border-border/70 overflow-hidden bg-card/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 border-b border-border/70 text-text-muted font-mono text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3.5">Service Endpoint</th>
                    <th className="py-2.5 px-3.5">Revision</th>
                    <th className="py-2.5 px-3.5">Region</th>
                    <th className="py-2.5 px-3.5">Latency</th>
                    <th className="py-2.5 px-3.5">Lifecycle</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 font-mono">
                  {SERVICES.map((srv) => (
                    <tr key={srv.name} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span className="font-medium text-text-primary">{srv.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-text-muted border border-border/60">
                          {srv.version}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-[11px] text-text-secondary">
                        {srv.region}
                      </td>
                      <td className="py-2.5 px-3.5 text-text-primary">
                        {srv.latency}
                      </td>
                      <td className="py-2.5 px-3.5">
                        <Badge
                          variant="status"
                          status={srv.status === 'Operational' ? 'success' : srv.status === 'Rolling Out' ? 'warning' : 'neutral'}
                          className="text-[10px]"
                        >
                          {srv.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            Logs
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                            Rollback
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Live Telemetry Event Stream */}
        <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-[#09090b] text-neutral-200 p-4 font-mono text-xs shadow-tactile flex flex-col justify-between space-y-3 min-h-[300px]">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[11px] text-neutral-300 font-medium">Consensus Telemetry Log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-neutral-400">Stream Active</span>
            </div>
          </div>

          <div className="space-y-2 font-mono text-[11px] leading-relaxed flex-1 overflow-y-auto max-h-[220px]">
            {TERMINAL_LOGS.map((log) => (
              <div key={log.id} className="flex items-start gap-2 text-neutral-300">
                <span className="text-neutral-500 shrink-0">{log.time}</span>
                <span className={cn(
                  'px-1 rounded text-[9px] font-bold shrink-0',
                  log.level === 'SYS' && 'bg-blue-500/20 text-blue-400',
                  log.level === 'INFO' && 'bg-emerald-500/20 text-emerald-400',
                  log.level === 'INGRESS' && 'bg-purple-500/20 text-purple-300',
                  log.level === 'OPTICAL' && 'bg-amber-500/20 text-amber-400'
                )}>
                  {log.level}
                </span>
                <span className="truncate text-neutral-300">
                  <span className="text-neutral-500 font-normal">[{log.node}]</span> {log.text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
            <span>Buffer: 128 / 500 lines</span>
            <span>mTLS SPIFFE / SPIRE Validated</span>
          </div>
        </div>
      </div>

      {/* 4. Production Overrides & Security Governance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Runtime Feature Controls */}
        <div className="rounded-2xl border border-border/70 p-5 space-y-4 bg-card/60">
          <h4 className="text-sm font-medium text-text-primary tracking-tight">
            Traffic Governance & Edge Controls
          </h4>

          <div className="divide-y divide-border/60">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-text-primary">Autonomous Replica Scaling</div>
                <div className="text-[11px] text-text-muted">Automatically launch burst containers upon traffic spikes</div>
              </div>
              <Switch checked={autoScale} onCheckedChange={setAutoScale} />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-text-primary">Enforce Strict TLS 1.3 Routing</div>
                <div className="text-[11px] text-text-muted">Drops unencrypted and legacy TLS protocols at firewall boundary</div>
              </div>
              <Switch checked={tlsStrict} onCheckedChange={setTlsStrict} />
            </div>

            <div className="pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-primary">Global Rate Limit Ceiling</span>
                <span className="text-xs font-mono font-medium text-text-primary">{rateLimit} req/sec</span>
              </div>
              <Slider
                value={rateLimit}
                onChange={setRateLimit}
                min={500}
                max={10000}
                step={250}
              />
            </div>
          </div>
        </div>

        {/* Security & Access Credentials */}
        <div className="rounded-2xl border border-border/70 p-5 space-y-4 bg-card/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary tracking-tight">
                Production Ingress Credential
              </h4>
              <Badge variant="mono" className="text-[10px]">Read / Write</Badge>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Token authenticated for edge orchestrator programmatic cluster management.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border font-mono text-xs flex items-center justify-between">
              <span className="text-text-muted select-none">
                dia_live_sec_••••••••••••••••34
              </span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="text-text-muted hover:text-text-primary transition-colors cursor-pointer text-[11px] flex items-center gap-1"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <Checkbox label="Enforce IP Allowlist" defaultChecked />
            <Button variant="secondary" size="sm" className="text-xs">
              Rotate Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
