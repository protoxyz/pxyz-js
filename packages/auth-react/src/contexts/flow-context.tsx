"use client";
import React from "react";

export enum SignInFlowRoute {
    "signIn" = "signIn",
    "signIn:verifyFirstFactor" = "signIn:verifyFirstFactor",
    "signIn:verifySecondFactor" = "signIn:verifySecondFactor",
    "signIn:success" = "signIn:success",
    "signIn:forgotPassword" = "signIn:forgotPassword",
    "signIn:resetPassword" = "signIn:resetPassword",
    "signIn:resetPasswordSuccess" = "signIn:resetPasswordSuccess",
}

export enum SignUpFlowRoute {
    "signUp" = "signUp",
    "signUp:verifyEmail" = "signUp:verifyEmail",
    "signUp:veriyPhone" = "signUp:verifyPhone",
    "signUp:additionalFields" = "signUp:additionalFields",
    "signUp:success" = "signUp:success",
}

export interface ProtocolAuthFlowContextState {
    signIn: {
        route: SignInFlowRoute;
        setRoute: (route: SignInFlowRoute) => void;
    };

    signUp: {
        route: SignUpFlowRoute;
        setRoute: (route: SignUpFlowRoute) => void;
    };
}

const initialState: ProtocolAuthFlowContextState = {
    signIn: {
        route: SignInFlowRoute.signIn,
        setRoute: (route: SignInFlowRoute) => {
            throw new Error("Not implemented" + route.toString());
        },
    },
    signUp: {
        route: SignUpFlowRoute.signUp,
        setRoute: (route: SignUpFlowRoute) => {
            throw new Error("Not implemented" + route.toString());
        },
    },
};

export const ProtocolAuthFlowContext = React.createContext<ProtocolAuthFlowContextState>({ ...initialState });

export function ProtocolAuthFlowProvider({
    children,
    routeState,
}: {
    children?: React.ReactNode;
    routeState: ProtocolAuthFlowContextState;
}) {
    return (
        <ProtocolAuthFlowContext.Provider
            value={{
                ...routeState,
            }}
        >
            {children}
        </ProtocolAuthFlowContext.Provider>
    );
}

export const useProtocolAuthFlow = () => {
    const ctx = React.useContext(ProtocolAuthFlowContext);

    if (!ctx) {
        throw new Error("useProtocolAuthFlow must be used within a ProtocolAuthFlowProvider");
    }

    return ctx;
};

export const useProtocolAuthSignInFlow = () => {
    const ctx = React.useContext(ProtocolAuthFlowContext);

    if (!ctx) {
        throw new Error("useProtocolAuthSignInFlow must be used within a ProtocolAuthFlowProvider");
    }

    return ctx.signIn;
};

export const useProtocolAuthSignUpFlow = () => {
    const ctx = React.useContext(ProtocolAuthFlowContext);

    if (!ctx) {
        throw new Error("useProtocolAuthSignUpFlow must be used within a ProtocolAuthFlowProvider");
    }

    return ctx.signUp;
};
