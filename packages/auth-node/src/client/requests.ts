import { RequestOptions } from "./client";

export interface GetUserOptions extends RequestOptions {
    body?: never;
    path?: {
        userId: string;
    };
}
