export type ComponentCategory = 'foundations' | 'surface' | 'navigation' | 'interaction';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

export interface ExampleDefinition {
  title: string;
  description: string;
  code: string;
}

export interface AccessibilityRule {
  requirement: string;
  implementation: string;
}

export interface DesignRule {
  rule: string;
  rationale: string;
  forbidden: string[];
}

export interface ComponentMetadata {
  name: string;
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  sourcePath: string;
  variants: string[];
  sizes: string[];
  dependencies: string[];
  props: PropDefinition[];
  examples: ExampleDefinition[];
  accessibility: AccessibilityRule[];
  designRules: DesignRule[];
  sourceCode: string;
}

export interface TokenItem {
  token: string;
  value: string;
  description: string;
}

export interface DesignTokens {
  colors: {
    light: TokenItem[];
    dark: TokenItem[];
  };
  typography: TokenItem[];
  radii: TokenItem[];
  shadows: TokenItem[];
  motion: TokenItem[];
}
