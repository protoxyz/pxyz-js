import { BACKEND_API_URL, IS_PROTOCOL_DEV } from "./utils";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export interface RequestOptions {
    body?: unknown;
    headers?: Record<string, string>;
    path?: Record<string, string>;
    query?: Record<string, string>;
}

export interface HttpClientConfigOptions {
    host?: string | undefined;
    accessToken?: string | undefined;
    credentials?: boolean | undefined;
    debug?: boolean | undefined;
    proxyUrl?: string | undefined;
}
export class HttpClient {
    private host?: string | undefined;
    private accessToken?: string | undefined;
    private credentials?: boolean | undefined;
    private debug: boolean;
    private proxyUrl?: string | undefined;

    constructor(options?: HttpClientConfigOptions) {
        this.accessToken = options?.accessToken;
        this.credentials = options?.credentials;
        this.debug = options?.debug || true;
        this.proxyUrl = options?.proxyUrl;

        if (!options?.host) {
            this.host = BACKEND_API_URL;
        } else {
            this.host = this.formatHost(options?.host ?? "");
        }
    }

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    private formatHost(host: string): string {
        if (IS_PROTOCOL_DEV && !host.startsWith("http://")) {
            return `http://${host}`;
        }

        if (!IS_PROTOCOL_DEV && host.startsWith("http://")) {
            return host.replace("http://", "https://");
        }

        if (!IS_PROTOCOL_DEV && !host.startsWith("https://")) {
            return `https://${host}`;
        }

        if (host.endsWith("/")) {
            return host.slice(0, -1);
        }

        return host;
    }

    private buildUrl(path: string, options?: RequestOptions): URL {
        const searchParams = new URLSearchParams();
        let updatedPath = path;

        if (options !== undefined) {
            const { query: queryParams, path: pathParams } = options;

            if (queryParams !== undefined) {
                Object.keys(queryParams).reduce((searchParams, key) => {
                    searchParams.append(key, queryParams[key]);
                    return searchParams;
                }, searchParams);
            }

            if (pathParams !== undefined) {
                updatedPath = Object.keys(pathParams).reduce((path, key) => {
                    const reg = new RegExp(`{${key}}`, "g");
                    path = path.replace(reg, encodeURIComponent(pathParams[key]));
                    return path;
                }, updatedPath);
            }
        }

        const url = new URL(updatedPath, this.host);
        url.search = searchParams.toString();

        return url;
    }

    async request<T>(method: HTTPMethod, path: string, options?: RequestOptions): Promise<T> {
        const url = this.buildUrl(path, options);

        if (this.debug) {
            console.log(`[HTTP] ${method} ${url.toString()}`);
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (this.proxyUrl !== undefined) {
            headers.append("Authority", this.proxyUrl);
        }

        if (this.accessToken !== undefined && this.accessToken !== "" && this.accessToken !== null) {
            headers.append("Authorization", `Bearer ${this.accessToken}`);
        }

        if (options?.headers) {
            const optionsHeaders = options?.headers || {};
            Object.keys(optionsHeaders).reduce((headers, key) => {
                headers.append(key, optionsHeaders[key]);
                return headers;
            }, headers);
        }

        const request = new Request(url.toString(), {
            method,
            headers,
            body: options?.body ? JSON.stringify(options?.body) : undefined,
            credentials: this.credentials ? "include" : "omit",
            cache: this.debug ? "no-cache" : "default",
        });

        const response = await fetch(request).catch((error) => error);

        if (response instanceof Error) {
            if (this.debug) {
                console.log(`[HTTP] ${method} ${url.toString()} failed: ${response.message}`);
            }
            return Promise.resolve({
                error: response.message,
            } as T);
        }

        const body = await response.json();
        const status = response.status.toString();

        return Promise.resolve(body as T);
    }
}
