import { AuthComponentType } from '@protoxyz/themes';
import { useProtocolAuthAppearance } from '../../../../contexts/protocol-context';
import { SectionHeader } from '../../../custom-ui/section-header';
import { useProtocolAuthSessionsList } from '../../../../hooks/useSessionsList';

interface SessionsRouteOptions {}
export function SessionsRoute({}: SessionsRouteOptions) {
  const component: AuthComponentType = 'userProfile';
  const { appearance } = useProtocolAuthAppearance({ component });
  const { sessions } = useProtocolAuthSessionsList({});

  return (
    <div className="grid gap-8">
      <SectionHeader
        title="Sessions"
        description="Manage your account sessions"
      />
      {sessions?.data?.map((session) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-foreground text-sm font-medium">
                {session.browser}
              </div>
            </div>
            <div className="flex items-center"></div>
          </div>
        );
      })}
    </div>
  );
}
