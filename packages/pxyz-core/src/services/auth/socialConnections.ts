import { Protocol } from "../../pxyz";
import {
    CreateSocialConnectionsOptions,
    DeleteSocialConnectionOptions,
    GetSocialConnectionOptions,
    ListSocialConnectionsOptions,
    UpdateSocialConnectionOptions,
} from "../../requests";
import {
    CreateSocialConnection200Response,
    DeleteSocialConnection200Response,
    GetSocialConnection200Response,
    ListSocialConnections200Response,
    UpdateSocialConnection200Response,
} from "../../responses";

export const ListSocialConnectionsPath = "/api/auth/frontend/v0/user/connections";
export const CreateSocialConnectionPath = "/api/auth/frontend/v0/user/connections";
export const DeleteSocialConnectionPath = "/api/auth/frontend/v0/user/connections/{connectionId}";
export const GetSocialConnectionPath = "/api/auth/frontend/v0/user/connections/{connectionId}";
export const UpdateSocialConnectionPath = "/api/auth/frontend/v0/user/connections/{connectionId}";

export class ProtocolAuthSocialConnectionsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    list(options?: ListSocialConnectionsOptions): Promise<ListSocialConnections200Response> {
        return this.protocol.client.request<ListSocialConnections200Response>(
            "GET",
            ListSocialConnectionsPath,
            options,
        );
    }

    create(options?: CreateSocialConnectionsOptions): Promise<CreateSocialConnection200Response> {
        return this.protocol.client.request<CreateSocialConnection200Response>(
            "POST",
            CreateSocialConnectionPath,
            options,
        );
    }

    delete(options?: DeleteSocialConnectionOptions): Promise<DeleteSocialConnection200Response> {
        return this.protocol.client.request<DeleteSocialConnection200Response>(
            "DELETE",
            DeleteSocialConnectionPath,
            options,
        );
    }

    get(options?: GetSocialConnectionOptions): Promise<GetSocialConnection200Response> {
        return this.protocol.client.request<GetSocialConnection200Response>("GET", GetSocialConnectionPath, options);
    }

    update(options?: UpdateSocialConnectionOptions): Promise<UpdateSocialConnection200Response> {
        return this.protocol.client.request<UpdateSocialConnection200Response>(
            "PATCH",
            UpdateSocialConnectionPath,
            options,
        );
    }
}
