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
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
    const activeLayoutId = `railActive-${id}`;

    const [selected, setSelected] = React.useState(activeId);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    const handleItemClick = (itemId: string) => {
      setSelected(itemId);
      onSelect?.(itemId);
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
        <div className="flex flex-col items-center w-full px-3 gap-3.5">
          <div
            onClick={onToggleExpanded}
            className="w-10 h-10 rounded-xl bg-secondary/80 border border-border/70 flex items-center justify-center shadow-2xs cursor-pointer hover:border-text-primary/40 transition-all p-1.5"
            title={workspaceName}
          >
            {workspaceLogo ? (
              workspaceLogo
            ) : (
              <BrandLogo size="xs" variant="minimal" />
            )}
          </div>

          <div className="w-8 border-b border-border/50" />
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
                      ? 'bg-secondary text-text-primary shadow-xs border border-border/90'
                      : 'text-text-muted hover:text-text-primary hover:bg-secondary/50'
                  )}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />

                  {/* Active Indicator Bar on left edge */}
                  {isActive && (
                    <motion.div
                      layoutId={activeLayoutId}
                      className="absolute -left-2 w-1 h-5 rounded-r-full bg-text-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  {/* Subdued badge count */}
                  {item.badge && !isExpanded && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary border border-border text-[9px] font-mono text-text-muted flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Floating Architectural Tooltip */}
                <AnimatePresence>
                  {isHovered && !isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-3 z-50 px-3 py-1.5 rounded-lg bg-card border border-border/90 text-xs font-mono text-text-primary shadow-tactile whitespace-nowrap pointer-events-none flex items-center gap-2"
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] text-text-muted bg-secondary px-1.5 py-0.5 rounded border border-border/50">
                          {item.shortcut}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Bottom: Quick Command Palette Trigger */}
        <div className="flex flex-col items-center w-full px-3 gap-3">
          <div className="w-8 border-b border-border/50" />

          <button
            type="button"
            onClick={onCommandClick}
            className="w-10 h-10 rounded-xl bg-secondary/60 hover:bg-secondary text-text-muted hover:text-text-primary border border-border/70 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title="Open Command Palette (Cmd+K)"
            aria-label="Command Palette"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }
);

RailSidebar.displayName = 'RailSidebar';
