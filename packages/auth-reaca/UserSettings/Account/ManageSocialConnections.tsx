import { XMarkIcon } from "@heroicons/react/24/solid";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { providers } from "@protoxyz/auth-providers";
import { ResponseStatus, AuthSocialConnectionStatus, SocialConnection } from "@protoxyz/types";
import SocialIcons from "@/components/ui/icons/social";
import { OAuthMode, SocialButton } from "@/components/ui/Social";
import { useProtocolAuth } from "@/providers/protocol";
import { ThemeSocialType } from "@protoxyz/themes";

export function ManageSocialConnections() {
    const { instance, client, theme } = useProtocolAuth();
    const [connections, setConnections] = useState<SocialConnection[]>([]);
    const [deletingConnectionId, setDeletingConnectionId] = useState<string | undefined>();

    async function getConnections() {
        const result = await client.auth.socialConnections.list();

        if (result.status === ResponseStatus.Success) {
            setConnections(result.data);
        }
    }

    async function onAddConnection(connection: SocialConnection) {
        setConnections([...connections, connection]);
    }

    async function deleteConnection(connectionId: string) {
        setDeletingConnectionId(connectionId);
        const result = await client.auth.socialConnections.delete({
            path: {
                connectionId,
            },
        });
        setDeletingConnectionId(undefined);

        if (result.status === ResponseStatus.Success) {
            setConnections(connections.filter((c) => c.id !== connectionId));
        }
    }

    useEffect(() => {
        getConnections();
    }, []);

    return (
        <div className="md:col-span-3">
            <div className="mt-2 flex flex-col gap-y-2">
                {instance?.socialProviders?.map((p) => {
                    const provider = providers[p.providerKey];
                    const connection = connections?.find(
                        (connection) => connection.instanceSocialProvider.providerKey === p.providerKey,
                    );
                    type SocialIconType = keyof typeof SocialIcons;
                    const Icon = SocialIcons[p.providerKey as SocialIconType];

                    if (!connection) {
                        return (
                            <SocialButton
                                key={p.providerKey}
                                type={ThemeSocialType.button}
                                providerKey={p.providerKey}
                                mode={OAuthMode.connection}
                                onAddConnection={onAddConnection}
                            />
                        );
                    }

                    return (
                        <div
                            key={p.providerKey}
                            className={clsx(
                                "flex items-center justify-between",
                                !connection ? "cursor-pointer" : "",
                                theme?.secondaryButtonBgColor,
                                theme?.secondaryButtonBorder,
                                theme?.secondaryButtonBorderColor,
                                theme?.secondaryButtonBorderRadius,
                                theme?.secondaryButtonBoxShadow,
                                theme?.secondaryButtonFontSize,
                                theme?.secondaryButtonFontWeight,
                                theme?.secondaryButtonPaddingHorizontal,
                                theme?.secondaryButtonPaddingVertical,
                                theme?.secondaryButtonTextColor,
                            )}
                        >
                            <div className="flex items-center gap-x-2">
                                <Icon className={clsx("h-4 w-4")} />
                                {provider.name}
                                {connection.status === AuthSocialConnectionStatus.active && (
                                    <span className="text-sm text-green-400">{connection.status}</span>
                                )}
                                {connection.status === AuthSocialConnectionStatus.disconnected && (
                                    <span className="text-sm text-red-400">{connection.status}</span>
                                )}
                                {connection.status === AuthSocialConnectionStatus.created && (
                                    <span className="text-sm text-zinc-400">{connection.status}</span>
                                )}
                            </div>

                            <button onClick={() => deleteConnection(connection.id)}>
                                {deletingConnectionId !== connection.id && <XMarkIcon className="h-4 w-4" />}
                                {deletingConnectionId === connection.id && <Spinner size="xs" />}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
