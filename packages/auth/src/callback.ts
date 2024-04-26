import { defaultCookies, getCookieOptions } from "./cookies/cookies";
import { verifyJWT } from "./jwt";
import { getSecretKey } from "./util";
import { NextRequest, NextResponse } from "next/server";

export type OnSuccessCallback = ({req, res, session}: {req: NextRequest, res: NextResponse, session: any}) => Promise<NextResponse>;
export type OnErrorCallback = ({req, res}: {req: NextRequest, res: NextResponse}) => Promise<NextResponse>;

export async function handleCallback(req: NextRequest, onSuccess?:  OnSuccessCallback, onError?: OnErrorCallback) {
    const url = req.nextUrl;
    const params = Object.fromEntries(url.searchParams.entries());
    const token = params.jwt;
    const redirectPath = params.redirectPath ?? "/";
    const key = getSecretKey({});
    const verified = token ? await verifyJWT({ token, key }) : null;

    if (verified) {
    
        try {
        const cookieOptions = getCookieOptions(
            `${url.protocol}//${url.hostname}`
        );
        const defaultCookieSettings = defaultCookies()

        url.searchParams.delete("token");
        url.searchParams.delete("redirectPath");

        const redirectUrl = new URL(redirectPath, url);
        const res = NextResponse.redirect(redirectUrl);

        const cookieName = defaultCookieSettings.sessionToken.name;
        res.cookies.set(cookieName, token!, cookieOptions);

        if (onSuccess) {
            return onSuccess({req, res, session: verified});
        }

        return res;
        } catch (err) {
        console.error("FAILED TO GET COOKIE OPTIONS");
        console.error(err);
        }
    } else {
        console.error("Failed to verify JWT token");
            
    }

    const res = NextResponse.redirect(new URL("/?error=true", url));

    if (onError) {
        return onError({req, res});
    }

    return res;
}