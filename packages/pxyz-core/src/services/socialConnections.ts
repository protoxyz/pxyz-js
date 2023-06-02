import { Protocol } from "../pxyz";
import {
    CreateSocialConnectionsOptions,
    DeleteSocialConnectionOptions,
    GetSocialConnectionOptions,
    ListSocialConnectionsOptions,
    UpdateSocialConnectionOptions,
} from "../requests";
import {
    CreateSocialConnection200Response,
    DeleteSocialConnection200Response,
    GetSocialConnection200Response,
    ListSocialConnections200Response,
    UpdateSocialConnection200Response,
} from "../responses";

export class ProtocolAuthSocialConnectionsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    list(options?: ListSocialConnectionsOptions): Promise<ListSocialConnections200Response> {
        return this.protocol.client.request<ListSocialConnections200Response>(
            "GET",
            "/api/auth/frontend/v0/user/connections",
            options,
        );
    }

    create(options?: CreateSocialConnectionsOptions): Promise<CreateSocialConnection200Response> {
        return this.protocol.client.request<CreateSocialConnection200Response>(
            "POST",
            "/api/auth/frontend/v0/user/connections",
            options,
        );
    }

    delete(options?: DeleteSocialConnectionOptions): Promise<DeleteSocialConnection200Response> {
        return this.protocol.client.request<DeleteSocialConnection200Response>(
            "DELETE",
            "/api/auth/frontend/v0/user/connections/{connectionId}",
            options,
        );
    }

    get(options?: GetSocialConnectionOptions): Promise<GetSocialConnection200Response> {
        return this.protocol.client.request<GetSocialConnection200Response>(
            "GET",
            "/api/auth/frontend/v0/user/connections/{connectionId}",
            options,
        );
    }

    update(options?: UpdateSocialConnectionOptions): Promise<UpdateSocialConnection200Response> {
        return this.protocol.client.request<UpdateSocialConnection200Response>(
            "PATCH",
            "/api/auth/frontend/v0/user/connections/{connectionId}",
            options,
        );
    }
}
