import { NextRequest, NextResponse } from "next/server";
import { AuthOptions, auth } from "./auth";


export type RouteAuthCallback = (req: NextRequest) => Promise<NextResponse>;
export default async function withRouteAuth(req: NextRequest, callback: RouteAuthCallback, authOptions?: AuthOptions) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please sign in." });
  }

  return callback(req);
}
 