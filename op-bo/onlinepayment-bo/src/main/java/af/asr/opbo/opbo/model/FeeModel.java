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
public class FeeModel extends BaseEntity {

    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    @Column()
    private  boolean isItemBased;
    @NotNull
    @Column()
    private String type; //percentage or exact amount
    @NotNull
    @Column()
    private BigDecimal percentage;
    @NotNull
    @Column()
    private BigDecimal amount;
    @NotNull
    @Column()
    private BigDecimal agentFeePercentage;
    @NotNull
    @Column()
    private BigDecimal agentFeeAmount;

}
