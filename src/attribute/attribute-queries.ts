import { gql } from 'graphql-request';

export const listAttributes = gql`
    listAttributes {
        items {
            id
            label
            score
            value
            status
            subtype
            config {
                require_validation_for_enablement
                case_sensitive
                internal
                unique
                regex
                expires_in
                restricted
            }
        }
    }`;