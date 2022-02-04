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
public class AgentLedger extends BaseEntity {


    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private BillingChannel billingChannel = BillingChannel.OFFLINE;

    @NotNull
    @Column
    private String agentId;
    @NotNull
    @Column
    private String balanceDate;
    @NotNull
    @Column
    private BigDecimal credit;
    @NotNull
    @Column
    private BigDecimal debit;
    private String billId;
    private String cycle;
    private String cycleYear;
    private String billPaymentId;
    private String rectifiedJournalEntryId;

    @NotNull
    @Column(nullable=false)
    private String transactionId;

}
