import { HttpClient } from './client';
import { ProtocolAuthUsersService } from './services/auth/users';
import { ProtocolAuthTenantsService } from './services/auth/tenants';
import { ProtocolAuthSignInAttemptsService } from './services/auth/signInAttempts';
import { ProtocolAuthEmailAddresssService } from './services/auth/emailAddresses';
import { ProtocolAuthPhoneNumbersService } from './services/auth/phoneNumbers';
import { ProtocolAuthSocialConnectionsService } from './services/auth/socialConnections';
import { ProtocolAuthSessionsService } from './services/auth/sessions';
import { ProtocolAuthSignUpAttemptsService } from './services/auth/signUpAttempts';
import { ProtocolAuthWellKnownsService } from './services/auth/wellKnown';
import { ProtocolAuthOrganizationsService } from './services/auth/organizations';
import { ProtocolAuthOrganizationRolesService } from './services/auth/organizationRoles';
import { ProtocolAuthOrganizationMembersService } from './services/auth/organizationMembers';
import { ProtocolAuthOrganizationInvitationsService } from './services/auth/organizationInvitations';
import { ProtocolUploadsService } from './services/uploads/upload';
import { ProtocolTransformationsService } from './services/uploads/transformation';
import { ProtocolFilesService } from './services/uploads/file';

export interface ProtocolClientConfiguration {
  baseUrl?: string | undefined;
  accessToken?: string | undefined;
  publicKey?: string | undefined;
  secretKey?: string | undefined;
  credentials?: boolean | undefined;
  debug?: boolean;
  proxyUrl?: string | undefined;
}

export class Protocol {
  client: HttpClient;
  config: ProtocolClientConfiguration;

  auth: {
    users: ProtocolAuthUsersService;
    tenants: ProtocolAuthTenantsService;
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

  uploads: {
    uploads: ProtocolUploadsService;
    transformations: ProtocolTransformationsService;
    files: ProtocolFilesService;
  };

  setAccessToken(accessToken: string): void {
    this.client.setAccessToken(accessToken);
  }

  setPublicKey(publicKey: string): void {
    this.client.setPublicKey(publicKey);
  }

  setSecretKey(secretKey: string): void {
    this.client.setSecretKey(secretKey);
  }

  constructor(config: ProtocolClientConfiguration) {
    this.config = config;

    this.client = new HttpClient({
      host: config.baseUrl,
      accessToken: config.accessToken,
      publicKey: config.publicKey,
      secretKey: config.secretKey,
      credentials: config.credentials,
      proxyUrl: config.proxyUrl,
      debug: config.debug || process.env.NODE_ENV !== 'production',
    });

    this.auth = {
      users: new ProtocolAuthUsersService(this),
      tenants: new ProtocolAuthTenantsService(this),
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
      organizationInvitations: new ProtocolAuthOrganizationInvitationsService(
        this,
      ),
    };

    this.uploads = {
      uploads: new ProtocolUploadsService(this),
      transformations: new ProtocolTransformationsService(this),
      files: new ProtocolFilesService(this),
    };
  }
}
