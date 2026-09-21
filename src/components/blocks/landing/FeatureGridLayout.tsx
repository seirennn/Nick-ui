'use client';

import * as React from 'react';
import { Layers, Sliders, Bot, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface FeatureItem {
  icon?: React.ReactNode;
  tag?: string;
  title: string;
  description: string;
  snippet?: string;
}

export interface FeatureGridLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: <Sliders className="w-4 h-4" />,
    tag: 'Physical Ergonomics',
    title: 'Tactile Depth Tiers',
    description: 'Raised specular rims, milled key wells, and recessed sink tracks calibrated for physical clarity without flashy neon ornamentation.',
    snippet: '<Button variant="tactile">Raised</Button>',
  },
  {
    icon: <Bot className="w-4 h-4" />,
    tag: 'Stdio JSON-RPC',
    title: 'Free AI MCP Server',
    description: 'Connect Cursor, Claude Desktop, and Zed. AI coding agents query exact props, tokens, and verified guidelines without hallucination.',
    snippet: 'pnpm dlx @sehrennn/nickui mcp',
  },
  {
    icon: <Terminal className="w-4 h-4" />,
    tag: 'Developer-Owned',
    title: 'Shadcn-Style CLI',
    description: 'No opaque black-box dependencies. Inject full TypeScript source code directly into your repository with full customization freedom.',
    snippet: 'pnpm dlx @sehrennn/nickui add button',
  },
];

export function FeatureGridLayout({
  category = 'CAPABILITIES & PRINCIPLES',
  title = 'Engineered for spatial clarity & architectural presence.',
  description = 'Every component is built from the ground up to respect environmental lighting, calm non-intrusive motion, and tangible depth.',
  features = DEFAULT_FEATURES,
  className,
}: FeatureGridLayoutProps) {
  return (
    <section className={cn('w-full py-12 md:py-16 space-y-10', className)}>
      {/* Section Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
          {category}
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/80 bg-card/80 shadow-tactile flex flex-col justify-between space-y-5 transition-all hover:border-foreground/20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center text-text-primary">
                  {feat.icon || <Layers className="w-4 h-4" />}
                </div>
                {feat.tag && (
                  <Badge variant="outline" className="text-[10px]">
                    {feat.tag}
                  </Badge>
                )}
              </div>

              <h3 className="text-base font-medium text-text-primary tracking-tight">
                {feat.title}
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed">
                {feat.description}
              </p>
            </div>

            {feat.snippet && (
              <div className="pt-3 border-t border-border/50">
                <div className="px-2.5 py-1.5 rounded-lg bg-secondary/50 font-mono text-[11px] text-text-muted">
                  {feat.snippet}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
