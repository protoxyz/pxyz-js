import { SessionUser } from '@protoxyz/types';
import { importSPKI, jwtVerify } from 'jose';

export interface VerifyJWTArgs {
  token: string;
  pem: string;
  issuer?: string;
  audience?: string;
}
export async function verifyJWT({
  token,
  pem,
  issuer,
  audience,
}: VerifyJWTArgs) {
  const key = await importSPKI(pem, 'RS256');

  const { payload } = await jwtVerify(token, key, { issuer, audience });

  return payload as unknown as SessionUser;
}
