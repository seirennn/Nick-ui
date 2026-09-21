'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from './SidebarContext';
import {
  Search,
  Command,
  Maximize2,
  Columns,
  LayoutGrid,
  Clock,
  Home,
  Wallet,
  Activity,
  Workflow,
  BarChart3,
  Shield,
  Terminal,
  Moon,
  Sun,
  Sliders,
  Palette,
  ArrowRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function WorkstationCommandPalette() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setActiveNav,
    setSplitLayout,
    setTimeframe,
    setIsAppearanceOpen,
    toggleCollapsed,
  } = useSidebar();

  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const commands = [
    // Navigation
    { id: 'nav-overview', group: 'Navigation', label: 'Overview & Mission', icon: Home, action: () => setActiveNav('overview') },
    { id: 'nav-accounts', group: 'Navigation', label: 'Multi-Cluster Accounts', icon: Wallet, action: () => setActiveNav('accounts') },
    { id: 'nav-strategies', group: 'Navigation', label: 'Algorithmic Strategies', icon: Activity, action: () => setActiveNav('strategies') },
    { id: 'nav-execution', group: 'Navigation', label: 'Zero-Loss Routing Engine', icon: Workflow, action: () => setActiveNav('execution') },
    { id: 'nav-telemetry', group: 'Navigation', label: 'Telemetry Stream', icon: BarChart3, action: () => setActiveNav('analytics') },
    { id: 'nav-terminal', group: 'Navigation', label: 'Cluster Logs Terminal', icon: Terminal, action: () => setActiveNav('terminal') },

    // Layout
    { id: 'layout-1', group: 'Layout Modes', label: 'Switch to Focus Mode (1-Pane)', icon: Maximize2, action: () => setSplitLayout('1-pane') },
    { id: 'layout-2', group: 'Layout Modes', label: 'Switch to Split LR (2-Pane)', icon: Columns, action: () => setSplitLayout('2-split') },
    { id: 'layout-3', group: 'Layout Modes', label: 'Switch to Command Matrix (3-Pane)', icon: LayoutGrid, action: () => setSplitLayout('3-pane') },

    // Timeframe
    { id: 'tf-1m', group: 'Timeframe', label: 'Set Timeframe: 1 Minute', icon: Clock, action: () => setTimeframe('1M') },
    { id: 'tf-5m', group: 'Timeframe', label: 'Set Timeframe: 5 Minutes', icon: Clock, action: () => setTimeframe('5M') },
    { id: 'tf-1h', group: 'Timeframe', label: 'Set Timeframe: 1 Hour', icon: Clock, action: () => setTimeframe('1H') },
    { id: 'tf-1d', group: 'Timeframe', label: 'Set Timeframe: 1 Day', icon: Clock, action: () => setTimeframe('1D') },

    // Actions
    { id: 'act-collapse', group: 'Actions', label: 'Toggle Sidebar Collapse', icon: Sliders, action: () => toggleCollapsed() },
    { id: 'act-appearance', group: 'Actions', label: 'Customize Themes & Appearance', icon: Palette, shortcut: '⌘T', action: () => setIsAppearanceOpen(true) },
  ];

  const filteredCommands = query
    ? commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.group.toLowerCase().includes(query.toLowerCase()))
    : commands;

  // Keyboard navigation
  React.useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsSearchOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, filteredCommands, selectedIndex, setIsSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#101014] text-neutral-200 shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden z-10 flex flex-col font-sans"
          >
            {/* Search Input Bar */}
            <div className="px-4 py-3.5 border-b border-white/[0.08] flex items-center gap-3 bg-white/[0.02]">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search console..."
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-white/[0.06] border border-white/[0.08]">
                ESC
              </kbd>
            </div>

            {/* Command Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-400">
                  No commands found matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;

                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => {
                        cmd.action();
                        setIsSearchOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer text-left select-none',
                        isSelected
                          ? 'bg-white/[0.09] text-white font-medium border border-white/[0.08]'
                          : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                            isSelected ? 'bg-white/10 text-white' : 'bg-white/[0.04] text-neutral-400'
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{cmd.label}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          {cmd.group}
                        </span>
                        {cmd.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-white/[0.06] border border-white/[0.08]">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="px-4 py-2 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <span>Axiom Console v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
