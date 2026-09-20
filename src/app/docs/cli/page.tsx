'use client';

import * as React from 'react';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Terminal, Copy, Check, ArrowRight, Layers, ShieldCheck, Cpu } from 'lucide-react';

export default function CliDocPage() {
  return (
    <>
      <SiteNavbar />

      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground pt-20">
        <div className="max-w-7xl mx-auto flex">
          {/* Docs Sidebar */}
          <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <DocsSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 px-6 md:px-12 py-10 max-w-4xl space-y-12">
            {/* Header */}
            <div className="space-y-4 pb-8 border-b border-border/80">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                  Developer Experience
                </span>
                <Badge variant="engraved" className="ml-1">CLI v0.1.0</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-text-primary">
                NickUI CLI
              </h1>

              <p className="text-body text-text-secondary leading-relaxed max-w-2xl text-base">
                NickUI embraces developer ownership. Use the CLI to copy and inject component source code directly into your repository, giving you 100% control to customize styling, motion, and behavior.
              </p>
            </div>

            {/* Quick Start Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Quick Start
              </h2>

              <div className="space-y-4">
                <h3 className="text-base font-medium text-text-primary">1. Initialize your project</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Scans your repository, detects your project structure (`src/components/ui` or `components/ui`), creates `nickui.json`, and provides `cn()` utilities.
                </p>
                <CodeBlock
                  code="pnpm dlx @sehrennn/nickui init"
                  language="bash"
                  title="Terminal"
                />
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-base font-medium text-text-primary">2. Add components</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Fetches component source from the registry and injects clean TypeScript components directly into your UI folder.
                </p>
                <CodeBlock
                  code={`# Add individual components\npnpm dlx @sehrennn/nickui add button\n\n# Add multiple components simultaneously\npnpm dlx @sehrennn/nickui add card otp-input spotlight-card magnetic-tabs\n\n# Add all 31 components\npnpm dlx @sehrennn/nickui add all`}
                  language="bash"
                  title="Terminal"
                />
              </div>
            </section>

            {/* Configuration File */}
            <section className="space-y-6 pt-4 border-t border-border/60">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                  Configuration (`nickui.json`)
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  The configuration file defines where NickUI places component files and resolves import aliases.
                </p>
              </div>

              <CodeBlock
                code={`{
  "$schema": "https://nickui.dev/schema.json",
  "style": "tactile",
  "rsc": true,
  "tailwind": {
    "css": "src/app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`}
                language="json"
                title="nickui.json"
              />
            </section>

            {/* CLI Commands Reference Table */}
            <section className="space-y-6 pt-4 border-t border-border/60">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Command Reference
              </h2>

              <div className="border border-border/70 rounded-xl overflow-hidden bg-card/40">
                <table className="w-full text-xs text-left">
                  <thead className="bg-secondary/60 text-text-muted border-b border-border/60 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3.5">Command</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-mono">
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">nickui init</td>
                      <td className="p-3.5 text-text-secondary font-sans">Initialize NickUI configuration & utility helpers.</td>
                      <td className="p-3.5 text-text-muted">—</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">nickui add [name...]</td>
                      <td className="p-3.5 text-text-secondary font-sans">Inject component source code into your repository.</td>
                      <td className="p-3.5 text-text-muted">-o, --overwrite</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">nickui list</td>
                      <td className="p-3.5 text-text-secondary font-sans">List all 27 available registry components and variants.</td>
                      <td className="p-3.5 text-text-muted">—</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">nickui mcp</td>
                      <td className="p-3.5 text-text-secondary font-sans">Start the official NickUI Model Context Protocol AI server.</td>
                      <td className="p-3.5 text-text-muted">stdio</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Comparison Cards */}
            <section className="space-y-6 pt-4 border-t border-border/60">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Two Consumption Pathways
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="tactile">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="engraved">Option A</Badge>
                      <span className="text-[10px] font-mono text-text-muted">Managed</span>
                    </div>
                    <CardTitle className="text-lg mt-2">Package Dependency</CardTitle>
                    <CardDescription>
                      Install via npm/pnpm. Ideal for fast prototyping and centralized version updates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CodeBlock code="pnpm add nickui" language="bash" />
                    <p className="text-xs text-text-muted leading-relaxed">
                      Imports cleanly from <code className="font-mono text-text-primary">nickui</code> with full TypeScript types and tree-shaking.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="tactile">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="engraved">Option B</Badge>
                      <span className="text-[10px] font-mono text-text-muted">Developer-Owned</span>
                    </div>
                    <CardTitle className="text-lg mt-2">Source Code (shadcn-style)</CardTitle>
                    <CardDescription>
                      Inject source code into your project. Ideal for full customization and bespoke styling.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CodeBlock code="pnpm dlx nickui add button" language="bash" />
                    <p className="text-xs text-text-muted leading-relaxed">
                      Components live in your <code className="font-mono text-text-primary">src/components/ui/</code>. Modify anything at will.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
