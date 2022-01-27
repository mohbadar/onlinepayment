package af.asr.opbo.infrastructure.audit.handler;

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