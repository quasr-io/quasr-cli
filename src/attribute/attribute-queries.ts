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
            created_at
            created_by
            updated_at
            updated_by
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