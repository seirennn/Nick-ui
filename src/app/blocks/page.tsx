'use client';

import * as React from 'react';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';
import { AnalyticsDashboard } from '@/components/blocks/AnalyticsDashboard';
import { InfrastructureConsole } from '@/components/blocks/InfrastructureConsole';
import { WorkspaceSettingsBlock } from '@/components/blocks/WorkspaceSettingsBlock';
import { CenteredHeroLayout } from '@/components/blocks/landing/CenteredHeroLayout';
import { FeatureGridLayout } from '@/components/blocks/landing/FeatureGridLayout';
import { SplitShowcaseLayout } from '@/components/blocks/landing/SplitShowcaseLayout';
import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';
import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';
import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';
import { SpotlightCard, SpotlightCardHeader, SpotlightCardTitle, SpotlightCardDescription, SpotlightCardContent } from '@/components/ui/spotlight-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/docs/CodeBlock';
import {
  DollarSign,
  Server,
  Shield,
  Eye,
  Code2,
  Copy,
  Check,
  Sparkles,
  LayoutTemplate,
  Activity,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

const FLAGSHIP_CODE = `import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-background">
      <TactileStudioDashboard />
    </main>
  );
}`;

const DOT_MATRIX_CODE = `import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';

export default function RevenueOverview() {
  return (
    <DotMatrixChart
      title="REVENUE"
      metric="+326%"
      timeframe="MONTHLY"
      previousLabel="MAY $3,250"
      currentLabel="JUN $12,392"
      footerTagline="DON'T OVERTHINK | AUG 2024 | SIMPLIFYING DIGITAL EXP."
    />
  );
}`;

const TREND_CARD_CODE = `import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';

export default function TrendAnalysis() {
  return (
    <TactileTrendCard
      title="Chart"
      keywords={['Batch auction', 'Liquid staking derivatives (LSD)']}
      metricLabel="Total Personas"
      metricValue="824"
      metricDeltaSuperscript="+334"
      percentageDelta="34.4%"
    />
  );
}`;

const METRIC_CARDS_CODE = `import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';

export default function FinancialKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TactileMetricCard
        title="Balance"
        periodLabel="2023"
        value="$94,127"
        deltaText="increase 13%"
        deltaSubtext="vs last year"
      />
      <TactileBarCard
        title="Income"
        periodLabel="This Month"
        value="$12,532"
        deltaText="increase 12%"
        deltaSubtext="vs last month"
      />
    </div>
  );
}`;

const HERO_CODE = `import { CenteredHeroLayout } from '@/components/blocks/landing/CenteredHeroLayout';

export default function LandingPage() {
  return (
    <CenteredHeroLayout
      badgeText="NickUI v0.1.0 · Open Source Release"
      badgeHref="/components"
      title={<>Architectural design system for <span className="text-text-muted">developer-owned software</span>.</>}
      description="High-craft UI components, tactile depth tiers, and native AI MCP server."
      primaryAction={{ label: 'Explore Components', href: '/components' }}
      secondaryAction={{ label: 'CLI Documentation', href: '/docs/cli' }}
      commandSnippet="pnpm dlx nickui add button"
    />
  );
}`;

const FEATURE_GRID_CODE = `import { FeatureGridLayout } from '@/components/blocks/landing/FeatureGridLayout';

export default function FeaturesSection() {
  return (
    <FeatureGridLayout
      category="CAPABILITIES & PRINCIPLES"
      title="Engineered for spatial clarity & architectural presence."
      description="Every component is built from the ground up to respect environmental lighting and calm motion."
    />
  );
}`;

const SPLIT_SHOWCASE_CODE = `import { SplitShowcaseLayout } from '@/components/blocks/landing/SplitShowcaseLayout';
import { SpotlightCard, SpotlightCardHeader, SpotlightCardTitle, SpotlightCardDescription, SpotlightCardContent } from '@/components/ui/spotlight-card';

export default function ShowcaseSection() {
  return (
    <SplitShowcaseLayout
      category="DESIGN PARADIGM"
      title="Optical physics meets calm, non-intrusive software."
      showcaseNode={
        <SpotlightCard variant="tactile">
          <SpotlightCardHeader>
            <SpotlightCardTitle>Telemetry Node</SpotlightCardTitle>
            <SpotlightCardDescription>Pass pointer to observe ambient light.</SpotlightCardDescription>
          </SpotlightCardHeader>
          <SpotlightCardContent>420px soft falloff</SpotlightCardContent>
        </SpotlightCard>
      }
    />
  );
}`;

const ANALYTICS_CODE = `import { AnalyticsDashboard } from '@/components/blocks/AnalyticsDashboard';

export default function OverviewPage() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <AnalyticsDashboard />
    </main>
  );
}`;

const INFRASTRUCTURE_CODE = `import { InfrastructureConsole } from '@/components/blocks/InfrastructureConsole';

export default function ClusterPage() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <InfrastructureConsole />
    </main>
  );
}`;

const SETTINGS_CODE = `import { WorkspaceSettingsBlock } from '@/components/blocks/WorkspaceSettingsBlock';

export default function SettingsPage() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <WorkspaceSettingsBlock />
    </main>
  );
}`;

export default function BlocksPage() {
  const [activeTab, setActiveTab] = React.useState('all');

  // Preview / Code toggles for each block
  const [flagshipView, setFlagshipView] = React.useState<'preview' | 'code'>('preview');
  const [dotMatrixView, setDotMatrixView] = React.useState<'preview' | 'code'>('preview');
  const [trendView, setTrendView] = React.useState<'preview' | 'code'>('preview');
  const [metricView, setMetricView] = React.useState<'preview' | 'code'>('preview');
  const [heroView, setHeroView] = React.useState<'preview' | 'code'>('preview');
  const [featureView, setFeatureView] = React.useState<'preview' | 'code'>('preview');
  const [splitView, setSplitView] = React.useState<'preview' | 'code'>('preview');
  const [analyticsView, setAnalyticsView] = React.useState<'preview' | 'code'>('preview');
  const [infraView, setInfraView] = React.useState<'preview' | 'code'>('preview');
  const [settingsView, setSettingsView] = React.useState<'preview' | 'code'>('preview');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="mono" className="text-xs">
              Open-Source Blocks · 10 Pre-built Patterns
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
            Blocks & Architectural Dashboards
          </h1>
          <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
            Full-width responsive application dashboards, tactile physical telemetry widgets, and landing page layouts built exclusively with <span className="font-mono text-text-primary font-medium">nickui</span> primitives.
          </p>

          {/* Category Filter Deck */}
          <div className="pt-4 flex items-center justify-between gap-4 flex-wrap">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap gap-1 h-auto p-1">
                <TabsTrigger value="all">All Blocks</TabsTrigger>
                <TabsTrigger value="flagship">Flagship Studio</TabsTrigger>
                <TabsTrigger value="tactile">Tactile Metrics</TabsTrigger>
                <TabsTrigger value="landing">Landing Layouts</TabsTrigger>
                <TabsTrigger value="analytics">Revenue Telemetry</TabsTrigger>
                <TabsTrigger value="infrastructure">Cloud Console</TabsTrigger>
                <TabsTrigger value="settings">Security & Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Blocks Showcase Stack */}
        <div className="space-y-20">
          {/* BLOCK 1: FLAGSHIP TACTILE STUDIO DASHBOARD */}
          {(activeTab === 'all' || activeTab === 'flagship') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Tactile Studio Dashboard (Flagship Operations)
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Unified executive dashboard featuring the RailSidebar, dot-matrix revenue equalizer, organic wave trend card, and real-time settlement stream.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={flagshipView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFlagshipView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={flagshipView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFlagshipView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {flagshipView === 'preview' ? (
                <TactileStudioDashboard />
              ) : (
                <CodeBlock code={FLAGSHIP_CODE} title="TactileStudioDashboard.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 2: TACTILE METRIC WIDGETS */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Tactile Financial Metrics (Balance & Income)
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Tactile dark widgets with vertical color indicators, monthly node beam tooltips, active amber bar tag, and average threshold reference line.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={metricView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMetricView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={metricView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMetricView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {metricView === 'preview' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-[28px] border border-border/80 bg-card shadow-tactile">
                  <TactileMetricCard
                    title="Balance"
                    periodLabel="2023"
                    value="$94,127"
                    deltaText="increase 13%"
                    deltaSubtext="vs last year"
                    className="w-full max-w-none"
                  />
                  <TactileBarCard
                    title="Income"
                    periodLabel="This Month"
                    value="$12,532"
                    deltaText="increase 12%"
                    deltaSubtext="vs last month"
                    className="w-full max-w-none"
                  />
                </div>
              ) : (
                <CodeBlock code={METRIC_CARDS_CODE} title="TactileMetricCards.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 3: DOT MATRIX EQUALIZER REVENUE CARD */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Dot Matrix Histogram / Revenue Equalizer
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Equalizer-style dot grid comparing historical periods with interactive column hover tooltips and daily/weekly/monthly filter.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={dotMatrixView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDotMatrixView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={dotMatrixView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDotMatrixView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {dotMatrixView === 'preview' ? (
                <div className="p-6 sm:p-8 rounded-[28px] border border-border/80 bg-card shadow-tactile flex justify-center">
                  <DotMatrixChart
                    title="REVENUE"
                    metric="+326%"
                    timeframe="MONTHLY"
                    previousLabel="MAY $3,250"
                    currentLabel="JUN $12,392"
                    footerTagline="DON'T OVERTHINK | AUG 2024 | SIMPLIFYING DIGITAL EXP."
                    className="max-w-2xl"
                  />
                </div>
              ) : (
                <CodeBlock code={DOT_MATRIX_CODE} title="DotMatrixChart.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 4: TACTILE TREND CARD WITH KEYWORDS */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Organic Trend Curve & Keyword Velocity
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Smooth spline curve in deep charcoal container with dashed year grid, keyword pills, glowing end marker, and delta metrics.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={trendView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTrendView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={trendView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTrendView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {trendView === 'preview' ? (
                <div className="p-6 sm:p-8 rounded-[28px] border border-border/80 bg-card shadow-tactile flex justify-center">
                  <TactileTrendCard
                    title="Chart"
                    keywords={['Batch auction', 'Liquid staking derivatives (LSD)']}
                    metricLabel="Total Personas"
                    metricValue="824"
                    metricDeltaSuperscript="+334"
                    percentageDelta="34.4%"
                    className="max-w-md"
                  />
                </div>
              ) : (
                <CodeBlock code={TREND_CARD_CODE} title="TactileTrendCard.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 5: CENTERED HERO LAYOUT */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Centered Hero Layout
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    High-impact centered hero with live terminal install pill and application window mockup.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={heroView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setHeroView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={heroView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setHeroView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {heroView === 'preview' ? (
                <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-8 overflow-hidden shadow-tactile">
                  <CenteredHeroLayout
                    badgeText="NickUI v0.1.0 · Open Source Release"
                    badgeHref="/components"
                    title={<>Architectural design system for <span className="text-text-muted">developer-owned software</span>.</>}
                    description="High-craft UI components, tactile depth tiers, and native AI MCP server."
                    primaryAction={{ label: 'Explore Components', href: '/components' }}
                    secondaryAction={{ label: 'CLI Documentation', href: '/docs/cli' }}
                    commandSnippet="pnpm dlx nickui add button"
                  />
                </div>
              ) : (
                <CodeBlock code={HERO_CODE} title="CenteredHeroLayout.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 6: FEATURE BENTO GRID */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Feature Bento Grid
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Multi-tier card bento showcasing tactile telemetry, micro-spring controls, and ambient optical lighting.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={featureView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeatureView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={featureView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeatureView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {featureView === 'preview' ? (
                <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-8 overflow-hidden shadow-tactile">
                  <FeatureGridLayout
                    category="CAPABILITIES & PRINCIPLES"
                    title="Engineered for spatial clarity & architectural presence."
                    description="Every component is built from the ground up to respect environmental lighting and calm motion."
                  />
                </div>
              ) : (
                <CodeBlock code={FEATURE_GRID_CODE} title="FeatureGridLayout.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 7: SPLIT SHOWCASE LAYOUT */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Split Technical Showcase
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Two-column layout pairing dense technical specifications with live interactive component nodes.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={splitView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSplitView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={splitView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSplitView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {splitView === 'preview' ? (
                <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-8 overflow-hidden shadow-tactile">
                  <SplitShowcaseLayout
                    category="DESIGN PARADIGM"
                    title="Optical physics meets calm, non-intrusive software."
                    description="Components do not emit artificial luminescence or decorative gradients. Light behaves as an ambient condition, revealing surfaces through optical physics."
                    showcaseNode={
                      <SpotlightCard variant="tactile" className="w-full max-w-sm mx-auto">
                        <SpotlightCardHeader>
                          <SpotlightCardTitle>Telemetry Node</SpotlightCardTitle>
                          <SpotlightCardDescription>Pass pointer to observe ambient light.</SpotlightCardDescription>
                        </SpotlightCardHeader>
                        <SpotlightCardContent>420px soft falloff</SpotlightCardContent>
                      </SpotlightCard>
                    }
                  />
                </div>
              ) : (
                <CodeBlock code={SPLIT_SHOWCASE_CODE} title="SplitShowcaseLayout.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 8: REVENUE & FINANCIAL TELEMETRY */}
          {(activeTab === 'all' || activeTab === 'analytics') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Revenue & Financial Telemetry Dashboard
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    ARR performance graphs, real-time transaction ledgers, sparkline metrics, and billing analytics.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={analyticsView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setAnalyticsView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={analyticsView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setAnalyticsView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {analyticsView === 'preview' ? (
                <AnalyticsDashboard />
              ) : (
                <CodeBlock code={ANALYTICS_CODE} title="AnalyticsDashboard.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 9: CLUSTER INFRASTRUCTURE CONSOLE */}
          {(activeTab === 'all' || activeTab === 'infrastructure') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Cluster Infrastructure & Telemetry Console
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Distributed node health monitoring, CPU/RAM utilization gauges, throughput telemetry, and live terminal stream.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={infraView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setInfraView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={infraView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setInfraView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {infraView === 'preview' ? (
                <InfrastructureConsole />
              ) : (
                <CodeBlock code={INFRASTRUCTURE_CODE} title="InfrastructureConsole.tsx" />
              )}
            </section>
          )}

          {/* BLOCK 10: ENTERPRISE GOVERNANCE & SETTINGS */}
          {(activeTab === 'all' || activeTab === 'settings') && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-text-muted" />
                    <h2 className="text-lg font-medium text-text-primary tracking-tight">
                      Enterprise Governance & Security Workspace
                    </h2>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Isolation tiers, mandatory 2FA policies, compliance audit streams, and tenant safeguards.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={settingsView === 'preview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSettingsView('preview')}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                  </Button>
                  <Button
                    variant={settingsView === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSettingsView('code')}
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" /> Code
                  </Button>
                </div>
              </div>

              {settingsView === 'preview' ? (
                <WorkspaceSettingsBlock />
              ) : (
                <CodeBlock code={SETTINGS_CODE} title="WorkspaceSettingsBlock.tsx" />
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
