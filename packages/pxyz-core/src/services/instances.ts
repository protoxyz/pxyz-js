import { Protocol } from "../pxyz";
import { GetAuthInstance200Response } from "../responses";
import {
    GetAuthInstanceByDomainOptions,
    GetAuthInstanceByIdOptions,
    GetAuthInstanceByPublicKeyOptions,
} from "../requests";

export class ProtocolAuthInstancesService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    getByPublicKey(options?: GetAuthInstanceByPublicKeyOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>(
            "GET",
            "/api/auth/frontend/v0/instances/pkey/{publicKey}",
            options,
        );
    }

    getById(options?: GetAuthInstanceByIdOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>(
            "GET",
            "/api/auth/frontend/v0/instances/id/{id}",
            options,
        );
    }

    getByDomain(options?: GetAuthInstanceByDomainOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>(
            "GET",
            "/api/auth/frontend/v0/instances/domain/{domain}",
            options,
        );
    }
}
