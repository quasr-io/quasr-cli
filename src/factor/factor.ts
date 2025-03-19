import ListCommand from './factor-list.js';
import { Command } from 'commander';

export default function setup() {
    const program = new Command('factor');
    program
      .description('Manage Factors')
      .addCommand(ListCommand());

    return program;
}
