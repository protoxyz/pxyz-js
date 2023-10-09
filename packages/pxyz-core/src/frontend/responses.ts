import {
  Tenant,
  EmailAddress,
  Organization,
  OrganizationInvitation,
  OrganizationMember,
  OrganizationRole,
  OrganizationWithRole,
  PhoneNumber,
  Session,
  SignInAttempt,
  SignUpAttempt,
  SocialConnection,
  UserProfile,
  Upload,
  Transformation,
  File,
  SessionUser,
  AuthRole,
} from '@protoxyz/types';

import { PaginatedResult, Response } from '..';

export interface FrontendGetWellKnownJWKS200Response extends Response {
  data: {
    keys: unknown[];
  };
}

export interface FrontendGetWellKnownOpenIDConfiguration200Response
  extends Response {
  data: {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    jwks_uri: string;
    response_types_supported: string[];
    subject_types_supported: string[];
    id_token_signing_alg_values_supported: string[];

    registration_endpoint: string;
    scopes_supported: string[];
    response_modes_supported: string[];
    code_challenge_methods_supported: string[];
    token_endpoint_auth_methods_supported: string[];
    claims_supported: string[];
  };
}

export type FrontendListTransformations200Response =
  PaginatedResult<Transformation>;
export interface FrontendGetTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}

export interface FrontendCreateTransformation201Response extends Response {
  data: {
    transformation: Transformation;
  };
}

export interface FrontendUpdateTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}
export interface FrontendDeleteTransformation200Response extends Response {
  data: {
    transformation: Transformation;
  };
}

export type FrontendListFiles200Response = PaginatedResult<File>;
export interface FrontendGetFile200Response extends Response {
  data: File;
}

export interface FrontendCreateFile201Response extends Response {
  data: File;
}

export interface FrontendUpdateFile200Response extends Response {
  data: File;
}
export interface FrontendDeleteFile200Response extends Response {
  data: File;
}

export type FrontendListUploads200Response = PaginatedResult<Upload>;
export interface FrontendGetUpload200Response extends Response {
  data: Upload;
}

export interface FrontendCreateUpload201Response extends Response {
  data: Upload;
}

export interface FrontendUpdateUpload200Response extends Response {
  data: Upload;
}
export interface FrontendDeleteUpload200Response extends Response {
  data: Upload;
}
export interface FrontendFinishUpload200Response extends Response {
  data: Upload;
}

export interface FrontendGetUserProfile200Response extends Response {
  data: {
    user: UserProfile | null;
    sessionUser: SessionUser | null;
  };
}

export interface FrontendDeleteUser200Response extends Response {
  data: {
    user: UserProfile | null;
  };
}

export interface FrontendGetTenant200Response extends Response {
  data: {
    tenant: Tenant | null;
  };
}

export type FrontendListEmailAddresses200Response =
  PaginatedResult<EmailAddress>;
export interface FrontendCreateEmailAddress201Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface FrontendDeleteEmailAddress200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface FrontendVerifyEmailAddress200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface FrontendPrepareEmailAddressVerification200Response
  extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}

export interface FrontendSetEmailAddressPrimary200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}

export type FrontendListPhoneNumbers200Response = PaginatedResult<PhoneNumber>;
export interface FrontendCreatePhoneNumber201Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface FrontendDeletePhoneNumber200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface FrontendVerifyPhoneNumber200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface FrontendPreparePhoneNumberVerification200Response
  extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}

export interface FrontendSetPhoneNumberPrimary200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}

export type FrontendListOrganizations200Response =
  PaginatedResult<OrganizationWithRole>;
export interface FrontendCreateOrganization201Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface FrontendGetOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface FrontendUpdateOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface FrontendDeleteOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export type FrontendListOrganizationMembers200Response =
  PaginatedResult<OrganizationMember>;

export interface FrontendCreateOrganizationMember201Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface FrontendUpdateOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface FrontendGetOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface FrontendDeleteOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export type FrontendListOrganizationInvitations200Response =
  PaginatedResult<OrganizationMember>;

export interface FrontendCreateOrganizationInvitation201Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendUpdateOrganizationInvitation200Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendGetOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendDeleteOrganizationInvitation200Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendAcceptOrganizationInvitation200Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendDeclineOrganizationInvitation200Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface FrontendResendOrganizationInvitation200Response
  extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export type FrontendListOrganizationRoles200Response =
  PaginatedResult<OrganizationRole>;

export interface FrontendCreateOrganizationRole201Response extends Response {
  data: {
    role: AuthRole | undefined;
  };
}

export interface FrontendUpdateOrganizationRole200Response extends Response {
  data: {
    role: AuthRole | undefined;
  };
}

export interface FrontendGetOrganizationRole200Response extends Response {
  data: {
    role: AuthRole | undefined;
  };
}

export interface FrontendDeleteOrganizationRole200Response extends Response {
  data: {
    role: AuthRole | undefined;
  };
}

export type FrontendListSocialConnections200Response =
  PaginatedResult<SocialConnection>;

export interface FrontendCreateSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
    authorizeUri: string | undefined;
  };
}

export interface FrontendDeleteSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export interface FrontendGetSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export interface FrontendUpdateSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export type FrontendListSessions200Response = PaginatedResult<Session>;

export interface FrontendIssueSessionToken200Response extends Response {
  data: {
    jwt: string;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendEndSession200Response extends Response {
  data: {
    session: Session | undefined;
  };
}

export interface FrontendGetSignInAttempt200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
  };
}

export interface FrontendCreateSignInAttempt201Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendUpdateSignInAttempt200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendPrepareSignInAttemptFirstFactor200Response
  extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendAttemptSignInAttemptFirstFactor200Response
  extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendPrepareSignInAttemptSecondFactor200Response
  extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendAttemptSignInAttemptSecondFactor200Response
  extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendGetSignUpAttempt200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendCreateSignUpAttempt201Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendUpdateSignUpAttempt200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendPrepareSignUpAttemptVerification200Response
  extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}

export interface FrontendAttemptSignUpAttemptVerification200Response
  extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
    sessionUser: SessionUser | undefined;
  };
}
