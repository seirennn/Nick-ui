import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardDepth = 'subtle' | 'medium' | 'deep';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: 'default' | 'tactile' | 'recessed';
  depth?: CardDepth;
}

const getCardDepthClass = (variant: 'default' | 'tactile' | 'recessed', depth: CardDepth = 'medium') => {
  if (variant === 'tactile') {
    switch (depth) {
      case 'subtle':
        return 'tactile-surface-subtle border-border/70';
      case 'deep':
        return 'tactile-surface-deep border-border/90';
      case 'medium':
      default:
        return 'tactile-surface border-border/80';
    }
  }
  if (variant === 'recessed') {
    switch (depth) {
      case 'subtle':
        return 'tactile-well-subtle border-border/50';
      case 'deep':
        return 'tactile-well-deep border-border/70';
      case 'medium':
      default:
        return 'tactile-well border-border/60';
    }
  }
  return 'border-border';
};

export function Card({ className, hoverable = true, variant = 'default', depth = 'medium', ...props }: CardProps) {
  const baseVariant = {
    default: 'bg-card border border-border',
    tactile: 'bg-card border',
    recessed: 'bg-secondary/70 border',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-5 transition-all',
        baseVariant[variant],
        getCardDepthClass(variant, depth),
        hoverable && variant === 'default' && 'hover:border-foreground/20',
        hoverable && variant === 'tactile' && 'hover:border-foreground/30 shadow-xs',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 mb-3', className)} {...props} />;
}

export function CardTitle({
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

export function CardDescription({
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

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-body text-text-secondary', className)} {...props} />;
}

export function CardFooter({
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
