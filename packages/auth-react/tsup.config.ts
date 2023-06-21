import type { Options } from "tsup";
import { defineConfig } from "tsup";

import { name, version } from "./package.json";

export default defineConfig((overrideOptions) => {
    const isProd = process.env.NODE_ENV === "production";

    const common: Options = {
        entry: ["./src/**/*.{ts,tsx,js,jsx}"],

        bundle: false,
        clean: true,
        minify: false,
        dts: true,
        format: ["esm", "cjs"],

        define: {
            PACKAGE_NAME: `"${name}"`,
            PACKAGE_VERSION: `"${version}"`,
            __DEV__: `${!isProd}`,
        },

        esbuildOptions: (options, context) => {
            options.banner = { js: `"use client";` };
        },
    };

    return common;
});
