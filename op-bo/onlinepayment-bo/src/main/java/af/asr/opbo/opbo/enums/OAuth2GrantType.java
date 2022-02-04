package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum  OAuth2GrantType {
    AUTHORIZATION_CODE("AUTHORIZATION_CODE"),
    AUTHORIZATION_CODE_WITH_PKCE("AUTHORIZATION_CODE_WITH_PKCE"),
    IMPLICIT("IMPLICIT"),
    PASSWORD_CREDENTIALS("PASSWORD_CREDENTIALS"),
    CLIENT_CREDENTIALS("CLIENT_CREDENTIALS");

    private String value;
}
