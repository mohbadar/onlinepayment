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
public class Province extends BaseEntity {
    @NotNull
    @Column(nullable=false, unique = true)
    private String name;
    @NotNull
    @Column(nullable=false, unique = true)
    private String provinceCode;
    @Column(nullable=false)
    private boolean servicesEnabled=true;
}
