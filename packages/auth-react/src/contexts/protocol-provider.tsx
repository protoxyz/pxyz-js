import { ProtocolAuthContext, ProtocolAuthProviderState } from "./protocol-context";
import { Protocol } from "@protoxyz/core";
import React, { useEffect } from "react";
import { AuthAppearance, mergeAppearance } from "@protoxyz/themes";
import {
    AuthInstance,
    OrganizationWithRole,
    SessionUser,
    SignInAttempt,
    SignUpAttempt,
    UserProfile,
} from "@protoxyz/types";
import { IsLoaded } from "../components/public/control/is-loaded";
import {
    ProtocolAuthFlowContextState,
    ProtocolAuthFlowProvider,
    SignInFlowRoute,
    SignUpFlowRoute,
} from "./flow-context";
import { ProtocolAuthClientContextState, ProtocolAuthClientProvider } from "./client-context";
import { Variables } from "../components/custom-ui/variables";

const initialState = {
    instance: null,
    appearance: {},
    user: null,
    loaded: false,
    session: null,
    sessionId: null,
    org: null,
    orgId: null,
    orgRole: null,
};

export interface ProtocolAuthProviderProps {
    instance?: AuthInstance | null;
    user?: UserProfile | null;
    userId?: string | null;
    org?: OrganizationWithRole | null;
    orgId?: string | null;
    orgRole?: string | null;
    session?: SessionUser | null;
    sessionId?: string | null;
    children?: React.ReactNode;
    publicKey?: string;
    domain?: string;
    appearance?: AuthAppearance;
    navigate?: (url: string) => void;
}

export function ProtocolAuthProvider({
    children,
    domain,
    publicKey,
    instance,
    user,
    userId,
    org,
    orgId,
    orgRole,
    session,
    sessionId,
    appearance,
}: ProtocolAuthProviderProps) {
    /*
     * This is the flow state. It is used to store the current flow route and the function to update it
     */
    const [routeState, setRouteState] = React.useState<ProtocolAuthFlowContextState>({
        signIn: {
            route: SignInFlowRoute.signIn,
            setRoute: (route: SignInFlowRoute) => {
                setRouteState((state) => ({
                    ...state,
                    signIn: {
                        ...state.signIn,
                        route,
                    },
                }));
            },
        },
        signUp: {
            route: SignUpFlowRoute.signUp,
            setRoute: (route: SignUpFlowRoute) => {
                setRouteState((state) => ({
                    ...state,
                    signUp: {
                        ...state.signUp,
                        route,
                    },
                }));
            },
        },
    });

    /*
     * This is the protocol state. It is used to store the protocol instance, the appearance data, and the protocol client
     */
    const [state, setState] = React.useState<ProtocolAuthProviderState>({
        ...initialState,
        loaded: instance ? true : false,
        instance,
        user,
        userId,
        org,
        orgId,
        orgRole,
        session,
        sessionId,
        appearance: mergeAppearance({
            appearance,
        }),
        domain: domain ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN ?? "",
        publicKey: publicKey ?? process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY ?? "",
        protocol: new Protocol({
            credentials: true,
            baseUrl: process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN,
            debug: true,
        }),
    });

    /*
     * This is the client state. It is used to store the sign in and sign up attempt state of the client
     */
    const [clientState, setClientState] = React.useState<ProtocolAuthClientContextState>({
        signIn: null,
        signUp: null,

        setSignIn: (signIn: SignInAttempt) => {
            setClientState((state) => ({
                ...state,
                signIn,
            }));
        },

        setSignUp: (signUp: SignUpAttempt) => {
            setClientState((state) => ({
                ...state,
                signUp,
            }));
        },
    });

    /*
        Load the instance if it hasn't already been provided by the server component.
    */
    useEffect(() => {
        if (state.loaded) {
            return;
        }

        async function loadInstance() {
            const response = await state.protocol.auth.instances.getByPublicKey({
                path: { publicKey: state.publicKey ?? "" },
            });

            if (response.status !== "success" || !response.data.instance) {
                throw new Error("Failed to get instance");
            }

            const instance = response.data.instance;

            setState((state) => ({
                ...state,
                loaded: true,
                instance,
            }));
        }

        loadInstance();
    }, []);

    return (
        <ProtocolAuthContext.Provider value={{ state, setState }}>
            <IsLoaded>
                <ProtocolAuthFlowProvider routeState={routeState}>
                    <ProtocolAuthClientProvider clientState={clientState}>
                        <Variables variables={appearance?.variables} />
                        {children}
                    </ProtocolAuthClientProvider>
                </ProtocolAuthFlowProvider>
            </IsLoaded>
        </ProtocolAuthContext.Provider>
    );
}
