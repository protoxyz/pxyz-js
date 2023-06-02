import jwt from "jsonwebtoken";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import { SessionUser } from "@protoxyz/core";
import { ProtocolAuth } from "@protoxyz/auth-node";
import { Request } from "express";

export type CreateContextOptions = {
    session?: SessionUser | null;
    userId?: string;
    user?: SessionUser | null;
};

export function getSessionToken(req: Request, protocolOptions: ProtocolAuthContextOptions) {
    // try getting it from the cookie
    const cookieSessToken = req.cookies[protocolOptions.sessionKey ?? "__session"];

    if (cookieSessToken) return cookieSessToken;

    // try getting it from the header
    if (req.headers) {
        const header = req.headers[protocolOptions.authorizationHeaderKey ?? "authorization"];

        if (header && typeof header === "string" && header.startsWith("Bearer")) {
            const token = header.split("Bearer ")[1];
            if (token !== undefined && token !== "undefined") return token;
        }
    }

    return undefined;
}

export async function getSession(req: Request, protocolOptions: ProtocolAuthContextOptions) {
    const sessToken = getSessionToken(req, protocolOptions);

    if (sessToken !== null && sessToken !== undefined) {
        return jwt.verify(sessToken, protocolOptions.publicKey) as SessionUser;
    }

    return null;
}

export const createInnerTRPCContext = async (
    opts: CreateContextOptions,
    protocolOptions: Pick<ProtocolAuthContextOptions, "publicKey" | "privateKey">,
) => {
    if (!opts.session) return opts;

    const userId = opts.session?.id as string;
    const sessionId = opts.session?.sessionId as string;

    if (!userId) {
        return opts;
    }

    const client = new ProtocolAuth({
        publicKey: protocolOptions.publicKey,
        privateKey: protocolOptions.privateKey,
    });

    const userResponse = await client.users.get({
        path: {
            userId,
        },
    });

    const user = userResponse.data.user;

    // const user = await prisma.user.findUnique({
    //     where: { id: userId },
    // });

    return {
        session: opts.session,
        user,
        userId: user?.id as string,
        sessionId,
    };
};

export interface ProtocolAuthContextOptions {
    publicKey: string;
    privateKey: string;
    sessionKey?: string;
    authorizationHeaderKey?: string;
}
export const createTRPCContext = async (
    opts: CreateExpressContextOptions,
    { publicKey, privateKey, sessionKey, authorizationHeaderKey }: ProtocolAuthContextOptions,
) => {
    const { req } = opts;

    const session = await getSession(req, { publicKey, privateKey, sessionKey, authorizationHeaderKey });

    return createInnerTRPCContext(
        {
            session,
            user: null,
            userId: "",
        },
        {
            publicKey,
            privateKey,
        },
    );
};
