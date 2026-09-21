'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  User,
  Settings,
  Key,
  LogOut,
  Shield,
  Sparkles,
  Check,
  ExternalLink,
} from 'lucide-react';

export interface SculptedTabShellProps {
  children: React.ReactNode;
  className?: string;
  user?: {
    name: string;
    handle: string;
    role: string;
    avatarUrl?: string;
    status?: 'online' | 'busy' | 'away';
  };
  onUserAction?: (action: string) => void;
}

export function SculptedTabShell({
  children,
  className,
  user = {
    name: 'Seiren Humtsoe',
    handle: '@seiren',
    role: 'Lead Architect',
    status: 'online',
  },
  onUserAction,
}: SculptedTabShellProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className={cn('relative w-full rounded-[24px] overflow-hidden bg-[#0a0a0c] text-neutral-200 border border-white/10 shadow-2xl transition-all', className)}>
      {/* ─── Sculpted Asymmetric Top Header ─── */}
      <div className="relative w-full z-20">
        {/* SVG Sculpted Border & Background Contour */}
        <div className="relative h-14 w-full flex items-center justify-between px-6 border-b border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent">
          {/* Left subtle indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              Axiom Autonomous Runtime · v2.4.0
            </span>
          </div>

          {/* Right Notched / Sculpted Tab with User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer select-none text-left',
                dropdownOpen
                  ? 'bg-white/[0.12] border-white/25 shadow-tactile text-white'
                  : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/[0.12] hover:border-white/20 text-neutral-300'
              )}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {/* User Avatar with Status Indicator */}
              <div className="relative w-6 h-6 rounded-lg bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/20 flex items-center justify-center font-mono text-[11px] font-medium text-white shadow-2xs">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-lg object-cover" />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
                <span
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0a0a0c]',
                    user.status === 'online' && 'bg-emerald-500',
                    user.status === 'busy' && 'bg-amber-500',
                    user.status === 'away' && 'bg-neutral-500'
                  )}
                />
              </div>

              {/* User Metadata */}
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-xs font-medium text-white">{user.name}</span>
                <span className="text-[10px] font-mono text-neutral-400 mt-0.5">{user.handle}</span>
              </div>

              {/* Role Badge */}
              <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-neutral-300 border border-white/[0.08]">
                {user.role}
              </span>

              <ChevronDown
                className={cn('w-3.5 h-3.5 text-neutral-400 transition-transform duration-200', dropdownOpen && 'rotate-180 text-white')}
              />
            </button>

            {/* User Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl bg-[#121215] border border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                {/* User Identity Header */}
                <div className="px-3 py-2.5 border-b border-white/[0.08] mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-white/15 flex items-center justify-center font-medium text-sm text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-medium text-white">{user.name}</span>
                      <span className="text-[11px] font-mono text-neutral-400">{user.handle}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400 bg-white/[0.04] px-2 py-1 rounded border border-white/[0.06]">
                    <span>Workspace: Enterprise</span>
                    <span className="text-emerald-400">Verified</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      onUserAction?.('profile');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Architect Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      onUserAction?.('api-keys');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Key className="w-3.5 h-3.5 text-neutral-400" />
                      <span>API Keys & Tokens</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">v2.4</span>
                  </button>
                  <button
                    onClick={() => {
                      onUserAction?.('governance');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Security & Governance</span>
                  </button>
                  <button
                    onClick={() => {
                      onUserAction?.('settings');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Console Settings</span>
                  </button>
                </div>

                <div className="my-1 border-t border-white/[0.08]" />

                <button
                  onClick={() => {
                    onUserAction?.('logout');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Children Content Slot ─── */}
      <div className="relative w-full z-10">{children}</div>
    </div>
  );
}
