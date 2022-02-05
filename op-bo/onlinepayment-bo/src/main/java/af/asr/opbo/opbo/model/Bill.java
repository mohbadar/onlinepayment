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
public class Bill extends BaseEntity {

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BillingChannel billingChannel = BillingChannel.OFFLINE;

    @NotNull
    @Column(unique = true)
    private String billNo;
    @NotNull
    @Column(nullable=false)
    private Integer numberOfItems;
    @NotNull
    @Column(nullable=false)
    private BigDecimal princePerItem;
    @NotNull
    @Column(nullable=false)
    private String organizationUniqueBillIdentifier;
    @NotNull
    @Column(nullable=false)
    private BigDecimal billAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal feeAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal agentFeeAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal totalAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal stationaryAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal otherChargesAmount;
    @NotNull
    @Column(nullable=false)
    private String billDate;
    private String cycle;
    private String cycleYear;
    private String tarrifId;
    @NotNull
    @Column(nullable=false)
    private String feeModelId;
    @NotNull
    @Column(nullable=false)
    private String billTypeId;
    @NotNull
    @Column(nullable=false)
    private String centerId;
    @NotNull
    @Column(nullable=false)
    private String organizationId;
    private String billDueDate;
    @Column(nullable=false)
    private boolean amountPayFlag=false;

    private boolean clearedWithAgent;
    private String agentFeeId;
    private String agentClearanceDate;
}
