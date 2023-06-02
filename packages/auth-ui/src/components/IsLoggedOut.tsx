import { useProtocolAuth } from "@protoxyz/auth-react";

export interface IsLoggedOutProps {
    children?: React.ReactNode;
}
export function IsLoggedOut({ children }: IsLoggedOutProps) {
    const { user, isUserLoaded } = useProtocolAuth();

    if (user && isUserLoaded) {
        return null;
    }

    return <>{children}</>;
}
