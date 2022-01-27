package af.asr.opbo.pda.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

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
