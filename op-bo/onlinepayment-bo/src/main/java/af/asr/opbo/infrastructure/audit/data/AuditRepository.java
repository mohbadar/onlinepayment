
package af.asr.opbo.infrastructure.audit.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface with data access and data modification functions on
 * {@link Audit}
 */
@Repository
public interface AuditRepository extends JpaRepository<Audit, String> {
}
