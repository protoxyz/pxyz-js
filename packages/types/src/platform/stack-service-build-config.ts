import { StackServicePlatform } from "./stack-service-platform";

export type StackServiceBuildConfig = {
    platform: StackServicePlatform;
    branch?: string;
    rootPath: string;
    installCommand: string;
    buildCommand: string;
    startCommand: string;
    turboScope: string;
};
