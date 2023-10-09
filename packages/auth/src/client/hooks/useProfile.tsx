import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import {
  FrontendUpdateUserPasswordOptions,
  FrontendUpdateUserProfileOptions,
} from '@protoxyz/core';
import React from 'react';

export const useProtocolAuthProfile = ({}: PaginatedArgs) => {
  const { protocol, setState } = useProtocolAuth();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [updateError, setUpdateError] = React.useState<string | undefined>('');
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [changePasswordError, setChangePasswordError] = React.useState<
    string | undefined
  >('');

  const updateProfile = React.useCallback(
    async ({
      name,
      username,
      locale,
      timezone,
    }: FrontendUpdateUserProfileOptions['body']) => {
      setIsUpdating(true);
      setUpdateError(undefined);
      const response = await protocol.auth.users.updateProfile({
        body: {
          name,
          username,
          locale,
          timezone,
        },
      });

      if (response.status === ResponseStatus.Error) {
        setUpdateError(response.error);
      } else if (response.data?.user) {
        setState((state) => ({
          ...state,
          user: response.data?.user,
        }));
      }
      setIsUpdating(false);

      return response;
    },
    [],
  );

  const changePassword = React.useCallback(
    async ({
      oldPassword,
      password,
    }: FrontendUpdateUserPasswordOptions['body']) => {
      setIsChangingPassword(true);
      setChangePasswordError(undefined);
      const response = await protocol.auth.users.changePassword({
        body: {
          oldPassword,
          password,
        },
      });

      if (response.status === ResponseStatus.Error) {
        setChangePasswordError(response.error);
      }

      setIsChangingPassword(false);

      return response;
    },
    [],
  );

  return {
    changePassword,
    isChangingPassword,
    changePasswordError,

    updateProfile,
    isUpdating,
    updateError,
  };
};
