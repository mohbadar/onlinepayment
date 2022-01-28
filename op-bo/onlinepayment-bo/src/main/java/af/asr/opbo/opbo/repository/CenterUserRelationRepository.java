package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterUserRelationRepository extends CrudRepository<CenterUserRelation, String> {


    @Query(nativeQuery = true, value = "select distinct on(center_id) * from center_user_relation  WHERE app_user_id=:userId")
    List<CenterUserRelation> findDistinctByAppUserId(@Param("userId") String userId);
    List<CenterUserRelation> findByCenterId(String centerId);

    CenterUserRelation findTopByAppUserIdAndCenterId(String appUserId, String centerId);
}
