import { ProtocolAuth } from "../pxyzauth";
import { GetUserOptions } from "../requests";
import { GetUser200Response } from "../responses";

export class ProtocolAuthUsersService {
    private protocolAuth: ProtocolAuth;

    constructor(protocolAuth: ProtocolAuth) {
        this.protocolAuth = protocolAuth;
    }

    get(options?: GetUserOptions): Promise<GetUser200Response> {
        return this.protocolAuth.client.request<GetUser200Response>("GET", "/api/v0/users/:id", options);
    }
}
