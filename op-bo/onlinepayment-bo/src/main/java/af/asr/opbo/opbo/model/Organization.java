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
public class Organization extends BaseEntity {
    private String name;
    private String code;
    private String address;
    private String phone;
    private String email;
    private boolean servicesEnabled;
    private String provinceId;
//    @Column(nullable = false)
    private String accountNo;
}
