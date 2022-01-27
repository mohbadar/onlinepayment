package af.asr.opbo.infrastructure.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RecordStatus {

    ACTIVE("ACTIVE"), INACTIVE("INACTIVE");

    private final String content;
}