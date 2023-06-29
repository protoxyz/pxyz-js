import { RedirectToSignInProps, RedirectToSignUpProps } from "../types/auth";
import { Protocol } from "@protoxyz/core";
import { AuthAppearance, AuthComponentType } from "@protoxyz/themes";
import { AuthInstance, OrganizationWithRole, SessionUser, UserProfile } from "@protoxyz/types";
import React from "react";

export interface ProtocolAuthProviderState {
    protocol: Protocol;
    loaded: boolean;
    instance: AuthInstance | null;
    domain: string;
    publicKey: string;

    appearance: AuthAppearance;

    user: UserProfile | null;
    userId: string | null;
    org: OrganizationWithRole | null;
    orgId: string | null;
    orgRole: string | null;
    session: SessionUser | null;
    sessionId: string | null;
}

export interface ProtocolAuthContextState {
    state: ProtocolAuthProviderState;
    setState: React.Dispatch<React.SetStateAction<ProtocolAuthProviderState>>;
}

export const ProtocolAuthContext = React.createContext({});

export interface ProtocolAuthSettersState {
    navigate: (url: string) => void;
    redirectToUserProfile?: () => void;
    redirectToSignIn?: (props?: RedirectToSignInProps) => void;
    redirectToSignUp?: (props?: RedirectToSignUpProps) => void;
}

export const ProtocolAuthSettersContext = React.createContext<ProtocolAuthSettersState>({
    navigate: (url: string) => {
        window.location.href = url ?? "/";
    },
    redirectToUserProfile: () => {
        throw new Error("redirectToUserProfile must be implemented");
    },
    redirectToSignIn: (props?: RedirectToSignInProps) => {
        throw new Error("redirectToSignIn must be implemented" + props?.toString());
    },
    redirectToSignUp: (props?: RedirectToSignUpProps) => {
        throw new Error("redirectToSignUp must be implemented" + props?.toString());
    },
});

export function useProtocolAuth() {
    const authCtx = React.useContext(ProtocolAuthContext) as ProtocolAuthContextState;
    const settersCtx = React.useContext(ProtocolAuthSettersContext) as ProtocolAuthSettersState;

    if (!authCtx || !settersCtx) {
        throw new Error("useProtocolAuth must be used within a ProtocolAuthProvider");
    }

    return {
        setState: authCtx?.setState,
        publicKey: authCtx?.state?.publicKey,
        domain: authCtx?.state?.domain,
        protocol: authCtx?.state?.protocol,
        loaded: authCtx?.state?.loaded,
        user: authCtx?.state?.user,
        userId: authCtx?.state?.userId,
        instance: authCtx?.state?.instance,
        org: authCtx?.state?.org,
        orgId: authCtx?.state?.orgId,
        orgRole: authCtx?.state?.orgRole,
        session: authCtx?.state?.session,
        sessionId: authCtx?.state?.sessionId,
        redirectToUserProfile: settersCtx?.redirectToUserProfile,
        redirectToSignIn: settersCtx?.redirectToSignIn,
        redirectToSignUp: settersCtx?.redirectToSignUp,
        navigate: settersCtx?.navigate,
    };
}

export function useProtocolAuthInstance() {
    const ctx = React.useContext(ProtocolAuthContext) as ProtocolAuthContextState;

    if (!ctx) {
        throw new Error("useProtocolAuthInstance must be used within a ProtocolAuthProvider");
    }

    return { instance: ctx?.state?.instance };
}

export function useProtocolAuthAppearance({ component }: { component: AuthComponentType }) {
    const ctx = React.useContext(ProtocolAuthContext) as ProtocolAuthContextState;

    if (!ctx) {
        throw new Error("useProtocolAuthAppearance must be used within a ProtocolAuthProvider");
    }

    // const appearance = getMergedTheme({ appearance: ctx?.state?.appearance, component });

    return { appearance: ctx?.state?.appearance };
}
