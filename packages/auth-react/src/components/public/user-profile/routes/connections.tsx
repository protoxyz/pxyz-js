import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
} from '../../../../contexts/protocol-context';
import { SectionHeader } from '../section-header';
import { useProtocolAuthConnectionsList } from '../../../../hooks/useConnectionsList';
import { Button } from '../../../ui/button';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import CompanyIcons from '../../../icons/companies';

interface UserConnectionsRouteOptions {}
export function UserConnectionsRoute({}: UserConnectionsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { user, instance } = useProtocolAuth();
  const { connections } = useProtocolAuthConnectionsList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Social Connections"
        description="Manage the third-party connections associated with your account."
      />
      {connections?.data?.map((connection) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <div className="text-sm font-medium text-gray-900">
                {connection.providerId}
              </div>
            </div>
            <div className="flex items-center">
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      {instance?.socialProviders?.map((provider) => {
        const Icon = CompanyIcons[provider.providerKey];
        return (
          <Button variant="outline">
            <Icon className="h-5 w-5" />
            <span>Connect {provider.providerKey}</span>
          </Button>
        );
      })}
    </div>
  );
}
