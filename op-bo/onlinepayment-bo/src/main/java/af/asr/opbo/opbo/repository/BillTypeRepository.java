package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.BillType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillTypeRepository extends CrudRepository<BillType, String> {

    List<BillType> findByProvinceId(String provinceId);
    List<BillType> findByOrganizationId(String organizationId);
    List<BillType> findByThirdPartyIntegrationId(String thirdPartyIntegrationId);
}
