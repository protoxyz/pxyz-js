import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendCreatePhoneNumberOptions,
  FrontendListPhoneNumbers200Response,
  FrontendListPhoneNumbersPath,
} from '@protoxyz/api-clients';
import React from 'react';

export function phonesListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [FrontendListPhoneNumbersPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthPhonesList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { user, protocol, navigate, setState } = useProtocolAuth();
  const [isCreating, setIsCreating] = React.useState(false);
  const [createError, setCreateError] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [settingPrimaryId, setSettingPrimaryId] = React.useState<string | null>(null);
  const [setPrimaryError, setSetPrimaryError] = React.useState<string | null>(null);
  const [preparingVerificationId, setPreparingVerificationId] =
    React.useState<string | null>(null);
  const [preparingVerificationError, setPreparingVerificationError] =
    React.useState<string | null>(null);
  const [attemptingVerificationId, setAttemptingVerificationId] =
    React.useState<string | null>(null);
  const [attemptingVerificationError, setAttemptingVerificationError] =
    React.useState<string | null>(null);

  const cacheKey = phonesListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const userPhones = user?.phoneNumbers ?? [];

  const { data, error, isLoading, mutate } =
    useSWR<FrontendListPhoneNumbers200Response>(
      cacheKey,
      () =>
        protocol.auth.phoneNumbers.list({
          query: {
            cursor: cursor?.toString(),
            perPage: perPage.toString(),
          },
        }),
      {
        fallbackData: {
          meta: {
            count: userPhones.length,
            next:
              userPhones.length > 0
                ? (userPhones[userPhones.length - 1]?.createdAt as Date)
                : null,
            numPages: 1,
            perPage: 10,
            total: userPhones.length ?? 0,
          },
          data: userPhones,
          status: ResponseStatus.Success,
        },
      },
    );

  const createPhone = React.useCallback(
    async ({ phone }: FrontendCreatePhoneNumberOptions['body']) => {
      setIsCreating(true);
      const response = await protocol.auth.phoneNumbers.create({
        body: {
          phone,
        },
      });
      if (response.status === ResponseStatus.Error) {
        // setCreateError(response.error);
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
      const response = await protocol.auth.phoneNumbers.setPrimary({
        path: {
          phoneId: id,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setSetPrimaryError(response.error ?? '');
      } else {
        mutate();
        setState((state) => ({
          ...state,
          user: {
            ...state.user as any,
            primaryPhoneId: id,
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
      const response = await protocol.auth.phoneNumbers.prepareVerification({
        path: {
          phoneId: id,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setPreparingVerificationError(response.error ?? '');
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
      const response = await protocol.auth.phoneNumbers.verify({
        path: {
          phoneId: id,
        },
        body: {
          code,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setAttemptingVerificationError(response.error ?? '');
      } else {
        mutate();
      }
      setAttemptingVerificationId(null);
      return response;
    },
    [mutate],
  );

  const deletePhone = React.useCallback(
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
      const response = await protocol.auth.phoneNumbers.delete({
        path: {
          phoneId: id,
        },
      });
      if (response.status === ResponseStatus.Success) {
        mutate();
        if (afterDeleteUri) navigate(afterDeleteUri ?? '/');
        onDelete?.();
      } else {
        setDeleteError(response.error ?? '');
      }
      setDeletingId(null);
      return response;
    },
    [],
  );

  return {
    phones: data,
    error,
    isLoading,
    isCreating,
    createPhone,
    createError,
    setCreateError,
    deletePhone,
    deletingId,
    deleteError,

    setPrimary,
    settingPrimaryId,
    setPrimaryError,
    isSettingPrimary: settingPrimaryId !== null,

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
