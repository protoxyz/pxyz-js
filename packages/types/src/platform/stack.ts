import { Project } from '../project';
import { StackInfrastructure } from './stack-infrastructure';
import { StackRegion } from './stack-region';
import { StackResource } from './stack-resource';
import { StackService } from './stack-service';
import { StackStatus } from './stack-status';

export type Stack = {
  id: string;

  projectId: string;
  project?: Project;

  name: string;
  infra: StackInfrastructure;
  region: StackRegion;
  status: StackStatus;
  error: string | null;

  resources: StackResource[];
  services: StackService[];

  createdAt: string;
  updatedAt: string;
};
