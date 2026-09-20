'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ChevronRight, FileText, Sparkles, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface FolderFileItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface FolderPreviewProps {
  title: string;
  category?: string;
  files: FolderFileItem[];
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  triggerMode?: 'click' | 'hover' | 'both';
  className?: string;
}

export function FolderPreview({
  title,
  category = 'ARCHIVAL BUNDLE',
  files = [],
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  triggerMode = 'both',
  className,
}: FolderPreviewProps) {
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const toggleExpand = () => {
    const next = !isExpanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    onExpandedChange?.(next);
  };

  const handleMouseEnter = () => {
    if (triggerMode === 'hover' || triggerMode === 'both') {
      if (!isControlled) setInternalExpanded(true);
      onExpandedChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === 'hover' || triggerMode === 'both') {
      if (!isControlled) setInternalExpanded(false);
      onExpandedChange?.(false);
    }
  };

  // Restrained rotations for the fanned stack
  const cardRotations = [-1.5, 0, 1.5, -0.75, 1];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('w-full max-w-md select-none', className)}
    >
      {/* Folder Container Sleeve */}
      <div
        onClick={triggerMode !== 'hover' ? toggleExpand : undefined}
        className={cn(
          'relative rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 cursor-pointer',
          'shadow-tactile hover:border-foreground/20'
        )}
      >
        {/* Top Archival Folder Tab & Metadata */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center text-text-primary">
              <Folder className="w-4 h-4 opacity-80" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-text-muted">
                {category}
              </div>
              <h4 className="text-sm font-medium text-text-primary tracking-tight">
                {title}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {files.length} {files.length === 1 ? 'item' : 'items'}
            </Badge>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-text-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Fanned Stack Preview Deck */}
        <div className="relative h-56 mt-4 w-full flex items-center justify-center overflow-hidden rounded-xl bg-secondary/30 border border-border/40 p-4">
          <div className="relative w-full h-full max-w-[320px]">
            {files.map((file, idx) => {
              const rotation = cardRotations[idx % cardRotations.length];
              const isTop = idx === activeCardIndex;
              const yOffset = isExpanded ? (idx - 1) * -14 : idx * 4;
              const scale = isExpanded ? 1 - idx * 0.03 : 1 - idx * 0.04;
              const zIndex = files.length - idx;

              return (
                <motion.div
                  key={file.id}
                  layout
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCardIndex(idx);
                  }}
                  animate={{
                    y: yOffset,
                    rotate: isExpanded ? rotation : 0,
                    scale: scale,
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 26,
                  }}
                  style={{ zIndex }}
                  className={cn(
                    'absolute inset-0 rounded-xl border border-border/80 bg-background p-4 shadow-tactile transition-shadow',
                    'flex flex-col justify-between cursor-pointer',
                    isTop ? 'border-foreground/30 shadow-md' : 'border-border/60 hover:border-border'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-secondary/60 flex items-center justify-center text-text-muted">
                        {file.icon || <FileText className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-text-primary line-clamp-1">
                          {file.title}
                        </div>
                        {file.subtitle && (
                          <div className="text-[10px] text-text-muted line-clamp-1">
                            {file.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    {file.badge && (
                      <Badge variant="secondary">
                        {file.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="my-auto py-2">
                    {file.content || (
                      <div className="space-y-1.5 opacity-60">
                        <div className="h-1.5 w-3/4 rounded-full bg-secondary" />
                        <div className="h-1.5 w-1/2 rounded-full bg-secondary" />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
                    <span>SHEET 0{idx + 1}</span>
                    <span className="capitalize">{isTop ? 'Active View' : 'Inspect'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quiet footer summary */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
          <span>{isExpanded ? 'Fanned preview active' : 'Click or hover to fan stack'}</span>
          <span className="font-mono text-[10px]">ESC TO RESET</span>
        </div>
      </div>
    </div>
  );
}
