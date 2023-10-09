import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendListOrganizations200Response,
  FrontendListOrganizationsPath,
} from '@protoxyz/core';
import React from 'react';

export function organizationsListCacheKey({
  cursor,
  perPage,
  userId,
}: PaginatedArgs & { userId?: string }) {
  return [FrontendListOrganizationsPath, userId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthOrganizationsList = ({
  cursor = null,
  perPage = 10,
}: PaginatedArgs) => {
  const { orgId, user, protocol, setState, navigate } = useProtocolAuth();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [createError, setCreateError] = React.useState<string>(null);
  const [updateError, setUpdateError] = React.useState<string>(null);
  const [deletingId, setDeletingId] = React.useState<string>(null);
  const [deleteError, setDeleteError] = React.useState<string>(null);

  const cacheKey = organizationsListCacheKey({
    userId: user?.id,
    cursor,
    perPage,
  });

  const userOrganizations = user?.organizations ?? [];

  const { data, error, isLoading, mutate } =
    useSWR<FrontendListOrganizations200Response>(
      cacheKey,
      () =>
        protocol.auth.organizations.list({
          query: {
            cursor: cursor?.toString(),
            perPage: perPage.toString(),
          },
        }),
      {
        fallbackData: {
          meta: {
            count: userOrganizations.length,
            next:
              userOrganizations.length > 0
                ? (userOrganizations[userOrganizations.length - 1]
                    .createdAt as Date)
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

  const createOrganization = React.useCallback(
    async ({ name }: { name: string }) => {
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
    },
    [],
  );

  const updateOrganization = React.useCallback(
    async ({ name }: { name: string }) => {
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
    },
    [],
  );

  const deleteOrganization = React.useCallback(
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
