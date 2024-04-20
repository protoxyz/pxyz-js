import React from 'react';

import {
  OrganizationProfileFlowRoute,
  UserProfileFlowRoute,
  useProtocolAuthOrganizationProfileFlow,
  useProtocolAuthUserProfileFlow,
} from '@protoxyz/auth-react';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../../ui/button';

export interface SidebarNavItem {
  orgRoute?: OrganizationProfileFlowRoute;
  userRoute?: UserProfileFlowRoute;
  label: string;
  icon?: React.ReactNode;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { route: orgRoute, setRoute: setOrgRoute } =
    useProtocolAuthOrganizationProfileFlow();
  const { route: userRoute, setRoute: setUserRoute } =
    useProtocolAuthUserProfileFlow();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.label}
          onClick={() =>
            item.orgRoute
              ? setOrgRoute(item.orgRoute)
              : item.userRoute
              ? setUserRoute(item.userRoute)
              : null
          }
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            item.orgRoute === orgRoute || item.userRoute === userRoute
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'cursor-pointer justify-start gap-1',
          )}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </nav>
  );
}
