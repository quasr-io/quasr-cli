import { gql } from 'graphql-request';

export const listExtensions = gql`
    listExtensions {
        nextToken
        items {
            id
            label
            status
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