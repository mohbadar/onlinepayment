package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.ThirdPartyIntegration;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThirdPartyIntegrationRepository extends CrudRepository<ThirdPartyIntegration, String> {
    List<BillType> findByProvinceId(String provinceId);
    List<BillType> findByOrganizationId(String organizationId);
}
