import type { AuthFunction } from "./auth";
import type { HandleOAuthCallbackProps } from "./handlers/oauth";
import type { UpdateUserResult } from "./handlers/updateUser";
import type {
  ChangePasswordInput,
  DeleteConnectionInput,
  SignInWithCredentialsInput,
  SignUpWithCredentialsInput,
  UpdateUserInput,
} from "./schemas";

// export type CookieHandler = () => {
//   get: (name: string) => { value: string } | undefined;
//   set: (input: {
//     name: string;
//     value: string;
//     options?: AuthCookieOptions;
//   }) => void;
//   delete: (name: string) => void;
// };

export interface OAuthProfileResponse {
  profile: {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    image?: string;
  };
  rawProfile: Record<string, string | number | boolean>;
}

export interface AuthProvider {
  id: AuthProviderId;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  trust?: boolean;
  getAuthorizationUrl?: (config: AuthConfig, state?: string) => Promise<string>;
  getAccessToken?: (
    config: AuthConfig,
    code: string,
  ) => Promise<{
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    token_type?: string;
    expires_in?: number;
    scope?: string;
    error?: string;
  } | null>;
  refreshToken?: (
    config: AuthConfig,
    refreshToken: string,
  ) => Promise<Record<string, string> | null>;
  getProfile?: (
    config: AuthConfig,
    accessToken: string,
  ) => Promise<OAuthProfileResponse | null>;
}

export type AuthProviderId =
  | "credentials"
  | "email"
  | "phone"
  | "google"
  | "facebook"
  | "twitter"
  | "github"
  | "apple";

export interface AuthConfigOptions {
  // cookies: CookieHandler;
  appName: string;
  appStage: string;
  secure?: boolean;
  url?: string;
  afterSignInRedirectUri?: string;
  afterSignUpRedirectUri?: string;
  afterSignOutRedirectUri?: string;
  providers: AuthProvider[];
  session?: {
    duration?: number;
  };
}

export interface AuthConfig {
  url: string;
  afterSignInRedirectUri: string;
  afterSignUpRedirectUri: string;
  afterSignOutRedirectUri: string;
  providers: Record<string, AuthProvider>;
  cookies: {
    state: AuthCookieConfig;
    session: AuthCookieConfig;
  } & Record<string, AuthCookieConfig>;
  session: AuthSessionConfig;
  secure: boolean;
}

export interface Auth {
  config: AuthConfig;
  // cookies: CookieHandler;
  auth: AuthFunction;
}

export interface AuthWithHandlers extends Auth {
  handlers: {
    handleOAuthCallback: (
      input: Omit<HandleOAuthCallbackProps, "auth">,
    ) => Promise<Response>;
    signIn: (
      provider: AuthProviderId,
      input?: SignInWithCredentialsInput,
    ) => Promise<AuthActionState>;
    signOut: () => Promise<boolean>;
    signUp: (input: SignUpWithCredentialsInput) => Promise<AuthActionState>;
    changePassword: (input: ChangePasswordInput) => Promise<AuthActionState>;
    updateUser: (input: UpdateUserInput) => Promise<UpdateUserResult>;
    deleteConnection: (
      input: DeleteConnectionInput,
    ) => Promise<AuthActionState>;
  };
}

export interface AuthCookieConfig {
  name: string;
  options: AuthCookieOptions;
}

export interface AuthSessionConfig {
  duration: number;
}

export interface AuthCookieOptions {
  httpOnly?: boolean;
  sameSite?: AuthCookieSameSite;
  secure?: boolean;
}

export type AuthCookieSameSite = "lax" | "strict" | "none";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  roles: string[] | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface AuthAccount {
  id: string;
  userId: string;
  providerId: string;
  providerType: string;
  providerAccountId: string;
  refreshToken: string | null;
  accessToken: string | null;
  accessTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface AuthSession {
  user: AuthUser;
  expires: Date;
}

export interface AuthDatabaseAdapter {
  /**
   * Creates a user in the database and returns it.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  createUser?(user: AuthUser): Awaitable<AuthUser>
  /**
   * Returns a user from the database via the user id.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  getUser?(id: string): Awaitable<AuthUser | null>
  /**
   * Returns a user from the database via the user's email address.
   *
   * See also [Verification tokens](https://authjs.dev/guides/adapters/creating-a-database-adapter#verification-tokens)
   */
  getUserByEmail?(email: string): Awaitable<AuthUser | null>
  /**
   * Using the provider id and the id of the user for a specific account, get the user.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  getUserByAccount?(
    providerAccountId: Pick<AuthAccount, "provider" | "providerAccountId">
  ): Awaitable<AuthUser | null>
  /**
   * Updates a user in the database and returns it.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  updateUser?(
    user: Partial<AuthUser> & Pick<AuthUser, "id">
  ): Awaitable<AuthUser>
  /**
   * @todo This method is currently not invoked yet.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  deleteUser?(
    userId: string
  ): Promise<void> | Awaitable<AuthUser | null | undefined>
  /**
   * This method is invoked internally (but optionally can be used for manual linking).
   * It creates an [Account](https://authjs.dev/reference/core/adapters#models) in the database.
   *
   * See also [User management](https://authjs.dev/guides/adapters/creating-a-database-adapter#user-management)
   */
  linkAccount?(
    account: AuthAccount
  ): Promise<void> | Awaitable<AuthAccount | null | undefined>
  /** @todo This method is currently not invoked yet. */
  unlinkAccount?(
    providerAccountId: Pick<AuthAccount, "provider" | "providerAccountId">
  ): Promise<void> | Awaitable<AuthAccount | undefined>
  /**
   * Creates a session for the user and returns it.
   *
   * See also [Database Session management](https://authjs.dev/guides/adapters/creating-a-database-adapter#database-session-management)
   */
  createSession?(session: {
    sessionToken: string
    userId: string
    expires: Date
  }): Awaitable<AuthSession>
  /**
   * Returns a session and a userfrom the database in one go.
   *
   * :::tip
   * If the database supports joins, it's recommended to reduce the number of database queries.
   * :::
   *
   * See also [Database Session management](https://authjs.dev/guides/adapters/creating-a-database-adapter#database-session-management)
   */
  getSessionAndUser?(
    sessionToken: string
  ): Awaitable<{ session: AuthSession; user: AuthUser } | null>
  /**
   * Updates a session in the database and returns it.
   *
   * See also [Database Session management](https://authjs.dev/guides/adapters/creating-a-database-adapter#database-session-management)
   */
  updateSession?(
    session: Partial<AuthSession> & Pick<AuthSession, "sessionToken">
  ): Awaitable<AuthSession | null | undefined>
  /**
   * Deletes a session from the database. It is preferred that this method also
   * returns the session that is being deleted for logging purposes.
   *
   * See also [Database Session management](https://authjs.dev/guides/adapters/creating-a-database-adapter#database-session-management)
   */
  deleteSession?(
    sessionToken: string
  ): Promise<void> | Awaitable<AuthSession | null | undefined>
  /**
   * Creates a verification token and returns it.
   *
   * See also [Verification tokens](https://authjs.dev/guides/adapters/creating-a-database-adapter#verification-tokens)
   */
  createVerificationToken?(
    verificationToken: AuthVerificationToken
  ): Awaitable<AuthVerificationToken | null | undefined>
  /**
   * Return verification token from the database and deletes it
   * so it can only be used once.
   *
   * See also [Verification tokens](https://authjs.dev/guides/adapters/creating-a-database-adapter#verification-tokens)
   */
  useVerificationToken?(params: {
    identifier: string
    token: string
  }): Awaitable<AuthVerificationToken | null>

  // getAccount(input: {
  //   provider: string;
  //   providerAccountId: string;
  // }): Promise<AuthUser | null>;

  // getUserByEmail(email: string): Promise<AuthUser | null>;
  // getUserById(id: string): Promise<AuthUser | null>;

  // createUser(user: AuthUser): Promise<AuthUser | null>;
  // updateUser(user: AuthUser): Promise<AuthUser | null>;
}

export type AuthResult = AuthSession | null;

export interface AuthActionState {
  status: string | undefined;
  errors: Record<string, string[]>;
  message: string;
  user?: AuthUser;
  session?: AuthSession;
}

export const initialAuthActionState: AuthActionState = {
  status: undefined,
  errors: {},
  message: "",
};
