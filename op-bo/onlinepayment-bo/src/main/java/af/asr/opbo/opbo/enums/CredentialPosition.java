package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CredentialPosition {

    HEADER("HEADER"),
    QUERY_PARAMS("QUERY_PARAMS");

    private String value;
}
