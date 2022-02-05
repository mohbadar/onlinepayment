package af.asr.opbo.opbo.dto;

import af.asr.opbo.opbo.enums.BillingChannel;
import lombok.Data;

@Data
public class IssueBillDTO {
    private String centerId;
    private String billTypeId;
    private Integer numberOfItems;
    private String organizationUniqueBillIdentifier;
}
