import { Protocol } from "../../pxyz";
import { GetAuthInstance200Response } from "../../responses";
import {
    GetAuthInstanceByDomainOptions,
    GetAuthInstanceByIdOptions,
    GetAuthInstanceByPublicKeyOptions,
} from "../../requests";

export const GetAuthInstanceByDomainPath = "/api/auth/frontend/v0/instances/domain/{domain}";
export const GetAuthInstanceByIdPath = "/api/auth/frontend/v0/instances/id/{id}";
export const GetAuthInstanceByPublicKeyPath = "/api/auth/frontend/v0/instances/pkey/{publicKey}";

export class ProtocolAuthInstancesService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    getByPublicKey(options?: GetAuthInstanceByPublicKeyOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>("GET", GetAuthInstanceByPublicKeyPath, options);
    }

    getById(options?: GetAuthInstanceByIdOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>("GET", GetAuthInstanceByIdPath, options);
    }

    getByDomain(options?: GetAuthInstanceByDomainOptions): Promise<GetAuthInstance200Response> {
        return this.protocol.client.request<GetAuthInstance200Response>("GET", GetAuthInstanceByDomainPath, options);
    }
}
