import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthSignInAttemptsDeleteSignInAttemptResponse = {
    deleted: boolean  
}

export function deleteSignInAttempt(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<AuthSignInAttemptsDeleteSignInAttemptResponse> {
    return request<AuthSignInAttemptsDeleteSignInAttemptResponse>(
        auth,
        'DELETE',
        development ? SERVERS.development : SERVERS.production,
        '/auth/sign-ins/${pathParams.id}',
        options,
    );
}

