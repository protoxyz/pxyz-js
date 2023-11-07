export const CLIENT_REQUEST_TS = `
import paths from "path"

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';

export interface RequestOptions<RequestInput> {
  body?: RequestInput;
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

export async function request<RequestInput, RequestOutput>(
  auth: AuthOptions,
  method: HTTPMethod,
  host: string,
  path: string,
  options?: RequestOptions<RequestInput>,
  debug?: boolean,
): Promise<RequestOutput> {
  const url = buildUrl<RequestInput>(host, path, options);

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
    } as RequestOutput);
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

  return Promise.resolve(body as RequestOutput);
}

export function buildUrl<RequestInput>(
  host: string,
  path: string,
  options?: RequestOptions<RequestInput>,
): URL {
  const searchParams = new URLSearchParams();
  let updatedPath = path;

  if (options !== undefined) {
    const { query: queryParams, path: pathParams } = options;

    if (queryParams !== undefined) {
      Object.keys(queryParams).reduce((searchParams, key) => {
        if (queryParams[key] !== undefined)
          searchParams.append(key, queryParams[key] ?? '');
        return searchParams;
      }, searchParams);
    }

    if (pathParams !== undefined) {
      updatedPath = Object.keys(pathParams).reduce((path, key) => {
        const reg = new RegExp(\`{\${key}}\`, 'g');
        path = path.replace(reg, encodeURIComponent(pathParams[key] ?? ''));
        return path;
      }, updatedPath);
    }
  }

  // if host is localhost, replace with 127.0.0.1
  if (host.includes('localhost')) {
    host = host.replace('localhost', '127.0.0.1');
  }

  const existingUrl = new URL(host);
  const existingPath = existingUrl.pathname;

  const url = new URL(
    paths.join(existingPath, updatedPath) + '?' + searchParams.toString(),
    existingUrl.origin,
  );

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
    "declaration": true,
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
