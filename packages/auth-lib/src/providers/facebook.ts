import type { AuthConfig, AuthProvider, OAuthProfileResponse } from "../types";

export interface FacebookProfile {
  id: string;
  name: string;
  email: string;

  picture: {
    data: {
      height: number;
      width: number;
      url: string;
    };
  };
}

export interface FacebookProviderConfig {
  clientId: string;
  clientSecret: string;
  trust?: boolean;
}

export const Facebook = (
  providerConfig: FacebookProviderConfig,
): AuthProvider => ({
  id: "facebook",
  clientId: providerConfig.clientId,
  clientSecret: providerConfig.clientSecret,
  trust: providerConfig.trust ?? false,

  // eslint-disable-next-line
  async getAuthorizationUrl(authConfig: AuthConfig, state?: string) {
    const url = new URL("https://www.facebook.com/v8.0/dialog/oauth");

    const clientId = authConfig.providers.facebook?.clientId ?? "";
    const redirectUri = authConfig.providers.facebook?.redirectUri ?? "";

    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("scope", "email");
    if (state) {
      url.searchParams.append("state", state);
    }

    return url.toString();
  },

  getAccessToken: async (config: AuthConfig, code: string) => {
    const url = new URL("https://graph.facebook.com/v8.0/oauth/access_token");
    url.searchParams.append(
      "client_id",
      config.providers.facebook?.clientId ?? "",
    );
    url.searchParams.append(
      "client_secret",
      config.providers.facebook?.clientSecret ?? "",
    );
    url.searchParams.append("code", code);
    url.searchParams.append(
      "redirect_uri",
      config.providers.facebook?.redirectUri ?? "",
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
    const url = new URL("https://graph.facebook.com/me");
    url.searchParams.append("fields", "id,name,email,picture");
    url.searchParams.append("access_token", accessToken);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const json = (await response.json()) as FacebookProfile;

    return {
      profile: {
        id: json.id,
        name: json.name,
        email: json.email,
        email_verified: false,
        image: json.picture.data.url,
      },
      rawProfile: json as unknown as Record<string, string>,
    };
  },
});
