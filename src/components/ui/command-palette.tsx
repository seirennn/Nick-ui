'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  title: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  items,
  placeholder = 'Type a command or search...',
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  // Group filtered items by category
  const groupedItems = React.useMemo(() => {
    const map: Record<string, { item: CommandItem; originalIndex: number }[]> = {};
    filteredItems.forEach((item, idx) => {
      const cat = item.category || 'General';
      if (!map[cat]) map[cat] = [];
      map[cat].push({ item, originalIndex: idx });
    });
    return map;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-border gap-3">
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent text-ui text-text-primary placeholder:text-text-muted/70 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-text-muted hover:text-text-primary rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-text-muted select-none">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-3">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-metadata text-text-muted">
                  No matching commands found.
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, list]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-2 text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                      {category}
                    </div>
                    {list.map(({ item, originalIndex }) => {
                      const isSelected = selectedIndex === originalIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            item.onSelect();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(originalIndex)}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 rounded-lg text-ui cursor-pointer transition-colors select-none',
                            isSelected
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                          )}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {item.icon && (
                              <span className={cn('shrink-0', isSelected ? 'text-primary-foreground' : 'text-text-muted')}>
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate">{item.title}</span>
                          </div>
                          {item.shortcut && (
                            <span
                              className={cn(
                                'font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0 ml-2',
                                isSelected
                                  ? 'bg-primary-foreground/20 text-primary-foreground'
                                  : 'bg-muted text-text-muted'
                              )}
                            >
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-secondary/30 border-t border-border/60 text-[11px] font-mono text-text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded bg-muted">↑↓</span> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3" /> to select
                </span>
              </div>
              <span>NickUI command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
