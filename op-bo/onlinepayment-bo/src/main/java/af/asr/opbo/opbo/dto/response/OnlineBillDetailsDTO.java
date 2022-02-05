package af.asr.opbo.opbo.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OnlineBillDetailsDTO {

    private String billNo;
    private String billHolderName;
    private String billDate;
    private BigDecimal billAmount;
    private String cycle;
    private String cycleYear;
    private boolean paid;
    private String organizationId;
    private String billTypeId;
    private Integer numberOfItems;

}
