import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/**/*.{ts,tsx}'],
    sourcemap: 'inline',
    // minify: true,
    dts: true,
    splitting: true,
    bundle: true,
    format: ['esm', 'cjs'],
    outDir: 'dist',
  },
]);
