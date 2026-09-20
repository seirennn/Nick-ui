'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SplitBullet {
  title: string;
  description: string;
}

export interface SplitShowcaseLayoutProps {
  category?: string;
  title?: string;
  description?: string;
  bullets?: SplitBullet[];
  primaryAction?: {
    label: string;
    href: string;
  };
  showcaseNode?: React.ReactNode;
  reversed?: boolean;
  className?: string;
}

const DEFAULT_BULLETS: SplitBullet[] = [
  {
    title: 'Atmosphere Over Decoration',
    description: 'Visual effects express environmental presence rather than component-bound ornamentation.',
  },
  {
    title: 'Optical Edge Highlighting',
    description: 'Borders softly illuminate as an optical side effect of ambient light, never explicit neon strokes.',
  },
  {
    title: 'Developer-Owned Code',
    description: 'Everything is yours. Edit JSX, customize motion physics, and deploy without license locks.',
  },
];

export function SplitShowcaseLayout({
  category = 'DESIGN PARADIGM',
  title = 'Optical physics meets calm, non-intrusive software.',
  description = 'Crafted to remain visually complete even if all motion is paused. Visual hierarchy is established through typography, spacing, and alignment alone.',
  bullets = DEFAULT_BULLETS,
  primaryAction = {
    label: 'Explore Components',
    href: '/components',
  },
  showcaseNode,
  reversed = false,
  className,
}: SplitShowcaseLayoutProps) {
  return (
    <section
      className={cn(
        'w-full py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center',
        className
      )}
    >
      {/* Left Column: Text & Value Propositions */}
      <div className={cn('space-y-6', reversed && 'lg:order-2')}>
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
            {category}
          </span>
          <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-text-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed pt-1">
            {description}
          </p>
        </div>

        {/* Bullets */}
        <div className="space-y-4 pt-2">
          {bullets.map((b, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-secondary/80 border border-border/80 flex items-center justify-center text-text-primary shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">{b.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed mt-0.5">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        {primaryAction && (
          <div className="pt-3">
            <Link href={primaryAction.href}>
              <Button variant="default" size="md" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {primaryAction.label}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Right Column: Interactive Showcase Node */}
      <div className={cn('w-full flex items-center justify-center', reversed && 'lg:order-1')}>
        {showcaseNode || (
          <div className="w-full max-w-md p-8 rounded-2xl border border-border/80 bg-card/80 shadow-tactile text-center">
            <Sparkles className="w-8 h-8 mx-auto text-text-muted mb-3" />
            <p className="text-xs text-text-muted">Custom interactive showcase container</p>
          </div>
        )}
      </div>
    </section>
  );
}
