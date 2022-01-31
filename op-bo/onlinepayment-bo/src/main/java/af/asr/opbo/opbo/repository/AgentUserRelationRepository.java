package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.AgentUserRelation;
import af.asr.opbo.opbo.model.CenterUserRelation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentUserRelationRepository extends CrudRepository<AgentUserRelation,String> {
    @Query(nativeQuery = true, value = "select distinct on(agent_id) * from agent_user_relation  WHERE app_user_id=:userId")
    AgentUserRelation findDistinctByAppUserId(@Param("userId") String userId);
    AgentUserRelation findByAgentId(String agentId);

    AgentUserRelation findTopByAppUserIdAndAgentId(String appUserId, String agentId);
}
