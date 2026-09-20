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
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Search, ChevronDown, Check, ArrowRight, Layers, Sliders, Cpu, Copy, Volume2, Sparkles, Terminal, Activity, HardDrive, ShieldCheck } from 'lucide-react';
import componentsData from '@/registry/components.json';

export default function HomePage() {
  const [demoInput, setDemoInput] = React.useState('AxiomMed LMS Architecture');
  const [demoLoading, setDemoLoading] = React.useState(false);
  const [demoStatus, setDemoStatus] = React.useState<'success' | 'warning' | 'neutral'>('success');
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  // Tactile playground state
  const [tactileSwitch, setTactileSwitch] = React.useState(true);
  const [tactileGain, setTactileGain] = React.useState(68);
  const [homeOtp, setHomeOtp] = React.useState('849201');
  const [homeTab, setHomeTab] = React.useState('schematics');

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('pnpm add framer-motion lucide-react');
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
                    Explore All 31 Components
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
              MODERN TACTILE SKEUOMORPHISM DECK
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-16 border-b border-border/80 space-y-8 bg-card/25">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted block font-medium">
                  Physical Depth & Tactile Surface
                </span>
                <h2 className="text-component-title text-text-primary mt-1">
                  Tactile Skeuomorphism Studio
                </h2>
              </div>
              <p className="text-metadata text-text-muted max-w-xs">
                Physical highlights, recessed wells, mechanical keycaps, and tangible knobs reacting with real physical travel.
              </p>
            </div>

            {/* Tactile Workbench Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 space-y-8 tactile-surface">
              {/* Segmented Control + Mechanical Hotkeys Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
                <Tabs defaultValue="dsp">
                  <TabsList>
                    <TabsTrigger value="dsp">DSP Visualizer</TabsTrigger>
                    <TabsTrigger value="mesh">Cluster Mesh</TabsTrigger>
                    <TabsTrigger value="bayesian">BKT Weights</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-muted hidden md:inline">Hotkeys:</span>
                  <div className="flex items-center gap-1">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </div>
                  <div className="flex items-center gap-1">
                    <Kbd variant="elevated">ESC</Kbd>
                  </div>
                </div>
              </div>

              {/* Real-time Hardware Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                {/* Switch Control */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 tactile-well space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-ui font-medium text-text-primary">Atmosphere Layer</span>
                    <Switch checked={tactileSwitch} onCheckedChange={setTactileSwitch} size="md" />
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Toggles 28s ambient breath gradient.
                  </p>
                </div>

                {/* Slider Control */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 tactile-well space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Gain Level</span>
                    </div>
                    <span className="text-text-primary font-medium">{tactileGain}%</span>
                  </div>
                  <Slider value={tactileGain} min={0} max={100} onChange={setTactileGain} />
                </div>

                {/* Live Radial Gauge */}
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/60 tactile-well flex flex-col items-center justify-center">
                  <Gauge
                    value={tactileGain}
                    label="VU METER"
                    unit="%"
                    size={105}
                    variant="accent"
                    className="border-0 bg-transparent p-0 shadow-none"
                  />
                </div>

                {/* Tactile Button Actions */}
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 tactile-well flex flex-col justify-center gap-2">
                  <Button variant="tactile" size="sm" className="w-full">
                    Raised Surface
                  </Button>
                  <Button variant="recessed" size="sm" className="w-full">
                    Recessed Sink
                  </Button>
                </div>
              </div>

              {/* Composite Tactile Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Card variant="tactile">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="engraved">C++20</Badge>
                      <span className="text-metadata text-text-muted font-mono">1.2ms</span>
                    </div>
                    <CardTitle>{demoInput || 'Neural Audio Synthesis'}</CardTitle>
                    <CardDescription>
                      Stereo harmonic spectrum analyzer with real-time FFT processing and libmpv engine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="mono">FTXUI</Badge>
                      <Badge variant="mono">SQLite</Badge>
                      <Badge variant="tactile">Verified</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-sidebar-category uppercase tracking-wider text-text-muted">Terminal TUI</span>
                    <Button variant="tactile" size="sm">Run Client</Button>
                  </CardFooter>
                </Card>

                <Card variant="recessed">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="status" status="success">Operational</Badge>
                      <span className="text-metadata text-text-muted font-mono">Node #01</span>
                    </div>
                    <CardTitle>Medical Logic Verification</CardTitle>
                    <CardDescription>
                      Lean 4 and Prolog proof synthesis engine with Gemini multi-model failover.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1.5 text-xs text-text-secondary">
                      <div className="flex justify-between">
                        <span>Proof Verification Rate</span>
                        <span className="font-mono">99.98%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[99.98%]" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-sidebar-category uppercase tracking-wider text-text-muted">NATS JetStream</span>
                    <Button variant="secondary" size="sm">View Proofs</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
 
          {/* ═══════════════════════════════════════════
              ARCHITECTURAL MICRO-INTERACTIONS SHOWCASE
          ═══════════════════════════════════════════ */}
          <section className="px-6 md:px-12 py-16 border-b border-border/80 space-y-10">
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
                  Explore All 27 Components
                </Button>
              </Link>
            </div>

            {/* Grid of 3 High-Fidelity Showcases */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Ambient Spotlight Sensor Card */}
              <SpotlightCard variant="tactile" className="flex flex-col justify-between">
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
                <SpotlightCardContent className="my-3">
                  <div className="p-3 rounded-lg bg-secondary/40 border border-border/50 space-y-1.5 text-xs">
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
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border border-border/80 shadow-tactile">
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

              {/* 3. Tactile Verification & Magnetic Deck */}
              <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-tactile flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Tactile Wells</span>
                    <Badge variant="engraved">Skeuomorphic</Badge>
                  </div>
                  <h4 className="text-base font-medium text-text-primary">Milled OTP Verification</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Tactile milled key wells with spring elevation and auto-advance focus.
                  </p>
                  <div className="pt-2 flex justify-center">
                    <OtpInput
                      length={6}
                      variant="tactile"
                      value={homeOtp}
                      onChange={setHomeOtp}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Magnetic Deck Switcher</span>
                    <span className="font-mono text-[10px]">SPRING PHYSICS</span>
                  </div>
                  <MagneticTabs
                    variant="recessed"
                    size="sm"
                    value={homeTab}
                    onValueChange={setHomeTab}
                    tabs={[
                      { id: 'schematics', label: 'Schematics' },
                      { id: 'telemetry', label: 'Telemetry', badge: '12' },
                      { id: 'specs', label: 'Specs' }
                    ]}
                  />
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
                Explore all 6 blocks & landing layouts
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
