import { QuasrListCommand } from '../QuasrListCommand.js';
import { Command } from 'commander';
import { listSources } from './source-queries.js';

export default function setup() {
    const program = new Command('source');
    program
      .description('Manage Sources')
      .addCommand(new QuasrListCommand('list', listSources));

    return program;
}
