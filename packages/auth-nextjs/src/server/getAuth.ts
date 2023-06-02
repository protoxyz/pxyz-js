import { verifyJWT } from "./jwt";
import { RequestLike } from "./types";
import { SessionUser } from "@protoxyz/core";
import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { IncomingHttpHeaders } from "http";

export function getBearerToken(req: RequestLike) {
    if (req.hasOwnProperty("headers") && req.headers.hasOwnProperty("get")) {
        const headers = req.headers;
        if (!headers) return null;
        if (headers.hasOwnProperty("authorization"))
            return (headers as IncomingHttpHeaders).authorization?.replace(/^(?:\s*Bearer)\s*/, "");
        if (headers.hasOwnProperty("get"))
            return (headers as Headers).get("authorization")?.replace(/^(?:\s*Bearer)\s*/, "");
    }

    return null;
}

export function getSessionToken(req: RequestLike) {
    const cookies = req.cookies;

    if (cookies.hasOwnProperty("get")) {
        const cookie = (cookies as RequestCookies).get("__session")?.value;
        if (cookie) return cookie;
    } else {
        const apiReq = req as unknown as NextApiRequest;
        const cookies = apiReq.cookies as NextApiRequestCookies;
        const cookie = cookies.__session;
        if (cookie) return cookie;
    }

    return null;
}

export function getToken(req: RequestLike) {
    return getSessionToken(req) ?? getBearerToken(req) ?? null;
}

export async function getProtocolAuth(req: RequestLike) {
    const token = getToken(req);

    if (token) {
        const publicKey = (process.env.PXYZ_AUTH_JWT_KEY || "").split(String.raw`\n`).join("\n");

        if (!publicKey) throw new Error("Missing PXYZ_AUTH_JWT_KEY environment variable");

        const decoded = await verifyJWT({ token, pem: publicKey });

        return { user: decoded as SessionUser, token: token as string };
    }

    return { user: null, token: null };
}
