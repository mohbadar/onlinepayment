package af.gov.anar.service_kit.infrastructure.base;

import af.gov.anar.service_kit.infrastructure.revision.AuditEnabledEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@ToString
@EnableJpaAuditing
public class BaseEntity extends AuditEnabledEntity {

    @Id
    public String id;

    @Column(name = "MODULE_ID")
    @JsonIgnore
    private String moduleId;

    @Column(name = "SUBMODULE_ID")
    @JsonIgnore
    private String submoduleId;

    @Enumerated(EnumType.STRING)
    @Column(name = "RECORD_STATUS")
    private RecordStatus recordStatus = RecordStatus.ACTIVE;


    public BaseEntity() {
        if (id == null) {
            this.id = UUID.randomUUID().toString();
        }
        if(moduleId == null || moduleId.equalsIgnoreCase("")){
            moduleId="NID_SERVICE_KIT";
        }
    }

}
