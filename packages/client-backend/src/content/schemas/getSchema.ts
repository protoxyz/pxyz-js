import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ContentSchemasGetSchemaResponse = {
    id: string  
    tenantId: string  
    name: string  
    description: string | null 
    types: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type ContentSchemasGetSchemaInput = undefined;
export function getSchema(
    auth: AuthOptions,
    body?: ContentSchemasGetSchemaInput,
    options?: RequestOptions<ContentSchemasGetSchemaInput>,
    development?: boolean,
): Promise<ContentSchemasGetSchemaResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<ContentSchemasGetSchemaInput, ContentSchemasGetSchemaResponse>(
      auth,
      'GET',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/content/schemas/${pathParams.id}',
      options,
  );
}

