package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
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
public class Agent extends BaseEntity {

    @Column(nullable = false)
    private String firstname;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = true)
    private String email;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String accountNo;
    @Column(nullable = false)
    private String fathername;
    @Column(nullable = false)
    private String grantFathername;
    @Column(nullable = false)
    private String tazikraNo;
    @Column(nullable = true)
    private String tazkiraFilePath;
    @Column(nullable = true)
    private String imagePath;
    @Column(nullable = true)
    private String friedAccountNo1;
    @Column(nullable = true)
    private String friedAccountNo2;
    @Column(nullable = false)
    private String provinceId;
    @Column(nullable = false)
    private String organizationId;
    @Column(nullable = false)
    private String centerId;
}
