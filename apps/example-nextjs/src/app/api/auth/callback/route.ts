import type { NextRequest } from "next/server";

import { handleCallback } from "@protoxyz/auth";

export const GET = async (req: NextRequest) => {
  return await handleCallback(req, async ({req, res, session}) => {
   
    console.log("Auth was successful!!!", session) 

    return res
  });
};
