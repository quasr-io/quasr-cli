import { gql } from 'graphql-request';

export const listFactors = gql`
    listFactors {
        items {
            id
            subtype
            label
            score
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
    }`;