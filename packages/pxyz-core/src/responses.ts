import {
  AuthInstance,
  EmailAddress,
  Organization,
  OrganizationInvitation,
  OrganizationMember,
  OrganizationRole,
  OrganizationWithRole,
  PaginatedMeta,
  PhoneNumber,
  Session,
  SignInAttempt,
  SignUpAttempt,
  SocialConnection,
  UserProfile,
  ResponseStatus,
} from '@protoxyz/types';

export interface Response {
  status: ResponseStatus;
  error?: string | undefined;
  data?: unknown;
}

export type PaginatedResult<T> = Response & {
  data: T[];
  meta: PaginatedMeta;
  status: ResponseStatus;
};

export interface GetWellKnownJWKS200Response extends Response {
  data: {
    keys: unknown[];
  };
}

export interface GetWellKnownOpenIDConfiguration200Response extends Response {
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

export interface GetUserProfile200Response extends Response {
  data: {
    user: UserProfile | null;
  };
}

export interface DeleteUser200Response extends Response {
  data: {
    user: UserProfile | null;
  };
}

export interface GetAuthInstance200Response extends Response {
  data: {
    instance: AuthInstance | null;
  };
}

export type ListEmailAddresses200Response = PaginatedResult<EmailAddress>;
export interface CreateEmailAddress201Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface DeleteEmailAddress200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface VerifyEmailAddress200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}
export interface ResendEmailAddressVerification200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}

export interface SetEmailAddressPrimary200Response extends Response {
  data: {
    emailAddress: EmailAddress;
  };
}

export type ListPhoneNumbers200Response = PaginatedResult<PhoneNumber>;
export interface CreatePhoneNumber201Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface DeletePhoneNumber200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface VerifyPhoneNumber200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}
export interface ResendPhoneNumberVerification200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}

export interface SetPhoneNumberPrimary200Response extends Response {
  data: {
    phoneNumber: PhoneNumber;
  };
}

export type ListOrganizations200Response =
  PaginatedResult<OrganizationWithRole>;
export interface CreateOrganization201Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface GetOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface UpdateOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export interface DeleteOrganization200Response extends Response {
  data: {
    organization: Organization | undefined;
  };
}

export type ListOrganizationMembers200Response =
  PaginatedResult<OrganizationMember>;

export interface CreateOrganizationMember201Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface UpdateOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface GetOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export interface DeleteOrganizationMember200Response extends Response {
  data: {
    member: OrganizationMember | undefined;
  };
}

export type ListOrganizationInvitations200Response =
  PaginatedResult<OrganizationMember>;

export interface CreateOrganizationInvitation201Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface UpdateOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface GetOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface DeleteOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface AcceptOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface DeclineOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export interface ResendOrganizationInvitation200Response extends Response {
  data: {
    invitation: OrganizationInvitation | undefined;
  };
}

export type ListOrganizationRoles200Response =
  PaginatedResult<OrganizationRole>;

export interface CreateOrganizationRole201Response extends Response {
  data: {
    role: OrganizationRole | undefined;
  };
}

export interface UpdateOrganizationRole200Response extends Response {
  data: {
    role: OrganizationRole | undefined;
  };
}

export interface GetOrganizationRole200Response extends Response {
  data: {
    role: OrganizationRole | undefined;
  };
}

export interface DeleteOrganizationRole200Response extends Response {
  data: {
    role: OrganizationRole | undefined;
  };
}

export type ListSocialConnections200Response =
  PaginatedResult<SocialConnection>;

export interface CreateSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
    authorizeUri: string | undefined;
  };
}

export interface DeleteSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export interface GetSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export interface UpdateSocialConnection200Response extends Response {
  data: {
    connection: SocialConnection | undefined;
  };
}

export type ListSessions200Response = PaginatedResult<Session>;

export interface IssueSessionToken200Response extends Response {
  data: {
    jwt: string;
  };
}

export interface EndSession200Response extends Response {
  data: {
    session: Session | undefined;
  };
}

export interface GetSignInAttempt200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
  };
}

export interface CreateSignInAttempt201Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface UpdateSignInAttempt200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface PrepareSignInAttemptFirstFactor200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface AttemptSignInAttemptFirstFactor200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface PrepareSignInAttemptSecondFactor200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface AttemptSignInAttemptSecondFactor200Response extends Response {
  data: {
    signInAttempt: SignInAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface GetSignUpAttempt200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface CreateSignUpAttempt201Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface UpdateSignUpAttempt200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface PrepareSignUpAttemptVerification200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}

export interface AttemptSignUpAttemptVerification200Response extends Response {
  data: {
    signUpAttempt: SignUpAttempt | undefined;
    authorizeUri: string | undefined;
    jwt: string | undefined;
    session: Session | undefined;
  };
}
