package af.asr.opbo.opbo.dto;

import lombok.Data;

@Data
public class QueryOnlineBillInfoDTO {
    private String billTypeId;
    private String organizationId;
    private String billIdentifier;
}
