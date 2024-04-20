import { AuthComponentType } from '@protoxyz/themes';
import { useProtocolAuthAppearance } from '@protoxyz/auth-react';
import { SectionHeader } from '../../../custom-ui/section-header';
import React from 'react';

export function SecurityRoute() {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Password"
        description="Manage your account password"
      />
      <SectionHeader
        title="Two-Factor Authentication"
        description="Manage your 2fa verification methods"
      />
    </div>
  );
}
