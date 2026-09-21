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
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BlockViewerProps {
  title: string;
  description?: string;
  cliCommand?: string;
  code?: string;
  codeFileName?: string;
  usageCode?: string;
  usageFileName?: string;
  category?: string;
  isNew?: boolean;
  children: React.ReactNode;
  defaultOpenCode?: boolean;
  className?: string;
}

export function BlockViewer({
  title,
  description,
  cliCommand,
  code,
  codeFileName = 'Component.tsx',
  usageCode,
  usageFileName = 'page.tsx',
  category = 'Block',
  isNew = false,
  children,
  defaultOpenCode = false,
  className,
}: BlockViewerProps) {
  const [showCode, setShowCode] = React.useState(defaultOpenCode);
  const [codeTab, setCodeTab] = React.useState<'component' | 'usage'>('component');
  const [viewport, setViewport] = React.useState<'100%' | '768px' | '375px'>('100%');
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const activeCode = codeTab === 'component' ? (code || usageCode || '') : (usageCode || code || '');
  const activeFileName = codeTab === 'component' ? codeFileName : usageFileName;

  const handleCopyCli = () => {
    if (!cliCommand) return;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full rounded-[26px] border border-border/70 bg-card shadow-tactile overflow-hidden transition-all duration-300',
        className
      )}
    >
      {/* Top Architectural Toolbar */}
      <div className="px-5 py-3.5 border-b border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-secondary/30">
        {/* Left: Metadata & CLI Quick Command */}
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-text-primary tracking-tight">
              {title}
            </h3>
            {isNew && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                New
              </span>
            )}
            <span className="text-[11px] font-mono text-text-muted px-2 py-0.5 rounded bg-secondary/80 border border-border/50 hidden lg:inline">
              {category}
            </span>
          </div>

          {cliCommand && (
            <button
              type="button"
              onClick={handleCopyCli}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted hover:text-text-primary bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer max-w-full group"
              title="Click to copy CLI installation command"
            >
              <Terminal className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors shrink-0" />
              <span className="truncate">{cliCommand}</span>
              {copiedCli ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-text-muted/60 group-hover:text-text-primary shrink-0 ml-1 transition-colors" />
              )}
            </button>
          )}
        </div>

        {/* Right: Viewport Controls & Code Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {/* Viewport Width Controls */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-secondary/60 border border-border/60 text-xs">
            <button
              type="button"
              onClick={() => setViewport('100%')}
              className={cn(
                'p-1.5 rounded-md transition-colors cursor-pointer',
                viewport === '100%'
                  ? 'bg-card text-text-primary shadow-2xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
              title="Full width desktop (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('768px')}
              className={cn(
                'p-1.5 rounded-md transition-colors cursor-pointer',
                viewport === '768px'
                  ? 'bg-card text-text-primary shadow-2xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
              title="Tablet preview (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('375px')}
              className={cn(
                'p-1.5 rounded-md transition-colors cursor-pointer',
                viewport === '375px'
                  ? 'bg-card text-text-primary shadow-2xs'
                  : 'text-text-muted hover:text-text-primary'
              )}
              title="Mobile preview (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Downside Code View Button */}
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border select-none',
              showCode
                ? 'bg-text-primary text-background border-text-primary shadow-2xs font-medium'
                : 'bg-secondary/70 hover:bg-secondary text-text-secondary hover:text-text-primary border-border/70'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCode ? 'Hide Code' : 'View Code'}</span>
            {showCode ? (
              <ChevronUp className="w-3 h-3 ml-0.5 opacity-70" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            )}
          </button>
        </div>
      </div>

      {/* Description Sub-header */}
      {description && (
        <div className="px-5 py-2 border-b border-border/40 text-xs text-text-muted bg-secondary/10">
          {description}
        </div>
      )}

      {/* Canvas Viewport (Always visible, serene atmospheric dot lattice) */}
      <div className="w-full overflow-x-auto p-4 sm:p-8 flex justify-center bg-background/60 relative min-h-[340px]">
        {/* Subtle, restrained ambient dot lattice */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] dark:opacity-[0.2]"
          style={{
            backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Framing wrapper */}
        <div
          className={cn(
            'w-full transition-all duration-300 flex justify-center relative z-10',
            viewport !== '100%' &&
              'border border-border/80 rounded-[24px] p-4 bg-card/70 shadow-tactile my-2'
          )}
          style={{ maxWidth: viewport }}
        >
          {children}
        </div>
      </div>

      {/* Downside Code Panel (Collapsible with smooth transition) */}
      {showCode && (
        <div className="w-full border-t border-border/80 bg-[#faf8f5] dark:bg-[#0c0c0c] transition-all animate-in fade-in duration-200">
          {/* Code Sub-Toolbar */}
          <div className="px-5 py-2.5 border-b border-border/70 flex items-center justify-between gap-3 bg-secondary/40">
            {/* Sub-tabs: Component Source vs Page Usage */}
            <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-secondary/70 border border-border/60 text-xs font-mono">
              <button
                type="button"
                onClick={() => setCodeTab('component')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer',
                  codeTab === 'component'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Component Source ({codeFileName})</span>
              </button>
              <button
                type="button"
                onClick={() => setCodeTab('usage')}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer',
                  codeTab === 'usage'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Page Usage ({usageFileName})</span>
              </button>
            </div>

            {/* Quick Actions: Expand/Collapse & Copy */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/50 transition-colors cursor-pointer text-xs font-mono hidden sm:inline-flex items-center gap-1"
                title={isExpanded ? 'Collapse code view' : 'Expand full code view'}
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
                title="Copy active code"
              >
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Formatted Code Block Body */}
          <div
            className={cn(
              'w-full overflow-y-auto transition-all',
              isExpanded ? 'max-h-none' : 'max-h-[520px]'
            )}
          >
            <CodeBlock
              code={activeCode}
              title={activeFileName}
              className="border-0 rounded-none shadow-none bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
