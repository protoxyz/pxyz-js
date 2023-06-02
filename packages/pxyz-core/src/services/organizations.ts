import { Protocol } from "../pxyz";
import {
    CreateOrganizationOptions,
    GetOrganizationOptions,
    DeleteOrganizationOptions,
    UpdateOrganizationOptions,
    ListOrganizationsOptions,
} from "../requests";
import {
    CreateOrganization201Response,
    DeleteOrganization200Response,
    GetOrganization200Response,
    ListOrganizations200Response,
    UpdateOrganization200Response,
} from "../responses";

export class ProtocolAuthOrganizationsService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListOrganizationsOptions): Promise<ListOrganizations200Response> {
        return this.protocol.client.request<ListOrganizations200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations",
            options,
        );
    }

    get(options?: GetOrganizationOptions): Promise<GetOrganization200Response> {
        return this.protocol.client.request<GetOrganization200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}",
            options,
        );
    }

    create(options?: CreateOrganizationOptions): Promise<CreateOrganization201Response> {
        return this.protocol.client.request<CreateOrganization201Response>(
            "POST",
            "/api/auth/frontend/v0/organizations",
            options,
        );
    }

    update(options?: UpdateOrganizationOptions): Promise<UpdateOrganization200Response> {
        return this.protocol.client.request<UpdateOrganization200Response>(
            "PUT",
            "/api/auth/frontend/v0/organizations/{organizationId}",
            options,
        );
    }

    delete(options?: DeleteOrganizationOptions): Promise<DeleteOrganization200Response> {
        return this.protocol.client.request<DeleteOrganization200Response>(
            "DELETE",
            "/api/auth/frontend/v0/organizations/{organizationId}",
            options,
        );
    }
}
