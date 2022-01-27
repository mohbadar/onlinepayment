package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.Organization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends CrudRepository<Organization, String> {
}
