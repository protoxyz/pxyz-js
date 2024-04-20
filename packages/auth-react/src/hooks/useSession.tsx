import { ResponseStatus } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import React from 'react';
import { setSessionCookie } from '../lib/cookies';

export const useProtocolAuthSession = () => {
  const { protocol, setState, tenant } = useProtocolAuth();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [updateError, setUpdateError] = React.useState<string | undefined>('');

  const issueToken = React.useCallback(
    async ({ orgId }: { orgId?: string }) => {
      setIsUpdating(true);

      const response = await protocol.auth.sessions.issueToken({
        body: {
          orgId,
        },
      });

      setIsUpdating(false);

      if (response.status === ResponseStatus.Success) {
        console.log(response.data);
        setUpdateError('');
        setSessionCookie(response.data?.jwt, tenant);
        setState((state) => ({
          ...state as any,
          orgId,
        }));
      } else {
        setUpdateError(response.error);
      }

      return response;
    },
    [],
  );

  return {
    issueToken,
    isUpdating,
    updateError,
  };
};
