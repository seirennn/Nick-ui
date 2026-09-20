'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: SidebarGroup[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Sidebar({ groups, header, footer, className, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'w-64 shrink-0 flex flex-col justify-between py-6 px-4 bg-background border-r border-border/80 min-h-[calc(100vh-4rem)]',
        className
      )}
      {...props}
    >
      <div className="space-y-6">
        {header && <div className="mb-4 px-2">{header}</div>}

        {groups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="text-sidebar-category text-text-muted uppercase tracking-wider px-2 font-medium">
              {group.title}
            </h4>
            <ul className="space-y-0.5 m-0 p-0 list-none">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'flex items-center justify-between px-2.5 py-1.5 rounded-lg text-ui transition-colors cursor-pointer',
                        isActive
                          ? 'bg-sidebar-accent text-text-primary font-medium border border-sidebar-border/40'
                          : 'text-text-secondary hover:text-text-primary hover:bg-sidebar-accent/50'
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-text-muted">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {footer && <div className="pt-4 border-t border-border/60 px-2">{footer}</div>}
    </aside>
  );
}
