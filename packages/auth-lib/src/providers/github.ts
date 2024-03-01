import type { AuthConfig, AuthProvider, OAuthProfileResponse } from "../types";

export interface GithubProfile {
  id: string;
  login: string;
  name: string;
  email: string;
  email_verified: boolean;
  avatar_url: string;
}

export interface GithubProviderConfig {
  clientId: string;
  clientSecret: string;
  trust?: boolean;
}

export const Github = (providerConfig: GithubProviderConfig): AuthProvider => ({
  id: "github",
  clientId: providerConfig.clientId,
  clientSecret: providerConfig.clientSecret,
  trust: providerConfig.trust ?? false,

  // eslint-disable-next-line
  async getAuthorizationUrl(authConfig: AuthConfig, state?: string) {
    const url = new URL("https://github.com/login/oauth/authorize");

    const clientId = authConfig.providers.github?.clientId ?? "";
    const redirectUri = authConfig.providers.github?.redirectUri ?? "";

    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("scope", "user:email");
    url.searchParams.append("state", state ?? "");

    return url.toString();
  },

  getAccessToken: async (config: AuthConfig, code: string) => {
    const url = new URL("https://github.com/login/oauth/access_token");

    url.searchParams.append("client_id", providerConfig.clientId);
    url.searchParams.append("client_secret", providerConfig.clientSecret);
    url.searchParams.append("code", code);
    url.searchParams.append(
      "redirect_uri",
      config.providers.github?.redirectUri ?? "/",
    );

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (!json) {
      throw new Error("Failed to get access token");
    }

    return json as { access_token: string };
  },

  getProfile: async (
    config: AuthConfig,
    accessToken: string,
  ): Promise<OAuthProfileResponse | null> => {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });

    const json = (await response.json()) as Record<string, string>;

    return {
      profile: {
        id: json.id,
        name: json.name,
        email: json.email,
        email_verified: config.providers.github.trust
          ? Boolean(json.email_verified)
          : false,
        image: json.avatar_url,
      },
      rawProfile: json,
    };
  },
});
