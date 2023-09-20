import { HttpClient } from '../client';

import { ProtocolMediaUploadsService } from './services/media/uploads';
import { ProtocolMediaTransformationsService } from './services/media/transformations';
import { ProtocolMediaFilesService } from './services/media/files';
import { ProtocolTenantsService } from './services/core/tenants';
import { ProtocolNotificationChannelsService } from './services/notifications/channels';
import { ProtocolNotificationTemplatesService } from './services/notifications/templates';
import { ProtocolNotificationsService } from './services/notifications/notification';

export interface ProtocolBackendClientConfiguration {
  baseUrl?: string | undefined;
  accessToken?: string | undefined;
  publicKey?: string | undefined;
  secretKey?: string | undefined;
  credentials?: boolean | undefined;
  debug?: boolean;
}

export class ProtocolBackendClient {
  client: HttpClient;
  config: ProtocolBackendClientConfiguration;

  core: {
    tenants: ProtocolTenantsService;
  };

  notifications: {
    notifications: ProtocolNotificationsService;
    channels: ProtocolNotificationChannelsService;
    templates: ProtocolNotificationTemplatesService;
  };

  media: {
    uploads: ProtocolMediaUploadsService;
    transformations: ProtocolMediaTransformationsService;
    files: ProtocolMediaFilesService;
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

  constructor(config: ProtocolBackendClientConfiguration) {
    this.config = config;

    this.client = new HttpClient({
      host: config.baseUrl,
      accessToken: config.accessToken,
      publicKey: config.publicKey,
      secretKey: config.secretKey,
      credentials: config.credentials,
      debug: config.debug || process.env.NODE_ENV !== 'production',
    });

    this.core = {
      tenants: new ProtocolTenantsService(this),
    };

    // this.auth = {
    //   users: new ProtocolAuthUsersService(this),
    //   tenants: new ProtocolAuthTenantsService(this),
    //   signInAttempts: new ProtocolAuthSignInAttemptsService(this),
    //   signUpAttempts: new ProtocolAuthSignUpAttemptsService(this),
    //   emailAddresses: new ProtocolAuthEmailAddresssService(this),
    //   phoneNumbers: new ProtocolAuthPhoneNumbersService(this),
    //   socialConnections: new ProtocolAuthSocialConnectionsService(this),
    //   sessions: new ProtocolAuthSessionsService(this),
    //   wellKnown: new ProtocolAuthWellKnownsService(this),
    //   organizations: new ProtocolAuthOrganizationsService(this),
    //   organizationRoles: new ProtocolAuthOrganizationRolesService(this),
    //   organizationMembers: new ProtocolAuthOrganizationMembersService(this),
    //   organizationInvitations: new ProtocolAuthOrganizationInvitationsService(
    //     this,
    //   ),
    // };

    this.media = {
      uploads: new ProtocolMediaUploadsService(this),
      transformations: new ProtocolMediaTransformationsService(this),
      files: new ProtocolMediaFilesService(this),
    };

    this.notifications = {
      channels: new ProtocolNotificationChannelsService(this),
      templates: new ProtocolNotificationTemplatesService(this),
      notifications: new ProtocolNotificationsService(this),
    };
  }
}
