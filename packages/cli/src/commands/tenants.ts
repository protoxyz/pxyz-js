import { Command } from 'commander';
import { handleError } from '../utils/handle-error';
import ora from 'ora';
import { listTenants, createTenant } from '@protoxyz/client-backend';
import { deleteConfig, getConfig } from '@/utils/get-config';

export const tenants = new Command()
  .name('tenants')
  .description('manage protocol tenants');

const list = tenants
  .command('list')
  .description('list tenants')
  .action(async (components, opts) => {
    try {
      const config = await getConfig(process.cwd());

      if (!config || !config.jwt) {
        throw new Error('You must be logged in to list tenants.');
      }

      const results = await listTenants({
        token: config?.jwt,
      });

      if (results.code === 'UNAUTHORIZED') {
        await deleteConfig(process.cwd());
        process.exit(0);
      }

      console.table(results, ['id', 'name', 'slug', 'environment']);
    } catch (error) {
      handleError(error);
    }
  });

const create = tenants
  .command('create')
  .description('create a tenant')
  .action(async (components, opts) => {
    try {
      const config = await getConfig(process.cwd());

      if (!config || !config.jwt) {
        throw new Error('You must be logged in to create a tenant.');
      }

      const results = await createTenant({
        token: config?.jwt,
      });

      console.table(results, ['id', 'name', 'slug', 'environment']);
    } catch (error) {
      handleError(error);
    }
  });
