package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.AgentPayment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentPaymentRepository extends CrudRepository<AgentPayment, String> {
}
