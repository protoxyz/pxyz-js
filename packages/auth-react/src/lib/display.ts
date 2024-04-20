import {
  AllowedFirstFactorStrategy,
  AuthVerificationStrategy,
  OrganizationWithRole,
  UserProfile,
} from '@protoxyz/types';

export const initials = (name: string[]) => {
  if (name) {
    return name
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }

  return null;
};

export const userInitials = (
  user: Pick<
    UserProfile,
    | 'name'
    | 'username'
    | 'emailAddresses'
    | 'phoneNumbers'
    | 'primaryEmailId'
    | 'primaryPhoneId'
  > | null,
) => {
  if (!user) {
    return null;
  }

  if (user.name) {
    return `${user.name.substring(0, 2)}`.toUpperCase();
  }

  if (user.username) {
    return user.username.substring(0, 2).toUpperCase();
  }

  if (user.emailAddresses && user.emailAddresses.length > 0) {
    const primaryEmail = user.emailAddresses?.find(
      (email) => user.primaryEmailId === email.id,
    );
    return primaryEmail?.email?.substring(0, 2).toUpperCase();
  }

  if (user.phoneNumbers && user.phoneNumbers.length > 0) {
    const primaryPhone = user.phoneNumbers?.find(
      (phone) => user.primaryPhoneId === phone.id,
    );
    return primaryPhone?.phone?.substring(0, 2).toUpperCase();
  }

  return null;
};

export const organizationInitials = (
  org: Pick<OrganizationWithRole, 'name'>,
) => {
  if (org?.name) {
    return org?.name.substring(0, 2).toUpperCase();
  }

  return null;
};

export const organizationImage = (
  org: Pick<OrganizationWithRole, 'logoUri'>,
) => {
  if (org?.logoUri) {
    return org?.logoUri;
  }

  return null;
};

export const userDisplayName = (
  user: Pick<
    UserProfile,
    | 'name'
    | 'username'
    | 'emailAddresses'
    | 'phoneNumbers'
    | 'primaryEmailId'
    | 'primaryPhoneId'
  > | null,
) => {
  if (!user) {
    return null;
  }

  if (user.name) {
    return user.name;
  }

  if (user.name) {
    return user.name;
  }

  if (user.username) {
    return user.username;
  }

  if (user.emailAddresses && user.emailAddresses.length > 0) {
    const primaryEmail = user.emailAddresses?.find(
      (email) => user.primaryEmailId === email.id,
    );
    return primaryEmail?.email;
  }

  if (user.phoneNumbers && user.phoneNumbers.length > 0) {
    const primaryPhone = user.phoneNumbers?.find(
      (phone) => user.primaryPhoneId === phone.id,
    );
    return primaryPhone?.phone;
  }

  return null;
};

export const userSecondaryDisplayName = (
  user: Pick<
    UserProfile,
    'emailAddresses' | 'primaryEmailId' | 'phoneNumbers' | 'primaryPhoneId'
  > | null,
) => {
  if (!user) {
    return null;
  }

  if (user.emailAddresses && user.emailAddresses.length > 0) {
    const primaryEmail = user.emailAddresses?.find(
      (email) => user.primaryEmailId === email.id,
    );
    return primaryEmail?.email;
  }

  if (user.phoneNumbers && user.phoneNumbers.length > 0) {
    const primaryPhone = user.phoneNumbers?.find(
      (phone) => user.primaryPhoneId === phone.id,
    );
    return primaryPhone?.phone;
  }

  return null;
};

export const userImage = (user: Pick<UserProfile, 'imageUri'> | null) => {
  if (!user) {
    return null;
  }

  if (user.imageUri) {
    return user.imageUri;
  }

  return null;
};

export const strategyDisplayName = (strategy: AuthVerificationStrategy) => {
  switch (strategy) {
    case AuthVerificationStrategy.email_code:
      return 'Email (Verification Code)';
    case AuthVerificationStrategy.email_link:
      return 'Email (Magic Link)';
    case AuthVerificationStrategy.phone_code:
      return 'Phone (Verification Code)';
    case AuthVerificationStrategy.email_password:
      return 'Email & Password';
    case AuthVerificationStrategy.phone_password:
      return 'Phone & Password';
    case AuthVerificationStrategy.username_password:
      return 'Username & Password';
    case AuthVerificationStrategy.oauth:
      return 'Social';
    case AuthVerificationStrategy.authenticator_code:
      return 'Authenticator Code';
    case AuthVerificationStrategy.security_key:
      return 'Device Security Key';
    default:
      return strategy;
  }
};
