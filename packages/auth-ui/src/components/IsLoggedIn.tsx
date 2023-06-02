import { useProtocolAuth } from "@protoxyz/auth-react";

export interface IsLoggedInProps {
    children?: React.ReactNode;
}
export function IsLoggedIn({ children }: IsLoggedInProps): JSX.Element | null {
    const { user, isUserLoaded } = useProtocolAuth();

    if (!user || !isUserLoaded) {
        return null;
    }

    return <>{children}</>;
}
