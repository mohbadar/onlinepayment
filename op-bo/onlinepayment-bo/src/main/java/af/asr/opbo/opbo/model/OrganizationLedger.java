package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
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
// class to track payments made to an organization
public class OrganizationLedger extends BaseEntity {
    @NotNull
    @Column(nullable=false)
    private String organizationId;
    @NotNull
    @Column(nullable=false)
    private String balanceDate;
    @NotNull
    @Column(nullable=false)
    private BigDecimal credit;
    @NotNull
    @Column(nullable=false)
    private BigDecimal debit;
    @NotNull
    @Column(nullable=false)
    private String transactionId;
    private String channel;
    private String billId;
    private String billPaymentId;
    private String rectifiedJournalEntryId;
}
