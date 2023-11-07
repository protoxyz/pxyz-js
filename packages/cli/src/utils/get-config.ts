import path from 'path';
import { existsSync, promises as fs } from 'fs';
import { cosmiconfig } from 'cosmiconfig';
import { loadConfig } from 'tsconfig-paths';
import * as z from 'zod';
import { resolveImport } from './resolve-import';
import { logger } from './logger';
import ora from 'ora';
import { AuthUserStatus } from '@protoxyz/types';

export const DEFAULT_STYLE = 'default';
export const DEFAULT_COMPONENTS = '@/components';
export const DEFAULT_UTILS = '@/lib/utils';
export const DEFAULT_TAILWIND_CSS = 'app/globals.css';
export const DEFAULT_TAILWIND_CONFIG = 'tailwind.config.js';
export const DEFAULT_TAILWIND_BASE_COLOR = 'slate';

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig('pxyz', {
  searchPlaces: ['pxyz.json'],
});

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    id: z.string().cuid(),
    jwt: z.string(),
    user: z.object({
      id: z.string().cuid(),
      name: z.string().nullable().optional(),
      username: z.string().nullable().optional(),
      imageUri: z.string().nullable().optional(),
      status: z.nativeEnum(AuthUserStatus).nullable(),
      roleId: z.string().cuid().nullable().optional(),
      role: z
        .object({
          id: z.string().cuid(),
          name: z.string(),
          permissions: z.array(z.string()),
        })
        .nullable()
        .optional(),
      primaryEmailId: z.string().cuid().nullable().optional(),
      primaryPhoneId: z.string().cuid().nullable().optional(),
      emailAddresses: z.array(
        z.object({
          id: z.string().cuid(),
          email: z.string().nullable().optional(),
          verifiedAt: z.string().nullable().optional(),
        }),
      ),
      phoneNumbers: z.array(
        z.object({
          id: z.string().cuid(),
          phone: z.string().nullable().optional(),
          verifiedAt: z.string().nullable().optional(),
        }),
      ),
      connections: z.array(
        z.object({
          id: z.string().cuid(),
          accessToken: z.string().nullable().optional(),
          refreshToken: z.string().nullable().optional(),
        }),
      ),
      organizations: z.array(
        z.object({
          id: z.string().cuid(),
          name: z.string(),
          slug: z.string(),
          imageUri: z.string().nullable().optional(),
        }),
      ),
      publicMeta: z.any(),
      timezone: z.string().nullable().optional(),
      locale: z.string().nullable().optional(),
    }),

    // style: z.string(),
    // rsc: z.coerce.boolean().default(false),
    // tsx: z.coerce.boolean().default(true),
    // tailwind: z.object({
    //   config: z.string(),
    //   css: z.string(),
    //   baseColor: z.string(),
    //   cssVariables: z.boolean().default(true),
    // }),
    // aliases: z.object({
    //   components: z.string(),
    //   utils: z.string(),
    // }),
  })
  .strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  // resolvedPaths: z.object({
  //   tailwindConfig: z.string(),
  //   tailwindCss: z.string(),
  //   utils: z.string(),
  //   components: z.string(),
  // }),
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return config;
  // return await resolveConfigPaths(cwd, config);
}

// export async function resolveConfigPaths(cwd: string, config: RawConfig) {
//   // Read tsconfig.json.
//   const tsConfig = await loadConfig(cwd);

//   if (tsConfig.resultType === 'failed') {
//     throw new Error(
//       `Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim(),
//     );
//   }

//   return configSchema.parse({
//     ...config,
//     resolvedPaths: {
//       tailwindConfig: path.resolve(cwd, config.tailwind.config),
//       tailwindCss: path.resolve(cwd, config.tailwind.css),
//       utils: await resolveImport(config.aliases['utils'], tsConfig),
//       components: await resolveImport(config.aliases['components'], tsConfig),
//     },
//   });
// }

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/pxyz.json.`);
  }
}

export async function writeConfig(
  config: RawConfig,
  cwd: string,
): Promise<RawConfig | null> {
  // Write to file.
  logger.info('');
  const spinner = ora(`Writing pxyz.json...`).start();
  const targetPath = path.resolve(cwd, 'pxyz.json');
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
  spinner.succeed();

  return config;
}

export async function deleteConfig(cwd: string) {
  logger.info('');
  const spinner = ora(`Deleting pxyz.json...`).start();
  const targetPath = path.resolve(cwd, 'pxyz.json');
  await fs.unlink(targetPath);
  spinner.succeed();
}
