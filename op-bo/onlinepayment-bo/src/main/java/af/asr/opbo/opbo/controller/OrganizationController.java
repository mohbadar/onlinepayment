package af.asr.opbo.opbo.controller;

import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.OrganizationUserRelationDTO;
import af.asr.opbo.opbo.model.Organization;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.opbo.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/organizations", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrganizationController {

    @Autowired
    private OrganizationService service;

    @Autowired
    private OrganizationUserRelationRepository organizationUserRelationService;

    @Autowired
    private UserService userService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Organization>> findall() {
        return ResponseEntity.ok(service.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<Organization> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(service.findOne(id));
    }

    @Auditable
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<Organization> findByName(@PathVariable(name = "name", required = true) String name) {
        return ResponseEntity.ok(service.findByName(name));
    }

    @Auditable
    @GetMapping(value = "/code/{code}")
    public @ResponseBody
    ResponseEntity<Organization> findByCode(
            @PathVariable(name = "code", required = true) String code) {
        return ResponseEntity.ok(service.findByCode(code));
    }

//    @Auditable
//    @GetMapping(value = "/revision/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody ResponseEntity<Map<String, Object>> getObjectAndRevisions(@PathVariable(name = "id", required = true) String id) {
//        return ResponseEntity.ok(service.getObjectAndRevisions(id));
//    }

    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<Organization> update(@PathVariable(name = "id", required = true) String id,
                                           @RequestBody(required = true) Organization obj) {
//        Organization item = service.findOne(id);
//        item.setName(obj.getName());
//        item.setCode(obj.getCode());
//        item.setServicesEnabled(true);

        return ResponseEntity.ok(service.save(obj));
    }

    @Auditable
    @PostMapping()
    public ResponseEntity<Organization> save(@RequestBody(required = true) Organization obj) {
        return ResponseEntity.ok(service.save(obj));
    }

    // @DeleteMapping(value = "/{id}")
    // public @ResponseBody
    // ResponseEntity<Void> delete(@PathVariable(name = "id", required = true)
    // String id){

    // service.delete(id);
    // return ResponseEntity.noContent().build();
    // }

    @Auditable
    @PostMapping(value = "/organization-user-relation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> saveOrganizationAndUserRelation(@RequestBody(required = true) OrganizationUserRelationDTO dto) {

        Map<String, Object> response = new HashMap<>();

        for (String userId: dto.getUserIds()){

            if(organizationUserRelationService.findTopByAppUserIdAndOrganizationId(userId,dto.getOrganizationId()) == null)
            {
                OrganizationUserRelation organizationUserRelation = new OrganizationUserRelation();
                organizationUserRelation.setAppUserId(userId);
                organizationUserRelation.setOrganizationId(dto.getOrganizationId());
                organizationUserRelation.setRemarks(dto.getDesc());
                organizationUserRelationService.save(organizationUserRelation);
            }
        }

        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/user-organization", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Organization>> getUserOrganizations(@RequestParam Map<String, String> params)
    {
        return ResponseEntity.ok(service.getUserOrganizations(params.get("userName")));
    }


    @Auditable
    @GetMapping("/users")
    public ResponseEntity<List> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

}
