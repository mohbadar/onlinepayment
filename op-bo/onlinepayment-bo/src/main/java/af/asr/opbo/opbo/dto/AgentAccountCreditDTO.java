package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AgentAccountCreditDTO {
    private String agentId;
    private BigDecimal amount;
    private String firstname;
    private String lastname;
    private String jReferenceNo;
    private String accountNumber;
    private String rjDate;
    private String province;
    private String offlineCollectionDate;
    private String rjReason;
    private String rjType;
}
