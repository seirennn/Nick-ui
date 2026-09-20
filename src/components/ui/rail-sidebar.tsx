'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  BarChart3,
  Server,
  Shield,
  Layers,
  Sliders,
  Terminal,
  ChevronRight,
  Zap,
  Activity,
  Search,
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { cn } from '@/lib/utils';

export interface RailNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  badge?: string;
}

export interface RailSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  activeId?: string;
  onSelect?: (id: string) => void;
  items?: RailNavItem[];
  workspaceName?: string;
  workspaceGlyph?: string;
  workspaceLogo?: React.ReactNode;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  onCommandClick?: () => void;
}

const DEFAULT_RAIL_ITEMS: RailNavItem[] = [
  { id: 'overview', label: 'Operations & KPIs', icon: LayoutGrid, shortcut: '⌘1' },
  { id: 'analytics', label: 'Revenue Telemetry', icon: BarChart3, shortcut: '⌘2' },
  { id: 'nodes', label: 'Cluster Infrastructure', icon: Server, shortcut: '⌘3', badge: '12' },
  { id: 'security', label: 'Access & Compliance', icon: Shield, shortcut: '⌘4' },
  { id: 'deployments', label: 'Release Pipeline', icon: Layers, shortcut: '⌘5' },
  { id: 'config', label: 'System Configuration', icon: Sliders, shortcut: '⌘6' },
];

export const RailSidebar = React.forwardRef<HTMLElement, RailSidebarProps>(
  (
    {
      className,
      activeId = 'overview',
      onSelect,
      items = DEFAULT_RAIL_ITEMS,
      workspaceName = 'NickUI Core Studio',
      workspaceGlyph = 'N',
      workspaceLogo,
      isExpanded = false,
      onToggleExpanded,
      onCommandClick,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState(activeId);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    const handleItemClick = (id: string) => {
      setSelected(id);
      onSelect?.(id);
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'relative flex flex-col items-center justify-between py-5',
          isExpanded ? 'w-64' : 'w-16 sm:w-18',
          'h-full bg-card/90 backdrop-blur-xl border-r border-border/80',
          'transition-all duration-300 select-none z-30',
          className
        )}
        {...props}
      >
        {/* Top: Workspace Glyph / Brand */}
        <div className="flex flex-col items-center w-full px-3 gap-4">
          <div
            onClick={onToggleExpanded}
            className="w-10 h-10 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shadow-2xs cursor-pointer hover:border-text-primary/40 transition-all p-1.5"
            title={workspaceName}
          >
            {workspaceLogo ? (
              workspaceLogo
            ) : (
              <BrandLogo size="xs" variant="minimal" />
            )}
          </div>

          <div className="w-8 border-b border-border/60" />
        </div>

        {/* Middle: Navigation Wells */}
        <nav className="flex flex-col items-center w-full px-2.5 gap-2 my-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = selected === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="relative w-full flex items-center justify-center"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer',
                    isActive
                      ? 'bg-secondary text-text-primary shadow-xs border border-border'
                      : 'text-text-muted hover:text-text-primary hover:bg-secondary/50'
                  )}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />

                  {/* Active Indicator Bar on left edge */}
                  {isActive && (
                    <motion.div
                      layoutId="railActiveIndicator"
                      className="absolute -left-2 w-1 h-5 rounded-r-full bg-text-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  {/* Subdued badge count */}
                  {item.badge && !isExpanded && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-card" />
                  )}
                </button>

                {/* Floating Tooltip for Compact Mode */}
                {!isExpanded && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-14 z-50 px-3 py-1.5 rounded-lg bg-popover text-popover-foreground border border-border shadow-md whitespace-nowrap flex items-center gap-2.5 pointer-events-none"
                  >
                    <span className="text-xs font-medium">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                        {item.shortcut}
                      </kbd>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Status & Quick Commands */}
        <div className="flex flex-col items-center w-full px-3 gap-3">
          {/* Quick command search trigger */}
          <button
            type="button"
            onClick={onCommandClick}
            aria-label="Quick Command (⌘K)"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer border border-transparent hover:border-border/60"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Live stream heartbeat pulse */}
          <div
            className="w-10 h-10 rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-center text-emerald-500"
            title="System Telemetry: Nominal"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
        </div>
      </aside>
    );
  }
);

RailSidebar.displayName = 'RailSidebar';
