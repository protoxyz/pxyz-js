import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthUsersGetUserResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    name: string | null 
    imageUri: string | null 
    lastSignInAt: string | null 
    lastActiveAt: string | null 
    username: string | null 
    status: string | null 
    roleId: string | null 
    role: {
    id: string  
    name: string  
    description: string | null 
    permissions: string []  
} | null 
    primaryEmailId: string | null 
    primaryPhoneId: string | null 
    emailAddresses: {
    id: string  
    tenantId: string  
    userId: string | null 
    email: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}[]  
    phoneNumbers: {
    id: string  
    tenantId: string  
    userId: string | null 
    phone: string  
    verifiedAt: string | null 
    createdAt: string  
    updatedAt: string  
}[]  
    publicMeta: any | null 
    privateMeta: any | null 
    createdAt: string  
    updatedAt: string  
}  
}
export type AuthUsersGetUserInput = undefined;
export function getUser(
    auth: AuthOptions,
    body?: AuthUsersGetUserInput,
    options?: RequestOptions<AuthUsersGetUserInput>,
    development?: boolean,
): Promise<AuthUsersGetUserResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthUsersGetUserInput, AuthUsersGetUserResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/users/${pathParams.id}',
      options,
  );
}

