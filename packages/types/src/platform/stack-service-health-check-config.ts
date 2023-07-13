export type StackServiceHealthCheckConfig = {
  path?: string;
  interval?: number;
  timeout?: number;
  healthyThreshold?: number;
  unhealthyThreshold?: number;
};
