'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SculptedTabShell } from './SculptedTabShell';
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  BarChart3,
  LineChart,
  PieChart,
  Radar,
  Sliders,
  FileCode,
  Share2,
  Bookmark,
  ExternalLink,
  Laptop,
  Smartphone,
  Info,
  Hash,
  ListTree,
} from 'lucide-react';

export function TechnicalDocsLayout() {
  const [activeToc, setActiveToc] = React.useState('structure');
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedPage, setCopiedPage] = React.useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPage = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedPage(true);
    setTimeout(() => setCopiedPage(false), 2000);
  };

  const mainCodeSnippet = `import { type ChartConfig } from "@/registry/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop Ingress",
    icon: LaptopIcon,
    colors: {
      light: ["#047857"],
      dark: ["#10b981"],
    },
  },
  mobile: {
    label: "Mobile Edge",
    icon: SmartphoneIcon,
    colors: {
      light: ["#be123c"],
      dark: ["#f43f5e"],
    },
  },
} satisfies ChartConfig;`;

  const typeDefSnippet = `type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    colors?: {
      light?: string[];
      dark?: string[];
    };
  }
>;`;

  return (
    <SculptedTabShell
      user={{
        name: 'Seiren Humtsoe',
        handle: '@seiren',
        role: 'Lead Architect',
        status: 'online',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[720px] bg-[#09090b] text-neutral-200">
        {/* ══════════════════════════════════════════════════════════
            COLUMN 1: NARROW FIXED LEFT SIDEBAR (cols 1-3)
        ══════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-3 border-r border-white/[0.08] p-4 flex flex-col justify-between bg-[#0b0b0e]/70 space-y-6">
          <div className="space-y-6">
            {/* Workspace & Engine Selector */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/15 transition-all cursor-pointer select-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="text-xs font-medium text-white truncate">NickUI Engine</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate">Canvas + SVG · v2.4</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4 text-xs">
              {/* Group 1: Get Started */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2">
                  Get Started
                </div>
                <div className="space-y-0.5">
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Installation</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Components</span>
                  </button>
                </div>
              </div>

              {/* Group 2: Components */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2">
                  Components
                </div>
                <div className="space-y-0.5">
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Area Chart</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </button>
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-3.5 h-3.5" />
                      <span>Line Chart</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </button>
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Bar Chart</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </button>
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-2">
                      <Radar className="w-3.5 h-3.5" />
                      <span>Radar Chart</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </button>
                  <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-3.5 h-3.5" />
                      <span>Pie Chart</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* Group 3: Documentation */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2">
                  Documentation
                </div>
                <div className="space-y-0.5">
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.08] text-white font-medium border border-white/[0.08] shadow-2xs text-left cursor-pointer">
                    <FileCode className="w-3.5 h-3.5 text-rose-400" />
                    <span>Chart Config</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Theming Engine</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer Metadata */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center justify-between">
            <span>Branch: main</span>
            <span className="text-emerald-400">Synced</span>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 2: LARGE CENTERED CONTENT AREA (cols 4-9)
        ══════════════════════════════════════════════════════════ */}
        <main className="lg:col-span-7 p-6 sm:p-10 space-y-10 overflow-y-auto">
          {/* Content Header with Floating Action Pill */}
          <div className="space-y-3 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Chart Config
                </h1>
                <p className="text-sm text-neutral-400 mt-1">
                  Define labels, colors, and icons for each telemetry series.
                </p>
              </div>

              {/* Floating Action Dropdown Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPage}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] text-xs text-neutral-200 hover:text-white transition-all cursor-pointer select-none shadow-2xs"
                >
                  {copiedPage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPage ? 'Copied' : 'Copy Page'}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl pt-2">
              Every NickUI chart component accepts a{' '}
              <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-rose-300 font-mono text-xs border border-white/[0.06]">
                chartConfig
              </code>{' '}
              object. It maps each data key to its display metadata — labels, colors (with dual-state light/dark theme support), and optional icons shown in tooltips and legends.
            </p>
          </div>

          {/* Section 1: Structure */}
          <section id="structure" className="space-y-4 scroll-mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Hash className="w-4 h-4 text-neutral-400" />
                <span>Structure</span>
              </h2>
              <span className="text-[11px] font-mono text-neutral-400">TypeScript · v2.4</span>
            </div>

            {/* Large Code Block Container */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0d10] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Code2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>chart-config.ts</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(mainCodeSnippet)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer select-none"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-5 text-xs font-mono text-neutral-300 leading-relaxed overflow-x-auto">
                <code>{mainCodeSnippet}</code>
              </pre>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Each key (e.g.{' '}
              <code className="px-1 py-0.5 rounded bg-white/[0.06] text-neutral-200 font-mono text-[11px]">desktop</code>,{' '}
              <code className="px-1 py-0.5 rounded bg-white/[0.06] text-neutral-200 font-mono text-[11px]">mobile</code>) must match a data key in your telemetry payload. Its contract definition:
            </p>

            {/* Type Definition Code Block */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] p-4 text-xs font-mono text-neutral-400 leading-relaxed overflow-x-auto">
              <code>{typeDefSnippet}</code>
            </div>
          </section>

          {/* Section 2: Properties Specification Table */}
          <section id="properties" className="space-y-4 scroll-mt-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Hash className="w-4 h-4 text-neutral-400" />
              <span>Properties Specification</span>
            </h2>

            <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.04] text-neutral-400">
                    <th className="p-3 font-medium">Property</th>
                    <th className="p-3 font-medium">Type</th>
                    <th className="p-3 font-medium">Required</th>
                    <th className="p-3 font-medium font-sans">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                  <tr>
                    <td className="p-3 text-rose-300">label</td>
                    <td className="p-3 text-neutral-400">React.ReactNode</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Display label shown in tooltip headers and legends.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-300">icon</td>
                    <td className="p-3 text-neutral-400">React.ComponentType</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Lucide or custom SVG component displayed beside series label.</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-rose-300">colors</td>
                    <td className="p-3 text-neutral-400">{`{ light?: string[]; dark?: string[] }`}</td>
                    <td className="p-3 text-neutral-400">No</td>
                    <td className="p-3 font-sans text-neutral-300">Dual-state color progression for stroke and fill gradients.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════════════════
            COLUMN 3: SLIM RIGHT-SIDE TABLE OF CONTENTS (cols 10-12)
        ══════════════════════════════════════════════════════════ */}
        <aside className="lg:col-span-2 border-l border-white/[0.08] p-5 bg-[#0a0a0c]/60 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
            <ListTree className="w-3.5 h-3.5 text-neutral-400" />
            <span>On This Page</span>
          </div>

          {/* Tree Navigation with Diamond Marker */}
          <div className="relative pl-3 space-y-2 text-xs border-l border-white/10">
            {/* Active Item: Structure */}
            <div className="relative -left-[17px] flex items-start gap-2">
              <span className="w-2 h-2 rounded-xs rotate-45 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] mt-1 shrink-0" />
              <div className="space-y-1">
                <a
                  href="#structure"
                  onClick={() => setActiveToc('structure')}
                  className="font-medium text-white hover:text-rose-300 transition-colors block"
                >
                  Structure
                </a>
                {/* Nested Properties */}
                <div className="pl-3 space-y-1 text-[11px] text-neutral-400">
                  <a href="#properties" className="hover:text-neutral-200 transition-colors block">
                    Properties
                  </a>
                  <div className="pl-2 space-y-0.5 text-neutral-400">
                    <span className="block hover:text-neutral-300">label</span>
                    <span className="block hover:text-neutral-300">colors</span>
                    <span className="block hover:text-neutral-300">icon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Items */}
            <div className="space-y-2 pt-2 text-neutral-400 text-xs">
              <a href="#how-colors-work" className="hover:text-neutral-200 transition-colors block">
                How Colors Work
              </a>
              <a href="#runtime-validation" className="hover:text-neutral-200 transition-colors block">
                Runtime Validation
              </a>
              <a href="#examples" className="hover:text-neutral-200 transition-colors block">
                Examples
              </a>
              <a href="#api-reference" className="hover:text-neutral-200 transition-colors block">
                API Reference
              </a>
            </div>
          </div>
        </aside>
      </div>
    </SculptedTabShell>
  );
}
