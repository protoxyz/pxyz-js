import { AuthVerificationStrategy } from '@protoxyz/types';
import { RequestOptions } from '../client';

export interface FrontendDeleteUserOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface FrontendGetUserProfileOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface FrontendUpdateUserProfileOptions extends RequestOptions {
  body: {
    name?: string | null | undefined;
    username?: string | null | undefined;
    timezone?: string | null | undefined;
    locale?: string | null | undefined;
  };
  path?: never;
}

export interface FrontendListConnectionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendGetWellKnownJWKSOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface FrontendGetWellKnownOpenIDConfigurationOptions
  extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface FrontendListEmailAddressesOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreateEmailAddressOptions extends RequestOptions {
  body: {
    email: string;
  };
  path?: never;
  query?: never;
}

export interface FrontendDeleteEmailAddressOptions extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface FrontendVerifyEmailAddressOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    emailId: string;
  };
  query?: never;
}

export interface FrontendResendEmailAddressVerificationOptions
  extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface FrontendSetEmailAddressPrimaryOptions extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface FrontendListOrganizationsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreateOrganizationOptions extends RequestOptions {
  body: {
    name: string;
  };
  path?: never;
  query?: never;
}

export interface FrontendGetOrganizationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendDeleteOrganizationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendUpdateOrganizationOptions extends RequestOptions {
  body: {
    name: string;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendListOrganizationInvitationsOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: {
    roleId?: string;
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreateOrganizationInvitationOptions
  extends RequestOptions {
  body: {
    email?: string;
    phone?: string;
    roleId: string;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendGetOrganizationInvitationOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendUpdateOrganizationInvitationOptions
  extends RequestOptions {
  body: {
    roleId: string;
  };
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendResendOrganizationInvitationOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendAcceptOrganizationInvitationOptions
  extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendDeclineOrganizationInvitationOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendResendOrganizationInvitationOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendDeleteOrganizationInvitationOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface FrontendListOrganizationMembersOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: {
    roleId?: string;
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendGetOrganizationMemberOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    userId: string;
  };
  query?: never;
}

export interface FrontendCreateOrganizationMemberOptions
  extends RequestOptions {
  body: {
    userId: string;
    roleId: string;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendUpdateOrganizationMemberOptions
  extends RequestOptions {
  body: {
    role: string;
  };
  path: {
    organizationId: string;
    memberId: string;
  };
  query?: never;
}

export interface FrontendDeleteOrganizationMemberOptions
  extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    memberId: string;
  };
  query?: never;
}

export interface FrontendListOrganizationRolesOptions extends RequestOptions {
  body?: never;
  path?: {
    organizationId: string;
  };
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreateOrganizationRoleOptions extends RequestOptions {
  body: {
    name: string;
    description?: string;
    permissions: string[];
  };
  path?: {
    organizationId: string;
  };
  query?: never;
}

export interface FrontendGetOrganizationRoleOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    roleId: string;
  };
  query?: never;
}

export interface FrontendDeleteOrganizationRoleOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    roleId: string;
  };
  query?: never;
}

export interface FrontendUpdateOrganizationRoleOptions extends RequestOptions {
  body: {
    name?: string;
    description?: string;
    permissions?: string[];
  };
  path: {
    organizationId: string;
    roleId: string;
  };
  query?: never;
}

export interface FrontendListPhoneNumbersOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreatePhoneNumberOptions extends RequestOptions {
  body: {
    phone: string;
  };
  path?: never;
  query?: never;
}

export interface FrontendDeletePhoneNumberOptions extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface FrontendVerifyPhoneNumberOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface FrontendResendPhoneNumberVerificationOptions
  extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface FrontendSetPhoneNumberPrimaryOptions extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface FrontendListSocialConnectionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendCreateSocialConnectionsOptions extends RequestOptions {
  body: {
    providerKey: string;
    redirectUri: string;
  };
  path?: never;
  query?: never;
}

export interface FrontendDeleteSocialConnectionOptions extends RequestOptions {
  body?: never;
  path: {
    connectionId: string;
  };
  query?: never;
}

export interface FrontendGetSocialConnectionOptions extends RequestOptions {
  body?: never;
  path: {
    connectionId: string;
  };
  query?: never;
}

export interface FrontendUpdateSocialConnectionOptions extends RequestOptions {
  body: {
    code?: string;
    profile?: any;
    rawProfile?: any;
    tokens?: any;
  };
  path: {
    connectionId: string;
  };
  query?: never;
}

export interface FrontendListSessionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string | undefined;
    perPage?: string;
  };
}

export interface FrontendIssueSessionTokenOptions extends RequestOptions {
  body: {
    orgId?: string;
    ttl?: number;
  };
  path?: never;
  query?: never;
}

export interface FrontendEndSessionOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface FrontendGetTenantByPublicKeyOptions extends RequestOptions {
  body?: never;
  path: {
    publicKey: string;
  };
}

export interface FrontendGetTenantByDomainOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface FrontendGetTenantByIdOptions extends RequestOptions {
  body?: never;
  path: {
    id: string;
  };
}

export interface FrontendCreateSignInAttemptOptions extends RequestOptions {
  path?: never;
  body: {
    tenantId?: string;
    identifier?: string;
    strategy: AuthVerificationStrategy;
    password?: string;
    providerKey?: string;
    redirectUri?: string;
  };
}

export interface FrontendGetSignInAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body?: never;
}

export interface FrontendUpdateSignInAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    identifier: string;
    strategy: AuthVerificationStrategy;
    password?: string;
    providerKey?: string;
    redirectUri?: string;
  };
}

export interface FrontendPrepareSignInAttemptFirstFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    identifier?: string;
    strategy?: AuthVerificationStrategy;
    redirectUri?: string;
  };
}

export interface FrontendAttemptSignInAttemptFirstFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    code?: string;
    // profile?: any;
    // rawProfile?: any;
    // tokens?: any;
  };
}

export interface FrontendPrepareSignInAttemptSecondFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    redirectUri?: string;
  };
}

export interface FrontendAttemptSignInAttemptSecondFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    code: string;
  };
}

export interface FrontendCreateSignUpAttemptOptions extends RequestOptions {
  path?: never;
  body: {
    providerKey?: string;
    phone?: string;
    email?: string;
    username?: string;
    name?: string;
    password?: string;
    redirectUri?: string;
  };
}

export interface FrontendGetSignUpAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body?: never;
}

export interface FrontendUpdateSignUpAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    providerKey?: string;
    phone?: string;
    email?: string;
    username?: string;
    name?: string;
    password?: string;
    redirectUri?: string;
  };
}

export interface FrontendPrepareSignUpAttemptVerificationOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy: AuthVerificationStrategy;
  };
}

export interface FrontendAttemptSignUpAttemptVerificationOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    code?: string;
    profile?: any;
    rawProfile?: any;
    tokens?: any;
  };
}
