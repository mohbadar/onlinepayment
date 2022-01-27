package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table()
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Where(clause = "deleted is false")
public class ClearanceTracker extends BaseEntity {
    private String userId;
    private String centerId;
    private String organizationId;
    private String result;
    private String type; // centerbased / organizationbased
    private String date;
}
