import { useProtocolAuth } from "../../../contexts/protocol-context";
import { RedirectToSignUpProps } from "../../../types/auth";
import { useEffect } from "react";

export function RedirectToSignUp({ redirectUrl, afterSignInUrl, afterSignUpUrl }: RedirectToSignUpProps) {
    const { redirectToSignUp } = useProtocolAuth();
    useEffect(() => {
        redirectToSignUp({ redirectUrl, afterSignInUrl, afterSignUpUrl });
    }, []);
}
