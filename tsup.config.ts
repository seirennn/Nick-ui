import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/components/ui/index.ts',
    mcp: 'src/mcp/server.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    entry: {
      index: 'src/components/ui/index.ts',
    },
  },
  tsconfig: 'tsconfig.build.json',
  splitting: false,
  sourcemap: true,
  clean: false,
  external: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
});
