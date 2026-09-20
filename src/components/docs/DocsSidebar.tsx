'use client';

import * as React from 'react';
import { Sidebar, SidebarGroup } from '@/components/ui/sidebar';
import componentsData from '@/registry/components.json';
import { ComponentMetadata } from '@/registry/schema';

const components: ComponentMetadata[] = componentsData as ComponentMetadata[];

export function DocsSidebar({ className }: { className?: string }) {
  const foundationItems = [
    { id: 'foundations-overview', label: 'Overview', href: '/foundations' },
    { id: 'foundations-colors', label: 'Colors & Theme', href: '/foundations#colors' },
    { id: 'foundations-typography', label: 'Typography Scale', href: '/foundations#typography' },
    { id: 'foundations-atmosphere', label: 'Atmosphere & Grain', href: '/foundations#atmosphere' },
    { id: 'foundations-motion', label: 'Motion Principles', href: '/foundations#motion' },
  ];

  const devItems = [
    { id: 'dev-cli', label: 'NickUI CLI', href: '/docs/cli' },
    { id: 'dev-mcp', label: 'AI MCP Server', href: '/docs/mcp' },
  ];

  const foundationComponents = components
    .filter((c) => c.category === 'foundations')
    .map((c) => ({ id: c.slug, label: c.title, href: `/components/${c.slug}` }));

  const surfaceComponents = components
    .filter((c) => c.category === 'surface')
    .map((c) => ({ id: c.slug, label: c.title, href: `/components/${c.slug}` }));

  const navigationComponents = components
    .filter((c) => c.category === 'navigation')
    .map((c) => ({ id: c.slug, label: c.title, href: `/components/${c.slug}` }));

  const interactionComponents = components
    .filter((c) => c.category === 'interaction')
    .map((c) => ({ id: c.slug, label: c.title, href: `/components/${c.slug}` }));

  const groups: SidebarGroup[] = [
    {
      title: 'Developer Experience',
      items: devItems,
    },
    {
      title: 'Foundations',
      items: foundationItems,
    },
    {
      title: 'Elements',
      items: foundationComponents,
    },
    {
      title: 'Surface',
      items: surfaceComponents,
    },
    {
      title: 'Navigation',
      items: navigationComponents,
    },
    {
      title: 'Interaction',
      items: interactionComponents,
    },
    {
      title: 'Composition',
      items: [
        { id: 'blocks', label: 'Production Blocks', href: '/blocks' },
      ],
    },
  ];

  return (
    <Sidebar
      groups={groups}
      className={className}
      footer={
        <div className="text-[11px] font-mono text-text-muted space-y-1">
          <div>NickUI v0.1.0</div>
          <div className="opacity-60">Developer-Owned & AI-Ready</div>
        </div>
      }
    />
  );
}
