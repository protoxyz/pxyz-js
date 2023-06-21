export const StackInfrastructure = {
    protocol: "protocol",
    custom_aws: "custom_aws",
};
export type StackInfrastructure = (typeof StackInfrastructure)[keyof typeof StackInfrastructure];
