package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.Organization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterRepository extends CrudRepository<Center, String> {
    Center findByName(String name);
    Center findByCode(String provinceCode);
    List<BillType> findByProvinceId(String provinceId);
    List<BillType> findByOrganizationId(String organizationId);
}
