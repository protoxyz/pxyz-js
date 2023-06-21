import { StackResourceBase } from "./stack-resource-base";

export type StackResourcePostgresConfig = {
    engineVersion?: string;
    instanceType?: string;
    multiAz?: boolean;
    storageType?: string;
    allocatedStorage?: number;
    isPublic?: boolean;
};

export type StackResourcePostgres = StackResourceBase & {
    type: "database_postgres";
    config?: StackResourcePostgresConfig;
};
