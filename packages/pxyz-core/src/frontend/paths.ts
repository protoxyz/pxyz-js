export const FrontendListEmailAddressesPath = '/api/user/emails';
export const FrontendCreateEmailAddressPath = '/api/user/emails';
export const FrontendDeleteEmailAddressPath = '/api/user/emails/{emailId}';
export const FrontendVerifyEmailAddressPath =
  '/api/user/emails/{emailId}/verify';
export const FrontendPrepareEmailAddressVerificationPath =
  '/api/user/emails/{emailId}/prepare';
export const FrontendSetEmailAddressPrimaryPath =
  '/api/user/emails/{emailId}/primary';

export const FrontendListOrganizationInvitationsPath =
  '/api/organizations/{organizationId}/invitations';
export const FrontendGetOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}';
export const FrontendCreateOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations';
export const FrontendUpdateOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}';
export const FrontendDeleteOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}';
export const FrontendAcceptOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}/accept';
export const FrontendDeclineOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}/decline';
export const FrontendResendOrganizationInvitationPath =
  '/api/organizations/{organizationId}/invitations/{userId}/resend';

export const FrontendListOrganizationMembersPath =
  '/api/user/organizations/{organizationId}/members';
export const FrontendGetOrganizationMemberPath =
  '/api/user/organizations/{organizationId}/members/{userId}';
export const FrontendCreateOrganizationMemberPath =
  '/api/user/organizations/{organizationId}/members';
export const FrontendUpdateOrganizationMemberPath =
  '/api/user/organizations/{organizationId}/members/{userId}';
export const FrontendDeleteOrganizationMemberPath =
  '/api/user/organizations/{organizationId}/members/{userId}';

export const FrontendListOrganizationRolesPath =
  '/api/organizations/{organizationId}/roles';
export const FrontendGetOrganizationRolePath =
  '/api/organizations/{organizationId}/roles/{userId}';
export const FrontendCreateOrganizationRolePath =
  '/api/organizations/{organizationId}/roles';
export const FrontendUpdateOrganizationRolePath =
  '/api/organizations/{organizationId}/roles/{userId}';
export const FrontendDeleteOrganizationRolePath =
  '/api/organizations/{organizationId}/roles/{userId}';

export const FrontendListOrganizationsPath = '/api/user/organizations';
export const FrontendGetOrganizationPath =
  '/api/user/organizations/{organizationId}';
export const FrontendCreateOrganizationPath = '/api/user/organizations';
export const FrontendUpdateOrganizationPath =
  '/api/user/organizations/{organizationId}';
export const FrontendDeleteOrganizationPath =
  '/api/user/organizations/{organizationId}';

export const FrontendListPhoneNumbersPath = '/api/user/phones';
export const FrontendCreatePhoneNumberPath = '/api/user/phones';
export const FrontendDeletePhoneNumberPath = '/api/user/phones/{phoneId}';
export const FrontendVerifyPhoneNumberPath =
  '/api/user/phones/{phoneId}/verify';
export const FrontendPreparePhoneNumberVerificationPath =
  '/api/user/phones/{phoneId}/prepare';
export const FrontendSetPhoneNumberPrimaryPath =
  '/api/user/phones/{phoneId}/primary';

export const FrontendListSessionsPath = '/api/user/sessions';
export const FrontendEndSessionPath = '/api/user/sessions/end';
export const FrontendIssueTokenPath = '/api/user/sessions/token';

export const FrontendGetSignInAttemptPath = '/api/sign-ins/{id}';
export const FrontendCreateSignInAttemptPath = '/api/sign-ins';
export const FrontendUpdateSignInAttemptPath = '/api/sign-ins/{id}';
export const FrontendPrepareSignInAttemptFirstFactorPath =
  '/api/sign-ins/{id}/prepare-first-factor';
export const FrontendAttemptSignInAttemptFirstFactorPath =
  '/api/sign-ins/{id}/attempt-first-factor';
export const FrontendPrepareSignInAttemptSecondFactorPath =
  '/api/sign-ins/{id}/prepare-second-factor';
export const FrontendAttemptSignInAttemptSecondFactorPath =
  '/api/sign-ins/{id}/attempt-second-factor';

export const FrontendCreateSignUpAttemptPath = '/api/sign-ups';
export const FrontendGetSignUpAttemptPath = '/api/sign-ups/{id}';
export const FrontendUpdateSignUpAttemptPath = '/api/sign-ups/{id}';
export const FrontendPrepareSignUpAttemptVerificationPath =
  '/api/sign-ups/{id}/prepare-verification';
export const FrontendAttemptSignUpAttemptVerificationPath =
  '/api/sign-ups/{id}/attempt-verification';

export const FrontendListSocialConnectionsPath = '/api/user/connections';
export const FrontendCreateSocialConnectionPath = '/api/user/connections';
export const FrontendDeleteSocialConnectionPath =
  '/api/user/connections/{connectionId}';
export const FrontendGetSocialConnectionPath =
  '/api/user/connections/{connectionId}';
export const FrontendUpdateSocialConnectionPath =
  '/api/user/connections/{connectionId}';

export const FrontendGetTenantByDomainPath = '/api/tenants/domain/{domain}';
export const FrontendGetTenantByIdPath = '/api/tenants/id/{id}';
export const FrontendGetTenantByPublicKeyPath = '/api/tenants/pkey/{publicKey}';

export const FrontendGetUserProfilePath = '/api/user/profile';
export const FrontendUpdateUserProfilePath = '/api/user/profile';
export const FrontendDeleteUserPath = '/api/user';
export const FrontendUpdateUserPasswordPath = '/api/user/password';

export const FrontendGetWellKnownJWKSPath = '/api/.well-known/jwks/{domain}';
export const FrontendGetWellKnownOpenIDConfigurationPath =
  '/api/.well-known/openid-configuration/{domain}';
