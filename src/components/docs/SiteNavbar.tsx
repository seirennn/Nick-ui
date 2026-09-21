'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, NavItem } from '@/components/ui/navbar';
import { ThemeToggle } from '@/components/docs/ThemeToggle';
import { CommandPalette, CommandItem } from '@/components/ui/command-palette';
import { Kbd } from '@/components/ui/kbd';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Layers, Terminal, Sparkles, Sliders, ToggleLeft, Github, Bot, TerminalSquare } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { BrandLogo } from '@/components/brand/BrandLogo';
import componentsData from '@/registry/components.json';

export function SiteNavbar() {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Overview', href: '/' },
    { id: 'components', label: 'Components', href: '/components' },
    { id: 'cli', label: 'CLI', href: '/docs/cli' },
    { id: 'mcp', label: 'MCP Server', href: '/docs/mcp' },
    { id: 'blocks', label: 'Blocks', href: '/blocks' },
    { id: 'foundations', label: 'Foundations', href: '/foundations' },
  ];

  const commandItems: CommandItem[] = [
    {
      id: 'go-home',
      title: 'Go to Overview',
      category: 'Navigation',
      shortcut: 'G H',
      icon: <Sparkles className="w-4 h-4" />,
      onSelect: () => router.push('/'),
    },
    {
      id: 'go-components',
      title: 'Browse All 27 Components',
      category: 'Navigation',
      shortcut: 'G C',
      icon: <BookOpen className="w-4 h-4" />,
      onSelect: () => router.push('/components'),
    },
    {
      id: 'go-cli',
      title: 'NickUI CLI Guide (pnpm dlx @sehrennn/nickui add)',
      category: 'Developer Experience',
      shortcut: 'G X',
      icon: <TerminalSquare className="w-4 h-4" />,
      onSelect: () => router.push('/docs/cli'),
    },
    {
      id: 'go-mcp',
      title: 'MCP Server Guide (Cursor, Claude, Zed)',
      category: 'Developer Experience',
      shortcut: 'G M',
      icon: <Bot className="w-4 h-4" />,
      onSelect: () => router.push('/docs/mcp'),
    },
    {
      id: 'go-blocks',
      title: 'Explore Production Blocks & Dashboards',
      category: 'Navigation',
      shortcut: 'G B',
      icon: <Sliders className="w-4 h-4" />,
      onSelect: () => router.push('/blocks'),
    },
    {
      id: 'go-foundations',
      title: 'Design Foundations & Tactile Tiers',
      category: 'Navigation',
      shortcut: 'G F',
      icon: <Layers className="w-4 h-4" />,
      onSelect: () => router.push('/foundations'),
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Color Theme (Dark / Light)',
      category: 'Actions',
      shortcut: 'T',
      icon: <Terminal className="w-4 h-4" />,
      onSelect: toggleTheme,
    },
    ...componentsData.map((c) => ({
      id: `comp-${c.slug}`,
      title: `${c.title} — ${c.description.slice(0, 48)}...`,
      category: 'Components',
      icon: <Layers className="w-4 h-4" />,
      onSelect: () => router.push(`/components/${c.slug}`),
    })),
  ];

  return (
    <>
      <Navbar
        brand={
          <Link href="/" className="flex items-center select-none group">
            <BrandLogo size="sm" showText variant="minimal" />
          </Link>
        }
        items={navItems}
        searchSlot={
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs text-text-muted bg-secondary/40 hover:bg-secondary/70 border border-border/60 transition-colors cursor-pointer select-none"
            aria-label="Search components"
          >
            <Search className="w-3.5 h-3.5 text-text-muted" />
            <span className="hidden lg:inline text-text-secondary/70 text-[11px]">Search...</span>
            <div className="flex items-center gap-0.5 text-[10px] font-mono opacity-60">
              <span>⌘K</span>
            </div>
          </button>
        }
        actions={
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="https://github.com/seirennn/Nick-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-secondary/60 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        }
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={commandItems}
      />
    </>
  );
}
