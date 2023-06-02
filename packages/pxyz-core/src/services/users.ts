import { Protocol } from "../pxyz";
import { DeleteUserOptions, GetUserProfileOptions, UpdateUserProfileOptions } from "../requests";
import { DeleteUser200Response, GetUserProfile200Response } from "../responses";

export class ProtocolAuthUsersService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    profile(options?: GetUserProfileOptions): Promise<GetUserProfile200Response> {
        return this.protocol.client.request<GetUserProfile200Response>(
            "GET",
            "/api/auth/frontend/v0/user/profile",
            options,
        );
    }

    updateProfile(options?: UpdateUserProfileOptions): Promise<GetUserProfile200Response> {
        return this.protocol.client.request<GetUserProfile200Response>(
            "PUT",
            "/api/auth/frontend/v0/user/profile",
            options,
        );
    }

    delete(options?: DeleteUserOptions): Promise<DeleteUser200Response> {
        return this.protocol.client.request<DeleteUser200Response>("DELETE", "/api/auth/frontend/v0/user", options);
    }
}
