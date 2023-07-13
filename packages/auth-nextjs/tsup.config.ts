import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

import { name, version } from './package.json';

export default defineConfig((overrideOptions) => {
  const isProd = process.env.NODE_ENV === 'production';

  const common: Options = {
    // entry: ['./src/**/*.{ts,tsx,js,jsx}'],
    entry: ['./src/server.ts'],

    bundle: true,
    treeshake: false,
    clean: true,
    minify: false,
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
    external: ['@protoxyz/auth-react'],

    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
      __DEV__: `${!isProd}`,
    },
  };

  return common;
});
