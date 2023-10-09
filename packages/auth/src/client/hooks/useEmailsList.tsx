import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendCreateEmailAddressOptions,
  FrontendListEmailAddresses200Response,
  FrontendListEmailAddressesPath,
} from '@protoxyz/core';
import React from 'react';

export function emailsListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [FrontendListEmailAddressesPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthEmailsList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { user, protocol, navigate, setState } = useProtocolAuth();
  const [isCreating, setIsCreating] = React.useState(false);
  const [createError, setCreateError] = React.useState<string>(null);
  const [deletingId, setDeletingId] = React.useState<string>(null);
  const [deleteError, setDeleteError] = React.useState<string>(null);
  const [settingPrimaryId, setSettingPrimaryId] = React.useState<string>(null);
  const [setPrimaryError, setSetPrimaryError] = React.useState<string>(null);
  const [preparingVerificationId, setPreparingVerificationId] =
    React.useState<string>(null);
  const [preparingVerificationError, setPreparingVerificationError] =
    React.useState<string>(null);
  const [attemptingVerificationId, setAttemptingVerificationId] =
    React.useState<string>(null);
  const [attemptingVerificationError, setAttemptingVerificationError] =
    React.useState<string>(null);

  const cacheKey = emailsListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const userEmails = user?.emailAddresses ?? [];

  const { data, error, isLoading, mutate } =
    useSWR<FrontendListEmailAddresses200Response>(
      cacheKey,
      () =>
        protocol.auth.emailAddresses.list({
          query: {
            cursor: cursor?.toString(),
            perPage: perPage.toString(),
          },
        }),
      {
        fallbackData: {
          meta: {
            count: userEmails.length,
            next:
              userEmails.length > 0
                ? (userEmails[userEmails.length - 1].createdAt as Date)
                : null,
            numPages: 1,
            perPage: 10,
            total: userEmails.length ?? 0,
          },
          data: userEmails,
          status: ResponseStatus.Success,
        },
      },
    );

  const createEmail = React.useCallback(
    async ({ email }: FrontendCreateEmailAddressOptions['body']) => {
      setIsCreating(true);
      const response = await protocol.auth.emailAddresses.create({
        body: {
          email,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setCreateError(response.error);
      } else {
        mutate();
      }
      setIsCreating(false);
      return response;
    },
    [],
  );

  const setPrimary = React.useCallback(
    async ({ id }: { id: string }) => {
      setSettingPrimaryId(id);
      const response = await protocol.auth.emailAddresses.setPrimary({
        path: {
          emailId: id,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setSetPrimaryError(response.error);
      } else {
        mutate();
        setState((state) => ({
          ...state,
          user: {
            ...state.user,
            primaryEmailId: id,
          },
        }));
      }
      setSettingPrimaryId(null);
      return response;
    },
    [mutate],
  );

  const sendCode = React.useCallback(
    async ({ id }: { id: string }) => {
      setPreparingVerificationId(id);
      const response = await protocol.auth.emailAddresses.prepareVerification({
        path: {
          emailId: id,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setPreparingVerificationError(response.error);
      } else {
        mutate();
      }
      setPreparingVerificationId(null);
      return response;
    },
    [mutate],
  );

  const verify = React.useCallback(
    async ({ id, code }: { id: string; code: string }) => {
      setAttemptingVerificationId(id);
      const response = await protocol.auth.emailAddresses.verify({
        path: {
          emailId: id,
        },
        body: {
          code,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setAttemptingVerificationError(response.error);
      } else {
        mutate();
      }
      setAttemptingVerificationId(null);
      return response;
    },
    [mutate],
  );

  const deleteEmail = React.useCallback(
    async ({
      id,
      afterDeleteUri,
      onDelete,
    }: {
      id: string;
      afterDeleteUri?: string;
      onDelete?: () => void;
    }) => {
      setDeletingId(id);
      const response = await protocol.auth.emailAddresses.delete({
        path: {
          emailId: id,
        },
      });
      if (response.status === ResponseStatus.Success) {
        mutate();
        if (afterDeleteUri) navigate(afterDeleteUri);
        onDelete?.();
      } else {
        setDeleteError(response.error);
      }
      setDeletingId(null);
      return response;
    },
    [],
  );

  return {
    emails: data,
    error,
    isLoading,
    isCreating,
    createEmail,
    createError,
    setCreateError,
    deleteEmail,
    deletingId,
    deleteError,

    setPrimary,
    isSettingPrimary: settingPrimaryId !== null,
    settingPrimaryId,
    setPrimaryError,

    sendCode,
    preparingVerificationId,
    preparingVerificationError,
    isPreparingVerification: preparingVerificationId !== null,

    verify,
    attemptingVerificationId,
    attemptingVerificationError,
    isAttemptingVerification: attemptingVerificationId !== null,
  };
};
