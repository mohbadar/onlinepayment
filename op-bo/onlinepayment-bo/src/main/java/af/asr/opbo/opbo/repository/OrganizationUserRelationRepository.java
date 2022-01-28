package af.asr.opbo.opbo.repository;

import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.model.ProvinceUserRelation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationUserRelationRepository extends CrudRepository<OrganizationUserRelation, String> {

    @Query(nativeQuery = true, value = "select distinct on(organization_id) * from organization_user_relation  WHERE app_user_id=:userId")
    List<OrganizationUserRelation> findDistinctByAppUserId(@Param("userId") String userId);
    List<OrganizationUserRelation> findByOrganizationId(String provinceId);

    OrganizationUserRelation findTopByAppUserIdAndOrganizationId(String appUserId, String organizationId);
}
