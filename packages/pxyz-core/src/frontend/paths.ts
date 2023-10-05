export const FrontendListEmailAddressesPath =
  '/api/auth/frontend/v0/user/emails';
export const FrontendCreateEmailAddressPath =
  '/api/auth/frontend/v0/user/emails';
export const FrontendDeleteEmailAddressPath =
  '/api/auth/frontend/v0/user/emails/{emailId}';
export const FrontendVerifyEmailAddressPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/verify';
export const FrontendResendEmailAddressVerificationPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/resend';
export const FrontendSetEmailAddressPrimaryPath =
  '/api/auth/frontend/v0/user/emails/{emailId}/primary';

export const FrontendListOrganizationInvitationsPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations';
export const FrontendGetOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const FrontendCreateOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations';
export const FrontendUpdateOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const FrontendDeleteOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}';
export const FrontendAcceptOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/accept';
export const FrontendDeclineOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/decline';
export const FrontendResendOrganizationInvitationPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/invitations/{userId}/resend';

export const FrontendListOrganizationMembersPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members';
export const FrontendGetOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';
export const FrontendCreateOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members';
export const FrontendUpdateOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';
export const FrontendDeleteOrganizationMemberPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}/members/{userId}';

export const FrontendListOrganizationRolesPath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles';
export const FrontendGetOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';
export const FrontendCreateOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles';
export const FrontendUpdateOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';
export const FrontendDeleteOrganizationRolePath =
  '/api/auth/frontend/v0/organizations/{organizationId}/roles/{userId}';

export const FrontendListOrganizationsPath =
  '/api/auth/frontend/v0/user/organizations';
export const FrontendGetOrganizationPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}';
export const FrontendCreateOrganizationPath =
  '/api/auth/frontend/v0/user/organizations';
export const FrontendUpdateOrganizationPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}';
export const FrontendDeleteOrganizationPath =
  '/api/auth/frontend/v0/user/organizations/{organizationId}';

export const FrontendListPhoneNumbersPath = '/api/auth/frontend/v0/user/phones';
export const FrontendCreatePhoneNumberPath =
  '/api/auth/frontend/v0/user/phones';
export const FrontendDeletePhoneNumberPath =
  '/api/auth/frontend/v0/user/phones/{phoneId}';
export const FrontendVerifyPhoneNumberPath =
  '/api/auth/frontend/v0/user/phones/{phoneId}/verify';
export const FrontendResendPhoneNumberVerificationPath =
  '/api/auth/frontend/v0/user/phones/{phoneId}/resend';
export const FrontendSetPhoneNumberPrimaryPath =
  '/api/auth/frontend/v0/user/phones/{phoneId}/primary';

export const FrontendListSessionsPath = '/api/auth/frontend/v0/user/sessions';
export const FrontendEndSessionPath = '/api/auth/frontend/v0/user/sessions/end';
export const FrontendIssueTokenPath =
  '/api/auth/frontend/v0/user/sessions/token';

export const FrontendGetSignInAttemptPath =
  '/api/auth/frontend/v0/sign-ins/{id}';
export const FrontendCreateSignInAttemptPath = '/api/auth/frontend/v0/sign-ins';
export const FrontendUpdateSignInAttemptPath =
  '/api/auth/frontend/v0/sign-ins/{id}';
export const FrontendPrepareSignInAttemptFirstFactorPath =
  '/api/auth/frontend/v0/sign-ins/{id}/prepare-first-factor';
export const FrontendAttemptSignInAttemptFirstFactorPath =
  '/api/auth/frontend/v0/sign-ins/{id}/attempt-first-factor';
export const FrontendPrepareSignInAttemptSecondFactorPath =
  '/api/auth/frontend/v0/sign-ins/{id}/prepare-second-factor';
export const FrontendAttemptSignInAttemptSecondFactorPath =
  '/api/auth/frontend/v0/sign-ins/{id}/attempt-second-factor';

export const FrontendCreateSignUpAttemptPath = '/api/auth/frontend/v0/sign-ups';
export const FrontendGetSignUpAttemptPath =
  '/api/auth/frontend/v0/sign-ups/{id}';
export const FrontendUpdateSignUpAttemptPath =
  '/api/auth/frontend/v0/sign-ups/{id}';
export const FrontendPrepareSignUpAttemptVerificationPath =
  '/api/auth/frontend/v0/sign-ups/{id}/prepare-verification';
export const FrontendAttemptSignUpAttemptVerificationPath =
  '/api/auth/frontend/v0/sign-ups/{id}/attempt-verification';

export const FrontendListSocialConnectionsPath =
  '/api/auth/frontend/v0/user/connections';
export const FrontendCreateSocialConnectionPath =
  '/api/auth/frontend/v0/user/connections';
export const FrontendDeleteSocialConnectionPath =
  '/api/auth/frontend/v0/user/connections/{connectionId}';
export const FrontendGetSocialConnectionPath =
  '/api/auth/frontend/v0/user/connections/{connectionId}';
export const FrontendUpdateSocialConnectionPath =
  '/api/auth/frontend/v0/user/connections/{connectionId}';

export const FrontendGetTenantByDomainPath =
  '/api/auth/frontend/v0/tenants/domain/{domain}';
export const FrontendGetTenantByIdPath =
  '/api/auth/frontend/v0/tenants/id/{id}';
export const FrontendGetTenantByPublicKeyPath =
  '/api/auth/frontend/v0/tenants/pkey/{publicKey}';

export const FrontendGetUserProfilePath = '/api/auth/frontend/v0/user/profile';
export const FrontendUpdateUserProfilePath =
  '/api/auth/frontend/v0/user/profile';
export const FrontendDeleteUserPath = '/api/auth/frontend/v0/user';

export const FrontendGetWellKnownJWKSPath =
  '/api/auth/frontend/v0/.well-known/jwks/{domain}';
export const FrontendGetWellKnownOpenIDConfigurationPath =
  '/api/auth/frontend/v0/.well-known/openid-configuration/{domain}';
