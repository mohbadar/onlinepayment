package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.ProvinceUserRelation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvinceUserRelationRepository extends CrudRepository<ProvinceUserRelation, String> {
    @Query(nativeQuery = true, value = "select distinct on(province_id) * from province_user_relation  WHERE app_user_id=:userId")
    List<ProvinceUserRelation> findDistinctByAppUserId(@Param("userId") String userId);
    List<ProvinceUserRelation> findByProvinceId(String provinceId);
    ProvinceUserRelation findTopByAppUserIdAndProvinceId(String appUserId, String provinceId);
}
