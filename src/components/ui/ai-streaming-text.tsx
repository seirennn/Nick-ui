'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export interface InlineSource {
  id: string;
  domain: string;
  title: string;
  snippet?: string;
  url?: string;
  confidence?: number; // e.g. 96
}

export interface AiStreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  isStreaming?: boolean;
  sources?: InlineSource[];
  followUps?: string[];
  onFollowUpClick?: (prompt: string) => void;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
  showActions?: boolean;
  variant?: 'tactile' | 'recessed' | 'ghost';
}

export function AiStreamingText({
  content,
  isStreaming = false,
  sources = [
    {
      id: '1',
      domain: 'kernel.org',
      title: 'Real-time telemetry buffer architecture',
      snippet: 'Low-latency ring buffer synchronization using memory fences and Catmull-Rom cubic splines.',
      confidence: 98,
    },
  ],
  followUps = [
    'How does this compare to B-spline interpolation?',
    'Benchmark memory consumption across 100k nodes',
    'Generate TypeScript implementation',
  ],
  onFollowUpClick,
  onCopy,
  onRegenerate,
  onFeedback,
  showActions = true,
  variant = 'tactile',
  className,
  ...props
}: AiStreamingTextProps) {
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState<'positive' | 'negative' | null>(null);
  const [hoveredSource, setHoveredSource] = React.useState<InlineSource | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    onFeedback?.(type);
  };

  const variantClasses = {
    tactile: 'bg-card border border-border/80 shadow-tactile rounded-2xl p-5',
    recessed: 'bg-secondary/30 border border-border/60 shadow-inner-tactile rounded-2xl p-5',
    ghost: 'bg-transparent border-none p-0',
  };

  return (
    <div
      className={cn('w-full max-w-2xl flex flex-col gap-4 text-ui select-none', variantClasses[variant], className)}
      {...props}
    >
      {/* Response Text Canvas */}
      <div className="relative text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
        <span>{content}</span>

        {/* Ambient Blinking Streaming Caret */}
        {isStreaming && (
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-4 ml-1 translate-y-0.5 bg-foreground/80 animate-pulse rounded-xs"
          />
        )}
      </div>

      {/* Inline Source Chips Strip */}
      {sources && sources.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {sources.map((src) => (
            <div
              key={src.id}
              onMouseEnter={() => setHoveredSource(src)}
              onMouseLeave={() => setHoveredSource(null)}
              className="relative"
            >
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/60 text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer group'
                )}
              >
                <Globe className="w-3 h-3 text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
                <span className="font-mono text-[11px] font-medium">{src.domain}</span>
                <span className="text-[11px] text-text-muted truncate max-w-[140px]">
                  {src.title}
                </span>
                {src.confidence && (
                  <span className="text-[10px] font-mono text-emerald-500 font-medium ml-0.5">
                    {src.confidence}%
                  </span>
                )}
              </div>

              {/* Hover Source Popover */}
              <AnimatePresence>
                {hoveredSource?.id === src.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 mb-2 w-72 p-3 rounded-xl bg-card border border-border shadow-xl z-20 pointer-events-none text-left"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono text-text-primary font-medium">
                        {src.domain}
                      </span>
                      {src.confidence && (
                        <span className="text-[10px] font-mono text-emerald-500">
                          {src.confidence}% verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-text-primary leading-tight">
                      {src.title}
                    </p>
                    {src.snippet && (
                      <p className="mt-1.5 text-[11px] text-text-muted leading-relaxed line-clamp-3 font-sans">
                        {src.snippet}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Action Toolbar & Follow-up Suggestions */}
      {showActions && (
        <div className="pt-2 border-t border-border/40 flex flex-col gap-3">
          {/* Action Buttons Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy response"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {onRegenerate && (
                <button
                  type="button"
                  onClick={onRegenerate}
                  aria-label="Regenerate response"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleFeedback('positive')}
                aria-label="Good response"
                className={cn(
                  'p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer',
                  feedback === 'positive' && 'text-text-primary bg-secondary'
                )}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('negative')}
                aria-label="Poor response"
                className={cn(
                  'p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer',
                  feedback === 'negative' && 'text-text-primary bg-secondary'
                )}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Follow-up Suggestion Pills */}
          {followUps && followUps.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Suggested Follow-ups
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {followUps.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onFollowUpClick?.(f)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/30 hover:bg-secondary/70 border border-border/50 text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-left group"
                  >
                    <span>{f}</span>
                    <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
