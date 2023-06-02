import { AccountTabChangePassword } from "./AccountTabChangePassword";
import { AccountTabDeleteAccount } from "./AccountTabDeleteAccount";
import { AccountTabLogoutOtherSessions } from "./AccountTabLogoutOtherSessions";
import { AccountTabPersonalInformation } from "./AccountTabPersonalInformationt";

export function AccountTabContent({ tab }: { tab: string }) {
    if (tab !== "account") return null;

    return (
        <>
            <AccountTabPersonalInformation />
            <AccountTabChangePassword />
            <AccountTabLogoutOtherSessions />
            <AccountTabDeleteAccount />
        </>
    );
}
