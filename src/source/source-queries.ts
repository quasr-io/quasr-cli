import { gql } from 'graphql-request';

export const listSources = gql`
    listSources {
        items {
            id
            label
            attribute
            factor
            claim
            status
            subtype
            config {
                bidirectional
            }
        }
    }`;