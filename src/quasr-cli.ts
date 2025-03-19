#!/usr/bin/env node
// Import necessary libraries
import { Command } from 'commander';
import factor from './factor/factor.js';


// Initialize commander
const program = new Command("quasr-cli");

program
  .description('Manage a Quasr tenant')
  .addCommand(factor())

program.parseAsync(process.argv);