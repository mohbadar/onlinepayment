package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.AgentLedger;
import feign.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AgentLedgerRespository extends CrudRepository<AgentLedger, String> {

    @Query(nativeQuery = true, value = "select sum(c.credit) - sum(c.debit) from AGENT_LEDGER c WHERE c.agent_id = :agentId AND deleted IS false")
    BigDecimal getAgentBalanceByAgentId(@Param("agentId") String agentId);

    List<AgentLedger> findByAgentId(String agentId);

}
