package af.asr.opbo.opbo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FeeInclusion {

    INCLUDED("INCLUDED"),
    NOT_INCLUDED("NOT_INCLUDED");

    private String value;
}
