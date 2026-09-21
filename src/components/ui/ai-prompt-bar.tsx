'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ArrowUp,
  Square,
  Paperclip,
  Globe,
  Brain,
  Code2,
  Mic,
  X,
  ChevronDown,
  Sparkles,
  FileText,
} from 'lucide-react';

export interface PromptAttachment {
  id: string;
  name: string;
  type?: string;
  size?: string;
}

export interface AiPromptBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (prompt: string, options: { model: string; tools: string[]; attachments: PromptAttachment[] }) => void;
  isLoading?: boolean;
  onStop?: () => void;
  placeholder?: string;
  models?: string[];
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  attachments?: PromptAttachment[];
  onRemoveAttachment?: (id: string) => void;
  maxTokens?: number;
  variant?: 'tactile' | 'recessed';
}

export function AiPromptBar({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSubmit,
  isLoading = false,
  onStop,
  placeholder = 'Ask anything, explore architectures, or simulate consensus...',
  models = ['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek R1', 'NickUI-Architect'],
  selectedModel: controlledModel,
  onModelChange,
  attachments: controlledAttachments,
  onRemoveAttachment,
  maxTokens = 8192,
  variant = 'tactile',
  className,
  ...props
}: AiPromptBarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const promptValue = controlledValue !== undefined ? controlledValue : internalValue;

  const [internalModel, setInternalModel] = React.useState(models[0] || 'NickUI-Architect');
  const currentModel = controlledModel !== undefined ? controlledModel : internalModel;

  const [modelDropdownOpen, setModelDropdownOpen] = React.useState(false);
  const [activeTools, setActiveTools] = React.useState<string[]>(['reason']);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [internalAttachments, setInternalAttachments] = React.useState<PromptAttachment[]>([
    { id: '1', name: 'telemetry_spec.ts', size: '14kb' },
  ]);
  const attachments = controlledAttachments !== undefined ? controlledAttachments : internalAttachments;

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [promptValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if ((!promptValue.trim() && attachments.length === 0) || isLoading) return;
    onSubmit?.(promptValue, {
      model: currentModel,
      tools: activeTools,
      attachments,
    });
    if (controlledValue === undefined) {
      setInternalValue('');
    }
  };

  const toggleTool = (tool: string) => {
    setActiveTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleRemoveAttachment = (id: string) => {
    if (onRemoveAttachment) {
      onRemoveAttachment(id);
    } else {
      setInternalAttachments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Rough token estimation (~4 chars per token)
  const tokenCount = Math.round(promptValue.length / 4);

  const variantClasses = {
    tactile: 'bg-card border border-border/80 shadow-tactile focus-within:border-foreground/40',
    recessed: 'bg-secondary/40 border border-border/60 shadow-inner-tactile focus-within:border-foreground/30',
  };

  return (
    <div
      className={cn(
        'w-full max-w-2xl rounded-2xl p-3 flex flex-col gap-2.5 transition-all select-none',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Context Attachments Strip */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-secondary/80 border border-border/60 text-xs font-mono text-text-primary"
            >
              <FileText className="w-3 h-3 text-text-muted shrink-0" />
              <span className="truncate max-w-[140px]">{att.name}</span>
              {att.size && <span className="text-[10px] text-text-muted">({att.size})</span>}
              <button
                type="button"
                onClick={() => handleRemoveAttachment(att.id)}
                className="text-text-muted hover:text-text-primary p-0.5 rounded cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Textarea Input */}
      <div className="px-1">
        <textarea
          ref={textareaRef}
          value={promptValue}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none leading-relaxed min-h-[44px] max-h-[200px]"
        />
      </div>

      {/* Control Strip & Submit Row */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/40 text-xs">
        {/* Left Tools & Model Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Model Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/60 text-xs font-medium text-text-primary transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-text-muted" />
              <span>{currentModel}</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>

            <AnimatePresence>
              {modelDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute bottom-full left-0 mb-1.5 w-48 rounded-xl bg-card border border-border shadow-xl p-1 z-30 flex flex-col"
                >
                  {models.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        if (controlledModel === undefined) setInternalModel(m);
                        onModelChange?.(m);
                        setModelDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
                        currentModel === m
                          ? 'bg-secondary text-text-primary font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-secondary/50'
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tool Toggle: Deep Reason */}
          <button
            type="button"
            onClick={() => toggleTool('reason')}
            title="Deep Reasoning"
            className={cn(
              'p-1.5 rounded-lg border transition-colors cursor-pointer',
              activeTools.includes('reason')
                ? 'bg-secondary border-border text-text-primary shadow-2xs'
                : 'border-transparent text-text-muted hover:text-text-primary hover:bg-secondary/50'
            )}
          >
            <Brain className="w-3.5 h-3.5" />
          </button>

          {/* Tool Toggle: Web Search */}
          <button
            type="button"
            onClick={() => toggleTool('search')}
            title="Live Web Search"
            className={cn(
              'p-1.5 rounded-lg border transition-colors cursor-pointer',
              activeTools.includes('search')
                ? 'bg-secondary border-border text-text-primary shadow-2xs'
                : 'border-transparent text-text-muted hover:text-text-primary hover:bg-secondary/50'
            )}
          >
            <Globe className="w-3.5 h-3.5" />
          </button>

          {/* Tool Toggle: Code Interpreter */}
          <button
            type="button"
            onClick={() => toggleTool('code')}
            title="Code Interpreter"
            className={cn(
              'p-1.5 rounded-lg border transition-colors cursor-pointer',
              activeTools.includes('code')
                ? 'bg-secondary border-border text-text-primary shadow-2xs'
                : 'border-transparent text-text-muted hover:text-text-primary hover:bg-secondary/50'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Controls: Token Counter & Send Button */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-text-muted tabular-nums hidden sm:inline-block">
            {tokenCount} / {maxTokens} tokens
          </span>

          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              className="w-8 h-8 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!promptValue.trim() && attachments.length === 0}
              aria-label="Send prompt"
              className={cn(
                'w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95'
              )}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
