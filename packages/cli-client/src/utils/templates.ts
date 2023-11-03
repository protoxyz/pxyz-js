export const CLIENT_REQUEST_TS = `
export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

export interface RequestOptions {
  body?: unknown;
  headers?: Record<string, string>;
  path?: Record<string, string>;
  query?: Record<string, string>;
  credentials?: boolean;
}

export type AuthOptions =
  | {
      token: string;
    }
  | {
      publicKey: string;
      secretKey: string;
    };

export async function request<T>(
  auth: AuthOptions,
  method: HTTPMethod,
  host: string,
  path: string,
  options?: RequestOptions,
  debug?: boolean,
): Promise<T> {
  const url = buildUrl(host, path, options);

  if (debug) {
    console.log(\`[HTTP] \${method} \${url.toString()}\`);
    console.log(\`body:\`, options?.body);
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  if (
    'token' in auth &&
    auth.token !== undefined &&
    auth.token !== '' &&
    auth.token !== null
  ) {
    headers.set('Authorization', \`Bearer \${auth.token.trim()}\`);
  }

  if (
    'publicKey' in auth &&
    auth.publicKey !== undefined &&
    auth.publicKey !== '' &&
    auth.publicKey !== null
  ) {
    headers.set('x-public-key', auth.publicKey.trim());
  }

  if (
    'secretKey' in auth &&
    auth.secretKey !== undefined &&
    auth.secretKey !== '' &&
    auth.secretKey !== null
  ) {
    headers.set('x-secret-key', auth.secretKey.trim());
  }

  if (options?.headers) {
    const optionsHeaders = options?.headers || {};
    Object.keys(optionsHeaders).reduce((headers, key) => {
      headers.append(key, optionsHeaders[key] ?? "");
      return headers;
    }, headers);
  }

  const request = new Request(url.toString(), {
    method,
    headers,
    body: options?.body ? JSON.stringify(options?.body) : undefined,
    credentials: options?.credentials ? 'include' : 'omit',
    cache: debug ? 'no-cache' : 'default',
  });

  const response = await fetch(request).catch((error) => error);

  if (response instanceof Error) {
    if (debug) {
      console.log(
        \`[HTTP] \${method} \${url.toString()} failed: \${response.message}\`,
      );
    }
    return Promise.resolve({
      error: response.message,
    } as T);
  }

  if (debug) {
    console.log(
      \`[HTTP] \${method} \${url.toString()} returned \${response.status}\`,
    );
  }

  const body = await response.json();
  const status = response.status.toString();

  if (debug) {
    console.log(\`[HTTP] \${method} \${url.toString()} \${status.toString()}\`);
  }

  return Promise.resolve(body as T);
}

export function buildUrl(
  host: string,
  path: string,
  options?: RequestOptions,
): URL {
  const searchParams = new URLSearchParams();
  let updatedPath = path;

  if (options !== undefined) {
    const { query: queryParams, path: pathParams } = options;

    if (queryParams !== undefined) {
      Object.keys(queryParams).reduce((searchParams, key) => {
        if (queryParams[key] !== undefined)
          searchParams.append(key, queryParams[key] ?? "");
        return searchParams;
      }, searchParams);
    }

    if (pathParams !== undefined) {
      updatedPath = Object.keys(pathParams).reduce((path, key) => {
        const reg = new RegExp(\`{\${key}}\`, 'g');
        path = path.replace(reg, encodeURIComponent(pathParams[key] ?? ""));
        return path;
      }, updatedPath);
    }
  }

  const url = new URL(updatedPath + '?' + searchParams.toString(), host);

  return url;
}
`;

export const CLIENT_PACKAGE = `
{
  "name": "client-ts",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist/**"
  ],
  "scripts": {
    "build": "tsup src/index.ts",
    "clean": "rm -rf .turbo node_modules dist",
    "dev": "tsup src/index.ts --watch",
    "lint": "tsc --noEmit && eslint 'src/**/*.ts*'",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@protoxyz/config-tsconfig": "github:protoxyz/config-tsconfig",
    "@protoxyz/eslint-config-custom-library": "github:protoxyz/eslint-config-custom-library",
    "@types/node": "^18.14.2",
    "@types/node-fetch": "^2.6.4",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "abort-controller": "3.x",
    "eslint": "^8.32.0",
    "form-data": "4.x",
    "node-fetch": "^3.3.2",
    "tsup": "^6.2.3",
    "typescript": "^4.9.5"
  }
}
`;

export const TSCONFIG = `
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
`;

export const TSUPCONFIG = `
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./index.ts'],
    clean: true,
    format: ['esm', 'cjs'],
    dts: true,
    outDir: './dist',
  },
]);
`;

export const UTILS = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

export const UTILS_JS = `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`;

export const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{<%- extension %>,<%- extension %>x}',
    './components/**/*.{<%- extension %>,<%- extension %>x}',
    './app/**/*.{<%- extension %>,<%- extension %>x}',
    './src/**/*.{<%- extension %>,<%- extension %>x}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

export const TAILWIND_CONFIG_WITH_VARIABLES = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{<%- extension %>,<%- extension %>x}',
    './components/**/*.{<%- extension %>,<%- extension %>x}',
    './app/**/*.{<%- extension %>,<%- extension %>x}',
    './src/**/*.{<%- extension %>,<%- extension %>x}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;
