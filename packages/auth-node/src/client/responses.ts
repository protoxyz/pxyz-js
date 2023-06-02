import { Response, UserProfile } from "@protoxyz/core";

export interface GetUser200Response extends Response {
    data: {
        user: UserProfile | undefined;
    };
}
