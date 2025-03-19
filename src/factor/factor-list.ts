
import { gql } from 'graphql-request';
import { makeQuery, getBearerToken } from '../utils.js';
import { QuasrCommand } from '../QuasrCommand.js';

export default function setup() {
    const program = new QuasrCommand('list')
    program
        .description('List all factors')
        .action(
            async (tenantId: string, clientId: string, clientSecret: string, options: any) => {
                const tokenPath = options.tokenPath;
                const endpoint = options.endpoint;
                const bearerToken = await getBearerToken(tenantId, endpoint, tokenPath, clientId, clientSecret);
                // Define the GraphQL query
                const query = gql`
                   query ListFactors {
                     listFactors {
                         nextToken
                         items {
                             id
                             subtype
                             label
                             score
                             created_at
                             created_by
                             updated_at
                             updated_by
                             config {
                                 unique
                                 internal
                                 restricted
                                 case_sensitive
                                 require_validation_for_enablement
                                 max_attempts
                                 auto_unlock
                                 expires_in
                                 regex
                                 threshold
                                 token_regex
                                 otp
                                 issuer
                                 digits
                                 step
                                 window
                                 authorization_endpoint
                                 userinfo_endpoint
                                 token_endpoint
                                 jwks_uri
                                 response_mode
                                 response_type
                                 content_type
                                 claim
                                 scope
                                 nonce
                                 nonce_regex
                                 code_challenge_method
                                 code_challenge_regex
                                 signed_request
                                 client_authentication
                                 client_id
                                 client_secret
                                 capture_claims
                                 capture_tokens
                                 capture_input
                             }
                             status
                         }
                     }
                 }`;
                const graphqlUrl = `https://${tenantId}.${endpoint}/graphql`;
                const result = await makeQuery(graphqlUrl, query, bearerToken);
                console.log('Result:', JSON.stringify(result, null, 2));
            });

    return program;
}