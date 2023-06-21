"use client";
import { RedirectToSignInProps, RedirectToSignUpProps } from "../types/auth";
import { Protocol } from "@protoxyz/core";
import { AuthAppearance, AuthComponentType, getMergedTheme } from "@protoxyz/themes";
import { AuthInstance, UserProfile } from "@protoxyz/types";
import React from "react";

export interface ProtocolAuthProviderState {
    protocol: Protocol;
    loaded: boolean;
    instance: AuthInstance | null;
    domain: string;
    publicKey: string;

    appearance: AuthAppearance;

    user: UserProfile | null;
    // organization: Organization | null;
    // session: Session | null;
}

export interface ProtocolAuthContextState {
    state: ProtocolAuthProviderState;
    setState: React.Dispatch<React.SetStateAction<ProtocolAuthProviderState>>;
}

export const ProtocolAuthContext = React.createContext({});

export interface ProtocolAuthSettersState {
    navigate: (url: string) => void;
    redirectToUserProfile: () => void;
    redirectToSignIn: (props?: RedirectToSignInProps) => void;
    redirectToSignUp: (props?: RedirectToSignUpProps) => void;
}

export const ProtocolAuthSettersContext = React.createContext<ProtocolAuthSettersState>({
    navigate: (url: string) => {
        throw new Error("navigate must be implemented" + url.toString());
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
        publicKey: authCtx?.state?.publicKey,
        domain: authCtx?.state?.domain,
        protocol: authCtx?.state?.protocol,
        loaded: authCtx?.state?.loaded,
        user: authCtx?.state?.user,
        instance: authCtx?.state?.instance,
        // organization: authCtx?.state?.organization,
        // session: authCtx?.state?.session,
        redirectToUserProfile: settersCtx?.redirectToUserProfile,
        redirectToSignIn: settersCtx?.redirectToSignIn,
        redirectToSignUp: settersCtx?.redirectToSignUp,
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

    const appearance = getMergedTheme({ appearance: ctx?.state?.appearance, component });

    return { appearance };
}

// import {
//     AttemptSignInAttemptFirstFactorOptions,
//     AttemptSignInAttemptSecondFactorOptions,
//     AttemptSignUpAttemptVerificationOptions,
//     CreateSignInAttemptOptions,
//     CreateSignUpAttemptOptions,
//     PrepareSignInAttemptFirstFactorOptions,
//     PrepareSignInAttemptSecondFactorOptions,
//     PrepareSignUpAttemptVerificationOptions,
//     Protocol,
//     UpdateUserProfileOptions,
// } from "@protoxyz/core";
// import { LOCAL_STORAGE_KEY } from "../constants";
// import React from "react";

// import {
//     AuthInstance,
//     AuthVerificationStrategy,
//     SignInAttempt,
//     SignUpAttempt,
//     ThemeProperties,
//     UserProfile,
// } from "@protoxyz/types";

// export type Error = {
//     error?: string | null | undefined;
// };

// export interface OpenSignInProps {
//     redirectUrl?: string;
//     afterSignInUrl?: string;
//     afterSignUpUrl?: string;
// }

// export interface OpenSignUpProps {
//     redirectUrl?: string;
//     afterSignInUrl?: string;
//     afterSignUpUrl?: string;
// }

// export interface RedirectToSignInProps {
//     redirectUrl?: string;
//     afterSignInUrl?: string;
//     afterSignUpUrl?: string;
// }

// export interface RedirectToSignUpProps {
//     redirectUrl?: string;
//     afterSignInUrl?: string;
//     afterSignUpUrl?: string;
// }

// export const initialState = {
//     theme: {
//         primaryColor: "#FF0000",
//     } as ThemeProperties,

//     baseTheme: {} as ThemeProperties,

//     client: null as unknown as Protocol,
//     isLoaded: false,
//     isLoading: false,
//     publicKey: "" as string | undefined,
//     domain: "" as string | undefined,
//     instance: null as AuthInstance | null | undefined,

//     isCreatingSignInAttempt: false,
//     isCreatingOAuthSignInAttempt: false,
//     oauthSignInAttemptProvider: null as string | null | undefined,
//     signInError: null as Error | null | undefined,
//     isPreparingSignInFirstFactor: false,
//     isAttemptingSignInFirstFactor: false,
//     isPreparingSignInSecondFactor: false,
//     isAttemptingSignInSecondFactor: false,
//     signInAttempt: null as SignInAttempt | null | undefined,

//     isCreatingSignUpAttempt: false,
//     isCreatingOAuthSignUpAttempt: false,
//     oauthSignUpAttemptProvider: null as string | null | undefined,
//     signUpError: null as Error | null | undefined,
//     isPreparingSignUpVerification: false,
//     isAttemptingSignUpVerification: false,
//     signUpAttempt: null as SignUpAttempt | null | undefined,

//     isUpdatingUser: false,
//     updateUserError: null as Error | null | undefined,

//     user: null as UserProfile | null | undefined,
//     isUserLoading: false as boolean,
//     isUserLoaded: false as boolean,
//     userLoadingError: null as Error | null | undefined,

//     openSignIn: async (opts: OpenSignInProps): Promise<void> => {
//         throw new Error("openSignIn not implemented");
//     },
//     openSignUp: async (opts: OpenSignUpProps): Promise<void> => {
//         throw new Error("openSignUp not implemented");
//     },
//     redirectToSignIn: async (opts: RedirectToSignInProps): Promise<void> => {
//         throw new Error("redirectToSignIn not implemented");
//     },
//     redirectToSignUp: async (opts: RedirectToSignUpProps): Promise<void> => {
//         throw new Error("redirectToSignUp not implemented");
//     },

//     refetchUser: async (): Promise<void> => {
//         throw new Error("refetchUser not implemented");
//     },
//     updateUser: async (input: UpdateUserProfileOptions["body"]): Promise<void> => {
//         throw new Error("updateUser not implemented");
//     },
//     resetSignInState: async (): Promise<void> => {
//         throw new Error("resetSignInState not implemented");
//     },
//     resetSignUpState: async (): Promise<void> => {
//         throw new Error("resetSignUpState not implemented");
//     },
//     setUser: (user: UserProfile) => {
//         throw new Error("setUser not implemented");
//     },
//     createSignInAttempt: async (input: CreateSignInAttemptOptions["body"]): Promise<void> => {
//         throw new Error("createSignInAttempt not implemented");
//     },
//     createSignUpAttempt: async (input: CreateSignUpAttemptOptions["body"]): Promise<void> => {
//         throw new Error("createSignUpAttempt not implemented");
//     },
//     prepareSignInFirstFactor: async (input: PrepareSignInAttemptFirstFactorOptions["body"]): Promise<void> => {
//         throw new Error("prepareSignInFirstFactor not implemented");
//     },
//     attemptSignInFirstFactor: async (input: AttemptSignInAttemptFirstFactorOptions["body"]): Promise<void> => {
//         throw new Error("attemptSignInFirstFactor not implemented");
//     },
//     prepareSignInSecondFactor: async (input: PrepareSignInAttemptSecondFactorOptions["body"]): Promise<void> => {
//         throw new Error("prepareSignInSecondFactor not implemented");
//     },
//     attemptSignInSecondFactor: async (input: AttemptSignInAttemptSecondFactorOptions["body"]): Promise<void> => {
//         throw new Error("attemptSignInSecondFactor not implemented");
//     },
//     prepareSignUpVerification: async (input: PrepareSignUpAttemptVerificationOptions["body"]): Promise<void> => {
//         throw new Error("prepareSignUpVerification not implemented");
//     },
//     attemptSignUpVerification: async (input: AttemptSignUpAttemptVerificationOptions["body"]): Promise<void> => {
//         throw new Error("attemptSignUpVerification not implemented");
//     },
//     logout: async (): Promise<void> => {
//         throw new Error("logout not implemented");
//     },
//     setPublicKey: (publicKey: string) => {
//         throw new Error("setPublicKey not implemented");
//     },
//     setInstance: (instance: AuthInstance) => {
//         throw new Error("setInstance not implemented");
//     },
// };

// export type State = typeof initialState;

// export type ActionSetStateFromLocalStorage = { type: "setStateFromLocalStorage"; payload: State };
// export type ActionSetPublicKey = { type: "setPublicKey"; payload: string };
// export type ActionSetInstance = { type: "setInstance"; payload: AuthInstance };
// export type ActionSetLoaded = { type: "setLoaded"; payload: boolean };
// export type ActionSetLoading = { type: "setLoading"; payload: boolean };
// export type ActionSetCreatingSignInAttempt = {
//     type: "setCreatingSignInAttempt";
//     payload: CreateSignInAttemptOptions["body"];
// };
// export type ActionSetCreatingSignUpAttempt = {
//     type: "setCreatingSignUpAttempt";
//     payload: CreateSignUpAttemptOptions["body"];
// };
// export type ActionSetSignInAttempt = { type: "setSignInAttempt"; payload: SignInAttempt | null };
// export type ActionSetSignUpAttempt = { type: "setSignUpAttempt"; payload: SignUpAttempt | null };
// export type ActionSetSignInError = { type: "setSignInError"; payload: Error | null };
// export type ActionSetSignUpError = { type: "setSignUpError"; payload: Error | null };
// export type ActionSetPreparingSignInFirstFactor = { type: "setPreparingSignInFirstFactor"; payload: boolean };
// export type ActionSetAttemptingSignInFirstFactor = { type: "setAttemptingSignInFirstFactor"; payload: boolean };
// export type ActionSetPreparingSignInSecondFactor = { type: "setPreparingSignInSecondFactor"; payload: boolean };
// export type ActionSetAttemptingSignInSecondFactor = { type: "setAttemptingSignInSecondFactor"; payload: boolean };
// export type ActionSetPreparingSignUpVerification = { type: "setPreparingSignUpVerification"; payload: boolean };
// export type ActionSetAttemptingSignUpVerification = { type: "setAttemptingSignUpVerification"; payload: boolean };
// export type ActionSetUser = { type: "setUser"; payload: UserProfile };
// export type ActionSetUserLoading = { type: "setUserLoading"; payload: boolean };
// export type ActionSetUserLoaded = { type: "setUserLoaded"; payload: boolean };
// export type ActionSetUserLoadingError = { type: "setUserLoadingError"; payload: Error };
// export type ActionLogout = { type: "logout" };
// export type ActionSuccessfulLogin = { type: "successfulLogin" };
// export type ActionSuccessfulSignup = { type: "successfulSignup" };
// export type ActionResetSignInState = { type: "resetSignInState" };
// export type ActionResetSignUpState = { type: "resetSignUpState" };
// export type ActionSetUpdatingUser = { type: "setUpdatingUser"; payload: boolean };
// export type ActionSetUpdateUserError = { type: "setUpdateUserError"; payload: Error | null };

// export type Action =
//     | ActionSetPublicKey
//     | ActionSetInstance
//     | ActionSetLoaded
//     | ActionSetLoading
//     | ActionSetCreatingSignInAttempt
//     | ActionSetSignInAttempt
//     | ActionSetSignInError
//     | ActionSetPreparingSignInFirstFactor
//     | ActionSetAttemptingSignInFirstFactor
//     | ActionSetPreparingSignInSecondFactor
//     | ActionSetAttemptingSignInSecondFactor
//     | ActionSetUser
//     | ActionSetUserLoading
//     | ActionSetUserLoaded
//     | ActionSetUserLoadingError
//     | ActionLogout
//     | ActionSetStateFromLocalStorage
//     | ActionSuccessfulLogin
//     | ActionSetCreatingSignUpAttempt
//     | ActionSetSignUpAttempt
//     | ActionSetSignUpError
//     | ActionSetPreparingSignUpVerification
//     | ActionSetAttemptingSignUpVerification
//     | ActionSuccessfulSignup
//     | ActionResetSignInState
//     | ActionResetSignUpState
//     | ActionSetUpdatingUser
//     | ActionSetUpdateUserError;

// export const reducer = (state: State, action: Action): State => {
//     switch (action.type) {
//         case "resetSignInState":
//             return {
//                 ...state,
//                 isCreatingOAuthSignInAttempt: false,
//                 isCreatingSignInAttempt: false,
//                 isPreparingSignInFirstFactor: false,
//                 isAttemptingSignInFirstFactor: false,
//                 isPreparingSignInSecondFactor: false,
//                 isAttemptingSignInSecondFactor: false,
//                 oauthSignInAttemptProvider: null,
//                 signInAttempt: null,
//                 signInError: null,
//             };
//         case "resetSignUpState":
//             return {
//                 ...state,
//                 isPreparingSignUpVerification: false,
//                 isAttemptingSignUpVerification: false,
//                 oauthSignUpAttemptProvider: null,
//                 isCreatingSignUpAttempt: false,
//                 isCreatingOAuthSignUpAttempt: false,
//                 signUpAttempt: null,
//                 signUpError: null,
//             };
//         case "setStateFromLocalStorage":
//             return { ...state, ...action.payload };
//         case "setPublicKey":
//             return { ...state, publicKey: action.payload };
//         case "setInstance":
//             // let theme = mergeThemeCustomizationsAndBase(action.payload.theme, initialState.baseTheme);

//             // const theme = { properties: { ...action.payload.theme.properties, ...initialState.baseTheme } };

//             return { ...state, instance: action.payload, isLoaded: true, isLoading: false };
//         case "setLoaded":
//             return { ...state, isLoaded: action.payload };
//         case "setLoading":
//             return { ...state, isLoading: action.payload };
//         case "setCreatingSignInAttempt":
//             return {
//                 ...state,
//                 isCreatingSignInAttempt: action.payload.strategy === AuthVerificationStrategy.oauth ? false : true,
//                 isCreatingOAuthSignInAttempt: action.payload.strategy === AuthVerificationStrategy.oauth ? true : false,
//                 oauthSignInAttemptProvider:
//                     action.payload.strategy === AuthVerificationStrategy.oauth ? action.payload.providerKey : null,
//             };
//         case "setCreatingSignUpAttempt":
//             return {
//                 ...state,
//                 isCreatingSignUpAttempt: action.payload.strategy === AuthVerificationStrategy.oauth ? false : true,
//                 isCreatingOAuthSignUpAttempt: action.payload.strategy === AuthVerificationStrategy.oauth ? true : false,
//                 oauthSignUpAttemptProvider:
//                     action.payload.strategy === AuthVerificationStrategy.oauth ? action.payload.providerKey : null,
//             };
//         case "setSignInAttempt":
//             return { ...state, signInAttempt: action.payload, isCreatingSignInAttempt: false, signInError: null };
//         case "setSignUpAttempt":
//             return { ...state, signUpAttempt: action.payload, isCreatingSignUpAttempt: false, signUpError: null };
//         case "setSignInError":
//             return {
//                 ...state,
//                 signInError: action.payload,
//                 isCreatingSignInAttempt: false,
//                 isPreparingSignInFirstFactor: false,
//                 isAttemptingSignInFirstFactor: false,
//                 isPreparingSignInSecondFactor: false,
//                 isAttemptingSignInSecondFactor: false,
//             };
//         case "setSignUpError":
//             return {
//                 ...state,
//                 signUpError: action.payload,
//                 isCreatingSignUpAttempt: false,
//                 isPreparingSignUpVerification: false,
//                 isAttemptingSignUpVerification: false,
//             };
//         case "setPreparingSignInFirstFactor":
//             return { ...state, isPreparingSignInFirstFactor: action.payload };
//         case "setAttemptingSignInFirstFactor":
//             return { ...state, isAttemptingSignInFirstFactor: action.payload };
//         case "setPreparingSignInSecondFactor":
//             return { ...state, isPreparingSignInSecondFactor: action.payload };
//         case "setAttemptingSignInSecondFactor":
//             return { ...state, isAttemptingSignInSecondFactor: action.payload };
//         case "setPreparingSignUpVerification":
//             return { ...state, isPreparingSignUpVerification: action.payload };
//         case "setAttemptingSignUpVerification":
//             return { ...state, isAttemptingSignUpVerification: action.payload };
//         case "setUser":
//             return { ...state, user: action.payload, isUserLoading: false, isUserLoaded: true, userLoadingError: null };
//         case "setUserLoading":
//             return { ...state, isUserLoading: action.payload };
//         case "setUserLoaded":
//             return { ...state, isUserLoaded: action.payload };
//         case "setUserLoadingError":
//             return { ...state, userLoadingError: action.payload, isUserLoading: false, isUserLoaded: false };
//         case "setUpdatingUser":
//             return { ...state, isUpdatingUser: action.payload };
//         case "setUpdateUserError":
//             return { ...state, updateUserError: action.payload };

//         case "logout":
//             return {
//                 ...state,
//                 user: null,
//                 isUserLoading: false,
//                 isUserLoaded: true,
//                 userLoadingError: null,
//                 signInAttempt: null,

//                 isCreatingSignInAttempt: false,
//                 isCreatingOAuthSignInAttempt: false,
//                 oauthSignInAttemptProvider: null,
//                 signInError: null,

//                 isPreparingSignInFirstFactor: false,
//                 isAttemptingSignInFirstFactor: false,
//                 isPreparingSignInSecondFactor: false,
//                 isAttemptingSignInSecondFactor: false,

//                 isCreatingSignUpAttempt: false,
//                 isCreatingOAuthSignUpAttempt: false,
//                 oauthSignUpAttemptProvider: null,
//                 signUpAttempt: null,
//                 signUpError: null,
//             };
//         case "successfulLogin":
//             return {
//                 ...state,
//                 isPreparingSignInFirstFactor: false,
//                 isAttemptingSignInFirstFactor: false,
//                 isPreparingSignInSecondFactor: false,
//                 isAttemptingSignInSecondFactor: false,
//                 isCreatingSignInAttempt: false,
//                 isCreatingOAuthSignInAttempt: false,
//                 oauthSignInAttemptProvider: null,

//                 signInError: null,
//                 signInAttempt: null,
//             };
//         case "successfulSignup":
//             return {
//                 ...state,
//                 isPreparingSignUpVerification: false,
//                 isAttemptingSignUpVerification: false,
//                 isCreatingSignUpAttempt: false,
//                 isCreatingOAuthSignUpAttempt: false,
//                 oauthSignUpAttemptProvider: null,

//                 signUpError: null,
//                 signUpAttempt: null,
//             };
//         default:
//             return state;
//     }
// };

// export const persistReducer = (reducer: (state: State, action: Action) => State) => {
//     return (state: State, action: Action) => {
//         const newState = reducer(state, action);
//         if (action.type !== "setStateFromLocalStorage") {
//             const { client, ...stateWithoutClient } = newState;
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateWithoutClient));
//         }
//         return newState;
//     };
// };

// export type ProtocolAuthContextType = typeof initialState;
// export const ProtocolAuthContext = React.createContext<ProtocolAuthContextType>({ ...initialState });
