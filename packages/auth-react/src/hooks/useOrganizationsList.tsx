import { PaginatedArgs } from "@protoxyz/types";
import { useProtocolAuth } from "../contexts/protocol-context";
import useSWR from "swr";
import { ListOrganizations200Response, ListOrganizationsPath, ResponseStatus } from "@protoxyz/core";

function createCacheKey({ userId, cursor, perPage }: PaginatedArgs & { userId?: string }) {
    return [ListOrganizationsPath, userId, cursor, perPage].filter(Boolean).join(":");
}

export const useProtocolAuthOrganizationsList = ({ cursor = null, perPage = 10 }: PaginatedArgs) => {
    const { user, protocol } = useProtocolAuth();

    const cacheKey = createCacheKey({
        userId: user?.id,
        cursor,
        perPage,
    });

    const userOrganizations = user?.organizations ?? [];

    const { data, error, isLoading } = useSWR<ListOrganizations200Response>(
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
                    next: userOrganizations.length > 0 ? userOrganizations[userOrganizations.length - 1].id : null,
                    numPages: 1,
                    perPage: 10,
                    total: userOrganizations.length ?? 0,
                },
                data: userOrganizations,
                status: ResponseStatus.Success,
            },
        },
    );

    return {
        organizations: data,
        error,
        isLoading,
    };
};
