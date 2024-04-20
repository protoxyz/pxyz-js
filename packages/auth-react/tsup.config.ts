// import { defineConfig } from 'tsup';
// import react18Plugin from "esbuild-react18-useclient";

// const react18PluginOptions = {}
// export default defineConfig([
//   {
//     entry: ['./src/index.ts'],
//     clean: true,
//     format: ['esm', 'cjs'],
//     dts: true,
//     outDir: './dist',
//     esbuildPlugins:[react18Plugin]
//   },
   
//   {
//     entry: ['./src/client/index.tsx'],
//     clean: true,
//     format: ['esm', 'cjs'],
//     dts: true,
//     outDir: './dist/client',

//     external: ['use-sync-external-store'], 

//     esbuildOptions(options, context) {
//       options.banner = { js: `"use client";` };
//     },
//   },
// ]);


import { Options, defineConfig } from 'tsup';

const cfg: Options  = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'],
};

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'src/index.tsx',
    },
    external: ['react'],
    outDir: 'dist', 
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  }

]);