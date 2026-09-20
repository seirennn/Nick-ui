import * as React from 'react';
import { PropDefinition } from '@/registry/schema';

export function PropsTable({ props }: { props: PropDefinition[] }) {
  if (!props || props.length === 0) {
    return (
      <div className="py-4 text-metadata text-text-muted">
        No configurable props defined for this component.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-secondary/40 text-sidebar-category uppercase tracking-wider text-text-muted">
            <th className="py-3 px-4 font-medium">Prop</th>
            <th className="py-3 px-4 font-medium">Type</th>
            <th className="py-3 px-4 font-medium">Default</th>
            <th className="py-3 px-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 text-ui">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-secondary/20 transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-text-primary">
                {p.name}
                {p.required && <span className="text-destructive ml-1">*</span>}
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-text-secondary">
                {p.type}
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-text-muted">
                {p.defaultValue || '—'}
              </td>
              <td className="py-3 px-4 text-body text-text-secondary">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
