'use client';

import * as React from 'react';
import { Sidebar, SidebarGroup, SidebarItem } from '@/components/ui/sidebar';
import componentsData from '@/registry/components.json';
import { ComponentMetadata } from '@/registry/schema';

const components: ComponentMetadata[] = componentsData as ComponentMetadata[];

export function DocsSidebar({ className }: { className?: string }) {
  const foundationItems: SidebarItem[] = [
    { id: 'foundations-overview', label: 'Overview', href: '/foundations' },
    { id: 'foundations-colors', label: 'Colors & Theme', href: '/foundations#colors' },
    { id: 'foundations-typography', label: 'Typography Scale', href: '/foundations#typography' },
    { id: 'foundations-atmosphere', label: 'Atmosphere & Grain', href: '/foundations#atmosphere' },
    { id: 'foundations-motion', label: 'Motion Principles', href: '/foundations#motion' },
    { id: 'foundations-depth', label: 'Tactile Depth Tiers', href: '/foundations#depth' },
  ];

  const devItems: SidebarItem[] = [
    { id: 'dev-cli', label: 'NickUI CLI', href: '/docs/cli' },
    { id: 'dev-mcp', label: 'AI MCP Server', href: '/docs/mcp' },
  ];

  const getCompItems = (slugs: string[]): SidebarItem[] => {
    return slugs
      .map((slug) => {
        const c = components.find((item) => item.slug === slug);
        return c ? { id: c.slug, label: c.title, href: `/components/${c.slug}` } : null;
      })
      .filter((item): item is SidebarItem => item !== null);
  };

  const elementSlugs = [
    'button',
    'icon-button',
    'input',
    'textarea',
    'badge',
    'separator',
    'kbd',
    'segmented-control',
    'knob',
  ];

  const surfaceSlugs = [
    'card',
    'spotlight-card',
    'folder-preview',
    'stack-deck',
  ];

  const analyticsSlugs = [
    'area-chart',
    'bar-chart',
    'candlestick-chart',
    'dot-matrix-chart',
    'gauge',
    'sparkline',
    'radar-chart',
    'radial-meter',
    'analytics-heatmap',
    'tactile-trend-card',
    'tactile-metric-card',
  ];

  const aiSlugs = [
    'ai-churning',
    'ai-prompt-bar',
    'ai-thinking',
    'ai-streaming-text',
  ];

  const navigationSlugs = [
    'navbar',
    'sidebar',
    'rail-sidebar',
    'studio-sidebar',
    'tabs',
    'magnetic-tabs',
  ];

  const interactionSlugs = [
    'tooltip',
    'dropdown',
    'command-palette',
    'switch',
    'slider',
    'checkbox',
    'radio',
    'otp-input',
  ];

  const groups: SidebarGroup[] = [
    {
      title: 'Developer Experience',
      items: devItems,
    },
    {
      title: 'Design Foundations',
      items: foundationItems,
    },
    {
      title: 'Elements & Primitives',
      items: getCompItems(elementSlugs),
    },
    {
      title: 'Surfaces & Depth',
      items: getCompItems(surfaceSlugs),
    },
    {
      title: 'Analytics & Telemetry',
      items: getCompItems(analyticsSlugs),
    },
    {
      title: 'AI & Intelligence',
      items: getCompItems(aiSlugs),
    },
    {
      title: 'Navigation',
      items: getCompItems(navigationSlugs),
    },
    {
      title: 'Interaction',
      items: getCompItems(interactionSlugs),
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
          <div className="flex items-center justify-between">
            <span>NickUI</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/80 text-text-primary border border-border/60">
              v0.1.0
            </span>
          </div>
          <div className="opacity-60 text-[10px]">Developer-Owned & AI-Ready</div>
        </div>
      }
    />
  );
}
