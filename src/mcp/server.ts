import readline from 'node:readline';
import componentsData from '../../registry/components.json' with { type: 'json' };

interface Component {
  name: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  variants: string[];
  sizes: string[];
  dependencies: string[];
  props: any[];
  examples: any[];
  accessibility: any[];
  designRules: any[];
  sourceCode: string;
}

const components: Component[] = componentsData as Component[];

const DESIGN_GUIDELINES = `
# NickUI Design System Guidelines

## Core Principles
1. Atmosphere over Ornamentation: Visual effects must feel environmental and global, never local or component-bound.
2. Ambient Light: Light behaves as an ambient condition, not decoration. Light must never outline, trace, or highlight individual components with bright saturated borders.
3. Restrained Motion: Motion communicates state and confidence, never interaction or affordance. Motion must be slow, continuous, and non-intrusive. Nothing should appear to "travel" or "orbit".
4. Tactile Depth Tiers:
   - Default: Clean minimal surface with subtle hairline borders.
   - Tactile: Raised surface with specular rim light and physical keycap elevation.
   - Recessed: Milled well with inner shadow sink for data wells, inputs, and tracks.
5. Colors & Neutrals: Warm linen (#f5f2eb) in light mode, deep studio dark (#101010) in dark mode. High saturation or electric neon glows are strictly forbidden.
`;

const DESIGN_TOKENS = {
  colors: {
    light: {
      background: '#f5f2eb',
      foreground: '#1c1b18',
      card: '#faf8f3',
      secondary: '#ebe7de',
      border: '#e2ddd2',
      textPrimary: '#1c1b18',
      textSecondary: '#5c5952',
      textMuted: '#8c887e',
    },
    dark: {
      background: '#101010',
      foreground: '#f4f4f7',
      card: '#171717',
      secondary: '#1c1c1c',
      border: '#242424',
      textPrimary: '#f4f4f7',
      textSecondary: '#a0a0b0',
      textMuted: '#6c6c7c',
    },
  },
  depthTiers: ['default', 'tactile', 'recessed'],
  radii: {
    sm: '0.375rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
  },
  springPhysics: {
    tactile: { stiffness: 400, damping: 25 },
    ambient: { stiffness: 300, damping: 28 },
    fluid: { stiffness: 380, damping: 30 },
  },
};

export function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  function sendResponse(response: any) {
    process.stdout.write(JSON.stringify(response) + '\n');
  }

  rl.on('line', (line) => {
    if (!line.trim()) return;

    let message: any;
    try {
      message = JSON.parse(line);
    } catch {
      sendResponse({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error: Invalid JSON' },
      });
      return;
    }

    const { id, method, params } = message;

    switch (method) {
      case 'initialize': {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
              resources: {},
              prompts: {},
            },
            serverInfo: {
              name: 'nickui-mcp',
              version: '0.1.0',
            },
          },
        });
        break;
      }

      case 'notifications/initialized': {
        // Client acknowledgment, no response required
        break;
      }

      case 'ping': {
        sendResponse({ jsonrpc: '2.0', id, result: {} });
        break;
      }

      case 'tools/list': {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'search_components',
                description: 'Search available NickUI components by keyword, category, or variant.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    query: { type: 'string', description: 'Search term (e.g. "button", "input", "chart")' },
                    category: {
                      type: 'string',
                      description: 'Category filter',
                      enum: ['foundations', 'surface', 'navigation', 'interaction'],
                    },
                  },
                },
              },
              {
                name: 'get_component',
                description: 'Get detailed metadata, props, variants, and accessibility rules for a NickUI component.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'Component slug or name (e.g. "button", "otp-input")' },
                  },
                  required: ['name'],
                },
              },
              {
                name: 'get_component_source',
                description: 'Get the full TypeScript source code of a NickUI component for copying into a project.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'Component slug or name' },
                  },
                  required: ['name'],
                },
              },
              {
                name: 'get_component_examples',
                description: 'Get code examples demonstrating how to use a NickUI component.',
                inputSchema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', description: 'Component slug or name' },
                  },
                  required: ['name'],
                },
              },
              {
                name: 'get_design_tokens',
                description: 'Get NickUI design tokens: warm linen/studio dark palettes, depth tiers, shadows, radii, and spring physics.',
                inputSchema: {
                  type: 'object',
                  properties: {},
                },
              },
              {
                name: 'get_guidelines',
                description: 'Get the official NickUI architectural design guidelines (atmosphere over ornament, ambient light, tactile tiers).',
                inputSchema: {
                  type: 'object',
                  properties: {},
                },
              },
            ],
          },
        });
        break;
      }

      case 'tools/call': {
        const toolName = params?.name;
        const args = params?.arguments || {};

        if (toolName === 'search_components') {
          const q = (args.query || '').toLowerCase();
          const cat = args.category;
          const filtered = components.filter((c) => {
            const matchesCat = !cat || c.category === cat;
            const matchesQuery =
              !q ||
              c.name.toLowerCase().includes(q) ||
              c.slug.toLowerCase().includes(q) ||
              c.title.toLowerCase().includes(q) ||
              c.description.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
          });

          const summary = filtered.map((c) => ({
            name: c.name,
            slug: c.slug,
            title: c.title,
            category: c.category,
            description: c.description,
            variants: c.variants,
          }));

          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(summary, null, 2),
                },
              ],
            },
          });
        } else if (toolName === 'get_component') {
          const name = (args.name || '').toLowerCase();
          const comp = components.find((c) => c.slug === name || c.name.toLowerCase() === name);
          if (!comp) {
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: `Component "${name}" not found in NickUI registry.` }],
                isError: true,
              },
            });
          } else {
            const details = {
              name: comp.name,
              slug: comp.slug,
              title: comp.title,
              description: comp.description,
              category: comp.category,
              variants: comp.variants,
              sizes: comp.sizes,
              dependencies: comp.dependencies,
              props: comp.props,
              accessibility: comp.accessibility,
              designRules: comp.designRules,
            };
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: JSON.stringify(details, null, 2) }],
              },
            });
          }
        } else if (toolName === 'get_component_source') {
          const name = (args.name || '').toLowerCase();
          const comp = components.find((c) => c.slug === name || c.name.toLowerCase() === name);
          if (!comp || !comp.sourceCode) {
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: `Source code for "${name}" not found.` }],
                isError: true,
              },
            });
          } else {
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: comp.sourceCode }],
              },
            });
          }
        } else if (toolName === 'get_component_examples') {
          const name = (args.name || '').toLowerCase();
          const comp = components.find((c) => c.slug === name || c.name.toLowerCase() === name);
          if (!comp) {
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: `Component "${name}" not found.` }],
                isError: true,
              },
            });
          } else {
            sendResponse({
              jsonrpc: '2.0',
              id,
              result: {
                content: [{ type: 'text', text: JSON.stringify(comp.examples || [], null, 2) }],
              },
            });
          }
        } else if (toolName === 'get_design_tokens') {
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(DESIGN_TOKENS, null, 2) }],
            },
          });
        } else if (toolName === 'get_guidelines') {
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: DESIGN_GUIDELINES }],
            },
          });
        } else {
          sendResponse({
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Tool not found: ${toolName}` },
          });
        }
        break;
      }

      case 'resources/list': {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            resources: [
              {
                uri: 'nickui://registry',
                name: 'NickUI Component Registry',
                mimeType: 'application/json',
                description: 'Full registry of all 27 NickUI components with props and rules.',
              },
              {
                uri: 'nickui://tokens',
                name: 'NickUI Design Tokens',
                mimeType: 'application/json',
                description: 'Colors, typography scale, depth tiers, and spring curves.',
              },
              {
                uri: 'nickui://guidelines',
                name: 'NickUI Design Guidelines',
                mimeType: 'text/markdown',
                description: 'Architectural principles: atmosphere over ornament, ambient light, tactile tiers.',
              },
            ],
          },
        });
        break;
      }

      case 'resources/read': {
        const uri = params?.uri;
        if (uri === 'nickui://registry') {
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(componentsData, null, 2) }],
            },
          });
        } else if (uri === 'nickui://tokens') {
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(DESIGN_TOKENS, null, 2) }],
            },
          });
        } else if (uri === 'nickui://guidelines') {
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: {
              contents: [{ uri, mimeType: 'text/markdown', text: DESIGN_GUIDELINES }],
            },
          });
        } else {
          sendResponse({
            jsonrpc: '2.0',
            id,
            error: { code: -32602, message: `Resource not found: ${uri}` },
          });
        }
        break;
      }

      default: {
        sendResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
        break;
      }
    }
  });

  process.stderr.write('NickUI MCP Server started on stdio\n');
}
