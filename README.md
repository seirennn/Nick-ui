# NickUI

[![npm version](https://img.shields.io/npm/v/nickui.svg?style=flat-square)](https://www.npmjs.com/package/nickui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-seirennn%2FNick--ui-black?style=flat-square&logo=github)](https://github.com/seirennn/Nick-ui)

> Architectural developer-owned UI components and open-source AI MCP server with tactile depth and environmental calmness.

NickUI is a free, completely open-source UI component ecosystem engineered for developers and AI coding agents. Inspired by shadcn, NickUI gives developers complete ownership over their code while introducing tactile depth tiers (raised chamfers, milled recessed wells) and ambient lighting conditions without decorative noise.

---

## Two Ways to Use NickUI

### 1. Package Installation
Install NickUI as a regular dependency:

```bash
# Using pnpm
pnpm add @sehrennn/nickui

# Or npm / yarn / bun
npm install @sehrennn/nickui
yarn add @sehrennn/nickui
bun add @sehrennn/nickui
```

Import components directly in your application:

```tsx
import { Button, Card, OtpInput, SpotlightCard } from '@sehrennn/nickui';

export default function App() {
  return (
    <Card variant="tactile">
      <SpotlightCard>
        <OtpInput length={6} variant="recessed" />
        <Button variant="tactile">Verify Credentials</Button>
      </SpotlightCard>
    </Card>
  );
}
```

---

### 2. Source Code Installation (shadcn-style)
Own and customize the component source code directly inside your repository.

#### Step 1: Initialize your project
```bash
pnpm dlx @sehrennn/nickui init
# or if installed globally: nickui init
```
This generates `nickui.json` and configures your project structure (detecting `src/components/ui` or `components/ui`).

#### Step 2: Add components
```bash
pnpm dlx @sehrennn/nickui add button
pnpm dlx @sehrennn/nickui add card otp-input spotlight-card
pnpm dlx @sehrennn/nickui add all
```

Components are injected directly into your source tree, giving you 100% control to modify and adapt them:
```text
src/
└── components/
    └── ui/
        ├── button.tsx
        ├── card.tsx
        ├── otp-input.tsx
        └── spotlight-card.tsx
```

---

## Free & Open-Source AI MCP Server

NickUI includes a built-in, completely free and open-source **Model Context Protocol (MCP)** server. Connect it to AI coding agents (Cursor, Claude Desktop, Copilot, Antigravity) so your agent understands NickUI components, props, design tokens, and source code without hallucination.

### Connect to Cursor
Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "nickui": {
      "command": "npx",
      "args": ["nickui", "mcp"]
    }
  }
}
```

### Connect to Claude Desktop
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "nickui": {
      "command": "pnpm",
      "args": ["dlx", "nickui", "mcp"]
    }
  }
}
```

### Supported MCP Tools
- `search_components`: Search components by keyword or category.
- `get_component`: Retrieve props, variants, accessibility guidelines, and design rules.
- `get_component_source`: Retrieve the exact TypeScript source code for direct project injection.
- `get_component_examples`: Inspect verified code examples.
- `get_design_tokens`: Get palettes (warm linen `#f5f2eb`, studio dark `#101010`), depth tiers, and spring physics.
- `get_guidelines`: System design constraints (ambient lighting, motion physics, contrast rules).

---

## Component Catalog (27 Components)

| Category | Components | Depth Tiers |
| :--- | :--- | :--- |
| **Elements & Foundations** | `Button`, `IconButton`, `Input`, `Textarea`, `Badge`, `Separator`, `Kbd`, `Gauge`, `Sparkline`, `AreaChart`, `BarChart` | Default, Tactile, Recessed |
| **Surfaces & Cards** | `Card`, `SpotlightCard`, `FolderPreview`, `StackDeck` | Default, Tactile, Recessed |
| **Navigation** | `Navbar`, `Sidebar`, `Tabs`, `MagneticTabs` | Default, Tactile, Recessed |
| **Interaction** | `OtpInput`, `CommandPalette`, `Dropdown`, `Tooltip`, `Switch`, `Slider`, `Checkbox`, `Radio` | Default, Tactile, Recessed |

---

## Design Principles

1. **Atmosphere over Ornament**: Visual effects must feel environmental and global, never local or component-bound.
2. **Ambient Light**: Light behaves as an ambient condition, not decoration. Light never outlines or traces individual components with bright saturated neon glows.
3. **Restrained Motion**: Motion communicates state and confidence, never interaction or affordance. Motion is slow, continuous, and non-intrusive.
4. **Tactile Depth Tiers**:
   - **Default**: Clean minimal surface with hairline borders.
   - **Tactile**: Raised keycap surface with subtle specular rim light and physical elevation.
   - **Recessed**: Milled well with inner shadow sink for tracks, pin-codes, and data fields.

---

## CLI Reference

```bash
# Initialize NickUI in your project
nickui init

# Add components into your source tree
nickui add <component-name...>

# List all available components in the registry
nickui list

# Start the MCP server on stdio
nickui mcp
```

---

## License

MIT © NickUI Contributors. Free and open source forever. No subscriptions, no telemetry, no paid tiers.
