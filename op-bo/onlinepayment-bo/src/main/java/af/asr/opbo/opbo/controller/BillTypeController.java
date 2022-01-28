package af.asr.opbo.opbo.controller;


import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.opbo.model.BillType;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.FeeModel;
import af.asr.opbo.opbo.service.BillTypeService;
import af.asr.opbo.opbo.service.FeeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/bill-types", produces = MediaType.APPLICATION_JSON_VALUE)
public class BillTypeController {

    @Autowired
    private BillTypeService billTypeService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<BillType>> findall() {
        return ResponseEntity.ok(billTypeService.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<BillType> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(billTypeService.findById(id));
    }


    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<BillType> update(@PathVariable(name = "id", required = true) String id,
                                           @RequestBody(required = true) BillType obj) {
        obj.setId(id);
        return ResponseEntity.ok(billTypeService.save(obj));
    }


    @Auditable
    @PostMapping()
    public ResponseEntity<BillType> save(@RequestBody(required = true) BillType obj) {
        return ResponseEntity.ok(billTypeService.save(obj));
    }
}
