import { ComponentMetadata, DesignTokens } from './schema';
import { designTokens } from './tokens';
import componentsData from './components.json';

const components: ComponentMetadata[] = componentsData as ComponentMetadata[];

export function getAllComponents(): ComponentMetadata[] {
  return components;
}

export function searchComponents(query: string): ComponentMetadata[] {
  const q = query.toLowerCase().trim();
  if (!q) return components;
  return components.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.variants.some((v) => v.toLowerCase().includes(q))
  );
}

export function getComponent(nameOrSlug: string): ComponentMetadata | undefined {
  const key = nameOrSlug.toLowerCase().trim();
  return components.find((c) => c.name === key || c.slug === key);
}

export function getComponentSource(nameOrSlug: string): string | undefined {
  const component = getComponent(nameOrSlug);
  return component?.sourceCode;
}

export function getComponentDocs(nameOrSlug: string) {
  const component = getComponent(nameOrSlug);
  if (!component) return undefined;
  return {
    name: component.name,
    title: component.title,
    description: component.description,
    props: component.props,
    examples: component.examples,
    accessibility: component.accessibility,
    designRules: component.designRules,
  };
}

export function getComponentExamples(nameOrSlug: string) {
  const component = getComponent(nameOrSlug);
  return component?.examples || [];
}

export function getDesignTokens(): DesignTokens {
  return designTokens;
}

export function getPatterns() {
  return [
    {
      name: 'Editorial Framed Layout',
      description: 'Constrained max-width central column with hairline left and right borders.',
      code: '<div className="max-w-5xl mx-auto border-x border-border min-h-screen px-6 py-12">\n  {/* Content */}\n</div>',
    },
    {
      name: 'Segmented Control Pill',
      description: 'Active tab bar with spring-animated sliding indicator.',
      code: '<nav className="inline-flex items-center p-1 rounded-full bg-card border border-border">\n  {/* Tabs */}\n</nav>',
    },
    {
      name: 'Ambient Atmosphere & Grain',
      description: 'Global non-intrusive backdrop layers.',
      code: '<div className="system-atmosphere" />\n<div className="system-grain" />',
    },
  ];
}

export function getCompositions() {
  return [
    {
      title: 'Action Toolbar',
      description: 'Responsive toolbar combining Input search, segmented status, and action buttons.',
      code: `<div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl">
  <Input placeholder="Search records..." className="max-w-xs" />
  <div className="flex items-center gap-2">
    <Badge variant="status" status="success">Operational</Badge>
    <Button size="sm" variant="default">New Entry</Button>
  </div>
</div>`,
    },
  ];
}

export function validateComponentUsage(
  componentName: string,
  props: Record<string, any>
): { valid: boolean; errors: string[]; warnings: string[] } {
  const comp = getComponent(componentName);
  if (!comp) {
    return {
      valid: false,
      errors: [`Unknown component: "${componentName}"`],
      warnings: [],
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required props
  comp.props.forEach((propDef) => {
    if (propDef.required && (props[propDef.name] === undefined || props[propDef.name] === null)) {
      errors.push(`Missing required prop "${propDef.name}" on <${comp.title} />`);
    }
  });

  // Check forbidden design rules
  comp.designRules.forEach((rule) => {
    if (props.className) {
      rule.forbidden.forEach((forb) => {
        if (typeof props.className === 'string' && props.className.includes(forb)) {
          warnings.push(`Design rule warning: Avoid "${forb}" on <${comp.title} />. Reason: ${rule.rationale}`);
        }
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export * from './schema';
export * from './tokens';
