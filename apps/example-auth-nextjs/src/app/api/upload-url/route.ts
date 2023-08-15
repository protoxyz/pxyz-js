import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@protoxyz/auth-nextjs';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getAuth({});
  const response = await put({
    path: `users/${session?.sub}/${body.originalFilename}`,
    originalFilename: body.originalFilename,
    mime: body.contentType,
    size: body.contentSize,
  });

  return NextResponse.json(response);
}
