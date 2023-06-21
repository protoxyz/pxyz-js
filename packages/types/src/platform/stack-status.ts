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
