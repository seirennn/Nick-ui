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
  collapsible?: boolean;
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
      isExpanded: controlledExpanded,
      onToggleExpanded,
      onCommandClick,
      collapsible = true,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
    const activeLayoutId = `railActive-${id}`;

    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(false);
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded;

    const [selected, setSelected] = React.useState(activeId);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    const handleItemClick = (itemId: string) => {
      setSelected(itemId);
      onSelect?.(itemId);
    };

    const handleToggle = () => {
      if (onToggleExpanded) {
        onToggleExpanded();
      } else {
        setUncontrolledExpanded(!uncontrolledExpanded);
      }
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'relative flex flex-col justify-between py-4',
          isExpanded ? 'w-64' : 'w-16 sm:w-18',
          'h-full bg-card/95 backdrop-blur-xl border-r border-border/80',
          'transition-all duration-300 select-none z-30',
          className
        )}
        {...props}
      >
        {/* Top: Workspace Glyph / Brand */}
        <div className="flex flex-col w-full px-3 gap-3">
          <div
            onClick={collapsible ? handleToggle : undefined}
            className={cn(
              'flex items-center gap-3 p-1.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-border/60 hover:bg-secondary/40',
              !isExpanded && 'justify-center'
            )}
            title={workspaceName}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/80 border border-border/70 flex items-center justify-center shadow-2xs shrink-0 p-1.5">
              {workspaceLogo ? (
                workspaceLogo
              ) : (
                <BrandLogo size="xs" variant="minimal" />
              )}
            </div>

            {isExpanded && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-text-primary tracking-tight truncate">
                  {workspaceName}
                </div>
                <div className="text-[10px] font-mono text-text-muted flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                  <span>Production Cluster</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full border-b border-border/50" />
        </div>

        {/* Middle: Navigation Wells */}
        <nav className="flex flex-col w-full px-2.5 gap-1.5 my-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = selected === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                className="relative w-full flex items-center"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'relative w-full rounded-xl flex items-center transition-colors cursor-pointer text-left',
                    isExpanded ? 'px-3 py-2 justify-between gap-3' : 'w-10 h-10 mx-auto justify-center',
                    isActive
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted hover:text-text-primary hover:bg-secondary/40'
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId={activeLayoutId}
                      className={cn(
                        'absolute rounded-xl bg-secondary border border-border/80 shadow-2xs -z-10',
                        isExpanded ? 'inset-0' : 'inset-0'
                      )}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-text-primary' : 'text-text-muted')} />
                    {isExpanded && (
                      <span className="text-xs truncate">{item.label}</span>
                    )}
                  </div>

                  {/* Badges & Shortcuts in Expanded Mode */}
                  {isExpanded && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-text-muted border border-border/50">
                          {item.badge}
                        </span>
                      )}
                      {item.shortcut && (
                        <span className="text-[9px] font-mono text-text-muted/70">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Subdued badge in Collapsed Mode */}
                  {item.badge && !isExpanded && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary border border-border text-[9px] font-mono text-text-muted flex items-center justify-center shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Floating Architectural Tooltip when Collapsed */}
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

        {/* Bottom: Quick Command Palette Trigger & Collapse Toggle */}
        <div className="flex flex-col w-full px-3 gap-2">
          <div className="w-full border-b border-border/50" />

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onCommandClick}
            className={cn(
              'rounded-xl bg-secondary/50 hover:bg-secondary text-text-muted hover:text-text-primary border border-border/70 flex items-center transition-all cursor-pointer shadow-2xs',
              isExpanded ? 'w-full px-3 py-2 justify-between' : 'w-10 h-10 mx-auto justify-center'
            )}
            title="Open Command Palette (Cmd+K)"
            aria-label="Command Palette"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="text-xs font-sans">Command palette</span>}
            </div>
            {isExpanded && (
              <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-background border border-border/60 text-text-muted">
                ⌘K
              </kbd>
            )}
          </button>

          {/* Collapse/Expand Toggle Button */}
          {collapsible && (
            <button
              type="button"
              onClick={handleToggle}
              className={cn(
                'rounded-xl text-text-muted hover:text-text-primary hover:bg-secondary/40 border border-transparent hover:border-border/60 flex items-center transition-all cursor-pointer',
                isExpanded ? 'w-full px-3 py-1.5 justify-between text-xs font-sans' : 'w-10 h-10 mx-auto justify-center'
              )}
              title={isExpanded ? 'Collapse Rail' : 'Expand Rail'}
              aria-label={isExpanded ? 'Collapse Rail' : 'Expand Rail'}
            >
              {isExpanded && <span className="text-text-muted">Collapse sidebar</span>}
              <ChevronRight className={cn('w-3.5 h-3.5 transition-transform duration-200', isExpanded && 'rotate-180')} />
            </button>
          )}
        </div>
      </aside>
    );
  }
);

RailSidebar.displayName = 'RailSidebar';
