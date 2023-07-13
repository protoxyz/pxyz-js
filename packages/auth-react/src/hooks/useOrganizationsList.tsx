import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  ListOrganizations200Response,
  ListOrganizationsPath,
} from '@protoxyz/core';
import { useCallback, useState } from 'react';

export function organizationsListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [ListOrganizationsPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthOrganizationsList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { orgId, user, protocol, setState, navigate } = useProtocolAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [createError, setCreateError] = useState<string>(null);
  const [updateError, setUpdateError] = useState<string>(null);
  const [deletingId, setDeletingId] = useState<string>(null);
  const [deleteError, setDeleteError] = useState<string>(null);

  const cacheKey = organizationsListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const userOrganizations = user?.organizations ?? [];

  const { data, error, isLoading, mutate } =
    useSWR<ListOrganizations200Response>(
      cacheKey,
      () =>
        protocol.auth.organizations.list({
          query: {
            cursor,
            perPage: perPage.toString(),
          },
        }),
      {
        fallbackData: {
          meta: {
            count: userOrganizations.length,
            next:
              userOrganizations.length > 0
                ? userOrganizations[userOrganizations.length - 1].id
                : null,
            numPages: 1,
            perPage: 10,
            total: userOrganizations.length ?? 0,
          },
          data: userOrganizations,
          status: ResponseStatus.Success,
        },
      },
    );

  const createOrganization = useCallback(async ({ name }: { name: string }) => {
    setIsCreating(true);
    const response = await protocol.auth.organizations.create({
      body: {
        name,
      },
    });
    if (response.status === ResponseStatus.Error) {
      setCreateError(response.error);
    } else {
      mutate();
    }
    setIsCreating(false);
    return response;
  }, []);

  const updateOrganization = useCallback(async ({ name }: { name: string }) => {
    setIsUpdating(true);
    const response = await protocol.auth.organizations.update({
      path: {
        organizationId: orgId,
      },
      body: {
        name,
      },
    });
    if (response.status === ResponseStatus.Error) {
      setUpdateError(response.error);
    } else {
      setState((state) => ({
        ...state,
        org: {
          ...state.org,
          name,
        },
        user: {
          ...state.user,
          organizations: state.user.organizations.map((org) =>
            org.id === orgId
              ? {
                  ...org,
                  name,
                }
              : org,
          ),
        },
      }));
      mutate();
    }
    setIsUpdating(false);

    return response;
  }, []);

  const deleteOrganization = useCallback(
    async ({
      afterDeleteUri,
      onDelete,
    }: {
      afterDeleteUri?: string;
      onDelete?: () => void;
    }) => {
      setDeletingId(orgId);
      const response = await protocol.auth.organizations.delete({
        path: {
          organizationId: orgId,
        },
      });
      if (response.status === ResponseStatus.Success) {
        setState((state) => ({
          ...state,
          orgId: null,
          org: null,
        }));
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
    organizations: data,
    error,
    isLoading,
    isCreating,
    createOrganization,
    createError,
    setCreateError,
    isUpdating,
    updateOrganization,
    updateError,
    deleteOrganization,
    deletingId,
    deleteError,
  };
};
