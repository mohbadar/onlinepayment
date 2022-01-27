package af.gov.anar.service_kit.pda.controller;

import af.gov.anar.service_kit.pda.model.PdaApplication;
import af.gov.anar.service_kit.pda.service.PdaApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(value = "/api/nid")
public class PdaApplicationController {

    @Autowired
    private PdaApplicationService nidFamilyFormService;

    @PostMapping(value = "/process-docs/store", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE })
    public ResponseEntity<Map<String, Object>> store(
            @RequestParam(name = "onlineFormFamilyNo") String onlineFormFamilyNo,
            @RequestParam(name = "familyNo") String familyNo,
            @RequestParam(name = "file", required = false) MultipartFile file) throws IOException {

        return ResponseEntity.ok(nidFamilyFormService.save(onlineFormFamilyNo, familyNo, file));
    }

    @GetMapping(value = "/process-docs/search/{familyNo}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE })
    public ResponseEntity<PdaApplication> searchDocument( @Valid
            @PathVariable(name = "familyNo", required = true) String familyNo) {
        return ResponseEntity.ok(nidFamilyFormService.search(familyNo));

    }

    @PostMapping(value = "/process-docs/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> downloadDocument(@RequestBody(required = true) String uuid)
            throws IOException, InterruptedException, URISyntaxException {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(nidFamilyFormService.download(uuid));
    }


    @PostMapping(value = "/process-docs/verification/list", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE })
    public ResponseEntity<Map<String, Object>> getListOfUnVerifiedDocs(
            @RequestParam(name = "verification_type") String vertificationType,
            @RequestParam(name = "center_code") String centerCode) throws IOException {
        System.out.println("VerificationType: "  + vertificationType);
        System.out.println("centercode: "  + centerCode);
        return ResponseEntity.ok(nidFamilyFormService.getListOfUnVerifiedDocs(vertificationType, centerCode));
    }


    @GetMapping(value = "/process-docs/verification/verify/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_JSON_VALUE, MediaType.ALL_VALUE })
    public ResponseEntity<Map<String, Object>> verify(@PathVariable(name = "id") String id) throws IOException {

        return ResponseEntity.ok(nidFamilyFormService.verify(id));
    }


}
