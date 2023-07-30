import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { useProtocolAuthAppearance } from '../../../../contexts/protocol-context';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { Spinner } from '../../../ui/spinner';

export function SignInSuccessRoute() {
  const component: AuthComponentType = 'signIn';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        <CardHeader className={appearance?.elements?.cardHeader}>
          <BrandLogoWrapper component={component}>
            <BrandLogo component={component} />
          </BrandLogoWrapper>
          <CardTitle className={appearance?.elements?.cardHeaderTitle}>
            Sign In Successful
          </CardTitle>
          <CardDescription
            className={appearance?.elements?.cardHeaderDescription}
          >
            You'll be redirected shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className={appearance?.elements?.cardContent}>
          <Spinner size="lg" />
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
