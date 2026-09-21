'use client';

import * as React from 'react';
import { Eye, Code2, Monitor, Tablet, Smartphone, Copy, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

export function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = React.useState<ViewportSize>('desktop');
  const [copied, setCopied] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const viewportWidths: Record<ViewportSize, string> = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[380px]',
  };

  return (
    <div
      className={cn(
        'rounded-[24px] border border-border/80 bg-card overflow-hidden shadow-tactile transition-all',
        className
      )}
    >
      {/* Precision Integrated Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70 bg-secondary/30">
        {/* Left: Preview / Code Segmented Switcher */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-secondary/70 border border-border/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer select-none',
              activeTab === 'preview'
                ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer select-none',
              activeTab === 'code'
                ? 'bg-card text-text-primary shadow-2xs font-medium border border-border/60'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        {/* Right: Viewport Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {activeTab === 'preview' && (
            <>
              <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg bg-secondary/70 border border-border/60 text-xs">
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  title="Desktop Viewport (100%)"
                  className={cn(
                    'p-1.5 rounded-md text-text-muted transition-colors cursor-pointer',
                    viewport === 'desktop' ? 'bg-card text-text-primary shadow-2xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Desktop viewport"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('tablet')}
                  title="Tablet Viewport (768px)"
                  className={cn(
                    'p-1.5 rounded-md text-text-muted transition-colors cursor-pointer',
                    viewport === 'tablet' ? 'bg-card text-text-primary shadow-2xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Tablet viewport"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  title="Mobile Viewport (380px)"
                  className={cn(
                    'p-1.5 rounded-md text-text-muted transition-colors cursor-pointer',
                    viewport === 'mobile' ? 'bg-card text-text-primary shadow-2xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Mobile viewport"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setResetKey((k) => k + 1)}
                title="Reset Component State"
                className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/50 transition-colors cursor-pointer"
                aria-label="Reset state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-text-muted hover:text-text-primary hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer select-none"
            aria-label="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas / Code Body */}
      {activeTab === 'preview' ? (
        <div className="w-full flex justify-center p-6 sm:p-12 bg-secondary/15 dark:bg-[#0c0c0e]/80 relative overflow-hidden min-h-[300px]">
          <div
            key={resetKey}
            className={cn(
              'w-full transition-all duration-300 ease-out flex items-center justify-center relative z-10',
              viewportWidths[viewport],
              viewport !== 'desktop' && 'border border-border/80 rounded-[24px] p-6 bg-card/90 shadow-tactile flex-col'
            )}
          >
            {viewport !== 'desktop' && (
              <div className="w-12 h-1 rounded-full bg-border/70 mb-4 self-center shrink-0" />
            )}
            {children}
          </div>
        </div>
      ) : (
        <div className="border-t border-border/60">
          <CodeBlock code={code} className="border-0 rounded-none shadow-none bg-transparent" />
        </div>
      )}
    </div>
  );
}
