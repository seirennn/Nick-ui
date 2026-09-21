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
import { OtpInput } from '@/components/ui/otp-input';
import { SpotlightCard, SpotlightCardHeader, SpotlightCardTitle, SpotlightCardDescription, SpotlightCardContent } from '@/components/ui/spotlight-card';
import { FolderPreview } from '@/components/ui/folder-preview';
import { MagneticTabs } from '@/components/ui/magnetic-tabs';
import { StackDeck } from '@/components/ui/stack-deck';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Search, ChevronDown, Check, ArrowRight, Layers, Sliders, Cpu, Copy, Sparkles, Terminal, Activity, HardDrive, ShieldCheck, RotateCcw } from 'lucide-react';
import componentsData from '@/registry/components.json';

export default function HomePage() {
  const [demoInput, setDemoInput] = React.useState('AxiomMed LMS Architecture');
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [demoStatus, setDemoStatus] = React.useState<'success' | 'warning' | 'neutral'>('success');
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  // Precision Tactile Ergonomics & Telemetry Console state
  const [tactileTier, setTactileTier] = React.useState<'tactile' | 'recessed' | 'engraved' | 'flat'>('tactile');
  const [tactileSlider, setTactileSlider] = React.useState(74);
  const [tactileDamping, setTactileDamping] = React.useState(true);
  const [precisionMode, setPrecisionMode] = React.useState<'standard' | 'fine' | 'coarse'>('standard');
  const [streamMode, setStreamMode] = React.useState<'continuous' | 'transient'>('continuous');
  const [pressedBtn, setPressedBtn] = React.useState<'raised' | 'recessed' | 'engraved'>('raised');

  const [homeOtp, setHomeOtp] = React.useState('849201');
  const [homeTab, setHomeTab] = React.useState('schematics');

  const computedCapacity = tactileSlider;
  const computedHeadroom = 100 - Math.round(tactileSlider * 0.65);
  const computedLatency = (1.8 - (tactileSlider / 100) * 0.9).toFixed(1);

  const waveformPoints = React.useMemo(() => {
    const points: number[] = [];
    const count = 32;
    const freqFactor = streamMode === 'continuous' ? 2.4 : 3.8;
    const amp = (tactileSlider / 100) * 28 + 8;
    for (let i = 0; i < count; i++) {
      const x = i / (count - 1);
      const angle = x * Math.PI * 2 * freqFactor;
      const base = streamMode === 'continuous' ? Math.sin(angle) : Math.sin(angle) * Math.cos(angle * 0.5);
      const val = 50 + base * amp * (tactileDamping ? 1 : 0.65);
      points.push(Math.round(Math.max(10, Math.min(90, val))));
    }
    return points;
  }, [tactileSlider, tactileDamping, streamMode]);

  const svgPath = React.useMemo(() => {
    if (waveformPoints.length === 0) return '';
    const width = 600;
    const height = 80;
    const step = width / (waveformPoints.length - 1);
    let d = `M 0,${height - (waveformPoints[0] / 100) * height}`;
    for (let i = 1; i < waveformPoints.length; i++) {
      const prevX = (i - 1) * step;
      const prevY = height - (waveformPoints[i - 1] / 100) * height;
      const currX = i * step;
      const currY = height - (waveformPoints[i] / 100) * height;
      const cp1X = prevX + step * 0.5;
      const cp1Y = prevY;
      const cp2X = prevX + step * 0.5;
      const cp2Y = currY;
      d += ` C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${currX},${currY}`;
    }
    return d;
  }, [waveformPoints]);

  const areaSvgPath = React.useMemo(() => {
    if (!svgPath) return '';
    return `${svgPath} L 600,80 L 0,80 Z`;
  }, [svgPath]);

  const resetConsoleDefaults = () => {
    setTactileTier('tactile');
    setTactileSlider(74);
    setTactileDamping(true);
    setPrecisionMode('standard');
    setStreamMode('continuous');
    setPressedBtn('raised');
  };

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
          <section className="px-6 md:px-12 py-20 border-b border-border/80 space-y-8 bg-card/25">
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

            {/* Precision Console Master Deck */}
            <div className="rounded-[26px] border border-border/80 bg-card shadow-tactile p-6 md:p-8 space-y-8 backdrop-blur-sm">
              {/* Console Top Instrument Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                    <span className="text-xs font-mono font-medium text-text-primary tracking-tight">
                      SURFACE // CALIBRATED
                    </span>
                  </div>
                  <span className="text-text-muted/40 hidden sm:inline">|</span>
                  <div className="text-[11px] font-mono text-text-muted hidden md:inline">
                    TIER: <span className="text-text-primary uppercase font-medium">{tactileTier}</span> · RESOLUTION: 0.1mm
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <SegmentedControl
                    value={tactileTier}
                    onChange={(val) => setTactileTier(val as any)}
                    size="sm"
                    variant="recessed"
                    options={[
                      { value: 'flat', label: 'Flat' },
                      { value: 'engraved', label: 'Engraved' },
                      { value: 'recessed', label: 'Recessed' },
                      { value: 'tactile', label: 'Tactile' },
                    ]}
                  />

                  <button
                    type="button"
                    onClick={resetConsoleDefaults}
                    className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
                    title="Reset console to factory defaults"
                    aria-label="Reset console"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Instruments Deck */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Column 1: Actuation Surfaces & Depth Tiers (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Actuation Surfaces
                      </span>
                      <Badge variant="outline" className="text-[10px]">Depth Tiers</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Physical relief and inner-shadow chamfers calibrated across tactile elevation levels.
                    </p>
                  </div>

                  {/* Tactile Button Actions */}
                  <div className="space-y-2 py-2">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={tactileTier === 'flat' ? 'outline' : tactileTier === 'engraved' ? 'outline' : tactileTier === 'recessed' ? 'recessed' : 'tactile'}
                        size="sm"
                        onClick={() => setPressedBtn('raised')}
                        className={`text-xs ${pressedBtn === 'raised' ? 'ring-1 ring-primary/40' : ''}`}
                      >
                        Raised Rim
                      </Button>
                      <Button
                        variant={tactileTier === 'flat' ? 'outline' : 'recessed'}
                        size="sm"
                        onClick={() => setPressedBtn('recessed')}
                        className={`text-xs ${pressedBtn === 'recessed' ? 'ring-1 ring-primary/40' : ''}`}
                      >
                        Recessed
                      </Button>
                      <Button
                        variant={tactileTier === 'tactile' ? 'tactile' : 'outline'}
                        size="sm"
                        onClick={() => setPressedBtn('engraved')}
                        className={`text-xs ${pressedBtn === 'engraved' ? 'ring-1 ring-primary/40' : ''}`}
                      >
                        Engraved
                      </Button>
                    </div>

                    {/* Spring Damping Toggle Switch */}
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-card/60 border border-border/60 mt-3">
                      <div className="space-y-0.5">
                        <div className="text-xs font-medium text-text-primary">Quintic Damping</div>
                        <div className="text-[10px] text-text-muted">Smooth spring deceleration</div>
                      </div>
                      <Switch checked={tactileDamping} onCheckedChange={setTactileDamping} size="sm" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span>ACTIVE: <strong className="text-text-primary font-medium uppercase">{pressedBtn}</strong></span>
                    <span>PHYSICS: <strong className="text-text-primary font-medium">{tactileDamping ? 'QUINTIC' : 'LINEAR'}</strong></span>
                  </div>
                </div>

                {/* Column 2: Continuous Attenuation & Milled Well (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Continuous Calibration
                      </span>
                      <Badge variant="engraved" className="text-[10px]">Milled Well</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Recessed slider track with etched millimeter tick graduation and precision attenuation.
                    </p>
                  </div>

                  {/* Precision Linear Slider Well */}
                  <div className="space-y-3 p-4 rounded-xl bg-card/60 border border-border/60">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Attenuation</span>
                      </div>
                      <span className="text-text-primary font-medium text-sm">{tactileSlider}%</span>
                    </div>

                    <Slider value={tactileSlider} min={0} max={100} onChange={setTactileSlider} />

                    {/* Discrete 24-Segment LED Meter Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[9px] font-mono text-text-muted">
                        <span>MIN</span>
                        <span>50%</span>
                        <span>MAX</span>
                      </div>
                      <div className="flex gap-0.5 h-1.5 w-full">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const active = (i / 23) * 100 <= tactileSlider;
                          return (
                            <div
                              key={i}
                              className={`flex-1 h-full rounded-[1px] transition-colors duration-150 ${
                                active
                                  ? 'bg-foreground/80'
                                  : 'bg-muted/40'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sensitivity Switcher */}
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

                {/* Column 3: Telemetry & Surface Metrics (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Surface Telemetry
                      </span>
                      <Badge variant="status" status="success" className="text-[10px]">Nominal</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Real-time optical travel, return velocity, and tactile headroom feedback.
                    </p>
                  </div>

                  {/* Telemetry Radial Gauge / Metrics Card */}
                  <div className="py-2 flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="6"
                          className="text-muted/30"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeDasharray={2 * Math.PI * 48}
                          strokeDashoffset={2 * Math.PI * 48 * (1 - tactileSlider / 100)}
                          strokeLinecap="round"
                          className="text-foreground transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-mono font-medium tracking-tight text-text-primary">
                          {tactileSlider}%
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                          CAPACITY
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Architectural Data Metrics Cells */}
                  <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[10px] font-mono text-center">
                    <div className="p-2 rounded-lg bg-secondary/60 border border-border/50">
                      <span className="text-text-muted block">RETURN LATENCY</span>
                      <span className="text-text-primary font-medium text-xs">{computedLatency}ms</span>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/60 border border-border/50">
                      <span className="text-text-muted block">HEADROOM</span>
                      <span className="text-text-primary font-medium text-xs">{computedHeadroom}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Deck: Real-Time Telemetry Throughput Stream */}
              <div className="p-4 sm:p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-text-muted animate-pulse" />
                    <span className="font-mono font-medium text-text-primary">
                      REAL-TIME THROUGHPUT STREAM
                    </span>
                    <span className="text-[10px] font-mono text-text-muted hidden md:inline">
                      // BUFFER: 512 SAMPLES · LATENCY: {computedLatency}ms
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-muted">Stream Mode:</span>
                    <SegmentedControl
                      value={streamMode}
                      onChange={(v) => setStreamMode(v as any)}
                      size="sm"
                      variant="tactile"
                      options={[
                        { value: 'continuous', label: 'Continuous' },
                        { value: 'transient', label: 'Transient' },
                      ]}
                    />
                  </div>
                </div>

                {/* Telemetry Stream Graph with Ambient Phosphor Bezier Curve */}
                <div className="relative h-24 w-full rounded-xl bg-background/90 border border-border/70 overflow-hidden shadow-inner-tactile flex items-center justify-center">
                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '30px 20px',
                    }}
                  />

                  {/* Bezier Waveform */}
                  <svg
                    viewBox="0 0 600 80"
                    preserveAspectRatio="none"
                    className="w-full h-full relative z-10"
                  >
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={areaSvgPath}
                      fill="url(#waveGradient)"
                      className="text-foreground transition-all duration-300"
                    />
                    <path
                      d={svgPath}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground/80 transition-all duration-300"
                    />
                  </svg>
                </div>

                {/* Telemetry Footer Stats */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-text-muted pt-1">
                  <span>SAMPLING: 1,000 Hz</span>
                  <span>CAPACITY: {computedCapacity}%</span>
                  <span>DAMPING: {tactileDamping ? 'QUINTIC (ACTIVE)' : 'LINEAR'}</span>
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
                  Adapted from advanced micro-interaction research with architectural restraint: ambient cursor-driven light, fanned archival folders, spring-driven magnetic decks, and milled numeric wells.
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
              {/* 1. Ambient Spotlight Sensor Card */}
              <SpotlightCard variant="tactile" className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between">
                <SpotlightCardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-text-muted" />
                      <span className="text-[10px] font-mono text-text-muted uppercase">Telemetry Node</span>
                    </div>
                    <Badge variant="status" status="success">Active</Badge>
                  </div>
                  <SpotlightCardTitle className="mt-2 text-base">Ambient Optical Surface</SpotlightCardTitle>
                  <SpotlightCardDescription className="text-xs">
                    Light functions as an environmental condition, softly illuminating the surface texture without explicit border tracing.
                  </SpotlightCardDescription>
                </SpotlightCardHeader>
                <SpotlightCardContent className="my-4">
                  <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/50 space-y-2 text-xs">
                    <div className="flex justify-between text-text-muted">
                      <span>Ambient Light Radius</span>
                      <span className="font-mono text-text-primary">420px soft falloff</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Depth Surface</span>
                      <span className="font-mono text-text-primary">Tactile Tier</span>
                    </div>
                  </div>
                </SpotlightCardContent>
                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>SPOTLIGHT CARD</span>
                  <Link href="/components/spotlight-card" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </SpotlightCard>

              {/* 2. Interactive Archival Folder Preview */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Archival Stacks</span>
                    <Badge variant="engraved" className="text-[10px]">Fanned Cards</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Interactive Archival Folder</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Cascading schematic bundles fanning dynamically upon hover and tactile click.
                  </p>
                </div>

                <div className="py-2 flex items-center justify-center">
                  <FolderPreview
                    title="Avionics Schematics"
                    category="ARCHIVAL BUNDLE // 2026"
                    triggerMode="both"
                    files={[
                      { id: '1', title: 'Power Regulation Bus', subtitle: '48V DC bus conversion', badge: 'Spec 01' },
                      { id: '2', title: 'Fiber Backplane Topo', subtitle: '800 Gbps optical link', badge: 'Spec 02' },
                      { id: '3', title: 'Cryo-Manifold Study', subtitle: 'Zero thermal creep test', badge: 'Spec 03' },
                    ]}
                  />
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>FOLDER PREVIEW</span>
                  <Link href="/components/folder-preview" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>

              {/* 3. Dedicated Milled OTP Verification */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Tactile Wells</span>
                    <Badge variant="engraved" className="text-[10px]">6-Digit Auth</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Milled OTP Verification</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Tactile recessed key wells with spring elevation, automatic progression, and cryptographic token verification.
                  </p>
                </div>

                <div className="py-4 flex flex-col items-center justify-center space-y-3">
                  <OtpInput
                    length={6}
                    variant="tactile"
                    value={homeOtp}
                    onChange={setHomeOtp}
                  />
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    {homeOtp.length === 6 ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <Check className="w-3 h-3" />
                        TOKEN VERIFIED // SEC_OK
                      </span>
                    ) : (
                      <span className="text-text-muted bg-secondary/60 px-2.5 py-1 rounded-full border border-border/50">
                        ENTER {6 - homeOtp.length} MORE DIGITS
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>OTP INPUT</span>
                  <Link href="/components/otp-input" className="hover:text-text-primary transition-colors">
                    View Spec →
                  </Link>
                </div>
              </div>

              {/* 4. Dedicated Magnetic Deck Switcher */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Spring Dynamics</span>
                    <Badge variant="outline" className="text-[10px]">Magnetic Physics</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Magnetic Deck Switcher</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Frictionless tab navigation with spring-damped magnetic tension, driving stacked depth layers.
                  </p>
                </div>

                <div className="py-2 space-y-3">
                  <div className="flex justify-center">
                    <MagneticTabs
                      variant="tactile"
                      size="sm"
                      value={homeTab}
                      onValueChange={setHomeTab}
                      tabs={[
                        { id: 'schematics', label: 'Schematics' },
                        { id: 'telemetry', label: 'Telemetry', badge: 'Live' },
                        { id: 'specs', label: 'Specs' }
                      ]}
                    />
                  </div>

                  {/* Active Deck Telemetry Layer */}
                  <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/50 text-xs font-mono space-y-2">
                    {homeTab === 'schematics' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>ACTIVE LAYER</span>
                          <span className="text-text-primary font-medium">REV_04_BUS.CAD</span>
                        </div>
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>GEOMETRY NODES</span>
                          <span className="text-text-primary font-medium">1,420 VECTORS</span>
                        </div>
                      </div>
                    )}
                    {homeTab === 'telemetry' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>INGRESS LATENCY</span>
                          <span className="text-emerald-500 font-medium">0.42 ms</span>
                        </div>
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>SAMPLING JITTER</span>
                          <span className="text-text-primary font-medium">±0.02%</span>
                        </div>
                      </div>
                    )}
                    {homeTab === 'specs' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>THERMAL DISSIPATION</span>
                          <span className="text-text-primary font-medium">14.8 W / m²</span>
                        </div>
                        <div className="flex justify-between text-text-muted text-[11px]">
                          <span>SPRING CONSTANT</span>
                          <span className="text-text-primary font-medium">k = 240 N/m</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>MAGNETIC TABS</span>
                  <Link href="/components/magnetic-tabs" className="hover:text-text-primary transition-colors">
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
