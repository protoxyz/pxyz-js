import { ProtocolAuthProvider } from "@protoxyz/auth-react";
import { Protocol } from "@protoxyz/core";
import { AuthAppearance } from "@protoxyz/themes";
import { AuthInstance, ResponseStatus } from "@protoxyz/types";
import { getAuth, getUser } from "./getUser";

interface ProtocolAuthProviderRSCProps {
    children: React.ReactNode;
    domain?: string;
    publicKey?: string;
    appearance?: AuthAppearance;
}

export async function ProtocolAuthProviderRSC({
    children,
    domain,
    publicKey,
    appearance,
}: ProtocolAuthProviderRSCProps) {
    const resolvedDomain = domain ?? process.env.PXYZ_AUTH_DOMAIN ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN ?? "";
    const resolvedPublicKey =
        publicKey ?? process.env.PXYZ_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY ?? "";

    if (!resolvedDomain) throw new Error("No domain provided in ProtocolAuthProvider");
    if (!resolvedPublicKey) throw new Error("No public key provided in ProtocolAuthProvider");

    const protocolClient = new Protocol({
        debug: process.env.NODE_ENV !== "production",
        baseUrl: resolvedDomain,
    });

    let instance: AuthInstance | undefined;

    try {
        const result = await protocolClient.auth.instances.getByPublicKey({
            path: { publicKey: resolvedPublicKey },
        });
        if (result.status !== ResponseStatus.Success) {
            throw new Error("Could not retrieve instance: pkey=" + resolvedPublicKey + " domain=" + resolvedDomain);
        }
        instance = result.data.instance;
    } catch (e) {
        console.log("ERROR!!!!!");
        console.log(e);
    }

    const sessionUser = await getAuth({});

    const user = await getUser({
        domain: resolvedDomain,
        publicKey: resolvedPublicKey,
    });

    return (
        <ProtocolAuthProvider
            appearance={appearance}
            domain={resolvedDomain}
            publicKey={resolvedPublicKey}
            instance={instance}
            user={user}
            sessionId={sessionUser?.sessionId}
            orgId={sessionUser?.orgId}
            orgRole={sessionUser?.orgRole}
        >
            {children}
        </ProtocolAuthProvider>
    );
}
