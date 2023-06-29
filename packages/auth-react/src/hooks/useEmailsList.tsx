import { ResponseStatus, PaginatedArgs } from "@protoxyz/types";
import { useProtocolAuth } from "../contexts/protocol-context";
import useSWR from "swr";
import { CreateEmailAddressOptions, ListEmailAddresses200Response, ListEmailAddressesPath } from "@protoxyz/core";
import { useCallback, useState } from "react";

export function emailsListCacheKey({ cursor, perPage, userId }: PaginatedArgs & { userId?: string }) {
    return [ListEmailAddressesPath, userId, cursor, perPage].filter(Boolean).join(":");
}

export const useProtocolAuthEmailsList = ({ cursor = null, perPage = 10 }: PaginatedArgs) => {
    const { user, protocol, navigate } = useProtocolAuth();
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string>(null);
    const [deletingId, setDeletingId] = useState<string>(null);
    const [deleteError, setDeleteError] = useState<string>(null);

    const cacheKey = emailsListCacheKey({
        userId: user?.id,
        cursor,
        perPage,
    });

    const userEmails = user?.emailAddresses ?? [];

    const { data, error, isLoading, mutate } = useSWR<ListEmailAddresses200Response>(
        cacheKey,
        () =>
            protocol.auth.emailAddresses.list({
                query: {
                    cursor,
                    perPage: perPage.toString(),
                },
            }),
        {
            fallbackData: {
                meta: {
                    count: userEmails.length,
                    next: userEmails.length > 0 ? userEmails[userEmails.length - 1].id : null,
                    numPages: 1,
                    perPage: 10,
                    total: userEmails.length ?? 0,
                },
                data: userEmails,
                status: ResponseStatus.Success,
            },
        },
    );

    const createEmail = useCallback(async ({ email }: CreateEmailAddressOptions["body"]) => {
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
    }, []);

    const deleteEmail = useCallback(
        async ({ id, afterDeleteUri, onDelete }: { id: string; afterDeleteUri?: string; onDelete?: () => void }) => {
            setDeletingId(id);
            const response = await protocol.auth.emailAddresses.delete({
                path: {
                    emailId: id,
                },
            });
            if (response.status === ResponseStatus.Success) {
                mutate();
                navigate(afterDeleteUri ?? "/");
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
    };
};
