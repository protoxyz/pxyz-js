import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import { Card } from '../../../../ui/card';
import { useProtocolAuthAppearance } from '@protoxyz/auth-react';
import React from 'react';

export function SignInResetPasswordRoute() {
  const component: AuthComponentType = 'signIn';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        SignInResetPasswordRoute
      </Card>
    </CardWrapper>
  );
}
