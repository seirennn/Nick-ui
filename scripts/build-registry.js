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
