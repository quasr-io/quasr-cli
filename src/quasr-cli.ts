#!/usr/bin/env node
// Import necessary libraries
import { Command } from 'commander';
import attribute from './attribute/attribute.js';
import control from './control/control.js';
import extension from './extension/extension.js';
import factor from './factor/factor.js';
import tenant from './tenant/tenant.js';


// Initialize commander
const program = new Command("quasr-cli");

program
  .description('Manage a Quasr tenant')
  .addCommand(tenant())
  .addCommand(attribute())
  .addCommand(control())
  .addCommand(extension())
  .addCommand(factor())

program.parseAsync(process.argv);