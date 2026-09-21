'use client';

import * as React from 'react';
import { Button, ButtonVariant, ButtonSize, ButtonDepth } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge, BadgeStatus } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardDepth } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownLabel } from '@/components/ui/dropdown';
import { CommandPalette, CommandItem } from '@/components/ui/command-palette';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Kbd } from '@/components/ui/kbd';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { Gauge } from '@/components/ui/gauge';
import { Sparkline, AreaChart, BarChart, DotMatrixChart, TactileTrendCard, TactileMetricCard, TactileBarCard } from '@/components/ui/charts';
import { RailSidebar } from '@/components/ui/rail-sidebar';
import { StudioSidebar } from '@/components/ui/studio-sidebar';
import { OtpInput, OtpInputVariant } from '@/components/ui/otp-input';
import { SpotlightCard, SpotlightCardHeader, SpotlightCardTitle, SpotlightCardDescription, SpotlightCardContent } from '@/components/ui/spotlight-card';
import { FolderPreview } from '@/components/ui/folder-preview';
import { MagneticTabs } from '@/components/ui/magnetic-tabs';
import { StackDeck } from '@/components/ui/stack-deck';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Knob } from '@/components/ui/knob';
import { Search, Settings, Copy, Sun, Trash, Download, Sparkles, ChevronDown, Terminal, Check, Volume2, Cpu, HardDrive, ShieldCheck, Activity, Radio as RadioIcon, Layers } from 'lucide-react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';

export function ComponentInteractiveHarness({ slug }: { slug: string }) {
  // Button state
  const [btnVariant, setBtnVariant] = React.useState<ButtonVariant>('tactile');
  const [btnSize, setBtnSize] = React.useState<ButtonSize>('md');
  const [btnDepth, setBtnDepth] = React.useState<ButtonDepth>('medium');
  const [btnLoading, setBtnLoading] = React.useState(false);

  // Badge state
  const [badgeStatus, setBadgeStatus] = React.useState<BadgeStatus>('success');

  // Switch & Slider state
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState(42);

  // Input state
  const [inputValue, setInputValue] = React.useState('AxiomMed Platform');

  // Palette state
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [paletteSelected, setPaletteSelected] = React.useState('None');

  // Icon button state
  const [iconActive, setIconActive] = React.useState(false);

  // Navbar demo state
  const [activeNavTab, setActiveNavTab] = React.useState('overview');

  // Checkbox & Radio state
  const [chk1, setChk1] = React.useState(true);
  const [chk2, setChk2] = React.useState(false);
  const [chkIndet, setChkIndet] = React.useState(true);
  const [radioVal, setRadioVal] = React.useState('cluster-1');

  // Gauge state
  const [gaugeVal, setGaugeVal] = React.useState(68);

  // Card state
  const [cardVariant, setCardVariant] = React.useState<'default' | 'tactile' | 'recessed'>('tactile');
  const [cardDepth, setCardDepth] = React.useState<CardDepth>('medium');

  // New components state
  const [otpVal, setOtpVal] = React.useState('7492');
  const [otpVariant, setOtpVariant] = React.useState<OtpInputVariant>('tactile');
  const [otpMask, setOtpMask] = React.useState(false);

  const [spotlightVariant, setSpotlightVariant] = React.useState<'default' | 'tactile' | 'recessed'>('tactile');

  const [magneticTab, setMagneticTab] = React.useState('clusters');
  const [magneticVariant, setMagneticVariant] = React.useState<'default' | 'tactile' | 'recessed'>('tactile');

  const [folderExpanded, setFolderExpanded] = React.useState(false);
  const [stackIdx, setStackIdx] = React.useState(0);

  // Segmented control state
  const [segmentedVal, setSegmentedVal] = React.useState('clusters');
  const [segmentedVariant, setSegmentedVariant] = React.useState<'tactile' | 'recessed' | 'default'>('tactile');
  const [segmentedSize, setSegmentedSize] = React.useState<'sm' | 'md' | 'lg'>('md');

  // Knob state
  const [knobGain, setKnobGain] = React.useState(68);
  const [knobThreshold, setKnobThreshold] = React.useState(34);
  const [knobDamping, setKnobDamping] = React.useState(82);
  const [knobVariant, setKnobVariant] = React.useState<'tactile' | 'recessed' | 'default'>('tactile');
  const [knobTicks, setKnobTicks] = React.useState(true);

  switch (slug) {
    case 'button':
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-text-muted font-medium">Variant:</span>
              {(['tactile', 'recessed', 'default', 'secondary', 'outline', 'ghost'] as ButtonVariant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setBtnVariant(v)}
                  className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                    btnVariant === v
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {(btnVariant === 'tactile' || btnVariant === 'recessed') && (
              <div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
                <span className="text-text-muted font-medium">Depth Intensity:</span>
                {(['subtle', 'medium', 'deep'] as ButtonDepth[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setBtnDepth(d)}
                    className={`px-2 py-0.5 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                      btnDepth === d
                        ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
              <span className="text-text-muted font-medium">Size:</span>
              {(['sm', 'md', 'lg'] as ButtonSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setBtnSize(s)}
                  className={`px-2 py-0.5 rounded-md text-xs uppercase transition-colors cursor-pointer ${
                    btnSize === s
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer ml-auto select-none">
              <input
                type="checkbox"
                checked={btnLoading}
                onChange={(e) => setBtnLoading(e.target.checked)}
                className="rounded border-border cursor-pointer accent-primary"
              />
              <span className="text-text-secondary text-xs">Loading State</span>
            </label>
          </div>

          <ComponentPreview
            code={`<div className="flex items-center gap-3">\n  <Button variant="${btnVariant}"${(btnVariant === 'tactile' || btnVariant === 'recessed') ? ` depth="${btnDepth}"` : ''} size="${btnSize}"${btnLoading ? ' isLoading' : ''}>\n    Deploy Changes\n  </Button>\n  <Button variant="secondary" size="${btnSize}">\n    Cancel\n  </Button>\n</div>`}
          >
            <div className="flex items-center gap-4 flex-wrap justify-center p-4">
              <Button variant={btnVariant} depth={btnDepth} size={btnSize} isLoading={btnLoading}>
                Deploy Changes
              </Button>
              <Button variant={btnVariant} depth={btnDepth} size={btnSize} leftIcon={<Download className="w-3.5 h-3.5" />}>
                Export Schema
              </Button>
              <Button variant="secondary" size={btnSize}>
                Cancel
              </Button>
            </div>
          </ComponentPreview>

          {/* 3-Tier Depth Comparison */}
          <div className="p-4 rounded-xl border border-border/80 bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-xs font-medium text-text-primary">3-Tier Depth Intensity Matrix</span>
              </div>
              <span className="text-[11px] text-text-muted font-mono">
                {btnVariant === 'recessed' ? 'Recessed Wells' : 'Tactile Raised Keycaps'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Subtle */}
              <div className="p-3 rounded-lg border border-border/60 bg-secondary/20 space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Subtle (Level 1)</span>
                  <span className="font-mono text-[10px]">1px depth</span>
                </div>
                <div className="py-2 flex justify-center">
                  <Button variant={btnVariant === 'recessed' ? 'recessed' : 'tactile'} depth="subtle" size="sm">
                    Subtle Action
                  </Button>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  Hairline specular edge, gentle travel, quiet presence.
                </p>
              </div>

              {/* Medium */}
              <div className="p-3 rounded-lg border border-border/80 bg-secondary/30 space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Medium (Level 2)</span>
                  <span className="font-mono text-[10px]">2-3px depth</span>
                </div>
                <div className="py-2 flex justify-center">
                  <Button variant={btnVariant === 'recessed' ? 'recessed' : 'tactile'} depth="medium" size="sm">
                    Medium Action
                  </Button>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  Calibrated tactile ambient drop shadow and balanced well.
                </p>
              </div>

              {/* Deep */}
              <div className="p-3 rounded-lg border border-border bg-secondary/40 space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Deep (Level 3)</span>
                  <span className="font-mono text-[10px]">4-6px depth</span>
                </div>
                <div className="py-2 flex justify-center">
                  <Button variant={btnVariant === 'recessed' ? 'recessed' : 'tactile'} depth="deep" size="sm">
                    Deep Action
                  </Button>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  Pronounced mechanical milled bevel with deliberate keycap travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'icon-button':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/60 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={iconActive}
                onChange={(e) => setIconActive(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-text-secondary">Toggle Active State</span>
            </label>
          </div>

          <ComponentPreview
            code={`<IconButton\n  icon={<Search className="w-4 h-4" />}\n  aria-label="Search records"\n  variant="ghost"\n/>`}
          >
            <div className="flex items-center gap-3">
              <IconButton icon={<Search className="w-4 h-4" />} aria-label="Search" variant="ghost" isActive={iconActive} />
              <IconButton icon={<Sun className="w-4 h-4" />} aria-label="Theme" variant="secondary" />
              <IconButton icon={<Copy className="w-4 h-4" />} aria-label="Copy" variant="outline" />
              <IconButton icon={<Settings className="w-4 h-4" />} aria-label="Settings" variant="default" shape="circle" />
            </div>
          </ComponentPreview>
        </div>
      );

    case 'input':
      return (
        <ComponentPreview
          code={`<Input\n  leftIcon={<Search className="w-4 h-4 text-text-muted" />}\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  placeholder="Filter system architectures..."\n/>`}
        >
          <div className="max-w-sm w-full">
            <Input
              leftIcon={<Search className="w-4 h-4 text-text-muted" />}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search components..."
            />
          </div>
        </ComponentPreview>
      );

    case 'textarea':
      return (
        <ComponentPreview
          code={`<Textarea\n  rows={3}\n  placeholder="Enter system architecture notes..."\n/>`}
        >
          <div className="max-w-md w-full">
            <Textarea rows={3} placeholder="Enter architectural notes, constraints, and system specifications..." />
          </div>
        </ComponentPreview>
      );

    case 'badge':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/60 text-xs">
            <span className="text-text-muted">Status:</span>
            {(['neutral', 'success', 'warning', 'error'] as BadgeStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => setBadgeStatus(st)}
                className={`px-2 py-0.5 rounded capitalize ${badgeStatus === st ? 'bg-primary text-primary-foreground font-medium' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {st}
              </button>
            ))}
          </div>

          <ComponentPreview
            code={`<Badge variant="status" status="${badgeStatus}">Production Ready</Badge>\n<Badge variant="mono">v2.4.0</Badge>\n<Badge variant="outline">Verified</Badge>\n<Badge variant="default">C++20</Badge>`}
          >
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Badge variant="status" status={badgeStatus}>Production Ready</Badge>
              <Badge variant="mono">v2.4.0</Badge>
              <Badge variant="outline">Verified</Badge>
              <Badge variant="default">C++20</Badge>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'separator':
      return (
        <ComponentPreview
          code={`<div className="space-y-4">\n  <div>Top Content Row</div>\n  <Separator />\n  <div className="flex items-center h-6 gap-3">\n    <span>Section A</span>\n    <Separator orientation="vertical" />\n    <span>Section B</span>\n  </div>\n</div>`}
        >
          <div className="max-w-xs w-full space-y-4 text-xs font-mono text-text-secondary text-center">
            <div>Overview Section</div>
            <Separator />
            <div className="flex items-center justify-center h-5 gap-3">
              <span>Latency 1.2ms</span>
              <Separator orientation="vertical" />
              <span>Throughput 99.8%</span>
            </div>
          </div>
        </ComponentPreview>
      );

    case 'card':
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-text-muted font-medium">Card Depth Variant:</span>
              {(['tactile', 'recessed', 'default'] as ('default' | 'tactile' | 'recessed')[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setCardVariant(v)}
                  className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                    cardVariant === v
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {(cardVariant === 'tactile' || cardVariant === 'recessed') && (
              <div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
                <span className="text-text-muted font-medium">Depth Intensity:</span>
                {(['subtle', 'medium', 'deep'] as CardDepth[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setCardDepth(d)}
                    className={`px-2 py-0.5 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                      cardDepth === d
                        ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ComponentPreview
            code={`<Card variant="${cardVariant}"${(cardVariant === 'tactile' || cardVariant === 'recessed') ? ` depth="${cardDepth}"` : ''}>\n  <CardHeader>\n    <div className="flex items-center justify-between">\n      <Badge variant="status" status="success">Operational</Badge>\n      <span className="text-metadata text-text-muted">Edge Node</span>\n    </div>\n    <CardTitle>Autonomous Ingress Controller</CardTitle>\n    <CardDescription>\n      Deterministic routing layer with automated cluster failover.\n    </CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-xs text-text-secondary">All endpoints healthy across 4 regional clusters.</p>\n  </CardContent>\n  <CardFooter className="justify-between">\n    <span className="text-metadata text-text-muted">v2.4.0</span>\n    <Button size="sm" variant="${cardVariant === 'tactile' ? 'tactile' : cardVariant === 'recessed' ? 'recessed' : 'default'}">Inspect Node</Button>\n  </CardFooter>\n</Card>`}
          >
            <div className="max-w-md w-full p-2">
              <Card variant={cardVariant} depth={cardDepth}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="status" status="success">Operational</Badge>
                    <span className="text-metadata text-text-muted">Edge Node</span>
                  </div>
                  <CardTitle>Autonomous Ingress Controller</CardTitle>
                  <CardDescription>
                    Deterministic routing layer with automated cluster failover and mTLS encryption.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-secondary">
                    All endpoints healthy across 4 regional clusters with 0 dropped frames.
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-metadata text-text-muted">v2.4.0</span>
                  <Button size="sm" variant={cardVariant === 'tactile' ? 'tactile' : cardVariant === 'recessed' ? 'recessed' : 'default'}>
                    Inspect Node
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>

          {/* 3-Tier Depth Comparison Matrix for Card */}
          <div className="p-4 rounded-xl border border-border/80 bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-xs font-medium text-text-primary">3-Tier Depth Intensity Matrix</span>
              </div>
              <span className="text-[11px] text-text-muted font-mono">
                {cardVariant === 'recessed' ? 'Recessed Chassis Wells' : 'Tactile Raised Surfaces'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {/* Subtle */}
              <Card variant={cardVariant === 'recessed' ? 'recessed' : 'tactile'} depth="subtle" className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Subtle (Level 1)</span>
                  <Badge variant="mono">1px depth</Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Hairline specular perimeter with low-contrast ambient boundary.
                </p>
              </Card>

              {/* Medium */}
              <Card variant={cardVariant === 'recessed' ? 'recessed' : 'tactile'} depth="medium" className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Medium (Level 2)</span>
                  <Badge variant="mono">2-3px depth</Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Calibrated tactile ambient drop shadow and balanced well depth.
                </p>
              </Card>

              {/* Deep */}
              <Card variant={cardVariant === 'recessed' ? 'recessed' : 'tactile'} depth="deep" className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                  <span className="font-medium text-text-primary">Deep (Level 3)</span>
                  <Badge variant="mono">4-6px depth</Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Milled enclosure shadow, high-mass physical weight and depth.
                </p>
              </Card>
            </div>
          </div>
        </div>
      );

    case 'navbar':
      return (
        <ComponentPreview
          code={`<nav className="border border-sidebar-border bg-sidebar/90 backdrop-blur-xl rounded-xl p-1.5 flex items-center gap-2">\n  <button className="px-3 py-1.5 rounded-lg text-ui text-text-primary bg-sidebar-accent font-medium">Overview</button>\n  <button className="px-3 py-1.5 rounded-lg text-ui text-text-muted hover:text-text-primary">Docs</button>\n</nav>`}
        >
          <div className="p-2 rounded-xl bg-sidebar/90 border border-sidebar-border shadow-sm flex items-center gap-1.5">
            {['overview', 'systems', 'analytics'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveNavTab(t)}
                className={`px-3 py-1 rounded-lg text-ui capitalize transition-colors cursor-pointer ${activeNavTab === t ? 'bg-sidebar-accent text-text-primary font-medium' : 'text-text-muted hover:text-text-primary'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </ComponentPreview>
      );

    case 'sidebar':
      return (
        <ComponentPreview
          code={`<Sidebar\n  groups={[\n    {\n      title: "Architecture",\n      items: [\n        { id: "1", label: "System Primitives", href: "#", icon: Cpu },\n        { id: "2", label: "Network Transport", href: "#", icon: RadioIcon },\n        { id: "3", label: "Bayesian BKT Model", href: "#", icon: Activity, badge: "v2" }\n      ]\n    }\n  ]}\n/>`}
        >
          <div className="w-64 p-3 rounded-xl border border-border/80 bg-card/60 space-y-3">
            <div className="text-[10px] font-mono font-medium uppercase tracking-wider text-text-muted/80 px-2.5">
              Architecture
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs bg-secondary text-text-primary font-medium border border-border/70 shadow-2xs">
                <Cpu className="w-3.5 h-3.5 text-text-primary shrink-0" />
                <span>System Primitives</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-secondary/40 transition-colors">
                <RadioIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                <span>Network Transport</span>
              </div>
              <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-secondary/40 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <Activity className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span className="truncate">Bayesian BKT Model</span>
                </div>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-secondary/80 text-text-muted border border-border/50">
                  v2
                </span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      );

    case 'tooltip':
      return (
        <ComponentPreview
          code={`<Tooltip content="Launch cluster synchronizer">\n  <Button variant="secondary">Hover Me</Button>\n</Tooltip>`}
        >
          <div className="flex items-center gap-4">
            <Tooltip content="Sync changes with primary cluster">
              <Button variant="secondary">Hover for Tooltip</Button>
            </Tooltip>
            <Tooltip content="Search registry (⌘K)" side="bottom">
              <IconButton icon={<Search className="w-4 h-4" />} aria-label="Search" variant="outline" />
            </Tooltip>
          </div>
        </ComponentPreview>
      );

    case 'dropdown':
      return (
        <ComponentPreview
          code={`<Dropdown>\n  <DropdownTrigger>\n    <Button variant="secondary" rightIcon={<ChevronDown className="w-3.5 h-3.5" />}>\n      Actions Menu\n    </Button>\n  </DropdownTrigger>\n  <DropdownContent align="center" className="w-56">\n    <DropdownLabel>Workspace Operations</DropdownLabel>\n    <DropdownItem icon={<Copy className="w-3.5 h-3.5" />} shortcut="⌘C">Copy Resource URI</DropdownItem>\n    <DropdownItem icon={<Sparkles className="w-3.5 h-3.5" />}>Run Diagnostic</DropdownItem>\n    <DropdownSeparator />\n    <DropdownItem destructive icon={<Trash className="w-3.5 h-3.5" />}>Terminate Instance</DropdownItem>\n  </DropdownContent>\n</Dropdown>`}
        >
          <div className="py-8 flex items-center justify-center">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="secondary" rightIcon={<ChevronDown className="w-3.5 h-3.5" />}>
                  Actions Menu
                </Button>
              </DropdownTrigger>
              <DropdownContent align="center" className="w-56">
                <DropdownLabel>Workspace Operations</DropdownLabel>
                <DropdownItem icon={<Copy className="w-3.5 h-3.5" />} shortcut="⌘C">Copy Resource URI</DropdownItem>
                <DropdownItem icon={<Sparkles className="w-3.5 h-3.5" />}>Run Diagnostic</DropdownItem>
                <DropdownSeparator />
                <DropdownItem destructive icon={<Trash className="w-3.5 h-3.5" />}>Terminate Instance</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </ComponentPreview>
      );

    case 'command-palette':
      const sampleItems: CommandItem[] = [
        { id: '1', title: 'Start Project Workspace', category: 'General', shortcut: '⌘N', icon: <Sparkles className="w-4 h-4" />, onSelect: () => setPaletteSelected('Start Project Workspace') },
        { id: '2', title: 'Deploy Cluster Worker', category: 'Operations', shortcut: '⌘D', icon: <Terminal className="w-4 h-4" />, onSelect: () => setPaletteSelected('Deploy Cluster Worker') },
        { id: '3', title: 'Export Machine Metadata', category: 'Operations', shortcut: '⌘E', icon: <Download className="w-4 h-4" />, onSelect: () => setPaletteSelected('Export Machine Metadata') },
      ];

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/60 text-xs">
            <span className="text-text-muted">Last selected command: <strong className="text-text-primary font-mono">{paletteSelected}</strong></span>
            <span className="font-mono text-[10px] text-text-muted">Press ⌘K or click below</span>
          </div>

          <ComponentPreview
            code={`<CommandPalette\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  items={commandItems}\n/>`}
          >
            <Button variant="default" onClick={() => setPaletteOpen(true)} leftIcon={<Search className="w-3.5 h-3.5" />}>
              Open Command Palette (⌘K)
            </Button>
          </ComponentPreview>

          <CommandPalette
            isOpen={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            items={sampleItems}
          />
        </div>
      );

    case 'switch':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/60 text-xs">
            <span className="text-text-muted">Mechanical state: <strong className="text-text-primary font-mono">{switchChecked ? 'ENABLED' : 'DISABLED'}</strong></span>
            <span className="font-mono text-[10px] text-text-muted">Spring travel physics</span>
          </div>

          <ComponentPreview
            code={`<Switch\n  checked={${switchChecked}}\n  onCheckedChange={setSwitchChecked}\n  size="md"\n/>`}
          >
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-3">
                <span className="text-ui text-text-secondary">Tactile Sync</span>
                <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} size="md" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-ui text-text-secondary">Small</span>
                <Switch defaultChecked size="sm" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-ui text-text-secondary">Large</span>
                <Switch defaultChecked size="lg" />
              </div>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'slider':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/60 text-xs">
            <span className="text-text-muted">Parameter value: <strong className="text-text-primary font-mono">{sliderVal}%</strong></span>
            <span className="font-mono text-[10px] text-text-muted">Recessed well rail</span>
          </div>

          <ComponentPreview
            code={`<Slider\n  value={${sliderVal}}\n  min={0}\n  max={100}\n  onChange={setSliderVal}\n/>`}
          >
            <div className="max-w-xs w-full space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ambient Audio Level</span>
                </div>
                <span>{sliderVal}%</span>
              </div>
              <Slider value={sliderVal} min={0} max={100} onChange={setSliderVal} />
            </div>
          </ComponentPreview>
        </div>
      );

    case 'kbd':
      return (
        <ComponentPreview
          code={`<div className="flex items-center gap-2">\n  <Kbd>⌘</Kbd>\n  <Kbd>Shift</Kbd>\n  <Kbd>P</Kbd>\n</div>`}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
            <div className="flex items-center gap-1.5">
              <Kbd>Ctrl</Kbd>
              <Kbd>Alt</Kbd>
              <Kbd>Del</Kbd>
            </div>
            <div className="flex items-center gap-1.5">
              <Kbd variant="elevated">ESC</Kbd>
              <Kbd variant="recessed">TAB</Kbd>
            </div>
          </div>
        </ComponentPreview>
      );

    case 'tabs':
      return (
        <ComponentPreview
          code={`<Tabs defaultValue="architecture">\n  <TabsList>\n    <TabsTrigger value="architecture">Architecture</TabsTrigger>\n    <TabsTrigger value="network">Network</TabsTrigger>\n    <TabsTrigger value="models">Models</TabsTrigger>\n  </TabsList>\n  <TabsContent value="architecture">Architectural State Machine</TabsContent>\n  <TabsContent value="network">JetStream NATS Cluster</TabsContent>\n  <TabsContent value="models">Multi-model Failover Chain</TabsContent>\n</Tabs>`}
        >
          <div className="max-w-md w-full space-y-4">
            <Tabs defaultValue="architecture">
              <TabsList>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="models">Models</TabsTrigger>
              </TabsList>
              <div className="p-4 rounded-xl bg-card border border-border/70 tactile-surface text-ui text-text-secondary">
                <TabsContent value="architecture">
                  Unified architectural pipeline combining formal logic verification and Lean 4 proofs.
                </TabsContent>
                <TabsContent value="network">
                  Zero-latency distributed messaging via NATS JetStream and Redis cache clusters.
                </TabsContent>
                <TabsContent value="models">
                  Multi-cluster failover chains orchestrating edge computing and distributed local pipelines.
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ComponentPreview>
      );

    case 'checkbox':
      return (
        <ComponentPreview
          code={`<Checkbox\n  label="Enforce TLS 1.3 Strict"\n  description="Drops unencrypted packets at the edge firewall"\n  checked={checked}\n  onCheckedChange={setChecked}\n/>`}
        >
          <div className="flex flex-col gap-4 max-w-sm">
            <Checkbox
              label="Enforce TLS 1.3 Strict"
              description="Drops unencrypted packets at the edge firewall"
              checked={chk1}
              onCheckedChange={setChk1}
            />
            <Checkbox
              label="Autonomous Replica Balancing"
              description="Spin up standby nodes on latency spikes"
              checked={chk2}
              onCheckedChange={setChk2}
            />
            <Checkbox
              label="Intermediate Sync Pipeline"
              description="State is mixed across regional clusters"
              indeterminate={chkIndet}
              onCheckedChange={() => setChkIndet(!chkIndet)}
            />
            <Checkbox
              label="Locked Infrastructure Rule"
              description="Provisioned by root orchestrator"
              disabled
              checked={true}
            />
          </div>
        </ComponentPreview>
      );

    case 'radio':
      return (
        <ComponentPreview
          code={`<RadioGroup value={value} onValueChange={setValue}>\n  <RadioGroupItem value="iad-1" label="US-East (Virginia)" description="12ms round-trip latency" />\n  <RadioGroupItem value="fra-1" label="EU-Central (Frankfurt)" description="78ms round-trip latency" />\n</RadioGroup>`}
        >
          <div className="max-w-sm w-full">
            <RadioGroup value={radioVal} onValueChange={setRadioVal}>
              <RadioGroupItem
                value="cluster-1"
                label="US-East (Virginia Primary)"
                description="Ultra-low latency edge ingress (12ms RTT)"
              />
              <RadioGroupItem
                value="cluster-2"
                label="EU-Central (Frankfurt Replica)"
                description="High throughput backhaul buffer (78ms RTT)"
              />
              <RadioGroupItem
                value="cluster-3"
                label="AP-East (Tokyo Standby)"
                description="Cold standby failover zone (140ms RTT)"
              />
            </RadioGroup>
          </div>
        </ComponentPreview>
      );

    case 'gauge':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <span className="text-text-muted font-medium">Dial Telemetry: <span className="font-mono text-text-primary">{gaugeVal}%</span></span>
            <input
              type="range"
              min={0}
              max={100}
              value={gaugeVal}
              onChange={(e) => setGaugeVal(Number(e.target.value))}
              className="accent-primary cursor-pointer w-48"
            />
          </div>

          <ComponentPreview
            code={`<div className="flex items-center gap-8 flex-wrap justify-center">\n  <Gauge value={${gaugeVal}} label="CORE UTIL" unit="%" size={140} variant="tactile" />\n  <Gauge value={${Math.min(100, Math.round(gaugeVal * 0.85))}} label="MEM BUFFER" unit="%" size={140} variant="warning" />\n  <Gauge value={${Math.min(100, Math.round(gaugeVal * 1.15))}} label="IOPS SPIKE" unit="%" size={140} variant="${gaugeVal > 75 ? 'critical' : 'recessed'}" />\n</div>`}
          >
            <div className="flex items-center gap-8 flex-wrap justify-center py-4">
              <Gauge value={gaugeVal} label="CORE UTIL" unit="%" size={140} variant="tactile" />
              <Gauge value={Math.min(100, Math.round(gaugeVal * 0.85))} label="MEM BUFFER" unit="%" size={140} variant="warning" />
              <Gauge value={Math.min(100, Math.round(gaugeVal * 1.15))} label="IOPS SPIKE" unit="%" size={140} variant={gaugeVal > 75 ? 'critical' : 'recessed'} />
            </div>
          </ComponentPreview>
        </div>
      );

    case 'sparkline':
      return (
        <ComponentPreview
          code={`<Sparkline data={[24, 38, 31, 45, 52, 68, 74, 82]} width={160} height={40} />`}
        >
          <div className="flex items-center gap-6 flex-wrap justify-center py-4">
            <div className="p-3.5 rounded-xl bg-card border border-border/80 tactile-surface flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">Throughput</span>
                <span className="text-text-primary font-medium">82 Mb/s</span>
              </div>
              <Sparkline data={[24, 38, 31, 45, 52, 68, 74, 82]} width={160} height={40} />
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border/80 tactile-surface flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">Error Margin</span>
                <span className="text-emerald-500 font-medium">0.03%</span>
              </div>
              <Sparkline data={[14, 12, 10, 8, 9, 6, 4, 3]} width={160} height={40} color="#10b981" />
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border/80 tactile-surface flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">Thermal Jitter</span>
                <span className="text-amber-500 font-medium">88 °C</span>
              </div>
              <Sparkline data={[45, 62, 58, 79, 84, 91, 78, 88]} width={160} height={40} color="#f59e0b" />
            </div>
          </div>
        </ComponentPreview>
      );

    case 'area-chart':
      return (
        <ComponentPreview
          code={`<AreaChart\n  data={[\n    { label: '00:00', value: 120, formattedValue: '120 Mb/s' },\n    { label: '04:00', value: 240, formattedValue: '240 Mb/s' },\n    { label: '08:00', value: 410, formattedValue: '410 Mb/s' },\n    { label: '12:00', value: 580, formattedValue: '580 Mb/s' },\n    { label: '16:00', value: 510, formattedValue: '510 Mb/s' },\n    { label: '20:00', value: 640, formattedValue: '640 Mb/s' },\n    { label: '24:00', value: 490, formattedValue: '490 Mb/s' }\n  ]}\n  height={220}\n  unit=" Mb/s"\n/>`}
        >
          <div className="w-full max-w-xl py-4">
            <AreaChart
              data={[
                { label: '00:00', value: 120, formattedValue: '120 Mb/s' },
                { label: '04:00', value: 240, formattedValue: '240 Mb/s' },
                { label: '08:00', value: 410, formattedValue: '410 Mb/s' },
                { label: '12:00', value: 580, formattedValue: '580 Mb/s' },
                { label: '16:00', value: 510, formattedValue: '510 Mb/s' },
                { label: '20:00', value: 640, formattedValue: '640 Mb/s' },
                { label: '24:00', value: 490, formattedValue: '490 Mb/s' },
              ]}
              height={220}
              unit=" Mb/s"
            />
          </div>
        </ComponentPreview>
      );

    case 'bar-chart':
      return (
        <ComponentPreview
          code={`<BarChart\n  data={[\n    { label: '60Hz', value: 42, formattedValue: '-14 dB' },\n    { label: '120Hz', value: 68, formattedValue: '-6 dB' },\n    { label: '250Hz', value: 85, formattedValue: '-2 dB' },\n    { label: '1kHz', value: 92, formattedValue: '0 dB' },\n    { label: '4kHz', value: 74, formattedValue: '-4 dB' },\n    { label: '8kHz', value: 55, formattedValue: '-9 dB' },\n    { label: '16kHz', value: 38, formattedValue: '-15 dB' }\n  ]}\n  height={220}\n  unit=" dB"\n/>`}
        >
          <div className="w-full max-w-xl py-4">
            <BarChart
              data={[
                { label: '60Hz', value: 42, formattedValue: '-14 dB' },
                { label: '120Hz', value: 68, formattedValue: '-6 dB' },
                { label: '250Hz', value: 85, formattedValue: '-2 dB' },
                { label: '1kHz', value: 92, formattedValue: '0 dB' },
                { label: '4kHz', value: 74, formattedValue: '-4 dB' },
                { label: '8kHz', value: 55, formattedValue: '-9 dB' },
                { label: '16kHz', value: 38, formattedValue: '-15 dB' },
              ]}
              height={220}
              unit=" dB"
            />
          </div>
        </ComponentPreview>
      );

    case 'otp-input':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-2">
              <span className="text-text-muted font-medium">Variant:</span>
              {(['tactile', 'recessed', 'default'] as OtpInputVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setOtpVariant(v)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    otpVariant === v ? 'bg-foreground text-background font-medium' : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-text-secondary">
                <input
                  type="checkbox"
                  checked={otpMask}
                  onChange={(e) => setOtpMask(e.target.checked)}
                  className="rounded"
                />
                <span>Mask Digits</span>
              </label>
              <button
                type="button"
                onClick={() => setOtpVal('')}
                className="text-text-muted hover:text-text-primary transition-colors font-mono"
              >
                Clear
              </button>
            </div>
          </div>

          <ComponentPreview
            code={`<OtpInput\n  length={6}\n  variant="${otpVariant}"\n  value="${otpVal}"\n  mask={${otpMask}}\n  onChange={setOtpVal}\n  onComplete={(code) => console.log('Entered code:', code)}\n/>`}
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <OtpInput
                length={6}
                variant={otpVariant}
                value={otpVal}
                mask={otpMask}
                onChange={setOtpVal}
                onComplete={(code) => console.log('Entered code:', code)}
              />
              <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                <span>Value: {otpVal || '—'}</span>
                <span>•</span>
                <span>{otpVal.length === 6 ? 'Ready for verification' : `${6 - otpVal.length} digits required`}</span>
              </div>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'spotlight-card':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <span className="text-text-muted font-medium">Variant:</span>
            {(['tactile', 'default', 'recessed'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSpotlightVariant(v)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                  spotlightVariant === v ? 'bg-foreground text-background font-medium' : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <ComponentPreview
            code={`<SpotlightCard variant="${spotlightVariant}">\n  <SpotlightCardHeader>\n    <SpotlightCardTitle>Environmental Sensor</SpotlightCardTitle>\n    <SpotlightCardDescription>Hover over the surface to reveal ambient light.</SpotlightCardDescription>\n  </SpotlightCardHeader>\n  <SpotlightCardContent>\n    Ambient light behaves as an optical condition, not decoration.\n  </SpotlightCardContent>\n</SpotlightCard>`}
          >
            <div className="w-full max-w-md py-2">
              <SpotlightCard variant={spotlightVariant}>
                <SpotlightCardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-text-muted" />
                      <span className="text-[11px] font-mono text-text-muted uppercase">Node 09-Alpha</span>
                    </div>
                    <Badge variant="status" status="success">Active</Badge>
                  </div>
                  <SpotlightCardTitle className="mt-2">Environmental Sensor Suite</SpotlightCardTitle>
                  <SpotlightCardDescription>
                    Pass pointer across the card surface to observe environmental ambient light falloff.
                  </SpotlightCardDescription>
                </SpotlightCardHeader>
                <SpotlightCardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-secondary/40 border border-border/40 text-xs space-y-1">
                    <div className="text-text-muted flex justify-between">
                      <span>Manifold Pressure</span>
                      <span className="font-mono text-text-primary">101.3 kPa</span>
                    </div>
                    <div className="text-text-muted flex justify-between">
                      <span>Die Temperature</span>
                      <span className="font-mono text-text-primary">34.2 °C</span>
                    </div>
                  </div>
                </SpotlightCardContent>
                <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-text-muted font-mono">
                  <span>AMBIENT ILLUMINATION</span>
                  <span>420PX RADIUS</span>
                </div>
              </SpotlightCard>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'folder-preview':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <span className="text-text-muted font-medium">Interactive Archival Stack</span>
            <button
              type="button"
              onClick={() => setFolderExpanded(!folderExpanded)}
              className="px-2.5 py-1 rounded-md bg-secondary text-text-primary hover:bg-accent transition-colors font-mono"
            >
              {folderExpanded ? 'Collapse Sheets' : 'Fan Out Sheets'}
            </button>
          </div>

          <ComponentPreview
            code={`<FolderPreview\n  title="Core Avionics Blueprints"\n  category="SCHEMATICS BUNDLE // REV 4"\n  expanded={${folderExpanded}}\n  files={[\n    { id: '1', title: 'Power Distribution Rail', subtitle: '48V DC bus regulation', badge: 'Spec 01' },\n    { id: '2', title: 'Optical Interconnect Topology', subtitle: '800 Gbps low-jitter link', badge: 'Spec 02' },\n    { id: '3', title: 'Thermal Dissipation Study', subtitle: 'Cryo-cooling baseline', badge: 'Spec 03' }\n  ]}\n/>`}
          >
            <div className="w-full flex justify-center py-4">
              <FolderPreview
                title="Core Avionics Blueprints"
                category="SCHEMATICS BUNDLE // REV 4"
                expanded={folderExpanded}
                onExpandedChange={setFolderExpanded}
                files={[
                  {
                    id: '1',
                    title: 'Power Distribution Rail',
                    subtitle: '48V DC bus regulation & conversion',
                    badge: 'Spec 01',
                    icon: <Cpu className="w-3.5 h-3.5" />,
                  },
                  {
                    id: '2',
                    title: 'Optical Interconnect Topology',
                    subtitle: '800 Gbps low-jitter backplane link',
                    badge: 'Spec 02',
                    icon: <HardDrive className="w-3.5 h-3.5" />,
                  },
                  {
                    id: '3',
                    title: 'Thermal Dissipation Study',
                    subtitle: 'Cryo-cooling test manifold matrix',
                    badge: 'Spec 03',
                    icon: <ShieldCheck className="w-3.5 h-3.5" />,
                  },
                ]}
              />
            </div>
          </ComponentPreview>
        </div>
      );

    case 'magnetic-tabs':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <span className="text-text-muted font-medium">Variant:</span>
            {(['tactile', 'default', 'recessed'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setMagneticVariant(v)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                  magneticVariant === v ? 'bg-foreground text-background font-medium' : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <ComponentPreview
            code={`<MagneticTabs\n  variant="${magneticVariant}"\n  value="${magneticTab}"\n  onValueChange={setMagneticTab}\n  tabs={[\n    { id: 'clusters', label: 'Clusters', badge: '4' },\n    { id: 'telemetry', label: 'Telemetry' },\n    { id: 'security', label: 'Security', badge: 'OK' },\n    { id: 'storage', label: 'Storage' }\n  ]}\n/>`}
          >
            <div className="flex flex-col items-center gap-6 py-4">
              <MagneticTabs
                variant={magneticVariant}
                value={magneticTab}
                onValueChange={setMagneticTab}
                tabs={[
                  { id: 'clusters', label: 'Clusters', icon: <Cpu className="w-3.5 h-3.5" />, badge: '4' },
                  { id: 'telemetry', label: 'Telemetry', icon: <Activity className="w-3.5 h-3.5" /> },
                  { id: 'security', label: 'Security', icon: <ShieldCheck className="w-3.5 h-3.5" />, badge: 'OK' },
                  { id: 'storage', label: 'Storage', icon: <HardDrive className="w-3.5 h-3.5" /> },
                ]}
              />
              <div className="text-xs font-mono text-text-muted">
                Active tab: <span className="text-text-primary font-medium">{magneticTab}</span>
              </div>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'stack-deck':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <span className="text-text-muted font-medium">Tactile Stack Deck</span>
            <span className="font-mono text-text-muted">Card 0{stackIdx + 1} of 03</span>
          </div>

          <ComponentPreview
            code={`<StackDeck\n  currentIndex={${stackIdx}}\n  onIndexChange={setStackIdx}\n  cards={[\n    { id: '01', title: 'Thermal Isolation Chamber', tag: 'Chamber A' },\n    { id: '02', title: 'Optical Transceiver Grid', tag: 'Photonics' },\n    { id: '03', title: 'Secondary Failover Array', tag: 'Power' }\n  ]}\n/>`}
          >
            <div className="w-full flex justify-center py-4">
              <StackDeck
                currentIndex={stackIdx}
                onIndexChange={setStackIdx}
                cards={[
                  {
                    id: '01',
                    title: 'Thermal Isolation Chamber',
                    tag: 'Chamber A',
                    description: 'Continuous liquid-nitrogen manifold operating at -40°C nominal temperature with zero thermal creep.',
                  },
                  {
                    id: '02',
                    title: 'Optical Transceiver Grid',
                    tag: 'Photonics',
                    description: 'Dual coherent laser transmitters with 0.1ps timing jitter across the 800 Gbps fabric interconnect.',
                  },
                  {
                    id: '03',
                    title: 'Secondary Failover Array',
                    tag: 'Power',
                    description: 'Sub-millisecond automatic battery switchover circuitry backed by uninterruptible isolated capacitor banks.',
                  },
                ]}
              />
            </div>
          </ComponentPreview>
        </div>
      );

    case 'dot-matrix-chart':
      return (
        <ComponentPreview
          code={`<DotMatrixChart
  title="REVENUE"
  metric="+326%"
  previousLabel="MAY $3,250"
  currentLabel="JUN $12,392"
  footerTagline="DON'T OVERTHINK | AUG 2024 | SIMPLIFYING DIGITAL EXP."
/>`}
        >
          <div className="w-full max-w-xl mx-auto py-4">
            <DotMatrixChart />
          </div>
        </ComponentPreview>
      );

    case 'tactile-trend-card':
      return (
        <ComponentPreview
          code={`<TactileTrendCard
  title="Chart"
  keywords={['Batch auction', 'Liquid staking derivatives (LSD)']}
  metricLabel="Total Personas"
  metricValue="824"
  metricDeltaSuperscript="+334"
  percentageDelta="34.4%"
/>`}
        >
          <div className="w-full flex justify-center py-4">
            <TactileTrendCard />
          </div>
        </ComponentPreview>
      );

    case 'tactile-metric-card':
      return (
        <ComponentPreview
          code={`<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  <TactileMetricCard
    title="Balance"
    value="$94,127"
    deltaText="increase 13%"
    deltaSubtext="vs last year"
  />
  <TactileBarCard
    title="Income"
    value="$12,532"
    deltaText="increase 12%"
    deltaSubtext="vs last month"
  />
</div>`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mx-auto py-4">
            <TactileMetricCard />
            <TactileBarCard />
          </div>
        </ComponentPreview>
      );

    case 'rail-sidebar':
      return (
        <ComponentPreview
          code={`<div className="h-[440px] border border-border/80 rounded-2xl overflow-hidden flex bg-card">\n  <RailSidebar\n    activeId="overview"\n    workspaceGlyph="N"\n    workspaceName="NickUI Core Studio"\n    collapsible={true}\n  />\n  <div className="flex-1 p-6 flex items-center justify-center text-xs text-text-muted">\n    Dashboard Content Area\n  </div>\n</div>`}
        >
          <div className="h-[440px] w-full flex justify-center py-4">
            <div className="h-full w-full max-w-xl border border-border/80 rounded-2xl overflow-hidden shadow-tactile flex bg-card">
              <RailSidebar collapsible={true} />
              <div className="flex-1 p-6 bg-secondary/15 flex flex-col justify-center items-center text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-text-primary">Interactive Rail Navigation</h4>
                  <p className="text-[11px] text-text-muted max-w-xs leading-relaxed">
                    Click the toggle button at the bottom of the rail to switch between the compact icon rail and the expanded drawer with full labels and keyboard shortcuts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      );

    case 'studio-sidebar':
      return (
        <ComponentPreview
          code={`<div className="h-[480px] border border-border/80 rounded-2xl overflow-hidden shadow-sm">\n  <StudioSidebar activeId="overview" />\n</div>`}
        >
          <div className="h-[480px] w-full flex justify-center py-4">
            <div className="h-full border border-border/80 rounded-2xl overflow-hidden shadow-tactile">
              <StudioSidebar />
            </div>
          </div>
        </ComponentPreview>
      );

    case 'segmented-control':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-text-muted font-medium">Variant:</span>
              {(['tactile', 'recessed', 'default'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSegmentedVariant(v)}
                  className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                    segmentedVariant === v
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-text-muted font-medium">Size:</span>
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSegmentedSize(s)}
                  className={`px-2 py-0.5 rounded-md text-xs uppercase font-mono transition-colors cursor-pointer ${
                    segmentedSize === s
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ComponentPreview
            code={`<SegmentedControl
  value="${segmentedVal}"
  onChange={setSelected}
  variant="${segmentedVariant}"
  size="${segmentedSize}"
  options={[
    { value: 'overview', label: 'Overview', icon: <Activity className="w-3.5 h-3.5" /> },
    { value: 'clusters', label: 'Clusters', icon: <Cpu className="w-3.5 h-3.5" />, badge: 14 },
    { value: 'telemetry', label: 'Telemetry', icon: <RadioIcon className="w-3.5 h-3.5" /> },
    { value: 'security', label: 'Security', icon: <ShieldCheck className="w-3.5 h-3.5" />, badge: 'Audit' },
  ]}
/>`}
          >
            <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
              <SegmentedControl
                value={segmentedVal}
                onChange={setSegmentedVal}
                variant={segmentedVariant}
                size={segmentedSize}
                options={[
                  { value: 'overview', label: 'Overview', icon: <Activity className="w-3.5 h-3.5" /> },
                  { value: 'clusters', label: 'Clusters', icon: <Cpu className="w-3.5 h-3.5" />, badge: 14 },
                  { value: 'telemetry', label: 'Telemetry', icon: <RadioIcon className="w-3.5 h-3.5" /> },
                  { value: 'security', label: 'Security', icon: <ShieldCheck className="w-3.5 h-3.5" />, badge: 'Audit' },
                ]}
              />

              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span>Active Segment:</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-text-primary font-medium border border-border/60">
                  {segmentedVal}
                </span>
              </div>
            </div>
          </ComponentPreview>
        </div>
      );

    case 'knob':
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-text-muted font-medium">Variant:</span>
              {(['tactile', 'recessed', 'default'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setKnobVariant(v)}
                  className={`px-2.5 py-1 rounded-md text-xs capitalize transition-colors cursor-pointer ${
                    knobVariant === v
                      ? 'bg-primary text-primary-foreground font-medium shadow-2xs'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={() => setKnobTicks(!knobTicks)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                knobTicks
                  ? 'bg-secondary text-text-primary font-medium border-border'
                  : 'text-text-muted hover:text-text-primary border-transparent'
              }`}
            >
              Radial Ticks: {knobTicks ? 'Visible' : 'Hidden'}
            </button>
          </div>

          <ComponentPreview
            code={`<div className="flex items-center gap-8">
  <Knob
    label="Master Gain"
    value={${knobGain}}
    onChange={setGain}
    min={0}
    max={100}
    unit="%"
    variant="${knobVariant}"
    showTicks={${knobTicks}}
  />
  <Knob
    label="Threshold"
    value={${knobThreshold}}
    onChange={setThreshold}
    min={0}
    max={60}
    unit="dB"
    variant="${knobVariant}"
    showTicks={${knobTicks}}
  />
  <Knob
    label="Damping"
    value={${knobDamping}}
    onChange={setDamping}
    min={0}
    max={100}
    unit="ms"
    variant="${knobVariant}"
    showTicks={${knobTicks}}
  />
</div>`}
          >
            <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <Knob
                  label="Master Gain"
                  value={knobGain}
                  onChange={setKnobGain}
                  min={0}
                  max={100}
                  unit="%"
                  variant={knobVariant}
                  showTicks={knobTicks}
                />
                <Knob
                  label="Threshold"
                  value={knobThreshold}
                  onChange={setKnobThreshold}
                  min={0}
                  max={60}
                  unit="dB"
                  variant={knobVariant}
                  showTicks={knobTicks}
                />
                <Knob
                  label="Damping"
                  value={knobDamping}
                  onChange={setKnobDamping}
                  min={0}
                  max={100}
                  unit="ms"
                  variant={knobVariant}
                  showTicks={knobTicks}
                />
              </div>

              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs font-mono text-text-muted text-center max-w-md">
                <span className="text-text-primary font-medium">Interactivity:</span> Click and drag vertically, scroll mouse wheel, or use Arrow Up/Down & PageUp/PageDown keys while focused.
              </div>
            </div>
          </ComponentPreview>
        </div>
      );

    default:
      return <div>Preview not available</div>;
  }
}
