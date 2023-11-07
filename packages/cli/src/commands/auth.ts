import { Command } from 'commander';
import * as z from 'zod';
import { handleError } from '../utils/handle-error';
import ora from 'ora';
import http from 'http';
import open from 'open';
import {
  RawConfig,
  deleteConfig,
  getConfig,
  writeConfig,
} from '../utils/get-config';
import { ResponseStatus } from '@protoxyz/types';
import { profile } from '@protoxyz/client-frontend';
// import { ResponseStatus } from '@protoxyz/types';

const loginOptionsSchema = z.object({});

export const auth = new Command().name('auth');

const token = auth
  .command('token')
  .description('get auth token')
  .action(async (components, opts) => {
    const config = await getConfig(process.cwd());

    if (!config || !config.jwt) {
      throw new Error('You must be logged in to get an auth token.');
    }

    console.log(config.jwt);
  });

const login = auth
  .command('login')
  .description('login to protocol')

  .action(async (components, opts) => {
    try {
      const options = loginOptionsSchema.parse({
        components,
        ...opts,
      });

      const port = 8085;
      const redirectUri = `http://localhost:${port}/callback`;
      const IS_DEVELOPMENT = process.env.PROTOCOL_ENV === 'development';
      const loginUrl = IS_DEVELOPMENT
        ? `http://localhost:3002/sign-in?redirectUri=${redirectUri}`
        : `https://id.pxyz.dev/sign-in?redirectUri=${redirectUri}`;

      // open server to handle jwt token callback
      const server = http.createServer(async (req, res) => {
        const { url } = req;

        if (url?.startsWith('/callback')) {
          const jwt = url.split('jwt=')[1];

          if (jwt) {
            res.write('Successfully logged in! You can close this tab now.');

            // console.log('jwt', jwt);

            // const client = new ProtocolFrontendClient({
            //   accessToken: jwt,
            //   baseUrl: 'localhost:3002',
            //   debug: false,
            // });

            const profileResponse = await profile({
              token: jwt,
            });

            console.log('profileResponse', profileResponse);

            if (
              profileResponse.status === ResponseStatus.Success &&
              profileResponse.data?.user
            ) {
              server.close();

              const newConfig: RawConfig = {
                id: profileResponse.data.user.id,
                user: profileResponse.data.user,
                jwt,
              };

              writeConfig(newConfig, process.cwd());
            } else {
              res.write('Error getting user profile');
              console.log(profileResponse);
            }
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

const logout = auth
  .command('logout')
  .description('logout of protocol')
  .action(async (components, opts) => {
    deleteConfig(process.cwd());
  });

const status = auth
  .command('status')
  .description('check auth status')
  .action(async (components, opts) => {
    const config = await getConfig(process.cwd());

    if (!config) {
      console.log('Not logged in');
    } else {
      const primaryEmail = config.user?.emailAddresses.find(
        (email) => email.id === config.user?.primaryEmailId,
      )?.email;
      console.log(`Logged in as ${config.user?.name} <${primaryEmail}>`);
    }
  });
