import { QuasrListCommand } from '../QuasrListCommand.js';
import { Command } from 'commander';
import { listAttributes } from './attribute-queries.js';

export default function setup() {
    const program = new Command('attribute');
    program
      .description('Manage Attributes')
      .addCommand(new QuasrListCommand('list', listAttributes));


    return program;
}