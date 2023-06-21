import { Protocol } from "../../pxyz";
import {
    CreateOrganizationOptions,
    GetOrganizationOptions,
    DeleteOrganizationOptions,
    UpdateOrganizationOptions,
    ListOrganizationsOptions,
} from "../../requests";
import {
    CreateOrganization201Response,
    DeleteOrganization200Response,
    GetOrganization200Response,
    ListOrganizations200Response,
    UpdateOrganization200Response,
} from "../../responses";

export const ListOrganizationsPath = "/api/auth/frontend/v0/user/organizations";
export const GetOrganizationPath = "/api/auth/frontend/v0/user/organizations/{organizationId}";
export const CreateOrganizationPath = "/api/auth/frontend/v0/user/organizations";
export const UpdateOrganizationPath = "/api/auth/frontend/v0/user/organizations/{organizationId}";
export const DeleteOrganizationPath = "/api/auth/frontend/v0/user/organizations/{organizationId}";

export class ProtocolAuthOrganizationsService {
    private protocol: Protocol;

    constructor(protocolAuth: Protocol) {
        this.protocol = protocolAuth;
    }

    list(options?: ListOrganizationsOptions): Promise<ListOrganizations200Response> {
        return this.protocol.client.request<ListOrganizations200Response>("GET", ListOrganizationsPath, options);
    }

    get(options?: GetOrganizationOptions): Promise<GetOrganization200Response> {
        return this.protocol.client.request<GetOrganization200Response>("GET", GetOrganizationPath, options);
    }

    create(options?: CreateOrganizationOptions): Promise<CreateOrganization201Response> {
        return this.protocol.client.request<CreateOrganization201Response>("POST", CreateOrganizationPath, options);
    }

    update(options?: UpdateOrganizationOptions): Promise<UpdateOrganization200Response> {
        return this.protocol.client.request<UpdateOrganization200Response>("PUT", UpdateOrganizationPath, options);
    }

    delete(options?: DeleteOrganizationOptions): Promise<DeleteOrganization200Response> {
        return this.protocol.client.request<DeleteOrganization200Response>("DELETE", DeleteOrganizationPath, options);
    }
}
