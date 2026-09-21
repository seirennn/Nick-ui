'use client';

import * as React from 'react';
import Link from 'next/link';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { designTokens } from '@/registry/tokens';
import { Copy, Check, Layers } from 'lucide-react';

export default function FoundationsPage() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const copyVal = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(val);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <>
      <SiteNavbar />

      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground pt-20">
        <div className="max-w-7xl mx-auto flex">
          {/* Docs Left Navigation Sidebar */}
          <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <DocsSidebar />
          </div>

          {/* Main Content Pane */}
          <main className="flex-1 px-6 md:px-12 py-10 max-w-4xl space-y-16">
            
            {/* Header */}
            <div className="space-y-3 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                  Design Architecture
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
                Foundations
              </h1>
              <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
                The core structural tokens extracted directly from the design authority (`~/work/portfolio`).
                These primitives dictate color luminance, typography scales, geometry, ambient light, and physical motion.
              </p>
            </div>

            {/* ═══════════════════════════════════════════
                1. COLORS
            ═══════════════════════════════════════════ */}
            <section id="colors" className="space-y-8 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-component-title text-text-primary">Color Foundations</h2>
                <p className="text-body text-text-muted">
                  Dual-state palette calibrated for warm editorial tactile paper (light mode) and deep studio dark neutrality (dark mode).
                </p>
              </div>

              {/* Light Mode Swatches */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-ui font-medium text-text-primary">Light Mode — Warm Editorial Linen</h3>
                  <Badge variant="outline">Base Canvas: #f5f2eb</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {designTokens.colors.light.map((c) => (
                    <div
                      key={c.token}
                      onClick={() => copyVal(c.value)}
                      className="p-3 rounded-xl border border-border bg-card/60 hover:border-foreground/20 transition-all cursor-pointer group space-y-2"
                    >
                      <div
                        className="w-full h-10 rounded-lg border border-black/10 shadow-2xs"
                        style={{ backgroundColor: c.value }}
                      />
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs text-text-primary">
                          <span>{c.token.replace('--', '')}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            {copiedToken === c.value ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-text-muted">{c.value}</div>
                        <div className="text-[11px] text-text-secondary truncate mt-1">{c.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark Mode Swatches */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-ui font-medium text-text-primary">Dark Mode — Deep Studio Dark</h3>
                  <Badge variant="outline">Base Canvas: #101010</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {designTokens.colors.dark.map((c) => (
                    <div
                      key={c.token}
                      onClick={() => copyVal(c.value)}
                      className="p-3 rounded-xl border border-border bg-card/60 hover:border-foreground/20 transition-all cursor-pointer group space-y-2"
                    >
                      <div
                        className="w-full h-10 rounded-lg border border-white/10 shadow-2xs"
                        style={{ backgroundColor: c.value }}
                      />
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs text-text-primary">
                          <span>{c.token.replace('--', '')}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            {copiedToken === c.value ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-text-muted">{c.value}</div>
                        <div className="text-[11px] text-text-secondary truncate mt-1">{c.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Separator />

            {/* ═══════════════════════════════════════════
                2. TYPOGRAPHY
            ═══════════════════════════════════════════ */}
            <section id="typography" className="space-y-8 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-component-title text-text-primary">Typography Scale</h2>
                <p className="text-body text-text-muted">
                  Strictly controlled editorial hierarchy built on Inter sans-serif and tabular monospace numerals.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 space-y-8 divide-y divide-border/60">
                {/* Major Title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-major-title</span>
                    <span>20px / 25px · Medium · -0.14px</span>
                  </div>
                  <div className="text-major-title text-text-primary">
                    Institution-scale medical learning management system combining curriculum verification.
                  </div>
                </div>

                {/* Component Title */}
                <div className="pt-6 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-component-title</span>
                    <span>16px / 20px · Medium · -0.14px</span>
                  </div>
                  <div className="text-component-title text-text-primary">
                    Harmonic Soundstage Spectrum Visualizer
                  </div>
                </div>

                {/* Body Text */}
                <div className="pt-6 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-body</span>
                    <span>14px / 19.5px · Regular · -0.14px</span>
                  </div>
                  <div className="text-body text-text-secondary max-w-2xl">
                    Visual behavior must justify itself through spatial clarity, calmness, and trust. If an effect can be named as a component gimmick, it violates the system. If it feels like environmental atmosphere, it is correct.
                  </div>
                </div>

                {/* UI Text */}
                <div className="pt-6 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-ui</span>
                    <span>13px / 16px · Medium · -0.14px</span>
                  </div>
                  <div className="text-ui text-text-primary">
                    Button Action · Navigation Link · Form Field Label · Segmented Pill
                  </div>
                </div>

                {/* Metadata */}
                <div className="pt-6 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-metadata</span>
                    <span>13px / 16.5px · Regular · -0.14px</span>
                  </div>
                  <div className="text-metadata text-text-muted">
                    Recorded July 15, 2025 · Last modified 2 hours ago · Dimapur, India
                  </div>
                </div>

                {/* Sidebar Category */}
                <div className="pt-6 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>.text-sidebar-category</span>
                    <span>11.5px / 15px · Medium · 0.05em (caps)</span>
                  </div>
                  <div className="text-sidebar-category text-text-muted uppercase tracking-wider">
                    Core Stack · Cloud & Infrastructure · Production Systems
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* ═══════════════════════════════════════════
                3. ATMOSPHERE & GRAIN
            ═══════════════════════════════════════════ */}
            <section id="atmosphere" className="space-y-6 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-component-title text-text-primary">Atmosphere & Systemic Grain</h2>
                <p className="text-body text-text-muted">
                  Atmospheric environmental layers that live globally behind all page content.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-ui font-medium text-text-primary">.system-atmosphere</h3>
                    <Badge variant="mono">28s Cycle</Badge>
                  </div>
                  <p className="text-body text-text-secondary text-xs leading-relaxed">
                    A dual radial gradient operating with a 28-second non-intrusive breathing cycle (`ambientBreath`). Simulates soft natural room illumination without sharp specular hotspots.
                  </p>
                  <pre className="p-3 rounded-lg bg-secondary/60 text-[11px] font-mono text-text-muted overflow-x-auto">
                    {`background: radial-gradient(80% 60% at 50% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 80%);
animation: ambientBreath 28s ease-in-out infinite alternate;`}
                  </pre>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-ui font-medium text-text-primary">.system-grain</h3>
                    <Badge variant="mono">0.025 Opacity</Badge>
                  </div>
                  <p className="text-body text-text-secondary text-xs leading-relaxed">
                    A systemic SVG fractal noise texture placed globally at 0.025 opacity. Eliminates digital sterile banding on modern OLED and Retina displays without introducing visual focus.
                  </p>
                  <pre className="p-3 rounded-lg bg-secondary/60 text-[11px] font-mono text-text-muted overflow-x-auto">
                    {`<filter id='noiseFilter'>
  <feTurbulence type='fractalNoise'
    baseFrequency='0.8' numOctaves='3' />
</filter>`}
                  </pre>
                </div>
              </div>
            </section>

            <Separator />

            {/* ═══════════════════════════════════════════
                4. MOTION & PHYSICS
            ═══════════════════════════════════════════ */}
            <section id="motion" className="space-y-6 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-component-title text-text-primary">Motion Principles & Easing</h2>
                <p className="text-body text-text-muted">
                  Physical parameters for interactive micro-springs and spatial transitions.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <h4 className="text-ui font-medium text-text-primary">Quintic Easing Deceleration</h4>
                    <p className="text-xs text-text-muted">`ease: [0.16, 1, 0.3, 1]`</p>
                    <p className="text-xs text-text-secondary">
                      Simulates high initial velocity with natural physical damping, avoiding sudden mechanical stops.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-ui font-medium text-text-primary">Interactive Spring Physics</h4>
                    <p className="text-xs text-text-muted">`stiffness: 400, damping: 25`</p>
                    <p className="text-xs text-text-secondary">
                      Tight, responsive micro-spring used across buttons and interactive cards (`scale: 1.02` hover, `0.98` tap).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* ═══════════════════════════════════════════
                5. TACTILE SKEUOMORPHIC DEPTH & INTENSITY TIERS
            ═══════════════════════════════════════════ */}
            <section id="depth" className="space-y-8 scroll-mt-24 pb-16">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <h2 className="text-component-title text-text-primary">Tactile Depth & Intensity Tiers</h2>
                </div>
                <p className="text-body text-text-muted">
                  Physical depth in NickUI is divided into two architectural types (Raised Tactile and Recessed Well) across three calibrated intensity levels (Subtle, Medium, Deep). Depth conveys mass, travel, and spatial hierarchy without ornamentation.
                </p>
              </div>

              {/* Architectural Depth Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tactile (Raised Surface) */}
                <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-tactile">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-ui font-medium text-text-primary">Type 1: Tactile (Raised Surface)</h3>
                      <p className="text-xs text-text-muted">Stands proud above the canvas</p>
                    </div>
                    <Badge variant="mono">Raised Keycap</Badge>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Employs a top hairline specular rim (<code className="font-mono text-[11px]">inset 0 1px 0 rgba(255,255,255,...)</code>) combined with an ambient bottom drop shadow. Gives controls physical mass and tactile affordance.
                  </p>
                  <div className="p-4 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-center gap-3 flex-wrap">
                    <Button variant="tactile" depth="subtle" size="sm">Subtle</Button>
                    <Button variant="tactile" depth="medium" size="sm">Medium</Button>
                    <Button variant="tactile" depth="deep" size="sm">Deep</Button>
                  </div>
                </div>

                {/* Recessed (Sunken Well) */}
                <div className="p-6 rounded-2xl border border-border bg-secondary/40 space-y-4 shadow-recessed">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-ui font-medium text-text-primary">Type 2: Recessed (Sunken Well)</h3>
                      <p className="text-xs text-text-muted">Carved inward into the canvas</p>
                    </div>
                    <Badge variant="mono">Sunken Well</Badge>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Employs a top inner shadow (<code className="font-mono text-[11px]">inset 0 2px 4px rgba(0,0,0,...)</code>) and bottom specular highlight. Defines receptor chassis, input wells, and gauge bezels.
                  </p>
                  <div className="p-4 rounded-xl bg-secondary/20 border border-border/60 flex items-center justify-center gap-3 flex-wrap">
                    <Button variant="recessed" depth="subtle" size="sm">Subtle</Button>
                    <Button variant="recessed" depth="medium" size="sm">Medium</Button>
                    <Button variant="recessed" depth="deep" size="sm">Deep</Button>
                  </div>
                </div>
              </div>

              {/* 3 Intensity Levels Matrix */}
              <div className="space-y-4">
                <h3 className="text-ui font-medium text-text-primary">Depth Intensity Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Level 1: Subtle */}
                  <div className="p-5 rounded-xl border border-border/70 bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-text-primary">Subtle (Level 1)</span>
                      <Badge variant="mono">1px Depth</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Micro-elevation for dense tables, quiet status pills, and secondary actions. Gentle 0.5px physical travel.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-text-muted">
                      <div className="flex justify-between items-center">
                        <span>Button:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">depth="subtle"</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Surface:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-surface-subtle</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Well:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-well-subtle</code>
                      </div>
                    </div>
                  </div>

                  {/* Level 2: Medium */}
                  <div className="p-5 rounded-xl border border-border/90 bg-card space-y-3 shadow-tactile">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-text-primary">Medium (Level 2)</span>
                      <Badge variant="mono">2–3px Depth</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Standard calibrated depth for primary actions, cards, and modal dialogs. 1px physical key travel.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-text-muted">
                      <div className="flex justify-between items-center">
                        <span>Button:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">depth="medium"</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Surface:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-surface</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Well:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-well</code>
                      </div>
                    </div>
                  </div>

                  {/* Level 3: Deep */}
                  <div className="p-5 rounded-xl border border-border bg-card space-y-3 shadow-tactile-deep">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-text-primary">Deep (Level 3)</span>
                      <Badge variant="mono">4–6px Depth</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Pronounced mechanical milled bevel for hardware dials, prominent hero triggers, and tactile chassis. 2px physical key travel.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-text-muted">
                      <div className="flex justify-between items-center">
                        <span>Button:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">depth="deep"</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Surface:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-surface-deep</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Well:</span>
                        <code className="text-text-primary bg-secondary/60 px-1.5 py-0.5 rounded">.tactile-well-deep</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
