import { StackResourceBase } from './stack-resource-base';

export type StackResourceRedis = StackResourceBase & {
  type: 'cache_redis';
  config?: StackResourceRedisConfig;
};

export type StackResourceRedisConfig = {
  cacheNodeType?: string;
  numCacheNodes?: number;
  azMode?: 'single-az' | 'multi-az';
  engineVersion?: string;
  ipDiscovery?: 'ipv4' | 'ipv6';
};
