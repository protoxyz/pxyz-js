import { SessionUser } from '@protoxyz/types';
import { importSPKI, jwtVerify } from 'jose';

export interface VerifyJWTArgs {
  token: string;
  pem?: string;
  key?: string;
  issuer?: string;
  audience?: string;
}
export async function verifyJWT({
  token,
  pem,
  key,
  issuer,
  audience,
}: VerifyJWTArgs) {
  const actualKey = pem
    ? await importSPKI(pem, 'RS256')
    : new TextEncoder().encode(key);

  const { payload } = await jwtVerify(token, actualKey, { issuer, audience });

  return payload as unknown as SessionUser;
}
