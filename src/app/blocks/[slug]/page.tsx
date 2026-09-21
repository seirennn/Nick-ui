import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import blocksData from '@/registry/blocks.json';
import { WorkstationDashboard } from '@/components/blocks/WorkstationDashboard';
import { TechnicalDocsLayout } from '@/components/blocks/TechnicalDocsLayout';
import { MissionControlDashboard } from '@/components/blocks/MissionControlDashboard';
import { EditorialWorkspaceDashboard } from '@/components/blocks/EditorialWorkspaceDashboard';
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
import { ArrowLeft, Terminal, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return blocksData.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlockStandalonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const block = blocksData.find((b) => b.slug === slug);

  if (!block) {
    notFound();
  }

  const renderBlock = () => {
    switch (slug) {
      case 'workstation-dashboard':
        return <WorkstationDashboard />;
      case 'technical-docs-layout':
        return <TechnicalDocsLayout />;
      case 'mission-control-dashboard':
        return <MissionControlDashboard />;
      case 'editorial-workspace-dashboard':
        return <EditorialWorkspaceDashboard />;
      case 'tactile-studio-dashboard':
        return <TactileStudioDashboard />;
      case 'executive-studio-console':
        return <ExecutiveStudioConsole />;
      case 'analytics-dashboard':
        return <AnalyticsDashboard />;
      case 'infrastructure-console':
        return <InfrastructureConsole />;
      case 'workspace-settings-block':
        return <WorkspaceSettingsBlock />;
      case 'tactile-metric-card':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
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
        );
      case 'tactile-trend-card':
        return (
          <div className="w-full max-w-md mx-auto">
            <TactileTrendCard
              title="Protocol Volume Trend"
              keywords={['Batch auction', 'Liquid staking derivatives (LSD)', 'Proof rollups']}
              metricLabel="Active Validated Nodes"
              metricValue="824"
              metricDeltaSuperscript="+334"
              percentageDelta="34.4%"
              className="w-full max-w-none"
            />
          </div>
        );
      case 'dot-matrix-chart':
        return (
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
        );
      case 'centered-hero-layout':
        return (
          <div className="w-full max-w-5xl mx-auto">
            <CenteredHeroLayout />
          </div>
        );
      case 'bento-showcase-layout':
        return (
          <div className="w-full max-w-6xl mx-auto">
            <BentoShowcaseLayout />
          </div>
        );
      case 'feature-grid-layout':
        return (
          <div className="w-full max-w-6xl mx-auto">
            <FeatureGridLayout />
          </div>
        );
      case 'split-showcase-layout':
        return (
          <div className="w-full max-w-6xl mx-auto">
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-foreground">
      {/* Standalone Minimal Header Bar */}
      <header className="h-14 px-6 border-b border-border/80 flex items-center justify-between gap-4 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/blocks"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Blocks</span>
          </Link>
          <span className="text-border/60">|</span>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium text-text-primary tracking-tight">
              {block.title}
            </h1>
            <Badge variant="outline" className="text-[10px] hidden sm:inline">
              {block.category}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-secondary/60 text-text-muted border border-border/60">
            <Terminal className="w-3.5 h-3.5" />
            <span>pnpm dlx @sehrennn/nickui add {slug}</span>
          </div>
          <Link
            href="/blocks"
            className="text-xs font-mono px-3 py-1 rounded-lg bg-primary text-primary-foreground font-medium shadow-2xs hover:opacity-90 transition-opacity"
          >
            Browse Library
          </Link>
        </div>
      </header>

      {/* Main Full-Width Standalone Canvas */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 flex justify-center items-start bg-secondary/10 dark:bg-[#08080a]">
        <div className="w-full max-w-7xl">
          {renderBlock()}
        </div>
      </main>
    </div>
  );
}
