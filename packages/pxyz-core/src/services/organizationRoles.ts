import { Protocol } from "../pxyz";
import {
    CreateOrganizationRoleOptions,
    GetOrganizationRoleOptions,
    ListOrganizationRolesOptions,
    UpdateOrganizationRoleOptions,
    DeleteOrganizationRoleOptions,
} from "../requests";
import {
    CreateOrganizationRole201Response,
    DeleteOrganizationRole200Response,
    GetOrganizationRole200Response,
    ListOrganizationRoles200Response,
    UpdateOrganizationRole200Response,
} from "../responses";

export class ProtocolAuthOrganizationRolesService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListOrganizationRolesOptions): Promise<ListOrganizationRoles200Response> {
        return this.protocol.client.request<ListOrganizationRoles200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/roles",
            options,
        );
    }

    get(options: GetOrganizationRoleOptions): Promise<GetOrganizationRole200Response> {
        return this.protocol.client.request<GetOrganizationRole200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}",
            options,
        );
    }

    create(options: CreateOrganizationRoleOptions): Promise<CreateOrganizationRole201Response> {
        return this.protocol.client.request<CreateOrganizationRole201Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/roles",
            options,
        );
    }

    update(options: UpdateOrganizationRoleOptions): Promise<UpdateOrganizationRole200Response> {
        return this.protocol.client.request<UpdateOrganizationRole200Response>(
            "PUT",
            "/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}",
            options,
        );
    }

    delete(options: DeleteOrganizationRoleOptions): Promise<DeleteOrganizationRole200Response> {
        return this.protocol.client.request<DeleteOrganizationRole200Response>(
            "DELETE",
            "/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}",
            options,
        );
    }
}
