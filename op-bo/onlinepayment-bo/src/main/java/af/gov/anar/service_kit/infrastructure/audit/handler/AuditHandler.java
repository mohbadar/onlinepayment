package af.gov.anar.service_kit.infrastructure.audit.handler;

/**
 * Interface with function to write AuditRequest
 */
//@Component
public interface AuditHandler<T> {

	/**
	 * Function to write AuditRequest
	 * 
	 * @param auditRequest The AuditRequest
	 * @return true - if AuditRequest is successfully written
	 */
	boolean addAudit(T auditRequest);

}