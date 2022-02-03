package af.asr.opbo.opbo.controller;

import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.opbo.dto.GenerateDateBasedStatementDTO;
import af.asr.opbo.opbo.service.OrganizationAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/organization-admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrganizationAdminController {

    @Autowired
    private OrganizationAdminService organizationAdminService;

    @Auditable
    @PostMapping("/get-date-based-statement")
    public ResponseEntity<List<Object>> generateDateBasedStatement(@RequestBody GenerateDateBasedStatementDTO dto)
    {
        return ResponseEntity.ok(organizationAdminService.generateDateBasedStatement(dto));
    }
}
