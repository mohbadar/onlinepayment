package af.asr.opbo.infrastructure.base;

import af.asr.opbo.infrastructure.revision.AuditEnabledEntity;
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


    @Enumerated(EnumType.STRING)
    @Column(name = "RECORD_STATUS")
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    private String transcationCode;
    private String remarks;


    public BaseEntity() {
        if (id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }

}
