import { StackResourceMemcached } from './stack-resource-memcached';
import { StackResourcePostgres } from './stack-resource-postgres';

export type StackResource = StackResourcePostgres | StackResourceMemcached;
