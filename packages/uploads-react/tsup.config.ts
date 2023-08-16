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
    entry: ['./src/**/*.{ts,tsx}'],
    clean: true,
    minify: true,
    bundle: false,
    splitting: false,
    sourcemap: 'inline',
    dts: true,
    format: ['esm'],
    external,
    outDir: 'dist',

    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    },
  },
]);
