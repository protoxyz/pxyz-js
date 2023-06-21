import { StackResourceBase } from "./stack-resource-base";

export type StackResourceMemcachedConfig = {
    cacheNodeType?: string;
    numCacheNodes?: number;
    azMode?: "single-az" | "multi-az";
    engineVersion?: string;
    ipDiscovery?: "ipv4" | "ipv6";
};

export type StackResourceMemcached = StackResourceBase & {
    type: "cache_mem";
    config?: StackResourceMemcachedConfig;
};
