'use client';

import * as React from 'react';

export const SIDEBAR_DEFAULT_WIDTH = 260;
export const SIDEBAR_MIN_WIDTH = 240;
export const SIDEBAR_MAX_WIDTH = 360;

export type SplitLayoutMode = '1-pane' | '2-split' | '3-pane';
export type TimeframeMode = '1M' | '5M' | '1H' | '1D';
export type WorkspaceMode = 'team' | 'personal';

export interface SidebarContextType {
  // Sidebar Dimensions & Collapse
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;

  // Mobile
  isMobile: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;

  // Floating hover reveal on desktop
  isDesktopHoverOpen: boolean;
  setIsDesktopHoverOpen: (open: boolean) => void;

  // Modals & Shortcuts
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAppearanceOpen: boolean;
  setIsAppearanceOpen: (open: boolean) => void;
  isAIOpen: boolean;
  setIsAIOpen: (open: boolean) => void;

  // Workspace & Navigation
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  activeNav: string;
  setActiveNav: (navId: string) => void;

  // Workstation Canvas State
  splitLayout: SplitLayoutMode;
  setSplitLayout: (layout: SplitLayoutMode) => void;
  timeframe: TimeframeMode;
  setTimeframe: (tf: TimeframeMode) => void;

  // Hardware Rotary Knobs
  gainKnob: number;
  setGainKnob: (val: number) => void;
  dampingKnob: number;
  setDampingKnob: (val: number) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export function clampSidebarWidth(width: number): number {
  return Math.max(SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, width));
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultWidth?: number;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultWidth = SIDEBAR_DEFAULT_WIDTH,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [sidebarWidth, setSidebarWidthState] = React.useState(defaultWidth);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isDesktopHoverOpen, setIsDesktopHoverOpen] = React.useState(false);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = React.useState(false);
  const [isAIOpen, setIsAIOpen] = React.useState(false);

  const [workspaceMode, setWorkspaceMode] = React.useState<WorkspaceMode>('team');
  const [activeNav, setActiveNav] = React.useState('accounts');
  const [splitLayout, setSplitLayout] = React.useState<SplitLayoutMode>('2-split');
  const [timeframe, setTimeframe] = React.useState<TimeframeMode>('5M');

  const [gainKnob, setGainKnob] = React.useState(68);
  const [dampingKnob, setDampingKnob] = React.useState(42);

  // Resize check
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar on switch to desktop
  React.useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for Search, Cmd+T / Ctrl+T for Appearance)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command / Ctrl + K -> Search / Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }

      // Command / Ctrl + T -> Appearance / Theme Modal
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        setIsAppearanceOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCollapsed = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const toggleMobile = React.useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const setSidebarWidth = React.useCallback((width: number) => {
    setSidebarWidthState(clampSidebarWidth(width));
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
        sidebarWidth,
        setSidebarWidth,
        isMobile,
        isMobileOpen,
        setIsMobileOpen,
        toggleMobile,
        isDesktopHoverOpen,
        setIsDesktopHoverOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAppearanceOpen,
        setIsAppearanceOpen,
        isAIOpen,
        setIsAIOpen,
        workspaceMode,
        setWorkspaceMode,
        activeNav,
        setActiveNav,
        splitLayout,
        setSplitLayout,
        timeframe,
        setTimeframe,
        gainKnob,
        setGainKnob,
        dampingKnob,
        setDampingKnob,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
