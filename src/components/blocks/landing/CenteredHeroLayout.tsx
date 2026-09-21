'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ArrowRight, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CenteredHeroLayoutProps {
  showLogo?: boolean;
  badgeText?: string;
  badgeHref?: string;
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
  commandSnippet?: string;
  previewContent?: React.ReactNode;
  className?: string;
}

export function CenteredHeroLayout({
  showLogo = true,
  badgeText = 'NickUI v0.1.1 · Open Source Ecosystem',
  badgeHref = '/components',
  title = (
    <>
      Architectural design system for <br className="hidden sm:inline" />
      <span className="text-text-muted">developer-owned software</span>.
    </>
  ),
  description = 'High-craft UI components, tactile depth tiers, and native AI MCP server. Built for developers who care about spatial clarity and atmospheric presence.',
  primaryAction = {
    label: 'Explore Components',
    href: '/components',
  },
  secondaryAction = {
    label: 'CLI Documentation',
    href: '/docs/cli',
  },
  commandSnippet = 'pnpm dlx @sehrennn/nickui add button',
  previewContent,
  className,
}: CenteredHeroLayoutProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commandSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('w-full py-12 md:py-20 flex flex-col items-center text-center', className)}>
      {/* Brand Logo Emblem */}
      {showLogo && (
        <div className="mb-4">
          <BrandLogo size="lg" variant="tactile" />
        </div>
      )}

      {/* Announcement Badge */}
      {badgeText && (
        <div className="mb-6">
          <Link
            href={badgeHref}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/60 hover:bg-secondary border border-border/70 text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{badgeText}</span>
            <ArrowRight className="w-3 h-3 text-text-muted" />
          </Link>
        </div>
      )}

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary max-w-4xl leading-[1.12]">
        {title}
      </h1>

      {/* Subtitle */}
      {description && (
        <p className="mt-5 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}

      {/* Call to Actions & Terminal Copy Pill */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        {primaryAction && (
          <Link href={primaryAction.href} className="w-full sm:w-auto">
            <Button variant="default" size="md" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {primaryAction.label}
            </Button>
          </Link>
        )}

        {secondaryAction && (
          <Link href={secondaryAction.href} className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              {secondaryAction.label}
            </Button>
          </Link>
        )}

        {commandSnippet && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-card border border-border/80 text-xs font-mono text-text-secondary w-full sm:w-auto shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-text-muted select-none">$</span>
              <span className="text-text-primary font-medium">{commandSnippet}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="text-text-muted hover:text-text-primary transition-colors cursor-pointer p-0.5 ml-2"
              aria-label="Copy command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* Application Preview Window Frame */}
      {previewContent && (
        <div className="mt-12 sm:mt-16 w-full max-w-5xl rounded-2xl border border-border/80 bg-card/60 shadow-xl overflow-hidden backdrop-blur-sm">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 bg-secondary/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-text-muted">app.nickui.dev</span>
            </div>
            <div className="text-[10px] font-mono text-text-muted/60 uppercase">Interactive Studio</div>
          </div>
          {/* Inner Content Canvas */}
          <div className="p-6 sm:p-10 bg-background/50">
            {previewContent}
          </div>
        </div>
      )}
    </div>
  );
}
