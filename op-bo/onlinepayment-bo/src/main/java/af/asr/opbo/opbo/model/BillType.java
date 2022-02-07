package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import af.asr.opbo.opbo.enums.BillingChannel;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
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
//    @NotNull
//    @Column(nullable=false)
    private String centerId;
    @NotNull
    @Column(nullable=false)
    private String feeModelId;
    @NotNull
    @Column(nullable=false)
    private BigDecimal pricePerItem;

    @Enumerated(value = EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private BillingChannel billingChannel;

    private String thirdPartyIntegrationId;

}
