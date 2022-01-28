package af.asr.opbo.opbo.controller;

import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.ProvinceUserRelationDTO;
import af.asr.opbo.opbo.model.Province;
import af.asr.opbo.opbo.model.ProvinceUserRelation;
import af.asr.opbo.opbo.repository.ProvinceUserRelationRepository;
import af.asr.opbo.opbo.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/provinces", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProvinceController {

    @Autowired
    private ProvinceService service;

    @Autowired
    private ProvinceUserRelationRepository provinceUserRelationRepository;

    @Autowired
    private UserService userService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Province>> findall() {
        return ResponseEntity.ok(service.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<Province> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(service.findOne(id));
    }

    @Auditable
    @GetMapping(value = "/name/{name}")
    public ResponseEntity<Province> findByName(@PathVariable(name = "name", required = true) String name) {
        return ResponseEntity.ok(service.findByName(name));
    }

    @Auditable
    @GetMapping(value = "/code/{code}")
    public @ResponseBody ResponseEntity<Province> findByCode(
            @PathVariable(name = "code", required = true) String code) {
        return ResponseEntity.ok(service.findByProvinceCode(code));
    }

//    @Auditable
//    @GetMapping(value = "/revision/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody ResponseEntity<Map<String, Object>> getObjectAndRevisions(@PathVariable(name = "id", required = true) String id) {
//        return ResponseEntity.ok(service.getObjectAndRevisions(id));
//    }

    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<Province> update(@PathVariable(name = "id", required = true) String id,
            @RequestBody(required = true) Province obj) {
        //System.out.println("ID: " + id + "   Province: " + obj);
        Province item = service.findOne(id);
        item.setName(obj.getName());
        item.setProvinceCode(obj.getProvinceCode());
        item.setServicesEnabled(true);

        return ResponseEntity.ok(service.save(obj));
    }

    @Auditable
    @PostMapping()
    public ResponseEntity<Province> save(@RequestBody(required = true) Province obj) {
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
    @PostMapping(value = "/province-user-relation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> saveProvinceAndUserRelation(@RequestBody(required = true) ProvinceUserRelationDTO dto) {

        Map<String, Object> response = new HashMap<>();

        for (String userId: dto.getUserIds()){

            if(provinceUserRelationRepository.findTopByAppUserIdAndProvinceId(userId,dto.getProvinceId()) == null)
            {
                ProvinceUserRelation provinceUserRelation = new ProvinceUserRelation();
                provinceUserRelation.setAppUserId(userId);
                provinceUserRelation.setProvinceId(dto.getProvinceId());
                provinceUserRelationRepository.save(provinceUserRelation);
            }
        }

        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/user-provinces", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Province>> getUserProvinces(@RequestParam Map<String, String> params)
    {
        return ResponseEntity.ok(service.getUserProvinces(params.get("userName")));
    }


    @Auditable
    @GetMapping("/users")
    public ResponseEntity<List> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

}
