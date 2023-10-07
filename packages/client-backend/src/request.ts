
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
    console.log(`[HTTP] ${method} ${url.toString()}`);
    console.log(`body:`, options?.body);
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  if (
    'token' in auth &&
    auth.token !== undefined &&
    auth.token !== '' &&
    auth.token !== null
  ) {
    headers.set('Authorization', `Bearer ${auth.token.trim()}`);
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
        `[HTTP] ${method} ${url.toString()} failed: ${response.message}`,
      );
    }
    return Promise.resolve({
      error: response.message,
    } as T);
  }

  if (debug) {
    console.log(
      `[HTTP] ${method} ${url.toString()} returned ${response.status}`,
    );
  }

  const body = await response.json();
  const status = response.status.toString();

  if (debug) {
    console.log(`[HTTP] ${method} ${url.toString()} ${status.toString()}`);
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
        const reg = new RegExp(`{${key}}`, 'g');
        path = path.replace(reg, encodeURIComponent(pathParams[key] ?? ""));
        return path;
      }, updatedPath);
    }
  }

  const url = new URL(updatedPath + '?' + searchParams.toString(), host);

  return url;
}
