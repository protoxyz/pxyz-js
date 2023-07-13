import { AuthComponentType } from '@protoxyz/themes';
import { useProtocolAuthAppearance } from '../../../../contexts/protocol-context';
import { SectionHeader } from '../section-header';

interface SessionsRouteOptions {}
export function SessionsRoute({}: SessionsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Sessions"
        description="Manage your account sessions"
      />
    </div>
  );
}
