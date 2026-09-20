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
    <div className={cn('rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs', className)}>
      {/* Precision Integrated Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/70 bg-secondary/30">
        {/* Left: Preview / Code Segmented Switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer select-none',
              activeTab === 'preview'
                ? 'bg-background text-text-primary shadow-xs border border-border/70'
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
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer select-none',
              activeTab === 'code'
                ? 'bg-background text-text-primary shadow-xs border border-border/70'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        {/* Right: Viewport Controls & Quick Actions */}
        <div className="flex items-center gap-1.5">
          {activeTab === 'preview' && (
            <>
              <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-md bg-secondary/60 border border-border/50 text-xs">
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  title="Desktop Viewport (100%)"
                  className={cn(
                    'p-1 rounded text-text-muted transition-colors cursor-pointer',
                    viewport === 'desktop' ? 'bg-background text-text-primary shadow-xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Desktop viewport"
                >
                  <Monitor className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('tablet')}
                  title="Tablet Viewport (768px)"
                  className={cn(
                    'p-1 rounded text-text-muted transition-colors cursor-pointer',
                    viewport === 'tablet' ? 'bg-background text-text-primary shadow-xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Tablet viewport"
                >
                  <Tablet className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  title="Mobile Viewport (380px)"
                  className={cn(
                    'p-1 rounded text-text-muted transition-colors cursor-pointer',
                    viewport === 'mobile' ? 'bg-background text-text-primary shadow-xs' : 'hover:text-text-primary'
                  )}
                  aria-label="Mobile viewport"
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setResetKey((k) => k + 1)}
                title="Reset Component State"
                className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
                aria-label="Reset state"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer select-none"
            aria-label="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas / Code Body */}
      {activeTab === 'preview' ? (
        <div className="w-full flex justify-center p-4 sm:p-8 bg-background/50">
          <div
            className={cn(
              'w-full transition-all duration-300 ease-out flex justify-center',
              viewportWidths[viewport]
            )}
          >
            <div
              key={resetKey}
              className={cn(
                'min-h-[260px] w-full rounded-lg border border-border/50 p-6 sm:p-10',
                'flex items-center justify-center relative overflow-visible z-10 bg-card/60',
                'bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]'
              )}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-border/60">
          <CodeBlock code={code} className="border-0 rounded-none shadow-none" />
        </div>
      )}
    </div>
  );
}
