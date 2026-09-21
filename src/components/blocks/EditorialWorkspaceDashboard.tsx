'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Calendar,
  ArrowUpRight,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useBlockViewer } from './BlockViewer';

export function EditorialWorkspaceDashboard() {
  const { isFullscreen, viewport } = useBlockViewer();
  const isEdgeToEdge = isFullscreen && viewport === '100%';

  const [activeTab, setActiveTab] = React.useState('publications');
  const [searchQuery, setSearchQuery] = React.useState('');

  const documents = [
    {
      id: 'DOC-104',
      title: 'Axiom Autonomous Runtime Architecture Specification',
      category: 'Systems Whitepaper',
      author: 'Seiren Humtsoe',
      updated: '14 minutes ago',
      status: 'Published',
      reads: '14.2k',
    },
    {
      id: 'DOC-103',
      title: 'Optical Physics & Non-Intrusive Spatial Computing',
      category: 'Design Authority',
      author: 'Design Working Group',
      updated: '2 hours ago',
      status: 'In Review',
      reads: '8.9k',
    },
    {
      id: 'DOC-102',
      title: 'Deterministic State Machine Failover Protocols',
      category: 'Infrastructure',
      author: 'Core Engineering',
      updated: 'Yesterday',
      status: 'Published',
      reads: '21.4k',
    },
    {
      id: 'DOC-101',
      title: 'Harmonic Soundstage Spectrum Equalizer Manual',
      category: 'Hardware Audio',
      author: 'DSP Lab',
      updated: '3 days ago',
      status: 'Draft',
      reads: '3.1k',
    },
  ];

  return (
    <div
      className={cn(
        'w-full bg-[#0d0d0f] text-neutral-100 transition-all duration-300',
        isEdgeToEdge
          ? 'h-full min-h-0 rounded-none border-0 shadow-none p-6 sm:p-10 space-y-8 overflow-y-auto'
          : 'rounded-[28px] border border-border/80 shadow-2xl p-6 sm:p-10 space-y-8 min-h-[850px]'
      )}
    >
      {/* ─── Asymmetrical Editorial Header ─── */}
      <div className="space-y-4 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
            <span>EDITORIAL WORKSPACE // VOL. 04</span>
          </div>
          <div className="flex items-center gap-3">
            <span>SEPTEMBER 21, 2026</span>
            <span>·</span>
            <span>DIMAPUR, INDIA</span>
          </div>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-6 pt-2">
          <div className="max-w-2xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif italic">
              Knowledge & Protocol Codex
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Institutional-grade editorial publications, design paradigms, and architectural specifications compiled for production systems.
            </p>
          </div>

          {/* New Document Button */}
          <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export Codex
            </Button>
            <Button variant="tactile" depth="medium" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Draft Entry
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Segmented Navigation & Search Filter ─── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SegmentedControl
          options={[
            { value: 'publications', label: 'Publications' },
            { value: 'whitepapers', label: 'Whitepapers' },
            { value: 'telemetry', label: 'Release Notes' },
            { value: 'archive', label: 'Archived' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
          variant="recessed"
          size="sm"
        />

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search codex..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white/20 transition-colors w-48 sm:w-64"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Metric Cards in Subtle Recessed Wells ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="recessed" depth="subtle" className="p-5 space-y-1 bg-white/[0.02]">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Total Documents</span>
          <div className="text-2xl font-light text-white font-serif">142 Entries</div>
          <div className="text-[11px] text-emerald-400 font-mono pt-1">+8 published this month</div>
        </Card>

        <Card variant="recessed" depth="subtle" className="p-5 space-y-1 bg-white/[0.02]">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Codex Readership</span>
          <div className="text-2xl font-light text-white font-serif">84.9k Reads</div>
          <div className="text-[11px] text-emerald-400 font-mono pt-1">99.4% completion rate</div>
        </Card>

        <Card variant="recessed" depth="subtle" className="p-5 space-y-1 bg-white/[0.02]">
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Peer Reviews</span>
          <div className="text-2xl font-light text-white font-serif">12 In Progress</div>
          <div className="text-[11px] text-neutral-400 font-mono pt-1">Avg 2.4 days turnaround</div>
        </Card>
      </div>

      {/* ─── Editorial Publication Table ─── */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.01] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.03] text-neutral-400 font-mono text-[11px]">
              <th className="p-4 font-medium">DOCUMENT / TITLE</th>
              <th className="p-4 font-medium hidden sm:table-cell">CATEGORY</th>
              <th className="p-4 font-medium hidden md:table-cell">AUTHOR</th>
              <th className="p-4 font-medium">STATUS</th>
              <th className="p-4 font-medium text-right">METRICS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                <td className="p-4 space-y-1">
                  <div className="font-medium text-neutral-100 group-hover:text-rose-300 transition-colors">
                    {doc.title}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-500">{doc.id} · Updated {doc.updated}</div>
                </td>
                <td className="p-4 font-mono text-neutral-400 hidden sm:table-cell">
                  {doc.category}
                </td>
                <td className="p-4 text-neutral-300 hidden md:table-cell">
                  {doc.author}
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border',
                      doc.status === 'Published' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                      doc.status === 'In Review' && 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                      doc.status === 'Draft' && 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30'
                    )}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-neutral-300">
                  {doc.reads}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
