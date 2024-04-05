import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export interface ProtocolAuthConfig {
  publicKey: string;
  secretKey: string;
}

export interface CookieOption {
  name: string;
  options: Omit<ResponseCookie, 'name' | 'value'>;
}

/** [Documentation](https://authjs.dev/reference/core#cookies) */
export interface CookiesOptions {
  sessionToken: CookieOption;
  signInToken: CookieOption;
  signUpToken: CookieOption;
  callbackUrl: CookieOption;
  csrfToken: CookieOption;
  pkceCodeVerifier: CookieOption;
  state: CookieOption;
  nonce: CookieOption;
}
