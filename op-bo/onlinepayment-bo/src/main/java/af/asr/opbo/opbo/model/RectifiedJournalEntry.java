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
public class RectifiedJournalEntry extends BaseEntity {
    @NotNull
    @Column(nullable=false, unique = true)
    private String rjno;
    @NotNull
    @Column(nullable=false)
    private String rjdate;
    private String agentId;
    private String organizationId;
    @NotNull
    @Column(nullable=false)
    private BigDecimal creditAmount;
    @NotNull
    @Column(nullable=false)
    private BigDecimal debitAmount;
    @NotNull
    @Column(nullable=false)
    private String rjReason;
    @NotNull
    @Column(nullable=false)
    private String rjType;
    @NotNull
    @Column(nullable=false)
    private String effectedDate;
}
