package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
    @NotNull
    private String firstname;
    @NotNull
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = true)
    private String email;
    @Column(nullable = false, unique = true)
    @NotNull
    private String phone;
    @Column(nullable = false)
    @NotNull
    private String address;
    @Column(nullable = false, unique = true)
    @NotNull
    private String accountNo;
    @Column(nullable = false)
    @NotNull
    private String fathername;
    @Column(nullable = false)
    @NotNull
    private String grantFathername;
    @Column(nullable = false)
    @NotNull
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
    @NotNull
    private String provinceId;
    @NotNull
    @Column(nullable = false)
    private String organizationId;
    @Column(nullable = false)
    @NotNull
    private String centerId;
}
