# Contributing to NickUI

Thank you for your interest in contributing to NickUI! As a free, open-source project, we welcome community improvements to components, documentation, the CLI, and the MCP server.

---

## Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/seirennn/Nick-ui.git
   cd Nick-ui
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the local documentation site**:
   ```bash
   pnpm dev
   ```

4. **Build the library and CLI**:
   ```bash
   pnpm build:lib
   pnpm build:registry
   ```

5. **Test the CLI locally**:
   ```bash
   node ./bin/nickui.js list
   ```

---

## Design System Rules for Contributors

When contributing new components or modifications, your code must adhere strictly to the NickUI design system:

- **Atmosphere over Ornament**: Never add rainbow gradients, high saturation glows, or electric outlines.
- **Ambient Light**: Light must behave as an ambient condition (soft falloff, low opacity), never as component tracing decoration.
- **Motion Restraint**: Use calm spring physics (`stiffness: 400, damping: 25`). Avoid bouncy or jarring transitions.
- **Depth Tiers**: If applicable, provide `variant="default"`, `variant="tactile"`, and `variant="recessed"`.
- **Accessibility**: Ensure full keyboard navigation, visible focus outlines, and appropriate WAI-ARIA attributes.

---

## Submitting a Pull Request

1. Create a feature branch:
   ```bash
   git checkout -b feat/my-component
   ```
2. Commit your changes following conventional commits:
   ```bash
   git commit -m "feat(ui): add stepper component"
   ```
3. Ensure the project builds cleanly:
   ```bash
   pnpm build
   pnpm build:lib
   ```
4. Push your branch and open a Pull Request on GitHub.

---

## License

By contributing to NickUI, you agree that your contributions will be licensed under the project's MIT License.
