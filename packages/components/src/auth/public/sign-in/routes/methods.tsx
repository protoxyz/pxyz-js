import { AuthComponentType } from '@protoxyz/themes';
import { CardWrapper } from '../../../custom-ui/card-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import {
  useProtocolAuthAppearance,
  useProtocolAuthTenant,
  useBrandLogo,
  useBrandName,
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '@protoxyz/auth/client';
import { BrandLogo, BrandLogoWrapper } from '../../../custom-ui/brand-logo';
import { Button } from '../../../../ui/button';
import { AllowedFirstFactorStrategy } from '@protoxyz/types';
import { strategyDisplayName } from '../../../../lib/display';
import React from 'react';

export function SignInMethodsRoute() {
  const component: AuthComponentType = 'signIn';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { tenant } = useProtocolAuthTenant();
  const { setRoute, firstFactorStrategies, setFirstFactorStrategy } =
    useProtocolAuthSignInFlow();
  const brandLogo = useBrandLogo({ component });
  const brandName = useBrandName({ component });

  const selectStrategy = (strategy: AllowedFirstFactorStrategy) => {
    setFirstFactorStrategy(strategy);
    setRoute(SignInFlowRoute.signIn);
  };

  return (
    <CardWrapper
      component={component}
      className={appearance?.elements?.cardWrapper}
    >
      <Card className={appearance?.elements?.card}>
        <CardHeader className={appearance?.elements?.cardHeader}>
          {appearance?.layout?.headerPlacement !== 'none' && (
            <>
              <BrandLogoWrapper component={component}>
                <BrandLogo component={component} />
              </BrandLogoWrapper>
              {!brandLogo && (
                <CardTitle className={appearance?.elements?.cardHeaderTitle}>
                  {tenant?.name}
                </CardTitle>
              )}
              <CardDescription
                className={appearance?.elements?.cardHeaderDescription}
              >
                Log in to {brandName} to continue
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className={appearance?.elements?.cardContent}>
          <div className="flex flex-col gap-2">
            <div className=" text-muted-foreground text-sm">
              Select a sign in method:
            </div>
            {firstFactorStrategies.map((strategy) => (
              <Button
                variant="secondary"
                key={strategy}
                onClick={() => selectStrategy(strategy)}
              >
                {strategyDisplayName(strategy)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
