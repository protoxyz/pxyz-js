import { useMemo } from "react";
import { OrganizationProfileFlowRoute, useProtocolAuthOrganizationProfileFlow } from "../../../contexts/flow-context";
import { OrganizationMembersRoute } from "./routes/organizationMembers";
import { SidebarNav } from "./sidebar-nav";
import { AuthComponentType } from "@protoxyz/themes";
import { CardWrapper } from "../../custom-ui/card-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useProtocolAuth, useProtocolAuthAppearance } from "../../../contexts/protocol-context";
import { OrganizationSettingsRoute } from "./routes/organizationSettings";
import { userDisplayName } from "../../../lib/display";
import { UserButton } from "../user-button";

const component: AuthComponentType = "organizationProfile";

interface UpdateProfileCardOptions {
    onDeleteOrganization?: () => void;
}
export function OrganizationProfile({ onDeleteOrganization }: UpdateProfileCardOptions) {
    const { user, org, orgId } = useProtocolAuth();
    const { appearance } = useProtocolAuthAppearance({ component });
    const { route } = useProtocolAuthOrganizationProfileFlow();

    const nav = useMemo(
        () => [
            {
                label: "Members",
                route: OrganizationProfileFlowRoute["organizationProfile:members"],
            },
            {
                label: "Settings",
                route: OrganizationProfileFlowRoute["organizationProfile:settings"],
            },
        ],
        [route],
    );

    return (
        <CardWrapper component={component} className={appearance?.elements?.cardWrapper}>
            {!orgId && <UpdateProfileCard />}
            {orgId && (
                <Card className={appearance?.elements?.card}>
                    <CardHeader className={appearance?.elements?.cardHeader}>
                        <CardTitle className={appearance?.elements?.cardHeaderTitle}>
                            {org?.name ?? userDisplayName(user)}
                        </CardTitle>
                        <CardDescription className={appearance?.elements?.cardHeaderDescription}>
                            Manage your organization settings and members.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={appearance?.elements?.cardContent}>
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                            <aside className="lg:w-1/5">
                                <SidebarNav items={nav} />
                            </aside>
                            <div className=" flex-1  ">
                                {route === OrganizationProfileFlowRoute["organizationProfile:members"] && (
                                    <OrganizationMembersRoute />
                                )}
                                {route === OrganizationProfileFlowRoute["organizationProfile:settings"] && (
                                    <OrganizationSettingsRoute onDeleteOrganization={onDeleteOrganization} />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </CardWrapper>
    );
}

function UpdateProfileCard() {
    const { appearance } = useProtocolAuthAppearance({ component });
    return (
        <Card className={appearance?.elements?.card}>
            <CardHeader className={appearance?.elements?.cardHeader}>
                <CardTitle className={appearance?.elements?.cardHeaderTitle}>No organization selected</CardTitle>
                <CardDescription className={appearance?.elements?.cardHeaderDescription}>
                    You can edit your personal account under your user profile.
                </CardDescription>
            </CardHeader>
            <CardContent className={appearance?.elements?.cardContent}>
                <div className="mt-6">
                    <UserButton mode="redirect" display="both" />
                </div>
            </CardContent>
        </Card>
    );
}
