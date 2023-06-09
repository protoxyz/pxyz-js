import { AuthVerificationStrategy } from '@protoxyz/types';
import { RequestOptions } from './client';

export interface DeleteUserOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface GetUserProfileOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface UpdateUserProfileOptions extends RequestOptions {
  body: {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    username?: string | null | undefined;
    timezone?: string | null | undefined;
    locale?: string | null | undefined;
  };
  path?: never;
}

export interface ListConnectionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface GetWellKnownJWKSOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface GetWellKnownOpenIDConfigurationOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface ListEmailAddressesOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface CreateEmailAddressOptions extends RequestOptions {
  body: {
    email: string;
  };
  path?: never;
  query?: never;
}

export interface DeleteEmailAddressOptions extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface VerifyEmailAddressOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    emailId: string;
  };
  query?: never;
}

export interface ResendEmailAddressVerificationOptions extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface SetEmailAddressPrimaryOptions extends RequestOptions {
  body?: never;
  path: {
    emailId: string;
  };
  query?: never;
}

export interface ListOrganizationsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface CreateOrganizationOptions extends RequestOptions {
  body: {
    name: string;
  };
  path?: never;
  query?: never;
}

export interface GetOrganizationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface DeleteOrganizationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface UpdateOrganizationOptions extends RequestOptions {
  body: {
    name: string;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface ListOrganizationInvitationsOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: {
    roleId?: string;
    cursor?: string;
    perPage?: string;
  };
}

export interface CreateOrganizationInvitationOptions extends RequestOptions {
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

export interface GetOrganizationInvitationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface UpdateOrganizationInvitationOptions extends RequestOptions {
  body: {
    roleId: string;
  };
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface ResendOrganizationInvitationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface AcceptOrganizationInvitationOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface DeclineOrganizationInvitationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface ResendOrganizationInvitationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface DeleteOrganizationInvitationOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    invitationId: string;
  };
  query?: never;
}

export interface ListOrganizationMembersOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
  };
  query?: {
    roleId?: string;
    cursor?: string;
    perPage?: string;
  };
}

export interface GetOrganizationMemberOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    userId: string;
  };
  query?: never;
}

export interface CreateOrganizationMemberOptions extends RequestOptions {
  body: {
    userId: string;
    roleId: string;
  };
  path: {
    organizationId: string;
  };
  query?: never;
}

export interface UpdateOrganizationMemberOptions extends RequestOptions {
  body: {
    role: string;
  };
  path: {
    organizationId: string;
    memberId: string;
  };
  query?: never;
}

export interface DeleteOrganizationMemberOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    memberId: string;
  };
  query?: never;
}

export interface ListOrganizationRolesOptions extends RequestOptions {
  body?: never;
  path?: {
    organizationId: string;
  };
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface CreateOrganizationRoleOptions extends RequestOptions {
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

export interface GetOrganizationRoleOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    roleId: string;
  };
  query?: never;
}

export interface DeleteOrganizationRoleOptions extends RequestOptions {
  body?: never;
  path: {
    organizationId: string;
    roleId: string;
  };
  query?: never;
}

export interface UpdateOrganizationRoleOptions extends RequestOptions {
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

export interface ListPhoneNumbersOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface CreatePhoneNumberOptions extends RequestOptions {
  body: {
    phone: string;
  };
  path?: never;
  query?: never;
}

export interface DeletePhoneNumberOptions extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface VerifyPhoneNumberOptions extends RequestOptions {
  body: {
    code: string;
  };
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface ResendPhoneNumberVerificationOptions extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface SetPhoneNumberPrimaryOptions extends RequestOptions {
  body?: never;
  path: {
    phoneId: string;
  };
  query?: never;
}

export interface ListSocialConnectionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface CreateSocialConnectionsOptions extends RequestOptions {
  body: {
    providerKey: string;
    redirectUri: string;
  };
  path?: never;
  query?: never;
}

export interface DeleteSocialConnectionOptions extends RequestOptions {
  body?: never;
  path: {
    connectionId: string;
  };
  query?: never;
}

export interface GetSocialConnectionOptions extends RequestOptions {
  body?: never;
  path: {
    connectionId: string;
  };
  query?: never;
}

export interface UpdateSocialConnectionOptions extends RequestOptions {
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

export interface ListSessionsOptions extends RequestOptions {
  body?: never;
  path?: never;
  query?: {
    cursor?: string;
    perPage?: string;
  };
}

export interface IssueSessionTokenOptions extends RequestOptions {
  body: {
    orgId?: string;
    ttl?: number;
  };
  path?: never;
  query?: never;
}

export interface EndSessionOptions extends RequestOptions {
  body?: never;
  path?: never;
}

export interface GetAuthInstanceByPublicKeyOptions extends RequestOptions {
  body?: never;
  path: {
    publicKey: string;
  };
}

export interface GetAuthInstanceByDomainOptions extends RequestOptions {
  body?: never;
  path: {
    domain: string;
  };
}

export interface GetAuthInstanceByIdOptions extends RequestOptions {
  body?: never;
  path: {
    id: string;
  };
}

export interface CreateSignInAttemptOptions extends RequestOptions {
  path?: never;
  body: {
    instanceId?: string;
    identifier?: string;
    strategy: AuthVerificationStrategy;
    password?: string;
    providerKey?: string;
    redirectUri?: string;
  };
}

export interface GetSignInAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body?: never;
}

export interface UpdateSignInAttemptOptions extends RequestOptions {
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

export interface PrepareSignInAttemptFirstFactorOptions extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    identifier?: string;
    strategy?: AuthVerificationStrategy;
    redirectUri?: string;
  };
}

export interface AttemptSignInAttemptFirstFactorOptions extends RequestOptions {
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

export interface PrepareSignInAttemptSecondFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    redirectUri?: string;
  };
}

export interface AttemptSignInAttemptSecondFactorOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy?: AuthVerificationStrategy;
    code: string;
  };
}

export interface CreateSignUpAttemptOptions extends RequestOptions {
  path?: never;
  body: {
    providerKey?: string;
    strategy?: AuthVerificationStrategy;
    phoneNumber?: string;
    emailAddress?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  };
}

export interface GetSignUpAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body?: never;
}

export interface UpdateSignUpAttemptOptions extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    providerKey?: string;
    strategy?: AuthVerificationStrategy;
    phoneNumber?: string;
    emailAddress?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  };
}

export interface PrepareSignUpAttemptVerificationOptions
  extends RequestOptions {
  path: {
    id: string;
  };
  body: {
    strategy: AuthVerificationStrategy;
  };
}

export interface AttemptSignUpAttemptVerificationOptions
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
