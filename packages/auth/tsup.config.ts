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
    entry: ['./src/client/index.tsx'],
    clean: true,
    format: ['esm', 'cjs'],
    dts: true,
    outDir: './client',

    external: ['use-sync-external-store'],

    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    },
  },
]);
