import type { Options } from 'tsup';
import { defineConfig } from 'tsup';
import path from 'path';
import { name, version } from './package.json';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig([
  {
    clean: true,
    sourcemap: 'inline',
    entry: [
      './src/components/**/*.{ts,tsx,js,jsx}',
      './src/contexts/**/*.{ts,tsx,js,jsx}',
      './src/hooks/**/*.{ts,tsx,js,jsx}',
      './src/localizations/**/*.{ts,tsx,js,jsx}',
    ],
    format: ['esm'],
    outDir: 'dist/',
    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
      // the directory structure will be the same as the source
      // options.outbase = './';
    },
  },
  {
    clean: true,
    sourcemap: true,
    entry: [
      './src/index.tsx',
      './src/tailwind.ts',
      './src/components/public/index.tsx',
    ],
    bundle: false,
    format: ['esm'],
    outDir: 'dist',
    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
      // options.outbase = './';
    },
  },
  // {
  //   // entry: ['./src/**/*.{ts,tsx,js,jsx}'],
  //   // entry: ['./src/index.tsx'],
  //   entry: ['./src/index.tsx', './'],
  //   // treeshake: false,
  //   clean: true,
  //   minify: false,
  //   sourcemap: true,
  //   dts: true,
  //   format: ['esm', 'cjs'],
  //   define: {
  //     PACKAGE_NAME: `"${name}"`,
  //     PACKAGE_VERSION: `"${version}"`,
  //     __DEV__: `${!isProd}`,
  //   },
  //   esbuildOptions: (options) => {
  //     options.outbase = './';
  //     options.banner = { js: `"use client";` };
  //   },
  // },
]);
