import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  CreateSocialConnectionsOptions,
  ListSocialConnections200Response,
  ListSocialConnectionsPath,
} from '@protoxyz/core';
import { useCallback, useState } from 'react';

export function connectionsListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [ListSocialConnectionsPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthConnectionsList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { user, protocol, navigate } = useProtocolAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string>(null);
  const [deletingId, setDeletingId] = useState<string>(null);
  const [deleteError, setDeleteError] = useState<string>(null);

  const cacheKey = connectionsListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const userConnections = user?.connections ?? [];

  const { data, error, isLoading, mutate } =
    useSWR<ListSocialConnections200Response>(
      cacheKey,
      () =>
        protocol.auth.socialConnections.list({
          query: {
            cursor,
            perPage: perPage.toString(),
          },
        }),
      {
        fallbackData: {
          meta: {
            count: userConnections.length,
            next:
              userConnections.length > 0
                ? userConnections[userConnections.length - 1].id
                : null,
            numPages: 1,
            perPage: 10,
            total: userConnections.length ?? 0,
          },
          data: userConnections,
          status: ResponseStatus.Success,
        },
      },
    );

  const createConnection = useCallback(
    async (body: CreateSocialConnectionsOptions['body']) => {
      setIsCreating(true);
      const response = await protocol.auth.socialConnections.create({
        body,
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

  const deleteConnection = useCallback(
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
      const response = await protocol.auth.socialConnections.delete({
        path: {
          connectionId: id,
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
    connections: data,
    error,
    isLoading,
    isCreating,
    createConnection,
    createError,
    setCreateError,
    deleteConnection,
    deletingId,
    deleteError,
  };
};
