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
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
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
        'w-64 shrink-0 flex flex-col justify-between py-5 px-3 bg-card/60 backdrop-blur-sm border-r border-border/80 min-h-[calc(100vh-4rem)] select-none',
        className
      )}
      {...props}
    >
      <div className="space-y-6">
        {header && <div className="mb-3 px-2">{header}</div>}

        {groups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="text-[10px] font-mono font-medium text-text-muted/80 uppercase tracking-wider px-2.5 pb-1">
              {group.title}
            </h4>
            <ul className="space-y-0.5 m-0 p-0 list-none">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = typeof item.icon === 'function' ? item.icon : null;
                const iconElement = IconComponent ? <IconComponent className="w-3.5 h-3.5 shrink-0" /> : (React.isValidElement(item.icon) ? item.icon : null);

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer',
                        isActive
                          ? 'bg-secondary text-text-primary font-medium border border-border/70 shadow-2xs'
                          : 'text-text-secondary hover:text-text-primary hover:bg-secondary/40'
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {iconElement && (
                          <span className={cn('shrink-0 transition-colors', isActive ? 'text-text-primary' : 'text-text-muted')}>
                            {iconElement}
                          </span>
                        )}
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-secondary/80 text-text-muted border border-border/50 shrink-0">
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
