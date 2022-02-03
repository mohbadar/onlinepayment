package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
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
public class AgentFee extends BaseEntity {

    @Column(nullable = false)
    private String agentId;
    @Column(nullable = false)
    private String agentAccountNo;
    

    @Column(nullable = false)
    private String feeDate;
    @Column(nullable = false)
    private BigDecimal feeAmount;

    private String clearanceDate;
    @Column(nullable = false)
    private boolean cleared=false;
    @Column(nullable = false)
    private String billPaymentId;
    @Column(nullable = false)
    private String billId;
    @Column(nullable = false)
    private String agentLedgerId;
    @Column(nullable = false)
    private String transactionId;

    private String organizationId;

}
