'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  BarChartIcon,
  ServerStack01Icon,
  Shield01Icon,
  LayerIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
} from '@hugeicons/core-free-icons';
import { ChevronRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { cn } from '@/lib/utils';

export interface RailNavItem {
  id: string;
  label: string;
  icon: any;
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
  { id: 'overview', label: 'Operations & KPIs', icon: DashboardSquare01Icon, shortcut: '⌘1' },
  { id: 'analytics', label: 'Revenue Telemetry', icon: BarChartIcon, shortcut: '⌘2' },
  { id: 'nodes', label: 'Cluster Infrastructure', icon: ServerStack01Icon, shortcut: '⌘3', badge: '12' },
  { id: 'security', label: 'Access & Compliance', icon: Shield01Icon, shortcut: '⌘4' },
  { id: 'deployments', label: 'Release Pipeline', icon: LayerIcon, shortcut: '⌘5' },
  { id: 'config', label: 'System Configuration', icon: SlidersHorizontalIcon, shortcut: '⌘6' },
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

    // Keep internal selected state synchronized with controlled activeId
    React.useEffect(() => {
      if (activeId !== undefined) {
        setSelected(activeId);
      }
    }, [activeId]);

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
          'relative flex flex-col justify-between py-3.5',
          isExpanded ? 'w-64 sm:w-68' : 'w-[74px]',
          'h-full bg-card/95 backdrop-blur-xl border-r border-border/80',
          'transition-all duration-300 ease-out select-none z-30 shrink-0',
          className
        )}
        {...props}
      >
        {/* Top: Workspace Brand Tile */}
        <div className="flex flex-col w-full px-3 gap-3">
          <div
            onClick={collapsible ? handleToggle : undefined}
            className={cn(
              'group flex items-center gap-3 p-1.5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-border/60 hover:bg-secondary/40',
              !isExpanded && 'justify-center'
            )}
            title={workspaceName}
          >
            {/* Tactile Rounded Brand Tile */}
            <div className="w-11 h-11 rounded-2xl bg-secondary/80 border border-border/70 flex items-center justify-center shadow-tactile shrink-0 p-1.5 transition-transform duration-200 group-hover:scale-[1.02]">
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
                <div className="text-[10px] font-mono text-text-muted flex items-center gap-1.5 truncate mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Production Cluster</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full border-b border-border/50" />
        </div>

        {/* Middle: Navigation Items with Duotoned Rounded Filled Badges */}
        <nav className="flex flex-col w-full px-2.5 gap-2 my-auto">
          {items.map((item) => {
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
                    'group relative w-full rounded-2xl flex items-center transition-all cursor-pointer text-left',
                    isExpanded ? 'px-2.5 py-2 justify-between gap-3' : 'w-11 h-11 mx-auto justify-center',
                    isActive
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted hover:text-text-primary hover:bg-secondary/30'
                  )}
                  aria-label={item.label}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <motion.div
                      layoutId={activeLayoutId}
                      className={cn(
                        'absolute rounded-2xl bg-secondary/80 border border-border/70 shadow-2xs -z-10',
                        isExpanded ? 'inset-0' : 'inset-0'
                      )}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    {/* Duotoned Rounded Filled Icon Badge */}
                    <div
                      className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200',
                        isActive
                          ? 'bg-card text-text-primary border border-border/90 shadow-tactile ring-1 ring-border/40'
                          : 'bg-secondary/60 text-text-muted border border-border/50 group-hover:bg-secondary/90 group-hover:text-text-primary group-hover:border-border/80'
                      )}
                    >
                      {Array.isArray(item.icon) ? (
                        <HugeiconsIcon
                          icon={item.icon}
                          size={18}
                          strokeWidth={1.5}
                          primaryColor="currentColor"
                          secondaryColor="rgba(var(--foreground-rgb), 0.45)"
                          className="shrink-0 transition-colors"
                        />
                      ) : React.isValidElement(item.icon) ? (
                        item.icon
                      ) : typeof item.icon === 'function' ? (
                        <item.icon className="w-4 h-4 shrink-0 transition-colors" />
                      ) : null}
                    </div>

                    {isExpanded && (
                      <span className="text-xs font-medium tracking-tight truncate">{item.label}</span>
                    )}
                  </div>

                  {/* Badges & Shortcuts in Expanded Mode */}
                  {isExpanded && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-secondary text-text-muted border border-border/50">
                          {item.badge}
                        </span>
                      )}
                      {item.shortcut && (
                        <span className="text-[9px] font-mono text-text-muted/60">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Subdued Badge in Collapsed Mode */}
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
                      className="absolute left-full ml-3 z-50 px-3 py-2 rounded-xl bg-card border border-border/90 text-xs font-sans text-text-primary shadow-tactile whitespace-nowrap pointer-events-none flex items-center gap-2.5 backdrop-blur-md"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] font-mono text-text-muted bg-secondary px-1.5 py-0.5 rounded border border-border/50">
                          {item.shortcut}
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.badge}
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

          {/* Command Palette Trigger with Tactile Badge */}
          <button
            type="button"
            onClick={onCommandClick}
            className={cn(
              'group rounded-2xl bg-secondary/40 hover:bg-secondary/70 text-text-muted hover:text-text-primary border border-border/60 flex items-center transition-all cursor-pointer shadow-2xs',
              isExpanded ? 'w-full px-2.5 py-2 justify-between' : 'w-11 h-11 mx-auto justify-center'
            )}
            title="Open Command Palette (Cmd+K)"
            aria-label="Command Palette"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center shrink-0 group-hover:border-border/80">
                <HugeiconsIcon icon={TerminalIcon} size={14} strokeWidth={1.5} className="shrink-0 text-text-muted group-hover:text-text-primary" />
              </div>
              {isExpanded && <span className="text-xs font-sans font-medium">Command palette</span>}
            </div>
            {isExpanded && (
              <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-background border border-border/60 text-text-muted">
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
                isExpanded ? 'w-full px-3 py-1.5 justify-between text-xs font-sans' : 'w-11 h-8 mx-auto justify-center'
              )}
              title={isExpanded ? 'Collapse Rail' : 'Expand Rail'}
              aria-label={isExpanded ? 'Collapse Rail' : 'Expand Rail'}
            >
              {isExpanded && <span className="text-text-muted text-[11px]">Collapse sidebar</span>}
              <ChevronRight className={cn('w-3.5 h-3.5 transition-transform duration-200', isExpanded && 'rotate-180')} />
            </button>
          )}
        </div>
      </aside>
    );
  }
);

RailSidebar.displayName = 'RailSidebar';
