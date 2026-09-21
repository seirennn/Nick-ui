'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useSidebar,
  SIDEBAR_MIN_WIDTH,
  SIDEBAR_MAX_WIDTH,
} from './SidebarContext';
import {
  Command,
  Keyboard,
  Minimize2,
  Maximize2,
  ChevronDown,
  ChevronRight,
  Home,
  Wallet,
  Activity,
  Zap,
  BarChart3,
  Shield,
  Terminal,
  Search,
  Settings,
  User,
  LogOut,
  Sparkles,
  Download,
  CheckCircle2,
  Heart,
  Moon,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'ai' | 'live';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function WorkstationSidebar() {
  const {
    isCollapsed,
    setIsCollapsed,
    sidebarWidth,
    setSidebarWidth,
    isMobile,
    isMobileOpen,
    setIsMobileOpen,
    isDesktopHoverOpen,
    setIsDesktopHoverOpen,
    setIsSearchOpen,
    setIsAppearanceOpen,
    workspaceMode,
    setWorkspaceMode,
    activeNav,
    setActiveNav,
  } = useSidebar();

  const [isResizing, setIsResizing] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Handle drag-resizing
  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || isCollapsed) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.max(
        SIDEBAR_MIN_WIDTH,
        Math.min(SIDEBAR_MAX_WIDTH, startWidth + (moveEvent.clientX - startX))
      );
      setSidebarWidth(nextWidth);
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
      setIsResizing(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });
  };

  // On desktop, collapsed sidebar becomes a floating hover panel when hovered
  const isFloatingHoverPanel = !isMobile && isCollapsed && isDesktopHoverOpen;
  const effectiveWidth = isCollapsed ? 64 : sidebarWidth;

  const coreSections: NavSection[] = [
    {
      title: 'Core Systems',
      items: [
        { id: 'overview', label: 'Overview & Mission', icon: Home, badge: 'Live', badgeVariant: 'live' },
        { id: 'accounts', label: 'Multi-Cluster Accounts', icon: Wallet, badge: '4' },
        { id: 'strategies', label: 'Algorithmic Strategies', icon: Activity },
        { id: 'execution', label: 'Zero-Loss Routing', icon: Zap, badge: '99.9%', badgeVariant: 'live' },
      ],
    },
    {
      title: 'Analysis & Tools',
      items: [
        { id: 'analytics', label: 'Telemetry Stream', icon: BarChart3 },
        { id: 'governance', label: 'Security & Audit', icon: Shield },
        { id: 'terminal', label: 'Cluster Logs', icon: Terminal },
      ],
    },
  ];

  return (
    <>
      {/* Edge-Hover Detection Trigger Strip (Desktop Only) */}
      {!isMobile && isCollapsed && !isDesktopHoverOpen && (
        <div
          onMouseEnter={() => setIsDesktopHoverOpen(true)}
          className="absolute inset-y-0 left-0 w-4 z-40 cursor-pointer"
          title="Hover to reveal workstation navigation"
        />
      )}

      {/* Backdrop overlay when hovering collapsed sidebar */}
      <AnimatePresence>
        {isFloatingHoverPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsDesktopHoverOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs z-40"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar Aside */}
      <aside
        onMouseLeave={() => {
          if (isCollapsed && isDesktopHoverOpen && !isResizing) {
            setIsDesktopHoverOpen(false);
            setIsUserMenuOpen(false);
          }
        }}
        style={{
          width: isFloatingHoverPanel ? sidebarWidth : effectiveWidth,
        }}
        className={cn(
          'relative shrink-0 flex flex-col border-r border-white/[0.08] bg-[#0b0b0e] transition-[width] duration-200 ease-out select-none z-50 font-sans',
          isResizing && 'transition-none',
          isFloatingHoverPanel &&
            'absolute left-2 top-2 bottom-2 rounded-2xl border border-white/15 shadow-[0_22px_48px_rgba(0,0,0,0.52)] z-50 overflow-hidden'
        )}
      >
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-48 h-64 opacity-[0.03]"
          style={{
            background: 'radial-gradient(ellipse at top left, #ffffff 0%, transparent 70%)',
          }}
        />

        {/* ─── Workspace Switcher Header ─── */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-white/[0.08] shrink-0">
          {!isCollapsed || isFloatingHoverPanel ? (
            <div className="flex items-center justify-between w-full min-w-0">
              {/* Workspace Pill */}
              <div
                onClick={() => setWorkspaceMode(workspaceMode === 'team' ? 'personal' : 'team')}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer min-w-0 group"
                title="Click to toggle Team / Personal workspace"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center font-mono text-xs font-medium text-rose-300 shrink-0 shadow-2xs group-hover:border-rose-500/50 transition-colors">
                  {workspaceMode === 'team' ? 'A' : 'P'}
                </div>
                <div className="flex flex-col min-w-0 text-left leading-tight">
                  <span className="text-xs font-medium text-white truncate">
                    {workspaceMode === 'team' ? 'Axiom Core Ops' : 'Personal Studio'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate">
                    {workspaceMode === 'team' ? 'Enterprise Tier' : 'Pro Architect'}
                  </span>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  title="Search & Command Palette (⌘K)"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Command className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAppearanceOpen(true)}
                  title="Theme & Appearance (⌘T)"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                    setIsDesktopHoverOpen(false);
                  }}
                  title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  {isCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand Sidebar"
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
              >
                A
              </button>
            </div>
          )}
        </div>

        {/* ─── Categorized Navigation ─── */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-4 text-xs custom-scrollbar">
          {coreSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {(!isCollapsed || isFloatingHoverPanel) && (
                <div className="px-2.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeNav === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveNav(item.id)}
                      title={isCollapsed && !isFloatingHoverPanel ? item.label : undefined}
                      className={cn(
                        'w-full flex items-center rounded-xl text-xs transition-all duration-150 cursor-pointer text-left relative select-none',
                        isCollapsed && !isFloatingHoverPanel ? 'h-9 justify-center' : 'gap-2.5 px-2.5 py-2',
                        isActive
                          ? 'text-white font-medium shadow-2xs'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                      )}
                    >
                      {/* Active Spring Layout Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="workstation-active-pill"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.1] pointer-events-none"
                        />
                      )}

                      <Icon className="w-4 h-4 shrink-0 relative z-10" />

                      {(!isCollapsed || isFloatingHoverPanel) && (
                        <div className="flex-1 flex items-center justify-between min-w-0 relative z-10">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 border',
                                item.badgeVariant === 'live'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : 'bg-white/[0.06] text-neutral-300 border-white/[0.06]'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Collapsible Lifestyle & System Health Accordion ── */}
          <div className="space-y-1">
            {(!isCollapsed || isFloatingHoverPanel) && (
              <div className="px-2.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                System Health & Journal
              </div>
            )}

            {/* Wellness Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsWellnessOpen(!isWellnessOpen)}
                title={isCollapsed && !isFloatingHoverPanel ? 'Wellness Tracker' : undefined}
                className={cn(
                  'w-full flex items-center rounded-xl text-xs transition-colors cursor-pointer text-left',
                  isCollapsed && !isFloatingHoverPanel ? 'h-9 justify-center' : 'gap-2.5 px-2.5 py-2 text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <Activity className="w-4 h-4 shrink-0" />
                {(!isCollapsed || isFloatingHoverPanel) && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">Wellness Diagnostics</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 text-neutral-400 transition-transform duration-200',
                        isWellnessOpen && 'rotate-180 text-white'
                      )}
                    />
                  </div>
                )}
              </button>

              {/* Sub-items */}
              <AnimatePresence>
                {isWellnessOpen && (!isCollapsed || isFloatingHoverPanel) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-6 pr-1 py-1 space-y-0.5 overflow-hidden"
                  >
                    {[
                      { id: 'habits', label: 'Habit Calibration', icon: CheckCircle2 },
                      { id: 'health', label: 'Physical Vitals', icon: Heart },
                      { id: 'sleep', label: 'Circadian Cycles', icon: Moon },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setActiveNav(sub.id)}
                        className={cn(
                          'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors text-left',
                          activeNav === sub.id
                            ? 'text-white font-medium bg-white/[0.06]'
                            : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                        )}
                      >
                        <sub.icon className="w-3.5 h-3.5" />
                        <span className="truncate">{sub.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reflection Journal with AI Badge */}
            <button
              type="button"
              onClick={() => setActiveNav('journal')}
              title={isCollapsed && !isFloatingHoverPanel ? 'Reflection Journal' : undefined}
              className={cn(
                'w-full flex items-center rounded-xl text-xs transition-all duration-150 cursor-pointer text-left relative select-none',
                isCollapsed && !isFloatingHoverPanel ? 'h-9 justify-center' : 'gap-2.5 px-2.5 py-2',
                activeNav === 'journal'
                  ? 'text-white font-medium shadow-2xs'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
              )}
            >
              {activeNav === 'journal' && (
                <motion.div
                  layoutId="workstation-active-pill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.1] pointer-events-none"
                />
              )}
              <BookOpen className="w-4 h-4 shrink-0 relative z-10" />
              {(!isCollapsed || isFloatingHoverPanel) && (
                <div className="flex-1 flex items-center justify-between min-w-0 relative z-10">
                  <span className="truncate">Reflection Journal</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    AI
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* ─── Bottom User Identity Capsule ─── */}
        <div className="p-2.5 border-t border-white/[0.08] shrink-0 relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => {
              if (isCollapsed && !isFloatingHoverPanel) {
                setIsCollapsed(false);
              } else {
                setIsUserMenuOpen(!isUserMenuOpen);
              }
            }}
            className={cn(
              'w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer select-none',
              isCollapsed && !isFloatingHoverPanel
                ? 'h-10 justify-center'
                : 'gap-2.5 p-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08]'
            )}
          >
            {/* Avatar with Live Status Pulse */}
            <div className="relative shrink-0">
              <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-white/20 flex items-center justify-center font-mono text-xs font-medium text-white shadow-2xs">
                S
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-[#0b0b0e]" />
            </div>

            {(!isCollapsed || isFloatingHoverPanel) && (
              <div className="flex-1 flex items-center justify-between min-w-0 text-left">
                <div className="leading-tight truncate">
                  <span className="text-xs font-medium text-white block truncate">Seiren Humtsoe</span>
                  <span className="text-[10px] font-mono text-neutral-400 block truncate">@seiren · Lead</span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 text-neutral-400 transition-transform duration-200',
                    isUserMenuOpen && 'rotate-180 text-white'
                  )}
                />
              </div>
            )}
          </button>

          {/* Elevated User Flyout Menu */}
          <AnimatePresence>
            {isUserMenuOpen && (!isCollapsed || isFloatingHoverPanel) && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-16 left-2.5 right-2.5 rounded-xl bg-[#121216] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-1.5 z-50 overflow-hidden"
              >
                {/* Flyout Profile Header */}
                <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
                  <div className="text-xs font-medium text-white">Seiren Humtsoe</div>
                  <div className="text-[10px] font-mono text-neutral-400">seiren@axiom.internal</div>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Profile & Keys</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAppearanceOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Appearance</span>
                    </div>
                    <kbd className="text-[9px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-neutral-400">⌘T</kbd>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                  >
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Console Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Desktop Client</span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400">V1.0</span>
                  </button>
                </div>

                <div className="my-1 border-t border-white/[0.08]" />

                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Resizing Drag Handle ─── */}
        {!isCollapsed && (
          <div
            onPointerDown={handleResizeStart}
            className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-white/20 transition-colors z-40"
            title={`Drag to resize sidebar width (${SIDEBAR_MIN_WIDTH}px - ${SIDEBAR_MAX_WIDTH}px)`}
          />
        )}
      </aside>
    </>
  );
}
