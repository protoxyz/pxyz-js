import { ProtocolAuthContext, ProtocolAuthProviderState } from "./protocol-context";
import { Protocol } from "@protoxyz/core";
import React, { useEffect } from "react";
import { AuthAppearance } from "@protoxyz/themes";
import { AuthInstance, SignInAttempt, SignUpAttempt, UserProfile } from "@protoxyz/types";
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
    organization: null,
};

export interface ProtocolAuthProviderProps {
    instance?: AuthInstance | null;
    user?: UserProfile | null;
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
    appearance,
}: ProtocolAuthProviderProps) {
    console.log("this should be called on the client!");

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
        appearance,
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
                        <Variables variables={appearance.variables} />
                        {children}
                    </ProtocolAuthClientProvider>
                </ProtocolAuthFlowProvider>
            </IsLoaded>
        </ProtocolAuthContext.Provider>
    );
}

// type ProtocolAuthProvider = {
//     children: React.ReactNode;
//     publicKey?: string;
//     domain?: string;
//     appearance?: AuthAppearance;
//     navigate?: (url: string) => void;
// };
// export async function ProtocolAuthProvider2({
//     children,
//     publicKey,
//     domain,
//     appearance,
//     navigate,
// }: ProtocolAuthProvider) {
//     const resolvedDomain = useMemo(() => (domain || process.env.NEXT_PUBLIC_PXYZ_AUTH_DOMAIN) ?? "", [domain]);
//     const resolvedPublicKey = useMemo(
//         () => (publicKey || process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY) ?? "",
//         [publicKey],
//     );

//     const defaultState = useMemo(
//         () => ({
//             ...initialState,
//             domain: resolvedDomain,
//             publicKey: resolvedPublicKey,
//             appearance: appearance || {},
//         }),
//         [domain, publicKey, appearance],
//     );

//     const [state, setState] = React.useState<ProtocolAuthProviderState>(defaultState);

//     const setInstance = useCallback(
//         (instance: AuthInstance) => {
//             setState((state) => ({
//                 ...state,
//                 instance,
//             }));
//         },
//         [defaultState],
//     );

//     // useEffect(() => {
//     //     setInstance(null);
//     // }, []);

//     const loadInstance = useCallback(async () => {
//         const resolvedPublicKey = publicKey || process.env.NEXT_PUBLIC_PXYZ_AUTH_PUBLIC_KEY;

//         const protocol = new Protocol({
//             credentials: true,
//             baseUrl: state.domain,
//             debug: true,
//         });

//         const response = await protocol.auth.instances.getByPublicKey({
//             path: { publicKey: resolvedPublicKey ?? "" },
//         });

//         if (response.status !== "success" || !response.data.instance) {
//             throw new Error("Failed to get instance");
//         }

//         const instance = response.data.instance;

//         setState((state) => ({
//             ...state,
//             loaded: true,
//             instance,
//         }));
//     }, []);

//     useEffect(() => {
//         console.log("ProtocolAuthProvider: useEffect: state", state);
//         if (!state.loaded) {
//             loadInstance();
//         }
//     }, []);

//     // useEffect(() => {
//     //     if (state.loaded) {
//     //         return;
//     //     }
//     //     console.log("!!!!!!! this should only run once !!!!!!!");

//     //     async function f() {
//     //         const response = await protocol.auth.instances.getByPublicKey({
//     //             path: { publicKey: resolvedPublicKey ?? "" },
//     //         });

//     //         if (response.status !== "success" || !response.data.instance) {
//     //             throw new Error("Failed to get instance");
//     //         }

//     //         const instance = response.data.instance;

//     //         setState((state) => ({
//     //             ...state,
//     //             loaded: true,
//     //             instance,
//     //         }));
//     //     }
//     //     f();
//     // }, [state.loaded, resolvedPublicKey]);

//     // useEffect(() => {
//     //     async function loadInstance() {
//     //         const instanceResult = await useMemo(
//     //             async () =>
//     //                 await protocol.auth.instances.getByPublicKey({ path: { publicKey: resolvedPublicKey ?? "" } }),
//     //             [resolvedPublicKey],
//     //         );

//     //         if (instanceResult.status !== "success") {
//     //             throw new Error("Failed to get instance");
//     //         }

//     //         const instance = instanceResult.data.instance;

//     //         if (!instance) {
//     //             throw new Error("Instance not found");
//     //         }

//     //         setState((state) => ({
//     //             ...state,
//     //             instance,
//     //         }));
//     //     }
//     //     console.log("loading instance");
//     //     loadInstance();
//     // }, []);

//     // const protocolAuthCtx = {
//     //     loaded: false,
//     //     currentUser: state.user,
//     //     currentOrganization: state.organization,
//     //     protocol,
//     //     redirectToUserProfile: () => {
//     //         window.location.href = `${resolvedDomain}/user`;
//     //     },
//     //     redirectToSignIn: (props?: RedirectToSignInProps) => {
//     //         window.location.href = `${resolvedDomain}/sign-in`;
//     //     },
//     //     redirectToSignUp: (props?: RedirectToSignUpProps) => {
//     //         window.location.href = `${resolvedDomain}/sign-up`;
//     //     },
//     //     openSignIn: (props?: OpenSignInProps) => {},
//     //     openSignUp: (props?: OpenSignUpProps) => {},
//     // };

//     // const instanceCtx = useMemo(() => {
//     //     return {
//     //         instance: state.instance,
//     //     };
//     // }, [state.instance]);

//     // const appearanceCtx = useMemo(
//     //     () => ({
//     //         appearance: appearance || null,
//     //     }),
//     //     [appearance],
//     // );

//     // const resolvedNavigate = useMemo(() => navigate ?? defaultNavigate, [navigate]);
//     // const redirectToUserProfile = useCallback(() => {}, []);
//     // const redirectToSignIn = useCallback((opts?: RedirectToSignInProps) => {}, []);
//     // const redirectToSignUp = useCallback((opts?: RedirectToSignUpProps) => {}, []);

//     // const setterCtx = useMemo(
//     //     () => ({
//     //         navigate: resolvedNavigate,
//     //         redirectToUserProfile,
//     //         redirectToSignIn,
//     //         redirectToSignUp,
//     //     }),
//     //     [resolvedNavigate, redirectToUserProfile, redirectToSignIn, redirectToSignUp],
//     // );

//     return (
//         <ProtocolAuthContext.Provider value={{ state, setState }}>
//             {children}
//             {/* {children}</ProtocolAuthSettersContext.Provider> */}
//         </ProtocolAuthContext.Provider>
//     );
// }
