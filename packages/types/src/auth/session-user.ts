export interface AuthRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface SessionUser {
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  claims?: {
    sessionId: string;
    name: string;
    username: string;
    image: string;
    email: string;
    role: string | null;
    permissions: string[];
    phone: string | undefined;
    orgId: string | undefined;
    orgRole: string | null;
    orgPermissions: string[];
  };

  // id: string;
  // sessionId: string;
  // name: string;
  // username: string;
  // email: string;
  // emailVerified: boolean;
  // phone: string;
  // phoneVerified: boolean;
  // image: string;
  // timezone: string;
  // locale: string;
  // orgId: string;
  // orgRole: string;
}
