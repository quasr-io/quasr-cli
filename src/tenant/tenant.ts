import { Command } from 'commander';
import ListCommand from './tenant-list.js';
import AddCommand from './tenant-add.js';
import RefreshCommand from './tenant-refresh.js';

export const cacheFilePath = '.quasrCache';

export default function setup() {
    const program = new Command('tenant');
    program
      .description('Manage locally cached tenants')
      .addCommand(ListCommand())
      .addCommand(AddCommand())
      .addCommand(RefreshCommand())

    return program;
}