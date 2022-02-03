package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrganizationAccountCreditDTO {

    private String organizationId;
    private BigDecimal amount;
    private String name;
    private String code;
    private String jReferenceNo;
    private String accountNumber;
    private String rjDate;
    private String province;
    private String offlineCollectionDate;
    private String rjReason;
    private String rjType;
}
