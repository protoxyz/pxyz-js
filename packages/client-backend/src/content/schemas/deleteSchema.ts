import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ContentSchemasDeleteSchemaResponse = boolean
export type ContentSchemasDeleteSchemaInput = undefined;
export function deleteSchema(
    auth: AuthOptions,
    body?: ContentSchemasDeleteSchemaInput,
    options?: RequestOptions<ContentSchemasDeleteSchemaInput>,
    development?: boolean,
): Promise<ContentSchemasDeleteSchemaResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<ContentSchemasDeleteSchemaInput, ContentSchemasDeleteSchemaResponse>(
      auth,
      'DELETE',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/content/schemas/${pathParams.id}',
      options,
  );
}

