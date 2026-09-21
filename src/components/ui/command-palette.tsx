'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  CornerDownLeft,
  X,
  ArrowRight,
  Clock,
  Layers,
  Terminal,
  Compass,
  FileText,
  Sliders,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category?: string; // 'Commands' | 'Navigation' | 'AI Prompts' | 'System'
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CommandItem[];
  placeholder?: string;
  onAiPrompt?: (prompt: string) => void;
  defaultMode?: 'commands' | 'ai';
}

export function CommandPalette({
  isOpen,
  onClose,
  items = [
    {
      id: 'cluster-status',
      title: 'Inspect Cluster Telemetry',
      description: 'Review active node status, latency percentiles, and consensus matrix.',
      category: 'Commands',
      shortcut: '⌘C',
      icon: <Layers className="w-4 h-4" />,
      onSelect: () => console.log('Cluster Telemetry'),
    },
    {
      id: 'docs-layout',
      title: 'Switch to Technical Docs Layout',
      description: 'Open three-column technical telemetry layout with sculpted tab notch.',
      category: 'Navigation',
      shortcut: '⌘D',
      icon: <Compass className="w-4 h-4" />,
      onSelect: () => console.log('Docs Layout'),
    },
    {
      id: 'execute-kernel',
      title: 'Run Consensus Verification Kernel',
      description: 'Trigger Catmull-Rom cubic spline verification algorithm.',
      category: 'Commands',
      shortcut: '⌘R',
      icon: <Terminal className="w-4 h-4" />,
      onSelect: () => console.log('Execute Kernel'),
    },
    {
      id: 'ai-analyze-perf',
      title: 'Analyze Performance Bottlenecks with AI',
      description: 'Generate reasoning trace on current frame drop rates.',
      category: 'AI Prompts',
      shortcut: '⌘A',
      icon: <Sparkles className="w-4 h-4" />,
      onSelect: () => console.log('AI Performance Analysis'),
    },
    {
      id: 'settings-haptic',
      title: 'Haptic & Tactile Depth Settings',
      description: 'Tune rotary dials, spring tension, and recessed chassis contrast.',
      category: 'System',
      shortcut: '⌘,',
      icon: <Sliders className="w-4 h-4" />,
      onSelect: () => console.log('Settings'),
    },
  ],
  placeholder = 'Search commands or press Tab for AI mode...',
  onAiPrompt,
  defaultMode = 'commands',
}: CommandPaletteProps) {
  const [mode, setMode] = React.useState<'commands' | 'ai'>(defaultMode);
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setMode(defaultMode);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, defaultMode]);

  // Global Cmd+K trigger
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Categories extraction
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        !query.trim() ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [items, query, selectedCategory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setMode((prev) => (prev === 'commands' ? 'ai' : 'commands'));
      setQuery('');
      setSelectedIndex(0);
      return;
    }

    if (mode === 'ai' && e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        onAiPrompt?.(query);
        onClose();
      }
      return;
    }

    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        selected.onSelect();
        onClose();
      }
    }
  };

  const activeItem = filteredItems[selectedIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop with atmospheric blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
          />

          {/* Palette Dialog Chassis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-card border border-border/80 shadow-2xl rounded-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Top Mode Pill Switcher & Search Bar */}
            <div className="p-3 border-b border-border/60 bg-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center p-0.5 rounded-lg bg-secondary/70 border border-border/50 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setMode('commands')}
                    className={cn(
                      'px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5',
                      mode === 'commands'
                        ? 'bg-card text-text-primary shadow-2xs font-semibold'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Search className="w-3 h-3" />
                    <span>Commands</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('ai')}
                    className={cn(
                      'px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5',
                      mode === 'ai'
                        ? 'bg-card text-text-primary shadow-2xs font-semibold'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Sparkles className="w-3 h-3 text-text-primary" />
                    <span>Ask AI</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-text-muted ml-auto hidden sm:inline-block">
                  Press <kbd className="px-1 py-0.5 rounded bg-secondary/80 border border-border/60">Tab</kbd> to switch mode
                </span>
              </div>

              {/* Recessed Search Input Well */}
              <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-background border border-border/70 shadow-inner-tactile gap-3">
                {mode === 'ai' ? (
                  <Sparkles className="w-4 h-4 text-text-primary shrink-0 animate-pulse" />
                ) : (
                  <Search className="w-4 h-4 text-text-muted shrink-0" />
                )}
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    mode === 'ai'
                      ? 'Ask AI to generate, optimize, or explain anything...'
                      : placeholder
                  }
                  className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-text-muted hover:text-text-primary rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary text-text-muted select-none border border-border/40">
                  ESC
                </span>
              </div>

              {/* Category Filter Chips (in Commands mode) */}
              {mode === 'commands' && (
                <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedIndex(0);
                      }}
                      className={cn(
                        'px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer shrink-0',
                        selectedCategory === cat
                          ? 'bg-secondary text-text-primary border border-border/60 shadow-2xs'
                          : 'text-text-muted hover:text-text-primary hover:bg-secondary/40'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content Area */}
            {mode === 'commands' ? (
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/60">
                {/* Results List (Left 3 cols) */}
                <div className="md:col-span-3 max-h-80 overflow-y-auto p-2 space-y-1">
                  {filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-xs font-mono text-text-muted">
                      No matching commands found.
                    </div>
                  ) : (
                    filteredItems.map((item, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            item.onSelect();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={cn(
                            'flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all',
                            isSelected
                              ? 'bg-secondary/80 border border-border/80 shadow-2xs'
                              : 'hover:bg-secondary/30 border border-transparent'
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="text-text-muted shrink-0">
                              {item.icon || <Terminal className="w-4 h-4" />}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-text-primary truncate">
                                {item.title}
                              </span>
                              {item.category && (
                                <span className="text-[10px] font-mono text-text-muted">
                                  {item.category}
                                </span>
                              )}
                            </div>
                          </div>

                          {item.shortcut && (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary/80 text-text-muted border border-border/40 shrink-0 ml-2">
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Item Details Preview Pane (Right 2 cols) */}
                <div className="md:col-span-2 p-4 bg-secondary/10 flex flex-col justify-between hidden md:flex">
                  {activeItem ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-text-muted">
                        {activeItem.icon}
                        <span className="text-[11px] font-mono uppercase tracking-wider">
                          {activeItem.category || 'Command'}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-text-primary leading-snug">
                        {activeItem.title}
                      </h4>
                      {activeItem.description && (
                        <p className="text-xs text-text-muted leading-relaxed font-sans">
                          {activeItem.description}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-xs text-text-muted font-mono">
                      Select a command to inspect
                    </div>
                  )}

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
                    <span>Press <kbd className="px-1 py-0.5 rounded bg-secondary">↵</kbd> to run</span>
                    <span><kbd className="px-1 py-0.5 rounded bg-secondary">↑↓</kbd> navigate</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Ask AI Mode View */
              <div className="p-6 flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-xs font-semibold text-text-primary">
                      AI System Copilot
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      Type any prompt or question above and press <kbd className="font-mono text-[10px] px-1 rounded bg-secondary">Enter</kbd> to initiate streaming synthesis.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Suggested Quick Prompts
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Benchmark latency on Catmull-Rom spline',
                      'Audit L2 orderbook liquidity spread',
                      'Simulate cluster node failover scenario',
                      'Generate TypeScript types for metric cards',
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuery(prompt);
                          inputRef.current?.focus();
                        }}
                        className="text-left p-2.5 rounded-xl bg-secondary/20 hover:bg-secondary/50 border border-border/40 text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <span className="truncate">{prompt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
