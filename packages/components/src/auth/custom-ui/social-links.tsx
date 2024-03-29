import React from 'react';

import { AuthAppearance } from '@protoxyz/themes';
import { Tenant } from '@protoxyz/types';
import { IconButton } from './icon-button';
import CompanyIcons from '../../icons';
import { Divider } from './divider';

export function SocialLinks({
  tenant,
}: {
  appearance: AuthAppearance;
  tenant: Tenant;
}) {
  const filteredProviders =
    tenant?.socialProviders?.filter((p) => p.enabled) ?? [];
  let gridCols = '';

  switch (filteredProviders.length) {
    case 1:
      gridCols = 'grid-cols-1';
      break;
    case 2:
      gridCols = 'grid-cols-2';
      break;
    default:
      gridCols = 'grid-cols-3';
      break;
  }

  if (filteredProviders.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`grid ${gridCols} gap-x-6 gap-y-3`}>
        {filteredProviders?.map((provider) => (
          <IconButton
            key={provider.providerKey}
            icon={(CompanyIcons as any)[provider.providerKey]}
            text={`Continue with ${provider.providerKey}`}
          />
        ))}
      </div>
      <Divider />
    </>
  );
}
