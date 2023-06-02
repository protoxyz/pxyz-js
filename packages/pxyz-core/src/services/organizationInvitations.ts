import { Protocol } from "../pxyz";
import {
    AcceptOrganizationInvitationOptions,
    CreateOrganizationInvitationOptions,
    DeclineOrganizationInvitationOptions,
    DeleteOrganizationInvitationOptions,
    GetOrganizationInvitationOptions,
    ListOrganizationInvitationsOptions,
    ResendOrganizationInvitationOptions,
    UpdateOrganizationInvitationOptions,
} from "../requests";
import {
    AcceptOrganizationInvitation200Response,
    CreateOrganizationInvitation201Response,
    DeclineOrganizationInvitation200Response,
    DeleteOrganizationInvitation200Response,
    GetOrganizationInvitation200Response,
    ListOrganizationInvitations200Response,
    ResendOrganizationInvitation200Response,
    UpdateOrganizationInvitation200Response,
} from "../responses";

export class ProtocolAuthOrganizationInvitationsService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListOrganizationInvitationsOptions): Promise<ListOrganizationInvitations200Response> {
        return this.protocol.client.request<ListOrganizationInvitations200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations",
            options,
        );
    }

    get(options: GetOrganizationInvitationOptions): Promise<GetOrganizationInvitation200Response> {
        return this.protocol.client.request<GetOrganizationInvitation200Response>(
            "GET",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}",
            options,
        );
    }

    create(options: CreateOrganizationInvitationOptions): Promise<CreateOrganizationInvitation201Response> {
        return this.protocol.client.request<CreateOrganizationInvitation201Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations",
            options,
        );
    }

    update(options: UpdateOrganizationInvitationOptions): Promise<UpdateOrganizationInvitation200Response> {
        return this.protocol.client.request<UpdateOrganizationInvitation200Response>(
            "PUT",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}",
            options,
        );
    }

    delete(options: DeleteOrganizationInvitationOptions): Promise<DeleteOrganizationInvitation200Response> {
        return this.protocol.client.request<DeleteOrganizationInvitation200Response>(
            "DELETE",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}",
            options,
        );
    }

    accept(options: AcceptOrganizationInvitationOptions): Promise<AcceptOrganizationInvitation200Response> {
        return this.protocol.client.request<AcceptOrganizationInvitation200Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/accept",
            options,
        );
    }

    decline(options: DeclineOrganizationInvitationOptions): Promise<DeclineOrganizationInvitation200Response> {
        return this.protocol.client.request<DeclineOrganizationInvitation200Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/decline",
            options,
        );
    }

    resend(options: ResendOrganizationInvitationOptions): Promise<ResendOrganizationInvitation200Response> {
        return this.protocol.client.request<ResendOrganizationInvitation200Response>(
            "POST",
            "/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/resend",
            options,
        );
    }
}
