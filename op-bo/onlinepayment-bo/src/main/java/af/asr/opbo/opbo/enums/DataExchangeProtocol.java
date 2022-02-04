package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DataExchangeProtocol {

    JSON("JSON"),
    XML("XML");

    private String value;
}
