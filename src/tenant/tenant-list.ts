import { Command } from 'commander';
import * as fs from 'fs';
import { cacheFilePath } from './tenant.js';


export default function setup() {
    const program = new Command('list');
    program
        .description('List all locally cached tenants')
        .action(async () => {
            if (!fs.existsSync(cacheFilePath)) {
                console.log('No tenants saved.');
            } else {
                try {
                    const data = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
                    data.map((tenant: any) => console.log(tenant.name));
                } catch (error) {
                    console.error('Error getting the tenants:', error);
                }
            }
        })

    return program;
}