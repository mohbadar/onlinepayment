package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class UserBillPaymentStatementDTO {
    private String billNo;
    private String billDate;
    private BigDecimal billAmount;
    private Integer numberOfItems;
    private String receiptNo;
    private boolean confirmed;
    private String confirmDate;
    private String confirmUserName;
}
