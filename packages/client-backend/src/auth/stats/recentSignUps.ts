import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthStatsRecentSignUpsResponse = {
    id: string  
    tenantId: string  
    name: string  | null
    imageUri: string  | null
    lastSignInAt: string  | null
    lastActiveAt: string  | null
    username: string  | null
    status: string  | null
    roleId: string  | null
    role: {
    id: string  
    name: string  
    description: string | null 
    permissions: string []  
} | null
    primaryEmailId: string  | null
    primaryPhoneId: string  | null
    emailAddresses: {
    id: string  
    tenantId: string  
    userId: string  | null
    email: string  
    verifiedAt: string  | null
    createdAt: string  
    updatedAt: string  
}[] 
    phoneNumbers: {
    id: string  
    tenantId: string  
    userId: string  | null
    phone: string  
    verifiedAt: string  | null
    createdAt: string  
    updatedAt: string  
}[] 
    publicMeta: unknown | null
    privateMeta: unknown | null
    createdAt: string  
    updatedAt: string  
}[]
export type AuthStatsRecentSignUpsInput = undefined;
export function recentSignUps(
    auth: AuthOptions,
    body?: AuthStatsRecentSignUpsInput,
    options?: RequestOptions<AuthStatsRecentSignUpsInput>,
    development?: boolean,
): Promise<AuthStatsRecentSignUpsResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthStatsRecentSignUpsInput, AuthStatsRecentSignUpsResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/stats/recent-sign-ups',
      options,
  );
}

