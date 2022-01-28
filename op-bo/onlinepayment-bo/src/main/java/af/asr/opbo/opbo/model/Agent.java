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
public class Agent extends BaseEntity {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String address;
    private String accountNo;
    private String fathername;
    private String grantFathername;
    private String tazikraNo;
    private String tazkiraFilePath;
    private String imagePath;
    private String friedAccountNo1;
    private String friedAccountNo2;
    private String provinceId;
}
