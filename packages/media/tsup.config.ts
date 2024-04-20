import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    clean: true,
    format: ['esm', 'cjs'],
    dts: true,
    outDir: './dist',
  },
  {
    entry: ['./src/client/index.ts'],
    clean: true,
    format: ['esm', 'cjs'],
    dts: true,
    outDir: './dist/client',
    external: ['react', 'next', 'react-dom'],

    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    },
  },
]);
