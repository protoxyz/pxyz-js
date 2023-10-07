import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type SignUpsGetSignUpResponse = {
    status: string  
    error: string | null 
    data: {
    signUpAttempt: {
    id: string  
    userId: string | null 
    tenantId: string | null 
    name: string | null 
    email: string | null 
    phone: string | null 
    username: string | null 
    status: string  
    oauthProviderId: string | null 
    oauthProvider: {
    id: string  
    providerKey: string  
} | null 
    redirectUri: string | null 
    emailVerificationStrategy: string | null 
    phoneVerificationStrategy: string | null 
    requiredFields: string []  
    missingFields: string []  
    requiredVerifications: string []  
    missingVerifications: string []  
    createdAt: string  
    updatedAt: string  
}  
} | null 
}

export function getSignUp(
    auth: AuthOptions,
    options?: RequestOptions,
    development?: boolean,
): Promise<SignUpsGetSignUpResponse> {
    return request<SignUpsGetSignUpResponse>(
        auth,
        'GET',
        development ? SERVERS.development : SERVERS.production,
        '/sign-ups/${pathParams.id}',
        options,
    );
}
