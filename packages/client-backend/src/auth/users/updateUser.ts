import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type AuthUsersUpdateUserResponse = {
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
export type AuthUsersUpdateUserInput = {
    name: string  
    username: string  
    imageUri: string  | string   
    roleId: string  
    status: string  
    publicMeta: Record<any, any>  
    privateMeta: Record<any, any>  
};
export function updateUser(
    auth: AuthOptions,
    body?: AuthUsersUpdateUserInput,
    options?: RequestOptions<AuthUsersUpdateUserInput>,
    development?: boolean,
): Promise<AuthUsersUpdateUserResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<AuthUsersUpdateUserInput, AuthUsersUpdateUserResponse>(
      auth,
      'PUT',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/auth/users/${pathParams.id}',
      options,
  );
}

