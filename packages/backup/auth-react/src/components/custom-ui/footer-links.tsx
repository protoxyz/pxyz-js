import { AuthAppearance, AuthComponentType } from '@protoxyz/themes';
import { Tenant } from '@protoxyz/types';
import { FooterLink } from './footer-link';
import {
  SignInFlowRoute,
  useProtocolAuthSignInFlow,
} from '../../contexts/flow-context';

export function FooterLinks({
  usingPasswords,
  component,
}: {
  appearance: AuthAppearance;
  tenant: Tenant;
  usingPasswords: boolean;
  component: AuthComponentType;
}) {
  const { setRoute } = useProtocolAuthSignInFlow();
  const links = [];

  if (component === 'signIn') {
    // if (usingPasswords) {
    //   links.push(
    //     <FooterLink
    //       key={'forgot-password'}
    //       text="Forgot Password"
    //       href="/forgot-password"
    //     />,
    //   );
    // }
    links.push(
      <FooterLink
        key={'create-account'}
        prefix="No account?"
        text="Sign up"
        href="/sign-up"
      />,
    );

    links.push(
      <FooterLink
        key={'sign-in-methods'}
        prefix=""
        text="Sign in another way"
        onClick={() => setRoute(SignInFlowRoute['signIn:methods'])}
      />,
    );
  }

  if (component === 'signUp') {
    links.push(
      <FooterLink
        key={'sign-in'}
        prefix="Already have an account?"
        text="Sign in"
        href="/sign-in"
      />,
    );
  }

  return <div className="flex items-center gap-2">{links}</div>;
}
