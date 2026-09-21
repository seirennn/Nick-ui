'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Activity01Icon,
  CpuIcon,
  RadioTowerIcon,
  Database01Icon,
  LayerIcon,
  ShieldCheckIcon,
  ComputerTerminal01Icon,
  SlidersHorizontalIcon,
  Search01Icon,
} from '@hugeicons/core-free-icons';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { cn } from '@/lib/utils';

export interface StudioSidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface StudioSidebarGroup {
  category: string;
  items: StudioSidebarItem[];
}

export interface StudioSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  activeId?: string;
  onSelect?: (id: string) => void;
  groups?: StudioSidebarGroup[];
  workspaceName?: string;
  environmentName?: string;
  onSearchClick?: () => void;
  variant?: 'integrated' | 'floating';
  storageQuota?: {
    used: string;
    total: string;
    percentage: number;
  };
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  collapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapsed?: () => void;
}

const DEFAULT_GROUPS: StudioSidebarGroup[] = [
  {
    category: 'CORE PLATFORM',
    items: [
      { id: 'overview', label: 'Operations Overview', icon: Activity01Icon, badge: 'Live' },
      { id: 'clusters', label: 'Nodes & Clusters', icon: CpuIcon },
      { id: 'telemetry', label: 'Revenue Telemetry', icon: RadioTowerIcon },
      { id: 'storage', label: 'Datastores & Pools', icon: Database01Icon },
    ],
  },
  {
    category: 'INFRASTRUCTURE & OPS',
    items: [
      { id: 'deployments', label: 'Pipelines & CI/CD', icon: LayerIcon, badge: 'v0.1.1' },
      { id: 'security', label: 'Access & Compliance', icon: ShieldCheckIcon },
      { id: 'audit', label: 'Consensus Logs', icon: ComputerTerminal01Icon },
      { id: 'config', label: 'System Preferences', icon: SlidersHorizontalIcon },
    ],
  },
];

export const StudioSidebar = React.forwardRef<HTMLElement, StudioSidebarProps>(
  (
    {
      className,
      activeId = 'overview',
      onSelect,
      groups = DEFAULT_GROUPS,
      workspaceName = 'NickUI Core Studio',
      environmentName = 'Production · us-east',
      onSearchClick,
      variant = 'integrated',
      storageQuota = { used: '14.2 GB', total: '20 GB', percentage: 71 },
      user = { name: 'Seiren Architect', role: 'System Admin' },
      collapsible = true,
      isCollapsed: controlledCollapsed,
      onToggleCollapsed,
      ...props
    },
    ref
  ) => {
    const rawId = React.useId();
    const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
    const activeLayoutId = `studioActive-${id}`;

    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(false);
    const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : uncontrolledCollapsed;

    const [selected, setSelected] = React.useState(activeId);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (activeId !== undefined) {
        setSelected(activeId);
      }
    }, [activeId]);

    const handleSelect = (itemId: string) => {
      setSelected(itemId);
      onSelect?.(itemId);
    };

    const handleToggleCollapse = () => {
      if (onToggleCollapsed) {
        onToggleCollapsed();
      } else {
        setUncontrolledCollapsed(!uncontrolledCollapsed);
      }
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'relative flex flex-col justify-between h-full bg-card/95 backdrop-blur-xl transition-all duration-300 ease-out select-none z-30 shrink-0',
          variant === 'integrated' ? 'border-r border-border/80' : 'border border-border/80 rounded-2xl shadow-tactile',
          collapsed ? 'w-[74px]' : 'w-64 sm:w-72',
          className
        )}
        {...props}
      >
        {/* Top Header: Brand & Workspace Switcher */}
        <div className="p-3 border-b border-border/70 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className={cn('flex items-center gap-2.5 min-w-0', collapsed && 'w-full justify-center')}>
              <div className="w-9 h-9 rounded-xl bg-secondary/80 border border-border/70 flex items-center justify-center shadow-tactile shrink-0 p-1">
                <BrandLogo size="xs" variant="minimal" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text-primary tracking-tight truncate">
                    {workspaceName}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted flex items-center gap-1.5 truncate mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{environmentName}</span>
                  </div>
                </div>
              )}
            </div>

            {collapsible && !collapsed && (
              <button
                type="button"
                onClick={handleToggleCollapse}
                className="w-6 h-6 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/70 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-border/60"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Trigger: Full bar when expanded, centered icon tile when collapsed */}
          {!collapsed ? (
            <button
              type="button"
              onClick={onSearchClick}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-border/60 text-xs text-text-muted transition-colors cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={1.5} className="text-text-muted" />
                <span className="text-[11px] font-sans">Command palette...</span>
              </div>
              <kbd className="font-mono text-[9px] px-1.5 py-0.5 rounded-md bg-background border border-border/60 text-text-muted">
                ⌘K
              </kbd>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSearchClick}
              className="w-9 h-9 mx-auto rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-border/60 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer shadow-2xs"
              title="Search commands (⌘K)"
              aria-label="Search commands"
            >
              <HugeiconsIcon icon={Search01Icon} size={15} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Middle: Categorized Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-2 pb-1 text-[10px] font-mono font-medium text-text-muted/80 uppercase tracking-wider">
                  {group.category}
                </div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
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
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          'group relative w-full flex items-center rounded-2xl transition-all cursor-pointer text-left',
                          collapsed ? 'w-11 h-11 mx-auto justify-center' : 'px-2 py-1.5 justify-between gap-3',
                          isActive
                            ? 'text-text-primary font-medium'
                            : 'text-text-secondary hover:text-text-primary hover:bg-secondary/30'
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId={activeLayoutId}
                            className={cn(
                              'absolute rounded-2xl bg-secondary/80 border border-border/70 shadow-2xs -z-10',
                              collapsed ? 'inset-0' : 'inset-0'
                            )}
                            transition={{
                              type: 'spring',
                              stiffness: 450,
                              damping: 35,
                            }}
                          />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Duotoned Rounded Filled Icon Badge */}
                          <div
                            className={cn(
                              'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200',
                              isActive
                                ? 'bg-card text-text-primary border border-border/90 shadow-tactile ring-1 ring-border/40'
                                : 'bg-secondary/60 text-text-muted border border-border/50 group-hover:bg-secondary/90 group-hover:text-text-primary group-hover:border-border/80'
                            )}
                          >
                            {Array.isArray(item.icon) ? (
                              <HugeiconsIcon
                                icon={item.icon}
                                size={17}
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

                          {!collapsed && (
                            <span className="text-xs font-medium tracking-tight truncate">{item.label}</span>
                          )}
                        </div>

                        {!collapsed && item.badge && (
                          <span
                            className={cn(
                              'px-1.5 py-0.5 rounded-md text-[10px] font-mono shrink-0',
                              item.badge === 'Live'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-secondary text-text-muted border border-border/50'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>

                      {/* Floating Architectural Tooltip when Collapsed */}
                      <AnimatePresence>
                        {isHovered && collapsed && (
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-full ml-3 z-50 px-3 py-2 rounded-xl bg-card border border-border/90 text-xs font-sans text-text-primary shadow-tactile whitespace-nowrap pointer-events-none flex items-center gap-2.5 backdrop-blur-md"
                          >
                            <span className="font-medium">{item.label}</span>
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
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Panel: Storage Quota & User Profile */}
        <div className="p-3 border-t border-border/70 space-y-2.5">
          {!collapsed && storageQuota && (
            <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/60 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-text-muted">Compute Quota</span>
                <span className="text-text-primary font-medium">{storageQuota.percentage}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-background/80 shadow-inner-tactile overflow-hidden border border-border/40">
                <div
                  className="h-full bg-text-primary/90 rounded-full transition-all duration-300"
                  style={{ width: `${storageQuota.percentage}%` }}
                />
              </div>
              <div className="text-[10px] font-mono text-text-muted flex items-center justify-between">
                <span>{storageQuota.used}</span>
                <span>{storageQuota.total}</span>
              </div>
            </div>
          )}

          {/* User Row: Full identity when expanded, centered avatar when collapsed */}
          <div
            className={cn(
              'flex items-center rounded-2xl hover:bg-secondary/40 transition-colors cursor-pointer border border-transparent hover:border-border/50',
              collapsed ? 'w-11 h-11 mx-auto justify-center p-0' : 'justify-between p-1.5'
            )}
            title={collapsed ? `${user.name} (${user.role})` : undefined}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-secondary/80 border border-border/70 flex items-center justify-center text-text-primary text-xs font-mono font-medium shrink-0 shadow-2xs">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text-primary tracking-tight truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-text-muted truncate font-sans mt-0.5">
                    {user.role}
                  </div>
                </div>
              )}
            </div>

            {!collapsed && (
              <ChevronDown className="w-3.5 h-3.5 text-text-muted shrink-0 mr-1" />
            )}
          </div>

          {/* Expand Button when Collapsed */}
          {collapsible && collapsed && (
            <button
              type="button"
              onClick={handleToggleCollapse}
              className="w-11 h-7 mx-auto rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors cursor-pointer"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>
    );
  }
);

StudioSidebar.displayName = 'StudioSidebar';
