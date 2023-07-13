import { AuthComponentType } from '@protoxyz/themes';
import { useProtocolAuthAppearance } from '../../../../contexts/protocol-context';
import { SectionHeader } from '../section-header';

interface SecurityRouteOptions {}
export function SecurityRoute({}: SecurityRouteOptions) {
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
