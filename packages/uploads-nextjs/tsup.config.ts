import { defineConfig } from 'tsup';

const external = [
  'react',
  'next',
  'react-dom',
  'tailwind-merge',
  '@radix-ui/react-label',
  '@radix-ui/react-slot',
];

export default defineConfig([
  {
    entry: ['./src/client/**/*.{ts,tsx}'],
    clean: true,
    minify: true,
    bundle: false,
    splitting: false,
    dts: true,
    format: ['cjs'],
    external,
    outDir: 'dist/client',

    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    },
  },

  {
    entry: ['./src/server/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    external,
    outDir: 'dist/server',
  },

  {
    entry: ['./src/index.ts'],
    minify: true,
    bundle: false,
    dts: true,
    format: ['esm'],
    external,
    outDir: 'dist',
  },
]);
