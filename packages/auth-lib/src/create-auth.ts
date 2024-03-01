import type { AuthInput } from "./auth";
import type { HandleOAuthCallbackProps } from "./handlers/oauth";
import type {
  ChangePasswordInput,
  DeleteConnectionInput,
  SignInWithCredentialsInput,
  SignUpWithCredentialsInput,
  UpdateUserInput,
} from "./schemas";
import type {
  Auth,
  AuthConfig,
  AuthConfigOptions,
  AuthCookieSameSite,
  AuthProvider,
  AuthProviderId,
  AuthWithHandlers,
} from "./types";
import { auth } from "./auth";
import { ThirtyDays } from "./constants";
import { changePassword } from "./handlers/changePassword";
import { deleteConnection } from "./handlers/deleteConnection";
import { handleOAuthCallback } from "./handlers/oauth";
import { signIn } from "./handlers/signIn";
import { signOut } from "./handlers/signOut";
import { signUpWithCredentials } from "./handlers/signUp";
import { updateUser } from "./handlers/updateUser";

export const CreateAuth = (options: AuthConfigOptions): AuthWithHandlers => {
  // Normalize all the config options.

  const normalizedOptions = {
    url: options.url ?? process.env.AUTH_URL ?? "http://localhost:3000",
    secure: options.secure ?? process.env.AUTH_SECURE === "true" ?? true,
    appName: options.appName ?? process.env.APP ?? "",
    appStage: options.appStage ?? process.env.STAGE ?? "",
    afterSignInRedirectUri:
      options.afterSignInRedirectUri ??
      process.env.AUTH_AFTER_SIGN_IN_REDIRECT_URI ??
      "/",
    afterSignUpRedirectUri:
      options.afterSignUpRedirectUri ??
      process.env.AUTH_AFTER_SIGN_UP_REDIRECT_URI ??
      "/",
    afterSignOutRedirectUri:
      options.afterSignOutRedirectUri ??
      process.env.AUTH_AFTER_SIGN_OUT_REDIRECT_URI ??
      "/",
    providers: options.providers,
  };

  // Setup the config.
  const config: AuthConfig = {
    url: normalizedOptions.url,
    secure: normalizedOptions.secure,
    afterSignInRedirectUri: normalizedOptions.afterSignInRedirectUri,
    afterSignUpRedirectUri: normalizedOptions.afterSignUpRedirectUri,
    afterSignOutRedirectUri: normalizedOptions.afterSignOutRedirectUri,
    providers: createProvidersFromOptions(normalizedOptions),
    cookies: createCookiesFromOptions(normalizedOptions),
    session: createSessionFromOptions(normalizedOptions),
  };

  const authWithConfig = (input?: AuthInput) =>
    auth(
      {
        config,
        // cookies: options.cookies,
      },
      input,
    );

  const authObject: Auth = {
    config,
    // cookies: options.cookies,
    auth: authWithConfig,
  };

  const signInWithAuth = (
    provider: AuthProviderId,
    input?: SignInWithCredentialsInput,
  ) => signIn(authObject, provider, input);
  const signOutWithAuth = () => signOut(authObject);
  const signUpWithAuth = (input: SignUpWithCredentialsInput) =>
    signUpWithCredentials(authObject, input);
  const updateUserWithAuth = (input: UpdateUserInput) =>
    updateUser(authObject, input);
  const changePasswordWithAuth = (input: ChangePasswordInput) =>
    changePassword(authObject, input);
  const handleOAuthCallbackWithAuth = (
    input: Omit<HandleOAuthCallbackProps, "auth">,
  ) => handleOAuthCallback({ ...input, auth: authObject });

  const deleteConnectionWithAuth = (input: DeleteConnectionInput) =>
    deleteConnection(authObject, input);

  // Return the auth object to be imported and used in the app.
  return {
    ...authObject,
    handlers: {
      handleOAuthCallback: handleOAuthCallbackWithAuth,
      signIn: signInWithAuth,
      signOut: signOutWithAuth,
      signUp: signUpWithAuth,
      changePassword: changePasswordWithAuth,
      updateUser: updateUserWithAuth,
      deleteConnection: deleteConnectionWithAuth,
    },
  } as AuthWithHandlers;
};

function createSessionFromOptions(options: Partial<AuthConfigOptions>) {
  return {
    duration: options.session?.duration ?? ThirtyDays, // 30 days
  };
}

function createCookiesFromOptions(options: Partial<AuthConfigOptions>) {
  return {
    session: {
      name: `${options.secure ? "Secure-" : ""}${options.appName}.session-${options.appStage}`,
      options: {
        httpOnly: true,
        sameSite: "lax" as AuthCookieSameSite,
        secure: options.secure,
      },
    },
    state: {
      name: `${options.secure ? "Secure-" : ""}${options.appName}.session-state-${options.appStage}`,
      options: {
        httpOnly: true,
        sameSite: "lax" as AuthCookieSameSite,
        secure: options.secure,
      },
    },
  };
}

function createProvidersFromOptions(
  options: Pick<AuthConfigOptions, "url" | "providers">,
) {
  return options.providers
    .map((provider) => {
      if (provider.getAuthorizationUrl) {
        provider.redirectUri = `${options.url}/api/auth/callback/${provider.id}`;
      }
      return provider;
    })
    .reduce(
      (acc, provider) => {
        if (!provider.id) {
          throw new Error("Provider id is required");
        }

        acc[provider.id] = provider;
        return acc;
      },
      {} as Record<string, AuthProvider>,
    );
}
