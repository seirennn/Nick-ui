'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'tactile' | 'recessed';
  spotlightSize?: number;
  spotlightColor?: string;
  ambientIntensity?: number;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      spotlightSize = 420,
      spotlightColor,
      ambientIntensity = 0.045,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const [mousePos, setMousePos] = React.useState<{ x: number; y: number } | null>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePos(null);
    };

    const variantClasses = {
      default: 'bg-card border border-border',
      tactile: 'bg-card border border-border/80 shadow-tactile',
      recessed: 'bg-secondary/70 border border-border/60 shadow-recessed',
    };

    return (
      <div
        ref={(el) => {
          cardRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative rounded-xl p-6 overflow-hidden transition-colors duration-200',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Ambient Radial Spotlight: gentle environmental condition, not decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered && mousePos ? 1 : 0,
            background: mousePos
              ? `radial-gradient(${spotlightSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${
                  spotlightColor || `var(--spotlight-color, rgba(255, 255, 255, ${ambientIntensity}))`
                }, transparent 70%)`
              : 'none',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';

export function SpotlightCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 mb-3', className)} {...props} />;
}

export function SpotlightCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-component-title text-text-primary font-medium tracking-tight', className)}
      {...props}
    />
  );
}

export function SpotlightCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-body text-text-muted leading-relaxed', className)}
      {...props}
    />
  );
}

export function SpotlightCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-body text-text-secondary', className)} {...props} />;
}

export function SpotlightCardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('pt-4 mt-4 border-t border-border/60 flex items-center', className)}
      {...props}
    />
  );
}
