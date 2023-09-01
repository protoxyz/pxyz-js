export interface TokenCache {
    getToken: (key: string) => Promise<string | null>;
    saveToken: (key: string, value: string) => Promise<void>;
    deleteToken: (key: string) => Promise<void>;
}