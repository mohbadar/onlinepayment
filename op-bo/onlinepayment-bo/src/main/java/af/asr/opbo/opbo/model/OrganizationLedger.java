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
// class to track payments made to an organization
public class OrganizationLedger extends BaseEntity {
    private String organizationId;
    private String balanceDate;
    private BigDecimal credit;
    private BigDecimal debit;
    private String transactionId;
    private String channel;
    private String billId;
    private String billPaymentId;
    private String rectifiedJournalEntryId;
}
