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
import {
  Search,
  ChevronDown,
  Check,
  ArrowRight,
  Layers,
  Sliders,
  Cpu,
  Copy,
  Sparkles,
  Terminal,
  Activity,
  HardDrive,
  ShieldCheck,
  RotateCcw,
  Compass,
  Zap,
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

  // Precision Tactile Ergonomics & Telemetry Console state
  const [tactileTier, setTactileTier] = React.useState<'tactile' | 'recessed' | 'engraved' | 'flat'>('tactile');
  const [tactileSlider, setTactileSlider] = React.useState(74);
  const [tactileKnob, setTactileKnob] = React.useState(62);
  const [dampingMode, setDampingMode] = React.useState<'quintic' | 'critical' | 'linear'>('quintic');
  const [precisionMode, setPrecisionMode] = React.useState<'standard' | 'fine' | 'coarse'>('standard');
  const [streamMode, setStreamMode] = React.useState<'continuous' | 'transient' | 'spectral'>('continuous');
  const [activeSpecimen, setActiveSpecimen] = React.useState<'engraved' | 'flat' | 'recessed' | 'tactile'>('tactile');
  const [isActuating, setIsActuating] = React.useState(false);
  const [isImpulsing, setIsImpulsing] = React.useState(false);
  const [timebase, setTimebase] = React.useState<'10ms' | '25ms' | '50ms'>('25ms');

  // Signature Interactions state
  const [churningPattern, setChurningPattern] = React.useState<ChurningPattern>('wavefront');
  const [commandCategory, setCommandCategory] = React.useState<'All' | 'Commands' | 'AI' | 'System'>('All');
  const [commandQuery, setCommandQuery] = React.useState('');
  const [activeCommandId, setActiveCommandId] = React.useState<string | null>(null);
  const [aiPromptModel, setAiPromptModel] = React.useState('Claude 3.5 Sonnet');
  const [aiPromptLoading, setAiPromptLoading] = React.useState(false);

  const computedCapacity = tactileSlider;
  const computedHeadroom = 100 - Math.round(tactileSlider * 0.65);
  const computedLatency = (1.8 - (tactileSlider / 100) * 0.9).toFixed(1);
  const computedForce = (tactileKnob * 0.4 + 35).toFixed(1);
  const computedRestitution = Math.round(
    dampingMode === 'quintic' ? 94 : dampingMode === 'critical' ? 100 : 62
  );

  const triggerImpulsePulse = React.useCallback(() => {
    setIsImpulsing(true);
    setIsActuating(true);
    setTimeout(() => setIsActuating(false), 240);
    setTimeout(() => setIsImpulsing(false), 800);
  }, []);

  const waveformPoints = React.useMemo(() => {
    const points: { chA: number; chB: number }[] = [];
    const count = 48;
    const timeFactor = timebase === '10ms' ? 3.6 : timebase === '25ms' ? 2.4 : 1.6;
    const freqFactor = streamMode === 'continuous' ? timeFactor : streamMode === 'transient' ? timeFactor * 1.5 : timeFactor * 2.2;
    const amp = (tactileSlider / 100) * 26 + (isImpulsing ? 18 : 6);

    for (let i = 0; i < count; i++) {
      const x = i / (count - 1);
      const angle = x * Math.PI * 2 * freqFactor;
      
      let baseA = 0;
      let baseB = 0;

      if (streamMode === 'continuous') {
        baseA = Math.sin(angle);
        baseB = Math.cos(angle * 1.02);
      } else if (streamMode === 'transient') {
        const decay = Math.exp(-x * (dampingMode === 'critical' ? 4.5 : dampingMode === 'quintic' ? 3.0 : 1.8));
        baseA = Math.sin(angle * 2) * decay;
        baseB = Math.cos(angle * 2) * decay;
      } else {
        // Spectral mode
        baseA = Math.sin(angle) * 0.7 + Math.sin(angle * 2.5) * 0.3;
        baseB = Math.cos(angle * 1.5) * 0.6 + Math.sin(angle * 3) * 0.4;
      }

      const dampingFactor = dampingMode === 'quintic' ? 1 : dampingMode === 'critical' ? 0.75 : 1.25;
      const valA = 50 + baseA * amp * dampingFactor;
      const valB = 50 + baseB * (amp * 0.7) * dampingFactor;

      points.push({
        chA: Math.round(Math.max(10, Math.min(90, valA))),
        chB: Math.round(Math.max(10, Math.min(90, valB))),
      });
    }
    return points;
  }, [tactileSlider, dampingMode, streamMode, timebase, isImpulsing]);

  const { svgPathChA, svgPathChB, areaSvgPathChA } = React.useMemo(() => {
    if (waveformPoints.length === 0) return { svgPathChA: '', svgPathChB: '', areaSvgPathChA: '' };
    const width = 640;
    const height = 96;
    const step = width / (waveformPoints.length - 1);

    let pathA = `M 0,${height - (waveformPoints[0].chA / 100) * height}`;
    let pathB = `M 0,${height - (waveformPoints[0].chB / 100) * height}`;

    for (let i = 1; i < waveformPoints.length; i++) {
      const prevX = (i - 1) * step;
      const prevYA = height - (waveformPoints[i - 1].chA / 100) * height;
      const prevYB = height - (waveformPoints[i - 1].chB / 100) * height;
      const currX = i * step;
      const currYA = height - (waveformPoints[i].chA / 100) * height;
      const currYB = height - (waveformPoints[i].chB / 100) * height;

      const cp1X = prevX + step * 0.5;
      const cp2X = prevX + step * 0.5;

      pathA += ` C ${cp1X},${prevYA} ${cp2X},${currYA} ${currX},${currYA}`;
      pathB += ` C ${cp1X},${prevYB} ${cp2X},${currYB} ${currX},${currYB}`;
    }

    return {
      svgPathChA: pathA,
      svgPathChB: pathB,
      areaSvgPathChA: `${pathA} L 640,${height} L 0,${height} Z`,
    };
  }, [waveformPoints]);

  const resetConsoleDefaults = () => {
    setTactileTier('tactile');
    setActiveSpecimen('tactile');
    setTactileSlider(74);
    setTactileKnob(62);
    setDampingMode('quintic');
    setPrecisionMode('standard');
    setStreamMode('continuous');
    setTimebase('25ms');
  };

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
      category: 'AI',
      shortcut: '⌘A',
      icon: <Sparkles className="w-3.5 h-3.5" />,
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
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
          <section className="px-6 md:px-12 py-20 border-b border-border/80 space-y-8 bg-card/20">
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
                Architectural depth tiers engineered for tactile feedback — raised reliefs, recessed wells, milled chamfers, and balanced spring damping.
              </p>
            </div>

            {/* Precision Console Master Workstation */}
            <div className="rounded-[28px] border border-border/80 bg-card/90 shadow-tactile p-6 md:p-8 space-y-8 backdrop-blur-md relative overflow-hidden">
              {/* Subtle Ambient Console Grid */}
              <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Console Top Instrument Header & Master Status */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/80 border border-border/70 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                    <span className="text-text-primary font-medium tracking-tight">STATUS: CALIBRATED</span>
                    <span className="text-text-muted/60">·</span>
                    <span className="text-text-muted">TIER: {tactileTier.toUpperCase()}</span>
                  </div>
                  <div className="text-[11px] font-mono text-text-muted hidden md:flex items-center gap-2">
                    <span>FORCE: <strong className="text-text-primary font-medium">{computedForce} cN</strong></span>
                    <span>·</span>
                    <span>LATENCY: <strong className="text-text-primary font-medium">{computedLatency}ms</strong></span>
                    <span>·</span>
                    <span>RESTITUTION: <strong className="text-text-primary font-medium">{computedRestitution}%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <SegmentedControl
                    value={tactileTier}
                    onChange={(val) => {
                      setTactileTier(val as any);
                      setActiveSpecimen(val as any);
                    }}
                    size="sm"
                    variant="recessed"
                    options={[
                      { value: 'engraved', label: 'Engraved (-1.5mm)' },
                      { value: 'flat', label: 'Flush (0.0mm)' },
                      { value: 'recessed', label: 'Recessed (-0.8mm)' },
                      { value: 'tactile', label: 'Tactile (+2.4mm)' },
                    ]}
                  />

                  <button
                    type="button"
                    onClick={resetConsoleDefaults}
                    className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
                    title="Reset console to factory calibration"
                    aria-label="Reset console"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Instruments Deck (3 Precision Bays) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Bay 1: Actuation Specimens & Micro-Elevation (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/25 border border-border/70 tactile-well flex flex-col justify-between space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Actuation Specimens
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono">4 Depth Tiers</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Physical relief, chamfered wells, and planar surfaces calibrated across microscopic elevation levels.
                    </p>
                  </div>

                  {/* 4 Tangible Specimen Actuators (2x2 Grid) */}
                  <div className="grid grid-cols-2 gap-2.5 py-1">
                    {/* Specimen 0: Engraved Subsurface */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpecimen('engraved');
                        setTactileTier('engraved');
                        triggerImpulsePulse();
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none space-y-1.5 ${
                        activeSpecimen === 'engraved'
                          ? 'bg-background shadow-inner-tactile border-border text-text-primary ring-1 ring-primary/40'
                          : 'bg-secondary/40 hover:bg-secondary/70 border-border/60 text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Tier 0</span>
                        <span className="text-[10px] font-mono text-text-muted">-1.5mm</span>
                      </div>
                      <div className="text-xs font-medium">Engraved</div>
                      <div className="text-[10px] font-mono text-text-muted opacity-70">Deep Milled Relief</div>
                    </button>

                    {/* Specimen 1: Flush Coplanar */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpecimen('flat');
                        setTactileTier('flat');
                        triggerImpulsePulse();
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none space-y-1.5 ${
                        activeSpecimen === 'flat'
                          ? 'bg-card border-border text-text-primary ring-1 ring-primary/40 shadow-2xs'
                          : 'bg-secondary/40 hover:bg-secondary/70 border-border/60 text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Tier 1</span>
                        <span className="text-[10px] font-mono text-text-muted">0.0mm</span>
                      </div>
                      <div className="text-xs font-medium">Flush Planar</div>
                      <div className="text-[10px] font-mono text-text-muted opacity-70">Coplanar Contact</div>
                    </button>

                    {/* Specimen 2: Recessed Milled Well */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpecimen('recessed');
                        setTactileTier('recessed');
                        triggerImpulsePulse();
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none space-y-1.5 ${
                        activeSpecimen === 'recessed'
                          ? 'bg-secondary/90 shadow-inner-tactile border-border text-text-primary ring-1 ring-primary/40'
                          : 'bg-secondary/40 hover:bg-secondary/70 border-border/60 text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Tier 2</span>
                        <span className="text-[10px] font-mono text-text-muted">-0.8mm</span>
                      </div>
                      <div className="text-xs font-medium">Recessed Well</div>
                      <div className="text-[10px] font-mono text-text-muted opacity-70">Milled Chamfer</div>
                    </button>

                    {/* Specimen 3: Raised Tactile Relief */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSpecimen('tactile');
                        setTactileTier('tactile');
                        triggerImpulsePulse();
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer select-none space-y-1.5 ${
                        activeSpecimen === 'tactile'
                          ? 'bg-card shadow-tactile border-border/90 text-text-primary ring-1 ring-primary/40'
                          : 'bg-secondary/40 hover:bg-secondary/70 border-border/60 text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Tier 3</span>
                        <span className="text-[10px] font-mono text-text-muted">+2.4mm</span>
                      </div>
                      <div className="text-xs font-medium">Raised Relief</div>
                      <div className="text-[10px] font-mono text-text-muted opacity-70">Specular Lip</div>
                    </button>
                  </div>

                  {/* Damping Physics Selector */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                      <span>SPRING DAMPING PHYSICS:</span>
                      <span className="text-text-primary font-medium uppercase">{dampingMode}</span>
                    </div>
                    <SegmentedControl
                      value={dampingMode}
                      onChange={(v) => setDampingMode(v as any)}
                      size="sm"
                      variant="tactile"
                      fullWidth
                      options={[
                        { value: 'quintic', label: 'Quintic Spring' },
                        { value: 'critical', label: 'Critical' },
                        { value: 'linear', label: 'Linear' },
                      ]}
                    />
                  </div>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span>ACTIVE: <strong className="text-text-primary font-medium uppercase">{activeSpecimen}</strong></span>
                    <span>RESTITUTION: <strong className="text-text-primary font-medium">{computedRestitution}%</strong></span>
                  </div>
                </div>

                {/* Bay 2: Dual-Axis Attenuation & Rotary Encoder (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/25 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Dual-Axis Calibration
                      </span>
                      <Badge variant="engraved" className="text-[10px] font-mono">Milled Track</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Rotary knurled dial and milled linear slider trough with etched millimeter graduation.
                    </p>
                  </div>

                  {/* Dual-Axis Control Deck: Rotary Encoder + Linear Slider */}
                  <div className="space-y-4 p-4 rounded-xl bg-card/70 border border-border/60">
                    <div className="flex items-center justify-around gap-4 pb-2 border-b border-border/50">
                      {/* Rotary Knob */}
                      <div className="flex flex-col items-center gap-1.5">
                        <Knob
                          value={tactileKnob}
                          onChange={setTactileKnob}
                          min={0}
                          max={100}
                          step={1}
                          size={70}
                          variant="tactile"
                          showTicks={true}
                          showValue={false}
                        />
                        <div className="text-center font-mono">
                          <span className="text-[10px] text-text-muted block uppercase tracking-wider">Spring Force</span>
                          <span className="text-xs font-medium text-text-primary">{computedForce} cN</span>
                        </div>
                      </div>

                      {/* Travel Attenuation Numerical Readout */}
                      <div className="flex flex-col justify-center space-y-1.5 text-right font-mono">
                        <div>
                          <span className="text-[10px] text-text-muted uppercase block">Linear Travel</span>
                          <span className="text-xl font-medium tracking-tight text-text-primary">{tactileSlider}mm</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted uppercase block">Attenuation</span>
                          <span className="text-xs text-text-secondary">{tactileSlider}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Linear Slider Well */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-mono text-text-muted px-0.5">
                        <span>0mm</span>
                        <span>25mm</span>
                        <span>50mm</span>
                        <span>75mm</span>
                        <span>100mm</span>
                      </div>
                      <Slider value={tactileSlider} min={0} max={100} onChange={setTactileSlider} />
                    </div>

                    {/* Discrete 32-Segment Optical Level Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[9px] font-mono text-text-muted">
                        <span>ATTENUATION DISPLACEMENT LEVEL</span>
                        <span>{tactileSlider}%</span>
                      </div>
                      <div className="flex gap-0.5 h-1.5 w-full">
                        {Array.from({ length: 32 }).map((_, i) => {
                          const active = (i / 31) * 100 <= tactileSlider;
                          const isPeak = Math.abs((i / 31) * 100 - tactileSlider) < 3.2;
                          return (
                            <div
                              key={i}
                              className={`flex-1 h-full rounded-[1px] transition-colors duration-150 ${
                                isPeak
                                  ? 'bg-text-primary'
                                  : active
                                  ? 'bg-foreground/75'
                                  : 'bg-muted/35'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Resolution Mode Switcher */}
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Resolution:</span>
                    <SegmentedControl
                      value={precisionMode}
                      onChange={(v) => setPrecisionMode(v as any)}
                      size="sm"
                      variant="tactile"
                      options={[
                        { value: 'fine', label: '0.1x Fine' },
                        { value: 'standard', label: '1x Std' },
                        { value: 'coarse', label: '5x Coarse' },
                      ]}
                    />
                  </div>
                </div>

                {/* Bay 3: Surface Haptic & Acoustic Telemetry (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/25 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Surface Telemetry
                      </span>
                      <Badge variant="status" status="success" className="text-[10px] font-mono">Nominal</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Real-time optical travel, return velocity, and tactile headroom feedback.
                    </p>
                  </div>

                  {/* Multi-Layer Concentric Telemetry Arcs */}
                  <div className="py-2 flex flex-col items-center justify-center">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                        {/* Outer Track: Travel Capacity */}
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          className="text-muted/20"
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeDasharray={2 * Math.PI * 54}
                          strokeDashoffset={2 * Math.PI * 54 * (1 - tactileSlider / 100)}
                          strokeLinecap="round"
                          className="text-foreground transition-all duration-300"
                        />

                        {/* Middle Track: Restitution Velocity */}
                        <circle
                          cx="70"
                          cy="70"
                          r="44"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-muted/20"
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r="44"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 44}
                          strokeDashoffset={2 * Math.PI * 44 * (1 - computedRestitution / 100)}
                          strokeLinecap="round"
                          className="text-foreground/60 transition-all duration-300"
                        />

                        {/* Inner Track: Damping Headroom */}
                        <circle
                          cx="70"
                          cy="70"
                          r="34"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          className="text-muted/20"
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r="34"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 34}
                          strokeDashoffset={2 * Math.PI * 34 * (1 - computedHeadroom / 100)}
                          strokeLinecap="round"
                          className="text-foreground/40 transition-all duration-300"
                        />
                      </svg>

                      {/* Center Numerical Readout */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-mono font-medium tracking-tight text-text-primary">
                          {tactileSlider}%
                        </span>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted">
                          CALIBRATED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Architectural Data Metrics Cells */}
                  <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-card/60 border border-border/50">
                      <span className="text-text-muted block">RETURN LATENCY</span>
                      <span className="text-text-primary font-medium text-xs">{computedLatency}ms</span>
                    </div>
                    <div className="p-2 rounded-lg bg-card/60 border border-border/50">
                      <span className="text-text-muted block">TACTILE HEADROOM</span>
                      <span className="text-text-primary font-medium text-xs">{computedHeadroom}%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-card/60 border border-border/50">
                      <span className="text-text-muted block">SPRING FORCE</span>
                      <span className="text-text-primary font-medium text-xs">{computedForce} cN</span>
                    </div>
                    <div className="p-2 rounded-lg bg-card/60 border border-border/50">
                      <span className="text-text-muted block">ACOUSTIC PROFILE</span>
                      <span className="text-text-primary font-medium text-xs truncate">
                        {activeSpecimen === 'engraved' ? 'Subdued Thud' : activeSpecimen === 'flat' ? 'Planar Tap' : activeSpecimen === 'recessed' ? 'Muffled Click' : 'Crisp Clack'}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Impulse Trigger Action */}
                  <button
                    type="button"
                    onClick={triggerImpulsePulse}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-secondary/80 hover:bg-secondary text-text-primary border border-border/70 text-xs font-mono transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <Zap className="w-3.5 h-3.5 text-text-muted" />
                    <span>Trigger Physical Impulse</span>
                  </button>
                </div>
              </div>

              {/* Bottom Deck: Dual-Channel Phase Waveform & Impulse Oscilloscope */}
              <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-secondary/25 border border-border/70 tactile-well space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-text-primary" />
                    <span className="font-mono font-medium text-text-primary tracking-tight">
                      DUAL-CHANNEL DISPLACEMENT & PHASE OSCILLOSCOPE
                    </span>
                    <span className="text-[10px] font-mono text-text-muted hidden md:inline">
                      // CH1: TRAVEL (mm) · CH2: VELOCITY (mm/s)
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                      <span>Sweep:</span>
                      <SegmentedControl
                        value={timebase}
                        onChange={(v) => setTimebase(v as any)}
                        size="sm"
                        variant="tactile"
                        options={[
                          { value: '10ms', label: '10ms' },
                          { value: '25ms', label: '25ms' },
                          { value: '50ms', label: '50ms' },
                        ]}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                      <span>Mode:</span>
                      <SegmentedControl
                        value={streamMode}
                        onChange={(v) => setStreamMode(v as any)}
                        size="sm"
                        variant="tactile"
                        options={[
                          { value: 'continuous', label: 'Continuous' },
                          { value: 'transient', label: 'Transient' },
                          { value: 'spectral', label: 'Spectral' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Oscilloscope Phosphor Screen */}
                <div className="relative h-28 w-full rounded-xl bg-background/95 border border-border/80 overflow-hidden shadow-inner-tactile flex items-center justify-center">
                  {/* Calibrated Division Grid */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '32px 24px',
                    }}
                  />

                  {/* Horizontal Center Baseline */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-b border-border/40 pointer-events-none" />

                  {/* Calibrated Trigger Line */}
                  <div className="absolute left-0 right-0 top-[35%] border-b border-dashed border-text-muted/30 pointer-events-none flex justify-end pr-2">
                    <span className="text-[8px] font-mono text-text-muted/60">TRIG: 45 cN</span>
                  </div>

                  {/* Dual Channel Waveforms */}
                  <svg
                    viewBox="0 0 640 96"
                    preserveAspectRatio="none"
                    className="w-full h-full relative z-10"
                  >
                    <defs>
                      <linearGradient id="waveGradientA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area under Channel A */}
                    <path
                      d={areaSvgPathChA}
                      fill="url(#waveGradientA)"
                      className="text-foreground transition-all duration-200"
                    />

                    {/* Channel B: Velocity Derivative (dashed hairline) */}
                    <path
                      d={svgPathChB}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                      className="text-text-muted/60 transition-all duration-200"
                    />

                    {/* Channel A: Force Travel Displacement (solid curve) */}
                    <path
                      d={svgPathChA}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground transition-all duration-200"
                    />
                  </svg>
                </div>

                {/* Oscilloscope Instrumentation Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-text-muted pt-1">
                  <span>SAMPLING: 2,400 Hz</span>
                  <span>BUFFER: 1,024 SAMPLES</span>
                  <span>TIMEBASE: {timebase}/DIV</span>
                  <span>TRIGGER: 45.0 cN (AUTO)</span>
                  <span>DAMPING: {dampingMode.toUpperCase()} (0.707 ζ)</span>
                  <span>HEADROOM: {computedHeadroom}%</span>
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
