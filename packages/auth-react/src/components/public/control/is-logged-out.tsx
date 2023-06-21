"use client";
import { useProtocolAuth } from "../../../contexts/protocol-context";

export interface IsLoggedOutProps {
    children?: React.ReactNode;
}
export function IsLoggedOut({ children }: IsLoggedOutProps) {
    const { user } = useProtocolAuth();

    if (user) {
        return null;
    }

    return <>{children}</>;
}
