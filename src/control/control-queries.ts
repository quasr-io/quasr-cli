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