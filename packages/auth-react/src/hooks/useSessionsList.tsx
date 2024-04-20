import { PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendListSessions200Response,
  FrontendListSessionsPath,
} from '@protoxyz/api-clients';
import React from 'react';

export function sessionsListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [FrontendListSessionsPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthSessionsList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { user, protocol, navigate } = useProtocolAuth();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const cacheKey = sessionsListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const { data, error, isLoading, mutate } =
    useSWR<FrontendListSessions200Response>(cacheKey, () =>
      protocol.auth.sessions.list({
        query: {
          cursor: cursor?.toString(),
          perPage: perPage.toString(),
        },
      }),
    );

  const deleteSession = React.useCallback(
    async ({
      id,
      afterDeleteUri,
      onDelete,
    }: {
      id: string;
      afterDeleteUri?: string;
      onDelete?: () => void;
    }) => {
      //         setDeletingId(id);
      //         const response = await protocol.auth.sessions.delete({
      //             path: {
      //                 sessionId: id,
      //             },
      //         });
      //         if (response.status === ResponseStatus.Success) {
      //             mutate();
      //             navigate(afterDeleteUri ?? "/");
      //             onDelete();
      //         } else {
      //             setDeleteError(response.error);
      //         }
      //         setDeletingId(null);
      //         return response;
    },
    [],
  );

  return {
    sessions: data,
    error,
    isLoading,
    deletingId,
    deleteError,
    deleteSession,
  };
};
