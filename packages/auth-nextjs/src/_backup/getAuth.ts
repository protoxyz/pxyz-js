import { verifyJWT } from "../server/jwt";
import { RequestLike } from "../server/types";
import { IncomingHttpHeaders } from "http";
import { SessionUser } from "@protoxyz/types";

export function getBearerToken(req: RequestLike) {
    if (
        Object.prototype.hasOwnProperty.call(req, "headers") &&
        Object.prototype.hasOwnProperty.call(req.headers, "get")
    ) {
        const headers = req.headers;
        if (!headers) return null;
        if (Object.prototype.hasOwnProperty.call(headers, "authorization"))
            return (headers as IncomingHttpHeaders).authorization?.replace(/^(?:\s*Bearer)\s*/, "");
        if (Object.prototype.hasOwnProperty.call(headers, "get"))
            return (headers as Headers).get("authorization")?.replace(/^(?:\s*Bearer)\s*/, "");
    }

    return null;
}

type CookiesWithGet = {
    get: (name: string) =>
        | {
              key: string;
              value: string;
          }
        | undefined;
};

type CookiesWithSession = {
    __pxyz_session: string;
};

export function getSessionToken(req: RequestLike) {
    const cookies = req.cookies;

    if (Object.prototype.hasOwnProperty.call(cookies, "get")) {
        const cookie = (cookies as CookiesWithGet).get("__pxyz_session")?.value;
        if (cookie) return cookie;
    } else {
        const apiReq = req;
        const cookies = apiReq.cookies as CookiesWithSession;
        const cookie = cookies.__pxyz_session;
        if (cookie) return cookie;
    }

    return null;
}

export function getToken(req: RequestLike) {
    return getSessionToken(req) ?? getBearerToken(req) ?? null;
}

export async function getProtocolAuth(req: RequestLike, jwtKey?: string) {
    const token = getToken(req);

    if (token) {
        const publicKey = (jwtKey ?? process.env.PXYZ_AUTH_JWT_KEY ?? "").split(String.raw`\n`).join("\n");

        if (!publicKey) throw new Error("Missing PXYZ_AUTH_JWT_KEY environment variable");

        const decoded = await verifyJWT({ token, pem: publicKey });

        return { user: decoded as SessionUser, token: token as string };
    }

    return { user: null, token: null };
}
