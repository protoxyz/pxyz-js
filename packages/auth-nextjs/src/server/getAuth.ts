import { verifyJWT } from "./jwt";
import { RequestLike } from "./types";
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

export function getSessionToken(req: RequestLike) {
    const cookies = req.cookies;

    if (Object.prototype.hasOwnProperty.call(cookies, "get")) {
        const cookie = (cookies as any).get("__session")?.value;
        if (cookie) return cookie;
    } else {
        const apiReq = req as unknown as any;
        const cookies = apiReq.cookies as any;
        const cookie = cookies.__session;
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
