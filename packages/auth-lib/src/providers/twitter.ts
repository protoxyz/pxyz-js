import type { AuthConfig, AuthProvider, OAuthProfileResponse } from "../types";

export interface TwitterProfile {
  id: string;
  name: string;
  screen_name: string;
  email: string;
  email_verified: boolean;
  profile_image_url_https: string;
}

export interface TwitterProviderConfig {
  clientId: string;
  clientSecret: string;
  trust?: boolean;
}

export const Twitter = (
  providerConfig: TwitterProviderConfig,
): AuthProvider => ({
  id: "twitter",
  clientId: providerConfig.clientId,
  clientSecret: providerConfig.clientSecret,
  trust: providerConfig.trust ?? false,

  // eslint-disable-next-line
  getAuthorizationUrl: async (authConfig: AuthConfig, state?: string) => {
    const url = new URL("https://api.twitter.com/oauth/request_token");

    const redirectUri = authConfig.providers.twitter?.redirectUri ?? "";

    url.searchParams.append("oauth_callback", redirectUri);
    url.searchParams.append("oauth_consumer_key", providerConfig.clientId);
    if (state) url.searchParams.append("oauth_nonce", state);
    url.searchParams.append("oauth_signature_method", "HMAC-SHA1");
    url.searchParams.append(
      "oauth_timestamp",
      Math.floor(Date.now() / 1000).toString(),
    );
    url.searchParams.append("oauth_version", "1.0");

    return url.toString();
  },

  getAccessToken: async (config: AuthConfig, code: string) => {
    const url = new URL("https://api.twitter.com/oauth/access_token");

    url.searchParams.append("oauth_token", code);
    url.searchParams.append("oauth_verifier", code);

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
    const url = new URL(
      "https://api.twitter.com/1.1/account/verify_credentials.json",
    );

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = (await response.json()) as Record<string, string>;

    return {
      profile: {
        id: json.id_str,
        name: json.name,
        email: json.email,
        email_verified: config.providers.twitter.trust
          ? Boolean(json.email_verified)
          : false,
        image: json.profile_image_url_https,
      },
      rawProfile: json,
    };
  },
});
