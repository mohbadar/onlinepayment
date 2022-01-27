package af.gov.anar.service_kit.usermanagement.controller;

import af.gov.anar.api.handler.ResponseHandler;
import af.gov.anar.service_kit.infrastructure.audit.annotation.Auditable;
import af.gov.anar.service_kit.usermanagement.domain.BankUserCreationDTO;
import af.gov.anar.service_kit.usermanagement.domain.UserDTO;
import af.gov.anar.service_kit.usermanagement.domain.UserRoleRelationDTO;
import af.gov.anar.service_kit.usermanagement.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/config/user-management")
public class UserManagementController extends ResponseHandler {

    @Autowired
    private UserManagementService userManagementService;

    @Auditable
    @PostMapping(value = "user-role-relation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> save(@RequestBody(required = true) UserRoleRelationDTO dto) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", userManagementService.assignUserRole(dto));
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> save(@RequestBody(required = true) UserDTO dto) {
        Map<String, Object> response = new HashMap<>();
        response.put("users", userManagementService.registerNewUser(dto));
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }


    @Auditable
    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("users", userManagementService.getUsers().list());
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getRoles() {
        Map<String, Object> response = new HashMap<>();
        response.put("roles", userManagementService.getRoles().list());
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getGroups() {
        Map<String, Object> response = new HashMap<>();
        response.put("groups", userManagementService.getGroups().groups());
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/keys", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getKeys() {
        Map<String, Object> response = new HashMap<>();
        response.put("keys", userManagementService.getKeys());
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/clients", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getClients() {
        Map<String, Object> response = new HashMap<>();
        response.put("users", userManagementService.getClients().findAll());
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable(required = true) String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", userManagementService.getUserById(id));
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/roles/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getRoleById(@PathVariable(required = true) String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("role", userManagementService.getUserRoleById(id));
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/groups/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getGroupById(@PathVariable(required = true) String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("group", userManagementService.getGroupById(id));
        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }


}
