package af.asr.opbo.opbo.dto;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class UserBillPaymentStatementDTO {
    private String billNo;
    private String billDate;
    private String billAmount;
    private String numberOfItems;
    private String receiptNo;
    private String confirmed;
    private String confirmDate;
    private String confirmUserName;
}
