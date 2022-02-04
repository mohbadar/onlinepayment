package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.ThirdPartyIntegration;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThirdPartyIntegrationRepository extends CrudRepository<ThirdPartyIntegration, String> {
}
