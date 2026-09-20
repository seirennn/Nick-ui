#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');

// Load registry from package bundle
let components = [];
try {
  const registryPath = path.join(packageRoot, 'registry', 'components.json');
  if (fs.existsSync(registryPath)) {
    components = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  }
} catch (e) {
  // fallback if needed
}

const program = new Command();

program
  .name('nickui')
  .description('Official CLI for NickUI: developer-owned architectural UI components & AI MCP server')
  .version('0.1.1');

// ─── COMMAND: INIT ──────────────────────────────────────────
program
  .command('init')
  .description('Initialize NickUI configuration in your project')
  .option('-y, --yes', 'Skip prompts and initialize with standard defaults')
  .action(async () => {
    const cwd = process.cwd();
    const configPath = path.join(cwd, 'nickui.json');

    if (fs.existsSync(configPath)) {
      console.log('ℹ NickUI is already initialized (nickui.json exists).');
      return;
    }

    const hasSrc = fs.existsSync(path.join(cwd, 'src'));
    const componentsDir = hasSrc ? './src/components/ui' : './components/ui';
    const utilsDir = hasSrc ? './src/lib' : './lib';

    const config = {
      $schema: 'https://nickui.dev/schema.json',
      style: 'tactile',
      rsc: true,
      tailwind: {
        css: hasSrc ? 'src/app/globals.css' : 'styles/globals.css',
      },
      aliases: {
        components: hasSrc ? '@/components' : '~/components',
        utils: hasSrc ? '@/lib/utils' : '~/lib/utils',
        ui: componentsDir.replace('./', '@/'),
      },
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    // Ensure utils.ts with cn() exists
    const utilsPath = path.join(cwd, hasSrc ? 'src/lib' : 'lib');
    const utilsFile = path.join(utilsPath, 'utils.ts');
    if (!fs.existsSync(utilsFile)) {
      fs.mkdirSync(utilsPath, { recursive: true });
      fs.writeFileSync(
        utilsFile,
        `export function cn(...inputs: any[]) {\n  return inputs.filter(Boolean).join(' ');\n}\n`,
        'utf8'
      );
    }

    // Ensure target UI dir exists
    const fullUiDir = path.join(cwd, componentsDir);
    if (!fs.existsSync(fullUiDir)) {
      fs.mkdirSync(fullUiDir, { recursive: true });
    }

    console.log('\n✔ Success! Initialized NickUI configuration.');
    console.log(`✔ Created nickui.json`);
    console.log(`✔ Configured components directory: ${componentsDir}`);
    console.log('\nYou can now add components to your project:');
    console.log('  pnpm dlx nickui add button');
    console.log('  pnpm dlx nickui add card input\n');
  });

// ─── COMMAND: ADD ───────────────────────────────────────────
program
  .command('add [components...]')
  .description('Add one or more NickUI components directly into your project source code')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-o, --overwrite', 'Overwrite existing component files', false)
  .action(async (compNames, options) => {
    if (!compNames || compNames.length === 0) {
      console.log('Please specify one or more components to add:');
      console.log('  pnpm dlx nickui add button');
      console.log('  pnpm dlx nickui add card otp-input tabs');
      console.log('\nRun "nickui list" to see all available components.');
      return;
    }

    const cwd = process.cwd();
    let targetDir = path.join(cwd, 'src', 'components', 'ui');

    // Read nickui.json if present
    const configPath = path.join(cwd, 'nickui.json');
    if (fs.existsSync(configPath)) {
      try {
        const conf = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (conf.aliases?.ui) {
          const rel = conf.aliases.ui.replace('@/', 'src/').replace('~/', '');
          targetDir = path.join(cwd, rel);
        }
      } catch {}
    } else {
      // Auto-detect src
      if (!fs.existsSync(path.join(cwd, 'src'))) {
        targetDir = path.join(cwd, 'components', 'ui');
      }
    }

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const allRequested = compNames.includes('all')
      ? components.map((c) => c.slug)
      : compNames.map((c) => c.toLowerCase());

    const missing = [];
    const added = [];
    const neededDeps = new Set();

    for (const name of allRequested) {
      const comp = components.find(
        (c) => c.slug === name || c.name.toLowerCase() === name
      );

      if (!comp) {
        missing.push(name);
        continue;
      }

      const fileName = `${comp.slug}.tsx`;
      const filePath = path.join(targetDir, fileName);

      if (fs.existsSync(filePath) && !options.overwrite) {
        console.log(`ℹ ${fileName} already exists. Pass --overwrite to replace it.`);
        continue;
      }

      if (comp.sourceCode) {
        fs.writeFileSync(filePath, comp.sourceCode, 'utf8');
        added.push(fileName);
        if (comp.dependencies) {
          comp.dependencies.forEach((d) => neededDeps.add(d));
        }
      } else {
        missing.push(name);
      }
    }

    if (added.length > 0) {
      console.log(`\n✔ Successfully added ${added.length} component${added.length > 1 ? 's' : ''}:`);
      added.forEach((f) => console.log(`  + ${path.relative(cwd, path.join(targetDir, f))}`));

      if (neededDeps.size > 0) {
        const deps = Array.from(neededDeps).join(' ');
        console.log(`\nℹ Make sure you have the required peer dependencies installed:`);
        console.log(`  pnpm add ${deps}`);
      }
      console.log('');
    }

    if (missing.length > 0) {
      console.log(`\n✖ Could not find component(s): ${missing.join(', ')}`);
      console.log('Run "nickui list" to view all registered components.\n');
    }
  });

// ─── COMMAND: LIST ──────────────────────────────────────────
program
  .command('list')
  .description('List all available components in the NickUI registry')
  .action(() => {
    console.log('\nNickUI Component Registry (27 Components)\n');

    const categories = ['foundations', 'surface', 'navigation', 'interaction'];
    const titles = {
      foundations: 'Elements & Foundations',
      surface: 'Surfaces & Cards',
      navigation: 'Navigation & Segmented',
      interaction: 'Interaction & Controls',
    };

    for (const cat of categories) {
      const items = components.filter((c) => c.category === cat);
      if (items.length > 0) {
        console.log(`■ ${titles[cat] || cat}:`);
        for (const item of items) {
          const variants = item.variants && item.variants.length > 0 ? ` [${item.variants.join(', ')}]` : '';
          console.log(`  • ${item.slug.padEnd(18)} - ${item.title}${variants}`);
        }
        console.log('');
      }
    }

    console.log('Add any component using:');
    console.log('  pnpm dlx nickui add <component-name>\n');
  });

// ─── COMMAND: MCP ───────────────────────────────────────────
program
  .command('mcp')
  .description('Start the official NickUI Model Context Protocol (MCP) server on stdio')
  .action(async () => {
    const { startMcpServer } = await import('../dist/mcp.js');
    startMcpServer();
  });

program.parse(process.argv);
