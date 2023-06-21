import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export const withProtocolAuthMiddleware = (...args: unknown[]) => {
    const noop = () => undefined;
    const handler = (args[0] as NextMiddleware | undefined) || noop;

    return async (req: NextRequest, event: NextFetchEvent) => {
        const res = await handler(req, event);
        return res;
    };
};
