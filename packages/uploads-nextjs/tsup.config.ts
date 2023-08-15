import { defineConfig } from 'tsup';

export default defineConfig([
  // {
  //   entry: ['./src/server.ts'],

  //   bundle: true,
  //   treeshake: false,
  //   clean: true,
  //   minify: false,
  //   sourcemap: true,
  //   dts: true,
  //   format: ['esm', 'cjs'],
  // },
  // {
  //   entry: ['./src/client/tailwind.ts', './src/client/client.tsx'],
  //   clean: true,
  //   sourcemap: 'inline',
  //   format: ['esm'],
  //   external: ['react', 'next', 'react-dom'],
  //   outDir: 'dist/',
  //   dts: {
  //     entry: {
  //       index: 'src/server.ts',
  //       client: 'src/client/client.tsx',
  //     },
  //   },
  //   esbuildOptions(options, context) {
  //     options.banner = { js: `"use client";` };
  //     options.outbase = './';
  //   },
  // },
  // {
  //   entry: ['./src/client/index.tsx'],
  //   clean: true,
  //   minify: true,
  //   format: ['esm'],
  //   external: [
  //     'react',
  //     'next',
  //     'react-dom',
  //     'tailwind-merge',
  //     '@radix-ui/react-label',
  //     '@radix-ui/react-slot',
  //   ],
  //   outDir: 'dist/',
  //   dts: {
  //     entry: {
  //       client: 'src/client/index.tsx',
  //     },
  //   },
  //   esbuildOptions(options, context) {
  //     options.banner = { js: `"use client";` };
  //     options.outbase = './src';
  //   },
  // },

  {
    entry: ['./src/**/*.{ts,tsx}'],
    // entry: ['./src/index.ts', './src/server/index.ts'],
    clean: true,
    minify: true,
    bundle: true,
    splitting: true,
    dts: true,
    format: ['esm', 'cjs'],
    external: [
      'react',
      'next',
      'react-dom',
      'tailwind-merge',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
    ],
    outDir: 'dist/',
    // dts: {
    //   entry: {
    //     index: 'src/server/index.ts',
    //   },
    // },
    // esbuildOptions(options, context) {
    //   options.banner = { js: `"use client";` };
    // },
  },
]);
