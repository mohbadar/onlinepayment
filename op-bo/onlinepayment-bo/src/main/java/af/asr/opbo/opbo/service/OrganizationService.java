package af.asr.opbo.opbo.service;

import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.model.Organization;
import af.asr.opbo.opbo.model.OrganizationUserRelation;

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
public class OrganizationService {

    @Autowired
    private OrganizationRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private OrganizationUserRelationRepository organizationUserRelationRepository;



    public Organization findByName(String name){
        return  repository.findByName(name);
    }

    public Organization findByCode(String code)
    {
        return repository.findByCode(code);
    }

    public Organization save(Organization obj)
    {
        return repository.save(obj);
    }

    public Iterable<Organization> findAll()
    {
        Iterable<Organization> orgs = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            orgs = repository.findAll();
        }else {
            orgs  = this.getUserOrganizations(userService.getPreferredUsername());
        }

        return orgs;
    }

    public Organization findOne(String id)
    {
        return repository.findById(id).get();
    }


    public Iterable<Organization> getUserTenants(){
        Iterable<Organization> organizations = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            organizations = repository.findAll();
        }else {
            organizations  = this.getUserOrganizations(userService.getPreferredUsername());
        }
        return organizations;
    }

    public List<Organization> getUserOrganizations(String userName)
    {
        List<Organization> organizations = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        List<OrganizationUserRelation> organizationUserRelations = organizationUserRelationRepository.findDistinctByAppUserId(userId);

        organizationUserRelations.forEach(organizationUserRelation -> {
            Organization organization = repository.findById(organizationUserRelation.getOrganizationId()).get();
            if(!organizations.contains(organization))
                organizations.add(organization);
        });
        return organizations;
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }
}
