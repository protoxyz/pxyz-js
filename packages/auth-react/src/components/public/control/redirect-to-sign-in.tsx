"use client";
import { useProtocolAuth } from "../../../contexts/protocol-context";
import { RedirectToSignInProps } from "../../../types/auth";
import { useEffect } from "react";

export function RedirectToSignIn({ redirectUrl, afterSignInUrl, afterSignUpUrl }: RedirectToSignInProps) {
    const { redirectToSignIn } = useProtocolAuth();

    useEffect(() => {
        redirectToSignIn({ redirectUrl, afterSignInUrl, afterSignUpUrl });
    }, []);
}
