import React from 'react';
import {
  UserProfileFlowRoute,
  useProtocolAuthUserProfileFlow,
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '@protoxyz/auth';
import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card'; 
import { UserSettingsRoute } from './routes/settings';
import { userDisplayName } from '../../../lib/display';
import {
  LaptopIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from 'lucide-react';
import { UserEmailsRoute } from './routes/emails';
import { UserPhonesRoute } from './routes/phones';
import { UserConnectionsRoute } from './routes/connections';
import { SecurityRoute } from './routes/security';
import { SessionsRoute } from './routes/sessions';
import { SidebarNav } from '../../custom-ui/sidebar-nav';
import { cn } from '../../../lib/utils';
import { IsLoaded } from '../control/is-loaded';

const component: AuthComponentType = 'userProfile';

interface UpdateProfileCardOptions {}
export function UserProfile({}: UpdateProfileCardOptions) {
  const { tenant, user } = useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { route } = useProtocolAuthUserProfileFlow();

  const nav = React.useMemo(
    () =>
      [
        {
          icon: <UserIcon className="h-4 w-4" />,
          label: 'Profile',
          userRoute: UserProfileFlowRoute['userProfile:settings'],
        },
        {
          icon: <MailIcon className="h-4 w-4" />,
          label: 'Email Addresses',
          userRoute: UserProfileFlowRoute['userProfile:emails'],
        },
        {
          icon: <PhoneIcon className="h-4 w-4" />,
          label: 'Phone Numbers',
          userRoute: UserProfileFlowRoute['userProfile:phones'],
        },
        {
          icon: <LinkIcon className="h-4 w-4" />,
          label: 'App Connections',
          userRoute: UserProfileFlowRoute['userProfile:connections'],
        },
        {
          icon: <ShieldCheckIcon className="h-4 w-4" />,
          label: 'Security',
          userRoute: UserProfileFlowRoute['userProfile:security'],
        },
        {
          icon: <LaptopIcon className="h-4 w-4" />,
          label: 'Devices',
          userRoute: UserProfileFlowRoute['userProfile:sessions'],
        },
      ].filter((route) => !!route),
    [route],
  );

  return (
    <IsLoaded>
      <CardWrapper
        component={component}
        className={appearance?.elements?.cardWrapper}
      >
        <Card className={cn(appearance?.elements?.card, 'min-h-[calc(80vh)]')}>
          <CardHeader className={appearance?.elements?.cardHeader}>
            <CardTitle className={appearance?.elements?.cardHeaderTitle}>
              {userDisplayName(user)}
            </CardTitle>
            <CardDescription
              className={appearance?.elements?.cardHeaderDescription}
            >
              Manage your personal account settings.
            </CardDescription>
          </CardHeader>
          <CardContent className={appearance?.elements?.cardContent}>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
              <aside className="lg:w-[200px]">
                <SidebarNav items={nav} />
              </aside>
              <div className=" flex-1  ">
                {route === UserProfileFlowRoute['userProfile:settings'] && (
                  <UserSettingsRoute />
                )}
                {route === UserProfileFlowRoute['userProfile:security'] && (
                  <SecurityRoute />
                )}
                {route === UserProfileFlowRoute['userProfile:sessions'] && (
                  <SessionsRoute />
                )}
                {route === UserProfileFlowRoute['userProfile:emails'] && (
                  <UserEmailsRoute />
                )}
                {route === UserProfileFlowRoute['userProfile:phones'] && (
                  <UserPhonesRoute />
                )}
                {route === UserProfileFlowRoute['userProfile:connections'] && (
                  <UserConnectionsRoute />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    </IsLoaded>
  );
}
