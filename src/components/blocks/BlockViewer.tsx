'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/docs/CodeBlock';
import {
  Eye,
  Code2,
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BlockViewerProps {
  title: string;
  description?: string;
  cliCommand?: string;
  code: string;
  codeFileName?: string;
  category?: string;
  isNew?: boolean;
  children: React.ReactNode;
  defaultView?: 'preview' | 'code';
  className?: string;
}

export function BlockViewer({
  title,
  description,
  cliCommand,
  code,
  codeFileName = 'Component.tsx',
  category = 'Block',
  isNew = false,
  children,
  defaultView = 'preview',
  className,
}: BlockViewerProps) {
  const [view, setView] = React.useState<'preview' | 'code'>(defaultView);
  const [viewport, setViewport] = React.useState<'100%' | '768px' | '375px'>('100%');
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCli = () => {
    if (!cliCommand) return;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={cn('w-full rounded-[24px] border border-border/80 bg-card shadow-tactile overflow-hidden', className)}>
      {/* Top Architectural Toolbar */}
      <div className="px-5 py-3.5 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-secondary/30">
        {/* Left: Metadata & CLI Quick Copy */}
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-text-primary tracking-tight truncate">
              {title}
            </h3>
            {isNew && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                New
              </span>
            )}
            <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary border border-border/50 hidden md:inline">
              {category}
            </span>
          </div>

          {cliCommand && (
            <button
              type="button"
              onClick={handleCopyCli}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono text-text-muted hover:text-text-primary bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer"
              title="Click to copy CLI command"
            >
              <Terminal className="w-3 h-3 text-text-muted" />
              <span className="truncate max-w-[200px] sm:max-w-[280px]">{cliCommand}</span>
              {copiedCli ? (
                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
              ) : (
                <Copy className="w-3 h-3 text-text-muted shrink-0" />
              )}
            </button>
          )}
        </div>

        {/* Right: Viewport Selectors, Segmented Toggle & Copy */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {view === 'preview' && (
            <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-secondary/60 border border-border/60 text-xs">
              <button
                type="button"
                onClick={() => setViewport('100%')}
                className={cn(
                  'p-1 rounded-md transition-colors cursor-pointer',
                  viewport === '100%' ? 'bg-card text-text-primary shadow-2xs' : 'text-text-muted hover:text-text-primary'
                )}
                title="Desktop viewport (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('768px')}
                className={cn(
                  'p-1 rounded-md transition-colors cursor-pointer',
                  viewport === '768px' ? 'bg-card text-text-primary shadow-2xs' : 'text-text-muted hover:text-text-primary'
                )}
                title="Tablet viewport (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('375px')}
                className={cn(
                  'p-1 rounded-md transition-colors cursor-pointer',
                  viewport === '375px' ? 'bg-card text-text-primary shadow-2xs' : 'text-text-muted hover:text-text-primary'
                )}
                title="Mobile viewport (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Segmented [Preview | Code] Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-secondary/80 border border-border/70 text-xs">
            <button
              type="button"
              onClick={() => setView('preview')}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer',
                view === 'preview'
                  ? 'bg-card text-text-primary shadow-2xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setView('code')}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer',
                view === 'code'
                  ? 'bg-card text-text-primary shadow-2xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              <Code2 className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
            title="Copy component code"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Description Line if present */}
      {description && (
        <div className="px-5 py-2 border-b border-border/40 text-xs text-text-muted bg-secondary/10">
          {description}
        </div>
      )}

      {/* Canvas Viewport */}
      {view === 'preview' ? (
        <div className="w-full overflow-x-auto p-4 sm:p-6 lg:p-8 flex justify-center bg-background/50">
          <div
            className="w-full transition-all duration-300 flex justify-center"
            style={{ maxWidth: viewport }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="w-full p-0">
          <CodeBlock code={code} title={codeFileName} />
        </div>
      )}
    </div>
  );
}
