import {
    AttemptSignInAttemptFirstFactorOptions,
    AttemptSignInAttemptSecondFactorOptions,
    AttemptSignUpAttemptVerificationOptions,
    CreateSignInAttemptOptions,
    CreateSignUpAttemptOptions,
    EndSessionOptions,
    GetAuthInstanceByDomainOptions,
    GetAuthInstanceByIdOptions,
    GetAuthInstanceByPublicKeyOptions,
    GetSignInAttemptOptions,
    GetSignUpAttemptOptions,
    GetUserProfileOptions,
    ListConnectionsOptions,
    ListEmailAddressesOptions,
    ListPhoneNumbersOptions,
    ListSessionsOptions,
    PrepareSignInAttemptFirstFactorOptions,
    PrepareSignInAttemptSecondFactorOptions,
    PrepareSignUpAttemptVerificationOptions,
    UpdateSignInAttemptOptions,
    UpdateSignUpAttemptOptions,
} from "./requests";
import {
    AttemptSignInAttemptFirstFactor200Response,
    AttemptSignInAttemptSecondFactor200Response,
    AttemptSignUpAttemptVerification200Response,
    CreateSignInAttempt201Response,
    CreateSignUpAttempt201Response,
    EndSession200Response,
    GetAuthInstance200Response,
    GetSignInAttempt200Response,
    GetSignUpAttempt200Response,
    GetUserProfile200Response,
    ListEmailAddresses200Response,
    ListPhoneNumbers200Response,
    ListSessions200Response,
    ListSocialConnections200Response,
    PrepareSignInAttemptFirstFactor200Response,
    PrepareSignInAttemptSecondFactor200Response,
    PrepareSignUpAttemptVerification200Response,
    UpdateSignInAttempt200Response,
    UpdateSignUpAttempt200Response,
} from "./responses";

export interface Routes {
    "/users/profile": {
        get: (input: GetUserProfileOptions) => Promise<GetUserProfile200Response>;
    };
    "/auth-instances/pkey/{publicKey}": {
        get: (input: GetAuthInstanceByPublicKeyOptions) => Promise<GetAuthInstance200Response>;
    };
    "/auth-instances/domain/{domain}": {
        get: (input: GetAuthInstanceByDomainOptions) => Promise<GetAuthInstance200Response>;
    };
    "/auth-instances/id/{id}": {
        get: (input: GetAuthInstanceByIdOptions) => Promise<GetAuthInstance200Response>;
    };
    "/sign-ins": {
        post: (input: CreateSignInAttemptOptions) => Promise<CreateSignInAttempt201Response>;
    };
    "/sign-ins/{id}": {
        get: (input: GetSignInAttemptOptions) => Promise<GetSignInAttempt200Response>;
        patch: (input: UpdateSignInAttemptOptions) => Promise<UpdateSignInAttempt200Response>;
    };
    "/sign-ins/{id}/prepare-first-factor": {
        post: (input: PrepareSignInAttemptFirstFactorOptions) => Promise<PrepareSignInAttemptFirstFactor200Response>;
    };
    "/sign-ins/{id}/attempt-first-factor": {
        post: (input: AttemptSignInAttemptFirstFactorOptions) => Promise<AttemptSignInAttemptFirstFactor200Response>;
    };
    "/sign-ins/{id}/prepare-second-factor": {
        post: (input: PrepareSignInAttemptSecondFactorOptions) => Promise<PrepareSignInAttemptSecondFactor200Response>;
    };
    "/sign-ins/{id}/attempt-second-factor": {
        post: (input: AttemptSignInAttemptSecondFactorOptions) => Promise<AttemptSignInAttemptSecondFactor200Response>;
    };
    "/sign-ups/": {
        post: (input: CreateSignUpAttemptOptions) => Promise<CreateSignUpAttempt201Response>;
    };
    "/sign-ups/{id}": {
        get: (input: GetSignUpAttemptOptions) => Promise<GetSignUpAttempt200Response>;
        update: (input: UpdateSignUpAttemptOptions) => Promise<UpdateSignUpAttempt200Response>;
    };
    "/sign-ups/{id}/prepare-verification": {
        post: (input: PrepareSignUpAttemptVerificationOptions) => Promise<PrepareSignUpAttemptVerification200Response>;
    };
    "/sign-ups/{id}/attempt-verification": {
        post: (input: AttemptSignUpAttemptVerificationOptions) => Promise<AttemptSignUpAttemptVerification200Response>;
    };
    "/user/phone-numbers": {
        get: (input: ListPhoneNumbersOptions) => Promise<ListPhoneNumbers200Response>;
    };
    "/user/emails": {
        get: (input: ListEmailAddressesOptions) => Promise<ListEmailAddresses200Response>;
    };
    "/user/connections": {
        get: (input: ListConnectionsOptions) => Promise<ListSocialConnections200Response>;
    };
    "/user/sessions": {
        get: (input: ListSessionsOptions) => Promise<ListSessions200Response>;
    };
    "/user/sessions/end": {
        delete: (input: EndSessionOptions) => Promise<EndSession200Response>;
    };
}

/**
 * Helper type that matches a string with a Template
 * we use this to figure out if a string contains
 * one or more path parameters. Path parameters
 * are segments of the path that start with '/' and
 * are enclosed by '{}'
 */
export type PathParameter<TPath extends string> =
    // Define our template in terms of Head/{Parameter}Tail
    TPath extends `${infer Head}/{${infer Parameter}}${infer Tail}`
        ? // We can call PathParameter<Tail> recursively to
          // match the template against the Tail of the path
          [pathParameter: string, ...params: PathParameter<Tail>]
        : // If no parameters were found we get an empty tuple
          [];

/**
 * Defines the type for the path function that will be part
 * of the client. This will only accept a string that
 * matches any of the keys of our Routes interface
 */
export type Path = <TPath extends keyof Routes>(
    path: TPath,
    // Our PathParameter helper type gives us a tuple
    // of the parameters that were found. If we spread
    // the tuple, we get each single parameter as a positiona
    // parameter of this function
    ...pathParam: PathParameter<TPath>
) => Routes[TPath]; // We can access elements of an interface by key
