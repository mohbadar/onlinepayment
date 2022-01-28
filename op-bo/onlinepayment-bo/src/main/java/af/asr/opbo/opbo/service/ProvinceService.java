package af.asr.opbo.opbo.service;


import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.model.Province;
import af.asr.opbo.opbo.model.ProvinceUserRelation;
import af.asr.opbo.opbo.repository.ProvinceRepository;
import af.asr.opbo.opbo.repository.ProvinceUserRelationRepository;
import af.asr.opbo.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProvinceService {

    @Autowired
    private ProvinceRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private ProvinceUserRelationRepository provinceUserRelationRepository;



    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public Province findByName(String name){
        return  repository.findByName(name);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public Province findByProvinceCode(String code)
    {
        return repository.findByProvinceCode(code);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public Province save(Province obj)
    {
        return repository.save(obj);
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public Iterable<Province> findAll()
    {
        Iterable<Province> provinces = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            provinces = repository.findAll();
        }else {
            provinces  = this.getUserProvinces(userService.getPreferredUsername());
        }

        return provinces;
    }

    //@PreAuthorize("hasAuthority('configuration_general_province')")
    public Province findOne(String id)
    {
        return repository.findById(id).get();
    }

    // public void delete(Long id)
    // {
    //     Province obj = repository.getOne(id);
    //     obj.setDeleted(true);
    //     obj.setUserId(userService.getId());
    //     obj.setDeletedAt(new Date());
    //     save(obj);
    // }

    public Iterable<Province> getUserTenants(){
        Iterable<Province> provinces = new ArrayList<>();

        if(userService.hasRole("view_full_provinces_list"))
        {
            provinces = repository.findAll();
        }else {
            provinces  = this.getUserProvinces(userService.getPreferredUsername());
        }
        return provinces;
    }

    public List<Province> getUserProvinces(String userName)
    {
        List<Province> provinces = new ArrayList<>();
        String userId = userManagementService.getUserByUserName(userName).getId();
        List<ProvinceUserRelation> provinceUserRelations = provinceUserRelationRepository.findDistinctByAppUserId(userId);

        provinceUserRelations.forEach(provinceUserRelation -> {
            Province province = repository.findById(provinceUserRelation.getProvinceId()).get();
            if(!provinces.contains(province))
                provinces.add(province);
        });
//        //System.out.println("Provinces> "+ provinces.toString());


        return provinces;
    }

//    public Map<String, Object> getObjectAndRevisions(String id) {
//        Map<String, Object> data =  new HashMap<>();
//        data.put("object", this.findOne(id));
//        data.put("revisions", this.repository.getRevisions(id));
//        return data;
//    }


}
