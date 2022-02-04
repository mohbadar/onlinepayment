package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum BillingChannel {
    ONLINE("ONLINE"),
    OFFLINE("OFFLINE");

    private String value;
}
