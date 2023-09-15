import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendCreatePhoneNumberOptions,
  FrontendListPhoneNumbers200Response,
  FrontendListPhoneNumbersPath,
} from '@protoxyz/core';
import { useCallback, useState } from 'react';

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
  const { user, protocol, navigate } = useProtocolAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string>(null);
  const [deletingId, setDeletingId] = useState<string>(null);
  const [deleteError, setDeleteError] = useState<string>(null);

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
                ? (userPhones[userPhones.length - 1].createdAt as Date)
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

  const createPhone = useCallback(
    async ({ phone }: FrontendCreatePhoneNumberOptions['body']) => {
      setIsCreating(true);
      const response = await protocol.auth.phoneNumbers.create({
        body: {
          phone,
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

  const deletePhone = useCallback(
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
        navigate(afterDeleteUri ?? '/');
        onDelete();
      } else {
        setDeleteError(response.error);
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
  };
};
