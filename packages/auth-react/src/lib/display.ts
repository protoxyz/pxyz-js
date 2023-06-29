import { OrganizationWithRole, UserProfile } from "@protoxyz/types";

export const initials = (name: string[]) => {
    if (name) {
        return name
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }

    return null;
};

export const userInitials = (
    user: Pick<
        UserProfile,
        "firstName" | "lastName" | "username" | "emailAddresses" | "phoneNumbers" | "primaryEmailId" | "primaryPhoneId"
    > | null,
) => {
    if (!user) {
        return null;
    }

    if (user.firstName && user.lastName) {
        return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }

    if (user.firstName) {
        return user.firstName.substring(0, 2).toUpperCase();
    }

    if (user.lastName) {
        return user.lastName.substring(0, 2).toUpperCase();
    }

    if (user.username) {
        return user.username.substring(0, 2).toUpperCase();
    }

    if (user.emailAddresses && user.emailAddresses.length > 0) {
        const primaryEmail = user.emailAddresses?.find((email) => user.primaryEmailId === email.id);
        return primaryEmail?.email.substring(0, 2).toUpperCase();
    }

    if (user.phoneNumbers && user.phoneNumbers.length > 0) {
        const primaryPhone = user.phoneNumbers?.find((phone) => user.primaryPhoneId === phone.id);
        return primaryPhone?.phone.substring(0, 2).toUpperCase();
    }

    return null;
};

export const organizationInitials = (org: Pick<OrganizationWithRole, "name">) => {
    if (org?.name) {
        return org?.name.substring(0, 2).toUpperCase();
    }

    return null;
};

export const organizationImage = (org: Pick<OrganizationWithRole, "imageUri">) => {
    if (org?.imageUri) {
        return org?.imageUri;
    }

    return null;
};

export const userDisplayName = (
    user: Pick<
        UserProfile,
        "firstName" | "lastName" | "username" | "emailAddresses" | "phoneNumbers" | "primaryEmailId" | "primaryPhoneId"
    > | null,
) => {
    if (!user) {
        return null;
    }

    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }

    if (user.firstName) {
        return user.firstName;
    }

    if (user.lastName) {
        return user.lastName;
    }

    if (user.username) {
        return user.username;
    }

    if (user.emailAddresses && user.emailAddresses.length > 0) {
        const primaryEmail = user.emailAddresses?.find((email) => user.primaryEmailId === email.id);
        return primaryEmail?.email;
    }

    if (user.phoneNumbers && user.phoneNumbers.length > 0) {
        const primaryPhone = user.phoneNumbers?.find((phone) => user.primaryPhoneId === phone.id);
        return primaryPhone?.phone;
    }

    return null;
};

export const userSecondaryDisplayName = (
    user: Pick<UserProfile, "emailAddresses" | "primaryEmailId" | "phoneNumbers" | "primaryPhoneId"> | null,
) => {
    if (!user) {
        return null;
    }

    if (user.emailAddresses && user.emailAddresses.length > 0) {
        const primaryEmail = user.emailAddresses?.find((email) => user.primaryEmailId === email.id);
        return primaryEmail?.email;
    }

    if (user.phoneNumbers && user.phoneNumbers.length > 0) {
        const primaryPhone = user.phoneNumbers?.find((phone) => user.primaryPhoneId === phone.id);
        return primaryPhone?.phone;
    }

    return null;
};

export const userImage = (user: Pick<UserProfile, "imageUri"> | null) => {
    if (!user) {
        return null;
    }

    if (user.imageUri) {
        return user.imageUri;
    }

    return null;
};
