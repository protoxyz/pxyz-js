import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuth,
  useProtocolAuthAppearance,
  useProtocolAuthConnectionsList,
} from '@protoxyz/auth-react';
import { Button } from '../../../../ui/button';
import { CheckCircleIcon } from 'lucide-react';
import CompanyIcons from '../../../../icons';
import { SectionHeader } from '../../../custom-ui/section-header';
import React from 'react';

export function UserConnectionsRoute() {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuth();
  const { connections } = useProtocolAuthConnectionsList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="App Connections"
        description="Manage the third-party connections associated with your account."
      />

      {connections?.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="text-muted-foreground text-center">
            You have no connections yet.
          </div>
        </div>
      )}

      {connections?.data?.map((connection) => {
        return (
          <div
            key={connection.id}
            className="flex items-center justify-between"
          >
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
      {tenant?.socialProviders?.map((provider) => {
        const Icon = (CompanyIcons as any)[provider.providerKey];
        return (
          <Button key={provider.providerKey} variant="outline">
            <Icon className="h-5 w-5" />
            <span>Connect {provider.providerKey}</span>
          </Button>
        );
      })}
    </div>
  );
}
