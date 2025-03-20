import { gql } from 'graphql-request';

export const listExtensions = gql`
    listExtensions {
        nextToken
        items {
            id
            label
            status
            created_at
            created_by
            updated_at
            updated_by
            expires_at
            config {
                code
                rule {
                    type
                    origin
                    action
                    result
                    reason
                    account
                }
            }
        }
    }`;