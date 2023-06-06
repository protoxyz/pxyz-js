import { UserProfile } from "./auth";
import { Project, StarterKit } from "./core";

export const StackRegion = {
    ohio: "ohio",
    virginia: "virginia",
    california: "california",
    oregon: "oregon",
    africa: "africa",
    asiaPacificHongKong: "asiaPacificHongKong",
    asiaPacificHyderabad: "asiaPacificHyderabad",
    asiaPacificJakarta: "asiaPacificJakarta",
    asiaPacificMelbourne: "asiaPacificMelbourne",
    asiaPacificMumbai: "asiaPacificMumbai",
    asiaPacificOsaka: "asiaPacificOsaka",
    asiaPacificSeoul: "asiaPacificSeoul",
    asiaPacificSingapore: "asiaPacificSingapore",
    asiaPacificSydney: "asiaPacificSydney",
    asiaPacificTokyo: "asiaPacificTokyo",
    canadaCentral: "canadaCentral",
    europeFrankfort: "europeFrankfort",
    europeIreland: "europeIreland",
    europeLondon: "europeLondon",
    europeMilan: "europeMilan",
    europeParis: "europeParis",
    europeSpain: "europeSpain",
    europeStockholm: "europeStockholm",
    middleEastBahrain: "middleEastBahrain",
    middleEastUae: "middleEastUae",
    southAmericaSaoPaulo: "southAmericaSaoPaulo",
    awsGovCloudEast: "awsGovCloudEast",
    awsGovCloudWest: "awsGovCloudWest",
};

export type StackRegion = (typeof StackRegion)[keyof typeof StackRegion];

export const StorageProviderType = {
    protocol: "protocol",
    custom_aws: "custom_aws",
};
export type StorageProviderType = (typeof StorageProviderType)[keyof typeof StorageProviderType];

export const StackInfrastructure = {
    protocol: "protocol",
    custom_aws: "custom_aws",
};
export type StackInfrastructure = (typeof StackInfrastructure)[keyof typeof StackInfrastructure];

export const StackServiceStatus = {
    pending: "pending",
    deploying: "deploying",
    failed: "failed",
    ready: "ready",
};
export type StackServiceStatus = (typeof StackServiceStatus)[keyof typeof StackServiceStatus];

export const StackResourceType = {
    database_postgres: "database_postgres",
    cache_redis: "cache_redis",
    cache_mem: "cache_mem",
};
export type StackResourceType = (typeof StackResourceType)[keyof typeof StackResourceType];

export const StackResourceStatus = {
    pending: "pending",
    creating: "creating",
    updating: "updating",
    deleting: "deleting",
    ready: "ready",
    failed: "failed",
};
export type StackResourceStatus = (typeof StackResourceStatus)[keyof typeof StackResourceStatus];

export const StackResourceAvailabilityZoneType = {
    single: "single",
    multi: "multi",
};
export type StackResourceAvailabilityZoneType =
    (typeof StackResourceAvailabilityZoneType)[keyof typeof StackResourceAvailabilityZoneType];

export const StackRepositoryStatus = {
    created: "created",
    cloning: "cloning",
    cloned: "cloned",
    error: "error",
};
export type StackRepositoryStatus = (typeof StackRepositoryStatus)[keyof typeof StackRepositoryStatus];

export const StackStatus = {
    pending: "pending",
    creating: "creating",
    created: "created",
    updating: "updating",
    updated: "updated",
    deleting: "deleting",
    deleted: "deleted",
    ready: "ready",
    error: "error",
};
export type StackStatus = (typeof StackStatus)[keyof typeof StackStatus];

export const StackServiceType = {
    web_server: "web_server",
    static_site: "static_site",
    background_worker: "background_worker",
    cron_job: "cron_job",
    private_service: "private_service",
};
export type StackServiceType = (typeof StackServiceType)[keyof typeof StackServiceType];

export interface StackServiceResourceLink {
    id: string;

    serviceId: string;
    service?: StackService | null;

    resourceId: string;
    resource?: StackResource | null;

    createdAt: Date;
    updatedAt: Date;
}

export interface Stack {
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

    createdAt: Date;
    updatedAt: Date;
}

export const StackServicePlatform = {
    node_18: "node_18",
    python_39: "python_39",
    ruby_30: "ruby_30",
    php_80: "php_80",
    go_116: "go_116",
};
export type StackServicePlatform = (typeof StackServicePlatform)[keyof typeof StackServicePlatform];

export interface StackService {
    id: string;

    projectId: string;
    project?: Project | null;

    stackId: string;
    stack?: Stack | null;

    name: string;
    type: StackServiceType;

    repositoryId: string;
    repository?: StackRepository | null;

    platform: StackServicePlatform;
    path: string;
    installCmd?: string | null;
    buildCmd?: string | null;
    startCmd?: string | null;

    status: StackServiceStatus;
    message?: string | null;
    url?: string | null;
    error?: string | null;

    links?: StackServiceResourceLink[];

    createdAt: Date;
    updatedAt: Date;
}

export interface StackResource {
    id: string;

    stackId: string;
    stack?: Stack;

    name: string;
    type: StackResourceType;
    cloudTypeId: string;
    cloudResourceId: string;
    status: StackResourceStatus;
    availabilityZoneType: StackResourceAvailabilityZoneType;
    properties: any;
    error?: string | null;
    links?: StackServiceResourceLink[];

    createdAt: Date;
    updatedAt: Date;
}

export interface StackRepository {
    id: string;

    projectId: string;
    project?: Project | null;

    creatorId: string;
    creator?: UserProfile | null;

    name: string;

    repositoryUri: string;
    status: StackRepositoryStatus;

    starterKitId?: string | null;
    starterKit?: StarterKit | null | undefined;

    error?: string | null;

    services?: StackService[];

    createdAt: Date;
    updatedAt: Date;
}
