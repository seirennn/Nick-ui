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
  Maximize,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BlockViewerContextValue {
  isFullscreen: boolean;
  viewport: string;
}

export const BlockViewerContext = React.createContext<BlockViewerContextValue>({
  isFullscreen: false,
  viewport: '100%',
});

export const useBlockViewer = () => React.useContext(BlockViewerContext);

export interface BlockViewerProps {
  title: string;
  slug?: string;
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
  slug,
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [fullscreenViewport, setFullscreenViewport] = React.useState<'100%' | '1280px' | '1024px' | '768px' | '375px'>('100%');
  const [isNativeFullscreen, setIsNativeFullscreen] = React.useState(false);

  // Fullscreen keyboard listener and body scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Sync native fullscreen changes
  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsNativeFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleNativeFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsNativeFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsNativeFullscreen(false);
        }
      }
    } catch (err) {
      console.error('Failed to toggle native fullscreen:', err);
    }
  };

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
    <>
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

          {/* Right: Fullscreen Button, Viewport Controls & Code Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
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

            {/* Open Standalone Page Button */}
            {slug && (
              <Link
                href={`/blocks/${slug}`}
                target="_blank"
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
                title="Open in dedicated standalone page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Fullscreen Interactive Mode Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-secondary/80 hover:bg-secondary text-text-primary border border-border/70 hover:border-foreground/30 transition-all cursor-pointer select-none font-medium shadow-2xs group"
              title="Open full interactive fullscreen view"
            >
              <Maximize2 className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" />
              <span>Fullscreen</span>
            </button>

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

        {/* Canvas Viewport: Calm atmospheric canvas with generous breathing room */}
        <div className="w-full overflow-x-auto p-4 sm:p-6 md:p-10 flex justify-center bg-secondary/15 dark:bg-[#0a0a0c]/70 relative min-h-[360px] border-b border-border/60">
          {/* Framing wrapper */}
          <div
            className={cn(
              'w-full transition-all duration-300 flex justify-center relative z-10',
              viewport !== '100%' &&
                'border border-border/90 rounded-[28px] p-3 sm:p-4 bg-card/90 shadow-tactile my-3'
            )}
            style={{ maxWidth: viewport }}
          >
            <BlockViewerContext.Provider value={{ isFullscreen: false, viewport }}>
              {children}
            </BlockViewerContext.Provider>
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

      {/* ═══════════════════════════════════════════════════════════
          FULLSCREEN MASTER VIEWPORT MODAL OVERLAY
      ═══════════════════════════════════════════════════════════ */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col overflow-hidden animate-in fade-in duration-200">
          {/* Top Fullscreen Control Bar */}
          <div className="px-6 py-3.5 border-b border-border/80 flex items-center justify-between gap-4 bg-card/90 backdrop-blur-md shrink-0 select-none z-20">
            {/* Left: Metadata & Live Status */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <h2 className="text-sm font-medium text-text-primary tracking-tight truncate">
                  {title}
                </h2>
                {isNew && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium shrink-0">
                    New
                  </span>
                )}
                <span className="text-[11px] font-mono text-text-muted px-2 py-0.5 rounded bg-secondary/80 border border-border/50 hidden md:inline shrink-0">
                  {category}
                </span>
              </div>
              <span className="text-border/60 hidden sm:inline">|</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider hidden lg:inline font-medium">
                FULLSCREEN INTERACTIVE MODE
              </span>
            </div>

            {/* Center: Fullscreen Viewport Mode Switcher */}
            <div className="hidden md:flex items-center p-0.5 rounded-xl bg-secondary/60 border border-border/60 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFullscreenViewport('100%')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  fullscreenViewport === '100%'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
                title="Desktop Edge-to-Edge (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (100%)</span>
              </button>
              <button
                type="button"
                onClick={() => setFullscreenViewport('1280px')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  fullscreenViewport === '1280px'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
                title="Laptop (1280px)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Laptop (1280px)</span>
              </button>
              <button
                type="button"
                onClick={() => setFullscreenViewport('1024px')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  fullscreenViewport === '1024px'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
                title="Tablet (1024px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet (1024px)</span>
              </button>
              <button
                type="button"
                onClick={() => setFullscreenViewport('375px')}
                className={cn(
                  'px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  fullscreenViewport === '375px'
                    ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                    : 'text-text-muted hover:text-text-primary'
                )}
                title="Mobile (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (375px)</span>
              </button>
            </div>

            {/* Right: Native Fullscreen, CLI copy, Code toggle, and Exit */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleNativeFullscreen}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted hover:text-text-primary bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer"
                title={isNativeFullscreen ? 'Exit Browser Fullscreen' : 'Enter Native Browser Fullscreen'}
              >
                <Maximize className="w-3.5 h-3.5 text-text-muted" />
                <span>{isNativeFullscreen ? 'Window' : 'Native'}</span>
              </button>

              {cliCommand && (
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted hover:text-text-primary bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer"
                  title="Copy CLI Command"
                >
                  <Terminal className="w-3.5 h-3.5 text-text-muted" />
                  <span>{copiedCli ? 'Copied' : 'CLI'}</span>
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              {slug && (
                <Link
                  href={`/blocks/${slug}`}
                  target="_blank"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-text-muted hover:text-text-primary bg-secondary/60 hover:bg-secondary border border-border/60 transition-colors cursor-pointer"
                  title="Open in dedicated standalone page"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                  <span>Standalone</span>
                </Link>
              )}

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
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition-all cursor-pointer font-medium select-none shadow-2xs"
                title="Exit Fullscreen (or press Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
                <kbd className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 border border-rose-500/30 text-rose-500 dark:text-rose-300 ml-1">
                  ESC
                </kbd>
              </button>
            </div>
          </div>

          {/* Fullscreen Body Canvas: When 100%, 0 padding, full height, edge-to-edge! */}
          <div
            className={cn(
              'flex-1 overflow-y-auto flex justify-center bg-secondary/15 dark:bg-[#070709]',
              fullscreenViewport === '100%' ? 'p-0 items-stretch' : 'p-4 sm:p-6 md:p-8 items-start'
            )}
          >
            <div
              className={cn(
                'w-full transition-all duration-300 relative z-10 flex flex-col',
                fullscreenViewport === '100%'
                  ? 'h-full max-w-full'
                  : 'border border-border/90 rounded-[28px] p-3 sm:p-4 bg-card/90 shadow-tactile my-auto'
              )}
              style={{ maxWidth: fullscreenViewport === '100%' ? '100%' : fullscreenViewport }}
            >
              <BlockViewerContext.Provider value={{ isFullscreen: true, viewport: fullscreenViewport }}>
                {children}
              </BlockViewerContext.Provider>
            </div>
          </div>

          {/* Fullscreen Collapsible Code Drawer */}
          {showCode && (
            <div className="w-full max-h-[380px] border-t border-border/80 bg-[#faf8f5] dark:bg-[#0c0c0c] flex flex-col shrink-0 animate-in slide-in-from-bottom-2 duration-200">
              <div className="px-5 py-2 border-b border-border/70 flex items-center justify-between gap-3 bg-secondary/40 shrink-0">
                <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-secondary/70 border border-border/60 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setCodeTab('component')}
                    className={cn(
                      'px-2.5 py-1 rounded-md transition-all cursor-pointer',
                      codeTab === 'component'
                        ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    {codeFileName}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCodeTab('usage')}
                    className={cn(
                      'px-2.5 py-1 rounded-md transition-all cursor-pointer',
                      codeTab === 'usage'
                        ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    {usageFileName}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <CodeBlock
                  code={activeCode}
                  title={activeFileName}
                  className="border-0 rounded-none shadow-none bg-transparent"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
