package af.asr.opbo.opbo.controller;


import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.CenterUserRelationDTO;
import af.asr.opbo.opbo.dto.IssueBillDTO;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.model.Organization;
import af.asr.opbo.opbo.model.OrganizationUserRelation;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.opbo.repository.OrganizationUserRelationRepository;
import af.asr.opbo.opbo.service.CenterService;
import af.asr.opbo.opbo.service.CenterUserRelationService;
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
@RequestMapping(value = "/api/centers", produces = MediaType.APPLICATION_JSON_VALUE)
public class CenterController {

    @Autowired
    private CenterService service;

    @Autowired
    private CenterUserRelationRepository centerUserRelationService;

    @Autowired
    private UserService userService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Center>> findall() {
        return ResponseEntity.ok(service.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<Center> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(service.findOne(id));
    }

    @Auditable
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<Center> findByName(@PathVariable(name = "name", required = true) String name) {
        return ResponseEntity.ok(service.findByName(name));
    }

    @Auditable
    @GetMapping(value = "/code/{code}")
    public @ResponseBody
    ResponseEntity<Center> findByCode(
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
    public ResponseEntity<Center> update(@PathVariable(name = "id", required = true) String id,
                                               @RequestBody(required = true) Center obj) {
//        Organization item = service.findOne(id);
//        item.setName(obj.getName());
//        item.setCode(obj.getCode());
//        item.setServicesEnabled(true);

        obj.setId(id);
        return ResponseEntity.ok(service.save(obj));
    }

    @Auditable
    @PostMapping()
    public ResponseEntity<Center> save(@RequestBody(required = true) Center obj) {
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
    @PostMapping(value = "/center-user-relation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> saveCenterAndUserRelation(@RequestBody(required = true) CenterUserRelationDTO dto) {

        Map<String, Object> response = new HashMap<>();

        for (String userId: dto.getUserIds()){

            if(centerUserRelationService.findTopByAppUserIdAndCenterId(userId,dto.getCenterId()) == null)
            {
                CenterUserRelation centerUserRelation = new CenterUserRelation();
                centerUserRelation.setAppUserId(userId);
                centerUserRelation.setCenterId(dto.getCenterId());
                centerUserRelation.setRemarks(dto.getDesc());
                centerUserRelationService.save(centerUserRelation);
            }
        }

        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/user-centers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Center>> getUserCenters(@RequestParam Map<String, String> params)
    {
        return ResponseEntity.ok(service.getUserCenters(params.get("userName")));
    }


    @Auditable
    @GetMapping("/users")
    public ResponseEntity<List> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }


    @Auditable
    @PostMapping("/issue-bill")
    public ResponseEntity<Map<String, Object>> issueBill(@RequestBody(required = true) IssueBillDTO dto) {
        return ResponseEntity.ok(service.issueBill(dto, null));
    }

}
