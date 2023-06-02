import { Protocol } from "../pxyz";
import { GetWellKnownJWKSOptions, GetWellKnownOpenIDConfigurationOptions } from "../requests";
import { GetWellKnownJWKS200Response, GetWellKnownOpenIDConfiguration200Response } from "../responses";

export class ProtocolAuthWellKnownsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    jwks(options?: GetWellKnownJWKSOptions): Promise<GetWellKnownJWKS200Response> {
        return this.protocol.client.request<GetWellKnownJWKS200Response>(
            "GET",
            "/api/auth/frontend/v0/.well-known/jwks/{domain}",
            options,
        );
    }

    openidConfiguration(
        options?: GetWellKnownOpenIDConfigurationOptions,
    ): Promise<GetWellKnownOpenIDConfiguration200Response> {
        return this.protocol.client.request<GetWellKnownOpenIDConfiguration200Response>(
            "GET",
            "/api/auth/frontend/v0/.well-known/openid-configuration/{domain}",
            options,
        );
    }
}
