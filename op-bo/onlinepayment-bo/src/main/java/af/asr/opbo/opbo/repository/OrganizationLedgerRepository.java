package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.OrganizationLedger;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationLedgerRepository extends CrudRepository<OrganizationLedger, String> {
}
