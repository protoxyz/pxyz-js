import { CookieAttributes } from "js-cookie";

export const LOCAL_STORAGE_KEY = "pxyz-auth.state";

export const COOKIE_OPTIONS = {
    expires: 365,
    path: "/",
    sameSite: "lax",
} as CookieAttributes;
