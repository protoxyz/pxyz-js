import { Command } from 'commander';
import * as z from 'zod';
import { handleError } from '../utils/handle-error';
import ora from 'ora';
import http from 'http';
import open from 'open';
import { getConfig } from '../utils/get-config';

const genClientOptionsSchema = z.object({
  url: z.string().url(),
  output: z.string(),
});

export const genClient = new Command()
  .name('gen:client')
  .description('Generate a typescript client for your OpenAPI swagger doc')

  .argument('<url>', 'The url of your OpenAPI swagger doc.')
  .argument('<output>', 'The output directory for the client project.')

  .action(async (url, output) => {
    try {
      const options = genClientOptionsSchema.parse({
        url,
        output,
      });

      console.log('options', options);

      const spinner = ora(`Opening browser to login screen...`).start();

      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
