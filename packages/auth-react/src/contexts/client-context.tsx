"use client";
import { SignInAttempt, SignUpAttempt } from "@protoxyz/types";
import { createContext, useContext } from "react";

export interface ProtocolAuthClientContextState {
    signIn: SignInAttempt | null;
    signUp: SignUpAttempt | null;

    setSignIn: (attempt: SignInAttempt) => void;
    setSignUp: (attempt: SignUpAttempt) => void;
}

export const ProtocolAuthClientContext = createContext<ProtocolAuthClientContextState>({
    signIn: null,
    signUp: null,
    setSignIn: (attempt: SignInAttempt) => {
        throw new Error("Not implemented");
    },
    setSignUp: (attempt: SignUpAttempt) => {
        throw new Error("Not implemented");
    },
});

export function ProtocolAuthClientProvider({
    children,
    clientState,
}: {
    children?: React.ReactNode;
    clientState: ProtocolAuthClientContextState;
}) {
    return (
        <ProtocolAuthClientContext.Provider
            value={{
                ...clientState,
            }}
        >
            {children}
        </ProtocolAuthClientContext.Provider>
    );
}

export function useProtocolAuthClient() {
    const context = useContext(ProtocolAuthClientContext);
    if (context === undefined) {
        throw new Error("useProtocolAuthClient must be used within a ProtocolAuthClientProvider");
    }
    return context;
}

export const useProtocolAuthSignInClient = () => {
    const ctx = useContext(ProtocolAuthClientContext);

    if (!ctx) {
        throw new Error("useProtocolAuthSignInClient must be used within a ProtocolAuthClientProvider");
    }

    return ctx.signIn;
};

export const useProtocolAuthSignUpClient = () => {
    const ctx = useContext(ProtocolAuthClientContext);

    if (!ctx) {
        throw new Error("useProtocolAuthSignUpClient must be used within a ProtocolAuthClientProvider");
    }

    return ctx.signUp;
};
