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
// class to track payments made to an agent
public class AgentPayment extends BaseEntity {
    @Column(nullable = false)
    @NotNull
    private String agentId;
    @Column(nullable = false)
    private String paymentDate;
    @Column(nullable = false)
    @NotNull
    private BigDecimal paymentAmount;
    @Column(nullable = false)
    private String transactionId;
    @Column(nullable = false)
    @NotNull
    private String channel;

    @Column(nullable = false)
    private String rectifiedJournalEntryId;

}
