'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/icon-button';
import { Badge } from '@/components/ui/badge';

export interface StackCardItem {
  id: string;
  title: string;
  tag?: string;
  description?: string;
  content?: React.ReactNode;
}

export interface StackDeckProps {
  cards: StackCardItem[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  variant?: 'default' | 'tactile' | 'recessed';
  className?: string;
}

export function StackDeck({
  cards,
  currentIndex: controlledIndex,
  onIndexChange,
  variant = 'tactile',
  className,
}: StackDeckProps) {
  const isControlled = controlledIndex !== undefined;
  const [internalIndex, setInternalIndex] = React.useState(0);
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const handleNext = () => {
    if (cards.length <= 1) return;
    const next = (activeIndex + 1) % cards.length;
    if (!isControlled) setInternalIndex(next);
    onIndexChange?.(next);
  };

  const handlePrev = () => {
    if (cards.length <= 1) return;
    const prev = (activeIndex - 1 + cards.length) % cards.length;
    if (!isControlled) setInternalIndex(prev);
    onIndexChange?.(prev);
  };

  const variantClasses = {
    default: 'bg-card border border-border',
    tactile: 'bg-card border border-border/80 shadow-tactile',
    recessed: 'bg-secondary/70 border border-border/60 shadow-recessed',
  };

  // Render max 3 cards visually stacked
  const visibleCardsCount = Math.min(3, cards.length);
  const reorderedCards = [];
  for (let i = 0; i < visibleCardsCount; i++) {
    const idx = (activeIndex + i) % cards.length;
    reorderedCards.push({ ...cards[idx], stackIndex: i });
  }

  return (
    <div className={cn('w-full max-w-md select-none', className)}>
      {/* Stack Viewport Area */}
      <div className="relative h-64 w-full flex items-center justify-center">
        {reorderedCards
          .slice()
          .reverse()
          .map((card) => {
            const isTop = card.stackIndex === 0;
            const yOffset = card.stackIndex * 12;
            const scale = 1 - card.stackIndex * 0.05;
            const opacity = 1 - card.stackIndex * 0.22;
            const zIndex = visibleCardsCount - card.stackIndex;

            return (
              <motion.div
                key={card.id}
                layout
                initial={false}
                animate={{
                  y: yOffset,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 28,
                }}
                style={{ zIndex }}
                onClick={!isTop ? handleNext : undefined}
                className={cn(
                  'absolute inset-x-0 top-2 h-52 rounded-2xl p-5 flex flex-col justify-between transition-colors',
                  variantClasses[variant],
                  !isTop && 'cursor-pointer hover:border-foreground/30'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-text-muted" />
                      <span className="text-[11px] font-mono uppercase text-text-muted">
                        Index {card.id}
                      </span>
                    </div>
                    {card.tag && (
                      <Badge variant="secondary">
                        {card.tag}
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-base font-medium text-text-primary tracking-tight">
                    {card.title}
                  </h4>
                  {card.description && (
                    <p className="mt-1 text-xs text-text-muted leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  )}
                </div>

                {card.content && <div className="my-auto py-1">{card.content}</div>}

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>
                    0{activeIndex + 1} / 0{cards.length}
                  </span>
                  <span>{isTop ? 'Current View' : 'Click to bring forward'}</span>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Deck Controls */}
      <div className="mt-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={`Jump to slide ${i + 1}`}
              onClick={() => {
                if (!isControlled) setInternalIndex(i);
                onIndexChange?.(i);
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                i === activeIndex
                  ? 'w-6 bg-foreground'
                  : 'w-1.5 bg-border hover:bg-text-muted'
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton
            icon={<ChevronLeft className="w-4 h-4" />}
            aria-label="Previous card"
            variant="ghost"
            size="sm"
            onClick={handlePrev}
          />
          <IconButton
            icon={<ChevronRight className="w-4 h-4" />}
            aria-label="Next card"
            variant="ghost"
            size="sm"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
