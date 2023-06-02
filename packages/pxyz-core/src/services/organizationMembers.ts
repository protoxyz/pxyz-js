import { Protocol } from "../pxyz";
import {
    CreateOrganizationMemberOptions,
    DeleteOrganizationMemberOptions,
    GetOrganizationMemberOptions,
    ListOrganizationMembersOptions,
    UpdateOrganizationMemberOptions,
} from "../requests";
import {
    CreateOrganizationMember201Response,
    DeleteOrganizationMember200Response,
    GetOrganizationMember200Response,
    ListOrganizationMembers200Response,
    UpdateOrganizationMember200Response,
} from "../responses";

export class ProtocolAuthOrganizationMembersService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListOrganizationMembersOptions): Promise<ListOrganizationMembers200Response> {
        return this.protocol.client.request<ListOrganizationMembers200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/members",
            options,
        );
    }

    get(options: GetOrganizationMemberOptions): Promise<GetOrganizationMember200Response> {
        return this.protocol.client.request<GetOrganizationMember200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/members/{userId}",
            options,
        );
    }

    create(options: CreateOrganizationMemberOptions): Promise<CreateOrganizationMember201Response> {
        return this.protocol.client.request<CreateOrganizationMember201Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/members",
            options,
        );
    }

    update(options: UpdateOrganizationMemberOptions): Promise<UpdateOrganizationMember200Response> {
        return this.protocol.client.request<UpdateOrganizationMember200Response>(
            "PUT",
            "/api/auth/frontend/v0/organizations/{organizationId}/members/{userId}",
            options,
        );
    }

    delete(options: DeleteOrganizationMemberOptions): Promise<DeleteOrganizationMember200Response> {
        return this.protocol.client.request<DeleteOrganizationMember200Response>(
            "DELETE",
            "/api/auth/frontend/v0/organizations/{organizationId}/members/{userId}",
            options,
        );
    }
}
