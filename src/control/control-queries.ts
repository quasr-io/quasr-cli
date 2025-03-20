import { gql } from 'graphql-request';

export const listControls = gql`
    listControls {
        items {
            id
            subtype
            status
            label
            value
            score
            created_at
            created_by
            updated_at
            updated_by
            config {
                consent_required
                permission_required
                attributes {
                    identity
                    access
                }
            }
        }
    }`;