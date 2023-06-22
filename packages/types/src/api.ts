export interface PaginatedMeta {
    total: number;
    count: number;
    numPages: number;
    perPage: number;
    prev?: string | null | undefined;
    next?: string | null | undefined;
}

export type PaginatedArgs = {
    cursor?: string | null;
    perPage?: number;
};

export const ResponseStatus = {
    Success: "success",
    Error: "error",
};
export type ResponseStatus = (typeof ResponseStatus)[keyof typeof ResponseStatus];
