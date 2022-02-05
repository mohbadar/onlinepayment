package af.asr.opbo.opbo.onlinecollection;

import lombok.Data;

@Data
public class ResponseToken {
    private String issuer;
    private String token_endpoint;
    private String authorization_endpoint;
    private String token_introspection_endpoint;
    private String userinfo_endpoint;
    private String end_session_endpoint;
    private String jwks_uri;
    private String check_session_iframe;
    private String grant_types_supported;
    private String response_types_supported;
    private String subject_types_supported;
    private String id_token_signing_alg_values_supported;
    private String id_token_encryption_alg_values_supported;
    private String id_token_encryption_enc_values_supported;
    private String userinfo_signing_alg_values_supported;
    private String request_object_signing_alg_values_supported;
    private String response_modes_supported;
    private String registration_endpoint;
    private String token_endpoint_auth_methods_supported;
    private String token_endpoint_auth_signing_alg_values_supported;
    private String claims_supported;
    private String claim_types_supported;
    private String claims_parameter_supported;
    private String scopes_supported;
    private String request_parameter_supported;
    private String request_uri_parameter_supported;
    private String code_challenge_methods_supported;
    private String tls_client_certificate_bound_access_tokens;
    private String introspection_endpoint;

}
