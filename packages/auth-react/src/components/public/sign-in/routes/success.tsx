import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import { Card } from '../../../ui/card';
import { useProtocolAuthAppearance } from '../../../../contexts/protocol-context';

export function SignInSuccessRoute() {
  const component: AuthComponentType = 'signIn';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>SignInSuccessRoute</Card>
    </CardWrapper>
  );
}
