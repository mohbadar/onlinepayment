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
public class AgentAccountPayment extends BaseEntity {
    private String agentId;
    private String channelId;
    private String paymentDate;
    private String cycle;
    private String cycleYear;
    private BigDecimal amount;
}
