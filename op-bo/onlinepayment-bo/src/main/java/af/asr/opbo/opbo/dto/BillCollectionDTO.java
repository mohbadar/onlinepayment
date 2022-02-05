package af.asr.opbo.opbo.dto;

import af.asr.opbo.opbo.enums.BillingChannel;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BillCollectionDTO {
    private String billNo;
    private boolean posted;
    private String paymentType;
    private BigDecimal paidAmount;
    private BigDecimal tenderedAmount;
    private String agentId;
    private BillingChannel billingChannel;
}
