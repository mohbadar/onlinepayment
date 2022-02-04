package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum  AuthorizationType {
    NO_AUTH("NO_AUTH"),
    API_KEY("API_KEY"),
    BEAR_TOKEN("BEAR_TOKEN"),
    BASIC_AUTH("BASIC_AUTH"),
    DIGEST_AUTH("DIGEST_AUTH"),
    OAUTH1("OAUTH1"),
    OAUTH2("OAUTH2");

    private String value;
}
