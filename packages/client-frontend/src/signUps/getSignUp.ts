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

export type SignUpsGetSignUpInput = undefined;

export function getSignUp(
    auth: AuthOptions,
    body?: SignUpsGetSignUpInput,
    options?: RequestOptions<SignUpsGetSignUpInput>,
    development?: boolean,
): Promise<SignUpsGetSignUpResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<SignUpsGetSignUpInput, SignUpsGetSignUpResponse>(
        auth,
        'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/sign-ups/${pathParams.id}',
        {...options, body},
    );
}
