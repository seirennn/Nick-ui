'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Knob } from '@/components/ui/knob';
import { Sparkline } from '@/components/ui/charts/sparkline';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  SlidersHorizontalIcon,
  Activity01Icon,
  TerminalIcon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  CpuIcon,
  ServerStack01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface CenteredHeroLayoutProps {
  showLogo?: boolean;
  systemStatus?: string;
  title?: React.ReactNode;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CenteredHeroLayout({
  showLogo = true,
  systemStatus = 'STATUS: NOMINAL // CORE-ENGINE V0.1.1 · WIRE-SPEED MTLS · 48 NODES',
  title = (
    <>
      Architectural UI primitives & <br className="hidden sm:inline" />
      high-density hardware consoles.
    </>
  ),
  description = 'Engineered for spatial clarity, environmental atmosphere, and tactile depth. High-frequency telemetry decks, calibrated physical controls, and developer-owned components.',
  primaryAction = {
    label: 'Explore Primitives',
    href: '/components',
  },
  secondaryAction = {
    label: 'Architecture Guide',
    href: '/docs/cli',
  },
  className,
}: CenteredHeroLayoutProps) {
  const [copiedPackage, setCopiedPackage] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [gainKnob, setGainKnob] = React.useState(54);
  const [dampingKnob, setDampingKnob] = React.useState(78);
  const [activePreset, setActivePreset] = React.useState<'nominal' | 'burst' | 'damped'>('nominal');
  const [activeEnv, setActiveEnv] = React.useState<'prod' | 'staging'>('prod');

  const handleCopyPackage = () => {
    navigator.clipboard.writeText('pnpm add @sehrennn/nickui');
    setCopiedPackage(true);
    setTimeout(() => setCopiedPackage(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText('pnpm dlx @sehrennn/nickui add button');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className={cn('w-full py-8 md:py-14 flex flex-col items-center text-center', className)}>
      {/* Top Architectural Telemetry & Status Pill */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {showLogo && <BrandLogo size="sm" variant="tactile" />}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/80 text-[11px] font-mono text-text-secondary select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{systemStatus}</span>
        </div>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-text-primary max-w-3xl leading-[1.15]">
        {title}
      </h1>

      {/* Subtitle */}
      {description && (
        <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}

      {/* Functional Workstation Action Deck */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        <Link href={primaryAction?.href || '/components'}>
          <Button
            variant="tactile"
            size="md"
            className="text-xs font-medium"
            leftIcon={
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={15}
                strokeWidth={1.5}
                className="text-text-primary"
              />
            }
          >
            {primaryAction?.label || 'Inspect Primitives'}
          </Button>
        </Link>

        <Link href={secondaryAction?.href || '/docs/cli'}>
          <Button
            variant="secondary"
            size="md"
            className="text-xs font-mono"
            leftIcon={
              <HugeiconsIcon
                icon={TerminalIcon}
                size={15}
                strokeWidth={1.5}
                className="text-text-muted"
              />
            }
          >
            {secondaryAction?.label || 'CLI Interconnect'}
          </Button>
        </Link>

        {/* Environment Toggle Pill */}
        <div className="inline-flex items-center rounded-lg bg-secondary/40 border border-border/70 p-0.5 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveEnv('prod')}
            className={cn(
              'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
              activeEnv === 'prod'
                ? 'bg-card text-text-primary font-medium border border-border/60 shadow-2xs'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            Prod · us-east
          </button>
          <button
            type="button"
            onClick={() => setActiveEnv('staging')}
            className={cn(
              'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
              activeEnv === 'staging'
                ? 'bg-card text-text-primary font-medium border border-border/60 shadow-2xs'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            Staging
          </button>
        </div>
      </div>

      {/* ─── INTEGRATED HARDWARE WORKSTATION DECK ─── */}
      <div className="mt-10 w-full max-w-4xl rounded-2xl border border-border/80 bg-card/90 shadow-tactile overflow-hidden text-left backdrop-blur-md">
        {/* Top Deck Header */}
        <div className="px-5 py-3 border-b border-border/70 bg-secondary/30 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <HugeiconsIcon
              icon={SlidersHorizontalIcon}
              size={16}
              strokeWidth={1.5}
              className="text-text-muted"
            />
            <span className="text-xs font-mono font-medium text-text-primary uppercase tracking-wider">
              Workstation Surface Deck · Hardware Calibration
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-text-muted">CALIBRATION ENGINE</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SYNCHRONIZED
            </span>
          </div>
        </div>

        {/* Deck Core Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Dual Rotary Hardware Knobs (Col 5) */}
          <div className="md:col-span-5 p-4 rounded-xl bg-secondary/30 border border-border/60 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-text-muted uppercase text-[10px]">Rotary Controllers</span>
              <span className="font-mono text-text-primary text-[11px]">48.0 kHz // 24-bit</span>
            </div>

            <div className="flex items-center justify-around py-1">
              <div className="flex flex-col items-center space-y-2">
                <Knob
                  value={gainKnob}
                  onChange={setGainKnob}
                  size={58}
                  min={0}
                  max={100}
                  step={1}
                  label=""
                />
                <div className="text-center">
                  <div className="text-[11px] font-medium text-text-primary font-mono">
                    {gainKnob}%
                  </div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">Ingress Gain</div>
                </div>
              </div>

              <div className="w-[1px] h-12 bg-border/60" />

              <div className="flex flex-col items-center space-y-2">
                <Knob
                  value={dampingKnob}
                  onChange={setDampingKnob}
                  size={58}
                  min={0}
                  max={100}
                  step={1}
                  label=""
                />
                <div className="text-center">
                  <div className="text-[11px] font-medium text-text-primary font-mono">
                    {dampingKnob}%
                  </div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">Phase Damping</div>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-border/40">
              <button
                type="button"
                onClick={() => {
                  setActivePreset('nominal');
                  setGainKnob(54);
                  setDampingKnob(78);
                }}
                className={cn(
                  'flex-1 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer text-center',
                  activePreset === 'nominal'
                    ? 'bg-secondary text-text-primary font-medium border border-border/70'
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                Nominal
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset('burst');
                  setGainKnob(88);
                  setDampingKnob(42);
                }}
                className={cn(
                  'flex-1 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer text-center',
                  activePreset === 'burst'
                    ? 'bg-secondary text-text-primary font-medium border border-border/70'
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                Burst
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePreset('damped');
                  setGainKnob(24);
                  setDampingKnob(96);
                }}
                className={cn(
                  'flex-1 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer text-center',
                  activePreset === 'damped'
                    ? 'bg-secondary text-text-primary font-medium border border-border/70'
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                Damped
              </button>
            </div>
          </div>

          {/* Right: Live Telemetry Sparkline & Dual Copy Wells (Col 7) */}
          <div className="md:col-span-7 space-y-4">
            {/* Sparkline & Readout */}
            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted uppercase">
                  <HugeiconsIcon
                    icon={Activity01Icon}
                    size={14}
                    strokeWidth={1.5}
                    className="text-emerald-400"
                  />
                  <span>Telemetry Progression</span>
                </div>
                <div className="text-xl font-mono font-medium text-text-primary">
                  18.42 <span className="text-xs text-text-muted font-normal">GB/s</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  +12.8% vs base · 0.00% drop
                </div>
              </div>
              <div className="w-36 h-10">
                <Sparkline
                  data={[28, 34, 45, 42, 58, 62, 78, 85, 92, 98]}
                  height={40}
                  className="text-emerald-500"
                />
              </div>
            </div>

            {/* Installation Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/60 text-xs font-mono">
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] font-mono text-text-muted block uppercase">Package</span>
                  <span className="text-text-primary font-medium truncate block text-[11px]">
                    pnpm add @sehrennn/nickui
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPackage}
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer p-1 shrink-0"
                  aria-label="Copy package command"
                >
                  {copiedPackage ? (
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={14}
                      strokeWidth={1.5}
                      className="text-emerald-400"
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={Copy01Icon}
                      size={14}
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/60 text-xs font-mono">
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] font-mono text-text-muted block uppercase">Source / CLI</span>
                  <span className="text-text-primary font-medium truncate block text-[11px]">
                    pnpm dlx @sehrennn/nickui add
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer p-1 shrink-0"
                  aria-label="Copy CLI command"
                >
                  {copiedCli ? (
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={14}
                      strokeWidth={1.5}
                      className="text-emerald-400"
                    />
                  ) : (
                    <HugeiconsIcon
                      icon={Copy01Icon}
                      size={14}
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
