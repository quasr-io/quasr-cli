import { QuasrListCommand } from '../QuasrListCommand.js';
import { Command } from 'commander';
import { listControls } from './control-queries.js';

export default function setup() {
    const program = new Command('control');
    program
      .description('Manage Controls')
      .addCommand(new QuasrListCommand('list', listControls));


    return program;
}