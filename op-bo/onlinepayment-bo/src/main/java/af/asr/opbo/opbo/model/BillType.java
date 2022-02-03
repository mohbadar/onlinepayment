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
public class BillType extends BaseEntity {
    @NotNull
    @Column(nullable=false, unique = true)
    private String name;
    private String tariffId;
    @NotNull
    @Column(nullable=false)
    private String provinceId;
    @NotNull
    @Column(nullable=false)
    private String organizationId;
    @NotNull
    @Column(nullable=false)
    private String centerId;
    @NotNull
    @Column(nullable=false)
    private String feeModelId;
    @NotNull
    @Column(nullable=false)
    private BigDecimal pricePerItem;
}
