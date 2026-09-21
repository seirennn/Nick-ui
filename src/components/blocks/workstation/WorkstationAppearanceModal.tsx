'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from './SidebarContext';
import { Sparkles, Check, X, Moon, Sun, Terminal, Compass, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  previewBg: string;
  previewBorder: string;
  previewAccent: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Obsidian Dark',
    description: 'Calm environmental shadows with subtle white highlights',
    previewBg: '#101014',
    previewBorder: '#27272a',
    previewAccent: '#ffffff',
  },
  {
    id: 'linen',
    name: 'Warm Linen',
    description: 'Warm editorial beige with organic tactile contrast',
    previewBg: '#f5f2eb',
    previewBorder: '#e2ddd2',
    previewAccent: '#1c1b18',
  },
  {
    id: 'blueprint',
    name: 'Blueprint Slate',
    description: 'Engineering navy and glacial cyan optical tones',
    previewBg: '#0d131a',
    previewBorder: '#1f2f42',
    previewAccent: '#38bdf8',
  },
  {
    id: 'amber',
    name: 'Amber Phosphor',
    description: 'Vintage high-density CRT bronze telemetry palette',
    previewBg: '#120f0a',
    previewBorder: '#2e261a',
    previewAccent: '#f59e0b',
  },
];

export function WorkstationAppearanceModal() {
  const { isAppearanceOpen, setIsAppearanceOpen } = useSidebar();
  const [selectedTheme, setSelectedTheme] = React.useState<string>('dark');

  // Sync with current html theme attributes
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'linen');
      setSelectedTheme(currentTheme);
    }
  }, [isAppearanceOpen]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    if (typeof document !== 'undefined') {
      if (themeId === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.removeAttribute('data-theme');
      } else if (themeId === 'linen') {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', themeId);
      }
    }
  };

  // Close on ESC
  React.useEffect(() => {
    if (!isAppearanceOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAppearanceOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAppearanceOpen, setIsAppearanceOpen]);

  return (
    <AnimatePresence>
      {isAppearanceOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsAppearanceOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#101014] text-neutral-200 shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden z-10 font-sans"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-neutral-300" />
                <h3 className="text-sm font-medium text-white">Workstation Appearance</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAppearanceOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="text-xs text-neutral-400">
                Select an environmental lighting theme. Changes apply across all workstation surfaces.
              </div>

              {/* Theme Grid */}
              <div className="space-y-2">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = selectedTheme === theme.id;

                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleSelectTheme(theme.id)}
                      className={cn(
                        'w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer select-none',
                        isSelected
                          ? 'bg-white/[0.08] border-white/30 shadow-2xs'
                          : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/15'
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Theme Swatch Preview */}
                        <div
                          className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs"
                          style={{
                            backgroundColor: theme.previewBg,
                            borderColor: theme.previewBorder,
                          }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: theme.previewAccent }}
                          />
                        </div>

                        <div className="min-w-0 leading-tight">
                          <div className="text-xs font-medium text-white flex items-center gap-2">
                            <span>{theme.name}</span>
                            {isSelected && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white border border-white/15">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {theme.description}
                          </div>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Shortcut: ⌘T / CTRL+T</span>
              <button
                type="button"
                onClick={() => setIsAppearanceOpen(false)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white font-sans text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
