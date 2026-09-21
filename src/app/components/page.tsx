'use client';

import * as React from 'react';
import Link from 'next/link';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowUpRight } from 'lucide-react';
import componentsData from '@/registry/components.json';
import { ComponentCategory } from '@/registry/schema';

export default function ComponentsCatalogPage() {
  const [query, setQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'foundations', label: 'Elements' },
    { id: 'primitives', label: 'Primitives' },
    { id: 'surface', label: 'Surface' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'interaction', label: 'Interaction' },
  ];

  const filteredComponents = componentsData.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.variants.some((v) => v.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

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
          <main className="flex-1 px-6 md:px-12 py-10 max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sidebar-category uppercase tracking-wider text-text-muted font-medium">
                  Component Architecture
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
                Components
              </h1>
              <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
                A curated collection of developer-owned primitives engineered for spatial clarity,
                restrained typography, and environmental cohesion.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-ui transition-colors cursor-pointer select-none whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-card text-text-primary font-medium border border-border shadow-2xs'
                        : 'text-text-muted hover:text-text-primary hover:bg-card/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="max-w-xs w-full">
                <Input
                  leftIcon={<Search className="w-4 h-4 text-text-muted" />}
                  placeholder="Filter components..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredComponents.map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="p-5 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all flex flex-col justify-between group h-full shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sidebar-category uppercase tracking-wider text-text-muted">
                        {c.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-text-muted opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h3 className="text-component-title text-text-primary font-medium">
                      {c.title}
                    </h3>

                    <p className="text-body text-text-secondary text-xs leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {c.variants.slice(0, 2).map((v) => (
                        <span key={v} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-text-muted">
                          {v}
                        </span>
                      ))}
                      {c.variants.length > 2 && (
                        <span className="text-[10px] font-mono px-1 text-text-muted">
                          +{c.variants.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-metadata text-text-muted text-[11px] group-hover:text-text-primary transition-colors">
                      View API →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredComponents.length === 0 && (
              <div className="py-16 text-center text-text-muted space-y-2">
                <p className="text-ui">No components match your search query.</p>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-text-primary underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
