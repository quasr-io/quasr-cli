import { Command } from 'commander';
import * as fs from 'fs';
import { cacheFilePath } from './tenant.js';
import { getBearerToken } from '../utils.js';


export default function setup() {
    const program = new Command('add');
    program
        .description('Add a new tenant')
        .argument('<name>', 'Name for the tenant')
        .argument('<tenantId>', 'The Tenant Id')
        .argument('<clientId>', 'The Client Id')
        .argument('<clientSecret>', 'The Client Secret')
        .option('-e, --endpoint <string>', 'Quasr API Endpoint', 'api.quasr.io')
        .option('-t, --token-path <string>', 'OAuth2.0 Token path', '/oauth2/token')
        .action(async (name: string, tenantId: string, clientId: string, clientSecret: string, options: any) => {
            if (!fs.existsSync(cacheFilePath)) {
                fs.writeFileSync(cacheFilePath, JSON.stringify([], null, 2));
            }
            const endpoint = options.endpoint;
            const tokenPath = options.tokenPath;
            const access_token = await getBearerToken(tenantId, endpoint, tokenPath, clientId, clientSecret);
            const newTenant = {
                "name": name,
                "tenantId": tenantId,
                "clientId": clientId,
                "clientSecret": clientSecret,
                "tokenPath": tokenPath,
                "endpoint": endpoint,
                "access_token": access_token
            }
            try {
                const tenants = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
                if (tenants.find((tenant: any) => tenant.name === name)) {
                    console.log('A tenant already exists with this name: ', name);
                } else {
                    tenants.push(newTenant);
                    fs.writeFileSync(cacheFilePath, JSON.stringify(tenants, null, 2));
                    console.log("Successfully added tenant: ", name);
                }
            } catch (error) {
                console.error('Error while adding a tenant :', error);
            }
        })

    return program;
}