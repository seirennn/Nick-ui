'use client';

import * as React from 'react';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Bot, Terminal, Sparkles, Check, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function McpDocPage() {
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
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                  AI Integration
                </span>
                <Badge variant="engraved" className="ml-1">MCP stdio</Badge>
                <Badge variant="status" status="success">100% Free & Open Source</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-text-primary">
                AI MCP Server
              </h1>

              <p className="text-body text-text-secondary leading-relaxed max-w-2xl text-base">
                NickUI includes a native, completely free and open-source <strong>Model Context Protocol (MCP)</strong> server. It empowers AI coding agents (Cursor, Claude, Copilot, Antigravity) to discover, understand, and compose NickUI components without hallucination.
              </p>
            </div>

            {/* How It Works Diagram */}
            <section className="space-y-6">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Why AI Needs the NickUI MCP
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-card border border-destructive/30 space-y-3">
                  <div className="text-destructive font-mono text-xs font-semibold uppercase">
                    Without NickUI MCP (Hallucination)
                  </div>
                  <ul className="text-xs text-text-muted space-y-2 list-disc list-inside">
                    <li>AI invents non-existent components and fake props.</li>
                    <li>Defaults to generic, saturated rainbow gradients.</li>
                    <li>Misses tactile depth tiers (recessed wells, specular rims).</li>
                    <li>Uses incorrect import paths and broken syntax.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border/80 tactile-surface space-y-3">
                  <div className="text-text-primary font-mono text-xs font-semibold uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    With NickUI MCP (Verified Precision)
                  </div>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
                    <li>AI queries the registry to find the exact component.</li>
                    <li>Enforces authentic portfolio guidelines (atmosphere over ornament).</li>
                    <li>Correctly specifies depth tiers: <code className="font-mono text-text-primary">variant="tactile"</code>.</li>
                    <li>Generates verified, accessible code with proper types.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Setup Configurations */}
            <section className="space-y-8 pt-4 border-t border-border/60">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                  Configuration Setup
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Connect NickUI MCP to your preferred AI coding environment in seconds.
                </p>
              </div>

              {/* Cursor Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-text-primary">Cursor Setup</h3>
                  <Badge variant="mono">.cursor/mcp.json</Badge>
                </div>
                <CodeBlock
                  code={`{
  "mcpServers": {
    "nickui": {
      "command": "npx",
      "args": ["-y", "@sehrennn/nickui", "mcp"]
    }
  }
}`}
                  language="json"
                  title=".cursor/mcp.json"
                />
              </div>

              {/* Claude Desktop Configuration */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-text-primary">Claude Desktop Setup</h3>
                  <Badge variant="mono">claude_desktop_config.json</Badge>
                </div>
                <CodeBlock
                  code={`{
  "mcpServers": {
    "nickui": {
      "command": "pnpm",
      "args": ["dlx", "@sehrennn/nickui", "mcp"]
    }
  }
}`}
                  language="json"
                  title="claude_desktop_config.json"
                />
              </div>
            </section>

            {/* Exposed MCP Tools */}
            <section className="space-y-6 pt-4 border-t border-border/60">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Exposed MCP Tools
              </h2>

              <div className="border border-border/70 rounded-xl overflow-hidden bg-card/40">
                <table className="w-full text-xs text-left">
                  <thead className="bg-secondary/60 text-text-muted border-b border-border/60 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3.5">Tool Name</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">Parameters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-mono">
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">search_components</td>
                      <td className="p-3.5 text-text-secondary font-sans">Search 27 components by query or category.</td>
                      <td className="p-3.5 text-text-muted">query?, category?</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">get_component</td>
                      <td className="p-3.5 text-text-secondary font-sans">Inspect props, variants, sizes, and accessibility rules.</td>
                      <td className="p-3.5 text-text-muted">name</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">get_component_source</td>
                      <td className="p-3.5 text-text-secondary font-sans">Retrieve complete TypeScript component code.</td>
                      <td className="p-3.5 text-text-muted">name</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">get_component_examples</td>
                      <td className="p-3.5 text-text-secondary font-sans">Get working code snippets and patterns.</td>
                      <td className="p-3.5 text-text-muted">name</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">get_design_tokens</td>
                      <td className="p-3.5 text-text-secondary font-sans">Palettes (#f5f2eb / #101010), depth tiers, radii, springs.</td>
                      <td className="p-3.5 text-text-muted">—</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 text-text-primary font-medium">get_guidelines</td>
                      <td className="p-3.5 text-text-secondary font-sans">Atmosphere over ornament, ambient light, motion rules.</td>
                      <td className="p-3.5 text-text-muted">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Agent Workflow Demonstration */}
            <section className="space-y-6 pt-4 border-t border-border/60">
              <h2 className="text-2xl font-medium tracking-tight text-text-primary">
                Example AI Agent Dialogue
              </h2>

              <div className="space-y-4 p-5 rounded-2xl bg-card border border-border/80 shadow-tactile text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] text-text-muted uppercase">Developer Prompt</span>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-text-primary">
                    &quot;Build me an avionics telemetry card with a pin code lock using NickUI.&quot;
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[11px] text-emerald-500 uppercase flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" /> AI Agent Action via MCP
                  </span>
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/60 space-y-1.5 text-text-secondary font-mono text-[11px]">
                    <div>1. Calls <span className="text-text-primary">search_components(&apos;telemetry&apos;)</span> → finds SpotlightCard, Gauge</div>
                    <div>2. Calls <span className="text-text-primary">get_component(&apos;otp-input&apos;)</span> → retrieves length, variant=&apos;recessed&apos;</div>
                    <div>3. Calls <span className="text-text-primary">get_guidelines()</span> → verifies ambient light falloff rule</div>
                    <div className="text-emerald-500 pt-1">✔ Composes pixel-perfect tactile code matching the portfolio design system!</div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
