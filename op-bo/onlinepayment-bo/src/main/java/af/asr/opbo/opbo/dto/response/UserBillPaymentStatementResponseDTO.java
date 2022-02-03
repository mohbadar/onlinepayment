package af.asr.opbo.opbo.dto.response;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class UserBillPaymentStatementResponseDTO {
    private String billNo;
    private String billDate;
    private String billAmount;
    private String numberOfItems;
    private String receiptNo;
    private String confirmed;
    private String confirmDate;
    private String confirmUserName;
}
