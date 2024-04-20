import { AuthComponentType } from '@protoxyz/themes';
import {
  useProtocolAuthAppearance,
  useProtocolAuthSessionsList,
} from '@protoxyz/auth';
import { SectionHeader } from '../../../custom-ui/section-header';
import React from 'react';

interface SessionsRouteOptions {}

export function SessionsRoute({}: SessionsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { sessions } = useProtocolAuthSessionsList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Devices"
        description="Manage your account devices"
      />
      {sessions?.data?.map((session) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-foreground text-sm font-medium">
                {session.device} {session.os} {session.browser} {session.ip}
              </div>
            </div>
            <div className="flex items-center"></div>
          </div>
        );
      })}
    </div>
  );
}
