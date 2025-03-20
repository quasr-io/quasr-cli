import { QuasrCommand } from "./QuasrCommand.js";
import { gql } from 'graphql-request';
import { executeQuery, getBearerToken } from './utils.js';

export class QuasrListCommand extends QuasrCommand {
    constructor(name: string, query: string) {
        super(name);
        this.action(
            async (tenantId: string, clientId: string, clientSecret: string, options: any) => {
                const tokenPath = options.tokenPath;
                const endpoint = options.endpoint;
                const bearerToken = await getBearerToken(tenantId, endpoint, tokenPath, clientId, clientSecret);
                const queryToExecute = gql`query {${query}}`;
                const graphqlUrl = `https://${tenantId}.${endpoint}/graphql`;
                const result = await executeQuery(graphqlUrl, queryToExecute, bearerToken);
                console.log(JSON.stringify(result, null, 2));
            })

    };
}