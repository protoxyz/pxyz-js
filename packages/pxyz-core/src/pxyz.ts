import { HttpClient } from "./client";
import { ProtocolAuthUsersService } from "./services/users";
import { ProtocolAuthInstancesService } from "./services/instances";
import { ProtocolAuthSignInAttemptsService } from "./services/signInAttempts";
import { ProtocolAuthEmailAddresssService } from "./services/emailAddresses";
import { ProtocolAuthPhoneNumbersService } from "./services/phoneNumbers";
import { ProtocolAuthSocialConnectionsService } from "./services/socialConnections";
import { ProtocolAuthSessionsService } from "./services/sessions";
import { ProtocolAuthSignUpAttemptsService } from "./services/signUpAttempts";
import { ProtocolAuthWellKnownsService } from "./services/wellKnown";
import { ProtocolAuthOrganizationsService } from "./services/organizations";
import { ProtocolAuthOrganizationRolesService } from "./services/organizationRoles";
import { ProtocolAuthOrganizationMembersService } from "./services/organizationMembers";
import { ProtocolAuthOrganizationInvitationsService } from "./services/organizationInvitations";

export interface ProtocolClientConfiguration {
    baseUrl?: string | undefined;
    accessToken?: string | undefined;
    credentials?: boolean | undefined;
    debug?: boolean;
}

export class Protocol {
    client: HttpClient;
    config: ProtocolClientConfiguration;

    auth: {
        users: ProtocolAuthUsersService;
        instances: ProtocolAuthInstancesService;
        signInAttempts: ProtocolAuthSignInAttemptsService;
        signUpAttempts: ProtocolAuthSignUpAttemptsService;
        emailAddresses: ProtocolAuthEmailAddresssService;
        phoneNumbers: ProtocolAuthPhoneNumbersService;
        socialConnections: ProtocolAuthSocialConnectionsService;
        sessions: ProtocolAuthSessionsService;
        wellKnown: ProtocolAuthWellKnownsService;
        organizations: ProtocolAuthOrganizationsService;
        organizationRoles: ProtocolAuthOrganizationRolesService;
        organizationMembers: ProtocolAuthOrganizationMembersService;
        organizationInvitations: ProtocolAuthOrganizationInvitationsService;
    };

    constructor(config: ProtocolClientConfiguration) {
        this.config = config;

        this.client = new HttpClient({
            host: config.baseUrl,
            accessToken: config.accessToken,
            credentials: config.credentials,
            debug: config.debug,
        });

        this.auth = {
            users: new ProtocolAuthUsersService(this),
            instances: new ProtocolAuthInstancesService(this),
            signInAttempts: new ProtocolAuthSignInAttemptsService(this),
            signUpAttempts: new ProtocolAuthSignUpAttemptsService(this),
            emailAddresses: new ProtocolAuthEmailAddresssService(this),
            phoneNumbers: new ProtocolAuthPhoneNumbersService(this),
            socialConnections: new ProtocolAuthSocialConnectionsService(this),
            sessions: new ProtocolAuthSessionsService(this),
            wellKnown: new ProtocolAuthWellKnownsService(this),
            organizations: new ProtocolAuthOrganizationsService(this),
            organizationRoles: new ProtocolAuthOrganizationRolesService(this),
            organizationMembers: new ProtocolAuthOrganizationMembersService(this),
            organizationInvitations: new ProtocolAuthOrganizationInvitationsService(this),
        };
    }
}
