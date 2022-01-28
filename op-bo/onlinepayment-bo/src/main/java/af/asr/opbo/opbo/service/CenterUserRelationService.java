package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterUserRelationService {

    @Autowired
    private CenterUserRelationRepository repository;

    @Autowired
    private UserManagementService userManagementService;

    public List<CenterUserRelation> findByAppUserId(String appUserId){
        return repository.findDistinctByAppUserId(appUserId);
    }

    public List<CenterUserRelation> findByCenterId(String orgId){
        return repository.findByCenterId(orgId);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public CenterUserRelation save(CenterUserRelation obj)
    {
        return repository.save(obj);
    }
}
