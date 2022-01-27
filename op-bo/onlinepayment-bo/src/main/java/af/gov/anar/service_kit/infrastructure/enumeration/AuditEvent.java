package af.gov.anar.service_kit.infrastructure.enumeration;

import af.gov.anar.service_kit.infrastructure.audit.util.AuditEventType;
import lombok.Getter;


/**
 * Enum for Audit Events
 */
public enum AuditEvent {

    // Login
    CREATE_ORGANIZATION("eBreshna-EVT-001", AuditEventType.USER_EVENT.getCode(), "CREATE_ORGANIZATION", "Create New Organization in System: Click of Submit"),
    UPDATE_ORGANIZATION("eBreshna-EVT-002", AuditEventType.USER_EVENT.getCode(), "LOGIN_WITH_PASSWORD", "Update Details of Organization: Click of Submit"),
    DELETE_ORGANIZATION("eBreshna-EVT-003", AuditEventType.USER_EVENT.getCode(), "LOGIN_GET_OTP", "Delete an organization from system: Click of Delete"),
    UPDATE_ORGANIZATION_CODE("eBreshna-EVT-004", AuditEventType.USER_EVENT.getCode(), "LOGIN_SUBMIT_OTP", "Update Organization Code: Submit New Code of Organization");

    //Other events comes here

    /**
     * The constructor
     */
    AuditEvent(String id, String type, String name, String description) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
    }

    @Getter
    private final String id;
    @Getter
    private final String type;
    @Getter
    private final String name;
    @Getter
    private final String description;


    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
