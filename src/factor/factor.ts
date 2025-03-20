import { QuasrListCommand } from '../QuasrListCommand.js';
import { Command } from 'commander';
import { listFactors } from './factor-queries.js';

export default function setup() {
    const program = new Command('factor');
    program
      .description('Manage Factors')
      .addCommand(new QuasrListCommand('list', listFactors));

    return program;
}
