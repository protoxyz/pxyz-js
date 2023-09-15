import { ResponseStatus } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import { useCallback, useState } from 'react';
import { setSessionCookie } from '../lib/cookies';

export const useProtocolAuthSession = () => {
  const { protocol, setState, tenant } = useProtocolAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | undefined>('');

  const issueToken = useCallback(async ({ orgId }: { orgId?: string }) => {
    setIsUpdating(true);

    const response = await protocol.auth.sessions.issueToken({
      body: {
        orgId,
      },
    });

    setIsUpdating(false);

    if (response.status === ResponseStatus.Success) {
      setUpdateError('');
      setSessionCookie(response.data?.jwt, tenant);
      setState((state) => ({
        ...state,
        orgId,
      }));
    } else {
      setUpdateError(response.error);
    }

    return response;
  }, []);

  return {
    issueToken,
    isUpdating,
    updateError,
  };
};
