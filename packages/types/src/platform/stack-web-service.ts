import { StackServiceHealthCheckConfig } from './stack-service-health-check-config';

export type StackWebServiceConfig = {
  port?: number;
  cpu?: number;
  memory?: number;
  desiredCount?: number;
  minCapacity?: number;
  maxCapacity?: number;
  cpuScalingTargetPercent?: number;
  cpuScalingCooldownIn?: number;
  cpuScalingCooldownOut?: number;
  memoryScalingTargetPercent?: number;
  memoryScalingCooldownIn?: number;
  memoryScalingCooldownOut?: number;
  healthCheck?: StackServiceHealthCheckConfig;
};
