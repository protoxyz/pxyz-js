import { Protocol } from "../../pxyz";
import { EndSessionOptions, IssueSessionTokenOptions, ListSessionsOptions } from "../../requests";
import { EndSession200Response, IssueSessionToken200Response, ListSessions200Response } from "../../responses";

export const ListSessionsPath = "/frontend/v0/user/sessions";
export const EndSessionPath = "/api/auth/frontend/v0/user/sessions/end";
export const IssueTokenPath = "/api/auth/frontend/v0/user/sessions/token";

export class ProtocolAuthSessionsService {
    private protocol: Protocol;

    constructor(protocol: Protocol) {
        this.protocol = protocol;
    }

    list(options?: ListSessionsOptions): Promise<ListSessions200Response> {
        return this.protocol.client.request<ListSessions200Response>("GET", ListSessionsPath, options);
    }

    end(options?: EndSessionOptions): Promise<EndSession200Response> {
        return this.protocol.client.request<EndSession200Response>("DELETE", EndSessionPath, options);
    }

    issueToken(options?: IssueSessionTokenOptions): Promise<IssueSessionToken200Response> {
        return this.protocol.client.request<IssueSessionToken200Response>("POST", IssueTokenPath, options);
    }
}
