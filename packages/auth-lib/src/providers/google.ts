import type { AuthConfig, AuthProvider, OAuthProfileResponse } from "../types";

export interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface GoogleProviderConfig {
  clientId: string;
  clientSecret: string;
  scopes?: string;
  trust?: boolean;
}

export const Google = (providerConfig: GoogleProviderConfig): AuthProvider => ({
  id: "google",
  clientId: providerConfig.clientId,
  clientSecret: providerConfig.clientSecret,
  trust: providerConfig.trust ?? false,

  // eslint-disable-next-line
  async getAuthorizationUrl(authConfig: AuthConfig, state?: string) {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append(
      "client_id",
      authConfig.providers.google?.clientId ?? "",
    );
    url.searchParams.append(
      "redirect_uri",
      authConfig.providers.google?.redirectUri ?? "",
    );
    url.searchParams.append("response_type", "code");
    url.searchParams.append(
      "scope",
      providerConfig.scopes ?? "openid email profile",
    );
    if (state) {
      url.searchParams.append("state", state);
    }
    return url.toString();
  },

  getAccessToken: async (config: AuthConfig, code: string) => {
    const url = new URL("https://oauth2.googleapis.com/token");
    url.searchParams.append(
      "client_id",
      config.providers.google?.clientId ?? "",
    );
    url.searchParams.append(
      "client_secret",
      config.providers.google?.clientSecret ?? "",
    );
    url.searchParams.append("code", code);
    url.searchParams.append("grant_type", "authorization_code");
    url.searchParams.append(
      "redirect_uri",
      config.providers.google?.redirectUri ?? "",
    );
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const json = await response.json();

    if (!json) {
      return null;
    }

    return json as {
      access_token: string;
      refresh_token?: string;
      id_token?: string;
      token_type?: string;
      expires_in: number;
      scope?: string;
      error?: string;
    };
  },

  refreshToken: async (config: AuthConfig, refreshToken: string) => {
    const url = new URL("https://oauth2.googleapis.com/token");

    const clientId = config.providers.google?.clientId ?? "";
    const clientSecret = config.providers.google?.clientSecret ?? "";

    url.searchParams.append("client_id", clientId);
    url.searchParams.append("client_secret", clientSecret);
    url.searchParams.append("refresh_token", refreshToken);
    url.searchParams.append("grant_type", "refresh_token");
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const json = await response.json();
    return json as Record<string, string>;
  },

  getProfile: async (
    config: AuthConfig,
    accessToken: string,
  ): Promise<OAuthProfileResponse> => {
    const url = new URL("https://www.googleapis.com/oauth2/v3/userinfo");
    url.searchParams.append("access_token", accessToken ?? "");
    const response = await fetch(url.toString());
    const json = (await response.json()) as Record<string, string>;

    return {
      profile: {
        id: json.sub,
        name: json.name,
        email: json.email,
        email_verified: config.providers.google.trust
          ? Boolean(json.email_verified)
          : false,
        image: json.picture,
      },
      rawProfile: json,
    };
  },
});
