import { UserSettingsSection } from "../UserSettingsSection";
import { ManageEmailAddresses } from "./ManageEmails";
import { ManagePhoneNumbers } from "./ManagePhones";
import { ManageSocialConnections } from "./ManageSocialConnections";
import { ManageUserDetails } from "./ManageUserDetails";

export function AccountTabPersonalInformation({}: {}) {
    return (
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-8 py-24 md:grid-cols-5 md:gap-y-24">
            <UserSettingsSection heading="Personal Information" subheading="Update your account information" />
            <ManageUserDetails />

            <UserSettingsSection
                heading="Email Addresses"
                subheading="Manage the email addresses associated with your account."
            />
            <ManageEmailAddresses />

            <UserSettingsSection
                heading="Phone Numbers"
                subheading="Manage the phone numbers associated with your account."
            />
            <ManagePhoneNumbers />

            <UserSettingsSection
                heading="Social Connections"
                subheading="Manage the social connections associated with your account."
            />
            <ManageSocialConnections />
        </div>
    );
}
