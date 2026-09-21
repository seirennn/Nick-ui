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
import { Knob } from '@/components/ui/knob';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Search, ChevronDown, Check, ArrowRight, Layers, Sliders, Cpu, Copy, Volume2, Sparkles, Terminal, Activity, HardDrive, ShieldCheck, RotateCcw, Radio } from 'lucide-react';
import componentsData from '@/registry/components.json';

export default function HomePage() {
  const [demoInput, setDemoInput] = React.useState('AxiomMed LMS Architecture');
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [demoStatus, setDemoStatus] = React.useState<'success' | 'warning' | 'neutral'>('success');
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  // Precision Hardware Studio Console state
  const [tactileGain, setTactileGain] = React.useState(64);
  const [tactileFreq, setTactileFreq] = React.useState(2400);
  const [tactileSlider, setTactileSlider] = React.useState(45);
  const [tactileDamping, setTactileDamping] = React.useState(true);
  const [waveMode, setWaveMode] = React.useState('harmonic');
  const [studioMode, setStudioMode] = React.useState('analog');
  const [pressedBtn, setPressedBtn] = React.useState<string | null>(null);

  const [homeOtp, setHomeOtp] = React.useState('849201');
  const [homeTab, setHomeTab] = React.useState('schematics');

  const computedRms = Math.min(
    100,
    Math.max(0, Math.round(tactileGain * 0.55 + (tactileFreq / 20000) * 20 + tactileSlider * 0.25))
  );

  const waveformPoints = React.useMemo(() => {
    const points: number[] = [];
    const count = 32;
    const freqFactor = waveMode === 'harmonic' ? (tactileFreq / 2500) + 1 : (tactileFreq / 1200) + 1.5;
    const amp = (tactileGain / 100) * 32 + 6;
    for (let i = 0; i < count; i++) {
      const x = i / (count - 1);
      const angle = x * Math.PI * 2 * freqFactor;
      const base = waveMode === 'harmonic' ? Math.sin(angle) : Math.sin(angle) * Math.cos(angle * 0.4);
      const val = 50 + base * amp * (tactileDamping ? 1 : 0.65);
      points.push(Math.round(Math.max(8, Math.min(92, val))));
    }
    return points;
  }, [tactileGain, tactileFreq, tactileDamping, waveMode]);

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
    setTactileGain(64);
    setTactileFreq(2400);
    setTactileSlider(45);
    setTactileDamping(true);
    setWaveMode('harmonic');
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
              PRECISION HARDWARE & TACTILE STUDIO DECK
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-20 border-b border-border/80 space-y-8 bg-card/25">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Physical Calibration & Ergonomics
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary mt-1">
                  Precision Hardware Console
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
                Milled rotary encoders, spring-damped telemetry dials, recessed tactile wells, and live harmonic oscilloscopes reacting with real physical travel.
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
                      CONSOLE // CALIBRATED
                    </span>
                  </div>
                  <span className="text-text-muted/40 hidden sm:inline">|</span>
                  <div className="text-[11px] font-mono text-text-muted hidden md:inline">
                    SAMPLING: 96 kHz · 24-BIT
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <SegmentedControl
                    value={studioMode}
                    onChange={setStudioMode}
                    size="sm"
                    variant="recessed"
                    options={[
                      { value: 'analog', label: 'Analog Controls' },
                      { value: 'telemetry', label: 'Signal Telemetry' },
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
                {/* Column 1: Dual Milled Rotary Encoders (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Rotary Encoders
                      </span>
                      <Badge variant="outline" className="text-[10px]">270° Arc</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Tactile knobs with calibrated spring physics. Drag vertically or scroll to adjust.
                    </p>
                  </div>

                  <div className="flex items-center justify-around py-3">
                    <Knob
                      label="Master Gain"
                      value={tactileGain}
                      onChange={setTactileGain}
                      min={0}
                      max={100}
                      unit="%"
                      variant="tactile"
                      showTicks={true}
                    />
                    <Knob
                      label="Cutoff Freq"
                      value={tactileFreq}
                      onChange={setTactileFreq}
                      min={200}
                      max={12000}
                      step={100}
                      unit="Hz"
                      variant="tactile"
                      showTicks={true}
                    />
                  </div>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span>Gain: <strong className="text-text-primary font-medium">{tactileGain}%</strong></span>
                    <span>Cutoff: <strong className="text-text-primary font-medium">{tactileFreq} Hz</strong></span>
                  </div>
                </div>

                {/* Column 2: Calibrated Ballistic VU/RMS Telemetry Dial (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Mechanical Telemetry
                      </span>
                      <Badge variant="engraved" className="text-[10px]">Ballistic Meter</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Spring-damped needle dynamics calibrated to studio reference level with instant peak hold.
                    </p>
                  </div>

                  {/* Precision Analog Meter Face */}
                  <div className="py-1 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-[240px] aspect-[240/125] flex flex-col items-center justify-center">
                      <svg viewBox="0 0 240 125" className="w-full h-full overflow-visible">
                        <defs>
                          <radialGradient id="dialFaceGrad" cx="50%" cy="100%" r="95%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
                            <stop offset="80%" stopColor="currentColor" stopOpacity="0.02" />
                            <stop offset="100%" stopColor="transparent" />
                          </radialGradient>
                          <filter id="needleShadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="currentColor" floodOpacity="0.3" />
                          </filter>
                        </defs>

                        {/* Dial Face Arc Background */}
                        <path
                          d="M 28,112 A 96,96 0 0,1 212,112 L 120,112 Z"
                          fill="url(#dialFaceGrad)"
                        />

                        {/* Outer Precision Scale Arc */}
                        <path
                          d="M 32,112 A 92,92 0 0,1 208,112"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeOpacity="0.3"
                        />

                        {/* Dial Scale Ticks */}
                        {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((deg, idx) => {
                          const rad = (deg - 90) * (Math.PI / 180);
                          const x1 = 120 + 92 * Math.cos(rad);
                          const y1 = 112 + 92 * Math.sin(rad);
                          const tickLen = idx % 2 === 0 ? 8 : 4;
                          const x2 = 120 + (92 - tickLen) * Math.cos(rad);
                          const y2 = 112 + (92 - tickLen) * Math.sin(rad);
                          const isHot = deg >= 30;

                          return (
                            <line
                              key={deg}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="currentColor"
                              strokeWidth={idx % 2 === 0 ? "1.5" : "1"}
                              strokeOpacity={isHot ? "0.85" : "0.45"}
                              className={isHot ? "text-amber-500 dark:text-amber-400" : "text-foreground"}
                            />
                          );
                        })}

                        {/* Dial Scale Labels */}
                        <text x="34" y="107" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground/75 select-none">-20</text>
                        <text x="64" y="58" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground/75 select-none">-10</text>
                        <text x="120" y="34" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground/90 font-medium select-none">0 dB</text>
                        <text x="176" y="58" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground/75 select-none">+3</text>
                        <text x="206" y="107" textAnchor="middle" className="text-[8px] font-mono fill-amber-500 font-medium select-none">+6</text>

                        {/* Smooth Ballistic Needle */}
                        <g
                          style={{
                            transformOrigin: '120px 112px',
                            transform: `rotate(${-60 + (computedRms / 100) * 120}deg)`,
                            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        >
                          <polygon
                            points="118.5,112 120,26 121.5,112"
                            fill="currentColor"
                            className="text-foreground"
                            filter="url(#needleShadow)"
                          />
                          <line
                            x1="120"
                            y1="26"
                            x2="120"
                            y2="44"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-amber-500"
                            strokeLinecap="round"
                          />
                        </g>

                        {/* Milled Brass/Steel Pivot Hub */}
                        <circle cx="120" cy="112" r="9" fill="currentColor" className="text-card" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
                        <circle cx="120" cy="112" r="5" fill="currentColor" className="text-foreground/80" />
                        <circle cx="120" cy="112" r="2" fill="currentColor" className="text-background" />
                      </svg>
                    </div>

                    {/* Digital Telemetry Readout */}
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-xl font-mono font-medium text-text-primary tracking-tight">
                        {computedRms}
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">% RMS</span>
                      <span className="text-[10px] font-mono ml-2 px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 text-text-muted">
                        {computedRms > 85 ? 'PEAK' : computedRms > 50 ? 'NOMINAL' : 'LOW'}
                      </span>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[10px] font-mono text-center">
                    <div className="p-1.5 rounded-lg bg-secondary/60 border border-border/50">
                      <span className="text-text-muted block">BALLISTIC RMS</span>
                      <span className="text-text-primary font-medium text-xs">{computedRms}%</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-secondary/60 border border-border/50">
                      <span className="text-text-muted block">PEAK HEADROOM</span>
                      <span className="text-text-primary font-medium text-xs">{(100 - computedRms).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Linear Well, Switch & Tactile Buttons (4 cols) */}
                <div className="md:col-span-4 p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                        Linear Sink & Buttons
                      </span>
                      <Badge variant="engraved" className="text-[10px]">Tactile Tier</Badge>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Physical highlights and recessed sink wells reacting to tactile actuation.
                    </p>
                  </div>

                  {/* Linear Slider Well */}
                  <div className="space-y-2 p-3 rounded-xl bg-card/60 border border-border/60">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Attenuator</span>
                      </div>
                      <span className="text-text-primary font-medium">{tactileSlider}%</span>
                    </div>
                    <Slider value={tactileSlider} min={0} max={100} onChange={setTactileSlider} />
                  </div>

                  {/* Spring Damping Switch */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-card/60 border border-border/60">
                    <div className="space-y-0.5">
                      <div className="text-xs font-medium text-text-primary">Quintic Damping</div>
                      <div className="text-[10px] text-text-muted">Smooth spring deceleration</div>
                    </div>
                    <Switch checked={tactileDamping} onCheckedChange={setTactileDamping} size="sm" />
                  </div>

                  {/* Tactile Button Actions Hierarchy */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="tactile"
                      size="sm"
                      onClick={() => setPressedBtn('raised')}
                      className={pressedBtn === 'raised' ? 'ring-1 ring-primary/40' : ''}
                    >
                      Raised Rim
                    </Button>
                    <Button
                      variant="recessed"
                      size="sm"
                      onClick={() => setPressedBtn('recessed')}
                      className={pressedBtn === 'recessed' ? 'ring-1 ring-primary/40' : ''}
                    >
                      Recessed Sink
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Deck: Live Harmonic Oscilloscope / Telemetry Waveform */}
              <div className="p-4 sm:p-5 rounded-2xl bg-secondary/35 border border-border/70 tactile-well space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-text-muted animate-pulse" />
                    <span className="font-mono font-medium text-text-primary">
                      LIVE HARMONIC OSCILLOSCOPE
                    </span>
                    <span className="text-[10px] font-mono text-text-muted hidden md:inline">
                      // BUFFER: 512 SAMPLES · LATENCY: 0.8ms
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-muted">Waveform:</span>
                    <SegmentedControl
                      value={waveMode}
                      onChange={setWaveMode}
                      size="sm"
                      variant="tactile"
                      options={[
                        { value: 'harmonic', label: 'Harmonic' },
                        { value: 'transient', label: 'Transient' },
                      ]}
                    />
                  </div>
                </div>

                {/* Oscilloscope Screen with Ambient Phosphor Bezier Curve */}
                <div className="relative h-24 w-full rounded-xl bg-background/90 border border-border/70 overflow-hidden shadow-inner-tactile flex items-center justify-center">
                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '30px 20px',
                    }}
                  />

                  {/* Oscilloscope Bezier Waveform */}
                  <svg
                    viewBox="0 0 600 80"
                    preserveAspectRatio="none"
                    className="w-full h-full relative z-10"
                  >
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
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
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground/80 transition-all duration-300"
                    />
                  </svg>
                </div>

                {/* Oscilloscope Footer Stats */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-text-muted pt-1">
                  <span>FREQUENCY: {tactileFreq} Hz</span>
                  <span>AMPLITUDE: {tactileGain}%</span>
                  <span>DAMPING: {tactileDamping ? 'QUINTIC (ACTIVE)' : 'OFF'}</span>
                  <span>PEAK HEADROOM: {(100 - computedRms).toFixed(0)}%</span>
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
