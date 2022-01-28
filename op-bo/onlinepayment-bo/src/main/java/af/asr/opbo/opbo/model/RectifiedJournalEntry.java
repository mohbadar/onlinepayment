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
public class RectifiedJournalEntry extends BaseEntity {
    private String rjno;
    private String rjdate;
    private String agentId;
    private BigDecimal creditAmount;
    private BigDecimal debitAmount;
    private String rjReason;
    private String rjType;
    private String effectedDate;
}
