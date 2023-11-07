import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type SignUpsCreateSignUpResponse = {
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
} | null 
    session: {
    id: string  
    browser: string | null 
    device: string | null 
    engine: string | null 
    os: string | null 
    cpu: string | null 
    ua: string | null 
    ip: string | null 
    userId: string | null 
    signInAttemptId: string | null 
    signUpAttemptId: string | null 
    expiresAt: string  
    createdAt: string  
    updatedAt: string  
} | null 
    sessionUser: any | null 
    jwt: string | null 
} | null 
}

export type SignUpsCreateSignUpInput = {
    phone: string  
    email: string  
    username: string  
    name: string  
    password: string  
    providerKey: string  
    redirectUri: string  
};

export function createSignUp(
    auth: AuthOptions,
    body?: SignUpsCreateSignUpInput,
    options?: RequestOptions<SignUpsCreateSignUpInput>,
    development?: boolean,
): Promise<SignUpsCreateSignUpResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
    return request<SignUpsCreateSignUpInput, SignUpsCreateSignUpResponse>(
        auth,
        'POST',
        isDevelopment ? SERVERS.development : SERVERS.production,
        '/sign-ups',
        {...options, body},
    );
}
