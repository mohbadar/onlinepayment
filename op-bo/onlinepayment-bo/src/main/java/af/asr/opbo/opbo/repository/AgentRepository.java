package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepository extends CrudRepository<Agent, String> {
}
