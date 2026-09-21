'use client';

import * as React from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

function highlightSyntax(line: string): React.ReactNode[] {
  // Editorial restrained tokenizer: strictly avoiding gaudy saturated rainbow colors
  const tokenRegex =
    /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[\w.-]+|\/?>)|(\b(?:import|export|from|const|let|var|return|function|interface|type|extends|default|as|true|false|null|undefined)\b)|(\b[\w-]+(?==))|(\b\d+(?:\.\d+)?\b)|([{}()[\].,;:?|=!<>+-])/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={lastIndex} className="text-text-secondary">
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const [full, comment, str, jsxTag, keyword, prop, num, punct] = match;

    if (comment) {
      parts.push(
        <span key={match.index} className="text-text-muted/60 italic">
          {comment}
        </span>
      );
    } else if (str) {
      parts.push(
        <span key={match.index} className="text-[#a8a29e] dark:text-[#c4b5a0] font-normal">
          {str}
        </span>
      );
    } else if (jsxTag) {
      parts.push(
        <span key={match.index} className="text-text-primary font-medium">
          {jsxTag}
        </span>
      );
    } else if (keyword) {
      parts.push(
        <span key={match.index} className="text-text-primary font-semibold">
          {keyword}
        </span>
      );
    } else if (prop) {
      parts.push(
        <span key={match.index} className="text-text-secondary font-normal">
          {prop}
        </span>
      );
    } else if (num) {
      parts.push(
        <span key={match.index} className="text-text-primary font-mono">
          {num}
        </span>
      );
    } else if (punct) {
      parts.push(
        <span key={match.index} className="text-text-muted/70">
          {punct}
        </span>
      );
    } else {
      parts.push(<span key={match.index}>{full}</span>);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={lastIndex} className="text-text-secondary">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return parts.length > 0 ? parts : [line];
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={cn('rounded-xl bg-[#faf8f5] dark:bg-[#0e0e0e] border border-border overflow-hidden shadow-2xs group', className)}>
      {/* Editorial Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/70 bg-secondary/30 dark:bg-black/20">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted font-medium select-none">
            {language}
          </span>
          {title && (
            <>
              <span className="w-px h-3 bg-border/60" />
              <span className="font-mono text-[11px] text-text-secondary select-none">
                {title}
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-text-muted hover:text-text-primary hover:bg-secondary/70 transition-colors cursor-pointer select-none"
          aria-label={copied ? 'Copied code' : 'Copy code'}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Formatted Code Canvas */}
      <div className="overflow-x-auto p-4 sm:p-5">
        <pre className="text-[12.5px] font-mono leading-[22px] selection:bg-primary/20 selection:text-text-primary">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-5 select-none text-[11px] font-mono text-text-muted/30 text-right w-7">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell whitespace-pre">
                  {highlightSyntax(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
