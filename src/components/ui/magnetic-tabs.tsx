'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MagneticTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface MagneticTabsProps {
  tabs: MagneticTabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'tactile' | 'recessed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MagneticTabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'tactile',
  size = 'md',
  className,
}: MagneticTabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue || (tabs[0] ? tabs[0].id : '')
  );
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(tabId);
    }
    onValueChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const targetTab = tabs[nextIndex];
      if (targetTab && !targetTab.disabled) {
        handleSelect(targetTab.id);
      }
    }
  };

  const sizeStyles = {
    sm: {
      container: 'p-0.5 gap-0.5 rounded-lg text-xs',
      tab: 'px-2.5 py-1 rounded-md text-xs gap-1.5',
    },
    md: {
      container: 'p-1 gap-1 rounded-xl text-sm',
      tab: 'px-3.5 py-1.5 rounded-lg text-sm gap-2',
    },
    lg: {
      container: 'p-1.5 gap-1.5 rounded-xl text-base',
      tab: 'px-4.5 py-2 rounded-lg text-base gap-2.5',
    },
  };

  const containerVariants = {
    default: 'bg-secondary/60 border border-border/80',
    tactile: 'bg-card border border-border/80 shadow-tactile',
    recessed: 'bg-secondary/70 border border-border/60 shadow-recessed',
  };

  const pillVariants = {
    default: 'bg-background shadow-xs border border-border/60',
    tactile: 'bg-background shadow-tactile border border-border/70',
    recessed: 'bg-card shadow-xs border border-border/50',
  };

  const uniqueLayoutId = React.useId();

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        'inline-flex items-center select-none',
        containerVariants[variant],
        sizeStyles[size].container,
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeValue;

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => handleSelect(tab.id, tab.disabled)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'relative inline-flex items-center justify-center font-medium transition-colors outline-none cursor-pointer',
              sizeStyles[size].tab,
              isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary',
              tab.disabled && 'opacity-40 cursor-not-allowed hover:text-text-muted'
            )}
          >
            {/* Magnetic Active Sliding Indicator Pill */}
            {isActive && (
              <motion.div
                layoutId={`magnetic-pill-${uniqueLayoutId}`}
                className={cn('absolute inset-0 z-0', pillVariants[variant], sizeStyles[size].tab.includes('rounded-md') ? 'rounded-md' : 'rounded-lg')}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            {/* Tab Label Content */}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {tab.icon && (
                <span className={cn('shrink-0 transition-opacity', isActive ? 'opacity-100' : 'opacity-70')}>
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-text-primary'
                      : 'bg-background/80 text-text-muted'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
