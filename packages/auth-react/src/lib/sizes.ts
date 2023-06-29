import { AuthComponentType } from "@protoxyz/themes";

export const ComponentCardWidths: Record<AuthComponentType, string> = {
    signIn: "sm:max-w-lg",
    signUp: "sm:max-w-lg",
    createOrganization: "sm:max-w-lg",
    userProfile: "sm:max-w-4xl",
    organizationProfile: "sm:max-w-4xl ",
    // irrelevant

    userButton: "lg:max-w-md",
    organizationSwitcher: "lg:max-w-md",
};
