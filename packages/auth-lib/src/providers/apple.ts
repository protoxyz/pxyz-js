import type { AuthConfig, AuthProvider, OAuthProfileResponse } from "../types";

export interface AppleProfile {
  sub: string;
  email: string;
  email_verified: boolean;
}

export interface AppleProviderConfig {
  clientId: string;
  clientSecret: string;
  trust?: boolean;
}

export const Apple = (providerConfig: AppleProviderConfig): AuthProvider => ({
  id: "apple",
  clientId: providerConfig.clientId,
  clientSecret: providerConfig.clientSecret,
  trust: providerConfig.trust ?? false,

  // eslint-disable-next-line
  getAuthorizationUrl: async (authConfig: AuthConfig, state?: string) => {
    const url = new URL("https://appleid.apple.com/auth/authorize");

    url.searchParams.append("client_id", providerConfig.clientId);
    url.searchParams.append(
      "redirect_uri",
      authConfig.providers.apple?.redirectUri ?? "/",
    );
    url.searchParams.append("response_type", "code");
    url.searchParams.append("response_mode", "form_post");
    url.searchParams.append("scope", "email");
    if (state) {
      url.searchParams.append("state", state);
    }

    return url.toString();
  },

  getAccessToken: async (config: AuthConfig, code: string) => {
    const url = new URL("https://appleid.apple.com/auth/token");

    url.searchParams.append("client_id", providerConfig.clientId);
    url.searchParams.append("client_secret", providerConfig.clientSecret);
    url.searchParams.append("code", code);
    url.searchParams.append("grant_type", "authorization_code");
    url.searchParams.append(
      "redirect_uri",
      config.providers.apple?.redirectUri ?? "/",
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
  ): Promise<OAuthProfileResponse> => {
    const url = new URL("https://appleid.apple.com/auth/userinfo");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json = (await response.json()) as AppleProfile;

    if (!json) {
      throw new Error("Failed to get profile");
    }

    return {
      profile: {
        id: json.sub,
        name: "",
        email: json.email,
        email_verified: config.providers.apple.trust
          ? Boolean(json.email_verified)
          : false,
      },
      rawProfile: json as unknown as Record<string, string>,
    };
  },
});
