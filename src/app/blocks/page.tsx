'use client';

import * as React from 'react';
import { SiteNavbar } from '@/components/docs/SiteNavbar';
import { BlockViewer } from '@/components/blocks/BlockViewer';
import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';
import { ExecutiveStudioConsole } from '@/components/blocks/ExecutiveStudioConsole';
import { AnalyticsDashboard } from '@/components/blocks/AnalyticsDashboard';
import { InfrastructureConsole } from '@/components/blocks/InfrastructureConsole';
import { WorkspaceSettingsBlock } from '@/components/blocks/WorkspaceSettingsBlock';
import { CenteredHeroLayout } from '@/components/blocks/landing/CenteredHeroLayout';
import { FeatureGridLayout } from '@/components/blocks/landing/FeatureGridLayout';
import { SplitShowcaseLayout } from '@/components/blocks/landing/SplitShowcaseLayout';
import { BentoShowcaseLayout } from '@/components/blocks/landing/BentoShowcaseLayout';
import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';
import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';
import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';
import { SpotlightCard, SpotlightCardHeader, SpotlightCardTitle, SpotlightCardDescription, SpotlightCardContent } from '@/components/ui/spotlight-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import componentsData from '@/registry/components.json';
import blocksData from '@/registry/blocks.json';
import {
  Activity,
  Layers,
  BarChart3,
  Server,
  Shield,
  LayoutTemplate,
  Cpu,
} from 'lucide-react';

const getBlockSource = (slug: string) => {
  return blocksData.find((b) => b.slug === slug)?.sourceCode || '';
};

const getSource = (slug: string) => {
  return componentsData.find((c) => c.slug === slug)?.sourceCode || '';
};

const FLAGSHIP_CODE = `import { TactileStudioDashboard } from '@/components/blocks/TactileStudioDashboard';

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-background">
      <TactileStudioDashboard />
    </main>
  );
}`;

const EXECUTIVE_CONSOLE_CODE = `import { ExecutiveStudioConsole } from '@/components/blocks/ExecutiveStudioConsole';

export default function ConsolePage() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-background">
      <ExecutiveStudioConsole />
    </main>
  );
}`;

const DOT_MATRIX_CODE = `import { DotMatrixChart } from '@/components/ui/charts/dot-matrix-chart';

export default function RevenueOverview() {
  return (
    <DotMatrixChart
      title="REVENUE VELOCITY"
      metric="+326%"
      timeframe="MONTHLY"
      previousLabel="MAY $3,250"
      currentLabel="JUN $12,392"
      footerTagline="HIGH THROUGHPUT | 2024 | ZERO LOSS"
    />
  );
}`;

const TREND_CARD_CODE = `import { TactileTrendCard } from '@/components/ui/charts/tactile-trend-card';

export default function TrendAnalysis() {
  return (
    <TactileTrendCard
      title="Protocol Volume Trend"
      keywords={['Batch auction', 'Liquid staking derivatives (LSD)', 'Proof rollups']}
      metricLabel="Active Validated Nodes"
      metricValue="824"
      metricDeltaSuperscript="+334"
      percentageDelta="34.4%"
    />
  );
}`;

const METRIC_CARDS_CODE = `import { TactileMetricCard, TactileBarCard } from '@/components/ui/charts/tactile-metric-card';

export default function FinancialKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <TactileMetricCard
        title="Balance"
        periodLabel="2024"
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
  );
}`;

const HERO_CODE = `import { CenteredHeroLayout } from '@/components/blocks/landing/CenteredHeroLayout';

export default function LandingPage() {
  return (
    <CenteredHeroLayout
      showLogo={true}
      badgeText="NickUI v0.1.1 · Open Source Release"
      badgeHref="/components"
      title={<>Architectural design system for <span className="text-text-muted">developer-owned software</span>.</>}
      description="High-craft UI components, tactile depth tiers, and native AI MCP server."
      primaryAction={{ label: 'Explore Components', href: '/components' }}
      secondaryAction={{ label: 'CLI Documentation', href: '/docs/cli' }}
      commandSnippet="pnpm dlx @sehrennn/nickui add button"
    />
  );
}`;

const BENTO_LAYOUT_CODE = `import { BentoShowcaseLayout } from '@/components/blocks/landing/BentoShowcaseLayout';

export default function BentoSection() {
  return (
    <BentoShowcaseLayout
      category="SYSTEM ARCHITECTURE"
      title="Engineered for tactile precision & zero-latency execution."
      description="Every primitive is physically grounded with atmospheric lighting, measured spring physics, and native AI MCP bindings."
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <SiteNavbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="mono" className="text-xs">
              Open-Source Blocks · 11 Production Patterns
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
            Blocks & Architectural Dashboards
          </h1>
          <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
            Full-width responsive application dashboards, multiple sidebar styles, tactile physical telemetry widgets, and landing layouts built exclusively with <span className="font-mono text-text-primary font-medium">nickui</span> primitives.
          </p>

          {/* Category Filter Deck */}
          <div className="pt-4 flex items-center justify-between gap-4 flex-wrap">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap gap-1 h-auto p-1">
                <TabsTrigger value="all">All Blocks</TabsTrigger>
                <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                <TabsTrigger value="tactile">Tactile Metrics</TabsTrigger>
                <TabsTrigger value="landing">Landing Layouts</TabsTrigger>
                <TabsTrigger value="infrastructure">Cloud & Ops</TabsTrigger>
                <TabsTrigger value="settings">Governance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Blocks Showcase Stack */}
        <div className="space-y-16">
          {/* BLOCK 1: FLAGSHIP TACTILE STUDIO DASHBOARD */}
          {(activeTab === 'all' || activeTab === 'dashboards') && (
            <BlockViewer
              title="Tactile Studio Dashboard"
              category="Rail Sidebar Dashboard"
              isNew
              cliCommand="pnpm dlx @sehrennn/nickui add tactile-studio-dashboard"
              code={getBlockSource('tactile-studio-dashboard')}
              codeFileName="TactileStudioDashboard.tsx"
              usageCode={FLAGSHIP_CODE}
              usageFileName="page.tsx"
              description="Unified executive operations dashboard with RailSidebar, dot-matrix revenue equalizer, organic trend curve, and live settlement table."
            >
              <TactileStudioDashboard />
            </BlockViewer>
          )}

          {/* BLOCK 2: NEW EXECUTIVE STUDIO CONSOLE (STUDIO SIDEBAR STYLE) */}
          {(activeTab === 'all' || activeTab === 'dashboards' || activeTab === 'infrastructure') && (
            <BlockViewer
              title="Executive Studio Console"
              category="Collapsible Studio Sidebar"
              isNew
              cliCommand="pnpm dlx @sehrennn/nickui add executive-studio-console"
              code={getBlockSource('executive-studio-console')}
              codeFileName="ExecutiveStudioConsole.tsx"
              usageCode={EXECUTIVE_CONSOLE_CODE}
              usageFileName="page.tsx"
              description="A distinct architectural dashboard style featuring the collapsible StudioSidebar, 4 top KPI sparkline cards, and distributed cluster nodes table."
            >
              <ExecutiveStudioConsole />
            </BlockViewer>
          )}

          {/* BLOCK 3: TACTILE FINANCIAL METRIC CARDS */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <BlockViewer
              title="Tactile Financial Metrics (Balance & Income)"
              category="Tactile Widgets"
              isNew
              cliCommand="pnpm dlx @sehrennn/nickui add tactile-metric-card"
              code={getBlockSource('tactile-metric-card')}
              codeFileName="tactile-metric-card.tsx"
              usageCode={METRIC_CARDS_CODE}
              usageFileName="page.tsx"
              description="Skeuomorphic cards with tactile depth, node trajectory beams, and average threshold reference lines."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <TactileMetricCard
                  title="Balance"
                  periodLabel="2024"
                  value="$94,127"
                  deltaText="+13%"
                  deltaSubtext="vs last year"
                  className="w-full max-w-none"
                />
                <TactileBarCard
                  title="Income"
                  periodLabel="This Month"
                  value="$12,532"
                  deltaText="+12%"
                  deltaSubtext="vs last month"
                  className="w-full max-w-none"
                />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 4: TACTILE TREND CARD */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <BlockViewer
              title="Protocol Volume Trend Curve"
              category="Tactile Widgets"
              cliCommand="pnpm dlx @sehrennn/nickui add tactile-trend-card"
              code={getBlockSource('tactile-trend-card')}
              codeFileName="tactile-trend-card.tsx"
              usageCode={TREND_CARD_CODE}
              usageFileName="page.tsx"
              description="Organic bezier wave chart with capsule timeframe switcher, dashed grid, keyword capsules, and active terminal node."
            >
              <TactileTrendCard
                title="Protocol Volume Trend"
                keywords={['Batch auction', 'Liquid staking derivatives (LSD)', 'Proof rollups']}
                metricLabel="Active Validated Nodes"
                metricValue="824"
                metricDeltaSuperscript="+334"
                percentageDelta="34.4%"
                className="w-full max-w-md mx-auto"
              />
            </BlockViewer>
          )}

          {/* BLOCK 5: DOT MATRIX EQUALIZER */}
          {(activeTab === 'all' || activeTab === 'tactile') && (
            <BlockViewer
              title="Dot Matrix Revenue Velocity Equalizer"
              category="Tactile Charts"
              cliCommand="pnpm dlx @sehrennn/nickui add dot-matrix-chart"
              code={getBlockSource('dot-matrix-chart')}
              codeFileName="dot-matrix-chart.tsx"
              usageCode={DOT_MATRIX_CODE}
              usageFileName="page.tsx"
              description="Interactive dot-matrix columns with hover tooltips, period comparisons, and architectural footer."
            >
              <div className="w-full max-w-2xl mx-auto">
                <DotMatrixChart
                  title="REVENUE VELOCITY"
                  metric="+326%"
                  timeframe="MONTHLY"
                  previousLabel="MAY $3,250"
                  currentLabel="JUN $12,392"
                  footerTagline="HIGH THROUGHPUT | 2024 | ZERO LOSS"
                />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 6: BENTO SHOWCASE LANDING SECTION */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <BlockViewer
              title="Bento Grid Capabilities Layout"
              category="Landing Layouts"
              isNew
              cliCommand="pnpm dlx @sehrennn/nickui add bento-showcase-layout"
              code={getBlockSource('bento-showcase-layout')}
              codeFileName="BentoShowcaseLayout.tsx"
              usageCode={BENTO_LAYOUT_CODE}
              usageFileName="page.tsx"
              description="Multi-tier architectural bento grid featuring live throughput telemetry sparkline, analog spring physics sliders, and AI MCP badge."
            >
              <div className="w-full max-w-5xl">
                <BentoShowcaseLayout />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 7: CENTERED HERO LANDING LAYOUT */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <BlockViewer
              title="Centered Hero Section Layout"
              category="Landing Layouts"
              cliCommand="pnpm dlx @sehrennn/nickui add centered-hero-layout"
              code={getBlockSource('centered-hero-layout')}
              codeFileName="CenteredHeroLayout.tsx"
              usageCode={HERO_CODE}
              usageFileName="page.tsx"
              description="Commanding centered hero section with official BrandLogo glyph, release announcement badge, and interactive CLI copy pill."
            >
              <div className="w-full max-w-4xl">
                <CenteredHeroLayout />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 8: FEATURE GRID LAYOUT */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <BlockViewer
              title="Feature Grid Section Layout"
              category="Landing Layouts"
              cliCommand="pnpm dlx @sehrennn/nickui add feature-grid-layout"
              code={getBlockSource('feature-grid-layout')}
              codeFileName="FeatureGridLayout.tsx"
              usageCode={FEATURE_GRID_CODE}
              usageFileName="page.tsx"
              description="Four-column architectural capability cards with hairline borders and tactile hover response."
            >
              <div className="w-full max-w-5xl">
                <FeatureGridLayout />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 9: SPLIT SHOWCASE LAYOUT */}
          {(activeTab === 'all' || activeTab === 'landing') && (
            <BlockViewer
              title="Split Interactive Showcase Layout"
              category="Landing Layouts"
              cliCommand="pnpm dlx @sehrennn/nickui add split-showcase-layout"
              code={getBlockSource('split-showcase-layout')}
              codeFileName="SplitShowcaseLayout.tsx"
              usageCode={SPLIT_SHOWCASE_CODE}
              usageFileName="page.tsx"
              description="Asymmetrical layout pairing editorial design principles with an interactive live optical spotlight widget."
            >
              <div className="w-full max-w-5xl">
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
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 10: REVENUE & FINANCIAL TELEMETRY */}
          {(activeTab === 'all' || activeTab === 'dashboards') && (
            <BlockViewer
              title="Revenue Financial Telemetry Dashboard"
              category="Analytics Dashboard"
              cliCommand="pnpm dlx @sehrennn/nickui add analytics-dashboard"
              code={getBlockSource('analytics-dashboard')}
              codeFileName="AnalyticsDashboard.tsx"
              usageCode={ANALYTICS_CODE}
              usageFileName="page.tsx"
              description="ARR performance graphs, real-time transaction ledgers, sparkline metrics, and billing analytics."
            >
              <div className="w-full max-w-5xl">
                <AnalyticsDashboard />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 11: CLUSTER INFRASTRUCTURE CONSOLE */}
          {(activeTab === 'all' || activeTab === 'infrastructure') && (
            <BlockViewer
              title="Cluster Infrastructure Telemetry Console"
              category="Infrastructure"
              cliCommand="pnpm dlx @sehrennn/nickui add infrastructure-console"
              code={getBlockSource('infrastructure-console')}
              codeFileName="InfrastructureConsole.tsx"
              usageCode={INFRASTRUCTURE_CODE}
              usageFileName="page.tsx"
              description="Distributed node health monitoring, CPU/RAM utilization gauges, throughput telemetry, and live terminal stream."
            >
              <div className="w-full max-w-5xl">
                <InfrastructureConsole />
              </div>
            </BlockViewer>
          )}

          {/* BLOCK 12: ENTERPRISE GOVERNANCE & SETTINGS */}
          {(activeTab === 'all' || activeTab === 'settings') && (
            <BlockViewer
              title="Enterprise Governance & Security Workspace"
              category="Settings"
              cliCommand="pnpm dlx @sehrennn/nickui add workspace-settings-block"
              code={getBlockSource('workspace-settings-block')}
              codeFileName="WorkspaceSettingsBlock.tsx"
              usageCode={SETTINGS_CODE}
              usageFileName="page.tsx"
              description="Isolation tiers, mandatory 2FA policies, compliance audit streams, and tenant safeguards."
            >
              <div className="w-full max-w-5xl">
                <WorkspaceSettingsBlock />
              </div>
            </BlockViewer>
          )}
        </div>
      </div>
    </div>
  );
}
