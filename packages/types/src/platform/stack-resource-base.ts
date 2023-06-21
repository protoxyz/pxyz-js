import { Stack } from "./stack";
import { StackResourceStatus } from "./stack-resource-status";

export type StackResourceBase = {
    id: string;

    stackId: string;
    stack?: Stack;

    name: string;
    status: StackResourceStatus;
    error?: string | null;

    createdAt: string;
    updatedAt: string;
};
