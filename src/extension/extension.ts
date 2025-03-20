import { QuasrListCommand } from '../QuasrListCommand.js';
import { Command } from 'commander';
import { listExtensions } from './extension-queries.js';

export default function setup() {
    const program = new Command('extension');
    program
      .description('Manage Extensions')
      .addCommand(new QuasrListCommand('list', listExtensions));


    return program;
}