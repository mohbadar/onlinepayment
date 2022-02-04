package af.asr.opbo.opbo.controller;

import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.ThirdPartyIntegration;
import af.asr.opbo.opbo.service.BillTypeService;
import af.asr.opbo.opbo.service.ThirdPartyIntegrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/third-party-integration", produces = MediaType.APPLICATION_JSON_VALUE)
public class ThirdPartyIntegrationController {

    @Autowired
    private ThirdPartyIntegrationService thirdPartyIntegrationService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<ThirdPartyIntegration>> findall() {
        return ResponseEntity.ok(thirdPartyIntegrationService.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<ThirdPartyIntegration> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(thirdPartyIntegrationService.findById(id));
    }


    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<ThirdPartyIntegration> update(@PathVariable(name = "id", required = true) String id,
                                           @RequestBody(required = true) ThirdPartyIntegration obj) {
        obj.setId(id);
        return ResponseEntity.ok(thirdPartyIntegrationService.save(obj));
    }


    @Auditable
    @PostMapping()
    public ResponseEntity<ThirdPartyIntegration> save(@RequestBody(required = true) ThirdPartyIntegration obj) {
        return ResponseEntity.ok(thirdPartyIntegrationService.save(obj));
    }
}
