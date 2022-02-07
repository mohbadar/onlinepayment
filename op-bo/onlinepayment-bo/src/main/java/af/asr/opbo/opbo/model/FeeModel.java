package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import af.asr.opbo.opbo.enums.FeeInclusion;
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
public class FeeModel extends BaseEntity {

    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    @Column(nullable = false)
    private  boolean isItemBased;
    @NotNull
    @Column(nullable = false)
    private String type; //percentage or exact amount
    @NotNull
    @Column(nullable = false)
    private BigDecimal percentage;
    @NotNull
    @Column(nullable = false)
    private BigDecimal amount;
    @NotNull
    @Column(nullable = false)
    private BigDecimal agentFeePercentage;
    @NotNull
    @Column(nullable = false)
    private BigDecimal agentFeeAmount;

    @Column(nullable = false)
    private FeeInclusion feeInclusion = FeeInclusion.INCLUDED;

}
