import { Command } from 'commander';
import * as z from 'zod';
import path from 'path';
import { handleError } from '../utils/handle-error';
import ora from 'ora';
import http from 'http';
import open from 'open';

const loginOptionsSchema = z.object({});

export const login = new Command()
  .name('login')
  .description('login to protocol')

  .action(async (components, opts) => {
    try {
      const options = loginOptionsSchema.parse({
        components,
        ...opts,
      });

      const port = 8085;
      const redirectUri = `http://localhost:${port}/callback`;
      const IS_PROTOCOL_DEV = !!process.env.IS_PROTOCOL_DEV;
      const loginUrl = IS_PROTOCOL_DEV
        ? `http://localhost:3002/sign-in?redirectUri=${redirectUri}`
        : `https://id.pxyz.dev/sign-in?redirectUri=${redirectUri}`;

      // open server to handle jwt token callback
      const server = http.createServer((req, res) => {
        const { url } = req;

        if (url?.startsWith('/callback')) {
          const jwt = url.split('jwt=')[1];

          if (jwt) {
            res.write('Successfully logged in! You can close this tab now.');

            server.close();
          } else {
            res.write("Couldn't find jwt token");
          }
        }

        res.end();
      });

      const spinner = ora(`Opening browser to login screen...`).start();

      // open browser to login screen
      await open(loginUrl);

      server.listen(port, () => {
        spinner.succeed(`Started local server`);
      });

      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
