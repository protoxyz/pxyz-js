import React from 'react';
import {
  OrganizationProfileFlowRoute,
  useProtocolAuthOrganizationProfileFlow,
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthOrganizationsList,
} from '@protoxyz/auth/client';
import { OrganizationMembersRoute } from './routes/organizationMembers';
import { SidebarNav } from '../../custom-ui/sidebar-nav';
import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card'; 
import { OrganizationSettingsRoute } from './routes/organizationSettings';
import { userDisplayName } from '../../../lib/display'; 
import { BuildingIcon, CogIcon, UsersIcon } from 'lucide-react';
import { LoadingButton } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { createOrgToken } from '../../../lib/actions';


const component: AuthComponentType = 'organizationProfile';

interface UpdateProfileCardOptions {
  onDeleteOrganization?: () => void;
}
export function OrganizationProfile({
  onDeleteOrganization,
}: UpdateProfileCardOptions) {
  const { user, org, orgId } = useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { route } = useProtocolAuthOrganizationProfileFlow();

  const nav = React.useMemo(
    () => [
      {
        label: 'Members',
        icon: <UsersIcon className="h-4 w-4" />,
        orgRoute: OrganizationProfileFlowRoute['organizationProfile:members'],
      },
      {
        label: 'Settings',
        icon: <CogIcon className="h-4 w-4" />,
        orgRoute: OrganizationProfileFlowRoute['organizationProfile:settings'],
      },
    ],
    [route],
  );

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      {!orgId && <SelectOrganizationCard />}
      {orgId && (
        <Card className={appearance?.elements?.card}>
          <CardHeader className={appearance?.elements?.cardHeader}>
            <CardTitle className={appearance?.elements?.cardHeaderTitle}>
              {org?.name ?? userDisplayName(user)}
            </CardTitle>
            <CardDescription
              className={appearance?.elements?.cardHeaderDescription}
            >
              Manage your organization settings and members.
            </CardDescription>
          </CardHeader>
          <CardContent className={appearance?.elements?.cardContent}>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
              <aside className="lg:w-1/5">
                <SidebarNav items={nav} />
              </aside>
              <div className=" flex-1  ">
                {route ===
                  OrganizationProfileFlowRoute[
                    'organizationProfile:members'
                  ] && <OrganizationMembersRoute />}
                {route ===
                  OrganizationProfileFlowRoute[
                    'organizationProfile:settings'
                  ] && (
                  <OrganizationSettingsRoute
                    onDeleteOrganization={onDeleteOrganization}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CardWrapper>
  );
}

function SelectOrganizationCard() {
  const { navigate, tokenCache, tenant, protocol, setState } =
    useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { organizations } = useProtocolAuthOrganizationsList({});

  

  return (
    <Card className={appearance?.elements?.card}>
      <CardHeader className={appearance?.elements?.cardHeader}>
        <CardTitle className={appearance?.elements?.cardHeaderTitle}>
          Select Organization
        </CardTitle>
        <CardDescription
          className={appearance?.elements?.cardHeaderDescription}
        >
          Select an organization below to manage your organization settings and
          members.
        </CardDescription>
      </CardHeader>
      <CardContent className={appearance?.elements?.cardContent}>
        <div className="mt-6 flex flex-col gap-2">
          {organizations.data?.map((team: any) => (
            <LoadingButton
              variant="secondary"
              className="h-24 justify-start"
              size="lg"
              onClick={() => {
                const orgId = team.id
                createOrgToken(protocol, setState, tokenCache, orgId, tenant, organizations.data)
              }}
            >
              <Avatar>
                <AvatarImage src={team.logoUri ?? ""} alt={team.name} />
                <AvatarFallback>
                  <div className="bg-background  flex items-center justify-center   p-4">
                    <BuildingIcon className="h-4 w-4" />
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="text-foreground text-xl font-bold">
                {team.name}
              </div>
            </LoadingButton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
