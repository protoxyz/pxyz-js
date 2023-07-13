export const StackResourceType = {
  database_postgres: 'database_postgres',
  cache_redis: 'cache_redis',
  cache_mem: 'cache_mem',
};
export type StackResourceType =
  (typeof StackResourceType)[keyof typeof StackResourceType];
