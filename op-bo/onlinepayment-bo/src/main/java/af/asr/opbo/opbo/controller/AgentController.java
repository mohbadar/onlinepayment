package af.asr.opbo.opbo.controller;


import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.AgentAccountCreditDTO;
import af.asr.opbo.opbo.dto.AgentUserRelationDTO;
import af.asr.opbo.opbo.dto.CenterUserRelationDTO;
import af.asr.opbo.opbo.model.Agent;
import af.asr.opbo.opbo.model.AgentUserRelation;
import af.asr.opbo.opbo.model.Center;
import af.asr.opbo.opbo.model.CenterUserRelation;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.repository.CenterUserRelationRepository;
import af.asr.opbo.opbo.service.AgentService;
import af.asr.opbo.opbo.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/agents", produces = MediaType.APPLICATION_JSON_VALUE)
public class AgentController {
    @Autowired
    private AgentService service;

    @Autowired
    private AgentUserRelationRepository agentUserRelationRepository;

    @Autowired
    private UserService userService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Agent>> findall() {
        return ResponseEntity.ok(service.findAll());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<Agent> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(service.findOne(id));
    }

    @Auditable
    @GetMapping(value = "/phone/{phone}")
    public ResponseEntity<Agent> findByPhone(@PathVariable(name = "phone", required = true) String phone) {
        return ResponseEntity.ok(service.findByPhone(phone));
    }

    @Auditable
    @GetMapping(value = "/account-no/{accountNo}")
    public @ResponseBody
    ResponseEntity<Agent> findByAccountNo(
            @PathVariable(name = "accountNo", required = true) String accountNo) {
        return ResponseEntity.ok(service.findByAccountNo(accountNo));
    }

//    @Auditable
//    @GetMapping(value = "/revision/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody ResponseEntity<Map<String, Object>> getObjectAndRevisions(@PathVariable(name = "id", required = true) String id) {
//        return ResponseEntity.ok(service.getObjectAndRevisions(id));
//    }

    @Auditable
    @PutMapping(value = "/{id}")
    public ResponseEntity<Agent> update(@PathVariable(name = "id", required = true) String id,
                                         @RequestBody(required = true) Agent obj) {
        return ResponseEntity.ok(service.save(obj));
    }

    @Auditable
    @PostMapping()
    public ResponseEntity<Agent> save(@RequestBody(required = true) Agent obj) {
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
    @PostMapping(value = "/agent-user-relation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> saveAgentAndUserRelation(@RequestBody(required = true) AgentUserRelationDTO dto) {

        Map<String, Object> response = new HashMap<>();

        for (String userId: dto.getUserIds()){

            if(agentUserRelationRepository.findTopByAppUserIdAndAgentId(userId,dto.getAgentId()) == null)
            {
                AgentUserRelation agentUserRelation = new AgentUserRelation();
                agentUserRelation.setAppUserId(userId);
                agentUserRelation.setAgentId(dto.getAgentId());
                agentUserRelation.setRemarks(dto.getDesc());
                agentUserRelationRepository.save(agentUserRelation);
            }
        }

        response.put("status", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

    @Auditable
    @GetMapping(value = "/user-agents", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Agent>> getUserAgents(@RequestParam Map<String, String> params)
    {
        return ResponseEntity.ok(service.getUserAgents(params.get("userName")));
    }


    @Auditable
    @GetMapping("/users")
    public ResponseEntity<List> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }


    @Auditable
    @PostMapping("/agent-account-credit")
    public ResponseEntity<Map<String, Object>> creditAgentAccount(@RequestBody AgentAccountCreditDTO dto)
    {
        return ResponseEntity.ok(service.creditAgentAccount(dto));
    }

}
