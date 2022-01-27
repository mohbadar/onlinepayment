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
public class Bill extends BaseEntity {
    private String billNo;
    private BigDecimal billAmount;
    private BigDecimal feeAmount;
    private BigDecimal totalAmount;
    private BigDecimal stationaryAmount;
    private BigDecimal otherChargesAmount;
    private String billDate;
    private String cycle;
    private String cycleYear;
    private String tarrifId;
    private String feeModelId;
    private String billTypeId;
    private String centerId;
    private String organizationId;
}
