import { Command } from 'commander';
import * as fs from 'fs';
import { cacheFilePath } from './tenant.js';
import { getBearerToken } from '../utils.js';


export default function setup() {
    const program = new Command('refresh');
    program
        .description('Refresh the token of the tenant')
        .argument('<name>', 'Name for the tenant')
        .action(async (name: string, options: any) => {
            if (!fs.existsSync(cacheFilePath)) {
                console.log('No tenants saved.');
            } else {
                try {
                    let tenants = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
                    let tenant = tenants.find((tenant: any) => tenant.name === name)
                    if (tenant) {
                        tenant.access_token = await getBearerToken(tenant.tenantId, tenant.endpoint, tenant.tokenPath, tenant.clientId, tenant.clientSecret);
                        fs.writeFileSync(cacheFilePath, JSON.stringify(tenants, null, 2));
                        console.log('Refreshed the token of the tenant with name: ', name);
                    } else {
                        console.log('No tenant exists with this name: ', name);
                    }
                } catch (error) {
                    console.error('Error while adding a tenant :', error);
                }
            }
        })

    return program;
}