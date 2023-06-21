import React from "react";
import { useProtocolAuthClient } from "../contexts/client-context";
import { SignInFlowRoute, SignUpFlowRoute, useProtocolAuthFlow } from "../contexts/flow-context";
import { useProtocolAuth } from "../contexts/protocol-context";

interface UseProtocolAuthLogoutProps {
    afterSignOutUrl?: string;
}
export function useProtocolAuthLogout(
    { afterSignOutUrl }: UseProtocolAuthLogoutProps = {
        afterSignOutUrl: "/",
    },
) {
    const { setSignIn: setClientSignIn, setSignUp: setClientSignUp } = useProtocolAuthClient();
    const { signIn, signUp } = useProtocolAuthFlow();
    const { protocol } = useProtocolAuth();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            await protocol.auth.sessions.end();

            setClientSignIn(null);
            setClientSignUp(null);

            signIn.setRoute(SignInFlowRoute.signIn);
            signUp.setRoute(SignUpFlowRoute.signUp);
        } catch (error) {
            console.error(error);
        }
        setIsLoggingOut(false);
        window.location.href = afterSignOutUrl;
    };

    return { isLoggingOut, logout };
}
