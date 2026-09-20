'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  close: () => void;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const close = React.useCallback(() => setIsOpen(false), []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, close }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  asChild,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.setIsOpen(!context.isOpen);
  };

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props?.onClick?.(e);
        handleClick(e);
      },
      'aria-haspopup': 'menu',
      'aria-expanded': context.isOpen,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-haspopup="menu"
      aria-expanded={context.isOpen}
      className={cn('inline-flex items-center cursor-pointer', className)}
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  align = 'right',
  className,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error('DropdownContent must be used within Dropdown');

  const alignmentClass =
    align === 'right'
      ? 'right-0'
      : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 4 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          role="menu"
          className={cn(
            'absolute top-full mt-2 min-w-48 z-50 p-1.5',
            'bg-popover/95 backdrop-blur-2xl border border-border rounded-xl',
            'shadow-xl shadow-black/10 dark:shadow-black/60 overflow-visible space-y-0.5',
            alignmentClass,
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon,
  shortcut,
  destructive = false,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  className?: string;
}) {
  const context = React.useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (context) context.close();
  };

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleClick}
      className={cn(
        'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-ui text-left transition-colors cursor-pointer select-none',
        destructive
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-text-secondary hover:text-text-primary hover:bg-secondary',
        className
      )}
    >
      <div className="flex items-center gap-2 truncate">
        {icon && <span className="text-text-muted shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </div>
      {shortcut && (
        <span className="font-mono text-[10px] text-text-muted shrink-0 pl-2">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-border/60 my-1 mx-1', className)} />;
}

export function DropdownLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-text-muted font-medium select-none',
        className
      )}
    >
      {children}
    </div>
  );
}
