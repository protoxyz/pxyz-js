import { HttpClient } from "./client";
import { ProtocolAuthUsersService } from "./services/users";

export interface ProtocolAuthClientConfiguration {
    baseUrl?: string | undefined;
    publicKey: string;
    privateKey: string;
}

export class ProtocolAuth {
    client: HttpClient;
    config: ProtocolAuthClientConfiguration;
    users: ProtocolAuthUsersService;

    constructor(config: ProtocolAuthClientConfiguration) {
        this.config = config;

        this.client = new HttpClient({
            host: config.baseUrl,
            publicKey: config.publicKey,
            privateKey: config.privateKey,
        });

        this.users = new ProtocolAuthUsersService(this);
    }
}
