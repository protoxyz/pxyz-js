import type { OAuthProvider } from ".";

export interface GoogleProfile extends Record<string, any> {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    hd: string;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
}

export default {
    id: "google",
    name: "Google",
    type: "oidc",
    description: "Allow users to connect their Google accounts",
    issuer: new URL("https://accounts.google.com"),
    clientId: process.env.SHARED_GOOGLE_CLIENT_ID,
    clientSecret: process.env.SHARED_GOOGLE_CLIENT_SECRET,
    scope: ["openid", "profile", "email"],
    checks: ["pkce", "state"],
    profile: (profile: GoogleProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        emailVerified: profile.email_verified,
        picture: profile.picture,
    }),
} as OAuthProvider;
