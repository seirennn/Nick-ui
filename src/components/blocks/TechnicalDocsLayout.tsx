'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AreaChart } from '@/components/ui/charts/area-chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Code2,
  Terminal,
  Layers,
  BarChart3,
  LineChart,
  PieChart,
  Radar,
  Sliders,
  FileCode,
  Share2,
  ExternalLink,
  Laptop,
  Smartphone,
  Hash,
  ListTree,
  Search,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function TechnicalDocsLayout() {
  const [activeToc, setActiveToc] = React.useState('overview');
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedPage, setCopiedPage] = React.useState(false);
  const [pkgManager, setPkgManager] = React.useState<'pnpm' | 'npm' | 'bun'>('pnpm');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Live interactive preview states
  const [showDesktopSeries, setShowDesktopSeries] = React.useState(true);
  const [showMobileSeries, setShowMobileSeries] = React.useState(true);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPage = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedPage(true);
      setTimeout(() => setCopiedPage(false), 2000);
    }
  };

  // Live Chart telemetry data
  const previewData = [
    { label: '00:00', value: 4200, baseline: 3800 },
    { label: '04:00', value: 5800, baseline: 4600 },
    { label: '08:00', value: 7400, baseline: 5200 },
    { label: '12:00', value: 9200, baseline: 6800 },
    { label: '16:00', value: 8600, baseline: 6400 },
    { label: '20:00', value: 10400, baseline: 7800 },
    { label: '24:00', value: 11800, baseline: 8400 },
  ];

  const mainCodeSnippet = `import { type ChartConfig } from "@sehrennn/nickui";
import { Laptop, Smartphone } from "lucide-react";

export const chartConfig = {
  desktop: {
    label: "Desktop Ingress",
    icon: Laptop,
    colors: {
      light: ["#1c1b18", "#5c5952"],
      dark: ["#f4f4f7", "#a0a0b0"],
    },
  },
  mobile: {
    label: "Mobile Edge",
    icon: Smartphone,
    colors: {
      light: ["#8c887e", "#e2ddd2"],
      dark: ["#6c6c7c", "#242424"],
    },
  },
} satisfies ChartConfig;`;

  const typeDefSnippet = `export interface ChartSeriesConfig {
  label?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  colors?: {
    light?: string[];
    dark?: string[];
  };
  unit?: string;
}

export type ChartConfig = Record<string, ChartSeriesConfig>;`;

  const installCommand =
    pkgManager === 'pnpm'
      ? 'pnpm dlx @sehrennn/nickui add area-chart'
      : pkgManager === 'npm'
      ? 'npx @sehrennn/nickui add area-chart'
      : 'bunx @sehrennn/nickui add area-chart';

  const navGroups = [
    {
      title: 'Getting Started',
      items: [
        { id: 'installation', label: 'Installation', icon: Terminal },
        { id: 'principles', label: 'Design Principles', icon: BookOpen },
        { id: 'theming', label: 'Theming & Tokens', icon: Sliders },
      ],
    },
    {
      title: 'Telemetry Primitives',
      items: [
        { id: 'area-chart', label: 'Area Chart', icon: BarChart3 },
        { id: 'bar-chart', label: 'Bar Chart', icon: BarChart3 },
        { id: 'line-chart', label: 'Line Chart', icon: LineChart },
        { id: 'radar-chart', label: 'Radar Chart', icon: Radar },
        { id: 'pie-chart', label: 'Pie Chart', icon: PieChart },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { id: 'chart-config', label: 'Chart Config', icon: FileCode, active: true },
        { id: 'motion-curves', label: 'Motion Curves', icon: Sliders },
        { id: 'runtime-types', label: 'Type Definitions', icon: Code2 },
      ],
    },
  ];

  const filteredNavGroups = navGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      searchQuery ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="w-full rounded-[24px] overflow-hidden bg-[#0a0a0c] text-neutral-200 border border-white/[0.08] shadow-2xl font-sans select-none">
      {/* ─── Architectural Top Command Dock ─── */}
      <header className="h-14 px-6 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-gradient-to-b from-white/[0.03] to-transparent shrink-0">
        {/* Left: Breadcrumbs & Engine Tag */}
        <div className="flex items-center gap-3 min-w-0 text-xs font-mono">
          <span className="text-neutral-400">DOCS /</span>
          <span className="text-neutral-400">CONFIGURATION /</span>
          <span className="text-white font-medium truncate">CHART-CONFIG</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
            v2.4.0
          </span>
        </div>

        {/* Right: Quick Spec Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
            title="Copy documentation link"
          >
            {copiedPage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPage ? 'Copied' : 'Share Spec'}</span>
          </button>
        </div>
      </header>

      {/* ─── 3-Column Documentation Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[780px]">
        {/* ══════════════════════════════════════════════════════════
            COLUMN 1: NARROW NAVIGATION SIDEBAR (cols 1-3)
        ══════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-3 border-r border-white/[0.08] p-4 flex flex-col justify-between bg-[#0b0b0e]/80 space-y-6">
          <div className="space-y-4">
            {/* Version & Engine Selector */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer select-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono text-xs font-medium text-white shrink-0">
                  N
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="text-xs font-medium text-white truncate">NickUI Engine</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate">Telemetry & Canvas · v2.4</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </div>

            {/* Search Input Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter documentation..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/20 transition-colors font-sans"
              />
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4 text-xs">
              {filteredNavGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2">
                    {group.title}
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={cn(
                            'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left',
                            item.active
                              ? 'bg-white/[0.08] text-white font-medium border border-white/[0.08] shadow-2xs'
                              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center justify-between">
            <span>Branch: main</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Synced
            </span>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 2: LARGE CENTERED CONTENT AREA (cols 4-9)
        ══════════════════════════════════════════════════════════ */}
        <main className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-10 overflow-y-auto custom-scrollbar">
          {/* Section 1: Overview & Header */}
          <section id="overview" className="space-y-4 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-neutral-300 border border-white/[0.08]">
                  Configuration API
                </span>
                <span className="text-xs font-mono text-neutral-500">·</span>
                <span className="text-xs font-mono text-neutral-400">Zero Dependencies</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Chart Config
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
                Define series labels, dual-state color progression, and icons for zero-loss telemetry visualization.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              Every NickUI chart primitive accepts a{' '}
              <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-neutral-200 font-mono text-xs border border-white/[0.08]">
                chartConfig
              </code>{' '}
              object. It maps each telemetry data key to its presentation contract — labels, dual-mode color tokens, and optional iconography displayed in tooltips and legends.
            </p>
          </section>

          {/* Section 2: Live Interactive Telemetry Preview */}
          <section id="live-preview" className="space-y-4 scroll-mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-neutral-400" />
                <h2 className="text-base font-medium text-white">Interactive Live Preview</h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">Real-time SVG</span>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d10] p-5 space-y-4 shadow-tactile">
              {/* Controls Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-white">Ingress Flow Telemetry</span>
                  <Badge variant="mono" className="text-[10px]">60 FPS Spline</Badge>
                </div>

                {/* Series Toggles */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setShowDesktopSeries(!showDesktopSeries)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5',
                      showDesktopSeries
                        ? 'bg-white/[0.08] border-white/20 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-500 line-through'
                    )}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMobileSeries(!showMobileSeries)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5',
                      showMobileSeries
                        ? 'bg-white/[0.08] border-white/20 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-500 line-through'
                    )}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Live Area Chart */}
              <div className="pt-2">
                <AreaChart
                  data={previewData}
                  height={200}
                  showGrid={true}
                  className="w-full border-0 bg-transparent shadow-none p-0"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.08]">
                <span>Config: chartConfig (satisfies ChartConfig)</span>
                <span className="text-emerald-400">Rendering Nominal</span>
              </div>
            </div>
          </section>

          {/* Section 3: Installation CLI */}
          <section id="installation" className="space-y-4 scroll-mt-6">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-neutral-400" />
              <h2 className="text-base font-medium text-white">Installation</h2>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d0d10] overflow-hidden shadow-tactile">
              {/* Package Manager Tabs */}
              <div className="px-4 py-2 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {(['pnpm', 'npm', 'bun'] as const).map((pm) => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setPkgManager(pm)}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer',
                        pkgManager === pm
                          ? 'bg-white/[0.08] text-white font-medium'
                          : 'text-neutral-400 hover:text-white'
                      )}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(installCommand)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-4 font-mono text-xs text-neutral-300">
                <code>{installCommand}</code>
              </div>
            </div>
          </section>

          {/* Section 4: Configuration Structure */}
          <section id="structure" className="space-y-4 scroll-mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-neutral-400" />
                <h2 className="text-base font-medium text-white">Configuration Structure</h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">TypeScript Contract</span>
            </div>

            {/* Code Block */}
            <div className="rounded-xl border border-white/10 bg-[#0d0d10] overflow-hidden shadow-tactile">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>chart-config.ts</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(mainCodeSnippet)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Source</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-300 leading-relaxed overflow-x-auto">
                <code>{mainCodeSnippet}</code>
              </pre>
            </div>

            {/* Type Definition Box */}
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs font-mono text-neutral-400 leading-relaxed overflow-x-auto">
              <code>{typeDefSnippet}</code>
            </div>
          </section>

          {/* Section 5: Properties Specification Table */}
          <section id="properties" className="space-y-4 scroll-mt-6">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-neutral-400" />
              <h2 className="text-base font-medium text-white">Properties Specification</h2>
            </div>

            <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.01]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-neutral-400 text-[11px]">
                    <th className="p-3 font-medium">Property</th>
                    <th className="p-3 font-medium">Type</th>
                    <th className="p-3 font-medium">Required</th>
                    <th className="p-3 font-medium font-sans">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-neutral-300">
                  <tr>
                    <td className="p-3 text-white font-medium">label</td>
                    <td className="p-3 text-neutral-400">React.ReactNode</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Display label shown in tooltip headers and chart legends.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">icon</td>
                    <td className="p-3 text-neutral-400">React.ComponentType</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Lucide or custom SVG component displayed beside the series title.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">colors</td>
                    <td className="p-3 text-neutral-400">{`{ light?: string[]; dark?: string[] }`}</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Dual-state color progression arrays for stroke and ambient fill gradients.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-medium">unit</td>
                    <td className="p-3 text-neutral-400">string</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Optional suffix appended to values (e.g. &ldquo; GB/s&rdquo;, &ldquo;%&rdquo;).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Runtime Validation */}
          <section id="validation" className="space-y-4 scroll-mt-6">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-neutral-400" />
              <h2 className="text-base font-medium text-white">Runtime Validation</h2>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-200 font-medium">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>Compile-Time & Runtime Type Safety</span>
              </div>
              <p className="text-neutral-400 leading-relaxed font-sans">
                Using TypeScript&apos;s <code className="px-1 py-0.5 rounded bg-white/[0.06] text-neutral-300 font-mono text-[11px]">satisfies ChartConfig</code> operator verifies that your configuration matches all expected properties without widening the inferred type keys. This guarantees autocomplete when referencing series in your components.
              </p>
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 3: SLIM RIGHT-SIDE TABLE OF CONTENTS (cols 10-12)
        ══════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-2 border-l border-white/[0.08] p-5 bg-[#0a0a0c]/60 space-y-5">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
            <ListTree className="w-3.5 h-3.5 text-neutral-400" />
            <span>On This Page</span>
          </div>

          {/* Clean Outline with Hairline Indicator */}
          <div className="space-y-1.5 text-xs text-neutral-400 font-sans">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'live-preview', label: 'Live Preview' },
              { id: 'installation', label: 'Installation' },
              { id: 'structure', label: 'Structure' },
              { id: 'properties', label: 'Properties' },
              { id: 'validation', label: 'Runtime Validation' },
            ].map((section) => {
              const isActive = activeToc === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveToc(section.id)}
                  className={cn(
                    'block px-2.5 py-1 rounded-md transition-colors text-left text-xs',
                    isActive
                      ? 'text-white font-medium bg-white/[0.06] border-l-2 border-white'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                  )}
                >
                  {section.label}
                </a>
              );
            })}
          </div>

          {/* Page Utilities */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs">
            <button
              type="button"
              onClick={handleCopyPage}
              className="w-full flex items-center justify-between text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
            >
              <span>Copy Page URL</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://github.com/seirennn/Nick-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between text-neutral-400 hover:text-white transition-colors"
            >
              <span>GitHub Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
