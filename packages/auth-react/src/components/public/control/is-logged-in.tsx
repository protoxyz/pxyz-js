"use client";
import { useProtocolAuth } from "../../../contexts/protocol-context";

export interface IsLoggedInProps {
    children?: React.ReactNode;
}
export function IsLoggedIn({ children }: IsLoggedInProps): JSX.Element | null {
    const { user } = useProtocolAuth();

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
