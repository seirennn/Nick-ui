'use client';

import * as React from 'react';
import Link from 'next/link';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownLabel } from '@/components/ui/dropdown';
import { Tooltip } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Kbd } from '@/components/ui/kbd';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gauge } from '@/components/ui/gauge';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { AnalyticsDashboard } from '@/components/blocks/AnalyticsDashboard';
import { TactileMetricCard } from '@/components/ui/charts/tactile-metric-card';
import { AiChurning, type ChurningPattern } from '@/components/ui/ai-churning';
import { AiPromptBar } from '@/components/ui/ai-prompt-bar';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Knob } from '@/components/ui/knob';
import { cn } from '@/lib/utils';
import {
  Search,
  ChevronDown,
  Check,
  ArrowRight,
  Layers,
  Sliders,
  SlidersHorizontal,
  Cpu,
  Copy,
  Terminal,
  Activity,
  HardDrive,
  ShieldCheck,
  RotateCcw,
  Compass,
  Workflow,
  Radio as RadioIcon,
  Play,
  RefreshCw,
  Target,
} from 'lucide-react';
import componentsData from '@/registry/components.json';

export default function HomePage() {
  const [demoInput, setDemoInput] = React.useState('AxiomMed LMS Architecture');
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [demoStatus, setDemoStatus] = React.useState<'success' | 'warning' | 'neutral'>('success');
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  // Calibrated Tactile Hierarchy state
  const [tactileTier, setTactileTier] = React.useState<'engraved' | 'flat' | 'recessed' | 'tactile'>('tactile');
  const [tactileSlider, setTactileSlider] = React.useState(68);
  const [tactileKnob, setTactileKnob] = React.useState(55);

  // Signature Interactions state
  const [churningPattern, setChurningPattern] = React.useState<ChurningPattern>('wavefront');
  const [commandCategory, setCommandCategory] = React.useState<'All' | 'Commands' | 'AI' | 'System'>('All');
  const [commandQuery, setCommandQuery] = React.useState('');
  const [activeCommandId, setActiveCommandId] = React.useState<string | null>(null);
  const [aiPromptModel, setAiPromptModel] = React.useState('Claude 3.5 Sonnet');
  const [aiPromptLoading, setAiPromptLoading] = React.useState(false);

  const consoleCommands = [
    {
      id: 'cluster',
      title: 'Inspect Cluster Telemetry',
      category: 'Commands',
      shortcut: '⌘C',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'docs',
      title: 'Switch to Technical Docs',
      category: 'Navigation',
      shortcut: '⌘D',
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: 'consensus',
      title: 'Run Consensus Verification',
      category: 'Commands',
      shortcut: '⌘R',
      icon: <Terminal className="w-3.5 h-3.5" />,
    },
    {
      id: 'perf',
      title: 'Analyze Frame Bottlenecks',
      category: 'Analysis',
      shortcut: '⌘A',
      icon: <Activity className="w-3.5 h-3.5" strokeWidth={1.5} />,
    },
  ];

  const filteredCommands = consoleCommands.filter((cmd) => {
    const matchesCategory = commandCategory === 'All' || cmd.category === commandCategory;
    const matchesQuery = !commandQuery || cmd.title.toLowerCase().includes(commandQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('pnpm add @sehrennn/nickui');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <>
      <SiteNavbar />

      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
        {/* Editorial Framed Column */}
        <div className="max-w-5xl mx-auto border-x border-border min-h-screen flex flex-col pt-24">

          {/* ═══════════════════════════════════════════
              HERO SECTION
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 pt-16 pb-16 border-b border-border/80">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3">
                <BrandLogo size="md" variant="tactile" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                    NickUI v0.1.1 · Free & Open-Source Ecosystem
                  </span>
                  <Link href="/docs/mcp">
                    <Badge variant="engraved" className="ml-1 text-[10px] hover:border-foreground/30 transition-colors cursor-pointer">
                      FREE MCP SERVER
                    </Badge>
                  </Link>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-text-primary leading-tight">
                Architectural developer-owned UI components & AI MCP server.
              </h1>

              <p className="text-body sm:text-[15px] text-text-secondary leading-relaxed max-w-2xl font-normal">
                NickUI is a shadcn-inspired component system engineered for spatial clarity, environmental atmosphere, and tactile depth.
                Use it as an npm package, copy source code directly with the CLI, or connect your AI coding agents via our free open-source MCP server.
              </p>

              {/* Dual Installation Modes Bar */}
              <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-tactile space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted uppercase">Install via Package or CLI</span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
                    <Link href="/docs/cli" className="hover:text-text-primary underline">CLI Docs →</Link>
                    <span>·</span>
                    <Link href="/docs/mcp" className="hover:text-text-primary underline">MCP Setup →</Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/60 text-xs font-mono">
                    <div>
                      <span className="text-text-muted block text-[10px] uppercase font-sans">1. Package Install</span>
                      <span className="text-text-primary font-medium">pnpm add @sehrennn/nickui</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('pnpm add @sehrennn/nickui');
                        setCopiedInstall(true);
                        setTimeout(() => setCopiedInstall(false), 2000);
                      }}
                      className="text-text-muted hover:text-text-primary transition-colors cursor-pointer p-1"
                      aria-label="Copy package install"
                    >
                      {copiedInstall ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/60 text-xs font-mono">
                    <div>
                      <span className="text-text-muted block text-[10px] uppercase font-sans">2. Source / CLI (shadcn-style)</span>
                      <span className="text-text-primary font-medium">pnpm dlx @sehrennn/nickui add button</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('pnpm dlx @sehrennn/nickui add button');
                        setCopiedInstall(true);
                        setTimeout(() => setCopiedInstall(false), 2000);
                      }}
                      className="text-text-muted hover:text-text-primary transition-colors cursor-pointer p-1"
                      aria-label="Copy CLI install"
                    >
                      {copiedInstall ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/components">
                  <Button variant="tactile" size="md" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Explore All {componentsData.length} Components
                  </Button>
                </Link>
                <Link href="/docs/cli">
                  <Button variant="secondary" size="md">
                    CLI Guide
                  </Button>
                </Link>
                <Link href="/docs/mcp">
                  <Button variant="outline" size="md">
                    AI MCP Setup
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              SURFACE ERGONOMICS & TACTILE CALIBRATION
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-20 border-b border-border/80 space-y-10 bg-card/20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Tactile Ergonomics & Surface Calibration
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary mt-1">
                  Calibrated Tactile Hierarchy
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
                Four physical elevation tiers engineered for spatial clarity without superficial ornamentation — raised reliefs, recessed wells, milled chamfers, and coplanar contact.
              </p>
            </div>

            {/* 4 Architectural Depth Tier Specimen Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tier 0: Engraved Subsurface */}
              <div
                onClick={() => setTactileTier('engraved')}
                className={cn(
                  'p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none',
                  tactileTier === 'engraved'
                    ? 'bg-card border-foreground/30 shadow-tactile ring-1 ring-foreground/20'
                    : 'bg-card/60 hover:bg-card border-border/70 hover:border-border'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Tier 0</span>
                    <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60">-1.5mm</span>
                  </div>
                  <h4 className="text-sm font-medium text-text-primary">Engraved Subsurface</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Negative elevation well with deep milled relief and subtle inner shadow.
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="subtle" size="sm" className="w-full">
                    Actuate Engraved
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/40 text-[10px] font-mono text-text-muted flex justify-between">
                  <span>Inner Sink: 1px</span>
                  <span>Finish: Matte</span>
                </div>
              </div>

              {/* Tier 1: Flush Coplanar */}
              <div
                onClick={() => setTactileTier('flat')}
                className={cn(
                  'p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none',
                  tactileTier === 'flat'
                    ? 'bg-card border-foreground/30 shadow-tactile ring-1 ring-foreground/20'
                    : 'bg-card/60 hover:bg-card border-border/70 hover:border-border'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Tier 1</span>
                    <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60">0.0mm</span>
                  </div>
                  <h4 className="text-sm font-medium text-text-primary">Flush Coplanar</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Coplanar surface contact with hairline border and zero artificial elevation.
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="secondary" size="sm" className="w-full">
                    Actuate Planar
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/40 text-[10px] font-mono text-text-muted flex justify-between">
                  <span>Border: 1px Solid</span>
                  <span>Finish: Smooth</span>
                </div>
              </div>

              {/* Tier 2: Recessed Milled Well */}
              <div
                onClick={() => setTactileTier('recessed')}
                className={cn(
                  'p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none',
                  tactileTier === 'recessed'
                    ? 'bg-card border-foreground/30 shadow-tactile ring-1 ring-foreground/20'
                    : 'bg-card/60 hover:bg-card border-border/70 hover:border-border'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Tier 2</span>
                    <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60">-0.8mm</span>
                  </div>
                  <h4 className="text-sm font-medium text-text-primary">Recessed Well</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Milled chamfer sink with soft ambient shadow falloff.
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="recessed" size="sm" className="w-full">
                    Actuate Recessed
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/40 text-[10px] font-mono text-text-muted flex justify-between">
                  <span>Falloff: 4px Soft</span>
                  <span>Finish: Milled</span>
                </div>
              </div>

              {/* Tier 3: Raised Tactile Relief */}
              <div
                onClick={() => setTactileTier('tactile')}
                className={cn(
                  'p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none',
                  tactileTier === 'tactile'
                    ? 'bg-card border-foreground/30 shadow-tactile ring-1 ring-foreground/20'
                    : 'bg-card/60 hover:bg-card border-border/70 hover:border-border'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Tier 3</span>
                    <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60">+2.4mm</span>
                  </div>
                  <h4 className="text-sm font-medium text-text-primary">Raised Relief</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Raised specular lip with measured spring damping and physical feedback.
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="tactile" size="sm" className="w-full">
                    Actuate Tactile
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/40 text-[10px] font-mono text-text-muted flex justify-between">
                  <span>Rim: 1.5px Lip</span>
                  <span>Spring: Damped</span>
                </div>
              </div>
            </div>

            {/* Unified Tactile Calibration Deck (Single Clean Deck) */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-tactile space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-text-primary uppercase tracking-wider">
                    Physical Kinematics Calibration
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    CALIBRATED
                  </span>
                </div>
                <div className="text-[11px] font-mono text-text-muted">
                  SELECTED TIER: <span className="text-text-primary font-medium uppercase">{tactileTier}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Rotary Damping Knob (Col 4) */}
                <div className="md:col-span-4 p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-text-primary block">Rotary Damping</span>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Mechanical rotational resistance
                    </p>
                    <span className="text-xs font-mono text-text-primary font-medium block pt-1">
                      {tactileKnob}% Damping
                    </span>
                  </div>
                  <Knob
                    value={tactileKnob}
                    onChange={setTactileKnob}
                    min={0}
                    max={100}
                    size={52}
                    label=""
                  />
                </div>

                {/* Spring Travel Slider (Col 5) */}
                <div className="md:col-span-5 p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-text-primary">Spring Travel Resistance</span>
                    <span className="font-mono text-text-muted">{tactileSlider}%</span>
                  </div>
                  <Slider value={tactileSlider} onChange={setTactileSlider} min={10} max={100} />
                  <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                    <span>Soft (10%)</span>
                    <span>Nominal (68%)</span>
                    <span>Stiff (100%)</span>
                  </div>
                </div>

                {/* Live Actuation Specimen (Col 3) */}
                <div className="md:col-span-3 p-4 rounded-xl bg-secondary/30 border border-border/50 flex flex-col items-center justify-center space-y-2 text-center">
                  <span className="text-[10px] font-mono text-text-muted uppercase">Live Actuator</span>
                  <Button
                    variant={tactileTier === 'flat' ? 'secondary' : tactileTier === 'engraved' ? 'subtle' : tactileTier}
                    size="md"
                    className="w-full"
                  >
                    Actuate Key
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              ARCHITECTURAL MICRO-INTERACTIONS SHOWCASE
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-20 border-b border-border/80 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Signature Interactions
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary mt-1">
                  Environmental & Tactile Depth
                </h2>
                <p className="text-body text-text-secondary mt-1 max-w-xl text-xs sm:text-sm">
                  Adapted from advanced micro-interaction research with architectural restraint: ambient spline telemetry, atmospheric pixel-grid churning, keyboard-first command orchestration, and contextual generative input.
                </p>
              </div>
              <Link href="/components">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Explore All {componentsData.length} Components
                </Button>
              </Link>
            </div>

            {/* 2x2 Architectural Grid of High-Fidelity Showcases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Architectural Spline Telemetry Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Telemetry // Analytics</span>
                    <Badge variant="outline" className="text-[10px]">Node Trajectory</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Tactile Metric Spline</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Interactive cubic spline with hoverable nodes, dynamic income tooltip pill, and milled tactile well.
                  </p>
                </div>

                <div className="py-1">
                  <TactileMetricCard
                    title="Cluster Ingress"
                    value="$128,450"
                    periodLabel="2026"
                    deltaText="+18.4%"
                    deltaSubtext="vs prior cycle"
                    className="border border-border/60 shadow-none bg-secondary/30 p-4 rounded-xl"
                  />
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>TACTILE METRIC CARD</span>
                  <Link href="/components/charts" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>

              {/* 2. Atmospheric AI Churning & Pixel-Grid Loader Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">State Continuity // AI Core</span>
                    <Badge variant="engraved" className="text-[10px]">Pixel Grid</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Atmospheric AI Churning</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Subtle pixel-grid wavefront and orbit animations communicating long-running system state without interaction affordance.
                  </p>
                </div>

                <div className="space-y-3 py-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Pattern:</span>
                    <SegmentedControl
                      value={churningPattern}
                      onChange={(v) => setChurningPattern(v as any)}
                      size="sm"
                      variant="tactile"
                      options={[
                        { value: 'wavefront', label: 'Wave' },
                        { value: 'dots', label: 'Dots' },
                        { value: 'orbit', label: 'Orbit' },
                        { value: 'matrix', label: 'Matrix' },
                      ]}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/25 border border-border/60 flex items-center justify-center">
                    <AiChurning
                      pattern={churningPattern}
                      variant="tactile"
                      label="Synthesizing Schema"
                      sublabel="Ingesting architecture AST"
                      showTelemetry={true}
                      showTimer={true}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>AI CHURNING</span>
                  <Link href="/components/ai-churning" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>

              {/* 3. Tactile Command Console Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Orchestration // System</span>
                    <Badge variant="outline" className="text-[10px]">Keyboard First</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Tactile Command Console</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Instant keyboard-driven command execution with category filters, tactile selection wells, and monospaced shortcuts.
                  </p>
                </div>

                <div className="space-y-2.5 py-1">
                  {/* Search Input Well */}
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 absolute left-3 text-text-muted pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filter commands or shortcuts..."
                      value={commandQuery}
                      onChange={(e) => setCommandQuery(e.target.value)}
                      className="w-full pl-9 pr-12 py-1.5 rounded-xl bg-secondary/40 border border-border/60 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono"
                    />
                    <span className="absolute right-2.5 pointer-events-none">
                      <Kbd>⌘K</Kbd>
                    </span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                    {(['All', 'Commands', 'AI', 'System'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCommandCategory(cat)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                          commandCategory === cat
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'bg-secondary/60 text-text-muted hover:text-text-primary border border-border/50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Filtered Command List */}
                  <div className="space-y-1 rounded-xl bg-secondary/25 border border-border/60 p-1.5">
                    {filteredCommands.map((cmd) => {
                      const isExecuted = activeCommandId === cmd.id;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          onClick={() => {
                            setActiveCommandId(cmd.id);
                            setTimeout(() => setActiveCommandId(null), 2000);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                            isExecuted
                              ? 'bg-card border border-border shadow-xs'
                              : 'hover:bg-card/70 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-text-muted">{cmd.icon}</span>
                            <span className="text-xs text-text-primary font-medium truncate">{cmd.title}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isExecuted ? (
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                OK
                              </span>
                            ) : (
                              <Kbd>{cmd.shortcut}</Kbd>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>COMMAND PALETTE</span>
                  <Link href="/components/command-palette" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>

              {/* 4. Architectural AI Prompt Bar Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Generative Surfaces // Input</span>
                    <Badge variant="engraved" className="text-[10px]">Contextual Bar</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Architectural Prompt Console</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Tactile prompt input with dynamic model switching, integrated tool toggles (Reason, Web, Code), and file attachments.
                  </p>
                </div>

                <div className="space-y-3 py-1">
                  {/* Quick prompt tags */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                    <span className="text-[10px] font-mono text-text-muted shrink-0">Try:</span>
                    {[
                      'Simulate Consensus',
                      'Analyze Latency',
                      'Export Schematics',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setAiPromptLoading(true);
                          setTimeout(() => setAiPromptLoading(false), 1800);
                        }}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-secondary/60 text-text-muted hover:text-text-primary border border-border/50 transition-colors shrink-0 cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 rounded-2xl bg-secondary/25 border border-border/60">
                    <AiPromptBar
                      placeholder="Ask anything, analyze cluster topology, or run simulation..."
                      variant="tactile"
                      models={['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek R1', 'NickUI-Architect']}
                      selectedModel={aiPromptModel}
                      onModelChange={setAiPromptModel}
                      isLoading={aiPromptLoading}
                      onSubmit={() => {
                        setAiPromptLoading(true);
                        setTimeout(() => setAiPromptLoading(false), 2000);
                      }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>AI PROMPT BAR</span>
                  <Link href="/components/ai-prompt-bar" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              PHILOSOPHY & TENETS
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-16 border-b border-border/80">
            <div className="max-w-3xl space-y-10">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Design Philosophy
                </span>
                <h2 className="text-component-title text-text-primary mt-1">
                  Atmospheric System Presence
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5 p-4 rounded-xl bg-card border border-border tactile-surface">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-text-primary tactile-well">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-ui font-medium text-text-primary">Atmosphere over Ornament</h3>
                  <p className="text-body text-text-muted text-xs leading-relaxed">
                    Visual effects are global environmental conditions (`system-atmosphere` & `system-grain`), never localized badges or flashy neon glows.
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-xl bg-card border border-border tactile-surface">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-text-primary tactile-well">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-ui font-medium text-text-primary">Tangible Feedback</h3>
                  <p className="text-body text-text-muted text-xs leading-relaxed">
                    Tactile depth bridges physical ergonomics with digital minimalism: bevel rims, recessed tracks, and physical spring sinks.
                  </p>
                </div>

                <div className="space-y-2.5 p-4 rounded-xl bg-card border border-border tactile-surface">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-text-primary tactile-well">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-ui font-medium text-text-primary">Machine-Readable AI Registry</h3>
                  <p className="text-body text-text-muted text-xs leading-relaxed">
                    Every component is indexed in `registry/` with strict type schemas, usage rules, and discovery APIs ready for MCP integration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              FEATURED PRODUCTION BLOCK: ANALYTICS
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-16 border-b border-border/80 space-y-8 bg-card/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Real-World Compositions
                </span>
                <h2 className="text-component-title text-text-primary mt-1">
                  Executive Revenue & Analytics Dashboard
                </h2>
              </div>
              <Link href="/blocks" className="text-ui text-text-secondary hover:text-text-primary flex items-center gap-1 font-medium">
                Explore all 12 blocks & landing layouts
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <AnalyticsDashboard />
          </section>

          {/* ═══════════════════════════════════════════
              COMPONENT CATALOG OVERVIEW
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-16 border-b border-border/80 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  The Library
                </span>
                <h2 className="text-component-title text-text-primary mt-1">
                  {componentsData.length} Production Components
                </h2>
              </div>
              <Link href="/components" className="text-ui text-text-secondary hover:text-text-primary flex items-center gap-1">
                Browse complete catalog
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {componentsData.map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="p-4 rounded-xl bg-card border border-border hover:border-foreground/30 tactile-surface transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sidebar-category uppercase tracking-wider text-text-muted">
                        {c.category}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted group-hover:text-text-primary transition-colors">
                        →
                      </span>
                    </div>
                    <h3 className="text-ui font-medium text-text-primary">
                      {c.title}
                    </h3>
                    <p className="text-metadata text-text-muted line-clamp-2 text-xs">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/40 flex items-center gap-1">
                    {c.variants.slice(0, 2).map((v) => (
                      <span key={v} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted/60 text-text-muted">
                        {v}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              FOOTER
          ═══════════════════════════════════════════ */}
          <footer className="px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-metadata text-text-muted">
            <div className="flex items-center gap-2">
              <BrandLogo size="xs" showText variant="minimal" />
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/docs/cli" className="hover:text-text-primary transition-colors">CLI</Link>
              <Link href="/docs/mcp" className="hover:text-text-primary transition-colors">AI MCP</Link>
              <Link href="/blocks" className="hover:text-text-primary transition-colors">Blocks</Link>
              <Link href="/components" className="hover:text-text-primary transition-colors">Components</Link>
              <a
                href="https://github.com/seirennn/Nick-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
