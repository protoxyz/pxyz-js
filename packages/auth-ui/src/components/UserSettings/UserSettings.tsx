import { useMemo, useState } from "react";
import { UserSettingsNavigationItem, UserSettingsTabNavigation } from "./UserSettingsTabNavigation";
import { SecurityTabContent } from "./Security/SecurityTabContent";
import { AccountTabContent } from "./Account/AccountTabContent";
import { IsLoggedIn } from "../IsLoggedIn";
import { IsLoggedOut } from "../IsLoggedOut";

export interface UserSettingsProps {
    additionalTabs?: UserSettingsNavigationItem[];
}
export function UserSettings({ additionalTabs = [] }: UserSettingsProps) {
    const [currentTab, setCurrentTab] = useState<string>("account");

    const navigation = useMemo(() => {
        const mappedTabs = additionalTabs
            ? additionalTabs.map((tab) => ({ name: tab.label, tab: tab.tab, current: currentTab === tab.tab }))
            : [];

        return [
            { name: "Account", tab: "account", current: currentTab === "account" },
            { name: "Security", tab: "security", current: currentTab === "security" },
            { name: "Organizations", tab: "organizations", current: currentTab === "organizations" },
            ...mappedTabs,
        ];
    }, [currentTab, additionalTabs]);

    return (
        <div className=" h-full w-full  divide-y divide-white/5 lg:max-w-5xl">
            <IsLoggedOut>
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="text-2xl font-bold">You are not logged in.</p>
                    <p className="text-xl font-bold">
                        <a href="/sign-in" className="text-violet-500">
                            Login
                        </a>{" "}
                        or{" "}
                        <a href="/sign-up" className="text-violet-500">
                            Sign up
                        </a>{" "}
                        here.
                    </p>
                </div>
            </IsLoggedOut>
            <IsLoggedIn>
                <UserSettingsTabNavigation navigation={navigation} setCurrentTab={setCurrentTab} />
                <AccountTabContent tab={currentTab} />
                <SecurityTabContent tab={currentTab} />
            </IsLoggedIn>
        </div>
    );
}
