package af.gov.anar.service_kit.infrastructure.audit.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * The Audit Entity class with required fields to be captured and recorded
 */
@Entity(name = "Audit")
@Table(name = "audit_log",schema = "revision")
//@EqualsAndHashCode
@AllArgsConstructor
@DynamicUpdate
@Getter
@Setter
public class Audit {

	/**
	 * Field for immutable universally unique identifier (UUID)
	 */
	@Id
	@Column(name = "log_id", nullable = false, updatable = false)
	private String uuid;


	@Column(name = "log_dtimes")
	@CreationTimestamp
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	@UpdateTimestamp
	private LocalDateTime updatedAt;

	/**
	 * Constructor to initialize {@link } with uuid and timestamp
	 */
	public Audit() {
		uuid = UUID.randomUUID().toString();
	}

	@NotNull
	@Column(columnDefinition="TEXT", name = "event_id", nullable = false, updatable = false)
	private String eventId;

	@NotNull
	@Column(columnDefinition="TEXT",name = "event_name", nullable = false, updatable = false)
	private String eventName;

	@NotNull
	@Column(name = "event_type", nullable = false, updatable = false)
	private String eventType;

	@NotNull
	@Column(name = "action_dtimes", nullable = false, updatable = false)
	private LocalDateTime actionTimeStamp;

	@NotNull
	@Column(name = "host_name", nullable = false, updatable = false)
	private String hostName;

	@NotNull
	@Column(name = "host_ip", nullable = false, updatable = false)
	private String hostIp;

	@NotNull
	@Column(name = "app_id", nullable = false, updatable = false)
	private String applicationId;

	@NotNull
	@Column(name = "app_name", nullable = false, updatable = false)
	private String applicationName;

	@NotNull
	@Column(name = "session_user_id", nullable = false, updatable = false)
	private String sessionUserId;

	@Column(name = "session_user_name", updatable = false)
	private String sessionUserName;

	@NotNull
	@Column(columnDefinition="TEXT",name = "ref_id", nullable = false, updatable = false)
	private String id;

	@NotNull
	@Column(columnDefinition="TEXT",name = "ref_id_type", nullable = false, updatable = false)
	private String idType;

	@Column(name = "cr_by", updatable = false)
	private String createdBy;

	@Column(columnDefinition="TEXT",name = "module_name", updatable = false)
	private String moduleName;

	@Column(columnDefinition="TEXT",name = "module_id", updatable = false)
	private String moduleId;

	@Column(columnDefinition="TEXT", name = "log_desc", updatable = false)
	private String description;
}
