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
public class BillSlipTracker extends BaseEntity {

    @NotNull
    @Column(nullable=false)
    private String billPaymentId;
    @NotNull
    @Column(nullable=false)
    private String billId;
    @NotNull
    @Column(nullable=false)
    private String issueDate;
    @NotNull
    @Column(nullable=false)
    private BigDecimal amount;
    private String cycle;
    private String cycleYear;
}
