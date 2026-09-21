import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const uiDir = path.join(rootDir, 'src', 'components', 'ui');
const registryJsonPath = path.join(rootDir, 'registry', 'components.json');
const registryComponentsDir = path.join(rootDir, 'registry', 'components');

if (!fs.existsSync(registryComponentsDir)) {
  fs.mkdirSync(registryComponentsDir, { recursive: true });
}

// Slug to filename mapping
const slugToFile = {
  'button': 'button.tsx',
  'icon-button': 'icon-button.tsx',
  'input': 'input.tsx',
  'textarea': 'textarea.tsx',
  'badge': 'badge.tsx',
  'separator': 'separator.tsx',
  'card': 'card.tsx',
  'navbar': 'navbar.tsx',
  'sidebar': 'sidebar.tsx',
  'tooltip': 'tooltip.tsx',
  'dropdown': 'dropdown.tsx',
  'command-palette': 'command-palette.tsx',
  'switch': 'switch.tsx',
  'slider': 'slider.tsx',
  'kbd': 'kbd.tsx',
  'tabs': 'tabs.tsx',
  'checkbox': 'checkbox.tsx',
  'radio': 'radio.tsx',
  'gauge': 'gauge.tsx',
  'sparkline': 'charts/sparkline.tsx',
  'area-chart': 'charts/area-chart.tsx',
  'bar-chart': 'charts/bar-chart.tsx',
  'otp-input': 'otp-input.tsx',
  'spotlight-card': 'spotlight-card.tsx',
  'folder-preview': 'folder-preview.tsx',
  'magnetic-tabs': 'magnetic-tabs.tsx',
  'stack-deck': 'stack-deck.tsx',
  'rail-sidebar': 'rail-sidebar.tsx',
  'studio-sidebar': 'studio-sidebar.tsx',
  'dot-matrix-chart': 'charts/dot-matrix-chart.tsx',
  'tactile-trend-card': 'charts/tactile-trend-card.tsx',
  'tactile-metric-card': 'charts/tactile-metric-card.tsx',
};

const components = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));

for (const comp of components) {
  const fileName = slugToFile[comp.slug];
  if (fileName) {
    const fullPath = path.join(uiDir, fileName);
    if (fs.existsSync(fullPath)) {
      const source = fs.readFileSync(fullPath, 'utf8');
      comp.sourceCode = source;

      // Also write single component file in registry/components/[slug].json
      const singleFile = {
        name: comp.name,
        slug: comp.slug,
        title: comp.title,
        description: comp.description,
        category: comp.category,
        dependencies: comp.dependencies || [],
        variants: comp.variants || [],
        props: comp.props || [],
        examples: comp.examples || [],
        sourceCode: source,
      };

      fs.writeFileSync(
        path.join(registryComponentsDir, `${comp.slug}.json`),
        JSON.stringify(singleFile, null, 2),
        'utf8'
      );
    }
  }
}

// Write back updated components.json
fs.writeFileSync(registryJsonPath, JSON.stringify(components, null, 2), 'utf8');
console.log(`✅ Built registry: ${components.length} components synced with full source code into registry/components.json and registry/components/*.json`);

// ─── Compile Blocks Registry ───────────────────────────────────────────────────
const blocksDir = path.join(rootDir, 'src', 'components', 'blocks');
const registryBlocksPath = path.join(rootDir, 'registry', 'blocks.json');

const blockDefinitions = [
  {
    slug: 'tactile-studio-dashboard',
    name: 'TactileStudioDashboard',
    title: 'Tactile Studio Dashboard',
    category: 'Dashboards',
    filePath: 'TactileStudioDashboard.tsx',
    fileName: 'TactileStudioDashboard.tsx',
    description: 'Unified executive operations dashboard with RailSidebar, dot-matrix revenue equalizer, organic trend curve, and live settlement table.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'executive-studio-console',
    name: 'ExecutiveStudioConsole',
    title: 'Executive Studio Console',
    category: 'Dashboards',
    filePath: 'ExecutiveStudioConsole.tsx',
    fileName: 'ExecutiveStudioConsole.tsx',
    description: 'A distinct architectural dashboard style featuring the collapsible StudioSidebar, 4 top KPI sparkline cards, and distributed cluster nodes table.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'tactile-metric-card',
    name: 'TactileMetricCard',
    title: 'Tactile Financial Metrics',
    category: 'Tactile Widgets',
    filePath: '../ui/charts/tactile-metric-card.tsx',
    fileName: 'tactile-metric-card.tsx',
    description: 'Skeuomorphic cards with tactile depth, node trajectory beams, and average threshold reference lines.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'tactile-trend-card',
    name: 'TactileTrendCard',
    title: 'Protocol Volume Trend Curve',
    category: 'Tactile Widgets',
    filePath: '../ui/charts/tactile-trend-card.tsx',
    fileName: 'tactile-trend-card.tsx',
    description: 'Organic bezier wave chart with capsule timeframe switcher, dashed grid, keyword capsules, and active terminal node.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'dot-matrix-chart',
    name: 'DotMatrixChart',
    title: 'Dot Matrix Revenue Velocity Equalizer',
    category: 'Tactile Charts',
    filePath: '../ui/charts/dot-matrix-chart.tsx',
    fileName: 'dot-matrix-chart.tsx',
    description: 'Interactive dot-matrix columns with hover tooltips, period comparisons, and architectural footer.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'bento-showcase-layout',
    name: 'BentoShowcaseLayout',
    title: 'Bento Grid Capabilities Layout',
    category: 'Landing Layouts',
    filePath: 'landing/BentoShowcaseLayout.tsx',
    fileName: 'BentoShowcaseLayout.tsx',
    description: 'Multi-tier architectural bento grid featuring live throughput telemetry sparkline, analog spring physics sliders, and AI MCP badge.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'centered-hero-layout',
    name: 'CenteredHeroLayout',
    title: 'Centered Hero Section Layout',
    category: 'Landing Layouts',
    filePath: 'landing/CenteredHeroLayout.tsx',
    fileName: 'CenteredHeroLayout.tsx',
    description: 'Commanding centered hero section with official BrandLogo glyph, release announcement badge, and interactive CLI copy pill.',
    dependencies: ['@sehrennn/nickui', 'lucide-react'],
  },
  {
    slug: 'feature-grid-layout',
    name: 'FeatureGridLayout',
    title: 'Feature Grid Section Layout',
    category: 'Landing Layouts',
    filePath: 'landing/FeatureGridLayout.tsx',
    fileName: 'FeatureGridLayout.tsx',
    description: 'Four-column architectural capability cards with hairline borders and tactile hover response.',
    dependencies: ['@sehrennn/nickui', 'lucide-react'],
  },
  {
    slug: 'split-showcase-layout',
    name: 'SplitShowcaseLayout',
    title: 'Split Interactive Showcase Layout',
    category: 'Landing Layouts',
    filePath: 'landing/SplitShowcaseLayout.tsx',
    fileName: 'SplitShowcaseLayout.tsx',
    description: 'Asymmetrical layout pairing editorial design principles with an interactive live optical spotlight widget.',
    dependencies: ['@sehrennn/nickui', 'lucide-react'],
  },
  {
    slug: 'analytics-dashboard',
    name: 'AnalyticsDashboard',
    title: 'Revenue Financial Telemetry Dashboard',
    category: 'Analytics Dashboard',
    filePath: 'AnalyticsDashboard.tsx',
    fileName: 'AnalyticsDashboard.tsx',
    description: 'ARR performance graphs, real-time transaction ledgers, sparkline metrics, and billing analytics.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'infrastructure-console',
    name: 'InfrastructureConsole',
    title: 'Cluster Infrastructure Telemetry Console',
    category: 'Infrastructure',
    filePath: 'InfrastructureConsole.tsx',
    fileName: 'InfrastructureConsole.tsx',
    description: 'Distributed node health monitoring, CPU/RAM utilization gauges, throughput telemetry, and live terminal stream.',
    dependencies: ['@sehrennn/nickui', 'lucide-react', 'framer-motion'],
  },
  {
    slug: 'workspace-settings-block',
    name: 'WorkspaceSettingsBlock',
    title: 'Enterprise Governance & Security Workspace',
    category: 'Settings',
    filePath: 'WorkspaceSettingsBlock.tsx',
    fileName: 'WorkspaceSettingsBlock.tsx',
    description: 'Isolation tiers, mandatory 2FA policies, compliance audit streams, and tenant safeguards.',
    dependencies: ['@sehrennn/nickui', 'lucide-react'],
  },
];

const blocks = blockDefinitions.map((block) => {
  const fullPath = path.resolve(blocksDir, block.filePath);
  let sourceCode = '';
  if (fs.existsSync(fullPath)) {
    sourceCode = fs.readFileSync(fullPath, 'utf8');
  } else {
    console.warn(`⚠️ Warning: Block file not found: ${fullPath}`);
  }

  return {
    ...block,
    sourceCode,
  };
});

fs.writeFileSync(registryBlocksPath, JSON.stringify(blocks, null, 2), 'utf8');
console.log(`✅ Built blocks registry: ${blocks.length} blocks synced with full source code into registry/blocks.json`);

