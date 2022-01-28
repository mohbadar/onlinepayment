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
public class ProvinceUserRelation extends BaseEntity {

    @Column(nullable = false, name = "app_user_id")
    private String appUserId;

    @Column(nullable = false)
    private String provinceId;
}
