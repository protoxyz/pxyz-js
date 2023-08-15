import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/server.ts'],

    bundle: true,
    treeshake: false,
    clean: true,
    minify: false,
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
  },
  {
    entry: ['./src/client/tailwind.ts', './src/client/client.tsx'],
    clean: true,
    sourcemap: 'inline',
    format: ['esm'],
    external: ['react', 'next', 'next/image', 'react-dom'],
    outDir: 'dist/',
    dts: true,
    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    },
  },
]);
