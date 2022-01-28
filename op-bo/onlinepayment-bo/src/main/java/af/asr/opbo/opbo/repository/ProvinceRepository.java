package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Province;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvinceRepository extends CrudRepository<Province, String>{

    Province findByName(String name);
    Province findByProvinceCode(String provinceCode);

}
