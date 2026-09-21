'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  RotateCcw,
  ChevronDown,
  CheckCircle2,
  Clock,
  Search,
  Code2,
  Terminal,
  Activity,
  Copy,
  Check,
  Layers,
  ArrowRight,
} from 'lucide-react';

export type ThinkingStatus = 'thinking' | 'completed' | 'idle';
export type ThinkingTab = 'steps' | 'reasoning' | 'search' | 'code';

export interface ThinkingStep {
  id: string;
  title: string;
  description?: string;
  status: 'done' | 'active' | 'pending';
  duration?: string;
  tool?: string;
}

export interface ThinkingSearchQuery {
  query: string;
  resultsCount: number;
  sources: string[];
}

export interface ThinkingCodeExecution {
  language: string;
  code: string;
  output?: string;
  duration?: string;
}

export interface AiThinkingProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: ThinkingStatus;
  duration?: string;
  initialExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  activeTab?: ThinkingTab;
  onTabChange?: (tab: ThinkingTab) => void;
  steps?: ThinkingStep[];
  reasoningText?: string;
  searchQueries?: ThinkingSearchQuery[];
  codeExecutions?: ThinkingCodeExecution[];
  variant?: 'tactile' | 'recessed';
}

export function AiThinking({
  status = 'completed',
  duration = '4.2s',
  initialExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  activeTab: controlledTab,
  onTabChange,
  steps = [
    { id: '1', title: 'Parse telemetry constraints', status: 'done', duration: '120ms' },
    { id: '2', title: 'Synthesize optimal execution kernel', status: 'done', duration: '480ms' },
    { id: '3', title: 'Run static validation against consensus matrix', status: 'done', duration: '310ms' },
  ],
  reasoningText = 'The query requests an architectural verification model. Evaluating boundary conditions reveals that memory bandwidth constraints require Catmull-Rom interpolation rather than linear sampling to prevent high-frequency aliasing.',
  searchQueries = [
    { query: 'Catmull-Rom cubic spline interpolation precision', resultsCount: 14, sources: ['kernel.org', 'arxiv.org'] },
  ],
  codeExecutions = [
    {
      language: 'typescript',
      code: 'function spline(p0: number, p1: number, p2: number, p3: number, t: number): number {\n  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t);\n}',
      output: '=> Benchmark: 0.14μs per point (10,000 samples)',
      duration: '14ms',
    },
  ],
  variant = 'tactile',
  className,
  ...props
}: AiThinkingProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(initialExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const [internalTab, setInternalTab] = React.useState<ThinkingTab>('steps');
  const currentTab = controlledTab !== undefined ? controlledTab : internalTab;

  const [copiedCode, setCopiedCode] = React.useState(false);

  const toggleExpand = () => {
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onExpandedChange?.(next);
  };

  const handleTabSelect = (tab: ThinkingTab) => {
    if (controlledTab === undefined) {
      setInternalTab(tab);
    }
    onTabChange?.(tab);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const variantClasses = {
    tactile: 'bg-card border border-border/80 shadow-tactile',
    recessed: 'bg-secondary/40 border border-border/60 shadow-inner-tactile',
  };

  return (
    <div
      className={cn(
        'w-full max-w-2xl rounded-2xl transition-all overflow-hidden select-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={toggleExpand}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-secondary/30 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          {/* Status Indicator Icon */}
          <div className="relative flex items-center justify-center w-5 h-5 rounded-md bg-secondary/80 border border-border/60 text-text-muted">
            {status === 'thinking' ? (
              <RotateCcw className="w-3 h-3 text-text-primary animate-spin" strokeWidth={1.5} />
            ) : (
              <Activity className="w-3 h-3 text-text-primary" strokeWidth={1.5} />
            )}
          </div>

          {/* Title & Duration */}
          <span className="text-xs font-medium text-text-primary tracking-tight">
            {status === 'thinking' ? 'Reasoning in progress...' : `Thought for ${duration}`}
          </span>

          {status === 'thinking' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
        </div>

        <div className="flex items-center gap-2 text-text-muted group-hover:text-text-primary transition-colors">
          <span className="text-[11px] font-mono">
            {isExpanded ? 'Collapse' : 'Inspect trace'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Trace Drawer */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border/60 overflow-hidden"
          >
            {/* Stage Tabs Bar */}
            <div className="px-4 pt-3 pb-2 flex items-center gap-1.5 border-b border-border/40 overflow-x-auto">
              {[
                { id: 'steps', label: 'Steps', count: steps.length },
                { id: 'reasoning', label: 'Reasoning' },
                { id: 'search', label: 'Search', count: searchQueries.length },
                { id: 'code', label: 'Code Execution', count: codeExecutions.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id as ThinkingTab)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5',
                    currentTab === tab.id
                      ? 'bg-secondary text-text-primary shadow-2xs border border-border/60'
                      : 'text-text-muted hover:text-text-primary hover:bg-secondary/40'
                  )}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="font-mono text-[9px] px-1 rounded bg-secondary/80 text-text-muted">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Stage Body Content */}
            <div className="p-4">
              {/* Tab: Steps */}
              {currentTab === 'steps' && (
                <div className="space-y-2.5">
                  {steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-secondary/20 border border-border/40 text-xs"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="mt-0.5 shrink-0">
                          {step.status === 'done' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : step.status === 'active' ? (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-border" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-text-primary leading-tight">
                            {step.title}
                          </span>
                          {step.description && (
                            <span className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                              {step.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {step.duration && (
                        <span className="font-mono text-[10px] text-text-muted shrink-0 px-1.5 py-0.5 rounded bg-secondary/60">
                          {step.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Reasoning */}
              {currentTab === 'reasoning' && (
                <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/40">
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-normal italic">
                    "{reasoningText}"
                  </p>
                </div>
              )}

              {/* Tab: Search */}
              {currentTab === 'search' && (
                <div className="space-y-2.5">
                  {searchQueries.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-secondary/20 border border-border/40 space-y-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-text-primary">
                        <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <span className="truncate">"{s.query}"</span>
                        <span className="ml-auto text-[10px] text-text-muted font-sans shrink-0">
                          {s.resultsCount} results
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {s.sources.map((src, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-secondary/60 border border-border/40 text-[10px] font-mono text-text-muted"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Code Execution */}
              {currentTab === 'code' && (
                <div className="space-y-3">
                  {codeExecutions.map((exec, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-secondary/20 border border-border/40 overflow-hidden font-mono text-xs"
                    >
                      <div className="px-3 py-2 bg-secondary/40 border-b border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] text-text-muted">
                          <Code2 className="w-3.5 h-3.5" />
                          <span className="uppercase">{exec.language}</span>
                          {exec.duration && <span>· {exec.duration}</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(exec.code)}
                          className="flex items-center gap-1 text-[10px] text-text-muted hover:text-text-primary cursor-pointer transition-colors"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3 text-[11px] text-text-primary overflow-x-auto leading-relaxed">
                        <code>{exec.code}</code>
                      </pre>

                      {exec.output && (
                        <div className="px-3 py-2 bg-secondary/60 border-t border-border/40 text-[11px] text-text-muted">
                          {exec.output}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
