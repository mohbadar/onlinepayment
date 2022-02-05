package af.asr.opbo.opbo.controller;


import af.asr.opbo.infrastructure.audit.annotation.Auditable;
import af.asr.opbo.infrastructure.base.UserService;
import af.asr.opbo.opbo.dto.*;
import af.asr.opbo.opbo.dto.response.OnlineBillDetailsDTO;
import af.asr.opbo.opbo.dto.response.UserBillPaymentStatementResponseDTO;
import af.asr.opbo.opbo.model.*;
import af.asr.opbo.opbo.repository.AgentUserRelationRepository;
import af.asr.opbo.opbo.service.AgentService;
import af.asr.opbo.opbo.onlinecollection.OnlineBillCollectionService;
import af.gov.anar.core.infrastructure.exception.common.IOException;
import af.gov.anar.lib.json.exception.JsonMappingException;
import af.gov.anar.lib.json.exception.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
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
    private AgentService agentService;

    @Autowired
    private OnlineBillCollectionService onlineBillCollectionService;

    @Autowired
    private AgentUserRelationRepository agentUserRelationRepository;

    @Autowired
    private UserService userService;

    @Auditable
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Agent>> findall() {
        return ResponseEntity.ok(agentService.findAll());
    }

    @Auditable
    @GetMapping("/get-user-bill-statement")
    public ResponseEntity<List<UserBillPaymentStatementResponseDTO>> getUserBillStatement()
    {
        return ResponseEntity.ok(agentService.getUserBillStatement());
    }

    @Auditable
    @GetMapping(value = "/{id}")
    public ResponseEntity<Agent> findOne(@PathVariable(name = "id", required = true) String id) {
        return ResponseEntity.ok(agentService.findOne(id));
    }

    @Auditable
    @GetMapping(value = "/phone/{phone}")
    public ResponseEntity<Agent> findByPhone(@PathVariable(name = "phone", required = true) String phone) {
        return ResponseEntity.ok(agentService.findByPhone(phone));
    }

    @Auditable
    @GetMapping(value = "/account-no/{accountNo}")
    public @ResponseBody
    ResponseEntity<Agent> findByAccountNo(
            @PathVariable(name = "accountNo", required = true) String accountNo) {
        return ResponseEntity.ok(agentService.findByAccountNo(accountNo));
    }

    @Auditable
    @GetMapping(value = "/agent-fees/{accountNo}")
    public @ResponseBody
    ResponseEntity<List<AgentFee>> getAgentFees(
            @PathVariable(name = "accountNo", required = true) String accountNo) {
        return ResponseEntity.ok(agentService.getAgentFees(accountNo));
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
        return ResponseEntity.ok(agentService.save(obj));
    }

    @Auditable
    @PostMapping()
    public ResponseEntity<Agent> save(@RequestBody(required = true) Agent obj) {
        return ResponseEntity.ok(agentService.save(obj));
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
        return ResponseEntity.ok(agentService.getUserAgents(params.get("userName")));
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
        return ResponseEntity.ok(agentService.creditAgentAccount(dto));
    }

    @Auditable
    @PostMapping("/agent-account-debit")
    public ResponseEntity<Map<String, Object>> debitAgentAccount(@RequestBody AgentAccountCreditDTO dto)
    {
        return ResponseEntity.ok(agentService.debitAgentAccount(dto));
    }


    @Auditable
    @PostMapping("/make-agent-payment")
    public ResponseEntity<Map<String, Object>> makeAgentPayment(@RequestBody AgentAccountCreditDTO dto)
    {
        return ResponseEntity.ok(agentService.makeAgentPayment(dto));
    }

    @Auditable
    @PostMapping("/query-bill")
    public ResponseEntity<Bill> queryBill(@RequestBody String billNo)
    {
        return ResponseEntity.ok(agentService.queryBill(billNo));
    }


    @Auditable
    @PostMapping("/collect")
    public ResponseEntity<Map<String, Object>> collectPayment(@RequestBody BillCollectionDTO dto)
    {
        return ResponseEntity.ok(agentService.collectBillPayment(dto));
    }


    @Auditable
    @PostMapping("/print-duplicate-slip")
    public ResponseEntity<Map<String, Object>> printDuplicateSlip(@RequestBody String billNo)
    {
        return ResponseEntity.ok(agentService.printDuplicateSlip(billNo));
    }


    @Auditable
    @PostMapping("/get-balance-sheet")
    public ResponseEntity<Map<String, Object>> getBalanceSheet(@RequestBody String accountNo)
    {
        return ResponseEntity.ok(agentService.getBalanceSheet(accountNo));
    }

    @Auditable
    @PostMapping("/query-bill-payment")
    public ResponseEntity<Map<String, Object>> queryBillPayment(@RequestBody String receiptNo)
    {
        return ResponseEntity.ok(agentService.queryBillPayment(receiptNo));
    }


    @Auditable
    @PostMapping("/confirm-payment")
    public ResponseEntity<BillPayment> confirmPayment(@RequestBody String paymentId)
    {
        return ResponseEntity.ok(agentService.confirmPayment(paymentId));
    }


    @Auditable
    @PostMapping("/fee-approvals")
    public ResponseEntity<HttpStatus> approveFees(@RequestBody List<AgentFee> agentFees)
    {
        agentService.approveFees(agentFees);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }


    @Auditable
    @PostMapping("/query-online-bill-info")
    public ResponseEntity<OnlineBillDetailsDTO> queryOnlineBillInfo(@RequestBody QueryOnlineBillInfoDTO dto) throws JsonProcessingException, JsonParseException, IOException, JsonMappingException, af.gov.anar.lib.json.exception.JsonProcessingException {

        return ResponseEntity.ok(onlineBillCollectionService.queryOnlineBillInfo(dto));
    }


    @Auditable
    @PostMapping("/confirm-online-bill-payment")
    public ResponseEntity<Map<String, Object>> confirmOnlineBillPayment(@RequestBody OnlineBillDetailsDTO dto)
    {

        return ResponseEntity.ok(onlineBillCollectionService.confirmOnlineBillPayment(dto));
    }

}
