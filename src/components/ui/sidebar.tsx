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
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  onClick?: () => void;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  groups: SidebarGroup[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function Sidebar({
  groups,
  header,
  footer,
  activeId,
  onSelect,
  className,
  ...props
}: SidebarProps) {
  const pathname = usePathname();
  const activeItemRef = React.useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [pathname, activeId]);

  return (
    <aside
      className={cn(
        'w-64 shrink-0 flex flex-col h-full bg-card/60 backdrop-blur-sm border-r border-border/80 select-none overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Pinned Top Header */}
      {header && (
        <div className="p-3 border-b border-border/60 shrink-0">
          {header}
        </div>
      )}

      {/* Scrollable Navigation Groups */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-5 custom-scrollbar"
      >
        {groups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="text-[10px] font-mono font-medium text-text-muted/80 uppercase tracking-wider px-2.5 pb-1">
              {group.title}
            </h4>
            <ul className="space-y-0.5 m-0 p-0 list-none">
              {group.items.map((item) => {
                const isActive =
                  activeId !== undefined
                    ? item.id === activeId
                    : item.active !== undefined
                    ? item.active
                    : pathname === item.href;

                const IconComponent = typeof item.icon === 'function' ? item.icon : null;
                const iconElement = IconComponent ? (
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  React.isValidElement(item.icon) ? item.icon : null
                );

                const itemClass = cn(
                  'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer w-full text-left',
                  isActive
                    ? 'bg-secondary text-text-primary font-medium border border-border/70 shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary/40'
                );

                const itemContent = (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      {iconElement && (
                        <span
                          className={cn(
                            'shrink-0 transition-colors',
                            isActive ? 'text-text-primary' : 'text-text-muted'
                          )}
                        >
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
                  </>
                );

                // If href is '#' or empty, or onSelect is supplied, render as interactive button
                if (item.href === '#' || !item.href || onSelect) {
                  return (
                    <li key={item.id}>
                      <button
                        ref={isActive ? (activeItemRef as React.RefObject<HTMLButtonElement>) : undefined}
                        type="button"
                        onClick={() => {
                          item.onClick?.();
                          onSelect?.(item.id);
                        }}
                        className={itemClass}
                      >
                        {itemContent}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <Link
                      ref={isActive ? (activeItemRef as React.RefObject<HTMLAnchorElement>) : undefined}
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      onClick={item.onClick}
                      className={itemClass}
                    >
                      {itemContent}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Pinned Bottom Footer */}
      {footer && (
        <div className="p-3 border-t border-border/60 shrink-0">
          {footer}
        </div>
      )}
    </aside>
  );
}
