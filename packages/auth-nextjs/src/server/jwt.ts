import { SessionUser } from '@protoxyz/types';
import { importSPKI, jwtVerify } from 'jose';

export interface VerifyJWTArgs {
  token: string;
  pem: string;
  // iss: string;
  // aud: string;
}
export async function verifyJWT({ token, pem }: VerifyJWTArgs) {
  const key = await importSPKI(pem, 'RS256');

  const { payload } = await jwtVerify(token, key);

  return payload as unknown as SessionUser;
}
