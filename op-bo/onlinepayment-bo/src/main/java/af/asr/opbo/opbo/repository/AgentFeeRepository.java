package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.AgentFee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentFeeRepository extends CrudRepository<AgentFee, String> {
    List<AgentFee> findByAgentIdAndCleared(String agentId, boolean cleared);
}
