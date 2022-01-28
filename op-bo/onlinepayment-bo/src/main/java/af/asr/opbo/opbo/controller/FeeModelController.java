package af.asr.opbo.opbo.controller;


import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.FeeModel;
import af.asr.opbo.opbo.service.FeeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/fee-models", produces = MediaType.APPLICATION_JSON_VALUE)
public class FeeModelController {

    @Autowired
    private FeeModelService feeModelService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<FeeModel>> findall() {
        return ResponseEntity.ok(feeModelService.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<FeeModel> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(feeModelService.findById(id));
    }


    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<FeeModel> update(@PathVariable(name = "id", required = true) String id,
                                         @RequestBody(required = true) FeeModel obj) {
        obj.setId(id);
        return ResponseEntity.ok(feeModelService.save(obj));
    }


    @Auditable
    @PostMapping()
    public ResponseEntity<FeeModel> save(@RequestBody(required = true) FeeModel obj) {
        return ResponseEntity.ok(feeModelService.save(obj));
    }
}
