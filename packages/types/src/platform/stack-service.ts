import { Project } from "../project";
import { Stack } from "./stack";
import { StackServiceStatus } from "./stack-infrastructure-status";
import { StackRepository } from "./stack-repository";
import { StackServiceBuildConfig } from "./stack-service-build-config";
import { StackServiceEnvironmentVariable } from "./stack-service-environment-variable";
import { StackServiceType } from "./stack-service-type";
import { StackWebServiceConfig } from "./stack-web-service";

export type StackService = {
    id: string;

    projectId: string;
    project?: Project | null;

    stackId: string;
    stack?: Stack | null;

    name: string;
    type: StackServiceType;

    repositoryId: string;
    repository?: StackRepository | null;

    config: StackWebServiceConfig;
    buildConfig: StackServiceBuildConfig;
    environment: StackServiceEnvironmentVariable[];

    status: StackServiceStatus;
    message?: string | null;
    url?: string | null;
    error?: string | null;

    createdAt: string;
    updatedAt: string;
};
