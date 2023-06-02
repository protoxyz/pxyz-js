import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.tsx"],
    format: ["esm", "cjs"],
    external: ["react"],
    dts: true,
    clean: true,
    esbuildOptions: (options, context) => {
        options.banner = { js: `"use client";` };
    },
});
