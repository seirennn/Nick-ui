import * as React from 'react';
import { notFound } from 'next/navigation';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import componentsData from '@/registry/components.json';
import { ComponentMetadata } from '@/registry/schema';
import { ComponentInteractiveHarness } from './ComponentInteractiveHarness';

const components: ComponentMetadata[] = componentsData as ComponentMetadata[];

export function generateStaticParams() {
  return components.map((c) => ({
    slug: c.slug,
  }));
}

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);

  if (!component) {
    notFound();
  }

  return (
    <>
      <SiteNavbar />

      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground pt-20">
        <div className="max-w-7xl mx-auto flex">
          {/* Docs Left Navigation Sidebar */}
          <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] w-64 shrink-0 overflow-hidden">
            <DocsSidebar className="h-full" />
          </div>

          {/* Main Content Pane */}
          <main className="flex-1 px-6 md:px-12 py-10 max-w-4xl space-y-12">
            {/* Component Header */}
            <div className="space-y-3 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Badge variant="mono">{component.category}</Badge>
                <span className="text-metadata text-text-muted">nickui / {component.name}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
                {component.title}
              </h1>

              <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
                {component.description}
              </p>

              {/* Quick Install Bar */}
              <div className="p-3 rounded-xl bg-card border border-border/80 shadow-tactile flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-text-muted uppercase text-[10px]">Source CLI:</span>
                  <span className="text-text-primary select-all">pnpm dlx @sehrennn/nickui add {component.slug}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted uppercase text-[10px]">Package:</span>
                  <span className="text-text-primary select-all">import &#123; {component.title.replace(/\s+/g, '')} &#125; from &apos;@sehrennn/nickui&apos;;</span>
                </div>
              </div>

              {component.dependencies.length > 0 && (
                <div className="flex items-center gap-2 pt-1 text-xs text-text-muted font-mono">
                  <span>Peer Dependencies:</span>
                  {component.dependencies.map((dep) => (
                    <span key={dep} className="px-1.5 py-0.5 rounded bg-muted text-text-muted border border-border/40">
                      {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Preview Harness */}
            <section className="space-y-4">
              <h2 className="text-component-title text-text-primary font-medium">Interactive Preview</h2>
              <ComponentInteractiveHarness slug={component.slug} />
            </section>

            <Separator />

            {/* Usage & Examples */}
            <section className="space-y-6">
              <h2 className="text-component-title text-text-primary font-medium">Usage Examples</h2>
              {component.examples.map((ex, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-ui font-medium text-text-primary">{ex.title}</h3>
                  <p className="text-body text-text-secondary text-xs">{ex.description}</p>
                  <CodeBlock code={ex.code} language="tsx" />
                </div>
              ))}
            </section>

            <Separator />

            {/* API / Props Specification */}
            <section className="space-y-4">
              <h2 className="text-component-title text-text-primary font-medium">Props & API Reference</h2>
              <PropsTable props={component.props} />
            </section>

            <Separator />

            {/* Accessibility Conventions */}
            <section className="space-y-4">
              <h2 className="text-component-title text-text-primary font-medium">Accessibility</h2>
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                {component.accessibility.map((a11y, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-ui font-medium text-text-primary">{a11y.requirement}</h4>
                    <p className="text-body text-text-secondary text-xs">{a11y.implementation}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Design System Rules & Rationale */}
            <section className="space-y-4 pb-16">
              <h2 className="text-component-title text-text-primary font-medium">Design System Rules</h2>
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                {component.designRules.map((rule, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <h4 className="text-ui font-medium text-text-primary">{rule.rule}</h4>
                    </div>
                    <p className="text-body text-text-secondary text-xs pl-3.5">{rule.rationale}</p>
                    {rule.forbidden.length > 0 && (
                      <div className="pl-3.5 pt-1 flex items-center gap-1.5 text-[11px] font-mono text-destructive">
                        <span>Prohibited:</span>
                        {rule.forbidden.map((f) => (
                          <span key={f} className="px-1 py-0.5 rounded bg-destructive/10">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
