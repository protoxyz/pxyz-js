import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import { UpdateUserProfileOptions } from '@protoxyz/core';
import { useCallback, useState } from 'react';

export const useProtocolAuthProfile = ({}: PaginatedArgs) => {
  const { user, protocol, setState, navigate } = useProtocolAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | undefined>('');

  const updateProfile = useCallback(
    async ({
      firstName,
      lastName,
      username,
      locale,
      timezone,
    }: UpdateUserProfileOptions['body']) => {
      setIsUpdating(true);
      const response = await protocol.auth.users.updateProfile({
        body: {
          firstName,
          lastName,
          username,
          locale,
          timezone,
        },
      });

      if (response.status === ResponseStatus.Error) {
        setUpdateError(response.error);
      } else if (response.data.user) {
        setState((state) => ({
          ...state,
          user: response.data.user,
        }));
      }
      setIsUpdating(false);

      return response;
    },
    [],
  );

  return {
    updateProfile,
    isUpdating,
    updateError,
  };
};
