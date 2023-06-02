import { initialState, ProtocolAuthContext, persistReducer, reducer } from "../contexts/protocol";
import React, { useEffect } from "react";
import {
    Protocol,
    AuthInstance,
    CreateSignInAttemptOptions,
    PrepareSignInAttemptFirstFactorOptions,
    AttemptSignInAttemptSecondFactorOptions,
    AttemptSignInAttemptFirstFactorOptions,
    ResponseStatus,
    PrepareSignInAttemptSecondFactorOptions,
    AuthSignInAttemptStatus,
    CreateSignUpAttemptOptions,
    AttemptSignUpAttemptVerificationOptions,
    PrepareSignUpAttemptVerificationOptions,
    AuthVerificationStrategy,
    AuthSignUpAttemptStatus,
    UpdateUserProfileOptions,
    Theme,
    ThemeProperties,
} from "@protoxyz/core";
import { LOCAL_STORAGE_KEY } from "../constants";
import { mergeThemeCustomizationsAndBase } from "../utils";

export interface ProtocolAuthProviderProps {
    publicKey: string | undefined;
    domain: string | undefined;
    defaultInstance?: AuthInstance;
    children: React.ReactNode;
    baseTheme: ThemeProperties;
}
export const ProtocolAuthProvider = ({
    publicKey,
    domain,
    children,
    defaultInstance,
    baseTheme,
}: ProtocolAuthProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, {
        ...initialState,
        theme: { ...defaultInstance?.theme.properties, ...baseTheme },
        baseTheme,
        publicKey,
        domain,
        client: new Protocol({
            credentials: true,
            baseUrl: domain,
            debug: true,
        }),
        instance: defaultInstance ?? null,
        isLoaded: !!defaultInstance,
    });

    const getInstance = async () => {
        if (state.isLoading || state.isLoaded) return;
        dispatch({ type: "setLoading", payload: true });

        const result = await state.client.auth.instances.getByPublicKey({
            path: { publicKey: state.publicKey as string },
        });

        if (result.status === ResponseStatus.Success && result.data.instance) {
            dispatch({ type: "setInstance", payload: result.data.instance });
        }
    };

    const internalResetSignInState = async () => {
        dispatch({ type: "resetSignInState" });
    };

    const internalResetSignUpState = async () => {
        dispatch({ type: "resetSignUpState" });
    };

    const internalCreateSignUpAttempt = async (input: CreateSignUpAttemptOptions["body"]) => {
        dispatch({ type: "setCreatingSignUpAttempt", payload: input });
        if (state.instance) {
            try {
                const result = await state.client.auth.signUpAttempts.create({ body: input });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignUpError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signUpAttempt) {
                    dispatch({ type: "setSignUpAttempt", payload: result.data.signUpAttempt });

                    if (result.data.signUpAttempt.status === AuthSignUpAttemptStatus.complete) {
                        internalGetMe();
                        window.location.href = state.instance.signUpRedirectUri;
                    } else if (result.data.signUpAttempt.oauthProviderId && result.data.authorizeUri) {
                        window.location.href = result.data.authorizeUri;
                    }
                }
            } catch (err) {
                console.log("error", err);
            }
        } else {
            console.log("No instance");
        }
    };

    const internalAttemptSignUpVerification = async (input: AttemptSignUpAttemptVerificationOptions["body"]) => {
        dispatch({ type: "setAttemptingSignUpVerification", payload: true });

        if (state.instance && state.signUpAttempt) {
            try {
                const result = await state.client.auth.signUpAttempts.attemptVerification({
                    path: { id: state.signUpAttempt.id },
                    body: input,
                });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignUpError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signUpAttempt) {
                    dispatch({ type: "setSignUpAttempt", payload: result.data.signUpAttempt });

                    if (result.data.signUpAttempt.status === AuthSignUpAttemptStatus.complete) {
                        internalGetMe();
                        window.location.href = state.instance.signUpRedirectUri;
                    } else if (result.data.signUpAttempt.strategy === "oauth" && result.data.authorizeUri) {
                        window.location.href = result.data.authorizeUri;
                    }
                }
            } catch (err) {
                console.log("error", err);
            }
        }
    };

    const internalPrepareSignUpVerification = async (input: PrepareSignUpAttemptVerificationOptions["body"]) => {
        dispatch({ type: "setPreparingSignUpVerification", payload: true });

        if (state.instance && state.signUpAttempt) {
            try {
                const result = await state.client.auth.signUpAttempts.prepareVerification({
                    path: { id: state.signUpAttempt.id },
                    body: input,
                });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignUpError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signUpAttempt) {
                    dispatch({ type: "setSignUpAttempt", payload: result.data.signUpAttempt });
                }
            } catch (err) {
                console.log("error", err);
            }
        }
    };

    const internalCreateSignInAttempt = async (input: CreateSignInAttemptOptions["body"]) => {
        dispatch({ type: "setCreatingSignInAttempt", payload: input });

        if (state.instance) {
            try {
                const result = await state.client.auth.signInAttempts.create({ body: input });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignInError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signInAttempt) {
                    dispatch({ type: "setSignInAttempt", payload: result.data.signInAttempt });

                    if (result.data.signInAttempt.status === AuthSignInAttemptStatus.complete) {
                        internalGetMe();
                        window.location.href = state.instance.signInRedirectUri;
                    } else if (result.data.signInAttempt.strategy === "oauth" && result.data.authorizeUri) {
                        window.location.href = result.data.authorizeUri;
                    }
                }
            } catch (err) {
                console.log("error", err);
            }
        }
    };

    const internalPrepareSignInFirstFactor = async (input: PrepareSignInAttemptFirstFactorOptions["body"]) => {
        dispatch({ type: "setPreparingSignInFirstFactor", payload: true });
        try {
            if (state.instance && state.signInAttempt) {
                const result = await state.client.auth.signInAttempts.prepareFirstFactor({
                    path: { id: state.signInAttempt.id },
                    body: input,
                });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignInError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signInAttempt) {
                    dispatch({ type: "setSignInAttempt", payload: result.data.signInAttempt });

                    if (result.data.signInAttempt.strategy === "oauth" && result.data.authorizeUri) {
                        window.location.href = result.data.authorizeUri;
                    }
                }
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    const internalAttemptSignInFirstFactor = async (input: AttemptSignInAttemptFirstFactorOptions["body"]) => {
        dispatch({ type: "setAttemptingSignInFirstFactor", payload: true });
        try {
            if (state.instance && state.signInAttempt) {
                const result = await state.client.auth.signInAttempts.attemptFirstFactor({
                    path: { id: state.signInAttempt.id },
                    body: input,
                });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setSignInError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.signInAttempt) {
                    dispatch({ type: "setSignInAttempt", payload: result.data.signInAttempt });

                    if (result.data.signInAttempt.status === AuthSignInAttemptStatus.complete) {
                        internalGetMe();

                        window.location.href = state.instance.signInRedirectUri;
                    }
                }
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    const internalPrepareSignInSecondFactor = async (input: PrepareSignInAttemptSecondFactorOptions["body"]) => {
        dispatch({ type: "setPreparingSignInSecondFactor", payload: true });
        try {
            if (state.instance && state.signInAttempt) {
                console.log("internalPrepareSignInSecondFactor");
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    const internalAttemptSignInSecondFactor = async (input: AttemptSignInAttemptSecondFactorOptions["body"]) => {
        dispatch({ type: "setAttemptingSignInSecondFactor", payload: true });
        try {
            if (state.instance && state.signInAttempt) {
                console.log("internalAttemptSignInSecondFactor");
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    const internalLogout = async () => {
        if (state.instance) {
            await state.client.auth.sessions.end();
        }
        dispatch({ type: "logout" });
    };

    const internalUpdateUser = async (input: UpdateUserProfileOptions["body"]) => {
        dispatch({ type: "setUpdatingUser", payload: true });

        if (state.instance && state.user) {
            try {
                const result = await state.client.auth.users.updateProfile({
                    body: input,
                });

                if (result.status === ResponseStatus.Error && result.error) {
                    dispatch({ type: "setUpdateUserError", payload: { error: result.error } });
                } else if (result.status === ResponseStatus.Success && result.data.user) {
                    dispatch({ type: "setUser", payload: result.data.user });
                }

                dispatch({ type: "setUpdatingUser", payload: false });
            } catch (err) {
                console.log("error", err);
            }

            dispatch({ type: "setUpdatingUser", payload: false });
        }
    };

    const internalGetMe = async () => {
        dispatch({ type: "setUserLoading", payload: true });

        if (state.instance && state.instance.frontendApiUri) {
            const result = await state.client.auth.users.profile();

            if (result.status === ResponseStatus.Success && result.data.user) {
                dispatch({ type: "setUser", payload: result.data.user });

                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (state.instance.googleAnalyticsTrackingId) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        gtag("config", state.instance.googleAnalyticsTrackingId, {
                            user_id: result.data.user.id,
                        });
                    }
                } catch (err) {
                    console.log("gtag error", err);
                }
            } else {
                dispatch({ type: "logout" });
            }
        }
    };

    useEffect(() => {
        if (publicKey && !state.isLoaded) {
            // const localState = localStorage.getItem(LOCAL_STORAGE_KEY);
            // if (localState) {
            //     dispatch({ type: "setStateFromLocalStorage", payload: JSON.parse(localState) });
            // }
        }

        if (!state.instance && !state.isLoading) getInstance();
    }, [publicKey, state.instance, state.isLoaded, state.isLoading]);

    useEffect(() => {
        if (publicKey && state.isLoaded && state.instance?.frontendApiUri) internalGetMe();
    }, [publicKey, state.isLoaded, state.instance?.frontendApiUri]);

    return (
        <ProtocolAuthContext.Provider
            value={{
                ...state,
                createSignInAttempt: internalCreateSignInAttempt,
                prepareSignInFirstFactor: internalPrepareSignInFirstFactor,
                attemptSignInFirstFactor: internalAttemptSignInFirstFactor,
                prepareSignInSecondFactor: internalPrepareSignInSecondFactor,
                attemptSignInSecondFactor: internalAttemptSignInSecondFactor,
                createSignUpAttempt: internalCreateSignUpAttempt,
                prepareSignUpVerification: internalPrepareSignUpVerification,
                attemptSignUpVerification: internalAttemptSignUpVerification,
                logout: internalLogout,
                resetSignInState: internalResetSignInState,
                resetSignUpState: internalResetSignUpState,
                updateUser: internalUpdateUser,
                refetchUser: internalGetMe,
            }}
        >
            {children}
        </ProtocolAuthContext.Provider>
    );
};

export const useInstance = () => {
    const context = React.useContext(ProtocolAuthContext);
    if (!context) {
        throw new Error("useInstance must be used within a ProtocolAuthProvider");
    }
    return { instance: context.instance, loaded: context.isLoaded, loading: context.isLoading };
};

export const useProtocolAuth = () => {
    const context = React.useContext(ProtocolAuthContext);
    if (!context) {
        throw new Error("useInstance must be used within a ProtocolAuthProvider");
    }
    return context;
};
