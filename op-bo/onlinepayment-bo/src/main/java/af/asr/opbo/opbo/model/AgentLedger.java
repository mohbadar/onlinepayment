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
public class AgentLedger extends BaseEntity {
    private String agentId;
    private String balanceDate;
    private BigDecimal credit;
    private BigDecimal debit;
    private BigDecimal balance;
    private String billId;
    private String cycle;
    private String cycleYear;
    private String billPaymentId;
    private String agentAccountPaymentId;

}
