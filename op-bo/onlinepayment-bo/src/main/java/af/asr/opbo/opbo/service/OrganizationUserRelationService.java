package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.model.ProvinceUserRelation;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationUserRelationService {

    @Autowired
    private OrganizationUserRelationRepository repository;

    @Autowired
    private UserManagementService userManagementService;

    public List<OrganizationUserRelation> findByAppUserId(String appUserId){
        return repository.findDistinctByAppUserId(appUserId);
    }

    public List<OrganizationUserRelation> findByProvinceId(String orgId){
        return repository.findByOrganizationId(orgId);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public OrganizationUserRelation save(OrganizationUserRelation obj)
    {
        return repository.save(obj);
    }
}
