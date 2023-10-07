#!/usr/bin/env node

import { Command } from 'commander';

import { getPackageInfo } from './utils/get-package-info';
import { login } from './commands/login';
import { genClient } from './commands/gen-client';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name('pxyz')
    .description('A CLI tool for managing your protocol tenant')
    .version(
      packageInfo.version || '1.0.0',
      '-v, --version',
      'display the version number',
    );

  program.addCommand(login).addCommand(genClient);

  // program.addCommand(init).addCommand(add).addCommand(diff);

  program.parse();
}

main();
