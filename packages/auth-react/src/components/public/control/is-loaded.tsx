import { useProtocolAuth } from "../../../contexts/protocol-context";

export interface IsLoaded {
    children?: React.ReactNode;
}
export function IsLoaded({ children }: IsLoaded): JSX.Element | null {
    const { loaded } = useProtocolAuth();

    if (!loaded) {
        return null;
    }

    return <>{children}</>;
}
