import { OrganizationWithRole, UserProfile } from '@protoxyz/types';

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
    return primaryEmail?.email.substring(0, 2).toUpperCase();
  }

  if (user.phoneNumbers && user.phoneNumbers.length > 0) {
    const primaryPhone = user.phoneNumbers?.find(
      (phone) => user.primaryPhoneId === phone.id,
    );
    return primaryPhone?.phone.substring(0, 2).toUpperCase();
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
  org: Pick<OrganizationWithRole, 'imageUri'>,
) => {
  if (org?.imageUri) {
    return org?.imageUri;
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
