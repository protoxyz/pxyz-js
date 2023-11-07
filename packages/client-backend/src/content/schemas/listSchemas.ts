import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ContentSchemasListSchemasResponse = {
    status: string  
    data: {
    id: string  
    tenantId: string  
    name: string  
    description: string | null 
    types: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}[]  
    meta: {
    total: number  
    count: number  
    numPages: number  
    perPage: number  
    prev: string | null 
    next: string | null 
}  
}
export type ContentSchemasListSchemasInput = undefined;
export function listSchemas(
    auth: AuthOptions,
    body?: ContentSchemasListSchemasInput,
    options?: RequestOptions<ContentSchemasListSchemasInput>,
    development?: boolean,
): Promise<ContentSchemasListSchemasResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<ContentSchemasListSchemasInput, ContentSchemasListSchemasResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/tenants/${pathParams.tenantId}/content/schemas',
      options,
  );
}

