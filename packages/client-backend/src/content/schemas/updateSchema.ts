import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ContentSchemasUpdateSchemaResponse = {
    id: string  
    tenantId: string  
    name: string  
    description: string | null 
    types: Record<any, any>  
    createdAt: string  
    updatedAt: string  
}
export type ContentSchemasUpdateSchemaInput = {
    tenantId: string  
    name: string  
    description: string  
    types: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    fields: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
}[]  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    accept: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    fields: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
}[]  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    accept: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    dateFormat: string  
    timeFormat: string  
    timeStep: number  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    placeholder: string  
    initialValue: string  
    dateFormat: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: boolean  
    layout: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    spellCheck: boolean  
} | {
    type: string  
    name: string  
    of: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    fields: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
}[]  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    accept: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    fields: {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    rows: number  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    layout: string  
    direction: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    source: string  
    maxLength: number  
    unique: boolean  
} | {
    type: string  
    name: string  
    to: string []  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    disableNew: boolean  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: number  
    list: number | {
    value: number  
    title: string  
}[]  
    layout: string  
    direction: string  
}[]  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    accept: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: string  
    dateFormat: string  
    timeFormat: string  
    timeStep: number  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    placeholder: string  
    initialValue: string  
    dateFormat: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    initialValue: boolean  
    layout: string  
} | {
    type: string  
    name: string  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    spellCheck: boolean  
}[]  
    title: string  
    hidden: boolean  
    readOnly: boolean  
    description: string  
    sortable: boolean  
    layout: string  
    list: string  | {
    value: string  
    title: string  
}[]  
    modal: {
    type: string  
    width: string  | number  
}  
}[]  
};
export function updateSchema(
    auth: AuthOptions,
    body?: ContentSchemasUpdateSchemaInput,
    options?: RequestOptions<ContentSchemasUpdateSchemaInput>,
    development?: boolean,
): Promise<ContentSchemasUpdateSchemaResponse> {
  console.log(process.env.PROTOCOL_ENV === 'development')
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<ContentSchemasUpdateSchemaInput, ContentSchemasUpdateSchemaResponse>(
      auth,
      'PATCH',
        isDevelopment ? SERVERS.development : SERVERS.production,
      '/content/schemas/${pathParams.id}',
      options,
  );
}

