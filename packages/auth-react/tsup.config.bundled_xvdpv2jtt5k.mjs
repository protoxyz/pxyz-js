// tsup.config.ts
import { defineConfig } from "tsup";
var isProd = process.env.NODE_ENV === "production";
var tsup_config_default = defineConfig([
  {
    clean: false,
    sourcemap: "inline",
    entry: [
      "./src/components/**/*.{ts,tsx,js,jsx}",
      "./src/contexts/**/*.{ts,tsx,js,jsx}",
      "./src/hooks/**/*.{ts,tsx,js,jsx}",
      "./src/localizations/**/*.{ts,tsx,js,jsx}"
    ],
    format: ["esm"],
    outDir: "dist/",
    dts: true,
    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    }
  },
  {
    clean: false,
    sourcemap: true,
    entry: [
      "./src/index.tsx",
      "./src/tailwind.ts",
      "./src/components/public/index.tsx"
    ],
    bundle: false,
    format: ["esm"],
    outDir: "dist",
    dts: true,
    esbuildOptions(options, context) {
      options.banner = { js: `"use client";` };
    }
  }
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
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL2VyaWNjNTkvRGV2L3B4eXovcHh5ei1qcy9wYWNrYWdlcy9hdXRoLXJlYWN0L3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy9lcmljYzU5L0Rldi9weHl6L3B4eXotanMvcGFja2FnZXMvYXV0aC1yZWFjdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvZXJpY2M1OS9EZXYvcHh5ei9weHl6LWpzL3BhY2thZ2VzL2F1dGgtcmVhY3QvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tICd0c3VwJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBuYW1lLCB2ZXJzaW9uIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoW1xuICB7XG4gICAgY2xlYW46IGZhbHNlLFxuICAgIHNvdXJjZW1hcDogJ2lubGluZScsXG4gICAgZW50cnk6IFtcbiAgICAgICcuL3NyYy9jb21wb25lbnRzLyoqLyoue3RzLHRzeCxqcyxqc3h9JyxcbiAgICAgICcuL3NyYy9jb250ZXh0cy8qKi8qLnt0cyx0c3gsanMsanN4fScsXG4gICAgICAnLi9zcmMvaG9va3MvKiovKi57dHMsdHN4LGpzLGpzeH0nLFxuICAgICAgJy4vc3JjL2xvY2FsaXphdGlvbnMvKiovKi57dHMsdHN4LGpzLGpzeH0nLFxuICAgIF0sXG4gICAgZm9ybWF0OiBbJ2VzbSddLFxuICAgIG91dERpcjogJ2Rpc3QvJyxcbiAgICBkdHM6IHRydWUsXG4gICAgZXNidWlsZE9wdGlvbnMob3B0aW9ucywgY29udGV4dCkge1xuICAgICAgb3B0aW9ucy5iYW5uZXIgPSB7IGpzOiBgXCJ1c2UgY2xpZW50XCI7YCB9O1xuICAgICAgLy8gdGhlIGRpcmVjdG9yeSBzdHJ1Y3R1cmUgd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgc291cmNlXG4gICAgICAvLyBvcHRpb25zLm91dGJhc2UgPSAnLi8nO1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBjbGVhbjogZmFsc2UsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGVudHJ5OiBbXG4gICAgICAnLi9zcmMvaW5kZXgudHN4JyxcbiAgICAgICcuL3NyYy90YWlsd2luZC50cycsXG4gICAgICAnLi9zcmMvY29tcG9uZW50cy9wdWJsaWMvaW5kZXgudHN4JyxcbiAgICBdLFxuICAgIGJ1bmRsZTogZmFsc2UsXG4gICAgZm9ybWF0OiBbJ2VzbSddLFxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGR0czogdHJ1ZSxcbiAgICBlc2J1aWxkT3B0aW9ucyhvcHRpb25zLCBjb250ZXh0KSB7XG4gICAgICBvcHRpb25zLmJhbm5lciA9IHsganM6IGBcInVzZSBjbGllbnRcIjtgIH07XG4gICAgICAvLyBvcHRpb25zLm91dGJhc2UgPSAnLi8nO1xuICAgIH0sXG4gIH0sXG4gIC8vIHtcbiAgLy8gICAvLyBlbnRyeTogWycuL3NyYy8qKi8qLnt0cyx0c3gsanMsanN4fSddLFxuICAvLyAgIC8vIGVudHJ5OiBbJy4vc3JjL2luZGV4LnRzeCddLFxuICAvLyAgIGVudHJ5OiBbJy4vc3JjL2luZGV4LnRzeCcsICcuLyddLFxuICAvLyAgIC8vIHRyZWVzaGFrZTogZmFsc2UsXG4gIC8vICAgY2xlYW46IHRydWUsXG4gIC8vICAgbWluaWZ5OiBmYWxzZSxcbiAgLy8gICBzb3VyY2VtYXA6IHRydWUsXG4gIC8vICAgZHRzOiB0cnVlLFxuICAvLyAgIGZvcm1hdDogWydlc20nLCAnY2pzJ10sXG4gIC8vICAgZGVmaW5lOiB7XG4gIC8vICAgICBQQUNLQUdFX05BTUU6IGBcIiR7bmFtZX1cImAsXG4gIC8vICAgICBQQUNLQUdFX1ZFUlNJT046IGBcIiR7dmVyc2lvbn1cImAsXG4gIC8vICAgICBfX0RFVl9fOiBgJHshaXNQcm9kfWAsXG4gIC8vICAgfSxcbiAgLy8gICBlc2J1aWxkT3B0aW9uczogKG9wdGlvbnMpID0+IHtcbiAgLy8gICAgIG9wdGlvbnMub3V0YmFzZSA9ICcuLyc7XG4gIC8vICAgICBvcHRpb25zLmJhbm5lciA9IHsganM6IGBcInVzZSBjbGllbnRcIjtgIH07XG4gIC8vICAgfSxcbiAgLy8gfSxcbl0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBSTdCLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUV4QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQjtBQUFBLElBQ0UsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRLENBQUMsS0FBSztBQUFBLElBQ2QsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLElBQ0wsZUFBZSxTQUFTLFNBQVM7QUFDL0IsY0FBUSxTQUFTLEVBQUUsSUFBSSxnQkFBZ0I7QUFBQSxJQUd6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsUUFBUSxDQUFDLEtBQUs7QUFBQSxJQUNkLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxJQUNMLGVBQWUsU0FBUyxTQUFTO0FBQy9CLGNBQVEsU0FBUyxFQUFFLElBQUksZ0JBQWdCO0FBQUEsSUFFekM7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFCRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
