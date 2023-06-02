import github from "./github";
import gitlab from "./gitlab";
import google from "./google";
import facebook from "./facebook";
import apple from "./apple";

import type { OAuth2TokenEndpointResponse, OpenIDTokenEndpointResponse } from "oauth4webapi";

export type OAuthAuthProviderType = "oauth" | "oidc";
export type OAuthProfile = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
};

export type OAuthAuthorizationRequest = ({
    tokens,
    provider,
}: {
    tokens: TokenSet;
    provider: OAuthProviderWithAuthorizationHandler;
}) => Promise<any>;

export type OAuthTokenRequest = ({
    tokens,
    provider,
}: {
    tokens: TokenSet;
    provider: OAuthProviderWithTokenHandler;
}) => Promise<any>;

export type OAuthUserinfoRequest = ({
    tokens,
    provider,
}: {
    tokens: TokenSet;
    provider: OAuthProviderWithUserInfoHandler;
}) => Promise<any>;

export type ProfileCallbackHandler = (profile: any) => any;

export interface TokenEndpointHandler {
    url?: URL;
    request?: OAuthTokenRequest;
}

export interface AuthorizationEndpointHandler {
    url?: URL;
    params?: Record<string, any>;
}

export interface UserinfoEndpointHandler {
    url?: URL;
    tokens?: TokenSet;
    request?: OAuthUserinfoRequest;
}

export type OAuthProviderWithAuthorizationHandler = OAuthProvider & {
    authorization: AuthorizationEndpointHandler;
};

export type OAuthProviderWithTokenHandler = OAuthProvider & {
    token: TokenEndpointHandler;
};

export type OAuthProviderWithUserInfoHandler = OAuthProvider & {
    userInfo: UserinfoEndpointHandler;
};

export type OAuthProvider = {
    id: string;
    name: string;
    type: OAuthAuthProviderType;
    description: string;
    clientId: string;
    clientSecret: string;
    scope?: string[];
    checks: Array<"pkce" | "state" | "none" | "nonce">;

    authorization?: URL | AuthorizationEndpointHandler;
    token?: URL | TokenEndpointHandler;
    userInfo?: URL | UserinfoEndpointHandler;

    wellKnown?: URL;
    issuer: URL;

    profile: ProfileCallbackHandler;

    // Custom properties
    [key: string]: any;
};

export interface CommonProviderOptions {
    id: string;
    name: string;
    type: OAuthAuthProviderType;
}

export const providers = {
    github,
    google,
    facebook,
    apple,
    gitlab,
} as { [key: string]: OAuthProvider };

export type TokenSet = Partial<OAuth2TokenEndpointResponse | OpenIDTokenEndpointResponse>;
