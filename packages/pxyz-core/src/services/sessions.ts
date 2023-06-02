import { Protocol } from "../pxyz";
import { EndSessionOptions, ListSessionsOptions } from "../requests";
import { EndSession200Response, ListSessions200Response } from "../responses";

export class ProtocolAuthSessionsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    list(options?: ListSessionsOptions): Promise<ListSessions200Response> {
        return this.protocol.client.request<ListSessions200Response>("GET", "/frontend/v0/user/sessions", options);
    }

    end(options?: EndSessionOptions): Promise<EndSession200Response> {
        return this.protocol.client.request<EndSession200Response>(
            "DELETE",
            "/api/auth/frontend/v0/user/sessions/end",
            options,
        );
    }
}
