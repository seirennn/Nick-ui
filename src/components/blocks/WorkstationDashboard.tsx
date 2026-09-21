'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Knob } from '@/components/ui/knob';
import { Gauge } from '@/components/ui/gauge';
import { AreaChart } from '@/components/ui/charts';
import {
  Search,
  Keyboard,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  Activity,
  BarChart3,
  Layers,
  Wallet,
  Zap,
  Terminal,
  Shield,
  Columns,
  LayoutGrid,
  Maximize2,
  Minimize2,
  RefreshCw,
  ArrowUpRight,
  Sliders,
  Check,
  Copy,
  ExternalLink,
  Lock,
  Sparkles,
  Command,
} from 'lucide-react';

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 360;
const SIDEBAR_DEFAULT_WIDTH = 260;

export function WorkstationDashboard() {
  // Sidebar State
  const [sidebarWidth, setSidebarWidth] = React.useState(SIDEBAR_DEFAULT_WIDTH);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isHoverOpen, setIsHoverOpen] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [workspaceMode, setWorkspaceMode] = React.useState<'personal' | 'team'>('team');
  const [activeNav, setActiveNav] = React.useState('accounts');

  // Split Layout State: '1-pane' | '2-split' | '3-pane'
  const [splitLayout, setSplitLayout] = React.useState<'1-pane' | '2-split' | '3-pane'>('2-split');
  const [timeframe, setTimeframe] = React.useState<'1M' | '5M' | '1H' | '1D'>('5M');
  const [gainKnob, setGainKnob] = React.useState(68);
  const [dampingKnob, setDampingKnob] = React.useState(42);

  // Resize Handler
  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.max(
        SIDEBAR_MIN_WIDTH,
        Math.min(SIDEBAR_MAX_WIDTH, startWidth + (moveEvent.clientX - startX))
      );
      setSidebarWidth(nextWidth);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      setIsResizing(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
  };

  // Close user menu on outside click
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Chart data
  const chartPoints = [
    { label: '00:00', value: 4100, baseline: 3800 },
    { label: '04:00', value: 5300, baseline: 4200 },
    { label: '08:00', value: 6900, baseline: 5100 },
    { label: '12:00', value: 8400, baseline: 6300 },
    { label: '16:00', value: 7800, baseline: 6100 },
    { label: '20:00', value: 9600, baseline: 7200 },
    { label: '24:00', value: 10450, baseline: 8100 },
  ];

  const orderbook = [
    { price: '148.90', size: '2,140', total: '18.2k', type: 'ask' },
    { price: '148.85', size: '4,500', total: '16.1k', type: 'ask' },
    { price: '148.80', size: '7,890', total: '11.6k', type: 'ask' },
    { price: '148.75', size: '5,200', total: '5.2k', type: 'bid' },
    { price: '148.70', size: '11,400', total: '16.6k', type: 'bid' },
    { price: '148.65', size: '14,200', total: '30.8k', type: 'bid' },
  ];

  const currentSidebarWidth = isSidebarCollapsed ? 64 : sidebarWidth;

  return (
    <div className="relative w-full rounded-[28px] border border-border/80 bg-[#08080a] text-neutral-200 overflow-hidden shadow-2xl flex min-h-[880px]">
      {/* ═══════════════════════════════════════════════════════════════
          1. RESIZABLE ARCHITECTURAL SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <aside
        style={{ width: currentSidebarWidth }}
        className={cn(
          'relative shrink-0 flex flex-col border-r border-white/[0.08] bg-[#0b0b0e] transition-[width] duration-200 ease-out select-none z-30',
          isResizing && 'transition-none'
        )}
      >
        {/* Top-left Ambient Glow */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-48 h-64 opacity-[0.03]"
          style={{
            background: 'radial-gradient(ellipse at top left, #ffffff 0%, transparent 70%)',
          }}
        />

        {/* ─── Workspace Switcher Header ─── */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-white/[0.08] shrink-0">
          {!isSidebarCollapsed ? (
            <div className="flex items-center justify-between w-full min-w-0">
              <div
                onClick={() => setWorkspaceMode(workspaceMode === 'team' ? 'personal' : 'team')}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer min-w-0"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center font-mono text-xs font-medium text-rose-400 shrink-0 shadow-2xs">
                  N
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
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Command Palette (⌘K)"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Command className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(true)}
                  title="Collapse Sidebar"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expand Sidebar"
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
              >
                N
              </button>
            </div>
          )}
        </div>

        {/* ─── Categorized Navigation ─── */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 text-xs font-sans">
          {/* Section: Trading & Telemetry */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Core Systems
              </div>
            )}
            <div className="space-y-0.5">
              {[
                { id: 'overview', label: 'Overview & Mission', icon: Home, badge: 'Live' },
                { id: 'accounts', label: 'Multi-Cluster Accounts', icon: Wallet, badge: '4' },
                { id: 'strategies', label: 'Algorithmic Strategies', icon: Activity },
                { id: 'execution', label: 'Zero-Loss Routing', icon: Zap },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center rounded-xl text-xs transition-all duration-200 cursor-pointer text-left',
                    isSidebarCollapsed ? 'h-9 justify-center' : 'gap-2.5 px-2.5 py-2',
                    activeNav === item.id
                      ? 'bg-white/[0.08] text-white font-medium border border-white/[0.1] shadow-2xs'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-neutral-300 border border-white/[0.06]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Analytics & Tools */}
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Analysis & Tools
              </div>
            )}
            <div className="space-y-0.5">
              {[
                { id: 'analytics', label: 'Telemetry Stream', icon: BarChart3 },
                { id: 'governance', label: 'Security & Audit', icon: Shield },
                { id: 'terminal', label: 'Cluster Logs', icon: Terminal },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center rounded-xl text-xs transition-all duration-200 cursor-pointer text-left',
                    isSidebarCollapsed ? 'h-9 justify-center' : 'gap-2.5 px-2.5 py-2',
                    activeNav === item.id
                      ? 'bg-white/[0.08] text-white font-medium border border-white/[0.1] shadow-2xs'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom User Identity Capsule ─── */}
        <div className="p-2 border-t border-white/[0.08] shrink-0 relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => (isSidebarCollapsed ? setIsSidebarCollapsed(false) : setIsUserMenuOpen(!isUserMenuOpen))}
            className={cn(
              'w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer',
              isSidebarCollapsed ? 'h-10 justify-center' : 'gap-2.5 p-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08]'
            )}
          >
            <div className="relative shrink-0">
              <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-white/20 flex items-center justify-center font-mono text-xs font-medium text-white shadow-2xs">
                S
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-[#0b0b0e]" />
            </div>

            {!isSidebarCollapsed && (
              <div className="flex-1 flex items-center justify-between min-w-0 text-left">
                <div className="leading-tight truncate">
                  <span className="text-xs font-medium text-white block truncate">Seiren Humtsoe</span>
                  <span className="text-[10px] font-mono text-neutral-400 block truncate">@seiren · Lead</span>
                </div>
                <ChevronDown className={cn('w-3.5 h-3.5 text-neutral-400 transition-transform', isUserMenuOpen && 'rotate-180 text-white')} />
              </div>
            )}
          </button>

          {/* Elevated User Flyout Menu */}
          {isUserMenuOpen && !isSidebarCollapsed && (
            <div className="absolute bottom-16 left-2 right-2 rounded-xl bg-[#121215] border border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="px-2.5 py-2 border-b border-white/[0.08] mb-1">
                <div className="text-xs font-medium text-white">Seiren Humtsoe</div>
                <div className="text-[10px] font-mono text-neutral-400">seiren@axiom.internal</div>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                >
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Profile & Keys</span>
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Preferences</span>
                  </div>
                  <kbd className="text-[10px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-neutral-400">⌘T</kbd>
                </button>
              </div>
              <div className="my-1 border-t border-white/[0.08]" />
              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── Resizing Drag Handle ─── */}
        {!isSidebarCollapsed && (
          <div
            onPointerDown={handleResizeStart}
            className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-white/20 transition-colors z-40"
            title="Drag to resize sidebar width"
          />
        )}
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN CONSOLE VIEWPORT & SCULPTED TOP ARCHITECTURAL BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#08080a]">
        {/* Sculpted Top Bar with Chamfered Tab Notch */}
        <header className="h-14 px-6 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-gradient-to-b from-white/[0.03] to-transparent shrink-0">
          {/* Left: Breadcrumb & Cluster Telemetry */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400">CONSOLE /</span>
              <span className="text-white font-medium">CLUSTER-ALPHA-4</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.98% Healthy
            </span>
          </div>

          {/* Right: Layout Switcher & Actions */}
          <div className="flex items-center gap-3">
            {/* Split-Pane Layout Mode Selector */}
            <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              <button
                type="button"
                onClick={() => setSplitLayout('1-pane')}
                className={cn(
                  'px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '1-pane' ? 'bg-white/[0.1] text-white shadow-2xs font-medium' : 'text-neutral-400 hover:text-white'
                )}
                title="Single Focus Canvas"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Focus</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitLayout('2-split')}
                className={cn(
                  'px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '2-split' ? 'bg-white/[0.1] text-white shadow-2xs font-medium' : 'text-neutral-400 hover:text-white'
                )}
                title="2-Pane Split LR"
              >
                <Columns className="w-3 h-3" />
                <span className="hidden sm:inline">Split LR</span>
              </button>
              <button
                type="button"
                onClick={() => setSplitLayout('3-pane')}
                className={cn(
                  'px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                  splitLayout === '3-pane' ? 'bg-white/[0.1] text-white shadow-2xs font-medium' : 'text-neutral-400 hover:text-white'
                )}
                title="3-Pane Command Matrix"
              >
                <LayoutGrid className="w-3 h-3" />
                <span className="hidden sm:inline">3-Pane</span>
              </button>
            </div>

            {/* Timeframe Switcher */}
            <div className="hidden md:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
              {(['1M', '5M', '1H', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    'px-2 py-0.5 rounded-lg transition-colors cursor-pointer',
                    timeframe === tf ? 'bg-white/[0.1] text-white font-medium' : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ─── Multi-Pane Split Canvas ─── */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Main Dynamic Split Grid */}
          <div
            className={cn(
              'grid gap-6 items-start',
              splitLayout === '1-pane' && 'grid-cols-1',
              splitLayout === '2-split' && 'grid-cols-1 lg:grid-cols-12',
              splitLayout === '3-pane' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-12'
            )}
          >
            {/* ── PANE 1: TELEMETRY ORDERBOOK & DEPTH ── */}
            {(splitLayout === '2-split' || splitLayout === '3-pane') && (
              <div className={cn(splitLayout === '2-split' ? 'lg:col-span-4' : 'lg:col-span-3', 'space-y-4')}>
                <Card variant="tactile" depth="medium" className="p-4 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-medium text-white">Orderbook Liquidity</span>
                    <Badge variant="mono">L2 Stream</Badge>
                  </div>

                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-neutral-400 px-1 pb-1">
                      <span>PRICE</span>
                      <span>SIZE</span>
                      <span>TOTAL</span>
                    </div>
                    {orderbook.map((row, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex justify-between px-1.5 py-0.5 rounded transition-colors',
                          row.type === 'ask' ? 'text-rose-400 hover:bg-rose-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'
                        )}
                      >
                        <span className="font-medium">{row.price}</span>
                        <span className="text-neutral-300">{row.size}</span>
                        <span className="text-neutral-400">{row.total}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
                    <Button variant="tactile" depth="deep" size="sm" className="bg-emerald-600/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/25">
                      Bid Instant
                    </Button>
                    <Button variant="tactile" depth="deep" size="sm" className="bg-rose-600/15 border-rose-500/40 text-rose-400 hover:bg-rose-600/25">
                      Ask Liquidate
                    </Button>
                  </div>
                </Card>

                {/* Consensus Gauge Card */}
                <Card variant="recessed" depth="subtle" className="p-4 space-y-2 bg-white/[0.02] border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">BKT Consensus</span>
                    <span className="font-mono text-emerald-400">99.98%</span>
                  </div>
                  <div className="py-2 flex justify-center">
                    <Gauge value={94} min={0} max={100} label="Sync Rate" unit="%" size={130} variant="tactile" />
                  </div>
                </Card>
              </div>
            )}

            {/* ── PANE 2: HARMONIC TELEMETRY CANVAS ── */}
            <div
              className={cn(
                splitLayout === '1-pane' && 'col-span-1',
                splitLayout === '2-split' && 'lg:col-span-8',
                splitLayout === '3-pane' && 'lg:col-span-6',
                'space-y-4'
              )}
            >
              <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-medium text-white">Ingress Throughput Progression</h3>
                    <p className="text-xs text-neutral-400">Real-time Catmull-Rom cubic spline telemetry</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+24.8% vs last epoch</span>
                  </div>
                </div>

                <div className="pt-2">
                  <AreaChart data={chartPoints} height={230} showGrid={true} className="w-full" />
                </div>

                {/* Ingress Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.08] font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400">PEAK INGRESS</div>
                    <div className="text-xs font-medium text-white mt-0.5">18.4 GB/s</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400">MEDIAN LATENCY</div>
                    <div className="text-xs font-medium text-emerald-400 mt-0.5">1.1ms</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400">DROPPED FRAMES</div>
                    <div className="text-xs font-medium text-white mt-0.5">0.000%</div>
                  </div>
                </div>
              </Card>

              {/* Execution Log Stream */}
              <Card variant="recessed" depth="medium" className="p-4 space-y-2 font-mono text-xs bg-white/[0.02] border-white/[0.08]">
                <div className="flex items-center justify-between text-neutral-400 border-b border-white/[0.06] pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Execution Stream</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">ZERO LATENCY</span>
                </div>
                <div className="space-y-1 text-[11px] text-neutral-400 leading-relaxed pt-1">
                  <div>[14:24:01] <span className="text-white">NODE_04</span> consensus validated epoch #99281</div>
                  <div>[14:24:02] <span className="text-emerald-400">SETTLED</span> 14,200 operations across 4 regional meshes</div>
                  <div>[14:24:03] <span className="text-white">REBALANCE</span> liquid staking pool depth optimal</div>
                </div>
              </Card>
            </div>

            {/* ── PANE 3: HARDWARE DIALS & ATTENUATION (Only in 3-pane mode) ── */}
            {splitLayout === '3-pane' && (
              <div className="lg:col-span-3 space-y-4">
                <Card variant="tactile" depth="medium" className="p-5 space-y-4 bg-[#0d0d10] border-white/10 shadow-tactile">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="text-xs font-medium text-white">Hardware Rotary Dials</span>
                    <Badge variant="mono">Analog Knobs</Badge>
                  </div>

                  <div className="flex flex-col items-center gap-4 py-2">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Knob
                        value={gainKnob}
                        onChange={setGainKnob}
                        min={0}
                        max={100}
                        size={80}
                        label="Master Gain"
                        variant="tactile"
                      />
                      <span className="text-[11px] font-mono text-neutral-400">{gainKnob}% Amplification</span>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-2">
                      <Knob
                        value={dampingKnob}
                        onChange={setDampingKnob}
                        min={0}
                        max={100}
                        size={80}
                        label="Damping"
                        variant="recessed"
                      />
                      <span className="text-[11px] font-mono text-neutral-400">{dampingKnob}% Attenuation</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
