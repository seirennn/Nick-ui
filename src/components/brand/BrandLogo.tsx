'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'tactile' | 'minimal';
}

const sizeMap = {
  xs: { box: 'w-5 h-5', px: 20 },
  sm: { box: 'w-6 h-6', px: 24 },
  md: { box: 'w-8 h-8', px: 32 },
  lg: { box: 'w-10 h-10', px: 40 },
  xl: { box: 'w-16 h-16', px: 64 },
};

export function BrandLogo({
  className,
  size = 'md',
  showText = false,
  variant = 'default',
  ...props
}: BrandLogoProps) {
  const { box, px } = sizeMap[size];

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)} {...props}>
      <div
        className={cn(
          'relative shrink-0 overflow-hidden flex items-center justify-center',
          box,
          variant === 'tactile' && 'rounded-lg border border-border/80 bg-secondary/40 shadow-2xs',
          variant === 'default' && 'rounded-md',
          variant === 'minimal' && ''
        )}
      >
        {/* Light mode: crisp dark ink */}
        <Image
          src="/brand-logo.png"
          alt="NickUI Brand Glyph"
          width={px}
          height={px}
          priority
          className="dark:hidden object-contain mix-blend-multiply w-full h-full scale-[1.08]"
        />

        {/* Dark mode: etched smoky tactile emblem */}
        <Image
          src="/brand-logo-dark.png"
          alt="NickUI Brand Glyph"
          width={px}
          height={px}
          priority
          className="hidden dark:block object-contain w-full h-full scale-[1.08] filter brightness-110 contrast-125"
        />
      </div>

      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-medium text-sm text-text-primary tracking-tight font-sans">NickUI</span>
          <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-secondary/60 border border-border/40">
            v0.1.1
          </span>
        </div>
      )}
    </div>
  );
}
