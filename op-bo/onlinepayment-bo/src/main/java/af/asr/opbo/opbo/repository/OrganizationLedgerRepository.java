package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.OrganizationLedger;
import feign.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrganizationLedgerRepository extends CrudRepository<OrganizationLedger, String> {

    List<OrganizationLedger> findByOrganizationId(String organizationId);

    @Query(nativeQuery = true, value = "select sum(c.credit) - sum(c.debit) from ORGANIZATION_LEDGER c WHERE c.organization_id = :organizationId AND deleted IS false")
    BigDecimal getOrganizationBalanceByOrganizationId(@Param("organizationId") String organizationId);

}
