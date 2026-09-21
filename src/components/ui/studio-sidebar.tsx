'use client';

import * as React from 'react';
import Link from 'next/link';
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
      storageQuota = { used: '14.2 GB', total: '20 GB', percentage: 71 },
      user = { name: 'Seiren Architect', role: 'System Admin' },
      collapsible = true,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState(activeId);
    const [collapsed, setCollapsed] = React.useState(false);
    const layoutId = React.useId();

    const handleSelect = (id: string) => {
      setSelected(id);
      onSelect?.(id);
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'relative flex flex-col justify-between h-full bg-card/90 backdrop-blur-sm border-r border-border/80 transition-all duration-300 select-none z-30',
          collapsed ? 'w-16 sm:w-20' : 'w-64 sm:w-72',
          className
        )}
        {...props}
      >
        {/* Top Header: Brand & Workspace Switcher */}
        <div className="p-3.5 border-b border-border/70 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <BrandLogo size="sm" variant="tactile" className="shrink-0" />
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text-primary tracking-tight truncate">
                    {workspaceName}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                    <span className="truncate">{environmentName}</span>
                  </div>
                </div>
              )}
            </div>

            {collapsible && (
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="w-6 h-6 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-secondary/70 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-border/60"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Search Trigger */}
          {!collapsed && (
            <button
              type="button"
              onClick={onSearchClick}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-secondary/40 hover:bg-secondary/70 border border-border/60 text-xs text-text-muted transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={1.5} className="text-text-muted" />
                <span className="text-[11px] font-sans">Command palette...</span>
              </div>
              <kbd className="font-mono text-[9px] px-1 py-0.5 rounded bg-background/80 border border-border/60 text-text-muted">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Middle: Categorized Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-5">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-2 pb-1 text-[10px] font-mono font-medium text-text-muted/80 uppercase tracking-wider">
                  {group.category}
                </div>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = selected === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left',
                        collapsed ? 'justify-center px-0' : 'justify-between',
                        isActive
                          ? 'text-text-primary font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-secondary/40'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId={`studio-active-indicator-${layoutId}`}
                          className="absolute inset-0 rounded-xl bg-secondary/80 border border-border/80 shadow-2xs -z-10"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 34,
                          }}
                        />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0">
                        {Array.isArray(item.icon) ? (
                          <HugeiconsIcon
                            icon={item.icon}
                            size={16}
                            strokeWidth={1.5}
                            className={cn('shrink-0 transition-colors', isActive ? 'text-text-primary' : 'text-text-muted')}
                          />
                        ) : React.isValidElement(item.icon) ? (
                          item.icon
                        ) : typeof item.icon === 'function' ? (
                          <item.icon className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-text-primary' : 'text-text-muted')} />
                        ) : null}
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {!collapsed && item.badge && (
                        <span
                          className={cn(
                            'px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0',
                            item.badge === 'Live'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-secondary text-text-muted border border-border/50'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Panel: Storage Quota & User Profile */}
        <div className="p-3 border-t border-border/70 space-y-3">
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

          {/* User Row */}
          <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer border border-transparent hover:border-border/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-secondary border border-border/70 flex items-center justify-center text-text-primary text-xs font-mono font-medium shrink-0">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-medium text-text-primary tracking-tight truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-text-muted truncate font-sans">
                    {user.role}
                  </div>
                </div>
              )}
            </div>

            {!collapsed && (
              <ChevronDown className="w-3.5 h-3.5 text-text-muted shrink-0" />
            )}
          </div>
        </div>
      </aside>
    );
  }
);

StudioSidebar.displayName = 'StudioSidebar';
