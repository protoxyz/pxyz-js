import { useMemo } from 'react';
import {
  UserProfileFlowRoute,
  useProtocolAuthUserProfileFlow,
} from '../../../contexts/flow-context';
import { SidebarNav } from './sidebar-nav';
import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../contexts/protocol-context';
import { UserSettingsRoute } from './routes/settings';
import { userDisplayName } from '../../../lib/display';
import {
  LaptopIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShieldIcon,
  User,
  UserIcon,
} from 'lucide-react';
import { UserEmailsRoute } from './routes/emails';
import { UserPhonesRoute } from './routes/phones';
import { UserConnectionsRoute } from './routes/connections';
import { SecurityRoute } from './routes/security';
import { SessionsRoute } from './routes/sessions';
const component: AuthComponentType = 'userProfile';

interface UpdateProfileCardOptions {}
export function UserProfile({}: UpdateProfileCardOptions) {
  const { user } = useProtocolAuth();
  const { appearance } = useProtocolAuthAppearance({ component });
  const { route } = useProtocolAuthUserProfileFlow();

  const nav = useMemo(
    () => [
      {
        icon: <UserIcon className="h-4 w-4" />,
        label: 'Profile',
        route: UserProfileFlowRoute['userProfile:settings'],
      },
      {
        icon: <MailIcon className="h-4 w-4" />,
        label: 'Email Addresses',
        route: UserProfileFlowRoute['userProfile:emails'],
      },
      {
        icon: <PhoneIcon className="h-4 w-4" />,
        label: 'Phone Numbers',
        route: UserProfileFlowRoute['userProfile:phones'],
      },
      {
        icon: <LinkIcon className="h-4 w-4" />,
        label: 'Social Connections',
        route: UserProfileFlowRoute['userProfile:connections'],
      },
      {
        icon: <ShieldCheckIcon className="h-4 w-4" />,
        label: 'Security',
        route: UserProfileFlowRoute['userProfile:security'],
      },
      {
        icon: <LaptopIcon className="h-4 w-4" />,
        label: 'Sessions',
        route: UserProfileFlowRoute['userProfile:sessions'],
      },
    ],
    [route],
  );

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
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
  );
}
