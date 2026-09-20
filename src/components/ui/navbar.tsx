'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  searchSlot?: React.ReactNode;
  className?: string;
}

export function Navbar({ brand, items, actions, searchSlot, className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-12 sm:h-13 border-b border-border/70 bg-background/80 backdrop-blur-md transition-colors',
        className
      )}
    >
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          {brand}
        </div>

        {/* Center: Sleek Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1 m-0 p-0 list-none text-xs">
            {items.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'px-3 py-1.5 rounded-md transition-colors font-medium select-none',
                      isActive
                        ? 'text-text-primary bg-secondary/80'
                        : 'text-text-muted hover:text-text-primary hover:bg-secondary/40'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Search Omnibar + Action Cluster */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {searchSlot}
          {actions}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex sm:hidden items-center gap-1">
          {actions}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="sm:hidden border-b border-border/80 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-2 shadow-lg"
          >
            {searchSlot && <div className="mb-2">{searchSlot}</div>}
            <div className="flex flex-col space-y-0.5">
              {items.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-secondary text-text-primary'
                        : 'text-text-muted hover:text-text-primary hover:bg-secondary/40'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
