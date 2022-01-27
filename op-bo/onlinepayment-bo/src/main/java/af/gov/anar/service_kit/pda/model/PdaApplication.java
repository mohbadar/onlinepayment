package af.gov.anar.service_kit.pda.model;

import af.gov.anar.service_kit.infrastructure.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "nid_pda_application")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Where(clause = "deleted is false")
public class PdaApplication  extends BaseEntity {

    @Column(nullable = false)
    private String nidFamilyNo;

    @Column()
    private String onlineFormFamilyNo;

    @Column(nullable = false)
    private String docPath;

    @Column()
    private String docOriginalName;

    @Column()
    private long docNumOfPages;

    @Column()
    private boolean verified;

    @Column()
    private boolean rejected;

}
