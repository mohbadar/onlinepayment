package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.model.Organization;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.repository.CenterRepository;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.opbo.repository.OrganizationRepository;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CenterService {


    @Autowired
    private CenterRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private CenterUserRelationRepository centerUserRelationRepository;



    public Center findByName(String name){
        return  repository.findByName(name);
    }

    public Center findByCode(String code)
    {
        return repository.findByCode(code);
    }

    public Center save(Center obj)
    {
        return repository.save(obj);
    }

    public Iterable<Center> findAll()
    {
        Iterable<Center> orgs = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            orgs = repository.findAll();
        }else {
            orgs  = this.getUserCenters(userService.getPreferredUsername());
        }

        return orgs;
    }

    public Center findOne(String id)
    {
        return repository.findById(id).get();
    }


    public Iterable<Center> getUserTenants(){
        Iterable<Center> centers = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            centers = repository.findAll();
        }else {
            centers  = this.getUserCenters(userService.getPreferredUsername());
        }
        return centers;
    }

    public List<Center> getUserCenters(String userName)
    {
        List<Center> centers = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        List<CenterUserRelation> centerUserRelations = centerUserRelationRepository.findDistinctByAppUserId(userId);

        centerUserRelations.forEach(centerUserRelation -> {
            Center center = repository.findById(centerUserRelation.getCenterId()).get();
            if(!centers.contains(center))
                centers.add(center);
        });
        return centers;
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
