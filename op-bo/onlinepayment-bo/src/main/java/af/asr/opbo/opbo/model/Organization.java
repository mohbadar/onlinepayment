package af.asr.opbo.opbo.model;

import af.asr.opbo.infrastructure.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
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
public class Organization extends BaseEntity {
    @NotNull
    @Column(nullable=false, unique = true)
    private String name;
    @NotNull
    @Column(nullable=false, unique = true)
    private String code;

    @NotNull
    @Column(nullable=false)
    private String address;

    @NotNull
    @Column(nullable=false)
    private String phone;

    @NotNull
    @Email
    @Column(nullable=false)
    private String email;

    @Column(nullable=false)
    private boolean servicesEnabled=true;
    private String provinceId;

    @NotNull
    @Column(nullable=false, unique = true)
    private String accountNo;


    @NotNull
    @Column(nullable=false)
    private String bankName;
    @NotNull
    @Column(nullable=false)
    private String bankAccountNo;
    @NotNull
    @Column(nullable=false)
    private String bankCardHolderName;
    private String bankCardNo;
}
