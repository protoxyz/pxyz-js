import { Command } from 'commander';
import * as z from 'zod';
import { handleError } from '../utils/handle-error';
import ora from 'ora';
import { existsSync, promises as fs } from 'fs';
import fspath from 'path';
import https from 'https';
import execa from 'execa';
import { logger } from '@/utils/logger';
import { getPackageManager } from '@/utils/get-package-manager';
import {
  CLIENT_PACKAGE,
  CLIENT_REQUEST_TS,
  TSCONFIG,
  TSUPCONFIG,
} from '@/utils/templates';
import * as prettier from 'prettier';

const beautifyOptions = {
  semi: false,
  parser: 'typescript',
};

const genClientOptionsSchema = z.object({
  url: z.string().url(),
  output: z.string(),
  cwd: z.string(),
  force: z.boolean().optional(),
});

export const genClient = new Command()
  .name('gen:client')
  .description('Generate a typescript client for your OpenAPI swagger doc')

  .argument('<name>', 'The name of your client package.')
  .argument('<url>', 'The url of your OpenAPI swagger doc.')

  .option(
    '-o, --output <output>',
    'The output directory for the client project.',
    'client',
  )

  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )

  .option(
    '-f, --force',
    'force overwrite the output directory if it already exists',
    false,
  )

  .action(async (name, url, opts) => {
    try {
      const options = genClientOptionsSchema.parse({
        url,
        output: opts.output,
        cwd: opts.cwd,
        force: opts.force,
      });

      const cwd = fspath.resolve(options.cwd);
      const output = fspath.resolve(cwd, options.output);

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      } else {
        logger.info(`Using ${cwd} as the working directory.`);
      }

      // Check if output directory exists
      if (existsSync(output)) {
        if (options.force) {
          logger.info(`Overwriting ${output}...`);
          await fs.rm(output, { recursive: true });
        } else {
          logger.error(
            `The path ${output} already exists. Please use the --force option to overwrite the directory.`,
          );
          process.exit(1);
        }
      } else {
        logger.info(`Using ${output} as the output directory.`);
      }

      fs.mkdir(output);

      const packageManager = await getPackageManager(cwd);

      // Init typescript project
      let spinner = ora(`Initializing typescript project...`).start();
      execa(packageManager, ['init', '-y'], { cwd: output });

      // Create src directory
      fs.mkdir(fspath.resolve(output, 'src'));

      // Create index.ts
      fs.writeFile(
        fspath.resolve(output, 'src/index.ts'),
        'export * from "./request"\nexport * from "./servers"\n',
      );

      // Create request.ts
      fs.writeFile(fspath.resolve(output, 'src/request.ts'), CLIENT_REQUEST_TS);

      // Write package.json template
      fs.writeFile(
        fspath.resolve(output, 'package.json'),
        CLIENT_PACKAGE.replace('"client-ts"', `"${name}"`),
      );

      // Write TS Config
      fs.writeFile(fspath.resolve(output, 'tsconfig.json'), TSCONFIG);

      // Write TSUP config
      fs.writeFile(fspath.resolve(output, 'tsup.config.ts'), TSUPCONFIG);

      spinner.start(`Retrieving swagger doc...`);
      const doc = await getSwaggerDoc(options.url);
      const servers = doc.servers;
      spinner.succeed(`Retrieved swagger doc.`);

      logger.info(`Title: ${doc.info.title}`);
      logger.info(`Description: ${doc.info.description}`);
      logger.info(`Version: ${doc.info.version}`);

      const serversArrayToHash = servers.reduce((hash: any, server: any) => {
        hash[server.environment] = server.url;
        return hash;
      }, {});

      await fs.writeFile(
        fspath.resolve(output, 'src/servers.ts'),
        `export const SERVERS = ${JSON.stringify(serversArrayToHash, null, 2)}`,
      );

      for (const [path, methods] of Object.entries(doc.paths)) {
        for (const [method, operation] of Object.entries(methods as string[])) {
          const operationId = (operation as any).operationId;
          const operationIdSplit = operationId.split('-');
          const requestPath = path.replace(/{/g, '${pathParams.');

          if (operationIdSplit.length === 3) {
            const product = operationIdSplit.shift();
            const resource = operationIdSplit.shift();
            const action = transformActionName(
              product,
              resource,
              operationIdSplit.shift(),
            );

            const typeName =
              camelCaseToClassName(product) +
              camelCaseToClassName(resource) +
              camelCaseToClassName(action);

            const response = (operation as any).responses['200'];

            const responseObject = response.content['application/json'].schema;
            const requestBody = (operation as any).requestBody?.content[
              'application/json'
            ].schema;

            const hasAuth = !!(operation as any).security;

            const request = `import { request, RequestOptions, AuthOptions } from "../../request";
import { SERVERS } from "../../servers";

export type ${typeName}Response = ${responseObjectToInterface(responseObject)}

${actionInput(typeName, requestBody)}

${functionTemplate(action, typeName, requestPath, method, hasAuth)}
`;

            // Make directory for product if it doesn't exist
            await makeProductDirectory(output, product);

            // Create resource directory if it doesn't exist
            await createProductResourceDirectory(output, product, resource);

            // Add index file for resource if it doesn't exist
            await addProductResourceIndexFile(output, product, resource);

            // Create action file
            await fs.writeFile(
              fspath.resolve(output, 'src', product, resource, `${action}.ts`),
              prettier.format(request, beautifyOptions),
            );

            // Add export to index file
            await addProductResourceExportToIndexFile(
              output,
              product,
              resource,
              action,
            );

            spinner.info(`${product}/${resource}/${action}`);
          } else {
            const resource = operationIdSplit.shift();
            const action = transformActionName(
              null,
              resource,
              operationIdSplit.shift(),
            );
            const typeName =
              camelCaseToClassName(resource) + camelCaseToClassName(action);
            const response = (operation as any).responses['200'];
            const responseObject = response.content['application/json'].schema;

            const requestBody = (operation as any).requestBody?.content[
              'application/json'
            ].schema;

            const hasAuth = !!(operation as any).security;

            const request = `import { request, RequestOptions, AuthOptions } from "../request";
import { SERVERS } from "../servers";

export type ${typeName}Response = ${responseObjectToInterface(responseObject)}

${actionInput(typeName, requestBody)}

${functionTemplate(action, typeName, requestPath, method, hasAuth)}
`;

            // Make directory for resource if it doesn't exist
            await makeProductDirectory(output, resource);

            // Add index file for resource if it doesn't exist
            await addResourceIndexFile(output, resource);

            // Create action file
            await fs.writeFile(
              fspath.resolve(output, 'src', resource, `${action}.ts`),
              prettier.format(request, beautifyOptions),
            );
            // Add export to index file
            await addResourceExportToIndexFile(output, resource, action);
            spinner.info(`${resource}/${action}`);
          }
        }
      }

      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });

function actionInput(typeName: string, requestBody: any) {
  if (!requestBody) {
    return `export type ${typeName}Input = undefined;`;
  } else {
    return `export type ${typeName}Input = ${responseObjectToInterface(
      requestBody,
    )};`;
  }
}

function functionTemplate(
  action: string,
  typeName: string,
  requestPath: string,
  method: string,
  hasAuth: boolean,
) {
  return `
export function ${action}(
    ${hasAuth ? 'auth: AuthOptions,' : ''}
    body?: ${typeName}Input,
    options?: RequestOptions<${typeName}Input>,
    development?: boolean,
): Promise<${typeName}Response> { 
  const isDevelopment = development ?? process.env.PROTOCOL_ENV === 'development' ?? false
  return request<${typeName}Input, ${typeName}Response>(
      ${hasAuth ? 'auth' : 'undefined'},
      '${method.toUpperCase()}',
      isDevelopment ? SERVERS.development : SERVERS.production,
      '${requestPath}',
      {...options, body},
  );
}
  `;
}

function camelCaseToClassName(camelCase: string) {
  return (
    camelCase.charAt(0).toUpperCase() +
    camelCase.slice(1).replace(/([A-Z])/g, '$1')
  );
}

function transformActionName(
  product: string | null | undefined,
  resource: string,
  action: string,
) {
  if (action === 'delete') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `delete${titleizedSingularResource}`;
  }

  if (action === 'create') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `create${titleizedSingularResource}`;
  }

  if (action === 'get') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `get${titleizedSingularResource}`;
  }

  if (action === 'getById') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `get${titleizedSingularResource}ById`;
  }

  if (action === 'list') {
    const titleizedPluralResource =
      resource.charAt(0).toUpperCase() + resource.slice(1);
    return `list${titleizedPluralResource}`;
  }

  if (action === 'listByUserId') {
    const titleizedPluralResource =
      resource.charAt(0).toUpperCase() + resource.slice(1);
    return `list${titleizedPluralResource}ByUserId`;
  }

  if (action === 'listByOrgId') {
    const titleizedPluralResource =
      resource.charAt(0).toUpperCase() + resource.slice(1);
    return `list${titleizedPluralResource}ByOrgId`;
  }

  if (action === 'listByTenantId') {
    const titleizedPluralResource =
      resource.charAt(0).toUpperCase() + resource.slice(1);
    return `list${titleizedPluralResource}ByTenantId`;
  }

  if (action === 'update') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `update${titleizedSingularResource}`;
  }

  if (action === 'verify') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `verify${titleizedSingularResource}`;
  }

  if (action === 'setPrimary') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `setPrimary${titleizedSingularResource}`;
  }

  if (action === 'makePrimary') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `makePrimary${titleizedSingularResource}`;
  }

  if (action === 'stats') {
    return `${product ?? ''.toLowerCase()}Stats`;
  }

  if (action === 'prepare') {
    const titleizedSingularResource = (
      resource.charAt(0).toUpperCase() + resource.slice(1)
    ).replace(/[ies|es|s]$/, '');
    return `prepare${titleizedSingularResource}`;
  }

  return action;
}

async function addResourceExportToIndexFile(
  output: string,
  resource: string,
  action: string,
) {
  // Add product export to index file
  await fs.appendFile(
    fspath.resolve(output, 'src', resource, 'index.ts'),
    `export * from './${action}'\n`,
  );
}

async function addResourceExportToProductIndexFile(
  output: string,
  product: string,
  resource: string,
) {
  // Add product export to index file
  await fs.appendFile(
    fspath.resolve(output, 'src', product, 'index.ts'),
    `export * from './${resource}'\n`,
  );
}

async function addProductResourceExportToIndexFile(
  output: string,
  product: string,
  resource: string,
  action: string,
) {
  // Add product export to index file
  await fs.appendFile(
    fspath.resolve(output, 'src', product, resource, 'index.ts'),
    `export * from './${action}'\n`,
  );
}

async function getSwaggerDoc(url: string): Promise<Record<any, any>> {
  return new Promise<Record<any, any>>((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        reject(
          new Error(
            `Request failed. Status code: ${statusCode}. Please try again.`,
          ),
        );
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (error) {
          reject(error);
        }
      });
    });
  });
}

async function makeProductDirectory(output: string, product: string) {
  // Make directory for product if it doesn't exist
  if (!existsSync(fspath.resolve(output, 'src', product))) {
    await fs.appendFile(
      fspath.resolve(output, 'src/index.ts'),
      `export * from './${product}'\n`,
    );
    try {
      await fs.mkdir(fspath.resolve(output, 'src', product));
    } catch (error) {}
  }
}

async function addProductResourceIndexFile(
  output: string,
  product: string,
  resource: string,
) {
  // Add index file for resource if it doesn't exist
  if (
    !existsSync(fspath.resolve(output, 'src', product, resource, 'index.ts'))
  ) {
    await fs.writeFile(
      fspath.resolve(output, 'src', product, resource, 'index.ts'),
      '',
    );
  }
}

async function addResourceIndexFile(output: string, resource: string) {
  // Add index file for resource if it doesn't exist
  if (!existsSync(fspath.resolve(output, 'src', resource, 'index.ts'))) {
    await fs.writeFile(fspath.resolve(output, 'src', resource, 'index.ts'), '');
  }
}

async function createProductResourceDirectory(
  output: string,
  product: string,
  resource: string,
) {
  // Create resource directory if it doesn't exist
  if (!existsSync(fspath.resolve(output, 'src', product, resource))) {
    try {
      await fs.mkdir(fspath.resolve(output, 'src', product, resource));
    } catch (error) {}

    // Add product export to index file
    await addResourceExportToProductIndexFile(output, product, resource);
  }
}

interface ResponseObject {
  type: string;
  properties: Record<string, any>;
  items: ResponseObject;
  anyOf: ResponseObject[];
  required: string[];
  additionalProperties: boolean;
}

function responseObjectToInterface(responseObject: ResponseObject): string {
  if (!responseObject) {
    return 'any';
  }
  switch (responseObject.type) {
    case 'object':
      if (responseObject.properties === undefined) {
        return 'Record<any, any>';
      }
      return `{
${Object.entries(responseObject.properties)
  .map(([key, value]) => {
    switch (value.type) {
      case 'array':
        return `    ${key}: ${responseObjectToInterface(value.items)}[] ${
          value.nullable ? '| null' : ''
        } ${value.optional ? '| undefined' : ''}`;
      case 'object':
        return `    ${key}: ${responseObjectToInterface(value)} ${
          value.nullable ? '| null' : ''
        } ${value.optional ? '| undefined' : ''}`;
      case 'integer':
      case 'float':
      case 'number':
        return `    ${key}: number ${value.nullable ? '| null' : ''} ${
          value.optional ? '| undefined' : ''
        }`;
      case 'undefined':
        return `    ${key}: any ${value.nullable ? '| null' : ''} ${
          value.optional ? '| undefined' : ''
        }`;
      case 'string':
        return `    ${key}: string ${value.nullable ? '| null' : ''} ${
          value.optional ? '| undefined' : ''
        }`;
      case 'boolean':
        return `    ${key}: boolean ${value.nullable ? '| null' : ''} ${
          value.optional ? '| undefined' : ''
        }`;

      default:
        if (value.anyOf) {
          return `    ${key}: ${value.anyOf
            .map((anyOf: ResponseObject) => responseObjectToInterface(anyOf))
            .join(' | ')} ${value.nullable ? '| null' : ''} ${
            value.optional ? '| undefined' : ''
          }`;
        }
        if (typeof value === 'object' && Object.keys(value).length === 0) {
          return `    ${key}: Record<any, any> ${
            value.nullable ? '| null' : ''
          } ${value.optional ? '| undefined' : ''}`;
        }

        return `    ${key}: any ${value.nullable ? '| null' : ''} ${
          value.optional ? '| undefined' : ''
        }`;
      // return `    ${key}: ${value.type}`;
    }
  })
  .join('\n')}
}`;
    /*
{
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: [Object],
      tenantId: [Object],
      name: [Object],
      primary: [Object],
      type: [Object],
      verified: [Object],
      verificationRecordType: [Object],
      verificationRecordDomain: [Object],
      verificationRecordValue: [Object],
      verificationRecordReason: [Object],
      createdAt: [Object],
      updatedAt: [Object]
    },
    required: [
      'id',
      'tenantId',
      'name',
      'primary',
      'type',
      'verified',
      'verificationRecordType',
      'verificationRecordDomain',
      'verificationRecordValue',
      'verificationRecordReason',
      'createdAt',
      'updatedAt'
    ],
    additionalProperties: false
  }
} 
*/
    case 'array':
      return `{
${Object.entries(responseObject.items.properties)
  .map(
    ([key, value]) =>
      `    ${key}: ${responseObjectToInterface(value)} ${
        value.nullable ? '| null' : ''
      }`,
  )
  .join('\n')}
}[]`;

    /* 
{
  anyOf: [
    { not: {} },
    {
      type: 'object',
      properties: [Object],
      required: [Array],
      additionalProperties: false,
      nullable: true
    }
  ]
}
*/
    case undefined:
    case 'anyOf':
      if (responseObject.anyOf === undefined) {
        break;
      }
      return `${responseObject.anyOf
        .map((anyOf: ResponseObject) => responseObjectToInterface(anyOf))
        .join(' | ')}`;

    case 'string':
      return `string `;

    case 'number':
      return `number`;

    case 'boolean':
      return `boolean`;
  }

  if (typeof responseObject === 'object' && 'not' in responseObject) {
    return 'null';
  }

  return `unknown`;
}
