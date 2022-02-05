package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import af.asr.opbo.opbo.enums.BillingChannel;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @NotNull
    @Column(nullable=false)
    private String agentId;
    private String billId;
    private String tarrifId;
    private String channelId;
    @NotNull
    @Column(nullable=false)
    private String centerId;
    @NotNull
    @Column(nullable=false)
    private String organizationId;
    @NotNull
    @Column(nullable=false)
    private String provinceId;
    @NotNull
    @Column(nullable=false)
    private String billTypeId;
    @NotNull
    @Column(nullable=false)
    private String feeModelId;
    @NotNull
    @Column(nullable=false)
    private String paymentDate;
    @NotNull
    @Column(nullable=false)
    private BigDecimal paidAmount;
    private String cycleYear;
    private String cycle;
    @NotNull
    @Column(nullable=false, unique = true)
    private String receiptNo;
    @NotNull
    @Column(nullable=false)
    private String paymentType;
    private BigDecimal tenderedAmount;
    private boolean posted;
    @Enumerated(EnumType.STRING)
    private BillingChannel billingChannel = BillingChannel.OFFLINE;

    @Column(nullable=false)
    private boolean confirmed =false;
    private String confirmUserId;
    private String confirmUserName;
    private String confirmDate;

}
