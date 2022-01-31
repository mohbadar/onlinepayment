package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Where(clause = "deleted is false")
public class BillPayment extends BaseEntity {
    private String agentId;
    private String billId;
    private String tarrifId;
    private String channelId;
    private String centerId;
    private String organizationId;
    private String provinceId;
    private String billTypeId;
    private String feeModelId;
    private String paymentDate;
    private BigDecimal paidAmount;
    private String cycleYear;
    private String cycle;
    private String receiptNo;
    private String paymentType;
    private BigDecimal tenderedAmount;
    private boolean posted;

    private boolean confirmed;
    private String confirmUserId;
    private String confirmUserName;
    private String confirmDate;

}
