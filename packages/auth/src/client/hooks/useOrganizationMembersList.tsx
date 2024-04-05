import { ResponseStatus, PaginatedArgs } from '@protoxyz/types';
import { useProtocolAuth } from '../contexts/protocol-context';
import useSWR from 'swr';
import {
  FrontendListOrganizationMembers200Response,
  FrontendListOrganizationMembersPath,
} from '@protoxyz/api-clients';
import React from 'react';

interface OrganizationMembersListProps extends PaginatedArgs {
  orgId: string | null | undefined;
}

export function membersListCacheKey({
  cursor,
  perPage,
  orgId,
}: OrganizationMembersListProps) {
  return [FrontendListOrganizationMembersPath, orgId, cursor, perPage]
    .filter(Boolean)
    .join(':');
}

export const useProtocolAuthOrganizationMembers = ({
  orgId,
  cursor = null,
  perPage = 10,
}: OrganizationMembersListProps) => {
  const { protocol } = useProtocolAuth();
  const [updatingId, setUpdatingId] = React.useState(null);
  const [updateError, setUpdateError] = React.useState<string>(null);
  const [deletingId, setDeletingId] = React.useState(null);
  const [deleteError, setDeleteError] = React.useState<string>(null);

  const cacheKey = membersListCacheKey({
    orgId,
    cursor,
    perPage,
  });

  const { data, error, isLoading, mutate } =
    useSWR<FrontendListOrganizationMembers200Response>(cacheKey, () =>
      orgId
        ? protocol.auth.organizationMembers.list({
            path: {
              organizationId: orgId,
            },
            query: {
              cursor: cursor?.toString(),
              perPage: perPage.toString(),
            },
          })
        : null,
    );

  const updateMember = React.useCallback(
    async ({ memberId, role }: { memberId: string; role: string }) => {
      setUpdatingId(memberId);
      const response = await protocol.auth.organizationMembers.update({
        path: {
          organizationId: orgId,
          memberId,
        },
        body: {
          role,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setUpdateError(response.error);
      } else {
        mutate();
      }
      setUpdatingId(null);
    },
    [],
  );

  const deleteMember = React.useCallback(
    async ({ memberId }: { memberId: string }) => {
      const response = await protocol.auth.organizationMembers.delete({
        path: {
          organizationId: orgId,
          memberId,
        },
      });
      if (response.status === ResponseStatus.Error) {
        setDeleteError(response.error);
      } else {
        mutate();
      }
      setDeletingId(null);

      return response;
    },
    [],
  );

  return {
    members: data,
    error,
    isLoading,
    updatingId,
    updateMember,
    updateError,
    deletingId,
    deleteMember,
    deleteError,
  };
};
