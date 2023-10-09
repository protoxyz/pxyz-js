import {
  SESSION_COOKIE_NAME,
  TokenCache,
  setSessionCookie,
} from '@protoxyz/auth/client';
import { ProtocolFrontendClient } from '@protoxyz/core';
import { Organization, ResponseStatus, Tenant } from '@protoxyz/types';

export const createOrgToken = async (
  protocol: ProtocolFrontendClient | null | undefined,
  setState: (state: any) => void,
  tokenCache: TokenCache | undefined,
  orgId: string | null | undefined,
  tenant: Tenant | null | undefined,
  organizations: Organization[],
) => {
  const response = orgId
    ? await protocol?.auth.sessions.issueToken({
        body: {
          orgId,
        },
      })
    : null;

  if (response?.status === ResponseStatus.Success) {
    setSessionCookie(response.data?.jwt, tenant);
    tokenCache?.saveToken(SESSION_COOKIE_NAME, response.data?.jwt);

    const role = response.data.sessionUser?.claims?.role ?? null;
    const permissions = response.data.sessionUser?.claims?.permissions ?? null;
    const org = organizations.find((org) => org.id === orgId) ?? null;
    const orgRole = response.data.sessionUser?.claims?.orgRole ?? null;
    const orgPermissions =
      response.data.sessionUser?.claims?.orgPermissions ?? null;

    setState((state: any) => ({
      ...state,
      session: response.data.sessionUser ?? null,
      role,
      permissions,
      org,
      orgId,
      orgRole,
      orgPermissions,
    }));

    return response;
  }
};
