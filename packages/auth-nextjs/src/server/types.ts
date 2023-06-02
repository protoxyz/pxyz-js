import { IncomingMessage } from "http";
import { NextApiRequest } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

type GsspRequest = IncomingMessage & {
    cookies: NextApiRequestCookies;
};

export type RequestLike = NextRequest | NextApiRequest | GsspRequest;
