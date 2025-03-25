import { QuasrCommand } from "./QuasrCommand.js";
import { gql } from 'graphql-request';
import { executeQuery, getBearerToken } from './utils.js';

export class QuasrListCommand extends QuasrCommand {
    constructor(name: string, query: string) {
        super(name);
        this.action(
            async (tenantId: string, clientId: string, clientSecret: string, options: any, command: any) => {
                command.handleDefaultArgsAndOpts(tenantId, clientId, clientSecret, options, command);
                const queryToExecute = gql`query {${query}}`;
                const graphqlUrl = `https://${this.tenantId}.${this.endpoint}/graphql`;
                const result = await executeQuery(graphqlUrl, queryToExecute, this.token);
                console.log(JSON.stringify(result, null, 2));
            })

    };
}