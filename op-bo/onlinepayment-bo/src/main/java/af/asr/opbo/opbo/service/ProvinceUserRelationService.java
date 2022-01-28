package af.asr.opbo.opbo.service;

import af.asr.opbo.opbo.model.ProvinceUserRelation;
import af.asr.opbo.opbo.repository.ProvinceUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProvinceUserRelationService {

    @Autowired
    private ProvinceUserRelationRepository repository;

    @Autowired
    private UserManagementService userManagementService;

    public List<ProvinceUserRelation> findByAppUserId(String appUserId){
        return repository.findDistinctByAppUserId(appUserId);
    }

    public List<ProvinceUserRelation> findByProvinceId(String provinceId){
        return repository.findByProvinceId(provinceId);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public ProvinceUserRelation save(ProvinceUserRelation obj)
    {
        return repository.save(obj);
    }

}
